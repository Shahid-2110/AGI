export interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  disease_name: string;
  badgeColor: string;
  description: string;
  svgIcon: string;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: "tomato_early_blight",
    name: "Tomato Early Blight",
    crop: "Tomato",
    disease_name: "Alternaria solani",
    badgeColor: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    description: "Target-board concentric rings with yellow halo on lower foliage",
    svgIcon: "🍅"
  },
  {
    id: "potato_late_blight",
    name: "Potato Late Blight",
    crop: "Potato",
    disease_name: "Phytophthora infestans",
    badgeColor: "border-red-500/50 bg-red-500/10 text-red-300",
    description: "Water-soaked spreading black lesions with white fungal edges",
    svgIcon: "🥔"
  },
  {
    id: "rice_blast",
    name: "Rice Blast (Paddy)",
    crop: "Rice",
    disease_name: "Magnaporthe oryzae",
    badgeColor: "border-orange-500/50 bg-orange-500/10 text-orange-300",
    description: "Spindle/eye-shaped lesions with ash-grey center on blades",
    svgIcon: "🌾"
  },
  {
    id: "cotton_leaf_curl",
    name: "Cotton Leaf Curl",
    crop: "Cotton",
    disease_name: "Begomovirus (Whitefly)",
    badgeColor: "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
    description: "Upward cupped leaves, thick veins and enation outgrowths",
    svgIcon: "☁️"
  },
  {
    id: "maize_fall_armyworm",
    name: "Fall Armyworm (FAW)",
    crop: "Maize",
    disease_name: "Spodoptera frugiperda",
    badgeColor: "border-red-500/50 bg-red-500/10 text-red-300",
    description: "Ragged window-pane holes and sawdust-like frass in whorl",
    svgIcon: "🌽"
  },
  {
    id: "healthy_crop",
    name: "Healthy Foliage",
    crop: "General Crop",
    disease_name: "Clean Plant Tissue",
    badgeColor: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    description: "Vibrant green chlorophyll, intact margins, no lesion spots",
    svgIcon: "🌱"
  }
];
