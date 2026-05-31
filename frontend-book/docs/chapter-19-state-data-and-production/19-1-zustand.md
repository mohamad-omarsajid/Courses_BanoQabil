---
lesson_id: frontend.ch19.l01
title: "19.1 Zustand for state"
chapter: 19
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch18.l04
---

# 19.1 Zustand for state

In the ecommerce project you used Context for the cart. It worked, but it felt verbose. Every component that read the cart also re-rendered when anything changed. Now you will meet Zustand, a tiny state library that fixes both problems with very little code.

## What you'll know by the end

- Why Context can cause extra re-renders for state that changes often.
- How Zustand, Redux Toolkit, Jotai, and Context compare in one line each.
- How to create a Zustand store with `create` and `set`.
- How to read a slice of the store with a selector to avoid extra re-renders.
- How the `persist` middleware saves your store to localStorage automatically.
- How to refactor the cart into a Zustand store with `items`, `addItem`, `removeItem`, and a total.

---

## Why use a state library

Context is built into React. It is great for values that rarely change, like the theme or the logged-in user. You set it once and forget it.

But the cart changes often. A user adds items, removes items, and changes amounts all the time. Every change to a Context value re-renders every component that reads that Context. Even a component that only needs the total re-renders when the item list changes. That is wasted work.

Context also gets verbose. You write a Provider, a context object, a custom hook, and a reducer. That is a lot of files for one cart.

A state library is simpler and faster for app-wide state that changes often. It lets each component read only the part it needs. So it re-renders only when that part changes.

---

## Comparing your options

Here is a side-by-side view of the four tools so you can see at a glance why you are picking Zustand.

| Tool | Bundle size | Setup effort | Best for | Provider needed? |
|------|-------------|--------------|----------|-----------------|
| **Zustand** | ~1 kB | Very low, just `create` | Most apps: shared state that changes often | No |
| **Redux Toolkit** | ~15 kB | High: slices, reducers, store config | Large apps with many teams and complex flows | Yes |
| **Jotai** | ~3 kB | Low: one atom per value | Fine-grained state built from small atoms | No |
| **Context** | 0 (built-in) | Medium: Provider + hook + optional reducer | Rarely-changing values like theme or current user | Yes |

For this course you will use Zustand. It has the least code and the gentlest learning curve.

!!! warning
    Do not reach for a state library on a small app. `useState` and Context are enough until they are not. Add Zustand when you feel the pain of shared, fast-changing state, not before.

---

## How Zustand is different from Context

With React Context, every consumer re-renders when anything in the context changes. You also need a Provider component wrapping your tree.

Zustand works differently. The store is just a plain module sitting outside the React tree. Any component can reach it directly, with no Provider. Each component selects only the slice it needs, so it only re-renders when that specific slice changes.

<figure markdown>
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-zustand-store" style="max-width:100%;height:auto">
  <title id="svg-zustand-store">A Zustand store sitting outside the React component tree. Three components each reach directly into the store and select only the slice they need, with no Provider wrapping them.</title>
  <defs>
    <marker id="z-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="260" y="20" width="180" height="100" rx="8"/>
    <rect x="30" y="220" width="160" height="70" rx="8"/>
    <rect x="270" y="220" width="160" height="70" rx="8"/>
    <rect x="510" y="220" width="160" height="70" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="350" y="48">Zustand Store</text>
    <text x="350" y="68">(outside React tree)</text>
    <text x="350" y="88">items: [...]</text>
    <text x="350" y="106">addItem / removeItem</text>
    <text x="110" y="250">CartSummary</text>
    <text x="110" y="268">selects: items</text>
    <text x="350" y="250">TotalBadge</text>
    <text x="350" y="268">selects: total()</text>
    <text x="590" y="250">AddToCart btn</text>
    <text x="590" y="268">selects: addItem</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#z-arrow)">
    <line x1="110" y1="218" x2="280" y2="122"/>
    <line x1="350" y1="218" x2="350" y2="122"/>
    <line x1="590" y1="218" x2="420" y2="122"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="350" y="330">No Provider wrapper needed. Each component reads only its slice.</text>
  </g>
</svg>
<figcaption>The Zustand store lives outside your component tree as a plain module. Any component can reach in and read only the slice it needs. There is no Provider to wrap.</figcaption>
</figure>

With Context, a change anywhere in the context re-renders every subscriber. With Zustand, a change to `items` only re-renders components that selected `items`. A button that only selected `addItem` stays completely still.

---

## Setting up a store with `create`

First, install Zustand in your project.

```bash
npm install zustand
```

This adds Zustand to your `package.json`. It is very small, so it will not bloat your app.

Now you create a store. A store is one object that holds your state and the functions that change it. You build it with the `create` function.

```jsx
import { create } from "zustand";

const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

Look at the shape. You pass `create` a function that returns an object. The object has state (`count`) and functions that change it (`increase`, `reset`). Each function calls `set` to update the state.

`set` works two ways. You can pass it the new values directly, like `set({ count: 0 })`. Or you can pass a function that gets the current state, like `set((state) => ({ count: state.count + 1 }))`. Use the function form when the new value depends on the old value.

The result is a hook called `useCounterStore`. You will use it inside components next.

---

## Using the store with a selector

You call the store hook inside a component. The smart move is to select only the slice you need. A selector is a small function that picks one piece of the store.

```jsx
function CountLabel() {
  const count = useCounterStore((state) => state.count);
  return <p>Count: {count}</p>;
}

