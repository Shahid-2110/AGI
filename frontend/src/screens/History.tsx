import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, WifiOff, CheckCircle, Clock, MapPin, Trash2, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';
import { getOfflineDiagnoses, clearOfflineDiagnoses, CachedDiagnosis } from '../offline/storage';

interface HistoryProps {
  currentLang: LanguageCode;
  onSelectCachedItem: (item: CachedDiagnosis) => void;
}

export const History: React.FC<HistoryProps> = ({
  currentLang,
  onSelectCachedItem
}) => {
  const t = TRANSLATIONS[currentLang];
  const [cachedItems, setCachedItems] = useState<CachedDiagnosis[]>([]);
  const [communityReports, setCommunityReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'offline' | 'community'>('offline');

  useEffect(() => {
    loadCached();
    fetchCommunityReports();
  }, []);

  const loadCached = () => {
    const items = getOfflineDiagnoses();
    setCachedItems(items);
  };

  const fetchCommunityReports = async () => {
    try {
      const res = await fetch('/api/reports/recent?limit=15');
      if (res.ok) {
        const data = await res.json();
        setCommunityReports(data);
      }
    } catch (e) {
      console.warn("Could not fetch community feed", e);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your offline saved history?")) {
      clearOfflineDiagnoses();
      setCachedItems([]);
    }
  };

  const formatDate = (timestamp: number | string) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-1">
            <HistoryIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Persistent Offline Cache & Live Community Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.history}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Review past plant health diagnoses even with zero internet signal, or explore live farmer sightings.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'offline'
                ? 'bg-emerald-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Saved ({cachedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'community'
                ? 'bg-emerald-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Community Feed</span>
          </button>
        </div>
      </div>

      {/* Offline Saved Diagnoses Tab */}
      {activeTab === 'offline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              Cached Advisories Available Locally on Device
            </span>
            {cachedItems.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cache</span>
              </button>
            )}
          </div>

          {cachedItems.length === 0 ? (
            <div className="glass-panel rounded-3xl p-10 text-center border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <HistoryIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Cached Diagnoses Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Any crop scan you perform is automatically saved to your phone's memory so you can access safe remedies anytime offline.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {cachedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectCachedItem(item)}
                  className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between gap-4 group shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-300">{item.crop_type}</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                        {item.disease_name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.symptoms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {Math.round(item.confidence * 100)}% Match
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Community Crowd-sourced Feed Tab */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400">
            Real-Time Verified Sightings Submitted by Neighboring Farmers
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {communityReports.map((rpt, i) => (
              <div key={i} className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2 shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {rpt.village_id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                    rpt.severity === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                    rpt.severity === 'Medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {rpt.severity}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{rpt.disease_name}</h4>
                  <div className="text-xs text-slate-400">Crop: <span className="text-emerald-300 font-semibold">{rpt.crop_type}</span></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Logged by: {rpt.farmer_name}</span>
                  <span className="font-mono">{new Date(rpt.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
