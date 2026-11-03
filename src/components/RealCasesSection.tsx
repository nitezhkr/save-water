import React, { useState } from 'react';
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';

export interface CaseStory {
  id: string;
  location: string;
  country: string;
  title: string;
  shortDesc: string;
  image: string;
  year: string;
  impactStat: string;
  fullStory: string;
  solutionsApplied: string[];
}

const storiesData: CaseStory[] = [
  {
    id: 'chennai',
    location: 'Chennai',
    country: 'India',
    title: "Chennai's Water Crisis",
    shortDesc: 'Ran out of water in 2019, relying on tankers and distant sources.',
    image: '/assets/2050/case_chennai.jpg',
    year: '2019',
    impactStat: '4 reservoirs drained to 0.2% capacity',
    fullStory:
      'In June 2019, Chennai — a metropolis of over 10 million people — declared "Day Zero". Four main reservoirs that supply the city completely dried up after 193 consecutive days without rain. Millions queued under scorching heat for private water tankers, while IT offices advised staff to work from home to save restroom water.',
    solutionsApplied: [
      'Massive rooftop rainwater harvesting mandate',
      'Desalination plants expanded along the Bay of Bengal',
      'Restoration of ancient temple tanks and urban water bodies',
    ],
  },
  {
    id: 'capetown',
    location: 'Cape Town',
    country: 'South Africa',
    title: 'The Day Zero Warning',
    shortDesc: 'The city came close to running out of water in 2018.',
    image: '/assets/2050/case_capetown.jpg',
    year: '2018',
    impactStat: 'Rationed to 50 Litres / person / day',
    fullStory:
      'Cape Town faced a catastrophic three-year drought from 2015 to 2018. Dam levels plummeted below 20%, prompting the municipality to announce a projected date when all municipal taps would be shut off. Through collective rationing, high-pressure tariffs, and aggressive leaks containment, citizens reduced water consumption by over 50% and averted catastrophe.',
    solutionsApplied: [
      'Citywide strict 50L per capita daily quota enforced',
      'Invasive alien pine trees removed from catchment basins',
      'Groundwater aquifer recharge projects accelerated',
    ],
  },
  {
    id: 'latur',
    location: 'Latur',
    country: 'India',
    title: 'A City That Ran Dry',
    shortDesc: 'Faced severe water shortage multiple times in the last decade.',
    image: '/assets/2050/case_latur.jpg',
    year: '2016 & Ongoing',
    impactStat: '50-wagon "Jaldoot" trains dispatched',
    fullStory:
      'In the parched Marathwada belt, Latur faced an unprecedented humanitarian emergency in 2016. Ground aquifers were exhausted due to excessive sugarcane farming. The Indian Railways had to run specialized 50-wagon trains, nicknamed "Jaldoot", carrying 2.5 million litres of water per trip across 300 kilometres to prevent mass evacuation.',
    solutionsApplied: [
      'Transition away from water-guzzling sugarcane toward millets',
      'Community watershed check-dams built by local farmers',
      'Subsurface percolation ponds revived across 40 villages',
    ],
  },
];

export const RealCasesSection: React.FC = () => {
  const [activeStory, setActiveStory] = useState<CaseStory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % storiesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + storiesData.length) % storiesData.length);
  };

  return (
    <section id="real-cases" className="py-24 bg-[#030914] relative overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              REAL STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              It&apos;s Already Happening.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-2 max-w-xl">
              Across the world, cities and communities are facing severe water stress today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View All Cases Button */}
            <button
              onClick={() => setActiveStory(storiesData[0])}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-md transition-all"
            >
              <span>View All Cases</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Slider Nav Buttons */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Case"
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Case"
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storiesData.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_rgba(34,211,238,0.18)] hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Image with subtle gradient overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/world-dry/case_india_chennai.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>
                    {story.location}, {story.country}
                  </span>
                </div>

                {/* Top Right Arrow */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500/60 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {story.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-amber-400/90">{story.impactStat}</span>
                  <span className="text-cyan-400 group-hover:underline">Read Story &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {storiesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            <button
              onClick={() => setActiveStory(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {activeStory.location}, {activeStory.country} ({activeStory.year})
              </span>
            </div>

            <h3 id="case-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {activeStory.title}
            </h3>

            <div className="rounded-xl overflow-hidden aspect-video mb-6 border border-slate-800">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stat Callout */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-5">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                <strong>Recorded Impact:</strong> {activeStory.impactStat}
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What Happened
              </h4>
              <p>{activeStory.fullStory}</p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 pt-2">
                Emergency & Long-Term Solutions
              </h4>
              <ul className="space-y-2">
                {activeStory.solutionsApplied.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveStory(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                Close Case
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

