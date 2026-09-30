import React from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, Phone, ArrowLeft, Layers, Volume2, Sparkles, AlertOctagon } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';
import { AudioPlayer } from '../components/AudioPlayer';

export interface DiagnosisData {
  disease_id: string;
  disease_name: string;
  scientific_name?: string;
  crop_type: string;
  confidence: number;
  severity_assessment: string;
  symptom_summary: string;
  visual_indicators: string[];
  alternatives: Array<{
    disease_id: string;
    disease_name: string;
    confidence: number;
    description: string;
  }>;
  advisory_actions: Array<{
    tier: string;
    title: string;
    instruction: string;
    precaution: string;
    materials_needed?: string[];
    is_safe_guaranteed?: boolean;
  }>;
  village_risk_level: string;
  village_outbreak_summary: string;
  audio_text_vernacular: string;
  language: string;
}

interface DiagnosisResultProps {
  currentLang: LanguageCode;
  data: DiagnosisData;
  onBackToScan: () => void;
  onViewRemedies: () => void;
  onViewVillageRisk: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  currentLang,
  data,
  onBackToScan,
  onViewRemedies,
  onViewVillageRisk
}) => {
  const t = TRANSLATIONS[currentLang];

  const confidencePct = Math.round(data.confidence * 100);

  const getSeverityBadge = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/50',
          icon: <AlertOctagon className="w-4 h-4 text-red-400" />,
          label: 'Severe Infection'
        };
      case 'medium':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: 'Moderate Infection'
        };
      default:
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
          label: 'Clean / Low Risk'
        };
    }
  };

  const sevInfo = getSeverityBadge(data.severity_assessment);

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToScan}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan Another Plant</span>
        </button>

        {/* Audio Speech Button */}
        <AudioPlayer
          textToSpeak={data.audio_text_vernacular || data.symptom_summary}
          lang={currentLang}
          buttonLabel={t.voiceListen}
        />
      </div>

      {/* Main Diagnostic Showcase Card */}
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Diagnostic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                {data.crop_type}
              </span>
              <div className={`flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-bold border ${sevInfo.bg}`}>
                {sevInfo.icon}
                <span>{sevInfo.label}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {data.disease_name}
            </h2>
            {data.scientific_name && (
              <p className="text-xs sm:text-sm text-emerald-400/90 font-mono italic mt-0.5">
                Pathogen: {data.scientific_name}
              </p>
            )}
          </div>

          {/* Calibrated Confidence Gauge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between bg-slate-900/90 p-3 sm:p-4 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
              {t.confidenceGauge}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-emerald-400">{confidencePct}%</span>
              <span className="text-xs text-slate-500 font-bold">Calibrated</span>
            </div>
          </div>
        </div>

        {/* Symptoms & Visual Indicators */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Identified Symptom Profile
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium mb-4">
            {data.symptom_summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {data.visual_indicators.map((ind, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Village Outbreak Impact Notice */}
        <div 
          onClick={onViewVillageRisk}
          className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer transition-all flex items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              data.village_risk_level === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
              data.village_risk_level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold">Community Sighting Correlation</div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">{data.village_outbreak_summary}</p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-bold shrink-0">Radar &rarr;</span>
        </div>

        {/* Honest Top-3 Alternative Candidates */}
        {data.alternatives && data.alternatives.length > 0 && (
          <div className="pt-2 pb-6 border-b border-slate-800">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.alternativePossibilities}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.alternatives.map((alt, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{alt.disease_name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{alt.description}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0">
                    {Math.round(alt.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA to Safe Remedies */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onViewRemedies}
            className="w-full sm:flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-slate-950" />
            <span>View Step-by-Step Safe Remedies (ICAR)</span>
          </button>

          <a
            href="tel:18001801551"
            className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-red-950/80 hover:bg-red-900/80 border border-red-700/60 text-red-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4 text-red-400" />
            <span>Kisan Helpline (1800-180-1551)</span>
          </a>
        </div>

      </div>

    </div>
  );
};
