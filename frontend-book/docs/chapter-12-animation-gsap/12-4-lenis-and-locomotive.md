---
lesson_id: frontend.ch12.l04
title: "12.4 Smooth scroll with Lenis"
chapter: 12
order: 4
estimated_minutes: 35
prerequisites:
  - frontend.ch12.l03
---

# 12.4 Smooth scroll with Lenis

Open a polished agency site and the page seems to glide as you scroll. That gentle
motion is smooth scroll. It can make a site feel calm and premium. It can also
make some people feel sick. This lesson shows you how to add it with care.

## What you'll know by the end

- What smooth scroll is and why sites use it.
- The real accessibility concern, and why it must be optional.
- How to set up Lenis, the modern lightweight choice.
- What Locomotive Scroll is and when you still see it.
- How to connect Lenis with GSAP ScrollTrigger.
- How to respect a user who asks for less motion.

---

## What smooth scroll is

By default, a browser scrolls in small jumps. Each wheel turn moves the page a
fixed step. Smooth scroll changes that. The page eases toward the new position,
so movement feels like a glide.

Sites use it to feel modern and calm. A smooth page can make your animations from
11.2 feel connected to the scroll. It is a finishing touch, not a need.

Here is what makes native scroll different from a Lenis-smoothed scroll.

<figure markdown>
<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lenis-compare" style="max-width:100%;height:auto">
  <title id="svg-lenis-compare">Two side-by-side graphs. The left shows native scroll: a stepped staircase line that jumps at each wheel tick. The right shows Lenis smooth scroll: a smooth curved line that eases to the same final position.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <line x1="40" y1="220" x2="300" y2="220"/>
    <line x1="40" y1="220" x2="40" y2="30"/>
    <line x1="370" y1="220" x2="630" y2="220"/>
    <line x1="370" y1="220" x2="370" y2="30"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle" font-weight="600">
    <text x="170" y="20">Native scroll</text>
    <text x="500" y="20">Lenis smooth scroll</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="170" y="242">time</text>
    <text x="500" y="242">time</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <text x="8" y="224" transform="rotate(-90 8 140)">scroll position</text>
    <text x="338" y="224" transform="rotate(-90 338 140)">scroll position</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="2" fill="none">
    <polyline points="50,210 90,210 90,175 130,175 130,130 170,130 170,95 210,95 210,65 260,65"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="2" fill="none">
    <path d="M380,210 C430,210 450,100 580,65"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="170" y="266">Jumps at each wheel tick</text>
    <text x="500" y="266">Eases to target position</text>
  </g>
</svg>
<figcaption>Native scroll jumps in steps with each wheel tick. Lenis eases the page toward the target position, giving a continuous glide.</figcaption>
</figure>

---

## The accessibility concern

Smooth scroll is not free of cost. For some people it causes real harm. Motion can
trigger dizziness or motion sickness. It can also confuse screen readers and other
assistive tools that expect normal scrolling.

So smooth scroll must always be optional. You never force it on everyone. Later in
this lesson you will see how to turn it off for users who ask for less motion.

!!! warning
    Smooth scroll can cause motion sickness for some users. It can also fight
    assistive tools. Always respect `prefers-reduced-motion` and turn smooth scroll
    off when the user has asked for less motion.

---

## Setting up Lenis

Lenis (Roman Urdu: smooth scroll dene wali halki library) is a small, modern library for smooth scroll. It is light and works well on
most devices. Install it in your project.

```bash
npm install lenis
```

The older package name was `@studio-freight/lenis`. New projects use `lenis`.

Now create a Lenis instance and run its loop. Lenis needs to update on every frame.
You do that with `requestAnimationFrame` (Roman Urdu: har frame par chalne wala browser function), the browser function that runs code once
per frame.

```js
import Lenis from "lenis";

// Create the smooth scroll instance.
const lenis = new Lenis();

// This function runs once per frame.
function raf(time) {
  lenis.raf(time);        // let Lenis update the scroll
  requestAnimationFrame(raf); // ask for the next frame
}

// Start the loop.
requestAnimationFrame(raf);
```

The `raf` function calls `lenis.raf(time)` so Lenis can move the page a little. Then
it asks the browser for the next frame. This repeats about 60 times a second, which
makes the glide smooth.

---

## A note on Locomotive Scroll

You may see another name in older code, called Locomotive Scroll (Roman Urdu: purani aur bhaari smooth scroll library). It does the same
job as Lenis. It is older and heavier, and it changes how your page is laid out.

Many agency sites and award winning projects still use it. So it helps to know the
name when you read their code. For new work, Lenis is the lighter and simpler
choice. Reach for Locomotive only when a project already uses it.

Here is a quick comparison.

| Feature | Lenis | Locomotive Scroll |
| --- | --- | --- |
| Package size | Very small (~3 KB) | Larger (~30 KB) |
| Page layout | Uses native scroll position | Wraps content in custom containers |
| ScrollTrigger setup | Simple, one `lenis.on("scroll", ...)` line | More config needed |
| Maintenance | Actively maintained (2024) | Less active, many v2 breaking changes |
| When to use | New projects, React apps | When project already uses it |

