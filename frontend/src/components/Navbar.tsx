import React from 'react';
import { Shield, Globe, Phone, Wifi, WifiOff, Volume2 } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isOnline: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  isOnline,
  activeTab,
  onTabChange
}) => {
  const t = TRANSLATIONS[currentLang];

  const languages: { code: LanguageCode; label: string; vernacular: string }[] = [
    { code: 'hi', label: 'Hindi', vernacular: 'हिन्दी' },
    { code: 'te', label: 'Telugu', vernacular: 'తెలుగు' },
    { code: 'mr', label: 'Marathi', vernacular: 'मराठी' },
    { code: 'ta', label: 'Tamil', vernacular: 'தமிழ்' },
    { code: 'kn', label: 'Kannada', vernacular: 'ಕನ್ನಡ' },
    { code: 'en', label: 'English', vernacular: 'English' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-900/40 px-3 sm:px-6 py-2.5 sm:py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => onTabChange('capture')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                KhetRakshak <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">AI</span>
              </h1>
            </div>
            <p className="text-[11px] text-emerald-400/90 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Online / Offline status */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${
            isOnline 
              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
              : 'bg-amber-950/80 text-amber-300 border-amber-800/80 animate-pulse'
          }`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden md:inline">{isOnline ? 'Cloud Synced' : 'Offline Mode'}</span>
          </div>

          {/* Emergency Kisan Call Centre Hotline */}
          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-red-600/30 to-amber-600/20 border border-red-500/40 hover:border-red-500 text-red-200 rounded-lg text-xs font-bold transition-all shadow-sm group"
            title="National Kisan Helpline (Toll-Free)"
          >
            <Phone className="w-3.5 h-3.5 text-red-400 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Kisan Helpline:</span>
            <span className="text-amber-300">1800-180-1551</span>
          </a>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500 rounded-lg px-2 py-1.5 shadow-inner">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-100 outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-white py-1">
                    {l.vernacular} ({l.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
