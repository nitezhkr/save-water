import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Volume2, VolumeX, MoveHorizontal } from 'lucide-react';
import { waterAudio } from './WaterJourneyHero/audioService';

interface WaterHeroProps {
  onExploreClick?: () => void;
  onWatchStoryClick?: () => void;
}

export const WaterHero: React.FC<WaterHeroProps> = ({
  onExploreClick,
  onWatchStoryClick,
}) => {
  const [splitPos, setSplitPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateSplit = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    setSplitPos(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSplit(e.clientX);
    waterAudio.playWaterDrop(520 + Math.round((splitPos / 100) * 160));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSplit(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    const active = waterAudio.toggleAudio();
    setIsAudioActive(active);
  };

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('reality-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="journey-hero"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full min-h-[95vh] lg:min-h-screen flex flex-col justify-between overflow-hidden select-none cursor-ew-resize pt-24 pb-8"
    >
      {/* ================= BACKGROUND SPLIT IMAGERY ================= */}
      {/* Right Image: WITHOUT WATER (Arid Drought Landscape with village woman holding brass water pot) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/journey/community_without_water.jpg"
          alt="Without Water - Arid Landscape"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Warm amber & dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-black/40 to-[#030914]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-color pointer-events-none" />
      </div>

      {/* Left Image: WITH WATER (Lush verdant river with playful children) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
      >
        <img
          src="/assets/journey/community_with_water.jpg"
          alt="With Water - Lush Community"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Cool cyan & dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-black/40 to-[#030914]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-cyan-950/25 mix-blend-color pointer-events-none" />
      </div>

      {/* Draggable Divider Handle Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_20px_rgba(34,211,238,0.9)] z-20 flex flex-col justify-end pb-24 items-center pointer-events-none"
        style={{ left: `${splitPos}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-cyan-400 to-cyan-400/20 opacity-90" />
        {/* Handle Button */}
        <div className="relative pointer-events-auto cursor-ew-resize">
          <div className="w-10 h-10 rounded-full bg-slate-950/90 border-2 border-cyan-300 text-white shadow-[0_0_25px_rgba(0,229,255,0.7)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
            <MoveHorizontal className="w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ================= TOP FLOATING BADGES ================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Left Badge: WITH WATER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-400/40 backdrop-blur-md shadow-xl text-left"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-300 uppercase leading-none">
              With Water
            </span>
            <span className="text-[11px] text-emerald-100/90 font-light mt-0.5 hidden sm:inline">
              Healthier People, Stronger Communities
            </span>
          </div>
        </motion.div>

        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          className="pointer-events-auto hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-black/40 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 backdrop-blur-md transition-all cursor-pointer shadow-lg"
          title="Toggle ambient water audio"
        >
          {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isAudioActive ? 'Sound On' : 'Sound Off'}</span>
        </button>

        {/* Right Badge: WITHOUT WATER */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-amber-950/70 border border-amber-500/40 backdrop-blur-md shadow-xl text-right"
        >
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold tracking-wider text-amber-300 uppercase leading-none">
              Without Water
            </span>
            <span className="text-[11px] text-amber-100/90 font-light mt-0.5 hidden sm:inline">
              Harder Lives, Fewer Opportunities
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        </motion.div>
      </div>

      {/* ================= CENTER HERO CONTENT ================= */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center my-auto pointer-events-none py-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-[1px] w-8 sm:w-12 bg-cyan-400/50" />
          <span className="text-xs sm:text-xs font-mono font-semibold tracking-[0.28em] text-cyan-300 uppercase">
            WATER DEFINES OUR WORLD
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-cyan-400/50" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
        >
          One Resource.
          <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-sky-200">
            Two Very Different Worlds.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 text-slate-200 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          The same resource can create thriving communities or struggling lives. The difference is how we value, use, and protect it.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          {/* Primary CTA */}
          <a
            href="#reality-section"
            onClick={handleExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Explore the Contrast</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Secondary Video CTA */}
          <button
            onClick={onWatchStoryClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 hover:border-cyan-400/60 text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300">
              <Play className="w-3 h-3 fill-cyan-400 text-cyan-400 ml-0.5" />
            </div>
            <span>Watch the Story</span>
          </button>
        </motion.div>
      </div>

      {/* ================= BOTTOM SCROLL INDICATOR ================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center pointer-events-auto pb-4">
        <a
          href="#reality-section"
          onClick={handleExplore}
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <div className="w-6 h-9 rounded-full border-2 border-slate-400/60 group-hover:border-cyan-400/80 flex items-start justify-center p-1.5 transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300">
            Scroll to Explore
          </span>
        </a>
      </div>

      {/* ================= SEAMLESS WATER WAVE DIVIDER ================= */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-20 text-[#030914] preserve-3d"
        >
          <path
            d="M0,45 C320,85 480,10 720,40 C960,70 1120,20 1440,50 L1440,90 L0,90 Z"
            fill="#030914"
          />
          <path
            d="M0,45 C320,85 480,10 720,40 C960,70 1120,20 1440,50"
            stroke="url(#wave-gradient)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};
