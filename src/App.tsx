import { useState } from 'react';
import { EveryDropNavbar } from './components/EveryDropNavbar';
import { Earth2050Hero } from './components/Earth2050Hero';
import { WaterVsPopulation } from './components/WaterVsPopulation';
import { RealWorldExamples } from './components/RealWorldExamples';
import { WaterCrisisMap } from './components/WaterCrisisMap';
import { FutureSolutionsSection } from './components/FutureSolutionsSection';
import { DayIn2050 } from './components/DayIn2050';
import { ThenVs2050 } from './components/ThenVs2050';
import { Calculator2050 } from './components/Calculator2050';
import { EveryDropPledgeSection } from './components/EveryDropPledgeSection';
import { EveryDropFooter } from './components/EveryDropFooter';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollToPledge = () => {
    const el = document.getElementById('pledge');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDayIn2050 = () => {
    const el = document.getElementById('day-in-2050');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030914] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <EveryDropNavbar
        onJoinClick={scrollToPledge}
        onSearchClick={() => setSearchOpen(true)}
      />

      <main>
        {/* 2. Earth 2050 Cinematic Split Hero */}
        <Earth2050Hero
          onExperienceClick={scrollToDayIn2050}
          onChangeOutcomeClick={scrollToSolutions}
        />

        {/* 3. Water vs. World Population (Historical & Future Imbalance) */}
        <WaterVsPopulation />

        {/* 4. Real World Examples (Cape Town, Chennai, Lake Chad, Yemen, Jordan) */}
        <RealWorldExamples />

        {/* 5. Section 04: The Global Water Crisis Map (MapLibre + OpenFreeMap + WRI + World Bank) */}
        <WaterCrisisMap />

        {/* 6. Solutions: The Future Is Not Written Yet (Interactive Solutions & Action Choices) */}
        <FutureSolutionsSection />

        {/* 7. A Day in 2050 (Drinking, Cooking, Bathing, Farming) */}
        <DayIn2050 />

        {/* 8. THEN vs 2050: The Same Place. A Different Time (Interactive Slider) */}
        <ThenVs2050 />

        {/* 9. Your Impact: Calculate Your Water Footprint */}
        <Calculator2050 />

        {/* 8. Take Action: Take the Every Drop Pledge */}
        <EveryDropPledgeSection />
      </main>

      {/* 9. Footer */}
      <EveryDropFooter />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}

export default App;
