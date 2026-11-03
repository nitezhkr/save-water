import React, { useState } from 'react';
import { Play, Sparkles, X, AlertTriangle, ShieldCheck, MapPin, Droplets } from 'lucide-react';

export const DayZeroWarning: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="day-zero-section" className="relative py-16 px-6 sm:px-10 bg-[#030914] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Main Card Container */}
        <div className="relative bg-[#071322]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle cyan glow inside top corner */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-[0.22em] uppercase mb-4">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>A CLOSER LOOK</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15]">
                The Day Zero
                <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
                  Warning
                </span>
              </h2>

              <p className="mt-4 text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                A real look at what happens when a city runs out of water — and the lessons it leaves behind.
              </p>

              <button
                onClick={() => setModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Watch the Full Story</span>
                <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950 ml-0.5" />
              </button>
            </div>

            {/* Right Video Thumbnail */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setModalOpen(true)}
                className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/10] sm:aspect-[16/9] group cursor-pointer shadow-2xl"
              >
                <img
                  src="/assets/world-dry/case_india_chennai.jpg"
                  alt="The Day Zero Warning - Tanker Queue"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Animated Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full bg-cyan-400/30 blur-md animate-ping" />
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-950/80 border-2 border-cyan-300 text-white flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.7)] group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    Chennai & Cape Town Water Crises
                  </span>
                  <span className="font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    3:45 MIN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentary Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#071322] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span className="font-sans font-bold text-sm text-white">
                  Documentary Case Study: When The Taps Ran Dry
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video / Visual container */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src="/assets/world-dry/case_india_chennai.jpg"
                alt="Chennai Crisis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 flex flex-col justify-end p-6 sm:p-8">
                <span className="text-cyan-300 font-mono text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Day Zero Reality Check
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  How 4.5 Million People Lived on 20 Litres a Day
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  In 2019, four major reservoirs supplying Chennai dried completely. Millions had to stand in heatwaves for tanker deliveries, learning that proactive conservation is far cheaper than crisis management.
                </p>
              </div>
            </div>

            {/* Story Points */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#050c17] text-xs">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Warning Signal</span>
                </div>
                <p className="text-slate-400">
                  Drought combined with unchecked groundwater extraction depleted local lakes 18 months before catastrophe hit.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Economic Toll</span>
                </div>
                <p className="text-slate-400">
                  Businesses, IT corridors, and hospitals paid up to 10× standard tariffs for private water deliveries.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>The Turnaround</span>
                </div>
                <p className="text-slate-400">
                  Rooftop rainwater harvesting mandates and lake restoration revived the aquifer by 45% within three monsoon seasons.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

