---
lesson_id: frontend.ch16.l04
title: "16.4 Choosing the right tool"
chapter: 16
order: 4
estimated_minutes: 35
prerequisites:
  - frontend.ch16.l03
---

# 16.4 Choosing the right tool

You now know CSS transitions, GSAP, Framer Motion, Anime.js, and Lenis. That is a full toolbox. The hard part is no longer "how" to animate. The hard part is knowing which tool to reach for, and when to stop.

## What you'll know by the end

- Which animation tool fits which job, and why
- Why you should pick the smallest tool that does the work
- Why animating transform and opacity is cheap, and other things are not
- How to respect users who ask for less motion
- The common animation mistakes that drive people away
- How to combine two libraries cleanly without a mess

---

## Start with the cheapest tool

Every tool you learned has a cost. CSS ships with the browser. GSAP, Framer Motion, and Anime.js are extra code your user must download. So you start at the bottom and only move up when you need to.

Here is the simple ladder.

- Plain CSS transitions and animations for hovers, color changes, and small state changes. This is the cheapest. Use it first.
- Framer Motion when you animate React components, and you need things to animate as they mount and unmount.
- GSAP when you need complex timelines or scroll-driven sequences with many steps.
- Anime.js for small self-contained effects and SVG drawing.
- Lenis for smooth scroll, and nothing else.

The rule is short. Pick the smallest tool that does the job.

A hover that changes color does not need GSAP. A fade-in does not need a 50 kilobyte library. Reach for plain CSS first, and you keep your page light.

---

## The full library comparison

| Tool | Bundle size | React fit | Scroll | Learning curve | Best for |
| --- | --- | --- | --- | --- | --- |
| CSS transitions | 0 KB, built in | Any framework | No | Low | Hovers, color, state changes |
| CSS keyframes | 0 KB, built in | Any framework | No | Low | Spinners, looping, pulse |
| Framer Motion | ~50 KB | React only | Via `useScroll` | Low to medium | Mount/unmount reveals, gesture |
| GSAP | ~60 KB core | Any framework | Excellent (ScrollTrigger) | Medium | Long timelines, scroll sequences |
| Anime.js | ~17 KB | Any framework | Basic | Low | SVG draw, stagger, small effects |
| Lenis | ~10 KB | Any framework | Smooth scroll only | Low | One job: smooth scroll |

Read this table top to bottom. The zero-cost tools sit at the top. Only go lower when the job truly needs it.

---

## How to pick: a decision flowchart

The diagram below walks you through a series of questions and lands you at the right tool for the job.

<figure markdown>
<svg viewBox="0 0 700 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-decision-title" style="max-width:100%;height:auto">
  <title id="svg-decision-title">Decision flowchart for choosing an animation tool. Start at the top: Is it a simple hover or state change? Yes goes to CSS. No: Is it React mount or unmount? Yes goes to Framer Motion. No: Is it a big scroll-driven sequence? Yes goes to GSAP. No: Is it SVG drawing or stagger? Yes goes to Anime.js. No: Is it smooth scroll? Yes goes to Lenis. Otherwise go back and reconsider.</title>
  <defs>
    <marker id="arr-dec" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="250" y="10" width="200" height="44" rx="8"/>
    <rect x="230" y="90" width="240" height="44" rx="22"/>
    <rect x="230" y="170" width="240" height="44" rx="22"/>
    <rect x="230" y="250" width="240" height="44" rx="22"/>
    <rect x="230" y="330" width="240" height="44" rx="22"/>
    <rect x="230" y="410" width="240" height="44" rx="22"/>
    <rect x="10" y="90" width="130" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="560" y="90" width="120" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="560" y="170" width="120" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="560" y="250" width="120" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="560" y="330" width="120" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="560" y="410" width="120" height="44" rx="8" fill="#f4f4f1"/>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-dec)">
    <line x1="350" y1="54" x2="350" y2="88"/>
    <line x1="350" y1="134" x2="350" y2="168"/>
    <line x1="350" y1="214" x2="350" y2="248"/>
    <line x1="350" y1="294" x2="350" y2="328"/>
    <line x1="350" y1="374" x2="350" y2="408"/>
    <line x1="230" y1="112" x2="142" y2="112"/>
    <line x1="470" y1="112" x2="558" y2="112"/>
    <line x1="470" y1="192" x2="558" y2="192"/>
    <line x1="470" y1="272" x2="558" y2="272"/>
    <line x1="470" y1="352" x2="558" y2="352"/>
    <line x1="470" y1="432" x2="558" y2="432"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="700" fill="#1f1f1c">
      <text x="350" y="37">What do you need?</text>
    </g>
    <g font-size="12" fill="#1f1f1c">
      <text x="350" y="108">Hover or simple state change?</text>
      <text x="350" y="188">React mount or unmount?</text>
      <text x="350" y="268">Big scroll-driven sequence?</text>
      <text x="350" y="348">SVG draw or stagger effect?</text>
      <text x="350" y="428">Smooth scroll on a page?</text>
    </g>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="10" y="90" width="130" height="44" rx="8"/>
    <rect x="560" y="90" width="120" height="44" rx="8"/>
    <rect x="560" y="170" width="120" height="44" rx="8"/>
    <rect x="560" y="250" width="120" height="44" rx="8"/>
    <rect x="560" y="330" width="120" height="44" rx="8"/>
    <rect x="560" y="410" width="120" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="12" font-weight="700" fill="#1f1f1c">
    <text x="75" y="116">CSS</text>
    <text x="620" y="116">Framer Motion</text>
    <text x="620" y="196">GSAP</text>
    <text x="620" y="276">Anime.js</text>
    <text x="620" y="356">Lenis</text>
    <text x="620" y="432">Reconsider</text>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="11" fill="#6b6b65">
    <text x="75" y="129">transitions</text>
    <text x="620" y="129">or keyframes</text>
    <text x="620" y="446">or plain CSS</text>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="10" font-weight="700" fill="#6b6b65">
    <text x="185" y="104">Yes</text>
    <text x="505" y="104">Yes</text>
    <text x="505" y="184">Yes</text>
    <text x="505" y="264">Yes</text>
    <text x="505" y="344">Yes</text>
    <text x="505" y="424">Yes</text>
    <text x="365" y="154">No</text>
    <text x="365" y="234">No</text>
    <text x="365" y="314">No</text>
    <text x="365" y="394">No</text>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="11" fill="#6b6b65">
    <text x="350" y="500">At each question, Yes exits to a tool. No drops to the next question.</text>
  </g>
