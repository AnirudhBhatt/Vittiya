import React, { useState, useEffect } from 'react';
import { TradingViewChart } from '../../common/TradingViewChart';
import { fetchLiveStockQuote, type LiveStockQuote } from '../../../services/stockService';
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Calendar,
  Building2,
  Share2,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface StockDetailViewProps {
  symbol: string;
  onBack: () => void;
}

interface StockMetadata {
  symbol: string;
  name: string;
  sector: string;
  marketCap: string;
  peRatio: string;
  pbRatio: string;
  divYield: string;
  high52: string;
  low52: string;
  buyOrdersPct: number;
  sellOrdersPct: number;
  bids: { price: string; qty: number }[];
  asks: { price: string; qty: number }[];
  companyNews: { id: string; source: string; time: string; text: string }[];
  relatedNews: { id: string; source: string; time: string; text: string; impactTag: string }[];
  events: { date: string; month: string; title: string; subtitle: string; amount?: string }[];
}

const STOCK_DATABASE: Record<string, Omit<StockMetadata, 'symbol'>> = {
  SWIGGY: {
    name: 'Swiggy Limited (Instamart)',
    sector: 'Consumer Tech & Quick Commerce',
    marketCap: '₹98,400 Cr',
    peRatio: 'N/A (Growth)',
    pbRatio: '5.20',
    divYield: '0.00%',
    high52: '₹448.00',
    low52: '₹340.00',
    buyOrdersPct: 62.40,
    sellOrdersPct: 37.60,
    bids: [
      { price: '₹389.80', qty: 3400 },
      { price: '₹389.50', qty: 8200 },
      { price: '₹389.00', qty: 12500 }
    ],
    asks: [
      { price: '₹390.00', qty: 2800 },
      { price: '₹390.50', qty: 6400 },
      { price: '₹391.00', qty: 11000 }
    ],
    companyNews: [
      { id: 'sw-1', source: 'Moneycontrol Pro', time: '12 mins ago', text: 'Swiggy Instamart expands dark store density to 600+ cities; quick commerce order volume surges +34% YoY.' },
      { id: 'sw-2', source: 'CNBC-TV18', time: '2 hours ago', text: 'Goldman Sachs initiates coverage on Swiggy with BUY rating; target price set at ₹480.' }
    ],
    relatedNews: [
      { id: 'sw-r1', source: 'Economic Times', time: '1 hour ago', text: 'Zomato Blinkit announces 100 new dark stores in metro areas; competitive intensity rises in 10-min delivery.', impactTag: 'Direct Competitor' },
      { id: 'sw-r2', source: 'Bloomberg', time: '3 hours ago', text: 'India urban food consumption index expands +14.2% in Q1; positive driver for food tech platforms.', impactTag: 'Macro Driver' }
    ],
    events: [
      { date: '28', month: 'Aug', title: 'Q1 FY27 Earnings Call', subtitle: 'Post-listing quarterly operational results & EBITDA update' },
      { date: '15', month: 'Aug', title: 'Listing Anniversary', subtitle: 'NSE & BSE Mainboard listing ceremony' }
    ]
  },
  MARUTI: {
    name: 'Maruti Suzuki India Limited',
    sector: 'Automobile & EVs',
    marketCap: '₹4.31 Lakh Cr',
    peRatio: '28.40',
    pbRatio: '4.15',
    divYield: '0.90%',
    high52: '₹14,131.00',
    low52: '₹9,720.00',
    buyOrdersPct: 58.10,
    sellOrdersPct: 41.90,
    bids: [
      { price: '₹13,728.00', qty: 450 },
      { price: '₹13,725.00', qty: 1200 },
      { price: '₹13,720.00', qty: 2800 }
    ],
    asks: [
      { price: '₹13,730.00', qty: 380 },
      { price: '₹13,735.00', qty: 950 },
      { price: '₹13,740.00', qty: 2100 }
    ],
    companyNews: [
      { id: 'ms-1', source: 'Autocar India', time: '30 mins ago', text: 'Maruti Suzuki hybrid SUV bookings cross 150,000 mark; Grand Vitara & Invicto command 6-week waiting list.' },
      { id: 'ms-2', source: 'ET Auto', time: '3 hours ago', text: 'Maruti Suzuki Gujarat plant EV production line trial runs successfully completed ahead of festive season.' }
    ],
    relatedNews: [
      { id: 'ms-r1', source: 'Reuters Auto', time: '1 hour ago', text: 'Hyundai Motor India announces price adjustments on Creta SUV range.', impactTag: 'Direct Competitor' },
      { id: 'ms-r2', source: 'Commodity Pulse', time: '4 hours ago', text: 'Cold rolled steel coils price contracts by 1.8%; expands auto OEM gross manufacturing margins.', impactTag: 'Input Cost Reduction' }
    ],
    events: [
      { date: '30', month: 'Aug', title: 'Monthly Sales Data Release', subtitle: 'August vehicle dispatch & export volumes' },
      { date: '12', month: 'Jul', title: 'Dividend Ex-Date', subtitle: 'Approved Final Dividend', amount: '₹125.00 / share' }
    ]
  },
  RELIANCE: {
    name: 'Reliance Industries Limited',
    sector: 'Energy, Retail & Telecom',
    marketCap: '₹17.8 Lakh Cr',
    peRatio: '24.15',
    pbRatio: '2.05',
    divYield: '0.45%',
    high52: '₹1,608.80',
    low52: '₹1,180.00',
    buyOrdersPct: 52.10,
    sellOrdersPct: 47.90,
    bids: [
      { price: '₹1,308.20', qty: 4500 },
      { price: '₹1,308.00', qty: 9800 }
    ],
    asks: [
      { price: '₹1,308.50', qty: 3200 },
      { price: '₹1,309.00', qty: 8100 }
    ],
    companyNews: [
      { id: 'ril-1', source: 'ET NOW', time: '2 hours ago', text: 'Jio Platforms 5G subscriber base crosses 140 million; average revenue per user (ARPU) expands to ₹195.2.' }
    ],
    relatedNews: [
      { id: 'ril-r1', source: 'Oil & Energy Brief', time: '1 hour ago', text: 'Singapore GRM refining margins expand to $7.80/bbl on diesel supply deficit.', impactTag: 'Refining Margin' }
    ],
    events: [
      { date: '28', month: 'Aug', title: 'Annual General Meeting (AGM)', subtitle: 'New Energy & Retail De-merger roadmap' }
    ]
  },
  TATASTEEL: {
    name: 'Tata Steel Limited',
    sector: 'Metals & Mining',
    marketCap: '₹2.33 Lakh Cr',
    peRatio: '14.85',
    pbRatio: '1.42',
    divYield: '1.92%',
    high52: '₹195.00',
    low52: '₹114.60',
    buyOrdersPct: 58.41,
    sellOrdersPct: 41.59,
    bids: [
      { price: '₹184.40', qty: 3200 },
      { price: '₹184.30', qty: 8500 }
    ],
    asks: [
      { price: '₹184.50', qty: 2900 },
      { price: '₹184.60', qty: 7400 }
    ],
    companyNews: [
      { id: 'ts-1', source: 'Livesquawk', time: '42 mins ago', text: 'Tata Steel saw NSE block trade of 1.2M shares absorbed at support zone by domestic mutual funds.' }
    ],
    relatedNews: [
      { id: 'ts-r1', source: 'Reuters Commodities', time: '1 hour ago', text: 'JSW Steel announces price hike on Hot Rolled Coils.', impactTag: 'Direct Competitor' }
    ],
    events: [
      { date: '14', month: 'Aug', title: 'Quarterly Financial Result', subtitle: 'Q1 FY27 Earnings Release' }
    ]
  },
  ZOMATO: {
    name: 'Zomato Limited (Blinkit)',
    sector: 'Consumer Tech',
    marketCap: '₹2.15 Lakh Cr',
    peRatio: '112.50',
    pbRatio: '8.40',
    divYield: '0.00%',
    high52: '₹298.20',
    low52: '₹145.00',
    buyOrdersPct: 68.50,
    sellOrdersPct: 31.50,
    bids: [{ price: '₹242.60', qty: 8900 }],
    asks: [{ price: '₹242.80', qty: 4500 }],
    companyNews: [{ id: 'z-1', source: 'Bloomberg', time: '15 mins ago', text: 'Blinkit gross order value (GOV) surpasses core food delivery growth rate.' }],
    relatedNews: [{ id: 'z-r1', source: 'Economic Times', time: '1 hour ago', text: 'Swiggy Instamart expands dark store footprint.', impactTag: 'Direct Competitor' }],
    events: [{ date: '22', month: 'Aug', title: 'Investor Conference Call', subtitle: 'Q1 FY27 Quick Commerce Update' }]
  },
  HDFCBANK: {
    name: 'HDFC Bank Limited',
    sector: 'Banking & Financials',
    marketCap: '₹13.4 Lakh Cr',
    peRatio: '19.20',
    pbRatio: '2.80',
    divYield: '1.15%',
    high52: '₹810.00',
    low52: '₹620.00',
    buyOrdersPct: 56.40,
    sellOrdersPct: 43.60,
    bids: [{ price: '₹725.20', qty: 12400 }],
    asks: [{ price: '₹725.60', qty: 9800 }],
    companyNews: [{ id: 'h-1', source: 'CNBC', time: '40 mins ago', text: 'HDFC Bank deposit growth outpaces credit expansion; net interest margin (NIM) stabilizes at 3.65%.' }],
    relatedNews: [{ id: 'h-r1', source: 'RBI Bulletin', time: '2 hours ago', text: 'RBI maintains repo rate at 6.50%.', impactTag: 'Macro Policy' }],
    events: [{ date: '18', month: 'Jul', title: 'Dividend Payment', subtitle: 'Final Dividend Executed', amount: '₹19.50 / share' }]
  },
  INFY: {
    name: 'Infosys Limited',
    sector: 'IT & Software Services',
    marketCap: '₹4.74 Lakh Cr',
    peRatio: '24.80',
    pbRatio: '7.10',
    divYield: '2.40%',
    high52: '₹1,990.00',
    low52: '₹1,350.00',
    buyOrdersPct: 61.20,
    sellOrdersPct: 38.80,
    bids: [{ price: '₹1,140.00', qty: 6500 }],
    asks: [{ price: '₹1,140.80', qty: 4200 }],
    companyNews: [{ id: 'inf-1', source: 'ET NOW', time: '1 hour ago', text: 'Infosys bags $1.4B multi-year generative AI cloud transformation contract from Nordic financial group.' }],
    relatedNews: [{ id: 'inf-r1', source: 'Gartner Research', time: '3 hours ago', text: 'Global IT enterprise spending projected to expand +7.9% in 2026.', impactTag: 'Industry Driver' }],
    events: [{ date: '25', month: 'Oct', title: 'Interim Dividend Ex-Date', subtitle: 'H1 FY27 Interim Payout' }]
  }
};

