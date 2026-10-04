import { useState, useEffect } from 'react';
import { HeaderTicker } from './components/common/HeaderTicker';
import { ExecutiveMasterDashboard } from './components/modules/master/ExecutiveMasterDashboard';
import { GrowwDashboard } from './components/modules/stocks/GrowwDashboard';
import { StockDetailView } from './components/modules/stocks/StockDetailView';
import { CausalGraphFlow } from './components/modules/risk/CausalGraphFlow';
import { CausalBrainHub } from './components/modules/brain/CausalBrainHub';
import { IPOsHub } from './components/modules/ipo/IPOsHub';
import { NewsHub } from './components/modules/news/NewsHub';
import { CommoditiesExchange } from './components/modules/commodities/CommoditiesExchange';
import { CurrencyConverterHub } from './components/modules/forex/CurrencyConverterHub';
import { FinancialCalculatorsHub } from './components/modules/calculators/FinancialCalculatorsHub';
import { GlobalHeatmap } from './components/modules/risk/GlobalHeatmap';
import { SupplyChainExplorer } from './components/modules/risk/SupplyChainExplorer';
import { PortfolioStressTester } from './components/modules/risk/PortfolioStressTester';
import { AIChatAssistant } from './components/modules/ai-assistant/AIChatAssistant';
import { RECENT_NEWS, type NewsItem } from './data/mockData';
import {
  LayoutDashboard,
  Network,
  Globe,
  ShieldAlert,
  Bot,
  Layers,
  Newspaper,
  BellRing,
  Flame,
  Rocket,
  Sparkles,
  DollarSign,
  Calculator,
  Brain,
  TrendingUp,
  TrendingDown,
  Radio
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'masterDashboard' | 'dashboard' | 'stockDetail' | 'brain' | 'causal' | 'ipos' | 'news' | 'commodities' | 'currency' | 'calcHub' | 'heatmap' | 'supply' | 'portfolio' | 'chat'>('masterDashboard');
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>('TATASTEEL');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scen-oil-crisis');
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>(RECENT_NEWS);
  const [newsSourceFilter, setNewsSourceFilter] = useState<string>('ALL');
  const [latestToast, setLatestToast] = useState<string | null>(null);
  const [isAutoStreamActive, setIsAutoStreamActive] = useState<boolean>(true);
  
  // Dark / White (Light) Theme State Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('vittiya_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      if (tabParam === 'causal') setActiveTab('causal');
      else if (tabParam === 'ipos') setActiveTab('ipos');
      else if (tabParam === 'news') setActiveTab('news');
      else if (tabParam === 'dashboard' || tabParam === 'stocks') setActiveTab('dashboard');
      else if (tabParam === 'calcHub' || tabParam === 'calculators') setActiveTab('calcHub');
      else if (tabParam === 'supply') setActiveTab('supply');
      else if (tabParam === 'commodities') setActiveTab('commodities');
      else if (tabParam === 'brain') setActiveTab('brain');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vittiya_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Live News Ingestion Engine
  useEffect(() => {
    if (!isAutoStreamActive) return;

    const newsTemplates: Omit<NewsItem, 'id' | 'time'>[] = [
      {
        title: 'Moneycontrol Pro Flash: HDFC Bank Credit Growth Accelerates 14.8% YoY in Q1',
        source: 'Moneycontrol Pro',
        category: 'Banking',
        impactSeverity: 'HIGH',
        sentimentScore: 82,
        sentimentLabel: 'BULLISH MOMENTUM',
        firstOrder: 'Net Interest Margin (NIM) expands by 12 bps to 3.84%',
        secondOrder: 'Private banking sector valuation multiple re-rates upward',
        thirdOrder: 'FII net inflows cross ₹2,400 Cr in single session',
        affectedSectors: ['Banking', 'Credit Markets', 'NBFCs']
      },
      {
        title: 'Bloomberg Wire: Red Sea Naval Escalation Spikes Tanker Freight Rates by +35%',
        source: 'Bloomberg Terminal',
        category: 'Geopolitics',
        impactSeverity: 'HIGH',
        sentimentScore: -78,
        sentimentLabel: 'EXTREME FEAR',
        firstOrder: 'Spot Brent Crude oil climbs to $89.00/bbl',
        secondOrder: 'Aviation jet fuel procurement budgets swell +4.8%',
        thirdOrder: 'Airlines operating profit margins contract by 2.2%',
        affectedSectors: ['Refineries', 'Airlines', 'Global Freight']
      }
    ];

    let count = 0;
    const interval = setInterval(() => {
      const template = newsTemplates[count % newsTemplates.length];
      count++;

      const newItem: NewsItem = {
        ...template,
        id: `wire-news-${Date.now()}`,
        time: 'Just Now'
      };

      setNewsFeed((prev) => [newItem, ...prev.slice(0, 6)]);
      setLatestToast(`LIVE WIRE: [${template.source}] "${template.title.slice(0, 36)}..."`);

      setTimeout(() => setLatestToast(null), 4000);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoStreamActive]);

  const handleSearchQuery = (_query: string) => {
    setSelectedStockSymbol(_query.toUpperCase());
    setActiveTab('stockDetail');
  };

  const handleSelectSearchAsset = (asset: any) => {
    if (asset.category === 'COMMODITIES') {
      setActiveTab('commodities');
    } else if (asset.category === 'IPOS') {
      setActiveTab('ipos');
    } else {
      setSelectedStockSymbol(asset.symbol);
      setActiveTab('stockDetail');
    }
  };

  const handleSelectStock = (symbol: string) => {
    setSelectedStockSymbol(symbol);
    setActiveTab('stockDetail');
  };

  const handleNavigateTab = (tabKey: string) => {
    setActiveTab(tabKey as any);
  };

  const filteredNewsFeed = newsFeed.filter((n) => {
    if (newsSourceFilter === 'ALL') return true;
    if (newsSourceFilter === 'BLOOMBERG') return n.source === 'Bloomberg Terminal';
    if (newsSourceFilter === 'MONEYCONTROL') return n.source === 'Moneycontrol Pro';
    return true;
  });

  const getSourceBadge = (source: NewsItem['source']) => {
    switch (source) {
      case 'Bloomberg Terminal':
        return <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-mono font-extrabold text-[9px] border border-red-500/40">BLOOMBERG</span>;
      case 'Moneycontrol Pro':
        return <span className="px-2 py-0.5 rounded bg-[#00D09C]/20 text-[#00D09C] font-mono font-extrabold text-[9px] border border-[#00D09C]/40">MONEYCONTROL PRO</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-400 font-mono font-extrabold text-[9px] border border-indigo-500/40">{source}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#00D09C] selection:text-[#0A0E1A] relative transition-colors duration-200">
      {/* Groww Style Floating AI Toast Alert */}
      {latestToast && (
        <div className="fixed top-20 right-6 z-50 bg-[var(--card-bg)] border border-[#00D09C]/40 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs animate-in slide-in-from-top-5 duration-300">
          <div className="w-9 h-9 rounded-xl bg-[#00D09C]/20 border border-[#00D09C]/40 text-[#00D09C] flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="font-bold text-[var(--text-primary)] flex items-center space-x-1.5 font-mono">
              <span>Bloomberg & Moneycontrol Wire</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#00D09C]/20 text-[#00D09C] font-bold">LIVE</span>
            </div>
            <p className="text-[var(--text-secondary)] text-[11px] mt-0.5">{latestToast}</p>
          </div>
        </div>
      )}

      {/* Top Header Navbar with Logo Navigation */}
      <HeaderTicker
        onSearch={handleSearchQuery}
        onSelectAsset={handleSelectSearchAsset}
        onLogoClick={() => setActiveTab('masterDashboard')}
        onNavigateTab={handleNavigateTab}
        activeScenarioId={activeScenarioId}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Groww Segmented Navigation Pill Bar with Full Widescreen Width & Visible Scroll Buttons */}
      <div className="bg-[var(--bg-subnav)] border-b border-[var(--border-color)] px-6 py-3 sticky top-[108px] z-30 backdrop-blur-xl transition-colors duration-200">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-2">
          {/* Scrollable Pill Container */}
          <div
            id="subnav-pill-container"
            className="flex items-center space-x-2 overflow-x-auto scrollbar-none scroll-smooth py-1 w-full"
          >
            <button
              onClick={() => setActiveTab('masterDashboard')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'masterDashboard' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#00D09C]" />
              <span>Master Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('brain')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'brain' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>AI Causal Brain</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'dashboard' || activeTab === 'stockDetail' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Explore Stocks</span>
            </button>

            <button
              onClick={() => setActiveTab('calcHub')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'calcHub' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#00D09C]" />
              <span>Calculators Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('causal')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'causal' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Causal DAG Visualizer</span>
            </button>

            <button
              onClick={() => setActiveTab('ipos')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'ipos' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>IPOs Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'news' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Sector News</span>
            </button>

            <button
              onClick={() => setActiveTab('commodities')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'commodities' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Commodities Exchange</span>
            </button>

            <button
              onClick={() => setActiveTab('currency')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'currency' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <DollarSign className="w-4 h-4 text-[#00D09C]" />
              <span>FX & Currency</span>
            </button>

            <button
              onClick={() => setActiveTab('heatmap')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'heatmap' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Global Risk Heatmap</span>
            </button>

            <button
              onClick={() => setActiveTab('supply')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'supply' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Supply Chain</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'portfolio' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Portfolio Stress</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`groww-pill-tab shrink-0 flex items-center space-x-2 ${
                activeTab === 'chat' ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1800px] w-full mx-auto p-6 gap-6">
        {/* Center Main View */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {activeTab === 'masterDashboard' && (
            <ExecutiveMasterDashboard onNavigateTab={handleNavigateTab} onSelectStock={handleSelectStock} />
          )}

          {activeTab === 'brain' && <CausalBrainHub />}

          {activeTab === 'dashboard' && <GrowwDashboard onSelectStock={handleSelectStock} onNavigateTab={handleNavigateTab} />}

          {activeTab === 'calcHub' && <FinancialCalculatorsHub />}

          {activeTab === 'stockDetail' && (
            <StockDetailView symbol={selectedStockSymbol} onBack={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'causal' && (
            <CausalGraphFlow activeScenarioId={activeScenarioId} onScenarioChange={setActiveScenarioId} />
          )}

          {activeTab === 'ipos' && <IPOsHub />}

          {activeTab === 'news' && <NewsHub />}

          {activeTab === 'commodities' && <CommoditiesExchange />}

          {activeTab === 'currency' && <CurrencyConverterHub />}

          {activeTab === 'heatmap' && <GlobalHeatmap />}

          {activeTab === 'supply' && <SupplyChainExplorer />}

          {activeTab === 'portfolio' && <PortfolioStressTester />}

          {activeTab === 'chat' && <AIChatAssistant />}
        </main>

        {/* Right Sidebar: Bloomberg & Moneycontrol Live Wire Terminal Stream */}
        <aside className="w-full lg:w-96 groww-card p-5 flex flex-col shrink-0 h-fit rounded-3xl border border-[var(--border-color)] shadow-2xl">
          {/* Header Bar & Stream Toggle */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5 mb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <h3 className="text-xs font-black text-[var(--text-primary)] font-mono uppercase tracking-wider">
                Bloomberg & Moneycontrol Live
              </h3>
            </div>
            
            <button
              onClick={() => setIsAutoStreamActive(!isAutoStreamActive)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center space-x-1 border ${
                isAutoStreamActive ? 'bg-[#00D09C]/15 text-[#00D09C] border-[#00D09C]/40' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAutoStreamActive ? 'bg-[#00D09C] pulse-glow' : 'bg-slate-500'}`}></span>
              <span>{isAutoStreamActive ? 'STREAMING' : 'PAUSED'}</span>
            </button>
          </div>

          {/* Source Selector Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none mb-3 bg-[var(--card-inner)] p-1 rounded-xl border border-[var(--border-color)]">
            {(['ALL', 'BLOOMBERG', 'MONEYCONTROL'] as const).map((src) => (
              <button
                key={src}
                onClick={() => setNewsSourceFilter(src)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold whitespace-nowrap transition-all ${
                  newsSourceFilter === src ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          {/* Live News Stream List */}
          <div className="space-y-3.5 overflow-y-auto max-h-[720px] pr-1">
            {filteredNewsFeed.map((news) => (
              <div
                key={news.id}
                className="p-3.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all text-xs space-y-2 group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  {getSourceBadge(news.source)}
                  <span className="text-[var(--text-secondary)]">{news.time}</span>
                </div>

                <h4 className="font-bold text-[var(--text-primary)] leading-snug font-sans group-hover:text-[#00D09C] transition-colors">
                  {news.title}
                </h4>

                {/* Sentiment Pill */}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center ${
                    news.sentimentScore > 0 ? 'bg-[#00D09C]/15 text-[#00D09C]' : 'bg-red-500/15 text-red-400'
                  }`}>
                    {news.sentimentScore > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {news.sentimentLabel} ({news.sentimentScore > 0 ? `+${news.sentimentScore}` : news.sentimentScore})
                  </span>
                </div>

                {/* 1st, 2nd, 3rd Order Ripple Sequence */}
                <div className="space-y-1.5 font-mono text-[11px] bg-[var(--card-bg)] p-2.5 rounded-xl border border-[var(--border-color)]">
                  <div className="text-amber-400 flex items-start space-x-1.5">
                    <span className="font-bold text-[10px] uppercase shrink-0">1st Order:</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">{news.firstOrder}</span>
                  </div>
                  <div className="text-purple-400 flex items-start space-x-1.5">
                    <span className="font-bold text-[10px] uppercase shrink-0">2nd Order:</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">{news.secondOrder}</span>
                  </div>
                  <div className="text-[#00D09C] flex items-start space-x-1.5">
                    <span className="font-bold text-[10px] uppercase shrink-0">3rd Order:</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">{news.thirdOrder}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {news.affectedSectors.map((sec, i) => (
                    <span key={i} className="text-[9px] font-mono bg-[var(--card-bg)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
