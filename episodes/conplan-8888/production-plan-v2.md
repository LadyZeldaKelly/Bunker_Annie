# Revised production plan v2 — cinematic film, not a slideshow
**"The Military Locked the Gates for 40 Days. You're Outside the Fence." · Don't Go There! · 25 Nov 2026**
- Script Draft 2 (all four revisions) is unchanged.
- Approved identity: photorealistic cinematic realism; Eli's sheet; the gate frame as benchmark.
- Nothing beyond the approved 5-second test has been spent.

## 1. The animation test (done, 1,515 credits, exactly as quoted)
**Model:** Runway Gen-4 Turbo, image-to-video, 5 s, starting from the approved gate frame. Output is 1280×720, 24 fps, silent.

**What worked:**
- Fully photorealistic.
- Tail lights glow and shift and fog drifts.
- People in the crowd shift and raise phones.
- **No distorted people, no warping cars or buildings.** I checked the crowd close-up at the start and end of the clip.

**What didn't follow direction:**
- The searchlight. Instead of sweeping the fence, beams swing up into the sky, and a second beam appears.
- The camera pans more than "preserve composition" asked for.

**Fixes for production:**
- Drive the camera with one simple instruction ("slow push-in, camera steady").
- Add the searchlight in code instead (see section 3), where it sweeps exactly where we want.
- In general, AI clips handle *living* movement (people, vehicles, the infected). Remotion handles *controllable* light and weather.

**Resolution note:** Runway Turbo outputs 720p. In a 1080p film with grain and letterbox it holds up, but it's slightly softer than the stills. Google Veo 3.1 Lite costs the **same per second** and outputs **native 1080p**, and it can also take an *end frame*, which is useful for "the ladder appears". It's untested here. I'd suggest one 8-second Veo Lite comparison (2,424 credits) before production, **only with your approval**.

## 2. The ~10 animated sequences (AI video)
Each clip starts from our approved-style still (Eli clips from his sheet-referenced still), so faces, clothing and locations stay consistent. Price: Runway Gen-4 Turbo, about **303 credits per second**.

| # | Story moment | What moves | Length | Credits |
|---|---|---|---|---|
| V1 | Cold open: the gate at 2 a.m. | Cars, tail lights, fog, the waiting crowd | 5 s | **0 (the test clip, already paid)** |
| V2 | Day 0: on the highway | Dashboard view: phone alert lights the car, headlights stream past, wipers | 5 s | 1,515 |
| V3 | Decision: the dead on the interstate | Figures walking up the on-ramp toward the honking crowd, backlit | 5 s | 1,515 |
| V4 | Finding Eli | Eli turning toward you between cars, red hoodie, your hand reaching his | 5 s | 1,515 |
| V5 | The climb | Raising the aluminum ladder against the elevator; Eli climbing; ladder hauled up | 10 s | 3,030 |
| V6 | Day 6: the figure in the shade | It turns its head, then drifts off as a cloud shadow crosses the wheat | 5 s | 1,515 |
| V7 | Day 12: the living | Pickup headlights approach; flashlight beam; the ladder yanked up as a hand grabs air | 10 s | 3,030 |
| V8 | Day 24: the creek | Eli slips in the mud; a hand bursts from the reeds | 5 s | 1,515 |
| V9 | Day 40: the broadcast | Radio dial glowing at dawn; Eli, feverish, turns and whispers (no lip-sync, face partly lit) | 5 s | 1,515 |
| V10 | Cliffhanger | At the tower's foot, the top of a ladder knocks against the steel; a shape begins to climb | 5 s | 1,515 |
| | **New clips** | | **55 s total (50 s new)** | **15,150** |

- **Re-do allowance:** up to 3 clips (about 4,545). Only spent with your approval of each one, after you've seen the first version.
- **Lower-cost version:** 8 clips (drop V2 and V6; V5 and V7 at 5 s each), about **9,090**.

## 3. Environmental animation in Remotion (free, no credits)
I built and rendered a working demo on the approved gate frame (`remotion-atmos-demo.mp4`). These effects are now reusable code in `src/dgt/Atmos.tsx`:
- **Drifting fog**, in two depths, tinted to the scene's light.
- **Rain**: slanted streaks with depth, any intensity.
- **Searchlights** that sweep exactly where we choose (for example along the fence), with a glowing source point.
- **Flashing emergency lights:** red/blue strobes, flickering tail lights and headlights, phone screens.
- **Distant silhouettes:** small, soft, shuffling figures far away, never close-up.
- **Film finish:** grain, vignette and 2.39:1 letterbox bars.

