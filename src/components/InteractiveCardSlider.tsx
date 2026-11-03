import React, { useState, useRef, useCallback } from 'react';
import { Check, MoveHorizontal } from 'lucide-react';
import { waterAudio } from './WaterJourneyHero/audioService';

export interface CardSliderData {
  id: string;
  title: string;
  subtitle: string;
  imageWith: string;
  imageWithout: string;
  bullets: string[];
}

interface InteractiveCardSliderProps {
  card: CardSliderData;
}

export const InteractiveCardSlider: React.FC<InteractiveCardSliderProps> = ({ card }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
    waterAudio.playWaterDrop(520 + Math.round((sliderPos / 100) * 180));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col bg-[#071322]/80 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 p-5 sm:p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]">
      {/* Card Header */}
      <div className="mb-4">
        <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
          {card.title}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
          {card.subtitle}
        </p>
      </div>

      {/* Interactive Split Image Comparison Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 mb-5 shadow-inner touch-none"
      >
        {/* Right Base Image: Without Water */}
        <div className="absolute inset-0">
          <img
            src={card.imageWithout}
            alt={`${card.title} - Without Water`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-amber-950/20 pointer-events-none" />
          {/* Amber badge */}
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-[10px] font-mono text-amber-300 font-semibold tracking-wide backdrop-blur-sm shadow-md">
              Without Water
            </span>
          </div>
        </div>

        {/* Left Clipped Image: With Water */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={card.imageWith}
            alt={`${card.title} - With Water`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-cyan-950/15 pointer-events-none" />
          {/* Green badge */}
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-[10px] font-mono text-emerald-300 font-semibold tracking-wide backdrop-blur-sm shadow-md">
              With Water
            </span>
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(34,211,238,0.8)] z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-slate-950/90 border border-cyan-300 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.6)] flex items-center justify-center pointer-events-auto">
            <MoveHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Bullet Points with Cyan Checkmarks */}
      <ul className="space-y-2.5 mt-auto pt-2">
        {card.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-snug">
            <div className="w-4 h-4 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-[0_0_8px_rgba(34,211,238,0.2)]">
              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
            </div>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

