import React from 'react';
import { Mountain, ShieldCheck, HeartHandshake, Globe2, Droplet } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="relative py-28 px-6 bg-[#030914] text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>The Hydrological Truth</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            WHY EVERY DROP <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              MATTERS TO THE WORLD
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Over 71% of our planet is covered by water, yet only <strong>0.5%</strong> is accessible freshwater.
            The drop you run from your faucet today took weeks to condense in mountain peaks and journey across thousands of miles of watersheds.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mountain className="w-7 h-7 text-cyan-400" />
            </div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
              Natural Origin
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
              Alpine Glaciers & Rain
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every drop is formed in high-altitude atmospheric currents. Water is never manufactured; it is a finite planetary heritage recycled over billions of years.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
              Human Ingenuity
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
              Treatment & Aqueducts
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Vast civil networks filter, chlorinate, test, and pump water through hundreds of miles of pressurized conduits so it arrives crystal-clear and safe at your home.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-7 h-7 text-cyan-400" />
            </div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
              Collective Duty
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
              The Power of One Habit
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              When 1,000 households turn off the tap while brushing, over 45,000 litres of clean water remain in local reservoirs every single day.
            </p>
          </div>
        </div>

        {/* Highlight Quote Banner */}
        <div className="relative rounded-3xl overflow-hidden glass-panel p-10 md:p-14 border border-cyan-500/30 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-cyan-900/20 to-blue-950/40 pointer-events-none" />
          <Droplet className="w-12 h-12 text-cyan-400 mx-auto mb-6 opacity-60" />
          <blockquote className="relative z-10 font-display text-2xl sm:text-3xl md:text-4xl font-semibold max-w-3xl mx-auto leading-snug text-white">
            “Water is not a consumer good, but a heritage that must be protected, defended and treated as such.”
          </blockquote>
          <p className="mt-4 text-cyan-300 font-mono text-xs uppercase tracking-widest">
            — European Water Framework Directive
          </p>
        </div>
      </div>
    </section>
  );
};
