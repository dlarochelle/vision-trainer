# Evidence basis and design rationale

## Where the bibliography came from

A consumer eye-health educator's reference list for an episode on
vision improvement, 31 entries. Full list in `REFERENCES.md`. It is an
episode bibliography, not a systematic review: selection is the
creator's, and the weighting reflects his channel's topics.

## The three clusters, and why only one is buildable

1. **Photobiomodulation**, red and near-infrared light at 670 nm.
   Eleven papers: Jeffery 2025, Shinhmar 2021, the LIGHTSITE II and
   III trials, Karu, Hamblin. Requires hardware. Not deliverable as
   software.
2. **Macular carotenoid supplementation**, lutein and zeaxanthin.
   Thirteen papers, mostly Stringham and Nolan. Requires ingestion and
   weeks of adherence. Not deliverable as software.
3. **Perceptual learning.** Four entries. Rendered stimuli plus a
   response loop. **This is the only cluster a web page can deliver,
   and it is therefore the entire basis of this build.**

The perceptual-learning entries:

- Hecht I, et al. Efficacy of perceptual learning among patients with
  infantile nystagmus: a prospective single-blind randomised
  controlled trial. Br J Ophthalmol. 2025. PMID 41402029.
  https://pubmed.ncbi.nlm.nih.gov/41402029/
- Magdalene D, et al. Long-term efficacy of perceptual learning
  therapy in amblyopia: a 5-year follow-up study. Lat Am J Ophthalmol.
  2025;8:8.
- Tang X, et al. Cortical stimulation using Gabor patches improves
  vision and contrast sensitivity in dissatisfied patients with
  MF-IOLs: results of an RCT. Am J Ophthalmol. 2024;269:226-235.
  https://www.ajo.com/article/S0002-9394(24)00386-6/abstract
  **Needs verification.** An independent research pass instead
  surfaced a 2024 Tang et al. in *Frontiers in Neuroscience* (N=11,
  prospective observational, post-SMILE) reporting no significant
  change in uncorrected acuity or refraction. These may be two
  different papers or one miscited one. Check against PubMed before
  citing either; do not describe the observational study as an RCT.
- RevitalVision published studies index.
  https://doctors.revitalvision.com/about/studies-posters/

## The speed-reading bridge, and why it was dropped

The original design had both modes reporting one "visual processing
speed" score. `RESEARCH_PROMPT.md` question 4 asked directly whether
that conflates distinct constructs. An adversarial research pass
answered yes, and the score was split in two.

What the original bridge rested on: Bovier ER, Hammond BR. A
randomized placebo-controlled study on the effects of lutein and
zeaxanthin on visual processing speed in young healthy subjects. Arch
Biochem Biophys. 2015;572:54-57. PMID 25483230. That paper treats
visual processing speed as a measurable, movable outcome, which is
true. It does not establish that contrast-sensitivity training and
RSVP reading load the same latent variable, which is what the shared
score asserted.

Against the bridge:

- The convergence-insufficiency trials are a direct counterexample.
  CITT (Arch Ophthalmol 2008, RCT, 221 children) showed that
  office-based vergence therapy improves convergence measures and
  symptoms. CITT-ART (Optom Vis Sci, RCT, about 324 children) then
  showed that the same therapy produced no gain in standardized
  reading comprehension over placebo. Verify the CITT-ART year before
  citing it anywhere public: the research pass gave 2025, and the
  trial's primary results appear to have published earlier. Visual and oculomotor
  improvement did not carry into reading.
- Perceptual-learning reviews describe gains as reduced internal noise
  and better stimulus weighting, specific to trained orientation,
  spatial frequency and retinal location, not as movement along a
  single scalar speed factor.
- The two modes load different machinery. Gabor thresholds are
  low-level sensory. Reading speed is bounded by lexical access and
  comprehension, and RSVP bypasses oculomotor control entirely rather
  than training it.

What the build does instead: keeps both modes, reports two separate
numbers, and states on the page that they are not the same
measurement. Any overlap between them is inferential and unmeasured.

## RSVP parameters

Di Nocera et al. 2018, Int J Human Factors and Ergonomics,
between-groups, n=209: comprehension is statistically
indistinguishable from normal reading at RSVP rates of 250 to 350 wpm,
and declines monotonically at 400 and 450 wpm. The build defaults to
250 wpm and warns above 350. Users may exceed it; the interface does
not present a high wpm number as an accomplishment.

The consensus goes further than "unvalidated". Rayner et al. (2016,
Psychological Science in the Public Interest) concluded that RSVP
gains do not transfer to natural reading, for structural reasons: RSVP
makes regressions impossible (the 10-15% of eye movements that are
backward saccades, the reader's automatic repair mechanism when syntax
or meaning fails to integrate), and it abolishes parafoveal preview.
The mode's UI states this. Do not imply the page makes anyone a faster
reader of ordinary text.

## Protocol parameters from the published work

The adversarial pass produced concrete numbers the original
bibliography did not surface. Recorded here so the stimulus choices
are traceable:

