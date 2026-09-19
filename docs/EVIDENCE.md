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
- RevitalVision published studies index.
  https://doctors.revitalvision.com/about/studies-posters/

## The speed-reading bridge

Visual processing speed is the shared construct. Bovier ER, Hammond
BR. A randomized placebo-controlled study on the effects of lutein and
zeaxanthin on visual processing speed in young healthy subjects. Arch
Biochem Biophys. 2015;572:54-57. PMID 25483230. It treats visual
processing speed as a measurable, movable outcome. RSVP is the
standard speed-reading mechanic operating on the same axis.

This bridge is a design decision, not an established equivalence. An
open question in `RESEARCH_PROMPT.md` asks directly whether it
conflates distinct constructs.

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
