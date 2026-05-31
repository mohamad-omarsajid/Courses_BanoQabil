---
lesson_id: frontend.ch16.l02
title: "16.2 Anime.js"
chapter: 16
order: 2
estimated_minutes: 35
prerequisites:
  - frontend.ch16.l01
---

# 16.2 Anime.js

You already met Framer Motion and GSAP. Now meet Anime.js, a tiny animation library. It is small, free, and easy to read. It shines when you want one neat effect without a heavy setup.

## What you'll know by the end

- What Anime.js is and how to install it
- When to pick Anime.js and when to pick GSAP
- How to write a basic `animate` call with target, properties, duration, and ease
- How to build a simple timeline with `createTimeline`
- How to draw an SVG line by animating `strokeDashoffset`
- How to stagger many elements with `stagger()`

---

## What is Anime.js

Anime.js is a small JavaScript animation library. It is free and open source. You describe what you want, and the library handles the frames for you. This style is called declarative animation (Roman Urdu: aap natija batate hain, library kaam karti hai). You say the end state, not every tiny step.

The current version is v4. You install it with npm.

```bash
npm install animejs
```

Then you import only the parts you need. Anime.js v4 uses named imports.

```js
import { animate, stagger, createTimeline } from "animejs";
```

You pull in `animate` for single effects, `stagger` for groups, and `createTimeline` for sequences. You skip what you do not use. This keeps your bundle small.

---

## A basic animate call

The `animate` function takes a target, then an object of properties. You also set options like duration and ease.

```js
import { animate } from "animejs";

animate(".box", {
  translateX: 250,
  rotate: 360,
  duration: 800,
  ease: "outQuad",
});
```

The target `.box` is a CSS selector. You can also pass a real DOM element. `translateX: 250` moves the box 250 pixels right. `rotate: 360` spins it once. `duration` is in milliseconds, so 800 means 0.8 seconds. `ease` controls the speed curve, and `outQuad` starts fast then slows down.

That is the whole pattern. Target, properties, options. Most effects start here.

The table below covers the most useful options you can pass in that second argument.

| Option | Type | What it does | Example |
| --- | --- | --- | --- |
| `duration` | number | length in milliseconds | `800` |
| `delay` | number or function | wait before starting | `200` |
| `ease` | string | speed curve | `"outQuad"`, `"inOutSine"` |
| `loop` | boolean or number | repeat count; `true` loops forever | `true` |
| `direction` | string | `"normal"`, `"reverse"`, or `"alternate"` | `"alternate"` |
| `autoplay` | boolean | start on creation | `true` |
| `onComplete` | function | callback when done | `() => console.log("done")` |
| `from` + `to` | pair as `[from, to]` | explicit start and end values | `[0, 1]` |

---

## A basic timeline

A timeline runs steps in order. You build one with `createTimeline`, then add each step.

```js
import { createTimeline } from "animejs";

const tl = createTimeline();

tl.add(".title", { opacity: [0, 1], duration: 600 })
  .add(".subtitle", { translateY: [20, 0], opacity: [0, 1], duration: 600 })
  .add(".button", { scale: [0.8, 1], duration: 400 });
```

Each `.add` is one step. The title fades in first. Then the subtitle slides up. Then the button grows. You chain the calls with dots, so the code reads top to bottom like the animation plays.

The pairs like `[0, 1]` mean from value to value. So `opacity: [0, 1]` goes from invisible to visible.

The diagram below shows how a timeline runs steps one after another in time.

<figure markdown>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-timeline-title" style="max-width:100%;height:auto">
  <title id="svg-timeline-title">An Anime.js timeline with three steps: the title fades in from 0 to 600ms, the subtitle slides up from 600 to 1200ms, and the button scales up from 1200 to 1600ms. A horizontal time axis runs below all three blocks.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="40" y="50" width="160" height="44" rx="6"/>
    <rect x="220" y="50" width="160" height="44" rx="6"/>
    <rect x="400" y="50" width="110" height="44" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="600" fill="#1f1f1c">
      <text x="120" y="70">.title</text>
      <text x="300" y="70">.subtitle</text>
      <text x="455" y="70">.button</text>
    </g>
    <g font-size="11" fill="#6b6b65">
      <text x="120" y="86">opacity [0,1]</text>
      <text x="300" y="86">translateY + opacity</text>
      <text x="455" y="86">scale [0.8,1]</text>
    </g>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" fill="none">
    <line x1="40" y1="130" x2="640" y2="130"/>
  </g>
  <defs>
    <marker id="arr-tl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-tl)">
    <line x1="636" y1="130" x2="642" y2="130"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="11" fill="#6b6b65">
    <text x="40" y="148">0ms</text>
    <text x="200" y="148">600ms</text>
    <text x="380" y="148">1200ms</text>
    <text x="510" y="148">1600ms</text>
    <text x="640" y="148">time</text>
  </g>
  <g stroke="#6b6b65" stroke-width="1" fill="none">
    <line x1="40" y1="125" x2="40" y2="135"/>
    <line x1="200" y1="125" x2="200" y2="135"/>
    <line x1="380" y1="125" x2="380" y2="135"/>
    <line x1="510" y1="125" x2="510" y2="135"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="12" fill="#6b6b65">
    <text x="350" y="185">Each .add() step starts where the previous one ends.</text>
    <text x="350" y="200">You can also pass an offset to overlap or delay steps.</text>
  </g>
</svg>
<figcaption>A createTimeline runs steps one after another. Each .add call plays after the previous one finishes. The whole sequence reads top to bottom in code, and left to right in time.</figcaption>
</figure>

