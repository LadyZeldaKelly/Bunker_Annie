"""Mix the CONPLAN 8888 soundtrack: voiceover + ducked music + ambience beds + spot effects.
Cue times come from the voiceover transcript (word timings) and shots.json, so the mix follows the edit.
Writes public/conplan-8888/soundtrack.mp3 and work/mix-cues.txt (free: ffmpeg only)."""
import json, re, subprocess, os

SFX = "../../public/conplan-8888/sfx/"
VO = "../../public/conplan-8888/voiceover.mp3"
OUT = "../../public/conplan-8888/soundtrack.mp3"
TOTAL = float(open("work/total.txt").read())

words = json.load(open("voiceover.json"))["word_segments"]
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())
W = [(norm(w["word"]), w.get("start")) for w in words]
shots = {s["id"]: s for s in json.load(open("shots.json"))["shots"]}

def word(phrase, after=0.0):
    """Start time of the first occurrence of `phrase` after `after` seconds."""
    t = [norm(x) for x in phrase.split()]
    for i in range(len(W) - len(t)):
        if W[i][1] is not None and W[i][1] >= after and all(W[i + k][0].startswith(t[k]) for k in range(len(t))):
            return W[i][1]
    raise SystemExit(f"phrase not found: {phrase}")

S = lambda sid: shots[sid]["start"]
E = lambda sid: shots[sid]["end"]

# Ambience beds: (file, start, end, gain dB)
BEDS = [
    ("A6-car-interior", S("s02"), E("s03"), -14),
    ("A2-crowd", S("s07"), E("s20"), -20),
    ("A1-night-plains", S("s21"), E("s28"), -18),
    ("A3-rain", S("s34"), E("s35"), -16),
    ("A4-noon", S("s36"), E("s42"), -20),
    ("A1-night-plains", S("s43"), E("s50"), -19),
    ("A4-noon", S("s51"), E("s56"), -20),
    ("A1-night-plains", S("s57"), E("s60"), -20),
    ("A3-rain", word("rain returns") - 1.0, word("rain returns") + 6, -18),
    ("A1-night-plains", S("s64"), E("s65"), -20),
    ("A5-radio-hiss", S("s67"), E("s70"), -24),
    ("A1-night-plains", S("s71"), E("s71"), -18),
]

# Spot effects: (file, time, gain dB)
REAL = ["s11", "s12", "s13", "s18", "s33", "s37", "s52", "s58", "s61", "s63", "s66"]
HITS = [
    ("S01-alert-tones", 0.2, -4),
    ("S02-phone-buzz", 0.6, -10),
    ("S04-gurney", word("guards carried") , -6),
    ("S03-steel-doors", S("s05") + 0.2, -4),
    ("S06-pa-crackle", 58.2, -8),
    ("S24-boom", S("s11") - 0.1, -6),
    ("S05-horns", S("s17") + 0.1, -8),
    ("S05-horns", S("s17") + 1.9, -12),
    ("S21-flashlight-click", S("s26") + 0.3, -6),
    ("S08-ladder-set", S("s27") + 0.4, -6),
    ("S25-ladder-climb-steps", S("s27") + 2.5, -6),
    ("S09-ladder-haul", S("s28") + 0.5, -8),
    ("S14-crows", S("s29") + 0.5, -12),
    ("S22-wind-gust", S("s30"), -10),
    ("S08-ladder-set", S("s38") + 0.3, -8),
    ("S18-bleach-drops", S("s43") + 3.0, 0),
    ("S10-pickup-approach", S("s44") + 0.2, -6),
    ("S09-ladder-haul", S("s45") + 0.3, -4),
    ("S11-men-shouting", S("s46") + 0.3, -10),
    ("S11-men-shouting", S("s46") + 4.0, -14),
    ("S12-pickup-away", S("s47"), -8),
    ("S21-flashlight-click", S("s48") + 0.4, -6),
    ("S15-mud-slip", word("slips in the mud"), -2),
    ("S16-reeds-lunge", word("hand comes out"), 0),
    ("S07-run-wheat", word("you run") - 0.2, 0),
    ("S25-ladder-climb-steps", word("you climb"), -4),
    ("S17-water-filter", S("s57") + 0.8, 0),
    ("S19-radio-crank", S("s67") + 0.2, -6),
    ("S20-radio-tune", S("s67") + 1.5, -10),
    ("S13-ladder-knock", word("something knocks"), 0),
    ("S13-ladder-knock", word("brought their own"), -3),
    ("S24-boom", S("s72"), -2),
] + [("S23-typewriter-stamp", S(s) + 0.1, -6) for s in REAL]

