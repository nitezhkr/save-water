import React, { useState } from 'react';
import { Droplet, Utensils, ShowerHead, Sprout, Info, X } from 'lucide-react';

interface DayCard {
  id: string;
  title: string;
  badge: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  todayNorm: string;
  futureReality: string;
  impactMetric: string;
}

const dayCards: DayCard[] = [
  {
    id: 'drinking',
    title: 'Drinking',
    badge: '5 L / day',
    image: '/assets/2050/drinking.jpg',
    icon: <Droplet className="w-4 h-4 text-cyan-400" />,
    description: 'Measured. Limited. Just enough to survive.',
    todayNorm: 'Clean tap water is taken for granted at virtually zero marginal cost.',
    futureReality: 'Daily hydration is measured by digital ration tokens. Sharing a glass becomes a calculated risk.',
    impactMetric: '-85% hydration availability',
  },
  {
    id: 'cooking',
    title: 'Cooking',
    badge: '6 L / day',
    image: '/assets/2050/cooking.jpg',
    icon: <Utensils className="w-4 h-4 text-cyan-400" />,
    description: 'Every drop is reused. Meals are simple.',
    todayNorm: 'Washing vegetables and boiling pots consume 30+ litres per family meal.',
    futureReality: 'Cooking steam is collected with condenser lids. Grey cooking water is filtered to clean utensils.',
    impactMetric: 'Water reused 3x before disposal',
  },
  {
    id: 'bathing',
    title: 'Bathing',
    badge: '4 L / day',
    image: '/assets/2050/bathing.jpg',
    icon: <ShowerHead className="w-4 h-4 text-cyan-400" />,
    description: 'Quick, restricted showers. No more long baths.',
    todayNorm: 'An 8-minute power shower consumes 65 to 90 litres of fresh treated drinking water.',
    futureReality: 'High-pressure atomized mist showers shut off electronically after 90 seconds.',
    impactMetric: '90-second enforced timer',
  },
  {
    id: 'farming',
    title: 'Farming',
    badge: 'Food Alert',
    image: '/assets/2050/farming.jpg',
    icon: <Sprout className="w-4 h-4 text-cyan-400" />,
    description: 'Fields go dry. Food becomes more expensive.',
    todayNorm: 'Agriculture uses 70% of freshwater withdrawals worldwide without drip efficiency.',
    futureReality: 'Traditional crops fail under dried aquifers. Fresh vegetables become luxury commodities.',
    impactMetric: '4x surge in staple food prices',
  },
];

export const DayIn2050: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<DayCard | null>(null);

  return (
    <section id="day-in-2050" className="py-24 bg-[#030914] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4">
            A DAY IN 2050
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            A Day in 2050
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-2 max-w-xl">
            A glimpse into everyday life when water is scarce.
          </p>
        </div>

        {/* 4 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dayCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_35px_rgba(34,211,238,0.18)] hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/journey/community_without_water.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Right Ration Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  {card.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400/80 transition-colors">
                  <span className="flex items-center gap-1 font-medium">
                    <Info className="w-3 h-3" /> Click to compare
                  </span>
                  <span>2026 vs 2050 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Comparison Modal */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="day2050-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setSelectedCard(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                {selectedCard.icon}
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  2050 RATION BREAKDOWN
                </span>
                <h3 id="day2050-modal-title" className="text-2xl font-bold text-white">
                  {selectedCard.title} &bull; {selectedCard.badge}
                </h3>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video mb-5">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3.5 mb-6 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block mb-1">
                  Today (2026 Baseline)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCard.todayNorm}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                  Projected 2050 Reality
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCard.futureReality}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400">
                Impact Shift: <strong className="text-cyan-400">{selectedCard.impactMetric}</strong>
              </span>
              <button
                onClick={() => setSelectedCard(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

