import React, { useEffect, useState } from 'react';
import { X, Droplet, Users, ArrowRight, Waves } from 'lucide-react';
import countriesData from '../data/countries.json';
import waterRiskDataRaw from '../data/water-risk.json';
import { getCountryWorldBankStats, type LiveCountryData } from '../services/worldBank';

const waterRiskData = waterRiskDataRaw as Record<
  string,
  {
    stressLevel: string;
    stressScore: number;
    stressLabel: string;
    severity: string;
    groundwaterDepletion: number;
    accessToSafeWater: number;
    droughtRisk: string;
    populationFallback: string;
    source: string;
  }
>;

interface CountryInfoPanelProps {
  countryId: string | null;
  onClose: () => void;
  onExploreCaseStudy?: (caseId: string) => void;
}

export const CountryInfoPanel: React.FC<CountryInfoPanelProps> = ({
  countryId,
  onClose,
  onExploreCaseStudy,
}) => {
  const [liveData, setLiveData] = useState<LiveCountryData | null>(null);
  const [loading, setLoading] = useState(false);

  const country = countriesData.find((c) => c.id === countryId);
  const risk = countryId ? waterRiskData[countryId] : null;

  useEffect(() => {
    let isMounted = true;
    if (!countryId) return;

    getCountryWorldBankStats(countryId)
      .then((data) => {
        if (isMounted) {
          setLiveData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [countryId]);

  if (!country || !risk) return null;

  const populationDisplay =
    liveData?.population?.value || risk.populationFallback;

  return (
    <div className="w-full sm:w-80 max-w-sm rounded-3xl bg-gradient-to-b from-[#0a1829]/95 via-[#071322]/95 to-[#040e1a]/95 border border-cyan-500/35 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-slate-100 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* 1. Header with Flag & Close Button */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl filter drop-shadow-sm select-none">{country.flag}</span>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              {country.name}
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              {country.continent}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close details"
          className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Hero Landscape Photo */}
      <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-36 mb-3.5 bg-slate-950 border border-slate-800/80 shadow-md">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Stat Pills Row (Water Stress & Population) */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Water Stress Pill */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-[#07192b] border border-cyan-500/25">
          <div className="flex items-center gap-1.5 mb-1 text-cyan-400">
            <Droplet className="w-3.5 h-3.5 fill-cyan-400/20" />
            <span className="text-[9px] uppercase font-semibold tracking-wider text-slate-400">
              Water Stress
            </span>
          </div>
          <div className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold inline-block">
            {risk.stressLabel}
          </div>
        </div>

        {/* Population Pill */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-[#07192b] border border-cyan-500/25">
          <div className="flex items-center gap-1.5 mb-1 text-cyan-400">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[9px] uppercase font-semibold tracking-wider text-slate-400">
              Population
            </span>
          </div>
          <div className="text-sm font-extrabold text-white tracking-tight">
            {loading ? 'Updating...' : populationDisplay}
          </div>
        </div>
      </div>

      {/* 4. Description Paragraph */}
      <p className="text-[11px] text-slate-300/90 leading-relaxed mb-3 font-normal line-clamp-3">
        {country.description}
      </p>

      {/* 5. Metrics Progress Bars */}
      <div className="space-y-2 mb-3.5 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs">
        {/* Water Stress */}
        <div>
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Droplet className="w-3 h-3 text-orange-400" />
              Water Stress
            </span>
            <strong className="text-orange-400 font-bold">~{risk.stressScore}%</strong>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              style={{ width: `${risk.stressScore}%` }}
            />
          </div>
        </div>

        {/* Groundwater Depletion */}
        <div>
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Waves className="w-3 h-3 text-amber-400" />
              Groundwater Depletion
            </span>
            <strong className="text-amber-400 font-bold">~{risk.groundwaterDepletion}%</strong>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
              style={{ width: `${risk.groundwaterDepletion}%` }}
            />
          </div>
        </div>

        {/* Access to Safe Water */}
        <div>
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Droplet className="w-3 h-3 text-cyan-400" />
              Access to Safe Water
            </span>
            <strong className="text-cyan-400 font-bold">~{risk.accessToSafeWater}%</strong>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
              style={{ width: `${risk.accessToSafeWater}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6. Footer: Source Attribution & Explore Case Studies Button */}
      <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2 text-[9px] text-slate-400">
        <span className="leading-tight truncate max-w-[150px]">
          Data: {risk.source}
        </span>

        {country.caseStudyId && onExploreCaseStudy && (
          <button
            onClick={() => onExploreCaseStudy(country.caseStudyId!)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer shrink-0"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
