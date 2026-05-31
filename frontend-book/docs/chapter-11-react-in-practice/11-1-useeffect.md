---
lesson_id: frontend.ch11.l01
title: "11.1 useEffect and the lifecycle"
chapter: 11
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch10.l04
---

# 11.1 useEffect and the lifecycle

Your components so far have done one job. They take props and state, then they return some UI. But real apps need to talk to things outside React. They fetch data, start timers, and change the page title. The `useEffect` hook is how you do that work safely.

## What you'll know by the end

- You can explain what a side effect is in plain words.
- You can write `useEffect(fn, deps)` and read the parts.
- You know the three dependency forms and what each one does.
- You can write a cleanup function to stop a timer.
- You can spot a stale value bug and an infinite loop.
- You know when you need useEffect and when you do not.

---

## What is a side effect

Rendering means React calls your function and uses the returned UI. That is the main job. A side effect (Roman Urdu: render ke bahar ka kaam) is any other work that happens outside that job.

Here are common side effects:

- Fetching data from a server.
- Starting a timer with `setInterval`.
- Subscribing to an event or a stream.
- Changing the document title in the browser.
- Reading or setting something in the browser, like local storage.

These all touch the world outside React. They should not run during render. You run them inside `useEffect` instead.

Why does this matter? Because render can run many times, at any moment. If you fetch data directly inside your component function, you fire a new network request on every single render. That wastes bandwidth, creates race conditions, and can show stale or wrong data. `useEffect` gives you a controlled gate so the outside work runs only when you say so.

---

## The shape of useEffect

You import the hook from React. Then you call it with two things. The first is a function. The second is a dependency array (Roman Urdu: woh list jo batati hai effect kab chale).

```jsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    // your side effect goes here
    console.log("the effect ran");
  }, []);

  return <p>Open the console to see the log.</p>;
}
```

React runs your function after the render finishes. So the screen paints first, then the effect runs. The dependency array controls how often the effect runs again. Below you will see all three forms.

---

## The three dependency forms

The second argument decides when the effect runs again. There are three choices.

```jsx
// 1. Empty array: runs once after the first render.
useEffect(() => {
  console.log("setup, runs one time");
}, []);

// 2. Array with values: runs first, then when a value changes.
useEffect(() => {
  console.log("count changed to", count);
}, [count]);

// 3. No array: runs after every single render.
useEffect(() => {
  console.log("this runs a lot, you rarely want this");
});
```

The empty array `[]` is good for setup work. It runs one time when the component mounts. The array with values `[count]` runs after the first render. It also runs again every time `count` changes. No array means the effect runs after every render. That is rarely what you want.

Here is the same information as a table so you can scan it quickly:

| Dependency argument | When the effect runs | Typical use |
| --- | --- | --- |
| `[]` empty array | Once, after the first render (mount) | Fetch data once, start a one-time setup |
| `[x]` array with values | After first render, then whenever `x` changes | Sync a title, re-fetch when a search term changes |
| *(no second argument)* | After every single render | Almost never; can cause performance problems |

Keep this table in mind when you write any effect. If you are not sure which form to pick, start with `[]` and add values when the linter warns you.

---

## Why put values in the array at all

Imagine you fetch user data inside an effect. The URL depends on a `userId` prop. If you write `[]`, the effect runs once with the first `userId` and never again. When the parent passes a new `userId`, the screen stays stuck on the old data. That is a stale value bug.

The fix is to list `userId` in the array. React then notices when `userId` changes and runs the effect again with the fresh value. The rule is simple: every variable your effect reads from outside its own body should be in the array.

---

## Example: changing the document title

Here is a small effect with a dependency. It updates the browser tab title when `count` changes.

```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

When the page first renders, the effect sets the title. After that, the effect runs again only when `count` changes. The title in the browser tab stays in sync with the state. This is a clean use of useEffect, because the document title lives outside React.

---

## The cleanup function

Some effects need to be stopped later. A timer keeps running. An event listener keeps listening. If you do not stop them, they pile up and cause bugs.

You clean up by returning a function from your effect. React runs that returned function before the next effect. It also runs it when the component unmounts.

```jsx
import { useState, useEffect } from "react";

