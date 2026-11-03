import React from 'react';
import { Droplet, Database, AlertTriangle, ArrowRight } from 'lucide-react';

interface Earth2050HeroProps {
  onExperienceClick?: () => void;
  onChangeOutcomeClick?: () => void;
}

export const Earth2050Hero: React.FC<Earth2050HeroProps> = ({
  onExperienceClick,
  onChangeOutcomeClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#030914]"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/2050/hero_bg.png"
          alt="Earth 2050 Water Crisis Cityscape"
          className="w-full h-full object-cover object-top opacity-75 sm:opacity-85 animate-kenburns select-none pointer-events-none"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/2050/hero_bg.jpg';
          }}
        />
        {/* Gradients to blend seamlessly into dark background while preserving artwork */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-[#030914]/25 to-[#030914]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/90 via-[#030914]/50 to-transparent" />
        
        {/* Subtle dystopian warm accent glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl">
          {/* Badge: EARTH 2050 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>EARTH 2050</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
            IT&apos;S 2050.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.3)]">
              WATER IS NO LONGER EVERYWHERE.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed font-normal mb-8 max-w-2xl">
            A world where water is rationed, queues are longer, fields are barren,
            and everyday life has changed. This is not a distant possibility —
            it&apos;s a future we can still prevent.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExperienceClick || (() => scrollTo('day-in-2050'))}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Experience Life in 2050</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onChangeOutcomeClick || (() => scrollTo('solutions'))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700/70 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              <span>Change the Outcome</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating HUD Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900/80 via-[#071324]/85 to-slate-900/80 border border-cyan-500/25 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {/* 1. Daily Allocation */}
            <div className="flex items-center gap-4 pt-2 sm:pt-0 sm:px-4 first:pl-0">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <Droplet className="w-6 h-6 fill-cyan-400/20" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Daily Water Allocation
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    25 L
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ person</span>
                </div>
              </div>
            </div>

            {/* 2. City Reservoir Level */}
            <div className="flex items-center gap-4 pt-3 sm:pt-0 sm:px-6">
              <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Database className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    City Reservoir Level
                  </span>
                  <span className="text-xs text-amber-400 font-bold">08%</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
                    08%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full animate-pulse"
                    style={{ width: '8%' }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Status */}
            <div className="flex items-center gap-4 pt-3 sm:pt-0 sm:px-6 last:pr-0">
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Status
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-red-400 tracking-tight glow-text-red">
                    CRITICAL
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

