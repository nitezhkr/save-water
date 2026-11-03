import React, { useState } from 'react';
import {
  Droplet,
  Sprout,
  Recycle,
  Trees,
  ArrowRight,
  Check,
  ShowerHead,
  WashingMachine,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface SolutionPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  actionTips: string[];
  realWorldExample: {
    location: string;
    description: string;
  };
}

const solutionPillars: SolutionPillar[] = [
  {
    id: 'harvest',
    number: '01',
    title: 'Harvest Every Drop',
    subtitle: 'Capture rainwater and replenish groundwater.',
    image: '/assets/solutions/solution_01_harvest.jpg',
    icon: Droplet,
    tagline: 'Decentralized Aquifer Recharge & Stormwater Catchment',
    description:
      'Rooftop rainwater collection combined with deep percolation recharge wells captures clean monsoon and storm runoff before it gets contaminated in municipal sewers, directly reviving depleted local water tables.',
    metrics: [
      { label: 'Capture Potential', value: 'Up to 60,000L / yr per roof' },
      { label: 'Aquifer Recharge', value: '+35% local water table' },
      { label: 'Flood Risk Cut', value: '-40% urban street inundation' },
    ],
    actionTips: [
      'Install gutter screens and first-flush diverters on domestic downspouts.',
      'Connect rooftop overflow to gravel-filled percolation pits rather than asphalt.',
      'Equip commercial buildings with sub-surface retention cisterns for landscape irrigation.',
    ],
    realWorldExample: {
      location: 'Chennai & Bangalore, India',
      description:
        'Mandatory rooftop rainwater harvesting regulations helped stabilize plummeting city aquifers and boosted dry-season borewell yields by over 30% across thousands of neighborhoods.',
    },
  },
  {
    id: 'grow',
    number: '02',
    title: 'Grow Smarter',
    subtitle: 'Use efficient irrigation and reduce agricultural water waste.',
    image: '/assets/solutions/solution_02_grow.jpg',
    icon: Sprout,
    tagline: 'Precision IoT Drip Irrigation & Regenerative Agriculture',
    description:
      'Agriculture consumes 70% of global freshwater, with over half lost to evaporation in open flood canals. Precision sub-surface micro-drip networks deliver exact water and nutrient drops directly to plant root zones.',
    metrics: [
      { label: 'Water Savings', value: '50% to 70% vs. flood irrigation' },
      { label: 'Crop Yield Boost', value: '+20% to +35% per hectare' },
      { label: 'Soil Health', value: 'Zero salt encrustation' },
    ],
    actionTips: [
      'Shift from open-furrow flooding to timer-controlled sub-surface drip tapes.',
      'Deploy solar soil-moisture probes to hydrate crops only during night or dawn.',
      'Adopt drought-resilient heritage grains like millets that demand 60% less water.',
    ],
    realWorldExample: {
      location: 'Negev Desert, Israel',
      description:
        'Pioneering precision drip irrigation transformed arid desert sands into flourishing farmland, achieving 90% water application efficiency and global leadership in desert agriculture.',
    },
  },
  {
    id: 'reuse',
    number: '03',
    title: 'Reuse What We Use',
    subtitle: 'Treat wastewater and make water reuse part of everyday life.',
    image: '/assets/solutions/solution_03_reuse.jpg',
    icon: Recycle,
    tagline: 'Circular Reclamation & Advanced Membrane Purification',
    description:
      'Water shouldn’t be used just once. High-efficiency membrane bioreactors, ultra-filtration, and reverse osmosis reclaim urban greywater and industrial wastewater, converting effluent into ultra-pure water that exceeds WHO drinking standards.',
    metrics: [
      { label: 'Reclamation Rate', value: 'Over 90% of used city water' },
      { label: 'River Pollution Cut', value: '-85% direct effluent discharge' },
      { label: 'Energy Recovery', value: 'Net-zero anaerobic biogas generation' },
    ],
    actionTips: [
      'Separate residential greywater (showers, sinks) from blackwater for toilet flushing and gardening.',
      'Incorporate dual-plumbing standards in multi-story residential developments.',
      'Implement closed-loop cooling towers in manufacturing plants to reuse process water.',
    ],
    realWorldExample: {
      location: 'NEWater, Singapore',
      description:
        'Singapore recycles its entire domestic wastewater volume through advanced microfiltration and UV disinfection, supplying up to 40% of the nation’s total water demand.',
    },
  },
  {
    id: 'restore',
    number: '04',
    title: 'Restore Our Water',
    subtitle: 'Protect rivers, wetlands and natural water ecosystems.',
    image: '/assets/solutions/solution_04_restore.jpg',
    icon: Trees,
    tagline: 'Riparian Buffer Restoration & Wetland Preservation',
    description:
      'Wetlands and forested river catchments are Earth’s natural kidneys and flood buffers. Protecting riverbanks with native vegetation filters agricultural runoff, slows erosion, and replenishes natural perennial baseflows.',
    metrics: [
      { label: 'Natural Filtration', value: 'Removes 80% excess nitrates' },
      { label: 'Biodiversity Revival', value: 'Over 300 freshwater species safeguarded' },
      { label: 'Drought Buffer', value: '+45% sustained river dry-season flow' },
    ],
    actionTips: [
      'Replant native riparian trees along riverbanks and lake edges to halt topsoil erosion.',
      'Eliminate single-use plastics and chemical runoff that choke aquatic sanctuaries.',
      'Support legal rights for perennial rivers and wetlands as living ecological entities.',
    ],
    realWorldExample: {
      location: 'Rhine River Clean-up & Re-wilding, Europe',
      description:
        'Multi-nation ecological restoration turned the once biologically dead Rhine into a clean, salmon-friendly European river corridor supplying drinking water to 30 million people.',
    },
  },
];

