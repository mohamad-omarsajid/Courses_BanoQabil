---
lesson_id: frontend.ch14.l03
title: "14.3 Context API in depth"
chapter: 14
order: 3
estimated_minutes: 45
prerequisites:
  - frontend.ch14.l02
---

# 14.3 Context API in depth

Imagine you carry a glass of water from the front door to the kitchen. You pass it through five rooms, but only the kitchen needs it. That is what happens when you pass props through many components that do not use them. Context fixes this. In Chapter 13 you saw a light cart context, and now you will build a proper one.

## What you'll know by the end

- What prop drilling is and why it gets painful
- When to use Context, when to lift state, and when to reach for a state library
- How to create a Context with `createContext` and a Provider
- How to read a Context with a custom hook like `useCart`
- Why a custom hook should throw an error outside its provider
- Why every consumer re-renders, and how to keep that under control

---

## The problem: prop drilling

Props flow from parent to child. That works fine for one or two levels. But some data is needed deep down the tree. Think of the current user, the theme, or the cart.

Look at this pain.

```jsx
function App() {
  const [cart, setCart] = useState([]);
  return <Page cart={cart} setCart={setCart} />;
}

function Page({ cart, setCart }) {
  // Page does not use cart. It just passes it down.
  return <Navbar cart={cart} setCart={setCart} />;
}

function Navbar({ cart, setCart }) {
  // Navbar also just passes it down.
  return <CartIcon cart={cart} setCart={setCart} />;
}

function CartIcon({ cart }) {
  return <span>{cart.length}</span>;
}
```

`Page` and `Navbar` do not care about the cart. They only pass it along. This is prop drilling (Roman Urdu: prop ko unn components se guzaarna jo use nahi karte). When you add a new prop, you must edit every layer in between. That gets boring and easy to break.

---

## Prop drilling vs Context: side by side

