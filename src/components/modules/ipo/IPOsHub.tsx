import React, { useState, useEffect } from 'react';
import { IPOS_LIST, type IPOItem } from '../../../data/mockData';
import { CheckCircle, ChevronDown, Rocket, Clock, ShieldCheck, CheckSquare, Sparkles, ExternalLink, FileText } from 'lucide-react';

export const IPOsHub: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'OPEN' | 'CLOSED' | 'UPCOMING' | 'APPLIED'>('OPEN');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Mainboard' | 'SME'>('All');
  const [appliedIPOs, setAppliedIPOs] = useState<string[]>([]);
  const [selectedIPO, setSelectedIPO] = useState<IPOItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredIPOs = IPOS_LIST.filter((ipo: IPOItem) => {
    // Category Filter (All = Mainboard & SME both)
    if (categoryFilter !== 'All' && ipo.category !== categoryFilter) return false;

    // Status Filter
    if (statusFilter === 'OPEN') return ipo.status === 'ACTIVE';
    if (statusFilter === 'CLOSED') return ipo.status === 'CLOSED';
    if (statusFilter === 'UPCOMING') return ipo.status === 'UPCOMING';
    if (statusFilter === 'APPLIED') return appliedIPOs.includes(ipo.id);
    return true;
  });

  // Auto-select first IPO in filtered list when filters change
  useEffect(() => {
    if (filteredIPOs.length > 0) {
      if (!selectedIPO || !filteredIPOs.some((item) => item.id === selectedIPO.id)) {
        setSelectedIPO(filteredIPOs[0]);
      }
    } else {
      setSelectedIPO(null);
    }
  }, [statusFilter, categoryFilter, appliedIPOs]);

  const handleApply = (ipo: IPOItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!appliedIPOs.includes(ipo.id)) {
      setAppliedIPOs([...appliedIPOs, ipo.id]);
      setToastMessage(`SUCCESS: Application submitted for ${ipo.companyName}!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const openCount = IPOS_LIST.filter((i) => i.status === 'ACTIVE' && (categoryFilter === 'All' || i.category === categoryFilter)).length;
  const closedCount = IPOS_LIST.filter((i) => i.status === 'CLOSED' && (categoryFilter === 'All' || i.category === categoryFilter)).length;
  const upcomingCount = IPOS_LIST.filter((i) => i.status === 'UPCOMING' && (categoryFilter === 'All' || i.category === categoryFilter)).length;
  const appliedCount = appliedIPOs.length;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[var(--card-bg)] border border-[#00D09C] backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-mono animate-in slide-in-from-top-5">
          <CheckCircle className="w-4 h-4 text-[#00D09C]" />
          <span className="font-bold text-[var(--text-primary)]">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar & Official Groww Filters */}
      <div className="groww-card p-6 space-y-4 rounded-3xl border border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans tracking-tight">IPO Dashboard</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] font-mono font-bold text-[10px] border border-[#00D09C]/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>GROWW REAL-TIME VERIFIED</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">
              Apply for Mainboard & SME IPOs, track subscription times, listing gains & allotment status.
            </p>
          </div>
        </div>

        {/* Status Filter Pills: Open, Closed, Upcoming, Applied */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setStatusFilter('OPEN')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              statusFilter === 'OPEN'
                ? 'bg-[#00D09C] text-[#0A0E1A] shadow-md shadow-[#00D09C]/20'
                : 'bg-[var(--card-inner)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Open ({openCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('CLOSED')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              statusFilter === 'CLOSED'
                ? 'bg-amber-500 text-[#0A0E1A] shadow-md'
                : 'bg-[var(--card-inner)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Closed ({closedCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('UPCOMING')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              statusFilter === 'UPCOMING'
                ? 'bg-cyan-500 text-[#0A0E1A] shadow-md'
                : 'bg-[var(--card-inner)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming ({upcomingCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('APPLIED')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              statusFilter === 'APPLIED'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-[var(--card-inner)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Applied ({appliedCount})</span>
          </button>
        </div>

        {/* IPO Type Dropdown Filter */}
        <div className="flex items-center space-x-3 pt-2 font-mono text-xs">
          <span className="text-[var(--text-secondary)] font-bold">IPO type:</span>
          <div className="relative inline-block">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-[var(--card-inner)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold px-4 py-1.5 rounded-xl appearance-none pr-9 cursor-pointer focus:outline-none focus:border-[#00D09C]"
            >
              <option value="All">All</option>
              <option value="Mainboard">Mainboard</option>
              <option value="SME">SME</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Grid: Table View + Right Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Exact Groww Style Table */}
        <div className="lg:col-span-2 groww-card overflow-hidden rounded-3xl border border-[var(--border-color)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[var(--card-inner)] border-b border-[var(--border-color)] text-[var(--text-secondary)] uppercase text-[10px] font-bold">
                {statusFilter === 'OPEN' && (
                  <tr>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Closing date</th>
                    <th className="py-3.5 px-4">Overall subscription</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                )}
                {statusFilter === 'CLOSED' && (
                  <tr>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Listing date</th>
                    <th className="py-3.5 px-4">Listing returns</th>
                    <th className="py-3.5 px-4">Overall Subscription</th>
                    <th className="py-3.5 px-4 text-right">Allotment Status</th>
                  </tr>
                )}
                {statusFilter === 'UPCOMING' && (
                  <tr>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Opening date</th>
                    <th className="py-3.5 px-4 text-right">DRHP Document</th>
                  </tr>
                )}
                {statusFilter === 'APPLIED' && (
                  <tr>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Bidding Dates</th>
                    <th className="py-3.5 px-4">Subscription</th>
                    <th className="py-3.5 px-4 text-right">Status</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredIPOs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-mono text-xs space-y-2">
                      <p className="font-bold text-sm">No IPOs found for "{statusFilter}" status</p>
                      <p className="text-[11px] text-slate-500">
                        {statusFilter === 'APPLIED'
                          ? 'You have not applied for any IPOs yet. Click "Apply" on any Open IPO to add it to your applied list.'
                          : 'Try switching the category dropdown filter.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredIPOs.map((ipo) => (
                    <tr
                      key={ipo.id}
                      onClick={() => setSelectedIPO(ipo)}
                      className={`cursor-pointer transition-colors hover:bg-[var(--card-inner)]/50 ${
                        selectedIPO?.id === ipo.id ? 'bg-[#00D09C]/10 border-l-4 border-[#00D09C]' : ''
                      }`}
                    >
                      {/* 1. OPEN TAB ROWS */}
                      {statusFilter === 'OPEN' && (
                        <>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center font-black text-xs text-[#00D09C] shrink-0">
                                {ipo.companyName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[var(--text-primary)] font-sans flex items-center space-x-2">
                                  {ipo.category === 'SME' && (
                                    <span className="text-[10px] font-bold text-[var(--text-secondary)] font-mono">SME</span>
                                  )}
                                  <span>{ipo.companyName}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-mono">
                            <div className="font-bold text-[var(--text-primary)]">{ipo.biddingDates || ipo.listingDate || 'TBD'}</div>
                            {ipo.isLastDay && (
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[9px] border border-amber-500/30">
                                Last day
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 font-bold text-[var(--text-primary)] font-mono">
                            {ipo.subscriptionTimes}
                          </td>

                          <td className="py-4 px-4 text-right">
                            {appliedIPOs.includes(ipo.id) ? (
                              <span className="px-4 py-1.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] font-bold text-xs border border-[#00D09C]/40 inline-flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Applied</span>
                              </span>
                            ) : ipo.subscriptionTimes === '--' ? (
                              <button
                                onClick={(e) => handleApply(ipo, e)}
                                className="px-4 py-1.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] hover:bg-[#00D09C] hover:text-[#0A0E1A] font-bold text-xs transition-all border border-[#00D09C]/30"
                              >
                                Pre-apply
                              </button>
                            ) : (
                              <button
                                onClick={(e) => handleApply(ipo, e)}
                                className="px-5 py-1.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] hover:bg-[#00D09C] hover:text-[#0A0E1A] font-bold text-xs transition-all border border-[#00D09C]/40"
                              >
                                Apply
                              </button>
                            )}
                          </td>
                        </>
                      )}

                      {/* 2. CLOSED TAB ROWS */}
                      {statusFilter === 'CLOSED' && (
                        <>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center font-black text-xs text-[#00D09C] shrink-0">
                                {ipo.companyName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[var(--text-primary)] font-sans flex items-center space-x-1.5">
                                  {ipo.category === 'SME' && (
                                    <span className="text-[10px] font-bold text-[var(--text-secondary)] font-mono">SME</span>
                                  )}
                                  <span>{ipo.companyName}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-bold text-[var(--text-primary)] font-mono">
                            {ipo.listingDate}
                          </td>

                          <td className="py-4 px-4 font-mono font-bold">
                            {ipo.listingReturns?.includes('gains') ? (
                              <span className="text-[#00D09C]">{ipo.listingReturns}</span>
                            ) : ipo.listingReturns?.includes('loss') ? (
                              <span className="text-red-500">{ipo.listingReturns}</span>
                            ) : (
                              <span className="text-slate-400">--</span>
                            )}
                          </td>

                          <td className="py-4 px-4 font-bold text-[var(--text-primary)] font-mono">
                            {ipo.subscriptionTimes}
                          </td>

                          <td className="py-4 px-4 text-right">
                            <a
                              href="https://linkintime.co.in/initial_offer/public-issues.html"
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#00D09C] hover:underline font-bold text-xs inline-flex items-center space-x-1"
                            >
                              <span>Check allotment status</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </>
                      )}

                      {/* 3. UPCOMING TAB ROWS */}
                      {statusFilter === 'UPCOMING' && (
                        <>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)] flex items-center justify-center font-black text-xs text-cyan-400 shrink-0">
                                {ipo.companyName.charAt(0)}
                              </div>
                              <div className="font-bold text-sm text-[var(--text-primary)] font-sans">
                                {ipo.companyName}
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-bold text-[var(--text-primary)] font-mono">
                            {ipo.biddingDates || ipo.listingDate || 'TBD'}
                          </td>

                          <td className="py-4 px-4 text-right">
                            {ipo.hasIpoDoc ? (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  alert(`Downloading DRHP Prospectus for ${ipo.companyName}...`);
                                }}
                                className="text-[#00D09C] hover:underline font-bold text-xs inline-flex items-center space-x-1"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>IPO Doc</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-500 font-mono text-xs">--</span>
                            )}
                          </td>
                        </>
                      )}

                      {/* 4. APPLIED TAB ROWS */}
                      {statusFilter === 'APPLIED' && (
                        <>
                          <td className="py-4 px-4">
                            <div className="font-bold text-sm text-[var(--text-primary)] font-sans">{ipo.companyName}</div>
                            <div className="text-[10px] text-[var(--text-secondary)] font-mono">{ipo.category} IPO</div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[var(--text-primary)]">{ipo.biddingDates || ipo.listingDate || 'TBD'}</td>
                          <td className="py-4 px-4 font-mono font-bold text-[#00D09C]">{ipo.subscriptionTimes}</td>
                          <td className="py-4 px-4 text-right">
                            <span className="px-3 py-1 rounded-full bg-[#00D09C]/20 text-[#00D09C] font-bold text-xs border border-[#00D09C]/40 inline-flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Application Active</span>
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected IPO Detail Inspector */}
        <div className="groww-card p-6 space-y-5 h-fit rounded-3xl border border-[var(--border-color)]">
          {selectedIPO ? (
            <>
              <div className="border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Selected IPO Inspector</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--card-inner)] text-[10px] font-mono font-bold text-[var(--text-secondary)] border border-[var(--border-color)]">
                    {selectedIPO.category}
                  </span>
                </div>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-1 font-sans">{selectedIPO.companyName}</h2>
                <div className="flex items-center space-x-2 mt-1 font-mono text-xs">
                  <span className="text-slate-400">Grey Market Premium (GMP):</span>
                  <span className="text-[#00D09C] font-bold">{selectedIPO.gmp} ({selectedIPO.gmpPercentage})</span>
                </div>
              </div>

              {/* Allotment & Listing Timeline */}
              <div className="space-y-3 bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Price Band</span>
                  <strong className="text-[var(--text-primary)]">{selectedIPO.priceBand}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Lot Size & Min Amt</span>
                  <strong className="text-[var(--text-primary)]">{selectedIPO.lotSize} ({selectedIPO.minInvestment})</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Est. Listing Price</span>
                  <strong className="text-[#00D09C] font-bold">{selectedIPO.estListingPrice}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Allotment Date</span>
                  <strong className="text-[var(--text-primary)]">{selectedIPO.allotmentDate}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Listing Date</span>
                  <strong className="text-[var(--text-primary)]">{selectedIPO.listingDate}</strong>
                </div>
              </div>

              {/* Subscription Breakdown */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Subscription Breakdown</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)]">
                    <div className="text-[10px] text-slate-400">QIB</div>
                    <div className="font-bold text-[#00D09C] text-sm">{selectedIPO.qibSubscription}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)]">
                    <div className="text-[10px] text-slate-400">NII (HNI)</div>
                    <div className="font-bold text-amber-400 text-sm">{selectedIPO.niiSubscription}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--card-inner)] border border-[var(--border-color)]">
                    <div className="text-[10px] text-slate-400">Retail</div>
                    <div className="font-bold text-cyan-400 text-sm">{selectedIPO.retailSubscription}</div>
                  </div>
                </div>
              </div>

              {/* AI Causal Sector Impact */}
              {selectedIPO.causalSectorImpact && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono space-y-1">
                  <div className="text-cyan-400 font-bold flex items-center space-x-1 text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AI CAUSAL RATING: {selectedIPO.aiRating || 'BUY'}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-[11px] font-sans leading-snug">
                    {selectedIPO.causalSectorImpact}
                  </p>
                </div>
              )}

              {/* Apply Action */}
              <button
                onClick={(e) => handleApply(selectedIPO, e)}
                disabled={appliedIPOs.includes(selectedIPO.id) || selectedIPO.status === 'CLOSED'}
                className={`w-full py-3 rounded-2xl font-mono font-bold text-xs transition-all ${
                  appliedIPOs.includes(selectedIPO.id)
                    ? 'bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40'
                    : selectedIPO.status === 'CLOSED'
                    ? 'bg-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
                    : 'bg-[#00D09C] text-[#0A0E1A] hover:bg-[#00D09C]/90 shadow-lg'
                }`}
              >
                {appliedIPOs.includes(selectedIPO.id)
                  ? 'Application Submitted'
                  : selectedIPO.status === 'UPCOMING'
                  ? 'Pre-apply for IPO'
                  : selectedIPO.status === 'CLOSED'
                  ? 'Bidding Closed'
                  : 'Apply for IPO'}
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              Select an IPO to view details or click on "Apply" to apply for IPO
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