function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // cleanup: stop the timer
    return () => clearInterval(id);
  }, []);

  return <p>Seconds on screen: {seconds}</p>;
}
```

The effect starts a timer one time, because the array is empty. The returned function calls `clearInterval`. When the component leaves the screen, React runs that cleanup and the timer stops. Without it you would have a timer running forever in the background.

!!! warning
    Do not set state inside an effect that has no dependency array. The state change causes a new render. The new render runs the effect again. That sets state again, and the loop never stops. This is an infinite loop. Always give the effect a correct dependency array.

---

## The lifecycle timeline

It helps to picture the order of events. The component renders. The screen paints. Then the effect runs. Later a dependency changes, so React cleans up the old effect and runs a fresh one.

<figure markdown>
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-effect-title" style="max-width:100%;height:auto">
  <title id="svg-effect-title">The effect lifecycle: the component renders, the effect runs after paint, the cleanup runs when a dependency changes, then the effect runs again with the new values.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="70" width="160" height="100" rx="10"/>
    <rect x="230" y="70" width="160" height="100" rx="10"/>
    <rect x="440" y="70" width="160" height="100" rx="10"/>
    <rect x="650" y="70" width="150" height="100" rx="10"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" text-anchor="middle">
    <text x="100" y="112" font-size="16" font-weight="600">Render</text>
    <text x="100" y="136" font-size="12" fill="#6b6b65">React draws UI</text>
    <text x="310" y="112" font-size="16" font-weight="600">Effect runs</text>
    <text x="310" y="136" font-size="12" fill="#6b6b65">after the paint</text>
    <text x="520" y="112" font-size="16" font-weight="600">Cleanup</text>
    <text x="520" y="136" font-size="12" fill="#6b6b65">when deps change</text>
    <text x="725" y="112" font-size="16" font-weight="600">Effect again</text>
    <text x="725" y="136" font-size="12" fill="#6b6b65">with new values</text>
  </g>
  <defs>
    <marker id="bq-arrow-effect" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-effect)">
    <line x1="180" y1="120" x2="222" y2="120"/>
    <line x1="390" y1="120" x2="432" y2="120"/>
    <line x1="600" y1="120" x2="642" y2="120"/>
  </g>
</svg>
<figcaption>An effect runs after the render. When a dependency changes, React cleans up the old effect, then runs a fresh one.</figcaption>
</figure>

Now here is the mount-to-unmount picture. This shows the full life of a component and where each effect fits.

<figure markdown>
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-mount-unmount" style="max-width:100%;height:auto">
  <title id="svg-mount-unmount">Full component lifecycle: mount triggers first render and first effect; re-render on state or prop change triggers cleanup of previous effect then new effect; unmount triggers final cleanup.</title>
  <defs>
    <marker id="bq-arr-lc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="260" y="20" width="180" height="44" rx="8"/>
    <rect x="260" y="110" width="180" height="44" rx="8"/>
    <rect x="30" y="200" width="180" height="44" rx="8"/>
    <rect x="490" y="200" width="180" height="44" rx="8"/>
    <rect x="260" y="200" width="180" height="44" rx="8"/>
    <rect x="260" y="300" width="180" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#1f1f1c">
    <text x="350" y="38" font-size="14" font-weight="600">Mount</text>
    <text x="350" y="54" font-size="11" fill="#6b6b65">component appears</text>
    <text x="350" y="128" font-size="14" font-weight="600">First render + paint</text>
    <text x="350" y="144" font-size="11" fill="#6b6b65">screen shows UI</text>
    <text x="120" y="218" font-size="13" font-weight="600">First effect runs</text>
    <text x="120" y="234" font-size="11" fill="#6b6b65">setup work happens</text>
    <text x="350" y="218" font-size="13" font-weight="600">Re-render</text>
    <text x="350" y="234" font-size="11" fill="#6b6b65">state or prop changed</text>
    <text x="580" y="218" font-size="13" font-weight="600">Cleanup old effect</text>
    <text x="580" y="234" font-size="11" fill="#6b6b65">then new effect</text>
    <text x="350" y="318" font-size="14" font-weight="600">Unmount</text>
    <text x="350" y="334" font-size="11" fill="#6b6b65">final cleanup runs</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-lc)">
    <line x1="350" y1="64" x2="350" y2="108"/>
    <line x1="350" y1="154" x2="200" y2="198"/>
    <line x1="350" y1="154" x2="350" y2="198"/>
    <line x1="350" y1="244" x2="580" y2="198"/>
    <line x1="580" y1="244" x2="440" y2="198"/>
    <line x1="350" y1="244" x2="350" y2="298"/>
  </g>
</svg>
<figcaption>Mount fires the first effect. Re-renders clean up the old effect then start a new one. Unmount fires the final cleanup and the timer or subscription stops.</figcaption>
</figure>

---

## Common bugs

Two bugs catch beginners often. Both come from the dependency array.

The first is a forgotten dependency. Your effect uses a value, but you left it out of the array. So the effect keeps the old value. People call this a stale value. The screen shows wrong data because the effect never ran again.

The second is an infinite loop. You set state in an effect, but the dependency keeps changing every render. So the effect runs, sets state, triggers a render, and runs again. The fix is a correct array. List only the values your effect truly uses.

A good rule is simple. Put every value the effect reads into the array. If a value never changes, an empty array is fine.

| Bug | What happens | Fix |
| --- | --- | --- |
| Forgotten dependency | Effect uses an old value, screen shows stale data | Add the missing value to the array |
| Infinite loop | Effect sets state, state triggers render, effect runs again, forever | Remove the state setter from deps, or restructure the logic |
| No cleanup on timer | Timer keeps running after the component leaves the screen | Return `() => clearInterval(id)` from the effect |
| Missing `response.ok` check (fetch) | A 404 silently gives no data, no error shown | Check `response.ok` and throw if false |

---

## When you need useEffect, and when you do not

useEffect is for syncing with something outside React. That includes timers, network requests, and the browser. If your work touches the outside world, an effect is the right tool.

You do not need useEffect to transform data for rendering. If you can compute a value from props or state during render, just compute it. You also do not need an effect to handle an event. Put that logic in your event handler, like the `onClick` function.

!!! tip
    You often do not need useEffect. Do not use it to compute values you can derive during render. For example, do not store a filtered list in state and update it in an effect. Just filter the list while you render. Fewer effects means fewer bugs.

??? note urdu "اردو میں مزید وضاحت"
    ڈیپینڈنسی ایرے ری ایکٹ کو بتاتی ہے کہ ایفیکٹ دوبارہ کب چلانا ہے۔ خالی ایرے کا مطلب ہے کہ ایفیکٹ صرف ایک بار چلے گا، جب کمپوننٹ پہلی بار بنتا ہے۔ اگر آپ ایرے میں کوئی ویلیو لکھتے ہیں، تو وہ ویلیو بدلنے پر ایفیکٹ دوبارہ چلے گا۔ اگر آپ ایرے بالکل نہیں لکھتے، تو ایفیکٹ ہر رینڈر کے بعد چلے گا، جو عام طور پر ٹھیک نہیں ہوتا۔ اس لیے ایرے میں ہمیشہ وہ ساری ویلیوز لکھیں جو ایفیکٹ کے اندر استعمال ہوتی ہیں۔ کلین اپ فنکشن وہ فنکشن ہے جو آپ ایفیکٹ سے واپس کرتے ہیں۔ یہ ٹائمر یا ایونٹ لسنر کو بند کرتا ہے جب کمپوننٹ سکرین سے ہٹتا ہے۔

---

### Try this

Build the `Clock` from the cleanup example in your own project. Add a button in a parent that hides the clock, for example by toggling a boolean so `<Clock />` only shows when the boolean is true. Add a `console.log` inside the cleanup function. When you hide the clock, confirm the cleanup runs and the timer stops counting. Then try removing the `clearInterval` line and watch what goes wrong.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is a side effect, and name two examples.
2. What does an empty dependency array `[]` make the effect do?
3. When does React run the cleanup function you return?
4. Give one case where you should not use useEffect at all.

---

## What's next

You now know how to run work after a render and clean it up. The most common real effect is fetching data from a server. In the next lesson you will load data with useEffect and show a loading state.

[Next lesson: 11.2 Fetching data &rarr;](11-2-fetching-data.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [react.dev: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[side effect]: Work outside rendering, like a timer or a fetch. (Roman Urdu: render ke bahar ka kaam)
*[useEffect]: A React hook that runs a function after the render. (Roman Urdu: render ke baad chalne wala hook)
*[dependency array]: The list of values that tells React when to run the effect again. (Roman Urdu: woh values jin par effect dobara chalta hai)
*[cleanup function]: A function you return to stop or undo an effect. (Roman Urdu: effect ko rokne wala function)
*[unmount]: When a component is removed from the screen. (Roman Urdu: jab component screen se hat jaye)
*[infinite loop]: A cycle where an effect keeps triggering itself forever. (Roman Urdu: na rukne wala chakkar)
