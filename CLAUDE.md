# YouTube video workspace

## Voiceovers
- Default narrator: ElevenLabs cloned voice **"Best Lady Zelda Voice"**, voice_id `ts35GfEB5Qol9vrcYHvB`.
- Other voices of the user's own: "Lady Zelda Kelly" (`D2oMKkEO7Uuzetw4yT3r`), "Lady Zelda Kelly Whisper" (`8VMJjEaPloxwNGAeLE9K`) — use only when asked.
- Generating speech spends the user's ElevenLabs credits: only generate after the user approves the script.

## Workflow
1. Script → voiceover via ElevenLabs (creative_generate_speech) with the voice above.
2. Save the audio in `public/` and transcribe: `./transcribe.sh public/<file> "<names/jargon hints>"` → word timings in `<file>.json` (`word_segments`).
3. Build the video in Remotion (`src/`), following the Remotion skills in `.claude/skills`; preview with `npx remotion studio`, render with `npx remotion render`.

## Tools
- Remotion project in this folder (`src/Root.tsx`, `src/Composition.tsx`).
- whisperX in `.venv-whisperx` (Python 3.12, CPU, `small` model; set `WHISPER_MODEL=medium` for harder audio).
- ffmpeg at `/usr/bin/ffmpeg`.

## Visual style (the user OWNS the "Don't Go There" channel and its Bunker Annie character/art — these may be reused freely)
- Art: AI-generated flat 2D comic/vector illustrations, clean black outlines (2–3px), flat colours with one-step cel shading, simple round-headed characters with dot eyes. One still image per scene, 16:9.
- Motion: slow Ken Burns zoom-in (~1.00 → 1.08 over the shot) on every scene; characters stay still.
- Life comes from code overlays: pulsing radial light glows (alarm red #E62E2E, amber #F5A623, police blue #2E6BE6), searchlights, CRT scanlines on screens, power-outage darkening (#0A101A multiply ~70%).
- Palette: night navy #0D1526, concrete #3A3F47, slate #5A626A/#7D858E, accent orange #D96B27.
- Text: NO captions. Only a bold uppercase white sans-serif chapter title top-left (e.g. "DAY 1"); other text lives inside the art.
- Editing: hard cuts only. Shots 8–25s during set-up, 4–10s during action. End on a cliffhanger.
- Sound: calm, suspenseful narration (default voice above) over a low tense drone + sound effects.
- Images cost the user's credits: show a test image before generating a full set.

## Template (src/story)
- `Scene` (Ken Burns still: image, zoomTo, focusX/Y) with overlay children: `LightGlow`, `Siren`, `Darken`, `Scanlines`, `ChapterTitle` (src/story/Overlays.tsx).
- `src/StoryVideo.tsx` = episode timeline (Track "Scenes"); `StyleTest` composition in Root.tsx is the approved style test.
- Images: ElevenLabs `gpt-image-2.5-sunburst`, 16:9, prompt style as in "Visual style"; save to `public/scenes/`.
- Title font: Oswald Bold bundled at public/fonts (renders work offline). Renders use the preinstalled Chromium (remotion.config.ts).

## Cast (keep on-model — paste these descriptions into every image prompt)
- ANNIE: middle-aged female corrections officer; round white head, grey hair in a neat bun at the back with a grey side-swept fringe, dark eyebrows; slate-blue uniform shirt with collar and small white clip-on ID badge; dark navy trousers; black gloves; black duty belt with radio; black flashlight. Voice: narrator voice (Best Lady Zelda Voice).
- DENISE (from Night 2): inmate, bright orange jumpsuit with rolled-up sleeves; round white head, thick black curly hair tied up on top, strong dark eyebrows, small hoop earrings. Voice: Sarah (EXAVITQu4vr4xnSDxMaL).
- Other inmates: Jessica, Laura, Bella, Matilda voices. Mystery voices: River (SAz9YHcvj6GT2YYXdXww) with [whispers] [raspy], muffled in post.
- Annie's cat: grey tabby.
- Image style prompt prefix: "Wide 16:9 frame from a simple 2D cartoon YouTube story. Style: flat digital cartoon illustration, clean uniform black outlines, FLAT colours with soft one-step cel shading, no realistic textures, no reflections, minimal detail, cool grey-blue palette. Characters have large perfectly round white heads, simple black dot eyes with short expressive eyebrows, small simple mouths, slender limbs." End with "No text, no letters, no logos, no watermark." Use gpt-image-2 only for shots with written text.

## Episode pipeline (see episodes/night-2 for a worked example)
1. Save script → episodes/<ep>/script.md; write shot-list.md; get approval (takes: user prefers 1 take each).
2. Voice: one eleven_v4 generation per narrator chunk / character line (1 take); download from elevenlabsusercontent.com into episodes/<ep>/audio/NN-name.mp3.
3. Assemble with loudnorm + gaps (0.35s lines, 1.4s scenes; door/off-screen voices get lowpass+echo) → public/<ep>/voiceover.mp3; clip-offsets.json.
4. ./transcribe.sh → voiceover.json; anchors.txt (first words of each shot) → shots.json (frames). Whisper may skip whispered lines: fall back to clip-offsets.
5. Images → public/<ep>/img/sNN.png; contact sheet check.
6. Generate src/episodes/<Ep>.tsx (one <Scene> per shot + Voiceover track), register in Root.tsx, check stills, render to out/.
- ElevenLabs MCP here can't upload local files; reference images only via public URLs.

## Thumbnails
- Template: src/story/Thumbnail.tsx (Anton font, white label + red number, coloured hook line, dark fade behind text). One <Still> per option in Root.tsx (Folder "Thumbnails"); render with `npx remotion still <id> out/thumbnails/<name>.png`.
- Best results: a NEW bright, close-up thumbnail image (big scared character, clear threat, leave a corner empty for text). Reused dark episode shots need brightness ~1.5 and still read weaker.
- Keep text off faces; use hookAtBottom when the top-left is busy.

## PERMANENT visual identity — Don't Go There! standalone survival stories (user-approved 25 Nov 2026: OPTION A, CINEMATIC REALISM)
- Photorealistic cinematic film stills: realistic human proportions, detailed real-world environments, atmospheric practical lighting, serious post-apocalyptic film aesthetic. Restrained colours, dramatic shadows, environmental storytelling, subtle camera movement (slow push-ins/drifts, hard cuts).
- Do NOT drift toward painterly illustration. NEVER stick figures, vector cartoons, comic-strip panels, or VibeStick's recognizable style. Bunker Annie keeps its own 2D cartoon style as the flagship series; never mix the two.
- Benchmark for atmosphere/lighting/composition: public/conplan-8888/img/test-frame1-gate-night.png (approved).
- Consistent characters in every shot: generate with the approved sheet as reference (connect_from; ~433 credits/shot vs ~190 without).
- Image prompt prefix: "Wide 16:9 photorealistic cinematic film still, realistic human proportions, detailed real-world environment, serious post-apocalyptic film aesthetic, restrained desaturated colours, dramatic shadows, practical light sources, subtle film grain." End: "Not cartoon, not illustration, no outlines, no stick figures, no comic panels. No text, no letters, no logos, no watermark."
- ELI (APPROVED sheet: public/conplan-8888/img/test-eli-sheet.png; ElevenLabs flow EbzCqs78peGNRUhsSm6g node skdFpjkyyaGmK2OOeHcJ): ~10, thin, dark brown curly hair, light brown skin, faint freckles, brown eyes; faded muted brick-RED pullover hoodie (white uneven drawstrings, hood down, dirt smudge on one sleeve), dark blue worn jeans, grey-and-white muddy sneakers, olive/dark green one-strap backpack. Red hoodie = permanent identifier.
- "YOU" (lock): never face-on; dark green canvas jacket, grey knit beanie, jeans, wristwatch.

## CONPLAN 8888 episode (Don't Go There! cinematic format — NOT Bunker Annie style)
- Bunker Annie stays the flagship cartoon series. This is a separate cinematic survival-horror format on the same channel: realistic painterly stills, practical light only, "you" never shown face-on, Eli = red hoodie (only saturated red). See episodes/conplan-8888/visual-treatment.md.
- Real vs fiction: only real CONPLAN 8888-11 text may appear in code-built "REAL FILE" inserts (page-stamped); everything else is fiction (fictional "Calder Air Station"). Facts: episodes/conplan-8888/fact-check-40-days.md, full text research/conplan-8888-11-text.md.
- Status 25 Nov 2026: research approved; Concept 1 approved for development; script Draft 1 + visual treatment sent. Visual test DONE (570 credits, flow EbzCqs78peGNRUhsSm6g): Option A cinematic realism APPROVED; Eli sheet APPROVED; gate frame APPROVED as benchmark; tower frame approved with fixes (remove mountains → flat plains, bigger tower shadow, correct foreground hand; edit node 5qkewdlSH2b1Ru9Pt4II). Creative direction approved. Script Draft 2 (4 revisions: Jo's early warning, believable ladder climb, water sourcing/treatment with EPA/Ready.gov facts, Eli's Day-40 fever + worsened scratch) + budget ≈28,070 credits sent — AWAITING APPROVAL of the revised script. Voices APPROVED: narration + Eli's whisper = Best Lady Zelda Voice; Jo = Sarah (EXAVITQu4vr4xnSDxMaL) radio-filtered; loudspeaker = brief male library voice. Calder Air Station kept. Spend NOTHING until the revised script is approved.
- User requires a CINEMATIC FILM, not a slideshow: ~10 AI video clips at key moments + Remotion environmental animation (src/dgt/Atmos.tsx: Fog, Rain, Searchlight, PointLights, Silhouettes, FilmFinish, CinematicStill) on stills + layered SFX/ambience + original suspense music. Animation test DONE: Runway Gen-4 Turbo 5 s from gate frame, 1,515 credits (public/conplan-8888/video/test-runway-gate-5s.mp4; good realism/no distortion; searchlight went skyward + camera panned → do searchlights in code, keep camera prompts simple). Prices: Runway Turbo / Veo 3.1 Lite ≈303 credits/s (Veo Lite = native 1080p, untested); Veo 3.1 Fast ≈909/s; Seedance 2.5 ≈3,360/s. APPROVED 25 Nov 2026: script Draft 2 + FULL plan v2 (≈48,490 credits: 53 images + tower fix, 9 Runway Gen-4 Turbo clips V2–V10 (V1 = test clip), Remotion atmosphere on stills, voice, ~30 SFX + 6 ambience, original music, thumbnail). Each clip re-do / anything beyond the plan needs approval. Stay within the estimate.
- PROGRESS 25 Nov 2026: voice DONE (9,021; public/conplan-8888/voiceover.mp3 9:34, transcript verified, shots.json via episodes/conplan-8888/resolve_shots.py). ALL 53 images DONE (18,036 incl. tower fix, exactly as budgeted; public/conplan-8888/img/c*.png; jobs in image-jobs.txt). Image moderation blocks ~1/3 of photoreal-child prompts (blocked = not charged): avoid 'frightened/tears/alone/heights/injury' wording for Eli, keep it gentle. Contact sheet approved (user: 'Yes proceed'). Clips V2–V10 DONE (15,150 as planned; public/conplan-8888/video/V*.mp4; jobs in video-jobs.txt; review reel episodes/conplan-8888/review/clips-review.mp4). V8 re-done with user approval (+1,515; clean; old take kept as V8-creek-v1-glove.mp4). Hand-in-reeds beat = code/SFX on still c53. Clips total 16,665. Next: SFX/ambience/music, then edit. Plan fix: clip rows summed 16,665 not 15,150 → V5 cut to 5 s to stay within ≈48,490.

