import React, { useState, useEffect } from 'react';
import { Droplet, Search, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick?: () => void;
  onSearchClick?: () => void;
}

export const EveryDropNavbar: React.FC<NavbarProps> = ({
  onJoinClick,
  onSearchClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Crisis Map', href: '#crisis-map' },
    { label: 'Real Cases', href: '#real-cases' },
    { label: 'Experience 2050', href: '#day-in-2050' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#calculator' },
    { label: 'Take Action', href: '#pledge' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030914]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#030914]/90 via-[#030914]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-all">
              <div className="w-full h-full rounded-full bg-[#030914] flex items-center justify-center">
                <Droplet className="w-5 h-5 text-cyan-400 fill-cyan-400/30 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight tracking-tight flex items-center gap-1">
                Every Drop
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-cyan-400/90 uppercase">
                Water For Tomorrow
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-wider font-medium text-slate-300 hover:text-cyan-400 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="w-9 h-9 rounded-full bg-slate-800/60 border border-slate-700/60 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all hover:bg-slate-800"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (onJoinClick) {
                  onJoinClick();
                } else {
                  const el = document.getElementById('pledge');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join the Movement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="w-8 h-8 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-300"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 px-4 rounded-2xl bg-slate-900/95 border border-cyan-500/20 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onJoinClick) {
                  onJoinClick();
                } else {
                  const el = document.getElementById('pledge');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              <span>Join the Movement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

