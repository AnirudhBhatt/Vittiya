from PIL import Image, ImageDraw
import os

os.makedirs("diagrams", exist_ok=True)

def draw_circle(draw, center, radius, fill="#0F9D58", outline="#0B6623", width=3):
    cx, cy = center
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=fill, outline=outline, width=width)

def draw_line_with_text(draw, p1, p2, text, color="#2D3748", font_size=14, text_offset_y=-15):
    x1, y1 = p1
    x2, y2 = p2
    draw.line([x1, y1, x2, y2], fill=color, width=3)
    
    mx, my = (x1 + x2) // 2, (y1 + y2) // 2
    
    # Calculate angle for nice text placement
    draw.text((mx, my + text_offset_y), text, fill=color, anchor="mm", font_size=font_size)

def create_gfg_pert_chart():
    width, height = 1600, 1000
    img = Image.new('RGB', (width, height), color='#F8F9FA') # Clean Off-White Background matching GFG
    draw = ImageDraw.Draw(img)
    
    # Title (Top)
    draw.text((width // 2, 70), "PERT Chart", fill='#0F172A', anchor="mm", font_size=42)
    
    # GeeksforGeeks Logo / Header Accent (Top Right)
    draw.text((width - 90, 60), "gfg", fill='#0F9D58', anchor="mm", font_size=32)
    
    # Node Positions (Matching image coordinates)
    # 01: Left
    # 02: Middle Left
    # 03: Top Middle
    # 04: Bottom Middle
    # 05: Center
    # 06: Top Right
    # 07: Bottom Right
    
    nodes = {
        "01": (180, 560, "Project Kickoff\n(Week 0)"),
        "02": (500, 560, "Reqs Finalized\n(Week 2)"),
        "03": (820, 260, "IPO Hub Ready\n(Week 7.5)"),
        "04": (820, 840, "Stock Inspector\n(Week 7.5)"),
        "05": (980, 560, "SAP Regex Ready\n(Week 5.5)"),
        "06": (1260, 260, "DAG Engine Ready\n(Week 8.5)"),
        "07": (1460, 560, "Deployment Ready\n(Week 11)")
    }
    
    # Lines & Tasks
    connections = [
        ("01", "02", "Task A: Reqs Scope (2 Wks)", -25),
        ("02", "03", "Task D: IPO Hub (2 Wks)", -20),
        ("02", "04", "Task F: Stock Inspector (2 Wks)", 25),
        ("02", "05", "Task B & C: API & Regex Engine (3.5 Wks)", -22),
        ("05", "06", "Task E & G: AI Causal DAG & Alert Bus (4.5 Wks)", -22),
        ("06", "07", "Task H: Integration & Deploy (2 Wks)", -22)
    ]
    
    # Draw Lines first
    for u, v, label, text_off in connections:
        p1 = (nodes[u][0], nodes[u][1])
        p2 = (nodes[v][0], nodes[v][1])
        color = "#0F9D58" if u in ["01", "02", "05", "06"] and v in ["02", "05", "06", "07"] else "#64748B"
        draw_line_with_text(draw, p1, p2, label, color=color, font_size=15, text_offset_y=text_off)

    # Draw Green Node Circles & Milestone Labels
    radius = 50
    for node_id, (x, y, label) in nodes.items():
        # Node Circle (Vivid Green)
        draw_circle(draw, (x, y), radius, fill='#0F9D58', outline='#0B6623', width=3)
        # Node Number inside Circle
        draw.text((x, y), node_id, fill='white', anchor="mm", font_size=32)
        
        # Subtitle below or above node
        label_y = y - 75 if node_id in ["03", "06"] else (y + 75 if node_id in ["04"] else y - 75 if node_id == "01" else y + 75)
        draw.text((x, label_y), label, fill='#1E293B', anchor="mm", font_size=16)

    # Summary Legend at Bottom Left
    draw.text((80, 930), "🟢 Critical Path (Main Path): Milestone 01 ➔ 02 ➔ 05 ➔ 06 ➔ 07  |  Total Project Duration: 11 Weeks", fill='#0F9D58', font_size=17)
    draw.text((80, 965), "Milestone Nodes: 01 (Kickoff), 02 (Scope), 03 (IPO Module), 04 (Stock Inspector), 05 (Regex Engine), 06 (DAG Engine), 07 (Deployment)", fill='#475569', font_size=14)

    out_path = "diagrams/pert_chart.png"
    img.save(out_path)
    print(f"✅ Generated GFG Style PERT Chart: {out_path}")

if __name__ == "__main__":
    create_gfg_pert_chart()
