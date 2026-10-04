import subprocess
import time
import os

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT_DIR = "/Users/anirudhbhatt/Major Project/Team_Share_Pack/screenshots"
ROOT_OUT_DIR = "/Users/anirudhbhatt/Major Project/screenshots"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ROOT_OUT_DIR, exist_ok=True)

# We can navigate directly or click tabs on http://localhost:5173/
screens = [
    ("01_vittiya_master_executive_dashboard.png", "http://localhost:5173/"),
    ("02_ai_causal_dag_visualizer.png", "http://localhost:5173/?tab=causal"),
    ("03_groww_ipos_hub_realtime.png", "http://localhost:5173/?tab=ipos"),
    ("04_macro_news_connectivity_radar.png", "http://localhost:5173/?tab=news"),
    ("05_supply_chain_dependency_explorer.png", "http://localhost:5173/?tab=supply"),
    ("06_financial_calculators_hub.png", "http://localhost:5173/?tab=commodities"),
    ("07_global_commodities_exchange.png", "http://localhost:5173/?tab=commodities")
]

for filename, url in screens:
    out_path = os.path.join(OUT_DIR, filename)
    root_out_path = os.path.join(ROOT_OUT_DIR, filename)
    
    cmd = [
        CHROME_BIN,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1440,900",
        f"--screenshot={out_path}",
        url
    ]
    print(f"Capturing {filename} from {url}...")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Copy to root screenshots dir as well
    if os.path.exists(out_path):
        subprocess.run(["cp", out_path, root_out_path])
        print(f"✅ Successfully captured {filename} ({os.path.getsize(out_path)} bytes)")

print("\n🎉 ALL LIVE WEBSITE SCREENSHOTS CAPTURED SUCCESSFULLY!")
