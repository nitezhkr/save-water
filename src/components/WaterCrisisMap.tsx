import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {
  Droplet,
  Plus,
  Minus,
  Compass,
  X,
  AlertCircle,
  AlertTriangle,
  RotateCw,
  CheckCircle,
} from 'lucide-react';

// Explicitly register the MapLibre web worker URL for Vite bundling
if (typeof window !== 'undefined') {
  maplibregl.setWorkerUrl(maplibreWorkerUrl);
}
import { MapControls, type ActiveLayers } from './MapControls';
import { CountryInfoPanel } from './CountryInfoPanel';
import { GlobalStatistics } from './GlobalStatistics';
import countriesData from '../data/countries.json';
import countriesGeo from '../data/countries-points.json';
import crisesGeo from '../data/crises-points.json';
import caseStudiesDataRaw from '../data/case-studies.json';

interface CaseStudyDetail {
  id: string;
  countryId: string;
  title: string;
  location: string;
  year: string;
  summary: string;
  metrics: { label: string; value: string }[];
  keyLessons: string[];
}

interface MapState {
  status: 'idle' | 'loading' | 'loaded' | 'error' | 'webgl-unsupported';
  error: string | null;
}

const caseStudiesData = caseStudiesDataRaw as CaseStudyDetail[];

// Standard browser WebGL capability detection
const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2');
    return Boolean(gl);
  } catch {
    return false;
  }
};

