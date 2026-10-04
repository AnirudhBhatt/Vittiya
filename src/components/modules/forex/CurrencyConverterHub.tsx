import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, ShieldCheck, Sparkles, Calculator, ArrowUpRight } from 'lucide-react';

interface FXPair {
  symbol: string;
  name: string;
  rate: number;
  change: string;
  isPositive: boolean;
  bankMarkupPct: number;
  gstPct: number;
  swiftFee: number;
  historical1YReturn: string;
}

const FX_PAIRS: FXPair[] = [
  { symbol: 'USD/INR', name: 'US Dollar to Indian Rupee', rate: 95.43, change: '+0.15%', isPositive: true, bankMarkupPct: 0.75, gstPct: 0.18, swiftFee: 500, historical1YReturn: '+4.25%' },
  { symbol: 'EUR/INR', name: 'Euro to Indian Rupee', rate: 104.20, change: '-0.25%', isPositive: false, bankMarkupPct: 0.85, gstPct: 0.18, swiftFee: 650, historical1YReturn: '+2.10%' },
  { symbol: 'GBP/INR', name: 'British Pound to Indian Rupee', rate: 121.80, change: '+0.42%', isPositive: true, bankMarkupPct: 0.90, gstPct: 0.18, swiftFee: 750, historical1YReturn: '+3.80%' },
  { symbol: 'AED/INR', name: 'UAE Dirham to Indian Rupee', rate: 25.98, change: '+0.10%', isPositive: true, bankMarkupPct: 0.50, gstPct: 0.18, swiftFee: 400, historical1YReturn: '+4.15%' },
  { symbol: 'JPY/INR', name: 'Japanese Yen to Indian Rupee (100 Yen)', rate: 64.80, change: '-0.85%', isPositive: false, bankMarkupPct: 1.10, gstPct: 0.18, swiftFee: 800, historical1YReturn: '-5.20%' }
];

