---
lesson_id: frontend.ch10.l03
title: "10.3 State and events"
chapter: 10
order: 3
estimated_minutes: 45
prerequisites:
  - frontend.ch10.l02
---

# 10.3 State and events

In 10.2 you passed data into components with props. But props never change inside the component. So how does a button count clicks, or a form remember what you typed? You need state. State is a component's own memory, and when it changes, React redraws the screen for you.

## What you'll know by the end

- What state is and why a component needs its own memory.
- How state is different from props.
- How to add state with the `useState` hook.
- Why you must use the setter and never reassign the variable.
- The rules of hooks, so React does not break.
- How to handle clicks, typing, and form submits in React.

---

## What state is

State (Roman Urdu: component ki apni memory jo badal sakti hai) is data inside a component that can change over time. When state changes, React re-renders the component. That means React runs your component again and updates the screen to match the new value.

Think of a counter on a screen. The current number is state. Each click changes it. React shows the new number every time.

Props come from the parent. State is born and lives inside the component itself.

---

## Props vs state

These two look similar but they serve different purposes. Knowing the difference saves you real pain.

| What | Props | State |
| --- | --- | --- |
| Where it comes from | Parent component passes it in | Component creates it with `useState` |
| Who can change it | Only the parent can change it | The component itself changes it |
| Read-only? | Yes, the child must not touch it | No, the component calls the setter to change it |
| Analogy | A letter delivered to you | Your own notebook |
| When to use | Data that comes from outside | Data that changes inside the component |

Props are like a message handed to you. You read it, but you do not edit it. State is like your own notebook. You write in it as you please.

---

## The state update and re-render cycle

When you call the setter, React does not update the variable and stop. It goes through a short cycle that ends with the new screen.

<figure markdown>
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-state-cycle" style="max-width:100%;height:auto">
  <title id="svg-state-cycle">The state update cycle: user triggers an event, the event handler calls setState, React re-renders the component, and the new UI appears on screen.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="70" width="130" height="60" rx="8"/>
    <rect x="195" y="70" width="130" height="60" rx="8"/>
    <rect x="370" y="70" width="130" height="60" rx="8"/>
    <rect x="545" y="70" width="115" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="85" y="97">User triggers</text>
    <text x="85" y="113">an event</text>
    <text x="260" y="97">Handler calls</text>
    <text x="260" y="113">setState()</text>
    <text x="435" y="97">React re-runs</text>
    <text x="435" y="113">the component</text>
    <text x="602" y="97">New UI on</text>
    <text x="602" y="113">the screen</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65" text-anchor="middle">
    <text x="85" y="150">click, type, submit</text>
    <text x="260" y="150">schedules a re-render</text>
    <text x="435" y="150">function runs fresh</text>
    <text x="602" y="150">DOM updated</text>
  </g>
  <defs>
    <marker id="arr-cycle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-cycle)">
    <line x1="152" y1="100" x2="193" y2="100"/>
    <line x1="327" y1="100" x2="368" y2="100"/>
    <line x1="502" y1="100" x2="543" y2="100"/>
  </g>
</svg>
<figcaption>One click travels through four steps: the event fires, the setter schedules a re-render, React runs the component function fresh, and the updated UI appears. React handles steps three and four automatically.</figcaption>
</figure>

The key insight: React runs your component function again from the top. It does not change one variable in place. It calls the function, builds a new description of the UI, and updates only the parts of the DOM that actually changed.

---

## Adding state with useState

`useState` is a hook (Roman Urdu: React features dene wala khaas function). A hook is a special function that lets a component use React features like memory. First you import it.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <p>The count is {count}</p>;
}
```

Look at this line closely.

```jsx
const [count, setCount] = useState(0);
```

`useState(0)` sets the starting value to `0`. It gives you back two things in an array. The first is the current value, here called `count`. The second is a function to change it, here called `setCount`. The change function is called the setter.

You can name them anything. But the pattern is always `[value, setValue]`. That naming makes your code easy to read.

---

## Always use the setter

To change state, you call the setter. You never reassign the variable directly.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // correct
    // count = count + 1; // wrong, this does nothing useful
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

When you call `setCount`, React knows the value changed. So React re-renders and shows the new number. If you write `count = count + 1`, React has no idea anything happened. The screen will not update.

!!! warning
    Never change state by reassigning the variable, like `count = 5`. React will not
    notice, so it will not re-render. Always go through the setter, like `setCount(5)`.

---

## The rules of hooks

Hooks have a few rules. Follow them or React will behave in strange ways.

- Only call hooks at the top level of your component. Not inside loops, conditions, or nested functions.
- Only call hooks from React components or from other hooks. Not from plain functions.

```jsx
function Counter() {
  const [count, setCount] = useState(0); // good, top level

  // if (count > 0) {
  //   const [x, setX] = useState(1); // bad, inside a condition
  // }

  return <p>{count}</p>;
}
```

The reason is simple. React tracks your hooks by their order. If the order changes between renders, React loses track of which state is which.

---

## Updating state from the old state

Sometimes the new state depends on the old state. A counter is the classic case. For this, pass a function to the setter. This is called the functional updater.

```jsx
function handleIncrease() {
  setCount(c => c + 1);
}
```

Here `c` is the latest value of the state. React passes it to your function. You return the new value. This is safer than `setCount(count + 1)` when you update many times in a row.

!!! tip
    When new state depends on the old state, use the functional updater. Write
    `setCount(c => c + 1)` instead of `setCount(count + 1)`. React gives you the
    freshest value, so you avoid bugs.

---

## Handling events

React handles events with attributes like `onClick`, `onChange`, and `onSubmit`. You pass a function to them. You do not call the function yourself.

```jsx
<button onClick={handleClick}>Click me</button>   {/* correct */}
<button onClick={handleClick()}>Click me</button>  {/* wrong */}
```

The first line passes the function. React calls it later, when the click happens. The second line calls the function right away during render, which is not what you want.

Here are the most common event attributes in React, with their plain JS equivalents.

| React attribute | Fires when | Plain JS equivalent |
| --- | --- | --- |
| `onClick` | user clicks an element | `addEventListener("click", ...)` |
| `onChange` | input value changes | `addEventListener("input", ...)` |
| `onSubmit` | form is submitted | `addEventListener("submit", ...)` |
| `onFocus` | element receives focus | `addEventListener("focus", ...)` |
| `onBlur` | element loses focus | `addEventListener("blur", ...)` |
| `onKeyDown` | a key is pressed down | `addEventListener("keydown", ...)` |

For forms, the browser reloads the page on submit by default. You stop that with `e.preventDefault()`, just like you saw in 7.4.

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log("Form submitted");
}

<form onSubmit={handleSubmit}>
  <button type="submit">Send</button>
</form>
```

