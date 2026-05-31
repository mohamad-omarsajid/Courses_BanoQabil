---
lesson_id: frontend.ch14.l01
title: "14.1 useRef, useMemo, useCallback"
chapter: 14
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch13.l04
---

# 14.1 useRef, useMemo, useCallback

You already know `useState` and `useEffect`. Now you meet three more hooks. They help you reach into a DOM element, remember a value without a re-render, and avoid wasted work. They are simple once you see what each one is for. Let us go slowly.

## What you'll know by the end

- Use `useRef` to point to a real DOM element.
- Use `useRef` to hold a value that survives re-renders but does not cause one.
- Understand that changing `ref.current` never re-renders your component.
- Use `useMemo` to cache the result of a slow calculation.
- Use `useCallback` to keep a function reference stable across renders.
- Know when these hooks matter, and when adding them just makes code harder.

---

## The big picture: what each hook remembers

Before the code, here is a one-minute map. React re-renders a component whenever its state changes. These three hooks each remember something across those renders, but they do it in very different ways.

<figure markdown>
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-hooks-overview" style="max-width:100%;height:auto">
  <title id="svg-hooks-overview">Three boxes labelled useRef, useMemo, and useCallback showing what each one remembers and whether a change triggers a re-render.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="60" width="200" height="140" rx="8"/>
    <rect x="260" y="60" width="200" height="140" rx="8"/>
    <rect x="500" y="60" width="200" height="140" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="15" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="120" y="90">useRef</text>
    <text x="360" y="90">useMemo</text>
    <text x="600" y="90">useCallback</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="120" y="118">Remembers a value</text>
    <text x="120" y="135">or a DOM node</text>
    <text x="360" y="118">Remembers the result</text>
    <text x="360" y="135">of a calculation</text>
    <text x="600" y="118">Remembers a function</text>
    <text x="600" y="135">reference</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="120" y="165">Changing it does NOT</text>
    <text x="120" y="180">cause a re-render</text>
    <text x="360" y="165">Recomputes only when</text>
    <text x="360" y="180">dependencies change</text>
    <text x="600" y="165">Returns same function</text>
    <text x="600" y="180">until deps change</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#1f1f1c" text-anchor="middle">
    <text x="120" y="205" font-style="italic">ref.current = mutable box</text>
    <text x="360" y="205" font-style="italic">useMemo(fn, deps)</text>
    <text x="600" y="205" font-style="italic">useCallback(fn, deps)</text>
  </g>
</svg>
<figcaption>Three hooks, three jobs. Only `useRef` lets you mutate a value without triggering a re-render. The other two cache things to avoid repeating work.</figcaption>
</figure>

---

## State vs ref: what triggers a re-render?

The single biggest thing to understand about `useRef` is how it differs from `useState`. Changing state tells React "please re-render". Changing a ref says nothing to React at all.

<figure markdown>
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-state-vs-ref" style="max-width:100%;height:auto">
  <title id="svg-state-vs-ref">Two columns: the left shows state where a change fires a re-render and the screen updates; the right shows a ref where a change is silent and the screen stays the same.</title>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="30">useState</text>
    <text x="510" y="30">useRef</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="40" y="50" width="260" height="50" rx="6"/>
    <rect x="380" y="50" width="260" height="50" rx="6"/>
    <rect x="40" y="160" width="260" height="50" rx="6"/>
    <rect x="380" y="160" width="260" height="50" rx="6"/>
    <rect x="40" y="235" width="260" height="40" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="72">setCount(count + 1)</text>
    <text x="170" y="88">state changes</text>
    <text x="510" y="72">ref.current = newValue</text>
    <text x="510" y="88">ref changes silently</text>
    <text x="170" y="182">React schedules</text>
    <text x="170" y="198">a re-render</text>
    <text x="510" y="182">React does nothing.</text>
    <text x="510" y="198">No re-render.</text>
    <text x="170" y="258" font-weight="700">Screen updates</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="510" y="252">Value is stored silently</text>
    <text x="510" y="267">screen waits until next render</text>
  </g>
  <defs>
    <marker id="arr-srv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-srv)">
    <line x1="170" y1="100" x2="170" y2="158"/>
    <line x1="510" y1="100" x2="510" y2="158"/>
    <line x1="170" y1="210" x2="170" y2="233"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" fill="none" stroke-dasharray="6 4">
    <line x1="510" y1="210" x2="510" y2="233"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="510" y="226">no repaint arrow</text>
  </g>
