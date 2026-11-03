import React from 'react';

export const WaterRiskLegend: React.FC = () => {
  const levels = [
    { label: 'Low (< 10%)', color: '#22d3ee' },
    { label: 'Low to Medium (10 – 20%)', color: '#a3e635' },
    { label: 'Medium to High (20 – 40%)', color: '#fb923c' },
    { label: 'High (40 – 80%)', color: '#ea580c' },
    { label: 'Extremely High (> 80%)', color: '#dc2626' },
  ];

  return (
    <div className="pt-4 border-t border-slate-800/80">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-3">
        WATER STRESS LEVEL
      </span>
      <div className="space-y-2">
        {levels.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-xs text-slate-300">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] leading-tight font-medium text-slate-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

