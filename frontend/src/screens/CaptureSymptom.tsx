import React, { useState, useRef } from 'react';
import { Camera, Upload, Mic, MicOff, Sparkles, MapPin, AlertTriangle, ArrowRight, Leaf, ShieldAlert } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';
import { SAMPLE_LEAVES, SampleLeaf } from '../data/sampleLeaves';

interface CaptureSymptomProps {
  currentLang: LanguageCode;
  selectedVillage: string;
  onVillageChange: (villageId: string) => void;
  onStartDiagnosis: (file: File | null, sampleId: string | null, cropHint: string, voiceNoteText: string) => void;
  isLoading: boolean;
  onNavigateToRisk: () => void;
}

export const CaptureSymptom: React.FC<CaptureSymptomProps> = ({
  currentLang,
  selectedVillage,
  onVillageChange,
  onStartDiagnosis,
  isLoading,
  onNavigateToRisk
}) => {
  const t = TRANSLATIONS[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(null);
  const [voiceText, setVoiceText] = useState<string>("");
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);

  // Village list
  const villages = [
    { id: "VIL-RAMPUR", name: "Rampur (रामपुर)", state: "UP", district: "Varanasi", riskBadge: "High (Red)", badgeBg: "bg-red-500/20 text-red-300 border-red-500/40" },
    { id: "VIL-KOTHAPALLI", name: "Kothapalli (కొత్తపల్లి)", state: "Telangana", district: "Ranga Reddy", riskBadge: "Medium (Amber)", badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    { id: "VIL-MANDYA", name: "Mandya (ಚಿಕ್ಕ ಮಂಡ್ಯ)", state: "Karnataka", district: "Mandya", riskBadge: "Medium (Amber)", badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    { id: "VIL-SHINDEWADI", name: "Shindewadi (शिंदेवाडी)", state: "Maharashtra", district: "Pune", riskBadge: "Low (Green)", badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { id: "VIL-BATHINDA", name: "Bhagta Bhaika (ਭਗਤਾ ਭਾਈ ਕਾ)", state: "Punjab", district: "Bathinda", riskBadge: "Low (Green)", badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { id: "VIL-SIRSA", name: "Ding Mandi (डिंग मंडी)", state: "Haryana", district: "Sirsa", riskBadge: "Medium (Amber)", badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  ];

  const currentVillageObj = villages.find(v => v.id === selectedVillage) || villages[0];

  const crops = ["Tomato", "Potato", "Rice / Paddy", "Cotton", "Maize / Corn", "Wheat", "General"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedSample(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSampleClick = (sample: SampleLeaf) => {
    setSelectedSample(sample);
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedCrop(sample.crop);
  };

  const handleVoiceToggle = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice speech recognition is not supported in this browser. Please use text input or standard camera.");
      return;
    }

    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'te' ? 'te-IN' : 'en-IN';

      recognition.onstart = () => setIsRecordingVoice(true);
      recognition.onend = () => setIsRecordingVoice(false);
      recognition.onerror = () => setIsRecordingVoice(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(transcript);
        setIsRecordingVoice(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecordingVoice(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile && !selectedSample) {
      // Default to sample 1 for instant demo
      onStartDiagnosis(null, "tomato_early_blight", selectedCrop, voiceText);
      return;
    }
    onStartDiagnosis(selectedFile, selectedSample ? selectedSample.id : null, selectedCrop, voiceText);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Village Outbreak Intelligence Bar */}
      <div 
        onClick={onNavigateToRisk}
        className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Panchayat Hub</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-bold ${currentVillageObj.badgeBg}`}>
                  {currentVillageObj.riskBadge}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                {currentVillageObj.name}, {currentVillageObj.district} ({currentVillageObj.state})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 group-hover:text-emerald-200 self-end sm:self-auto">
            <span>View Outbreak Radar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Diagnostic Capture Card */}
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-emerald-900/50 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Edge-Calibrated Vision AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.snapPhoto}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Snap a photo of the sick crop foliage or pick from realistic Indian field samples below.
          </p>
        </div>

        {/* Village & Crop Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          
          {/* Village Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select Your Village / Panchayat</span>
            </label>
            <select
              value={selectedVillage}
              onChange={(e) => onVillageChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-sm font-semibold text-white outline-none"
            >
              {villages.map(v => (
                <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                  {v.name} - {v.district}, {v.state} [{v.riskBadge}]
                </option>
              ))}
            </select>
          </div>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.selectCrop}</span>
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-sm font-semibold text-white outline-none"
            >
              {crops.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Camera / Upload Viewport Area */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {previewUrl || selectedSample ? (
            <div className="relative rounded-2xl border-2 border-emerald-500/50 overflow-hidden bg-slate-950 p-4 sm:p-6 text-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Captured Crop Leaf"
                  className="w-full max-h-64 object-contain rounded-xl mx-auto shadow-md"
                />
              ) : selectedSample ? (
                <div className="py-8">
                  <div className="text-6xl mb-3">{selectedSample.svgIcon}</div>
                  <h4 className="text-lg font-bold text-white">{selectedSample.name}</h4>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">{selectedSample.disease_name}</p>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">{selectedSample.description}</p>
                </div>
              ) : null}

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-600"
                >
                  Change Photo
                </button>
                <button
                  onClick={() => { setSelectedFile(null); setSelectedSample(null); setPreviewUrl(null); }}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-xs font-bold text-red-300 border border-red-700/50"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Capture from camera */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/80 border-2 border-dashed border-emerald-600/40 hover:border-emerald-500 text-slate-300 hover:text-white transition-all group shadow-inner"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7 text-emerald-400" />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-white">{t.takePhoto}</span>
                <span className="text-xs text-slate-400 mt-0.5">Capture leaf through mobile camera</span>
              </button>

              {/* Upload file from gallery */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border-2 border-dashed border-slate-700/60 hover:border-emerald-500/60 text-slate-300 hover:text-white transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7 text-slate-300" />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-white">{t.uploadPhoto}</span>
                <span className="text-xs text-slate-400 mt-0.5">Pick JPEG/PNG from gallery</span>
              </button>

            </div>
          )}
        </div>

        {/* Voice Symptom Note Section */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.voiceRecordHint}</span>
            </label>
            <button
              onClick={handleVoiceToggle}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isRecordingVoice 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900'
              }`}
            >
              {isRecordingVoice ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecordingVoice ? 'Listening (बोलो)...' : 'Record Voice (बोलें)'}</span>
            </button>
          </div>
          <input
            type="text"
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            placeholder="e.g. पत्तियों पर काले छल्ले बने हैं, पत्तियां पीली पड़कर गिर रही हैं..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
          />
        </div>

        {/* Instant Live 1-Click Samples */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.trySamplePhotos}</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold">1-Tap Live Test</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {SAMPLE_LEAVES.map((leaf) => {
              const isSelected = selectedSample?.id === leaf.id;
              return (
                <button
                  key={leaf.id}
                  onClick={() => handleSampleClick(leaf)}
                  className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/60 shadow-lg ring-1 ring-emerald-400'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-2xl">{leaf.svgIcon}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${leaf.badgeColor}`}>
                      {leaf.crop}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{leaf.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{leaf.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnose CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>{t.analyzingPlant}</span>
            </div>
          ) : (
            <>
              <span>{t.quickDiagnose}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </>
          )}
        </button>

      </div>

    </div>
  );
};
