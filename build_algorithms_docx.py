import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=120, bottom=120, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x00, 0x20, 0x60) # Deep Navy
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.underline = True
    run.font.color.rgb = RGBColor(0x00, 0x40, 0x80)
    return p

def add_body_p(doc, text, bold_prefix="", italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(6)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(12)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(0x1F, 0x29, 0x37)

    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.italic = italic
    run.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    return p

def add_formula_box(doc, title, formula_text, variable_desc=""):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "F0F4F8")
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(4)
    r_t = p.add_run(f"FORMULA: {title}\n")
    r_t.font.name = 'Times New Roman'
    r_t.font.size = Pt(11)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(0x00, 0x20, 0x60)
    
    p_f = cell.add_paragraph()
    p_f.paragraph_format.space_after = Pt(4)
    p_f.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_f = p_f.add_run(formula_text)
    r_f.font.name = 'Courier New'
    r_f.font.size = Pt(12)
    r_f.font.bold = True
    r_f.font.color.rgb = RGBColor(0x00, 0x52, 0xCC)
    
    if variable_desc:
        p_v = cell.add_paragraph()
        p_v.paragraph_format.space_after = Pt(0)
        r_v = p_v.add_run(f"Where: {variable_desc}")
        r_v.font.name = 'Times New Roman'
        r_v.font.size = Pt(10.5)
        r_v.font.italic = True
        r_v.font.color.rgb = RGBColor(0x4A, 0x55, 0x68)

    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def build_docx():
    doc = docx.Document()
    
    # Page Margins
    for sec in doc.sections:
        sec.top_margin = Inches(1.0)
        sec.bottom_margin = Inches(1.0)
        sec.left_margin = Inches(1.0)
        sec.right_margin = Inches(1.0)
        
    # Title Page / Header Block
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run("VITTIYA AI — ALGORITHMIC SPECIFICATION & MATHEMATICAL FORMULATIONS DOCUMENT")
    r_title.font.name = 'Times New Roman'
    r_title.font.size = Pt(18)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(0x00, 0x20, 0x60)
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(16)
    r_sub = p_sub.add_run("A Comprehensive Mathematical & Algorithmic Analysis of Macroeconomic Causal DAG Propagation, Real-Time Market Streaming, and Financial Valuation Systems")
    r_sub.font.name = 'Times New Roman'
    r_sub.font.size = Pt(12)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    
    # Metadata Table
    tbl_meta = doc.add_table(rows=5, cols=2)
    tbl_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Project Title:", "Vittiya AI — Macroeconomic Causal DAG Engine & Financial Intelligence Platform"),
        ("Program & Specialization:", "B.Tech Computer Science & Engineering (Full Stack Development)"),
        ("Department:", "Department of Computer Science & Engineering"),
        ("Faculty Mentor:", "Dr. Adeeb Mansoor Ansari"),
        ("Student Team Members:", "Anirudh Bhatt (500119692), Himanshu Kadyan (500124212), Ishita Pradhan (500119414), Pranav Rai (500124723)")
    ]
    for idx, (label, val) in enumerate(meta_data):
        cell_l = tbl_meta.cell(idx, 0)
        cell_r = tbl_meta.cell(idx, 1)
        set_cell_background(cell_l, "F0F4F8")
        set_cell_background(cell_r, "FFFFFF")
        set_cell_margins(cell_l, top=80, bottom=80, left=120, right=120)
        set_cell_margins(cell_r, top=80, bottom=80, left=120, right=120)
        
        p_l = cell_l.paragraphs[0]
        r_l = p_l.add_run(label)
        r_l.font.name = 'Times New Roman'
        r_l.font.size = Pt(10.5)
        r_l.font.bold = True
        
        p_r = cell_r.paragraphs[0]
        r_r = p_r.add_run(val)
        r_r.font.name = 'Times New Roman'
        r_r.font.size = Pt(10.5)
        
    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 1. EXECUTIVE SUMMARY
    add_heading_1(doc, "1. EXECUTIVE SUMMARY & ALGORITHMIC ARCHITECTURE")
    add_body_p(doc, "Modern financial decision-making requires modeling complex, multi-order macroeconomic shockwaves. Traditional quantitative platforms evaluate asset price movements in isolated silos, ignoring second-order supply chain bottlenecks and third-order corporate margin compressions. Vittiya AI resolves this challenge by synthesizing graph theory, stochastic time-series simulation, fuzzy regex pattern resolution, and financial valuation formulas into a unified real-time execution engine.")
    
    # 2. TOPOLOGICAL CAUSAL DAG SHOCK PROPAGATION ALGORITHM
    add_heading_1(doc, "2. TOPOLOGICAL CAUSAL DAG SHOCK PROPAGATION ALGORITHM")
    add_body_p(doc, "A graph processing algorithm utilizing Directed Acyclic Graphs (DAGs) G = (V, E) to trace directional macroeconomic shock propagation from a primary trigger event node across multi-tier supplier dependency nodes down to retail portfolio equity holdings.", "Algorithm Definition: ")
    add_body_p(doc, "Linear regression models fail to model non-linear supply chain ripples. Directed Acyclic Graphs allow modeling exact causal dependency paths while guaranteeing zero circular feedback loops.", "Why Chosen: ")
    add_body_p(doc, "Executed whenever an investor switches scenario tabs in the AI Causal DAG Engine Visualizer or when incoming geopolitical shock events are ingested.", "When Executed: ")
    add_body_p(doc, "src/components/modules/risk/CausalGraphFlow.tsx and src/data/mockData.ts (PRESET_SCENARIOS).", "Code Location: ")
    
    add_heading_2(doc, "2.1 Mathematical Formulas & Score Derivations")
    
    add_formula_box(doc, "Macro Impact Score (I_total)",
                    "I_total = Min( 100, (1 / N) * Σ [ C_i * D_i * E_outbound(i) ] )",
                    "N = total active nodes, C_i = node confidence %, D_i = shock severity weight (High=1.25, Med=1.0, Low=0.75), E_outbound(i) = outbound edge count.")
    
    add_formula_box(doc, "Opportunity Beneficiary Score (O_total)",
                    "O_total = Min( 100, ( Σ [ C_j * W_ij * ΔM_j ] / Σ C_k ) * 100 )",
                    "V_opp = beneficiary nodes, W_ij = structural coupling weight (0 to 1], ΔM_j = projected EBITDA margin expansion %.")
    
    add_formula_box(doc, "Downside Risk Vulnerability Score (R_total)",
                    "R_total = Min( 100, ( Σ [ C_k * L_k * Vol_k ] / |V_risk| ) * 10 )",
                    "V_risk = vulnerable nodes, L_k = leverage/feedstock dependency factor, Vol_k = price volatility drawdown %.")

    # 3. SANITIZE-AND-PARSE (SAP) REGEX NORMALIZATION ENGINE
    add_heading_1(doc, "3. SANITIZE-AND-PARSE (SAP) REGEX NORMALIZATION ENGINE")
    add_body_p(doc, "A deterministic text normalization algorithm that converts arbitrary user input strings or ticker search queries into canonical Yahoo Finance v8 API query symbols.", "Algorithm Definition: ")
    add_body_p(doc, "User search inputs contain irregular spacing, punctuation, and regional exchange variations ('S&P 500', 'FTSE 100 London', 'USD/INR'). Direct string matching fails without regex sanitization.", "Why Chosen: ")
    add_body_p(doc, "Triggered on every market quote fetch request or auto-complete search query.", "When Executed: ")
    add_body_p(doc, "src/services/stockService.ts -> fetchLiveStockQuote()", "Code Location: ")
    
    add_formula_box(doc, "Sanitize-and-Parse (SAP) Resolution Matrix",
                    "CleanKey(S) = RegexReplace( S, '[^A-Z0-9]', '' )\nS_yf = MAP[CleanKey(S)] if CleanKey(S) in MAP else ( S if '^' in S or '=' in S else S_base + '.NS' )",
                    "CleanKey(S) = uppercase alphanumeric string, MAP = canonical symbol lookup dictionary, .NS = National Stock Exchange India suffix.")

    # 4. MULTI-PROXY FAILOVER POLLING ALGORITHM
    add_heading_1(doc, "4. MULTI-PROXY FAILOVER RESILIENT POLLING ALGORITHM")
    add_body_p(doc, "A distributed proxy failover algorithm with strict timeout boundaries that routes HTTP queries around browser Cross-Origin Resource Sharing (CORS) security restrictions.", "Algorithm Definition: ")
    add_body_p(doc, "Browser single-page apps cannot query third-party domains directly if CORS headers are restricted. Single proxies create single-point-of-failure outages. A multi-proxy cascade guarantees 99.9% uptime.", "Why Chosen: ")
    add_body_p(doc, "Executed every 6.0 seconds during real-time market data refresh cycles.", "When Executed: ")
    add_body_p(doc, "src/services/stockService.ts -> CORS_PROXIES loop", "Code Location: ")
    
    add_formula_box(doc, "Proxy Sequential Failover Sequence",
                    "P = [ P_allorigins, P_corsproxy, P_cors.sh, P_thingproxy ]\nFor each P_i in P: Response = Fetch( P_i(Url), Timeout=3500ms ); If Status==200 return Data; Else Retry Next",
                    "P_i = proxy middleware wrapper function, Timeout = 3.5-second AbortSignal deadline.")

    # 5. REAL-TIME EXCHANGE OPERATING HOURS ALGORITHM
    add_heading_1(doc, "5. REAL-TIME EXCHANGE OPERATING HOURS & TIMEZONE VALIDATION ALGORITHM")
    add_body_p(doc, "A multi-timezone calendar algorithm evaluating UTC timestamps against regional stock exchange operating windows.", "Algorithm Definition: ")
    add_body_p(doc, "Stock exchange prices do NOT trade or tick when markets are closed (e.g., Indian markets at 10:50 PM IST). Ticking closed markets violates real-world financial accuracy.", "Why Chosen: ")
    add_body_p(doc, "Evaluated before every high-frequency tick pulse cycle (every 2.0 seconds).", "When Executed: ")
    add_body_p(doc, "src/components/common/HeaderTicker.tsx -> isExchangeOpen(symbol)", "Code Location: ")
    
    add_formula_box(doc, "Exchange Operating Window Evaluator",
                    "T_utc = T_local + TimezoneOffset * 60000\nM_mins = Hour_regional * 60 + Minute_regional\nisOpen(S) = true IF Day in [1..5] AND M_mins in [M_start, M_end] ELSE false",
                    "NSE/BSE IST: M_mins in [555, 930] (09:15-15:30 IST); US EST: M_mins in [570, 960] (09:30-16:00 EST); Commodities: 24/5.")

    # 6. HIGH-FREQUENCY TICK STREAM SIMULATION ALGORITHM
    add_heading_1(doc, "6. HIGH-FREQUENCY LIVE EXCHANGE TICK STREAM SIMULATION ALGORITHM")
    add_body_p(doc, "A discrete-time stochastic simulation algorithm modeling live exchange tick stream pulses for open market instruments.", "Algorithm Definition: ")
    add_body_p(doc, "Simulates a real-time exchange WebSocket feed (Zerodha Kite Ticker / Groww Live Feed) during open trading sessions without requiring paid broker API authentication keys.", "Why Chosen: ")
    add_body_p(doc, "Runs continuously on a 2.0-second (2000ms) interval timer during active market hours.", "When Executed: ")
    add_body_p(doc, "src/components/common/HeaderTicker.tsx -> useEffect tick loop", "Code Location: ")
    
    add_formula_box(doc, "Stochastic Micro-Price Delta & Visual State",
                    "Δ% ~ Uniform(-0.02, +0.02)\nP_new = P_current * ( 1 + Δ% / 100 )\nTickDirection = 'UP' IF Δ% >= 0 (Flash Green) ELSE 'DOWN' (Flash Red)",
                    "Δ% = random price movement percentage, P_new = updated price, TickDirection = UI flash animation trigger.")

    # 7. GREY MARKET PREMIUM (GMP) & IPO BIDDING RETURN ALGORITHMS
    add_heading_1(doc, "7. GREY MARKET PREMIUM (GMP) & IPO BIDDING RETURN ALGORITHMS")
    add_body_p(doc, "An investment valuation algorithm computing Grey Market Premium (GMP) return percentages, minimum retail lot sizing, and estimated listing price gains.", "Algorithm Definition: ")
    add_body_p(doc, "Provides retail investors with instant quantitative visibility into expected IPO listing gains before placing bidding orders.", "Why Chosen: ")
    add_body_p(doc, "Evaluated whenever the user opens the Groww IPOs Hub module.", "When Executed: ")
    add_body_p(doc, "src/components/modules/ipo/IPOsHub.tsx", "Code Location: ")
    
    add_formula_box(doc, "Grey Market Premium (GMP) Return Percentage",
                    "R_gmp = ( P_gmp / P_upper ) * 100",
                    "R_gmp = percentage listing gain %, P_gmp = raw grey market premium in ₹, P_upper = upper price band cap.")
    
    add_formula_box(doc, "Estimated Listing Price & Minimum Lot Investment",
                    "P_est = P_upper + P_gmp\nI_min = N_lot * P_upper",
                    "P_est = projected listing day price, I_min = minimum retail investment in ₹, N_lot = share lot size.")

    # 8. FINANCIAL COMPOUND INTEREST, SIP & SHARPE RATIO ALGORITHMS
    add_heading_1(doc, "8. FINANCIAL COMPOUND INTEREST, SIP & SHARPE RATIO ALGORITHMS")
    add_body_p(doc, "Financial mathematics algorithms calculating Systematic Investment Plan (SIP) future values, Lumpsum wealth accumulation, and risk-adjusted Sharpe Ratios.", "Algorithm Definition: ")
    add_body_p(doc, "Allows investors to project long-term wealth creation and evaluate portfolio efficiency against benchmark risk-free assets.", "Why Chosen: ")
    add_body_p(doc, "Evaluated dynamically as the user moves financial calculator sliders.", "When Executed: ")
    add_body_p(doc, "src/components/modules/calculators/FinancialCalculatorsHub.tsx", "Code Location: ")
    
    add_formula_box(doc, "Systematic Investment Plan (SIP) Future Value",
                    "FV_sip = P * [ ((1 + i)^n - 1) / i ] * (1 + i)",
                    "P = monthly installment in ₹, i = r / 12 (monthly interest rate), n = t * 12 (total investment months).")
    
    add_formula_box(doc, "Portfolio Risk-Adjusted Sharpe Ratio",
                    "SR = ( R_p - R_f ) / σ_p",
                    "R_p = portfolio annual return %, R_f = risk-free benchmark rate (6.5% Govt Bond), σ_p = annual portfolio volatility %.")

    # 9. SUMMARY ALGORITHM COMPARISON MATRIX TABLE
    add_heading_1(doc, "9. SUMMARY ALGORITHM COMPARISON MATRIX")
    
    tbl_summary = doc.add_table(rows=8, cols=4)
    tbl_summary.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Algorithm Name", "Core Function / Method", "Execution Trigger", "File Location"]
    
    for c_idx, h_text in enumerate(headers):
        cell = tbl_summary.cell(0, c_idx)
        set_cell_background(cell, "002060")
        set_cell_margins(cell, top=100, bottom=100, left=100, right=100)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(10.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    rows_data = [
        ("Topological Causal DAG Propagation", "Multi-node graph traversal & score equations (I_total, O_total, R_total)", "Scenario tab click / Shock ingestion", "src/components/modules/risk/CausalGraphFlow.tsx"),
        ("Sanitize-and-Parse (SAP) Regex Engine", "Alpha-numeric string cleaning & canonical symbol resolution", "Search query / Quote fetch request", "src/services/stockService.ts"),
        ("Multi-Proxy Failover Polling", "Sequential proxy array traversal with 3.5s timeout boundaries", "Every 6.0s market refresh cycle", "src/services/stockService.ts"),
        ("Exchange Operating Hours Validator", "UTC/IST/EST timezone evaluator against market windows", "Evaluated every 2.0s before tick pulse", "src/components/common/HeaderTicker.tsx"),
        ("High-Frequency Tick Pulse Engine", "Discrete stochastic micro-delta generation (+-0.02%)", "Every 2.0s interval timer", "src/components/common/HeaderTicker.tsx"),
        ("GMP & IPO Bidding Return Algo", "Percentage listing gain R_gmp = (P_gmp / P_upper) * 100", "IPO Hub view render", "src/components/modules/ipo/IPOsHub.tsx"),
        ("SIP & Sharpe Ratio Financial Formulas", "Compound interest FV_sip and risk-adjusted efficiency SR = (R_p - R_f)/σ_p", "Calculator slider movement", "src/components/modules/calculators/FinancialCalculatorsHub.tsx")
    ]

    for r_idx, row_vals in enumerate(rows_data, start=1):
        bg_color = "F9FAFB" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_vals):
            cell = tbl_summary.cell(r_idx, c_idx)
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(9.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(16)

    # Save to disk
    out_dir = "/Users/anirudhbhatt/Major Project/Team_Share_Pack/documents"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "Vittiya_AI_Algorithms_and_Formulas.docx")
    root_path = "/Users/anirudhbhatt/Major Project/Vittiya_AI_Algorithms_and_Formulas.docx"
    
    doc.save(out_path)
    doc.save(root_path)
    print(f"✅ Generated Word document: {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    build_docx()