interface EverydayChoice {
  id: string;
  label: string;
  litersPerYearSavedBillion: number;
  icon: React.ComponentType<{ className?: string }>;
  householdTip: string;
}

// Custom crisp SVGs for Reusable Bottle and Leaking Tap to match design
const ReusableBottleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} stroke-current fill-none stroke-[1.8]`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cap */}
    <rect x="9.5" y="2" width="5" height="3" rx="1" />
    {/* Bottle Body */}
    <path d="M10 5v2.5L7.5 10.5V20a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V10.5L14 7.5V5" />
    {/* Grip stripe */}
    <line x1="9.5" y1="14" x2="14.5" y2="14" />
  </svg>
);

const LeakingTapIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} stroke-current fill-none stroke-[1.8]`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Faucet body */}
    <path d="M3 10h8v4H3z" />
    <path d="M11 10a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v2" />
    <path d="M11 14h6a2 2 0 0 0 2-2v-2" />
    {/* Tap valve handle */}
    <path d="M7 6v4" />
    <path d="M5 6h4" />
    {/* Water drop falling */}
    <path d="M16 16.5a1.5 1.5 0 0 1 3 0c0 1.2-1.5 2.5-1.5 2.5s-1.5-1.3-1.5-2.5z" />
  </svg>
);

const choicesData: EverydayChoice[] = [
  {
    id: 'showers',
    label: 'Shorter Showers',
    litersPerYearSavedBillion: 280,
    icon: ShowerHead,
    householdTip: 'Keeping showers under 4 minutes saves up to 45 liters per person every day.',
  },
  {
    id: 'wash',
    label: 'Full Wash Loads',
    litersPerYearSavedBillion: 220,
    icon: WashingMachine,
    householdTip: 'Running washing machines and dishwashers only when full cuts appliance water by 35%.',
  },
  {
    id: 'plants',
    label: 'Water Your Plants Wisely',
    litersPerYearSavedBillion: 190,
    icon: Sprout,
    householdTip: 'Water early morning or dusk to stop evaporation; repurpose vegetable rinse water.',
  },
  {
    id: 'bottle',
    label: 'Use a Reusable Bottle',
    litersPerYearSavedBillion: 160,
    icon: ReusableBottleIcon,
    householdTip: 'Producing 1 single-use plastic water bottle wastes 3 times more water than it holds.',
  },
  {
    id: 'leaks',
    label: 'Fix Leaking Taps',
    litersPerYearSavedBillion: 250,
    icon: LeakingTapIcon,
    householdTip: 'A single dripping faucet can waste up to 20,000 liters of potable water per year.',
  },
];

