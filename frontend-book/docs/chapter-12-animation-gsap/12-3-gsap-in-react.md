---
lesson_id: frontend.ch12.l03
title: "12.3 GSAP inside React"
chapter: 12
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch12.l02
---

# 12.3 GSAP inside React

You already know GSAP. You also know React. Putting them together feels easy, but React plays by its own rules. React owns the DOM and re-renders your components often. If you animate the wrong way, your animations stack up or break. This lesson shows you the safe way.

## What you'll know by the end

- Why animating in React needs more care than plain HTML.
- Why you target elements with refs, not `querySelector`.
- How to install and use the `useGSAP` hook.
- How to scope animations to one container with a ref.
- How to re-run an animation when React state changes.
- Why StrictMode breaks `gsap.from`, and how `gsap.fromTo` fixes it.

---

## Why React needs care

In plain HTML, the DOM sits still. You select an element and animate it. Simple.

React is different. React owns the DOM. It builds it, updates it, and removes it. Your component can re-render many times. Each render can run your code again.

This causes two problems. First, if you use `document.querySelector`, you might grab the wrong element. You could even grab an element from another component. Second, if you start a new animation on every render, the animations pile up. They never get cleaned away. This leaks memory and causes glitches.

So you need two things. Target elements safely with refs. And clean up your animations when the component leaves the screen.

---

## Install the GSAP React helper

GSAP gives you an official helper for React. It solves both problems for you. Install it next to GSAP.

```bash
npm install gsap @gsap/react
```

This adds the `@gsap/react` package. Inside it lives a hook called `useGSAP` (Roman Urdu: React ke liye GSAP ka khaas hook). You import it at the top of your component.

```jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
```

The `useGSAP` hook is the React-friendly way to run GSAP code. It runs your animation after React finishes rendering. It also cleans up every animation when the component unmounts. You write less code and avoid leaks.

---

## Target with refs, not querySelector

In React, you point at a DOM element using a ref (Roman Urdu: asli DOM element ka pata). You create the ref with `useRef`. Then you attach it to the element with the `ref` attribute.

```jsx
import { useRef } from "react";

function Box() {
  const boxRef = useRef(null);

  return <div ref={boxRef} className="box" />;
}
```

Now `boxRef.current` is the real DOM node. You can hand it straight to GSAP. You never need `querySelector`. This keeps your animation tied to your own component only.

!!! tip
    Always target elements with refs and a scope. Never use `document.querySelector` inside a React component. If two components have a `.box` element, `querySelector` might grab the wrong one. Refs and scope make sure you only touch your own elements.

---

## The useGSAP hook

Here is the shape of the hook. You pass it a function and an options object.

```jsx
useGSAP(() => {
  // your GSAP code goes here
}, { scope: containerRef });
```

The function holds your GSAP animations. The `scope` (Roman Urdu: jis dabbe ke andar selector kaam kare) option points to a container ref. Any selector text you use inside the function only looks inside that container. So `gsap.to(".item", ...)` finds `.item` elements inside your container and nowhere else.

The best part is cleanup. Every animation you create inside `useGSAP` gets remembered. When the component unmounts (Roman Urdu: jab component screen se hat jaye), the hook kills them all for you. No leaks. No stacking.

Here is the full lifecycle of `useGSAP` in a React component.

<figure markdown>
<svg viewBox="0 0 660 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-usegsap-lifecycle" style="max-width:100%;height:auto">
  <title id="svg-usegsap-lifecycle">Four-stage lifecycle of useGSAP: mount, animate, re-render or state change, then unmount with revert. Arrows connect the stages in order.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="100" width="130" height="60" rx="8"/>
    <rect x="200" y="100" width="130" height="60" rx="8"/>
    <rect x="380" y="100" width="130" height="60" rx="8"/>
    <rect x="560" y="100" width="80" height="60" rx="8" stroke-dasharray="5 3"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="85" y="126">1. Mount</text>
    <text x="85" y="144">React renders DOM</text>
    <text x="265" y="126">2. Animate</text>
    <text x="265" y="144">useGSAP runs</text>
    <text x="445" y="120">3. Re-render /</text>
    <text x="445" y="136">state change</text>
    <text x="445" y="152">Hook re-runs</text>
    <text x="600" y="126">4. Unmount</text>
    <text x="600" y="144">revert()</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="85" y="180">Component appears</text>
    <text x="265" y="180">Tweens created,</text>
    <text x="265" y="194">scoped to container</text>
    <text x="445" y="180">Old tweens killed,</text>
    <text x="445" y="194">new ones created</text>
    <text x="600" y="180">All tweens</text>
    <text x="600" y="194">cleaned up</text>
  </g>
  <defs>
    <marker id="bq-arrow-lc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-lc)">
    <line x1="152" y1="130" x2="198" y2="130"/>
    <line x1="332" y1="130" x2="378" y2="130"/>
    <line x1="512" y1="130" x2="558" y2="130"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="330" y="270">useGSAP handles cleanup at every stage. You never call gsap.killTweensOf() yourself.</text>
  </g>
</svg>
<figcaption>useGSAP runs after each render and cleans up before the next run or when the component unmounts. You write animations; the hook handles the lifecycle.</figcaption>
</figure>

---

## A full mount example

