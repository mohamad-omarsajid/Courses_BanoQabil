---
lesson_id: frontend.ch11.l02
title: "11.2 Fetching data"
chapter: 11
order: 2
estimated_minutes: 45
prerequisites:
  - frontend.ch11.l01
---

# 11.2 Fetching data

Most real apps do not store all their data inside the code. They ask a server for it over the internet. In the last lesson you learned `useEffect`, deps, and cleanup. Now you will use an effect to pull live data and show it on the screen.

## What you'll know by the end

- What an API is and why it usually returns JSON.
- How `fetch` works and why it returns a promise.
- How to use async and await safely inside an effect.
- The loading, error, and data state pattern with three `useState` values.
- How to cancel a request with `AbortController` during cleanup.
- How to build your first custom hook called `useFetch`.

---

## What is an API

An API (Roman Urdu: aik web address jo data wapas karta hai) is a web address that returns data, usually as JSON. You send a request to that address and you get data back. For example, `https://dummyjson.com/products` returns a list of products.

JSON is just text shaped like JavaScript objects and arrays. Your code can read it and turn it into real objects.

Think of an API like a restaurant menu. You say what you want (the URL), a waiter carries the request to the kitchen (the server), and the kitchen sends back exactly the dish you ordered (the JSON data). You never go behind the counter yourself.

---

## The fetch function

The browser gives you a built in function called `fetch`. You give it a URL and it goes to get the data. But the data does not arrive right away. The internet takes time.

So `fetch` returns a promise (Roman Urdu: aisi value jo baad mein tayyar hoti hai). A promise is a value that is not ready yet. It will be ready later. You wait for it with `await`.

```jsx
// fetch returns a promise, so we wait for it with await
const response = await fetch("https://dummyjson.com/products");

// the body is still raw text, so we parse it into a JS object
const data = await response.json();

console.log(data.products); // an array of products
```

The first `await` waits for the server to answer. The second `await` reads the body and turns the JSON text into a real object. Note that `data.products` is the array, because this API wraps the list inside a `products` field.

---

## Async and await inside an effect

You want to fetch when the component first shows. That means you fetch inside `useEffect`. But there is one rule. You cannot make the effect callback itself async.

React expects the effect to return either nothing or a cleanup function. An async function returns a promise instead, which breaks that rule. So you define an async function inside the effect and then call it.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // define an async helper inside the effect
  async function loadData() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data.products);
  }

  // then call it
  loadData();
}, []); // empty deps means run once on mount
```

The effect callback stays normal. The async work lives inside `loadData`. This keeps React happy and your code still reads top to bottom.

---

## The three fetch states: a visual

Before you write the full pattern, picture what can happen when you fetch. There are three possible outcomes.

<figure markdown>
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fetch-states" style="max-width:100%;height:auto">
  <title id="svg-fetch-states">Branching flow diagram: the fetch starts in a loading state. It then either resolves to a success (data) state or rejects to an error state.</title>
  <defs>
    <marker id="bq-arr-fs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="260" y="20" width="180" height="50" rx="8"/>
    <rect x="60" y="220" width="180" height="50" rx="8"/>
    <rect x="460" y="220" width="180" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#1f1f1c">
    <text x="350" y="41" font-size="14" font-weight="600">loading: true</text>
    <text x="350" y="59" font-size="11" fill="#6b6b65">request in flight</text>
    <text x="150" y="241" font-size="14" font-weight="600">error state</text>
    <text x="150" y="259" font-size="11" fill="#6b6b65">network or server fail</text>
    <text x="550" y="241" font-size="14" font-weight="600">data ready</text>
    <text x="550" y="259" font-size="11" fill="#6b6b65">loading: false, show list</text>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#6b6b65" font-size="12">
    <text x="210" y="168">network fails</text>
    <text x="490" y="168">response.ok is true</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-fs)">
    <line x1="310" y1="70" x2="210" y2="218"/>
    <line x1="390" y1="70" x2="490" y2="218"/>
  </g>
</svg>
<figcaption>A fetch always starts in the loading state. It either lands on success (data arrived) or on error (something went wrong). Your UI must show something sensible in all three cases.</figcaption>
</figure>

---

## The loading, error, and data pattern

A fetch can be slow. It can also fail. Your user should never stare at a blank frozen screen. So you track three pieces of state.

You start `data` as empty, `loading` as `true`, and `error` as `null`. You set `loading` to `false` in a `finally` block, so it runs whether the fetch worked or not. You set `error` inside a `catch` block.

```jsx
import { useState, useEffect } from "react";

