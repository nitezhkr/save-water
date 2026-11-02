import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronDown,
  ArrowRight,
  Compass,
  Sparkles,
  Droplet,
} from 'lucide-react';
import { WaterCanvasOverlay } from './WaterCanvasOverlay';
import { ChoiceComparison } from './ChoiceComparison';
import { DropletCompanion } from './DropletCompanion';
import { waterAudio } from './audioService';

interface SceneData {
  id: number;
  name: string;
  phase: string;
  headline: string;
  subline: string;
  image: string;
  statBadge: string;
  cameraTransform: string;
}

const SCENES: SceneData[] = [
  {
    id: 1,
    name: 'The Clouds',
    phase: '01 / 07 • ATMOSPHERE',
    headline: 'IT STARTS IN NATURE.',
    subline:
      'High above alpine summits, invisible moisture coalesces into swirling clouds, condensing water vapor into the first microscopic droplets of life.',
    image: '/assets/journey/scene1_clouds.jpg',
    statBadge: 'Condensation Phase • Altitude 3,400m',
    cameraTransform: 'scale-105 translate-y-0',
  },
  {
    id: 2,
    name: 'The Rain',
    phase: '02 / 07 • PRECIPITATION',
    headline: 'EVERY DROP HAS A JOURNEY.',
    subline:
      'Breaking free from storm clouds, a single crystal droplet plummets through cool mountain air, descending toward ancient pine forests and alpine soil.',
    image: '/assets/journey/scene2_rain.jpg',
    statBadge: 'Terminal Descent • 9.1 m/s',
    cameraTransform: 'scale-110 translate-y-2',
  },
  {
    id: 3,
    name: 'The Rivers',
    phase: '03 / 07 • WATERSHED',
    headline: 'FLOWING THROUGH OUR WORLD.',
    subline:
      'Alpine runoff gathers into crystalline tributaries, carving deep mountain canyons and merging into rushing turquoise rivers that nourish entire continents.',
    image: '/assets/journey/scene3_rivers.jpg',
    statBadge: 'Basin Discharge • 142 m³/s',
    cameraTransform: 'scale-105 translate-x-1',
  },
  {
    id: 4,
    name: 'The Reservoirs',
    phase: '04 / 07 • INFRASTRUCTURE',
    headline: 'COLLECTED. TREATED. DELIVERED.',
    subline:
      'Captured by engineering marvels, millions of gallons enter advanced municipal filtration facilities and high-pressure aqueducts destined for civil life.',
    image: '/assets/journey/scene4_reservoirs.jpg',
    statBadge: 'Purification Grid • 5-Stage RO',
    cameraTransform: 'scale-105 -translate-y-1',
  },
  {
    id: 5,
    name: 'Our Homes',
    phase: '05 / 07 • RESIDENTIAL',
    headline: 'UNTIL IT REACHES US.',
    subline:
      'After travelling hundreds of miles through subterranean conduits, it emerges silently from our kitchen and bathroom taps — pure, cold, and essential.',
    image: '/assets/journey/scene5_homes.jpg',
    statBadge: 'Household Tap • 3.2 Bar Pressure',
    cameraTransform: 'scale-110 translate-y-1',
  },
  {
    id: 6,
    name: 'The Choice',
    phase: '06 / 07 • THE CHOICE',
    headline: 'EVERY DROP REACHES A CHOICE.',
    subline:
      'Will it be left running mindlessly down a drain in seconds, or consciously protected through simple, mindful daily conservation?',
    image: '/assets/journey/scene6_choice.jpg',
    statBadge: 'Critical Impact • Waste vs Saving',
    cameraTransform: 'scale-100',
  },
  {
    id: 7,
    name: 'The Message',
    phase: '07 / 07 • THE MESSAGE',
    headline: 'EVERY DROP. EVERY DAY.',
    subline:
      "From the clouds above to the tap in your home, every drop has a journey. Make sure it isn't wasted.",
    image: '/assets/journey/scene7_message.jpg',
    statBadge: 'Conscious Legacy • Purity Ripple',
    cameraTransform: 'scale-115 -translate-y-2',
  },
];

