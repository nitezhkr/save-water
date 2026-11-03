import React, { useState } from 'react';
import { Users, Home, Sparkles } from 'lucide-react';
import { InteractiveCardSlider, type CardSliderData } from './InteractiveCardSlider';

export const RealityContrast: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'community' | 'home'>('community');

  const communityCards: CardSliderData[] = [
    {
      id: 'community',
      title: 'A Water-Secure Community',
      subtitle: 'Planned use, better health, and a stronger future.',
      imageWith: '/assets/journey/community_with_water.jpg',
      imageWithout: '/assets/journey/community_without_water.jpg',
      bullets: [
        'Reliable water for daily life',
        'Healthier and active families',
        'Better opportunities for children',
        'Stronger and more resilient community',
      ],
    },
    {
      id: 'home',
      title: 'A Water-Smart Home',
      subtitle: 'Simple habits can make a big difference.',
      imageWith: '/assets/journey/life_with_water.jpg',
      imageWithout: '/assets/journey/life_without_water.jpg',
      bullets: [
        'Clean and safe water for the family',
        'A healthier home environment',
        'Supports a greener lifestyle',
        'Reduces daily stress and effort',
      ],
    },
    {
      id: 'impact',
      title: 'The Broader Impact',
      subtitle: 'Water shapes more than just our daily needs.',
      imageWith: '/assets/journey/nature_with_water.jpg',
      imageWithout: '/assets/journey/nature_without_water.jpg',
      bullets: [
        'Supports agriculture and food security',
        'Keeps ecosystems and biodiversity alive',
        'Reduces conflict over resources',
        'Builds a more stable and equal future',
      ],
    },
  ];

  const homeCards: CardSliderData[] = [
    {
      id: 'indoor_smart',
      title: 'A Water-Smart Home',
      subtitle: 'Simple habits can make a big difference.',
      imageWith: '/assets/journey/life_with_water.jpg',
      imageWithout: '/assets/journey/life_without_water.jpg',
      bullets: [
        'Clean and safe water for the family',
        'A healthier home environment',
        'Supports a greener lifestyle',
        'Reduces daily stress and effort',
      ],
    },
    {
      id: 'kitchen_fixtures',
      title: 'Kitchen & Daily Fixtures',
      subtitle: 'Aerated taps and leak prevention save 40% daily.',
      imageWith: '/assets/journey/scene5_homes.jpg',
      imageWithout: '/assets/journey/life_without_water.jpg',
      bullets: [
        'Zero silent tap leaks wasting water',
        'Low-flow aerators that maintain pressure',
        'Reusable greywater for house greenery',
        'Peace of mind during drought seasons',
      ],
    },
    {
      id: 'community_storage',
      title: 'Rooftop Rain Harvesting',
      subtitle: 'Storing monsoon rain guarantees year-round supply.',
      imageWith: '/assets/journey/scene4_reservoirs.jpg',
      imageWithout: '/assets/journey/community_without_water.jpg',
      bullets: [
        'Direct collection from clean rooftop filters',
        'Recharges the underground water table',
        'Independence from costly private water tankers',
        'Buffers against unexpected city shortages',
      ],
    },
  ];

  const displayedCards = activeTab === 'community' ? communityCards : homeCards;

  return (
    <section id="reality-section" className="relative py-20 px-6 sm:px-10 bg-[#030914] text-white overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>THE REALITY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Witness the Contrast.
            <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
              Community & Everyday Home.
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From thriving communities to everyday households, the presence — or absence — of water shapes health, education, opportunity, and overall quality of life.
          </p>

          {/* Level Toggle Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#071322] border border-cyan-500/20 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'community'
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Community Level</span>
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Everyday Home</span>
            </button>
          </div>
        </div>

        {/* 3 Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {displayedCards.map((card) => (
            <InteractiveCardSlider key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};
