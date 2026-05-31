---
lesson_id: frontend.ch16.l01
title: "16.1 Framer Motion"
chapter: 16
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch15.l04
---

# 16.1 Framer Motion

You learned GSAP in Chapter 12. GSAP is powerful, but it works outside React in its own way. Framer Motion is built for React from the start. You animate things with simple props, and React handles the rest.

## What you'll know by the end

- What Framer Motion is and how to install it
- How to use `motion` components like `motion.div`
- How `initial`, `animate`, and `exit` set the start, end, and leaving states
- How the `transition` prop controls duration, ease, and spring type
- How `whileHover` and `whileTap` animate buttons on hover and press
- How `AnimatePresence` and the `layout` prop handle mount, unmount, and layout changes

---

## What Framer Motion is

Framer Motion is an animation library made for React. The team now calls it "motion". You write animations as props on special components. You do not need refs or selectors.

It compares lightly with GSAP. GSAP is imperative and works with any framework. You tell it step by step what to do. Framer Motion is declarative and React-first. You describe the state you want, and it moves there.

The table below shows the key difference in mindset.

| Approach | Style | How you write it | Works with |
| --- | --- | --- | --- |
| GSAP | Imperative (Roman Urdu: step by step) | `gsap.to(".box", { x: 100 })` | Any framework |
| Framer Motion | Declarative (Roman Urdu: state batao, baki khud) | `<motion.div animate={{ x: 100 }}>` | React only |
| CSS transitions | Declarative | `transition: transform 0.3s` | Any framework |

```bash
npm install framer-motion
```

Run this inside your React or Next.js project folder. After it installs, you can import from `framer-motion`.

---

## The motion component

A `motion.div` is a normal `div` that you can animate. Framer Motion gives you a `motion` version of every HTML tag. So you also get `motion.button`, `motion.span`, and more.

```jsx
import { motion } from "framer-motion";

function Box() {
  return <motion.div className="box">Hello</motion.div>;
}
```

This renders like a plain `div` for now. The magic starts when you add animation props. Those props are next.

The diagram below shows all the props that live on a single `motion.div` and what each one controls.

<figure markdown>
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-motiondiv-title" style="max-width:100%;height:auto">
  <title id="svg-motiondiv-title">Anatomy of a motion.div: the central element has six props pointing outward: initial (start state), animate (target state), exit (leave state), transition (speed and curve), whileHover and whileTap (gesture states), and variants (named state objects).</title>
  <g stroke="#6b6b65" stroke-width="1.5" fill="none">
    <line x1="360" y1="160" x2="180" y2="80"/>
    <line x1="360" y1="160" x2="540" y2="80"/>
    <line x1="360" y1="200" x2="120" y2="200"/>
    <line x1="360" y1="200" x2="600" y2="200"/>
    <line x1="360" y1="240" x2="180" y2="320"/>
    <line x1="360" y1="240" x2="540" y2="320"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="270" y="155" width="180" height="50" rx="8"/>
    <rect x="80" y="55" width="180" height="50" rx="8"/>
    <rect x="460" y="55" width="180" height="50" rx="8"/>
    <rect x="20" y="170" width="180" height="50" rx="8"/>
    <rect x="500" y="170" width="180" height="50" rx="8"/>
    <rect x="80" y="295" width="180" height="50" rx="8"/>
    <rect x="460" y="295" width="180" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="360" y="186">motion.div</text>
    </g>
    <g font-size="12" font-weight="600" fill="#1f1f1c">
      <text x="170" y="78">initial</text>
      <text x="550" y="78">animate</text>
      <text x="110" y="193">exit</text>
      <text x="590" y="193">transition</text>
      <text x="170" y="318">whileHover / whileTap</text>
      <text x="550" y="318">variants</text>
    </g>
    <g font-size="11" fill="#6b6b65">
      <text x="170" y="93">start state</text>
      <text x="550" y="93">target state</text>
      <text x="110" y="208">leave state</text>
      <text x="590" y="208">speed + curve</text>
      <text x="170" y="333">gesture states</text>
      <text x="550" y="333">named states</text>
    </g>
  </g>
