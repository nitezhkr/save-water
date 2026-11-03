import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Drip {
  x: number;
  y: number;
  speedY: number;
  radius: number;
  alpha: number;
}

export const LiveWaterOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mouse tracking
  const mousePos = useRef({ x: -1000, y: -1000, isHovering: false });
  const lastMousePos = useRef({ x: -1000, y: -1000 });

  const bubblesRef = useRef<Bubble[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const dripsRef = useRef<Drip[]>([]);
  const timeRef = useRef<number>(0);

  // Curve calculation matching the exact 16:9 image water boundary
  const getWaterBaseY = (x: number, w: number, h: number) => {
    const normX = Math.max(0, Math.min(1, x / w));
    // Curve formula calibrated to the 16:9 split contour
    const pct = 0.46 + 0.12 * Math.sin(normX * Math.PI) - 0.13 * normX;
    return h * pct;
  };

  // Initialize bubbles
  const initBubbles = useCallback((width: number, height: number) => {
    const bubbles: Bubble[] = [];
    const count = Math.min(65, Math.floor(width / 24));

    for (let i = 0; i < count; i++) {
      const bx = Math.random() * width;
      const maxY = getWaterBaseY(bx, width, height) - 10;

      bubbles.push({
        x: bx,
        y: Math.random() * Math.max(50, maxY),
        radius: Math.random() * 8 + 2.5, // 2.5px to 10.5px
        speedY: Math.random() * 0.9 + 0.5,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
        wobbleAmp: Math.random() * 1.5 + 0.6,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.35,
      });
    }
    bubblesRef.current = bubbles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (bubblesRef.current.length === 0) {
        initBubbles(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      timeRef.current += 0.018;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------------------
      // 1. DYNAMIC SUNLIGHT GOD RAYS FROM TOP SURFACE
      // ----------------------------------------------------
      const raySourceX = width * 0.49;
      const raySourceY = -25;

      const numRays = 10;
      for (let i = 0; i < numRays; i++) {
        const baseAngle = (i / (numRays - 1) - 0.5) * 1.35; // Fan spread
        const sway = Math.sin(t * 0.7 + i * 1.1) * 0.06;
        const angle = baseAngle + sway;
        const beamLength = height * 0.75;

        const p1X = raySourceX + Math.sin(angle - 0.05) * beamLength;
        const p1Y = raySourceY + Math.cos(angle - 0.05) * beamLength;
        const p2X = raySourceX + Math.sin(angle + 0.05) * beamLength;
        const p2Y = raySourceY + Math.cos(angle + 0.05) * beamLength;

        const pulse = 0.14 + Math.sin(t * 1.3 + i * 0.8) * 0.06;

        const rayGrad = ctx.createRadialGradient(
          raySourceX,
          raySourceY,
          10,
          (p1X + p2X) / 2,
          (p1Y + p2Y) / 2,
          beamLength
        );
        rayGrad.addColorStop(0, `rgba(255, 255, 255, ${pulse * 1.7})`);
        rayGrad.addColorStop(0.25, `rgba(180, 245, 255, ${pulse * 1.1})`);
        rayGrad.addColorStop(0.7, `rgba(56, 189, 248, ${pulse * 0.4})`);
        rayGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(raySourceX, raySourceY);
        ctx.lineTo(p1X, p1Y);
        ctx.lineTo(p2X, p2Y);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.globalCompositeOperation = 'screen';
        ctx.fill();
        ctx.restore();
      }

      // ----------------------------------------------------
      // 2. SUBTLE PROCEDURAL CAUSTIC RIPPLE MESH
      // ----------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const causticLines = 5;
      for (let i = 0; i < causticLines; i++) {
        const cy = (height * 0.38 / (causticLines + 1)) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(0, cy);
        for (let x = 0; x <= width; x += 30) {
          const dy =
            Math.sin(x * 0.012 + t * 1.1 + i) * 6 +
            Math.cos(x * 0.022 - t * 0.7 + i * 1.4) * 4;
          ctx.lineTo(x, cy + dy);
        }
        ctx.strokeStyle = `rgba(186, 230, 253, ${0.07 + Math.sin(t + i) * 0.03})`;
        ctx.lineWidth = 2 + Math.sin(t * 1.5 + i);
        ctx.stroke();
      }
      ctx.restore();

      // ----------------------------------------------------
      // 3. INTERACTIVE RIPPLE SHOCKWAVES
      // ----------------------------------------------------
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += rip.speed;
        rip.alpha -= 0.012;

        if (rip.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          rip.x,
          rip.y,
          rip.radius,
          rip.radius * 0.42,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(224, 242, 254, ${rip.alpha * 0.65})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // ----------------------------------------------------
      // 4. ANIMATED 3D BUBBLES
      // ----------------------------------------------------
      const bubbles = bubblesRef.current;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Move upward with wobble
        b.y -= b.speedY;
        b.wobbleOffset += b.wobbleSpeed;
        const lateralX = b.x + Math.sin(b.wobbleOffset) * b.wobbleAmp;

        // Interaction with mouse cursor
        if (mousePos.current.isHovering) {
          const dx = lateralX - mousePos.current.x;
          const dy = b.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            const force = (90 - dist) / 90;
            b.x += (dx / dist) * force * 3;
            b.speedY += force * 0.1;
          }
        }

        // Reset bubble when reaching top surface
        if (b.y < -b.radius * 2) {
          const resetX = Math.random() * width;
          const maxY = getWaterBaseY(resetX, width, height);
          b.y = maxY - b.radius - Math.random() * 25;
          b.x = resetX;
          b.speedY = Math.random() * 0.9 + 0.5;
        }

        // Render 3D Translucent Bubble
        ctx.save();
        ctx.translate(lateralX, b.y);

        // Ambient inner glow
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${b.opacity * 0.16})`;
        ctx.fill();

        // Bubble rim with gradient
        const rimGrad = ctx.createLinearGradient(-b.radius, -b.radius, b.radius, b.radius);
        rimGrad.addColorStop(0, `rgba(255, 255, 255, ${b.opacity * 0.95})`);
        rimGrad.addColorStop(0.5, `rgba(56, 189, 248, ${b.opacity * 0.5})`);
        rimGrad.addColorStop(1, `rgba(2, 132, 199, ${b.opacity * 0.75})`);
        ctx.strokeStyle = rimGrad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Specular highlight crescent
        ctx.beginPath();
        ctx.arc(
          -b.radius * 0.35,
          -b.radius * 0.35,
          b.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.9})`;
        ctx.fill();

        // Secondary subtle inner reflection
        ctx.beginPath();
        ctx.arc(
          b.radius * 0.3,
          b.radius * 0.3,
          b.radius * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.4})`;
        ctx.fill();

        ctx.restore();
      }

      // ----------------------------------------------------
      // 5. ANIMATED WATER MENISCUS BOUNDARY WAVE (Along 16:9 curve)
      // ----------------------------------------------------
      ctx.save();
      ctx.beginPath();

      const wavePoints: { x: number; y: number }[] = [];
      const waveStep = 10;
      for (let x = 0; x <= width + waveStep; x += waveStep) {
        const baseY = getWaterBaseY(x, width, height);

        // Harmonic waves
        const wave1 = Math.sin(x * 0.007 + t * 1.5) * 6;
        const wave2 = Math.cos(x * 0.016 - t * 1.0) * 3;
        const wave3 = Math.sin(x * 0.03 + t * 2.0) * 1.5;

        // Mouse displacement
        let mouseDisplace = 0;
        if (mousePos.current.isHovering) {
          const mDist = Math.abs(x - mousePos.current.x);
          if (mDist < 120) {
            const mWeight = (120 - mDist) / 120;
            mouseDisplace = Math.sin(mDist * 0.08 - t * 4) * 7 * mWeight;
          }
        }

        const wy = baseY + wave1 + wave2 + wave3 + mouseDisplace;
        wavePoints.push({ x, y: wy });

        if (x === 0) ctx.moveTo(x, wy);
        else ctx.lineTo(x, wy);
      }

      // Luminous white refraction line along wave meniscus
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2.6;
      ctx.shadowColor = 'rgba(56, 189, 248, 1)';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Deeper cyan glow line beneath
      ctx.beginPath();
      for (let i = 0; i < wavePoints.length; i++) {
        const pt = wavePoints[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y + 2.5);
        else ctx.lineTo(pt.x, pt.y + 2.5);
      }
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)';
      ctx.lineWidth = 3.8;
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.restore();

      // ----------------------------------------------------
      // 6. DRIPPING WATER DROPLETS
      // ----------------------------------------------------
      if (Math.random() < 0.025 && dripsRef.current.length < 5) {
        const rx = width * (0.15 + Math.random() * 0.7);
        const ry = getWaterBaseY(rx, width, height) + 6;
        dripsRef.current.push({
          x: rx,
          y: ry,
          speedY: 1.2,
          radius: 3 + Math.random() * 2.5,
          alpha: 0.9,
        });
      }

      for (let i = dripsRef.current.length - 1; i >= 0; i--) {
        const d = dripsRef.current[i];
        d.y += d.speedY;
        d.speedY += 0.09;
        d.alpha -= 0.008;

        if (d.alpha <= 0 || d.y > height + 80) {
          dripsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI);
        ctx.lineTo(d.x, d.y - d.radius * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(186, 230, 253, ${d.alpha * 0.85})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x - 1, d.y - 1, d.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initBubbles]);

  // Pointer interactions
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y, isHovering: true };

    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Create micro-bubbles on movement
    if (dist > 15 && Math.random() < 0.4) {
      bubblesRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 10,
        radius: Math.random() * 5 + 2,
        speedY: Math.random() * 1.5 + 0.8,
        wobbleSpeed: 0.05,
        wobbleAmp: 1.2,
        wobbleOffset: Math.random() * Math.PI,
        opacity: 0.85,
      });

      if (bubblesRef.current.length > 80) {
        bubblesRef.current.shift();
      }
    }

    // Spawn ripple
    if (dist > 30) {
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 65,
        alpha: 0.7,
        speed: 1.8,
      });
      lastMousePos.current = { x, y };
    }

    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 9; i++) {
      bubblesRef.current.push({
        x: x + (Math.random() - 0.5) * 32,
        y: y + (Math.random() - 0.5) * 20,
        radius: Math.random() * 6 + 3,
        speedY: Math.random() * 2 + 1,
        wobbleSpeed: 0.06,
        wobbleAmp: 1.5,
        wobbleOffset: Math.random() * Math.PI,
        opacity: 0.9,
      });
    }

    ripplesRef.current.push({
      x,
      y,
      radius: 6,
      maxRadius: 110,
      alpha: 1,
      speed: 2.8,
    });

    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerLeave = () => {
    mousePos.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="absolute top-0 left-0 right-0 bottom-0 z-20 cursor-pointer overflow-hidden select-none"
      title="Touch or move cursor over water to create live ripples & bubbles"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* Floating subtle interaction hint */}
      {!hasInteracted && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-cyan-200 text-[11px] font-medium tracking-wide backdrop-blur-md animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          Touch or move cursor over water to create live ripples &amp; bubbles
        </div>
      )}
    </div>
  );
};
