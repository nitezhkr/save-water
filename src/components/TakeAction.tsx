import { useState } from 'react';
import { CheckCircle2, Shield, Sparkles, Users, Award } from 'lucide-react';

import confetti from 'canvas-confetti';

export const TakeAction: React.FC = () => {
  const [pledges, setPledges] = useState<string[]>([
    'tap_brushing',
    'five_min_shower',
  ]);
  const [userName, setUserName] = useState<string>('');
  const [isPledged, setIsPledged] = useState<boolean>(false);
  const [communityPledgeCount, setCommunityPledgeCount] = useState<number>(148924);

  const pledgeItems = [
    {
      id: 'tap_brushing',
      title: 'Shut off the tap while brushing & shaving',
      saving: 'Saves 24 L / person / day',
    },
    {
      id: 'five_min_shower',
      title: 'Limit showers to 5 minutes maximum',
      saving: 'Saves 40 L / shower',
    },
    {
      id: 'full_loads',
      title: 'Run dishwashers & washing machines only when full',
      saving: 'Saves ~60 L / week',
    },
    {
      id: 'fix_leaks',
      title: 'Inspect & repair dripping taps and toilet flappers',
      saving: 'Prevents 30+ L daily silent leaks',
    },
    {
      id: 'smart_garden',
      title: 'Water plants during cool dawn or dusk hours',
      saving: 'Reduces 35% evaporation loss',
    },
  ];

  const togglePledge = (id: string) => {
    setPledges((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsPledged(true);
    setCommunityPledgeCount((c) => c + 1);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#38bdf8', '#0ea5e9', '#10b981', '#ffffff'],
    });
  };

  return (
    <section id="action" className="relative py-28 px-6 bg-[#030914] text-white border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>The Daily Commitment</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            TAKE THE EVERY DROP <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              WATER PLEDGE
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Protecting our natural water cycle doesn't require drastic sacrifices.
            Small, conscious habits preserve millions of litres every year.
          </p>

          {/* Live community counter */}
          <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">
              Community Pledges Taken:{' '}
              <strong className="text-cyan-300 font-bold">
                {communityPledgeCount.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* Pledge Card Container */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {!isPledged ? (
            <form onSubmit={handlePledgeSubmit} className="space-y-8">
              {/* Checklist */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-slate-300 block mb-4">
                  Select Your Daily Commitments:
                </label>
                {pledgeItems.map((item) => {
                  const isChecked = pledges.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePledge(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'border-cyan-400/80 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-cyan-400 text-slate-950'
                              : 'border border-slate-600 bg-slate-800'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="text-xs font-mono text-cyan-400/90 mt-0.5">
                            {item.saving}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Name & Submit */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center">
                <input
                  type="text"
                  required
                  placeholder="Enter your name or family name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full sm:flex-1 px-5 py-4 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-slate-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={pledges.length === 0}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-50 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>SIGN MY PLEDGE</span>
                </button>
              </div>
            </form>
          ) : (
            /* Digital Certificate / Pledge Confirmation */
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto mb-6 glow-cyan">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Official Water Guardian Certificate
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Thank you, {userName}!
              </h3>
              <p className="mt-3 text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                You have joined over 148,000 conscious citizens committed to preserving our planet's most vital resource. Your daily habits are part of the solution.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 max-w-md mx-auto text-left">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2 font-semibold">
                  Your Active Commitments ({pledges.length}):
                </div>
                <ul className="text-xs text-slate-200 space-y-1.5 font-sans">
                  {pledges.map((p) => {
                    const found = pledgeItems.find((item) => item.id === p);
                    return found ? (
                      <li key={p} className="flex items-center gap-2">
                        <span className="text-cyan-400">✓</span> {found.title}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>

              <button
                onClick={() => setIsPledged(false)}
                className="mt-8 text-xs font-mono text-slate-400 hover:text-cyan-300 uppercase tracking-wider transition-colors cursor-pointer"
              >
                ← Update Commitments
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