# Music: tension bed looped from the end of the alert tones up to the climax cue, ducked under the voice;
# climax cue ends exactly on the cut to black (s72); the bed returns quietly for the outro.
CLIMAX_END = S("s72")
CLIMAX_START = CLIMAX_END - 30.0
BED_START, BED_END = 3.0, CLIMAX_START + 1.5

def run(args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + args, check=True)

os.makedirs("work/mix", exist_ok=True)
layers = []  # (wav path)
for i, (f, a, b, g) in enumerate(BEDS):
    d = max(0.5, b - a)
    p = f"work/mix/bed{i:02d}.wav"
    run(["-stream_loop", "-1", "-i", SFX + f + ".mp3", "-t", f"{d:.3f}", "-af",
         f"volume={g}dB,afade=t=in:d=1.2,afade=t=out:st={max(0, d - 1.5):.3f}:d=1.5,adelay={int(a * 1000)}:all=1",
         "-ar", "44100", "-ac", "2", p])
    layers.append(p)
for i, (f, t, g) in enumerate(HITS):
    p = f"work/mix/hit{i:02d}.wav"
    extra = ",atrim=0:3.2,afade=t=out:st=2.4:d=0.8" if f == "S01-alert-tones" else ""
    run(["-i", SFX + f + ".mp3", "-af", f"volume={g}dB{extra},adelay={int(max(0, t) * 1000)}:all=1", "-ar", "44100", "-ac", "2", p])
    layers.append(p)

# music bed (looped) + climax + outro tail
d = BED_END - BED_START
run(["-stream_loop", "-1", "-i", SFX + "M1-tension-bed.mp3", "-t", f"{d:.3f}", "-af",
     f"volume=-6dB,afade=t=in:d=3,afade=t=out:st={d - 2:.3f}:d=2,adelay={int(BED_START * 1000)}:all=1", "-ar", "44100", "-ac", "2", "work/mix/music-bed.wav"])
run(["-i", SFX + "M2-climax.mp3", "-af", f"volume=-2dB,atrim=0:30,afade=t=in:d=2,adelay={int(CLIMAX_START * 1000)}:all=1",
     "-ar", "44100", "-ac", "2", "work/mix/music-climax.wav"])
od = TOTAL - S("s73")
run(["-i", SFX + "M1-tension-bed.mp3", "-t", f"{od:.3f}", "-af",
     f"volume=-14dB,afade=t=in:d=2,afade=t=out:st={od - 3:.3f}:d=3,adelay={int(S('s73') * 1000)}:all=1", "-ar", "44100", "-ac", "2", "work/mix/music-outro.wav"])

# Duck all music under the voice (sidechain), then sum everything with the voice on top.
run(["-i", "work/mix/music-bed.wav", "-i", "work/mix/music-climax.wav", "-i", "work/mix/music-outro.wav", "-i", VO,
     "-filter_complex",
     "[0][1][2]amix=inputs=3:normalize=0[m];[3]aformat=sample_rates=44100:channel_layouts=stereo[sc];"
     "[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=600",
     "-t", f"{TOTAL:.3f}", "work/mix/music-ducked.wav"])

inputs = ["-i", VO, "-i", "work/mix/music-ducked.wav"]
for p in layers:
    inputs += ["-i", p]
n = 2 + len(layers)
run(inputs + ["-filter_complex",
              f"[0]aformat=channel_layouts=stereo[v];[v]" + "".join(f"[{i}]" for i in range(1, n)) +
              f"amix=inputs={n}:normalize=0:duration=first,alimiter=limit=0.95,loudnorm=I=-16:TP=-1.5:LRA=11[out]",
              "-map", "[out]", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "192k", OUT])
with open("work/mix-cues.txt", "w") as f:
    for b in BEDS: f.write(f"BED {b[0]} {b[1]:.2f}-{b[2]:.2f} {b[3]}dB\n")
    for h in HITS: f.write(f"HIT {h[0]} {h[1]:.2f} {h[2]}dB\n")
    f.write(f"MUSIC bed {BED_START}-{BED_END:.2f}, climax {CLIMAX_START:.2f}-{CLIMAX_END:.2f}, outro {S('s73'):.2f}-end\n")
print("wrote", OUT)
