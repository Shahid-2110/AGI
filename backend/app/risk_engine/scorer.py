from typing import Dict, Any, List
from backend.app.models.schemas import VillageRiskFactor, VillageRiskResponse

def calculate_village_risk(
    village_info: Dict[str, Any],
    agg_data: Dict[str, Any],
    weather_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Computes an explainable, rule-based village outbreak risk score (0-100).
    Components:
      - Report Density & Severity Factor (max 50 pts)
      - Microclimate & Weather Factor (Humidity + Rain) (max 30 pts)
      - Crop Monoculture Vulnerability (max 20 pts)
    """
    report_count = agg_data.get("total_reports_7d", 0)
    weighted_severity = agg_data.get("weighted_severity", 0.0)
    humidity = weather_data.get("humidity_pct", 65.0)
    rain = weather_data.get("rainfall_mm_24h", 0.0)
    dominant_crop = agg_data.get("dominant_crop", "Tomato")

    risk_factors: List[Dict[str, str]] = []

    # 1. Report Density Score (0 - 50)
    report_score = min(50.0, weighted_severity * 6.0)
    if report_count >= 4:
        risk_factors.append({
            "factor_name": "Cluster Sighting Surge",
            "impact": "Critical",
            "description": f"{report_count} verified farmer disease reports logged within 7 days in this panchayat."
        })
    elif report_count >= 2:
        risk_factors.append({
            "factor_name": "Moderate Sighting Activity",
            "impact": "Warning",
            "description": f"{report_count} initial symptoms reported by neighboring farmers."
        })
    else:
        risk_factors.append({
            "factor_name": "Low Sighting Density",
            "impact": "Positive",
            "description": "Minimal pest/disease cases currently reported by local farmers."
        })

    # 2. Weather & Humidity Trigger (0 - 30)
    weather_score = 5.0
    if humidity >= 80 and rain > 1.0:
        weather_score = 30.0
        risk_factors.append({
            "factor_name": "High Humidity & Spore Incubation",
            "impact": "Critical",
            "description": f"Elevated humidity ({humidity}%) and recent rain ({rain}mm) promote rapid fungal spore reproduction."
        })
    elif humidity >= 70:
        weather_score = 18.0
        risk_factors.append({
            "factor_name": "Moderate Moisture Window",
            "impact": "Warning",
            "description": f"Moderate moisture levels ({humidity}%) favor vector and bacterial spread."
        })
    else:
        weather_score = 8.0
        risk_factors.append({
            "factor_name": "Favorable Dry Air",
            "impact": "Positive",
            "description": f"Humidity ({humidity}%) is within safe thresholds, limiting spore proliferation."
        })

    # 3. Crop Exposure Factor (0 - 20)
    primary_crops = village_info.get("primary_crops", "")
    crop_score = 10.0
    if dominant_crop.lower() in primary_crops.lower():
        crop_score = 20.0
        risk_factors.append({
            "factor_name": "High Host Crop Acreage",
            "impact": "Warning",
            "description": f"{dominant_crop} is a dominant crop in this block, facilitating swift field-to-field transmission."
        })
    else:
        risk_factors.append({
            "factor_name": "Crop Diversification Buffer",
            "impact": "Positive",
            "description": "Diverse cropping pattern acts as a natural physical barrier to pest transmission."
        })

    total_score = round(report_score + weather_score + crop_score, 1)
    total_score = max(5.0, min(98.0, total_score))

    # Bucket into Traffic Light
    if total_score >= 65.0:
        risk_level = "High"
        village_action = f"Village Alert: High risk of {agg_data.get('dominant_disease', 'crop')} outbreak. Inspect fields twice daily and avoid flood irrigation."
    elif total_score >= 35.0:
        risk_level = "Medium"
        village_action = f"Moderate Alert: Isolated symptoms noted. Install preventive yellow traps / neem spray across boundary plots."
    else:
        risk_level = "Low"
        village_action = "Normal Status: Routine farm scouting advised. Keep field drains clear."

    return {
        "risk_level": risk_level, # "Low", "Medium", "High"
        "risk_score": total_score,
        "active_reports_count_7d": report_count,
        "dominant_outbreak_threat": agg_data.get("dominant_disease", "None"),
        "vulnerable_crop": dominant_crop,
        "risk_factors": risk_factors,
        "recommended_village_action": village_action
    }
