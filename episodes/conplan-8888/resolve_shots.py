"""Resolve shotplan anchors to voiceover timings → shots.json (start/end seconds + frames @30fps)."""
import json, re, sys
sys.path.insert(0, '.')
from shotplan import SHOTS
FPS = 30
d = json.load(open('voiceover.json'))
total = float(open('work/total.txt').read())
n = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())
W, last = [], 0.0
for w in d['word_segments']:
    s = w.get('start'); last = s if s is not None else last
    W.append((n(w['word']), last))
SYN = {"twoohsix": "206", "travelling": "traveling", "eighteen": "18", "twentyseven": "27", "thirtyone": "31",
       "thirty": "30", "forty": "40"}
def toks(anchor):
    t = [n(x) for x in anchor.replace("-", "").split()]
    return [SYN.get(x, x) for x in t if x][:4]
def match(a, b): return a == b or (len(b) > 2 and (a.startswith(b) or b.startswith(a)))
def find(anchor, frm):
    t = toks(anchor)
    for i in range(frm, len(W) - len(t)):
        if all(match(W[i + k][0], t[k]) for k in range(len(t))): return i
    sys.exit(f"anchor not found: {anchor!r} {t}")
rows, pos = [], 0
for sid, anc, kind, ref, key, desc in SHOTS:
    if anc == "<start>": t = 0.0
    elif anc == "<end>": t = W[-1][1] + 1.5
    else:
        i = find(anc, pos); pos = i + 1
        t = max(0.0, W[i][1] - 0.25)  # cut just before the first word
    rows.append({"id": sid, "kind": kind, "key": key, "start": round(t, 3)})
for a, b in zip(rows, rows[1:] + [{"start": total}]): a["end"] = b["start"]
for r in rows:
    r["from"] = round(r["start"] * FPS); r["dur"] = round(r["end"] * FPS) - r["from"]
json.dump({"fps": FPS, "total_frames": round(total * FPS), "shots": rows}, open('shots.json', 'w'), indent=1)
for r in rows: print(f"{r['id']:4} {r['kind']} {r['start']:7.2f} {r['end']-r['start']:5.1f}s {r['key']}")
