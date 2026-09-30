import json
import os
from typing import Dict, Any, Optional

RULES_PATH = os.path.join(os.path.dirname(__file__), "advisory_rules.json")

def load_advisory_rules() -> Dict[str, Any]:
    with open(RULES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

ADVISORY_RULES = load_advisory_rules()

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "हिन्दी (Hindi)",
    "te": "తెలుగు (Telugu)",
    "mr": "मराठी (Marathi)",
    "ta": "தமிழ் (Tamil)",
    "kn": "ಕನ್ನಡ (Kannada)"
}

def get_disease_details(disease_id: str, lang: str = "hi") -> Dict[str, Any]:
    lang = lang if lang in SUPPORTED_LANGUAGES else "hi"
    rule = ADVISORY_RULES.get(disease_id, ADVISORY_RULES.get("healthy_crop"))

    disease_name = rule["names_i18n"].get(lang, rule["names_i18n"].get("en", rule["disease_name"]))
    symptoms = rule["symptoms_i18n"].get(lang, rule["symptoms_i18n"].get("en", ""))

    actions = []
    for tier_key in ["low", "medium", "high"]:
        adv = rule["safe_advisories"][tier_key]
        title = adv["title_i18n"].get(lang, adv["title_i18n"].get("en", ""))
        instr = adv["instruction_i18n"].get(lang, adv["instruction_i18n"].get("en", ""))
        actions.append({
            "tier": adv["tier"],
            "title": title,
            "instruction": instr,
            "precaution": adv.get("precaution", ""),
            "materials_needed": adv.get("materials", []),
            "is_safe_guaranteed": True
        })

    # Prepare spoken audio text for farmers
    if lang == "hi":
        audio_text = f"निरीक्षण परिणाम: {disease_name}। {symptoms} प्राथमिक सलाह: {actions[0]['instruction']}"
    elif lang == "te":
        audio_text = f"పరీక్ష ఫలితం: {disease_name}. {symptoms} ప్రాథమిక సూచన: {actions[0]['instruction']}"
    elif lang == "mr":
        audio_text = f"तपासणी निकाल: {disease_name}. {symptoms} मुख्य सल्ला: {actions[0]['instruction']}"
    elif lang == "ta":
        audio_text = f"பரிசோதனை முடிவு: {disease_name}. {symptoms} முக்கிய வழிகாட்டுதல்: {actions[0]['instruction']}"
    elif lang == "kn":
        audio_text = f"ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶ: {disease_name}. {symptoms} ಪ್ರಾಥಮಿಕ ಸಲಹೆ: {actions[0]['instruction']}"
    else:
        audio_text = f"Diagnosis Result: {disease_name}. {symptoms} Primary Recommendation: {actions[0]['instruction']}"

    return {
        "disease_id": disease_id,
        "disease_name": disease_name,
        "scientific_name": rule.get("scientific_name", ""),
        "crop_type": rule.get("crop", "General"),
        "symptom_summary": symptoms,
        "actions": actions,
        "audio_text": audio_text
    }
