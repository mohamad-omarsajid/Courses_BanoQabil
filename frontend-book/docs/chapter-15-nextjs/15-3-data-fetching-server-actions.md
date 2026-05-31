---
lesson_id: frontend.ch15.l03
title: "15.3 Data fetching and server actions"
chapter: 15
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch15.l02
---

# 15.3 Data fetching and server actions

In Chapter 11 you fetched data with `useEffect` and a loading state. That worked, but it felt like a lot of steps. Next.js gives you a simpler way for the first load. You can fetch right inside a server component, and you can handle forms without any API route. Let us see how.

## What you'll know by the end

- How to fetch data inside an async server component with `await`.
- Why this is simpler than the `useEffect` way for initial data.
- How a server action handles a form on the server.
- How to write a small server action that takes form data.
- How Next caches fetches and how to revalidate them.
- How `loading.js` and Suspense show loading UI for you.

---

## Fetching data in a server component

Remember the `useEffect` fetch from Chapter 11? You made a state, started loading, fetched, then saved the result. Many steps. In Next.js you can skip most of that for the first load.

A server component can be an `async` function. So you just `await` the fetch right inside it.

```jsx
// app/products/page.js
// This is a server component by default.

async function ProductsPage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <div>
      <h1>Our products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
```

Look closely. There is no `useState`. There is no `useEffect`. There is no loading state. The server runs this function, waits for the fetch to finish, then builds the HTML. The browser receives a finished page with the products already inside.

This is why the server way is simpler for initial data. The server does the waiting, and the user gets a full page.

Here is a diagram of what happens on the server before the response reaches the browser.

<figure markdown>
<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-sfetch-title" style="max-width:100%;height:auto">
  <title id="svg-sfetch-title">Server fetch flow. Browser sends a request. Server runs the async component, calls fetch, waits for the API, builds the HTML, then sends the finished HTML to the browser.</title>
  <defs>
    <marker id="arr-sf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="10" y="70" width="110" height="60" rx="8"/>
    <rect x="180" y="70" width="130" height="60" rx="8"/>
    <rect x="380" y="70" width="120" height="60" rx="8"/>
    <rect x="570" y="70" width="130" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="65" y="97">Browser</text>
    <text x="65" y="113">sends request</text>
    <text x="245" y="91">Server runs</text>
    <text x="245" y="107">async component</text>
    <text x="245" y="123">+ fetch()</text>
    <text x="440" y="97">External API</text>
    <text x="440" y="113">returns data</text>
    <text x="635" y="97">Server builds</text>
    <text x="635" y="113">full HTML</text>
    <text x="635" y="129">sends it back</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-sf)">
    <line x1="122" y1="100" x2="178" y2="100"/>
    <line x1="312" y1="100" x2="378" y2="100"/>
    <line x1="502" y1="100" x2="568" y2="100"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="360" y="170">All of this happens on the server. The browser gets one finished response with real content.</text>
  </g>
</svg>
<figcaption>The server runs the async component, calls your fetch, waits for the API to reply, and then builds the complete HTML. The browser receives one finished response, not an empty shell.</figcaption>
</figure>

!!! tip
    To fetch initial data, make your server component an `async` function and `await` the fetch inside it. You do not need `useEffect` or a loading state for that first load.

---

## Server way versus the useEffect way

Let us compare the two side by side so the difference is clear.

```jsx
// The old client way (Chapter 11). This runs in the browser.
"use client";
import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{products.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

The client way needs two states and an effect. The browser loads, shows "Loading", then fetches, then shows the data. The user waits and sees an empty page first.

The server way needs none of that. The data is ready before the page reaches the browser. Use the server way for data you need on the first load. Keep `useEffect` for data that changes after a user clicks something.

---

## Caching and revalidation at a glance

Next caches your `fetch` results by default. So if two pages fetch the same URL, Next can reuse the result. This makes pages faster.

Sometimes you want fresh data. You can change the fetch with options.

```jsx
// Cache this fetch, but refresh it every 60 seconds.
const res = await fetch("https://fakestoreapi.com/products", {
  next: { revalidate: 60 },
});

// Or never cache. Always get fresh data.
const live = await fetch("https://api.example.com/price", {
  cache: "no-store",
});
```

The `{ next: { revalidate: 60 } }` option tells Next to refresh the data every 60 seconds. The `{ cache: "no-store" }` option turns caching off, so you always get the latest. You do not need to memorize these now. Just know they exist.

Here are the three rendering strategies side by side, so you know when to use each:

| Strategy | How to enable it | HTML built when | Good for |
| --- | --- | --- | --- |
| Static (default) | Just `fetch(url)` with no options | Once at `next build` | Docs, marketing pages, blogs |
| Incremental revalidation | `{ next: { revalidate: N } }` | Rebuilt silently after N seconds | Product listings, news feeds |
| Dynamic (always fresh) | `{ cache: "no-store" }` or reading cookies/headers | On every request | User dashboards, live prices |

When two pages fetch the same URL in the same render, Next.js deduplicates the call and only hits the network once. That is free and automatic.

---

## Server actions for forms

Before, to handle a form you wrote an API route, then sent a `fetch` to it. That is a lot of wiring. A server action removes that wiring.

A server action is a function with `"use server"` at the top. It runs on the server when a form is submitted. You set it as the form's `action`.

```jsx
// app/contact/page.js

async function saveName(formData) {
  "use server";
  const name = formData.get("name");
  console.log("New name received:", name);
  // Here you could save name to a database.
}

function ContactPage() {
  return (
    <form action={saveName}>
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Save</button>
    </form>
  );
}

