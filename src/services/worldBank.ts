/**
 * World Bank Public API Service for Global Water Indicators
 * Free, public API with zero API keys required.
 * Includes localStorage caching and graceful fallback to curated datasets.
 */

interface WorldBankIndicatorResponse {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
}

export interface LiveCountryData {
  population?: {
    value: string;
    raw: number;
    year: string;
  };
  safeWaterAccess?: {
    value: string;
    percentage: number;
    year: string;
  };
  renewableWaterPerCapita?: {
    value: string;
    year: string;
  };
}

const CACHE_PREFIX = 'wb_cache_v1_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

// Format numbers nicely: 1440000000 -> "1.44 Billion"
export function formatPopulation(num: number): string {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)} Billion`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)} Million`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(0)}k`;
  }
  return num.toLocaleString();
}

/**
 * Fetch a single indicator from World Bank API with timeout & caching
 */
async function fetchIndicator(
  countryIso3: string,
  indicatorCode: string
): Promise<{ value: number; year: string } | null> {
  const cacheKey = `${CACHE_PREFIX}${countryIso3}_${indicatorCode}`;

  // 1. Check localStorage cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore localStorage errors (e.g. incognito/disabled)
  }

  // 2. Fetch from public API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const url = `https://api.worldbank.org/v2/country/${countryIso3}/indicator/${indicatorCode}?format=json&mrnev=1`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const json = await res.json();

    // World Bank returns [paginationMeta, [dataObjects]]
    if (Array.isArray(json) && json.length >= 2 && Array.isArray(json[1]) && json[1].length > 0) {
      const entry: WorldBankIndicatorResponse = json[1][0];
      if (entry && entry.value !== null) {
        const result = {
          value: entry.value,
          year: entry.date,
        };

        // Save to cache
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: result })
          );
        } catch {
          // Ignore cache quota exceeded
        }

        return result;
      }
    }
  } catch {
    // Silently fall back to cached or local dataset on network error
  }

  return null;
}

/**
 * Fetch verified World Bank indicators for a country
 */
export async function getCountryWorldBankStats(countryIso3: string): Promise<LiveCountryData> {
  const [popData, waterAccessData] = await Promise.all([
    // SP.POP.TOTL = Population, total
    fetchIndicator(countryIso3, 'SP.POP.TOTL'),
    // SH.H2O.SMDW.ZS = People using safely managed drinking water services (% of population)
    fetchIndicator(countryIso3, 'SH.H2O.SMDW.ZS'),
  ]);

  const result: LiveCountryData = {};

  if (popData) {
    result.population = {
      value: formatPopulation(popData.value),
      raw: popData.value,
      year: popData.year,
    };
  }

  if (waterAccessData) {
    result.safeWaterAccess = {
      value: `~${Math.round(waterAccessData.value)}%`,
      percentage: Math.round(waterAccessData.value),
      year: waterAccessData.year,
    };
  }

  return result;
}

