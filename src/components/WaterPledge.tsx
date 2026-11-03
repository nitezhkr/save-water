import React, { useState } from 'react';
import { Users, Check, Sparkles, ArrowRight, Sprout } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WaterPledge: React.FC = () => {
  const [pledges, setPledges] = useState<number[]>([0, 1, 2]); // First 3 checked by default matching mockup
  const [pledgeCount, setPledgeCount] = useState<number>(1248320);
  const [hasPledged, setHasPledged] = useState<boolean>(false);

  const pledgeOptions = [
    'I will use water mindfully at home.',
    'I will fix leaks and avoid unnecessary wastage.',
    'I will adopt water-saving habits (e.g., shorter showers, full laundry loads).',
    'I will spread awareness in my family and community.',
    'I will support and participate in local water conservation efforts.',
  ];

  const togglePledge = (index: number) => {
    if (pledges.includes(index)) {
      setPledges(pledges.filter((i) => i !== index));
    } else {
      setPledges([...pledges, index]);
    }
  };

  const handleTakePledge = () => {
    if (!hasPledged) {
      setPledgeCount((prev) => prev + 1);
      setHasPledged(true);
    }

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#22d3ee', '#38bdf8', '#0ea5e9', '#10b981', '#ffffff'],
    });
  };

  // Format count into Indian numbering or comma separated
  const formattedCount = pledgeCount.toLocaleString('en-IN');

  return (
    <section id="pledge-section" className="relative py-24 px-6 sm:px-10 bg-[#030914] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-[0.22em] uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>BE PART OF THE SOLUTION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight">
            Take the{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
              Every Drop
            </span>{' '}
            Water Pledge
          </h2>

          <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            Small actions, when taken by many, create a big difference. Pledge to use water wisely and inspire others to do the same.
          </p>

          {/* Sprouting seedling visual icon / graphic */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-30" />
              <Sprout className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
            </div>
          </div>
        </div>

        {/* Main Pledge Container */}
        <div className="bg-[#071322]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Checkboxes List (Col 7) */}
            <div className="md:col-span-7 space-y-3.5">
              {pledgeOptions.map((text, idx) => {
                const isChecked = pledges.includes(idx);
                return (
                  <label
                    key={idx}
                    onClick={() => togglePledge(idx)}
                    className={`flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-cyan-500/10 border-cyan-400/40 text-slate-100'
                        : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isChecked
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                          : 'border border-slate-600 bg-slate-900/60'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-[13px] leading-snug">{text}</span>
                  </label>
                );
              })}
            </div>

            {/* Right Pledge Counter & CTA (Col 5) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#050e1a]/80 border border-cyan-500/20">
              <div className="w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] mb-3">
                <Users className="w-6 h-6 text-cyan-300" />
              </div>

              <span className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {formattedCount}
              </span>

              <span className="text-xs text-slate-400 font-light mt-1 mb-6">
                People have already taken the pledge
              </span>

              <button
                onClick={handleTakePledge}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-102 active:scale-98"
              >
                <span>{hasPledged ? 'Pledged! Thank You 🎉' : 'Take the Pledge'}</span>
                {!hasPledged && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