---

## Connecting Lenis with ScrollTrigger

In 12.2 you used GSAP ScrollTrigger. When you add Lenis, ScrollTrigger needs to know
about the smooth scroll. Otherwise your scroll animations fire at the wrong spot.

You tell ScrollTrigger to update whenever Lenis scrolls. You also drive Lenis from
GSAP's ticker, so both run on the same clock.

```js
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

// Update ScrollTrigger every time Lenis scrolls.
lenis.on("scroll", ScrollTrigger.update);

// Drive Lenis from GSAP's own ticker for one shared clock.
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // GSAP gives seconds, Lenis wants milliseconds
});

gsap.ticker.lagSmoothing(0);
```

The `lenis.on("scroll", ScrollTrigger.update)` line keeps your triggers in sync. The
`gsap.ticker.add` part runs Lenis from GSAP's clock. Now your scroll animations line
up with the smooth motion.

!!! tip
    Test smooth scroll on a low-end Android phone, not just your laptop. It must
    still feel quick and responsive. If it lags or stutters, turn it off on small
    screens or drop it for that project.

---

## Respecting prefers-reduced-motion

Operating systems let people ask for less motion. The browser exposes that choice.
You check it with `matchMedia`, then skip smooth scroll and big animations.

```js
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion) {
  // Only set up Lenis when the user is fine with motion.
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
```

When `reduceMotion` is true, you do nothing. The page scrolls normally. The user
gets the calm experience they asked for. This one check shows real care for your
visitors.

Here is a decision table for what to do at each level of the `prefers-reduced-motion` signal.

| User setting | `reduceMotion` value | What to do |
| --- | --- | --- |
| No preference set (default) | `false` | Enable Lenis, enable all GSAP animations |
| Reduce motion requested | `true` | Skip Lenis entirely, skip large entrance animations |
| Reduce motion requested | `true` | Keep essential feedback animations (e.g. button press) |
| Reduce motion requested | `true` | Use `opacity` changes only, avoid `x`, `y`, `scale` motion |

The table shows that "reduce motion" does not mean zero animation. It means skip the parts that move elements around the screen. A subtle fade for a button state change is fine. A full hero section flying in from the left is not.

??? note urdu "اردو میں مزید وضاحت"
    لینس ایک چھوٹی سی لائبریری ہے جو صفحے کو نرمی سے اسکرول کرتی ہے۔ یہ `requestAnimationFrame` کے ذریعے ہر فریم پر کام کرتی ہے تاکہ اسکرول ہموار رہے۔ جب آپ لینس کو GSAP ScrollTrigger کے ساتھ استعمال کریں تو دونوں کو ایک گھڑی پر چلانا ضروری ہے۔ سب سے اہم بات یہ ہے کہ آپ کو `prefers-reduced-motion` کا احترام کرنا چاہیے۔ کچھ لوگوں کو حرکت سے چکر آتے ہیں، اس لیے اگر وہ کم حرکت مانگیں تو لینس بند کر دیں اور بڑی اینیمیشنز بھی نہ چلائیں۔

!!! note "A note on wasatiyyah"
    The best motion is moderate. Wasatiyyah, the middle path, applies to design too.
    Enough animation to delight, not so much that it tires or excludes people. When
    a user asks for less motion, honour that. Restraint is a sign of skill.

---

### Try this

In a page that is tall enough to scroll, install `lenis` and set up a Lenis instance with the `requestAnimationFrame` loop shown above. Scroll and feel the glide. Then wrap the whole setup in a `prefers-reduced-motion` check using `window.matchMedia`, so Lenis only runs when the user is fine with motion. Turn on the reduce-motion setting in your operating system and reload to confirm the page goes back to normal scrolling.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does smooth scroll change about the way a page scrolls?
2. Why must smooth scroll always be optional?
3. What job does `requestAnimationFrame` do in a Lenis setup?
4. How do you check whether a user has asked for less motion?

---

## What's next

Chapter 12 is done. You can animate with GSAP, drive it from the scroll, use it
cleanly in React, and add smooth scroll without harming anyone. The next chapter is
the big one. You will build a full ecommerce store from start to finish.

[Next chapter: 13. The ecommerce capstone &rarr;](../chapter-13-ecommerce-capstone/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Lenis on GitHub](https://github.com/darkroomengineering/lenis)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[smooth scroll]: A scroll style where the page glides to its new spot instead of jumping. (Roman Urdu: aisa scroll jo jump ke bajaye narmi se chalta hai)
*[Lenis]: A small modern library that adds smooth scroll to a page. (Roman Urdu: smooth scroll dene wali halki library)
*[Locomotive Scroll]: An older, heavier smooth-scroll library still seen in agency work. (Roman Urdu: purani aur bhaari smooth scroll library)
*[requestAnimationFrame]: A browser function that runs your code once per frame, about 60 times a second. (Roman Urdu: har frame par chalne wala browser function)
*[prefers-reduced-motion]: A user setting that asks sites to use less motion. (Roman Urdu: user ki setting jo kam motion mangti hai)
