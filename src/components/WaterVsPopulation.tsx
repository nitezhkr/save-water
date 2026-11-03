import React, { useState } from 'react';
import { Users, Droplet, AlertTriangle, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface TimelineYearData {
  year: number;
  population: string;
  populationMult: string;
  waterPerCapita: string;
  waterDecline: string;
  stressBadge: string;
  stressLevel: 'Safe' | 'Moderate' | 'High' | 'Severe' | 'Critical';
  stressImpactNumber: string;
  stressImpactText: string;
  quote: string;
}

const timelineData: Record<number, TimelineYearData> = {
  1950: {
    year: 1950,
    population: '2.5 Billion',
    populationMult: 'Baseline',
    waterPerCapita: '11,200 m³',
    waterDecline: 'Baseline',
    stressBadge: 'GLOBAL STRESS: SAFE',
    stressLevel: 'Safe',
    stressImpactNumber: '200 Million',
    stressImpactText: 'people faced localized water stress worldwide.',
    quote: '"Freshwater was treated as an infinite, boundless resource with zero extraction caps."',
  },
  1980: {
    year: 1980,
    population: '4.4 Billion',
    populationMult: '~1.8x',
    waterPerCapita: '7,500 m³',
    waterDecline: '-33%',
    stressBadge: 'GLOBAL STRESS: MODERATE',
    stressLevel: 'Moderate',
    stressImpactNumber: '650 Million',
    stressImpactText: 'people entered recurring seasonal water stress.',
    quote: '"Agricultural deep tube-well pumping surged 300% across the global south."',
  },
  2000: {
    year: 2000,
    population: '6.1 Billion',
    populationMult: '~2.4x',
    waterPerCapita: '4,600 m³',
    waterDecline: '-59%',
    stressBadge: 'GLOBAL STRESS: HIGH',
    stressLevel: 'High',
    stressImpactNumber: '1.4 Billion',
    stressImpactText: 'people lived inside chronic water-stressed basins.',
    quote: '"The first major continental aquifers began displaying irreversible water table collapse."',
  },
  2026: {
    year: 2026,
    population: '8.2 Billion',
    populationMult: '~3.3x',
    waterPerCapita: '3,600 m³',
    waterDecline: '-68%',
    stressBadge: 'GLOBAL STRESS: SEVERE',
    stressLevel: 'Severe',
    stressImpactNumber: '2.4 Billion',
    stressImpactText: 'people currently lack reliable piped drinking water today.',
    quote: '"Over 40% of global grain production is harvested from rapidly depleting fossil aquifers."',
  },
  2050: {
    year: 2050,
    population: '9.8 Billion',
    populationMult: '~6x',
    waterPerCapita: '2,900 m³',
    waterDecline: '-83%',
    stressBadge: 'GLOBAL STRESS: CRITICAL',
    stressLevel: 'Critical',
    stressImpactNumber: '5.2 Billion',
    stressImpactText: 'people could face severe water stress by 2050.',
    quote: '"Projected: More than 50% of the global population will live under severe annual water scarcity."',
  },
};

const years = [1950, 1980, 2000, 2026, 2050] as const;

export const WaterVsPopulation: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2050);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const activeYear = hoveredYear || selectedYear;
  const current = timelineData[activeYear];

  // SVG Chart Coordinates (520 x 220 viewBox)
  // X range: 50 to 470
  // Y range: 25 to 195 (0 at y=195, 12 at y=25, height=170)
  const chartPoints = [
    { year: 1950, x: 50, popY: 195 - (2.5 / 12) * 170, waterY: 195 - (11.2 / 12) * 170 },
    { year: 1980, x: 155, popY: 195 - (4.4 / 12) * 170, waterY: 195 - (7.5 / 12) * 170 },
    { year: 2000, x: 260, popY: 195 - (6.1 / 12) * 170, waterY: 195 - (4.6 / 12) * 170 },
    { year: 2026, x: 365, popY: 195 - (8.2 / 12) * 170, waterY: 195 - (3.6 / 12) * 170 },
    { year: 2050, x: 470, popY: 195 - (9.8 / 12) * 170, waterY: 195 - (2.9 / 12) * 170 },
  ];

  // Smooth SVG Bezier curves
  const popPath = `M ${chartPoints[0].x} ${chartPoints[0].popY} C 100 150, 200 120, ${chartPoints[2].x} ${chartPoints[2].popY} C 310 95, 410 70, ${chartPoints[4].x} ${chartPoints[4].popY}`;
  const popAreaPath = `${popPath} L 470 195 L 50 195 Z`;

  const waterPath = `M ${chartPoints[0].x} ${chartPoints[0].waterY} C 100 65, 200 115, ${chartPoints[2].x} ${chartPoints[2].waterY} C 310 142, 410 150, ${chartPoints[4].x} ${chartPoints[4].waterY}`;
  const waterAreaPath = `${waterPath} L 470 195 L 50 195 Z`;

  const activePoint = chartPoints.find((p) => p.year === activeYear) || chartPoints[4];

  return (
    <section id="water-vs-population" className="relative py-20 sm:py-24 bg-[#030914] overflow-hidden select-none">
      {/* 1. Dramatic Background with Glowing Earth on Upper Right */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft background lighting */}
        <div className="absolute top-0 right-0 w-3/4 max-w-2xl h-full opacity-60">
          <img
            src="/assets/earth_globe_glow.png"
            alt="Earth drought perspective"
            className="w-full h-auto object-contain object-top-right filter drop-shadow-[0_0_50px_rgba(34,211,238,0.2)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/earth_globe_bg.jpg';
            }}
          />
        </div>

        {/* Ambient atmospheric gradients */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-950/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2. Top Left Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Users className="w-3.5 h-3.5" />
            <span>THE BIGGER PICTURE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            A Constant Drop.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              A Multiplying World.
            </span>
          </h2>

          <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed font-normal">
            The amount of freshwater on Earth has not increased, but the number of
            people depending on it has grown{' '}
            <strong className="text-white font-bold">six-fold in just 150 years</strong> — making
            every drop more valuable, and more vulnerable.
          </p>
        </div>

        {/* 3. Main Glassmorphic Dashboard Card */}
        <div className="rounded-3xl bg-[#071324]/75 border border-cyan-500/25 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Card Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-800/80 mb-6">
            {/* Title with icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block">
                  INTERACTIVE TIMELINE
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  The Historical &amp; Projected Divergence
                </h3>
              </div>
            </div>

            {/* Year Selector Tabs */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800 self-start sm:self-auto">
              {years.map((yr) => {
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    onMouseEnter={() => setHoveredYear(yr)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-105'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Body: Left Line Chart + Right Stat Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
            {/* Left: Dual Axis Divergence Chart (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Legend */}
              <div className="flex items-center gap-6 text-xs font-medium mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <span>Global Population</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span>Freshwater per Capita</span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/40 border border-slate-800/50 p-2 overflow-hidden">
                <svg viewBox="0 0 520 230" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Orange Gradient Area for Population */}
                    <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.38" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Cyan Gradient Area for Freshwater */}
                    <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  {[0, 2, 4, 6, 8, 10, 12].map((val) => {
                    const y = 195 - (val / 12) * 170;
                    return (
                      <g key={val}>
                        <line
                          x1="45"
                          y1={y}
                          x2="475"
                          y2={y}
                          stroke="rgba(255,255,255,0.06)"
                          strokeDasharray="3 3"
                        />
                        {/* Left Y Labels (Population B) */}
                        <text
                          x="38"
                          y={y + 3}
                          fill="#94a3b8"
                          fontSize="9"
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          {val === 0 ? '0' : `${val}B`}
                        </text>
                        {/* Right Y Labels (Freshwater m3) */}
                        <text
                          x="482"
                          y={y + 3}
                          fill="#94a3b8"
                          fontSize="9"
                          textAnchor="start"
                          fontFamily="monospace"
                        >
                          {val === 0 ? '0' : `${val * 1000} m³`}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis Years */}
                  {chartPoints.map((pt) => (
                    <text
                      key={pt.year}
                      x={pt.x}
                      y="218"
                      fill={pt.year === activeYear ? '#22d3ee' : '#64748b'}
                      fontWeight={pt.year === activeYear ? 'bold' : 'normal'}
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pt.year}
                    </text>
                  ))}

                  {/* Shaded Areas */}
                  <path d={popAreaPath} fill="url(#popGrad)" />
                  <path d={waterAreaPath} fill="url(#waterGrad)" />

                  {/* Render Curves */}
                  <path
                    d={popPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.8"
                    filter="drop-shadow(0 0 6px rgba(245,158,11,0.6))"
                  />
                  <path
                    d={waterPath}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2.8"
                    filter="drop-shadow(0 0 6px rgba(34,211,238,0.6))"
                  />

                  {/* Active Scanline Indicator */}
                  <line
                    x1={activePoint.x}
                    y1="25"
                    x2={activePoint.x}
                    y2="195"
                    stroke="rgba(34,211,238,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Render Data Points */}
                  {chartPoints.map((pt) => {
                    const isSelected = pt.year === activeYear;
                    return (
                      <g
                        key={pt.year}
                        className="cursor-pointer"
                        onClick={() => setSelectedYear(pt.year)}
                        onMouseEnter={() => setHoveredYear(pt.year)}
                        onMouseLeave={() => setHoveredYear(null)}
                      >
                        {/* Interactive Clickable Area */}
                        <rect
                          x={pt.x - 20}
                          y="15"
                          width="40"
                          height="190"
                          fill="transparent"
                        />

                        {/* Population Node */}
                        <circle
                          cx={pt.x}
                          cy={pt.popY}
                          r={isSelected ? '6' : '4'}
                          fill="#f59e0b"
                          stroke="#030914"
                          strokeWidth="2"
                          className="transition-all duration-300"
                        />
                        {isSelected && (
                          <circle
                            cx={pt.x}
                            cy={pt.popY}
                            r="9"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                            className="animate-ping"
                          />
                        )}

                        {/* Water Node */}
                        <circle
                          cx={pt.x}
                          cy={pt.waterY}
                          r={isSelected ? '6' : '4'}
                          fill="#22d3ee"
                          stroke="#030914"
                          strokeWidth="2"
                          className="transition-all duration-300"
                        />
                        {isSelected && (
                          <circle
                            cx={pt.x}
                            cy={pt.waterY}
                            r="9"
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="1.5"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Right: The 2 Stat Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Stat Card 1: GLOBAL HUMAN POPULATION */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0a1a2b] border border-amber-500/30 backdrop-blur-xl shadow-lg flex items-center justify-between gap-4 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      GLOBAL HUMAN POPULATION
                    </span>
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Growing Exponentially
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                      {current.population}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div className="px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 shadow-sm">
                    {current.populationMult}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">Since 1950</span>
                </div>
              </div>

              {/* Stat Card 2: FRESHWATER PER CAPITA */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#071f30] border border-cyan-500/40 backdrop-blur-xl shadow-lg flex items-center justify-between gap-4 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                    <Droplet className="w-6 h-6 fill-cyan-400/20" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      FRESHWATER PER CAPITA
                    </span>
                    <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 mt-0.5">
                      <TrendingDown className="w-3.5 h-3.5" /> Continuously Declining
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight mt-0.5">
                      {current.waterPerCapita}
                      <span className="text-xs text-slate-400 font-normal ml-1">/yr</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div className="px-3 py-1 rounded-full text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 shadow-sm">
                    {current.waterDecline}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">Since 1950</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer: Status Alert & Global Reality */}
          <div className="pt-5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Alert Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-red-500/40 bg-red-950/70 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 animate-pulse" />
                <span>{current.stressBadge}</span>
              </div>

              {/* Stress statement */}
              <div className="text-xs sm:text-sm text-slate-200">
                <strong className="text-white font-black text-sm sm:text-base mr-1">
                  {current.stressImpactNumber}
                </strong>
                <span>{current.stressImpactText}</span>
              </div>
            </div>

            {/* Historical or Projected Quote */}
            <div className="text-xs text-slate-400 italic font-normal max-w-sm md:text-right leading-relaxed">
              {current.quote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
