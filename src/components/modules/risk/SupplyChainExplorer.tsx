import React, { useState } from 'react';
import { COMPANY_DEPENDENCIES, type CompanyDependency } from '../../../data/mockData';
import { Network, Building2, Layers } from 'lucide-react';

export const SupplyChainExplorer: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyDependency>(COMPANY_DEPENDENCIES[0]);

  return (
    <div className="flex flex-col h-full groww-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-[#121827]/90 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Network className="w-5 h-5 text-[#00D09C]" />
          <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Supply Chain & Company Matrix</h2>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30">
          Knowledge Graph Inspector
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 p-6 gap-6 overflow-y-auto">
        {/* Company Selector Sidebar */}
        <div className="space-y-2.5">
          <label className="text-xs text-slate-400 font-mono uppercase font-bold tracking-wider block mb-1">Select Company Node</label>
          {COMPANY_DEPENDENCIES.map((comp: CompanyDependency) => (
            <button
              key={comp.ticker}
              onClick={() => setSelectedCompany(comp)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedCompany.ticker === comp.ticker
                  ? 'bg-[#00D09C]/15 border-[#00D09C] text-white shadow-lg shadow-[#00D09C]/10'
                  : 'bg-[#121827] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{comp.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">{comp.ticker}</span>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-xs text-slate-400 font-mono">
                <span>{comp.sector}</span>
                <span>Cap: {comp.marketCap}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Company Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* AI Summary Card */}
          <div className="p-5 rounded-2xl bg-[#1A2234]/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#00D09C]" />
                <span>{selectedCompany.name} ({selectedCompany.ticker})</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] font-mono font-bold">
                Graph Node Active
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCompany.aiBusinessSummary}</p>
          </div>

          {/* Commodity Exposure Grid */}
          <div className="p-5 rounded-2xl bg-[#1A2234]/80 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Upstream Commodity Sensitivities</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {selectedCompany.commodityExposure.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0A0E1A] border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                    <span>{exp.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      exp.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {exp.impact}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 flex justify-between mt-2">
                    <span>Margin Direction:</span>
                    <span className={exp.direction === 'POSITIVE' ? 'text-[#00D09C] font-bold' : 'text-red-400 font-bold'}>
                      {exp.direction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suppliers & Revenue Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#1A2234]/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400 mb-2.5">Key Upstream Suppliers</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCompany.keySuppliers.map((sup, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D09C]"></span>
                    <span>{sup}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A2234]/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400 mb-2.5">Geographic Revenue Split</h4>
              <div className="space-y-2.5">
                {Object.entries(selectedCompany.revenueByRegion).map(([region, pct], i: number) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between text-slate-300 font-mono text-[11px] mb-1">
                      <span>{region}</span>
                      <span className="font-bold text-white">{String(pct)}%</span>
                    </div>
                    <div className="w-full bg-[#0A0E1A] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00D09C] h-full rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
