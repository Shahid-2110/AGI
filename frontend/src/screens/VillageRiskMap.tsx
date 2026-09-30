import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, MapPin, CloudRain, Droplets, Wind, Phone, RefreshCw, Layers, Compass, TrendingUp } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';

interface VillageRiskItem {
  id: string;
  name: string;
  state: string;
  district: string;
  lat: number;
  lon: number;
  primary_crops: string;
  farmer_count: number;
  risk_level: string; // High, Medium, Low
  risk_score: number;
  dominant_threat: string;
  active_reports: number;
  weather: {
    temperature_c: number;
    humidity_pct: number;
    rainfall_mm_24h: number;
    wind_speed_kmh: number;
    fungal_risk_index: string;
    weather_condition: string;
  };
  kvk_contact: string;
  kvk_center: string;
}

interface VillageRiskMapProps {
  currentLang: LanguageCode;
  selectedVillageId: string;
  onSelectVillage: (villageId: string) => void;
}

export const VillageRiskMap: React.FC<VillageRiskMapProps> = ({
  currentLang,
  selectedVillageId,
  onSelectVillage
}) => {
  const t = TRANSLATIONS[currentLang];
  const [villages, setVillages] = useState<VillageRiskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeVillage, setActiveVillage] = useState<VillageRiskItem | null>(null);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/risk/map');
      if (res.ok) {
        const data: VillageRiskItem[] = await res.json();
        setVillages(data);
        const cur = data.find(v => v.id === selectedVillageId) || data[0];
        setActiveVillage(cur || null);
      }
    } catch (e) {
      console.warn("Using offline village cluster fallback", e);
      // High quality fallback
      const fallback: VillageRiskItem[] = [
        {
          id: "VIL-RAMPUR",
          name: "Rampur (रामपुर)",
          state: "Uttar Pradesh",
          district: "Varanasi",
          lat: 25.3176,
          lon: 82.9739,
          primary_crops: "Tomato, Potato, Wheat, Rice",
          farmer_count: 620,
          risk_level: "High",
          risk_score: 78.5,
          dominant_threat: "Tomato Early Blight",
          active_reports: 5,
          weather: {
            temperature_c: 28.5,
            humidity_pct: 84.0,
            rainfall_mm_24h: 3.2,
            wind_speed_kmh: 12.0,
            fungal_risk_index: "High",
            weather_condition: "Monsoon Moisture & High Spore Load"
          },
          kvk_contact: "1800-180-1551",
          kvk_center: "KVK Kashi Vidyapith, Varanasi"
        },
        {
          id: "VIL-KOTHAPALLI",
          name: "Kothapalli (కొత్తపల్లి)",
          state: "Telangana",
          district: "Ranga Reddy",
          lat: 17.2403,
          lon: 78.4294,
          primary_crops: "Cotton, Rice, Maize",
          farmer_count: 480,
          risk_level: "Medium",
          risk_score: 52.0,
          dominant_threat: "Cotton Leaf Curl Virus",
          active_reports: 3,
          weather: {
            temperature_c: 31.0,
            humidity_pct: 72.0,
            rainfall_mm_24h: 0.8,
            wind_speed_kmh: 14.5,
            fungal_risk_index: "Moderate",
            weather_condition: "Warm & Humid"
          },
          kvk_contact: "1800-180-1551",
          kvk_center: "KVK CRIDA, Hyderabad"
        },
        {
          id: "VIL-MANDYA",
          name: "Chikka Mandya (ಚಿಕ್ಕ ಮಂಡ್ಯ)",
          state: "Karnataka",
          district: "Mandya",
          lat: 12.5218,
          lon: 76.8951,
          primary_crops: "Rice, Sugarcane, Tomato",
          farmer_count: 540,
          risk_level: "Medium",
          risk_score: 48.0,
          dominant_threat: "Rice Blast",
          active_reports: 2,
          weather: {
            temperature_c: 27.2,
            humidity_pct: 76.0,
            rainfall_mm_24h: 1.5,
            wind_speed_kmh: 10.0,
            fungal_risk_index: "Moderate",
            weather_condition: "Overcast with Light Rain"
          },
          kvk_contact: "1800-180-1551",
          kvk_center: "KVK V.C. Farm, Mandya"
        },
        {
          id: "VIL-SHINDEWADI",
          name: "Shindewadi (शिंदेवाडी)",
          state: "Maharashtra",
          district: "Pune",
          lat: 18.4088,
          lon: 73.8567,
          primary_crops: "Tomato, Onion, Soybean",
          farmer_count: 390,
          risk_level: "Low",
          risk_score: 22.0,
          dominant_threat: "No Active Outbreak",
          active_reports: 1,
          weather: {
            temperature_c: 26.5,
            humidity_pct: 58.0,
            rainfall_mm_24h: 0.0,
            wind_speed_kmh: 9.0,
            fungal_risk_index: "Low",
            weather_condition: "Clear & Favorable"
          },
          kvk_contact: "1800-180-1551",
          kvk_center: "KVK Baramati, Pune"
        }
      ];
      setVillages(fallback);
      setActiveVillage(fallback[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleVillageSelect = (v: VillageRiskItem) => {
    setActiveVillage(v);
    onSelectVillage(v.id);
  };

  const getRiskBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/50',
          dot: 'bg-red-500',
          label: 'High Outbreak (Red)',
          boxClass: 'risk-gradient-high'
        };
      case 'medium':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          dot: 'bg-amber-400',
          label: 'Moderate Watch (Amber)',
          boxClass: 'risk-gradient-medium'
        };
      default:
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          dot: 'bg-emerald-400',
          label: 'Low / Normal (Green)',
          boxClass: 'risk-gradient-low'
        };
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-1">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Community Crowdsourced Outbreak Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.outbreakRadar}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time multi-village outbreak tracking aggregating farmer sightings + micro-climate humidity risk.
          </p>
        </div>

        <button
          onClick={fetchMapData}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-bold text-slate-300 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Radar</span>
        </button>
      </div>

      {/* Radar Map & Cluster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Outbreak Heatmap Radar (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-5 sm:p-6 border border-emerald-800/40 relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Panchayat Outbreak Radar (15km Radius)
            </span>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500" /> High</span>
              <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400" /> Med</span>
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Low</span>
            </div>
          </div>

          {/* Radar Visualization Canvas */}
          <div className="relative w-full aspect-square max-h-80 sm:max-h-96 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
            
            {/* Concentric Radar Rings */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-500/20" />
            <div className="absolute w-[55%] h-[55%] rounded-full border border-emerald-500/20" />
            <div className="absolute w-[30%] h-[30%] rounded-full border border-emerald-500/25" />
            <div className="absolute w-full h-[1px] bg-emerald-500/15" />
            <div className="absolute h-full w-[1px] bg-emerald-500/15" />

            {/* Rotating Radar Sweep Line */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-green-300 origin-left animate-radar-sweep opacity-70" />
            </div>

            {/* Village Cluster Nodes on Radar */}
            {villages.map((vil, idx) => {
              const isSelected = activeVillage?.id === vil.id;
              const badge = getRiskBadge(vil.risk_level);
              
              // Map simulated coordinates to radar circle
              const positions = [
                { top: '30%', left: '42%' },
                { top: '65%', left: '70%' },
                { top: '75%', left: '28%' },
                { top: '22%', left: '78%' },
                { top: '15%', left: '25%' },
                { top: '48%', left: '82%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <button
                  key={vil.id}
                  onClick={() => handleVillageSelect(vil)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform z-10 ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for high risk */}
                    {vil.risk_level === 'High' && (
                      <div className="absolute w-8 h-8 rounded-full bg-red-500/40 animate-ping" />
                    )}
                    <div className={`w-6 h-6 rounded-full border-2 border-white/80 shadow-lg flex items-center justify-center ${badge.dot}`}>
                      <span className="text-[10px] font-black text-slate-950">{vil.active_reports}</span>
                    </div>
                  </div>

                  <div className={`absolute top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-extrabold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                    isSelected ? 'bg-white text-slate-950' : 'bg-slate-900/90 text-slate-200 border border-slate-700'
                  }`}>
                    {vil.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}

            <div className="absolute bottom-3 left-3 text-[11px] text-slate-500 font-mono">
              Live Geo-Telemetry • Active Panchayats
            </div>
          </div>

          {/* Village Quick Selection List */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {villages.map((v) => {
              const isSelected = activeVillage?.id === v.id;
              const badge = getRiskBadge(v.risk_level);
              return (
                <button
                  key={v.id}
                  onClick={() => handleVillageSelect(v)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/60 shadow-md'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white truncate">{v.name.split(' ')[0]}</span>
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{v.district}</div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Selected Village Deep-Dive (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeVillage ? (
            <div className={`rounded-3xl p-5 sm:p-6 border shadow-2xl space-y-5 ${getRiskBadge(activeVillage.risk_level).boxClass}`}>
              
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeVillage.district}, {activeVillage.state}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{activeVillage.name}</h3>
                </div>

                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskBadge(activeVillage.risk_level).bg}`}>
                  {getRiskBadge(activeVillage.risk_level).label}
                </div>
              </div>

              {/* Threat & Score Bar */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Calculated Outbreak Risk</span>
                  <span className="text-lg font-black text-white">{activeVillage.risk_score} / 100</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeVillage.risk_score >= 65 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                      activeVillage.risk_score >= 35 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                      'bg-gradient-to-r from-emerald-600 to-green-400'
                    }`}
                    style={{ width: `${activeVillage.risk_score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Dominant Threat:</span>
                  <span className="font-bold text-emerald-300">{activeVillage.dominant_threat}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">7-Day Verified Sightings:</span>
                  <span className="font-bold text-white">{activeVillage.active_reports} reports</span>
                </div>
              </div>

              {/* Weather & Spore Proliferation Trigger */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Micro-Climate Risk Factors</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    Spore Index: {activeVillage.weather.fungal_risk_index}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Humidity</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeVillage.weather.humidity_pct}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Rain 24h</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeVillage.weather.rainfall_mm_24h} mm</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Temp</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeVillage.weather.temperature_c}°C</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Condition: {activeVillage.weather.weather_condition}
                </p>
              </div>

              {/* Nearest KVK Help Contact */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeVillage.kvk_center}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs text-slate-300 font-mono">{activeVillage.kvk_contact}</span>
                  <a
                    href="tel:18001801551"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs shadow"
                  >
                    Call KVK
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">Select a village to inspect risk</div>
          )}
        </div>

      </div>

    </div>
  );
};
