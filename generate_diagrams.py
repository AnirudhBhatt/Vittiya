import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

os.makedirs("diagrams", exist_ok=True)

# Set global styles
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 9

# --- DIAGRAM 1: SYSTEM ARCHITECTURE FLOWCHART ---
def create_system_architecture_diagram():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')
    
    # Background card
    rect_bg = patches.FancyBboxPatch((0.2, 0.2), 9.6, 4.6, boxstyle="round,pad=0.1", ec="#002060", fc="#F4F6F9", lw=1.5)
    ax.add_patch(rect_bg)
    
    # Title
    ax.text(5, 4.5, "VITTIYA AI — SYSTEM ARCHITECTURE & DATA FLOW ENGINE", ha='center', va='center', fontsize=11, fontweight='bold', color='#002060')
    
    # Layers
    boxes = [
        # (x, y, w, h, title, subtitle, bg_color, txt_color)
        (0.5, 3.2, 2.6, 0.8, "EXTERNAL DATA SOURCES", "Yahoo Finance v8 API\nGlobal Interbank Forex", "#002060", "white"),
        (3.7, 3.2, 2.6, 0.8, "MULTI-PROXY STACK", "allorigins.win | corsproxy.io\n3500ms AbortSignal", "#004080", "white"),
        (6.9, 3.2, 2.6, 0.8, "STREAMER ENGINE", "1.8s High-Freq Ticker Pulse\nIST Market Clock Evaluator", "#006699", "white"),
        
        (0.5, 1.8, 4.3, 1.0, "SANITY & REGEX PARSING PIPELINE", "P_clean = parseFloat(P_raw.replace(/,/g, ''))\nZero Price Distortion Guaranty", "#0052CC", "white"),
        (5.2, 1.8, 4.3, 1.0, "AI CAUSAL DAG PROPAGATION ENGINE", "G = (V, E) Topological Traversal\nImpact (88), Opportunity (42), Risk (91)", "#006600", "white"),
        
        (0.5, 0.4, 9.0, 0.9, "GLASSMORPHISM SINGLE PAGE INTERFACE (React 18 + Vite 8 + Tailwind CSS)", "Master Executive Dashboard | Groww Real-Time IPOs Hub | Macro News Radar | Stock Inspector", "#002060", "white")
    ]
    
    for x, y, w, h, title, sub, bg, fg in boxes:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.08", ec="none", fc=bg)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.65, title, ha='center', va='center', fontsize=9, fontweight='bold', color=fg)
        ax.text(x + w/2, y + h*0.3, sub, ha='center', va='center', fontsize=7.5, color='#E2E8F0')
        
    # Arrows
    arrow_style = dict(arrowstyle="-|>", color="#002060", lw=2, mutation_scale=15)
    ax.annotate("", xy=(3.7, 3.6), xytext=(3.1, 3.6), arrowprops=arrow_style)
    ax.annotate("", xy=(6.9, 3.6), xytext=(6.3, 3.6), arrowprops=arrow_style)
    ax.annotate("", xy=(2.65, 2.8), xytext=(5.0, 3.2), arrowprops=arrow_style)
    ax.annotate("", xy=(7.35, 2.8), xytext=(8.2, 3.2), arrowprops=arrow_style)
    ax.annotate("", xy=(2.65, 1.3), xytext=(2.65, 1.8), arrowprops=arrow_style)
    ax.annotate("", xy=(7.35, 1.3), xytext=(7.35, 1.8), arrowprops=arrow_style)

    plt.tight_layout()
    img_path = "diagrams/diagram_1_system_architecture.png"
    plt.savefig(img_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"✅ Generated {img_path}")

