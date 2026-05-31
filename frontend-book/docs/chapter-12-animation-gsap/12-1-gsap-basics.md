---
lesson_id: frontend.ch12.l01
title: "12.1 GSAP basics"
chapter: 12
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch11.l04
---

# 12.1 GSAP basics

You already know how to build pages and make them work with React. Now you make them move. Animation guides the eye and makes a site feel alive. In this lesson you meet GSAP, a tool that makes smooth animation simple.

## What you'll know by the end

- What GSAP is and why people pick it over plain CSS for hard jobs.
- How to add GSAP using a CDN script or npm.
- How to use the three core tweens: `to`, `from`, and `fromTo`.
- The common values you animate, like `x`, `opacity`, and `scale`.
- What an ease is and how `stagger` spreads out many elements.
- How to sequence steps with a timeline.

---

## What GSAP is

GSAP stands for GreenSock Animation Platform (Roman Urdu: animation banane ki ek JavaScript library). It is a JavaScript library for animation. It moves, fades, scales, and rotates elements on a page. The motion is smooth and precise.

CSS animations are great for small things. A hover effect or a simple fade works fine in CSS. But complex work gets hard fast. You need many steps in order. You need to pause, reverse, or speed things up. You need the same result in every browser.

GSAP handles all of that. It gives you timelines for sequencing. It gives you fine control over timing and speed. It behaves the same across browsers. That is why so many sites use it.

Here is a comparison of CSS animation versus GSAP for common needs.

| Need | CSS animation | GSAP |
| --- | --- | --- |
| Simple hover fade | Fine | Works too, but CSS is simpler |
| Sequenced multi-step animation | Gets messy with `animation-delay` math | Clean with timelines |
| Scroll-driven animation | Needs new CSS Scroll-Driven API or hacky JS | Mature ScrollTrigger plugin |
| Pause, reverse, seek | Not possible in plain CSS | Built in |
| Stagger many elements | Manual delays | One `stagger` property |
| Cross-browser reliability | Needs prefixes and fallbacks | Handles it for you |

---

## How to add GSAP

For a plain HTML page, add a CDN script. Put this near the end of your `<body>`, before your own script.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="script.js"></script>
```

The first line loads GSAP. The second line loads your code. Order matters, so GSAP must load first.

For a React or Vite project, install it with npm instead.

```bash
npm install gsap
```

Then import it in your file.

```js
import { gsap } from "gsap";
```

After that, the `gsap` object is ready to use.

---

## The three core tweens

A tween (Roman Urdu: do halaton ke darmiyan ek animation) is one animation of one or more elements. GSAP gives you three ways to make one.

```js
// Animate TO these values
gsap.to(".box", { x: 200, duration: 1 });

// Animate FROM these values to the current ones
gsap.from(".box", { x: -200, duration: 1 });

