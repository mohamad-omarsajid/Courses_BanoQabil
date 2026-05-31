---
lesson_id: frontend.ch15.l02
title: "15.2 Server and client components"
chapter: 15
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch15.l01
---

# 15.2 Server and client components

In 14.1 you set up a Next.js project with the App Router. Now you will meet the big idea behind it. Every component is either a server component or a client component. This one rule shapes how your whole app runs, so let us make it clear.

## What you'll know by the end

- Why components are server components by default in the App Router.
- What a server component can and cannot do.
- How `"use client"` turns a file into a client component.
- When to pick a server component and when to pick a client component.
- How to pass data from a server component into a client component as props.
- Why you keep the `"use client"` boundary low in the tree.

---

## Server components are the default

In the App Router, every component runs on the server unless you say otherwise. You do not add any special line for this. It just happens.

```jsx
// app/page.jsx
// This is a server component. No special line needed.

export default function Page() {
  return (
    <main>
      <h1>Welcome to our shop</h1>
      <p>This page is built on the server.</p>
    </main>
  );
}
```

This file runs on the server. The server builds the HTML and sends it to the browser. The browser gets ready made HTML and very little JavaScript. That makes the page load fast.

A server component can fetch data directly. You will see that next. But it cannot use state, effects, or browser events like clicks.

---

## A server component can fetch data directly

Because the code runs on the server, you can fetch data right inside the component. You can even use `async` and `await` at the top of the function.

```jsx
// app/products/page.jsx
// Server component that loads data.

export default async function ProductsPage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

The fetch runs on the server, not in the browser. The user never waits for a second request after the page loads. The list arrives as plain HTML. No `useEffect` and no loading flag are needed here.

---

## Client components add interactivity

Some things only work in the browser. State, effects, and click handlers all need the browser. For those you make a client component. You do this by writing `"use client"` at the very top of the file.

```jsx
// app/components/Counter.jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

The line `"use client"` must be the first line in the file. It tells Next.js to ship this component to the browser. Now `useState` works, and the button responds to clicks. Without that line, this file would fail, because a server component cannot use state.

!!! warning
    You cannot use `useState`, `useEffect`, or `onClick` in a server component. If you try, Next.js will throw an error. Add `"use client"` at the very top of that file to turn it into a client component. Then those hooks and events work.

---

## Server component vs client component at a glance

Before you choose, look at the full list of what each one can and cannot do. Keep this table in mind when you plan a new component.

| Capability | Server component | Client component |
| --- | --- | --- |
| Runs on the server | Yes | No (only in the browser) |
| Runs in the browser | No | Yes |
| Can use `async / await` directly | Yes | No (must use `useEffect`) |
| Can fetch data with no extra setup | Yes | Needs a `useEffect` and a loading state |
| Can use `useState` | No | Yes |
| Can use `useEffect` | No | Yes |
| Can use `onClick`, `onChange`, etc. | No | Yes |
| Can access server-only things (env secrets, DB) | Yes | No |
| Ships JavaScript to the browser | Very little | Yes (the full component JS) |
| Good for | Pages, layouts, lists, cards, nav | Buttons, forms, toggles, search bars |

---

## When to use which

Use a server component when the content is static or comes from data. Pages, layouts, lists, and cards usually fit here. They are fast and ship less JavaScript.

Use a client component when you need interactivity. Buttons that change state, forms, toggles, and anything that listens to clicks or typing belong here.

A simple rule: start with a server component. Only switch to a client component when you actually need state, an effect, or a browser event.

This decision table gives you the quick answer:

| You need to... | Use |
| --- | --- |
| Show a list from an API | Server component |
| Show a heading or paragraph | Server component |
| Handle a click event | Client component |
| Use `useState` or `useEffect` | Client component |
| Access a database directly | Server component |
| Read a secret environment variable | Server component |
| Read browser data (localStorage, geolocation) | Client component |
| Animate something with `useRef` | Client component |

---

## Passing data into a client component

