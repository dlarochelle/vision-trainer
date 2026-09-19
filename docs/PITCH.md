# 60-second pitch

Plain, first person, about 140 words. Read at a normal pace this runs
just under a minute. Framing per the Claims section of `AGENTS.md`:
better vision and faster reading are goals under testing, not results.

---

This is for people who want to see better and read faster.

It's one HTML file. No install, no network. Two modes.

First, contrast detection. A faint striped patch flashes between two
brighter ones, and you say which interval it was in. The app measures
how faint you can go at three spatial frequencies. That's your contrast
sensitivity curve.

Second, speed reading. Words flash one at a time, and here's the fun
part: the words are my actual Instagram feed, cached this morning. Press
N, next post. After each one, four true-or-false questions. Speed is
never shown without comprehension.

The goal is better vision and faster reading. The stimulus design comes
from published studies, but that evidence is from clinical populations,
not healthy adults, so I am testing whether it works for the rest of us.
More testing is needed.

---

## Checks

Word count of the script between the rules: 140 (checked 2026-09-19).
Banned-word check (treats, therapy, cures, rewires,
permanently, mitigates, prevents, diagnoses, restores, corrects):

```bash
awk '/^---$/{n++; next} n==1' docs/PITCH.md | wc -w
awk '/^---$/{n++; next} n==1' docs/PITCH.md | grep -Eiow 'treats|therapy|cures|rewires|permanently|mitigates|prevents|diagnoses|restores|corrects' || echo "no banned words"
```