export const StockDetailView: React.FC<StockDetailViewProps> = ({ symbol, onBack }) => {
  const cleanSymbol = (symbol || 'TATASTEEL').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const staticMeta = STOCK_DATABASE[cleanSymbol] || {
    name: `${cleanSymbol} Equity`,
    sector: 'General Equities',
    marketCap: '₹1.50 Lakh Cr',
    peRatio: '22.50',
    pbRatio: '3.10',
    divYield: '1.20%',
    high52: '₹1,200.00',
    low52: '₹850.00',
    buyOrdersPct: 55.0,
    sellOrdersPct: 45.0,
    bids: [
      { price: '₹240.00', qty: 1500 },
      { price: '₹239.50', qty: 4200 }
    ],
    asks: [
      { price: '₹240.50', qty: 1800 },
      { price: '₹241.00', qty: 3900 }
    ],
    companyNews: [
      { id: 'gen-1', source: 'Market Wire', time: '20 mins ago', text: `Institutional trading activity surges in ${cleanSymbol} on strong Q1 operational updates.` }
    ],
    relatedNews: [
      { id: 'gen-r1', source: 'Reuters', time: '1 hour ago', text: 'Nifty 50 index consolidation provides strong support for sector leaders.', impactTag: 'Market Driver' }
    ],
    events: [
      { date: '15', month: 'Sep', title: 'Corporate Earnings Result', subtitle: 'Quarterly Financial Results' }
    ]
  };

  const [liveQuote, setLiveQuote] = useState<LiveStockQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TECHNICALS' | 'NEWS' | 'EVENTS' | 'FNO'>('OVERVIEW');

  useEffect(() => {
    let isMounted = true;
    async function loadQuote() {
      setIsLoading(true);
      try {
        const quote = await fetchLiveStockQuote(cleanSymbol);
        if (isMounted) {
          setLiveQuote(quote);
        }
      } catch (err) {
        console.warn('Failed to load live quote for', cleanSymbol, err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadQuote();
    const interval = setInterval(loadQuote, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [cleanSymbol]);

  const displayPrice = liveQuote
    ? liveQuote.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '...';
  const displayChange = liveQuote ? liveQuote.change_pct : '...';
  const displayChangeVal = liveQuote ? liveQuote.change : '...';
  const isPositive = liveQuote ? liveQuote.is_positive : true;

  return (
    <div className="space-y-6">
      {/* Back Button & Stock Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00D09C]/40 transition-all flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00D09C] to-emerald-600 font-extrabold text-sm text-white flex items-center justify-center shadow-lg">
            {cleanSymbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-[var(--text-primary)] font-sans tracking-tight">
                {liveQuote?.name || staticMeta.name}
              </h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--card-inner)] text-[#00D09C] border border-[#00D09C]/30">
                {cleanSymbol}
              </span>
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-mono">
              {staticMeta.sector} • Market Cap: {staticMeta.marketCap}
            </div>
          </div>
        </div>
      </div>

      {/* Stock Price & Live Chart Header Card */}
      <div className="groww-card p-6 space-y-6 rounded-3xl border border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-black text-[var(--text-primary)] font-mono">
                ₹{displayPrice}
              </span>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#00D09C]" />}
            </div>

            <div className={`flex items-center font-mono font-bold text-xs mt-1 ${isPositive ? 'text-[#00D09C]' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{displayChange} ({displayChangeVal}) Today</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none bg-[var(--card-inner)] p-1.5 rounded-xl border border-[var(--border-color)] text-xs font-mono font-bold">
            {(['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'] as const).map((tf, i) => (
              <button
                key={tf}
                className={`px-3 py-1 rounded-lg transition-all ${
                  i === 0 ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Create Stock SIP Banner */}
        <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-between cursor-pointer hover:border-[#00D09C]/40 transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#00D09C]/15 border border-[#00D09C]/30 text-[#00D09C] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[var(--text-primary)] font-sans">Automated Stock SIP</h4>
              <p className="text-[10px] text-[var(--text-secondary)] font-mono">Build long-term equity wealth in {cleanSymbol} starting at ₹500/mo</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Groww Segmented Tab Bar */}
        <div className="flex items-center space-x-6 border-b border-[var(--border-color)] font-mono text-xs font-bold">
          {(['OVERVIEW', 'TECHNICALS', 'NEWS', 'EVENTS', 'FNO'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`groww-tab capitalize pb-3 ${activeTab === tab ? 'groww-tab-active border-b-2 border-[#00D09C] text-[#00D09C]' : 'text-[var(--text-secondary)]'}`}
            >
              {tab.toLowerCase()}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & MARKET DEPTH ORDER BOOK */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6 pt-2">
            {/* Market Depth Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
                  Live Market Depth Order Book
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">NSE / BSE Real-Time Feed</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-[#00D09C]">Buy orders {staticMeta.buyOrdersPct}%</span>
                  <span className="text-red-500">Sell orders {staticMeta.sellOrdersPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-[#00D09C]" style={{ width: `${staticMeta.buyOrdersPct}%` }}></div>
                  <div className="h-full bg-red-500" style={{ width: `${staticMeta.sellOrdersPct}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                {/* Buy Orders */}
                <div className="space-y-1.5 bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="flex justify-between text-[10px] text-[var(--text-secondary)] uppercase font-bold">
                    <span>Bid Price</span>
                    <span>Qty</span>
                  </div>
                  {staticMeta.bids.map((b, i) => (
                    <div key={i} className="flex justify-between font-bold text-[#00D09C]">
                      <span>{b.price}</span>
                      <span>{b.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Sell Orders */}
                <div className="space-y-1.5 bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="flex justify-between text-[10px] text-[var(--text-secondary)] uppercase font-bold">
                    <span>Ask Price</span>
                    <span>Qty</span>
                  </div>
                  {staticMeta.asks.map((a, i) => (
                    <div key={i} className="flex justify-between font-bold text-red-500">
                      <span>{a.price}</span>
                      <span>{a.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fundamentals Grid */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
              <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">Key Fundamentals</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase">P/E RATIO</div>
                  <div className="font-bold text-[var(--text-primary)] mt-0.5 text-sm">{staticMeta.peRatio}</div>
                </div>
                <div className="bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase">P/B RATIO</div>
                  <div className="font-bold text-[var(--text-primary)] mt-0.5 text-sm">{staticMeta.pbRatio}</div>
                </div>
                <div className="bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase">DIV YIELD</div>
                  <div className="font-bold text-[#00D09C] mt-0.5 text-sm">{staticMeta.divYield}</div>
                </div>
                <div className="bg-[var(--card-inner)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase">52W HIGH / LOW</div>
                  <div className="font-bold text-[var(--text-primary)] mt-0.5 text-xs">{staticMeta.high52} / {staticMeta.low52}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICALS CHART */}
        {activeTab === 'TECHNICALS' && (
          <div className="pt-2">
            <TradingViewChart symbol={cleanSymbol} height={460} />
          </div>
        )}

        {/* TAB 3: TWO-PART SPLIT NEWS */}
        {activeTab === 'NEWS' && (
          <div className="space-y-6 pt-2">
            {/* Part 1: Selected Company Direct News */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-[#00D09C]" />
                <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
                  1. {liveQuote?.name || staticMeta.name} Direct News
                </h3>
              </div>

              <div className="space-y-3">
                {staticMeta.companyNews.map((news) => (
                  <div key={news.id} className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                      <span className="text-[#00D09C] font-bold">{news.source}</span>
                      <span>{news.time}</span>
                    </div>
                    <p className="font-bold text-[var(--text-primary)] leading-snug font-sans">{news.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Sector & Competitor Macro News */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
                  2. Sector & Competitor News Affecting {cleanSymbol}
                </h3>
              </div>

              <div className="space-y-3">
                {staticMeta.relatedNews.map((news) => (
                  <div key={news.id} className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-400 font-bold">{news.source}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
                        {news.impactTag}
                      </span>
                    </div>
                    <p className="font-bold text-[var(--text-primary)] leading-snug font-sans">{news.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS */}
        {activeTab === 'EVENTS' && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
              Corporate Actions & Dividends Timeline
            </h3>
            <div className="space-y-3">
              {staticMeta.events.map((evt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex flex-col items-center justify-center shrink-0">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{evt.date}</span>
                      <span className="text-[10px] uppercase text-[var(--text-secondary)]">{evt.month}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] font-sans">{evt.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{evt.subtitle}</p>
                    </div>
                  </div>

                  {evt.amount && (
                    <div className="text-right font-mono">
                      <div className="font-bold text-[#00D09C] text-sm">{evt.amount}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">Ex-Date Approved</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: F&O */}
        {activeTab === 'FNO' && (
          <div className="space-y-4 pt-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <h3 className="uppercase font-bold tracking-wider text-[var(--text-primary)]">F&O Options Chain ({cleanSymbol})</h3>
              <span className="text-[#00D09C] font-bold">Put-Call Ratio: 1.18 (Bullish)</span>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
              <div className="flex justify-between text-[var(--text-secondary)] text-[10px] font-bold">
                <span>Call OI (Lakhs)</span>
                <span>Strike Price</span>
                <span>Put OI (Lakhs)</span>
              </div>
              <div className="flex justify-between font-bold text-red-400 border-b border-[var(--border-color)] pb-1">
                <span>42.8L</span>
                <span className="text-[var(--text-primary)]">ATM CE</span>
                <span>12.4L</span>
              </div>
              <div className="flex justify-between font-bold text-[#00D09C]">
                <span>18.2L</span>
                <span className="text-[var(--text-primary)]">ATM PE</span>
                <span>38.6L</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
