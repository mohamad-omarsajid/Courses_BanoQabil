---
lesson_id: frontend.ch19.l02
title: "19.2 TanStack Query for server state"
chapter: 19
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch19.l01
---

# 19.2 TanStack Query for server state

In 18.1 you used Zustand for state that lives inside your app. But a lot of your data does not live in your app. It lives on a server, far away. Fetching that data by hand gets messy fast. TanStack Query cleans up that whole job for you.

## What you'll know by the end

- The difference between UI state and server state, and why it matters.
- Why a manual `useEffect` fetch becomes repetitive and hard to maintain.
- How `useQuery` fetches data and gives you loading and error states for free.
- How `useMutation` lets you create, update, or delete data on the server.
- How caching and background refetch keep your data fresh.
- What `useInfiniteQuery` is for, and how this fits with Next.js.

---

## Two kinds of state

Not all state is the same. There are two big types, and mixing them up causes pain.

UI state (Roman Urdu: aapki apni state) is yours. It belongs to your app and nobody else. A "modal is open" flag is UI state. A "dark mode is on" toggle is UI state. You own it fully. You used Zustand in 18.1 to handle this.

Server state (Roman Urdu: server par rehne wali state) is different. It lives on a server somewhere. You do not own it. You only borrow a copy of it. A list of products from an API is server state. The current user's orders are server state.

Here is a side-by-side comparison so the difference is clear:

| | UI state | Server state |
|---|----------|-------------|
| Where it lives | Inside your app | On a remote server |
| Who owns it | You | The server / database |
| Can it go stale? | No, you control it | Yes, another user can change it |
| Needs caching? | No | Yes |
| Needs refetching? | No | Yes |
| Right tool | Zustand / `useState` | TanStack Query |

The tricky part about server state is that it can go stale. Someone else can change it while you are not looking. Your copy can be old. So server state needs caching, refetching, and freshness checks. That is a lot of work to do by hand.

!!! tip
    Do not store server data in Zustand or `useState`. Let TanStack Query own it. That is exactly what it was built for. Keep Zustand for your own UI state only.

---

## Why the manual way gets tiring

In 10.2 you fetched data with `useEffect`. It looked something like this.

```jsx
import { useState, useEffect } from "react";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  return <ul>{data.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

That works. But look at how much code it took. You tracked loading by hand. You tracked errors by hand. You have no caching at all. If you visit this page twice, it fetches again from scratch every time.

Now imagine doing this in ten components. You copy the same pattern again and again. No refetching when the data goes stale. No sharing the result between components. This is the problem TanStack Query solves.

---

## What TanStack Query does

TanStack Query manages server state for you. You tell it how to fetch. It handles the rest.

It gives you caching out of the box. It tracks loading and error states. It refetches in the background when data goes stale. It shares one result across many components. You write far less code, and you get more features.

Think of it as a smart assistant for server data. You say "go get the products." It fetches them, remembers them, and quietly keeps them fresh.

---

## Setup

First install the package.

```bash
npm install @tanstack/react-query
```

Then wrap your app in a `QueryClientProvider`. This gives every component access to the shared cache.

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
    </QueryClientProvider>
  );
}
```

The `QueryClient` is the brain. It holds the cache and the settings. The provider passes it down through your whole app. You only set this up once.

---

## Reading data with useQuery

To fetch data, you use `useQuery`. It needs two things. A `queryKey` and a `queryFn`.

The `queryKey` is a label for this data. TanStack Query uses it for the cache. The `queryFn` is the function that actually fetches.

