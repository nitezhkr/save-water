import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onSaveWaterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSaveWaterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030914]/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
          : 'bg-gradient-to-b from-[#030914]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo - Minimal, Confident, Human */}
        <a
          href="#"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase text-white">
            EVERY DROP
          </span>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-slate-300">
          <a
            href="#world-running-dry"
            className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Global Scarcity</span>
          </a>
          <a
            href="#story"
            className="hover:text-white transition-colors"
          >
            Our Story
          </a>
          <a
            href="#calculator"
            className="hover:text-white transition-colors"
          >
            Water Calculator
          </a>
          <a
            href="#action"
            className="hover:text-white transition-colors"
          >
            Take Action
          </a>
        </nav>

        {/* Right-side Minimal CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#action"
            onClick={(e) => {
              if (onSaveWaterClick) {
                e.preventDefault();
                onSaveWaterClick();
              }
            }}
            className="px-5 py-2 rounded-full border border-white/25 hover:border-white hover:bg-white hover:text-slate-950 text-white text-xs font-medium tracking-wider uppercase transition-all duration-200"
          >
            Save Water
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030914]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-medium tracking-wider uppercase backdrop-blur-xl">
          <a
            href="#world-running-dry"
            onClick={() => setMobileMenuOpen(false)}
            className="text-cyan-300 hover:text-white py-2 border-b border-white/5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Global Scarcity</span>
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2 border-b border-white/5"
          >
            Our Story
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2 border-b border-white/5"
          >
            Water Calculator
          </a>
          <a
            href="#action"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2 border-b border-white/5"
          >
            Take Action
          </a>
          <a
            href="#action"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onSaveWaterClick) onSaveWaterClick();
            }}
            className="mt-2 text-center py-2.5 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-widest"
          >
            Save Water
          </a>
        </div>
      )}
    </header>
  );
};
