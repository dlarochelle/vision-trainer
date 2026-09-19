# AGENTS.md

Conventions for any agent working in this repository.

## What this is

`vision-trainer` is a single-page perceptual-learning demo built for
San Francisco Claude Build Day, 2026-09-19. Two independent modes:
Gabor contrast detection with lateral masking, and RSVP reading with
comprehension scoring.

## Hard rules

- **One file.** The deliverable is a self-contained `index.html`. No
  build step, no bundler, no package manager, no external assets, no
  CDN links. Vanilla JS and canvas only.
- **Offline.** Zero network calls on the demo path. It must work
  opened from `file://`.
- **No therapeutic claim.** See "Claims" below. This rule is not
  subject to tradeoffs against scope, polish, or deadline.

## Claims

This footer text must be visible on screen at all times, verbatim:

> Experimental. Not a medical device, not a substitute for eye care,
> and not validated to improve reading comprehension or treat any
> condition. Evidence for this paradigm comes from clinical
> populations (amblyopia, nystagmus, keratoconus), not healthy adults.

**Never use these words** anywhere in the UI, the README, or the
pitch: treats, therapy, cures, rewires, permanently, mitigates,
prevents, diagnoses, restores, corrects.

Do not claim transfer to everyday vision or reading. Do not name a
condition as something this app addresses — FDA classifies software as
a medical device based on intended use as stated in its claims.
Describing what the app *measures* is safe; describing what it *does
to the user* is not.

Do not upgrade an observational study to an "RCT" in any document or
in the pitch.

## Scoring

The two modes produce **two independent scores**. Do not merge them
into a single "visual processing speed" metric. There is no validated
construct linking contrast sensitivity to RSVP reading. If the two are
displayed together, label the link explicitly as an untested
hypothesis.

## Docs and build

`README.md` and `docs/EVIDENCE.md` were updated on 2026-09-19 to match
the build: contrast detection with collinear flankers, two independent
scores, 2-down-1-up staircase with the paradigm-dependence caveat, a
fixed 3/6/12 c/deg sweep stated as a deviation from the training
protocols, and RSVP at 250 wpm with the Rayner 2016 non-transfer
framing. Where a session prompt and the docs disagree, check the
build; the constants at the top of `index.html` are authoritative.

The Tang 2024 citation in EVIDENCE is **unresolved** and flagged
there. Verify against PubMed before citing it publicly.

Other docs:

- `docs/REFERENCES.md` — the 31-entry source bibliography
- `docs/TOOLS_AND_CREDITS.md` — hackathon credits, current as of
  2026-09-19
- `docs/RESEARCH_PROMPT.md` — prompt for independent research runs

Governing project record, **read-only, never write back to it**:
`~/life/PROJECTS/VISION_TRAINING_SPEED_READING_PROJECT_2026-09-19_e3ec5b.md`

## Working style

- Keep the app demoable at every commit. Never leave it broken
  between steps.
- Psychophysics parameters belong in **named constants** at the top of
  the script, not inlined at call sites. Anything chosen rather than
  derived gets a comment saying why.
- State assumptions in the UI rather than hiding them. The
  viewing-distance setting and the derived px/degree readout are the
  model for this.