- **Task.** The strongest lineage, Polat 2004 PNAS through the
  RevitalVision pivotal trial to Tang 2024, is near-threshold contrast
  *detection* of a central Gabor flanked by two collinear
  high-contrast Gabors at about 0.6 Michelson. **The build implements
  this**: two-interval forced-choice contrast detection, flankers at
  3 carrier wavelengths in both intervals, target in one, spatial
  phase fixed within a trial so a motion artifact cannot substitute
  for contrast. Orientation discrimination also appears in the
  literature; an earlier draft used it and was replaced.
- **Spatial frequency.** Roughly 1.5 to 12 cpd, most work
  concentrating on 3 to 12 cpd. The training protocols do not sweep
  fixed frequencies: Polat starts low (about 1.5-5.9 c/deg) and
  advances adaptively; Zhou et al. (2006) train at the individual's
  cutoff frequency. The build sweeps fixed 3 / 6 / 12 c/deg because
  it is measuring a contrast sensitivity function, not replicating a
  training protocol. The UI states this deviation.
- **Staircase.** The choice is paradigm-dependent, not canonical.
  3-down-1-up converges on 79.3% and is used in external-noise work
  (Dosher & Lu 1999); 2-down-1-up converges on 70.7% (d' = 1.09) and
  is used in the clinical training protocols, where the easier task
  limits frustration and fatigue. The build uses 2-down-1-up, with the
  rule and the caveat as named constants and a code comment.
- **Dose.** Polat-derived commercial protocols run 900-1,000 trials
  per session, 3 to 5 sessions per week, for 30 to 40 sessions over
  4 to 6 months; Zhou et al. averaged 12.7 sessions to plateau. A demo
  block here is a few dozen trials, and the UI says so next to the
  CSF output.

The dose figure has a direct build consequence: nothing measurable
happens inside one session, so a within-session improvement curve
would be displaying a practice effect. The score is a threshold
readout, not progress.

## Why 2D canvas and not VR

- A headset scene renders flat on a projector. The demo audience sees
  no difference, so the work buys nothing on demo day.
- Gabor patches are 2D by construction: a sinusoidal grating under a
  Gaussian envelope. A three.js port would have to reason about
  angular subtense in a virtual space for no gain.
- Contrast sensitivity depends on known luminance and viewing
  distance. A 2D canvas at a known screen distance controls those
  variables. A headset adds uncontrolled ones to the exact measurement
  the science rests on.

One thing a headset would genuinely buy, if the stretch goal is ever
taken up: independent per-eye contrast. Dichoptic training, where the
amblyopic eye sees high contrast and the fellow eye reduced contrast
until fusion, is a real and reasonably evidenced research line, and it
is the one paradigm a flat canvas cannot deliver. That is a better
justification for WebXR than a `VRButton` for its own sake. It is also
clinical-population work and out of scope for this artifact.

Testing VR later needs no hardware: Meta's Immersive Web Emulator
covers Quest from a Chromium desktop browser. The visionOS Simulator
runs Safari WebXR but supports `immersive-vr` only and has no hand
tracking, so gaze-and-pinch input cannot be exercised without a
device.

## What not to claim

This artifact makes no therapeutic claim and is not medical advice.
The papers are the design source for the stimuli. Perceptual learning
has documented limits on transfer to untrained spatial frequencies,
orientations, and retinal locations, and improvements in this space
are subject to test-retest practice effects. Nothing here has been
validated. Do not describe it as a treatment, a therapy, or a
diagnostic.

Specifically off limits:

- **Disease treatment.** Treats amblyopia, improves nystagmus,
  replaces patching. Those indications belong to cleared devices with
  labelled indications and their own trials.
- **Reading or academic performance.** Improves reading
  comprehension, helps with learning, raises test scores. Directly
  contradicted by CITT-ART.
- **General vision enhancement in healthy eyes.** The evidence base is
  in clinical populations: amblyopia, nystagmus, keratoconus,
  presbyopia. Gains in normal vision are modest and task-specific.
- **Neural rewiring.** Rewires the visual cortex, permanently changes
  neural circuitry. Speculative, and unnecessary.

The defensible description is narrow: an experimental page that
measures a contrast sensitivity function under lateral masking and
comprehension under RSVP, not a medical device, not a substitute for
eye care, not validated for anything. Describing what the page
measures is safe; describing what it does to the user is not.

## Safety

Documented in the trial protocols for supervised Gabor perceptual
learning, and therefore applicable to an unsupervised page: visual
fatigue, headache, nausea, new or worsening diplopia, and
decompensation of a latent binocular problem. Convergence-therapy
trials report eyestrain, headache and fatigue as common.

Serious adverse events are rare in the published work, but the samples
are small enough that rare effects would not be detected. Flicker and
high-contrast rapid presentation carry a theoretical
photosensitive-seizure risk that no study in this literature is
powered to rule out.

For a self-administered consumer page the practical risks are
discomfort and, more importantly, someone with undiagnosed disease
treating this as a substitute for an eye exam. The page should tell
users to stop if they get headache, eye strain or double vision, and
to see an eye care professional about any vision change.
