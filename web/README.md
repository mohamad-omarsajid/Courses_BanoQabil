# Bano Qabil Sahiwal: landing page (React)

Creative, fast landing page for the free, self-paced courses platform. This is
the React rebuild of the earlier Astro `landing/` page.

## Stack

- **React 18 + Vite 6 + TypeScript**
- **Tailwind v4** (via `@tailwindcss/vite`); design tokens live in `src/styles/global.css`
- **GSAP + ScrollTrigger** for scroll reveals and the split-text headlines
- **anime.js** for the preloader counter
- **Lenis** for smooth scrolling. Lenis is the engine inside Locomotive Scroll v5,
  picked here because it plays cleanly with React 18, GSAP ScrollTrigger, a fixed
  3D canvas, and the sticky nav. Swap to the `locomotive-scroll` package if you
  want that name specifically.
- **React Three Fiber + drei** for the hero's brand-tuned glass gems (lazy-loaded,
  capped DPR, skipped under reduced motion). Inspired by the Lusion connectors scene.
- **React Bits style components** (`src/components/bits/`): SplitText, ShinyText,
  CountUp, Magnetic, Reveal. Implemented inline so the bundle stays lean.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview
```

## Notes on content

- **Self-paced everywhere:** start anytime, no deadlines, no cohorts, no fixed
  duration. Courses are described as modules, not dates.
- **Audience:** complete beginners in Sahiwal, students and job seekers, free forever.
- **Languages:** English and Roman Urdu (WhatsApp style). All copy lives in
  `src/lib/i18n.tsx`. No em dashes, plain human words.
- **Theme:** light/dark via `data-theme` on `<html>`, set before paint in `index.html`
  and persisted to `localStorage`.

## Structure

- `src/App.tsx` mounts the preloader, nav, sections, footer, and starts smooth scroll.
- `src/components/` holds the sections; `src/components/ui` the shared button/flourish.
- `src/three/HeroScene.tsx` is the WebGL scene (its own lazy chunk).
- `src/lib/` holds the theme context, i18n dictionary, smooth-scroll hook, and helpers.
