import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { waterAudio } from './audioService';



interface ChoiceComparisonProps {
  onInteract?: () => void;
}

export const ChoiceComparison: React.FC<ChoiceComparisonProps> = ({ onInteract }) => {
  // Slider position from 0 to 100 (50 is equal split)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(10, Math.min(rect.width - 10, e.clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    setSliderPos(pct);
    if (onInteract) onInteract();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
    waterAudio.playWaterDrop(580);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6 pointer-events-auto">
      {/* Interactive Drag Comparison Window */}
      <div
        className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none cursor-ew-resize group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Right Side Background: Conservation (Natural / Calm / Cyan Glow) */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-cyan-950/80 to-slate-950 flex flex-col justify-end p-6 md:p-8 text-right">
          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Conscious Conservation
          </div>
          <div className="max-w-xs ml-auto">
            <p className="text-emerald-400 font-mono text-3xl md:text-4xl font-bold tracking-tight">
              +45 <span className="text-lg font-normal text-emerald-200">Litres saved/day</span>
            </p>
            <p className="text-slate-300 text-xs md:text-sm mt-1">
              Turning the tap off while brushing or lathering preserves treated mountain spring water for ecosystems and future generations.
            </p>
          </div>
        </div>

        {/* Left Side Layer: Waste (Amber / Dark / Warning) clipped by slider */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-amber-950/80 to-slate-950 flex flex-col justify-end p-6 md:p-8 text-left transition-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Unattended Running Tap
          </div>
          <div className="max-w-xs">
            <p className="text-rose-400 font-mono text-3xl md:text-4xl font-bold tracking-tight">
              -12 <span className="text-lg font-normal text-rose-200">L/min straight to drain</span>
            </p>
            <p className="text-slate-300 text-xs md:text-sm mt-1">
              Treated municipal water from miles away lost in seconds. Over 17,000 litres squandered annually by a single household habit.
            </p>
          </div>
        </div>

        {/* Vertical Divider Line with Grab Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-30 flex items-center justify-center pointer-events-none transition-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 -ml-0.5 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-bold text-xs tracking-wider border-2 border-cyan-400 animate-pulse-subtle">
            <div className="flex items-center gap-0.5">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Toggles Below */}
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400 px-2 font-mono">
        <button
          onClick={() => {
            setSliderPos(15);
            waterAudio.playWaterDrop(480);
          }}
          className="flex items-center gap-1.5 hover:text-rose-300 transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>Examine The Cost of Waste</span>
        </button>

        <span className="hidden sm:inline text-slate-500">
          Drag slider or tap sides to compare impact
        </span>

        <button
          onClick={() => {
            setSliderPos(85);
            waterAudio.playWaterDrop(720);
          }}
          className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
        >
          <span>Examine The Power of Saving</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
