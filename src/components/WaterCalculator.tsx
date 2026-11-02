import React, { useState } from 'react';
import {
  Gauge,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WaterCalculator: React.FC = () => {
  // Calculator state inputs
  const [showerMinutes, setShowerMinutes] = useState<number>(8); // 10L per min
  const [tapRunningMinutes, setTapRunningMinutes] = useState<number>(3); // 12L per min
  const [flushesPerDay, setFlushesPerDay] = useState<number>(5); // 7L per flush
  const [dishwashingStyle, setDishwashingStyle] = useState<'dishwasher' | 'running_tap'>('running_tap'); // 15L vs 50L
  const [laundryLoadsPerWeek, setLaundryLoadsPerWeek] = useState<number>(3); // 50L per load / 7 days
  const [outdoorMinutesPerWeek, setOutdoorMinutesPerWeek] = useState<number>(15); // 15L per min / 7 days
  const [dietStyle, setDietStyle] = useState<'plant' | 'balanced' | 'meat_heavy'>('balanced');

  // Direct daily water consumption
  const showerWater = showerMinutes * 10;
  const tapWater = tapRunningMinutes * 12;
  const toiletWater = flushesPerDay * 7;
  const dishesWater = dishwashingStyle === 'dishwasher' ? 15 : 45;
  const laundryWater = Math.round((laundryLoadsPerWeek * 50) / 7);
  const outdoorWater = Math.round((outdoorMinutesPerWeek * 15) / 7);

  const directDailyLitres =
    showerWater + tapWater + toiletWater + dishesWater + laundryWater + outdoorWater;

  // Virtual water impact factor
  const virtualDietMultiplier =
    dietStyle === 'plant' ? 1500 : dietStyle === 'balanced' ? 2800 : 4200;

  const totalFootprint = directDailyLitres + virtualDietMultiplier;

  // Average benchmark
  const nationalAverageDirect = 142; // Litres/day
  const diffPercent = Math.round(
    ((directDailyLitres - nationalAverageDirect) / nationalAverageDirect) * 100
  );

  // Potential savings if optimized
  const potentialSavingsDaily = Math.max(
    0,
    directDailyLitres -
      (5 * 10 + 0.5 * 12 + flushesPerDay * 4 + 15 + Math.round((2 * 50) / 7) + 5)
  );

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#22d3ee', '#0ea5e9', '#ffffff'],
    });
  };

  return (
    <section id="calculator" className="relative py-28 px-6 bg-[#030914] text-white overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Interactive Assessment Tool</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            CALCULATE YOUR <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              WATER FOOTPRINT
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Every drop that travels from mountain rain clouds to your home has value.
            Adjust your daily routines below to calculate your direct impact and uncover hidden savings.
          </p>
        </div>

        {/* 2-Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Shower Time */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <span>Daily Shower Duration</span>
                  <span className="text-slate-400 text-xs font-normal">(@ 10 L/min)</span>
                </label>
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {showerMinutes} min <span className="text-slate-400 text-xs font-normal">({showerWater} L)</span>
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={showerMinutes}
                onChange={(e) => setShowerMinutes(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>Quick Rinse (2m)</span>
                <span>Average (8m)</span>
                <span>Long Relax (25m)</span>
              </div>
            </div>

            {/* Slider 2: Running Tap Habits */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <span>Tap Left Running</span>
                  <span className="text-slate-400 text-xs font-normal">(brushing, shaving, washing)</span>
                </label>
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {tapRunningMinutes} min <span className="text-slate-400 text-xs font-normal">({tapWater} L)</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={tapRunningMinutes}
                onChange={(e) => setTapRunningMinutes(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>Zero Waste (0m)</span>
                <span>Average (3m)</span>
                <span>Constant Flow (10m)</span>
              </div>
            </div>

            {/* Slider 3: Toilet Flushes */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <span>Daily Toilet Flushes</span>
                  <span className="text-slate-400 text-xs font-normal">(@ 7 L/flush)</span>
                </label>
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {flushesPerDay} flushes <span className="text-slate-400 text-xs font-normal">({toiletWater} L)</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={flushesPerDay}
                onChange={(e) => setFlushesPerDay(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Dishwashing Choice */}
            <div className="glass-panel p-6 rounded-2xl">
              <label className="text-sm font-semibold text-slate-200 block mb-3">
                Dishwashing Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDishwashingStyle('dishwasher')}
                  className={`py-3 px-4 rounded-xl text-xs font-medium text-left transition-all border ${
                    dishwashingStyle === 'dishwasher'
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Eco Dishwasher</div>
                  <div className="text-[11px] opacity-75 mt-0.5">~15 Litres / load</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDishwashingStyle('running_tap')}
                  className={`py-3 px-4 rounded-xl text-xs font-medium text-left transition-all border ${
                    dishwashingStyle === 'running_tap'
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Hand Wash Tap</div>
                  <div className="text-[11px] opacity-75 mt-0.5">~45 Litres / day</div>
                </button>
              </div>
            </div>

            {/* Slider 4: Outdoor / Garden Watering */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  Garden Hose / Outdoor Watering (min/week)
                </label>
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {outdoorMinutesPerWeek} min <span className="text-slate-400 text-xs font-normal">({outdoorWater} L/day)</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={outdoorMinutesPerWeek}
                onChange={(e) => setOutdoorMinutesPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Slider 5: Laundry Loads */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  Washing Machine Loads
                </label>
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {laundryLoadsPerWeek} / week <span className="text-slate-400 text-xs font-normal">({laundryWater} L/day)</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={laundryLoadsPerWeek}
                onChange={(e) => setLaundryLoadsPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Dietary Virtual Water Impact */}
            <div className="glass-panel p-6 rounded-2xl">
              <label className="text-sm font-semibold text-slate-200 block mb-1">
                Dietary Virtual Water Impact
              </label>
              <p className="text-xs text-slate-400 mb-3">
                Virtual water is embedded in food agriculture and processing.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'plant', label: 'Plant-Rich', l: '1,500 L' },
                  { id: 'balanced', label: 'Balanced', l: '2,800 L' },
                  { id: 'meat_heavy', label: 'Meat-Heavy', l: '4,200 L' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDietStyle(item.id as typeof dietStyle)}
                    className={`py-2.5 px-3 rounded-xl text-xs text-center transition-all border ${
                      dietStyle === item.id
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{item.l}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Analysis Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  Your Daily Direct Total
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                  Live Estimate
                </span>
              </div>

              {/* Big Metrics Display */}
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl md:text-7xl font-extrabold text-white tracking-tight">
                    {directDailyLitres}
                  </span>
                  <span className="text-xl md:text-2xl font-light text-cyan-300">
                    Litres / day
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Direct household tap water</span>
                  <span className="text-cyan-400">Total footprint: ~{totalFootprint.toLocaleString()} L/day</span>
                </div>
              </div>

              {/* Benchmark Comparison */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">National Average Direct:</span>
                  <span className="text-slate-400 font-mono">142 L/day</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-slate-300">Your Status:</span>
                  <span
                    className={`font-mono font-semibold ${
                      diffPercent <= 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {diffPercent <= 0 ? `${Math.abs(diffPercent)}% Below Average (Efficient!)` : `+${diffPercent}% Above Average`}
                  </span>
                </div>
              </div>

              {/* Potential Savings Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-400/30 mb-6">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase font-semibold mb-1">
                  <TrendingDown className="w-4 h-4 text-cyan-400" />
                  <span>Immediate Conservation Potential</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  Save ~{potentialSavingsDaily * 365} <span className="text-sm font-normal text-cyan-200">Litres/year</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                  By cutting showers to 5 mins and shutting the tap while brushing, you preserve thousands of gallons of mountain spring water.
                </p>
              </div>

              {/* Action Button */}
              <a
                href="#action"
                onClick={triggerCelebration}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>PLEDGE TO SAVE TODAY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
