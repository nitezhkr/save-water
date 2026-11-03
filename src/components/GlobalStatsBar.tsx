import React from 'react';
import { Droplets, Users, Sprout, Globe } from 'lucide-react';

export const GlobalStatsBar: React.FC = () => {
  const stats = [
    {
      icon: Droplets,
      value: '2.4B',
      label: 'People face water stress',
    },
    {
      icon: Users,
      value: '1 in 3',
      label: 'Live without safe water',
    },
    {
      icon: Sprout,
      value: '~70%',
      label: 'Of freshwater is used in agriculture',
    },
    {
      icon: Globe,
      value: 'By 2050',
      label: 'Water demand may rise by 30%',
    },
  ];

  return (
    <section className="relative py-8 px-6 sm:px-10 bg-[#030914] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#071322]/80 border border-cyan-500/25 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 sm:gap-4 p-2 sm:p-3 rounded-xl transition-colors hover:bg-white/5"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-light mt-1 leading-snug">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

