import React, { useState } from 'react';
import { ShieldCheck, Leaf, Sprout, Phone, AlertTriangle, ArrowLeft, Check, Layers, AlertCircle, Wrench } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';
import { AudioPlayer } from '../components/AudioPlayer';

interface SafeActionCardProps {
  currentLang: LanguageCode;
  diseaseName: string;
  cropType: string;
  actions: Array<{
    tier: string;
    title: string;
    instruction: string;
    precaution: string;
    materials_needed?: string[];
    is_safe_guaranteed?: boolean;
  }>;
  onBack: () => void;
}

export const SafeActionCard: React.FC<SafeActionCardProps> = ({
  currentLang,
  diseaseName,
  cropType,
  actions,
  onBack
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTierIndex, setActiveTierIndex] = useState<number>(0);

  const getTierIcon = (index: number) => {
    switch (index) {
      case 0: return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 1: return <Sprout className="w-5 h-5 text-amber-400" />;
      default: return <Phone className="w-5 h-5 text-red-400" />;
    }
  };

  const getTierHeaderColor = (index: number) => {
    switch (index) {
      case 0: return 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300';
      case 1: return 'border-amber-500/40 bg-amber-950/30 text-amber-300';
      default: return 'border-red-500/40 bg-red-950/30 text-red-300';
    }
  };

  const currentAction = actions[activeTierIndex] || actions[0];

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Diagnosis</span>
        </button>

        {currentAction && (
          <AudioPlayer
            textToSpeak={`${currentAction.title}. ${currentAction.instruction}. सावधानी: ${currentAction.precaution}`}
            lang={currentLang}
            buttonLabel="Listen Step (सुनें)"
          />
        )}
      </div>

      {/* Hero Banner */}
      <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-emerald-800/40 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>ICAR & Extension Vetted Safety Standards</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Safe Remedial Actions: <span className="text-emerald-400">{diseaseName}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Strict safety guarantee: Chemical pesticide over-dosage is prohibited. Follow structured cultural and biological protocols.
        </p>

        {/* 3 Tier Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-6">
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTierIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                activeTierIndex === idx
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-lg ring-1 ring-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getTierIcon(idx)}
                <span className="text-xs font-bold text-slate-200">
                  {idx === 0 ? t.culturalControl : idx === 1 ? t.organicControl : t.callHelpline}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-300 truncate mt-1">{act.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Remedy Card */}
      {currentAction && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          
          {/* Action Title */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${getTierHeaderColor(activeTierIndex)}`}>
                {getTierIcon(activeTierIndex)}
                <span>{currentAction.tier}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentAction.title}
              </h3>
            </div>

            {activeTierIndex === 2 && (
              <a
                href="tel:18001801551"
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/40 shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>Call 1800-180-1551</span>
              </a>
            )}
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              {t.stepByStep}
            </h4>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              {currentAction.instruction}
            </p>
          </div>

          {/* Materials & Tools Needed */}
          {currentAction.materials_needed && currentAction.materials_needed.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.materialsNeeded}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentAction.materials_needed.map((mat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Precaution Warning */}
          {currentAction.precaution && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-300 block">{t.precaution}</span>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{currentAction.precaution}</p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