export const WaterCrisisMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapState, setMapState] = useState<MapState>(() => {
    if (typeof window !== 'undefined' && !checkWebGLSupport()) {
      return {
        status: 'webgl-unsupported',
        error: 'WebGL hardware acceleration is disabled or unsupported in this browser.',
      };
    }
    return {
      status: 'loading',
      error: null,
    };
  });
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    if (!checkWebGLSupport()) {
      setMapState({
        status: 'webgl-unsupported',
        error: 'WebGL hardware acceleration is disabled or unsupported in this browser.',
      });
    } else {
      setMapState({ status: 'loading', error: null });
    }
    setRetryKey((k) => k + 1);
  };

  // Selected Country - start with null so the map has maximum room and visibility!
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Active layers state
  const [layers, setLayers] = useState<ActiveLayers>({
    waterStress: true,
    droughtRisk: false,
    groundwaterDepletion: false,
    historicalCrises: true,
  });
  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  // Track map markers to update positions
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const handleToggleLayer = (layerKey: keyof ActiveLayers) => {
    setLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  const handleSelectCountry = useCallback((countryId: string) => {
    setSelectedCountryId(countryId);
    const country = countriesData.find((c) => c.id === countryId);
    if (country && map.current) {
      try {
        map.current.flyTo({
          center: [country.lng, country.lat],
          zoom: country.zoom || 4,
          essential: true,
          duration: 1800,
        });
      } catch (err) {
        console.warn('Map flyTo was interrupted or unavailable:', err);
      }
    }
  }, []);

  // Initialize MapLibre GL Map with React StrictMode and WebGL guards
  useEffect(() => {
    if (!mapContainer.current) return;

    let isMounted = true;

    // 1. Verify browser WebGL support
    if (!checkWebGLSupport()) {
      return;
    }

    // Clean up any lingering instance before re-creating
    if (map.current) {
      try {
        map.current.remove();
      } catch (err) {
        console.warn('Error during previous map cleanup:', err);
      }
      map.current = null;
    }

    let mapInstance: maplibregl.Map | null = null;

    try {
      mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        // OpenFreeMap dark vector basemap
        style: 'https://tiles.openfreemap.org/styles/dark',
        center: [15, 20],
        zoom: 1.85,
        minZoom: 1.2,
        maxZoom: 10,
        attributionControl: false,
      });

      map.current = mapInstance;

      const setupLayers = () => {
        if (!isMounted || !mapInstance || mapInstance !== map.current) return;
        const currentMap = mapInstance;
        if (!currentMap.getStyle()) return;

        try {
          // 1. Add Countries Points GeoJSON Source
          if (!currentMap.getSource('water-countries')) {
            currentMap.addSource('water-countries', {
              type: 'geojson',
              data: countriesGeo as unknown as maplibregl.GeoJSONSourceSpecification['data'],
            });
          }

          // 2. Add Crises Points GeoJSON Source
          if (!currentMap.getSource('water-crises')) {
            currentMap.addSource('water-crises', {
              type: 'geojson',
              data: crisesGeo as unknown as maplibregl.GeoJSONSourceSpecification['data'],
            });
          }

          // 3. Water Stress Glow Halo Layer (Cyan to Red)
          if (!currentMap.getLayer('stress-halos')) {
            currentMap.addLayer({
              id: 'stress-halos',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.waterStress ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'stressScore'], 0.4],
                  5,
                  ['*', ['get', 'stressScore'], 1.4],
                ],
                'circle-color': [
                  'step',
                  ['get', 'stressScore'],
                  '#22d3ee',
                  15,
                  '#a3e635',
                  30,
                  '#fb923c',
                  50,
                  '#ea580c',
                  80,
                  '#dc2626',
                ],
                'circle-opacity': 0.35,
                'circle-blur': 0.6,
              },
            });
          }

          // 4. Core Water Stress Heat Dots
          if (!currentMap.getLayer('stress-cores')) {
            currentMap.addLayer({
              id: 'stress-cores',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.waterStress ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'stressScore'], 0.18],
                  5,
                  ['*', ['get', 'stressScore'], 0.6],
                ],
                'circle-color': [
                  'step',
                  ['get', 'stressScore'],
                  '#22d3ee',
                  15,
                  '#a3e635',
                  30,
                  '#fb923c',
                  50,
                  '#ea580c',
                  80,
                  '#dc2626',
                ],
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.9,
              },
            });
          }

          // 5. Drought Risk Glow Halo Layer (Amber / Warm Orange / Crimson)
          if (!currentMap.getLayer('drought-halos')) {
            currentMap.addLayer({
              id: 'drought-halos',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.droughtRisk ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'droughtScore'], 0.35],
                  5,
                  ['*', ['get', 'droughtScore'], 1.3],
                ],
                'circle-color': [
                  'step',
                  ['get', 'droughtScore'],
                  '#fde047',
                  50,
                  '#fbbf24',
                  70,
                  '#f97316',
                  85,
                  '#dc2626',
                ],
                'circle-opacity': 0.38,
                'circle-blur': 0.65,
              },
            });
          }

          // 6. Drought Risk Core Dots
          if (!currentMap.getLayer('drought-cores')) {
            currentMap.addLayer({
              id: 'drought-cores',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.droughtRisk ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'droughtScore'], 0.18],
                  5,
                  ['*', ['get', 'droughtScore'], 0.58],
                ],
                'circle-color': [
                  'step',
                  ['get', 'droughtScore'],
                  '#fde047',
                  50,
                  '#fbbf24',
                  70,
                  '#f97316',
                  85,
                  '#dc2626',
                ],
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#fef08a',
                'circle-opacity': 0.9,
              },
            });
          }

          // 7. Groundwater Depletion Glow Halo Layer (Sky / Indigo / Purple / Magenta)
          if (!currentMap.getLayer('groundwater-halos')) {
            currentMap.addLayer({
              id: 'groundwater-halos',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.groundwaterDepletion ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'groundwater'], 0.35],
                  5,
                  ['*', ['get', 'groundwater'], 1.3],
                ],
                'circle-color': [
                  'step',
                  ['get', 'groundwater'],
                  '#38bdf8',
                  35,
                  '#818cf8',
                  55,
                  '#a855f7',
                  75,
                  '#ec4899',
                ],
                'circle-opacity': 0.38,
                'circle-blur': 0.65,
              },
            });
          }

          // 8. Groundwater Depletion Core Dots
          if (!currentMap.getLayer('groundwater-cores')) {
            currentMap.addLayer({
              id: 'groundwater-cores',
              type: 'circle',
              source: 'water-countries',
              layout: {
                visibility: layersRef.current.groundwaterDepletion ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  1,
                  ['*', ['get', 'groundwater'], 0.18],
                  5,
                  ['*', ['get', 'groundwater'], 0.58],
                ],
                'circle-color': [
                  'step',
                  ['get', 'groundwater'],
                  '#38bdf8',
                  35,
                  '#818cf8',
                  55,
                  '#a855f7',
                  75,
                  '#ec4899',
                ],
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#e0e7ff',
                'circle-opacity': 0.9,
              },
            });
          }

          // 9. Crisis Hotspots Outer Glow Halos (Pulsing Red)
          if (!currentMap.getLayer('crisis-halos')) {
            currentMap.addLayer({
              id: 'crisis-halos',
              type: 'circle',
              source: 'water-crises',
              layout: {
                visibility: layersRef.current.historicalCrises ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': 16,
                'circle-color': '#ef4444',
                'circle-opacity': 0.35,
                'circle-blur': 0.5,
              },
            });
          }

          // 10. Crisis Hotspot Core Markers (Red Alert Dots with white border)
          if (!currentMap.getLayer('crisis-points')) {
            currentMap.addLayer({
              id: 'crisis-points',
              type: 'circle',
              source: 'water-crises',
              layout: {
                visibility: layersRef.current.historicalCrises ? 'visible' : 'none',
              },
              paint: {
                'circle-radius': 7.5,
                'circle-color': '#ef4444',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95,
              },
            });
          }

          // 11. Highlight boundary outlines with subtle cyan if supported by basemap
          const boundaryLayerNames = ['boundary_country', 'admin_country', 'boundary', 'admin-0-boundary'];
          boundaryLayerNames.forEach((layerName) => {
            if (currentMap.getLayer(layerName)) {
              try {
                currentMap.setPaintProperty(layerName, 'line-color', '#22d3ee');
                currentMap.setPaintProperty(layerName, 'line-opacity', 0.25);
              } catch {
                // Ignore if line properties differ
              }
            }
          });

          // Interactive clicks on all country data layers
          const countryClickableLayers = ['stress-cores', 'drought-cores', 'groundwater-cores'];
          countryClickableLayers.forEach((layerId) => {
            currentMap.on('click', layerId, (e: maplibregl.MapLayerMouseEvent) => {
              if (e.features && e.features[0]) {
                const props = e.features[0].properties;
                if (props && props.id) {
                  handleSelectCountry(props.id);
                }
              }
            });

            currentMap.on('mouseenter', layerId, () => {
              currentMap.getCanvas().style.cursor = 'pointer';
            });

            currentMap.on('mouseleave', layerId, () => {
              currentMap.getCanvas().style.cursor = '';
            });
          });

          // Interactive click on crisis points
          currentMap.on('click', 'crisis-points', (e: maplibregl.MapLayerMouseEvent) => {
            if (e.features && e.features[0]) {
              const props = e.features[0].properties;
              if (props && props.id) {
                setSelectedCaseId(props.id);
              }
            }
          });

          currentMap.on('mouseenter', 'crisis-points', () => {
            currentMap.getCanvas().style.cursor = 'pointer';
          });

          currentMap.on('mouseleave', 'crisis-points', () => {
            currentMap.getCanvas().style.cursor = '';
          });

          currentMap.resize();
          setMapState({ status: 'loaded', error: null });
        } catch (layerErr) {
          console.error('Failed to configure map layers:', layerErr);
          setMapState({
            status: 'error',
            error: 'Failed to initialize water crisis overlays on vector map.',
          });
        }
      };

      // Listen for map load
      if (mapInstance.isStyleLoaded()) {
        setupLayers();
      } else {
        mapInstance.once('load', setupLayers);
      }

      // Handle map errors properly: distinguish fatal from non-fatal tile events
      mapInstance.on('error', (e) => {
        if (!isMounted) return;

        const errorObj = e.error as (Error & { status?: number }) | undefined;
        const msg = errorObj?.message || '';

        // Check if WebGL context lost or fatal hardware failure
        if (msg.includes('WebGL') || msg.includes('Context Lost') || msg.includes('Failed to initialize WebGL')) {
          console.error('Fatal WebGL error:', e);
          setMapState({
            status: 'webgl-unsupported',
            error: 'WebGL context was lost or encountered a hardware acceleration problem.',
          });
          return;
        }

        // Check if Web Worker failed to load
        if (msg.includes('Worker failed to load')) {
          console.error('Fatal Web Worker load error:', e);
          setMapState({
            status: 'error',
            error: 'MapLibre Web Worker failed to load. Please retry or check network settings.',
          });
          return;
        }

        // Check if style failed to load initially
        const isStyleFailure =
          (e as { dataType?: string }).dataType === 'style' ||
          (msg.includes('Failed to fetch') && !mapInstance?.isStyleLoaded());

        if (isStyleFailure && !mapInstance?.isStyleLoaded()) {
          console.error('Fatal Style load error:', e);
          setMapState({
            status: 'error',
            error: 'Unable to connect to OpenFreeMap dark vector tiles. Please check your network connection.',
          });
          return;
        }

        // Non-fatal tile warnings, 404s, or aborted requests are logged without breaking the map
        console.warn('MapLibre non-fatal event (ignored):', msg || e);
      });
    } catch (initErr: unknown) {
      console.error('MapLibre constructor error:', initErr);
      if (isMounted) {
        const isGPU =
          initErr instanceof maplibregl.GPUInitializationError ||
          (initErr instanceof Error &&
            (initErr.name === 'GPUInitializationError' ||
              initErr.message.toLowerCase().includes('webgl')));
        const nextState: MapState = isGPU
          ? {
              status: 'webgl-unsupported',
              error: 'WebGL hardware acceleration encountered an error during initialization.',
            }
          : {
              status: 'error',
              error: initErr instanceof Error ? initErr.message : 'Failed to initialize map',
            };
        queueMicrotask(() => {
          if (isMounted) setMapState(nextState);
        });
      }
    }

    // ResizeObserver to handle container dimension changes dynamically
    let resizeObserver: ResizeObserver | null = null;
    const container = mapContainer.current;
    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (map.current) {
          map.current.resize();
        }
      });
      resizeObserver.observe(container);
    }

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (map.current) {
        try {
          map.current.remove();
        } catch (cleanupErr) {
          console.warn('Error during map cleanup:', cleanupErr);
        }
        map.current = null;
      }
    };
  }, [retryKey, handleSelectCountry]);

  // Update layer visibility dynamically when checks change
  useEffect(() => {
    if (!map.current || mapState.status !== 'loaded') return;
    const m = map.current;
    if (!m.isStyleLoaded()) return;

    // 1. Water Stress Check
    const stressVisibility = layers.waterStress ? 'visible' : 'none';
    if (m.getLayer('stress-halos')) {
      m.setLayoutProperty('stress-halos', 'visibility', stressVisibility);
    }
    if (m.getLayer('stress-cores')) {
      m.setLayoutProperty('stress-cores', 'visibility', stressVisibility);
    }

    // 2. Drought Risk Check
    const droughtVisibility = layers.droughtRisk ? 'visible' : 'none';
    if (m.getLayer('drought-halos')) {
      m.setLayoutProperty('drought-halos', 'visibility', droughtVisibility);
    }
    if (m.getLayer('drought-cores')) {
      m.setLayoutProperty('drought-cores', 'visibility', droughtVisibility);
    }

    // 3. Groundwater Depletion Check
    const gwVisibility = layers.groundwaterDepletion ? 'visible' : 'none';
    if (m.getLayer('groundwater-halos')) {
      m.setLayoutProperty('groundwater-halos', 'visibility', gwVisibility);
    }
    if (m.getLayer('groundwater-cores')) {
      m.setLayoutProperty('groundwater-cores', 'visibility', gwVisibility);
    }

    // 4. Historical Crises Check
    const crisisVisibility = layers.historicalCrises ? 'visible' : 'none';
    if (m.getLayer('crisis-halos')) {
      m.setLayoutProperty('crisis-halos', 'visibility', crisisVisibility);
    }
    if (m.getLayer('crisis-points')) {
      m.setLayoutProperty('crisis-points', 'visibility', crisisVisibility);
    }
  }, [layers, mapState.status]);

  // Update Selected Country Active Highlight Marker
  useEffect(() => {
    if (!map.current || mapState.status !== 'loaded') return;

    // Clear old marker
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (selectedCountryId) {
      const country = countriesData.find((c) => c.id === selectedCountryId);
      if (country) {
        // Create custom glowing DOM element for active pin
        const el = document.createElement('div');
        el.className =
          'flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border-2 border-cyan-400 text-white text-xs font-bold shadow-[0_0_20px_rgba(34,211,238,0.8)] backdrop-blur-md cursor-pointer animate-pulse';
        el.innerHTML = `<span>${country.flag}</span><span>${country.name}</span><span style="color:#22d3ee">💧</span>`;

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([country.lng, country.lat])
          .addTo(map.current);

        markersRef.current.push(marker);
      }
    }
  }, [selectedCountryId, mapState.status]);

  const activeCaseStudy = caseStudiesData.find((c) => c.id === selectedCaseId);

  return (
    <section
      id="crisis-map"
      className="py-16 md:py-20 bg-[#07111F] relative overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 backdrop-blur-md uppercase mb-3 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
            <Droplet className="w-3.5 h-3.5 fill-cyan-400/20" />
            <span>GLOBAL WATER MONITORING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            THE CRISIS HAS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              NO BORDERS.
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm mt-2.5 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore the regions where water is becoming increasingly scarce. Every point on this
            map represents a real challenge facing communities, ecosystems and future generations.
          </p>

          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Verified Sources: WRI Aqueduct 3.0 &bull; UN-Water &bull; World Bank Open Data</span>
          </div>
        </div>

        {/* Large Interactive World Map Stage */}
        <div className="relative w-full h-[700px] sm:h-[780px] lg:h-[840px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#040b14] shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
          {/* MapLibre WebGL Canvas Container */}
          <div ref={mapContainer} className="w-full h-full min-h-[600px]" />

          {/* Floating Guidance Banner when no country is actively focused */}
          {!selectedCountryId && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-15 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/35 text-slate-200 text-xs font-medium backdrop-blur-md shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Click any country dot or crisis hotspot to inspect water metrics</span>
            </div>
          )}

          {/* Map Loading State */}
          {mapState.status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07111F]/70 backdrop-blur-sm z-10 pointer-events-none transition-opacity duration-300">
              <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-3" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                Loading OpenFreeMap Tiles...
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Streaming dark vector basemap
              </span>
            </div>
          )}

          {/* WebGL Unsupported Warning */}
          {mapState.status === 'webgl-unsupported' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07111F]/95 p-6 text-center z-15 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WebGL Acceleration Disabled</h3>
              <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                MapLibre GL requires WebGL hardware acceleration to render the vector globe. Please
                enable hardware acceleration in your browser settings.
              </p>
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retry WebGL Initialization</span>
              </button>
            </div>
          )}

          {/* Genuine Tile / Network Error with Useful Retry */}
          {mapState.status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07111F]/95 p-6 text-center z-15 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Basemap Connection Issue</h3>
              <p className="text-xs text-slate-300 max-w-md mb-2 leading-relaxed">
                {mapState.error || 'Unable to connect to OpenFreeMap dark vector tiles.'}
              </p>
              <p className="text-[11px] text-slate-400 max-w-md mb-6 leading-relaxed">
                You can retry connecting to the basemap, or browse country water-risk profiles
                directly using the country search.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retry Loading Map</span>
              </button>
              </div>
            </div>
          )}

          {/* Left Floating Controls Panel */}
          <div className="absolute top-4 left-4 z-20 hidden md:block">
            <MapControls
              layers={layers}
              onToggleLayer={handleToggleLayer}
              onSelectCountry={handleSelectCountry}
              selectedCountryId={selectedCountryId}
            />
          </div>

          {/* Right Floating Country Information Panel */}
          <div className="absolute top-4 right-4 z-20 hidden lg:block">
            {selectedCountryId && (
              <CountryInfoPanel
                countryId={selectedCountryId}
                onClose={() => setSelectedCountryId(null)}
                onExploreCaseStudy={(caseId) => setSelectedCaseId(caseId)}
              />
            )}
          </div>

          {/* Map Zoom & View Controls (Bottom Right) */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-1.5">
            <button
              onClick={() => map.current?.zoomIn()}
              title="Zoom In"
              aria-label="Zoom in"
              className="w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => map.current?.zoomOut()}
              title="Zoom Out"
              aria-label="Zoom out"
              className="w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                map.current?.flyTo({ center: [20, 22], zoom: 1.8, duration: 1500 })
              }
              title="Reset Global View"
              aria-label="Reset global view"
              className="w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Country Panel Drawer */}
          {selectedCountryId && (
            <div className="absolute bottom-4 left-4 right-4 z-30 lg:hidden">
              <CountryInfoPanel
                countryId={selectedCountryId}
                onClose={() => setSelectedCountryId(null)}
                onExploreCaseStudy={(caseId) => setSelectedCaseId(caseId)}
              />
            </div>
          )}
        </div>

        {/* Global Statistics Strip (Bottom) */}
        <GlobalStatistics />
      </div>

      {/* Case Study Detail Modal */}
      {activeCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-slate-900 to-[#071324] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            <button
              onClick={() => setSelectedCaseId(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              {activeCaseStudy.location} &bull; {activeCaseStudy.year}
            </span>
            <h3 id="case-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {activeCaseStudy.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {activeCaseStudy.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
              {activeCaseStudy.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-base sm:text-lg font-black text-cyan-400">{m.value}</div>
                  <div className="text-[10px] text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Key Lessons */}
            <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Key Adaptation Lessons
              </h4>
              {activeCaseStudy.keyLessons.map((l, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{l}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedCaseId(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
              >
                Close Case
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