</svg>
<figcaption>All six key props on one motion.div. initial and animate define the journey. exit handles the goodbye. transition controls the timing. whileHover and whileTap respond to gestures. variants let you name states and reuse them.</figcaption>
</figure>

!!! tip
    Framer Motion suits React because you animate with props. No refs and no selectors needed. You think in states, not in steps.

---

## initial, animate, and exit

These three props describe the states of your element.

- `initial` is the start state, before the element appears.
- `animate` is the end state you want it to reach.
- `exit` is the state when the element leaves the screen.

```jsx
import { motion } from "framer-motion";

function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      I fade in and slide up.
    </motion.div>
  );
}
```

The box starts invisible and 20 pixels down. Framer Motion animates it to full opacity at its normal spot. You only describe both states. You do not write the steps between them.

---

## The transition prop

The `transition` prop controls how the change happens. You set the `duration` in seconds, the `ease` curve, and the `type`. A `type` of `"spring"` gives a natural bouncy feel.

```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", duration: 0.6, ease: "easeOut" }}
>
  Pop in
</motion.div>
```

Here the box grows from nothing to full size. The spring type makes it feel alive. Try changing `duration` to see fast and slow versions.

The table below covers the most useful `transition` keys.

| Key | Type | What it does | Example value |
| --- | --- | --- | --- |
| `type` | string | `"tween"` for eased, `"spring"` for bouncy | `"spring"` |
| `duration` | number | length of the animation in seconds | `0.5` |
| `ease` | string or array | speed curve for tween | `"easeOut"` |
| `delay` | number | wait before starting, in seconds | `0.2` |
| `stiffness` | number | spring stiffness (higher = snappier) | `200` |
| `damping` | number | spring resistance (higher = less bounce) | `20` |
| `repeat` | number | how many times to repeat; `Infinity` loops | `Infinity` |
| `repeatType` | string | `"loop"`, `"reverse"`, or `"mirror"` | `"reverse"` |

---

## whileHover and whileTap

These gesture props animate based on user action. `whileHover` runs while the mouse sits over the element. `whileTap` runs while the user presses it down. They work great for buttons.

```jsx
import { motion } from "framer-motion";

function FancyButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click me
    </motion.button>
  );
}
```

The button grows a little on hover. It shrinks a little on press. Framer Motion returns it to normal when the action ends. You did not write any of that return logic.

---

## AnimatePresence

`AnimatePresence` lets a component play an exit animation when it leaves. Normally React removes an element at once, so `exit` never runs. You wrap the conditional element in `AnimatePresence` to fix that.

The diagram below shows the three stages of life: enter, stay, and exit.

<figure markdown>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-animatepresence-title" style="max-width:100%;height:auto">
  <title id="svg-animatepresence-title">Three stages inside AnimatePresence: a box fades in using initial and animate, then it stays visible, then it fades out using exit before React removes it from the DOM.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="80" width="180" height="60" rx="8" stroke-dasharray="6 4"/>
    <rect x="260" y="80" width="180" height="60" rx="8"/>
    <rect x="500" y="80" width="180" height="60" rx="8" stroke-dasharray="6 4"/>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="11" text-anchor="middle">
    <rect x="20" y="80" width="180" height="60" rx="8" fill="#f4f4f1" stroke="none"/>
    <rect x="500" y="80" width="180" height="60" rx="8" fill="#f4f4f1" stroke="none"/>
  </g>
  <defs>
    <marker id="arr-ap" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-ap)">
    <line x1="202" y1="110" x2="258" y2="110"/>
    <line x1="442" y1="110" x2="498" y2="110"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="600" fill="#1f1f1c">
      <text x="110" y="107">1. Enter</text>
      <text x="350" y="107">2. Stay</text>
      <text x="590" y="107">3. Exit</text>
    </g>
    <g font-size="11" fill="#6b6b65">
      <text x="110" y="124">initial to animate</text>
      <text x="350" y="124">animate state</text>
      <text x="590" y="124">animate to exit</text>
      <text x="110" y="140">opacity: 0 to 1</text>
      <text x="350" y="140">visible, interactive</text>
      <text x="590" y="140">opacity: 1 to 0</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="350" y="180">React only removes the element after exit finishes.</text>
      <text x="350" y="197">Without AnimatePresence, exit never runs.</text>
    </g>
  </g>
