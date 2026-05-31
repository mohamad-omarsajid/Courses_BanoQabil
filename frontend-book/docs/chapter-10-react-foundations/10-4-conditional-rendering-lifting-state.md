---
lesson_id: frontend.ch10.l04
title: "10.4 Conditional rendering and lifting state up"
chapter: 10
order: 4
estimated_minutes: 45
prerequisites:
  - frontend.ch10.l03
---

# 10.4 Conditional rendering and lifting state up

So far your components always show the same thing. Real apps change what they show based on data. A logged out user sees a login form. A logged in user sees a dashboard. In this lesson you will pick UI based on data, and you will share one piece of state between many components.

## What you'll know by the end

- Show different UI based on data using a plain `if`.
- Use the ternary `{cond ? <A /> : <B />}` inside JSX.
- Use the `&&` short-circuit pattern to show something or nothing.
- Avoid the famous `0` gotcha with `&&`.
- Lift state up to the closest common parent of two components.
- Pass state down as props and pass setter functions down so children can report events.

---

## Conditional rendering patterns at a glance

There are three common ways to render UI conditionally. Here is a quick map before we look at each one.

| Pattern | Syntax | Use it when |
| --- | --- | --- |
| Early return / plain `if` | `if (...) return <A/>` | Two very different cases; clearest to read |
| Ternary | `{cond ? <A/> : <B/>}` | Two cases right inside the JSX markup |
| Short-circuit `&&` | `{cond && <A/>}` | One thing or nothing at all |

Knowing which pattern to reach for saves you time rewriting code later. Pick the one that reads most clearly for your specific situation.

---

## Showing different UI with a plain if

The simplest way to choose UI is a normal `if` before the `return`. You pick what to render, store it in a variable, then return that variable.

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back</h1>;
  }
  return <h1>Please log in</h1>;
}
```

You can also `return` early. If `isLoggedIn` is true, the function returns the first heading and stops. Otherwise it falls through to the second one. This reads clearly when the two cases are big or different.

---

## The ternary inside JSX

Sometimes you want the choice right inside the JSX. A plain `if` does not work inside JSX, but the ternary does. The ternary is `condition ? valueIfTrue : valueIfFalse`.

```jsx
function App({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}
```

React reads the part in the curly braces. If `isLoggedIn` is true, it renders `<Dashboard />`. If it is false, it renders `<Login />`. The ternary is handy for small either-or choices inside markup.

---

## The && short-circuit pattern

Often you want to show something, or show nothing at all. There is no "else" here. The `&&` operator is perfect for this.

```jsx
function App({ cart }) {
  return (
    <div>
      {cart.length > 0 && <Cart />}
    </div>
  );
}
```

Read it like this. If `cart.length > 0` is true, React renders `<Cart />`. If it is false, React renders nothing. JavaScript stops at the false part and never reaches the component. This is called short-circuit (Roman Urdu: jab && bayein ghalat value par ruk jaye) because the second part is skipped.

---

## The 0 gotcha with &&

The `&&` pattern has one trap that catches everyone. You must give it a real true or false value, not a number.

```jsx
function Bad({ count }) {
  // If count is 0, React shows the number 0 on screen.
  return <div>{count && <span>You have items</span>}</div>;
}

function Good({ count }) {
  // Compare first, so the left side is true or false.
  return <div>{count > 0 && <span>You have items</span>}</div>;
}
```

When `count` is `0`, the expression `count && ...` gives back `0`. React treats `0` as something to show, so it prints `0`. Writing `count > 0` gives back `false` instead, and React shows nothing.

!!! warning "The && and 0 gotcha"
    If you write `{items.length && <Cart />}` and the list is empty, `items.length` is `0`. React then prints `0` on the screen instead of showing nothing. Always compare first. Write `{items.length > 0 && <Cart />}` so the left side is a true or false value.

---

## Lifting state up

Now the big idea of this lesson. Two components often need the same data. A `Header` needs the cart count. A `ProductCard` needs to add to the cart. So who owns the cart state?

The answer is their closest common parent. You move the state up to the parent that contains both. This is called lifting state up (Roman Urdu: state ko qareebi mushtarka parent tak uthana). The parent owns the data. It then shares it.

This rule sums up React. Data flows down. Events flow up. The parent passes data to children as props. Children call functions to report events back to the parent.

<figure markdown>
<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lift-state" style="max-width:100%;height:auto">
  <title id="svg-lift-state">Lifting state up: the parent App owns the cart state. It passes the count down to Header as a prop, and passes an onAdd function down to ProductCard. When the user clicks Add, ProductCard calls onAdd, which updates the state in App, and the new count flows back down to Header.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="180" y="20" width="200" height="60" rx="8"/>
    <rect x="30" y="170" width="160" height="60" rx="8"/>
    <rect x="370" y="170" width="160" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="280" y="47">App</text>
    <text x="280" y="65">owns: cart state</text>
    <text x="110" y="195">Header</text>
    <text x="110" y="213">shows: count</text>
    <text x="450" y="195">ProductCard</text>
    <text x="450" y="213">calls: onAdd()</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="155" y="130">count prop (data down)</text>
    <text x="405" y="130">onAdd prop (fn down)</text>
    <text x="405" y="148">event call (up)</text>
  </g>
  <defs>
    <marker id="arr-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
    <marker id="arr-up" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#6b6b65"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-down)">
    <line x1="230" y1="82" x2="140" y2="168"/>
    <line x1="330" y1="82" x2="420" y2="168"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" stroke-dasharray="5 3" fill="none" marker-end="url(#arr-up)">
    <line x1="430" y1="170" x2="340" y2="84"/>
  </g>
</svg>
<figcaption>App owns the cart state. It passes the count down to Header (data flowing down) and passes onAdd down to ProductCard. When the user clicks, ProductCard calls onAdd, which updates state in App, and the new count flows back to Header automatically.</figcaption>
</figure>

!!! tip "Lift only as high as needed"
    Lift state to the closest common parent of the components that use it. Do not push every piece of state to the very top of your app. State that lives too high gets passed through many layers, and that becomes messy to follow.

---

## A shopping cart example

Let us build a small cart. The `App` is the parent. It owns the cart state. The `Header` shows the count. Each `ProductCard` has an "Add to cart" button.

```jsx
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <div>
      <Header count={cart.length} />
      <ProductCard name="Keyboard" onAdd={addToCart} />
      <ProductCard name="Mouse" onAdd={addToCart} />
      <ProductCard name="Headset" onAdd={addToCart} />
    </div>
  );
}
```

The `App` holds `cart` in state. The `addToCart` function adds one product to the cart. It uses `[...cart, product]` to make a new array, because you never change state directly.

Notice the props. The `Header` gets `count`, which is data flowing down. Each `ProductCard` gets `onAdd`, which is the function it can call. That is the event path flowing up.

---

## The child components

Now look at the two children. They are simple. They receive props and use them.

```jsx
function Header({ count }) {
  return (
    <header>
      <h1>My Shop</h1>
      {count > 0 && <p>Items in cart: {count}</p>}
    </header>
  );
}

