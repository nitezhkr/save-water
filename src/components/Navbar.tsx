import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight, Droplets } from 'lucide-react';

interface NavbarProps {
  onSaveWaterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSaveWaterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#journey-hero' },
    { name: 'Issues', href: '#reality-section' },
    { name: 'Stories', href: '#day-zero-section' },
    { name: 'Solutions', href: '#calculator-section' },
    { name: 'Resources', href: '#bigger-picture-section' },
    { name: 'Take Action', href: '#pledge-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030914]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#030914]/90 via-[#030914]/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#journey-hero"
          className="flex items-center gap-2.5 text-white group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.35)] group-hover:scale-105 transition-transform">
            <Droplets className="w-4 h-4 fill-cyan-400/40 text-cyan-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base tracking-tight text-white leading-none">
              Every Drop
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-cyan-300/80 uppercase font-medium mt-1">
              WATER FOR EVERYONE
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-300 transition-colors relative py-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <a
            href="#pledge-section"
            onClick={(e) => {
              if (onSaveWaterClick) {
                e.preventDefault();
                onSaveWaterClick();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.7)] transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <span>Get Involved</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Input Dropdown */}
      {searchOpen && (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-3 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics, case studies, or water solutions..."
              className="w-full bg-slate-900/95 border border-cyan-500/40 rounded-full px-5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ESC
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030914]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-xs font-medium tracking-wider uppercase backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-300 py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#pledge-section"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onSaveWaterClick) onSaveWaterClick();
            }}
            className="mt-2 text-center py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <span>Get Involved</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
};
