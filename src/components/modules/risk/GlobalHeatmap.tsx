import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Globe, ShieldAlert, TrendingUp, TrendingDown, RefreshCw, Zap, Navigation, ArrowUpRight } from 'lucide-react';

const createCustomIcon = (color: string, label: string, isCritical: boolean) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        ${isCritical ? `<div style="
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.25;
          animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>` : ''}
        <div style="
          background: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #090C12;
          box-shadow: 0 0 14px ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        ">
          <div style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff;"></div>
        </div>
        <div style="
          margin-top: 3px;
          background: rgba(11, 17, 32, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 1.5px 6px;
          border-radius: 9999px;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        ">
          ${label}
        </div>
      </div>
    `,
    iconSize: [80, 46],
    iconAnchor: [40, 10]
  });
};

interface HeatmapRegion {
  id: string;
  name: string;
  shortLabel: string;
  lat: number;
  lng: number;
  riskScore: number; // 0 - 100
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'OPPORTUNITY';
  color: string;
  category: 'ENERGY' | 'COMMODITIES' | 'POLICY' | 'TECH' | 'LOGISTICS';
  eventTitle: string;
  impactSummary: string;
  marketMetric: string;
  changeStr: string;
  isPositive: boolean;
  topSectors: string[];
  affectedStocks: string[];
  aiActionRecommendation: string;
}

const ALL_GLOBAL_COUNTRIES: HeatmapRegion[] = [
  // 1. INDIA
  {
    id: 'country-in',
    name: 'India (New Delhi / Mumbai)',
    shortLabel: 'Nifty 24,440',
    lat: 20.5937,
    lng: 78.9629,
    riskScore: 28,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'POLICY',
    eventTitle: 'RBI Repo Rate Cut & Infra CapEx Stimulus',
    impactSummary: '₹1.2 Lakh Cr road & railway package approved; home loan demand accelerates +18% YoY.',
    marketMetric: 'Nifty 50: 24,440.05',
    changeStr: '-0.58%',
    isPositive: false,
    topSectors: ['Banking', 'Automobile', 'Infrastructure', 'Cement'],
    affectedStocks: ['HDFCBANK', 'TATASTEEL', 'MARUTI', 'M&M'],
    aiActionRecommendation: 'Overweight private banking & infrastructure steel producers (HDFC Bank, Tata Steel).'
  },
  // 2. USA
  {
    id: 'country-us',
    name: 'United States (New York / Washington DC)',
    shortLabel: 'S&P 5,751',
    lat: 38.9072,
    lng: -77.0369,
    riskScore: 54,
    riskLevel: 'MODERATE',
    color: '#F59E0B',
    category: 'POLICY',
    eventTitle: 'Fed Policy Stance & DXY Dollar Strength',
    impactSummary: 'US Dollar index at 105.40; sticky services CPI delays rate cuts while benefiting Indian IT export realizations.',
    marketMetric: 'S&P 500: 5,751.07',
    changeStr: '+0.25%',
    isPositive: true,
    topSectors: ['IT Services', 'Treasury Yields', 'US Tech'],
    affectedStocks: ['INFY', 'TCS', 'AAPL', 'NVDA'],
    aiActionRecommendation: 'Hold Indian IT export leaders (Infosys, TCS) to capture USD/INR depreciation gains.'
  },
  // 3. MIDDLE EAST (UAE / SAUDI)
  {
    id: 'country-me',
    name: 'Middle East (Strait of Hormuz & Red Sea)',
    shortLabel: 'Brent $89.00',
    lat: 25.277,
    lng: 55.2962,
    riskScore: 88,
    riskLevel: 'CRITICAL',
    color: '#EF4444',
    category: 'ENERGY',
    eventTitle: 'Red Sea Maritime Bottleneck & Crude Oil Spike',
    impactSummary: 'Naval transit detour around Africa adds 14 shipping days; maritime freight insurance rates surge +45%.',
    marketMetric: 'Brent Crude $89.00/bbl',
    changeStr: '+1.26%',
    isPositive: true,
    topSectors: ['Oil & Gas', 'Airlines', 'Global Shipping', 'Refineries'],
    affectedStocks: ['RELIANCE', 'INDIGO', 'ONGC', 'BPCL'],
    aiActionRecommendation: 'Hedge airline portfolio exposure via upstream oil refiners (Reliance / ONGC).'
  },
  // 4. CHINA
  {
    id: 'country-cn',
    name: 'China (Beijing / Shanghai)',
    shortLabel: 'Copper $9,820',
    lat: 31.2304,
    lng: 121.4737,
    riskScore: 72,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'COMMODITIES',
    eventTitle: 'Crude Steel Output Restrictions & Stimulus',
    impactSummary: 'Government mandates smelter production caps to curb carbon emissions; LME Copper Grade A climbs to $9,820/MT.',
    marketMetric: 'LME Copper: $9,820/MT',
    changeStr: '+1.40%',
    isPositive: true,
    topSectors: ['Metals & Mining', 'Real Estate', 'Industrial Power Cables'],
    affectedStocks: ['TATASTEEL', 'HINDALCO', 'VEDL'],
    aiActionRecommendation: 'Monitor primary steel realizations as domestic TMT bar demand absorbs Chinese export cuts.'
  },
  // 5. TAIWAN
  {
    id: 'country-tw',
    name: 'Taiwan (Taipei - TSMC Foundry)',
    shortLabel: 'TSMC AI Chip',
    lat: 25.033,
    lng: 121.5654,
    riskScore: 85,
    riskLevel: 'CRITICAL',
    color: '#EF4444',
    category: 'TECH',
    eventTitle: 'Sub-3nm Foundry Capacity Shortage',
    impactSummary: 'Advanced silicon fabrication capacity sold out through FY27; high backlog for AI server accelerators.',
    marketMetric: 'Semiconductor Index',
    changeStr: '+3.15%',
    isPositive: true,
    topSectors: ['Semiconductors', 'AI Data Centers', 'Hardware Assembly'],
    affectedStocks: ['NVDA', 'AAPL', 'TCS'],
    aiActionRecommendation: 'High tailwind for IT infrastructure service providers supporting AI cluster deployment.'
  },
  // 6. GERMANY
  {
    id: 'country-de',
    name: 'Germany (Frankfurt / Berlin)',
    shortLabel: 'DAX 18,250',
    lat: 51.1657,
    lng: 10.4515,
    riskScore: 65,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'ENERGY',
    eventTitle: 'Industrial Power Costs & Automotive Export Drag',
    impactSummary: 'High energy prices pressure chemical & auto OEM manufacturing margins across the Rhine corridor.',
    marketMetric: 'DAX Index: 18,250',
    changeStr: '-0.35%',
    isPositive: false,
    topSectors: ['Automobile OEMs', 'Chemicals', 'Industrial Machinery'],
    affectedStocks: ['TATAMOTORS', 'MARUTI'],
    aiActionRecommendation: 'Watch JLR European dealership retail velocity.'
  },
  // 7. UNITED KINGDOM
  {
    id: 'country-uk',
    name: 'United Kingdom (London)',
    shortLabel: 'FTSE 8,180',
    lat: 51.5074,
    lng: -0.1278,
    riskScore: 58,
    riskLevel: 'MODERATE',
    color: '#F59E0B',
    category: 'POLICY',
    eventTitle: 'Bank of England Rate Cut & Steel Decarbonization',
    impactSummary: 'Tata Steel Port Talbot grant package transitions blast furnaces to electric arc technology.',
    marketMetric: 'FTSE 100: 8,180',
    changeStr: '+0.15%',
    isPositive: true,
    topSectors: ['Banking', 'Steel', 'Pharmaceuticals'],
    affectedStocks: ['TATASTEEL', 'BHARTIARTL'],
    aiActionRecommendation: 'Monitor Port Talbot transition cost offsets.'
  },
  // 8. JAPAN
  {
    id: 'country-jp',
    name: 'Japan (Tokyo)',
    shortLabel: 'Yen 147.20',
    lat: 35.6762,
    lng: 139.6503,
    riskScore: 52,
    riskLevel: 'MODERATE',
    color: '#F59E0B',
    category: 'POLICY',
    eventTitle: 'BOJ Rate Normalization & Yen Carry Unwind',
    impactSummary: 'Bank of Japan interest rate policy adjustments spark volatility across global carry trade flows.',
    marketMetric: 'USD/JPY: 147.20',
    changeStr: '-0.85%',
    isPositive: false,
    topSectors: ['Automotive Exports', 'Robotics', 'Financials'],
    affectedStocks: ['MARUTI', 'HDFCBANK'],
    aiActionRecommendation: 'Monitor Maruti Suzuki Suzuki Motor royalty currency hedges.'
  },
  // 9. SOUTH KOREA
  {
    id: 'country-kr',
    name: 'South Korea (Seoul)',
    shortLabel: 'HBM Memory',
    lat: 37.5665,
    lng: 126.978,
    riskScore: 68,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'TECH',
    eventTitle: 'HBM3e Memory Chip Supply Squeeze',
    impactSummary: 'High Bandwidth Memory (HBM) production bottlenecks increase AI GPU server cost build-ups.',
    marketMetric: 'KOSPI Index: 2,740',
    changeStr: '+1.05%',
    isPositive: true,
    topSectors: ['Memory Semiconductors', 'Display Panels', 'EV Batteries'],
    affectedStocks: ['NVDA', 'AAPL'],
    aiActionRecommendation: 'Overweight AI hardware supply chain infrastructure.'
  },
  // 10. AUSTRALIA
  {
    id: 'country-au',
    name: 'Australia (Sydney / Perth)',
    shortLabel: 'Iron Ore $108',
    lat: -25.2744,
    lng: 133.7751,
    riskScore: 32,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'COMMODITIES',
    eventTitle: 'Iron Ore & LNG Liquefied Gas Shipping Boom',
    impactSummary: 'High export volume from Pilbara mines keeps global steelmaking raw material input costs stable.',
    marketMetric: 'Iron Ore Fines $108/MT',
    changeStr: '+0.85%',
    isPositive: true,
    topSectors: ['Mining', 'LNG Gas', 'Agriculture'],
    affectedStocks: ['TATASTEEL', 'VEDL'],
    aiActionRecommendation: 'Stable input cost environment for Indian primary steelmakers.'
  },
  // 11. SOUTH AMERICA (CHILE/ARGENTINA)
  {
    id: 'country-sa',
    name: 'South America (Chile / Argentina)',
    shortLabel: 'Lithium $14.2k',
    lat: -23.5505,
    lng: -46.6333,
    riskScore: 74,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'COMMODITIES',
    eventTitle: 'Lithium Mining Outage & Battery Cost Spike',
    impactSummary: 'South American mining stoppage causes short-term EV battery cell input cost pressure ($14,200/MT).',
    marketMetric: 'Lithium Spot $14,200/MT',
    changeStr: '+3.80%',
    isPositive: true,
    topSectors: ['EV Battery Cells', 'Automotive OEMs', 'Energy Storage'],
    affectedStocks: ['TATAMOTORS', 'MARUTI', 'M&M'],
    aiActionRecommendation: 'Watch EV OEM gross margins as raw material contracts reset.'
  },
  // 12. BRAZIL
  {
    id: 'country-br',
    name: 'Brazil (São Paulo)',
    shortLabel: 'Sugar & Iron',
    lat: -14.235,
    lng: -51.9253,
    riskScore: 48,
    riskLevel: 'MODERATE',
    color: '#F59E0B',
    category: 'COMMODITIES',
    eventTitle: 'Sugarcane Harvest & Iron Ore Output',
    impactSummary: 'Ethanol blending mandate & Vale mining exports impact global agricultural & metal supply.',
    marketMetric: 'Bovespa Index: 126,400',
    changeStr: '+0.42%',
    isPositive: true,
    topSectors: ['Sugar & Ethanol', 'Iron Mining', 'Agri Commodities'],
    affectedStocks: ['TATASTEEL'],
    aiActionRecommendation: 'Favorable sugar price environment for Indian sugar & ethanol producers.'
  },
  // 13. SINGAPORE
  {
    id: 'country-sg',
    name: 'Singapore (Malacca Strait Logistics)',
    shortLabel: 'GRM $7.80',
    lat: 1.3521,
    lng: 103.8198,
    riskScore: 24,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'LOGISTICS',
    eventTitle: 'Gross Refining Margin (GRM) Expansion',
    impactSummary: 'Singapore GRM benchmarks rise to $7.80/bbl; boosts export refining realizations for Indian refiners.',
    marketMetric: 'Singapore GRM: $7.80/bbl',
    changeStr: '+4.50%',
    isPositive: true,
    topSectors: ['Oil Refining', 'Maritime Logistics', 'Petrochemicals'],
    affectedStocks: ['RELIANCE', 'ONGC', 'IOC'],
    aiActionRecommendation: 'Positive refining margin tailwind for Reliance Industries & ONGC.'
  },
  // 14. SOUTH AFRICA
  {
    id: 'country-za',
    name: 'South Africa (Johannesburg)',
    shortLabel: 'Platinum $980',
    lat: -30.5595,
    lng: 22.9375,
    riskScore: 64,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'COMMODITIES',
    eventTitle: 'Platinum Group Metals (PGM) Mining Deficit',
    impactSummary: 'Power grid load shedding restricts platinum & palladium extraction for auto catalytic converters.',
    marketMetric: 'Platinum Spot $980/oz',
    changeStr: '+1.65%',
    isPositive: true,
    topSectors: ['Precious Metals', 'Mining', 'Automotive Catalysts'],
    affectedStocks: ['TATAMOTORS', 'MARUTI'],
    aiActionRecommendation: 'Watch auto emission catalyst component pricing.'
  },
  // 15. CANADA
  {
    id: 'country-ca',
    name: 'Canada (Toronto / Calgary)',
    shortLabel: 'WTI $84.20',
    lat: 56.1304,
    lng: -106.3468,
    riskScore: 35,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'COMMODITIES',
    eventTitle: 'Trans Mountain Pipeline Expansion & Potash Export',
    impactSummary: 'Increased heavy crude export capacity to Pacific buyers stabilizes North American energy prices.',
    marketMetric: 'WTI Crude $84.20/bbl',
    changeStr: '+1.10%',
    isPositive: true,
    topSectors: ['Heavy Crude', 'Fertilizer Potash', 'Timber'],
    affectedStocks: ['RELIANCE'],
    aiActionRecommendation: 'Favorable fertilizer input pricing for Indian agricultural sector.'
  },
  // 16. MEXICO
  {
    id: 'country-mx',
    name: 'Mexico (Mexico City)',
    shortLabel: 'Nearshoring',
    lat: 23.6345,
    lng: -102.5528,
    riskScore: 30,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'LOGISTICS',
    eventTitle: 'US Manufacturing Nearshoring Hub',
    impactSummary: 'Record FDI flows into automotive & electronics manufacturing along the US-Mexico border.',
    marketMetric: 'IPC Index: 53,800',
    changeStr: '+0.65%',
    isPositive: true,
    topSectors: ['Auto Components', 'Industrial Real Estate', 'Freight'],
    affectedStocks: ['MATHERSO', 'TATAMOTORS'],
    aiActionRecommendation: 'Positive export order book for Indian auto component manufacturers.'
  },
  // 17. RUSSIA
  {
    id: 'country-ru',
    name: 'Russia (Moscow / Black Sea)',
    shortLabel: 'Urals Crude',
    lat: 61.524,
    lng: 105.3188,
    riskScore: 92,
    riskLevel: 'CRITICAL',
    color: '#EF4444',
    category: 'ENERGY',
    eventTitle: 'Sanctions & Discounted Urals Crude Supply',
    impactSummary: 'Indian refiners source discounted Russian crude oil; hedges domestic fuel price inflation.',
    marketMetric: 'Urals Discount $12/bbl',
    changeStr: '-1.40%',
    isPositive: false,
    topSectors: ['Refining', 'Fertilizer Imports', 'Grains'],
    affectedStocks: ['RELIANCE', 'IOC', 'BPCL'],
    aiActionRecommendation: 'High gross refining margin buffer for Indian oil refiners.'
  },
  {
    id: 'country-ch',
    name: 'Switzerland (Zurich / Geneva)',
    shortLabel: 'Gold Vaults',
    lat: 46.8182,
    lng: 8.2275,
    riskScore: 42,
    riskLevel: 'MODERATE',
    color: '#F59E0B',
    category: 'POLICY',
    eventTitle: 'Central Bank Gold Reserves & Private Wealth',
    impactSummary: 'Global central banks increase gold allocations; Gold Spot consolidates near $4,426/oz.',
    marketMetric: 'Gold Spot $4,426.80/oz',
    changeStr: '-1.10%',
    isPositive: false,
    topSectors: ['Private Banking', 'Gold Reserves', 'Pharmaceuticals'],
    affectedStocks: ['MUTHOOTFIN', 'TITAN'],
    aiActionRecommendation: 'Strong asset backing for gold loan NBFCs (Muthoot, Manappuram).'
  },
  // 19. VIETNAM
  {
    id: 'country-vn',
    name: 'Vietnam (Hanoi / Ho Chi Minh)',
    shortLabel: 'Electronics',
    lat: 14.0583,
    lng: 108.2772,
    riskScore: 28,
    riskLevel: 'OPPORTUNITY',
    color: '#00D09C',
    category: 'LOGISTICS',
    eventTitle: 'Consumer Electronics & Mobile Assembly Hub',
    impactSummary: 'Apple & Samsung expand handset manufacturing plants; strong export growth across Southeast Asia.',
    marketMetric: 'VN Index: 1,240',
    changeStr: '+0.88%',
    isPositive: true,
    topSectors: ['Electronics Assembly', 'Textiles', 'Industrial Parks'],
    affectedStocks: ['DIXON', 'TCS'],
    aiActionRecommendation: 'Electronics manufacturing services growth spur.'
  },
  // 20. SAUDI ARABIA
  {
    id: 'country-saudi',
    name: 'Saudi Arabia (Riyadh)',
    shortLabel: 'Aramco CapEx',
    lat: 23.8859,
    lng: 45.0792,
    riskScore: 62,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'ENERGY',
    eventTitle: 'OPEC+ Crude Production Quotas & Vision 2030',
    impactSummary: 'Voluntary crude output cuts of 2.2M bpd maintain global oil price floor above $80/bbl.',
    marketMetric: 'OPEC Basket $86.40',
    changeStr: '+0.95%',
    isPositive: true,
    topSectors: ['Oil Production', 'Chemicals', 'Mega Infra'],
    affectedStocks: ['RELIANCE', 'LT'],
    aiActionRecommendation: 'L&T Middle East EPC order book expansion.'
  },
  // 21. INDONESIA
  {
    id: 'country-id',
    name: 'Indonesia (Jakarta)',
    shortLabel: 'Nickel Ore',
    lat: -0.7893,
    lng: 113.9213,
    riskScore: 66,
    riskLevel: 'HIGH',
    color: '#F97316',
    category: 'COMMODITIES',
    eventTitle: 'Nickel Ore Export Ban & Smelter Processing',
    impactSummary: 'Downstream nickel processing mandates drive EV battery cathode raw material supply chains.',
    marketMetric: 'LME Nickel $16,800/MT',
    changeStr: '+2.10%',
    isPositive: true,
    topSectors: ['Nickel Smelting', 'EV Batteries', 'Coal Mining'],
    affectedStocks: ['TATAMOTORS', 'VEDL'],
    aiActionRecommendation: 'Monitor stainless steel & battery input costs.'
  },
  // 22. ISRAEL
  {
    id: 'country-il',
    name: 'Israel (Tel Aviv)',
    shortLabel: 'CyberTech',
    lat: 31.0461,
    lng: 34.8516,
    riskScore: 86,
    riskLevel: 'CRITICAL',
    color: '#EF4444',
    category: 'TECH',
    eventTitle: 'Geopolitical Flare-Up & Cyber Defense Demand',
    impactSummary: 'Geopolitical conflict drives global enterprise cybersecurity & defense software spending.',
    marketMetric: 'TA 35 Index: 1,980',
    changeStr: '-1.15%',
    isPositive: false,
    topSectors: ['Cybersecurity', 'Defense Tech', 'Semiconductor R&D'],
    affectedStocks: ['TCS', 'INFY'],
    aiActionRecommendation: 'Tailwind for IT cybersecurity consulting revenues.'
  }
];

// Global Trade Supply Flow Arcs
const SUPPLY_FLOW_ARCS: { id: string; from: [number, number]; to: [number, number]; label: string; color: string }[] = [
  { id: 'arc-1', from: [25.27, 55.29], to: [20.59, 78.96], label: 'Crude Oil Shipping (Middle East → India)', color: '#EF4444' },
  { id: 'arc-2', from: [25.03, 121.56], to: [38.90, -77.03], label: 'Semiconductor Chips (Taiwan → USA)', color: '#38BDF8' },
  { id: 'arc-3', from: [-23.55, -46.63], to: [50.11, 8.68], label: 'Lithium Raw Material (S.America → Europe)', color: '#F59E0B' },
  { id: 'arc-4', from: [31.23, 121.47], to: [20.59, 78.96], label: 'Steel & Copper (China → India)', color: '#10B981' },
  { id: 'arc-5', from: [-25.27, 133.77], to: [31.23, 121.47], label: 'Iron Ore Shipments (Australia → China)', color: '#00D09C' }
];

export const GlobalHeatmap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<HeatmapRegion>(ALL_GLOBAL_COUNTRIES[0]);
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'CRITICAL' | 'OPPORTUNITY' | 'ENERGY' | 'COMMODITIES' | 'TECH'>('ALL');
  const [showFlowLines, setShowFlowLines] = useState<boolean>(true);

  const filteredRegions = activeLayer === 'ALL'
    ? ALL_GLOBAL_COUNTRIES
    : ALL_GLOBAL_COUNTRIES.filter((r) => r.category === activeLayer || r.riskLevel === activeLayer);

  return (
    <div className="space-y-6">
      {/* 1. Glassmorphic Control Bar */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4 animate-pulse" />
            <span>Institutional Macro Geospatial OS ({ALL_GLOBAL_COUNTRIES.length} Countries Live)</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">Worldwide Economic Risk Radar & Trade Flow Map</h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Real-time geospatial vector monitoring across 22 global economies, central bank interest rate policies, maritime trade corridors, and portfolio impact nodes.
          </p>
        </div>

        {/* Filter Layer Switcher Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none bg-[var(--card-inner)] p-1.5 rounded-2xl border border-[var(--border-color)] z-10">
          {(['ALL', 'CRITICAL', 'OPPORTUNITY', 'ENERGY', 'COMMODITIES', 'TECH'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeLayer === layer ? 'bg-[#00D09C] text-[#0A0E1A] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Leaflet Map Canvas & Side Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High Precision Leaflet Map displaying 22 Global Countries */}
        <div className="lg:col-span-2 groww-card overflow-hidden relative border border-[var(--border-color)] shadow-2xl rounded-3xl" style={{ height: '620px' }}>
          <MapContainer
            center={[18, 10]}
            zoom={1.85}
            minZoom={1.5}
            maxZoom={6}
            scrollWheelZoom={true}
            className="w-full h-full z-10"
            style={{ background: '#090C12' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; World Dark Gray Base'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              maxZoom={16}
            />

            {/* Trade Flow Vector Lines */}
            {showFlowLines && SUPPLY_FLOW_ARCS.map((arc) => (
              <Polyline
                key={arc.id}
                positions={[arc.from, arc.to]}
                pathOptions={{
                  color: arc.color,
                  weight: 2.5,
                  dashArray: '6, 8',
                  opacity: 0.75
                }}
              />
            ))}

            {/* Custom Glowing Country Pins */}
            {filteredRegions.map((region) => (
              <Marker
                key={region.id}
                position={[region.lat, region.lng]}
                icon={createCustomIcon(region.color, region.shortLabel, region.riskLevel === 'CRITICAL')}
                eventHandlers={{
                  click: () => setSelectedRegion(region)
                }}
              >
                <Popup className="leaflet-popup-dark">
                  <div className="p-2 max-w-xs text-xs font-sans text-gray-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">{region.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        region.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40'
                      }`}>
                        {region.riskLevel}
                      </span>
                    </div>
                    <p className="font-bold text-[#00D09C]">{region.eventTitle}</p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{region.impactSummary}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating Map Controls & Flow Toggle */}
          <div className="absolute top-4 right-4 z-20 bg-[var(--card-bg)]/90 border border-[var(--border-color)] backdrop-blur-md p-2 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-mono">
            <button
              onClick={() => setShowFlowLines(!showFlowLines)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all ${
                showFlowLines ? 'bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40' : 'bg-[var(--card-inner)] text-slate-400'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{showFlowLines ? 'Hide Supply Arcs' : 'Show Supply Arcs'}</span>
            </button>
          </div>

          {/* Floating Live Macro Status Dock */}
          <div className="absolute bottom-4 left-4 z-20 bg-[var(--card-bg)]/90 border border-[var(--border-color)] backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-xs max-w-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Geopolitical Trade Radar</span>
              </span>
              <span className="text-[10px] font-mono text-[#00D09C] font-bold flex items-center space-x-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                <span>{filteredRegions.length} Active Pins</span>
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Dashed arcs show high-volume commodity & semiconductor trade flows connecting global manufacturing hubs.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Selected Country Deep Inspector Drawer */}
        <div className="groww-card p-6 space-y-5 flex flex-col justify-between rounded-3xl border border-[var(--border-color)]">
          <div className="space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Selected Macro Node</span>
                <span className={`text-[10px] font-mono font-extrabold px-3 py-1 rounded-full ${
                  selectedRegion.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40'
                }`}>
                  {selectedRegion.riskLevel}
                </span>
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)] mt-1">{selectedRegion.name}</h2>
            </div>

            {/* Risk Gauge Meter */}
            <div className="space-y-2 bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)] font-mono text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[var(--text-secondary)]">Regional Risk Magnitude</span>
                <span className={selectedRegion.riskScore > 70 ? 'text-red-400' : 'text-[#00D09C]'}>
                  {selectedRegion.riskScore} / 100
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  className={`h-full ${selectedRegion.riskScore > 70 ? 'bg-red-500' : 'bg-[#00D09C]'}`}
                  style={{ width: `${selectedRegion.riskScore}%` }}
                ></div>
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-xs text-[#00D09C] font-mono">{selectedRegion.eventTitle}</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                {selectedRegion.impactSummary}
              </p>
            </div>

            {/* Live Market Metric */}
            <div className="flex items-center justify-between text-xs font-mono bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
              <span className="text-[var(--text-secondary)] font-medium">{selectedRegion.marketMetric}</span>
              <span className={`font-bold flex items-center ${selectedRegion.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
                {selectedRegion.isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                {selectedRegion.changeStr}
              </span>
            </div>

            {/* AI Action Recommendation */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5" />
                <span>AI Portfolio Hedging Action</span>
              </div>
              <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed bg-amber-500/10 p-3 rounded-2xl border border-amber-500/30">
                {selectedRegion.aiActionRecommendation}
              </p>
            </div>
          </div>

          {/* Affected Stock Badges */}
          <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
            <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase font-bold">Affected Portfolio Holdings</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedRegion.affectedStocks.map((stk, i) => (
                <span key={i} className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30 flex items-center space-x-1">
                  <span>{stk}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
