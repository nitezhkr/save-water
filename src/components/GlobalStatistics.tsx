import React from 'react';
import { Users, Droplet, Sprout, Calendar, Info } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  description: string;
  source: string;
  year: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className="w-5 h-5 text-cyan-400" />,
    value: '2.2 Billion',
    description: 'people live in countries with high water stress.',
    source: 'WRI Aqueduct',
    year: '2019',
  },
  {
    icon: <Droplet className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />,
    value: '~25%',
    description: 'of the world\'s population faces extremely high water stress.',
    source: 'WRI Aqueduct',
    year: '2019',
  },
  {
    icon: <Sprout className="w-5 h-5 text-cyan-400" />,
    value: '~70%',
    description: 'of global freshwater is used for agriculture.',
    source: 'FAO (AQUASTAT)',
    year: '2022',
  },
  {
    icon: <Calendar className="w-5 h-5 text-cyan-400" />,
    value: '50%',
    description: 'of the world could face water stress by 2050 if current trends continue.',
    source: 'UN-Water',
    year: '2023',
  },
];

export const GlobalStatistics: React.FC = () => {
  return (
    <div className="pt-12 pb-6 border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Title Label */}
        <div className="lg:col-span-3 pl-2 sm:pl-0">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-tight">
            THE GLOBAL
            <br />
            PICTURE
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
            A closer look at the world&apos;s water challenge.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#0a1829]/90 to-[#071322]/90 border border-cyan-500/20 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                  {s.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {s.value}
                </div>
                <p className="text-xs text-slate-300/90 mt-1.5 leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Source: {s.source} &bull; {s.year}</span>
                <Info className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