function IncreaseButton() {
  const increase = useCounterStore((state) => state.increase);
  return <button onClick={increase}>Add one</button>;
}
```

`useCounterStore((state) => state.count)` reads only `count`. `useCounterStore((state) => state.increase)` reads only the function.

Why does selecting a slice matter? Because Zustand re-renders a component only when its selected slice changes. The `IncreaseButton` selects `increase`, which never changes. So that button never re-renders, even as the count goes up and down. That is the speed win over Context.

Here is a quick summary of how the two `set` forms work:

| `set` form | When to use | Example |
|------------|-------------|---------|
| `set({ key: value })` | New value does not depend on old value | `set({ count: 0 })` |
| `set((state) => ({ key: ... }))` | New value depends on old value | `set((s) => ({ count: s.count + 1 }))` |
| `get()` inside the store | Reading state from a non-`set` function | `get().items.reduce(...)` |

!!! tip
    Select only the slice of the store a component needs. Then it re-renders only when that slice changes. Avoid selecting the whole state object, because that re-renders on every change.

---

## Saving state with the `persist` middleware

Back in lesson 13.3 you saved the cart to localStorage by hand. You wrote effects and parsed JSON yourself. Zustand can do all of that for you with a middleware.

Middleware is code that wraps your store to add extra behavior. The `persist` middleware saves your store to localStorage automatically. It also loads the saved state when the app starts.

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "counter-storage" }
  )
);
```

You wrap your normal store function inside `persist(...)`. The second argument is an options object. The `name` is the key used in localStorage. Now the count survives a page refresh, with no effects and no manual JSON.

---

## Worked example: the cart as a Zustand store

Now you will refactor the ecommerce cart from Chapters 12 and 13. The store holds `items`, plus `addItem`, `removeItem`, and a `total`. It also uses `persist` so the cart survives a refresh.

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const found = state.items.find((i) => i.id === product.id);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: "cart-storage" }
  )
);
```

Read it slowly. `items` starts as an empty array. `addItem` checks if the product is already in the cart. If yes, it raises the amount. If no, it adds the product with `qty` set to 1.

`removeItem` keeps every item except the one with the matching `id`. Notice `total` is a function. It uses `get()` to read the current items, then sums `price * qty`. You call it as `total()`, not `total`.

Now use the store in a component with selectors.

```jsx
import { useCartStore } from "./cartStore";

function CartSummary() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore((state) => state.total);

  return (
    <div>
      <h2>Your cart</h2>
      {items.map((item) => (
        <div key={item.id}>
          <span>
            {item.title} x {item.qty}
          </span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: Rs {total()}</p>
    </div>
  );
}
```

Each line selects one slice. `items` is the array, `removeItem` is the function, and `total` is the total function. The component re-renders when `items` changes, which is exactly what you want. Compare this to the Context version. There is no Provider to wrap, and far less code.

Here is the full comparison so you can see the difference at a glance:

| Concern | React Context approach | Zustand approach |
|---------|----------------------|-----------------|
| Where state lives | Context object, inside React tree | Plain module, outside React tree |
| How to provide it | Wrap app in a Provider component | Nothing to wrap |
| How to read it | `useContext(CartContext)` | `useCartStore((s) => s.items)` |
| Re-render scope | Every consumer re-renders on any change | Only components whose slice changed |
| Persist to localStorage | Write your own `useEffect` | Wrap store with `persist` middleware |
| Lines of setup | Provider + context + hook + reducer | One `create(...)` call |

??? note urdu "اردو میں مزید وضاحت"
    Zustand میں آپ ایک "store" بناتے ہیں جو آپ کی state اور اسے بدلنے والے فنکشن ایک ہی جگہ رکھتا ہے۔ یہ store React tree کے باہر ہوتا ہے، اس لیے کوئی Provider wrap کرنے کی ضرورت نہیں۔ جب آپ کسی component میں store استعمال کرتے ہیں تو "selector" کے ذریعے صرف وہی حصہ منتخب کریں جس کی آپ کو ضرورت ہے، جیسے items یا total۔ ایسا کرنے سے component صرف اسی وقت دوبارہ render ہوتا ہے جب وہ مخصوص حصہ بدلے۔ Context میں کوئی بھی تبدیلی تمام consumers کو re-render کراتی ہے، لیکن Zustand میں صرف متعلقہ component بدلتا ہے، جو اسے تیز بناتا ہے۔

---

### Try this

Build a small counter store with Zustand. Create a store with `create` that holds a `count` plus `increase` and `reset` functions. Then make two components: a `CountLabel` that selects only `count`, and a `Buttons` component that selects only `increase` and `reset`. Click the buttons and watch the count update. As a bonus, wrap the store in the `persist` middleware so the count survives a page refresh.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why can Context cause extra re-renders for fast-changing state like a cart?
2. What does a selector like `useCartStore((state) => state.items)` do, and why is it better than reading the whole store?
3. What does the `persist` middleware save, and where does it save it?
4. In the cart store, why is `total` written as a function that you call as `total()`?

---

## What's next

You now manage client state with Zustand. But most real apps also load data from a server, like a product list from an API. That kind of state has its own rules, like caching and refetching. In the next lesson you will use TanStack Query to handle server state the clean way.

[Next lesson: 18.2 TanStack Query for server state &rarr;](19-2-tanstack-query.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Zustand docs](https://zustand.docs.pmnd.rs/)
- [Zustand persist middleware](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Zustand]: A tiny state management library for React. (Roman Urdu: chhoti aur asaan state library)
*[store]: One object that holds your shared state and the functions that change it. (Roman Urdu: state rakhne wala markazi object)
*[selector]: A small function that picks one slice of the store so a component reads only what it needs. (Roman Urdu: store ka sirf zaroori hissa chunne wala function)
*[middleware]: Code that wraps your store to add extra behavior, like saving to localStorage. (Roman Urdu: store ke gird lipta hua extra feature)
*[Redux]: A powerful state library that needs more setup, good for large apps. (Roman Urdu: bari apps ke liye taqatwar state library)
