import React, { useState } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { LiveWaterOverlay } from './LiveWaterOverlay';
import { waterAudio } from './WaterJourneyHero/audioService';

interface Earth2050HeroProps {
  onExperienceClick?: () => void;
  onChangeOutcomeClick?: () => void;
}

export const Earth2050Hero: React.FC<Earth2050HeroProps> = () => {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const toggleSound = () => {
    const active = waterAudio.toggleAudio();
    setIsAudioActive(active);
    if (active) {
      waterAudio.playWaterDrop(600);
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById('day-in-2050');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#030914] select-none"
    >
      {/* 1. Full-Width Edge-to-Edge Image (Recommended size: 1920x1080) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/water_desert_widescreen.jpg"
          alt="Water and Desert Split Contrast"
          className="w-full h-full object-cover object-center block"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/water_desert_split.jpg';
          }}
        />

        {/* Soft edge darkening for cinematic immersion */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#030914]/25 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030914] via-[#030914]/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. Full-Width Interactive Live Animated Water Layer (Top ~46% of screen) */}
      <LiveWaterOverlay />

      {/* 3. Ambient Audio Control (Top Right) */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-10 z-30 flex items-center gap-3">
        <button
          onClick={toggleSound}
          aria-label={isAudioActive ? 'Mute water ambience' : 'Play water ambience'}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-medium backdrop-blur-md transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span className="hidden sm:inline">Ambience On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300" />
              <span className="hidden sm:inline text-slate-400 group-hover:text-slate-200">
                Water Sound
              </span>
            </>
          )}
        </button>
      </div>

      {/* 4. Elegant Minimalist Floating Title / Tagline */}
      <div className="absolute bottom-10 left-0 right-0 z-20 pointer-events-none text-center px-4">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] mb-0.5">
            EVERY DROP MATTERS
          </span>
          <h1 className="text-base sm:text-xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            WHERE WATER ENDS, LIFE RUNS DRY
          </h1>
        </div>
      </div>

      {/* 5. Scroll Prompt */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to explore"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
      >
        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 group-hover:text-cyan-300 transition-colors">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400/80" />
      </button>
    </section>
  );
};