</svg>
<figcaption>State and ref both survive re-renders. Only state tells React to repaint the screen. A ref change is silent.</figcaption>
</figure>

---

## useRef job one: point to a DOM element

You saw this idea back in 10.3. A ref can hold a reference to a real DOM node. React fills it in for you after the element renders.

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Type here" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
```

You create a ref with `useRef(null)`. You attach it to the input with the `ref` prop. After render, `inputRef.current` is the actual input element. So you can call `inputRef.current.focus()` to move the cursor into it. This is handy for focus, scrolling, or measuring size.

---

## useRef job two: a value that survives but does not re-render

A ref can also hold any value you want. The big idea is this. When you change `ref.current`, React does not re-render. The value just sticks around between renders.

This is great for things the user does not see directly. A common case is a timer id.

```jsx
import { useRef, useState } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef(null);

  function start() {
    if (timerId.current) return;
    timerId.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(timerId.current);
    timerId.current = null;
  }

  return (
    <div>
      <p>{seconds} seconds</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

The `seconds` value is state, so changing it re-renders and updates the screen. The `timerId` is a ref, so it holds the interval id quietly. You do not want a re-render every time you save the timer id. A ref is perfect for that.

Another use is remembering a previous value to compare against the new one.

```jsx
import { useRef, useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(0);

  useEffect(() => {
    prevCount.current = count;
  });

  return (
    <div>
      <p>Now: {count}, Before: {prevCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  );
}
```

The ref keeps the old count without forcing an extra render. Remember the rule. State is for what the screen shows. A ref is for data you keep but do not display through re-renders.

??? note urdu "اردو میں مزید وضاحت"
    `useRef` کا سب سے اہم نکتہ یہ ہے کہ جب آپ `ref.current` کی ویلیو تبدیل کرتے ہیں تو کمپوننٹ دوبارہ رینڈر نہیں ہوتا۔ یہ ویلیو رینڈرز کے درمیان محفوظ رہتی ہے، بالکل کسی خاموش ڈبے کی طرح۔ اسی لیے یہ ٹائمر کی آئی ڈی یا پچھلی ویلیو رکھنے کے لیے بہترین ہے۔ اس کے برعکس `useState` کی ویلیو بدلنے پر اسکرین دوبارہ رینڈر ہوتی ہے۔ جو چیز اسکرین پر دکھانی ہو اس کے لیے state، اور جو خاموشی سے یاد رکھنی ہو اس کے لیے ref استعمال کریں۔ `useMemo` بھاری حساب کا نتیجہ یاد رکھتا ہے، اور `useCallback` فنکشن کا حوالہ مستحکم رکھتا ہے تاکہ child component بار بار re-render نہ ہو۔

---

## useMemo: cache a slow calculation

Sometimes your component does heavy math on every render. If the inputs did not change, that work is wasted. `useMemo` caches the result and only recomputes when a dependency changes.

```jsx
import { useMemo, useState } from "react";

function PrimeList({ limit }) {
  const [name, setName] = useState("");

  const primes = useMemo(() => {
    console.log("computing primes...");
    return findPrimes(limit);
  }, [limit]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Found {primes.length} primes up to {limit}</p>
    </div>
  );
}
```

`useMemo` takes a function and a dependency array. It runs the function and saves the result. On the next render, if `limit` is the same, it returns the saved result. So typing in the input does not recompute the primes. Without `useMemo`, the heavy `findPrimes` call would run on every keystroke.

---

## useCallback: keep a function reference stable

Every render creates new functions. Usually that is fine. But sometimes you need the same function reference across renders. `useCallback` gives you that stable reference.

```jsx
import { useCallback, useState } from "react";

function ParentList() {
  const [items, setItems] = useState([]);

  const handleSelect = useCallback((id) => {
    console.log("selected", id);
  }, []);

  return <Child onSelect={handleSelect} />;
}
```

`useCallback` returns the same function until a dependency changes. This matters in two spots. First, when you pass a callback to a memoized child component. A stable reference lets the child skip re-rendering. Second, when a function is a dependency of `useEffect`. A stable reference stops the effect from running too often.

Note that `useCallback(fn, deps)` is just `useMemo(() => fn, deps)`. One memoizes a value, the other memoizes a function.

---

## Comparison table: useRef vs useMemo vs useCallback

| Hook | What it keeps | When to reach for it | When to skip it |
| --- | --- | --- | --- |
| `useRef` | A mutable value or a DOM node; changing it never re-renders | Storing a timer id, previous value, or DOM reference | When the value must appear on screen (use `useState` instead) |
| `useMemo` | The result of a computation | A genuinely slow function, like sorting thousands of rows | Small or fast calculations; premature use makes code harder to read |
| `useCallback` | A stable function reference | Passing a callback to a `React.memo` child; function used as an `useEffect` dependency | When the child is not memoized (the stable ref gives no benefit) |

---

## When these actually matter

Here is the honest truth. Most components are fast without any of these hooks. React is quick at rendering. These tools help in specific cases.

- `useMemo`: a real heavy calculation, like sorting a large list or math over thousands of items.
- `useCallback`: passing a function to a memoized child, or using a function as an effect dependency.
- Referential equality: when a child uses `React.memo` and you must not break it with new props each render.

!!! warning
    Do not wrap everything in `useMemo` and `useCallback`. These hooks are not free. They add code, add a dependency array to manage, and use a little memory. For a small fast component, they can make things slower and harder to read. Premature optimization causes more bugs than it prevents.

!!! tip
    Reach for these hooks only when you measure a real slowdown, or when you need a stable reference for a memoized child or an effect dependency. Measure first with the React DevTools Profiler. If the component is already fast, leave it plain.

---

### Try this

Build the `Stopwatch` from the `useRef` section. Use state for the seconds and a ref for the timer id, then add the Start and Stop buttons. Confirm that clicking Start twice does not run two timers, since the ref check stops that. Then add a Reset button that stops the timer and sets the seconds back to `0`. Watch how changing the ref never re-renders, but changing the seconds does.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What happens to your component when you change `ref.current`?
2. Name the two different jobs `useRef` can do.
3. What does `useMemo` save, and when does it run the function again?
4. Why might you wrap a callback in `useCallback` before passing it to a child?
5. Give one situation where you should NOT use `useMemo`.

---

## What's next

You have learned the deeper hooks for refs and caching. Next you will combine hooks into your own reusable hook. Custom hooks let you share logic between components in a clean way.

[Next lesson: 13.2 Custom hooks &rarr;](14-2-custom-hooks.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [react.dev: useMemo](https://react.dev/reference/react/useMemo)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[useRef]: A hook that holds a mutable value or a DOM reference, and changing it does not re-render. (Roman Urdu: aisi value rakhne wala hook jo badalne par re-render nahi karta)
*[useMemo]: A hook that caches the result of a calculation until its dependencies change. (Roman Urdu: heavy calculation ka result yaad rakhne wala hook)
*[useCallback]: A hook that returns the same function reference until its dependencies change. (Roman Urdu: function ka reference stable rakhne wala hook)
*[memoization]: Saving the result of work so you can reuse it instead of redoing it. (Roman Urdu: kaam ka result save karke dobara istemal karna)
*[referential equality]: When two references point to the exact same object or function in memory. (Roman Urdu: do reference bilkul ek hi cheez ki taraf ishara karte hain)
