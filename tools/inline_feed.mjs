#!/usr/bin/env node
/**
 * inline_feed.mjs — build-time only. Never runs in the demo.
 *
 * Reads data/feed_passages.json and rewrites index.html, replacing everything
 * between the FEED_PASSAGES_START and FEED_PASSAGES_END markers with a literal
 * `const FEED_PASSAGES = [...]`. This is what keeps the demo offline: the
 * snapshot ships as source, so index.html never fetches anything.
 *
 * Usage:
 *   node tools/inline_feed.mjs            # inline data/feed_passages.json
 *   node tools/inline_feed.mjs --clear    # reset to the empty default
 */

import { readFile, writeFile } from "node:fs/promises";

const HTML_PATH = new URL("../index.html", import.meta.url);
const JSON_PATH = new URL("../data/feed_passages.json", import.meta.url);

const START = "/* FEED_PASSAGES_START */";
const END = "/* FEED_PASSAGES_END */";

const QUESTIONS_PER_PASSAGE = 4;

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

// A credential accidentally pasted into a caption would be inlined verbatim
// and committed. Cheap to check, expensive to miss.
const SECRET_PATTERNS = [
  /apify_api_[A-Za-z0-9]{20,}/,
  /apify_proxy_[A-Za-z0-9]{20,}/,
  /sk-ant-[A-Za-z0-9_-]{20,}/,
  /sk-aisa-[A-Za-z0-9_-]{20,}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
];

function validate(passages) {
  if (!Array.isArray(passages)) die("feed_passages.json is not an array");
  passages.forEach((p, i) => {
    const where = `passage ${i} (${p && p.title ? p.title : "untitled"})`;
    if (!p || typeof p !== "object") die(`${where}: not an object`);
    for (const key of ["title", "source", "fetchedAt", "text"]) {
      if (typeof p[key] !== "string" || !p[key]) die(`${where}: missing or empty "${key}"`);
    }
    if (!Array.isArray(p.questions) || p.questions.length !== QUESTIONS_PER_PASSAGE) {
      die(`${where}: expected ${QUESTIONS_PER_PASSAGE} questions, got ${(p.questions || []).length}`);
    }
    p.questions.forEach((q, j) => {
      if (!q || typeof q.q !== "string" || !q.q || typeof q.a !== "boolean") {
        die(`${where}: question ${j} must be {q: string, a: boolean}`);
      }
    });
  });

  const blob = JSON.stringify(passages);
  for (const re of SECRET_PATTERNS) {
    const hit = blob.match(re);
    if (hit) die(`snapshot appears to contain a credential (${hit[0].slice(0, 12)}...). Refusing to inline.`);
  }
}

// Escape sequences that would break out of a <script> block in HTML.
function safeJson(value) {
  return JSON.stringify(value, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const clear = process.argv.includes("--clear");

let passages = [];
if (!clear) {
  let raw;
  try {
    raw = await readFile(JSON_PATH, "utf8");
  } catch {
    die("data/feed_passages.json not found. Run tools/fetch_feed.mjs first, or pass --clear.");
  }
  try {
    passages = JSON.parse(raw);
  } catch (err) {
    die(`data/feed_passages.json is not valid JSON: ${err.message}`);
  }
  validate(passages);
}

const html = await readFile(HTML_PATH, "utf8");
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx === -1 || endIdx === -1) die(`markers ${START} / ${END} not found in index.html`);
if (endIdx < startIdx) die("FEED_PASSAGES_END appears before FEED_PASSAGES_START");

const body = passages.length
  ? `const FEED_PASSAGES = ${safeJson(passages)};`
  : "const FEED_PASSAGES = [];";

const next = html.slice(0, startIdx + START.length) + "\n" + body + "\n" + html.slice(endIdx);

if (next === html) {
  console.error("index.html already up to date");
} else {
  await writeFile(HTML_PATH, next, "utf8");
  console.error(`Inlined ${passages.length} feed passage(s) into index.html`);
}
