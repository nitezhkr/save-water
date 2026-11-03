import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  Droplets,
  Layers,
  ChevronDown,
  Compass,
  MoveHorizontal,
  HeartHandshake,
} from 'lucide-react';
import { waterAudio } from './audioService';
import { ComparisonSlider } from './ComparisonSlider';

interface WaterJourneyHeroProps {
  onDiscoverFootprint?: () => void;
  onExploreClick?: () => void;
}

export const WaterJourneyHero: React.FC<WaterJourneyHeroProps> = ({
  onDiscoverFootprint,
}) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [masterSplitPos, setMasterSplitPos] = useState<number>(50);
  const [isDraggingMaster, setIsDraggingMaster] = useState<boolean>(false);
  const [activeSliderTab, setActiveSliderTab] = useState<'both' | 'community' | 'household'>('both');
  const heroStageRef = useRef<HTMLDivElement | null>(null);

  // Audio Toggle
  const handleToggleAudio = () => {
    const newState = waterAudio.toggleAudio();
    setIsAudioActive(newState);
  };

  // Master Split-screen drag handler for the hero viewport
  const updateMasterPosition = useCallback((clientX: number) => {
    if (!heroStageRef.current) return;
    const rect = heroStageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    setMasterSplitPos(pct);
  }, []);

  const handleMasterPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture if dragged on stage or divider handle
    setIsDraggingMaster(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateMasterPosition(e.clientX);
    waterAudio.playWaterDrop(540 + Math.round((masterSplitPos / 100) * 150));
  };

  const handleMasterPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingMaster) return;
    updateMasterPosition(e.clientX);
  };

  const handleMasterPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingMaster(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="journey-hero" className="relative w-full bg-[#030914] text-white">
      {/* =========================================================================
          SECTION 1: FULL-SCREEN SPLIT-SCREEN MASTER HERO STAGE
          "TWO WORLDS. ONE RESOURCE."
          ========================================================================= */}
      <section
        ref={heroStageRef}
        onPointerDown={handleMasterPointerDown}
        onPointerMove={handleMasterPointerMove}
        onPointerUp={handleMasterPointerUp}
        onPointerCancel={handleMasterPointerUp}
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none cursor-ew-resize touch-none pt-20 pb-10"
      >
        {/* Layer 1: Background Base Image (RIGHT SIDE: LIFE WITHOUT WATER - Arid Scarcity) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/journey/community_without_water.jpg"
            alt="Life Without Water - Indian Community Scarcity"
            className="w-full h-full object-cover object-center animate-kenburns"
            style={{ animationDuration: '30s' }}
            loading="eager"
          />
          {/* Subtle amber & drought atmospheric color grading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-black/40 to-[#030914]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-amber-950/20 mix-blend-color pointer-events-none" />

          {/* Right Floating Badge (LIFE WITHOUT WATER) */}
          <div className="absolute top-28 right-6 sm:right-12 z-10 pointer-events-none text-right hidden sm:block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              LIFE WITHOUT WATER
            </span>
            <p className="text-amber-100/80 text-xs font-light mt-2 max-w-[240px] drop-shadow-md">
              Cracked parched land · Dried canal bed · Empty brass pots · Silent taps
            </p>
          </div>
        </div>

        {/* Layer 2: Clipped Foreground Image (LEFT SIDE: LIFE WITH WATER - Lush Abundance) */}
        <div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - masterSplitPos}% 0 0)` }}
        >
          <img
            src="/assets/journey/community_with_water.jpg"
            alt="Life With Water - Thriving Indian Community"
            className="w-full h-full object-cover object-center animate-kenburns"
            style={{ animationDuration: '30s', animationDirection: 'reverse' }}
            loading="eager"
          />
          {/* Subtle verdant & cool water color grading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-black/40 to-[#030914]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color pointer-events-none" />

          {/* Left Floating Badge (LIFE WITH WATER) */}
          <div className="absolute top-28 left-6 sm:left-12 z-10 pointer-events-none text-left hidden sm:block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              LIFE WITH WATER
            </span>
            <p className="text-emerald-100/80 text-xs font-light mt-2 max-w-[240px] drop-shadow-md">
              Green agricultural terraces · Laughing children · Clean running water · Flourishing trees
            </p>
          </div>
        </div>

        {/* Vertical Draggable Hero Divider with Glowing Aura */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_20px_rgba(34,211,238,0.9)] z-20 flex flex-col justify-end pb-24 sm:pb-28 items-center pointer-events-none"
          style={{ left: `${masterSplitPos}%` }}
        >
          {/* Subtle animated vertical flare */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-cyan-400 to-cyan-400/20 opacity-80" />

          {/* Animated Interactive Handle (Placed at lower section for clean headline visibility) */}
          <div className="relative pointer-events-auto">
            {/* Pulsing ring aura */}
            <div className="absolute -inset-3 rounded-full bg-cyan-400/40 blur-md animate-ping" />
            <div
              className={`w-12 h-12 rounded-full bg-slate-950/95 border-2 border-cyan-300 text-white shadow-[0_0_35px_rgba(0,229,255,0.7)] flex items-center justify-center transition-all cursor-ew-resize ${isDraggingMaster ? 'scale-115 ring-4 ring-cyan-400/60' : 'hover:scale-105'
                }`}
            >
              <MoveHorizontal className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>

            {/* Indicator label */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-black/90 text-[10px] font-mono tracking-widest text-cyan-300 border border-cyan-400/40 backdrop-blur-md shadow-xl flex items-center gap-1.5">
              <span>‹</span>
              <span>SLIDE TO REVEAL</span>
              <span>›</span>
            </div>
          </div>
        </div>

        {/* Ambient Top Audio Toggle & Campaign Badge */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between pointer-events-auto">
          {/* Split indicator pills on mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold">
              WITH WATER
            </span>
            <span className="text-slate-500 text-xs">vs</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold">
              WITHOUT
            </span>
          </div>

          <div className="hidden sm:block" />

          {/* Audio toggle button */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer backdrop-blur-md border ${isAudioActive
              ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
              }`}
            title={isAudioActive ? 'Mute ambient water soundscape' : 'Enable ambient water soundscape'}
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isAudioActive ? 'Soundscape On' : 'Soundscape Off'}</span>
          </button>
        </div>

        {/* CENTER EDITORIAL HEADLINE & STORYTELLING CONTENT */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto pointer-events-none py-12">
          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/20 backdrop-blur-md mb-8 shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-cyan-200 font-medium">
              EVERY DROP — A COMMUNITY INITIATIVE BY ROGUE PIXXEL.
            </p>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.05] drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
          >
            ONE RESOURCE.
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]">
              TWO VERY DIFFERENT WORLDS.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-7 text-slate-100 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            Water shapes our lives in ways we often forget. From the food we grow to the homes we live in, every drop matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pointer-events-auto"
          >
            {/* Primary CTA */}
            <a
              href="#calculator"
              onClick={(e) => {
                if (onDiscoverFootprint) {
                  e.preventDefault();
                  onDiscoverFootprint();
                } else {
                  e.preventDefault();
                  scrollToSection('calculator');
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <span>UNDERSTAND YOUR WATER FOOTPRINT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#comparison-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('comparison-section');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/25 hover:border-cyan-400/50 text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>WHY EVERY DROP MATTERS</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Hero Anchor & Hint */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between text-xs font-mono text-slate-400 pointer-events-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="hidden sm:inline">Split-Screen Experience</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-300 font-semibold">{masterSplitPos}% Water Abundance</span>
          </div>

          <button
            onClick={() => scrollToSection('comparison-section')}
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span className="text-xs">Explore Comparison Sliders</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE TWO INTERACTIVE COMPARISON SLIDERS
          "TWO WORLDS. ONE RESOURCE." DUAL IMPACT EXPERIENCE
          ========================================================================= */}
      <section
        id="comparison-section"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/10"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Droplets className="w-3.5 h-3.5" />
            <span>Interactive Comparison Experience</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
            Witness the Contrast.
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Community & Everyday Home.
            </span>
          </h2>

          <p className="mt-5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Drag the comparison handles below to explore how access to clean water transforms an entire Indian agricultural community, and what happens inside the everyday household when the taps run dry.
          </p>

          {/* View Mode Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveSliderTab('both')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${activeSliderTab === 'both'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-lg'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Dual View (Both Sliders)</span>
            </button>

            <button
              onClick={() => setActiveSliderTab('community')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${activeSliderTab === 'community'
                ? 'bg-white text-slate-950 font-bold shadow-lg'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>Slider 1: Community Land</span>
            </button>

            <button
              onClick={() => setActiveSliderTab('household')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${activeSliderTab === 'household'
                ? 'bg-white text-slate-950 font-bold shadow-lg'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>Slider 2: Household Reality</span>
            </button>
          </div>
        </div>

        {/* Sliders Container: Synchronized & Connected Grid */}
        <div
          className={`grid gap-12 transition-all ${activeSliderTab === 'both'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
        >
          {/* SLIDER 1: COMMUNITY & AGRICULTURE (LIFE WITH WATER VS SCARCITY) */}
          {(activeSliderTab === 'both' || activeSliderTab === 'community') && (
            <ComparisonSlider
              id="slider-community"
              title="Slider 1: Indian Community & Agricultural Land"
              subtitle="Same rural Indian village: lush terraced crops & playing children vs severe parched drought"
              categoryBadge="Community & Environment"
              imageWith="/assets/journey/community_with_water.jpg"
              imageWithout="/assets/journey/community_without_water.jpg"
              labelWith="WITH WATER"
              labelWithout="WITHOUT WATER"
              summaryWith="Green agricultural fields, clean flowing canal, children splashing happily, working village tap, and healthy banyan trees."
              summaryWithout="Parched cracked agricultural land, dried-up canal, dry hand pump, withered crops, and dusty surroundings."
              bulletsWith={[
                'Lush green terraced agricultural fields & flowing irrigation canal',
                'Village children happily playing in clean, fresh water',
                'Woman filling clean brass container from a working community tap',
                'Flourishing mature banyan trees & peaceful village comfort',
              ]}
              bulletsWithout={[
                'Dry, deeply cracked agricultural earth & barren crop beds',
                'Empty water containers and silent, dry handpump well',
                'Withered dry trees, parched leaves, and dusty surroundings',
                'Urgent respectful scarcity: every drop requires hours of walking',
              ]}
              initialPosition={50}
            />
          )}

          {/* SLIDER 2: EVERYDAY HOUSEHOLD LIFE (CLEAN RUNNING WATER VS EMPTY TAP) */}
          {(activeSliderTab === 'both' || activeSliderTab === 'household') && (
            <ComparisonSlider
              id="slider-household"
              title="Slider 2: Everyday Household Life"
              subtitle="Inside daily family life: clean running kitchen tap vs dry containers and water shortages"
              categoryBadge="Everyday Domestic Life"
              imageWith="/assets/journey/life_with_water.jpg"
              imageWithout="/assets/journey/life_without_water.jpg"
              labelWith="WITH WATER"
              labelWithout="WITHOUT WATER"
              summaryWith="Clean running water pouring smoothly from a modern tap, fresh food washing, hydration, and healthy house plants."
              summaryWithout="Dry faucet producing zero water, empty glasses, cracked dried pots with withered leaves, and dust."
              bulletsWith={[
                'Family cooking & drinking with uninterrupted clean running tap water',
                'Fresh fruits & vegetables washed with crystal-clear water',
                'Healthy potted plants thriving on the bright kitchen windowsill',
                'Effortless domestic comfort and sanitation for the entire household',
              ]}
              bulletsWithout={[
                'Dry empty tap: zero water flows when turned during shortages',
                'Empty drinking glasses and containers waiting for water delivery',
                'Withered indoor plants and parched, cracked soil pots',
                'Family forced to ration every single liter for basic survival',
              ]}
              initialPosition={50}
            />
          )}
        </div>

        {/* Visual Connection Ribbon between Community and Home */}
        <div className="mt-14 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/50 to-amber-950/30 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                One Shared Resource: From Community Canals to Domestic Sinks
              </h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                When water reserves dry up in agricultural watersheds, taps in millions of homes stop flowing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              Independently Interactive
            </span>
          </div>
        </div>

        {/* EMOTIONAL PAUSE: IMPACT BANNER */}
        <div className="mt-20 max-w-4xl mx-auto text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#030914] to-[#030914] border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative overflow-hidden">
          {/* Subtle background glow circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <HeartHandshake className="w-10 h-10 text-cyan-400 mx-auto mb-6" />

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300 mb-4 font-semibold">
            The Moral Imperative
          </p>

          <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-wide leading-relaxed italic">
            “We are fortunate to have water today.
            <br className="hidden sm:inline" />
            We should not take it for granted.”
          </blockquote>

          <p className="mt-6 text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Every conscious habit — turning off the tap while brushing, fixing leaks, or harvesting rainwater — preserves our finite freshwater for generations ahead.
          </p>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                if (onDiscoverFootprint) {
                  onDiscoverFootprint();
                } else {
                  scrollToSection('calculator');
                }
              }}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer group"
            >
              <span>Calculate Your Household Footprint</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