<figure markdown>
<svg viewBox="0 0 740 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-prop-vs-ctx" style="max-width:100%;height:auto">
  <title id="svg-prop-vs-ctx">Left side shows prop drilling: cart prop passed from App through Page, Navbar, CartIcon. Right side shows Context: CartProvider wraps the tree and CartIcon reads directly with useCart.</title>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="22">Prop drilling</text>
    <text x="560" y="22">Context</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="100" y="38" width="140" height="36" rx="6"/>
    <rect x="100" y="108" width="140" height="36" rx="6"/>
    <rect x="100" y="178" width="140" height="36" rx="6"/>
    <rect x="100" y="248" width="140" height="36" rx="6"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#f4f4f1">
    <rect x="390" y="28" width="300" height="290" rx="8"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="470" y="60" width="140" height="36" rx="6"/>
    <rect x="470" y="130" width="140" height="36" rx="6"/>
    <rect x="470" y="200" width="140" height="36" rx="6"/>
    <rect x="470" y="270" width="140" height="36" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="61">App</text>
    <text x="170" y="131">Page</text>
    <text x="170" y="201">Navbar</text>
    <text x="170" y="271">CartIcon</text>
    <text x="415" y="48" font-size="11" fill="#6b6b65">CartProvider</text>
    <text x="540" y="83">App</text>
    <text x="540" y="153">Page</text>
    <text x="540" y="223">Navbar</text>
    <text x="540" y="293">CartIcon</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="170" y="76">cart, setCart</text>
    <text x="170" y="146">cart, setCart</text>
    <text x="170" y="216">cart, setCart</text>
    <text x="170" y="286">reads cart</text>
  </g>
  <defs>
    <marker id="arr-ctx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-ctx)">
    <line x1="170" y1="74" x2="170" y2="106"/>
    <line x1="170" y1="144" x2="170" y2="176"/>
    <line x1="170" y1="214" x2="170" y2="246"/>
    <line x1="540" y1="96" x2="540" y2="128"/>
    <line x1="540" y1="166" x2="540" y2="198"/>
    <line x1="540" y1="236" x2="540" y2="268"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" stroke-dasharray="5 3" fill="none" marker-end="url(#arr-ctx)">
    <path d="M 690 175 Q 730 175 730 288 Q 730 305 612 288" />
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#1f1f1c" text-anchor="middle">
    <text x="700" y="240">useCart()</text>
    <text x="700" y="254">reads directly</text>
  </g>
</svg>
<figcaption>Prop drilling carries data through every layer. Context lets a deep consumer read it directly, skipping all the in-between components.</figcaption>
</figure>

---

## When to use Context (and when not to)

Context is not always the answer. Pick the right tool for the job.

- **Lift state up** when a few close components share data. If a parent and two children need a value, hold it in the parent. This is the default. Reach for it first.
- **Use Context** for app-wide data that many far-apart components read. Good examples are the current user, the theme (dark or light), and the cart.
- **Use a state library** like Zustand or Redux only for large, complex apps with lots of shared state. You do not need these yet. Just know the names exist.

For most beginner projects, lifting state covers 90 percent of cases. Context covers the rest.

### When to use what

| Situation | Best tool | Why |
| --- | --- | --- |
| Two or three nearby components share a value | Lift state to their common parent | Simple, no extra setup |
| Many far-apart components read the same value | Context | Avoids prop drilling across many layers |
| The value changes often and many things read it | Split Contexts or a state library | Context re-renders every reader; batching reads by topic is faster |
| A large app with complex async state (shopping, auth flows) | Zustand, Redux Toolkit | Built for performance and devtools at that scale |
| A single component needs its own private data | Local `useState` | Keep state close to where it is used |

---

## Creating a Context step by step

A Context has three parts. You build them in order.

First, create the Context object.

```jsx
import { createContext } from "react";

// This holds the shared value. Start with null as the default.
const CartContext = createContext(null);
```

`createContext` makes a box that any component can read from later. The `null` is just the value used if no Provider is found.

Next, build a Provider component. It holds the real state and passes it down.

```jsx
import { useState } from "react";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product) {
    setCart((current) => [...current, product]);
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  const value = { cart, addItem, removeItem };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

`CartProvider` owns the state with `useState`. It bundles the cart and the helper functions into one `value` object. The `value` prop is what every child can read. `children` is whatever you wrap inside the provider.

Now wrap your app so everything inside can use the cart.

```jsx
function App() {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
}
```

Notice that `Page` no longer receives any cart props. The provider sits above it and shares the value through Context.

---

## Provider wrapping the component tree

<figure markdown>
<svg viewBox="0 0 660 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-provider-tree" style="max-width:100%;height:auto">
  <title id="svg-provider-tree">CartProvider wraps the whole tree. App, Navbar, ProductList, and CartSummary sit inside. CartIcon inside Navbar and ProductList both have arrows pointing outward to a cart value circle to show they read from Context directly.</title>
  <g stroke="#1f1f1c" stroke-width="2" fill="#f4f4f1">
    <rect x="20" y="20" width="620" height="340" rx="12"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="330" y="46">CartProvider</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="240" y="60" width="140" height="36" rx="6"/>
    <rect x="60" y="140" width="130" height="36" rx="6"/>
    <rect x="240" y="140" width="130" height="36" rx="6"/>
    <rect x="460" y="140" width="130" height="36" rx="6"/>
    <rect x="60" y="230" width="130" height="36" rx="6"/>
    <rect x="240" y="230" width="130" height="36" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="310" y="83">App</text>
    <text x="125" y="163">Navbar</text>
    <text x="305" y="163">ProductList</text>
    <text x="525" y="163">CartSummary</text>
    <text x="125" y="253">CartIcon</text>
    <text x="305" y="253">ProductCard</text>
  </g>
  <defs>
    <marker id="arr-tree" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
    <marker id="arr-ctx2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#6b6b65"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-tree)">
    <line x1="310" y1="96" x2="190" y2="138"/>
    <line x1="310" y1="96" x2="305" y2="138"/>
    <line x1="310" y1="96" x2="430" y2="138"/>
    <line x1="125" y1="176" x2="125" y2="228"/>
    <line x1="305" y1="176" x2="305" y2="228"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" stroke-dasharray="5 3" fill="none" marker-end="url(#arr-ctx2)">
    <line x1="125" y1="266" x2="125" y2="310"/>
    <line x1="305" y1="266" x2="305" y2="310"/>
    <line x1="525" y1="176" x2="525" y2="310"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" fill="none">
    <line x1="125" y1="310" x2="525" y2="310"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="330" y="330">useCart() reads context directly</text>
    <text x="330" y="344">no props passed through middle layers</text>
  </g>
</svg>
<figcaption>CartProvider wraps the tree once at the top. Any component deep inside can call useCart() and read the value directly, with no prop passing needed.</figcaption>
</figure>

---

## Reading the Context with a custom hook

You could call `useContext(CartContext)` everywhere. But a custom hook is cleaner and safer.

```jsx
import { useContext } from "react";

function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
```

This hook reads the Context value. If a component uses it outside the provider, `context` is `null`. The clear error message tells you exactly what went wrong. Without this check, you would get a confusing crash later.

Now any component reads the cart with one line. No prop drilling.

```jsx
function CartIcon() {
  const { cart } = useCart();
  return <span>{cart.length}</span>;
}

function AddButton({ product }) {
  const { addItem } = useCart();
  return <button onClick={() => addItem(product)}>Add to cart</button>;
}
```

`CartIcon` and `AddButton` sit deep in the tree. Neither got a single prop passed down. They just ask for the cart and use it.

!!! tip
    Always wrap `useContext` in a custom hook like `useCart` that throws if used outside the provider. This catches mistakes early with a clear message, instead of a strange `null` error somewhere far away.

---

## The performance gotcha

Context has one big rule you must respect. Every component that reads the context re-renders when the value changes.

So if your cart context also holds the user, the theme, and the language, then changing the cart re-renders components that only care about the theme. That is wasted work.

There are two fixes.

First, split your contexts. Keep a `CartContext`, a separate `UserContext`, and a separate `ThemeContext`. Each one re-renders only its own readers.

Second, memoize the value object. In 13.1 you learned `useMemo`. Use it so the `value` object stays the same between renders unless its data really changed.

```jsx
import { useState, useMemo } from "react";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product) {
    setCart((current) => [...current, product]);
  }

  // useMemo keeps value stable unless cart changes.
  const value = useMemo(() => ({ cart, addItem }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

Without `useMemo`, the `value` object is rebuilt on every render. That can trigger extra re-renders in consumers. With `useMemo`, the object only changes when `cart` changes.

!!! warning
    Every consumer re-renders when the context value changes. Do not pour unrelated data into one giant context. Split contexts by topic so a cart change does not re-render your theme components.

??? note urdu "اردو میں مزید وضاحت"
    Context کا سب سے اہم اصول یہ ہے کہ جو بھی component Context کی value پڑھتا ہے، وہ value بدلنے پر دوبارہ render ہوتا ہے۔ اس لیے ساری معلومات ایک ہی بڑے Context میں مت رکھیں۔ مثال کے طور پر، cart، user، اور theme کو الگ الگ Context میں رکھیں۔ ساتھ ہی value object کو `useMemo` کے ساتھ cache کریں تاکہ غیر ضروری render نہ ہوں۔ Props والا طریقہ چھوٹے apps کے لیے ٹھیک ہے، لیکن جب data بہت گہرائی میں جانا ہو تو Context بہترین انتخاب ہے۔ بہت بڑے apps کے لیے Zustand جیسی library زیادہ موزوں ہے۔

---

## Worked example: refactor the Chapter 13 cart

In Chapter 13 the cart lived in one page and was passed around with props. Let us move it to a proper Context. Then any page can read or change it.

Here is the full setup in one file.

```jsx
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product) {
    setCart((current) => [...current, product]);
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const value = useMemo(
    () => ({ cart, addItem, removeItem, total }),
    [cart, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
```

This file owns everything about the cart. It exports `CartProvider` and `useCart`. Note that `total` is computed from the cart, so you never store it twice.

Now wrap the whole app once.

```jsx
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
      <CartSummary />
    </CartProvider>
  );
}
```

Finally, each component reads only what it needs.

```jsx
function ProductList() {
  const { addItem } = useCart();
  const products = [
    { id: 1, name: "Mug", price: 500 },
    { id: 2, name: "Cap", price: 800 },
  ];
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - Rs {p.price}
          <button onClick={() => addItem(p)}>Add</button>
        </li>
      ))}
    </ul>
  );
}

function CartSummary() {
  const { cart, removeItem, total } = useCart();
  return (
    <div>
      <h2>Cart ({cart.length})</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: Rs {total}</p>
    </div>
  );
}
```

`ProductList` adds items. `CartSummary` reads and removes them. They sit in different parts of the tree, yet they share one cart. No props travel between them. That is the whole point of Context.

---

### Try this

Build a `ThemeContext` from scratch. Make a `ThemeProvider` that holds a `theme` value of `"light"` or `"dark"` in state and gives a function to toggle it. Write a `useTheme` hook that throws a clear error if it runs outside the provider. Then make two components in different parts of the tree: a button that toggles the theme, and a panel that reads the theme and shows a different background. Confirm that neither component passes a prop to the other.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is prop drilling, and why does it become a problem in big apps?
2. When should you lift state up instead of using Context?
3. Why should your `useCart` hook throw an error if it runs outside the provider?
4. What happens to a component when the context value it reads changes, and how do you limit the damage?
5. Name one situation where a state library is the better choice over Context.

---

## What's next

Right now your app is one screen. Real sites have many pages like Home, Products, and Cart. In 13.4 you will learn React Router. It lets you show different pages based on the URL, while your Context keeps the cart shared across all of them.

[Next lesson: 13.4 React Router &rarr;](14-4-react-router.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Passing Data Deeply with Context (react.dev)](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling Up with Reducer and Context (react.dev)](https://react.dev/learn/scaling-up-with-reducer-and-context)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Context]: A way to share data across many components without passing props by hand. (Roman Urdu: data share karne ka tareeqa bina props ke)
*[createContext]: The React function that creates a Context object. (Roman Urdu: Context banane wala function)
*[provider]: A component that holds the value and shares it with everything inside it. (Roman Urdu: value rakh kar neeche bhejne wala component)
*[consumer]: Any component that reads the value from a Context. (Roman Urdu: jo component Context ki value parhta hai)
*[prop drilling]: Passing a prop through many components that do not use it. (Roman Urdu: prop ko unn components se guzaarna jo use nahi karte)
*[useContext]: The React hook that reads the current value from a Context. (Roman Urdu: Context ki value parhne wala hook)
