#!/usr/bin/env node
/**
 * Repository checks for vision-trainer.
 *
 * These are the rules in AGENTS.md that a machine can verify. They exist
 * because the claims rules are not style preferences: the footer disclaimer
 * and the banned-word list are stated there as not subject to tradeoffs
 * against scope, polish, or deadline, and a check that only runs when
 * somebody remembers it is not a check.
 *
 * No dependencies and no build step, by the same rule that governs the
 * deliverable. Run it locally exactly as CI does:
 *
 *   node tools/check.mjs
 *
 * Scope note. The banned words appear legitimately in AGENTS.md (which
 * defines the list), in docs/EVIDENCE.md (which names the claims that are
 * off limits, and cites paper titles), and in docs/PITCH.md's own check
 * section. Those are mentions, not uses. The rule binds what the project
 * *says*, so the checked surface is the UI and the pitch script itself.
 */

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const failures = [];
const fail = (check, msg) => failures.push({ check, msg });
let checksRun = 0;
const run = (name, fn) => { checksRun++; try { fn(name); } catch (e) { fail(name, e.message); } };

const html = readFileSync("index.html", "utf8");
const pitch = readFileSync("docs/PITCH.md", "utf8");

/* ------------------------------------------------------------------ claims */

// AGENTS.md: "Never use these words anywhere in the UI, the README, or the
// pitch". Verbatim list, matched whole-word and case-insensitively.
const BANNED = ["treats", "therapy", "cures", "rewires", "permanently",
                "mitigates", "prevents", "diagnoses", "restores", "corrects"];

// The pitch script is the region between the first two `---` rules, which is
// the span docs/PITCH.md already defines for its own word count.
function pitchScript(src) {
  const parts = src.split(/^---$/m);
  if (parts.length < 3) throw new Error("docs/PITCH.md: expected the script to sit between two `---` rules");
  return parts[1];
}

run("banned-words", (name) => {
  for (const [label, text] of [["index.html", html], ["docs/PITCH.md (script)", pitchScript(pitch)]]) {
    for (const word of BANNED) {
      const re = new RegExp(`\\b${word}\\b`, "gi");
      const hits = [...text.matchAll(re)];
      for (const h of hits) {
        const line = text.slice(0, h.index).split("\n").length;
        fail(name, `${label}:${line}: banned word "${h[0]}" (AGENTS.md "Claims")`);
      }
    }
  }
});

// The footer disclaimer is required to be on screen at all times, verbatim.
const DISCLAIMER =
  "Experimental. Not a medical device, not a substitute for eye care, and not " +
  "validated to improve reading comprehension or treat any condition. Evidence " +
  "for this paradigm comes from clinical populations (amblyopia, nystagmus, " +
  "keratoconus), not healthy adults.";

run("footer-disclaimer", (name) => {
  const m = html.match(/<footer>([\s\S]*?)<\/footer>/);
  if (!m) { fail(name, "index.html: no <footer> element"); return; }
  const got = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (got !== DISCLAIMER) {
    fail(name, "index.html: footer text is not the verbatim disclaimer in AGENTS.md\n" +
               `    expected: ${DISCLAIMER}\n    actual:   ${got}`);
  }
  // It must also be impossible to dim or hide during measurement.
  if (!/footer,\s*body\[data-phase="measuring"\]\s*footer\s*\{[^}]*opacity:\s*1\s*!important/.test(html)) {
    fail(name, "index.html: the rule pinning the footer to opacity 1 during measuring is gone");
  }
  if (/<footer[^>]*\bclass="[^"]*\bhidden\b/.test(html)) {
    fail(name, "index.html: the footer carries the `hidden` class");
  }
});

/* ------------------------------------------------------------- one file */

// A webfont stylesheet is allowed; everything else ships inside index.html.
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