function Products() {
  const [data, setData] = useState([]);     // the list, starts empty
  const [loading, setLoading] = useState(true); // are we still waiting
  const [error, setError] = useState(null);  // any error message

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("https://dummyjson.com/products");

        // response.ok is false for errors like 404 or 500
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        const result = await response.json();
        setData(result.products); // the array lives in result.products
      } catch (err) {
        setError(err.message); // store the error text
      } finally {
        setLoading(false); // stop loading no matter what happened
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>
          {product.title} costs ${product.price}
        </li>
      ))}
    </ul>
  );
}
```

Read the bottom part carefully. If `loading` is true, you show a message. If `error` has a value, you show the problem. Otherwise you show the list. This way the screen always tells the user what is happening.

The `response.ok` check matters. A failed request like a 404 does not throw on its own. You must check `response.ok` yourself and throw, so your `catch` block can handle it.

!!! tip
    Always handle three states: loading, error, and data. If you only handle data, your user sees a blank screen while waiting, and a broken screen when something fails.

Here is the lifecycle of a fetch in one table:

| Phase | State values | What the user sees |
| --- | --- | --- |
| Component mounts | `loading: true`, `data: []`, `error: null` | "Loading products..." |
| Request succeeds | `loading: false`, `data: [...]`, `error: null` | The list of items |
| Request fails | `loading: false`, `data: []`, `error: "..."` | "Something went wrong: ..." |
| Component unmounts before finish | Abort fires, `AbortError` is ignored | Nothing, no state update |

---

## Cancel the fetch in cleanup

What if the user leaves the page before the data arrives? Or the deps change and the effect runs again? The old fetch is still in flight. When it finishes, it may try to set state on a component that is gone.

The browser gives you `AbortController` to stop a fetch. You create a controller, pass its `signal` to `fetch`, and call `controller.abort()` in the cleanup function.

```jsx
useEffect(() => {
  const controller = new AbortController(); // create the controller

  async function loadData() {
    try {
      // pass the signal so this fetch can be cancelled
      const response = await fetch("https://dummyjson.com/products", {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const result = await response.json();
      setData(result.products);
    } catch (err) {
      // ignore the error if we cancelled on purpose
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  loadData();

  // cleanup: cancel the fetch if the component unmounts or deps change
  return () => controller.abort();
}, []);
```

When cleanup runs, `controller.abort()` stops the fetch. The fetch then throws an `AbortError`. You check for that name and ignore it, because you cancelled it on purpose. It is not a real problem.

!!! warning
    Cancel the fetch in cleanup with `AbortController`. If you skip this, a slow fetch may set state on an unmounted component, which wastes work and can cause bugs.

---

## Your first custom hook: useFetch

You will repeat this loading, error, and data pattern a lot. So you can pull it into one reusable function. A function whose name starts with `use` and uses hooks inside is a custom hook (Roman Urdu: apna banaya hua function jo use se shuru hota hai aur jis mein logic chhupa kar kai jagah dobara istemal kar sakte hain).

Here is `useFetch`. It takes a URL, holds the three states, runs the effect, and returns an object with `data`, `loading`, and `error`.

```jsx
import { useState, useEffect } from "react";

// a custom hook: name starts with "use", uses hooks inside
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        setLoading(true); // reset loading when the url changes
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => controller.abort();
  }, [url]); // re-run if the url changes

  // hand back everything the component needs
  return { data, loading, error };
}
```

Now your component becomes short and clean. It just uses the hook and reads the three values.

```jsx
function Products() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  // this API wraps the list in a products field
  return (
    <ul>
      {data.products && data.products.map((product) => (
        <li key={product.id}>
          {product.title} costs ${product.price}
        </li>
      ))}
    </ul>
  );
}
```

The hook holds all the messy fetch logic. The component just shows the result. You can reuse `useFetch` for any URL across your whole app. That is the real power of custom hooks.

??? note urdu "اردو میں مزید وضاحت"
    جب آپ انٹرنیٹ سے ڈیٹا منگواتے ہیں تو تین حالتیں ہوتی ہیں۔ پہلی یہ کہ ڈیٹا ابھی آ رہا ہے، اسے loading کہتے ہیں۔ دوسری یہ کہ کوئی خرابی ہو گئی، اسے error کہتے ہیں۔ تیسری یہ کہ ڈیٹا کامیابی سے آ گیا۔ آپ ان تینوں حالتوں کو الگ الگ دکھائیں تاکہ صارف کو کبھی خالی یا اٹکی ہوئی سکرین نہ نظر آئے۔ AbortController ایک ایسا ٹول ہے جو چلتی ہوئی fetch کو روک دیتا ہے جب کمپوننٹ سکرین سے ہٹ جائے۔ کسٹم ہک ایک فنکشن ہے جس کا نام use سے شروع ہوتا ہے اور جس میں دوسرے ہکس استعمال ہوتے ہیں۔ اسے آپ کئی جگہ دوبارہ استعمال کر سکتے ہیں۔

### Try this

In a fresh component, fetch a single product from `https://dummyjson.com/products/1`. Track the three states: `data` starts empty, `loading` starts `true`, and `error` starts `null`. Show "Loading..." while waiting, the product title once it arrives, and an error message if `response.ok` is false. As a check, change the URL to a broken one like `/products/abc` and confirm your error message shows instead of a blank screen.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why can you not make the `useEffect` callback itself async?
2. What three pieces of state do you track when fetching data, and what does each start as?
3. Why do you check `response.ok` and throw an error yourself?
4. What does `AbortController` do, and where do you call `controller.abort()`?

---

## What's next

You can now pull data from the internet and show it safely. Next you will go the other way. In 11.3 you will learn how to handle forms in React, so users can type and send their own data.

[Next lesson: 11.3 Forms in React &rarr;](11-3-forms-in-react.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [react.dev: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[API]: A web address that returns data your app can use. (Roman Urdu: aik web address jo data wapas karta hai)
*[fetch]: A built in browser function that requests data from a URL. (Roman Urdu: data mangwane wala browser function)
*[promise]: A value that is not ready yet but will be ready later. (Roman Urdu: aisi value jo baad mein tayyar hoti hai)
*[JSON]: Text shaped like JavaScript objects, used to send data. (Roman Urdu: data bhejne ka text format)
*[custom hook]: A reusable function starting with use that uses hooks inside. (Roman Urdu: apna banaya hua function jo use se shuru hota hai aur jis mein logic chhupa kar kai jagah dobara istemal kar sakte hain)
*[AbortController]: A tool that can cancel a running fetch request. (Roman Urdu: chalti hui fetch ko rokne wala tool)
