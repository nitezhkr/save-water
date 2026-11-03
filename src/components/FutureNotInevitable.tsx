import React, { useState } from 'react';
import { Droplet, RotateCcw, Sprout, Users, CheckCircle2 } from 'lucide-react';

interface Pillar {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tips: string[];
}

const pillars: Pillar[] = [
  {
    id: 'save',
    icon: <Droplet className="w-5 h-5 text-cyan-400" />,
    title: 'Save Water',
    desc: 'Use only what you need.',
    tips: [
      'Turn off the faucet while brushing teeth to save 12 litres per minute.',
      'Install aerators on domestic taps to cut flow by 40% without losing pressure.',
      'Keep showers under 5 minutes to prevent over 30 litres wasted daily.',
    ],
  },
  {
    id: 'reuse',
    icon: <RotateCcw className="w-5 h-5 text-teal-400" />,
    title: 'Reuse & Recycle',
    desc: 'Give water a second life.',
    tips: [
      'Collect water used for rinsing grains and vegetables to hydrate house plants.',
      'Divert AC condenser drainage runoff into balcony herb pots and gardens.',
      'Deploy dual-flush or greywater recycling systems in urban housing.',
    ],
  },
  {
    id: 'protect',
    icon: <Sprout className="w-5 h-5 text-emerald-400" />,
    title: 'Protect Sources',
    desc: 'Keep rivers, lakes and groundwater clean.',
    tips: [
      'Never flush toxic cleaning chemicals or medications into municipal drains.',
      'Support permeable pavements and bioswales to recharge local aquifers.',
      'Participate in community riverbank and lake cleanup drives.',
    ],
  },
  {
    id: 'together',
    icon: <Users className="w-5 h-5 text-cyan-300" />,
    title: 'Act Together',
    desc: 'Small actions, big impact when we do it together.',
    tips: [
      'Advocate for rainwater harvesting mandates in your apartment or neighborhood.',
      'Report municipal leaks and broken mains instantly to local utility boards.',
      'Educate children and schools on water footprint stewardship.',
    ],
  },
];

export const FutureNotInevitable: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <section id="solutions" className="relative py-28 overflow-hidden bg-[#030914]">
      {/* Background Scenic River Valley with Sunrise */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/2050/river_sunrise.jpg"
          alt="Lush River Valley at Sunrise"
          className="w-full h-full object-cover object-center opacity-45 select-none"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/journey/nature_with_water.jpg';
          }}
        />
        {/* Cinematic dark gradients top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-[#030914]/50 to-[#030914]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030914]/60 to-[#030914]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge: THE CHOICE IS OURS */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          THE CHOICE IS OURS
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          But This Future Is{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
            Not Inevitable.
          </span>
        </h2>

        {/* Description */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          With the right actions today, we can keep our rivers flowing, our cities
          thriving and water accessible for everyone.
        </p>

        {/* 4 Frosted Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-left">
          {pillars.map((pillar) => {
            const isSelected = activePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(isSelected ? null : pillar.id)}
                className={`group rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-[0_10px_35px_rgba(34,211,238,0.25)] scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:-translate-y-1'
                }`}
              >
                {/* Glowing Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                  {pillar.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.desc}
                </p>

                {/* Expandable Tips Preview */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400">
                  <span>{isSelected ? 'Hide Practical Tips' : 'View Action Tips'}</span>
                  <span>{isSelected ? '▲' : '▼'}</span>
                </div>

                {isSelected && (
                  <div className="mt-4 space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300 animate-in fade-in duration-200">
                    {pillar.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

