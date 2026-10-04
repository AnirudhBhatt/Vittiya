import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
from pptx import Presentation
from pptx.util import Inches as PptInches, Pt as PptPt
from pptx.dml.color import RGBColor as PptRGBColor
import os
import re

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def update_docx_file(filename):
    if not os.path.exists(filename):
        print(f"Skipping {filename} (not found)")
        return
        
    doc = docx.Document(filename)
    print(f"Updating {filename}...")
    
    # 1. Insert Methodology Flowchart into Section 2.1
    has_flowchart = any("Figure 2.1: VITTIYA AI — System Methodology Flowchart" in p.text for p in doc.paragraphs)
    if not has_flowchart:
        for i, p in enumerate(doc.paragraphs):
            if "2.1 Reference Algorithm" in p.text or "2.1.1" in p.text:
                target_p = doc.paragraphs[i]
                p_img = target_p.insert_paragraph_before()
                p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_img.paragraph_format.space_before = Pt(14)
                p_img.paragraph_format.space_after = Pt(4)
                p_img.add_run().add_picture("diagrams/methodology_flowchart.png", width=Inches(6.2))
                
                p_cap = target_p.insert_paragraph_before()
                p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_cap.paragraph_format.space_after = Pt(14)
                r_cap = p_cap.add_run("Figure 2.1: VITTIYA AI — System Methodology Flowchart (6 Integrated Engineering Stages)")
                r_cap.font.name = 'Times New Roman'
                r_cap.font.size = Pt(10.5)
                r_cap.font.bold = True
                r_cap.font.italic = True
                r_cap.font.color.rgb = RGBColor(0x00, 0x20, 0x60)
                break

    # 2. Insert PERT Chart & Schedule Section
    has_pert = any("PERT Network Chart" in p.text for p in doc.paragraphs)
    if not has_pert:
        # Find location before Section 3 or Appendix
        insert_target = None
        for i, p in enumerate(doc.paragraphs):
            if "3. SYSTEM REQUIREMENTS" in p.text or "APPENDIX" in p.text:
                insert_target = p
                break
                
        if insert_target is None:
            insert_target = doc.paragraphs[-1]

        # Add Heading
        p_hdr = insert_target.insert_paragraph_before()
        p_hdr.paragraph_format.space_before = Pt(18)
        p_hdr.paragraph_format.space_after = Pt(6)
        p_hdr.paragraph_format.keep_with_next = True
        r_hdr = p_hdr.add_run("2.9 Project Schedule & PERT Critical Path Analysis")
        r_hdr.font.name = 'Times New Roman'
        r_hdr.font.size = Pt(12)
        r_hdr.font.bold = True
        r_hdr.font.color.rgb = RGBColor(0x00, 0x40, 0x80)

        # Intro text
        p_desc = insert_target.insert_paragraph_before()
        p_desc.paragraph_format.line_spacing = 1.15
        p_desc.paragraph_format.space_after = Pt(8)
        p_desc.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r_desc = p_desc.add_run("To ensure rigorous project governance and timely execution, Project VITTIYA applies the Program Evaluation and Review Technique (PERT). The expected duration Te for each task is derived using three-point time estimation: Te = (a + 4m + b) / 6, where 'a' represents optimistic duration, 'm' represents most likely duration, and 'b' represents pessimistic duration. Task variance is calculated via σ² = ((b - a) / 6)². The Critical Path (Tasks A -> B -> C -> E -> H) governs total project completion, yielding an expected duration of 10.91 weeks (~11 Weeks).")
        r_desc.font.name = 'Times New Roman'
        r_desc.font.size = Pt(12)

        # PERT Diagram Image
        p_img = insert_target.insert_paragraph_before()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(10)
        p_img.paragraph_format.space_after = Pt(4)
        p_img.add_run().add_picture("diagrams/pert_chart.png", width=Inches(6.2))

        # Caption
        p_cap = insert_target.insert_paragraph_before()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_after = Pt(10)
        r_cap = p_cap.add_run("Figure 2.3: PERT Network Chart & Critical Path Analysis (Tasks A -> B -> C -> E -> H)")
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(10.5)
        r_cap.font.bold = True
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(0xC5, 0x30, 0x30)

        # PERT Table
        tbl_p = insert_target.insert_paragraph_before()
        tbl_p.paragraph_format.space_before = Pt(6)
        tbl_p.paragraph_format.space_after = Pt(6)
        
        tbl = doc.add_table(rows=9, cols=8)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        headers = ["ID", "Task Description", "Predecessors", "Opt (a)", "Likely (m)", "Pess (b)", "Te (wks)", "Critical?"]
        
        for c_idx, h_text in enumerate(headers):
            cell = tbl.cell(0, c_idx)
            set_cell_background(cell, "002060")
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            p = cell.paragraphs[0]
            r = p.add_run(h_text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(9.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

        rows_data = [
            ("A", "Requirement Analysis & Scope Definition", "—", "1.0", "2.0", "3.0", "2.00", "YES (Critical)"),
            ("B", "Yahoo Finance REST API & CORS Proxy Setup", "A", "1.0", "2.0", "4.0", "2.17", "YES (Critical)"),
            ("C", "Sanitize-and-Parse (SAP) Regex Engine", "B", "1.0", "1.5", "2.0", "1.50", "YES (Critical)"),
            ("D", "Chittorgarh IPO & GMP Calculation Module", "B", "1.0", "2.0", "3.0", "2.00", "NO (Slack 1.5w)"),
            ("E", "AI Causal DAG Graph & Topological Engine", "C", "2.0", "3.0", "5.0", "3.17", "YES (Critical)"),
            ("F", "Dynamic Stock Inspector & Candlestick Charts", "C", "1.5", "2.0", "3.5", "2.17", "NO (Slack 1.0w)"),
            ("G", "Enterprise Alert Bus & Glassmorphism UI", "D, F", "1.0", "1.5", "2.0", "1.50", "NO (Slack 1.0w)"),
            ("H", "System Integration, Stress Testing & Deploy", "E, G", "1.5", "2.0", "3.0", "2.07", "YES (Critical)")
        ]

        for r_idx, row_vals in enumerate(rows_data, start=1):
            is_crit = "YES" in row_vals[7]
            bg_color = "FFF5F5" if is_crit else ("F9FAFB" if r_idx % 2 == 1 else "FFFFFF")
            for c_idx, val in enumerate(row_vals):
                cell = tbl.cell(r_idx, c_idx)
                set_cell_background(cell, bg_color)
                set_cell_margins(cell, top=60, bottom=60, left=80, right=80)
                p = cell.paragraphs[0]
                r = p.add_run(val)
                r.font.name = 'Times New Roman'
                r.font.size = Pt(9.0)
                if is_crit:
                    r.font.bold = True
                    if c_idx == 7:
                        r.font.color.rgb = RGBColor(0xC5, 0x30, 0x30)

        # Move table before insert_target paragraph
        insert_target._p.addprevious(tbl._tbl)

    doc.save(filename)
    print(f"✅ Successfully updated {filename} with Methodology Flowchart & PERT Chart!")

def update_ppt_presentation():
    ppt_path = "Vittiya PPT.pptx"
    if not os.path.exists(ppt_path):
        print(f"Skipping {ppt_path} (not found)")
        return
        
    prs = Presentation(ppt_path)
    print(f"Updating {ppt_path}...")
    
    blank_slide_layout = prs.slide_layouts[6] if len(prs.slide_layouts) > 6 else prs.slide_layouts[0]
    
    # 1. Slide: Methodology Flowchart
    slide_methodology = prs.slides.add_slide(blank_slide_layout)
    
    # Add Title
    txBox = slide_methodology.shapes.add_textbox(PptInches(0.8), PptInches(0.4), PptInches(11.7), PptInches(0.8))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = "System Methodology Flowchart"
    p.font.size = PptPt(28)
    p.font.bold = True
    p.font.color.rgb = PptRGBColor(0x00, 0x20, 0x60)
    
    # Add Methodology Image
    slide_methodology.shapes.add_picture("diagrams/methodology_flowchart.png", PptInches(0.8), PptInches(1.3), width=PptInches(11.7))

    # 2. Slide: PERT Chart & Critical Path Analysis
    slide_pert = prs.slides.add_slide(blank_slide_layout)
    
    # Add Title
    txBox2 = slide_pert.shapes.add_textbox(PptInches(0.8), PptInches(0.4), PptInches(11.7), PptInches(0.8))
    tf2 = txBox2.text_frame
    p2 = tf2.paragraphs[0]
    p2.text = "PERT Network Chart & Critical Path Analysis"
    p2.font.size = PptPt(28)
    p2.font.bold = True
    p2.font.color.rgb = PptRGBColor(0xC5, 0x30, 0x30)
    
    # Add PERT Image
    slide_pert.shapes.add_picture("diagrams/pert_chart.png", PptInches(0.8), PptInches(1.3), width=PptInches(11.7))

    prs.save(ppt_path)
    print(f"✅ Successfully updated {ppt_path} with 2 new diagram slides!")

if __name__ == "__main__":
    update_docx_file("Major (1).docx")
    update_docx_file("Synopsis.docx")
    update_ppt_presentation()