export default ContactPage;
```

When the user types a name and clicks Save, Next runs `saveName` on the server. It reads the name with `formData.get("name")`. You did not write an API route, and you did not write a browser `fetch`. The form just works.

The `formData` object holds the form fields. You read each field by its `name` attribute.

Here is a diagram of the full server action flow so you can see where each step runs.

<figure markdown>
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-sa-flow" style="max-width:100%;height:auto">
  <title id="svg-sa-flow">Server action flow. User fills in the form and clicks submit. The browser sends the form data to Next.js. Next.js calls the server action function. The function reads formData, optionally updates the database, and Next.js refreshes the page.</title>
  <defs>
    <marker id="arr-sa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="10" y="80" width="120" height="60" rx="8"/>
    <rect x="200" y="80" width="140" height="60" rx="8"/>
    <rect x="420" y="80" width="140" height="60" rx="8"/>
    <rect x="580" y="80" width="120" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="70" y="105">User fills</text>
    <text x="70" y="121">form and</text>
    <text x="70" y="137">clicks Submit</text>
    <text x="270" y="101">Browser sends</text>
    <text x="270" y="117">form data to</text>
    <text x="270" y="133">Next.js server</text>
    <text x="490" y="101">Server action</text>
    <text x="490" y="117">runs on server</text>
    <text x="490" y="133">reads formData</text>
    <text x="640" y="101">Page</text>
    <text x="640" y="117">refreshes</text>
    <text x="640" y="133">with new data</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-sa)">
    <line x1="132" y1="110" x2="198" y2="110"/>
    <line x1="342" y1="110" x2="418" y2="110"/>
    <line x1="562" y1="110" x2="578" y2="110"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="165" y="172">no API route needed</text>
    <text x="490" y="172">optional: save to DB</text>
    <text x="360" y="230">Everything between the browser and the server action is handled by Next.js.</text>
  </g>
</svg>
<figcaption>A server action cuts out the API route entirely. The browser submits the form, Next.js calls your function on the server, and you read the data with formData.get. No manual fetch needed.</figcaption>
</figure>

!!! warning
    A server action must start with `"use server"`. It only receives serializable form data, like text and numbers. Never try to pass a function or a class instance through it.

??? note urdu "اردو میں مزید وضاحت"
    سرور ایکشن ایک ایسا فنکشن ہے جو سرور پر چلتا ہے، براؤزر میں نہیں۔ اس فنکشن کے اوپر آپ کو `"use server"` لکھنا پڑتا ہے۔ جب صارف فارم سبمٹ کرتا ہے تو Next.js یہ فنکشن خود سرور پر چلا دیتا ہے۔ آپ کو الگ سے کوئی API روٹ بنانے کی ضرورت نہیں رہتی۔ فارم کا ڈیٹا `formData` کے ذریعے ملتا ہے، اور آپ ہر فیلڈ کو اس کے `name` سے پڑھتے ہیں۔ data fetching اور server action دونوں مل کر آپ کی پوری ایپ کو سرور پر سنبھالنے کی طاقت دیتے ہیں۔

---

## loading.js and Suspense for loading UI

When a server component fetches data, the user waits a moment. You can show a loading screen during that wait. Next makes this easy.

Add a file named `loading.js` next to your page. Next shows it automatically while the page loads its data.

```jsx
// app/products/loading.js

function Loading() {
  return <p>Loading products, please wait...</p>;
}

export default Loading;
```

You did not import it or call it anywhere. Next finds it by its name and shows it for you. When the data is ready, Next swaps in the real page.

For more control, you can wrap one part of a page in `Suspense`. Next then streams that part separately, while the rest of the page shows right away.

```jsx
import { Suspense } from "react";

function Page() {
  return (
    <div>
      <h1>Shop</h1>
      <Suspense fallback={<p>Loading products...</p>}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
```

The heading shows at once. The product list shows its fallback until its data arrives. This keeps the page feeling fast, even with slow data.

---

### Try this

Make an async server component page that fetches from `https://fakestoreapi.com/products` and lists the titles, with no `useState` or `useEffect`. Add a `loading.js` next to it and confirm the loading text shows for a moment on a slow connection. Then add a small form on the same page with a server action that has `"use server"` at the top, reads one field with `formData.get`, and logs it. Submit the form and check your server terminal for the logged value.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What keyword lets a server component `await` a fetch right inside it?
2. What text must a server action have at the top, and where do you set the action?
3. What does `{ next: { revalidate: 60 } }` do to a fetch?
4. What file name shows a loading screen automatically while a page loads its data?

---

## What's next

You can now fetch data and handle forms the Next.js way. The last step is getting your app online for the world to see. In 14.4 you will deploy your site, add SEO so search engines find it, and use the Next image tool for fast pictures.

[Next lesson: 14.4 Deploy, SEO, and images &rarr;](15-4-deploy-seo-images.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Next.js: Data Fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js: Server Actions](https://nextjs.org/docs/app/getting-started/updating-data)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[server action]: A function that runs on the server when a form is submitted, with no API route needed. (Roman Urdu: aisa function jo form submit hone par server par chalta hai)
*[use server]: The text you put at the top of a function to mark it as a server action. (Roman Urdu: server action banane ke liye function ke upar likha jane wala text)
*[revalidation]: Refreshing cached data after a set time so it stays fresh. (Roman Urdu: cache kiya hua data thore waqt baad dobara taza karna)
*[caching]: Saving a fetch result so Next can reuse it and load faster. (Roman Urdu: fetch ka result save rakhna taake dobara tezi se mile)
*[Suspense]: A React tool that shows a fallback while one part of a page loads. (Roman Urdu: React ka tool jo page ke ek hisse ke load hone tak fallback dikhata hai)
*[incremental revalidation]: Rebuilding a cached page in the background after a set number of seconds. (Roman Urdu: page ko background mein tay shuda waqt ke baad dobara banana)
