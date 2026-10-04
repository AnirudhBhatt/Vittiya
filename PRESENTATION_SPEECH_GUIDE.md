# 🎤 VITTIYA AI — TEAM PRESENTATION SCRIPT & ORAL SPEECH GUIDE

> **Seminar & Synopsis Evaluation Presentation Script**  
> **Project:** Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform  
> **Specialization:** B.Tech Computer Science & Engineering (Full Stack Development)  
> **Mentor:** Dr. Adeeb Mansoor Ansari  

---

## 👥 Team Speaker Division Matrix

| Speaker Name | SAP ID | Specialization & Role | Assigned Presentation Slides |
| :--- | :--- | :--- | :--- |
| **Speaker 1: Anirudh Bhatt (ME)** | `500119692` | Core System Architect & Team Lead | **Slides 1, 2, 3, 4, 12** (Title, Abstract, Problem Statement, Conclusion & Future Work) |
| **Speaker 2: Himanshu Kadyan** | `500124212` | Full-Stack & Market Data Engineer | **Slides 5, 6, 7, 15** (Objectives, Methodology, Tech Stack, Flowchart Diagram) |
| **Speaker 3: Ishita Pradhan** | `500119414` | UI/UX & Groww Design System Engineer | **Slides 8, 9, 16** (Screenshots Gallery, PERT Timeline Chart & Schedule) |
| **Speaker 4: Pranav Rai** | `500124723` | Data Analytics & Risk Modeling Engineer | **Slides 10, 11, 13** (Black-Box Testing, Performance Discussion, References & Q&A) |

---

## 📢 SLIDE-BY-SLIDE ORAL SCRIPT & TECHNICAL HIGHLIGHTS

---

### 🎙️ SPEAKER 1: ANIRUDH BHATT (ME)
*Assignee: Slides 1, 2, 3, 4 & 12*

#### **SLIDE 1 & 2: Title Slide & Team Introduction**
- **Oral Speech Script**:
  > *"Good morning respected mentor Dr. Adeeb Mansoor Ansari sir and honorable members of the evaluation committee. I am Anirudh Bhatt, representing team 4 alongside my teammates Himanshu Kadyan, Ishita Pradhan, and Pranav Rai from B.Tech Computer Science & Engineering specializing in Full Stack Development.*
  >
  > *Today, we are honored to present our Major Project titled **'VITTIYA: AI-Powered Real-Time Financial Intelligence, Causal Risk Analytics & Institutional Market Terminal'**."*

- **Technical Highlights to Mention**:
  - Emphasize that our specialization is **Full Stack Development**.
  - Frame **Vittiya AI** as an enterprise-grade financial terminal bridging front-end user interfaces, real-time data streaming, and non-linear risk modeling.

---

#### **SLIDE 3: Abstract & Core System Innovation**
- **Oral Speech Script**:
  > *"To provide a high-level overview: VITTIYA is a full-stack, high-frequency financial market terminal that unifies three core capabilities—real-time exchange streaming, Directed Acyclic Graph (DAG) causal risk analytics, and Chittorgarh-verified IPO tracking.*
  >
  > *Existing financial portals suffer from data latency, price string distortion, and linear risk screeners. VITTIYA overcomes these vulnerabilities by engineering an 8-second REST streaming pipeline, a regex string sanitization engine, live Grey Market Premium tracking, and non-linear graph risk propagation.*
  >
  > *Our system serves four distinct beneficiary classes: active retail traders, IPO applicants, enterprise risk officers, and quantitative financial analysts."*

- **Technical Highlights to Mention**:
  - 8-second REST API streaming frequency.
  - Non-linear graph propagation vs linear stock screeners.
  - Four beneficiary classes.

---

#### **SLIDE 4: Problem Statement & Market Vulnerabilities**
- **Oral Speech Script**:
  > *"Why did we build VITTIYA? Retail market participants currently face three critical systemic vulnerabilities:*
  >
  > *First, **Data Latency & Stale Feeds**: Free retail tools rely on 15-minute delayed updates or fragile web scraping, forcing traders to make capital decisions on obsolete data.*
  >
  > *Second, **The Price Distortion Bug**: A widespread JavaScript parsing flaw occurs when price strings containing formatting commas (such as `'24,440.05'`) are processed by `parseFloat()`. The parser truncates at the comma, returning `24.0` instead of `24440.05`! Secondary multipliers then distort the Nifty 50 index to corrupted values like `249.96`.*
  >
  > *Third, **Absence of Non-Linear Causal Risk Analytics**: Traditional tools evaluate stocks in isolated silos. When a geopolitical shock occurs—such as a Red Sea naval conflict—investors cannot visualize how commodity price spikes ripple into corporate margin compression and equity drawdowns.*
  >
  > *VITTIYA directly solves all three vulnerabilities."*

