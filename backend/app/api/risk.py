from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from backend.app.models.db import get_db, Village
from backend.app.models.schemas import VillageRiskResponse
from backend.app.risk_engine.aggregator import aggregate_village_reports
from backend.app.risk_engine.weather_client import get_village_weather
from backend.app.risk_engine.scorer import calculate_village_risk

router = APIRouter(prefix="/api/risk", tags=["Village Risk"])

@router.get("/village/{village_id}", response_model=VillageRiskResponse)
async def get_village_risk(village_id: str, db: Session = Depends(get_db)):
    village = db.query(Village).filter(Village.id == village_id).first()
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    agg_data = aggregate_village_reports(db, village_id=village.id)
    weather_data = await get_village_weather(lat=village.lat, lon=village.lon)
    risk = calculate_village_risk(
        village_info={"primary_crops": village.primary_crops},
        agg_data=agg_data,
        weather_data=weather_data
    )

    return VillageRiskResponse(
        village_id=village.id,
        village_name=village.name,
        district=village.district,
        state=village.state,
        risk_level=risk["risk_level"],
        risk_score=risk["risk_score"],
        active_reports_count_7d=risk["active_reports_count_7d"],
        dominant_outbreak_threat=risk["dominant_outbreak_threat"],
        vulnerable_crop=risk["vulnerable_crop"],
        weather_summary=weather_data,
        risk_factors=risk["risk_factors"],
        kvk_contact=village.kvk_contact,
        kvk_center=village.kvk_center,
        recommended_village_action=risk["recommended_village_action"]
    )

@router.get("/map", response_model=List[Dict[str, Any]])
async def get_all_villages_risk_map(db: Session = Depends(get_db)):
    villages = db.query(Village).all()
    results = []

    for v in villages:
        agg = aggregate_village_reports(db, village_id=v.id)
        # Use quick weather estimation for map aggregation
        weather = await get_village_weather(lat=v.lat, lon=v.lon)
        risk = calculate_village_risk(
            village_info={"primary_crops": v.primary_crops},
            agg_data=agg,
            weather_data=weather
        )
        results.append({
            "id": v.id,
            "name": v.name,
            "state": v.state,
            "district": v.district,
            "lat": v.lat,
            "lon": v.lon,
            "primary_crops": v.primary_crops,
            "farmer_count": v.farmer_count,
            "risk_level": risk["risk_level"], # "Low", "Medium", "High"
            "risk_score": risk["risk_score"],
            "dominant_threat": risk["dominant_outbreak_threat"],
            "active_reports": risk["active_reports_count_7d"],
            "weather": weather,
            "kvk_contact": v.kvk_contact,
            "kvk_center": v.kvk_center
        })

    return results
