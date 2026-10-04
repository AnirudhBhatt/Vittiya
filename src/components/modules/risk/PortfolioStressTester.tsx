import React, { useState } from 'react';
import { ShieldAlert, ArrowUpRight, ArrowDownRight, Sparkles, Sliders } from 'lucide-react';

interface SimulatedAsset {
  symbol: string;
  name: string;
  sector: string;
  betaSensitivity: string;
}

const SIMULATED_ASSETS: SimulatedAsset[] = [
  { symbol: 'TATASTEEL', name: 'Tata Steel Limited', sector: 'Metals & Infrastructure', betaSensitivity: 'High Beta (1.35)' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy & Refining', betaSensitivity: 'Moderate Beta (0.92)' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India', sector: 'Automobile & EVs', betaSensitivity: 'High Beta (1.18)' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking & Financials', betaSensitivity: 'Moderate Beta (1.05)' }
];

export const PortfolioStressTester: React.FC = () => {
  const [selectedShock, setSelectedShock] = useState<string>('shock-oil-110');

  const calculateShockImpact = (asset: SimulatedAsset, shockId: string) => {
    switch (shockId) {
      case 'shock-oil-110':
        if (asset.symbol === 'RELIANCE') return { pct: '+6.5%', isPos: true, reason: 'Refining margins surge on USD crude' };
        if (asset.symbol === 'MARUTI') return { pct: '-4.8%', isPos: false, reason: 'EV & logistics freight cost pressure' };
        if (asset.symbol === 'TATASTEEL') return { pct: '-2.1%', isPos: false, reason: 'Coking coal & freight cost inflation' };
        return { pct: '+0.5%', isPos: true, reason: 'USD strength benefit' };

      case 'shock-rbi-cut':
        if (asset.symbol === 'MARUTI') return { pct: '+7.2%', isPos: true, reason: 'Auto financing demand surge' };
        if (asset.symbol === 'TATASTEEL') return { pct: '+5.4%', isPos: true, reason: 'Capex & housing expansion demand' };
        if (asset.symbol === 'RELIANCE') return { pct: '+2.1%', isPos: true, reason: 'Broad market credit expansion' };
        return { pct: '+3.2%', isPos: true, reason: 'Banking credit growth acceleration' };

      case 'shock-china-rare':
        if (asset.symbol === 'MARUTI') return { pct: '-8.5%', isPos: false, reason: 'EV battery motor magnet shortage' };
        if (asset.symbol === 'TATASTEEL') return { pct: '-1.4%', isPos: false, reason: 'Indirect equipment cost' };
        return { pct: '0.0%', isPos: true, reason: 'Low rare earth dependence' };

      default:
        return { pct: '0.0%', isPos: true, reason: 'Baseline' };
    }
  };

  return (
    <div className="flex flex-col h-full groww-card overflow-hidden rounded-3xl border border-[var(--border-color)]">
      {/* Header */}
      <div className="p-5 border-b border-[var(--border-color)] bg-[var(--card-inner)] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-[#00D09C]" />
          <h2 className="text-sm font-bold text-[var(--text-primary)] font-sans uppercase tracking-wider">
            Macro Risk Stress-Tester & Shock Radar
          </h2>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30">
          Hypothetical Stress Simulator
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 p-6 gap-6 overflow-y-auto">
        {/* Left Column: Simulator Mode & Shock Controls */}
        <div className="space-y-4">
          {/* Simulator Control Card (NO FAKE MONEY / BALANCES) */}
          <div className="p-5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1.5 font-mono">
            <div className="flex items-center space-x-2 text-[#00D09C] font-bold text-xs">
              <Sliders className="w-4 h-4" />
              <span>Macro Scenario Test Engine</span>
            </div>
            <div className="text-sm font-extrabold text-[var(--text-primary)] font-sans pt-1">
              Asset Exposure Sensitivity Tester
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Test how major Indian stock sectors respond to global geopolitical crude oil spikes, RBI monetary rate cuts, or supply chain embargoes.
            </p>
          </div>

          {/* Scenario Action Cards */}
          <div className="space-y-2.5">
            <label className="text-xs text-[var(--text-secondary)] font-mono uppercase font-bold tracking-wider block">
              Select Shock Scenario
            </label>
            
            <button
              onClick={() => setSelectedShock('shock-oil-110')}
              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all ${
                selectedShock === 'shock-oil-110'
                  ? 'bg-red-500/15 border-red-500 text-[var(--text-primary)] shadow-lg shadow-red-500/10'
                  : 'bg-[var(--card-inner)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between text-[var(--text-primary)] font-sans">
                <span>🛢️ Crude Oil Spikes to $110/bbl</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  Geopolitical
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">Simulates 30% crude surge on logistics & profit margins.</p>
            </button>

            <button
              onClick={() => setSelectedShock('shock-rbi-cut')}
              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all ${
                selectedShock === 'shock-rbi-cut'
                  ? 'bg-[#00D09C]/15 border-[#00D09C] text-[var(--text-primary)] shadow-lg shadow-[#00D09C]/10'
                  : 'bg-[var(--card-inner)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between text-[var(--text-primary)] font-sans">
                <span>🏦 RBI Repo Rate Cut (-50 bps)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  Monetary
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">Simulates housing & capex loan demand expansion.</p>
            </button>

            <button
              onClick={() => setSelectedShock('shock-china-rare')}
              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all ${
                selectedShock === 'shock-china-rare'
                  ? 'bg-amber-500/15 border-amber-500 text-[var(--text-primary)] shadow-lg shadow-amber-500/10'
                  : 'bg-[var(--card-inner)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between text-[var(--text-primary)] font-sans">
                <span>⚡ China Rare Earth Export Ban</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  Supply Chain
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">Simulates EV battery & magnet supply bottlenecks.</p>
            </button>
          </div>
        </div>

        {/* Right 2 Columns: Stock Sector Shock Sensitivity Results */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--text-secondary)]">
            <span>INDEXED STOCK SECTOR</span>
            <span>SIMULATED IMPACT RESULT</span>
          </div>

          {SIMULATED_ASSETS.map((asset) => {
            const impact = calculateShockImpact(asset, selectedShock);
            return (
              <div key={asset.symbol} className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[var(--text-primary)] font-sans">{asset.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] font-bold border border-[var(--border-color)]">{asset.symbol}</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono mt-1">
                    {asset.sector} • {asset.betaSensitivity}
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className={`font-bold text-base flex items-center justify-end ${
                    impact.isPos ? 'text-[#00D09C]' : 'text-red-400'
                  }`}>
                    {impact.isPos ? <ArrowUpRight className="w-5 h-5 mr-0.5" /> : <ArrowDownRight className="w-5 h-5 mr-0.5" />}
                    {impact.pct}
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium max-w-[210px] truncate mt-0.5">{impact.reason}</div>
                </div>
              </div>
            );
          })}

          {/* Groww AI Recommendation Card */}
          <div className="p-5 rounded-2xl bg-[#00D09C]/10 border border-[#00D09C]/30 mt-4">
            <div className="flex items-center space-x-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#00D09C]" />
              <h4 className="font-bold text-xs text-[var(--text-primary)] font-sans">AI Macro Stress Insight</h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans font-medium">
              Geopolitical crude oil spikes create a <strong>-4.8% margin compression in Automotive</strong>, while boosting <strong>Gross Refining Margins (GRM) by +6.5% for energy refiners</strong>. Holding upstream refiners provides an effective macro hedge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
