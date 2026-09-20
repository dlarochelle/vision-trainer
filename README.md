# Vision Trainer

Single-page perceptual-learning trainer for people who want to see
better and read faster. Built for San Francisco Claude Build Day,
2026-09-19. Those two outcomes are the goals the project is testing
toward, not results it has shown; more testing is needed, and the
evidence so far comes from clinical populations, not healthy adults.

## What was built

One page, two modes, each with **its own score**. They are not a
shared axis; see `docs/EVIDENCE.md` for why that idea was dropped.

1. **Gabor contrast detection with lateral masking.** A central
   low-contrast Gabor (sinusoidal grating under a Gaussian envelope,
   drawn per pixel on canvas) between two collinear high-contrast
   flankers (0.6 Michelson, 3 carrier wavelengths away). Two-interval
   forced choice: the flankers appear in both cued intervals, the
   target in exactly one, and the observer picks which. Spatial phase
   is fixed within a trial. Target contrast follows a 2-down-1-up
   staircase. Spatial frequency is swept across blocks at 3, 6 and
   12 c/deg, and the three thresholds are plotted as a contrast
   sensitivity function. That curve is the mode's score.
2. **RSVP reading.** Words one at a time at a fixed point, adjustable
   words per minute. After each passage, four true/false comprehension
   questions. The score is wpm paired with comprehension accuracy,
   displayed together and never as speed alone. Two passage sources:
   four built-in Aesop retellings, and 20 posts from David's Instagram
   home feed captured once on 2026-09-19 and embedded in the file with
   their own questions. Nothing is fetched at runtime. A Next-post
   button and the N / right-arrow hotkey step through the feed.

Parameters, all named constants at the top of the script:

- Interval 150 ms, inter-stimulus interval 500 ms (Polat 2004 used
  80-320 ms intervals and a 500 ms blank).
- 2-down-1-up staircase converging on 70.7% correct. The rule is
  paradigm-dependent, not canonical: external-noise work (Dosher & Lu
  1999) uses 3-down-1-up (79.3%); the clinical training protocols use
  2-down-1-up because the easier task limits fatigue.
- Fixed 3 / 6 / 12 c/deg sweep. This is a stated deviation from the
  published training protocols, which do not sweep fixed frequencies
  (Polat starts low and advances adaptively; Zhou 2006 trains at the
  individual's cutoff). The app measures a CSF; it does not replicate
  a training protocol, and the UI says so.
- Viewing distance is a visible setting defaulting to 60 cm, with the
  derived px/degree shown (assumes 96 CSS px/inch). A separate display
  scale multiplier magnifies the drawn stimulus for projectors; the
  px/degree readout keeps the true unscaled value so magnification is
  never disguised as angular size. Magnification lowers the angular
  frequency the observer sees to nominal / scale, so each threshold is
  recorded and plotted at that effective frequency (a 3 c/deg block at
  4x plots at 0.75 c/deg).
- RSVP default 250 wpm, warning above 350 (Di Nocera 2018, n=209).
  The UI states that this measures comprehension under RSVP and does
  not measure, and is not known to improve, natural reading (Rayner
  et al. 2016).
- Live staircase state — target contrast now, reversal count, last
  response — is not shown to the observer. Naming the current target
  contrast during a threshold measurement tells the observer about the
  stimulus they are being asked to detect, nearest threshold, which is
  where the staircase is converging. `?debug=1` on the URL shows it;
  an ordinary run shows the block and the trial count only. The
  assumptions (viewing distance, px/degree, the deviation notes) stay
  visible at setup and in the results either way.

The score is a threshold measurement, not a progress meter. Published
protocols run 900-1,000 trials per session over 30-40 sessions before
a measurable effect; a demo block is a few dozen trials, and the UI
says so. Any improvement curve drawn inside a single session would be
a practice effect. There is none.

## Hard rules

- One HTML file. No build step, no bundler.
- Runs offline. Zero network calls in the demo path.
- States goals, not results. The aim is a tool that helps people see
  better and read faster; that aim is under active testing and more
  testing is needed. Current evidence comes from clinical populations,
  not healthy adults. The papers are the design source for the stimuli,
  not a demonstrated outcome of this artifact. The footer disclaimer
  stays verbatim and always visible. See the Claims section of
  `AGENTS.md` for the banned words and the naming rules.

## Event constraints

- 3:00 PM PDT cutoff. Hands off the keyboard, one minute to pitch.
- Organizers' guidance: "Think MVP. Aim for something light: a single
  HTML file."
- Track: Everyday, meaning it solves a real problem in the builder's
  life. Tracks describe the quality of the build, never the topic.
- Model to push: Fable 5.1.

## Stretch goals

Only after the 2D trainer runs end to end.

1. **WebXR.** A `VRButton` on the same page, inert without a device.
   Do not port the stimulus to three.js for this; see
   `docs/EVIDENCE.md` for why the 2D canvas is the better substrate.
2. **Social feed as RSVP source.** Built for Instagram two ways, both
   offline at demo time: a hand-curated capture of David's own home
   feed embedded as `FEED_POSTS` (20 posts, questions written by hand),
   and an Apify build-time snapshot of public accounts embedded as
   `FEED_PASSAGES` (see "Feed passages" below). The RSVP feed source
   shows both as one list.

## Feed passages

The RSVP passage list can optionally include a "My feed" group built
from public Instagram captions. This is a **build-time snapshot**: two
scripts fetch and embed the text, and the committed `index.html` then
contains it as a string constant. The demo itself still makes no
network calls, and it runs normally when no snapshot is present.

The snapshot is optional. With none applied, `FEED_PASSAGES` is an
empty array, the "My feed" group does not appear, and the four
built-in passages behave exactly as before.

```bash
# 1. Fetch captions and generate questions.
APIFY_TOKEN=... ANTHROPIC_API_KEY=... node tools/fetch_feed.mjs <username>

# 2. Embed data/feed_passages.json into index.html.
node tools/inline_feed.mjs

# Reset to the empty default.
node tools/inline_feed.mjs --clear
```

- `tools/fetch_feed.mjs` runs Apify's Instagram scraper for the given
  public usernames, strips hashtags and mentions, keeps captions of 60
  to 200 words, and asks Claude for four true/false questions per
  caption. Captions whose questions fail validation are dropped. Output
  is `data/feed_passages.json`, capped at 8 passages.
  Pass `--captions-only` to skip question generation when no
  `ANTHROPIC_API_KEY` is available; the questions must then be filled
  in before the snapshot can be embedded.
- `tools/inline_feed.mjs` rewrites the block between the
  `FEED_PASSAGES_START` and `FEED_PASSAGES_END` markers in
  `index.html`. It validates the shape of every passage and refuses to
  embed anything matching a credential pattern.

Environment variables are read from the shell only. Never put
`APIFY_TOKEN` or `ANTHROPIC_API_KEY` in a file in this repository.

Captions are quoted third-party text. Check that you have the right to
redistribute the accounts you scrape before committing a snapshot.

## Documents here

- `docs/EVIDENCE.md` — why this design, which papers, what not to claim
- `docs/REFERENCES.md` — the 31-entry source bibliography, plus the
  works an adversarial research pass added to it
- `docs/TOOLS_AND_CREDITS.md` — hackathon credits and how to use them
- `docs/RESEARCH_PROMPT.md` — prompt for independent research runs

Governing project record, read-only, do not write back to it:
`~/life/PROJECTS/VISION_TRAINING_SPEED_READING_PROJECT_2026-09-19_e3ec5b.md`
