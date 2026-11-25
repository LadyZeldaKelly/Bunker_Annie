# CONPLAN 8888 — shot plan (Draft 2 script). One row per shot.
# (id, anchor = first words of narration where the shot starts, kind, ref, image key, description / prompt)
# kind: A = AI still · V = AI still used as the start frame of a Runway clip · C = code graphic · R = reuse an existing image/clip
# ref: eli = Eli sheet · base = approved gate frame · tower = corrected tower · none = text only
PREFIX = ("Wide 16:9 photorealistic cinematic film still, realistic human proportions, detailed real-world environment, "
          "serious post-apocalyptic film aesthetic, restrained desaturated colours, dramatic shadows, practical light sources, subtle film grain. ")
SUFFIX = " Not cartoon, not illustration, no outlines, no stick figures, no comic panels. No text, no letters, no logos, no watermark."
ELI = ("The boy is ELI from the reference sheet, exactly the same face, dark brown curly hair, light brown skin, faded muted brick-red pullover hoodie "
       "with uneven white drawstrings, dark blue worn jeans, muddy grey-and-white sneakers, olive green one-strap backpack. ")
YOU = "The adult narrator character is seen only from behind or as hands: dark green canvas jacket, grey knit beanie, wristwatch, face never shown. "
REF_ELI = "Use the reference sheet only for Eli's appearance; new scene and camera angle. "
REF_BASE = "Use the reference image only for the look of the military base, fence, floodlights and colour grade; new camera angle and composition. "
REF_TOWER = "Use the reference image only for the look of the weathered concrete grain elevator, its rusty ladder and the flat wheat plains; new camera angle and composition. "