</svg>
<figcaption>Work down the questions. The first Yes gives you the right tool. If nothing matches, you probably need plain CSS or a rethink of the approach.</figcaption>
</figure>

---

## The performance cost of animation

Not all animation costs the same. Some properties are cheap to animate. Some are slow and make the page stutter, especially on a cheap phone.

The browser draws your page in stages. When you change something, it may have to redo some of those stages. The two cheap ones to animate are `transform` and `opacity`. The browser hands these to the GPU (Roman Urdu: graphics card jo visual kaam sambhalta hai), and the GPU is built for exactly this work.

These are cheap:

```css
.card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  opacity: 0.95;
}
```

These look fine but are expensive:

```css
/* Avoid animating these. */
.bad {
  transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s, box-shadow 0.3s;
}
```

Animating `width`, `height`, `top`, `left`, or `box-shadow` forces the browser to lay out the page again, then paint it again, every single frame. That is a lot of work many times per second. On a slow phone the animation drops frames and looks choppy.

So the swap is easy. Need to move a box? Use `transform: translate` instead of `top` and `left`. Need to resize it? Use `transform: scale` instead of `width` and `height`. You get the same look, and the GPU does the heavy lifting.

The table below shows the exact substitutions.

| What you want to do | Expensive way | Cheap way |
| --- | --- | --- |
| Move horizontally | `left: 200px` | `transform: translateX(200px)` |
| Move vertically | `top: 100px` | `transform: translateY(100px)` |
| Resize | `width: 200px; height: 200px` | `transform: scale(1.5)` |
| Show or hide | `display: none / block` | `opacity: 0 / 1` with pointer-events |
| Shadow grow on hover | `box-shadow: 0 10px 30px` animated | Fade `opacity` of a pseudo-element shadow |

!!! tip
    Animate `transform` and `opacity`, not `width` or `top`. The GPU handles transform and opacity, so the page stays smooth. The other properties force layout and paint on every frame, and that is where stutter comes from.

---

## Respect "prefers reduced motion"

Some people feel sick from motion on screen. Spinning, sliding, and parallax can give them headaches or dizziness. Their device has a setting for this. Your job is to listen to it.

The setting is `prefers-reduced-motion`. When a user turns it on, you must give them a calm version of your page. You do not strip every animation to nothing. You give a gentle path. A fade is fine. A big slide or a spin is not.

Here is the discipline.

```css
.reveal {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: opacity 0.2s ease;
    transform: none;
  }
}
```

In JavaScript you can check it too, before you start a GSAP or Anime.js animation.

```jsx
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce) {
  // play the full animation
} else {
  // jump straight to the final state
}
```

Three rules to live by.

1. Always provide a reduced-motion path. Do not skip it.
2. Test it. Turn the setting on in Windows and watch your own page.
3. Never trap a motion-sensitive user in a moving page. That is not acceptable.

This is not extra credit. It is part of building a page that works for everyone.

---

## Common animation anti-patterns

