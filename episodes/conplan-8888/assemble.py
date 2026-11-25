"""Assemble the CONPLAN 8888 voiceover: narration + loudspeaker (PA treatment) + Jo (radio treatment), loudness-normalised, with timed gaps.
Writes voiceover.wav (work), public/conplan-8888/voiceover.mp3, clip-offsets.json, work/total.txt."""
import json, os, subprocess

os.makedirs("work", exist_ok=True)
SR = 44100
LEAD = 3.0  # emergency-alert tones play before the first line

# (file, gap BEFORE this clip in seconds, treatment)
ORDER = [
    ("01-coldopen", LEAD, "narr"),
    ("L1-loudspeaker", 0.9, "pa"),
    ("02-realplan", 1.6, "narr"),
    ("03-fence-climb", 1.4, "narr"),
    ("04-day1-day3", 1.4, "narr"),
    ("05-day6", 1.4, "narr"),
    ("06-day12-day18", 1.4, "narr"),
    ("07-day24", 1.4, "narr"),
    ("08-day27", 1.4, "narr"),
    ("09-day40a", 1.4, "narr"),
    ("J1-jo", 1.0, "radio"),
    ("10-pause", 0.7, "narr"),
    ("J2-jo", 1.4, "radio"),
    ("11-day40b", 1.0, "narr"),
    ("12-outro", 2.5, "narr"),
]
FILTERS = {
    "narr": "loudnorm=I=-16:TP=-1.5:LRA=11",
    # public-address horn: narrow band, slight overdrive, outdoor slap echo
    "pa": "highpass=f=400,lowpass=f=3500,acompressor=threshold=-20dB:ratio=6,aecho=0.8:0.6:180|360:0.35|0.2,loudnorm=I=-18:TP=-2",
    # hand-crank radio: telephone band, light crunch
    "radio": "highpass=f=350,lowpass=f=3000,acrusher=bits=10:mix=0.25,acompressor=threshold=-22dB:ratio=5,loudnorm=I=-18:TP=-2",
}

def sil(d, name):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", f"anullsrc=r={SR}:cl=mono", "-t", f"{d:.3f}", name], check=True)
    return name

parts, offsets, t = [], [], 0.0
for i, (name, gap, kind) in enumerate(ORDER):
    parts.append(sil(gap, f"work/gap{i:02d}.wav")); t += gap
    out = f"work/{name}.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"audio/{name}.mp3", "-af", FILTERS[kind], "-ar", str(SR), "-ac", "1", out], check=True)
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]))
    offsets.append({"clip": name, "kind": kind, "start": round(t, 3), "dur": round(d, 3)})
    parts.append(out); t += d
parts.append(sil(4.0, "work/tail.wav")); t += 4.0  # room for the end card

open("work/list.txt", "w").write("".join(f"file '{os.path.basename(p)}'\n" for p in parts))
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", "work/list.txt", "-c", "pcm_s16le", "voiceover.wav"], check=True)
os.makedirs("../../public/conplan-8888", exist_ok=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", "voiceover.wav", "-c:a", "libmp3lame", "-b:a", "192k", "../../public/conplan-8888/voiceover.mp3"], check=True)
json.dump(offsets, open("clip-offsets.json", "w"), indent=1)
open("work/total.txt", "w").write(str(t))
print(f"total {t:.1f}s = {int(t // 60)}:{t % 60:04.1f}")
