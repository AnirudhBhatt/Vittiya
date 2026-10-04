import React, { useState } from 'react';
import { LIVE_TICKERS, PRODUCTS_TOOLS, MOST_BOUGHT_STOCKS, TOP_GAINERS, TOP_LOSERS, TOP_SECTORS } from '../../../data/mockData';
import { TradingViewChart } from '../../common/TradingViewChart';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Sparkles,
  Zap,
  Calendar,
  Rocket,
  Share2,
  Search,
  ShieldAlert,
  Building2,
  Car,
  Flame,
  Cpu,
  Coins
} from 'lucide-react';

interface GrowwDashboardProps {
  onSelectStock: (symbol: string) => void;
  onNavigateTab: (tabKey: string) => void;
}

export const GrowwDashboard: React.FC<GrowwDashboardProps> = ({ onSelectStock, onNavigateTab }) => {
  const [activeChartSymbol, setActiveChartSymbol] = useState('CAPITALCOM:INDIA50');
  const [activeStockTab, setActiveStockTab] = useState<'GAINERS' | 'LOSERS'>('GAINERS');

  const renderToolIcon = (iconType: string) => {
    switch (iconType) {
      case 'fno':
        return <Zap className="w-5 h-5 text-[#00D09C]" />;
      case 'events':
        return <Calendar className="w-5 h-5 text-indigo-400" />;
      case 'ipo':
        return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'causal':
        return <Share2 className="w-5 h-5 text-cyan-400" />;
      case 'screener':
        return <Search className="w-5 h-5 text-purple-400" />;
      case 'stress':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      default:
        return <Zap className="w-5 h-5 text-[#00D09C]" />;
    }
  };

  const renderSectorIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Building2 className="w-4 h-4 text-blue-400" />;
      case 1:
        return <Car className="w-4 h-4 text-[#00D09C]" />;
      case 2:
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 3:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 4:
        return <Coins className="w-4 h-4 text-purple-400" />;
      default:
        return <Building2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 0. Groww Platform Exact Sub-Header Index Bar (Single Source of Truth) */}
      <div className="groww-card py-2.5 px-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border border-[var(--border-color)] rounded-2xl bg-[var(--card-bg)] shadow-md">
        <div className="flex flex-wrap items-center space-x-6">
          {LIVE_TICKERS.slice(0, 4).map((ticker, idx) => (
            <div key={ticker.symbol} className={`flex items-center space-x-2 ${idx > 0 ? 'border-l border-[var(--border-color)] pl-6' : ''}`}>
              <span className="font-bold text-[var(--text-secondary)]">{ticker.symbol.replace(/\s+/g, '')}</span>
              <span className="font-extrabold text-[var(--text-primary)]">{ticker.price}</span>
              <span className={`text-[11px] font-bold ${ticker.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>{ticker.change}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigateTab('heatmap')}
          title="Toggle Global 22 Countries Map & International Indices"
          className="p-1.5 rounded-lg bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#00D09C] hover:border-[#00D09C] transition-all"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* 1. Groww Live Indices Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-secondary)]">Market Indices</h2>
          <span className="text-[11px] text-[#00D09C] font-mono font-bold flex items-center space-x-1 cursor-pointer hover:underline">
            <span>All Indices</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto scrollbar-none">
          {LIVE_TICKERS.slice(0, 5).map((idxItem) => (
            <div
              key={idxItem.symbol}
              onClick={() => {
                if (idxItem.symbol.includes('NIFTY')) setActiveChartSymbol('CAPITALCOM:INDIA50');
                if (idxItem.symbol.includes('SENSEX')) setActiveChartSymbol('CAPITALCOM:INDIA50');
                if (idxItem.symbol.includes('BANK')) setActiveChartSymbol('CAPITALCOM:INDIA50');
              }}
              className="groww-card p-4 groww-card-hover cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] font-mono">
                <span className="truncate">{idxItem.name}</span>
              </div>
              <div className="text-lg font-black text-[var(--text-primary)] font-mono">{idxItem.price}</div>
              <div className={`flex items-center font-mono font-bold text-xs ${idxItem.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
                {idxItem.isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                <span>{idxItem.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Groww Products & Tools Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-secondary)]">Products & Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {PRODUCTS_TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigateTab(tool.tabKey)}
              className="groww-card p-4 groww-card-hover cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center">
                  {renderToolIcon(tool.iconType)}
                </div>
                {tool.badge && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00D09C]">
                    {tool.badge}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">{tool.name}</h4>
                <p className="text-[10px] text-[var(--text-secondary)] truncate mt-0.5">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Most Bought on VITTIYA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#00D09C]" />
            <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">Most Bought on VITTIYA</h2>
          </div>
          <span className="text-[11px] text-[var(--text-secondary)] font-mono">Real-time Volume</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOST_BOUGHT_STOCKS.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => {
                setActiveChartSymbol(stock.symbol === 'TATAMOTORS' ? 'TATAMOTORS' : stock.symbol === 'RELIANCE' ? 'RELIANCE' : 'TATASTEEL');
                onSelectStock(stock.symbol);
              }}
              className="groww-card p-4 groww-card-hover cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center font-bold text-xs text-[#00D09C]">
                  {stock.symbol.slice(0, 2)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-inner)] text-[var(--text-secondary)] font-bold border border-[var(--border-color)]">
                  {stock.symbol}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{stock.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono font-bold text-sm text-[var(--text-primary)]">{stock.price}</span>
                  <span className="font-mono text-xs text-[#00D09C] font-bold flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {stock.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TradingView Live Technical Chart */}
      <TradingViewChart symbol={activeChartSymbol} height={480} />

      {/* 5. Top Gainers / Top Losers Switcher */}
      <div className="groww-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStockTab('GAINERS')}
              className={`groww-pill-tab text-xs font-bold ${
                activeStockTab === 'GAINERS' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              Top Gainers
            </button>

            <button
              onClick={() => setActiveStockTab('LOSERS')}
              className={`groww-pill-tab text-xs font-bold ${
                activeStockTab === 'LOSERS' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              Top Losers
            </button>
          </div>

          <span className="text-xs font-mono text-[var(--text-secondary)]">NIFTY 50 • Updated Live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeStockTab === 'GAINERS' ? TOP_GAINERS : TOP_LOSERS).map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => {
                setActiveChartSymbol(stock.symbol === 'TATAMOTORS' ? 'TATAMOTORS' : stock.symbol === 'RELIANCE' ? 'RELIANCE' : 'TATASTEEL');
                onSelectStock(stock.symbol);
              }}
              className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-[var(--text-primary)]">{stock.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] font-bold border border-[var(--border-color)]">{stock.symbol}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-mono mt-1">{stock.sector} • Vol: {stock.volume}</div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-sm text-[var(--text-primary)]">{stock.price}</div>
                <div className={`font-mono text-xs font-bold flex items-center justify-end ${stock.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
                  {stock.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                  {stock.change} ({stock.changeValue})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Top Sectors Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-secondary)]">Top Market Sectors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOP_SECTORS.map((sec, idx) => (
            <div key={sec.id} className="groww-card p-4 groww-card-hover space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center font-bold text-xs text-white">
                  {renderSectorIcon(idx)}
                </div>
                <span className="text-xs font-mono font-bold text-[#00D09C]">{sec.change}</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">{sec.name}</h4>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{sec.stockCount} Stocks • Top: {sec.topStock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