You have seen flashy agency portfolio sites. Many of them feel impressive for ten seconds and annoying after that. Here are the traps to avoid.

- Scroll-jacking. You scroll, and the site fights you. It hijacks your scroll and forces its own pace. Users hate losing control.
- Animations that delay content. The text fades in slowly while the reader waits. People came for the content, not the show.
- Autoplay that distracts. A video or loop that moves forever in the corner pulls the eye away from the words.
- Motion with no purpose. Things that wiggle and float for no reason. If the motion does not help the user, cut it.

The test is simple. Ask what each animation is for. If the answer is "it looks cool," that is not a good enough reason on its own.

!!! warning
    Scroll-jacking and motion with no purpose drive users away, especially on slow phones. A page that fights the scroll or never sits still feels broken, even when it is "working." When in doubt, do less.

---

## A worked example: combine two libraries cleanly

You rarely need many libraries on one page. Two is often plenty. Here is a clean pairing. Use Lenis for smooth scroll, and Framer Motion for component reveals. Each tool does one job and stays in its lane.

```jsx
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { motion } from "framer-motion";

// 1. Lenis handles the smooth scroll, page wide.
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

// 2. Framer Motion handles the reveal of one section.
function Section({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
```

Notice the split. Lenis owns the scroll feel. Framer Motion owns how a section appears. They never touch the same thing, so they never fight. The reveal uses `opacity` and `y`, which maps to `transform`, so it stays cheap.

You could also pair GSAP ScrollTrigger for one big scroll sequence and let plain CSS handle every hover and button. Same idea. One tool for the hard part, CSS for the rest. Keep it tasteful, and keep it simple.

!!! note "A note on wasatiyyah"
    Animation is salt, not the meal. A little brings a page to life. Too much hides
    the content and tires the eye. Wasatiyyah, the middle path, is the mark of a
    mature developer. Add motion with a clear purpose, test it on a slow phone, and
    always give a calm path to anyone who asks for less motion. Restraint is skill.

### Try this

Look at one page you have already built and list every animation on it. For each one, ask what it is for. If the answer is only "it looks cool", remove it or trade it for plain CSS. Then add a `prefers-reduced-motion` block so a motion-sensitive user gets a calm version.

??? note urdu "اردو میں مزید وضاحت"
    سب سے ضروری اصول یہ ہے کہ ہمیشہ سب سے چھوٹا ٹول چنیں جو کام کر دے۔ اگر سادہ CSS سے رنگ یا ہوور کی تبدیلی ہو سکتی ہے، تو GSAP جیسی بڑی لائبریری مت لائیں۔ ہر اضافی لائبریری صارف کے لیے زیادہ ڈاؤن لوڈ اور سست صفحہ بناتی ہے۔ اسی طرح اینیمیشن میں transform اور opacity سستے ہوتے ہیں کیونکہ انہیں GPU سنبھالتا ہے۔ width یا top کو حرکت دینا مہنگا ہے کیونکہ براؤزر کو ہر فریم پر صفحہ دوبارہ بنانا پڑتا ہے۔ اوپر دیا گیا فیصلے کا نقشہ آپ کو ہر صورتحال میں صحیح ٹول تک پہنچانے میں مدد کرتا ہے۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. You need a simple hover that changes a button's color. Which tool do you reach for first, and why?
2. Why is animating `transform` and `opacity` cheaper than animating `width` and `top`?
3. A user has "prefers reduced motion" turned on. What should your page do for them?
4. Name two animation anti-patterns you saw in this lesson, and say why each one bothers users.

---

## What's next

That wraps up Chapter 16. You can now animate with taste and restraint, pick the right tool for the job, and keep your pages smooth and kind to every user. The next chapter steps into a new dimension. You move from flat motion into 3D on the web with Three.js.

[Next chapter: 17. 3D on the web with Three.js &rarr;](../chapter-17-three-js-and-r3f/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Animations guide](https://web.dev/articles/animations-guide)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[transform]: A CSS property that moves, scales, or rotates an element cheaply using the GPU. (Roman Urdu: element ko sasta hila ya bara karne wali CSS property)
*[opacity]: A CSS property that sets how see-through an element is, from 0 to 1, and is cheap to animate. (Roman Urdu: element kitna shaffaf hai, isay set karti hai)
*[repaint]: When the browser draws pixels again after a visual change, which costs time. (Roman Urdu: jab browser ko screen dobara banani parti hai, ye waqt khata hai aur har frame ho to page slow lagta hai)
*[scroll-jacking]: When a site takes over scrolling and forces its own pace, so the user loses control. (Roman Urdu: site ka scroll par qabza kar lena)
*[animation budget]: The small limit of motion a page should use before it feels heavy or slow. (Roman Urdu: ek page par jaayaz haraka ki hadd)
