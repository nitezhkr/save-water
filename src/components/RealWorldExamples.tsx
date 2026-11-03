import React, { useState } from 'react';
import { Droplet, Users, Truck, TrendingDown, Calendar, X, AlertCircle, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  country: string;
  dates: string;
  description: string;
  image: string;
  stat1: {
    icon: React.ReactNode;
    value: string;
    label: string;
  };
  stat2: {
    icon: React.ReactNode;
    value: string;
    label: string;
  };
  fullDetails: {
    causes: string[];
    actionsTaken: string[];
    keyTakeaway: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: 'capetown',
    title: 'Cape Town',
    country: 'SOUTH AFRICA',
    dates: '2015 – 2018',
    description:
      "A severe drought pushed the city close to 'Day Zero', when the taps could have been shut off for millions.",
    image: '/assets/real_cases/cape_town.jpg',
    stat1: {
      icon: <Droplet className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />,
      value: '~87%',
      label: 'drop in reservoir levels',
    },
    stat2: {
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      value: '4 million',
      label: 'people at risk',
    },
    fullDetails: {
      causes: [
        'Three consecutive years of record-breaking low rainfall (1-in-300-year drought).',
        'Over-reliance on six major surface reservoirs fed by mountain runoff.',
        'Rapid urban population growth without proportional storage expansion.',
      ],
      actionsTaken: [
        'Enforced a strict 50 Litres/person/day municipal quota with punitive tariffs.',
        'Removed water-thirsty invasive pine and eucalyptus trees in catchment zones.',
        'Drilled into the Table Mountain Aquifer and built temporary desalination plants.',
      ],
      keyTakeaway:
        'Collective citizen action cut municipal water use by more than 50% in months, successfully averting full shut-off.',
    },
  },
  {
    id: 'chennai',
    title: 'Chennai',
    country: 'INDIA',
    dates: '2019',
    description:
      'The city faced an acute water crisis as major reservoirs ran dry, forcing residents to depend on water tankers.',
    image: '/assets/real_cases/chennai.jpg',
    stat1: {
      icon: <Droplet className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />,
      value: '~50%',
      label: 'drop in water supply',
    },
    stat2: {
      icon: <Truck className="w-4 h-4 text-cyan-400" />,
      value: '4,000+',
      label: 'water tankers daily',
    },
    fullDetails: {
      causes: [
        'Complete failure of the 2018 northeast monsoon followed by 193 rainless days.',
        'Loss of historical wetlands, floodplains, and temple tanks to urban sprawl.',
        'Excessive unmetered borewell extraction depleting coastal aquifers.',
      ],
      actionsTaken: [
        'Dispatched special "water trains" carrying 2.5 million litres daily from Jolarpettai.',
        'Expanded Minjur and Nemmeli sea-water reverse osmosis desalination facilities.',
        'Made rooftop rainwater harvesting mandatory for all residential structures.',
      ],
      keyTakeaway:
        'Wetland preservation and local rainwater recharging are far more sustainable than distant emergency trucking.',
    },
  },
  {
    id: 'lakechad',
    title: 'Lake Chad',
    country: 'AFRICA',
    dates: 'Ongoing',
    description:
      "Once one of Africa's largest freshwater lakes, Lake Chad has shrunk by about 90% since the 1960s, affecting millions of lives.",
    image: '/assets/real_cases/lake_chad.jpg',
    stat1: {
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />,
      value: '~90%',
      label: 'reduction in lake area',
    },
    stat2: {
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      value: '30 million',
      label: 'people affected',
    },
    fullDetails: {
      causes: [
        'Prolonged Sahelian droughts coupled with rising regional evaporation rates.',
        'Massive uncoordinated irrigation diversions from Chari and Logone rivers.',
        'Rapid population growth across Chad, Cameroon, Niger, and Nigeria.',
      ],
      actionsTaken: [
        'Transboundary water charter signed between 6 member states (LCBC).',
        'Introduction of climate-smart agro-ecology and solar drip irrigation.',
        'Feasibility studies on inter-basin water transfer from the Congo basin.',
      ],
      keyTakeaway:
        'When surface water collapses, economic hardship and regional displacement follow immediately.',
    },
  },
  {
    id: 'yemensanaa',
    title: "Sana'a Basin",
    country: 'YEMEN',
    dates: 'Ongoing Crisis',
    description:
      'Decades of unregulated deep drilling have drained fossil aquifers, making Sana’a one of the first world capitals facing total water exhaustion.',
    image: '/assets/real_cases/yemen_sanaa.jpg',
    stat1: {
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      value: '15.3M',
      label: 'in need of water aid',
    },
    stat2: {
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />,
      value: '6–8 m',
      label: 'yearly water table drop',
    },
    fullDetails: {
      causes: [
        'Over-drilling of deep artesian wells driven by thirsty cash-crop cultivation.',
        'Damage to municipal water treatment plants and fuel supply networks.',
        'High evaporation rates and minimal annual natural groundwater recharge.',
      ],
      actionsTaken: [
        'Deploying solar-powered community borehole pumps to replace expensive diesel.',
        'Rehabilitating historical stepped terrace water collection systems in mountain valleys.',
        'Distributing household emergency chlorine water purification packets.',
      ],
      keyTakeaway:
        'Fossil aquifers take millennia to fill; extracting them faster than recharge guarantees municipal collapse.',
    },
  },
  {
    id: 'jordanamman',
    title: 'Jordan Highlands',
    country: 'JORDAN',
    dates: 'Ongoing Scarcity',
    description:
      'Ranked among the most water-poor countries on Earth, municipal tap water is rationed to flow for only 12 to 24 hours once a week.',
    image: '/assets/real_cases/jordan_amman.jpg',
    stat1: {
      icon: <Droplet className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />,
      value: '61 m³',
      label: 'annual water / person',
    },
    stat2: {
      icon: <Truck className="w-4 h-4 text-cyan-400" />,
      value: '1 day/wk',
      label: 'scheduled tap supply',
    },
    fullDetails: {
      causes: [
        'More than 90% of national landmass receives under 200 mm of annual rainfall.',
        'Rapid demographic growth including hosting over 1.3 million regional refugees.',
        'Over-pumping of the Disi fossil aquifer at double sustainable rates.',
      ],
      actionsTaken: [
        'Mandatory rooftop collection tanks on every residential building in Amman.',
        'Pioneering treated wastewater recycling for 100% of Jordan Valley agricultural zones.',
        'Advancing the National Water Carrier mega-project to desalinate Red Sea water.',
      ],
      keyTakeaway:
        'Intermittent supply requires rigorous structural recycling and aggressive pipe network acoustic leak repair.',
    },
  },
];