interface FutureSolutionsSectionProps {
  id?: string;
}

export const FutureSolutionsSection: React.FC<FutureSolutionsSectionProps> = ({
  id = 'solutions',
}) => {
  // Initial selected state matches the provided design screenshot (Shorter Showers selected: 280 Billion Liters)
  const [selectedChoices, setSelectedChoices] = useState<string[]>(['showers']);
  const [activeModalPillar, setActiveModalPillar] = useState<SolutionPillar | null>(null);

  const toggleChoice = (choiceId: string) => {
    setSelectedChoices((prev) =>
      prev.includes(choiceId) ? prev.filter((item) => item !== choiceId) : [...prev, choiceId]
    );
  };

  // Calculate potential water saved dynamically
  const totalWaterSaved = selectedChoices.reduce((acc, currId) => {
    const found = choicesData.find((c) => c.id === currId);
    return acc + (found ? found.litersPerYearSavedBillion : 0);
  }, 0);

  // Total possible savings if all are selected (1,100 Billion = 1.1 Trillion)
  const maxPossibleSavings = choicesData.reduce((acc, c) => acc + c.litersPerYearSavedBillion, 0);

  // Format stat display
  const totalWaterSavedFormatted =
    totalWaterSaved === 0
      ? '0 Liters'
      : totalWaterSaved >= 1000
      ? `${(totalWaterSaved / 1000).toFixed(2)} Trillion Liters`
      : `${totalWaterSaved} Billion Liters`;

  // Progress percentage (with minimum visual indicator when > 0)
  const progressPercent =
    totalWaterSaved === 0
      ? 0
      : Math.min(100, Math.max(12, Math.round((totalWaterSaved / maxPossibleSavings) * 100)));

  return (
    <section
      id={id}
      aria-label="Solutions for a Water-Secure World"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#030914] text-white selection:bg-cyan-500 selection:text-white"
    >
      {/* Scenic Background Layer: Lush River Valley with Golden Sunrise */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/solutions/future_landscape_bg.jpg"
          alt="Water-Secure World 2050 Landscape"
          className="w-full h-full object-cover object-center select-none opacity-85"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/solutions/solutions_bg.jpg';
          }}
        />

        {/* Cinematic blend overlays */}
        {/* Top gradient blend with preceding map section */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030914] via-[#030914]/85 to-transparent" />

        {/* Bottom river rocks water reflection blend */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#030914] via-[#030914]/80 to-transparent" />

        {/* Subtle radial shadow behind top-left copy to ensure perfect text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(3, 9, 20, 0.75) 0%, rgba(3, 9, 20, 0.35) 60%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          {/* Badge: SOLUTIONS FOR A WATER-SECURE WORLD */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span>SOLUTIONS FOR A WATER-SECURE WORLD</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
            THE FUTURE IS NOT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
              WRITTEN YET.
            </span>
          </h2>

          {/* Underline accent bar */}
          <div className="w-14 h-1 bg-cyan-400 rounded-full mt-3.5 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

          {/* Subtitle */}
          <p className="mt-4 text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            Every drop saved today can change the world we live in tomorrow.<br className="hidden sm:inline" />
            The solutions already exist. What matters now is putting them into action.
          </p>
        </div>

        {/* 4 Solution Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12">
          {solutionPillars.map((pillar) => {
            const PillarIcon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => setActiveModalPillar(pillar)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/25 bg-[#061826]/85 backdrop-blur-md flex flex-col justify-between hover:border-cyan-400/70 hover:shadow-[0_12px_35px_rgba(34,211,238,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Card Top Image */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/solutions/solutions_mockup.jpg';
                    }}
                  />
                  {/* Subtle vignette gradient merging into card body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061826] via-[#061826]/30 to-transparent" />
                </div>

                {/* Card Bottom Body */}
                <div className="p-4 sm:p-5 flex items-start gap-3 justify-between bg-gradient-to-b from-[#061826] to-[#04121d] flex-1">
                  {/* Left Icon Pill in Frosted Rounded Square */}
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                    <PillarIcon className="w-5 h-5 text-cyan-400" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-cyan-400 font-extrabold text-sm tracking-wide">
                        {pillar.number}
                      </span>
                      <h3 className="text-white font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1 font-normal line-clamp-2">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Right Circle Arrow Button */}
                  <div
                    aria-label={`Explore ${pillar.title}`}
                    className="w-7 h-7 rounded-full border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-300 transition-all shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Choice Bar: "YOUR CHOICES SHAPE 2050." */}
        <div className="mt-10 lg:mt-12 rounded-2xl lg:rounded-3xl border border-cyan-500/30 bg-[#051524]/90 backdrop-blur-xl p-5 sm:p-6 lg:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.65)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Left Column: Heading */}
            <div className="text-left w-full lg:w-auto shrink-0 lg:max-w-[230px]">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-[1.1]">
                YOUR CHOICES<br />
                <span className="text-white">SHAPE 2050.</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                See how simple everyday actions can make a real difference in our water future.
              </p>
            </div>

            {/* Middle Column: 5 Choice Toggle Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 w-full lg:w-auto lg:flex-1 justify-center">
              {choicesData.map((choice) => {
                const isSelected = selectedChoices.includes(choice.id);
                const ChoiceIcon = choice.icon;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => toggleChoice(choice.id)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 select-none group min-h-[96px] ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-900/90 text-slate-400'
                    }`}
                  >
                    {/* Active Checkmark Badge in Top-Right Corner */}
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-in zoom-in-50 duration-200">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`transition-colors mb-2 ${
                        isSelected ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                      }`}
                    >
                      <ChoiceIcon className="w-6 h-6" />
                    </div>

                    {/* Label */}
                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2 ${
                        isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {choice.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Potential Water Saved by 2050 */}
            <div className="w-full lg:w-auto shrink-0 lg:min-w-[270px] flex flex-col items-start lg:items-end text-left lg:text-right">
              <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                Potential Water Saved by 2050
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Droplet className="w-5 h-5 text-cyan-400 fill-cyan-400/40 shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-cyan-300 tracking-tight">
                  ≈ {totalWaterSavedFormatted}
                </span>
              </div>
              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden border border-cyan-500/20 mt-2.5 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {/* Helper tip indicating selected action count */}
              <span className="text-[10px] text-slate-400 mt-1.5 font-medium">
                {selectedChoices.length === 0
                  ? 'Tap any action above to activate impact'
                  : `${selectedChoices.length} of ${choicesData.length} global actions selected`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for Solution Pillar */}
      {activeModalPillar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalPillar(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#061826] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img
                src={activeModalPillar.image}
                alt={activeModalPillar.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061826] via-[#061826]/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalPillar(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 flex items-center justify-center backdrop-blur-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Tagline inside banner */}
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
                  Pillar {activeModalPillar.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeModalPillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-200/90 font-medium mt-0.5">
                  {activeModalPillar.tagline}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {activeModalPillar.description}
              </p>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeModalPillar.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/25 flex flex-col justify-center"
                  >
                    <span className="text-[11px] text-slate-300 font-medium">{metric.label}</span>
                    <span className="text-sm font-bold text-cyan-300 mt-0.5">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Tips */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key Implementation Actions</span>
                </h4>
                <div className="space-y-2">
                  {activeModalPillar.actionTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800"
                    >
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Proven Benchmark */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Global Proof Point: {activeModalPillar.realWorldExample.location}</span>
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {activeModalPillar.realWorldExample.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveModalPillar(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FutureSolutionsSection;

