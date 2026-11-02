import { Navbar } from './components/Navbar';

import { WaterJourneyHero } from './components/WaterJourneyHero/WaterJourneyHero';
import { WaterCalculator } from './components/WaterCalculator';
import { OurStory } from './components/OurStory';
import { TakeAction } from './components/TakeAction';
import { Footer } from './components/Footer';

export function App() {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    const el = document.getElementById('journey-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAction = () => {
    const el = document.getElementById('action');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030914] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Editorial Navigation */}
      <Navbar onSaveWaterClick={scrollToAction} />

      {/* Main Hero: THE JOURNEY OF EVERY DROP */}
      <main>
        <WaterJourneyHero
          onDiscoverFootprint={scrollToCalculator}
          onExploreClick={scrollToHero}
        />

        {/* Existing / Connected Sections */}
        <WaterCalculator />
        <OurStory />
        <TakeAction />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