</svg>
<figcaption>AnimatePresence holds the element in the DOM while exit plays. When exit finishes, React finally removes it. Without the wrapper, the element vanishes the moment React sets the condition to false.</figcaption>
</figure>

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            I can fade out before I leave.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

When `open` becomes false, the box fades out first. Then React removes it. Without `AnimatePresence`, it would just vanish.

!!! warning
    `AnimatePresence` only plays an exit animation if the element is its direct child. The element also needs a unique `key`. Forget the key, and the exit animation will not run.

??? note urdu "اردو میں مزید وضاحت"
    فریمر موشن میں ہر اینیمیشن کی تین حالتیں ہوتی ہیں۔ `initial` شروع کی حالت ہے، یعنی عنصر آنے سے پہلے کیسا دکھتا ہے۔ `animate` آخری حالت ہے جہاں وہ پہنچتا ہے۔ `exit` وہ حالت ہے جب عنصر اسکرین سے جا رہا ہوتا ہے۔ آپ صرف حالتیں بتاتے ہیں اور باقی کام فریمر موشن خود کرتا ہے۔ `transition` پراپ یہ طے کرتا ہے کہ تبدیلی کتنی تیز یا آہستہ ہو۔ `type: "spring"` ایک قدرتی اچھلتا احساس دیتا ہے۔ یاد رکھیں کہ `exit` تب ہی چلتا ہے جب آپ عنصر کو `AnimatePresence` کے اندر رکھیں اور اسے ایک منفرد `key` دیں۔

---

## Layout animations

The `layout` prop animates size and position changes by itself. When the layout shifts, the element slides smoothly to its new spot. You just add one prop.

```jsx
<motion.div layout className="card">
  This moves smoothly when the layout changes.
</motion.div>
```

Say a list reorders or a box grows. Without `layout`, the element jumps. With `layout`, it glides to the new place. This saves you a lot of manual work.

The table below is a quick reference for deciding which prop to reach for in common situations.

| Situation | Prop to use | Notes |
| --- | --- | --- |
| Fade in on mount | `initial` + `animate` | Start at `opacity: 0` |
| Slide in from below | `initial={{ y: 40 }}` + `animate={{ y: 0 }}` | Pair with `opacity` for polish |
| Animate on hover | `whileHover` | Returns to normal on mouse out |
| Animate on press | `whileTap` | Returns to normal on mouse up |
| Fade out on unmount | `exit` inside `AnimatePresence` | Needs a `key` on the element |
| Smooth layout shift | `layout` | Works on resize, reorder, expand |
| Shared element between pages | `layoutId` | Two elements share one animation |

---

### Try this

Install Framer Motion in a React project and make one `motion.button`. Give it `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.9 }}`, then add a `transition` with `type: "spring"`. Hover and press it, and watch how it grows and shrinks on its own.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between the `initial` prop and the `animate` prop?
2. Which prop animates an element while you press it down?
3. Why do you need `AnimatePresence` for an `exit` animation to run?
4. What does the `layout` prop do for you automatically?

---

## What's next

You now animate React with simple, declarative props. Next you meet Anime.js, a lighter library that works with plain JavaScript too. It gives you fine control over timelines and many element types.

[Next lesson: 15.2 Anime.js &rarr;](16-2-anime-js.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Motion (Framer Motion) docs](https://motion.dev/docs/react-quick-start)
- [Motion Animation guide](https://motion.dev/docs/react-animation)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Framer Motion]: An animation library made for React, now called motion. (Roman Urdu: React ke liye banayi gayi animation library)
*[motion component]: A normal HTML tag that you can animate with props, like motion.div. (Roman Urdu: aisa tag jise props se animate kar sakte ho)
*[AnimatePresence]: A wrapper that lets a component play an exit animation before it unmounts. (Roman Urdu: jane se pehle exit animation chalane wala wrapper)
*[whileHover]: A gesture prop that animates an element while the mouse sits over it. (Roman Urdu: hover ke dauran animate karne wala prop)
*[layout animation]: An animation that moves size and position changes by itself using the layout prop. (Roman Urdu: size aur position khud se animate karna)