run("self-contained", (name) => {
  for (const m of html.matchAll(/<(script|link|img|iframe|source|audio|video)\b[^>]*?\b(?:src|href)\s*=\s*"([^"]*)"/gi)) {
    const [, tag, url] = m;
    const line = html.slice(0, m.index).split("\n").length;
    if (url.startsWith("#") || url.startsWith("data:")) continue;
    if (tag.toLowerCase() === "script") {
      fail(name, `index.html:${line}: <script src> — all JS ships inside index.html`);
      continue;
    }
    let host;
    try { host = new URL(url, "https://example.invalid/").hostname; } catch { host = ""; }
    if (!ALLOWED_HOSTS.includes(host)) {
      fail(name, `index.html:${line}: external <${tag}> subresource "${url}" (only the webfont stylesheet is allowed)`);
    }
  }
  // No build step: nothing may expect a bundler or a package manager.
  for (const f of ["package.json", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"]) {
    try { readFileSync(f); fail(name, `${f} exists — the deliverable has no build step`); } catch { /* absent, as required */ }
  }
});

run("no-runtime-fetch", (name) => {
  // AGENTS.md: "No runtime data fetching on the demo path; the cached feed
  // stays embedded." Matched on call syntax so prose about fetching is fine.
  const banned = [/\bfetch\s*\(/g, /\bXMLHttpRequest\b/g, /\bEventSource\b/g,
                  /\bWebSocket\b/g, /navigator\.sendBeacon\b/g, /\bimport\s*\(/g];
  for (const re of banned) {
    for (const m of html.matchAll(re)) {
      const line = html.slice(0, m.index).split("\n").length;
      fail(name, `index.html:${line}: runtime network call "${m[0].trim()}" on the demo path`);
    }
  }
});

/* ------------------------------------------- single theme, and quarantine */

run("single-theme", (name) => {
  // Dark-only on purpose: surround luminance is a variable in the task.
  for (const m of html.matchAll(/prefers-color-scheme|color-scheme\s*:/g)) {
    const line = html.slice(0, m.index).split("\n").length;
    fail(name, `index.html:${line}: "${m[0]}" — the page is dark-only by design (AGENTS.md)`);
  }
});

run("measurement-quarantine", (name) => {
  // The hard stop must stay bound to the one attribute, so a new effect
  // cannot forget to switch itself off.
  if (!/body\[data-phase="measuring"\]\s*\*,[\s\S]{0,160}?animation:\s*none\s*!important/.test(html)) {
    fail(name, "index.html: the measuring-phase animation hard stop is missing");
  }
  // #note is instructional text and is exempt from quarantine dimming.
  const note = html.match(/<(\w+)[^>]*\bid="note"[^>]*>/);
  if (!note) fail(name, "index.html: no element with id=\"note\"");
  else if (!/\bclass="[^"]*\bkeep\b/.test(note[0])) {
    fail(name, "index.html: #note lost its `keep` class — the brief would dim during measurement");
  }
  // The comparison scaffold stays gone.
  if (/data-treatment/.test(html)) fail(name, "index.html: data-treatment reintroduced (AGENTS.md \"Visual direction\")");
});

/* ------------------------------------------------------------------- code */

run("inline-js-parses", (name) => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length === 0) { fail(name, "index.html: no inline <script> found"); return; }
  const dir = mkdtempSync(join(tmpdir(), "vt-check-"));
  scripts.forEach((s, i) => {
    const f = join(dir, `s${i}.js`);
    writeFileSync(f, s[1]);
    try {
      execFileSync(process.execPath, ["--check", f], { stdio: ["ignore", "ignore", "pipe"] });
    } catch (e) {
      fail(name, `index.html: inline script #${i + 1} is not valid JavaScript\n    ${String(e.stderr).trim().split("\n").slice(0, 3).join("\n    ")}`);
    }
  });
});

/* ----------------------------------------------------------------- report */

if (failures.length) {
  console.error(`\n${failures.length} problem(s) across ${checksRun} checks:\n`);
  for (const f of failures) console.error(`  [${f.check}] ${f.msg}`);
  console.error("\nThese rules come from AGENTS.md. They are not style preferences;\n" +
                "the claims rules in particular are stated there as non-negotiable.\n");
  process.exit(1);
}
console.log(`All ${checksRun} checks passed.`);
