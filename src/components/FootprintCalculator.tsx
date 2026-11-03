import React, { useState } from 'react';
import { Users, Droplets, Sparkles, ArrowRight, Utensils, Shirt, Bath, X, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FootprintCalculator: React.FC = () => {
  // Habit slider states matching mockup defaults
  const [householdPeople, setHouseholdPeople] = useState<number>(4);
  const [showersPerDay, setShowersPerDay] = useState<number>(1);
  const [laundryPerWeek, setLaundryPerWeek] = useState<number>(3);
  const [dishWashesPerDay, setDishWashesPerDay] = useState<number>(2);

  const [tipsModalOpen, setTipsModalOpen] = useState<boolean>(false);

  // Exact tuned calibration to match standard footprint benchmarks:
  // Showers: 40L per shower
  // Dishes: 20L per wash
  // Laundry: ~50L per load (distributed per day)
  // Drinking, cooking & basic needs: 7L per person per day
  const dailyShowerLitres = householdPeople * showersPerDay * 40;
  const dailyDishLitres = dishWashesPerDay * 20;
  const dailyLaundryLitres = Math.round((laundryPerWeek * 50) / 7);
  const dailyBaseLitres = householdPeople * 7;

  const totalDailyLitres = dailyShowerLitres + dailyDishLitres + dailyLaundryLitres + dailyBaseLitres;
  const totalMonthlyLitres = totalDailyLitres * 30;

  // Sustainable benchmark for a home: ~211 L/day for 4 people
  const sustainableBaseline = householdPeople * 52.75;
  const diffPercent = Math.round(((totalDailyLitres - sustainableBaseline) / sustainableBaseline) * 100);

  const handleGetTips = () => {
    setTipsModalOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#38bdf8', '#0ea5e9', '#ffffff'],
    });
  };

  return (
    <section id="calculator-section" className="relative py-20 px-6 sm:px-10 bg-[#030914] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ================= LEFT COLUMN: TITLE & 3D DROPLET VISUAL ================= */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-[0.22em] uppercase mb-4">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>KNOW YOUR IMPACT</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15]">
              Calculate Your
              <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
                Water Footprint
              </span>
            </h2>

            <p className="mt-4 text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              See how your daily habits use water and discover simple ways to reduce your impact.
            </p>

            {/* Glowing 3D Glass Droplet with Mini Tree Visual */}
            <div className="relative mt-8 w-44 h-44 sm:w-52 sm:h-52 self-center lg:self-start flex items-center justify-center">
              {/* Concentric ripple rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-30" />
              <div className="absolute -inset-4 rounded-full border border-cyan-400/15 animate-pulse opacity-40" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.25)] border border-cyan-500/30">
                <img
                  src="/assets/journey/droplet_3d.jpg"
                  alt="3D Glowing Water Droplet with Tree"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ================= MIDDLE COLUMN: HABIT SLIDERS CARD ================= */}
          <div className="lg:col-span-5 bg-[#071322]/80 border border-cyan-500/25 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div className="space-y-6">
              {/* Slider 1: People */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                    <Users className="w-4 h-4 text-cyan-400" />
                    People in your home
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {householdPeople}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={householdPeople}
                  onChange={(e) => setHouseholdPeople(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Showers */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                    <Bath className="w-4 h-4 text-cyan-400" />
                    Showers per person (per day)
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {showersPerDay}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={showersPerDay}
                  onChange={(e) => setShowersPerDay(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Laundry */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                    <Shirt className="w-4 h-4 text-cyan-400" />
                    Laundry loads per week
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {laundryPerWeek}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={laundryPerWeek}
                  onChange={(e) => setLaundryPerWeek(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: Dishes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                    <Utensils className="w-4 h-4 text-cyan-400" />
                    Dish washes per day
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {dishWashesPerDay}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={dishWashesPerDay}
                  onChange={(e) => setDishWashesPerDay(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: RESULT CARD ================= */}
          <div className="lg:col-span-3 bg-[#071322]/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Your Estimated Use
            </span>

            {/* Big Water Drop Icon */}
            <div className="mt-4 w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Droplets className="w-6 h-6 fill-cyan-400/40 text-cyan-300" />
            </div>

            {/* Litres per Day */}
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
                {totalDailyLitres}
              </span>
              <span className="text-xs text-cyan-300 font-mono">Litres / day</span>
            </div>

            {/* Monthly calculation */}
            <span className="mt-1 font-mono text-xs text-slate-400">
              = {totalMonthlyLitres.toLocaleString()} Litres / month
            </span>

            {/* Sustainability Badge */}
            <div className="mt-4 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-[11px] font-medium text-cyan-200">
              {diffPercent > 0 ? (
                <span>That's {diffPercent}% above the sustainable average.</span>
              ) : (
                <span>That's {Math.abs(diffPercent)}% below the average! 🌿</span>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleGetTips}
              className="mt-6 w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer transform hover:scale-102"
            >
              <span>Get Saving Tips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips Modal */}
      {tipsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#071322] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <h3 className="font-sans font-bold text-base text-white">
                  Personalized Water Saving Tips
                </h3>
              </div>
              <button
                onClick={() => setTipsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Aerated Showerheads:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Cut flow from 12L/min to 6L/min without losing water pressure — saves ~180L daily for your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Full Machine Loads:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wait until laundry and dishwasher bins are full. Saves ~50L per avoided cycle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Fix Silent Flapper Leaks:</strong>
                  <p className="text-slate-400 mt-0.5">
                    A leaking toilet flapper can waste up to 200 Litres daily without sound.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTipsModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs"
            >
              Got It, I'll Try These!
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
