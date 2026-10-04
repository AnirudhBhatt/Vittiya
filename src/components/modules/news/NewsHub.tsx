import React, { useState } from 'react';
import { RECENT_NEWS, type NewsItem } from '../../../data/mockData';
import { Sparkles, TrendingUp, TrendingDown, Globe, MapPin, ArrowRightLeft, Compass } from 'lucide-react';

interface NewsHubProps {
  onSelectQuery?: (query: string) => void;
}

export const NewsHub: React.FC<NewsHubProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Global Issues',
    'Local Issues',
    'Geopolitics',
    'Supply Chain',
    'Policy',
    'IT & Tech',
    'Agriculture',
    'Scams & Governance'
  ];

  const filteredNews = RECENT_NEWS.filter((n) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'Global Issues') return n.scope === 'Global' || n.scope === 'Glocal';
    if (selectedCategory === 'Local Issues') return n.scope === 'Local (India)' || n.scope === 'Glocal';
    return n.category === selectedCategory || n.affectedSectors.includes(selectedCategory);
  });

  const getSentimentBadge = (score: number, label: NewsItem['sentimentLabel']) => {
    if (score > 40) {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30 font-mono font-bold text-[10px] flex items-center space-x-1">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>{label} (+{score})</span>
        </span>
      );
    } else if (score < -40) {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-mono font-bold text-[10px] flex items-center space-x-1">
          <TrendingDown className="w-3 h-3 mr-1" />
          <span>{label} ({score})</span>
        </span>
      );
    } else {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono font-bold text-[10px] flex items-center space-x-1">
          <span>{label} ({score})</span>
        </span>
      );
    }
  };

  const getScopeBadge = (scope?: NewsItem['scope']) => {
    switch (scope) {
      case 'Local (India)':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold text-[10px] flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>Local (India)</span>
          </span>
        );
      case 'Global':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold text-[10px] flex items-center space-x-1">
            <Globe className="w-3 h-3 text-purple-400" />
            <span>Global Impact</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold text-[10px] flex items-center space-x-1">
            <ArrowRightLeft className="w-3 h-3 text-amber-400" />
            <span>Glocal Connection</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Filter Category Chips */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border border-[var(--border-color)]">
        <div>
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>LOCAL & GLOBAL MACRO INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">Local & Global Issue Connectivity Radar</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
            Track real-time connections between international geopolitics, local Indian state issues, supply chain risks, and actionable investment opportunities.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none bg-[var(--card-inner)] p-1.5 rounded-2xl border border-[var(--border-color)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-[#00D09C] text-[#0A0E1A] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <div key={news.id} className="groww-card p-6 space-y-4 flex flex-col justify-between border border-[var(--border-color)] hover:border-[#00D09C]/40 transition-all rounded-3xl">
            <div>
              {/* Category, Scope & Source Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[var(--text-primary)]">{news.source}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--card-inner)] text-[var(--text-secondary)] font-bold border border-[var(--border-color)]">
                    {news.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getScopeBadge(news.scope)}
                  <span className="text-[var(--text-secondary)] text-[11px]">{news.time}</span>
                </div>
              </div>

              <h3 className="font-black text-base text-[var(--text-primary)] leading-snug mb-3 font-sans">{news.title}</h3>

              {/* AI Sentiment Badge */}
              <div className="mb-4">
                {getSentimentBadge(news.sentimentScore, news.sentimentLabel)}
              </div>

              {/* 1. Local & Global Connection Analysis */}
              {news.connectionSummary && (
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono space-y-1 mb-3">
                  <div className="text-cyan-400 font-bold flex items-center space-x-1.5 text-[11px]">
                    <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" />
                    <span>LOCAL & GLOBAL CONNECTION:</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-[11px] font-sans leading-snug">
                    {news.connectionSummary}
                  </p>
                </div>
              )}

              {/* 2. Actionable Help & Investment Opportunity Box */}
              {news.opportunityInsight && (
                <div className="p-3.5 rounded-2xl bg-[#00D09C]/10 border border-[#00D09C]/40 text-xs font-mono space-y-1 mb-3">
                  <div className="text-[#00D09C] font-bold flex items-center space-x-1.5 text-[11px]">
                    <Compass className="w-3.5 h-3.5 shrink-0 text-[#00D09C]" />
                    <span>ACTIONABLE HELP & INVESTMENT OPPORTUNITY:</span>
                  </div>
                  <p className="text-[var(--text-primary)] text-[11px] font-sans font-bold leading-snug">
                    {news.opportunityInsight}
                  </p>
                </div>
              )}

              {/* 3. Multi-Order Causal Ripple Box */}
              <div className="space-y-2 font-mono text-xs bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)]">
                <div className="text-amber-400 flex items-start space-x-2">
                  <span className="font-bold text-[10px] uppercase shrink-0">1st Order Ripple:</span>
                  <span className="text-[var(--text-primary)] text-[11px]">{news.firstOrder}</span>
                </div>
                <div className="text-purple-400 flex items-start space-x-2">
                  <span className="font-bold text-[10px] uppercase shrink-0">2nd Order Ripple:</span>
                  <span className="text-[var(--text-primary)] text-[11px]">{news.secondOrder}</span>
                </div>
                <div className="text-[#00D09C] flex items-start space-x-2">
                  <span className="font-bold text-[10px] uppercase shrink-0">3rd Order Ripple:</span>
                  <span className="text-[var(--text-primary)] text-[11px]">{news.thirdOrder}</span>
                </div>
              </div>
            </div>

            {/* Affected Sectors Badges & Severity */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {news.affectedSectors.map((sec, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold bg-[var(--card-inner)] text-[var(--text-secondary)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                    {sec}
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-mono text-amber-400 font-bold">Severity: {news.impactSeverity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
