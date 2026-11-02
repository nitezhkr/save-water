import React, { useState } from 'react';
import { waterAudio } from './audioService';
import { Trees, Home } from 'lucide-react';

interface ChoiceComparisonProps {
  onInteract?: () => void;
}

export const ChoiceComparison: React.FC<ChoiceComparisonProps> = ({ onInteract }) => {
  // Active slider perspective: 'nature' or 'life'
  const [activeTab, setActiveTab] = useState<'nature' | 'life'>('nature');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(5, Math.min(rect.width - 5, e.clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    setSliderPos(pct);
    if (onInteract) onInteract();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
    waterAudio.playWaterDrop(520);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const currentWithImage =
    activeTab === 'nature'
      ? '/assets/journey/nature_with_water.jpg'
      : '/assets/journey/life_with_water.jpg';

  const currentWithoutImage =
    activeTab === 'nature'
      ? '/assets/journey/nature_without_water.jpg'
      : '/assets/journey/life_without_water.jpg';

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6 pointer-events-auto">
      {/* 2-Slider Mode Switcher */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => {
            setActiveTab('nature');
            setSliderPos(50);
            waterAudio.playWaterDrop(600);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
            activeTab === 'nature'
              ? 'bg-white text-slate-950 font-bold shadow-lg scale-105'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Trees className="w-3.5 h-3.5" />
          <span>Slider 1: Nature & Rivers</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('life');
            setSliderPos(50);
            waterAudio.playWaterDrop(640);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
            activeTab === 'life'
              ? 'bg-white text-slate-950 font-bold shadow-lg scale-105'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Slider 2: Daily Human Life</span>
        </button>
      </div>

      {/* Main Interactive Before/After Split Card */}
      <div
        className="relative h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl select-none cursor-ew-resize group bg-slate-950"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Layer 1: Right Image (WITH WATER) */}
        <div className="absolute inset-0">
          <img
            src={currentWithImage}
            alt="Life With Water"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay on right */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Right Label (With Water) */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-right z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 max-w-[220px] sm:max-w-xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-widest uppercase font-semibold">
              WITH WATER
            </span>
            <p className="text-white text-xs sm:text-sm font-light mt-1">
              {activeTab === 'nature' ? 'Lush rivers & thriving ecosystems' : 'Purity, hydration & healthy life'}
            </p>
          </div>
        </div>

        {/* Layer 2: Left Image (WITHOUT WATER) clipped by slider */}
        <div
          className="absolute inset-0 transition-none overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={currentWithoutImage}
            alt="Life Without Water"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Left Label (Without Water) */}
          <div className="absolute top-5 left-5 sm:top-6 sm:left-6 text-left z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 max-w-[220px] sm:max-w-xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-300 text-[10px] font-mono tracking-widest uppercase font-semibold">
              WITHOUT WATER
            </span>
            <p className="text-white text-xs sm:text-sm font-light mt-1">
              {activeTab === 'nature' ? 'Cracked parched earth & dead basins' : 'Dry empty taps & severe scarcity'}
            </p>
          </div>
        </div>

        {/* Slider Handle Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center pointer-events-none transition-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center text-xs font-bold tracking-widest border border-white/60">
            <span>‹›</span>
          </div>
        </div>

        {/* Bottom Banner on the card */}
        <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-xs font-mono text-slate-300 pointer-events-none drop-shadow">
          <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
            ← Drag left to reveal drought
          </span>
          <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
            Drag right to reveal abundance →
          </span>
        </div>
      </div>

      {/* Subtext description below */}
      <div className="text-center mt-3 text-xs text-slate-400 font-sans">
        {activeTab === 'nature'
          ? 'Freshwater is finite. When rain basins dry up, entire wilderness ecosystems collapse.'
          : 'A single home uses 140+ litres daily. When the tap stops flowing, daily survival begins.'}
      </div>
    </div>
  );
};