SHOTS = [
 # COLD OPEN
 ("s01","<start>","C",None,None,"Black. Three emergency-alert tones; phone glow blooms."),
 ("s02","Two-oh-six","V","none","c02_dashboard","Night, inside a moving car on an empty American interstate, point of view from the driver's seat: a smartphone on the passenger seat lights the dark cabin with a harsh white emergency alert glow, hands in dark green canvas jacket sleeves on the steering wheel, headlights of oncoming trucks streaking past in the rain-speckled windshield."),
 ("s03","You're already travelling","A","none","c03_mirror","Night, close view of a car's rear-view mirror reflecting a long line of headlights on the interstate behind, dashboard glow, tense atmosphere."),
 ("s04","Jo is a nurse","A","none","c04_medwing","Night, a military hospital corridor under flickering fluorescent light: two soldiers rush a gurney with a blood-stained blanket through swinging doors, a female nurse in navy scrubs with a dark hair bun seen from behind, face not visible, holding the door. Realistic, restrained, no gore visible."),
 ("s05","The doors sealed","A","none","c05_doors","Night, heavy steel security doors of a military medical wing closing, a soldier dropping confiscated smartphones into a plastic bin, red emergency light, cold institutional mood."),
 ("s07","You crest the last hill","A","base","c07_hilltop","Night, view from a dark hilltop road down onto a military air station: floodlit perimeter fence, guard towers, runway lights, fog, a long river of car headlights snaking toward the north gate."),
 ("s08","And in front of the north gate","R",None,"VIDEO:test-runway-gate-5s","V1 — the approved Runway test clip."),
 ("s09","The gate is closed.","A","base","c09_gate","Night, ground-level view at the closed north gate of the military base: concrete barriers, a rolling steel gate, coiled razor wire, a guard tower with a loudspeaker horn under blazing sodium floodlights, fog, crowd silhouettes in front."),
 # THE REAL PLAN
 ("s11","Here's the part that's real","C",None,"REAL:p1","REAL FILE p.1 — training exercise disclaimer."),
 ("s12","But the paper is real","C",None,"REAL:p9","REAL FILE p.9 — Lock down… for 30 days."),
 ("s13","The written orders go further","C",None,"REAL:p12a","REAL FILE p.12 — shelter… at least 40 days."),
 ("s14","Jo is mission essential","A","base","c14_window","Night, a single lit second-floor window of a medical building seen through the chain-link fence and razor wire of a military base, a female silhouette in the window, fog in the floodlights."),
 ("s15","You are not.","R",None,"test-frame1-gate-night","Reuse approved gate frame (over-the-shoulder)."),
 ("s16","The real plan says nothing","A","base","c16_fencehands","Night, close view of many hands of different people gripping a chain-link fence topped with razor wire, floodlight glare and fog beyond, faces out of frame."),
 # DECISION ONE
 ("s17","Listen to the horns","A","none","c17_horns","Night, rows of stopped cars on a road in front of a military gate, red tail lights glowing through fog, people leaning on horns, headlights flaring, chaotic but realistic."),
 ("s18","The plan's authors guessed","C",None,"REAL:p25","REAL FILE p.25 — cannot drive, climb or swim; follow roads."),
 ("s19","Behind you is the interstate","V","none","c19_onramp","Night, an interstate on-ramp seen from a distance: dozens of dark human figures with stiff, wrong postures walking slowly up the ramp toward distant headlights and floodlight glow, fog, backlit silhouettes, no gore."),
 ("s20","Stay with the crowd","A","none","c20_edge","Night, the edge of the floodlit crowd of cars: a lone figure seen from behind at the boundary between orange light and a black empty wheat field."),
 ("s21","A mile east","A","tower","c21_elevator","Night, an old concrete grain elevator standing alone on the flat plains a mile away, black against a deep blue night sky with stars, faint orange glow of the base on the horizon."),
 ("s22","Halfway across the field","V","eli","c22_eli_cars","Night, Eli stands alone between stopped cars lit by red tail lights and floodlight haze, calling out, frightened, looking around for his father."),
 ("s23","His name is Eli","A","eli","c23_eli_close","Night, medium close-up of Eli's face lit by red tail lights, tears on his cheeks, the floodlit military fence out of focus behind him."),
 ("s24","You don't decide","A","eli","c24_hands","Night, close-up of an adult hand in a dark green canvas jacket sleeve taking a small boy's hand that comes out of a faded brick-red hoodie sleeve, tail-light glow."),
 ("s25","Behind you, the horns","A","none","c25_two_walk","Night, two small silhouettes, an adult and a child in a red hoodie, walking away across a dark wheat field toward a distant grain elevator, the military base glowing orange behind them."),
 # THE CLIMB
 ("s26","At the foot of the elevator","A","tower","c26_ladder_weeds","Night, a flashlight beam finds an aluminum extension ladder lying in tall weeds at the foot of a concrete grain elevator, the rusty fixed ladder starting high above."),
 ("s27","You raise it","V","eli","c27_climb","Night, an aluminum extension ladder leaning against a concrete grain elevator reaching the lowest rung of a rusty fixed ladder twelve feet up; Eli climbing it while an adult in a dark green jacket steadies the ladder from below, flashlight on the ground."),
 ("s28","Now there is nothing below","A","tower","c28_drop","Night, looking straight down from a narrow steel landing on a grain elevator: twelve feet of smooth weathered concrete to the weeds below, an aluminum ladder laid flat along the rail beside the camera."),
 # DAY 1
 ("s29","Dawn. You count","A","none","c29_inventory","Dawn, top-down close view on a rusty steel grating walkway: one half-empty plastic water bottle, a granola bar, a pocketknife, a smartphone showing low battery, a hand in a dark green jacket sleeve."),
 ("s30","From up here","A","base","c30_dawn_base","Dawn, view from the top of a grain elevator across flat wheat plains to the military base a mile away: neat buildings, a flag, floodlights fading, peaceful pink sky."),
 ("s31","Down in the field","A","base","c31_field","Dawn, high view down onto the base perimeter fence: hundreds of motionless human figures gathered along the fence line, standing in the wheat, mist."),
 ("s32","Emergency guidance says","A","eli","c32_bottle","Morning on a grain elevator walkway: Eli sits holding a nearly empty plastic water bottle up to the light, looking at it, worried."),
 # DAY 3
 ("s33","The planners wrote that rain","C",None,"REAL:p8a","REAL FILE p.8 — rain vitally important; streams unreliable."),
 ("s34","On day three, it rains","A","none","c34_rain","Day, heavy rain sweeping across endless flat wheat plains under a dark steel-grey sky, an old grain elevator standing alone in the storm."),
 ("s35","You stretch your jacket","A","eli","c35_jacket","Rain on a grain elevator walkway: a dark green canvas jacket stretched across the railing as a funnel channelling rainwater into a plastic bottle, Eli beside it laughing with rain on his face."),
 # DAY 6
 ("s36","One storm won't last","A","none","c36_farmhouse","Noon, a lonely white farmhouse half a mile away across pale wheat fields, curtains drawn, a windmill, flat horizon, hard sun."),
 ("s37","The plan made one more guess","C",None,"REAL:p8b","REAL FILE p.8 — less active during bright sunny conditions."),
 ("s38","At noon, under a hard white sun","A","tower","c38_climbdown","Noon, an adult in a dark green jacket and grey beanie climbing down an aluminum ladder leaning against the concrete grain elevator, seen from below against a bleached white sky."),
 ("s39","One rule","A","eli","c39_eli_guard","Noon, Eli kneeling on the high steel landing of the grain elevator, both hands gripping the top of the aluminum ladder, serious, watching the field."),
 ("s40","The farmhouse gives you","A","none","c40_haul","Inside an abandoned farmhouse kitchen in dusty noon light: on the table a folded blue tarp, two white five-gallon buckets, canned food, a first-aid kit, a hand-crank emergency radio and a jug of plain bleach."),
 ("s41","On the way back","R",None,"VIDEO:V6 from c-tower-corrected","V6 — clip from the corrected tower frame."),
 ("s42","At the top, Eli","A","eli","c42_eli_ladder","Noon, Eli on the grain elevator landing with both hands on the aluminum ladder ready to push it away, relief on his face, looking down toward the camera."),
 ("s43","That night the tarp","A","none","c43_bleach","Night, close view on a grain elevator walkway: a blue tarp rigged as a funnel over a white bucket of rainwater, a hand counting drops of bleach from a jug cap into a bottle, flashlight light."),
 # DAY 12
 ("s44","On the twelfth night","V","tower","c44_pickup","Night, a pickup truck with headlights on rolling slowly across the wheat toward the foot of the concrete grain elevator, three men standing in the truck bed, dust in the headlight beams."),
 ("s45","The ladder is still down","A","tower","c45_haul_up","Night, looking down from the grain elevator landing: hands hauling up an aluminum ladder as a man's hand below reaches and grabs at empty air, flashlight beam from below."),
 ("s46","They shout for an hour","A","none","c46_flashlight","Night, a flashlight beam sweeping across the curved weathered concrete wall of a grain elevator, figures shouting below in the dark."),
 ("s47","The dead were never","A","none","c47_taillights","Night, red tail lights of a pickup truck speeding away across the field, dark figures emerging from the wheat into the dust it leaves behind."),
 # DAY 18
 ("s48","Every night at nine","A","base","c48_signal","Night, over-the-shoulder from the grain elevator top: a hand holding a smartphone flashlight pointed toward the distant floodlit military base."),
 ("s49","On night eighteen","A","base","c49_window_flash","Night, telephoto view of the military base medical building, one second-floor window glowing, the rest dark, fog in the floodlights."),
 ("s50","You tell Eli","A","eli","c50_eli_sleep","Night, Eli asleep under a dark green canvas jacket on the grain elevator walkway, the distant base lights reflected in a puddle beside him."),
 # DAY 24
 ("s51","Then the rain stops","A","none","c51_empty","Day, two empty white buckets and a dry cracked blue tarp on a rusty grating, harsh sun, heat."),
 ("s52","The plan warns","C",None,"REAL:p26","REAL FILE p.26 — drawn to potable water sources."),
 ("s53","The only water left","A","none","c53_creek","Noon, a narrow muddy creek behind a farmhouse, tall reeds on both banks, still brown water, unnerving quiet."),
 ("s54","You go at noon","V","eli","c54_creek_slip","Noon at a muddy creek bank with tall reeds: Eli slipping in the mud beside two white buckets, an adult in a dark green jacket reaching for him, the reeds behind them."),
 ("s55","You pull him so hard","A","none","c55_run","Noon, an adult and a child in a red hoodie running through tall pale wheat toward the concrete grain elevator, seen from behind, motion blur."),
 ("s56","There's a long red scratch","A","eli","c56_scratch","Close-up of Eli's forearm with the red hoodie sleeve pushed up, a long thin red scratch on the skin, his other hand nervously pulling the sleeve down, late light."),
 ("s57","That night you let the water settle","A","none","c57_filter","Night, close view of hands pouring cloudy brown creek water through a stretched T-shirt into a white bucket, flashlight light."),
 # DAY 27
 ("s58","The plan has a line","C",None,"REAL:p15","REAL FILE p.15 — newly infected may deny."),
 ("s59","On day twenty-seven","A","eli","c59_fever","Evening on the grain elevator walkway: Eli wrapped in the dark green jacket, flushed and sweaty, tired eyes, still talking."),
 ("s60","Not high","A","eli","c60_shoulder","Night, Eli asleep leaning on an adult's shoulder in a dark green jacket, the red hoodie sleeve pulled down over his arm, distant base glow."),
 ("s61","They assumed","C",None,"REAL:p30a","REAL FILE p.30 — cannot possibly last longer than 40 days."),
 ("s62","Day thirty-one","A","tower","c62_tally","Close view of chalk tally marks scratched on the weathered concrete of the grain elevator, thirty-five marks, rain streaking the wall."),
 ("s63","And on page thirty","C",None,"REAL:p30b","REAL FILE p.30 — All who fall behind must be left behind."),
 ("s64","It was written for a training exercise","A","none","c64_tower_night","Night, wide shot of a lone grain elevator on the endless dark plains, two tiny figures on top, the floodlit base far away."),
 # DAY 40
 ("s65","Day forty. Before dawn","A","eli","c65_forehead","Before dawn: an adult's hand on Eli's forehead; Eli feverish and soaked with sweat; his red sleeve eased back showing a swollen, angry red scratch."),
 ("s66","The real plan has a detail","C",None,"REAL:p12b","REAL FILE p.12 — broadcast in clear text so survivors can find them."),
 ("s67","At dawn, the hand-crank radio","A","none","c67_radio","Dawn, a small hand-crank emergency radio on the steel grating, its dial glowing amber, pink sky behind."),
 ("s69","Eli is awake","V","eli","c69_eli_whisper","Dawn, close shot of feverish Eli lying under the jacket, looking down at his sleeve, then up at the camera, about to whisper, frightened."),
 ("s70","Tell the truth","A","none","c70_thumb","Dawn, extreme close-up of a thumb resting on the talk button of a hand-crank radio, knuckles tense."),
 ("s71","And below you","V","tower","c71_ladder_foot","Pre-dawn, low angle at the foot of the concrete grain elevator: the top of a wooden ladder knocking against the concrete wall, darkness below, something about to climb."),
 ("s72","So who's coming up","C",None,None,"Cut to black."),
 ("s73","This is Don't Go There","R",None,"c64_tower_night","Reuse c64."),
 ("s74","<end>","C",None,None,"End card (real vs fiction)."),
]
