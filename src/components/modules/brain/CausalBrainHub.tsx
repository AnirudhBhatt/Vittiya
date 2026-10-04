import React, { useState } from 'react';
import { Brain, MapPin, Building, Globe, ShieldAlert, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap, AlertTriangle, Target, CheckCircle2 } from 'lucide-react';

export interface BrainConnectionScenario {
  id: string;
  title: string;
  category: string;
  
  // 3-Level News Cascade
  localDistrictNews: {
    district: string;
    headline: string;
    impact: string;
  };
  nationalCountryNews: {
    country: string;
    headline: string;
    impact: string;
  };
  globalWorldNews: {
    region: string;
    headline: string;
    impact: string;
  };

  // Investment Opportunities & Horizon Analytics
  horizonType: 'SHORT-TERM SWING ONLY' | 'LONG-TERM STRUCTURAL BUY' | 'SHORT-TERM AVOID / SELL';
  horizonDuration: string; // e.g. "1 - 3 Weeks", "6 - 18 Months"
  aiHorizonAdvice: string; // Explains short-term vs long-term buy rationale

  // Stocks & Assets Affected
  stockWinners: { symbol: string; name: string; targetUpside: string; rationale: string }[];
  stockLosers: { symbol: string; name: string; targetDownside: string; rationale: string }[];

  // Loss Prevention & Risk Shield
  riskShield: {
    stopLossLevel: string;
    hedgingStrategy: string;
    falsePredictionWarning: string;
  };
}

