import React, { useEffect, useRef } from 'react';
import { waterAudio } from './audioService';

interface WaterCanvasOverlayProps {
  currentScene: number; // 0 to 6
  isAudioEnabled?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  length?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const WaterCanvasOverlay: React.FC<WaterCanvasOverlayProps> = ({
  currentScene,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Initialize particles based on scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];

    if (currentScene === 0) {
      // Atmospheric clouds / mist
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0.15 + Math.random() * 0.35,
          vy: (Math.random() - 0.5) * 0.1,
          size: 40 + Math.random() * 90,
          alpha: 0.03 + Math.random() * 0.07,
          color: '255, 255, 255',
        });
      }
    } else if (currentScene === 1) {
      // Rainfall
      for (let i = 0; i < 110; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -1.2 + Math.random() * 0.4,
          vy: 14 + Math.random() * 12,
          size: 1 + Math.random() * 1.5,
          length: 18 + Math.random() * 25,
          alpha: 0.25 + Math.random() * 0.45,
          color: '180, 230, 255',
        });
      }
    } else if (currentScene === 2) {
      // River current shimmer
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 2 + Math.random() * 3.5,
          vy: 1 + Math.random() * 1.5,
          size: 2 + Math.random() * 3,
          alpha: 0.15 + Math.random() * 0.4,
          color: '103, 232, 249',
        });
      }
    } else if (currentScene === 3) {
      // Reservoir / pipeline energy pulses
      for (let i = 0; i < 35; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 1 + Math.random() * 2,
          vy: 0,
          size: 3 + Math.random() * 2,
          alpha: 0.3 + Math.random() * 0.5,
          color: '56, 189, 248',
        });
      }
    } else if (currentScene === 5) {
      // Choice: Left red/amber waste motes vs Right cyan conservation droplets
      for (let i = 0; i < 50; i++) {
        const isLeft = i % 2 === 0;
        particles.push({
          x: isLeft ? Math.random() * (width * 0.45) : width * 0.55 + Math.random() * (width * 0.45),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: isLeft ? 1.5 + Math.random() * 2 : -0.5 - Math.random() * 1,
          size: 2 + Math.random() * 3,
          alpha: 0.2 + Math.random() * 0.4,
          color: isLeft ? '248, 113, 113' : '34, 211, 238',
        });
      }
    }

    particlesRef.current = particles;
  }, [currentScene]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Render Scene Particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (currentScene === 0) {
          // Soft mist circles
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          if (p.x - p.size > width) p.x = -p.size;
        } else if (currentScene === 1) {
          // Rain streaks
          ctx.strokeStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (p.vx * 1.5), p.y + (p.length || 20));
          ctx.stroke();

          p.x += p.vx;
          p.y += p.vy;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
            // Spawn tiny ground splash ripple occasionally
            if (Math.random() < 0.08) {
              ripplesRef.current.push({
                x: p.x,
                y: height - 10 - Math.random() * 40,
                radius: 1,
                maxRadius: 18 + Math.random() * 15,
                alpha: 0.35,
                speed: 1.2,
              });
            }
          }
        } else if (currentScene === 2 || currentScene === 3 || currentScene === 5) {
          // Shimmering water motes / droplets
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;
          if (p.y > height) p.y = 0;
          if (p.y < 0) p.y = height;
        }
      }

      // Render expanding Ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.008;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw double concentric wave ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Inner secondary wave
        if (r.radius > 8) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(165, 243, 252, ${r.alpha * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currentScene]);

  // Click & Mouse move ripple spawn
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: currentScene === 6 ? 160 : 85,
      alpha: 0.65,
      speed: currentScene === 6 ? 3.5 : 2.4,
    });

    // Play subtle crystal water chime
    waterAudio.playWaterDrop(currentScene === 6 ? 520 : 640 + Math.random() * 200);
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 z-20 w-full h-full pointer-events-auto cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
};
