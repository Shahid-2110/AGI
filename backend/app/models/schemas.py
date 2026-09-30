from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class DiagnosisAlternative(BaseModel):
    disease_id: str
    disease_name: str
    confidence: float
    description: str

class SafeAdvisoryAction(BaseModel):
    tier: str # "Cultural (Low)", "Biological/Organic (Medium)", "Expert Helpline (High)"
    title: str
    instruction: str
    precaution: str
    materials_needed: Optional[List[str]] = []
    is_safe_guaranteed: bool = True

class DiagnosisResponse(BaseModel):
    disease_id: str
    disease_name: str
    scientific_name: Optional[str] = None
    crop_type: str
    confidence: float
    severity_assessment: str # Low, Medium, High
    symptom_summary: str
    visual_indicators: List[str]
    alternatives: List[DiagnosisAlternative]
    advisory_actions: List[SafeAdvisoryAction]
    village_risk_level: str # Low, Medium, High
    village_outbreak_summary: str
    audio_text_vernacular: str
    language: str

class VillageRiskFactor(BaseModel):
    factor_name: str
    impact: str # Positive, Warning, Critical
    description: str

class VillageRiskResponse(BaseModel):
    village_id: str
    village_name: str
    district: str
    state: str
    risk_level: str # Low (Green), Medium (Amber), High (Red)
    risk_score: float # 0 to 100
    active_reports_count_7d: int
    dominant_outbreak_threat: str
    vulnerable_crop: str
    weather_summary: Dict[str, Any]
    risk_factors: List[VillageRiskFactor]
    kvk_contact: str
    kvk_center: str
    recommended_village_action: str

class CropReportCreate(BaseModel):
    village_id: str
    farmer_name: Optional[str] = "Kisan Mitra"
    crop_type: str
    disease_id: str
    disease_name: str
    severity: Optional[str] = "Medium"
    confidence: Optional[float] = 0.85
    image_url: Optional[str] = None

class CropReportOut(BaseModel):
    id: int
    village_id: str
    farmer_name: str
    crop_type: str
    disease_id: str
    disease_name: str
    severity: str
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True

class WeatherInfo(BaseModel):
    temperature_c: float
    humidity_pct: float
    rainfall_mm_24h: float
    wind_speed_kmh: float
    fungal_risk_index: str # Low, Moderate, High
    weather_condition: str
