import React, { useState } from 'react';
import { Droplet, Users, ShowerHead, Shirt, Sparkles, ArrowRight, X, Check, Lightbulb } from 'lucide-react';

export const Calculator2050: React.FC = () => {
  // Input states matching the mockup defaults:
  const [people, setPeople] = useState<number>(4);
  const [showers, setShowers] = useState<number>(1);
  const [laundry, setLaundry] = useState<number>(3);
  const [dishes, setDishes] = useState<number>(2);

  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Exact math calibrated to mockup numbers (4 people, 1 shower, 3 laundry, 2 dishes => 249 L/day):
  // Showers: people * showers * 40 L
  // Dishes: dishes * 15.5 L = 31 L
  // Laundry: (laundry * 60 L) / 7 = ~26 L
  // Baseline hygiene/drinking: people * 8 L = 32 L
  // Total: 4 * 1 * 40 + 31 + 26 + 32 = 160 + 89 = 249 L
  const showerWater = people * showers * 40;
  const dishWater = Math.round(dishes * 15.5);
  const laundryWater = Math.round((laundry * 60) / 7);
  const baselineWater = people * 8;

  const totalDailyLitres = showerWater + dishWater + laundryWater + baselineWater;
  const totalMonthlyLitres = totalDailyLitres * 30;

  // Sustainable benchmark per household is ~ 55 L per person/day = people * 55
  const sustainableBenchmark = people * 55;
  const percentageDiff = Math.round(
    ((totalDailyLitres - sustainableBenchmark) / sustainableBenchmark) * 100
  );

  return (
    <section id="calculator" className="py-24 bg-[#030914] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title & 3D Earth Droplet Visual */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                YOUR IMPACT
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Calculate Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  Water Footprint.
                </span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                See how much water you use in a day and discover simple ways to
                reduce it.
              </p>
            </div>

            {/* Glowing Earth inside Droplet Visual */}
            <div className="relative w-full max-w-[280px] mx-auto aspect-square flex items-center justify-center mt-2 group">
              {/* Concentric Glow Ripples */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 scale-95 animate-ping opacity-30" />
              <div className="absolute inset-4 rounded-full border border-cyan-400/30 scale-100" />
              <div className="absolute inset-8 rounded-full bg-cyan-500/10 blur-xl" />

              {/* Droplet Earth Image */}
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.4)] animate-float">
                <img
                  src="/assets/journey/droplet_3d.jpg"
                  alt="3D Earth in Water Droplet"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/2050/earth_droplet.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-radial from-transparent via-cyan-950/20 to-cyan-500/20" />
              </div>
            </div>
          </div>

          {/* Middle Column: Interactive Form Controls */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="space-y-6">
              {/* 1. People in your home */}
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    People in your home
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {people}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  aria-label="People in your home"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* 2. Showers per person (per day) */}
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-2">
                    <ShowerHead className="w-4 h-4 text-cyan-400" />
                    Showers per person (per day)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {showers}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={showers}
                  onChange={(e) => setShowers(Number(e.target.value))}
                  aria-label="Showers per person per day"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* 3. Laundry loads per week */}
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-2">
                    <Shirt className="w-4 h-4 text-cyan-400" />
                    Laundry loads per week
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {laundry}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={laundry}
                  onChange={(e) => setLaundry(Number(e.target.value))}
                  aria-label="Laundry loads per week"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* 4. Dish washes per day */}
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Dish washes per day
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {dishes}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={dishes}
                  onChange={(e) => setDishes(Number(e.target.value))}
                  aria-label="Dish washes per day"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Result Card */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0a1e30] via-[#091a2b] to-[#05111c] border border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between h-full">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                  Your Estimated Use
                </span>

                {/* Big Litres Count */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] shrink-0">
                    <Droplet className="w-5 h-5 fill-cyan-400/20" />
                  </div>
                  <div>
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {totalDailyLitres}
                    </span>
                    <span className="text-xs text-slate-300 ml-1.5 font-semibold">
                      Litres / day
                    </span>
                  </div>
                </div>

                {/* Monthly projection */}
                <p className="text-xs text-slate-300 font-medium mb-4">
                  = {totalMonthlyLitres.toLocaleString()} Litres / month
                </p>

                {/* Comparison Status Badge */}
                <div
                  className={`p-2.5 rounded-xl border text-[11px] font-semibold leading-snug mb-6 ${
                    percentageDiff > 0
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {percentageDiff > 0
                    ? `That's ~${percentageDiff}% above the sustainable average.`
                    : `Excellent! You're within sustainable guidelines.`}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowTipsModal(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]"
              >
                <span>Get Saving Tips</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saving Tips Modal */}
      {showTipsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tips-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <button
              onClick={() => setShowTipsModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  PERSONALIZED FOR YOUR HOME ({people} PEOPLE)
                </span>
                <h3 id="tips-modal-title" className="text-xl font-bold text-white">
                  Ways to Cut {Math.round(totalDailyLitres * 0.35)} Litres Daily
                </h3>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong>Low-Flow Shower Heads:</strong> Saves up to{' '}
                  <span className="text-cyan-300 font-semibold">18 Litres</span> per shower.
                  For your family, that cuts ~{people * showers * 18} L every day!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong>Full Washing Machine Loads:</strong> Running only full loads cuts 1
                  cycle per week, saving{' '}
                  <span className="text-cyan-300 font-semibold">60 Litres</span> weekly.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong>Basin Dishwashing:</strong> Filling a sink basin instead of letting the
                  tap run reduces dish cleaning water from 30 L to{' '}
                  <span className="text-cyan-300 font-semibold">12 Litres</span>.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowTipsModal(false)}
                className="px-6 py-2 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
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
