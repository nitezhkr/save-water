import React, { useState } from 'react';
import {
  Users,
  Droplet,
  ShowerHead,
  Wrench,
  Check,
  Share2,
  ArrowRight,
  X,
  Award,
  Sparkles,
  Download,
  Copy,
  CheckCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PledgeOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pledgeOptions: PledgeOption[] = [
  {
    id: 'daily',
    label: 'Save water every day',
    icon: Droplet,
  },
  {
    id: 'leaks',
    label: 'Fix leaking taps',
    icon: Wrench,
  },
  {
    id: 'reduce',
    label: 'Reduce unnecessary water usage',
    icon: ShowerHead,
  },
  {
    id: 'encourage',
    label: 'Encourage others to conserve water',
    icon: Users,
  },
];

interface EveryDropPledgeSectionProps {
  id?: string;
}

export const EveryDropPledgeSection: React.FC<EveryDropPledgeSectionProps> = ({
  id = 'pledge',
}) => {
  // Option 1 ("Save water every day") checked by default to match provided mockup
  const [checkedIds, setCheckedIds] = useState<string[]>(['daily']);
  const [pledgeCount, setPledgeCount] = useState<number>(1248320);
  const [hasPledged, setHasPledged] = useState<boolean>(false);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [guardianTitle, setGuardianTitle] = useState<string>('Earth Guardian 2050');
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const toggleOption = (optId: string) => {
    setCheckedIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleTakePledge = () => {
    // Check all options
    setCheckedIds(pledgeOptions.map((opt) => opt.id));

    if (!hasPledged) {
      setPledgeCount((prev) => prev + 1);
      setHasPledged(true);
    }

    // Launch celebratory cyan & teal confetti explosion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#22d3ee', '#2dd4bf', '#38bdf8', '#a5f3fc', '#ffffff'],
    });

    // Open personalized pledge card modal
    setShowCardModal(true);
  };

  const handleShareMovement = async () => {
    const shareData = {
      title: 'Every Drop — The Change Starts With You',
      text: 'I just took the Water Pledge to save our water future for 2050. Join 1,248,000+ people taking action today!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareSuccess('Shared successfully!');
        setTimeout(() => setShareSuccess(null), 3000);
        return;
      } catch (err) {
        // User cancelled or error - fallback to clipboard
      }
    }

    // Fallback: Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formattedPledgeCount = pledgeCount.toLocaleString();

  return (
    <section
      id={id}
      aria-label="The Change Starts With You"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#030914] text-white selection:bg-cyan-500 selection:text-white"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge: BECOME THE CHANGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>BECOME THE CHANGE</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
            THE CHANGE STARTS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
              WITH YOU.
            </span>
          </h2>

          {/* Underline accent bar */}
          <div className="w-14 h-1 bg-cyan-400 rounded-full mt-3.5 mx-auto shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

          {/* Subtitle */}
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Saving our future doesn't require one giant action. It requires millions of small decisions made every day.
          </p>
        </div>

        {/* Main Content: Left Floating Crystal Droplet + 3 Pledge Cards Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: 3D Crystal Water Droplet with Earth inside */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative select-none">
            <div className="relative w-56 xl:w-64 aspect-[3/4] flex items-center justify-center group">
              {/* Soft pulsating glow behind the droplet */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-400/30 transition-all duration-700 pointer-events-none" />

              {/* Crystal Earth Droplet Image */}
              <img
                src="/assets/pledge/earth_droplet_crystal.jpg"
                alt="Earth suspended inside pure water droplet"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(34,211,238,0.4)] transition-transform duration-700 group-hover:scale-105"
                style={{
                  animation: 'floatDroplet 5s ease-in-out infinite',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/2050/earth_droplet.jpg';
                }}
              />

              {/* Water ripple reflection underneath */}
              <div className="absolute -bottom-4 w-40 h-8 bg-cyan-400/20 rounded-[100%] blur-md pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 3 Frosted Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {/* CARD 01: MAKE A PROMISE */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#061826]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:border-cyan-400/60 transition-all duration-300">
              <div>
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 uppercase mb-3">
                  <span>01</span>
                  <span>·</span>
                  <span>MAKE A PROMISE</span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Take the<br />Water Pledge
                </h3>

                {/* Subhead */}
                <p className="text-xs text-slate-300 mt-2 mb-4 leading-relaxed">
                  Choose a simple commitment and be a part of the solution.
                </p>

                {/* 4 Interactive Commitment Options */}
                <div className="space-y-2">
                  {pledgeOptions.map((opt) => {
                    const isChecked = checkedIds.includes(opt.id);
                    const OptIcon = opt.icon;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleOption(opt.id)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-950/50 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                            : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <OptIcon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isChecked ? 'text-cyan-400' : 'text-slate-400'
                            }`}
                          />
                          <span
                            className={`text-xs font-medium leading-snug line-clamp-1 ${
                              isChecked ? 'text-white font-semibold' : 'text-slate-300'
                            }`}
                          >
                            {opt.label}
                          </span>
                        </div>

                        {/* Checkbox square */}
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isChecked
                              ? 'bg-cyan-400 border-cyan-300 text-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                              : 'border-slate-700 bg-slate-950/60'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Hint */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-cyan-300/80">
                <span>{checkedIds.length} of {pledgeOptions.length} commitments active</span>
                {checkedIds.length === pledgeOptions.length && (
                  <span className="text-teal-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Full Commitment
                  </span>
                )}
              </div>
            </div>

            {/* CARD 02: JOIN THE MOVEMENT */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#061826]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:border-cyan-400/60 transition-all duration-300 overflow-hidden">
              <div>
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 uppercase mb-3">
                  <span>02</span>
                  <span>·</span>
                  <span>JOIN THE MOVEMENT</span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  One Planet.<br />Millions of Actions.
                </h3>

                {/* Subhead */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Be part of a growing community that's choosing a water-secure future.
                </p>

                {/* Large Pledge Counter */}
                <div className="mt-6 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-300 tracking-tight drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                    {formattedPledgeCount}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 block mt-1">
                    PEOPLE HAVE TAKEN THE PLEDGE
                  </span>
                </div>
              </div>

              {/* Bottom Digital Network Globe Graphic */}
              <div className="relative mt-4 -mx-6 -mb-6 h-32 sm:h-36 overflow-hidden flex items-end justify-center select-none">
                <img
                  src="/assets/pledge/digital_network_globe.jpg"
                  alt="Global network of water guardians"
                  className="w-full h-full object-cover object-top opacity-90 hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/earth_globe_glow.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#061826]/30 to-[#061826] pointer-events-none" />

                {/* Live pulsing node pins on the digital globe */}
                <div className="absolute bottom-6 left-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div className="absolute bottom-10 right-1/3 w-2 h-2 rounded-full bg-teal-300 animate-ping delay-300" />
                <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-200 animate-ping delay-700" />
              </div>
            </div>

            {/* CARD 03: SPREAD THE MESSAGE */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#061826]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:border-cyan-400/60 transition-all duration-300 group">
              <div>
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 uppercase mb-3">
                  <span>03</span>
                  <span>·</span>
                  <span>SPREAD THE MESSAGE</span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Make Every<br />Drop Count.
                </h3>

                {/* Subhead */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Create your own water pledge card and inspire others to take action.
                </p>

                {/* 3D Fan of Pledge Cards Visual */}
                <div className="mt-3 relative h-32 sm:h-36 flex items-center justify-center select-none overflow-hidden rounded-xl">
                  <img
                    src="/assets/pledge/pledge_cards_fan.jpg"
                    alt="Custom water pledge cards"
                    className="max-h-full object-contain drop-shadow-[0_10px_25px_rgba(34,211,238,0.25)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/pledge/pledge_mockup.jpg';
                    }}
                  />
                </div>
              </div>

              {/* Action Button: Create My Pledge Card */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowCardModal(true)}
                  className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)] flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Create My Pledge Card</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Centered Action Buttons */}
        <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary CTA: I TAKE THE PLEDGE */}
          <button
            type="button"
            onClick={handleTakePledge}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide uppercase bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Droplet className="w-4 h-4 fill-slate-950" />
            <span>{hasPledged ? 'PLEDGE REGISTERED!' : 'I TAKE THE PLEDGE'}</span>
          </button>

          {/* Secondary CTA: SHARE THE MOVEMENT */}
          <button
            type="button"
            onClick={handleShareMovement}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide uppercase bg-slate-900/80 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-cyan-400" />
                <span>LINK COPIED!</span>
              </>
            ) : shareSuccess ? (
              <>
                <Check className="w-4 h-4 text-teal-400" />
                <span>{shareSuccess}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>SHARE THE MOVEMENT</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Pledge Card & Certificate Modal */}
      {showCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowCardModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#061826] border border-cyan-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  Official 2050 Water Pledge Card
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Title selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Guardian Title
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Earth Guardian 2050', 'River Protector', 'Clean Water Pioneer', 'Aquifer Ally'].map(
                    (title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => setGuardianTitle(title)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          guardianTitle === title
                            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {title}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-br from-[#061826] via-[#030d17] to-[#011422] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                {/* Background water scenic tint */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img
                    src="/assets/pledge/pledge_cards_fan.jpg"
                    alt="Scenic preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center">
                        <Droplet className="w-4 h-4 text-cyan-400 fill-cyan-400/40" />
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
                        Every Drop Official Pledge
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      #{formattedPledgeCount}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                      CERTIFIED WATER GUARDIAN
                    </span>
                    <h4 className="text-xl font-black text-white tracking-tight mt-0.5">
                      {userName.trim() || 'Alex Morgan'}
                    </h4>
                    <span className="inline-block mt-1 text-xs font-semibold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                      {guardianTitle}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 italic border-t border-slate-800/80 pt-2.5">
                    &ldquo;I have solemnly committed to protecting every drop of Earth's water, conserving daily resources, and fostering a water-secure tomorrow by 2050.&rdquo;
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>STATUS: ACTIVE PLEDGE</span>
                    <span>GLOBAL WATER MOVEMENT 2050</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 px-6 border-t border-slate-800/80 bg-slate-950/70 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleShareMovement}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Pledge'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(
                    `Pledge confirmed for ${userName.trim() || 'Alex Morgan'}! Card registered under #${formattedPledgeCount}.`
                  );
                  setShowCardModal(false);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Confirm & Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating droplet CSS keyframe */}
      <style>{`
        @keyframes floatDroplet {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }
      `}</style>
    </section>
  );
};

export default EveryDropPledgeSection;
