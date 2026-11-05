import React, { useState, useEffect, useRef } from 'react';
import {
  Droplet,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
  Compass,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DearFutureLetterSectionProps {
  id?: string;
  onKeepMovementAlive?: () => void;
}

export const DearFutureLetterSection: React.FC<DearFutureLetterSectionProps> = ({
  id = 'dear-future',
  onKeepMovementAlive,
}) => {
  // Scroll reveal progress for letter appearance
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStanza, setActiveStanza] = useState<number>(3); // 1, 2, or 3 (defaults to fully revealed if scrolled)

  // Interactive dry-to-green transformation slider (0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(55);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Share state
  const [copied, setCopied] = useState<boolean>(false);

  // Track scroll position inside the section to gradually illuminate the letter
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the section the user has scrolled
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Gradually illuminate stanzas as user scrolls through
      if (progress < 0.25) {
        setActiveStanza(1);
      } else if (progress < 0.5) {
        setActiveStanza(2);
      } else {
        setActiveStanza(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic glide animation for visual landscape transition
  useEffect(() => {
    if (!isAutoPlaying) return;
    let step = 0.5;
    let current = sliderPosition;

    const interval = setInterval(() => {
      current += step;
      if (current >= 95) {
        step = -0.5;
      } else if (current <= 5) {
        step = 0.5;
      }
      setSliderPosition(current);
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderPosition]);

  // Drag interaction for landscape transition slider
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsAutoPlaying(false);
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleSliderMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // CTA Click: Keep the Movement Alive
  const handleKeepMovementAlive = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#2dd4bf', '#fbbf24', '#ffffff', '#38bdf8'],
    });

    if (onKeepMovementAlive) {
      onKeepMovementAlive();
    } else {
      const pledgeEl = document.getElementById('pledge');
      if (pledgeEl) {
        pledgeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Share Letter Handler
  const handleShareLetter = async () => {
    const letterContent = `DEAR FUTURE GENERATION...\n\n"We hope you never have to fight for a glass of clean water.\nWe hope rivers still flow, forests still breathe, and every child knows that water is not a luxury.\nWe had a choice. We hope we made the right one."\n\nTHE FUTURE IS IN OUR HANDS.\n${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Letter to Future Generations — Every Drop',
          text: letterContent,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(letterContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label="A Letter to the Future Generation"
      className="relative py-28 sm:py-36 overflow-hidden bg-[#020611] text-white selection:bg-cyan-500 selection:text-white"
    >
      {/* 1. Beautiful Earth-at-Sunrise Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/assets/letter/earth_sunrise_letter.jpg"
          alt="Planet Earth from orbit at radiant sunrise"
          className="w-full h-full object-cover object-center opacity-85 transition-transform duration-1000 scale-[1.02]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/earth_globe_bg.jpg';
          }}
        />

        {/* Cinematic deep-space darkening gradient from top */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#030914] via-[#020611]/80 to-transparent" />

        {/* Ambient sunrise horizon glow in the center */}
        <div className="absolute inset-0 bg-radial-[at_50%_70%] from-cyan-500/15 via-transparent to-[#020611]/80" />

        {/* Soft bottom vignette into footer */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020611] via-[#020611]/90 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Letter Head Wax Seal & Time Capsule Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 backdrop-blur-xl uppercase shadow-[0_0_20px_rgba(34,211,238,0.25)] mb-6 animate-pulse">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>TIME CAPSULE · LETTER FROM 2026 TO 2050</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none font-serif">
            &ldquo;DEAR FUTURE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">
              GENERATION...&rdquo;
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mt-4 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </div>

        {/* 2. Large Letter Appearing Gradually As Visitors Scroll */}
        <div className="relative rounded-3xl border border-cyan-500/30 bg-[#040e1b]/80 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Subtle water droplet embossed watermark */}
          <div className="absolute -top-16 -right-16 w-80 h-80 opacity-5 pointer-events-none">
            <Droplet className="w-full h-full text-cyan-300 stroke-[0.5]" />
          </div>

          {/* Letterhead Date & Origin */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-cyan-500/20 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="uppercase tracking-widest font-mono text-[11px] text-cyan-300">
                DISPATCH: PLANET EARTH
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span className="text-cyan-400/90 font-semibold">LETTER UNFOLDED: {Math.round(scrollProgress * 100)}%</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">COORDINATES: 8 BILLION VOICES</span>
            </div>
          </div>

          {/* The Main Poetic Message (3 Key Stanzas that illuminate with scroll) */}
          <div className="space-y-8 sm:space-y-10 text-center sm:text-left">
            {/* Stanza 1 */}
            <div
              className={`transition-all duration-700 p-4 sm:p-6 rounded-2xl border ${
                activeStanza >= 1
                  ? 'bg-cyan-950/30 border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] opacity-100 translate-y-0'
                  : 'bg-transparent border-transparent opacity-40 translate-y-2'
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block mb-2">
                STANZA I · CLEAN WATER
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-cyan-50 leading-relaxed font-light">
                &ldquo;We hope you never have to fight for a glass of clean water.&rdquo;
              </p>
            </div>

            {/* Stanza 2 */}
            <div
              className={`transition-all duration-700 p-4 sm:p-6 rounded-2xl border ${
                activeStanza >= 2
                  ? 'bg-teal-950/30 border-teal-500/30 shadow-[0_0_25px_rgba(45,212,191,0.15)] opacity-100 translate-y-0'
                  : 'bg-transparent border-transparent opacity-40 translate-y-2'
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-widest text-teal-400 block mb-2">
                STANZA II · LIVING NATURE
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/95 leading-relaxed font-light">
                &ldquo;We hope rivers still flow, forests still breathe, and every child knows that water is not a luxury.&rdquo;
              </p>
            </div>

            {/* Stanza 3 */}
            <div
              className={`transition-all duration-700 p-4 sm:p-6 rounded-2xl border ${
                activeStanza >= 3
                  ? 'bg-amber-950/20 border-amber-500/30 shadow-[0_0_25px_rgba(251,191,36,0.12)] opacity-100 translate-y-0'
                  : 'bg-transparent border-transparent opacity-40 translate-y-2'
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 block mb-2">
                STANZA III · THE TURNING POINT
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-amber-100/95 leading-relaxed font-light">
                &ldquo;We had a choice. We hope we made the right one.&rdquo;
              </p>
            </div>
          </div>

          {/* Letter Signoff */}
          <div className="mt-10 pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                <Droplet className="w-5 h-5 fill-cyan-400/40" />
              </div>
              <div className="text-left">
                <span className="text-xs font-serif italic text-slate-300 block">
                  Signed with hope and resolve,
                </span>
                <span className="text-sm font-bold text-white tracking-wide uppercase">
                  The Citizens of Earth (2026)
                </span>
              </div>
            </div>

            {/* Reading Stanza Selector Controls */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-full border border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 px-2 uppercase">Reveal:</span>
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStanza(step)}
                  className={`w-7 h-7 rounded-full text-xs font-mono font-bold transition-all ${
                    activeStanza >= step
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  0{step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Visual Transition from a Dry Landscape into a Green, Thriving World */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase block mb-1">
              THE TRANSFORMATION IN REAL TIME
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              From Scorched Drought to a Flourishing Earth
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
              Drag the interactive slider below to witness how our decisions transform parched cracked ground into a thriving, water-abundant oasis.
            </p>
          </div>

          {/* Before/After Split Viewer Container */}
          <div
            ref={sliderContainerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-ew-resize select-none group"
          >
            {/* Background: 100% Green, Thriving World */}
            <img
              src="/assets/letter/transition_green_16_9.jpg"
              alt="Green thriving river valley 2050"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
            />

            {/* Foreground: Dry Parched Landscape Clipped to sliderPosition */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/assets/letter/transition_dry_16_9.jpg"
                alt="Dry cracked scorched landscape"
                className="absolute inset-0 w-full h-full object-cover object-center select-none"
                style={{
                  width: sliderContainerRef.current
                    ? `${sliderContainerRef.current.clientWidth}px`
                    : '100%',
                  maxWidth: 'none',
                }}
              />
              {/* Subtle sepia/heat haze overlay on the dry side */}
              <div className="absolute inset-0 bg-amber-950/20 mix-blend-color-burn" />
            </div>

            {/* Dynamic Labels */}
            {/* Left label: DRY LANDSCAPE */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Dry Parched Reality</span>
            </div>

            {/* Right label: GREEN THRIVING WORLD */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Green Thriving 2050</span>
            </div>

            {/* Center Slider Divider Bar with glowing cyan handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 z-30 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.9)] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                <span className="select-none tracking-tighter">◀ ▶</span>
              </div>
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/85 border border-cyan-500/40 backdrop-blur-md text-xs shadow-xl">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoPlaying(!isAutoPlaying);
                }}
                className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-semibold transition-colors"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-cyan-400" />
                    <span>Pause Demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-cyan-400" />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <span className="text-slate-600">|</span>

              <span className="font-mono text-slate-300 text-[11px]">
                {Math.round(sliderPosition)}% Scenery Transformed
              </span>

              <span className="text-slate-600">|</span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSliderPosition(50);
                }}
                className="text-slate-400 hover:text-white transition-colors"
                title="Reset to 50/50"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Final Message: "THE FUTURE IS IN OUR HANDS." */}
        <div className="mt-20 sm:mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-amber-300 bg-amber-950/50 border border-amber-500/30 uppercase mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>OUR SACRED COMMITMENT</span>
          </div>

          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            THE FUTURE IS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-200 drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]">
              IN OUR HANDS.
            </span>
          </h3>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Every drop conserved today echoes across decades. The choice is ours, right now.
          </p>

          {/* 5. CTA: KEEP THE MOVEMENT ALIVE */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={handleKeepMovementAlive}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:via-teal-300 hover:to-emerald-300 text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:shadow-[0_0_50px_rgba(34,211,238,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Droplet className="w-4 h-4 fill-slate-950" />
              <span>KEEP THE MOVEMENT ALIVE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Share Letter CTA */}
            <button
              type="button"
              onClick={handleShareLetter}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-slate-900/80 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>LETTER COPIED!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>SHARE THIS LETTER</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DearFutureLetterSection;
