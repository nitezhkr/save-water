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
      // Very subtle atmospheric cloud mist
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0.1 + Math.random() * 0.2,
          vy: (Math.random() - 0.5) * 0.05,
          size: 50 + Math.random() * 80,
          alpha: 0.02 + Math.random() * 0.04,
          color: '255, 255, 255',
        });
      }
    } else if (currentScene === 1) {
      // Natural rain streaks
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -0.8 + Math.random() * 0.3,
          vy: 12 + Math.random() * 10,
          size: 1 + Math.random() * 0.8,
          length: 16 + Math.random() * 20,
          alpha: 0.15 + Math.random() * 0.25,
          color: '220, 235, 245',
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
          // Clean rain streaks
          ctx.strokeStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (p.vx * 1.5), p.y + (p.length || 18));
          ctx.stroke();

          p.x += p.vx;
          p.y += p.vy;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
            if (Math.random() < 0.05) {
              ripplesRef.current.push({
                x: p.x,
                y: height - 10 - Math.random() * 30,
                radius: 1,
                maxRadius: 14 + Math.random() * 10,
                alpha: 0.25,
                speed: 1,
              });
            }
          }
        }
      }

      // Render natural expanding ripples on click
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.007;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (r.radius > 6) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.75, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(186, 230, 253, ${r.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
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

  // Click & pointer down ripple
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 3,
      maxRadius: currentScene === 6 ? 140 : 70,
      alpha: 0.5,
      speed: currentScene === 6 ? 2.8 : 2.0,
    });

    waterAudio.playWaterDrop(currentScene === 6 ? 540 : 620 + Math.random() * 150);
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 z-20 w-full h-full pointer-events-auto cursor-default"
      style={{ touchAction: 'none' }}
    />
  );
};
