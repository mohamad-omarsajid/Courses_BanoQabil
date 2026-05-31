---
lesson_id: frontend.ch16.l03
title: "16.3 Lenis deep dive"
chapter: 16
order: 3
estimated_minutes: 35
prerequisites:
  - frontend.ch16.l02
---

# 16.3 Lenis deep dive

You met Lenis back in 11.4 and got smooth scroll working. Now you will look under the hood. Lenis has many options that change how the glide feels. You will also learn how to run Lenis inside a Next.js App Router app without breaking things.

## What you'll know by the end

- What `duration`, `easing`, and `lerp` do to the scroll feel.
- How `smoothWheel`, `wheelMultiplier`, `orientation`, and `gestureOrientation` work.
- How to set Lenis up in a Next.js "use client" provider.
- Why you run the raf loop in a `useEffect` with cleanup.
- How to fix sticky elements and hash links that misbehave.
- Which other tools exist, and how to respect reduced motion.

---

## How Lenis works under the hood

Before tuning the options, it helps to know what Lenis is actually doing. The browser's native scroll moves the page in one hard jump per wheel tick. Lenis intercepts that, ignores the native jump, and instead moves a smoothed value toward the target every animation frame.

The diagram below shows the pipeline.

<figure markdown>
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lenis-pipeline" style="max-width:100%;height:auto">
  <title id="svg-lenis-pipeline">The Lenis scroll pipeline: a wheel or touch event sets a target scroll value, the raf loop runs on every frame and applies lerp or easing to produce a smoothed value, that smoothed value is written as a CSS transform on the scroll container, and the user sees smooth movement.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="65" width="130" height="50" rx="8"/>
    <rect x="200" y="65" width="130" height="50" rx="8"/>
    <rect x="380" y="65" width="130" height="50" rx="8"/>
    <rect x="560" y="65" width="120" height="50" rx="8"/>
  </g>
  <defs>
    <marker id="arr-lenis" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-lenis)">
    <line x1="152" y1="90" x2="198" y2="90"/>
    <line x1="332" y1="90" x2="378" y2="90"/>
    <line x1="512" y1="90" x2="558" y2="90"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="12" font-weight="600" fill="#1f1f1c">
      <text x="85" y="88">Wheel / Touch</text>
      <text x="265" y="88">raf loop</text>
      <text x="445" y="88">lerp / easing</text>
      <text x="620" y="88">CSS transform</text>
    </g>
    <g font-size="11" fill="#6b6b65">
      <text x="85" y="105">sets target</text>
      <text x="265" y="105">every frame</text>
      <text x="445" y="105">smoothed value</text>
      <text x="620" y="105">moves page</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="350" y="155">Lenis prevents the native scroll jump and replaces it with a smoothed transform.</text>
    </g>
  </g>
</svg>
<figcaption>Every wheel tick sets a target. The raf loop runs each frame and applies lerp or easing to move a smoothed value toward that target. That value becomes a CSS transform on the scroll container. No native jump, just a glide.</figcaption>
</figure>

This is why Lenis needs a raf loop. Without it, the smoothed value never updates, and the page never moves.

---

## The main Lenis options

Lenis takes an options object when you create it. These options control the feel of the scroll.

```js
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
})
```

Here is what each one means.

- `duration` is how long the glide lasts in seconds. A bigger number means a longer, slower glide.
- `easing` is a function that shapes the glide. It controls speed across the motion. The example above starts fast and slows near the end.
- `lerp` is a smoothing factor between 0 and 1. A lower value is smoother and slower. A higher value snaps quicker to your input.
- `smoothWheel` turns smooth scrolling on for the mouse wheel. Set it to `false` to keep the wheel native.
- `wheelMultiplier` scales how far one wheel tick moves you. Above 1 scrolls faster. Below 1 scrolls slower.
- `orientation` sets the scroll direction. Use `'vertical'` or `'horizontal'`.
- `gestureOrientation` sets which gesture direction Lenis listens to. This matters for touch and trackpad.

One note. Lenis uses either `duration` plus `easing`, or `lerp`. You usually pick one approach, not both at once. Start with `lerp` for a simple smooth feel.

