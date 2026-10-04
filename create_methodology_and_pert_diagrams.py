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

def draw_arrow(draw, start, end, fill="#002060", width=3, arrow_size=12):
    x1, y1 = start
    x2, y2 = end
    draw.line([x1, y1, x2, y2], fill=fill, width=width)
    if x2 > x1: # Right pointing
        draw.polygon([(x2, y2), (x2 - arrow_size, y2 - arrow_size//2), (x2 - arrow_size, y2 + arrow_size//2)], fill=fill)
    elif y2 > y1: # Down pointing
        draw.polygon([(x2, y2), (x2 - arrow_size//2, y2 - arrow_size), (x2 + arrow_size//2, y2 - arrow_size)], fill=fill)

# ==========================================
# 1. METHODOLOGY FLOWCHART (6 STAGES)
# ==========================================
def create_methodology_flowchart():
    width, height = 1800, 1000
    img = Image.new('RGB', (width, height), color='#F4F6F9')
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw_rounded_rect(draw, (30, 30, width - 30, height - 30), 20, fill='#F4F6F9', outline='#002060', width=3)
    
    # Header Banner
    draw_rounded_rect(draw, (50, 50, width - 50, 130), 12, fill='#002060')
    draw.text((width // 2, 90), "VITTIYA AI — SYSTEM METHODOLOGY FLOWCHART", fill='white', anchor="mm", font_size=32)
    
    stages = [
        # (x1, y1, x2, y2, step_num, title, desc, bg_color)
        (70, 170, 580, 520, "1", "Real-Time Market Streamer", "Asynchronous polling every 8 seconds fetching live market chart payloads from Yahoo Finance REST APIs via resilient CORS proxies with 3500ms AbortSignal timeouts.", "#003366"),
        (650, 170, 1150, 520, "2", "SAP Numerical Sanitizer", "Incoming raw price strings processed through regular expression pipeline replacing commas before IEEE 754 float evaluation (P_clean = parseFloat(replace(/,/g,''))).", "#004080"),
        (1220, 170, 1730, 520, "3", "Chittorgarh IPO Hub", "Multi-tab dashboard categorized into Open Bidding, Closed/Listed, Upcoming, and Applied IPOs with live Grey Market Premium (GMP) & listing returns.", "#0055A5"),
        
        (70, 580, 580, 930, "4", "Causal DAG Propagation", "Topological sort algorithm modeling macroeconomic network as Directed Acyclic Graph G = (V, E) where shock impact scores radiate without infinite loops.", "#006600"),
        (650, 580, 1150, 930, "5", "Dynamic Stock Inspector", "Real-time fundamental & technical analysis suite rendering 5-minute candlestick charts, bid/ask depth order books, corporate actions, and split news feeds.", "#008080"),
        (1220, 580, 1730, 930, "6", "Enterprise Alert Bus", "Glassmorphic popover alert center featuring category filter chips (All, Critical P1, AI Alerts, IPOs, Markets), urgency pills, and 1-click tab navigation.", "#2C5282")
    ]
    
    for x1, y1, x2, y2, s_num, t, d, bg in stages:
        draw_rounded_rect(draw, (x1, y1, x2, y2), 15, fill=bg)
        
        # Step Number Badge
        draw_rounded_rect(draw, (x1 + 20, y1 + 20, x1 + 80, y1 + 70), 8, fill='#FFC000')
        draw.text((x1 + 50, y1 + 45), f"STEP {s_num}", fill='#002060', anchor="mm", font_size=15)
        
        # Title
        draw.text((x1 + 100, y1 + 45), t, fill='white', anchor="lm", font_size=20)
        
        # Divider Line
        draw.line([x1 + 20, y1 + 85, x2 - 20, y1 + 85], fill='#E2E8F0', width=1)
        
        # Description (Word Wrap)
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
            
        ty = y1 + 110
        for l in lines:
            draw.text((x1 + 25, ty), l, fill='#F7FAFC', font_size=15)
            ty += 24

    # Connective Arrows
    draw_arrow(draw, (580, 345), (650, 345), fill="#002060", width=4)
    draw_arrow(draw, (1150, 345), (1220, 345), fill="#002060", width=4)
    draw_arrow(draw, (1475, 520), (1475, 580), fill="#002060", width=4)
    draw_arrow(draw, (1220, 755), (1150, 755), fill="#002060", width=4)
    draw_arrow(draw, (650, 755), (580, 755), fill="#002060", width=4)

    out_path = "diagrams/methodology_flowchart.png"
    img.save(out_path)
    print(f"✅ Generated {out_path}")

# ==========================================
# 2. PERT NETWORK CHART
# ==========================================
def create_pert_chart():
    width, height = 1800, 1100
    img = Image.new('RGB', (width, height), color='#FFF9F5')
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw_rounded_rect(draw, (30, 30, width - 30, height - 30), 20, fill='#FFF9F5', outline='#C53030', width=3)
    
    # Header Banner
    draw_rounded_rect(draw, (50, 50, width - 50, 130), 12, fill='#C53030')
    draw.text((width // 2, 90), "PROJECT VITTIYA — PERT NETWORK CHART & CRITICAL PATH ANALYSIS", fill='white', anchor="mm", font_size=30)
    
    # PERT Nodes
    # Format: (x, y, label, name, Te, ES, EF, LS, LF, is_critical)
    nodes = [
        (100, 320, "A", "Requirements Scope", "2.0w", "0", "2", "0", "2", True),
        (400, 320, "B", "Yahoo API & Proxy", "2.17w", "2", "4.17", "2", "4.17", True),
        (700, 320, "C", "SAP Regex Engine", "1.5w", "4.17", "5.67", "4.17", "5.67", True),
        
        (1000, 180, "D", "Chittorgarh IPO", "2.0w", "5.67", "7.67", "7.17", "9.17", False),
        (1000, 460, "E", "Causal DAG Graph", "3.17w", "5.67", "8.84", "5.67", "8.84", True),
        (1000, 720, "F", "Stock Inspector", "2.17w", "5.67", "7.84", "6.67", "8.84", False),
        
        (1350, 320, "G", "Alert Bus & UI", "1.5w", "7.84", "9.34", "8.84", "10.34", False),
        (1650, 460, "H", "Testing & Deploy", "2.07w", "8.84", "10.91", "8.84", "10.91", True)
    ]
    
    # Draw Edges first
    edges = [
        ("A", "B", True), ("B", "C", True),
        ("C", "D", False), ("C", "E", True), ("C", "F", False),
        ("D", "G", False), ("F", "G", False),
        ("E", "H", True), ("G", "H", False)
    ]
    
    node_dict = {n[2]: n for n in nodes}
    
    for u, v, crit in edges:
        n1 = node_dict[u]
        n2 = node_dict[v]
        x1, y1 = n1[0] + 180, n1[1] + 60
        x2, y2 = n2[0], n2[1] + 60
        color = "#E53E3E" if crit else "#718096"
        w_line = 5 if crit else 2
        draw_arrow(draw, (x1, y1), (x2, y2), fill=color, width=w_line, arrow_size=14)

    # Draw Nodes
    for x, y, label, name, te, es, ef, ls, lf, crit in nodes:
        bg = "#FFF5F5" if crit else "#FFFFFF"
        ec = "#E53E3E" if crit else "#4A5568"
        draw_rounded_rect(draw, (x, y, x + 180, y + 120), 10, fill=bg, outline=ec, width=3 if crit else 2)
        
        # Top Header (Task ID & Name)
        hdr_bg = "#E53E3E" if crit else "#4A5568"
        draw_rounded_rect(draw, (x, y, x + 180, y + 35), 8, fill=hdr_bg)
        draw.text((x + 90, y + 17), f"TASK {label}: {te}", fill='white', anchor="mm", font_size=14)
        
        # Middle (Name)
        draw.text((x + 90, y + 55), name, fill='#1A202C', anchor="mm", font_size=12)
        
        # Bottom Grid (ES, EF, LS, LF)
        draw.line([x, y + 80, x + 180, y + 80], fill=ec, width=1)
        draw.line([x + 90, y + 80, x + 90, y + 120], fill=ec, width=1)
        draw.text((x + 45, y + 92), f"ES:{es}", fill='#2D3748', anchor="mm", font_size=11)
        draw.text((x + 135, y + 92), f"EF:{ef}", fill='#2D3748', anchor="mm", font_size=11)
        draw.text((x + 45, y + 108), f"LS:{ls}", fill='#718096', anchor="mm", font_size=10)
        draw.text((x + 135, y + 108), f"LF:{lf}", fill='#718096', anchor="mm", font_size=10)

    # Legend & Critical Path Banner
    draw_rounded_rect(draw, (60, 860, width - 60, 1040), 12, fill='#FFFFFF', outline='#E53E3E', width=2)
    draw.text((80, 890), "CRITICAL PATH (RED LINE): Task A -> Task B -> Task C -> Task E -> Task H", fill='#E53E3E', font_size=18)
    draw.text((80, 925), "TOTAL EXPECTED PROJECT DURATION (Te): 10.91 WEEKS (~11 WEEKS)", fill='#1A202C', font_size=16)
    draw.text((80, 960), "PERT Formula: Te = (a + 4m + b) / 6  |  Variance: σ² = ((b - a) / 6)²  |  Critical Path Slack = 0.0 Weeks", fill='#4A5568', font_size=14)
    draw.text((80, 995), "ES = Early Start, EF = Early Finish, LS = Late Start, LF = Late Finish", fill='#718096', font_size=13)

    out_path = "diagrams/pert_chart.png"
    img.save(out_path)
    print(f"✅ Generated {out_path}")

if __name__ == "__main__":
    create_methodology_flowchart()
    create_pert_chart()
