from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("diagrams", exist_ok=True)

def draw_rounded_rect(draw, xy, corner_radius, fill, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + corner_radius, y1, x2 - corner_radius, y2], fill=fill, outline=outline, width=width)
    draw.rectangle([x1, y1 + corner_radius, x2, y2 - corner_radius], fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y1, x1 + corner_radius * 2, y1 + corner_radius * 2], 180, 270, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - corner_radius * 2, y1, x2, y1 + corner_radius * 2], 270, 360, fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y2 - corner_radius * 2, x1 + corner_radius * 2, y2], 90, 180, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - corner_radius * 2, y2 - corner_radius * 2, x2, y2], 0, 90, fill=fill, outline=outline, width=width)

def draw_arrow(draw, start, end, fill="#1E3A8A", width=4, arrow_size=15):
    x1, y1 = start
    x2, y2 = end
    draw.line([x1, y1, x2, y2], fill=fill, width=width)
    if x2 > x1: # Right pointing
        draw.polygon([(x2, y2), (x2 - arrow_size, y2 - arrow_size//2), (x2 - arrow_size, y2 + arrow_size//2)], fill=fill)
    elif x2 < x1: # Left pointing
        draw.polygon([(x2, y2), (x2 + arrow_size, y2 - arrow_size//2), (x2 + arrow_size, y2 + arrow_size//2)], fill=fill)
    elif y2 > y1: # Down pointing
        draw.polygon([(x2, y2), (x2 - arrow_size//2, y2 - arrow_size), (x2 + arrow_size//2, y2 - arrow_size)], fill=fill)

# ==========================================
# 1. METHODOLOGY FLOWCHART (PURE WHITE SLIDE OPTIMIZED)
# ==========================================
def create_methodology_flowchart():
    width, height = 1800, 1000
    img = Image.new('RGB', (width, height), color='#FFFFFF') # Pure White Slide Background
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw_rounded_rect(draw, (20, 20, width - 20, height - 20), 20, fill='#FFFFFF', outline='#1E3A8A', width=4)
    
    # Header Banner (Dark Navy)
    draw_rounded_rect(draw, (40, 40, width - 40, 125), 12, fill='#1E3A8A')
    draw.text((width // 2, 82), "VITTIYA AI — SYSTEM METHODOLOGY FLOWCHART", fill='white', anchor="mm", font_size=32)
    
    stages = [
        # (x1, y1, x2, y2, step_num, title, desc, bg_color)
        (60, 160, 570, 520, "1", "Real-Time Market Streamer", "Asynchronous polling every 8 seconds fetching live market chart payloads from Yahoo Finance REST APIs via resilient CORS proxies with 3500ms AbortSignal timeouts.", "#1E40AF"),
        (640, 160, 1150, 520, "2", "SAP Numerical Sanitizer", "Incoming raw price strings processed through regular expression pipeline replacing commas before IEEE 754 float evaluation (P_clean = parseFloat(replace(/,/g,''))).", "#0284C7"),
        (1220, 160, 1740, 520, "3", "Chittorgarh IPO Hub", "Multi-tab dashboard categorized into Open Bidding, Closed/Listed, Upcoming, and Applied IPOs with live Grey Market Premium (GMP) & listing returns.", "#0D9488"),
        
        (60, 580, 570, 940, "4", "Causal DAG Propagation", "Topological sort algorithm modeling macroeconomic network as Directed Acyclic Graph G = (V, E) where shock impact scores radiate without infinite loops.", "#15803D"),
        (640, 580, 1150, 940, "5", "Dynamic Stock Inspector", "Real-time fundamental & technical analysis suite rendering 5-minute candlestick charts, bid/ask depth order books, corporate actions, and split news feeds.", "#4F46E5"),
        (1220, 580, 1740, 940, "6", "Enterprise Alert Bus", "Glassmorphic popover alert center featuring category filter chips (All, Critical P1, AI Alerts, IPOs, Markets), urgency pills, and 1-click tab navigation.", "#3730A3")
    ]
    
    for x1, y1, x2, y2, s_num, t, d, bg in stages:
        draw_rounded_rect(draw, (x1, y1, x2, y2), 15, fill=bg)
        
        # Step Badge
        draw_rounded_rect(draw, (x1 + 18, y1 + 18, x1 + 82, y1 + 68), 8, fill='#F59E0B')
        draw.text((x1 + 50, y1 + 43), f"STEP {s_num}", fill='#1E3A8A', anchor="mm", font_size=15)
        
        # Title
        draw.text((x1 + 100, y1 + 43), t, fill='white', anchor="lm", font_size=20)
        
        # Divider Line
        draw.line([x1 + 18, y1 + 82, x2 - 18, y1 + 82], fill='#FFFFFF', width=2)
        
        # Description
        words = d.split()
        lines = []
        current_line = []
        for w in words:
            current_line.append(w)
            if len(" ".join(current_line)) > 32:
                current_line.pop()
                lines.append(" ".join(current_line))
                current_line = [w]
        if current_line:
            lines.append(" ".join(current_line))
            
        ty = y1 + 108
        for l in lines:
            draw.text((x1 + 22, ty), l, fill='#FFFFFF', font_size=15)
            ty += 25

    # Connective Arrows (High-Contrast Navy Blue)
    draw_arrow(draw, (570, 340), (640, 340), fill="#1E3A8A", width=5, arrow_size=16)
    draw_arrow(draw, (1150, 340), (1220, 340), fill="#1E3A8A", width=5, arrow_size=16)
    draw_arrow(draw, (1480, 520), (1480, 580), fill="#1E3A8A", width=5, arrow_size=16)
    draw_arrow(draw, (1220, 760), (1150, 760), fill="#1E3A8A", width=5, arrow_size=16)
    draw_arrow(draw, (640, 760), (570, 760), fill="#1E3A8A", width=5, arrow_size=16)

    out_path = "diagrams/methodology_flowchart.png"
    img.save(out_path)
    print(f"✅ Generated {out_path}")

# ==========================================
# 2. PERT NETWORK CHART (PURE WHITE SLIDE OPTIMIZED)
# ==========================================
def create_pert_chart():
    width, height = 1800, 1100
    img = Image.new('RGB', (width, height), color='#FFFFFF') # Pure White Slide Background
    draw = ImageDraw.Draw(img)
    
    # Outer Border (Vivid Red)
    draw_rounded_rect(draw, (20, 20, width - 20, height - 20), 20, fill='#FFFFFF', outline='#DC2626', width=4)
    
    # Header Banner (Vivid Crimson Red)
    draw_rounded_rect(draw, (40, 40, width - 40, 125), 12, fill='#DC2626')
    draw.text((width // 2, 82), "PROJECT VITTIYA — PERT NETWORK CHART & CRITICAL PATH ANALYSIS", fill='white', anchor="mm", font_size=30)
    
    nodes = [
        (80, 320, "A", "Requirements Scope", "2.0w", "0", "2", "0", "2", True),
        (380, 320, "B", "Yahoo API & Proxy", "2.17w", "2", "4.17", "2", "4.17", True),
        (680, 320, "C", "SAP Regex Engine", "1.5w", "4.17", "5.67", "4.17", "5.67", True),
        
        (980, 170, "D", "Chittorgarh IPO", "2.0w", "5.67", "7.67", "7.17", "9.17", False),
        (980, 460, "E", "Causal DAG Graph", "3.17w", "5.67", "8.84", "5.67", "8.84", True),
        (980, 730, "F", "Stock Inspector", "2.17w", "5.67", "7.84", "6.67", "8.84", False),
        
        (1340, 320, "G", "Alert Bus & UI", "1.5w", "7.84", "9.34", "8.84", "10.34", False),
        (1650, 460, "H", "Testing & Deploy", "2.07w", "8.84", "10.91", "8.84", "10.91", True)
    ]
    
    edges = [
        ("A", "B", True), ("B", "C", True),
        ("C", "D", False), ("C", "E", True), ("C", "F", False),
        ("D", "G", False), ("F", "G", False),
        ("E", "H", True), ("G", "H", False)
    ]
    
    node_dict = {n[2]: n for n in nodes}
    
    # Draw Edges first
    for u, v, crit in edges:
        n1 = node_dict[u]
        n2 = node_dict[v]
        x1, y1 = n1[0] + 170, n1[1] + 60
        x2, y2 = n2[0], n2[1] + 60
        color = "#DC2626" if crit else "#64748B"
        w_line = 6 if crit else 3
        draw_arrow(draw, (x1, y1), (x2, y2), fill=color, width=w_line, arrow_size=16)

    # Draw Nodes
    for x, y, label, name, te, es, ef, ls, lf, crit in nodes:
        bg = "#FEF2F2" if crit else "#F8FAFC"
        ec = "#DC2626" if crit else "#475569"
        draw_rounded_rect(draw, (x, y, x + 170, y + 120), 10, fill=bg, outline=ec, width=4 if crit else 2)
        
        # Header Box
        hdr_bg = "#DC2626" if crit else "#475569"
        draw_rounded_rect(draw, (x, y, x + 170, y + 36), 8, fill=hdr_bg)
        draw.text((x + 85, y + 18), f"TASK {label}: {te}", fill='white', anchor="mm", font_size=14)
        
        # Name
        draw.text((x + 85, y + 56), name, fill='#0F172A', anchor="mm", font_size=12)
        
        # Grid
        draw.line([x, y + 80, x + 170, y + 80], fill=ec, width=1)
        draw.line([x + 85, y + 80, x + 85, y + 120], fill=ec, width=1)
        draw.text((x + 42, y + 92), f"ES:{es}", fill='#0F172A', anchor="mm", font_size=11)
        draw.text((x + 128, y + 92), f"EF:{ef}", fill='#0F172A', anchor="mm", font_size=11)
        draw.text((x + 42, y + 108), f"LS:{ls}", fill='#475569', anchor="mm", font_size=10)
        draw.text((x + 128, y + 108), f"LF:{lf}", fill='#475569', anchor="mm", font_size=10)

    # Legend & Critical Path Banner (Pure White Card with Crimson Border)
    draw_rounded_rect(draw, (40, 860, width - 40, 1040), 12, fill='#FFFFFF', outline='#DC2626', width=3)
    draw.text((60, 890), "CRITICAL PATH (RED LINE): Task A ➔ Task B ➔ Task C ➔ Task E ➔ Task H", fill='#DC2626', font_size=18)
    draw.text((60, 925), "TOTAL EXPECTED PROJECT DURATION (Te): 10.91 WEEKS (~11 WEEKS)", fill='#0F172A', font_size=16)
    draw.text((60, 960), "PERT Formula: Te = (a + 4m + b) / 6  |  Variance: σ² = ((b - a) / 6)²  |  Critical Path Slack = 0.0 Weeks", fill='#334155', font_size=14)
    draw.text((60, 995), "ES = Early Start, EF = Early Finish, LS = Late Start, LF = Late Finish", fill='#64748B', font_size=13)

    out_path = "diagrams/pert_chart.png"
    img.save(out_path)
    print(f"✅ Generated {out_path}")

if __name__ == "__main__":
    create_methodology_flowchart()
    create_pert_chart()
