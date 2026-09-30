export interface CachedDiagnosis {
  id: string;
  timestamp: number;
  disease_id: string;
  disease_name: string;
  crop_type: string;
  confidence: number;
  severity: string;
  symptoms: string;
  image_preview?: string;
  advisory_actions: Array<{
    tier: string;
    title: string;
    instruction: string;
    precaution: string;
    materials_needed?: string[];
  }>;
  village_risk_level: string;
  audio_text?: string;
}

const STORAGE_KEY = 'khetrakshak_offline_history';
const MAX_CACHED_ITEMS = 25;

export const getOfflineDiagnoses = (): CachedDiagnosis[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveDiagnosisOffline = (diagnosis: Omit<CachedDiagnosis, 'id' | 'timestamp'>): CachedDiagnosis => {
  const current = getOfflineDiagnoses();
  const newItem: CachedDiagnosis = {
    ...diagnosis,
    id: 'DIAG-' + Date.now(),
    timestamp: Date.now(),
  };

  const updated = [newItem, ...current].slice(0, MAX_CACHED_ITEMS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Storage quota exceeded", e);
  }
  return newItem;
};

export const clearOfflineDiagnoses = () => {
  localStorage.removeItem(STORAGE_KEY);
};