// Set both ends yourself
gsap.fromTo(".box", { x: -200 }, { x: 200, duration: 1 });
```

`gsap.to(target, vars)` moves the element to the values you give. The box slides until its `x` is 200.

`gsap.from(target, vars)` starts at the values you give and ends at the current ones. The box starts 200 pixels left, then settles in place. This is great for entrances.

`gsap.fromTo(target, fromVars, toVars)` lets you set the start and the end. You control both sides.

The target can be a CSS selector string like `".box"`. It can also be a real element from `document.querySelector`.

Here is a table of all three side by side.

| Method | What you give | Where it starts | Where it ends | Best for |
| --- | --- | --- | --- | --- |
| `gsap.to` | end values | current state | your values | most tweens |
| `gsap.from` | start values | your values | current state | entrance effects |
| `gsap.fromTo` | start and end values | fromVars | toVars | when you need both sides explicit |

Now look at what lives inside a tween. Each tween has four key parts: a target, properties to animate, a duration, and an ease.

<figure markdown>
<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-tween-anatomy" style="max-width:100%;height:auto">
  <title id="svg-tween-anatomy">Anatomy of a GSAP tween showing four parts: target, properties, duration, and ease.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="40" width="620" height="80" rx="8"/>
    <rect x="30" y="150" width="130" height="50" rx="6"/>
    <rect x="185" y="150" width="190" height="50" rx="6"/>
    <rect x="395" y="150" width="110" height="50" rx="6"/>
    <rect x="525" y="150" width="115" height="50" rx="6"/>
  </g>
  <g font-family="Inter, monospace" font-size="14" fill="#1f1f1c">
    <text x="40" y="72">gsap.to(</text>
    <text x="120" y="72" font-weight="700" fill="#1f1f1c">".box"</text>
    <text x="175" y="72">,  {</text>
    <text x="210" y="72" font-weight="700" fill="#1f1f1c">x: 200, opacity: 0.5</text>
    <text x="430" y="72">,</text>
    <text x="450" y="72" font-weight="700" fill="#1f1f1c">duration: 1</text>
    <text x="565" y="72">,</text>
    <text x="585" y="72" font-weight="700" fill="#1f1f1c">ease:</text>
    <text x="40" y="100">    "power2.out" });</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="95" y="180">target</text>
    <text x="95" y="196">".box"</text>
    <text x="280" y="180">properties</text>
    <text x="280" y="196">x, opacity, ...</text>
    <text x="450" y="180">duration</text>
    <text x="450" y="196">seconds</text>
    <text x="582" y="180">ease</text>
    <text x="582" y="196">speed curve</text>
  </g>
  <defs>
    <marker id="bq-arrow-tween" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-tween)">
    <line x1="95" y1="148" x2="95" y2="122"/>
    <line x1="280" y1="148" x2="280" y2="122"/>
    <line x1="450" y1="148" x2="450" y2="122"/>
    <line x1="582" y1="148" x2="582" y2="122"/>
  </g>
</svg>
<figcaption>A tween has four parts: the target it animates, the properties to change, how long it takes (duration), and the ease that shapes the speed curve.</figcaption>
</figure>

!!! tip
    Use `gsap.to` most of the time. It is the simplest and covers most needs. Reach for `gsap.fromTo` only when you must control both the start and the end of the motion.

---

## The common values you animate

The second argument is an object of values, called vars. Here are the ones you use often.

```js
gsap.to(".box", {
  x: 100,         // move right 100px
  y: 50,          // move down 50px
  opacity: 0.5,   // half see-through
  scale: 1.2,     // 20% bigger
  rotation: 45,   // turn 45 degrees
  duration: 1,    // takes 1 second
  delay: 0.5      // wait 0.5s before it starts
});
```

`x` and `y` move the element. `opacity` controls how see-through it is. `scale` makes it bigger or smaller. `rotation` turns it in degrees. `duration` is how long it runs in seconds. `delay` waits before it starts.

GSAP uses `x` and `y` instead of CSS `translateX` and `translateY` because they go through the GPU and stay fast.

| Property | CSS equivalent | What it does | Example value |
| --- | --- | --- | --- |
| `x` | `translateX` | Moves left or right | `100` (pixels) |
| `y` | `translateY` | Moves up or down | `-50` (pixels) |
| `rotation` | `rotate` | Turns in degrees | `360` |
| `scale` | `scale` | Grows or shrinks | `1.5` |
| `scaleX` / `scaleY` | `scaleX` / `scaleY` | Stretches one axis | `2` |
| `opacity` | `opacity` | Controls transparency | `0` to `1` |
| `duration` | (not CSS) | How long in seconds | `0.6` |
| `delay` | (not CSS) | Wait before starting | `0.3` |
| `repeat` | (not CSS) | How many extra times | `2`, or `-1` for infinite |
| `yoyo` | (not CSS) | Reverse on each repeat | `true` |

---

## Eases and the speed curve

An ease (Roman Urdu: animation ki raftaar ka curve) is the speed curve of a tween. Real motion does not move at one flat speed. Things speed up and slow down. An ease copies that feel.

```js
gsap.to(".box", { x: 300, duration: 1, ease: "power2.out" });
gsap.to(".ball", { y: 200, duration: 1, ease: "back.out(1.7)" });
gsap.to(".bar", { width: 400, duration: 1, ease: "none" });
```

`power2.out` starts fast and slows down at the end. It feels natural for most entrances. `back.out(1.7)` goes a little past the target, then settles back. It gives a nice springy pop. `none` runs at one flat speed the whole time.

Here is a quick table of the most useful eases.

| Ease name | Feel | Good for |
| --- | --- | --- |
| `"none"` | Flat, constant speed | progress bars, mechanical motion |
| `"power1.out"` | Gentle deceleration | subtle fades |
| `"power2.out"` | Medium deceleration | most entrance animations |
| `"power4.out"` | Strong deceleration | fast snap-in titles |
| `"power2.in"` | Accelerates in | exit animations (things leaving) |
| `"back.out(1.7)"` | Overshoots then settles | buttons, playful UI pops |
| `"elastic.out(1, 0.3)"` | Bouncy spring | icons, character animation |
| `"bounce.out"` | Bounces at the end | ball, notification badge |

The suffix matters: `.in` accelerates, `.out` decelerates, `.inOut` does both.

---

## Stagger for many elements

Often you animate many elements at once. The `stagger` property (Roman Urdu: kai cheezon ke darmiyan thoda waqfa) offsets each one by a small gap. They start one after another, not all together.

```js
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2
});
```

This selects every element with the class `card`. Each card starts 0.2 seconds after the one before it. The result is a smooth cascade instead of one big jump.

---

## Timelines for sequencing

A timeline (Roman Urdu: tweens ko tartib se chalane wala container) holds many tweens in order. You create one with `gsap.timeline()`. Then you add tweens to it. By default they line up one after another. The second starts when the first ends.

```js
const tl = gsap.timeline();

