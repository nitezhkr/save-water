import { Droplets } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02060e] text-slate-400 py-16 px-6 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider uppercase">
              EVERY DROP
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            An interactive environmental storytelling initiative celebrating the hydrological cycle and promoting conscious water stewardship.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 font-mono text-xs uppercase tracking-wider">
          <a href="#journey-hero" className="hover:text-cyan-400 transition-colors">
            The Journey
          </a>
          <a href="#story" className="hover:text-cyan-400 transition-colors">
            Our Story
          </a>
          <a href="#calculator" className="hover:text-cyan-400 transition-colors">
            Water Calculator
          </a>
          <a href="#action" className="hover:text-cyan-400 transition-colors">
            Take Action
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} EVERY DROP Initiative.
          <div className="flex items-center justify-center md:justify-end gap-1 mt-1 text-[11px] text-slate-600">
            <span>Preserving nature's most precious element</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
