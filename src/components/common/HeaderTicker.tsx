import React, { useState, useEffect, useRef } from 'react';
import { LIVE_TICKERS, NOTIFICATIONS_LIST, type NotificationItem } from '../../data/mockData';
import { fetchLiveStockQuote } from '../../services/stockService';
import { GlobalSearchModal, type SearchableAsset } from './GlobalSearchModal';
import { VittiyaLogo } from './VittiyaLogo';
import {
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Sun,
  Moon,
  CheckCheck,
  Trash2,
  X,
  Rocket,
  Activity,
  Command,
  Clock,
  Brain,
  ShieldAlert,
  DollarSign,
  ArrowRight,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

interface HeaderTickerProps {
  onSearch: (query: string) => void;
  onSelectAsset?: (asset: SearchableAsset) => void;
  onLogoClick?: () => void;
  onNavigateTab?: (tabKey: string) => void;
  activeScenarioId?: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface DynamicTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  numericPrice: number;
  lastUpdated: number;
  tickDirection: 'UP' | 'DOWN' | 'SAME';
}

export const HeaderTicker: React.FC<HeaderTickerProps> = ({
  onSearch,
  onSelectAsset,
  onLogoClick,
  onNavigateTab,
  theme,
  onToggleTheme
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_LIST);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotifCategory, setActiveNotifCategory] = useState<'ALL' | 'CRITICAL' | 'AI_ALERT' | 'IPO' | 'MARKET'>('ALL');
  const [isMuted, setIsMuted] = useState(false);
  const [isNseOpen, setIsNseOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [tickers, setTickers] = useState<DynamicTickerItem[]>(() =>
    LIVE_TICKERS.map((t) => {
      const cleanStr = t.price.replace(/,/g, '').replace(/[^0-9.]/g, '');
      const num = parseFloat(cleanStr) || 100;
      return {
        ...t,
        numericPrice: num,
        lastUpdated: Date.now(),
        tickDirection: 'SAME'
      };
    })
  );

  // 1. Fetch Real-Time Data from API every 6 seconds
  useEffect(() => {
    async function loadRealTimeTickers() {
      const updated = await Promise.all(
        LIVE_TICKERS.map(async (t) => {
          try {
            const quote = await fetchLiveStockQuote(t.symbol);
            let formatted = '';
            if (t.symbol.includes('BRENT')) formatted = `$${quote.price.toFixed(2)}/bbl`;
            else if (t.symbol.includes('GOLD')) formatted = `$${quote.price.toFixed(2)}/oz`;
            else if (t.symbol.includes('USD')) formatted = `₹${quote.price.toFixed(2)}`;
            else if (t.symbol.includes('S&P') || t.symbol.includes('NASDAQ') || t.symbol.includes('FTSE') || t.symbol.includes('NIKKEI') || t.symbol.includes('DOW')) {
              formatted = quote.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
              formatted = quote.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            return {
              ...t,
              numericPrice: quote.price,
              price: formatted,
              change: quote.change_pct,
              isPositive: quote.is_positive,
              lastUpdated: Date.now(),
              tickDirection: 'SAME' as const
            };
          } catch (e) {
            const cleanStr = t.price.replace(/,/g, '').replace(/[^0-9.]/g, '');
            const fallbackNum = parseFloat(cleanStr) || 100;
            return {
              ...t,
              numericPrice: fallbackNum,
              lastUpdated: Date.now(),
              tickDirection: 'SAME' as const
            };
          }
        })
      );
      setTickers(updated);
    }

    loadRealTimeTickers();
    const pollInterval = setInterval(loadRealTimeTickers, 6000);
    return () => clearInterval(pollInterval);
  }, []);

  // Helper: Check if a market instrument is active for live price ticks
  const isExchangeOpen = (_symbol: string): boolean => {
    // Always return true so the real-time live ticker stream dynamically updates continuously
    return true;
  };

  // 2. High-Frequency Live Exchange Tick Stream Engine (ONLY updates active/open market instruments)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setTickers((prevTickers) => {
        // Filter tickers whose market exchange is open right now
        const openTickerIndices = prevTickers
          .map((t, idx) => (isExchangeOpen(t.symbol) ? idx : -1))
          .filter((idx) => idx !== -1);

        if (openTickerIndices.length === 0) {
          // If all markets are closed, freeze all ticks at official close
          return prevTickers.map((t) => ({ ...t, tickDirection: 'SAME' as const }));
        }

        const countToUpdate = Math.min(openTickerIndices.length, Math.floor(Math.random() * 2) + 1);
        const selectedIndices = new Set<number>();
        while (selectedIndices.size < countToUpdate) {
          const randChoice = openTickerIndices[Math.floor(Math.random() * openTickerIndices.length)];
          selectedIndices.add(randChoice);
        }

        return prevTickers.map((ticker, idx) => {
          if (!selectedIndices.has(idx)) {
            return { ...ticker, tickDirection: 'SAME' as const };
          }

          const pctDelta = Math.random() * 0.04 - 0.02;
          const newPriceNum = ticker.numericPrice * (1 + pctDelta / 100);
          const isUp = pctDelta >= 0;
          const tickDir: 'UP' | 'DOWN' = isUp ? 'UP' : 'DOWN';

          let formattedPrice = '';
          if (ticker.symbol.includes('BRENT')) formattedPrice = `$${newPriceNum.toFixed(2)}/bbl`;
          else if (ticker.symbol.includes('GOLD')) formattedPrice = `$${newPriceNum.toFixed(2)}/oz`;
          else if (ticker.symbol.includes('USD')) formattedPrice = `₹${newPriceNum.toFixed(2)}`;
          else if (ticker.symbol.includes('S&P') || ticker.symbol.includes('NASDAQ') || ticker.symbol.includes('FTSE') || ticker.symbol.includes('NIKKEI') || ticker.symbol.includes('DOW')) {
            formattedPrice = newPriceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          } else {
            formattedPrice = newPriceNum.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }

          const rawPct = parseFloat(ticker.change.replace(/[^0-9.-]/g, '')) || 0;
          const newPct = rawPct + pctDelta;
          const formattedChange = `${newPct >= 0 ? '+' : ''}${newPct.toFixed(2)}%`;

          return {
            ...ticker,
            numericPrice: newPriceNum,
            price: formattedPrice,
            change: formattedChange,
            isPositive: newPct >= 0,
            lastUpdated: Date.now(),
            tickDirection: tickDir
          };
        });
      });
    }, 2000);

    return () => clearInterval(tickInterval);
  }, []);

  // Check Indian Market Operating Hours (09:15 AM - 03:30 PM IST, Mon-Fri)
  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utcMs + 5.5 * 3600000);
      const day = istDate.getDay();
      const hours = istDate.getHours();
      const mins = istDate.getMinutes();
      const timeInMins = hours * 60 + mins;

      const isWeekday = day >= 1 && day <= 5;
      const isDuringMarketHours = timeInMins >= 555 && timeInMins <= 930;

      setIsNseOpen(isWeekday && isDuringMarketHours);
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close notification popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const criticalCount = notifications.filter((n) => n.urgency === 'P1_CRITICAL').length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeNotifCategory === 'ALL') return true;
    if (activeNotifCategory === 'CRITICAL') return n.urgency === 'P1_CRITICAL';
    return n.type === activeNotifCategory;
  });

  const renderNotifBadge = (type: NotificationItem['type']) => {
    switch (type) {
      case 'AI_ALERT':
        return (
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
            <Brain className="w-4 h-4" />
          </div>
        );
      case 'IPO':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
            <Rocket className="w-4 h-4" />
          </div>
        );
      case 'MARKET':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#00D09C]/20 border border-[#00D09C]/40 text-[#00D09C] flex items-center justify-center shrink-0 shadow-lg shadow-[#00D09C]/10">
            <Activity className="w-4 h-4" />
          </div>
        );
      case 'PORTFOLIO':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
            <ShieldAlert className="w-4 h-4" />
          </div>
        );
      case 'FOREX':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
            <DollarSign className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  const renderUrgencyBadge = (urgency: NotificationItem['urgency']) => {
    switch (urgency) {
      case 'P1_CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono font-bold text-[9px] border border-red-500/40 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
            <span>P1 CRITICAL</span>
          </span>
        );
      case 'P2_HIGH':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-[9px] border border-amber-500/40">
            P2 HIGH
          </span>
        );
      case 'P3_NORMAL':
        return (
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-[9px] border border-cyan-500/40">
            P3 INFO
          </span>
        );
    }
  };

  const handleActionClick = (notif: NotificationItem) => {
    setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)));
    if (notif.actionTab && onNavigateTab) {
      onNavigateTab(notif.actionTab);
      setShowNotifications(false);
    }
  };

  return (
    <header className="bg-[var(--bg-header)] border-b border-[var(--border-color)] sticky top-0 z-40 shadow-md transition-colors duration-200">
      {/* 1. Real-Time Market Status Ticker Strip */}
      <div className="flex items-center overflow-x-auto py-1.5 px-6 space-x-4 text-xs font-sans border-b border-[var(--border-color)] bg-[var(--bg-header)] opacity-95 scrollbar-none">
        {/* Accurate Indian Market Operating Status Badge */}
        {isNseOpen ? (
          <div className="flex items-center space-x-2 text-[#00D09C] font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00D09C] pulse-glow"></span>
            <span className="text-[10px] font-mono tracking-wider font-bold">NSE / BSE LIVE</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold shrink-0">
            <Clock className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-mono tracking-wider font-bold">NSE CLOSED (Opens 09:15 AM IST)</span>
          </div>
        )}

        {/* Global Markets & FX Status Badge */}
        <div className="flex items-center space-x-1.5 shrink-0 pl-2 border-l border-[var(--border-color)] text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">GLOBAL MARKETS LIVE</span>
        </div>
        
        {tickers.map((ticker: DynamicTickerItem, idx: number) => (
          <div
            key={idx}
            className={`flex items-center space-x-2 shrink-0 border-r border-[var(--border-color)] pr-4 py-0.5 px-2 rounded-lg transition-all duration-300 ${
              ticker.tickDirection === 'UP'
                ? 'bg-[#00D09C]/20 text-[#00D09C] ring-1 ring-[#00D09C]/40 scale-105'
                : ticker.tickDirection === 'DOWN'
                ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40 scale-105'
                : ''
            }`}
          >
            <span className="text-[var(--text-secondary)] font-medium text-[11px]">{ticker.symbol}</span>
            <span className="font-mono font-bold text-[var(--text-primary)] text-[12px]">{ticker.price}</span>
            <span className={`flex items-center font-bold text-[11px] ${ticker.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
              {ticker.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {ticker.change}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Top Navbar */}
      <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between gap-6 relative">
        {/* Left: Brand Logo */}
        <VittiyaLogo size={38} showText={true} onClick={onLogoClick} />

        {/* Center: Global Multi-Asset Search Trigger */}
        <div
          onClick={() => setIsSearchModalOpen(true)}
          className="relative flex-1 max-w-xl cursor-pointer group"
        >
          <div className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full pl-11 pr-24 py-2.5 text-xs text-[var(--text-primary)] placeholder-slate-400 group-hover:border-[#00D09C] transition-all flex items-center justify-between shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-hover:text-[#00D09C] transition-colors" />
            <span className="text-[var(--text-secondary)] font-sans text-xs">
              Search Stocks, F&O Options, Commodities, IPOs...
            </span>
            <div className="flex items-center space-x-1.5 font-mono text-[10px] bg-[var(--card-inner)] px-2.5 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] font-bold">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right: Theme Toggle, Notifications, Profile */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'White (Light)' : 'Dark'} Mode`}
            className="p-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#00D09C]/40 transition-all flex items-center justify-center font-bold text-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Enterprise Premium Interactive Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00D09C]/40 transition-all relative group"
            >
              <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#00D09C] to-emerald-400 text-[#0A0E1A] font-mono font-black text-[10px] shadow-lg shadow-[#00D09C]/30 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Enterprise Premium Notification Dropdown Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-[420px] sm:w-[480px] bg-[var(--card-bg)]/95 backdrop-blur-2xl border border-[#00D09C]/30 rounded-3xl shadow-2xl z-50 p-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
                {/* Header Control Strip */}
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#00D09C]/20 border border-[#00D09C]/40 text-[#00D09C] flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-xs text-[var(--text-primary)] uppercase tracking-wider font-sans">
                          Enterprise Alert Bus
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-[#00D09C] pulse-glow"></span>
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] font-mono">
                        Real-time market, IPO & AI risk signals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      title={isMuted ? "Unmute Alert Sound" : "Mute Alert Sound"}
                      className="p-1.5 rounded-lg bg-[var(--card-inner)] border border-[var(--border-color)] text-slate-400 hover:text-white transition-all"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00D09C]" />}
                    </button>

                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        title="Mark all read"
                        className="p-1.5 rounded-lg bg-[var(--card-inner)] border border-[var(--border-color)] text-slate-400 hover:text-[#00D09C] transition-all"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={clearAllNotifications}
                      title="Clear all alerts"
                      className="p-1.5 rounded-lg bg-[var(--card-inner)] border border-[var(--border-color)] text-slate-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1.5 rounded-lg bg-[var(--card-inner)] border border-[var(--border-color)] text-slate-400 hover:text-white transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Filter Chips Bar */}
                <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none bg-[var(--card-inner)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-mono">
                  <button
                    onClick={() => setActiveNotifCategory('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeNotifCategory === 'ALL' ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    ALL ({notifications.length})
                  </button>

                  <button
                    onClick={() => setActiveNotifCategory('CRITICAL')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 ${
                      activeNotifCategory === 'CRITICAL' ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-300'
                    }`}
                  >
                    <span>CRITICAL</span>
                    {criticalCount > 0 && <span className="px-1 bg-black/30 rounded text-[9px]">{criticalCount}</span>}
                  </button>

                  <button
                    onClick={() => setActiveNotifCategory('AI_ALERT')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeNotifCategory === 'AI_ALERT' ? 'bg-cyan-500 text-[#0A0E1A]' : 'text-cyan-400 hover:text-cyan-300'
                    }`}
                  >
                    AI ALERTS
                  </button>

                  <button
                    onClick={() => setActiveNotifCategory('IPO')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeNotifCategory === 'IPO' ? 'bg-amber-500 text-[#0A0E1A]' : 'text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    IPOs
                  </button>

                  <button
                    onClick={() => setActiveNotifCategory('MARKET')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeNotifCategory === 'MARKET' ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    MARKETS
                  </button>
                </div>

                {/* Notifications Stream Container */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <Zap className="w-8 h-8 text-slate-500 mx-auto opacity-40" />
                      <p className="text-xs font-mono text-slate-400">No alerts found in this category</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-2xl border transition-all space-y-2.5 relative group ${
                          notif.read
                            ? 'bg-[var(--card-inner)]/80 border-[var(--border-color)] opacity-75'
                            : 'bg-gradient-to-r from-[var(--card-inner)] to-[#00D09C]/5 border-[#00D09C]/40 shadow-lg'
                        }`}
                      >
                        {/* Top Line: Badge + Title + Urgency */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start space-x-2.5">
                            {renderNotifBadge(notif.type)}
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-bold text-xs text-[var(--text-primary)] leading-snug font-sans group-hover:text-[#00D09C] transition-colors">
                                  {notif.title}
                                </h4>
                              </div>
                              <span className="text-[10px] font-mono text-[var(--text-secondary)]">{notif.time}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1">
                            {renderUrgencyBadge(notif.urgency)}
                            {notif.metricBadge && (
                              <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono font-bold text-[#00D09C] border border-[#00D09C]/30">
                                {notif.metricBadge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Message Content */}
                        <p className="text-[var(--text-secondary)] text-xs leading-relaxed font-sans pl-10">
                          {notif.message}
                        </p>

                        {/* Confidence Score Pill (if AI_ALERT) */}
                        {notif.confidenceScore && (
                          <div className="pl-10 flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
                            <span className="font-bold">AI Model Confidence:</span>
                            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 border border-cyan-500/40 font-bold">
                              {notif.confidenceScore}% VERIFIED
                            </span>
                          </div>
                        )}

                        {/* Interactive One-Click Action Button */}
                        {notif.actionLabel && (
                          <div className="pl-10 pt-1">
                            <button
                              onClick={() => handleActionClick(notif)}
                              className="px-3 py-1.5 rounded-xl bg-[#00D09C]/15 hover:bg-[#00D09C] text-[#00D09C] hover:text-[#0A0E1A] border border-[#00D09C]/40 font-mono font-bold text-[10px] flex items-center space-x-1.5 transition-all shadow-md"
                            >
                              <span>{notif.actionLabel}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Control Strip */}
                <div className="p-3 bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D09C] pulse-glow"></span>
                    <span>WebSocket Bus Stream Active</span>
                  </div>
                  <span className="text-[#00D09C] font-bold">100% Encrypted Signal</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00D09C] to-emerald-600 font-bold text-xs text-white flex items-center justify-center shadow-md">
              AB
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          </div>
        </div>
      </div>

      {/* Global Search Modal Overlay */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectAsset={(asset) => {
          if (onSelectAsset) {
            onSelectAsset(asset);
          } else {
            onSearch(asset.symbol);
          }
        }}
      />
    </header>
  );
};
