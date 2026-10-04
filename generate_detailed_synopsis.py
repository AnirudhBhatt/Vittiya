import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

def generate_exhaustive_synopsis():
    doc = docx.Document()

    # Configure 1-inch margins on all sides
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    def add_title(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(20)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x00, 0x33, 0x66)
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(14)
        return p

    def add_heading_1(text):
        p = doc.add_paragraph()
        run = p.add_run(text.upper())
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x1A, 0x1A, 0x1A)
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        return p

    def add_heading_2(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.underline = True
        run.font.color.rgb = RGBColor(0x2B, 0x2B, 0x2B)
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        return p

    def add_heading_3(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.italic = True
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        return p

    def add_body(text, bold_prefix=''):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(5)
        if bold_prefix:
            r_pre = p.add_run(bold_prefix)
            r_pre.font.name = 'Times New Roman'
            r_pre.font.size = Pt(12)
            r_pre.font.bold = True
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        return p

    def add_caption(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(11)
        r.font.italic = True
        r.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
        p.paragraph_format.space_after = Pt(6)
        return p

    # --- COVER PAGE ---
    p_top = doc.add_paragraph()
    p_top.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_top = p_top.add_run('PROJECT SYNOPSIS\nFOR MAJOR PROJECT DISSERTATION\n\n')
    r_top.font.name = 'Times New Roman'
    r_top.font.size = Pt(16)
    r_top.font.bold = True

    add_title('VITTIYA: AI-POWERED REAL-TIME FINANCIAL INTELLIGENCE, CAUSAL RISK ANALYTICS & INSTITUTIONAL MARKET TERMINAL')

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run('Submitted in partial fulfillment of the requirements for the degree of\nBACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE & ENGINEERING\n(WITH SPECIALIZATION IN ARTIFICIAL INTELLIGENCE & FINTECH)\n\nDate: August 20, 2026\n\n')
    r_sub.font.name = 'Times New Roman'
    r_sub.font.size = Pt(12)

    # Metadata Table
    tbl_meta = doc.add_table(rows=6, cols=2)
    tbl_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ('Prepared By:', 'Anirudhbhatt'),
        ('SAP ID:', '500107402'),
        ('Specialization:', 'Computer Science & Engineering (AI & FinTech)'),
        ('Academic Mentor:', 'Faculty Mentor, Department of CSE'),
        ('School / Department:', 'School of Computer Science'),
        ('University / Address:', 'UNIVERSITY OF PETROLEUM & ENERGY STUDIES (UPES)\nDehradun - 248007, Uttarakhand, India')
    ]
    for i, (k, v) in enumerate(meta_data):
        row = tbl_meta.rows[i]
        cell_k, cell_v = row.cells[0], row.cells[1]
        cell_k.text = k
        cell_v.text = v
        for cell in (cell_k, cell_v):
            for p in cell.paragraphs:
                for run in p.runs:
                    run.font.name = 'Times New Roman'
                    run.font.size = Pt(10)

    doc.add_page_break()

    # --- REVISION HISTORY ---
    add_heading_1('Revision History')
    tbl_rev = doc.add_table(rows=4, cols=4)
    tbl_rev.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ['Date', 'Version / Milestone', 'Detailed Description of Changes', 'Mentor Signature']
    for j, h in enumerate(headers):
        tbl_rev.rows[0].cells[j].text = h
    rev_rows = [
        ('10-Aug-2026', 'v1.0 - Initial Specification', 'Formulated System Requirement Specification (SRS), Causal Graph Theory, and initial architectural topology.', '[Signed]'),
        ('15-Aug-2026', 'v1.5 - Market Engine & Fixes', 'Implemented 8s Yahoo Finance REST streamer, regular expression numeric parser, and dynamic IST clock.', '[Signed]'),
        ('20-Aug-2026', 'v2.0 - Enterprise IPO & Alert Bus', 'Integrated Chittorgarh verified real-time IPO hub, Category Filter Bus, and Stock Inspector profile views.', '[Signed]')
    ]
    for i, rdata in enumerate(rev_rows):
        row = tbl_rev.rows[i+1]
        for j, val in enumerate(rdata):
            row.cells[j].text = val
    for row in tbl_rev.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                for run in p.runs:
                    run.font.name = 'Times New Roman'
                    run.font.size = Pt(10)

    add_caption('Table R.1: Project Revision History & Approval Log')
    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # --- 1. INTRODUCTION ---
    add_heading_1('1. Introduction')

    add_heading_2('1.1 Purpose of the Project')
    add_body('In modern global capital markets, retail and institutional market participants operate in an environment characterized by extreme data fragmentation, high-frequency price volatility, latent execution risks, and severe information asymmetry. Traditional retail web portals and trading terminals frequently exhibit critical vulnerabilities. These include displaying stale, delayed exchange prices, suffering from floating-point string parsing corruption bugs (for instance, JavaScript `parseFloat("24,440.05")` incorrectly truncating at commas and returning 24.0), and presenting isolated news feeds devoid of non-linear macroeconomic context.')

    add_body('When a geopolitical shock occurs—such as maritime shipping bottlenecks in the Red Sea or localized climate events in agricultural belts—retail investors lack the analytical tools required to trace how first-order commodity price spikes ripple into second-order corporate margin compression and third-order systemic equity drags. Project VITTIYA was conceived to directly address these systemic deficiencies. VITTIYA is a full-stack, enterprise-grade financial market terminal, Causal Directed Acyclic Graph (DAG) risk analytics engine, and real-time primary market (IPO) intelligence platform.')

    add_body('The core motivation behind VITTIYA is the democratization of hedge-fund grade causal risk intelligence and high-frequency analytical capabilities for retail investors, wealth managers, and quantitative strategists. By combining a resilient 8-second REST streaming engine connected to Yahoo Finance APIs, regular-expression numerical sanitization algorithms, Chittorgarh real-time verified IPO tracking with live Grey Market Premiums (GMP), and an interactive Directed Acyclic Graph simulation engine, VITTIYA establishes a novel paradigm for real-time financial decision support.')

    add_heading_2('1.2 Target Beneficiary')
    add_body('Project VITTIYA is engineered to serve four major classes of market beneficiaries across the financial ecosystem:')
    add_body('1. Active Retail Equity & Derivatives Traders: Retail participants who require verified, uncorrupted real-time price updates for indices (Nifty 50, Sensex, Bank Nifty), equities, commodities (Brent Crude, Gold), and forex (USD/INR). VITTIYA provides them with live market depth order books, interactive technical candlestick charts, and reliable tick indicators.', bold_prefix='• ')
    add_body('2. Primary Market (IPO) Applicants & Arbitrageurs: Individual and High Net-Worth (NII) investors seeking real-time subscription multipliers (QIB, NII, Retail), Grey Market Premium (GMP) expansion metrics, listing date expected returns, and official DRHP documentation links across both Mainboard and SME exchanges.', bold_prefix='• ')
    add_body('3. Portfolio Managers & Enterprise Risk Officers: Risk management professionals who require non-linear simulation tools to stress-test multi-asset portfolios against geopolitical flare-ups, energy crisis scenarios, and monetary policy rate adjustments.', bold_prefix='• ')
    add_body('4. Quantitative Financial Analysts & FinTech Academics: Researchers and data scientists who require structured sentiment scores, causal DAG propagation metrics, and multi-order economic ripple analysis for academic modeling and quantitative strategy development.', bold_prefix='• ')

    add_heading_2('1.3 Project Scope')
    add_body('The operational scope of VITTIYA encompasses five core architectural modules, delivered as a unified high-performance single-page web application:')
    add_body('a. Real-Time Market Ticker Engine: An asynchronous polling streamer executing every 8 seconds, fetching live market chart data from Yahoo Finance APIs via resilient public CORS proxies with 3500ms AbortSignal timeouts and regular-expression string sanitization.', bold_prefix='• ')
    add_body('b. Chittorgarh Verified IPO Dashboard: A comprehensive multi-tab interface categorized into Open Bidding, Closed/Listed, Upcoming, and Applied IPOs. It features real-time GMP tracking, listing gains calculations, subscription multipliers, and direct allotment checking links.', bold_prefix='• ')
    add_body('c. AI Causal Brain DAG Hub: An interactive graphical flow canvas that visualizes Directed Acyclic Graphs (DAGs) representing complex economic causality chains, enabling users to trace macro shock ripples across connected sector nodes.', bold_prefix='• ')
    add_body('d. Dynamic Stock Profile Inspector: A dedicated fundamental and technical analysis suite that dynamically builds corporate profiles, live candlestick charts, bid/ask depth order books, corporate actions, and split news feeds for any equity symbol.', bold_prefix='• ')
    add_body('e. Enterprise Alert Bus & Notification Hub: A glassmorphic popover alert center featuring category filter chips (All, Critical P1, AI Alerts, IPOs, Markets), urgency pills, sound notification toggles, and direct one-click tab navigation.', bold_prefix='• ')

    add_heading_2('1.4 References')
    add_body('1. Yahoo Finance v8 Public REST API Specification & Chart Endpoint Documentation (query1.finance.yahoo.com).')
    add_body('2. Pearl, Judea. \"Causal Inference in Statistics: A Primer.\" John Wiley & Sons, 2016.')
    add_body('3. SEBI (Securities and Exchange Board of India) Issue of Capital and Disclosure Requirements (ICDR) Regulations, 2018.')
    add_body('4. Moneycontrol Pro & Bloomberg Terminal Real-Time News & Block Deal Wire Data Protocols.')
    add_body('5. React 18 & Vite 8 Single Page Application Architecture Guidelines, Meta Open Source.')

    # --- 2. PROJECT DESCRIPTION ---
    add_heading_1('2. Project Description')

    add_heading_2('2.1 Reference Algorithm & Theoretical Foundations')
    add_body('The technical architecture of VITTIYA relies on three key theoretical and mathematical algorithmic models:')

    add_heading_3('2.1.1 Topological Sort Causal DAG Propagation Algorithm')
    add_body('To model how economic shocks propagate through interconnected markets without infinite feedback loops, VITTIYA models the market as a Directed Acyclic Graph $G = (V, E)$, where $V$ represents financial nodes (events, commodities, industries, portfolio holdings) and $E$ represents directional causal relationships. The impact score $I_u$ for any target node $u \in V$ is calculated via topological propagation:')
    add_body('I_u = \sum_{v \in Parent(u)} \Big( I_v \times W_{v \rightarrow u} \times C_v \times S_{trigger} \Big)', bold_prefix='Equation 2.1: ')
    add_body('Where $I_v$ is the incoming shock value of parent node $v$, $W_{v \rightarrow u}$ is the structural coupling weight between node $v$ and $u$, $C_v$ is the confidence probability score of the source event, and $S_{trigger}$ is the normalized magnitude of the primary macro event.')

    add_heading_3('2.1.2 Sanitize-and-Parse (SAP) Numerical Engine')
    add_body('To eliminate price distortion bugs caused by localized string formatting (e.g. commas in numerical strings), incoming API payloads are processed through a strict regular expression sanitization pipeline before IEEE 754 floating-point evaluation:')
    add_body('P_{clean} = parseFloat\Big( P_{raw}.toString().replace(/,/g, "").replace(/[^0-9.]/g, "") \Big)', bold_prefix='Equation 2.2: ')

    add_heading_3('2.1.3 Dynamic IST Market Operating Clock Algorithm')
    add_body('The Indian Standard Time (IST = UTC + 5:30) operating clock dynamically determines whether the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) are actively trading. It evaluates UTC timestamp offsets against the trading window (09:15 AM to 03:30 PM IST, Monday through Friday), automatically toggling the UI header badge between "NSE / BSE LIVE" and "NSE CLOSED (Opens 09:15 AM IST)".')

    add_heading_2('2.2 Characteristic of Data')
    add_body('VITTIYA ingests and processes four heterogeneous data streams:')
    add_body('• Real-Time Market Ticker Payload: JSON feeds containing regularMarketPrice, chartPreviousClose, regularMarketDayHigh, regularMarketDayLow, and timestamp arrays fetched from Yahoo Finance endpoint `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`.')
    add_body('• Primary Market (IPO) Datasets: Real-time verified Chittorgarh datasets including price bands, issue sizes, minimum lot investments, Grey Market Premiums (GMP), QIB/NII/Retail subscription multipliers, and listing date percentage gains.')
    add_body('• Corporate News & Macro Sentiment Feeds: Structured news payloads categorized by sentiment score (-100 to +100), impact severity (HIGH, MEDIUM, LOW), and explicit first-order, second-order, and third-order ripple impacts.')
    add_body('• Causal DAG Graph Specifications: JSON scenario objects containing node coordinates $(x, y)$, node types, confidence metrics, and edge flow labels.')

    add_heading_2('2.3 SWOT Analysis')
    add_body('A comprehensive SWOT analysis evaluating VITTIYA\'s architectural positioning is presented below:')
    add_body('• Strengths: 8-second real-time streaming, zero price distortion via regex sanitization, non-linear Causal DAG visualization, zero-dependency browser client, complete mobile responsiveness.', bold_prefix='1. ')
    add_body('• Weaknesses: Dependency on public CORS proxy availability during extreme market traffic peaks, temporary limitation of client-side REST polling vs native WebSocket sockets.', bold_prefix='2. ')
    add_body('• Opportunities: Integration with institutional broker APIs (Zerodha Kite Connect, Groww Trading API), deployment of local FinBERT transformer models for automated SEC/SEBI filing analysis.', bold_prefix='3. ')
    add_body('• Threats: Rate-limiting policies on public API endpoints, potential regulatory shifts regarding retail automated signal generation.', bold_prefix='4. ')

    add_heading_2('2.4 Project Features')
    add_body('1. Real-Time Market Ticker Strip: Live 8s streaming ticker with pulse glow indicators and IST operating clock badge.')
    add_body('2. Chittorgarh Verified IPO Hub: Multi-tab dashboard for Open, Closed, Upcoming, and Applied IPOs across Mainboard and SME segments with live GMP tracking.')
    add_body('3. AI Causal Brain Hub: Non-linear graph visualization of geopolitical, agricultural, and monetary policy shocks.')
    add_body('4. Dynamic Stock Profile Inspector: Real-time company fundamental inspector rendering live candlestick charts, order depth, corporate actions, and split news feeds.')
    add_body('5. Enterprise Alert Bus: Categorized alert center with one-click tab navigation.')

    add_heading_2('2.5 User Classes and Characteristics')
    add_body('• Class A (Retail Investors): Technical proficiency: Novice to Intermediate. Primary usage: Monitoring indices, checking IPO GMPs, and tracking portfolio asset values.')
    add_body('• Class B (Active Day Traders): Technical proficiency: Advanced. Primary usage: Real-time bid/ask market depth inspection, candlestick chart analysis, and fast execution.')
    add_body('• Class C (Risk Managers & Quantitative Strategists): Technical proficiency: Expert. Primary usage: Simulating macro shocks, evaluating DAG causal propagation, and stress-testing capital.')

    add_heading_2('2.6 Design and Implementation Constraints')
    add_body('• Bundle Size Constraint: Client JavaScript bundle minified and compressed under 1.2 MB to guarantee sub-second page loads.')
    add_body('• Network Latency Budget: REST API fetch requests bounded by a 3500ms AbortSignal timeout to prevent UI freezes.')
    add_body('• Cross-Origin Security: Implementation of dual-CORS proxy fallbacks (`api.allorigins.win`, `corsproxy.io`) to comply with browser Same-Origin Policy (SOP).')

    add_heading_2('2.7 Design Diagrams & System Architecture')
    add_body('The system architecture is modeled using standardized UML diagrams including Use-Case Diagrams (Level 1 & Level 2), Class Diagrams, Activity Diagrams, Sequence Diagrams, Data Flow Diagrams (DFD Level 0 & Level 1), State Diagrams, Component Diagrams, and Deployment Diagrams.')

    add_heading_2('2.8 Assumptions and Dependencies')
    add_body('Assumes continuous internet connectivity for REST API polling, WebGL/HTML5 Canvas support in the user\'s browser, and standard browser LocalStorage availability.')

    # --- 3. SYSTEM REQUIREMENTS ---
    add_heading_1('3. System Requirements')

    add_heading_2('3.1 User Interface')
    add_body('Responsive glassmorphism dark/light UI built with Tailwind CSS v3, custom SVG brand identity, and Lucide vector iconography.')

    add_heading_2('3.2 Software Interface')
    add_body('React 18 client architecture, Vite 8 build engine, TypeScript 5 static type system, and Leaflet GIS mapping.')

    add_heading_2('3.3 Database Interface')
    add_body('Client-side persistent React state store, LocalStorage caching layer, and RESTful JSON payload structures.')

    add_heading_2('3.4 Protocols')
    add_body('HTTPS / TLS 1.3 encryption over HTTP/2, RESTful JSON polling stream controllers.')

    # --- 4. NON-FUNCTIONAL REQUIREMENTS ---
    add_heading_1('4. Non-Functional Requirements')

    add_heading_2('4.1 Performance Requirements')
    add_body('Production build compilation time under 600ms, sub-100ms UI interaction response, 8-second ticker polling cycle.')

    add_heading_2('4.2 Security Requirements')
    add_body('XSS sanitization, strict CORS proxy fallback isolation, zero hardcoded API keys.')

    add_heading_2('4.3 Software Quality Attributes')
    add_body('High availability (fallback baseline quotes), maintainability (Domain-Driven Enterprise directory layout), modularity, and cross-browser portability.')

    # --- 5. OTHER REQUIREMENTS & FUTURE WORK PROSPECTS ---
    add_heading_1('5. Other Requirements & Future Work Prospects')

    add_heading_2('5.1 Compliance & Regulatory Alignment')
    add_body('Full alignment with SEBI ICDR guidelines, data privacy standards, and financial disclosure norm compliance.')

    add_heading_2('5.2 Comprehensive Future Engineering Roadmap')
    add_body('To extend VITTIYA into a globally dominant financial intelligence platform, the following five-phase engineering roadmap is established for future work:')

    add_heading_3('Phase I: Institutional Brokerage API Integration & Direct Order Routing')
    add_body('Future iterations will integrate native OAuth 2.0 broker APIs (Zerodha Kite Connect WebSocket API, Groww Trading API, AngelOne SmartAPI, Upstox Developer API). This will enable automated one-click order execution directly from the Causal Brain Hub, allowing users to execute risk-hedging trades with automated bracket orders and stop-loss trailing parameters.')

    add_heading_3('Phase II: Fine-Tuned LLM & Transformer Financial Sentiment Pipeline')
    add_body('Deployment of a domain-specific Large Language Model (FinBERT / Llama-3-70B-Instruct fine-tuned on SEC 10-K, 10-Q filings, SEBI corporate disclosures, and earnings call transcripts). The model will automatically parse un-structured corporate disclosures in real-time, generate automated sentiment scores, and update the causal DAG graph edges dynamically.')

    add_heading_3('Phase III: Reinforcement Learning (RL) Portfolio Shock Optimizer')
    add_body('Implementation of Proximal Policy Optimization (PPO) and Deep Q-Learning algorithms trained on 20 years of historical market crash data (2008 Financial Crisis, 2020 COVID Shock, 2022 Inflation Spike). The RL agent will recommend dynamic asset reallocation strategies during high-volatility regime shifts.')

    add_heading_3('Phase IV: Sub-Millisecond Distributed WebSocket Infrastructure')
    add_body('Migration from client-side REST polling to a distributed backend streaming architecture powered by Apache Kafka, Redis Pub/Sub, and Go-based WebSocket gateways. This will lower market data tick delivery latency from 8000ms to sub-100ms directly from exchange co-location servers.')

    add_heading_3('Phase V: Cross-Border Regulatory & ESG Intelligence Module')
    add_body('Integration of Corporate Sustainability Reporting Directive (CSRD) and ESG risk scoring modules, allowing institutional asset managers to evaluate carbon credit exposure, supply chain labor risks, and cross-border regulatory compliance.')

    # --- APPENDICES ---
    add_heading_1('Appendix A: Glossary')
    add_body('• GMP (Grey Market Premium): Off-market trading premium indicating estimated listing gains prior to official stock exchange listing.')
    add_body('• QIB (Qualified Institutional Buyer): Institutional bidding category in IPOs comprising mutual funds, banks, and FIIs.')
    add_body('• NII (Non-Institutional Investor): High Net-Worth Individual (HNI) bidding category applying for IPO shares exceeding ₹2 Lakhs.')
    add_body('• DAG (Directed Acyclic Graph): A graph structure consisting of nodes and directed edges with no closed loops, used to model causal dependency chains.')
    add_body('• PCR (Put-Call Ratio): Derivatives indicator calculated by dividing total open interest of Put options by Call options.')
    add_body('• GRM (Gross Refining Margin): The difference between the total value of refined petroleum products and the raw cost of crude oil.')

    add_heading_1('Appendix B: Analysis Model')
    add_body('Detailed data dictionary schemas, entity-relationship specifications, and component interface models defining system boundaries.')

    add_heading_1('Appendix C: Issues List')
    add_body('Active dynamic issue tracking log monitoring public CORS proxy response latencies during peak global market trading hours.')

    # Save documents
    doc.save('/Users/anirudhbhatt/Major Project/Project Synopsis Template.docx')
    doc.save('/Users/anirudhbhatt/Major Project/Vittiya_Project_Synopsis_Completed.docx')
    print('SUCCESSFULLY GENERATED EXHAUSTIVE Project Synopsis Template.docx')

generate_exhaustive_synopsis()
