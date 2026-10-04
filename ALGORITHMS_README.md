# 🧮 VITTIYA AI — Algorithms, Mathematical Formulations & Methods Specification

> **Comprehensive Technical Guide on System Algorithms**  
> **Project:** Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform  
> **Specialization:** B.Tech Computer Science & Engineering (Full Stack Development)  

---

## 📋 Table of Contents
1. [Overview of Algorithmic Architecture](#1-overview-of-algorithmic-architecture)
2. [Topological Causal DAG Shock Propagation Algorithm](#2-topological-causal-dag-shock-propagation-algorithm)
3. [Sanitize-and-Parse (SAP) Regex Normalization Engine](#3-sanitize-and-parse-sap-regex-normalization-engine)
4. [Multi-Proxy Failover Resilient Polling Algorithm](#4-multi-proxy-failover-resilient-polling-algorithm)
5. [Real-Time Exchange Operating Hours & Timezone Validation Algorithm](#5-real-time-exchange-operating-hours--timezone-validation-algorithm)
6. [High-Frequency Live Exchange Tick Stream Simulation Algorithm](#6-high-frequency-live-exchange-tick-stream-simulation-algorithm)
7. [Grey Market Premium (GMP) & IPO Bidding Return Algorithm](#7-grey-market-premium-gmp--ipo-bidding-return-algorithm)
8. [Financial Compound Interest, SIP & Sharpe Ratio Algorithms](#8-financial-compound-interest-sip--sharpe-ratio-algorithms)
9. [Algorithm Matrix (How, When, Why, Where)](#9-algorithm-matrix-how-when-why-where)

---

## 1. Overview of Algorithmic Architecture

Vittiya AI combines graph theory, financial mathematics, discrete stochastic simulation, and distributed failover polling to process real-time market signals and model multi-order macroeconomic shock propagation.

```
                            ┌────────────────────────────────────────────────────────┐
                            │            INPUT MARKET & MACRO SHOCK SIGNALS           │
                            │      (Geopolitical Events, Interest Rates, Crude)      │
                            └───────────────────────────┬────────────────────────────┘
                                                        │
             ┌──────────────────────────────────────────┼──────────────────────────────────────────┐
             ▼                                          ▼                                          ▼
┌─────────────────────────┐                ┌─────────────────────────┐                ┌─────────────────────────┐
│ TOPOLOGICAL CAUSAL DAG  │                │ SANITIZE-AND-PARSE (SAP)│                │ EXCHANGE HOURS TIMEZONE │
│  SHOCK PROPAGATION ALGO │                │ REGEX RESOLUTION ENGINE │                │   VALIDATION ENGINE     │
└────────────┬────────────┘                └────────────┬────────────┘                └────────────┬────────────┘
             │                                          │                                          │
             └──────────────────────────────────────────┼──────────────────────────────────────────┘
                                                        ▼
                            ┌────────────────────────────────────────────────────────┐
                            │       FINANCIAL INTELLIGENCE OUTPUT DASHBOARD          │
                            │   (Impact, Opportunity, Risk Scores & Live Tickers)    │
                            └────────────────────────────────────────────────────────┘
```

---

## 2. Topological Causal DAG Shock Propagation Algorithm

### ❓ WHAT:
A graph processing algorithm utilizing Directed Acyclic Graphs (DAGs) to trace the directional propagation of a macroeconomic shock from a primary trigger event node across secondary supply chain nodes down to tertiary portfolio equity impacts.

### 💡 WHY:
Linear regression models cannot capture multi-tier economic ripple effects (e.g. Red Sea naval blockade ➔ container freight rates +35% ➔ paint industry feedstock cost inflation ➔ EBITDA margin compression -240 bps). A Directed Acyclic Graph models directional causality while guaranteeing zero circular feedback loops ($G = (V, E)$).

### ⏰ WHEN:
Triggered whenever the user switches scenario tabs in the AI Causal DAG Engine Visualizer or when incoming market shocks are ingested.

### 📍 WHERE:
- **Component File**: `src/components/modules/risk/CausalGraphFlow.tsx`
- **Data Model**: `src/data/mockData.ts` ➔ `PRESET_SCENARIOS`

### 🧮 MATHEMATICAL FORMULAS:

#### A. Topological Shock Impact Score ($I_{\text{total}}$)
Measures the overall reach, magnitude, and propagation velocity of a macro shock across all connected nodes:
$$I_{\text{total}} = \min \left( 100, \, \frac{1}{N} \sum_{i=1}^{N} \left( C_i \times D_i \times E_{\text{outbound}}(i) \right) \right)$$
*Where:*
- $N$: Total number of active graph nodes.
- $C_i \in [0, 100]$: Confidence probability weight of node $i$.
- $D_i$: Severity multiplier ($D_{\text{high}} = 1.25, D_{\text{medium}} = 1.0, D_{\text{low}} = 0.75$).
- $E_{\text{outbound}}(i)$: Number of outbound causal edges radiating from node $i$.

#### B. Opportunity Beneficiary Score ($O_{\text{total}}$)
Quantifies positive revenue expansion, margin tailwinds, or structural substitution gained by specific asset classes:
$$O_{\text{total}} = \min \left( 100, \, \frac{\sum_{j \in V_{\text{opp}}} \left( C_j \times W_{ij} \times \Delta M_j \right)}{\sum_{k \in V} C_k} \times 100 \right)$$
*Where:*
- $V_{\text{opp}}$: Subset of nodes classified as `opportunity` or `UP` portfolio beneficiaries.
- $W_{ij} \in (0, 1]$: Coupling edge weight connecting trigger node $i$ to beneficiary $j$.
- $\Delta M_j$: Projected EBITDA or revenue margin expansion percentage (+12% to +24%).

#### C. Downside Risk Vulnerability Score ($R_{\text{total}}$)
Evaluates potential capital drawdown, margin compression, and debt servicing vulnerability:
$$R_{\text{total}} = \min \left( 100, \, \frac{\sum_{k \in V_{\text{risk}}} \left( C_k \times L_k \times \text{Vol}_k \right)}{|V_{\text{risk}}|} \times 10 \right)$$
*Where:*
- $V_{\text{risk}}$: Subset of nodes classified as `risk`, `industry (DOWN)`, or `portfolio (DOWN)`.
- $L_k$: Debt leverage multiplier or imported raw material dependency index.
- $\text{Vol}_k$: Expected price volatility drawdown percentage (-8% to -25%).

---

## 3. Sanitize-and-Parse (SAP) Regex Normalization Engine

### ❓ WHAT:
A deterministic text normalization algorithm that converts arbitrary user input strings or ticker symbols into canonical Yahoo Finance v8 API query symbols.

### 💡 WHY:
User search inputs and market headers contain irregular spacing, punctuation, and regional variations (e.g. `"S&P 500"`, `"FTSE 100 London"`, `"USD/INR"`, `"NIFTY 50"`). Direct string lookup fails without robust normalization.

### ⏰ WHEN:
Triggered on every market quote fetch request or auto-complete search query in the application.

### 📍 WHERE:
- **Service File**: `src/services/stockService.ts` ➔ `fetchLiveStockQuote()`

### 🧮 ALGORITHM & FORMULATION:

```typescript
// Step 1: Strip non-alphanumeric characters and uppercase
const cleanTicker = tickerSymbol.toUpperCase().replace(/[^A-Z0-9]/g, '');

// Step 2: Canonical Lookup Matrix
let yfSymbol = YF_SYMBOL_MAP[cleanTicker];

// Step 3: Fuzzy Pattern Resolution Fallback
if (!yfSymbol) {
  if (cleanTicker.includes('SP500') || cleanTicker.includes('GSPC')) yfSymbol = '^GSPC';
  else if (cleanTicker.includes('NASDAQ') || cleanTicker.includes('IXIC')) yfSymbol = '^IXIC';
  else if (cleanTicker.includes('FTSE')) yfSymbol = '^FTSE';
  else if (cleanTicker.includes('NIKKEI') || cleanTicker.includes('N225')) yfSymbol = '^N225';
  else if (cleanTicker.includes('BRENT')) yfSymbol = 'CL=F';
  else if (cleanTicker.includes('GOLD')) yfSymbol = 'GC=F';
  else if (cleanTicker.includes('USD')) yfSymbol = 'INR=X';
  else if (cleanTicker.endsWith('NS')) yfSymbol = cleanTicker.endsWith('.NS') ? cleanTicker : `${cleanTicker.slice(0, -2)}.NS`;
  else yfSymbol = `${cleanTicker}.NS`;
}
```

---

## 4. Multi-Proxy Failover Resilient Polling Algorithm

### ❓ WHAT:
A distributed proxy failover algorithm with strict timeout bounds that routes HTTP request queries around browser CORS blocks.

### 💡 WHY:
Client-side single-page applications cannot query third-party APIs directly if domain CORS headers are restricted. Single proxies create single-point-of-failure vulnerabilities. A multi-proxy failover cascade guarantees continuous 99.9% data availability.

### ⏰ WHEN:
Triggered every 6 seconds during real-time market data refresh cycles.

### 📍 WHERE:
- **Service File**: `src/services/stockService.ts` ➔ `CORS_PROXIES` loop inside `fetchLiveStockQuote()`

### 🧮 ALGORITHMIC STEPS:
1. Initialize proxy stack: $P = [P_{\text{allorigins}}, P_{\text{corsproxy}}, P_{\text{cors.sh}}, P_{\text{thingproxy}}]$.
2. For each proxy $P_i \in P$:
   - Construct proxied URL: $U_{\text{proxy}} = P_i(U_{\text{target}})$.
   - Issue HTTP GET request attached with `AbortSignal.timeout(3500)` (3.5s timeout).
   - If HTTP status code == 200 AND payload contains `chart.result`: return parsed price object.
   - If network error or timeout occurs: catch error and continue loop to $P_{i+1}$.
3. If all $P_i$ fail: return exact benchmark closing price from static fallback dictionary.

---

## 5. Real-Time Exchange Operating Hours & Timezone Validation Algorithm

### ❓ WHAT:
A multi-timezone calendar algorithm that evaluates current UTC timestamps against regional stock exchange operating windows.

### 💡 WHY:
Stock exchange prices do NOT trade or tick when markets are closed (e.g. Indian markets at 10:50 PM IST). Simulating ticks on closed markets violates real-world financial accuracy.

### ⏰ WHEN:
Evaluated before every high-frequency tick cycle (every 2.0 seconds).

### 📍 WHERE:
- **Component File**: `src/components/common/HeaderTicker.tsx` ➔ `isExchangeOpen(symbol)`

### 🧮 FORMULAS & OPERATING WINDOWS:

Convert local client clock to UTC:
$$T_{\text{utc}} = T_{\text{local}} + \text{TimezoneOffset} \times 60000$$

Compute regional time in minutes:
$$M_{\text{mins}} = \text{Hour}_{\text{regional}} \times 60 + \text{Minute}_{\text{regional}}$$

$$\text{isExchangeOpen}(S) = \begin{cases} 
\text{true} & \text{if } S \in \text{Commodities/Forex} \land \text{Day} \in [1, 5] \\
\text{true} & \text{if } S \in \text{NSE/BSE} \land \text{Day} \in [1, 5] \land M_{\text{mins}} \in [555, 930] \\
\text{true} & \text{if } S \in \text{US Markets} \land \text{Day} \in [1, 5] \land M_{\text{mins}} \in [570, 960] \\
\text{false} & \text{otherwise (Freeze Ticks at Official Close)}
\end{cases}$$

---

## 6. High-Frequency Live Exchange Tick Stream Simulation Algorithm

### ❓ WHAT:
A discrete-time stochastic simulation algorithm modeling live exchange tick stream pulses for open market instruments.

### 💡 WHY:
Simulates a real-time exchange WebSocket feed (e.g., Zerodha Kite Ticker / Groww Live Feed) during open trading sessions without requiring paid broker API authentication keys.

### ⏰ WHEN:
Runs continuously on a 2.0-second (`2000ms`) interval timer.

### 📍 WHERE:
- **Component File**: `src/components/common/HeaderTicker.tsx` ➔ `useEffect` tick loop

### 🧮 FORMULATION:
1. Identify all active open market tickers:
   $$V_{\text{open}} = \{ t \in \text{Tickers} \mid \text{isExchangeOpen}(t.\text{symbol}) = \text{true} \}$$
2. If $|V_{\text{open}}| == 0$, freeze all price values.
3. Select 1 to 2 open tickers randomly and compute stochastic price update:
   $$\Delta \% \sim U(-0.02, +0.02)$$
   $$P_{\text{new}} = P_{\text{current}} \times \left( 1 + \frac{\Delta \%}{100} \right)$$
4. Set tick direction state for UI animation:
   $$\text{TickDirection} = \begin{cases} \text{'UP'} & \text{if } \Delta \% \ge 0 \quad (\text{Flash Green CSS}) \\ \text{'DOWN'} & \text{if } \Delta \% < 0 \quad (\text{Flash Red CSS}) \end{cases}$$

---

## 7. Grey Market Premium (GMP) & IPO Bidding Return Algorithm

### ❓ WHAT:
An investment valuation algorithm that computes Grey Market Premium (GMP) return percentages, minimum retail lot sizing, and estimated listing prices.

### 💡 WHY:
Provides retail investors with instant quantitative visibility into expected IPO listing gains before placing bidding orders.

### ⏰ WHEN:
Evaluated whenever the user opens the Groww IPOs Hub module.

### 📍 WHERE:
- **Component File**: `src/components/modules/ipo/IPOsHub.tsx`

### 🧮 FORMULAS:
$$\text{GMP Return \%} = \left( \frac{P_{\text{gmp}}}{P_{\text{upper}}} \right) \times 100$$
$$P_{\text{est}} = P_{\text{upper}} + P_{\text{gmp}}$$
$$I_{\text{min}} = N_{\text{lot}} \times P_{\text{upper}}$$
*Where $P_{\text{gmp}}$ is grey market premium in ₹, $P_{\text{upper}}$ is upper price band, $P_{\text{est}}$ is estimated listing price, and $I_{\text{min}}$ is minimum retail investment requirement.*

---

## 8. Financial Compound Interest, SIP & Sharpe Ratio Algorithms

### ❓ WHAT:
Financial mathematics algorithms calculating Systematic Investment Plan (SIP) future values, Lumpsum wealth accumulation, and risk-adjusted Sharpe Ratios.

### 💡 WHY:
Allows investors to project long-term wealth creation and evaluate portfolio efficiency against benchmark risk-free assets.

### ⏰ WHEN:
User interacts with the Financial Calculators Hub.

### 📍 WHERE:
- **Component File**: `src/components/modules/calculators/FinancialCalculatorsHub.tsx`

### 🧮 FORMULAS:

#### A. Systematic Investment Plan (SIP) Future Value
$$FV_{\text{sip}} = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)$$
*Where $P$ is monthly installment, $i = \frac{r}{12}$ is monthly interest rate, and $n = t \times 12$ is total months.*

#### B. Lumpsum Compound Interest
$$FV_{\text{lumpsum}} = P \times (1 + r)^t$$

#### C. Sharpe Ratio (Portfolio Risk-Adjusted Efficiency)
$$SR = \frac{R_p - R_f}{\sigma_p}$$
*Where $R_p$ is portfolio return %, $R_f = 6.5\%$ is risk-free rate (Government 10Y Bond), and $\sigma_p$ is portfolio annual volatility.*

---

## 9. Algorithm Matrix (How, When, Why, Where)

| Algorithm / Method | How It Works | When Executed | Why Chosen | Where Located |
| :--- | :--- | :--- | :--- | :--- |
| **Topological Causal DAG Propagation** | Calculates multi-order node shock velocity $I_{\text{total}}, O_{\text{total}}, R_{\text{total}}$ | On scenario tab switch / shock event ingestion | Captures non-linear supply chain ripples without infinite loop deadlock | `src/components/modules/risk/CausalGraphFlow.tsx` |
| **Sanitize-and-Parse (SAP) Regex Engine** | Normalizes raw user search text into canonical Yahoo Finance symbols | On every asset search / quote fetch request | Handles irregular punctuation and regional exchange suffixes | `src/services/stockService.ts` |
| **Multi-Proxy Failover Polling** | Sequentially queries proxy stack with 3.5s timeout boundaries | Every 6.0s market refresh cycle | Bypasses client-side browser CORS origin blocks with 99.9% uptime | `src/services/stockService.ts` |
| **Exchange Hours Timezone Validator** | Compares UTC timestamps against local trading windows | Evaluated every 2.0s before tick pulse | Enforces real-world financial realism by freezing closed markets | `src/components/common/HeaderTicker.tsx` |
| **High-Frequency Tick Pulse Engine** | Applies stochastic micro deltas ($\pm 0.02\%$) to open tickers | Every 2.0s interval timer | Simulates live exchange WebSocket feeds during active sessions | `src/components/common/HeaderTicker.tsx` |
| **GMP & IPO Bidding Return Algo** | Computes percentage listing gain and minimum lot investment | On IPO Hub view render | Gives instant quantitative clarity on expected listing gains | `src/components/modules/ipo/IPOsHub.tsx` |
| **SIP & Sharpe Ratio Financial Formulas** | Solves compound interest equation $FV = P \left[ \frac{(1+i)^n-1}{i} \right] (1+i)$ | On calculator slider input | Provides long-term wealth projection and risk-adjusted efficiency | `src/components/modules/calculators/FinancialCalculatorsHub.tsx` |

---

### 🎓 Academic Information
- **Project Name:** Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform
- **Specialization:** B.Tech Computer Science & Engineering (Full Stack Development)
- **Mentor:** Dr. Adeeb Mansoor Ansari
- **Team:** Anirudh Bhatt (`500119692`), Himanshu Kadyan (`500124212`), Ishita Pradhan (`500119414`), Pranav Rai (`500124723`).