---

## Controlled inputs

A controlled input gets its value from state. When the user types, `onChange` updates the state. So state is the single source of truth for that input.

```jsx
function NameForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name}</p>
    </form>
  );
}
```

The `value` of the input is `name`. Every keystroke fires `onChange`. You read the new text from `e.target.value` and store it with `setName`. React then re-renders, and the input shows the latest text. Now your code always knows what is in the box.

---

## Real example: a counter

Let's build a counter with three buttons. Plus, minus, and reset. We use the functional updater. We also clamp the value so it never goes below zero.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(c => c + 1);
  }

  function decrease() {
    setCount(c => Math.max(0, c - 1));
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

The `increase` function adds one each time. The `decrease` function uses `Math.max(0, c - 1)`. So when the count is zero, it stays at zero instead of going negative. The `reset` function sets the value straight back to `0`. Each button passes its function to `onClick`, never calls it.

!!! note "A note on tafakkur"
    State is where bugs love to hide. Before you add a piece of state, pause and
    think. Do you really need it, or can you compute it from what you have? A
    moment of tafakkur, careful reflection, saves hours of confusion later.

---

??? note urdu "اردو میں مزید وضاحت"
    اسٹیٹ کسی کمپوننٹ کی اپنی یادداشت ہوتی ہے۔ یہ وہ ڈیٹا ہے جو وقت کے ساتھ بدل سکتا ہے۔ جب اسٹیٹ بدلتی ہے تو ری ایکٹ خود اسکرین کو دوبارہ بناتا ہے۔ اسے بدلنے کے لیے ہمیشہ سیٹر فنکشن استعمال کریں، جیسے setCount۔ اگر آپ ویری ایبل کو سیدھا بدل دیں تو ری ایکٹ کو پتا نہیں چلتا اور اسکرین اپڈیٹ نہیں ہوتی۔ Props والد سے آتے ہیں اور بچہ انہیں بدل نہیں سکتا؛ اسٹیٹ کمپوننٹ کی اپنی ہوتی ہے اور وہ خود بدل سکتا ہے۔

---

### Try this

Build a small `LightSwitch` component. Keep a state called `isOn` that starts as `false`, using `useState`. Add a button that flips it with the functional updater, like `setIsOn(on => !on)`. Below the button, show "Light is on" when `isOn` is true and "Light is off" when it is false. Click it a few times and watch the text change on its own.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between state and props?
2. Why must you use the setter instead of changing the variable directly?
3. When should you use the functional updater `setCount(c => c + 1)`?
4. In a controlled input, where does the input's value come from?

---

## What's next

You can now store and change data inside a component. Next you will learn to show or hide parts of your screen based on state. You will also learn how to lift state up so two components can share it.

[Next lesson: 10.4 Conditional rendering and lifting state up &rarr;](10-4-conditional-rendering-lifting-state.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [react.dev: Responding to Events](https://react.dev/learn/responding-to-events)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[state]: A component's own memory, data that can change and triggers a re-render. (Roman Urdu: component ki apni memory jo badal sakti hai)
*[useState]: A React hook that adds state to a component. (Roman Urdu: state add karne wala React hook)
*[hook]: A special function that lets a component use React features like memory. (Roman Urdu: React features dene wala khaas function)
*[setter]: The function from useState that changes the state value. (Roman Urdu: state badalne wala function)
*[controlled input]: An input whose value comes from state and updates through onChange. (Roman Urdu: jis input ki value state se aati hai)
*[event handler]: A function that runs when an event like a click or submit happens. (Roman Urdu: event hone par chalne wala function)
*[functional updater]: Passing a function to the setter so React gives you the freshest old value. (Roman Urdu: setter ko function dena taake React purana sahi value de)
