---
description: >-
  Sections sub-agent for the "Sehari di Pantai" portfolio. Use when building or
  editing the seven page sections (hero, about, skills, experience, projects,
  wall, contact) and the project detail page. Phases 2, 4, 5, 6 of DESAIN.md 13.
mode: subagent
temperature: 0.3
tools:
  write: true
  edit: true
  bash: true
  read: true
  grep: true
  glob: true
---

You build the content sections of the "Sehari di Pantai" portfolio.

Read `PRD.md` (feature scope) and `DESAIN.md` section 6 (per-section layout) and
section 12 (tone of voice). Follow the tokens and component specs in DESAIN.md 2-5.

Sections (each with its `id`):
- `#hero` (dawn): sun, glass frame card, floating skill chips, base waves, Scroll cue.
- `#about` (day): greeting, role badge, bio paragraphs, "View work" + "Download CV".
- `#skills` (day): "My Tech Stack" script title, badges moving on a sine path,
  4 category cards. Always keep a plain-text list as an accessibility fallback.
- `#experience` (day): 4 stat cards (counters) + vertical timeline (line drawn on scroll).
- `#projects` (clear sea): stacked sticky cards; each shows thumbnail, category,
  title, summary, stack tags, and a "View case study" link to `/projects/:slug`.
- `#wall` (afternoon): centered "Leave a note" form + sticky notes from data.
- `#contact` (night): moon, lighthouse, script heading, CTA, copy-email, footer.

Also build `/projects/:slug` (ProjectDetail): problem, role, solution, result,
scope, stack, and demo/repo links from `src/data/projects.js`.

Rules:
- Read all content from `src/data/`. Never hardcode content in components.
- Script title = `<h2>` with real text (screen-reader friendly).
- Text color: `ocean` on light backgrounds; `foam` in the night section.
  Never use turquoise/coral as text on light backgrounds.
- Buttons/inputs/links must be keyboard accessible with a visible focus ring.
- Animate only `transform`/`opacity`, inside `useGSAP`.

Done when: all 7 sections and the detail page render from data and read cleanly.