A server component can render a client component and pass data to it as props. This is allowed, but the props must be serializable (Roman Urdu: saada data jo props mein bheja ja sake). That means plain data like strings, numbers, arrays, and plain objects. You cannot pass functions.

```jsx
// app/product/[id]/page.jsx
// Server component. It fetches, then passes plain data down.

import LikeButton from "../../components/LikeButton";

export default async function ProductPage() {
  const res = await fetch("https://fakestoreapi.com/products/1");
  const product = await res.json();

  return (
    <article>
      <h1>{product.title}</h1>
      <p>Rs {product.price}</p>
      {/* productId is a number, so it is safe to pass */}
      <LikeButton productId={product.id} />
    </article>
  );
}
```

```jsx
// app/components/LikeButton.jsx
"use client";

import { useState } from "react";

export default function LikeButton({ productId }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked" : "Like"} (product {productId})
    </button>
  );
}
```

The server component does the fetching. It then passes `productId`, a plain number, into the client component. The client component handles the clicking and the state. Each part does the job it is good at.

---

## Keep the boundary low

When a file has `"use client"`, that component and everything below it becomes client code. So you want the line as low in the tree as you can put it. That way most of your app stays on the server.

<figure markdown>
<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-rsc-title" style="max-width:100%;height:auto">
  <title id="svg-rsc-title">A component tree. The Page, Header, ProductList, and ProductCard are server components with solid borders. CartButton and LikeButton are client components with dashed borders.</title>
  <g>
    <rect x="300" y="14" width="16" height="16" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <text x="324" y="27" font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c">server</text>
    <rect x="410" y="14" width="16" height="16" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="434" y="27" font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c">client</text>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="300" y="55" width="160" height="46" rx="8"/>
    <rect x="60" y="160" width="150" height="46" rx="8"/>
    <rect x="300" y="160" width="160" height="46" rx="8"/>
    <rect x="230" y="270" width="150" height="46" rx="8"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5" stroke-dasharray="4 3">
    <rect x="520" y="160" width="180" height="46" rx="8"/>
    <rect x="410" y="270" width="160" height="46" rx="8"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="14" text-anchor="middle">
    <text x="380" y="83">Page</text>
    <text x="135" y="188">Header</text>
    <text x="380" y="188">ProductList</text>
    <text x="610" y="188">CartButton</text>
    <text x="305" y="298">ProductCard</text>
    <text x="490" y="298">LikeButton</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="380" y1="101" x2="135" y2="160"/>
    <line x1="380" y1="101" x2="380" y2="160"/>
    <line x1="380" y1="101" x2="610" y2="160"/>
    <line x1="380" y1="206" x2="305" y2="270"/>
    <line x1="380" y1="206" x2="490" y2="270"/>
  </g>
</svg>
<figcaption>Most of the tree stays on the server. Only the interactive leaves, like CartButton and LikeButton, become client components. The Page, Header, ProductList, and ProductCard stay on the server, so the browser downloads less JavaScript.</figcaption>
</figure>

In this tree, the Page fetches and lays out the content. The small interactive pieces are the only client components. This is the shape you want.

Here is a second diagram showing how the server builds the HTML and sends it to the browser, and where the small client islands take over.

<figure markdown>
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-ssr-flow" style="max-width:100%;height:auto">
  <title id="svg-ssr-flow">Data flow from server to browser. The server runs server components, builds HTML, and sends it. The browser receives the HTML and hydrates only the client components.</title>
  <defs>
    <marker id="arr-sc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="40" width="200" height="180" rx="10"/>
    <rect x="500" y="40" width="200" height="180" rx="10"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="120" y="35">Server</text>
    <text x="600" y="35">Browser</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="120" y="80">1. Run server components</text>
    <text x="120" y="100">   (fetch data, render)</text>
    <text x="120" y="130">2. Build full HTML string</text>
    <text x="120" y="170">3. Send HTML + small</text>
    <text x="120" y="190">   JS bundle to browser</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="600" y="80">4. Browser shows HTML</text>
    <text x="600" y="100">   immediately (fast)</text>
    <text x="600" y="140">5. Hydrate only the</text>
    <text x="600" y="160">   client components</text>
    <text x="600" y="180">   (buttons, forms)</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-sc)">
    <line x1="222" y1="130" x2="498" y2="130"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="360" y="122">HTML + JS</text>
  </g>