**Also planned:**
- flashlight beams
- the three-short/three-long flash signal and the window flashing back
- a cloud shadow sweeping across the wheat
- heat shimmer at noon
- the hand-crank radio's dial glow and needle
- dust motes in sunlight
- the "REAL FILE" document typing on with a highlighter sweep
- the day counter ticking toward 40

**Where it's used:**
- On almost every still that isn't an AI clip, so nearly every shot has visible movement.
- Also layered on top of the AI clips to match their grade and grain to the stills.

## 4. Cinematic stills: only for quiet or establishing moments
The stills shrink to about **38 shots**: establishing views, inventory, the farmhouse, reflective night shots, and the REAL FILE transitions. Each gets only a slow, deliberate camera move plus its atmosphere layer.

The **10 video clips need 10 starting stills.** These are part of the image budget, and most already double as their scene's still. Total new images stay at **53** plus the tower correction.

## 5. Sound design (layered throughout)
| Layer | What | Credits |
|---|---|---|
| Narration | Best Lady Zelda Voice, including Eli's whispered line | ~8,200 |
| Supporting voices | Jo on the radio: Sarah, radio-filtered (~170). Military loudspeaker: brief male voice (~30). | ~200 |
| Sound effects (about 30, 50 each) | Alert tones; car engines idling, a pickup approaching; horns fading one by one; footsteps in wheat and gravel; aluminum ladder clank and scrape; metal knock on the tank; rain on steel; creek water and a splash; radio crank, static and tuning; distant crowd voices; crows; a bleach jug glugging; the loudspeaker crackle | ~1,500 |
| Ambience beds (about 6) | Plains wind, night insects, rain, distant crowd murmur, heat-haze stillness at noon, radio hiss | ~600 |
| **Suspenseful music (new)** | Original ElevenLabs Music: a 2-minute low, pulsing tension bed, looped and shaped under the story, plus a 45-second rising climax cue for Day 40 and the ladder. About 26.5 credits per second. | ~4,370 |

Mixing is free (ffmpeg): voice on top, music ducks under the narration, effects placed to the frame, and silence for the hand in the reeds and the knock.

## 6. Can our workflow do this?
**Yes:**
- Clips are generated through the same ElevenLabs connection: image-to-video from a still already on our ElevenLabs canvas, so no uploads are needed.
- Downloaded as MP4 and dropped into Remotion beside stills and graphics, cut on the voice timing.
- Graded to match: same grain, letterbox and colour.

I've proven this end to end with today's test clip.

**Limits:**
- Clips are short (5–10 s), so each is one action, not a whole scene.
- People can't speak on camera (no lip-sync); Eli's whisper is voiced over a near-still face.
- Close-up hands and faces in motion are the riskiest; I'll keep those shots brief.

## 7. Revised total
| Item | Credits |
|---|---|
| Images: 53 new + tower correction, with references for Eli, tower and base | 18,036 |
| AI video: 9 new clips, 50 s (V1 is today's test) | 15,150 |
| Voice: narration + Jo + loudspeaker | ~8,400 |
| Sound effects + ambience | ~2,100 |
| Original music (tension bed + climax cue) | ~4,370 |
| Thumbnail (new close-up, gate reference) | 433 |
| **Production total** | **≈ 48,490** |
| Already spent (visual test 570 + animation test 1,515) | 2,085 |
| **Whole episode** | **≈ 50,575** |

- **ElevenLabs' own dollar value** (shown with each estimate) is about **$10.70** for the production. On your Creator plan it comes out of your monthly credits, not as an extra charge, unless the allowance runs out.
- **Your balance:** about 92,990 credits now; about 44,500 left after production. Resets about 4 December.
- **Optional (each only with approval):** clip re-dos up to ~4,545; Veo 3.1 Lite 1080p comparison 2,424.
- **Lower-cost version, ≈ 39,200:** 8 clips; references only for Eli; 2 minutes of music; fewer effects; thumbnail without a reference.

## 8. Order of work after approval
1. Voice and supporting lines, then timing, then the timed shot list marking every AI clip (V1–V10).
2. Tower correction, then Eli stills, then the other stills. Contact sheet for your review.
3. Video clips V2–V10. Each one goes to you for review; any re-do needs your OK.
4. Sound effects, ambience and music.
5. Edit, with Remotion atmosphere on every still; render; sample-frame QA.
6. Captions, thumbnail, then delivery.
