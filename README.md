# Vision Trainer

Single-page perceptual-learning trainer. Built for San Francisco Claude
Build Day, 2026-09-19.

## What to build

Two modes on one page, each with **its own score**. They are not a
shared axis; see `docs/EVIDENCE.md` for why that idea was dropped.

1. **Gabor-patch contrast staircase.** Sinusoidal grating under a
   Gaussian envelope, drawn on a 2D canvas. Two-alternative forced
   choice orientation discrimination. Adaptive staircase. Reports a
   contrast threshold.
2. **RSVP text mode.** Rapid serial visual presentation, text stimulus
   instead of gratings. Reports words per minute. A separate number
   from the Gabor threshold, displayed separately.

Starting parameters, standard psychophysics defaults, defensible but
not pulled from a specific protocol:

- 2-down-1-up staircase converging on about 71 percent correct. The
  literature specifies no canonical staircase for this paradigm, so
  this is a reasonable default rather than a protocol citation.
- Spatial frequency swept across roughly 3 to 12 cycles per degree
  rather than fixed. The published protocols sweep, and sweeping is
  the one lever with any evidence of buying partial generalization.
- 2AFC orientation discrimination. Note that the strongest evidence
  lineage behind the cited papers used near-threshold contrast
  *detection* with collinear high-contrast flankers, not orientation.
  See `docs/EVIDENCE.md`.
- RSVP default 300 wpm. Comprehension holds to roughly 350 wpm and
  declines past 400, so the default sits inside the defensible band.
  Users may push higher; the UI must not treat a high number as an
  achievement.

The score is a threshold measurement, not a progress meter. Published
protocols need 20 to 45 sessions over 2 to 3 months before a
measurable effect, so any improvement curve drawn inside a single
session is a practice effect. Do not build one.

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