</svg>
<figcaption>The server does the heavy lifting: runs the components, fetches data, builds the HTML. The browser gets a finished page fast, then activates only the interactive client pieces.</figcaption>
</figure>

!!! tip
    Keep the `"use client"` boundary as low in the tree as possible. When you put it on a small leaf, like a single button, most of your components stay on the server. Your app then ships less JavaScript and loads faster.

??? note urdu "اردو میں مزید وضاحت"
    نیکسٹ جے ایس کے ایپ راؤٹر میں ہر کمپوننٹ پہلے سے سرور کمپوننٹ ہوتا ہے، یعنی وہ سرور پر چلتا ہے۔ سرور کمپوننٹ سیدھا ڈیٹا حاصل کر سکتا ہے، لیکن اس میں اسٹیٹ، ایفیکٹ یا کلک جیسی چیزیں استعمال نہیں ہو سکتیں۔ جب آپ کو یہ سب چاہیے ہوں، تو فائل کے بالکل شروع میں "use client" لکھیں، اس سے وہ کلائنٹ کمپوننٹ بن جاتی ہے۔ کوشش کریں کہ یہ لائن درخت میں جتنا نیچے ہو سکے، رکھیں، تاکہ زیادہ تر کمپوننٹ سرور پر رہیں۔

---

## Common mistakes

Watch out for these three mistakes. They trip up almost everyone at first.

```jsx
// MISTAKE 1: useState in a server component.
// This file has no "use client", so it is a server component.
import { useState } from "react";

export default function Broken() {
  const [open, setOpen] = useState(false); // error
  return <div>{open ? "Open" : "Closed"}</div>;
}
```

The fix is to add `"use client"` at the top of that file. State only works in client components.

A second mistake is putting `"use client"` at the top of your whole app, like the root layout. That turns everything into client code and you lose the speed benefit. Keep the line low, on small pieces.

A third mistake is importing a server only thing, like direct database code, inside a client component. The client runs in the browser, so it cannot reach the server directly. Keep that data work in server components, then pass plain props down.

---

### Try this

In your Next.js project, make a server component page that shows a heading and some text, with no `"use client"` line. Then build a separate `Counter` client component in its own file with `"use client"` at the top, using `useState` for a click count. Import the counter into your server page and render it. Confirm the page works and the button counts. Now try moving `"use client"` onto the page itself and notice you no longer need it there: keep the boundary low, on the counter only.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. In the App Router, is a new component a server component or a client component by default?
2. Which line do you add, and where, to make a file a client component?
3. Name one thing a server component cannot do that a client component can.
4. Why do you keep the `"use client"` boundary low in the tree?

---

## What's next

You now know who runs where, server or browser. Next you will see how to fetch data the right way and how to change data from the server with server actions. That is where the App Router really starts to feel powerful.

[Next lesson: 14.3 Data fetching and server actions &rarr;](15-3-data-fetching-server-actions.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [react.dev: Server Components](https://react.dev/reference/rsc/server-components)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[server component]: A component that runs on the server, can fetch data directly, and ships little JavaScript. (Roman Urdu: server par chalne wala component)
*[client component]: A component that runs in the browser and can use state, effects, and clicks. (Roman Urdu: browser mein chalne wala interactive component)
*["use client"]: A line at the top of a file that turns it into a client component. (Roman Urdu: file ko client component banane wali line)
*[serializable]: Plain data like strings, numbers, arrays, and objects that can be passed as props. (Roman Urdu: saada data jo props mein bheja ja sake)
*[boundary]: The point in the tree where server code switches to client code. (Roman Urdu: woh jagah jahan server se client shuru hota hai)
*[hydration]: The step where the browser attaches JavaScript behaviour to the server-rendered HTML. (Roman Urdu: browser mein HTML ko interactive banana)