function ProductCard({ name, onAdd }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <button onClick={() => onAdd(name)}>Add to cart</button>
    </div>
  );
}
```

The `Header` reads `count` and shows it. It uses `count > 0 && ...` so it stays hidden when the cart is empty. No `0` trap here.

The `ProductCard` does not own any cart state. When you click the button, it calls `onAdd(name)`. That function lives in the parent. The parent updates the cart. The new count flows back down to the `Header`, and the screen updates. One source of truth, shared cleanly.

??? note urdu "اردو میں مزید وضاحت"
    ری ایکٹ میں سب سے اہم اصول یہ ہے کہ ڈیٹا اوپر سے نیچے جاتا ہے اور ایونٹ نیچے سے اوپر جاتا ہے۔ جب دو کمپوننٹس کو ایک ہی ڈیٹا چاہیے ہو، تو وہ اسٹیٹ ان دونوں کے سب سے قریبی مشترکہ پیرنٹ میں رکھیں۔ پیرنٹ اس ڈیٹا کا مالک ہوتا ہے اور اسے پراپس کے ذریعے بچوں کو بھیجتا ہے۔ بچے ایک فنکشن کو کال کر کے پیرنٹ سے کہتے ہیں کہ ڈیٹا بدل دو۔ اسی طریقے کو اسٹیٹ کو اوپر اٹھانا یعنی lifting state up کہتے ہیں۔ `&&` والا trap یاد رکھیں: اگر بایاں حصہ صفر ہو تو اسکرین پر صفر لکھ جائے گا، اس لیے ہمیشہ پہلے موازنہ کریں جیسے `count > 0 && ...`۔

---

## Organising your React project

So far you have kept things in one or two files. That is fine while you learn.
But as soon as a project grows past a handful of components, you want a tidy
place for each kind of file. Every React project you meet, and the capstone in
Chapter 13, uses roughly this shape inside the `src` folder:

```text
src/
  components/   reusable pieces: Button, Header, ProductCard
  pages/        one file per screen: Home, Shop, Cart
  data/         plain data files, like a list of products
  hooks/        your own custom hooks (you will meet these in Chapter 14)
  lib/          small helpers, like a function that formats a price
```

One sentence per folder is all you need to remember:

- **`components`** holds the small parts you reuse on many screens.
- **`pages`** holds the full screens a user navigates between.
- **`data`** holds plain information, kept apart from the UI.
- **`hooks`** holds logic you want to share between components.
- **`lib`** holds little helper functions that are not components.

You do not need all of these on day one. Start with `components`, and add the
others when a project actually needs them. The point is simple: when you come
back next week, you know exactly where each thing lives.

---

### Try this

Build a tiny like counter that lifts state up. The `App` owns a `likes` state that starts at `0`. Pass `likes` down to a `Header` component that shows "Total likes: {likes}" only when `likes > 0`. Pass an `onLike` function down to a `LikeButton` component, and call it on click. Confirm that clicking the button updates the count shown in the header, even though the button does not own the state.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. You want to show a component or show nothing. Which pattern fits, the ternary or the `&&`?
2. Why does `{count && <X />}` print `0` when `count` is `0`, and how do you fix it?
3. Two components need the same data. Where should that state live?
4. In the cart example, how does a `ProductCard` ask the `App` to change the cart?

---

## What's next

Chapter 10 is done. You can now build components, style them with props, hold state, and share that state across your app. You understand the core flow: data goes down, events come up. The next chapter goes deeper into React in practice, like effects, fetching data, and routing.

[Next chapter: 11. React in practice &rarr;](../chapter-11-react-in-practice/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [react.dev: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[conditional rendering]: Showing different UI based on data or a condition. (Roman Urdu: data ke hisaab se alag UI dikhana)
*[short-circuit]: When `&&` stops at a false left side and skips the right side. (Roman Urdu: jab && bayein ghalat value par ruk jaye)
*[lifting state up]: Moving state to the closest common parent so children can share it. (Roman Urdu: state ko qareebi mushtarka parent tak uthana)
*[prop drilling]: Passing a prop down through many layers to reach a deep child. (Roman Urdu: prop ko kai layers se guzaar kar neeche bhejna)
*[single source of truth]: One place that owns a piece of data for the whole app. (Roman Urdu: data ka aik hi asli maalik)
