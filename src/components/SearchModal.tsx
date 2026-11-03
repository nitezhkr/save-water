import React, { useState } from 'react';
import { Search, X, ArrowRight, Droplet, MapPin, Calculator, Heart } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickItems = [
    {
      title: 'Earth 2050 Crisis Timeline',
      category: 'Overview',
      icon: <Droplet className="w-4 h-4 text-cyan-400" />,
      href: '#hero',
    },
    {
      title: 'A Day in 2050 (Drinking, Cooking, Bathing)',
      category: 'Experience',
      icon: <Droplet className="w-4 h-4 text-amber-400" />,
      href: '#day-in-2050',
    },
    {
      title: 'Chennai & Cape Town Water Crises',
      category: 'Real Cases',
      icon: <MapPin className="w-4 h-4 text-red-400" />,
      href: '#real-cases',
    },
    {
      title: 'Household Water Footprint Calculator',
      category: 'Tool',
      icon: <Calculator className="w-4 h-4 text-emerald-400" />,
      href: '#calculator',
    },
    {
      title: 'Take the Every Drop Pledge',
      category: 'Action',
      icon: <Heart className="w-4 h-4 text-cyan-300" />,
      href: '#pledge',
    },
  ];

  const filtered = query.trim()
    ? quickItems.filter((i) =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.category.toLowerCase().includes(query.toLowerCase())
      )
    : quickItems;

  const handleSelect = (href: string) => {
    onClose();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
        <h2 id="search-modal-title" className="sr-only">Quick Search</h2>
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-4">
          <Search className="absolute left-3.5 w-5 h-5 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 2050 scenarios, real cases, tools..."
            autoFocus
            aria-label="Search topics across the website"
            className="w-full bg-slate-800/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Results */}
        <div className="space-y-1.5 max-h-80 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item.href)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/20 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          ) : (
            <p className="text-center py-6 text-xs text-slate-400">
              No matching topics found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