The table below is a quick reference for every key option.

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `lerp` | number | `0.1` | smoothing fraction per frame; lower = softer |
| `duration` | number | none | fixed glide length in seconds (use instead of lerp) |
| `easing` | function | linear | speed curve for the duration approach |
| `smoothWheel` | boolean | `true` | smooth mouse wheel scroll |
| `wheelMultiplier` | number | `1` | speed multiplier per wheel tick |
| `touchMultiplier` | number | `1` | speed multiplier per touch swipe |
| `orientation` | string | `'vertical'` | `'vertical'` or `'horizontal'` |
| `gestureOrientation` | string | `'vertical'` | which swipe direction Lenis responds to |
| `infinite` | boolean | `false` | enable infinite scroll loop |
| `autoRaf` | boolean | `false` | run raf internally (skip manual loop) |

---

## How lerp and duration change the feel

These two are the hardest to picture, so try them by hand.

```js
// Smoother and slower. Good for calm, heavy sites.
const calm = new Lenis({ lerp: 0.05 })

// Snappier. The page follows your wheel more closely.
const snappy = new Lenis({ lerp: 0.2 })
```

With `lerp`, the page moves a fraction of the way to the target each frame. A small fraction like `0.05` takes more frames to arrive, so it feels soft. A big fraction like `0.2` arrives fast, so it feels tight.

`duration` plus `easing` is the other style. You give a fixed time and a curve.

```js
const timed = new Lenis({
  duration: 1.5,
  easing: (t) => 1 - Math.pow(1 - t, 3),
})
```

The `easing` function takes `t`, a value from 0 to 1. It returns a new value from 0 to 1. That return value decides how far along the glide you are. The example above slows down near the end, which feels natural.

The best advice is to test on a real page. Numbers on paper do not tell you how it feels.

??? note urdu "اردو میں مزید وضاحت"
    Lenis اسکرول کو یک دم کودنے سے روکتا ہے اور ہر فریم میں ایک ہموار قدر کو منزل کی طرف آہستہ آہستہ بڑھاتا ہے۔ `lerp` اور `duration` دونوں اسکرول کی نرمی کو کنٹرول کرتے ہیں۔ `lerp` ہر فریم میں صفحے کو منزل کی طرف تھوڑا تھوڑا حرکت دیتا ہے، اس لیے چھوٹا نمبر زیادہ نرم لیکن سست محسوس ہوتا ہے۔ `duration` ایک مقررہ وقت دیتا ہے اور `easing` فنکشن اس وقت کے دوران رفتار کی شکل بناتا ہے۔ عام طور پر آپ ان دونوں میں سے ایک طریقہ منتخب کرتے ہیں، دونوں ایک ساتھ نہیں۔ raf لوپ کے بغیر Lenis کچھ نہیں کرتا، اس لیے اسے ہمیشہ چلانا ضروری ہے۔ بہترین فیصلہ اصلی صفحے پر ٹیسٹ کر کے ہوتا ہے، کاغذ پر نمبر دیکھ کر نہیں۔

---

## Lenis with Framer Motion

You may use Framer Motion for scroll based animation. Framer Motion reads the scroll position. Lenis changes how that position moves. They work together once Lenis is running.

You do not wire them directly. You just start Lenis, and Framer Motion hooks like `useScroll` will pick up the smoothed scroll. The key is to keep one Lenis instance and one raf loop for the whole app.

```js
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

This loop calls `lenis.raf` on every frame. That is what makes the glide update. Without this loop, Lenis does nothing.

---

## Lenis in the Next.js App Router

Lenis touches the browser. It reads the window and listens for wheel events. A server component runs on the server, where there is no window. So you must set Lenis up in a client component.

Make a provider with `"use client"` at the top. Run the raf loop inside `useEffect`, and clean it up when the component unmounts.

```jsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })

    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return children
}
```

Read this from the top. The `'use client'` line tells Next.js to run this in the browser. The `useEffect` runs after the component mounts, which means the browser is ready.

The cleanup function runs when the component leaves the screen. It stops the raf loop with `cancelAnimationFrame`. It also calls `lenis.destroy()` to remove the event listeners. Without cleanup, you can stack many Lenis instances and the page gets buggy.

Wrap your app with this provider in `layout.js` or a parent client component.

!!! tip
    Always set Lenis up in a client component or a "use client" provider in Next.js. Never put it in a server component. The server has no window, so Lenis will crash.

---

## Common pitfalls and how to fix them

Smooth scroll changes how the browser scrolls. That can surprise some features.

Sticky elements can jump. Lenis transforms the scroll, so `position: sticky` may behave oddly. It can stutter or stick at the wrong spot. Test every sticky element after you add Lenis. If one breaks, you may need a different layout for it.

Anchor links can ignore the smooth scroll. A normal hash link like `#about` makes the browser jump instantly. That fights with Lenis. Use `lenis.scrollTo` for in-page links so they respect the glide.

