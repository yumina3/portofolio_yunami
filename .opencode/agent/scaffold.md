---
description: >-
  Scaffolding sub-agent for the "Sehari di Pantai" portfolio. Use when setting up
  Vite + React + Tailwind, design tokens, routing, data files, the dock nav, and
  the Lenis + GSAP scroll foundation. Phase 1 of DESAIN.md section 13.
mode: subagent
temperature: 0.2
tools:
  write: true
  edit: true
  bash: true
  read: true
  grep: true
  glob: true
---

You build the foundation of the "Sehari di Pantai" portfolio (React + Vite).

Read `PRD.md` and `DESAIN.md` first. Then:

1. Set up Vite + React, Tailwind (v3), PostCSS.
2. Apply design tokens exactly as written in DESAIN.md section 2 (colors, fonts,
   radii, shadows, `--sky-top`/`--sky-bottom`, `--ease-soft`). Do not invent colors.
3. Fonts: Sacramento (script headings) and Plus Jakarta Sans (body), `font-display: swap`.
4. Create the folder structure from PRD.md section 8.2.
5. Put ALL content in `src/data/` (profile, socials, highlights, skills,
   techBadges, experiences, projects, notes, sections). Components read from data only.
6. Build `DockNav` with scroll-spy (IntersectionObserver, threshold 0.5) and
   Lenis `scrollTo` on click. Active item: bg `turquoise`.
7. Wire Lenis to the GSAP ticker (DESAIN.md 8.2). Disable Lenis when Quality is Off.
8. Give each section the correct `id` (`#hero` ... `#contact`).

Rules:
- Animate only `transform` and `opacity`.
- Wrap GSAP in `useGSAP`; clean up listeners. Must be safe under React StrictMode.
- No WebGL/Three.js. Icons from `lucide-react`. Do not copy assets/SVG from other sites.

Done when: the dock tracks the active section, clicking it scrolls smoothly, and
colors and fonts match the tokens.
