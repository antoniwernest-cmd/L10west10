ADVENTURES â€” COMBINED PROJECT

Open index.html for the shared landing page, then choose:
- Reading Adventures: 8 reading and language activities, with levels A and AA.
- Autumn Adventures: 10 word and sound activities, 30 questions each.
- Word & Reading Skills: 15 local projects from the LanguageWest2 collection.
- Passage Adventures: 30 stories, Pre-A/A/AA/AAA/AAAA versions, 10 response formats (1,500 responses).
- Language Lab: 8 activities, 30 questions per A/AA level (480 total).

FEATURED STORY · NOVEMBER 8, 2026
High Park Leaf Crew appears at the top of All Adventures and Passage Adventures.
It includes eight chapters, five levels and 280 activities.
Open Passage-Adventures/High-Park-Leaf-Crew/index.html to go directly to the story.

FEATURED WORD GAME · NOVEMBER 8, 2026
Candy Word Machine appears beside High Park Leaf Crew on All Adventures.
Each of its 30 questions has ten tiles, three words and four candy tries.
Open Word-and-Reading-Skills/Candy-Word-Machine/index.html to play directly.

All five collections and their assets are included in this folder.
Reading-Adventures/index.html opens the reading collection directly.
index.html#autumn opens the autumn collection directly.
All adventures returns to the shared menu. Each activity retains its own
picture IDs, progress, teacher tools and assessment reports.
The existing autumn activity URLs and storage key are preserved.
ACTIVITY-CATALOG.json lists all 52 unique activity entries and their local sources.
Sentence Adventures 1 and 2 are included only under Reading Adventures.
Unlinked older copies of projects are omitted.
Progress remains browser/device-specific.

DEPLOY THIS ENTIRE FOLDER
Keep index.html at the published root, beside shared, assets, Reading-Adventures, Word-and-Reading-Skills, Language-Lab and Passage-Adventures.
Upload the complete folder or its contents to a static host. No build step,
ZIP, package installation, API key or backend is required.

--- AUTUMN COLLECTION GUIDE ---

AUTUMN WORD & SOUND ADVENTURES

Open index.html. Keep this folder and its assets together.
Choose Autumn Adventures from the shared landing page to open its ten activities. Each has 30 questions: 300 in total.
Question pictures match the word or sound being practised.
Spelling, counting and first-sound questions show the relevant word picture.
Listening and matching questions show their answer choices without revealing the answer.
Autumn scenes appear only as relevant choices in sentence-matching questions.

WORD ADVENTURES
1. Build the Word
2. Choose the Correct Word
3. Missing Letter
4. Word Chains
5. Read and Match

SOUND ADVENTURES
6. Blend the Sounds
7. Count the Sounds
8. Change the Sound
9. Delete the Sound
10. Find the First Sound

HOW TO PLAY
Choose one of the 20 existing picture IDs. Use the same picture each visit.
Click pictures, tap or drag letter tiles, listen, or type in word activities.
Replay and speed controls stay visible. There is no time limit.
On narrow screens, use Picture and Play to switch views without scrolling.
Sound activities use spoken sounds, pictures and dots rather than written letter choices.
Small speaker buttons say the names of picture choices.
Next moves forward; Back revisits a question. Progress saves in this browser.
At question 30, Finish opens a summary and Review returns to unfinished work.

ASSESSMENT
Teacher tools includes Independent, With help and Practising ratings.
Each question also has optional Formative and Summative labels.
Download a real Excel workbook for the current picture ID or all picture IDs.
The workbook includes Summary, Progress, Attempts and Guide sheets.
It records responses, drag/tap/type method, correctness, retries, audio replays,
picture-name listens, hints, teacher support and assessment type.
Completed questions earn one point each. Reviews cannot add duplicate points.
First-try completion is reported separately; hints and support remain visible.
No names, passwords or accounts are needed. No student work is sent anywhere.
Download assessment before changing browser or device.

FILES AND ARTWORK
index.html, styles.css, app.js, data.js and excel.js run the collection.
assets/scenes retains the original 100 autumn pictures; sentence-matching questions
use only the scenes matched to their reading prompts.
assets/profiles reuses the existing 20 3D picture IDs.
assets/words includes reused Codex word pictures and 8 new picture sheets.
assets/audio contains 409 bundled English audio clips for offline playback.
The word pictures, profile objects, mascot, balloon and Excel writer were reused
or adapted from the user's existing Codex files and Sentences Adventures collection.
New artwork was made with the built-in image generator. Its prompts are retained
in WORD-ARTWORK.json; original autumn picture prompts remain in the picture collection.
QUESTION-BANK.json contains all questions and answer data.
SCENE-SOURCES.json and WORD-ARTWORK.json record picture sources.
CHECKS.json, BROWSER-CHECKS.json, AUDIO-CHECKS.json and
PRONUNCIATION-CHECKS.json record verification.

