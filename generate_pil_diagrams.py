from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("diagrams", exist_ok=True)

# Helper drawing functions
def draw_rounded_rect(draw, xy, corner_radius, fill, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + corner_radius, y1, x2 - corner_radius, y2], fill=fill, outline=outline, width=width)
    draw.rectangle([x1, y1 + corner_radius, x2, y2 - corner_radius], fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y1, x1 + corner_radius * 2, y1 + corner_radius * 2], 180, 270, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - corner_radius * 2, y1, x2, y1 + corner_radius * 2], 270, 360, fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y2 - corner_radius * 2, x1 + corner_radius * 2, y2], 90, 180, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - corner_radius * 2, y2 - corner_radius * 2, x2, y2], 0, 90, fill=fill, outline=outline, width=width)

# 1. SYSTEM ARCHITECTURE DIAGRAM
def create_diag_1():
    img = Image.new('RGB', (1600, 800), color='#F4F6F9')
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw_rounded_rect(draw, (30, 30, 1570, 770), 20, fill='#F4F6F9', outline='#002060', width=3)
    
    # Title
    draw.text((800, 60), "VITTIYA AI — SYSTEM ARCHITECTURE & DATA FLOW ENGINE", fill='#002060', anchor="mm", font_size=32)
    
    # Boxes
    boxes = [
        # (x1, y1, x2, y2, title, subtitle, bg)
        (60, 140, 500, 260, "EXTERNAL DATA SOURCES", "Yahoo Finance v8 REST API\nGlobal Interbank FX Feed", "#002060"),
        (560, 140, 1040, 260, "MULTI-PROXY STACK", "allorigins.win | corsproxy.io\n3500ms AbortSignal Timeout", "#004080"),
        (1100, 140, 1540, 260, "STREAMER ENGINE", "1.8s High-Freq Tick Pulse\nIST Market Hours Evaluator", "#006699"),
        
        (60, 320, 780, 480, "SANITY & REGEX PARSING PIPELINE", "P_clean = parseFloat(P_raw.replace(/,/g, ''))\nZero Floating-Point Price Distortion Guaranty", "#0052CC"),
        (820, 320, 1540, 480, "AI CAUSAL DAG PROPAGATION ENGINE", "G = (V, E) Topological Traversal\nImpact (88), Opportunity (42), Risk (91) Scores", "#006600"),
        
        (60, 540, 1540, 720, "GLASSMORPHISM SINGLE PAGE INTERFACE (React 18 + Vite 8 + Tailwind CSS)", "Master Executive Dashboard  |  Chittorgarh Verified IPOs Hub  |  Macro News Radar  |  Stock Profile Inspector", "#002060")
    ]
    
    for x1, y1, x2, y2, t, s, bg in boxes:
        draw_rounded_rect(draw, (x1, y1, x2, y2), 15, fill=bg)
        cx, cy = (x1 + x2)//2, (y1 + y2)//2
        draw.text((cx, cy - 18), t, fill='white', anchor="mm", font_size=22)
        draw.text((cx, cy + 20), s, fill='#E2E8F0', anchor="mm", font_size=17)

    img.save("diagrams/diagram_1_system_architecture.png")
    print("✅ Created diagrams/diagram_1_system_architecture.png")

# 2. CAUSAL DAG SHOCK PROPAGATION DIAGRAM
def create_diag_2():
    img = Image.new('RGB', (1600, 800), color='#FFF5F5')
    draw = ImageDraw.Draw(img)
    
    draw_rounded_rect(draw, (30, 30, 1570, 770), 20, fill='#FFF5F5', outline='#990000', width=3)
    draw.text((800, 60), "TOPOLOGICAL CAUSAL DAG SHOCK PROPAGATION ENGINE", fill='#990000', anchor="mm", font_size=32)
    
    nodes = [
        (60, 300, 360, 500, "MACRO SHOCK TRIGGER", "Red Sea Naval Blockade\nConfidence Probability: 96%", "#990000"),
        (440, 160, 780, 340, "COMMODITY NODE 1", "Spot Container Freight Rates\nSurge Impact: +35%", "#C53030"),
        (440, 460, 780, 640, "COMMODITY NODE 2", "Brent Crude Oil ($83.86/bbl)\nUpstream Supply Shock: +3.08%", "#C53030"),
        
        (860, 120, 1200, 260, "INDUSTRY 1 (DOWN)", "Paint & Chemical OEMs\nEBITDA Margin Drag -14%", "#DD6B20"),
        (860, 300, 1200, 440, "INDUSTRY 2 (DOWN)", "Airlines & Aviation\nATF Tariff Spike Drag -12%", "#DD6B20"),
        (860, 480, 1200, 620, "BENEFICIARY (UP)", "OMC Refineries (BPCL/IOC)\nGross Refining Margin +$2.4/bbl", "#2F855A"),
        
        (1260, 300, 1540, 500, "PORTFOLIO IMPACT", "Retail Portfolio Margin Drag\nDownside Risk Score: 91/100", "#742A2A")
    ]
    
    for x1, y1, x2, y2, t, s, bg in nodes:
        draw_rounded_rect(draw, (x1, y1, x2, y2), 15, fill=bg)
        cx, cy = (x1 + x2)//2, (y1 + y2)//2
        draw.text((cx, cy - 18), t, fill='white', anchor="mm", font_size=20)
        draw.text((cx, cy + 20), s, fill='#F7FAFC', anchor="mm", font_size=15)

    img.save("diagrams/diagram_2_causal_dag.png")
    print("✅ Created diagrams/diagram_2_causal_dag.png")

# 3. DFD LEVEL 1 DIAGRAM
def create_diag_3():
    img = Image.new('RGB', (1600, 700), color='#EBF8FF')
    draw = ImageDraw.Draw(img)
    
    draw_rounded_rect(draw, (30, 30, 1570, 670), 20, fill='#EBF8FF', outline='#2B6CB0', width=3)
    draw.text((800, 60), "DATA FLOW DIAGRAM (DFD LEVEL 1) — REST INGESTION & RENDER PIPELINE", fill='#2B6CB0', anchor="mm", font_size=30)
    
    dfd_nodes = [
        (60, 240, 380, 460, "1.0 CLIENT SPA", "React 18 State Store\nUser Search Query", "#2B6CB0"),
        (440, 240, 780, 460, "2.0 PROXY STACK", "Multi-Proxy Fallback\n3500ms AbortSignal Timeout", "#2C5282"),
        (840, 240, 1180, 460, "3.0 REGEX SANITY", "parseFloat() Sanitizer\nZero String Distortion", "#2B6CB0"),
        (1240, 240, 1540, 460, "4.0 UI RENDER", "Header Ticker Strip\nIPO & DAG Visualizers", "#2C5282")
    ]
    
    for x1, y1, x2, y2, t, s, bg in dfd_nodes:
        draw_rounded_rect(draw, (x1, y1, x2, y2), 15, fill=bg)
        cx, cy = (x1 + x2)//2, (y1 + y2)//2
        draw.text((cx, cy - 18), t, fill='white', anchor="mm", font_size=22)
        draw.text((cx, cy + 20), s, fill='#EBF8FF', anchor="mm", font_size=16)

    img.save("diagrams/diagram_3_dfd_level_1.png")
    print("✅ Created diagrams/diagram_3_dfd_level_1.png")

if __name__ == "__main__":
    create_diag_1()
    create_diag_2()
    create_diag_3()
