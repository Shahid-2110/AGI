from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.models.db import get_db, Village, CropReport
from backend.app.models.schemas import DiagnosisResponse
from backend.app.ml.inference import analyze_leaf_image
from backend.app.advisory_kb.translator import get_disease_details
from backend.app.risk_engine.aggregator import aggregate_village_reports
from backend.app.risk_engine.weather_client import get_village_weather
from backend.app.risk_engine.scorer import calculate_village_risk

router = APIRouter(prefix="/api", tags=["Diagnosis"])

@router.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose_crop(
    image: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None),
    crop_hint: Optional[str] = Form(None),
    village_id: Optional[str] = Form("VIL-RAMPUR"),
    language: Optional[str] = Form("hi"),
    db: Session = Depends(get_db)
):
    """
    Primary Diagnosis Endpoint:
    1. Runs vision classification on leaf image
    2. Fetches ICAR-vetted safe multi-tiered advisory in the farmer's native language
    3. Aggregates village-level risk context for outbreak awareness
    4. Auto-logs the verified diagnostic sighting for community protection
    """
    image_bytes = b""
    if image is not None:
        image_bytes = await image.read()

    # Perform ML vision classification
    inference_result = analyze_leaf_image(
        image_bytes=image_bytes,
        crop_hint=crop_hint,
        sample_id=sample_id
    )

    disease_id = inference_result["disease_id"]

    # Retrieve multi-lingual safe advisory
    advisory_info = get_disease_details(disease_id=disease_id, lang=language or "hi")

    # Fetch village risk status
    village = db.query(Village).filter(Village.id == village_id).first()
    if not village:
        village = db.query(Village).first()

    village_id_clean = village.id if village else "VIL-RAMPUR"
    village_name_clean = village.name if village else "Rampur"

    agg_data = aggregate_village_reports(db, village_id=village_id_clean)
    weather_data = await get_village_weather(lat=village.lat if village else 25.3, lon=village.lon if village else 82.9)
    risk_data = calculate_village_risk(
        village_info={"primary_crops": village.primary_crops if village else ""},
        agg_data=agg_data,
        weather_data=weather_data
    )

    # Log report to DB for crowd-sourced village intelligence
    try:
        new_report = CropReport(
            village_id=village_id_clean,
            farmer_name="App Scan",
            crop_type=inference_result["crop_type"],
            disease_id=disease_id,
            disease_name=inference_result["disease_name"],
            severity=inference_result["severity_assessment"],
            confidence=inference_result["confidence"]
        )
        db.add(new_report)
        db.commit()
    except Exception:
        db.rollback()

    return DiagnosisResponse(
        disease_id=disease_id,
        disease_name=advisory_info["disease_name"],
        scientific_name=inference_result["scientific_name"],
        crop_type=inference_result["crop_type"],
        confidence=inference_result["confidence"],
        severity_assessment=inference_result["severity_assessment"],
        symptom_summary=advisory_info["symptom_summary"],
        visual_indicators=inference_result["visual_indicators"],
        alternatives=inference_result["alternatives"],
        advisory_actions=advisory_info["actions"],
        village_risk_level=risk_data["risk_level"],
        village_outbreak_summary=f"{village_name_clean} Panchayat: {risk_data['recommended_village_action']}",
        audio_text_vernacular=advisory_info["audio_text"],
        language=language or "hi"
    )
