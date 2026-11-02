import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Globe,
  Droplets,
  BookOpen,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from './caseStudiesData';
import { CaseStudyModal } from './CaseStudyModal';

interface WorldRunningDryProps {
  onHelpClick?: () => void;
}

export const WorldRunningDry: React.FC<WorldRunningDryProps> = ({ onHelpClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudy | null>(null);
  const [slideDirection, setSlideDirection] = useState<number>(1); // 1 = right, -1 = left
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const currentCase = CASE_STUDIES[currentIndex];

  const handleNext = useCallback(() => {
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  }, []);

  const handleSelectCase = (idx: number) => {
    setSlideDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleScrollToTips = () => {
    if (onHelpClick) {
      onHelpClick();
    } else {
      const el = document.getElementById('action');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="world-running-dry"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-28 sm:py-36 bg-[#030914] text-white overflow-hidden border-t border-white/10 focus:outline-none"
    >
      {/* Background Cinematic Texture & Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle deep ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#051124] to-[#030914]" />
        {/* Ambient atmospheric glow spots */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-[0.25em] uppercase font-semibold mb-6 backdrop-blur-md"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL ENVIRONMENTAL DOCUMENTARY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.05]"
          >
            THE WORLD IS
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]">
              RUNNING DRY.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-slate-300 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            For millions of people, finding clean water is not something they take for granted. Explore the real stories of communities facing water scarcity around the world.
          </motion.p>
        </div>

        {/* =========================================================================
            COUNTRY SLIDER: LARGE EDITORIAL SPLIT LAYOUT
            ========================================================================= */}
        <div className="relative rounded-3xl bg-slate-900/50 border border-white/15 overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Top Country Selector Navigation Bar */}
          <div className="px-6 sm:px-10 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">{currentCase.caseNumber}</span>
              <span>/</span>
              <span>04</span>
              <span className="hidden sm:inline text-slate-500">— International Case Studies</span>
            </div>

            {/* Quick Country Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
              {CASE_STUDIES.map((c, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCase(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 font-bold shadow-lg scale-105'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span className="hidden sm:inline">{c.country}</span>
                    <span className="sm:hidden font-mono">{c.caseNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Slide Split Content */}
          <div className="relative min-h-[580px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col lg:flex-row">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, x: slideDirection * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -40 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="w-full flex flex-col lg:flex-row"
              >
                {/* =========================================================================
                    LEFT COLUMN: EDITORIAL CONTENT & VERIFIED DATA
                    ========================================================================= */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
                  <div>
                    {/* Eyebrow & Status */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xl sm:text-2xl mr-1">{currentCase.flag}</span>
                      <span className="text-xs font-mono tracking-widest uppercase font-semibold text-cyan-300">
                        {currentCase.country}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {currentCase.location}
                      </span>
                      <span className={`ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${currentCase.statusBadgeColor}`}>
                        {currentCase.statusType}
                      </span>
                    </div>

                    {/* Large Case Study Title */}
                    <h3 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-4">
                      {currentCase.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                      {currentCase.description}
                    </p>

                    {/* Verified Statistic Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-black/60 border border-cyan-500/25 mb-6">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified Statistic
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {currentCase.verifiedStat.sourceYear}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1.5">
                        <span className="font-sans text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300">
                          {currentCase.verifiedStat.value}
                        </span>
                        <p className="text-xs text-slate-200 font-light flex-1">
                          {currentCase.verifiedStat.label}
                        </p>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2 mt-2">
                        Source attribution: <span className="text-slate-300">{currentCase.verifiedStat.source}</span>
                      </div>
                    </div>

                    {/* Focus Area Tags */}
                    <div className="mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-2">
                        Core Investigation Focus:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentCase.focusAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs font-light border border-white/5"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Read More Action Link */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedCaseModal(currentCase)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold transition-all cursor-pointer group shadow-lg"
                    >
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Read the full story</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* =========================================================================
                    RIGHT COLUMN: LARGE DOCUMENTARY-STYLE PHOTOGRAPH
                    ========================================================================= */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-slate-950 flex flex-col justify-end">
                  <img
                    src={currentCase.image}
                    alt={currentCase.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle dark documentary vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-black/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-cyan-950/10 pointer-events-none" />

                  {/* Photo Caption & Location Badge */}
                  <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-xs font-mono text-cyan-300 mb-2 backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{currentCase.location}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                      {currentCase.imageCaption}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Photo: {currentCase.imageCredit}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =========================================================================
              BOTTOM CONTROLS BAR: ARROWS, SLIDE COUNTER, INDICATORS
              ========================================================================= */}
          <div className="px-6 sm:px-10 py-5 border-t border-white/10 bg-slate-950/80 flex items-center justify-between gap-4">
            {/* Previous & Next Circular Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-cyan-400/50 text-white flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-cyan-300 transition-colors" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-cyan-400/50 text-white flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Next case study"
              >
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-cyan-300 transition-colors" />
              </button>

              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                Use arrows or swipe
              </span>
            </div>

            {/* Slide Progress Dots / Indicators */}
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCase(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Current Slide Display */}
            <div className="text-xs font-mono text-slate-400">
              <span className="text-white font-bold text-sm">{currentCase.caseNumber}</span>
              <span className="text-slate-600"> / </span>
              <span>04</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FINAL MESSAGE & CTA (REQUIREMENT 7)
            "Water scarcity is not just a statistic. It is someone's everyday reality."
            ========================================================================= */}
        <div className="mt-20 max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#030914] border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
          <Droplets className="w-9 h-9 text-cyan-400 mx-auto mb-4 animate-pulse" />

          <blockquote className="font-editorial text-2xl sm:text-3xl text-white font-light tracking-wide leading-relaxed italic max-w-2xl mx-auto">
            “Water scarcity is not just a statistic.
            <br className="hidden sm:inline" />
            It is someone's everyday reality.”
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
            The global crisis begins at our personal taps. Practical conservation habits make a tangible difference in water security worldwide.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleScrollToTips}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center gap-2.5 cursor-pointer group hover:scale-[1.02]"
            >
              <span>DISCOVER HOW YOU CAN HELP</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseModal}
        onClose={() => setSelectedCaseModal(null)}
        onTakeActionClick={handleScrollToTips}
      />
    </section>
  );
};
