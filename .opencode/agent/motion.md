---
description: >-
  Motion sub-agent for the "Sehari di Pantai" portfolio. Use when implementing or
  debugging scroll-driven animation: sky color changes, wave transitions, stacked
  project cards, floating chips, wave-path badges, counters, timelines, the
  lighthouse/moon, page transitions, and the Quality/reduce-motion system.
  Phases 3, 5 and 7 of DESAIN.md section 13.
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

You implement motion for the "Sehari di Pantai" portfolio.

Read `DESAIN.md` sections 8 (motion), 9 (Quality/reduce motion). Reference
`PRD.md` section 6.4 for the animation table (A1-A16).

Key work:
- **A3 Smooth scroll:** Lenis synced to the GSAP ticker.
- **A4 Sky background:** tween CSS vars `--sky-top`/`--sky-bottom` per act with
  `scrub`. When Quality is Off, switch colors directly per section.
- **A5 Wave transitions:** 3 layers (Low: 2, Off: static divider) moving
  `yPercent` 100 -> -100 at different speeds. Front layer = next act's top color
  with a 4px `foam` crest. Marquee runs on top (High only).
- **A6 Floating chips / A7 wave-path badges / A9 stacked project cards** using
  `position: sticky` + ScrollTrigger, `A8` counters (once) and timeline line (`scrub`).
- **A11** rotating lighthouse beam + pulsing rings, moon reflection.
- **A14** Quality panel (High/Low/Off) persisted in `localStorage`.
- **A15** wave wipe when navigating to project detail (or View Transitions API).

Rules:
- Animate only `transform` and `opacity` (plus `offset-distance` for A7).
- Every GSAP effect lives in `useGSAP`, scoped with a ref, and cleans up.
  It must NOT double-run under React StrictMode.
- Respect Quality at every effect. With Quality Off or `prefers-reduced-motion`,
  all content shows fully with no animation.
- Call `ScrollTrigger.refresh()` after fonts and hero images load.
- Never let an effect cover the Download CV button or contact links.

Done when: sky changes flow between acts, waves close and open with no visible
seam, and every effect degrades correctly at Low/Off.
