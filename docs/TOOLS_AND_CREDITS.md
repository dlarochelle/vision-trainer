# Hackathon tools and credits

Balances and claim state are not recorded here. Check each console.

## Anthropic, $100 USD

Two options were offered, and they are alternatives rather than a
stack: an existing Claude subscription, or the API credits. Running
Claude Code on a subscription needs no claim, so claiming is not a
prerequisite to building.

Claiming: `platform.claude.com/offers`, sign in, claim the offer,
generate the key. Prerequisite named on the event page: an
Organization created on `platform.claude.com`.

Where the credits actually go: this trainer is an offline HTML file
that makes no API call at runtime, so the credits fund the Claude Code
session that builds it, not the demo. **Open decision:** if the
credits should be visible in the demo itself, RSVP passage generation
or difficulty grading is the place to spend them. That is a scope
change, not a default, and it breaks the zero-network-call rule.

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
- Unknown: the hackathon allowance. Their welcome mail says first runs
  are on us and names no figure; their docs say jobs are balance-gated.
  Read the balance before depending on it.

## AIsa (aisa.one)

Presented from the podium. One key for 5,000+ APIs, 40+ skills and
110+ models, pay per use, key format `sk-aisa-...`, median API call
about $0.012. No credits offer appeared in the presentation. Available,
not free.
