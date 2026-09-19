# Vision Trainer

Single-page perceptual-learning trainer. Built for San Francisco Claude
Build Day, 2026-09-19.

## What to build

Two modes sharing one visual-processing-speed score:

1. **Gabor-patch contrast staircase.** Sinusoidal grating under a
   Gaussian envelope, drawn on a 2D canvas. Two-alternative forced
   choice orientation discrimination. Adaptive staircase.
2. **RSVP text mode.** Rapid serial visual presentation, same scoring
   axis, text stimulus instead of gratings.

Starting parameters, standard psychophysics defaults, defensible but
not pulled from a specific protocol: 2-down-1-up staircase converging
on about 71 percent correct, roughly 4 cycles per degree, 2AFC
orientation.

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
- `docs/REFERENCES.md` — the full 31-entry source bibliography
- `docs/TOOLS_AND_CREDITS.md` — hackathon credits and how to use them
- `docs/RESEARCH_PROMPT.md` — prompt for independent research runs

Governing project record, read-only, do not write back to it:
`~/life/PROJECTS/VISION_TRAINING_SPEED_READING_PROJECT_2026-09-19_e3ec5b.md`
