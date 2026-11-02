import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { waterAudio } from './audioService';

interface DropletCompanionProps {
  currentScene: number;
}

const SCENE_METRICS = [
  { label: 'Altitude', val: '3,840 m', status: 'Condensing' },
  { label: 'Velocity', val: '9.2 m/s', status: 'Precipitating' },
  { label: 'Flow Rate', val: '142 m³/s', status: 'Stream Basin' },
  { label: 'Filtration', val: '5-Stage RO', status: 'Municipal Grid' },
  { label: 'Inflow', val: '3.2 Bar', status: 'Sanctuary Tap' },
  { label: 'Impact', val: '12 L/min', status: 'Moment of Choice' },
  { label: 'Legacy', val: 'Global Ripples', status: 'Every Drop Counts' },
];

export const DropletCompanion: React.FC<DropletCompanionProps> = ({ currentScene }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWobbling, setIsWobbling] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from center (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx * 15, y: ny * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsWobbling(true);
    waterAudio.playWaterDrop(740 + Math.random() * 100);
    setTimeout(() => setIsWobbling(false), 600);
  };

  const metric = SCENE_METRICS[currentScene] || SCENE_METRICS[0];

  return (
    <div
      onClick={handleClick}
      className="hidden md:flex items-center gap-3.5 fixed bottom-14 left-8 z-40 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-full pl-2 pr-5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-cyan-400 transition-all group select-none"
      title="Click your droplet companion!"
    >

      {/* 3D Droplet Sphere with Glass Refraction & Specular Highlights */}
      <div
        className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-200"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${isWobbling ? 1.25 : 1})`,
          background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), rgba(56, 189, 248, 0.8) 35%, rgba(14, 116, 144, 0.9) 70%, rgba(3, 105, 161, 1) 100%)',
          boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.4), inset 3px 3px 8px rgba(255,255,255,0.7), 0 0 20px rgba(56,189,248,0.5)',
        }}
      >
        {/* Internal Specular light highlight */}
        <div className="absolute top-1.5 left-2 w-3.5 h-2 rounded-full bg-white/90 transform -rotate-45 blur-[0.5px]" />
        <div className="absolute bottom-2 right-2 w-2 h-1 rounded-full bg-cyan-200/60 blur-[0.5px]" />
        <Sparkles className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Real-time telemetry metadata */}
      <div className="flex flex-col text-left font-mono">
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 tracking-wider uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Droplet Telemetry</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white font-medium">
          <span>{metric.label}: <strong className="text-cyan-400">{metric.val}</strong></span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 text-[11px]">{metric.status}</span>
        </div>
      </div>
    </div>
  );
};
