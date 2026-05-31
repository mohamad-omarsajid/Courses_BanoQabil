---
lesson_id: frontend.ch14.l02
title: "14.2 Custom hooks"
chapter: 14
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch14.l01
---

# 14.2 Custom hooks

Back in 10.2 you saw a `useFetch` hook and used it without much thought. Now you will learn to build hooks like that yourself. A custom hook lets you take stateful logic out of a component and reuse it anywhere. By the end you will write three small hooks that real apps use every day.

## What you'll know by the end

- What a custom hook is and how to spot one.
- Why you pull logic out of a component into a hook.
- How the rules of hooks apply inside your own hooks.
- How to name a hook so other people understand it.
- How to build `useLocalStorage`, `useDebounce`, and `useMediaQuery`.
- That ready made hooks live on sites like usehooks.com.

---

## What is a custom hook

A custom hook is just a function. Its name starts with the word `use`. Inside, it calls other hooks like `useState` or `useEffect`. That is the whole idea.

You already use built in hooks. A custom hook wraps a few of them together into one neat package. Then any component can call your hook and get that behavior.

```jsx
function useCounter(start) {
  const [count, setCount] = useState(start);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
```

This tiny hook holds a number in state. It hands back the current `count` and a function to raise it. The component does not care how it works inside. It just calls the hook and uses what comes back.

!!! tip
    A custom hook is just a function that uses hooks. There is no special syntax. Start every name with `use` so React and your teammates know it is a hook.

---

## Before and after: extracting logic into a hook

Here is the classic before-and-after picture. Two components both need to track the window size. Without a hook, they each carry the same logic. With a hook, they share one implementation.

<figure markdown>
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-extract-hook" style="max-width:100%;height:auto">
  <title id="svg-extract-hook">Before: two components each containing duplicate useState and useEffect logic for window size. After: one useWindowSize hook in the middle, with arrows from the hook to both components, showing shared logic.</title>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="160" y="22">BEFORE</text>
    <text x="560" y="22">AFTER</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="34" width="280" height="110" rx="8"/>
    <rect x="20" y="160" width="280" height="110" rx="8"/>
    <rect x="420" y="120" width="260" height="80" rx="8"/>
    <rect x="380" y="40" width="140" height="60" rx="8"/>
    <rect x="560" y="40" width="140" height="60" rx="8"/>
    <rect x="380" y="230" width="140" height="60" rx="8"/>
    <rect x="560" y="230" width="140" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="160" y="55">ComponentA</text>
    <text x="160" y="75" fill="#6b6b65">useState(windowSize)</text>
    <text x="160" y="93" fill="#6b6b65">useEffect(listener)</text>
    <text x="160" y="111" fill="#6b6b65">cleanup...</text>
    <text x="160" y="180">ComponentB</text>
    <text x="160" y="200" fill="#6b6b65">useState(windowSize)</text>
    <text x="160" y="218" fill="#6b6b65">useEffect(listener)</text>
    <text x="160" y="236" fill="#6b6b65">cleanup... (same code!)</text>
    <text x="550" y="152">useWindowSize()</text>
    <text x="550" y="170" fill="#6b6b65">useState + useEffect</text>
    <text x="550" y="188" fill="#6b6b65">in one place</text>
    <text x="450" y="65">ComponentA</text>
    <text x="450" y="83" fill="#6b6b65">calls hook</text>
    <text x="630" y="65">ComponentB</text>
    <text x="630" y="83" fill="#6b6b65">calls hook</text>
    <text x="450" y="255">ComponentC</text>
    <text x="450" y="273" fill="#6b6b65">calls hook</text>
    <text x="630" y="255">ComponentD</text>
    <text x="630" y="273" fill="#6b6b65">calls hook</text>
  </g>
  <defs>
    <marker id="arr-hook" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-hook)">
    <line x1="550" y1="120" x2="490" y2="100"/>
    <line x1="550" y1="120" x2="610" y2="100"/>
    <line x1="550" y1="200" x2="490" y2="228"/>
    <line x1="550" y1="200" x2="610" y2="228"/>
  </g>
</svg>
<figcaption>Before: both components repeat the same state and effect code. After: one custom hook owns the logic, and any component can call it.</figcaption>
</figure>

---

