/**
 * VITTIYA Enterprise Architecture - Shared TypeScript Type Definitions
 */

export interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface IPOItem {
  id: string;
  companyName: string;
  symbol: string;
  category: 'Mainboard' | 'SME';
  status: 'ACTIVE' | 'UPCOMING' | 'CLOSED';
  priceBand: string;
  lotSize: string;
  minInvestment: string;
  biddingDates?: string;
  allotmentDate?: string;
  listingDate?: string;
  gmp: string;
  gmpPercentage: string;
  estListingPrice: string;
  qibSubscription?: string;
  niiSubscription?: string;
  retailSubscription?: string;
  subscriptionTimes: string;
  issueSize?: string;
  listingReturns?: string;
  hasIpoDoc?: boolean;
  isLastDay?: boolean;
  causalSectorImpact?: string;
  aiRating?: string;
}

export interface CompanyDependency {
  company: string;
  name: string;
  ticker: string;
  sector: string;
  marketCap: string;
  tier1Supplier: string;
  tier2Supplier: string;
  rawMaterialRisk: string;
  logisticsBottleneck: string;
  vulnerabilityScore: number;
  aiBusinessSummary: string;
  commodityExposure: { name: string; impact: string; direction: string }[];
  keySuppliers: string[];
  revenueByRegion: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: 'Bloomberg Terminal' | 'Moneycontrol Pro' | 'Reuters' | 'Economic Times' | 'CNBC-TV18' | 'Livesquawk';
  time: string;
  category: string;
  impactSeverity: 'HIGH' | 'MEDIUM' | 'LOW';
  sentimentScore: number;
  sentimentLabel: string;
  firstOrder: string;
  secondOrder: string;
  thirdOrder: string;
  affectedSectors: string[];
  scope?: 'Local (India)' | 'Global' | 'Glocal';
  connectionSummary?: string;
  riskImpact?: string;
  opportunityInsight?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'IPO' | 'MARKET' | 'AI_ALERT' | 'PORTFOLIO' | 'FOREX';
  urgency: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_NORMAL';
  read: boolean;
  actionLabel?: string;
  actionTab?: string;
  metricBadge?: string;
  confidenceScore?: number;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  ticker: string;
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
  sector: string;
}

export interface CommodityItem {
  id: string;
  name: string;
  symbol: string;
  unit: string;
  spotPrice: string;
  change: string;
  isPositive: boolean;
  status: string;
}

export interface ProductTool {
  id: string;
  name: string;
  tabKey: string;
  description: string;
  badge?: string;
  iconType: string;
}