const BRAIN_SCENARIOS: BrainConnectionScenario[] = [
  {
    id: 'brain-scen-1',
    title: 'Nashik Grape & Sugar Damage vs Global Ethanol Supply',
    category: 'Agri-Commodities & Sugar',
    localDistrictNews: {
      district: 'Nashik & Solapur (Maharashtra)',
      headline: 'Unseasonal Hailstorms & Heavy Downpour Damage 35% of Local Sugarcane & Grape Crops',
      impact: 'Immediate local crushing delays; sugar mills operate at 60% capacity.'
    },
    nationalCountryNews: {
      country: 'India (New Delhi)',
      headline: 'Ministry of Commerce Imposes 20% Export Tariff on Raw Sugar & Increases Domestic Ethanol Mandate',
      impact: 'Domestic sugar prices jump +8%; ethanol procurement rates revised upward by ₹2.4/liter.'
    },
    globalWorldNews: {
      region: 'London / New York Commodities Exchange',
      headline: 'ICE Raw Sugar Futures Surge +12.5% on Indian Export Restrictions & Brazilian Shipping Bottlenecks',
      impact: 'Global sugar deficit expands to 3.2 million metric tons.'
    },
    horizonType: 'SHORT-TERM SWING ONLY',
    horizonDuration: '2 - 4 Weeks (Quick Swing Trade)',
    aiHorizonAdvice: 'THIS IS A SHORT-TERM TEMPORARY PROBLEM. Highly profitable for a 2-4 week swing trade in domestic sugar mills. Long-term buy is NOT recommended because Brazilian sugar harvests will hit global markets in Q3, normalizing prices.',
    stockWinners: [
      { symbol: 'BALRAMCHIN', name: 'Balrampur Chini Mills', targetUpside: '+8.5% (2 Wks)', rationale: 'Ethanol price hike expands Q2 gross margins' },
      { symbol: 'TRIVENI', name: 'Triveni Engineering', targetUpside: '+6.2% (3 Wks)', rationale: 'High distillery capacity utilization boost' }
    ],
    stockLosers: [
      { symbol: 'FMCG_PACKAGED', name: 'Packaged Confectionery Brands', targetDownside: '-3.1%', rationale: 'Raw sugar input cost inflation depresses operating margin' }
    ],
    riskShield: {
      stopLossLevel: 'Set Strict Stop-Loss at ₹382 (-3.0% from entry)',
      hedgingStrategy: 'Buy Sugar Futures Put Option (PE) at ₹380 strike to hedge against unexpected export ban reversals.',
      falsePredictionWarning: 'If monsoon rainfall recovers in Brazil early next week, exit swing trade immediately at break-even.'
    }
  },
  {
    id: 'brain-scen-2',
    title: 'Tamil Nadu Auto Belt Labor Dispute vs Global EV Component Supply',
    category: 'Auto & EV Supply Chain',
    localDistrictNews: {
      district: 'Kanchipuram & Sriperumbudur (Tamil Nadu)',
      headline: 'Labor Union Work Stoppage at Major EV Wire Harness Factory Halts Daily Dispatch',
      impact: '4,200 EV wiring harness units delayed daily; local assembly lines stalled.'
    },
    nationalCountryNews: {
      country: 'India (Automotive Sector)',
      headline: 'Tier-1 Auto Component Dispatch Backlog Spikes; OEM Inventory Stockouts Expected in Q2',
      impact: 'OEM vehicle dispatch lead times increase from 4 days to 22 days.'
    },
    globalWorldNews: {
      region: 'Global EV Supply Chains (EU & USA)',
      headline: 'European EV Assemblers Face Wiring Harness Shortages Sourced from Asian Ancillaries',
      impact: 'Global EV battery pack integration delayed across EU factories.'
    },
    horizonType: 'SHORT-TERM AVOID / SELL',
    horizonDuration: '1 - 3 Weeks (Temporary Downside Drag)',
    aiHorizonAdvice: 'SHORT-TERM HEADWIND. Avoid fresh long positions in auto OEM stocks for the next 2-3 weeks. However, do NOT panic sell long-term holdings as union negotiations are ongoing and expected to resolve by month-end.',
    stockWinners: [
      { symbol: 'EXIDEIND', name: 'Exide Industries', targetUpside: '+4.1%', rationale: 'Replacement battery aftermarket demand buffers OEM lag' }
    ],
    stockLosers: [
      { symbol: 'MOTHERSON', name: 'Samvardhana Motherson', targetDownside: '-4.8% (2 Wks)', rationale: 'Wiring harness plant stoppage drags Q2 dispatch volumes' },
      { symbol: 'TVSMOTOR', name: 'TVS Motor Company', targetDownside: '-2.9%', rationale: 'EV scooter dispatch delays at Sriperumbudur hub' }
    ],
    riskShield: {
      stopLossLevel: 'Trailing Stop-Loss on existing longs at ₹2,350',
      hedgingStrategy: 'Buy 1-Month Put Option (PE) to hedge equity portfolio against lower circuit triggers.',
      falsePredictionWarning: 'If state labor board enforces emergency arbitration tomorrow, auto stocks will gap up +3% instantly.'
    }
  },
  {
    id: 'brain-scen-3',
    title: 'Gujarat Dahej Chemical Port Fire vs European Specialty Chemical Order Shift',
    category: 'Specialty Chemicals & Exports',
    localDistrictNews: {
      district: 'Bharuch & Dahej PCPIR (Gujarat)',
      headline: 'Industrial Complex Storage Tank Fire Forces 10-Day Precautionary Outage at Chemical Terminal',
      impact: 'Fluorochemical and refrigerant gas production lines offline.'
    },
    nationalCountryNews: {
      country: 'India (Chemical Manufacturing)',
      headline: 'Domestic Specialty Chemical Spot Prices Surge +18% on Shortage Fears',
      impact: 'Agrochemical & pharma raw material input costs increase.'
    },
    globalWorldNews: {
      region: 'Europe & North America',
      headline: 'EU Pharmaceutical & Agrochemical Buyers Reroute Supply Orders to Alternate Indian Refiners',
      impact: 'Contractual spot premiums jump +24% for ready chemical stocks.'
    },
    horizonType: 'LONG-TERM STRUCTURAL BUY',
    horizonDuration: '6 - 12 Months (Structural Order Shift)',
    aiHorizonAdvice: 'LONG-TERM STRUCTURAL WINNER. Unlike short-term agricultural weather disruptions, European buyers signing long-term 3-year supply contracts with non-affected Indian chemical refiners creates permanent multi-year earnings expansion.',
    stockWinners: [
      { symbol: 'SRF', name: 'SRF Limited', targetUpside: '+18.5% (6 Mos)', rationale: 'Refrigerant gas export market share gain' },
      { symbol: 'FLUOROCHEM', name: 'Gujarat Fluorochemicals', targetUpside: '+14.2% (6 Mos)', rationale: 'Specialty fluoropolymer long-term contract expansion' }
    ],
    stockLosers: [
      { symbol: 'MIDCAP_AGRO', name: 'Small Formulators', targetDownside: '-3.5%', rationale: 'Unable to pass on raw chemical input cost inflation' }
    ],
    riskShield: {
      stopLossLevel: 'Set Long-Term Structural Stop-Loss at ₹2,150 (-5.0%)',
      hedgingStrategy: 'DCA (Dollar Cost Average) buying on any 2-3% pullbacks.',
      falsePredictionWarning: 'Monitor Chinese export quota announcements; if China dumps excess chemical inventory, trim positions by 30%.'
    }
  }
];