## Why extract logic into a hook

Imagine three components all need to read and save data to `localStorage`. Without a hook, you copy the same code three times. That is slow to write and easy to break.

A hook fixes this in three ways:

- Reuse. Write the logic once. Call it from any component.
- Cleaner components. The component shows the UI. The hook holds the messy state work.
- Testable logic. You can test the hook on its own, away from the screen.

```jsx
function Profile() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>Clicked {count} times</button>;
}
```

Look how short this component is. All the state logic sits inside `useCounter`. The component reads clean and tells a simple story.

---

## The rules of hooks still apply

Custom hooks follow the same rules as built in hooks. You learned these earlier, and they do not change here.

- Only call hooks at the top level of the function. Never inside loops, conditions, or nested functions.
- Only call hooks from React components or from other hooks.

Because your custom hook calls `useState` and `useEffect`, those rules cover your hook too.

```jsx
function useGreeting(name) {
  // Correct. Called at the top level.
  const [greeting, setGreeting] = useState("Hi");

  // Wrong. Never do this inside a condition.
  // if (name) { const [x, setX] = useState(0); }

  return `${greeting}, ${name}`;
}
```

The top hook call is fine. The commented out one breaks the rules. React needs hooks called in the same order every render.

!!! warning
    Follow the rules of hooks inside custom hooks too. Do not call hooks in a loop, a condition, or after an early `return`. React tracks hooks by their order, and breaking that order causes bugs.

---

## Naming your hooks

Always start the name with `use`. This is not just style. React's linter uses that prefix to check the rules of hooks for you.

Then name the hook for what it does. A hook that delays a value is `useDebounce`. A hook for localStorage is `useLocalStorage`. A reader can guess the job from the name alone.

```jsx
// Good names. Clear and start with use.
useLocalStorage();
useDebounce();
useMediaQuery();

// Bad names. Confusing or missing the prefix.
localStorageThing();
useStuff();
```

Good names save everyone time. You will thank yourself in six months when you read this code again.

### Naming and rules reference table

| Rule | Correct | Wrong | Why it matters |
| --- | --- | --- | --- |
| Name starts with `use` | `useCart` | `cartHook` | Linter enforces hook rules based on the prefix |
| Name describes the job | `useLocalStorage` | `useStuff` | Readers can guess purpose without opening the file |
| Call hooks at top level | `const [x] = useState(0)` at top | `if (cond) { useState(0) }` | React tracks hooks by order; conditionals break the order |
| Only call from hooks or components | Called inside `useCart` | Called in a regular helper function | Hook state only lives inside the React component tree |
| Return what the caller needs | `return [value, setValue]` | Giant objects with 20 fields | Small clear return shapes keep components simple |

---

## Example 1: useLocalStorage

Recall 12.3, where you saved data to `localStorage` by hand. This hook keeps a piece of state in sync with `localStorage` for you.

```jsx
import { useState } from "react";

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initial;
  });

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
```

The `useState` starter function runs once. It reads the saved value, or uses `initial` if nothing is there. The `save` function updates state and writes to `localStorage` at the same time. The hook returns a pair, just like `useState`.

```jsx
function NameInput() {
  const [name, setName] = useLocalStorage("name", "");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

The user's name now survives a page refresh. The component reads almost like plain `useState`.

---

## Example 2: useDebounce

When a user types in a search box, you do not want to act on every keystroke. You want to wait until they stop typing. That waiting is called debounce (Roman Urdu: thoda ruk ke action lena).

This hook returns a value that only updates after a quiet delay. It uses `useState`, `useEffect`, `setTimeout`, and a cleanup.

```jsx
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

Every time `value` changes, the effect starts a timer. If the user types again before the delay ends, the cleanup runs `clearTimeout` and cancels the old timer. So `debounced` only updates once the user pauses for `delay` milliseconds.

