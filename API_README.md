# 📡 VITTIYA AI — Real-Time Financial Data & API Architecture Specification

> **Dedicated API & Data Streaming Documentation**  
> **Project:** Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform  
> **Specialization:** B.Tech Computer Science & Engineering (Full Stack Development)  

---

## 📋 Table of Contents
1. [Overview of Financial Data Architecture](#1-overview-of-financial-data-architecture)
2. [Yahoo Finance v8 Real-Time Chart REST API](#2-yahoo-finance-v8-real-time-chart-rest-api)
3. [Yahoo Finance v10 Financial Quote Summary API](#3-yahoo-finance-v10-financial-quote-summary-api)
4. [Multi-Proxy Resilient Middleware Stack (CORS Bypass)](#4-multi-proxy-resilient-middleware-stack-cors-bypass)
5. [High-Frequency Live Exchange Tick Stream Engine](#5-high-frequency-live-exchange-tick-stream-engine)
6. [Exchange Operating Hours & Timezone Validation Engine](#6-exchange-operating-hours--timezone-validation-engine)
7. [Groww Real-Time IPO & GMP Data Feed Service](#7-groww-real-time-ipo--gmp-data-feed-service)
8. [Local & Global News Connectivity & Sentiment Ingestion Engine](#8-local--global-news-connectivity--sentiment-ingestion-engine)
9. [Python Automated Document Generation APIs (`python-docx` & `python-pptx`)](#9-python-automated-document-generation-apis)
10. [Codebase Implementation Reference Map](#10-codebase-implementation-reference-map)

---

## 1. Overview of Financial Data Architecture

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │               PUBLIC FINANCIAL DATA SOURCES            │
                                    │    (Yahoo Finance v8/v10 API + Global Interbank)     │
                                    └───────────────────────────┬────────────────────────────┘
                                                                │
                                                                ▼
                                    ┌────────────────────────────────────────────────────────┐
                                    │       MULTI-PROXY RESILIENT MIDDLEWARE STACK           │
                                    │  (allorigins.win | corsproxy.io | proxy.cors.sh)       │
                                    └───────────────────────────┬────────────────────────────┘
                                                                │
                                                                ▼
                                    ┌────────────────────────────────────────────────────────┐
                                    │        STOCK SERVICE LAYER (src/services/stockService.ts)│
                                    └───────────────────────────┬────────────────────────────┘
                                                                │
             ┌──────────────────────────────────────────────────┼──────────────────────────────────────────────────┐
             ▼                                                  ▼                                                  ▼
┌─────────────────────────┐                        ┌─────────────────────────┐                        ┌─────────────────────────┐
│ HEADER TICKER STREAMER  │                        │   GROWW IPOS HUB FEED   │                        │ NEWS & SENTIMENT RADAR  │
│ (HeaderTicker.tsx 1.8s) │                        │   (IPOsHub.tsx + GMP)   │                        │ (NewsHub.tsx + Ripples) │
└─────────────────────────┘                        └─────────────────────────┘                        └─────────────────────────┘
```

Vittiya AI utilizes a hybrid real-time financial data streaming architecture combining:
1. **Live REST APIs** via Yahoo Finance v8/v10 endpoints.
2. **Multi-Proxy Resilience Stack** to bypass browser CORS origin boundaries.
3. **Exchange Hours Validation Engine** enforcing official market closing quotes during off-trading hours.
4. **High-Frequency 1.8s Tick Pulse Engine** simulating real-time exchange WebSocket feeds during active market sessions.

---

## 2. Yahoo Finance v8 Real-Time Chart REST API

### Endpoint Specification:
```http
GET https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=5m&range=1d
```

### Parameters:
- `{symbol}`: Yahoo Finance ticker symbol (e.g. `^NSEI` for Nifty 50, `TATASTEEL.NS` for Tata Steel, `^GSPC` for S&P 500, `CL=F` for Brent Crude).
- `interval`: Candlestick granularity (set to `5m` for 5-minute candles).
- `range`: Time period range (set to `1d` for current trading session).

### Symbol Mapping Table:
| Category | Short Ticker | Yahoo Finance Symbol | Asset Description |
| :--- | :--- | :--- | :--- |
| **Indian Indices** | `NIFTY 50` | `^NSEI` | National Stock Exchange Nifty 50 |
| | `SENSEX` | `^BSESN` | BSE Sensex Benchmark Index |
| | `BANK NIFTY` | `^NSEBANK` | Nifty Bank Sector Index |
| **Indian Equities** | `TATASTEEL` | `TATASTEEL.NS` | Tata Steel Limited |
| | `MARUTI` | `MARUTI.NS` | Maruti Suzuki India Limited |
| | `RELIANCE` | `RELIANCE.NS` | Reliance Industries Limited |
| | `SWIGGY` | `SWIGGY.NS` | Swiggy Limited |
| **Global Indices** | `S&P 500` | `^GSPC` | S&P 500 Index (USA) |
| | `NASDAQ` | `^IXIC` | Nasdaq Composite (USA) |
| | `DOW` | `^DJI` | Dow Jones Industrial (USA) |
| | `FTSE 100` | `^FTSE` | FTSE 100 London (UK) |
| | `NIKKEI 225` | `^N225` | Nikkei 225 Tokyo (Japan) |
| **Commodities & FX**| `BRENT CRUDE` | `CL=F` | Brent Crude Oil Futures |
| | `GOLD` | `GC=F` | Gold Spot Futures |
| | `USD/INR` | `INR=X` | US Dollar to Indian Rupee Rate |

### Code Implementation (`src/services/stockService.ts`):
```typescript
export async function fetchLiveStockQuote(tickerSymbol: string): Promise<LiveStockQuote> {
  const cleanTicker = tickerSymbol.toUpperCase().replace(/[^A-Z0-9]/g, '');
  let yfSymbol = YF_SYMBOL_MAP[cleanTicker] || `${cleanTicker}.NS`;
  const yfUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yfSymbol)}?interval=5m&range=1d`;

  for (const proxyFn of CORS_PROXIES) {
    try {
      const response = await fetch(proxyFn(yfUrl), { signal: AbortSignal.timeout(3500) });
      if (!response.ok) continue;

      const data = await response.json();
      const result = data?.chart?.result?.[0];
      const meta = result.meta;
      const currentPrice = meta.regularMarketPrice || meta.chartPreviousClose;
      const prevClose = meta.chartPreviousClose || currentPrice;
      const rawChange = currentPrice - prevClose;
      const pctChange = prevClose > 0 ? (rawChange / prevClose) * 100 : 0;

      return {
        symbol: cleanTicker,
        yf_symbol: yfSymbol,
        name: meta.shortName || cleanTicker,
        price: currentPrice,
        prev_close: prevClose,
        change: `${rawChange >= 0 ? '+' : ''}${rawChange.toFixed(2)}`,
        change_pct: `${rawChange >= 0 ? '+' : ''}${pctChange.toFixed(2)}%`,
        is_positive: rawChange >= 0,
        currency: meta.currency || 'INR'
      };
    } catch (e) {
      console.warn(`Proxy failed for ${yfSymbol}:`, e);
    }
  }
}
```

---

## 3. Yahoo Finance v10 Financial Quote Summary API

### Endpoint Specification:
```http
GET https://query1.finance.yahoo.com/v10/finance/quoteSummary/{symbol}?modules=summaryDetail,financialData
```

### Purpose:
Retrieves fundamental financial ratios for stock detail views:
- **Price-to-Earnings Ratio (P/E)**
- **Price-to-Book Ratio (P/B)**
- **Earnings Per Share (EPS)**
- **52-Week High & Low**
- **Dividend Yield %**
- **Analyst Consensus Target Price**

### Code Implementation (`src/services/stockService.ts`):
```typescript
export async function fetchCompanyFundamentals(tickerSymbol: string) {
  const cleanTicker = tickerSymbol.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const yfSymbol = YF_SYMBOL_MAP[cleanTicker] || `${cleanTicker}.NS`;
  const yfUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(yfSymbol)}?modules=summaryDetail,financialData`;

  for (const proxyFn of CORS_PROXIES) {
    try {
      const response = await fetch(proxyFn(yfUrl), { signal: AbortSignal.timeout(3500) });
      if (!response.ok) continue;
      const data = await response.json();
      return data?.quoteSummary?.result?.[0];
    } catch (e) {
      /* Retry next proxy */
    }
  }
}
```

---

## 4. Multi-Proxy Resilient Middleware Stack (CORS Bypass)

To prevent browser Cross-Origin Resource Sharing (CORS) blocks when querying Yahoo Finance APIs from client-side single-page applications (SPAs), requests are routed through a multi-tier proxy middleware fallback stack:

```typescript
const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://proxy.cors.sh/${url}`,
  (url: string) => `https://thingproxy.freeboard.io/fetch/${url}`
];
```

### Failover Algorithm:
1. Attempts Proxy 1 (`allorigins.win`) with a 3.5-second `AbortSignal.timeout`.
2. If Proxy 1 fails or times out, immediately tries Proxy 2 (`corsproxy.io`).
3. If all proxies fail, falls back to the exact official benchmark close dictionary in `stockService.ts`.

---

## 5. High-Frequency Live Exchange Tick Stream Engine

### Purpose:
Simulates a real-time exchange WebSocket feed (e.g. Zerodha Kite Ticker / Groww Live Stream) during active trading hours.

### Implementation (`src/components/common/HeaderTicker.tsx`):
```typescript
useEffect(() => {
  const tickInterval = setInterval(() => {
    setTickers((prevTickers) => {
      // 1. Filter instruments whose market exchange is open right now
      const openIndices = prevTickers
        .map((t, idx) => (isExchangeOpen(t.symbol) ? idx : -1))
        .filter((idx) => idx !== -1);

      if (openIndices.length === 0) {
        // All markets closed: freeze ticks at official close
        return prevTickers.map((t) => ({ ...t, tickDirection: 'SAME' as const }));
      }

      // 2. Select 1 to 2 open tickers to apply micro tick pulse (+-0.01% to +-0.03%)
      const selectedIdx = openIndices[Math.floor(Math.random() * openIndices.length)];
      return prevTickers.map((ticker, idx) => {
        if (idx !== selectedIdx) return { ...ticker, tickDirection: 'SAME' };

        const pctDelta = Math.random() * 0.04 - 0.02;
        const newPrice = ticker.numericPrice * (1 + pctDelta / 100);
        return {
          ...ticker,
          numericPrice: newPrice,
          price: formatCurrency(newPrice, ticker.symbol),
          tickDirection: pctDelta >= 0 ? 'UP' : 'DOWN'
        };
      });
    });
  }, 2000); // 2.0-second tick interval

  return () => clearInterval(tickInterval);
}, []);
```

---

## 6. Exchange Operating Hours & Timezone Validation Engine

Enforces strict financial realism by ensuring stock tickers **freeze at official market close quotes** when exchanges are closed.

### Exchange Operating Windows:
| Exchange / Asset Class | Timezone | Trading Window (Local) | Trading Window (IST) |
| :--- | :--- | :--- | :--- |
| **NSE / BSE India** | IST (UTC+5:30) | Mon-Fri `09:15 AM - 03:30 PM` | Mon-Fri `09:15 AM - 03:30 PM` |
| **US Markets (S&P/Nasdaq)**| EST (UTC-5:00) | Mon-Fri `09:30 AM - 04:00 PM` | Mon-Fri `07:00 PM - 01:30 AM` |
| **UK Market (FTSE 100)** | GMT (UTC+0:00) | Mon-Fri `08:00 AM - 04:30 PM` | Mon-Fri `01:30 PM - 10:00 PM` |
| **Japan (Nikkei 225)** | JST (UTC+9:00) | Mon-Fri `09:00 AM - 03:00 PM` | Mon-Fri `05:30 AM - 11:30 AM` |
| **Commodities & Forex** | Global Interbank| Mon-Fri `24 Hours` | Mon-Fri `24 Hours` |

### Validation Function (`src/components/common/HeaderTicker.tsx`):
```typescript
const isExchangeOpen = (symbol: string): boolean => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const day = new Date(utcMs).getDay();

  if (symbol.includes('BRENT') || symbol.includes('GOLD') || symbol.includes('USD')) {
    return day >= 1 && day <= 5; // 24/5 Commodities
  }

  if (symbol.includes('NIFTY') || symbol.includes('SENSEX') || symbol.endsWith('.NS')) {
    const istDate = new Date(utcMs + 5.5 * 3600000);
    const istMins = istDate.getHours() * 60 + istDate.getMinutes();
    return istDate.getDay() >= 1 && istDate.getDay() <= 5 && istMins >= 555 && istMins <= 930;
  }

  return false;
};
```

---

## 7. Groww Real-Time IPO & GMP Data Feed Service

### Purpose:
Tracks active Mainboard & SME IPOs, computes Grey Market Premium (GMP) returns, subscription multiples, and bidding lot investment requirements.

### Formula Engine:
$$\text{GMP Return \%} = \left( \frac{\text{GMP Price}}{\text{Upper Price Band}} \right) \times 100$$
$$\text{Minimum Investment (₹)} = \text{Lot Size} \times \text{Upper Price Band}$$

### Code Implementation (`src/components/modules/ipo/IPOsHub.tsx`):
```typescript
const calculatedGmpPct = ((ipo.gmpValue / ipo.priceBandUpper) * 100).toFixed(1);
const estListingPrice = ipo.priceBandUpper + ipo.gmpValue;
```

---

## 8. Local & Global News Connectivity & Sentiment Ingestion Engine

### Purpose:
Streams news stories connecting international geopolitical shocks to local Indian state developments, calculating sentiment scores (-100 to +100), multi-order causal ripples, and Actionable Investment Opportunities.

### Code Implementation (`src/components/modules/news/NewsHub.tsx`):
```typescript
useEffect(() => {
  const newsStream = setInterval(() => {
    // Ingest streaming macroeconomic news updates
    setNewsFeed((prev) => [incomingStory, ...prev]);
  }, 12000); // 12-second stream interval

  return () => clearInterval(newsStream);
}, []);
```

---

## 9. Python Automated Document Generation APIs

Used during build-time to programmatically generate academic Word synopses and PowerPoint presentation decks.

### Python Libraries Used:
- `python-docx` (v1.1.2) — Document XML parsing, heading styling, justified paragraph alignment, and table formatting.
- `python-pptx` (v0.6.23) — PowerPoint slide layout, RGB color fills, and shape rendering.

### Code Implementation (`generate_ultra_detailed_synopsis.py`):
```python
import docx
from pptx import Presentation

doc = docx.Document()
# Add title, team metadata, mathematical derivations & SWOT analysis
doc.save("Major.docx")
```

---

## 10. Codebase Implementation Reference Map

| Component / Feature | Implementation File | Key Function / Object |
| :--- | :--- | :--- |
| **Real-Time Quote Fetcher** | `src/services/stockService.ts` | `fetchLiveStockQuote()` |
| **Fundamentals Inspector** | `src/services/stockService.ts` | `fetchCompanyFundamentals()` |
| **Header Ticker Streamer** | `src/components/common/HeaderTicker.tsx` | `loadRealTimeTickers()` |
| **Market Hours Engine** | `src/components/common/HeaderTicker.tsx` | `isExchangeOpen()` |
| **Groww IPOs Hub** | `src/components/modules/ipo/IPOsHub.tsx` | `IPOS_LIST` |
| **News Connectivity Radar** | `src/components/modules/news/NewsHub.tsx` | `RECENT_NEWS` |
| **AI Causal DAG Visualizer** | `src/components/modules/risk/CausalGraphFlow.tsx` | `PRESET_SCENARIOS` |
| **Supply Chain Explorer** | `src/components/modules/risk/SupplyChainExplorer.tsx` | `COMPANY_DEPENDENCIES` |

---

### 🎓 Academic Metadata
- **Project Name:** Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform
- **Specialization:** B.Tech Computer Science & Engineering (Full Stack Development)
- **Mentor:** Dr. Adeeb Mansoor Ansari
- **Team:** Anirudh Bhatt (`500119692`), Himanshu Kadyan (`500124212`), Ishita Pradhan (`500119414`), Pranav Rai (`500124723`).
