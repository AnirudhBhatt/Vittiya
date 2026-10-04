import React, { useState } from 'react';
import { COMMODITIES_EXCHANGE_LIST } from '../../../data/mockData';
import { Flame, TrendingUp, TrendingDown } from 'lucide-react';

export const CommoditiesExchange: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Energy', 'Precious Metals', 'Industrial Metals'];

  const filteredCommodities = COMMODITIES_EXCHANGE_LIST.filter((c: any) => {
    if (selectedCategory === 'ALL') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Category Pills */}
      <div className="groww-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-sans uppercase tracking-wider">Global Commodities Exchange Terminal</h2>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30">
              Live Spot & Futures
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time commodity prices, supply deficit risk meters, and downstream sector exposure.</p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`groww-pill-tab text-xs font-bold whitespace-nowrap ${
                selectedCategory === cat ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Commodities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommodities.map((item: any) => (
          <div key={item.symbol} className="groww-card p-5 space-y-4 groww-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-base text-white">{item.name}</span>
                  <span className="text-xs text-slate-400 font-mono ml-2">({item.unit})</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  item.supplyRiskStatus === 'HIGH DEFICIT' ? 'bg-red-500/20 text-red-400' : 'bg-[#00D09C]/20 text-[#00D09C]'
                }`}>
                  {item.supplyRiskStatus}
                </span>
              </div>

              {/* Price & 24h High/Low */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#1A2234]/80 border border-slate-800 font-mono text-xs my-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">SPOT PRICE</span>
                  <span className="font-bold text-white text-base">{item.price}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">24H CHANGE</span>
                  <span className={`font-bold text-sm flex items-center ${item.isPositive ? 'text-[#00D09C]' : 'text-red-400'}`}>
                    {item.isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                    {item.change}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">24H HIGH / LOW</span>
                  <span className="text-slate-200 text-xs font-bold">{item.high24h} / {item.low24h}</span>
                </div>
              </div>

              {/* AI Driver Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed bg-[#0A0E1A] p-3 rounded-xl border border-slate-800 mb-3">
                {item.aiDriverSummary}
              </p>
            </div>

            {/* Affected Sectors */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5 font-bold">Downstream Industry Exposure:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.sectorExposure.map((sec: string, i: number) => (
                  <span key={i} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-semibold">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