```jsx
function Search() {
  const [text, setText] = useState("");
  const query = useDebounce(text, 500);
  // Use query to call an API only after the user stops typing.
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

The input updates instantly. But `query` waits half a second after the last keystroke. Your API does not get spammed.

??? note urdu "اردو میں مزید وضاحت"
    Custom hook ایک عام فنکشن ہے جس کا نام `use` سے شروع ہوتا ہے۔ یہ اندر سے دوسرے hooks جیسے `useState` اور `useEffect` استعمال کرتا ہے۔ اس کا فائدہ یہ ہے کہ ایک ہی logic کو کئی components میں استعمال کیا جا سکتا ہے، بار بار لکھنے کی ضرورت نہیں۔ مثال کے طور پر `useLocalStorage` نام کا hook بنا کر کسی بھی component میں localStorage آسانی سے استعمال کریں۔ ڈی باؤنس کا مطلب ہے کہ ہم تھوڑا انتظار کرتے ہیں۔ جب صارف ٹائپ کرنا روک دیتا ہے، تب ہی ویلیو اپڈیٹ ہوتی ہے۔ یاد رکھیں: hook کا نام ہمیشہ `use` سے شروع ہونا چاہیے، اور hooks کو ہمیشہ function کے اوپری حصے میں call کریں۔

---

## Example 3: useMediaQuery

Sometimes your component needs to know the screen size in JavaScript, not just in CSS. This hook returns `true` or `false` for a CSS media query. It uses `matchMedia` and an event listener with cleanup.

```jsx
import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
```

`window.matchMedia(query)` checks if the screen matches the query right now. The effect adds a listener that fires when the match changes, like when the user resizes the window. The cleanup removes that listener so you do not leak memory.

```jsx
function Layout() {
  const isWide = useMediaQuery("(min-width: 768px)");
  return <p>{isWide ? "Desktop view" : "Mobile view"}</p>;
}
```

Now `isWide` flips between `true` and `false` as the window resizes. Your component reacts to the screen in real time.

---

## When NOT to write a custom hook

Custom hooks are useful, but they are not always the right choice.

| Situation | Better approach |
| --- | --- |
| Logic is used by only one component | Keep it inside that component; a hook adds a file with no benefit |
| No hooks inside (just pure functions) | Write a plain utility function, not a hook |
| You are wrapping a single `useState` line | That is too thin; keep it inline |
| The hook needs to accept JSX or render anything | That is a component, not a hook |
| You are sharing data, not logic | Use Context or a state library instead |

The rule of thumb: build a hook when two or more components share the same stateful pattern, or when a component is getting too long because of repeated effect and state code.

---

## These patterns are everywhere

You did not invent these hooks. People write the same ones again and again. So the community collected the popular ones in one place.

The site usehooks.com lists many ready made hooks like these. You can read them, learn from them, and copy ideas into your own projects.

---

### Try this

Write the `useLocalStorage` hook from this lesson, then use it in a small component. Make a text input whose value is saved with `useLocalStorage("note", "")`. Type something, refresh the page, and check that your text is still there. Then build a second tiny hook of your own, `useToggle`, that holds a boolean and returns the value plus a function to flip it. Use it to show or hide a paragraph with a button.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What two things make a function a custom hook?
2. Name two reasons to pull logic out of a component into a hook.
3. In `useDebounce`, what does the cleanup function do, and why does it matter?
4. Why must the name of a custom hook start with `use`?
5. Give one situation where you should keep logic inside the component rather than extracting a hook.

---

## What's next

You can now package stateful logic into your own hooks. Next you will look at the Context API in depth. Context lets you share data across many components without passing props down by hand.

[Next lesson: 13.3 Context API in depth &rarr;](14-3-context-in-depth.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [usehooks.com](https://usehooks.com)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[custom hook]: A function whose name starts with use that calls other hooks to package reusable logic. (Roman Urdu: apna banaya hua hook jo dusre hooks use karta hai)
*[useLocalStorage]: A custom hook that keeps React state in sync with the browser's localStorage. (Roman Urdu: state ko localStorage ke sath save rakhne wala hook)
*[debounce]: Waiting until a value stops changing for a short delay before acting on it. (Roman Urdu: thora intezar karna jab tak typing ruk na jaye)
*[useMediaQuery]: A custom hook that returns true or false for a CSS media query in JavaScript. (Roman Urdu: JavaScript mein hi bata deta hai ke screen choti hai ya bari, true ya false ki shakal mein)
*[matchMedia]: A browser function that tests whether the screen matches a CSS media query. (Roman Urdu: browser ka function jo check karta hai ke maujooda screen kisi media query par poori utarti hai ya nahi)
