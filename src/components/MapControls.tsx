import React, { useState } from 'react';
import { Layers, Search, MapPin, CheckSquare, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { WaterRiskLegend } from './WaterRiskLegend';
import countriesData from '../data/countries.json';

export interface ActiveLayers {
  waterStress: boolean;
  droughtRisk: boolean;
  groundwaterDepletion: boolean;
  historicalCrises: boolean;
}

interface MapControlsProps {
  layers: ActiveLayers;
  onToggleLayer: (layer: keyof ActiveLayers) => void;
  onSelectCountry: (countryId: string) => void;
  selectedCountryId: string | null;
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  onSelectCountry,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const activeCount = Object.values(layers).filter(Boolean).length;

  const filteredCountries = searchQuery.trim()
    ? countriesData.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.continent.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-b from-[#0a1829]/95 to-[#071322]/95 border border-cyan-500/40 text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:border-cyan-400 hover:text-white transition-all cursor-pointer group"
        title="Show map controls & layers"
      >
        <Layers className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span>Map Layers ({activeCount} Active)</span>
        <ChevronRight className="w-3.5 h-3.5 text-cyan-400/70" />
      </button>
    );
  }

  return (
    <div className="w-full sm:w-72 rounded-2xl bg-gradient-to-b from-[#0a1829]/95 to-[#071322]/95 border border-cyan-500/30 p-4 sm:p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-slate-200 animate-in fade-in duration-200">
      {/* 1. Map Layers Section Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>MAP LAYERS</span>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Minimize panel for larger map view"
            aria-label="Minimize panel"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {/* Water Stress Layer */}
          <button
            onClick={() => onToggleLayer('waterStress')}
            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              layers.waterStress
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              {layers.waterStress ? (
                <CheckSquare className="w-4 h-4 text-cyan-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>Water Stress</span>
            </div>
          </button>

          {/* Drought Risk Layer */}
          <button
            onClick={() => onToggleLayer('droughtRisk')}
            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              layers.droughtRisk
                ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              {layers.droughtRisk ? (
                <CheckSquare className="w-4 h-4 text-amber-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>Drought Risk</span>
            </div>
          </button>

          {/* Groundwater Depletion Layer */}
          <button
            onClick={() => onToggleLayer('groundwaterDepletion')}
            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              layers.groundwaterDepletion
                ? 'bg-orange-950/60 text-orange-300 border border-orange-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              {layers.groundwaterDepletion ? (
                <CheckSquare className="w-4 h-4 text-orange-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>Groundwater Depletion</span>
            </div>
          </button>

          {/* Historical Crisis Locations */}
          <button
            onClick={() => onToggleLayer('historicalCrises')}
            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              layers.historicalCrises
                ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${layers.historicalCrises ? 'text-red-400' : 'text-slate-500'}`} />
              <span>Historical Crisis Locations</span>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Find a Country Search Field */}
      <div className="mb-5 pt-4 border-t border-slate-800/80 relative">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-2.5">
          FIND A COUNTRY
        </span>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* Search Autocomplete Dropdown */}
        {isSearchFocused && filteredCountries.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-800">
            {filteredCountries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCountry(c.id);
                  setSearchQuery('');
                }}
                className="w-full px-3 py-2 text-left hover:bg-cyan-950/50 flex items-center justify-between text-xs text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{c.flag} {c.name}</span>
                <span className="text-[9px] text-slate-500 uppercase">{c.continent}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Water Stress Level Legend */}
      <WaterRiskLegend />
    </div>
  );
};

