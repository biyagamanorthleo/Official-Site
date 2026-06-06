'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.2;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/sonican-horror-tense-cinematic-fear-score-379388.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all hover:border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
      >
        {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
        {playing && (
          <span className="absolute inset-0 rounded-full border border-red-600/40 animate-ping pointer-events-none" />
        )}
      </button>
    </>
  );
}
