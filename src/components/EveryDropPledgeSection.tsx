import React, { useState } from 'react';
import { Users, CheckSquare, Square, ArrowRight, Award, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const pledgeOptions = [
  'I will use water mindfully at home.',
  'I will fix leaks and avoid unnecessary wastage.',
  'I will adopt water-saving habits.',
  'I will keep water sources clean in my community.',
  'I will encourage my family and friends to do the same.',
];

export const EveryDropPledgeSection: React.FC = () => {
  // First two checked by default to match mockup visual:
  const [checkedItems, setCheckedItems] = useState<boolean[]>([
    true,
    true,
    false,
    false,
    false,
  ]);
  const [pledgeCount, setPledgeCount] = useState<number>(1248320);
  const [isPledged, setIsPledged] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const toggleCheck = (index: number) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const handleTakePledge = () => {
    // Check all
    setCheckedItems([true, true, true, true, true]);
    if (!isPledged) {
      setPledgeCount((prev) => prev + 1);
      setIsPledged(true);
    }
    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#2dd4bf', '#38bdf8', '#ffffff'],
    });
    setShowCertificate(true);
  };

  return (
    <section id="pledge" className="py-24 bg-[#030914] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Traveler on Cliff Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src="/assets/2050/pledge_traveler.jpg"
                alt="Guardian of Tomorrow looking at river sunrise"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/journey/nature_with_water.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

              {/* Floating Quote Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;A single drop saved today is a flowing river for tomorrow.&rdquo;
                </p>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mt-1">
                  &bull; 2050 GUARDIANS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Pledge Checklist & Live Counter */}
          <div className="lg:col-span-7">
            {/* Badge: TAKE ACTION */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              TAKE ACTION
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Take the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Every Drop Pledge.
              </span>
            </h2>

            {/* Subhead */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Join a growing community that is choosing a water-secure tomorrow. Small
              changes today can keep 2050 a better place.
            </p>

            {/* Checklist Box */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] mb-8">
              <div className="space-y-3.5">
                {pledgeOptions.map((text, idx) => {
                  const checked = checkedItems[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`flex items-start gap-3.5 p-2 rounded-xl transition-all cursor-pointer ${
                        checked
                          ? 'bg-cyan-950/30 text-white'
                          : 'hover:bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={checked ? 'Uncheck pledge commitment' : 'Check pledge commitment'}
                        className="mt-0.5 text-cyan-400 focus:outline-none"
                      >
                        {checked ? (
                          <CheckSquare className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>
                      <span className="text-xs sm:text-sm font-medium leading-snug select-none">
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Counter and CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#071324] border border-cyan-500/25">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {pledgeCount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-slate-400">
                    People have already taken the pledge
                  </span>
                </div>
              </div>

              <button
                onClick={handleTakePledge}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>{isPledged ? 'Pledge Confirmed ✓' : 'Take the Pledge'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate / Confirmation Modal */}
      {showCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 to-[#05111c] border-2 border-cyan-400/50 p-6 sm:p-8 text-center shadow-[0_20px_60px_rgba(34,211,238,0.3)]">
            <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 mx-auto flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_25px_rgba(34,211,238,0.5)]">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              OFFICIAL COMMITMENT
            </span>
            <h3 id="certificate-modal-title" className="text-2xl font-black text-white mb-2">
              Every Drop Guardian
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              You are pledge #{pledgeCount.toLocaleString('en-IN')}! Thank you for
              standing for our rivers, communities, and a water-secure 2050.
            </p>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 text-left mb-6 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Check className="w-3.5 h-3.5" /> Mindful home consumption
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Check className="w-3.5 h-3.5" /> Zero tolerance for leaks
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Check className="w-3.5 h-3.5" /> Community source protection
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    'I just took the Every Drop Pledge for a water-secure 2050! Join me in protecting our planet: ' +
                      window.location.href
                  );
                  alert('Pledge link copied to clipboard!');
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Pledge</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

