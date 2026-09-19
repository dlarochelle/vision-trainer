# Independent research prompt

Run verbatim in Perplexity, Gemini and ChatGPT. The value is in the
disagreement between them, so do not vary the wording per tool. It is
de-identified on purpose: no names, no personal health facts, no
repository paths.

---

I am building a browser-based visual training application and want an
independent, adversarial assessment of the evidence base before I go further.

CONTEXT
The application is a single-page web app with two modes that share one
"visual processing speed" score:
1. A Gabor-patch contrast sensitivity trainer — sinusoidal grating under a
   Gaussian envelope, two-alternative forced choice orientation
   discrimination, adaptive staircase.
2. An RSVP (rapid serial visual presentation) speed-reading trainer using
   the same scoring axis.

My starting bibliography came from a consumer eye-health educator's
reference list for an episode on vision improvement. It contains roughly 31
entries clustering into three groups: photobiomodulation / 670nm red light
(Jeffery, Shinhmar, the LIGHTSITE trials), macular carotenoid
supplementation (lutein/zeaxanthin — Stringham, Nolan, Bovier & Hammond),
and perceptual learning (Hecht 2025 on infantile nystagmus, Magdalene 2025
on amblyopia, Tang 2024 in AJO on Gabor patches and contrast sensitivity,
plus RevitalVision's published studies).

I am building only from the perceptual-learning cluster, because it is the
only one deliverable as software.

QUESTIONS

1. DESIGN PARAMETERS. What do the actual published perceptual-learning
   protocols specify? I need concrete numbers, not general endorsement:
   spatial frequencies used, contrast ranges, staircase procedures (2-down-
   1-up, QUEST, ZEST, other), trials per session, session duration,
   sessions per week, total sessions before measurable effect, and task
   design (detection vs. discrimination, orientation vs. phase). Where
   protocols disagree, say so rather than averaging them.

2. WHAT THE EVIDENCE DOES NOT SUPPORT. Be adversarial here. What are the
   documented limits on transfer of perceptual learning — to untrained
   spatial frequencies, orientations, retinal locations, and to real-world
   visual tasks? How much of the reported improvement in commercial vision
   training is attributable to test-retest practice effects, criterion
   shifts, or placebo rather than genuine neural change? What are the
   strongest published criticisms of commercial vision-training products,
   including RevitalVision specifically? Which claims in this space have
   failed replication?

3. WHAT I AM MISSING. What significant literature would a reference list
   like the one described above systematically omit, given that it was
   assembled by a content creator rather than as a systematic review?
   I am specifically interested in whether there are established research
   lines I have not mentioned — for example dichoptic training for
   amblyopia, action video game training and contrast sensitivity, or
   vision therapy for convergence insufficiency — and in whether any of
   them are better-evidenced than what I have.

4. THE SPEED-READING BRIDGE. Is "visual processing speed" a legitimate
   shared construct linking contrast-sensitivity training and RSVP reading,
   or am I conflating distinct constructs? What does the evidence say about
   RSVP as a reading-speed intervention, particularly regarding
   comprehension trade-offs and whether gains persist outside the RSVP
   presentation format?

5. SAFETY AND CLAIMS. What claims would be inappropriate or legally risky
   for a non-clinical consumer application in this space? What are the
   documented risks of self-administered visual training, if any?

OUTPUT FORMAT
Structure your answer under those five numbered headings. For every
substantive claim, cite the specific study with authors, year, journal, and
study type (RCT, observational, review, meta-analysis), and state the
sample size where relevant. Distinguish explicitly between findings from
randomized controlled trials and findings from uncontrolled or
manufacturer-sponsored studies. End with a section titled "Strongest
reasons this project's premise is wrong" containing the three most serious
evidence-based objections to the approach described above.