- **Technical Highlights to Mention**:
  - Explain the `parseFloat("24,440.05")` comma truncation bug clearly.
  - Contrast linear stock screeners with non-linear causal graph networks.

---

### 🎙️ SPEAKER 2: HIMANSHU KADYAN
*Assignee: Slides 5, 6, 7 & 15 (Methodology & Flowchart)*

#### **SLIDE 5: Project Objectives**
- **Oral Speech Script**:
  > *"Thank you Anirudh. I am Himanshu Kadyan, and I will walk you through our technical objectives and methodology.*
  >
  > *Our primary engineering objectives were:
  > 1. To deliver real-time, uncorrupted market data for Indian indices (Nifty 50, Sensex, Bank Nifty), global indices (S&P 500, Nasdaq, FTSE 100), commodities, and FX pairs.
  > 2. To build the Sanitize-and-Parse (SAP) Regex Engine to eliminate floating-point string distortion bugs.
  > 3. To model macroeconomic shocks using Directed Acyclic Graphs (DAGs) to trace multi-order ripples.
  > 4. To integrate a verified Chittorgarh IPO Hub with live Grey Market Premium (GMP) listing returns."*

---

#### **SLIDE 6 & 15: Methodology & System Architecture Flowchart**
- **Oral Speech Script (Pointing to Figure 1.1 Flowchart)**:
  > *"As shown in our System Methodology Flowchart on Slide 15, VITTIYA executes across six integrated engineering stages:*
  >
  > *Stage 1 is our **Real-Time Market Streamer**, executing asynchronous polling every 8 seconds from Yahoo Finance REST APIs via a resilient multi-proxy stack with 3500ms AbortSignal timeouts.*
  >
  > *Stage 2 is the **SAP Numerical Sanitization Pipeline**, executing regular expression replace operations `replace(/,/g, '')` before IEEE 754 float conversion.*
  >
  > *Stage 3 is the **Chittorgarh IPO Integration Hub**, tracking Open, Closed, Upcoming, and Applied IPOs with listing return formulas: $R_{\text{listing}} = (\text{GMP} / P_{\text{upper}}) \times 100\%$.*
  >
  > *Stage 4 is **Causal DAG Propagation**, using topological sort algorithms $G = (V, E)$ to calculate Impact, Opportunity, and Risk scores.*
  >
  > *Stage 5 & 6 are the **Stock Profile Inspector** and **Enterprise Alert Bus** for dynamic candlestick charting and glassmorphic notifications."*

- **Technical Highlights to Mention**:
  - Explain 3500ms AbortSignal timeout logic for proxy failovers.
  - Mention $O(V+E)$ topological sort graph complexity.

---

#### **SLIDE 7: Tools & Technologies**
- **Oral Speech Script**:
  > *"Our technology stack was selected for maximum performance and type safety:
  > - **Frontend**: React 18 with TypeScript 5 for robust type-safe state management.
  > - **Build System**: Vite 8 delivering sub-600ms production builds.
  > - **Styling**: Tailwind CSS v3 with glassmorphism design tokens.
  > - **Proxy Stack**: Dual-proxy middleware (`allorigins.win`, `corsproxy.io`) to bypass browser CORS origin boundaries."*

---

### 🎙️ SPEAKER 3: ISHITA PRADHAN
*Assignee: Slides 8, 9 & 16 (Screenshots, PERT Chart & Timelines)*

#### **SLIDE 8: User Interface Screenshots & Module Showcase**
- **Oral Speech Script**:
  > *"Thank you Himanshu. I am Ishita Pradhan, and I will present the user interface and project schedule governance.*
  >
  > *On Slide 8, you can see high-definition screenshots of our actual running web application:
  > - **Figure 8.1: Master Executive Dashboard**: Features our top ticker strip with green/red flash animations, live market depth, and global risk heatmaps.
  > - **Figure 8.2: AI Causal DAG Engine**: Displays our interactive node canvas where trigger events radiate into commodity, industry, and portfolio nodes."*

---

#### **SLIDE 9 & 16: PERT Network Chart & Critical Path Analysis**
- **Oral Speech Script (Pointing to PERT Network Chart)**:
  > *"On Slide 16, we present our PERT Network Chart and Schedule Analysis. We used Three-Point Time Estimation $T_e = (a + 4m + b) / 6$ across 8 core engineering tasks.*
  >
  > *As highlighted in green on our PERT chart, our **Critical Path** consists of:
  > - **Milestone 01 ➔ 02**: Task A (Requirements & Scope — 2 Wks)
  > - **Milestone 02 ➔ 05**: Task B & C (API Setup & SAP Regex Engine — 3.5 Wks)
  > - **Milestone 05 ➔ 06**: Task E & G (AI Causal DAG Engine & Alert Bus — 4.5 Wks)
  > - **Milestone 06 ➔ 07**: Task H (Integration, Testing & Deployment — 2 Wks)*
  >
  > *This yields a total governing critical path project duration of **10.91 Weeks (~11 Weeks)**. Parallel tasks D and F possess slack buffer time and do not delay final delivery."*

