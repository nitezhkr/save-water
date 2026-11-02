import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, Droplets, Volume2, MoveHorizontal } from 'lucide-react';
import { waterAudio } from './audioService';

export interface ComparisonSliderProps {
  id: string;
  title: string;
  subtitle: string;
  categoryBadge: string;
  imageWith: string;
  imageWithout: string;
  labelWith?: string;
  labelWithout?: string;
  summaryWith: string;
  summaryWithout: string;
  bulletsWith: string[];
  bulletsWithout: string[];
  initialPosition?: number; // 0 to 100, default 50
  onInteract?: () => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  id,
  title,
  subtitle,
  categoryBadge,
  imageWith,
  imageWithout,
  labelWith = 'WITH WATER',
  labelWithout = 'WITHOUT WATER',
  summaryWith,
  summaryWithout,
  bulletsWith,
  bulletsWithout,
  initialPosition = 50,
  onInteract,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePositionFromClientX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percentage = Math.round((x / rect.width) * 100);
      setSliderPos(percentage);
      if (onInteract) onInteract();
    },
    [onInteract]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePositionFromClientX(e.clientX);
    waterAudio.playWaterDrop(520 + Math.round((sliderPos / 100) * 180));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer release failure
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
      waterAudio.playWaterDrop(480);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
      waterAudio.playWaterDrop(620);
    }
  };

  const setPreset = (pos: number) => {
    setSliderPos(pos);
    waterAudio.playWaterDrop(pos > 50 ? 640 : 460);
  };

  return (
    <div className="w-full flex flex-col bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md transition-all hover:border-white/20">
      {/* Slider Header Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Droplets className="w-3 h-3" />
              {categoryBadge}
            </span>
            <span className="text-slate-500 text-xs font-mono">
              {sliderPos}% Water / {100 - sliderPos}% Scarcity
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            {subtitle}
          </p>
        </div>

        {/* Quick Jump Comparison Presets */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10 text-xs font-mono">
          <button
            onClick={() => setPreset(15)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              sliderPos <= 20
                ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Reveal Scarcity (Dry Reality)"
          >
            Scarcity
          </button>
          <button
            onClick={() => setPreset(50)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              sliderPos > 20 && sliderPos < 80
                ? 'bg-white/20 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Split 50/50 View"
          >
            50 / 50
          </button>
          <button
            onClick={() => setPreset(85)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              sliderPos >= 80
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Reveal Abundance (With Water)"
          >
            Abundance
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Stage */}
      <div
        ref={containerRef}
        id={id}
        tabIndex={0}
        role="slider"
        aria-label={`${title} comparison slider`}
        aria-valuenow={sliderPos}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none cursor-ew-resize touch-none bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      >
        {/* Layer 1: Background Base Image (WITHOUT WATER - Parched Earth / Drought) */}
        <div className="absolute inset-0">
          <img
            src={imageWithout}
            alt={`${title} - Without Water Scarcity`}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
          />
          {/* Subtle warm ochre / drought vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-950/20 pointer-events-none" />

          {/* Right Label (WITHOUT WATER) */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 pointer-events-none text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {labelWithout}
            </span>
            <p className="text-amber-100/90 text-xs font-light mt-1.5 drop-shadow max-w-[200px] hidden sm:block">
              {summaryWithout}
            </p>
          </div>
        </div>

        {/* Layer 2: Clipped Foreground Image (WITH WATER - Abundance / Life) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={imageWith}
            alt={`${title} - With Water Life`}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
          />
          {/* Subtle verdant / cool water vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-cyan-950/20 pointer-events-none" />

          {/* Left Label (WITH WATER) */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 pointer-events-none text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {labelWith}
            </span>
            <p className="text-emerald-100/90 text-xs font-light mt-1.5 drop-shadow max-w-[200px] hidden sm:block">
              {summaryWith}
            </p>
          </div>
        </div>

        {/* Vertical Divider Line with Glowing Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Animated Glowing Ring & Handle Button */}
          <div className="relative -ml-[1px]">
            {/* Outer pulsating glow ring */}
            <div className="absolute -inset-2.5 rounded-full bg-cyan-400/30 blur-sm animate-pulse" />
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 border-2 border-white text-white shadow-2xl flex items-center justify-center transition-transform ${
                isDragging ? 'scale-110 ring-4 ring-cyan-400/50' : isHovered ? 'scale-105' : 'scale-100'
              }`}
            >
              <MoveHorizontal className="w-4 h-4 text-cyan-300" />
            </div>

            {/* Floating Tag indicating drag */}
            <div
              className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-mono tracking-wider text-slate-300 border border-white/20 backdrop-blur-md pointer-events-none transition-opacity ${
                isHovered || isDragging ? 'opacity-100' : 'opacity-0'
              }`}
            >
              DRAG TO COMPARE
            </div>
          </div>
        </div>

        {/* Bottom Interactive Touch/Mouse Prompt */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">‹</span>
            <span>Reveal With Water</span>
          </span>
          <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
            <span>Reveal Scarcity</span>
            <span className="text-amber-400 font-bold">›</span>
          </span>
        </div>
      </div>

      {/* Dual Reality Key Observation Cards Below */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80">
        {/* Left Observation: Life with Water */}
        <div
          onClick={() => setPreset(80)}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            sliderPos >= 50
              ? 'bg-emerald-950/20 border-emerald-500/30 shadow-lg'
              : 'bg-white/[0.02] border-white/5 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
              Reality With Water
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-light mb-3 leading-relaxed">
            {summaryWith}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {bulletsWith.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Observation: Life Without Water */}
        <div
          onClick={() => setPreset(20)}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            sliderPos < 50
              ? 'bg-amber-950/20 border-amber-500/30 shadow-lg'
              : 'bg-white/[0.02] border-white/5 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
              Reality Without Water
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-light mb-3 leading-relaxed">
            {summaryWithout}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {bulletsWithout.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✕</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