export const CurrencyConverterHub: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<FXPair>(FX_PAIRS[0]);
  const [foreignAmount, setForeignAmount] = useState<number>(10000); // Default $10,000
  const [direction, setDirection] = useState<'FOREIGN_TO_INR' | 'INR_TO_FOREIGN'>('FOREIGN_TO_INR');

  // Calculation Math
  const rawINR = direction === 'FOREIGN_TO_INR' ? foreignAmount * selectedPair.rate : foreignAmount;
  const bankMarkupCost = (rawINR * selectedPair.bankMarkupPct) / 100;
  const gstCost = (rawINR * selectedPair.gstPct) / 100;
  const totalFees = bankMarkupCost + gstCost + selectedPair.swiftFee;
  const netReceivedINR = direction === 'FOREIGN_TO_INR' ? rawINR - totalFees : (rawINR - totalFees) / selectedPair.rate;
  const effectiveRate = direction === 'FOREIGN_TO_INR' ? netReceivedINR / foreignAmount : rawINR / netReceivedINR;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-inner)] to-indigo-600/10 border border-indigo-500/30 shadow-2xl rounded-3xl">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Forex Arbitrage & Currency OS</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">
            Currency Converter, Fee Calculator & Investment Analyzer
          </h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Live FX rate conversion, banking markup fee breakdown, GST calculation, and USD/INR currency depreciation investment strategies.
          </p>
        </div>

        {/* Currency Pair Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none z-10 bg-[var(--card-inner)] p-1.5 rounded-2xl border border-[var(--border-color)]">
          {FX_PAIRS.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setSelectedPair(pair)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedPair.symbol === pair.symbol ? 'bg-[#00D09C] text-[#0A0E1A] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {pair.symbol} ({pair.rate.toFixed(2)})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main 2-Column Grid: Live Calculator & Fee Breakdown + Investment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Interactive Calculator & Fee Itemization */}
        <div className="groww-card p-6 space-y-6 rounded-3xl border border-[var(--border-color)]">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#00D09C]" />
              <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">Real-Time Currency Calculator</h2>
            </div>
            <button
              onClick={() => setDirection(direction === 'FOREIGN_TO_INR' ? 'INR_TO_FOREIGN' : 'FOREIGN_TO_INR')}
              className="px-3 py-1.5 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] text-xs font-mono font-bold text-[#00D09C] flex items-center space-x-1.5 hover:border-[#00D09C] transition-all"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Swap Direction</span>
            </button>
          </div>

          {/* Amount Inputs */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[var(--text-secondary)] font-bold uppercase mb-1.5 block">
                You Send ({direction === 'FOREIGN_TO_INR' ? selectedPair.symbol.split('/')[0] : 'INR'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={foreignAmount}
                  onChange={(e) => setForeignAmount(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 font-mono text-lg font-bold text-[var(--text-primary)] focus:outline-none focus:border-[#00D09C]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[#00D09C]">
                  {direction === 'FOREIGN_TO_INR' ? selectedPair.symbol.split('/')[0] : 'INR'}
                </span>
              </div>
            </div>

            {/* Live Exchange Rate Box */}
            <div className="p-3.5 rounded-2xl bg-[#00D09C]/10 border border-[#00D09C]/30 flex items-center justify-between font-mono text-xs">
              <span className="text-[var(--text-secondary)] font-bold">Mid-Market Rate:</span>
              <span className="font-extrabold text-[#00D09C] text-sm">
                1 {selectedPair.symbol.split('/')[0]} = ₹{selectedPair.rate.toFixed(2)} INR
              </span>
            </div>

            {/* Transparent Bank Fee Breakdown Box */}
            <div className="space-y-2.5 bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] font-mono text-xs">
              <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2 flex justify-between">
                <span>Fee Itemization Breakdown</span>
                <span>Amount (INR)</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Mid-Market Value:</span>
                <span className="font-bold">₹{rawINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between text-amber-400">
                <span>Bank Rate Spread ({selectedPair.bankMarkupPct}%):</span>
                <span className="font-bold">-₹{bankMarkupCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-purple-400">
                <span>GST on Conversion ({selectedPair.gstPct}%):</span>
                <span className="font-bold">-₹{gstCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-cyan-400">
                <span>SWIFT Wire Transfer Flat Charge:</span>
                <span className="font-bold">-₹{selectedPair.swiftFee.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)] flex justify-between font-bold text-sm text-[var(--text-primary)]">
                <span>Total Transaction Charges:</span>
                <span className="text-red-400">₹{totalFees.toFixed(2)}</span>
              </div>
            </div>

            {/* Net Amount Output */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[#00D09C]/40 space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Net Received Amount</div>
              <div className="text-2xl font-black text-[var(--text-primary)] font-mono">
                {direction === 'FOREIGN_TO_INR'
                  ? `₹${netReceivedINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })} INR`
                  : `${netReceivedINR.toFixed(2)} ${selectedPair.symbol.split('/')[0]}`}
              </div>
              <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                Effective Exchange Rate: 1 {selectedPair.symbol.split('/')[0]} = ₹{effectiveRate.toFixed(2)} INR (after fees)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: How Forex Can Be an Investment & Arbitrage Strategy */}
        <div className="groww-card p-6 space-y-5 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">
                  Forex as an Investment Strategy
                </h2>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                How holding USD/FX assets protects capital against local currency inflation and generates dual-engine returns.
              </p>
            </div>

            {/* Strategy 1: Rupee Depreciation Hedge */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#00D09C]">1. Currency Depreciation Hedge</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30">
                  {selectedPair.historical1YReturn} 1Y Return
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Over the past decade, the Indian Rupee (INR) has depreciated by an average of <strong>3.5% - 4.5% annually</strong> against the US Dollar. Holding USD assets (e.g. US Equities like Apple/Nvidia or USD Treasuries) earns asset capital growth <strong>PLUS</strong> a currency appreciation bonus when converted back to INR!
              </p>
            </div>

            {/* Strategy 2: Carry Trade Interest Arbitrage */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-amber-400">2. Carry Trade Yield Arbitrage</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  5.25% US vs 6.50% RBI
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Institutional investors borrow capital in lower yield currencies (e.g., Japanese Yen at 0.25%) and invest in higher yield sovereign bonds (e.g., US Treasuries at 5.25% or Indian G-Secs at 6.80%), capturing the risk-free net interest spread.
              </p>
            </div>

            {/* Strategy 3: Global Commodity Import Protection */}
            <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-purple-400">3. Crude Oil & Gold Import Inflation Protection</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  Import Buffer
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                India imports 85% of its crude oil and gold in USD. Holding a USD-denominated cash or commodity buffer hedges your domestic purchasing power during energy supply shocks.
              </p>
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="p-4 rounded-2xl bg-[#00D09C]/10 border border-[#00D09C]/30 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00D09C] shrink-0" />
              <span className="text-[var(--text-primary)] font-bold">
                Optimal FX Strategy: Maintain 10% - 15% portfolio exposure in USD global assets.
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#00D09C] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
