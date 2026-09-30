from fastapi import APIRouter, Query, HTTPException
from typing import Dict, Any
from backend.app.advisory_kb.translator import get_disease_details, ADVISORY_RULES, SUPPORTED_LANGUAGES

router = APIRouter(prefix="/api/advisory", tags=["Advisory Knowledge Base"])

@router.get("/languages")
async def get_languages():
    return SUPPORTED_LANGUAGES

@router.get("/diseases")
async def get_all_diseases():
    return [
        {
            "id": k,
            "crop": v.get("crop"),
            "disease_name": v.get("disease_name"),
            "scientific_name": v.get("scientific_name")
        }
        for k, v in ADVISORY_RULES.items()
    ]

@router.get("/{disease_id}")
async def get_advisory_by_disease(
    disease_id: str,
    lang: str = Query("hi", description="Language code (en, hi, te, mr, ta, kn)")
):
    if disease_id not in ADVISORY_RULES:
        raise HTTPException(status_code=404, detail="Disease ID not found in advisory knowledge base")
    return get_disease_details(disease_id, lang)