export const CausalBrainHub: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<BrainConnectionScenario>(BRAIN_SCENARIOS[0]);

  const getHorizonBadge = (type: BrainConnectionScenario['horizonType']) => {
    switch (type) {
      case 'SHORT-TERM SWING ONLY':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono font-bold text-xs flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>SHORT-TERM SWING ONLY</span>
          </span>
        );
      case 'LONG-TERM STRUCTURAL BUY':
        return (
          <span className="px-3 py-1 rounded-full bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40 font-mono font-bold text-xs flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>LONG-TERM STRUCTURAL BUY</span>
          </span>
        );
      case 'SHORT-TERM AVOID / SELL':
        return (
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 font-mono font-bold text-xs flex items-center space-x-1.5">
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            <span>SHORT-TERM AVOID / SELL</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-inner)] to-purple-600/10 border border-purple-500/30 shadow-2xl rounded-3xl">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>VITTIYA AI Causal Brain OS</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">
            Multi-Tier News Connection & Investment Horizon Brain
          </h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-2xl">
            Connecting <strong>District Local News ➔ National Country Policy ➔ Global World Markets</strong> to pinpoint short-term swing vs long-term investment opportunities & loss prevention hedging shields.
          </p>
        </div>

        {/* Scenario Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none z-10 bg-[var(--card-inner)] p-1.5 rounded-2xl border border-[var(--border-color)]">
          {BRAIN_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => setSelectedScenario(scen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedScenario.id === scen.id ? 'bg-[#00D09C] text-[#0A0E1A] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {scen.title.slice(0, 26)}...
            </button>
          ))}
        </div>
      </div>

      {/* 2. Multi-Level News Connection Pipeline (District -> Country -> World) */}
      <div className="groww-card p-6 space-y-6 rounded-3xl border border-[var(--border-color)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">
              3-Level Causal Connection Pipeline
            </h2>
          </div>
          <span className="text-xs font-mono text-[#00D09C] font-bold">Category: {selectedScenario.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Level 1: Local District News */}
          <div className="p-5 rounded-2xl bg-[var(--card-inner)] border border-amber-500/30 space-y-3 relative group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px] flex items-center space-x-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span>LEVEL 1: LOCAL DISTRICT</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedScenario.localDistrictNews.district}</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug font-sans">
              {selectedScenario.localDistrictNews.headline}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--border-color)]">
              <strong>Ground Impact:</strong> {selectedScenario.localDistrictNews.impact}
            </p>
          </div>

          {/* Level 2: National Country News */}
          <div className="p-5 rounded-2xl bg-[var(--card-inner)] border border-blue-500/30 space-y-3 relative group hover:border-blue-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px] flex items-center space-x-1">
                <Building className="w-3 h-3 mr-1" />
                <span>LEVEL 2: NATIONAL POLICY</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedScenario.nationalCountryNews.country}</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug font-sans">
              {selectedScenario.nationalCountryNews.headline}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--border-color)]">
              <strong>Policy Reaction:</strong> {selectedScenario.nationalCountryNews.impact}
            </p>
          </div>

          {/* Level 3: Global World News */}
          <div className="p-5 rounded-2xl bg-[var(--card-inner)] border border-purple-500/30 space-y-3 relative group hover:border-purple-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-[10px] flex items-center space-x-1">
                <Globe className="w-3 h-3 mr-1" />
                <span>LEVEL 3: GLOBAL MACRO</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedScenario.globalWorldNews.region}</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug font-sans">
              {selectedScenario.globalWorldNews.headline}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--border-color)]">
              <strong>Global Ripple:</strong> {selectedScenario.globalWorldNews.impact}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Actionable Investment Opportunities & Horizon Timing Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Short-Term vs Long-Term Investment Rationale */}
        <div className="groww-card p-6 space-y-5 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#00D09C]" />
                <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">
                  Investment Horizon Analytics
                </h2>
              </div>
              {getHorizonBadge(selectedScenario.horizonType)}
            </div>

            <div className="p-4 rounded-2xl bg-[#00D09C]/10 border border-[#00D09C]/30 space-y-2">
              <div className="text-xs font-mono text-[#00D09C] font-bold uppercase flex justify-between">
                <span>Recommended Strategy Horizon</span>
                <span>Timeframe: {selectedScenario.horizonDuration}</span>
              </div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed font-sans font-semibold">
                {selectedScenario.aiHorizonAdvice}
              </p>
            </div>

            {/* Affected Stocks Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">Stock Opportunity Winners</div>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedScenario.stockWinners.map((stk) => (
                  <div key={stk.symbol} className="p-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-[var(--text-primary)]">{stk.symbol}</span>
                      <div className="text-[10px] text-[var(--text-secondary)]">{stk.rationale}</div>
                    </div>
                    <span className="font-extrabold text-[#00D09C] text-sm">{stk.targetUpside}</span>
                  </div>
                ))}
              </div>

              {selectedScenario.stockLosers.length > 0 && (
                <>
                  <div className="text-xs font-mono font-bold uppercase text-red-400 pt-2">Stocks / Sectors to Avoid or Sell</div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedScenario.stockLosers.map((stk) => (
                      <div key={stk.symbol} className="p-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">{stk.symbol}</span>
                          <div className="text-[10px] text-[var(--text-secondary)]">{stk.rationale}</div>
                        </div>
                        <span className="font-extrabold text-red-400 text-sm">{stk.targetDownside}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Card: Loss Prevention & False Prediction Protection Shield */}
        <div className="groww-card p-6 space-y-5 rounded-3xl border border-red-500/30 flex flex-col justify-between bg-gradient-to-b from-[var(--card-bg)] to-red-950/10">
          <div className="space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">
                  Loss Prevention & Protection Shield
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                CAPITAL PROTECTION
              </span>
            </div>

            {/* Stop Loss Rule */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1.5 font-mono text-xs">
              <div className="text-amber-400 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1. Strict Stop-Loss Boundary</span>
              </div>
              <p className="text-[var(--text-primary)] text-xs font-semibold">{selectedScenario.riskShield.stopLossLevel}</p>
            </div>

            {/* Options Hedging Strategy */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1.5 font-mono text-xs">
              <div className="text-[#00D09C] font-bold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>2. Options Hedging Strategy</span>
              </div>
              <p className="text-[var(--text-primary)] text-xs font-semibold">{selectedScenario.riskShield.hedgingStrategy}</p>
            </div>

            {/* False Prediction Warning */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1.5 font-mono text-xs">
              <div className="text-red-400 font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Wrong Prediction Recovery & Invalidation Trigger</span>
              </div>
              <p className="text-red-200 text-xs font-medium leading-relaxed">{selectedScenario.riskShield.falsePredictionWarning}</p>
            </div>
          </div>

          <div className="pt-2 text-[10px] font-mono text-[var(--text-secondary)] flex items-center justify-between border-t border-[var(--border-color)]">
            <span>AI Risk Model: Multi-level cross-verified via local ground feeds.</span>
            <span className="text-[#00D09C] font-bold">100% Capital Preserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
