from PIL import Image, ImageDraw
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

def draw_arrow(draw, start, end, fill="#DC2626", width=5, arrow_size=16):
    x1, y1 = start
    x2, y2 = end
    draw.line([x1, y1, x2, y2], fill=fill, width=width)
    if x2 > x1: # Right pointing
        draw.polygon([(x2, y2), (x2 - arrow_size, y2 - arrow_size//2), (x2 - arrow_size, y2 + arrow_size//2)], fill=fill)
    elif x2 < x1: # Left pointing
        draw.polygon([(x2, y2), (x2 + arrow_size, y2 - arrow_size//2), (x2 + arrow_size, y2 + arrow_size//2)], fill=fill)
    elif y2 > y1: # Down pointing
        draw.polygon([(x2, y2), (x2 - arrow_size//2, y2 - arrow_size), (x2 + arrow_size//2, y2 - arrow_size)], fill=fill)

def create_simple_pert_chart():
    width, height = 1800, 1100
    img = Image.new('RGB', (width, height), color='#FFFFFF') # Pure White Slide Background
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw_rounded_rect(draw, (20, 20, width - 20, height - 20), 20, fill='#FFFFFF', outline='#DC2626', width=4)
    
    # Header Banner (Vivid Crimson Red)
    draw_rounded_rect(draw, (40, 40, width - 40, 125), 12, fill='#DC2626')
    draw.text((width // 2, 82), "PROJECT VITTIYA — SIMPLE PERT TIMELINE & CRITICAL PATH CHART", fill='white', anchor="mm", font_size=30)
    
    # Simple Nodes Matrix
    # Format: (x, y, task_id, task_title, duration_str, timeline_str, is_critical)
    nodes = [
        (60, 320, "A", "Requirements Scope", "Duration: 2 Weeks", "Timeline: Wk 0 - Wk 2", True),
        (380, 320, "B", "API & Proxy Setup", "Duration: 2 Weeks", "Timeline: Wk 2 - Wk 4", True),
        (700, 320, "C", "Regex Sanitizer", "Duration: 1.5 Weeks", "Timeline: Wk 4 - Wk 5.5", True),
        
        (1020, 160, "D", "Chittorgarh IPO Hub", "Duration: 2 Weeks", "Timeline: Wk 5.5 - Wk 7.5", False),
        (1020, 460, "E", "AI Causal DAG Engine", "Duration: 3 Weeks", "Timeline: Wk 5.5 - Wk 8.5", True),
        (1020, 740, "F", "Stock Inspector Charts", "Duration: 2 Weeks", "Timeline: Wk 5.5 - Wk 7.5", False),
        
        (1360, 320, "G", "Alert Bus & UI Polish", "Duration: 1.5 Weeks", "Timeline: Wk 7.5 - Wk 9", False),
        (1650, 460, "H", "Testing & Deployment", "Duration: 2 Weeks", "Timeline: Wk 8.5 - Wk 11", True)
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
        x1, y1 = n1[0] + 190, n1[1] + 65
        x2, y2 = n2[0], n2[1] + 65
        color = "#DC2626" if crit else "#64748B"
        w_line = 6 if crit else 3
        draw_arrow(draw, (x1, y1), (x2, y2), fill=color, width=w_line, arrow_size=16)

    # Draw Simple Presentation Nodes
    for x, y, task_id, title, dur, time_str, crit in nodes:
        bg = "#FEF2F2" if crit else "#F8FAFC"
        ec = "#DC2626" if crit else "#475569"
        
        # Outer Card
        draw_rounded_rect(draw, (x, y, x + 190, y + 130), 12, fill=bg, outline=ec, width=4 if crit else 2)
        
        # Header Badge
        hdr_bg = "#DC2626" if crit else "#475569"
        draw_rounded_rect(draw, (x, y, x + 190, y + 42), 10, fill=hdr_bg)
        draw.text((x + 95, y + 21), f"TASK {task_id}", fill='white', anchor="mm", font_size=17)
        
        # Title (Dark Text)
        draw.text((x + 95, y + 62), title, fill='#0F172A', anchor="mm", font_size=13)
        
        # Duration Badge
        draw.text((x + 95, y + 85), dur, fill='#1E3A8A' if not crit else '#991B1B', anchor="mm", font_size=12)
        
        # Timeline Weeks
        draw.text((x + 95, y + 108), time_str, fill='#475569', anchor="mm", font_size=11)

    # Bottom Presentation Explanation Banner (Pure White Card with Red Accent)
    draw_rounded_rect(draw, (40, 860, width - 40, 1040), 12, fill='#FFFFFF', outline='#DC2626', width=3)
    draw.text((60, 890), "🔴 MAIN CRITICAL PATH (RED LINE): Task A ➔ Task B ➔ Task C ➔ Task E ➔ Task H", fill='#DC2626', font_size=19)
    draw.text((60, 930), "⏱️ TOTAL EXPECTED PROJECT TIMELINE: 11 WEEKS", fill='#0F172A', font_size=18)
    draw.text((60, 970), "💡 Presentation Key: Tasks on the Red Line (A, B, C, E, H) must complete on schedule to finish the project in 11 weeks.", fill='#334155', font_size=15)
    draw.text((60, 1005), "Tasks D, F, G run in parallel with buffer time (slack) and will not delay final project delivery.", fill='#64748B', font_size=14)

    out_path = "diagrams/pert_chart.png"
    img.save(out_path)
    print(f"✅ Generated Simple Presentation PERT Chart: {out_path}")

if __name__ == "__main__":
    create_simple_pert_chart()