interface WaterJourneyHeroProps {
  onDiscoverFootprint?: () => void;
  onExploreClick?: () => void;
}

export const WaterJourneyHero: React.FC<WaterJourneyHeroProps> = ({
  onDiscoverFootprint,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Sync scroll position with current scene
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Scrollable distance within the hero section
      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Determine scene index (0 to 6)
      const sceneIndex = Math.min(
        SCENES.length - 1,
        Math.floor(progress * SCENES.length)
      );

      if (sceneIndex !== currentSceneIndex) {
        setCurrentSceneIndex(sceneIndex);
        waterAudio.playWaterDrop(520 + sceneIndex * 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSceneIndex]);

  // Autoplay Tour mode
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = window.setInterval(() => {
        setCurrentSceneIndex((prev) => {
          const next = (prev + 1) % SCENES.length;
          // Smoothly scroll to the corresponding section of the hero
          if (containerRef.current) {
            const containerTop = containerRef.current.offsetTop;
            const scrollStep =
              (containerRef.current.offsetHeight - window.innerHeight) /
              (SCENES.length - 1);
            window.scrollTo({
              top: containerTop + next * scrollStep,
              behavior: 'smooth',
            });
          }
          waterAudio.playWaterDrop(500 + next * 45);
          return next;
        });
      }, 5500);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Jump directly to a scene
  const goToScene = (index: number) => {
    setCurrentSceneIndex(index);
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const scrollStep =
        (containerRef.current.offsetHeight - window.innerHeight) /
        (SCENES.length - 1);
      window.scrollTo({
        top: containerTop + index * scrollStep,
        behavior: 'smooth',
      });
    }
    waterAudio.playWaterDrop(600 + index * 30);
  };

  // Toggle ambient procedural audio
  const handleToggleAudio = () => {
    const newState = waterAudio.toggleAudio();
    setIsAudioActive(newState);
  };

  const currentScene = SCENES[currentSceneIndex];

  return (
    <div
      ref={containerRef}
      id="journey-hero"
      className="relative w-full"
      style={{ height: '700vh' }} // Generous scroll track for smooth scrub
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030914] text-white select-none">
        {/* Layer 1: Photographic Cinematic Backdrops with Crossfade & Parallax */}
        <div className="absolute inset-0 z-0">
          {SCENES.map((scene, idx) => {
            const isActive = idx === currentSceneIndex;
            return (
              <div
                key={scene.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-10000 ease-out ${
                    isActive ? scene.cameraTransform : 'scale-100'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Atmospheric Vignette & Color Grading Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-black/40 to-[#030914]/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#030914]/30 to-[#030914]/90" />
                {idx === 5 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-cyan-950/25 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Layer 2: Interactive WebGL/Canvas Water Overlay (Rain, ripples, particles) */}
        <WaterCanvasOverlay currentScene={currentSceneIndex} isAudioEnabled={isAudioActive} />

        {/* Layer 3: Interactive Droplet Telemetry Companion */}
        <DropletCompanion currentScene={currentSceneIndex} />

        {/* Layer 4: Top Floating Status & Media Controls Bar */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          {/* Left: Active Scene Stage Indicator */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2.5 text-xs font-mono tracking-wider text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold">{currentScene.phase}</span>
            </div>
            <div className="hidden md:flex glass-pill px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300">
              {currentScene.statBadge}
            </div>
          </div>

          {/* Right: Autoplay & Audio Immersion Controls */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono tracking-wider text-slate-200 hover:text-white hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              title="Experience auto-guided journey"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Pause Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  <span className="hidden sm:inline">Play Journey</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleAudio}
              className={`glass-pill p-2 rounded-full transition-all cursor-pointer shadow-lg ${
                isAudioActive
                  ? 'border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isAudioActive ? 'Mute Water Soundscape' : 'Enable Ambient Soundscape'}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Layer 5: Hero Center Cinematic Typography & Visual Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Scene 7: Climax Headline vs Scenes 1-6 Story Headlines */}
            {currentSceneIndex === 6 ? (
              // SCENE 7: THE MESSAGE & MAIN HERO HEADLINE
              <div className="flex flex-col items-center animate-fade-in pointer-events-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md glow-cyan">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                  <span>The Ripple Starts With You</span>
                </div>

                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white uppercase leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] glow-text-white">
                  EVERY DROP.<br />
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent glow-text-cyan">
                    EVERY DAY.
                  </span>
                </h1>

                <p className="mt-6 text-slate-200 text-base sm:text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-balance drop-shadow-md">
                  From the clouds above to the tap in your home, every drop has a journey. Make sure it isn't wasted.
                </p>

                {/* Main Hero Call To Actions */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <a
                    href="#calculator"
                    onClick={(e) => {
                      if (onDiscoverFootprint) {
                        e.preventDefault();
                        onDiscoverFootprint();
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm md:text-base tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-[0_0_35px_rgba(14,165,233,0.6)] flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <span>DISCOVER YOUR WATER FOOTPRINT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <button
                    onClick={() => {
                      if (onExploreClick) onExploreClick();
                      goToScene(0);
                    }}
                    className="w-full sm:w-auto px-7 py-4 rounded-full glass-panel hover:bg-white/10 text-white text-sm md:text-base font-medium tracking-wider uppercase transition-all border border-white/20 hover:border-cyan-400/60 flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-xl"
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>EXPLORE THE JOURNEY</span>
                  </button>
                </div>
              </div>
            ) : currentSceneIndex === 5 ? (
              // SCENE 6: THE CHOICE INTERACTIVE COMPARISON
              <div className="flex flex-col items-center w-full">
                <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest uppercase mb-2">
                  SCENE 06 • THE CROSSROADS
                </span>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg uppercase">
                  {currentScene.headline}
                </h2>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm md:text-base max-w-xl font-light">
                  {currentScene.subline}
                </p>

                {/* Interactive Split Screen Comparison Slider */}
                <ChoiceComparison
                  onInteract={() => {
                    // Interaction trigger
                  }}
                />
              </div>
            ) : (
              // SCENES 1 - 5: THE STORY PROGRESSION
              <div className="flex flex-col items-center">
                <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md">
                  SCENE {currentScene.id.toString().padStart(2, '0')} • {currentScene.name.toUpperCase()}
                </span>

                <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)] max-w-3xl leading-[1.05]">
                  {currentScene.headline}
                </h2>

                <p className="mt-5 text-slate-200 text-sm sm:text-lg md:text-xl font-light max-w-xl leading-relaxed drop-shadow-md text-balance">
                  {currentScene.subline}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs font-mono text-cyan-300/80 pointer-events-auto">
                  <span className="animate-bounce">↓</span>
                  <span>Scroll or drag timeline to follow the droplet</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layer 6: Right Side Interactive Scene Scrubber Dots */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-auto">
          {SCENES.map((scene, idx) => {
            const isActive = idx === currentSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => goToScene(idx)}
                className="group relative flex items-center justify-end p-1.5 cursor-pointer"
                title={`${scene.phase}: ${scene.name}`}
              >
                {/* Floating tooltip label */}
                <span className="absolute right-8 px-2.5 py-1 rounded bg-slate-950/90 text-[11px] font-mono text-cyan-300 border border-cyan-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
                  {scene.name}
                </span>

                {/* Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-cyan-400 ring-4 ring-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                      : 'w-2 h-2 bg-slate-500 hover:bg-slate-300 hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Layer 7: Bottom Scroll Progress Bar & Down Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-400 ml-72">
            <Droplet className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>THE WATER CYCLE IN MOTION</span>
          </div>
          <div className="xl:hidden" />


          {/* Interactive Progress Bar */}
          <div className="hidden sm:block w-48 md:w-72 h-1 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <a
            href="#calculator"
            className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors pointer-events-auto"
          >
            <span>Skip to Calculator</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          </a>
        </div>
      </div>
    </div>
  );
};
