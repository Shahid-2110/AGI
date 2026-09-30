import io
import numpy as np
from PIL import Image
from typing import Dict, Any, List, Tuple

DISEASE_METADATA = {
    "tomato_early_blight": {
        "id": "tomato_early_blight",
        "name": "Tomato Early Blight",
        "scientific_name": "Alternaria solani",
        "crop": "Tomato",
        "indicators": [
            "Concentric dark brown rings ('target board' pattern) on leaf surface",
            "Yellow chlorotic halo surrounding necrotic brown tissue",
            "Lower canopy leaf desiccation and edge curling"
        ],
        "default_confidence": 0.91,
        "typical_alternatives": [
            {"disease_id": "tomato_bacterial_spot", "disease_name": "Tomato Bacterial Spot (Xanthomonas)", "confidence": 0.08, "description": "Small dark water-soaked spots without concentric rings"},
            {"disease_id": "tomato_septoria", "disease_name": "Septoria Leaf Spot", "confidence": 0.04, "description": "Circular lesions with gray center and black specks"}
        ]
    },
    "potato_late_blight": {
        "id": "potato_late_blight",
        "name": "Potato Late Blight",
        "scientific_name": "Phytophthora infestans",
        "crop": "Potato",
        "indicators": [
            "Irregular water-soaked dark lesions spreading rapidly from margins",
            "Pale green halo around expanding lesion border",
            "Under-leaf whitish cottony mildew under high moisture"
        ],
        "default_confidence": 0.89,
        "typical_alternatives": [
            {"disease_id": "potato_early_blight", "disease_name": "Potato Early Blight (Alternaria)", "confidence": 0.09, "description": "Dry concentric rings rather than water-soaked fast decay"},
            {"disease_id": "potato_blackleg", "disease_name": "Blackleg / Soft Rot", "confidence": 0.03, "description": "Stem base inky black rot with wilting"}
        ]
    },
    "rice_blast": {
        "id": "rice_blast",
        "name": "Rice Blast",
        "scientific_name": "Magnaporthe oryzae",
        "crop": "Rice",
        "indicators": [
            "Diamond / spindle-shaped lesions with ash-grey center",
            "Reddish-brown margins across paddy leaf blades",
            "Lesion coalescing causing entire leaf tip collapse"
        ],
        "default_confidence": 0.93,
        "typical_alternatives": [
            {"disease_id": "rice_brown_spot", "disease_name": "Rice Brown Spot (Bipolaris oryzae)", "confidence": 0.07, "description": "Round oval spots with yellow halo across leaf blade"},
            {"disease_id": "rice_sheath_blight", "disease_name": "Sheath Blight (Rhizoctonia)", "confidence": 0.04, "description": "Snakeskin-like grey green lesions on lower sheaths"}
        ]
    },
    "cotton_leaf_curl": {
        "id": "cotton_leaf_curl",
        "name": "Cotton Leaf Curl Virus",
        "scientific_name": "Begomovirus (Whitefly Vector)",
        "crop": "Cotton",
        "indicators": [
            "Upward and inward cupping of cotton leaves",
            "Prominent thickening and darkening of main leaf veins",
            "Enation (leaf-like outgrowths) on lower leaf surface"
        ],
        "default_confidence": 0.88,
        "typical_alternatives": [
            {"disease_id": "cotton_bacterial_blight", "disease_name": "Angular Leaf Spot", "confidence": 0.09, "description": "Angular water-soaked spots bounded by leaf veins"},
            {"disease_id": "cotton_aphid_curling", "disease_name": "Aphid Sap-Feeding Damage", "confidence": 0.04, "description": "Downward leaf curl with sticky honeydew residues"}
        ]
    },
    "maize_fall_armyworm": {
        "id": "maize_fall_armyworm",
        "name": "Fall Armyworm Damage",
        "scientific_name": "Spodoptera frugiperda",
        "crop": "Maize",
        "indicators": [
            "Extensive 'window-paning' and ragged leaf tearing",
            "Deep holes punched into developing whorl leaves",
            "Sawdust-like yellowish-brown frass inside central stem"
        ],
        "default_confidence": 0.94,
        "typical_alternatives": [
            {"disease_id": "maize_stem_borer", "disease_name": "Spotted Stem Borer (Chilo partellus)", "confidence": 0.06, "description": "Pinholes in straight horizontal line across leaves"},
            {"disease_id": "maize_armyworm_general", "disease_name": "Mythimna separata", "confidence": 0.02, "description": "Leaf margin defoliation without deep whorl sawdust"}
        ]
    },
    "healthy_crop": {
        "id": "healthy_crop",
        "name": "Healthy Foliage",
        "scientific_name": "Healthy Plant Tissue",
        "crop": "General Crop",
        "indicators": [
            "Uniform chlorophyll distribution and vibrant green tone",
            "Intact leaf margins free of necrotic lesions",
            "Clean venation without distortion, mildew or pest eggs"
        ],
        "default_confidence": 0.96,
        "typical_alternatives": [
            {"disease_id": "nutrient_deficiency_minor", "disease_name": "Mild Nitrogen Deficiency", "confidence": 0.03, "description": "Very slight pale green hue on oldest leaves"},
            {"disease_id": "sunscald_minor", "disease_name": "Minor Sunscald", "confidence": 0.01, "description": "Light bleaching on extreme sun-exposed tips"}
        ]
    }
}