# --- DIAGRAM 2: CAUSAL DAG SHOCK PROPAGATION FLOWCHART ---
def create_causal_dag_diagram():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')
    
    # Background card
    rect_bg = patches.FancyBboxPatch((0.2, 0.2), 9.6, 4.6, boxstyle="round,pad=0.1", ec="#990000", fc="#FFF5F5", lw=1.5)
    ax.add_patch(rect_bg)
    
    ax.text(5, 4.5, "TOPOLOGICAL CAUSAL DAG SHOCK PROPAGATION ENGINE", ha='center', va='center', fontsize=11, fontweight='bold', color='#990000')
    
    # Nodes
    nodes = [
        # (x, y, w, h, title, sub, bg, fg)
        (0.5, 2.0, 2.0, 1.2, "MACRO TRIGGER", "Red Sea Naval\nBlockade (96% C)", "#990000", "white"),
        
        (3.0, 3.1, 2.2, 1.0, "COMMODITY 1", "Spot Container\nFreight (+35%)", "#C53030", "white"),
        (3.0, 0.9, 2.2, 1.0, "COMMODITY 2", "Brent Crude Oil\n($83.86/bbl +3%)", "#C53030", "white"),
        
        (5.7, 3.6, 2.1, 0.85, "INDUSTRY 1", "Paint OEMs\n(-14% Margin)", "#DD6B20", "white"),
        (5.7, 2.5, 2.1, 0.85, "INDUSTRY 2", "Airlines ATF\n(-12% Margin)", "#DD6B20", "white"),
        (5.7, 0.5, 2.1, 0.85, "BENEFICIARY", "OMC Refineries\n(GRM +$2.4/bbl)", "#2F855A", "white"),
        
        (8.2, 2.0, 1.5, 1.2, "PORTFOLIO", "Retail Drag\nScore 90", "#742A2A", "white")
    ]
    
    for x, y, w, h, title, sub, bg, fg in nodes:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.06", ec="none", fc=bg)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.7, title, ha='center', va='center', fontsize=8, fontweight='bold', color=fg)
        ax.text(x + w/2, y + h*0.3, sub, ha='center', va='center', fontsize=7.5, color='#F7FAFC')
        
    # Edge arrows
    arrow = dict(arrowstyle="-|>", color="#990000", lw=1.8, mutation_scale=12)
    ax.annotate("", xy=(3.0, 3.6), xytext=(2.5, 2.8), arrowprops=arrow)
    ax.annotate("", xy=(3.0, 1.4), xytext=(2.5, 2.4), arrowprops=arrow)
    
    ax.annotate("", xy=(5.7, 4.0), xytext=(5.2, 3.6), arrowprops=arrow)
    ax.annotate("", xy=(5.7, 2.9), xytext=(5.2, 1.4), arrowprops=arrow)
    ax.annotate("", xy=(5.7, 0.9), xytext=(5.2, 1.2), arrowprops=arrow)
    
    ax.annotate("", xy=(8.2, 2.6), xytext=(7.8, 4.0), arrowprops=arrow)
    ax.annotate("", xy=(8.2, 2.4), xytext=(7.8, 2.9), arrowprops=arrow)

    plt.tight_layout()
    img_path = "diagrams/diagram_2_causal_dag.png"
    plt.savefig(img_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"✅ Generated {img_path}")

# --- DIAGRAM 3: DATA FLOW DIAGRAM (DFD LEVEL 1) ---
def create_dfd_diagram():
    fig, ax = plt.subplots(figsize=(10, 4.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.5)
    ax.axis('off')
    
    rect_bg = patches.FancyBboxPatch((0.2, 0.2), 9.6, 4.1, boxstyle="round,pad=0.1", ec="#2B6CB0", fc="#EBF8FF", lw=1.5)
    ax.add_patch(rect_bg)
    
    ax.text(5, 4.0, "DATA FLOW DIAGRAM (DFD LEVEL 1) — REST INGESTION & UI RENDER PIPELINE", ha='center', va='center', fontsize=11, fontweight='bold', color='#2B6CB0')
    
    dfd_nodes = [
        (0.5, 1.5, 1.8, 1.2, "1.0 CLIENT SPA", "React 18 State\nUser Search Query", "#2B6CB0", "white"),
        (2.8, 1.5, 2.0, 1.2, "2.0 PROXY STACK", "Multi-Proxy Fallback\n3.5s AbortSignal", "#2C5282", "white"),
        (5.3, 1.5, 2.0, 1.2, "3.0 REGEX SANITY", "parseFloat() Sanitizer\nZero String Defect", "#2B6CB0", "white"),
        (7.8, 1.5, 1.7, 1.2, "4.0 UI RENDER", "Header Ticker\nIPO & DAG Visuals", "#2C5282", "white")
    ]
    
    for x, y, w, h, title, sub, bg, fg in dfd_nodes:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.06", ec="none", fc=bg)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.7, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color=fg)
        ax.text(x + w/2, y + h*0.3, sub, ha='center', va='center', fontsize=7.5, color='#EBF8FF')

    arrow = dict(arrowstyle="-|>", color="#2B6CB0", lw=2, mutation_scale=15)
    ax.annotate("", xy=(2.8, 2.1), xytext=(2.3, 2.1), arrowprops=arrow)
    ax.annotate("", xy=(5.3, 2.1), xytext=(4.8, 2.1), arrowprops=arrow)
    ax.annotate("", xy=(7.8, 2.1), xytext=(7.3, 2.1), arrowprops=arrow)

    plt.tight_layout()
    img_path = "diagrams/diagram_3_dfd_level_1.png"
    plt.savefig(img_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"✅ Generated {img_path}")

if __name__ == "__main__":
    create_system_architecture_diagram()
    create_causal_dag_diagram()
    create_dfd_diagram()
