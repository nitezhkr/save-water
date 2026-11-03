import React from 'react';
import { Heart, GraduationCap, Sprout, Globe, Sparkles } from 'lucide-react';

export const BiggerPicture: React.FC = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'Health & Well-being',
      description: 'Clean water prevents diseases and builds healthier communities.',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Access to water keeps children in school, especially girls.',
    },
    {
      icon: Sprout,
      title: 'Food & Livelihoods',
      description: 'It powers agriculture and supports millions of jobs.',
    },
    {
      icon: Globe,
      title: 'Nature & Climate',
      description: 'Keeps ecosystems alive and helps communities adapt to climate change.',
    },
  ];

  return (
    <section id="bigger-picture-section" className="relative py-24 px-6 sm:px-10 bg-[#030914] text-white overflow-hidden">
      {/* Background Panoramic Landscape with gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/journey/scene3_rivers.jpg"
          alt="Panoramic River and Mountains"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-[#030914]/80 to-[#030914]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-[0.22em] uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>THE BIGGER PICTURE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight">
            Why{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
              Every Drop
            </span>{' '}
            Matters to the World
          </h2>

          <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Water is more than a basic need — it fuels health, food, education, economies, and life on Earth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#071322]/85 border border-cyan-500/20 hover:border-cyan-400/40 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mt-auto">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