- **Technical Highlights to Mention**:
  - Milestone nodes 01 through 07.
  - Explain why Slack = 0.0 Weeks on the Critical Path.

---

### 🎙️ SPEAKER 4: PRANAV RAI
*Assignee: Slides 10, 11 & 13 (Testing, Performance & References)*

#### **SLIDE 10: Testing Methodology & Black-Box Results**
- **Oral Speech Script**:
  > *"Thank you Ishita. I am Pranav Rai, and I will cover our testing results, performance metrics, and conclusions.*
  >
  > *We subjected VITTIYA to comprehensive Black-Box Testing across 112 formal test cases covering string sanitization, ticker updates, DAG topological propagation, IPO calculations, and alert triggers.*
  >
  > *As shown in Table 1, we achieved a **100% Pass Rate** across all 112 test cases with zero software failures."*

---

#### **SLIDE 11: Performance Discussion & Benchmark Metrics**
- **Oral Speech Script**:
  > *"Regarding performance metrics:
  > - **Market Ticker**: Achieves sub-100ms UI interaction response time and an 8-second streaming refresh cycle.
  > - **Exchange Hours Engine**: Automatically validates Indian Standard Time (IST 09:15 AM - 03:30 PM) to freeze closed markets at official settlement quotes.
  > - **Causal DAG Engine**: Executes $O(V+E)$ topological graph sorting to instantly compute Impact, Opportunity, and Risk scores."*

---

#### **SLIDE 12 (Re-Handshake to Team Lead Anirudh for Conclusion)**
- **Speaker 1 (Anirudh)**:
  > *"To conclude: VITTIYA successfully unifies real-time streaming, regex price sanitization, non-linear risk modeling, and IPO tracking into a single enterprise terminal. 
  >
  > Our future roadmap includes Phase I institutional broker API trading integration, Phase II fine-tuned FinBERT LLM sentiment scoring, and Phase III reinforcement learning portfolio optimization.
  >
  > Thank you sir. We are now open for Q&A questions."*

---

## ❓ ANTICIPATED EVALUATOR Q&A QUESTIONS & MODEL ANSWERS

### **Q1: How do you bypass browser CORS restrictions when fetching Yahoo Finance REST APIs?**
- **Model Answer (Himanshu)**:
  > *"We engineered a multi-tier proxy middleware fallback stack using public CORS proxies like `api.allorigins.win` and `corsproxy.io`. Each request is attached with an `AbortSignal.timeout(3500ms)`. If Proxy 1 fails or times out, the system automatically fails over to Proxy 2, ensuring 99.9% uptime without breaking browser Same-Origin Policy."*

### **Q2: What is the exact price distortion bug and how does your SAP engine fix it?**
- **Model Answer (Anirudh / Himanshu)**:
  > *"Standard JavaScript `parseFloat('24,440.05')` encounters a comma delimiter and truncates parsing at index 2, returning `24.0`. Downside multipliers then jump Nifty 50 to corrupted values like `249.96`. Our Sanitize-and-Parse (SAP) engine executes `replace(/,/g, '')` regex sanitization before float evaluation, guaranteeing zero price distortion."*

### **Q3: What algorithm is used to calculate the Causal DAG Risk Score?**
- **Model Answer (Pranav)**:
  > *"We model the financial network as a Directed Acyclic Graph $G = (V, E)$ and run an $O(V+E)$ topological sort traversal. The Downside Risk Score is computed using:*
  > $$R_{\text{total}} = \min \left( 100, \, \frac{\sum_{k \in V_{\text{risk}}} \left( C_k \times L_k \times \text{Vol}_k \right)}{|V_{\text{risk}}|} \times 10 \right)$$
  > *Where $C_k$ is node confidence, $L_k$ is debt leverage/feedstock dependency, and $\text{Vol}_k$ is drawdown volatility."*

### **Q4: Why does your PERT chart show a project duration of 11 weeks?**
- **Model Answer (Ishita)**:
  > *"We used PERT Three-Point Estimation $T_e = (a + 4m + b) / 6$. Summing expected durations along our Critical Path (Tasks A ➔ B ➔ C ➔ E ➔ H) yields $2.0 + 2.17 + 1.5 + 3.17 + 2.07 = 10.91$ weeks (~11 Weeks)."*
