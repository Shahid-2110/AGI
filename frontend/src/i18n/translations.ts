export type LanguageCode = 'en' | 'hi' | 'te' | 'mr' | 'ta' | 'kn';

export interface LanguagePack {
  appName: string;
  tagline: string;
  snapPhoto: string;
  selectCrop: string;
  villageRisk: string;
  safeAdvisory: string;
  history: string;
  outbreakRadar: string;
  takePhoto: string;
  uploadPhoto: string;
  trySamplePhotos: string;
  analyzingPlant: string;
  confidenceGauge: string;
  alternativePossibilities: string;
  immediateRemedies: string;
  culturalControl: string;
  organicControl: string;
  callHelpline: string;
  voiceListen: string;
  voiceStop: string;
  voiceRecordHint: string;
  villageOutbreakTitle: string;
  weatherRisk: string;
  highRiskBanner: string;
  mediumRiskBanner: string;
  lowRiskBanner: string;
  offlineModeActive: string;
  cachedAdvisories: string;
  kvkCenter: string;
  farmerCallCenter: string;
  quickDiagnose: string;
  stepByStep: string;
  materialsNeeded: string;
  precaution: string;
  close: string;
  switchLanguage: string;
}

export const TRANSLATIONS: Record<LanguageCode, LanguagePack> = {
  en: {
    appName: "KhetRakshak",
    tagline: "AI Crop Health & Village Outbreak Advisory",
    snapPhoto: "Diagnose Crop",
    selectCrop: "Select Crop",
    villageRisk: "Village Risk",
    safeAdvisory: "Safe Remedies",
    history: "Saved History",
    outbreakRadar: "Outbreak Radar",
    takePhoto: "Open Camera",
    uploadPhoto: "Upload Photo",
    trySamplePhotos: "Instant Live Samples (1-Click Test)",
    analyzingPlant: "Running Multi-Tier Vision Diagnosis...",
    confidenceGauge: "AI Confidence",
    alternativePossibilities: "Alternative Candidates (Calibrated)",
    immediateRemedies: "ICAR Safe Next Actions",
    culturalControl: "1. Cultural & Agronomic",
    organicControl: "2. Biological & Organic",
    callHelpline: "3. Urgent KVK Helpline",
    voiceListen: "Listen to Audio",
    voiceStop: "Stop Audio",
    voiceRecordHint: "Describe symptoms via Voice Note",
    villageOutbreakTitle: "Panchayat Outbreak Alert",
    weatherRisk: "Weather & Humidity Risk",
    highRiskBanner: "HIGH OUTBREAK RISK DETECTED",
    mediumRiskBanner: "MODERATE SPREAD WATCH",
    lowRiskBanner: "NORMAL FIELD HEALTH",
    offlineModeActive: "Offline Mode Active — Viewing Local Cached Data",
    cachedAdvisories: "Offline Saved Diagnoses",
    kvkCenter: "Nearest Krishi Vigyan Kendra",
    farmerCallCenter: "National Kisan Helpline (Toll-Free: 1800-180-1551)",
    quickDiagnose: "Instant Plant Scan",
    stepByStep: "Step-by-Step Vetted Protocol",
    materialsNeeded: "Items Required:",
    precaution: "Safety Precaution:",
    close: "Close",
    switchLanguage: "भाषा / Language"
  },
  hi: {
    appName: "खेत रक्षक (KhetRakshak)",
    tagline: "एआई फसल सुरक्षा एवं ग्राम प्रकोप रडार",
    snapPhoto: "फसल की जांच करें",
    selectCrop: "फसल चुनें",
    villageRisk: "ग्राम जोखिम रडार",
    safeAdvisory: "सुरक्षित उपचार",
    history: "सुरक्षित इतिहास",
    outbreakRadar: "प्रकोप रडार",
    takePhoto: "कैमरा खोलें",
    uploadPhoto: "फोटो अपलोड करें",
    trySamplePhotos: "लाइव नमूने (1-क्लिक टेस्ट)",
    analyzingPlant: "फसल की एआई जांच जारी है...",
    confidenceGauge: "एआई सटीकता",
    alternativePossibilities: "अन्य संभावित रोग",
    immediateRemedies: "ICAR प्रमाणित सुरक्षित कदम",
    culturalControl: "१. कृषि व प्रबंधन उपाय",
    organicControl: "२. जैविक व प्राकृतिक उपचार",
    callHelpline: "३. आपातकालीन कृषि विज्ञान केंद्र",
    voiceListen: "सलाह सुनें (आवाज़)",
    voiceStop: "आवाज़ बंद करें",
    voiceRecordHint: "बोलकर लक्षण बताएं",
    villageOutbreakTitle: "पंचायत स्तर पर प्रकोप चेतावनी",
    weatherRisk: "मौसम व नमी से खतरा",
    highRiskBanner: "ग्राम में गंभीर प्रकोप चेतावनी!",
    mediumRiskBanner: "मध्यम प्रसार चेतावनी — निगरानी रखें",
    lowRiskBanner: "सामान्य स्थिति — नियमित जांच करें",
    offlineModeActive: "ऑफलाइन मोड सक्रिय — सुरक्षित डेटा देख रहे हैं",
    cachedAdvisories: "ऑफलाइन सुरक्षित जांच",
    kvkCenter: "नजदीकी कृषि विज्ञान केंद्र (KVK)",
    farmerCallCenter: "किसान कॉल सेंटर (टोल-फ्री: 1800-180-1551)",
    quickDiagnose: "त्वरित फसल स्कैन",
    stepByStep: "विस्तृत सुरक्षित विधि",
    materialsNeeded: "आवश्यक सामग्री:",
    precaution: "सुरक्षा सावधानी:",
    close: "बंद करें",
    switchLanguage: "भाषा / Language"
  },
  te: {
    appName: "ఖేత్ రక్షక్ (KhetRakshak)",
    tagline: "AI పంట రక్షణ & గ్రామ వ్యాధి వ్యాప్తి హెచ్చరిక",
    snapPhoto: "పంటను పరీక్షించండి",
    selectCrop: "పంట ఎంచుకోండి",
    villageRisk: "గ్రామ ముప్పు రడార్",
    safeAdvisory: "సురక్షిత నివారణలు",
    history: "నిల్వ చరిత్ర",
    outbreakRadar: "తెగుళ్ల రడార్",
    takePhoto: "కెమెరా తీయండి",
    uploadPhoto: "ఫోటో అప్‌లోడ్",
    trySamplePhotos: "నమూనా ఆకులు (1-క్లిక్ టెస్ట్)",
    analyzingPlant: "AI పరీక్ష కొనసాగుతోంది...",
    confidenceGauge: "AI ఖచ్చితత్వం",
    alternativePossibilities: "ఇతర అనుమానిత తెగుళ్లు",
    immediateRemedies: "ICAR సురక్షిత చర్యలు",
    culturalControl: "1. సాగు పద్ధతులు",
    organicControl: "2. సేంద్రీయ / జీవ నియంత్రణ",
    callHelpline: "3. KVK నిపుణుల సహాయం",
    voiceListen: "వాయిస్ వినండి",
    voiceStop: "వాయిస్ ఆపండి",
    voiceRecordHint: "లక్షణాలను మాట్లాడి చెప్పండి",
    villageOutbreakTitle: "గ్రామ పంచాయతీ తెగులు హెచ్చరిక",
    weatherRisk: "వాతావరణం & తేమ ముప్పు",
    highRiskBanner: "గ్రామంలో తెగులు తీవ్రత అధికం!",
    mediumRiskBanner: "మధ్యస్థ వ్యాప్తి — నిఘా ఉంచండి",
    lowRiskBanner: "సాధారణ పరిస్థితి — పర్యవేక్షించండి",
    offlineModeActive: "ఆఫ్‌లైన్ మోడ్ — నిల్వ చేసిన సమాచారం",
    cachedAdvisories: "సేవ్ చేసిన నివేదికలు",
    kvkCenter: "సమీప కృషి విజ్ఞాన కేంద్రం (KVK)",
    farmerCallCenter: "కిసాన్ కాల్ సెంటర్ (ఉచితం: 1800-180-1551)",
    quickDiagnose: "తక్షణ పంట స్కానింగ్",
    stepByStep: "దశలవారీ నివారణ పద్ధతి",
    materialsNeeded: "కావలసినవి:",
    precaution: "ముందస్తు జాగ్రత్త:",
    close: "మూసివేయి",
    switchLanguage: "భాష / Language"
  },
  mr: {
    appName: "खेत रक्षक (KhetRakshak)",
    tagline: "AI पीक आरोग्य व गावपातळीवरील कीड-रोग सल्ला",
    snapPhoto: "पीक तपासणी करा",
    selectCrop: "पीक निवडा",
    villageRisk: "गाव धोका रडार",
    safeAdvisory: "सुरक्षित उपाय",
    history: "जतन इतिहास",
    outbreakRadar: "रोग रडार",
    takePhoto: "कॅमेरा सुरू करा",
    uploadPhoto: "फोटो निवडा",
    trySamplePhotos: "नमुना पाने (१-क्लिक चाचणी)",
    analyzingPlant: "AI द्वारे पीक तपासणी सुरू आहे...",
    confidenceGauge: "AI अचूकता",
    alternativePossibilities: "इतर संभाव्य रोग",
    immediateRemedies: "प्रमाणित सुरक्षित कृती",
    culturalControl: "१. मशागतीय पद्धती",
    organicControl: "२. जैविक व सेंद्रिय नियंत्रण",
    callHelpline: "३. तातडीचा KVK संपर्क",
    voiceListen: "सल्ला ऐका (ऑडिओ)",
    voiceStop: "ऑडिओ थांबवा",
    voiceRecordHint: "लक्षणे बोलून सांगा",
    villageOutbreakTitle: "गावपातळीवरील रोग इशारा",
    weatherRisk: "हवामान व आर्द्रता धोका",
    highRiskBanner: "गावात रोगाचा मोठा प्रादुर्भाव!",
    mediumRiskBanner: "मध्यम प्रसार — नियमित पाहणी करा",
    lowRiskBanner: "सामान्य परिस्थिती — योग्य काळजी घ्या",
    offlineModeActive: "ऑफलाइन मोड सुरू — जतन केलेली माहिती",
    cachedAdvisories: "ऑफलाइन जतन तपासण्या",
    kvkCenter: "नजीकचे कृषी विज्ञान केंद्र (KVK)",
    farmerCallCenter: "किसान कॉल सेंटर (टोल-फ्री: १८००-१८०-१५५१)",
    quickDiagnose: "त्वरित पीक स्कॅन",
    stepByStep: "सविस्तर सुरक्षित पद्धत",
    materialsNeeded: "आवश्यक साहित्य:",
    precaution: "सुरक्षितता दक्षता:",
    close: "बंद करा",
    switchLanguage: "भाषा / Language"
  },
  ta: {
    appName: "கேத் ரக்ஷக் (KhetRakshak)",
    tagline: "AI பயிர் பாதுகாப்பு & கிராம நோய் பரவல் எச்சரிக்கை",
    snapPhoto: "பயிரை சோதிக்கவும்",
    selectCrop: "பயிரைத் தேர்வுசெய்",
    villageRisk: "கிராம அபாய ரேடார்",
    safeAdvisory: "பாதுகாப்பான தீர்வுகள்",
    history: "சேமிக்கப்பட்ட வரலாறு",
    outbreakRadar: "நோய் ரேடார்",
    takePhoto: "கேமரா திறக்க",
    uploadPhoto: "புகைப்படம் பதிவேற்ற",
    trySamplePhotos: "மாதிரி இலைகள் (1-கிளிக் சோதனை)",
    analyzingPlant: "AI பயிர் பரிசோதனை நடைபெறுகிறது...",
    confidenceGauge: "AI துல்லியம்",
    alternativePossibilities: "பிற சாத்தியமான நோய்கள்",
    immediateRemedies: "ICAR அங்கீகரிக்கப்பட்ட வழிகாட்டுதல்",
    culturalControl: "1. உழவியல் முறைகள்",
    organicControl: "2. உயிரியல் & இயற்கை முறை",
    callHelpline: "3. அவசர KVK உதவி எண்",
    voiceListen: "குரல் கேட்க",
    voiceStop: "குரலை நிறுத்த",
    voiceRecordHint: "அறிகுறிகளை பேசி பதிவு செய்யவும்",
    villageOutbreakTitle: "கிராம நோய் எச்சரிக்கை",
    weatherRisk: "வானிலை & ஈரப்பதம் அபாயம்",
    highRiskBanner: "கிராமத்தில் தீவிர நோய் பரவல்!",
    mediumRiskBanner: "மிதமான பரவல் — கவனிக்கவும்",
    lowRiskBanner: "இயல்பான நிலை — தொடர்ந்து கண்காணிக்கவும்",
    offlineModeActive: "ஆஃப்லைன் முறை — சேமிக்கப்பட்ட தகவல்கள்",
    cachedAdvisories: "ஆஃப்லைன் சேமிப்புகள்",
    kvkCenter: "அருகிலுள்ள வேளாண் அறிவியல் மையம் (KVK)",
    farmerCallCenter: "கிசான் உதவி மையம் (1800-180-1551)",
    quickDiagnose: "விரைவான பயிர் ஸ்கேன்",
    stepByStep: "படிப்படியான பாதுகாப்பான முறை",
    materialsNeeded: "தேவையான பொருட்கள்:",
    precaution: "பாதுகாப்பு எச்சரிக்கை:",
    close: "மூடு",
    switchLanguage: "மொழி / Language"
  },
  kn: {
    appName: "ಖೇತ್ ರಕ್ಷಕ್ (KhetRakshak)",
    tagline: "AI ಬೆಳೆ ರಕ್ಷಣೆ & ಗ್ರಾಮ ಮಟ್ಟದ ರೋಗ ಮುನ್ಸೂಚನೆ",
    snapPhoto: "ಬೆಳೆ ತಪಾಸಣೆ ಮಾಡಿ",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    villageRisk: "ಗ್ರಾಮ ಅಪಾಯ ರೇಡಾರ್",
    safeAdvisory: "ಸುರಕ್ಷಿತ ಪರಿಹಾರಗಳು",
    history: "ಉಳಿಸಿದ ಇತಿಹಾಸ",
    outbreakRadar: "ರೋಗ ರೇಡಾರ್",
    takePhoto: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ",
    uploadPhoto: "ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    trySamplePhotos: "ಮಾದರಿ ಎಲೆಗಳು (1-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ)",
    analyzingPlant: "AI ಬೆಳೆ ಪರೀಕ್ಷೆ ನಡೆಯುತ್ತಿದೆ...",
    confidenceGauge: "AI ನಿಖರತೆ",
    alternativePossibilities: "ಇತರ ಸಂಭವನೀಯ ರೋಗಗಳು",
    immediateRemedies: "ICAR ಸುರಕ್ಷಿತ ಕ್ರಮಗಳು",
    culturalControl: "1. ಕೃಷಿ ಪದ್ಧತಿಗಳು",
    organicControl: "2. ಜೈವಿಕ ಮತ್ತು ಸಾವಯವ ನಿಯಂತ್ರಣ",
    callHelpline: "3. ತುರ್ತು ಕೆವಿಕೆ ಸಹಾಯವಾಣಿ",
    voiceListen: "ಧ್ವನಿ ಆಲಿಸಿ",
    voiceStop: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    voiceRecordHint: "ರೋಗ ಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ ತಿಳಿಸಿ",
    villageOutbreakTitle: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ರೋಗ ಎಚ್ಚರಿಕೆ",
    weatherRisk: "ಹವಾಮಾನ ಮತ್ತು ತೇವಾಂಶ ಅಪಾಯ",
    highRiskBanner: "ಗ್ರಾಮದಲ್ಲಿ ತೀವ್ರ ರೋಗದ ಮುನ್ಸೂಚನೆ!",
    mediumRiskBanner: "ಮಧ್ಯಮ ಹರಡುವಿಕೆ — ಜಾಗರೂಕರಾಗಿರಿ",
    lowRiskBanner: "ಸಾಮಾನ್ಯ ಸ್ಥಿತಿ — ನಿರಂತರವಾಗಿ ಪರಿಶೀಲಿಸಿ",
    offlineModeActive: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ — ಸಂಗ್ರಹಿತ ಮಾಹಿತಿ",
    cachedAdvisories: "ಉಳಿಸಲಾದ ವರದಿಗಳು",
    kvkCenter: "ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK)",
    farmerCallCenter: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ಉಚಿತ: 1800-180-1551)",
    quickDiagnose: "ತ್ವರಿತ ಬೆಳೆ ಸ್ಕ್ಯಾನ್",
    stepByStep: "ಹಂತ-ಹಂತದ ಸುರಕ್ಷಿತ ವಿಧಾನ",
    materialsNeeded: "ಅಗತ್ಯ ಸಾಮಗ್ರಿಗಳು:",
    precaution: "ಮುನ್ನೆಚ್ಚರಿಕೆ:",
    close: "ಮುಚ್ಚಿ",
    switchLanguage: "ಭಾಷೆ / Language"
  }
};