tl.to(".box", { x: 200, duration: 1 });
tl.to(".box", { y: 100, duration: 1 });
tl.to(".box", { rotation: 360, duration: 1 });
```

The box moves right, then down, then spins. You did not set any delays. The timeline lines them up for you. This is much cleaner than guessing delays by hand.

Look at how three tweens sit in a timeline, one after another.

<figure markdown>
<svg viewBox="0 0 660 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-timeline-seq" style="max-width:100%;height:auto">
  <title id="svg-timeline-seq">Three tweens in a GSAP timeline shown as blocks on a horizontal time axis. Tween A runs from 0 to 1 second, Tween B from 1 to 2 seconds, and Tween C from 2 to 3 seconds.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <line x1="40" y1="130" x2="620" y2="130"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="60" y="60" width="160" height="56" rx="6"/>
    <rect x="240" y="60" width="160" height="56" rx="6"/>
    <rect x="420" y="60" width="160" height="56" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" fill="#1f1f1c" text-anchor="middle">
    <text x="140" y="88">Tween A</text>
    <text x="140" y="107">x: 200, 1s</text>
    <text x="320" y="88">Tween B</text>
    <text x="320" y="107">y: 100, 1s</text>
    <text x="500" y="88">Tween C</text>
    <text x="500" y="107">rotation: 360, 1s</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="60" y="150">0s</text>
    <text x="240" y="150">1s</text>
    <text x="420" y="150">2s</text>
    <text x="600" y="150">3s</text>
  </g>
  <g stroke="#6b6b65" stroke-width="1" stroke-dasharray="4 3">
    <line x1="60" y1="116" x2="60" y2="138"/>
    <line x1="240" y1="116" x2="240" y2="138"/>
    <line x1="420" y1="116" x2="420" y2="138"/>
    <line x1="600" y1="116" x2="600" y2="138"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="340" y="175">Each tween starts when the previous one ends. No manual delays needed.</text>
  </g>
</svg>
<figcaption>A GSAP timeline lines up tweens one after another. The second tween begins the moment the first ends, and the third begins when the second ends.</figcaption>
</figure>

You can also use position strings to overlap tweens. The `"-=0.3"` in the code below makes the next tween start 0.3 seconds early.

```js
const tl = gsap.timeline();

