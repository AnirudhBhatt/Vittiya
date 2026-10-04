import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown } from 'lucide-react';

export interface SearchableAsset {
  id: string;
  symbol: string;
  name: string;
  category: 'STOCKS' | 'FNO' | 'COMMODITIES' | 'IPOS' | 'INDICES_FOREX';
  price: string;
  change: string;
  isPositive: boolean;
  exchange: string;
  subtitle?: string;
}

export const MULTI_ASSET_DATABASE: SearchableAsset[] = [
  // 1. Stocks
  { id: 's-tata-steel', symbol: 'TATASTEEL', name: 'Tata Steel Limited', category: 'STOCKS', price: '₹186.99', change: '-1.71%', isPositive: false, exchange: 'NSE' },
  { id: 's-tata-motors', symbol: 'TATAMOTORS', name: 'Tata Motors Limited', category: 'STOCKS', price: '₹1,095.40', change: '+4.85%', isPositive: true, exchange: 'NSE' },
  { id: 's-reliance', symbol: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'STOCKS', price: '₹1,321.50', change: '-0.44%', isPositive: false, exchange: 'NSE' },
  { id: 's-maruti', symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', category: 'STOCKS', price: '₹14,131.00', change: '+2.10%', isPositive: true, exchange: 'NSE' },
  { id: 's-hdfc', symbol: 'HDFCBANK', name: 'HDFC Bank Limited', category: 'STOCKS', price: '₹728.45', change: '+1.25%', isPositive: true, exchange: 'NSE' },
  { id: 's-infosys', symbol: 'INFY', name: 'Infosys Limited', category: 'STOCKS', price: '₹1,191.00', change: '+0.68%', isPositive: true, exchange: 'NSE' },
  { id: 's-swiggy', symbol: 'SWIGGY', name: 'Swiggy Limited', category: 'STOCKS', price: '₹277.30', change: '+2.40%', isPositive: true, exchange: 'NSE' },
  { id: 's-tcs', symbol: 'TCS', name: 'Tata Consultancy Services', category: 'STOCKS', price: '₹2,439.00', change: '+0.45%', isPositive: true, exchange: 'NSE' },
  { id: 's-indigo', symbol: 'INDIGO', name: 'InterGlobe Aviation (IndiGo)', category: 'STOCKS', price: '₹5,249.00', change: '-1.58%', isPositive: false, exchange: 'NSE' },
  { id: 's-apple', symbol: 'AAPL', name: 'Apple Inc.', category: 'STOCKS', price: '$224.50', change: '+1.15%', isPositive: true, exchange: 'NASDAQ' },
  { id: 's-nvidia', symbol: 'NVDA', name: 'NVIDIA Corporation', category: 'STOCKS', price: '$128.20', change: '+3.45%', isPositive: true, exchange: 'NASDAQ' },
  { id: 's-tesla', symbol: 'TSLA', name: 'Tesla Inc.', category: 'STOCKS', price: '$218.40', change: '-2.10%', isPositive: false, exchange: 'NASDAQ' },

  // 2. F&O (Futures & Options)
  { id: 'fno-nifty-ce', symbol: 'NIFTY 24500 CE', name: 'Nifty 50 14 Aug 24500 Call Option', category: 'FNO', price: '₹142.50', change: '+18.40%', isPositive: true, exchange: 'NFO', subtitle: 'OI: 48.2L • Lot: 25' },
  { id: 'fno-nifty-pe', symbol: 'NIFTY 24400 PE', name: 'Nifty 50 14 Aug 24400 Put Option', category: 'FNO', price: '₹88.20', change: '-12.60%', isPositive: false, exchange: 'NFO', subtitle: 'OI: 35.6L • Lot: 25' },
  { id: 'fno-[#00D09C]-ce', symbol: 'BANKNIFTY 57500 CE', name: 'Bank Nifty 14 Aug 57500 Call Option', category: 'FNO', price: '₹280.00', change: '+24.10%', isPositive: true, exchange: 'NFO', subtitle: 'OI: 28.4L • Lot: 15' },
  { id: 'fno-tatasteel-ce', symbol: 'TATASTEEL 190 CE', name: 'Tata Steel Aug 190 Call Option', category: 'FNO', price: '₹4.85', change: '-8.50%', isPositive: false, exchange: 'NFO', subtitle: 'OI: 18.2L • Lot: 5500' },
  { id: 'fno-reliance-pe', symbol: 'RELIANCE 1350 PE', name: 'Reliance Aug 1350 Put Option', category: 'FNO', price: '₹28.40', change: '+6.20%', isPositive: true, exchange: 'NFO', subtitle: 'OI: 12.1L • Lot: 250' },

  // 3. Commodities
  { id: 'c-brent', symbol: 'BRENT CRUDE', name: 'Brent Crude Oil Spot', category: 'COMMODITIES', price: '$89.00/bbl', change: '+1.26%', isPositive: true, exchange: 'MCX / ICE' },
  { id: 'c-gold', symbol: 'GOLD SPOT', name: 'Gold Spot USD', category: 'COMMODITIES', price: '$4,426.80/oz', change: '-1.10%', isPositive: false, exchange: 'MCX / COMEX' },
  { id: 'c-copper', symbol: 'COPPER', name: 'LME Copper Grade A', category: 'COMMODITIES', price: '$9,820.00/MT', change: '+1.40%', isPositive: true, exchange: 'MCX / LME' },
  { id: 'c-lithium', symbol: 'LITHIUM', name: 'Lithium Carbonate (99.5%)', category: 'COMMODITIES', price: '$14,200.00/MT', change: '+3.80%', isPositive: true, exchange: 'COMMODITY EX' },
  { id: 'c-natgas', symbol: 'NATURAL GAS', name: 'Natural Gas Futures', category: 'COMMODITIES', price: '$2.48/MMBtu', change: '-3.20%', isPositive: false, exchange: 'NYMEX' },

  // 4. IPOs
  { id: 'ipo-shiprocket', symbol: 'SHIPROCKET', name: 'Shiprocket Limited IPO', category: 'IPOS', price: '₹410 - ₹435', change: 'GMP +15.6%', isPositive: true, exchange: 'MAINBOARD', subtitle: 'Bidding Active' },
  { id: 'ipo-milkymist', symbol: 'MILKYMIST', name: 'Milky Mist Dairy Foods IPO', category: 'IPOS', price: '₹285 - ₹300', change: 'GMP +38.3%', isPositive: true, exchange: 'MAINBOARD', subtitle: '34.2x Subscribed' },
  { id: 'ipo-molbio', symbol: 'MOLBIO', name: 'Molbio Diagnostics IPO', category: 'IPOS', price: '₹620 - ₹650', change: 'GMP +27.7%', isPositive: true, exchange: 'MAINBOARD', subtitle: 'Upcoming Aug 14' },

  // 5. Indices & Forex
  { id: 'i-nifty', symbol: 'NIFTY 50', name: 'NSE Nifty 50 Benchmark Index', category: 'INDICES_FOREX', price: '24,440.05', change: '-0.58%', isPositive: false, exchange: 'NSE' },
  { id: 'i-sensex', symbol: 'SENSEX', name: 'BSE Sensex Benchmark Index', category: 'INDICES_FOREX', price: '78,070.78', change: '-0.60%', isPositive: false, exchange: 'BSE' },
  { id: 'i-usdinr', symbol: 'USD/INR', name: 'US Dollar to Indian Rupee Spot', category: 'INDICES_FOREX', price: '₹95.43', change: '+0.15%', isPositive: true, exchange: 'FOREX' }
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: SearchableAsset) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectAsset }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | SearchableAsset['category']>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredAssets = MULTI_ASSET_DATABASE.filter((asset) => {
    const matchesCategory = activeCategory === 'ALL' || asset.category === activeCategory;
    const q = query.toLowerCase().trim();
    const matchesQuery = !q || asset.symbol.toLowerCase().includes(q) || asset.name.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const getCategoryBadge = (cat: SearchableAsset['category']) => {
    switch (cat) {
      case 'STOCKS':
        return <span className="px-2 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] font-mono font-bold text-[10px]">STOCKS</span>;
      case 'FNO':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-mono font-bold text-[10px]">F&O</span>;
      case 'COMMODITIES':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-mono font-bold text-[10px]">COMMODITY</span>;
      case 'IPOS':
        return <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-mono font-bold text-[10px]">IPO</span>;
      case 'INDICES_FOREX':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-mono font-bold text-[10px]">INDEX / FX</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Bar */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-center space-x-3 bg-[var(--card-inner)]">
          <Search className="w-5 h-5 text-[#00D09C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Stocks, F&O Options, Commodities, IPOs, Indices (e.g. NIFTY 24500 CE, Gold, Tata Steel)"
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-slate-400 focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white text-xs font-mono">
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="p-3 border-b border-[var(--border-color)] flex items-center space-x-2 overflow-x-auto scrollbar-none bg-[var(--bg-primary)]">
          {(['ALL', 'STOCKS', 'FNO', 'COMMODITIES', 'IPOS', 'INDICES_FOREX'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-[#00D09C] text-[#0A0E1A]' : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat === 'ALL' ? 'All Assets' : cat === 'FNO' ? 'F&O Contracts' : cat === 'INDICES_FOREX' ? 'Indices & FX' : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-mono text-slate-400">No assets found matching "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for "Nifty", "Tata Steel", "Gold", or "Call Option"</p>
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => {
                  onSelectAsset(asset);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] hover:border-[#00D09C]/50 hover:bg-[#00D09C]/5 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] font-mono font-bold text-xs text-[var(--text-primary)] flex items-center justify-center group-hover:border-[#00D09C]/40">
                    {asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{asset.symbol}</span>
                      {getCategoryBadge(asset.category)}
                      <span className="text-[10px] font-mono text-[var(--text-secondary)]">{asset.exchange}</span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{asset.name} {asset.subtitle ? `• ${asset.subtitle}` : ''}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-bold text-sm text-[var(--text-primary)]">{asset.price}</div>
                  <div className={`text-xs font-bold flex items-center justify-end ${asset.isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
                    {asset.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {asset.change}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-[var(--card-inner)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
          <span>Search 2,400+ Stocks, Options & Commodities</span>
          <div className="flex items-center space-x-1 text-[#00D09C] font-bold">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[10px]">↵ Enter</kbd>
            <span>to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