```js
const lenis = new Lenis({ lerp: 0.1 })

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const target = link.getAttribute('href')
    lenis.scrollTo(target)
  })
})
```

This code finds every link whose `href` starts with `#`. It stops the default jump with `preventDefault`. Then it calls `lenis.scrollTo(target)`, which glides to the matching element.

Route changes need a reset. When the user moves to a new page, scroll back to the top. In Next.js, you can call `lenis.scrollTo(0, { immediate: true })` when the route changes.

The table below lists common problems and their fixes.

| Problem | Why it happens | Fix |
| --- | --- | --- |
| `position: sticky` jumps or glitches | Lenis transforms the container, confusing the sticky calc | Test after adding Lenis; try a different layout or use Lenis `wrapper` option |
| Hash link jumps instantly | Native `#id` scroll fires before Lenis | Call `lenis.scrollTo(target)` on click with `preventDefault` |
| New page does not start at top | Lenis holds the old scroll position | Call `lenis.scrollTo(0, { immediate: true })` on route change |
| Two Lenis instances fighting | `useEffect` cleanup not running | Return `cancelAnimationFrame` and `lenis.destroy()` from cleanup |
| Works in dev, breaks in production | SSR tries to read `window` | Put everything inside `useEffect` in a `'use client'` component |

!!! warning
    Smooth scroll can break `position: sticky` and hash links. Test them on every page. Use `lenis.scrollTo` for in-page anchors so they follow the smooth scroll instead of jumping.

---

## Other tools to know about

Lenis is not the only smooth scroll library, but it sits at the center now.

- Locomotive Scroll v5 is now built on Lenis. If you used older Locomotive, the new version shares the same engine underneath.
- Studio Freight Hamo is a small set of utility hooks. It helps you wire up raf loops and resize handlers in React.

You do not need these to ship a good site. Plain Lenis covers most cases.

---

## Respect prefers-reduced-motion

This came up in 11.4 and it still matters. Some users set their system to reduce motion. Honour that. Skip the smooth scroll for them.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.1 })
  // start the raf loop here
}
```

This checks the user setting first. If they want less motion, you skip Lenis and let the browser scroll normally. That is a small change that respects real people.

---

### Try this

Take a long page and start Lenis with `new Lenis({ lerp: 0.05 })`, then scroll. Now change `lerp` to `0.2` and scroll again. Feel the difference: the low number glides soft and slow, the high number follows your wheel tightly. Pick the value that feels right for your page.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does a lower `lerp` value do to the scroll feel?
2. Why must you set Lenis up in a client component in Next.js?
3. What should the cleanup function in `useEffect` do for Lenis?
4. How do you make a hash link respect the smooth scroll?

---

## What's next

You now know Lenis well, from its options to its tricky parts. But Lenis is one tool among several. The next lesson helps you decide which animation tool fits a given job.

[Next lesson: 15.4 Choosing the right tool &rarr;](16-4-choosing-the-right-tool.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Lenis on GitHub](https://github.com/darkroomengineering/lenis)
- [Locomotive Scroll on GitHub](https://github.com/locomotivemtl/locomotive-scroll)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[lerp]: A smoothing factor that moves the page a fraction toward the target each frame. (Roman Urdu: narmi ka factor jo har frame thori si harkat deta hai)
*[easing]: A function that shapes the speed of motion over time. (Roman Urdu: function jo waqt ke sath raftaar ki shakl banata hai)
*[scrollTo]: A Lenis method that glides smoothly to a target position or element. (Roman Urdu: Lenis ka method jo narmi se kisi jagah tak le jata hai)
*[sticky]: A CSS position that pins an element while you scroll past its area. (Roman Urdu: CSS position jo element ko scroll ke doran chipka deti hai)
*[hash navigation]: Moving to a part of the same page using a link that starts with #. (Roman Urdu: usi page ke hisse tak # wale link se jana)