---

## SVG path drawing

Anime.js is famous for drawing SVG lines. The trick uses a property called `strokeDashoffset` (Roman Urdu: SVG line kheechne wali property). You turn a solid line into a dashed line, then slide the dash to reveal the line over time.

First you need some SVG with a path. Here is a simple one.

```html
<svg viewBox="0 0 100 100" width="200">
  <path
    class="line"
    d="M10 50 L90 50"
    stroke="teal"
    stroke-width="4"
    fill="none"
  />
</svg>
```

Now you animate the offset down to zero. This makes the line appear to draw itself.

```js
import { animate } from "animejs";

const path = document.querySelector(".line");
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

animate(".line", {
  strokeDashoffset: 0,
  duration: 1500,
  ease: "inOutSine",
});
```

You measure the path length with `getTotalLength()`. You set the dash and offset to that length, so the line starts hidden. Then you animate the offset to `0`, and the line draws in. It looks like a pen moving across the screen.

!!! note "Did you know"
    Anime.js became well known for this exact SVG trick. Designers used it to draw logos and signatures line by line. The whole effect is just one number, `strokeDashoffset`, moving to zero.

---

## Staggered animations

A stagger (Roman Urdu: thori thori der se ek ke baad ek) adds a small delay between many elements. So they animate one after another, not all at once. You use the `stagger()` helper inside your properties.

```js
import { animate, stagger } from "animejs";

animate(".card", {
  translateY: [40, 0],
  opacity: [0, 1],
  duration: 600,
  delay: stagger(100),
});
```

Say you have six cards with the class `.card`. `stagger(100)` gives each card 100 milliseconds more delay than the last. The first card starts at 0ms, the next at 100ms, and so on. The result is a clean wave effect down your list.

---

## Anime.js compared with GSAP

Both libraries are great. They just aim at different jobs. Here is a fuller look.

| Feature | Anime.js | GSAP |
| --- | --- | --- |
| Bundle size | Tiny (about 17 KB gzipped) | Larger (about 60 KB with plugins) |
| Scroll tools | Basic, manual setup | Strong (ScrollTrigger plugin) |
| SVG drawing | Built in, famous | Supported via DrawSVG plugin |
| Plugin ecosystem | Small | Large and mature |
| License | Free, MIT | Free core; ScrollTrigger free too |
| React integration | Manual, no special hooks | Manual, no special hooks |
| Timeline API | `createTimeline()` | `gsap.timeline()` |
| Learning curve | Gentle | Moderate |
| Best for | Small effects, SVG, stagger | Long scroll-driven sequences |

Anime.js is small and easy for self-contained effects. GSAP wins for big, complex, scroll-driven sequences and its wide plugin set.

!!! tip
    Reach for Anime.js when you want a tiny library for one self-contained effect, like an SVG draw or a stagger. Reach for GSAP when you have big scroll-driven work with many synced parts.

### Try this

Make a row of five boxes with the same class, like `.card`. Install Anime.js and write one `animate` call that fades them in from `opacity: 0` to `1` and slides them up with `translateY: [40, 0]`. Use `delay: stagger(100)` so they come in one after another. Change the `100` to a bigger number and see the wave slow down.

??? note urdu "اردو میں مزید وضاحت"
    Anime.js ایک چھوٹی اور ہلکی لائبریری ہے۔ جب آپ کو کوئی ایک سادہ یا خود مکمل اثر چاہیے، جیسے SVG لائن کھینچنا یا کارڈز کو ایک ایک کر کے دکھانا، تو Anime.js بہترین ہے۔ اس کے مقابلے میں GSAP بڑے اور پیچیدہ کام کے لیے بہتر ہے، خاص طور پر جب اسکرول کے ساتھ بہت سی چیزیں ایک ساتھ چلانی ہوں۔ `createTimeline` سے آپ ایک ترتیب بناتے ہیں جس میں ہر مرحلہ پچھلے کے بعد چلتا ہے۔ `stagger` چھوٹی چھوٹی تاخیر ڈالتا ہے تاکہ عناصر ایک کے بعد ایک آئیں۔ آسان اصول یہ ہے کہ چھوٹے کام کے لیے Anime.js اور بڑے کام کے لیے GSAP چنیں۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. How do you install Anime.js v4, and how do you import `animate`?
2. What three things does a basic `animate` call need to get started?
3. Which property do you animate to draw an SVG line, and what value does it move toward?
4. When should you pick GSAP over Anime.js?

---

## What's next

You now have three animation tools in your belt. Next you will go back to smooth scrolling and study Lenis in depth. You will see how to tune it and pair it with your animations.

[Next lesson: 15.3 Lenis deep dive &rarr;](16-3-lenis-deep.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Anime.js docs](https://animejs.com/documentation/)
- [Anime.js GitHub](https://github.com/juliangarnier/anime)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Anime.js]: A small, free JavaScript animation library, current version v4. (Roman Urdu: chhoti animation library)
*[declarative animation]: A style where you state the end result and the library fills the frames. (Roman Urdu: aap natija batate hain, library kaam karti hai)
*[strokeDashoffset]: An SVG property you animate to make a line draw itself. (Roman Urdu: SVG line kheechne wali property)
*[stagger]: A small delay added between elements so they animate one after another. (Roman Urdu: thori thori der se ek ke baad ek)
*[SVG path]: A shape or line in an SVG defined by a `d` attribute. (Roman Urdu: SVG ki line ya shakal)
