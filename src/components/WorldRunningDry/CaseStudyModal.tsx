import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertTriangle, CheckCircle, ExternalLink, ShieldCheck, MapPin, Droplet, ArrowRight } from 'lucide-react';
import type { CaseStudy } from './caseStudiesData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onTakeActionClick?: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onTakeActionClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  const { fullStory } = caseStudy;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-slate-100"
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">{caseStudy.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-cyan-300 font-semibold">
                    {caseStudy.country}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs font-mono text-slate-400">
                    Case {caseStudy.caseNumber}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {caseStudy.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8">
            {/* Hero Image & Metadata Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] sm:aspect-[21/9] bg-slate-900">
              <img
                src={caseStudy.image}
                alt={caseStudy.imageAlt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${caseStudy.statusBadgeColor}`}>
                      {caseStudy.statusType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {caseStudy.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-light max-w-xl">
                    {caseStudy.imageCaption}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 self-end">
                  {caseStudy.imageCredit}
                </span>
              </div>
            </div>

            {/* Verified Statistic Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Empirical Metric
                </span>
                <p className="text-sm sm:text-base text-slate-200 font-light mt-1 max-w-xl">
                  {caseStudy.verifiedStat.label}
                </p>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  Official Source: <span className="text-slate-300 font-medium">{caseStudy.verifiedStat.source}</span> ({caseStudy.verifiedStat.sourceYear})
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  {caseStudy.verifiedStat.value}
                </span>
              </div>
            </div>

            {/* In-depth Overview */}
            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold mb-3">
                Context & Crisis Overview
              </h4>
              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                {fullStory.overview}
              </p>
            </div>

            {/* Key Drivers / Causes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h5 className="text-xs font-mono tracking-widest uppercase text-amber-300 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Primary Drivers
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                  {fullStory.keyDrivers.map((driver, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions & Lessons */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h5 className="text-xs font-mono tracking-widest uppercase text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Solutions & Policy Lessons
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                  {fullStory.solutionsAndLessons.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Human Impact */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <h5 className="text-xs font-mono tracking-widest uppercase text-cyan-300 font-semibold mb-2">
                Human Impact on Everyday Life
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {fullStory.humanImpact}
              </p>
            </div>

            {/* Chronological Timeline */}
            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Chronological Timeline
              </h4>
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-white/10 pl-6">
                {fullStory.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
                    <span className="text-xs font-mono font-bold text-cyan-300 block">
                      {item.year}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source Attributions (Requirement 6) */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5">
              <h5 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold mb-3">
                Verified Authoritative Sources
              </h5>
              <div className="space-y-2">
                {fullStory.officialSources.map((src, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-200">{src.name}</span>
                    <span className="text-slate-500">
                      {src.org} · {src.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Bottom Action Bar */}
          <div className="sticky bottom-0 z-20 px-6 sm:px-8 py-4 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Source validated · Press ESC to close
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-white/20 hover:border-white text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Close Story
              </button>
              {onTakeActionClick && (
                <button
                  onClick={() => {
                    onClose();
                    onTakeActionClick();
                  }}
                  className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Take Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
