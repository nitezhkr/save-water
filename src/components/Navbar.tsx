import React, { useState, useEffect } from 'react';
import { Droplets, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onSaveWaterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSaveWaterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030914]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#030914]/90 via-[#030914]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
            <Droplets className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
              EVERY DROP
            </span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase -mt-1">
              Conservation Initiative
            </span>
          </div>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a
            href="#story"
            className="text-slate-300 hover:text-cyan-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan-400 hover:after:w-full after:transition-all"
          >
            Our Story
          </a>
          <a
            href="#calculator"
            className="text-slate-300 hover:text-cyan-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan-400 hover:after:w-full after:transition-all"
          >
            Water Calculator
          </a>
          <a
            href="#action"
            className="text-slate-300 hover:text-cyan-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan-400 hover:after:w-full after:transition-all"
          >
            Take Action
          </a>
        </nav>

        {/* Right-side CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#action"
            onClick={(e) => {
              if (onSaveWaterClick) {
                e.preventDefault();
                onSaveWaterClick();
              }
            }}
            className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>SAVE WATER TODAY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030914]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-4 font-mono text-sm tracking-wider uppercase animate-fade-in backdrop-blur-2xl">
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            Our Story
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            Water Calculator
          </a>
          <a
            href="#action"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            Take Action
          </a>
          <a
            href="#action"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onSaveWaterClick) onSaveWaterClick();
            }}
            className="mt-2 text-center py-3 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs tracking-widest"
          >
            SAVE WATER TODAY
          </a>
        </div>
      )}
    </header>
  );
};
