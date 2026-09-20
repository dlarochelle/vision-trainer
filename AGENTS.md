# AGENTS.md

Conventions for any agent working in this repository.

## What this is

`vision-trainer` is a single-page perceptual-learning demo built for
San Francisco Claude Build Day, 2026-09-19. Two independent modes:
Gabor contrast detection with lateral masking, and RSVP reading with
comprehension scoring.

## Hard rules

- **One file.** The deliverable is a single `index.html`. No build
  step, no bundler, no package manager. Vanilla JS and canvas only.
- **Network, relaxed 2026-09-19.** The hackathon is over and the app
  is moving to a hosted demo, so the offline rule is retired. A
  webfont stylesheet is allowed. Everything else — all CSS, all JS,
  all passage and feed data — still ships inside `index.html`, and the
  page must still render and run correctly with the font request
  blocked, falling back to the declared system stacks. No runtime data
  fetching on the demo path; the cached feed stays embedded.
- **Measurement quarantine.** This replaces the old "keep it austere"
  habit, which was never a written rule. The app may look as good as
  it can *except* while a timed measurement is running. Three phases
  live on `body[data-phase]`: `idle` (full visual expression),
  `arming` (the surround ramps down to measurement luminance), and
  `measuring` (nothing animates, nothing glows, the surround is locked
  to the field luminance, and the rail and masthead desaturate). The
  quarantine is enforced in CSS against that one attribute, never
  case by case in JS, so a new effect cannot forget to switch itself
  off. Decoration that is not the task must say so on screen: the
  cinematic idle lattice carries a caption naming it as decorative.
- **Single theme, on purpose.** The page is dark-only. Surround
  luminance is a variable in a contrast-detection task, so a light
  theme would change the thresholds being measured. This is a choice,
  not an omission; do not "fix" it by adding a light mode.
- **Goals, not results.** The pitch is a tool to see better and read
  faster. Those are stated as goals under testing, never as results.
  See "Claims" below. The footer disclaimer and the banned-word list
  are not subject to tradeoffs against scope, polish, or deadline.

## Claims

Framing, decided by David on 2026-09-19 after the tradeoffs were laid
out three times: this is pitched as a tool for people who want to see
better and read faster, not as a science experiment. Better vision and
faster reading are the **aspirational goals** of the project. They are
stated as goals under active testing, with a plain "more testing is
needed" line, never as things the app has been shown to do.

Say this, in these terms:

- The goal is better vision and faster reading. We are testing whether
  it works. More testing is needed.
- The evidence behind the stimulus design comes from clinical
  populations (amblyopia, nystagmus, keratoconus), not healthy adults.
- The app measures a contrast sensitivity function and comprehension
  under RSVP. Faster natural reading is the goal we are testing toward,
  not a demonstrated result; Rayner et al. (2016) is cited on screen as
  a non-transfer finding and stays there.

This footer text must be visible on screen at all times, verbatim.
David chose to keep it as is. Do not collapse, shorten, or hide it:

> Experimental. Not a medical device, not a substitute for eye care,
> and not validated to improve reading comprehension or treat any
> condition. Evidence for this paradigm comes from clinical
> populations (amblyopia, nystagmus, keratoconus), not healthy adults.

**Never use these words** anywhere in the UI, the README, or the
pitch: treats, therapy, cures, rewires, permanently, mitigates,
prevents, diagnoses, restores, corrects.

Do not name a condition as something this app addresses. FDA classifies
software as a medical device based on intended use as stated in its
claims, so a named condition changes the regulatory category. The
footer names conditions only to say where the evidence comes from.

Do not upgrade an observational study to an "RCT" in any document or
in the pitch.

Do not state transfer to everyday vision or natural reading as a fact.
"The goal is to read faster" is allowed; "you will read faster" is not.

## Scoring

The two modes produce **two independent scores**. Do not merge them
into a single "visual processing speed" metric. There is no validated
construct linking contrast sensitivity to RSVP reading. If the two are
displayed together, label the link explicitly as an untested
hypothesis.

## Visual direction

Chosen by David on 2026-09-19 from two treatments built side by side:
the **cinematic** direction. The comparison scaffold is gone — there
is no `data-treatment` attribute and no second CSS block. Do not
reintroduce a treatment switcher.

The direction: the stimulus is the hero. A display-serif masthead, and
an animated Gabor lattice in the stimulus frame while idle. Boldness
is spent in two places only — that masthead and the glow beneath the
stimulus frame — and everything around them stays quiet. All of it is
subject to the measurement quarantine above.

The idle lattice is **decoration, not the task**, and carries an
on-screen caption saying so. When the animation is suppressed
(reduced-motion, hidden tab) the field falls back to a static draw of
the real three-patch stimulus and the caption changes to match. Keep
that pairing honest if either side changes.

Typefaces: IBM Plex Sans (interface), IBM Plex Mono (every numeric
readout and axis label), Instrument Serif (masthead only).

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

## Checks

`tools/check.mjs` verifies the rules above that a machine can verify: the
banned-word list, the verbatim footer disclaimer (and the CSS pinning it
to full opacity during measurement), the single-file rule, no runtime
fetching, the single theme, the quarantine hard stop, `#note` keeping its
`keep` class, and that the inline script parses. No dependencies:

```bash
node tools/check.mjs
```

GitHub Actions runs it on every pull request into `main` and on every push
to `main` (`.github/workflows/checks.yml`), and it is a required status
check on `main`. Run it before you push.

The banned words appear legitimately in this file, in `docs/EVIDENCE.md`
and in `docs/PITCH.md`'s own check section — those are mentions, not uses.
The checked surface is therefore `index.html` and the pitch script between
the `---` rules in `docs/PITCH.md`.

## Working style

- Keep the app demoable at every commit. Never leave it broken
  between steps.
- Psychophysics parameters belong in **named constants** at the top of
  the script, not inlined at call sites. Anything chosen rather than
  derived gets a comment saying why.
- State assumptions in the UI rather than hiding them. The
  viewing-distance setting and the derived px/degree readout are the
  model for this.
