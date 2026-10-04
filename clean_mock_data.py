with open("src/data/mockData.ts", "r") as f:
    lines = f.readlines()

# Find index of line starting with "  {" right after IPOS_LIST closing "];"
start_cut = -1
end_cut = -1

for i in range(len(lines)):
    if "  id: 'ipo-blackbuck'," in lines[i]:
        # find ]; after this
        for j in range(i, i + 30):
            if lines[j].strip() == "];":
                start_cut = j + 1
                break
        break

for k in range(start_cut, len(lines)):
    if "export const NOTIFICATIONS_LIST" in lines[k]:
        # end cut is the line before export const NOTIFICATIONS_LIST
        end_cut = k
        break

print(f"Cutting lines from index {start_cut} to {end_cut}")
if start_cut != -1 and end_cut != -1:
    new_lines = lines[:start_cut] + lines[end_cut:]
    with open("src/data/mockData.ts", "w") as f:
        f.writelines(new_lines)
    print("✅ Successfully cleaned src/data/mockData.ts!")
