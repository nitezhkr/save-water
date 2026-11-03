import React from 'react';

interface QuoteCalloutProps {
  quote: string;
  author: string;
  variant?: 'wave' | 'card';
}

export const QuoteCallout: React.FC<QuoteCalloutProps> = ({
  quote,
  author,
  variant = 'wave',
}) => {
  if (variant === 'card') {
    return (
      <section className="relative py-12 px-6 sm:px-10 bg-[#030914] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#071322]/80 border border-cyan-500/20 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Ambient water drop splash glow background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />

            {/* Cyan Quote Mark */}
            <div className="text-cyan-400 font-serif text-5xl sm:text-6xl leading-none select-none opacity-80 mb-2">
              “
            </div>

            {/* Quote text */}
            <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-slate-100 italic leading-relaxed max-w-2xl mx-auto">
              {quote}
            </blockquote>

            {/* Citation */}
            <p className="mt-5 font-mono text-[11px] tracking-[0.25em] text-cyan-300 uppercase font-medium">
              — {author}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 px-6 sm:px-10 bg-[#030914] text-white text-center overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Large cyan double quote mark */}
        <div className="text-cyan-400 font-serif text-4xl sm:text-5xl leading-none select-none opacity-80 mb-3">
          “
        </div>

        {/* Quote line */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-slate-100 italic leading-relaxed">
          {quote}
        </blockquote>

        {/* Author */}
        <p className="mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-cyan-300/90 uppercase font-medium">
          — {author}
        </p>
      </div>

      {/* Undulating Glowing Cyan Water Wave Light Ribbon */}
      <div className="relative w-full max-w-5xl mx-auto mt-10 h-16 sm:h-20 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-cyan-400 opacity-70"
          preserveAspectRatio="none"
        >
          {/* Main glowing curved ribbon */}
          <path
            d="M0,60 C150,15 300,105 450,45 C600,-15 750,110 900,45 C1050,-10 1150,80 1200,60"
            stroke="url(#quote-wave-gradient)"
            strokeWidth="3"
            fill="none"
          />
          {/* Secondary softer halo */}
          <path
            d="M0,60 C150,15 300,105 450,45 C600,-15 750,110 900,45 C1050,-10 1150,80 1200,60"
            stroke="#22d3ee"
            strokeWidth="8"
            strokeOpacity="0.25"
            strokeLinecap="round"
            fill="none"
            filter="blur(4px)"
          />
          <defs>
            <linearGradient id="quote-wave-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
              <stop offset="25%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#67e8f9" stopOpacity="1" />
              <stop offset="75%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