```jsx
import { useQuery } from "@tanstack/react-query";

function Products() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

Compare this to the `useEffect` version above. Same result, much less code. You did not write any `useState`. You did not write any `useEffect`. TanStack Query gives you `data`, `isLoading`, and `isError` ready to use.

The best part is the cache. The first visit fetches the products. The next visit shows them instantly from cache. No more loading spinner for data you already have.

### The four query states

A query is not just "loading" or "done". It goes through several states. Knowing these helps you show the right UI.

| State | What it means | `isLoading` | `isError` | `data` |
|-------|---------------|-------------|-----------|--------|
| `pending` | First fetch in progress, no cache yet | `true` | `false` | `undefined` |
| `error` | Fetch failed and there is no cached copy | `false` | `true` | `undefined` |
| `success` | Data is available, either fresh or cached | `false` | `false` | your data |
| `stale` | Data was fetched before, but it is old enough to refetch | `false` | `false` | your data (old copy shown while refetch runs) |

The `stale` state is unique to server data. Your users see the old data instantly, and the fresh copy arrives in the background. No blank screen.

---

## The cache flow

Here is how a request actually moves through TanStack Query. Two paths: cache hit and cache miss.

<figure markdown>
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-tq-cache" style="max-width:100%;height:auto">
  <title id="svg-tq-cache">TanStack Query cache flow. A component calls useQuery. TanStack Query checks the cache. On a hit it returns the cached data immediately and then refetches in the background to keep it fresh. On a miss it fetches from the server, stores the result in the cache, and then returns the data.</title>
  <defs>
    <marker id="tq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="280" y="20" width="160" height="50" rx="8"/>
    <rect x="280" y="120" width="160" height="50" rx="8"/>
    <rect x="30" y="220" width="160" height="50" rx="8"/>
    <rect x="530" y="220" width="160" height="50" rx="8"/>
    <rect x="280" y="300" width="160" height="45" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="360" y="42">Component</text>
    <text x="360" y="57">calls useQuery</text>
    <text x="360" y="142">Check cache</text>
    <text x="360" y="158">for queryKey</text>
    <text x="110" y="242">Cache HIT</text>
    <text x="110" y="258">return data now</text>
    <text x="610" y="242">Cache MISS</text>
    <text x="610" y="258">fetch from server</text>
    <text x="360" y="318">Store in cache</text>
    <text x="360" y="334">return data</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="200" y="310">...then silently refetch</text>
    <text x="200" y="323">in background</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#tq-arrow)">
    <line x1="360" y1="70" x2="360" y2="118"/>
    <line x1="310" y1="170" x2="190" y2="218"/>
    <line x1="410" y1="170" x2="530" y2="218"/>
    <line x1="610" y1="270" x2="440" y2="298"/>
    <line x1="110" y1="270" x2="110" y2="298"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1" stroke-dasharray="5 4" fill="none" marker-end="url(#tq-arrow)">
    <line x1="110" y1="318" x2="278" y2="318"/>
  </g>
</svg>
<figcaption>On a cache hit the user sees data instantly. TanStack Query then refetches silently in the background to keep the data fresh. On a cache miss it fetches, stores the result, then returns it.</figcaption>
</figure>

---

## Caching and revalidation

Your data is cached by its `queryKey`. So `["products"]` is one cache entry. When you ask for it again, you get the cached copy at once. No waiting.

But remember, server state can go stale. So TanStack Query does something clever. It shows you the cached data right away. Then it quietly refetches in the background. If the new data is different, your screen updates. The user sees something instantly, and it stays fresh.

You can also fetch a single item using an id in the key. Each product gets its own cache entry.

```jsx
function ProductDetail({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["products", id],   // each id is a separate cache slot
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((r) => r.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  return <h2>{data.title}</h2>;
}
```

!!! note "Did you know"
    TanStack Query refetches stale data in the background. So your users see cached content instantly while the fresh copy arrives behind the scenes. They never stare at a blank loading screen for data they have seen before.

---

## Changing data with useMutation

`useQuery` is for reading. To change data on the server, you use `useMutation`. This covers create, update, and delete.

After you change data, the cached list is now wrong. You added a product, but the old list does not show it. So you invalidate the query. That tells TanStack Query to refetch it.

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ title: "New shirt" })}>
      Add product
    </button>
  );
}
```

The `mutationFn` sends the change to the server. When it succeeds, `onSuccess` runs. There you call `invalidateQueries` with the `["products"]` key. That marks the list as stale, so TanStack Query refetches it. Your list updates with the new product automatically.

---

## Pagination and infinite scroll

Sometimes a list is too big to load all at once. Think of an endless feed of posts.

For this, TanStack Query has `useInfiniteQuery`. It handles loading data page by page. You give it a way to find the next page. It tracks all the pages for you. This is how you build "load more" buttons and infinite scroll. You do not need to memorize it now. Just know the tool exists for that job.

---

## Using it with Next.js

TanStack Query works inside client components. So any component with `"use client"` at the top can use `useQuery` and `useMutation`. That is the normal place for it.

Server components are different. As you saw in 14.3, a server component can fetch data directly. It runs on the server, so it just awaits the fetch. You do not need TanStack Query there. Use TanStack Query when fetching happens in the browser, after the page loads.

??? note urdu "اردو میں مزید وضاحت"
    ریاست کی دو قسمیں ہیں۔ UI ریاست آپ کی اپنی ہے، جیسے کوئی modal کھلا ہے یا بند۔ Server ریاست کسی دور دراز server پر رہتی ہے اور آپ صرف اس کی نقل ادھار لیتے ہیں جو پرانی ہو سکتی ہے۔ TanStack Query آپ کے لیے یہ server ریاست سنبھالتی ہے: cache میں ڈیٹا رکھتی ہے، پرانا ہونے پر خود بخود دوبارہ fetch کرتی ہے، اور loading اور error کی حالتیں دیتی ہے۔ جب data cache میں ہو تو user کو فوری نظر آتا ہے جبکہ نیا data پس پردہ آتا رہتا ہے۔ Data بدلنے کے لیے useMutation استعمال ہوتا ہے اور کامیابی پر queryKey کو invalidate کر کے list دوبارہ fetch کی جاتی ہے۔

---

### Try this

Take a component that fetches data with `useEffect` and rewrite it with `useQuery`. Wrap your app in a `QueryClientProvider`, then fetch the products from `https://fakestoreapi.com/products` using a `queryKey` of `["products"]`. Show the `isLoading` and `isError` states, then list the titles. Open the page, leave it, and come back. Notice how the second visit shows the data instantly from the cache instead of a loading spinner.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between UI state and server state? Give one example of each.
2. Which two things does `useQuery` need to fetch data?
3. After a `useMutation` succeeds, what do you call so the list refetches?
4. Why does TanStack Query show cached data first and then refetch in the background?

---

## What's next

You now manage server state cleanly. Your app fetches, caches, and updates data with very little code. Next you will make sure your app feels fast for real users. In 18.3 you will look at performance and Core Web Vitals.

[Next lesson: 18.3 Performance and Core Web Vitals &rarr;](19-3-performance.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [TanStack Query Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[server state]: Data that lives on a server, where your app only borrows a copy that can go stale. (Roman Urdu: server par mojood data jiska aap sirf copy udhaar lete hain)
*[TanStack Query]: A library that manages server state for you, handling caching, refetching, loading, and error states. (Roman Urdu: server state sambhalne wali library)
*[useQuery]: A TanStack Query hook that fetches and caches data, giving you data, isLoading, and isError. (Roman Urdu: data fetch aur cache karne wala hook)
*[useMutation]: A TanStack Query hook for creating, updating, or deleting data on the server. (Roman Urdu: data banane, badalne, ya delete karne wala hook)
*[queryKey]: A label that TanStack Query uses to cache and find a piece of data. (Roman Urdu: cache mein data dhoondne wala label)
*[stale data]: A cached copy that may be old because the server data changed since you fetched it. (Roman Urdu: purani ho chuki cache copy)
