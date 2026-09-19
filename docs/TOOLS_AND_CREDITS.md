# Hackathon tools and credits

Balances and claim state are not recorded here. Check each console.

## Anthropic, $100 USD - NOT AVAILABLE

Resolved on event day, 2026-09-19: the credits did not come through.
The build runs on a personal Claude subscription instead. No API key,
no Organization on `platform.claude.com`, nothing to claim.

This costs the build nothing. The trainer is an offline HTML file that
makes no API call at runtime, so the credits would only ever have
funded the Claude Code session, not the demo. The prior open decision
about spending them on RSVP passage generation or difficulty grading
is closed by default: passages ship inline as string constants, and
the zero-network-call rule holds.

Model the organizers named: Fable 5.1.

## Apify, $100, promo code `CLAUDE_BUILD_DAY`

Instagram and Facebook scrapers are the relevant catalogue and the
reason the social-feed stretch goal is buildable rather than
decorative. Also published `https://apify.com/AGENTS.md`. Gated behind
the no-network-call rule.

## Tenki (venue host, account already created)

Three products: Sandboxes, Runners, Code Reviewer.

- **Code Reviewer** is the best fit. GitHub App, installed per
  organization with repository selection, then Install & Authorize. It
  posts two live comments when a PR opens, updates them while running,
  and marks completion with a thumbs-up, roughly three minutes.
  `@tenki-reviewer` in a PR comment triggers it manually. Running it as
  a background reviewer on this repo is real leverage and visible to
  the venue host.
- **Runners** replace GitHub-hosted CI by changing `runs-on` to a Tenki
  label such as `tenki-standard-medium-4c-8g`. Only worth it if this
  repo gets a workflow.
- **Sandboxes** are disposable Linux VMs for agent-executed code,
  `TENKI_API_KEY=tk_...`, install via
  `curl -fsSL https://tenki.cloud/install.sh | bash` or
  `pip install tenki`. A static page executes nothing untrusted, so
  this has no role unless the build grows one.
- Hackathon allowance: **$200**, confirmed by Tenki on event day.
  More is available on request - asked, awaiting an answer. Jobs are
  balance-gated per their docs, so read the balance before depending
  on it.

## AIsa (aisa.one)

Presented from the podium. One key for 5,000+ APIs, 40+ skills and
110+ models, pay per use, key format `sk-aisa-...`, median API call
about $0.012. No credits offer appeared in the presentation. Available,
not free.