AUDIO
English audio is bundled as PCM WAV files. Isolated sounds use explicit IPA
pronunciations in Windows speech synthesis; they are not spoken letter names.
Continuous sounds are held clearly: /m/ and /n/ for 1.2 seconds, /s/ and /f/
for 1.1 seconds, and vowels for about 0.9 seconds at Steady speed. Stop sounds
such as /p/, /t/ and /k/ remain brief. Quiet sounds are made easier to hear.
Pitch-preserving waveform processing keeps the phoneme separate from letter
names; no extra vowel is added. First-sound questions say the word and then
model its first sound. Count-the-sounds questions retain their natural words.
Question audio keeps the word, sounds and essential directions.
Automatic spoken praise, retry messages, finish messages and greetings are removed.
Replay and visual answer feedback remain available.
Source pronunciation events, held-sound duration, non-silent segments, clipping,
and all 120 revised sound-question clips were checked. HELD-SOUND-CHECKS.json
records the durations and processing. m-held-sample.wav is a standalone /m/ demo.
Technical reference: https://learn.microsoft.com/en-us/dotnet/api/system.speech.synthesis.ttsengine.fragmentstate.phoneme

HOSTING
The collection also works on a normal static web host. Upload the whole folder,
with index.html at the root. No build step, API key or backend is required.
Local and hosted copies keep separate browser progress.

SHUFFLE â€” ALL ACTIVITIES
Use Shuffle to mix the question order without erasing progress, earned credit
or assessment history. The before/after questions remain paired, and each
three-step word chain stays together. Saved responses stay with question IDs.

LANGUAGE LAB â€” NEW ORIGINAL CONTENT
Preposition Paths; Question Quest; Digraph Detective; Classroom Coach;
Time-Travel Verbs; Linking Words; Grow a Sentence.
Each activity has 30 A and 30 AA questions. Grow a Sentence uses drag-only
phrase placement, including moving a phrase again or returning it to the bank.
Artwork reuses the existing Codex picture pool. No images from the supplied
reference pages or screenshots are included. The library includes 461 unique existing Codex pictures, with duplicates removed.
109 matching pictures appear in the new question banks.

DIGRAPH DETECTIVE â€” LISTENING UPDATE
The target word is spoken without being printed in the student question,
topic, hint or feedback. Hear the word replays only the target word.
A offers digraph letter choices; AA offers comparison-word choices.
Saved question IDs, answers, earned credit and assessment history are kept.
The assessment topic records the heard word for teacher reference.

WEATHER WATCH
Language-Lab/activity.html?game=weather has 30 weather topics in A and AA.
It includes listening, hints, Shuffle, saved progress and assessment export.
15 new diverse weather scenes supplement existing weather-specific story art.
Weather artwork and prompts: Language-Lab/WEATHER-ARTWORK.json.


PASSAGE ADVENTURES: STORY LOCK AND PARENT ASSESSMENT
All five levels now offer Lock in answers after all ten response activities are answered.
The learner sees Call your teacher. Teacher code 259 opens a saved-answer review and a parent-friendly PDF/PNG report.
Save a report, then choose Start something new to return to All adventures.
See Passage-Adventures/README.txt and STORY-LOCK-ASSESSMENT-CHECKS.json.


CLEAN DEPLOYMENT - NOVEMBER 1, 2026
This rebuilt folder is the current deployment master.
Every unique picture and sound from the previous deployment is retained.
Reused pictures, sounds, styles and scripts have one physical copy in shared/.
Keep shared/ with the five collection folders when copying or publishing.
The original activity URLs, question IDs, answers and browser progress keys are retained.
Language1/ and l2west2/ were unlinked complete project copies and are excluded.
The pre-cleanup deployment is kept outside this folder in the Codex work directory for recovery.
DEDUPLICATION-CHECKS.json records the checks. DEPLOYMENT-MANIFEST.json lists the deployed files and SHA-256 hashes.
Use this clean folder for future copies; do not copy the older source tree over it.
