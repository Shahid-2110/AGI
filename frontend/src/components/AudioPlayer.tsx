import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { LanguageCode } from '../i18n/translations';

interface AudioPlayerProps {
  textToSpeak: string;
  lang: LanguageCode;
  buttonLabel?: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  lang,
  buttonLabel,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getLangCode = (l: LanguageCode): string => {
    switch (l) {
      case 'hi': return 'hi-IN';
      case 'te': return 'te-IN';
      case 'mr': return 'mr-IN';
      case 'ta': return 'ta-IN';
      case 'kn': return 'kn-IN';
      default: return 'en-IN';
    }
  };

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = getLangCode(lang);
    utterance.rate = 0.92; // slightly slower for better farmer comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <button
      onClick={handleToggleSpeak}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
        isPlaying
          ? 'bg-amber-500 text-slate-950 animate-pulse border border-amber-300'
          : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40'
      } ${className}`}
      title={isPlaying ? "Stop speech" : "Read aloud in your language"}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-slate-950" />
          <span className="font-extrabold">{buttonLabel || "आवाज़ बंद करें (Stop)"}</span>
          <Radio className="w-3.5 h-3.5 animate-spin" />
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span>{buttonLabel || "सुनिए (Listen)"}</span>
        </>
      )}
    </button>
  );
};