tl.from(".hero-title", { x: -100, opacity: 0, duration: 0.8, ease: "power2.out" });
tl.from(".hero-text",  { opacity: 0, duration: 0.6 }, "-=0.3");
tl.from(".hero-btn",   { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
```

| Position string | Meaning |
| --- | --- |
| (nothing, default) | Start right after the previous tween ends |
| `"+=0.5"` | Start 0.5s after the previous tween ends |
| `"-=0.3"` | Start 0.3s before the previous tween ends (overlap) |
| `"<"` | Start at the same time as the previous tween |
| `"<0.2"` | Start 0.2s after the previous tween started |
| `1.5` | Start at exactly 1.5s from the beginning of the timeline |

!!! note "Did you know"
    GSAP powers many award winning sites you have seen. It is free to use on your own projects. Big studios and small students reach for the same tool.

---

??? note urdu "اردو میں مزید وضاحت"
    GSAP میں تین بنیادی طریقے ہوتے ہیں۔ `to` عنصر کو موجودہ حالت سے آپ کی دی گئی قیمت تک لے جاتا ہے۔ `from` آپ کی دی گئی قیمت سے شروع ہو کر موجودہ حالت پر ختم ہوتا ہے، اور یہ داخلے کے لیے بہترین ہے۔ `fromTo` میں آپ خود شروع اور اختتام دونوں طے کرتے ہیں۔ ٹائم لائن تمام ٹوینز کو ترتیب سے چلاتی ہے بغیر دستی تاخیر کے۔ ease آپ کی اینیمیشن کی رفتار کا خم ہے، یعنی یہ طے کرتا ہے کہ حرکت کہاں تیز اور کہاں سست ہو۔

---

## Real world example: animate a hero on load

Here is a common job. When the page loads, the heading slides in from the left. The paragraph fades in. The button scales up. You sequence it all with a timeline.

First the HTML.

```html
<section class="hero">
  <h1 class="hero-title">Learn front-end the right way</h1>
  <p class="hero-text">Build real projects, step by step, at your own pace.</p>
  <button class="hero-btn">Start now</button>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="hero.js"></script>
</section>
```

This is a simple hero section. It has a heading, a paragraph, and a button. The two scripts load GSAP first, then your code.

Now the JS in `hero.js`.

```js
const tl = gsap.timeline();

tl.from(".hero-title", {
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
});

tl.from(".hero-text", {
  opacity: 0,
  duration: 0.6
}, "-=0.3");

tl.from(".hero-btn", {
  scale: 0,
  duration: 0.5,
  ease: "back.out(1.7)"
});
```

You make a timeline. The first tween slides the title in from the left while it fades. The second tween fades the paragraph in. The `"-=0.3"` makes it start 0.3 seconds early, so it overlaps a little and feels smooth. The last tween scales the button up from zero with a springy ease.

The whole hero now enters in a clean order. No manual delays to fight with.

### Try this

In a plain HTML page, add the GSAP CDN script and create three boxes with the class `box`. First animate one box with `gsap.to(".box", { x: 200, rotation: 360, duration: 1, ease: "power2.out" })` and watch it move and spin. Then make a timeline that moves the box right, then down, then back to the start, with no delays. As a last step, give all three boxes a `gsap.from` with `stagger: 0.2` so they slide in one after another.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between `gsap.to` and `gsap.from`?
2. What does an ease change about a tween?
3. What does the `stagger` property do to a group of elements?
4. By default, when does the second tween on a timeline start?

---

## What's next

You can now animate things when the page loads. But many effects should fire as the user scrolls down. In 12.2 you meet ScrollTrigger, the GSAP plugin that links animation to scroll position.

[Next lesson: 12.2 ScrollTrigger &rarr;](12-2-scrolltrigger.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [GSAP Getting Started](https://gsap.com/resources/get-started/)
- [GSAP Timeline docs](https://gsap.com/docs/v3/GSAP/Timeline/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[GSAP]: GreenSock Animation Platform, a JavaScript library for smooth animation. (Roman Urdu: animation banane ki JavaScript library)
*[tween]: One animation of one or more elements between two states. (Roman Urdu: do halaton ke darmiyan ek animation)
*[ease]: The speed curve of a tween, how it speeds up and slows down. (Roman Urdu: animation ki raftaar ka curve)
*[duration]: How long a tween runs, given in seconds. (Roman Urdu: animation kitni der chale, second mein)
*[stagger]: A small time gap added between many elements so they start one after another. (Roman Urdu: kai cheezon ke darmiyan thoda waqfa)
*[timeline]: A container that holds tweens and plays them in order. (Roman Urdu: tweens ko tartib se chalane wala container)
