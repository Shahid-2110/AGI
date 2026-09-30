import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.models.db import CropReport, Village
from typing import Dict, Any, List

def aggregate_village_reports(db: Session, village_id: str, days: int = 7) -> Dict[str, Any]:
    """
    Aggregates recent farmer sightings within the village and finds dominant pathogen clusters.
    """
    cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=days)

    reports = db.query(CropReport).filter(
        CropReport.village_id == village_id,
        CropReport.created_at >= cutoff
    ).all()

    total_reports = len(reports)

    # Count by disease
    disease_counts: Dict[str, int] = {}
    crop_counts: Dict[str, int] = {}
    severity_weights = {"Low": 1.0, "Medium": 2.0, "High": 3.5}
    total_severity_score = 0.0

    for r in reports:
        disease_counts[r.disease_name] = disease_counts.get(r.disease_name, 0) + 1
        crop_counts[r.crop_type] = crop_counts.get(r.crop_type, 0) + 1
        total_severity_score += severity_weights.get(r.severity, 2.0)

    dominant_disease = "No Active Outbreak"
    if disease_counts:
        dominant_disease = max(disease_counts, key=disease_counts.get)

    dominant_crop = "General Crops"
    if crop_counts:
        dominant_crop = max(crop_counts, key=crop_counts.get)

    return {
        "total_reports_7d": total_reports,
        "disease_breakdown": disease_counts,
        "crop_breakdown": crop_counts,
        "dominant_disease": dominant_disease,
        "dominant_crop": dominant_crop,
        "weighted_severity": total_severity_score
    }
