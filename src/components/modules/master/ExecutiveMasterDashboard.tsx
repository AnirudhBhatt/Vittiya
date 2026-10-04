import React from 'react';
import {
  LIVE_TICKERS,
  MOST_BOUGHT_STOCKS,
  IPOS_LIST,
  COMMODITIES_EXCHANGE_LIST,
  RECENT_NEWS
} from '../../../data/mockData';
import {
  Globe,
  Rocket,
  Flame,
  Network,
  Newspaper,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Sparkles,
  BarChart2
} from 'lucide-react';

interface ExecutiveMasterDashboardProps {
  onNavigateTab: (tabKey: string) => void;
  onSelectStock: (symbol: string) => void;
}

export const ExecutiveMasterDashboard: React.FC<ExecutiveMasterDashboardProps> = ({
  onNavigateTab,
  onSelectStock
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Welcome Executive Banner */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-inner)] to-[#00D09C]/10 border border-[#00D09C]/30 shadow-2xl">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>VITTIYA Master Executive Dashboard</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">
            Global Economic Intelligence Command Center
          </h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Unified macro overview across all 9 modules: Stocks Explore, Global Risk Heatmap, IPOs Hub, Causal OS, Commodities, and Governance Radar.
          </p>
        </div>

        {/* Quick Module Jump Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none z-10">
          <button
            onClick={() => onNavigateTab('dashboard')}
            className="groww-btn-primary text-xs py-2 px-4 font-bold flex items-center space-x-1.5"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Explore Stocks</span>
          </button>
          <button
            onClick={() => onNavigateTab('heatmap')}
            className="px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono font-bold hover:border-[#00D09C] transition-all flex items-center space-x-1.5"
          >
            <Globe className="w-4 h-4 text-[#00D09C]" />
            <span>22 Countries Map</span>
          </button>
        </div>
      </div>

      {/* 2. Key Market Indices Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {LIVE_TICKERS.slice(0, 4).map((ticker, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab('dashboard')}
            className="groww-card p-4 space-y-1 cursor-pointer hover:border-[#00D09C]/40 transition-all font-mono"
          >
            <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">{ticker.symbol}</div>
            <div className="font-extrabold text-base text-[var(--text-primary)]">{ticker.price}</div>
            <div className={`text-xs font-bold flex items-center ${ticker.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
              {ticker.isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {ticker.change}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Master Grid: Overview Cards for All Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Stocks Explore Preview */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-[#00D09C]" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">Top Stocks & Gainers</h3>
              </div>
              <span className="text-[10px] font-mono text-[#00D09C] font-bold">NSE / BSE</span>
            </div>

            <div className="space-y-2.5">
              {MOST_BOUGHT_STOCKS.slice(0, 3).map((stk) => (
                <div
                  key={stk.symbol}
                  onClick={() => onSelectStock(stk.symbol)}
                  className="p-2.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] hover:border-[#00D09C]/50 cursor-pointer transition-all flex items-center justify-between font-mono text-xs"
                >
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">{stk.symbol}</span>
                    <div className="text-[10px] text-[var(--text-secondary)]">{stk.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--text-primary)]">{stk.price}</div>
                    <div className={stk.isPositive ? 'text-[#00D09C]' : 'text-red-500'}>{stk.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('dashboard')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open Stocks Explore</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>

        {/* Module 2: Global Risk Heatmap Preview */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">Global Risk Heatmap</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">22 Countries</span>
            </div>

            <div className="space-y-2 bg-[var(--card-inner)] p-3 rounded-2xl border border-[var(--border-color)] text-xs font-mono">
              <div className="flex justify-between items-center text-red-400 font-bold">
                <span>Middle East Transit</span>
                <span>Brent $89.00/bbl</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Naval detour around Africa adding 14 shipping days.
              </p>

              <div className="pt-2 border-t border-[var(--border-color)] flex justify-between items-center text-[#00D09C] font-bold">
                <span>India Infra Stimulus</span>
                <span>Nifty 24,440.05</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('heatmap')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open 22 Countries Map</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>

        {/* Module 3: IPOs Hub Preview */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">IPOs Hub & Live GMP</h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-bold">Mainboard</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {IPOS_LIST.slice(0, 2).map((ipo) => (
                <div key={ipo.id} className="p-2.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1">
                  <div className="flex justify-between items-center font-bold text-[var(--text-primary)]">
                    <span>{ipo.companyName}</span>
                    <span className="text-[#00D09C]">{ipo.gmp} ({ipo.gmpPercentage})</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--text-secondary)]">
                    <span>Band: {ipo.priceBand}</span>
                    <span className="text-amber-400 font-bold">Sub: {ipo.subscriptionTimes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('ipos')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open IPOs Hub</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>

        {/* Module 4: Commodities Exchange Preview */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">Commodities Exchange</h3>
              </div>
              <span className="text-[10px] font-mono text-orange-400 font-bold">MCX / LME</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {COMMODITIES_EXCHANGE_LIST.slice(0, 3).map((c) => (
                <div key={c.symbol} className="p-2.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">{c.name}</span>
                    <div className="text-[10px] text-[var(--text-secondary)]">{c.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--text-primary)]">{(c as any).price || c.spotPrice}</div>
                    <div className={c.isPositive ? 'text-[#00D09C]' : 'text-red-500'}>{c.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('commodities')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open Commodities</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>

        {/* Module 5: AI Causal DAG OS Preview */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">AI Causal Scenario OS</h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400 font-bold">DAG Visualizer</span>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2 text-xs font-mono">
              <div className="font-bold text-[var(--text-primary)]">Middle East Conflict & Crude Oil Spike</div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Naval tension drives Brent Crude +12%; increases jet fuel & freight costs.
              </p>
              <div className="flex justify-between text-[10px] text-amber-400 font-bold pt-1 border-t border-[var(--border-color)]">
                <span>Confidence: 89%</span>
                <span>Impact: 84/100</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('causal')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open Causal DAG</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>

        {/* Module 6: Sentiment, Protests & Governance Radar */}
        <div className="groww-card p-5 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-4 h-4 text-[#00D09C]" />
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">Governance & Sentiment Radar</h3>
              </div>
              <span className="text-[10px] font-mono text-[#00D09C] font-bold">Protests & Audits</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {RECENT_NEWS.slice(0, 2).map((news) => (
                <div key={news.id} className="p-2.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1">
                  <div className="flex justify-between items-center font-bold text-[var(--text-primary)]">
                    <span className="text-[#00D09C]">{news.category}</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">{news.time}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans font-medium line-clamp-2">{news.title}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('news')}
            className="w-full text-xs py-2 px-3 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono font-bold hover:border-[#00D09C] transition-all flex items-center justify-center space-x-1"
          >
            <span>Open Sector News</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00D09C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
