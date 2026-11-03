import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const ThenVs2050: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="then-vs-2050" className="py-24 bg-[#030914] relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#051122]/40 to-[#030914] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-5">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              THEN vs 2050
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
              The Same Place.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                A Different Time.
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              This is what the world looks like when water is cared for — and
              what it could become if we keep ignoring it.
            </p>

            {/* Presets and Interaction Help */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-400 font-medium">Quick Jump:</span>
              <button
                onClick={() => setSliderPosition(10)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  sliderPosition < 25
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                Today (Lush)
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  sliderPosition >= 40 && sliderPosition <= 60
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                50 / 50 Split
              </button>
              <button
                onClick={() => setSliderPosition(90)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  sliderPosition > 75
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                2050 (Parched)
              </button>
            </div>
          </div>

          {/* Right Column: Before / After Split Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-cyan-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.7)] group"
            >
              {/* Image 2: 2050 Without Water (Right / Underneath) */}
              <div className="absolute inset-0">
                <img
                  src="/assets/journey/nature_without_water.jpg"
                  alt="2050 Without Water"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/2050/compare_2050.jpg';
                  }}
                />
                {/* 2050 Badge Top Right */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/50 backdrop-blur-md flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    2050
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Without Water
                  </span>
                </div>
              </div>

              {/* Image 1: TODAY With Water (Left / Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/assets/journey/nature_with_water.jpg"
                  alt="Today With Water"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/2050/compare_today.jpg';
                  }}
                />
                {/* TODAY Badge Top Left */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-teal-950/80 border border-teal-500/50 backdrop-blur-md flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                    TODAY
                  </span>
                  <span className="text-xs font-semibold text-white">
                    With Water
                  </span>
                </div>
              </div>

              {/* Draggable Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Circular Draggable Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Helper Hint at Bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-950/70 border border-slate-700/60 text-[10px] font-medium text-slate-300 backdrop-blur-md pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                Drag slider to compare
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

