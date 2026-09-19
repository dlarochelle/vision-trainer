# Vision Trainer

Single-page perceptual-learning trainer. Built for San Francisco Claude
Build Day, 2026-09-19.

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
   displayed together and never as speed alone.

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
  never disguised as angular size.
- RSVP default 250 wpm, warning above 350 (Di Nocera 2018, n=209).
  The UI states that this measures comprehension under RSVP and does
  not measure, and is not known to improve, natural reading (Rayner
  et al. 2016).

The score is a threshold measurement, not a progress meter. Published
protocols run 900-1,000 trials per session over 30-40 sessions before
a measurable effect; a demo block is a few dozen trials, and the UI
says so. Any improvement curve drawn inside a single session would be
a practice effect. There is none.

## Hard rules

- One HTML file. No build step, no bundler.
- Runs offline. Zero network calls in the demo path.
- Makes no therapeutic claim. The papers are the design source for the
  stimuli, not a health claim about this artifact.

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
2. **Social feed as RSVP source.** Apify Instagram and Facebook
   scrapers. Gated behind the no-network-call rule: the trainer must
   demo without it.

## Documents here

- `docs/EVIDENCE.md` — why this design, which papers, what not to claim
- `docs/REFERENCES.md` — the 31-entry source bibliography, plus the
  works an adversarial research pass added to it
- `docs/TOOLS_AND_CREDITS.md` — hackathon credits and how to use them
- `docs/RESEARCH_PROMPT.md` — prompt for independent research runs

Governing project record, read-only, do not write back to it:
`~/life/PROJECTS/VISION_TRAINING_SPEED_READING_PROJECT_2026-09-19_e3ec5b.md`