export const RealWorldExamples: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);

  // Maximum 3 visible cards in carousel view
  const visibleCardsCount = 3;
  const maxStartIndex = Math.max(0, caseStudies.length - visibleCardsCount);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const displayedCases = showAllGrid
    ? caseStudies
    : caseStudies.slice(startIndex, startIndex + visibleCardsCount);

  return (
    <section id="real-cases" className="py-24 bg-[#030914] relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
            <Droplet className="w-3.5 h-3.5 fill-cyan-400/20" />
            <span>REAL WORLD EXAMPLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            It&apos;s Not the Future.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              It&apos;s Happening Now.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
            Across the world, cities and communities are already facing severe water shortages.
          </p>
        </div>

        {/* Carousel & View All Controls Bar */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing</span>
            <strong className="text-cyan-300 font-bold">
              {showAllGrid ? 'All 5 Cases' : `${startIndex + 1}–${startIndex + displayedCases.length} of ${caseStudies.length} Cases`}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Grid vs Carousel */}
            <button
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showAllGrid ? 'Carousel View' : 'View All 5 Cases'}</span>
            </button>

            {/* Prev / Next Buttons */}
            {!showAllGrid && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  aria-label="Previous Cases"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    startIndex === 0
                      ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 cursor-pointer shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex >= maxStartIndex}
                  aria-label="Next Cases"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    startIndex >= maxStartIndex
                      ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 cursor-pointer shadow-sm'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div
          className={`grid gap-6 lg:gap-8 ${
            showAllGrid
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {displayedCases.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a1b2d]/80 via-[#071524]/90 to-[#040e1a]/95 border border-cyan-500/25 p-5 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-cyan-400/60 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 bg-slate-950 border border-slate-800/80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md shadow-md">
                    CASE STUDY
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {item.title}
                </h3>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400 mt-0.5">
                  {item.country}
                </span>

                {/* Date */}
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mt-3 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.dates}</span>
                </div>

                {/* Paragraph */}
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-2.5 mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom 2-Stat Row */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 items-center">
                {/* Stat 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                    {item.stat1.icon}
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                      {item.stat1.value}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {item.stat1.label}
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                    {item.stat2.icon}
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                      {item.stat2.value}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {item.stat2.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator dots */}
        {!showAllGrid && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxStartIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === idx ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            <button
              onClick={() => setSelectedCase(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              {selectedCase.country} &bull; {selectedCase.dates}
            </span>
            <h3 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {selectedCase.title} Case Study
            </h3>

            <div className="rounded-2xl overflow-hidden aspect-video mb-5 border border-slate-800">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 mb-6">
              <div>
                <span className="text-2xl font-black text-cyan-400 block">
                  {selectedCase.stat1.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedCase.stat1.label}
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-400 block">
                  {selectedCase.stat2.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedCase.stat2.label}
                </span>
              </div>
            </div>

            {/* In-depth details */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Key Drivers &amp; Causes
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  {selectedCase.fullDetails.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Emergency &amp; Adaptive Measures
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  {selectedCase.fullDetails.actionsTaken.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-200">
                  <strong>Takeaway:</strong> {selectedCase.fullDetails.keyTakeaway}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
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