Let us animate a few boxes when the component first appears. We put a ref on the container. We use `fromTo` so the start and end values are clear.

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Cards() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="card">One</div>
      <div className="card">Two</div>
      <div className="card">Three</div>
    </div>
  );
}
```

The `scope` is `containerRef`. So `.card` only matches cards inside this container. The animation runs once after render. The `stagger` makes each card start a little later. When `Cards` unmounts, `useGSAP` cleans everything up.

---

## Re-run on a state change

Sometimes you want the animation to run again when state changes. You add that state to a dependency list. The hook takes an array of dependencies, just like other React hooks.

```jsx
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Pulse() {
  const boxRef = useRef(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      boxRef.current,
      { scale: 1 },
      { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1 }
    );
  }, { scope: boxRef, dependencies: [count] });

  return (
    <div>
      <div ref={boxRef} className="dot" />
      <button onClick={() => setCount(count + 1)}>Pulse</button>
    </div>
  );
}
```

Here `count` sits in the `dependencies` array. Every time you click the button, `count` changes. The hook sees the change and runs the animation again. The dot pulses on each click. Notice we pass `boxRef.current` straight to GSAP, no selector needed.

---

## The StrictMode pitfall

React has a tool called StrictMode (Roman Urdu: development mein do baar mount karne wala tool). In development, it mounts your component twice on purpose. It does this to help you find bugs. It only happens in development. In production, your component mounts once.

This double-mount breaks `gsap.from`. With `from`, GSAP reads the current value as the end state. It animates from your given start value to that current value. On the second mount, the current value may already be the start value. GSAP captures the wrong target. Your element can get stuck or stay invisible.

The fix is simple. Use `gsap.fromTo` instead. You write both the start and the end values yourself. GSAP no longer guesses. The result is the same every time.

```jsx
// Risky with StrictMode: from reads the current value
gsap.from(".card", { opacity: 0, y: 40 });

// Safe: fromTo states both ends clearly
gsap.fromTo(
  ".card",
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0 }
);
```

Here is the full picture of why the double-mount causes a problem and what fixes it.

| Situation | What happens with `gsap.from` | What happens with `gsap.fromTo` |
| --- | --- | --- |
| First mount (normal or StrictMode) | GSAP reads current values as the destination. Animates from your start values. Works fine. | GSAP uses your explicit end values. Works fine. |
| Second mount (StrictMode only) | GSAP reads the element, but it was left at the from-values after cleanup. Now the "destination" equals the start. Element stays stuck or invisible. | GSAP still uses your explicit end values. Works fine. |
| Production build | Only mounts once, so `gsap.from` is fine. But why risk it? | Works fine in all environments. |
| Recommendation | Avoid in React components | Use this always inside React |

!!! warning
    React StrictMode mounts your component twice in development. This can make `gsap.from` leave elements stuck or invisible, because the start values get captured twice. Prefer `gsap.fromTo` with explicit from and to values. That way the animation is deterministic. The cleanup inside `useGSAP` also helps. Remember, this double-mount is a dev-only behavior. Production mounts once.

---

??? note urdu "اردو میں مزید وضاحت"
    React میں GSAP استعمال کرتے وقت سب سے اہم چیز `useGSAP` ہک اور اس کی صفائی ہے۔ یہ ہک آپ کی اینیمیشن رینڈر کے بعد چلاتا ہے اور جب کمپوننٹ اسکرین سے ہٹتا ہے تو ساری اینیمیشنز خود ختم کر دیتا ہے۔ ڈیولپمنٹ میں StrictMode کمپوننٹ کو دو بار ماؤنٹ کرتا ہے۔ اس لیے `gsap.from` عناصر کو غائب یا اٹکا چھوڑ سکتا ہے۔ اس کا حل یہ ہے کہ آپ `gsap.fromTo` استعمال کریں اور شروع اور آخر دونوں قدریں خود لکھیں۔ یاد رکھیں کہ یہ دوہرا ماؤنٹ صرف ڈیولپمنٹ میں ہوتا ہے، پروڈکشن میں کمپوننٹ ایک ہی بار ماؤنٹ ہوتا ہے۔

---

### Try this

In a Vite React project, install `gsap` and `@gsap/react`. Build a `Cards` component with three `.card` divs inside a container that has a ref. Use `useGSAP` with `{ scope: containerRef }` and a `gsap.fromTo` that fades the cards up with a `stagger`. Confirm they animate once on mount and stay in place. Then add a button and a `count` state, and pass `dependencies: [count]` so the cards replay every time you click.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why should you use a ref instead of `document.querySelector` in React?
2. What two jobs does the `useGSAP` hook do for you?
3. How do you make an animation run again when React state changes?
4. Why can `gsap.from` break under StrictMode, and what do you use instead?

---

## What's next

You can now animate React components safely. Next we look at smooth scrolling. In 12.4 you will add Lenis to make page scrolling feel soft and smooth. It pairs nicely with the scroll animations you built earlier.

[Next lesson: 12.4 Smooth scroll with Lenis &rarr;](12-4-lenis-and-locomotive.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [GSAP React / useGSAP docs](https://gsap.com/resources/React/)
- [@gsap/react package](https://www.npmjs.com/package/@gsap/react)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[useGSAP]: The official GSAP hook for React. It runs your animations and cleans them up. (Roman Urdu: React ke liye GSAP ka khaas hook)
*[ref]: A reference to a real DOM element in React. (Roman Urdu: asli DOM element ka pata)
*[scope]: A container that limits which elements your selectors can match. (Roman Urdu: jis dabbe ke andar selector kaam kare)
*[StrictMode]: A React dev tool that mounts components twice to catch bugs. (Roman Urdu: development mein do baar mount karne wala tool)
*[unmount]: When React removes a component from the screen. (Roman Urdu: jab component screen se hat jaye)
