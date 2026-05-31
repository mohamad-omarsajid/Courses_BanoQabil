---
lesson_id: frontend.ch14.l04
title: "14.4 React Router"
chapter: 14
order: 4
estimated_minutes: 45
prerequisites:
  - frontend.ch14.l03
---

# 14.4 React Router

Your React app shows different views, but the URL never changes. That feels broken to users. They press the back button and the page does the wrong thing. They copy a link and it opens the wrong screen. React Router fixes all of this so your single page app feels like a real website.

## What you'll know by the end

- Why a single-page app still needs real URLs and routing.
- How to install React Router and wrap your app in `BrowserRouter`.
- How to define `Routes` and `Route` and link with `Link` and `NavLink`.
- How to build dynamic routes like `/product/:id` and read params with `useParams`.
- How to share a layout across pages using nested routes and `<Outlet />`.
- How to move the user to a new route in code with `useNavigate`.

---

## Why a single page app still needs routing

A React app loads one HTML file. Then JavaScript swaps the view on screen. This is fast, but it has a cost. By default the URL never changes. That breaks three things people expect.

- Different views should have different URLs. The home page and the cart page are not the same.
- The back button should take you back one view, not out of the whole app.
- A link should be shareable. You send a friend a URL and they see the same screen.

Routing gives you all three. It maps each URL to a React component. The URL becomes the single source of truth for what shows on screen.

---

## Your routes at a glance

Before the code, here is a picture of the route map you will build in this lesson. One Layout wraps all pages. Each path points to a component. A wildcard catches anything that does not match.

<figure markdown>
<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-routes-map" style="max-width:100%;height:auto">
  <title id="svg-routes-map">A routes map showing BrowserRouter at top, then a Layout route at slash, with four child routes: index to Home, about to About, product colon id to Product, and a star wildcard to NotFound.</title>
  <g stroke="#1f1f1c" stroke-width="2" fill="#f4f4f1">
    <rect x="230" y="20" width="220" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="340" y="42">&lt;BrowserRouter&gt;</text>
    <text x="340" y="58">wraps the whole app</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="220" y="110" width="240" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="340" y="133">Route path="/"</text>
    <text x="340" y="149">element=Layout</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="230" width="140" height="50" rx="8"/>
    <rect x="175" y="230" width="140" height="50" rx="8"/>
    <rect x="330" y="230" width="160" height="50" rx="8"/>
    <rect x="505" y="230" width="140" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="90" y="251">index</text>
    <text x="90" y="267">element=Home</text>
    <text x="245" y="251">path="about"</text>
    <text x="245" y="267">element=About</text>
    <text x="410" y="251">path="product/:id"</text>
    <text x="410" y="267">element=Product</text>
    <text x="575" y="251">path="*"</text>
    <text x="575" y="267">element=NotFound</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="90" y="300">matches /</text>
    <text x="245" y="300">matches /about</text>
    <text x="410" y="300">matches /product/5</text>
    <text x="410" y="313">matches /product/any</text>
    <text x="575" y="300">catches 404s</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="340" y="170">Navbar + footer show on every child page</text>
    <text x="340" y="185">Outlet renders the active child</text>
  </g>
  <defs>
    <marker id="arr-routes" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-routes)">
    <line x1="340" y1="70" x2="340" y2="108"/>
    <line x1="340" y1="160" x2="90" y2="228"/>
    <line x1="340" y1="160" x2="245" y2="228"/>
    <line x1="340" y1="160" x2="410" y2="228"/>
    <line x1="340" y1="160" x2="575" y2="228"/>
  </g>
</svg>
<figcaption>One BrowserRouter, one Layout that wraps everything, and four child routes. The wildcard path="*" is your 404 fallback.</figcaption>
</figure>

---

## Route configuration reference

| Route | Component shown | When it matches |
| --- | --- | --- |
| `path="/"` index | `<Home />` | Exactly `/` |
| `path="about"` | `<About />` | `/about` |
| `path="product/:id"` | `<Product />` | `/product/5`, `/product/banana`, any value |
| `path="*"` | `<NotFound />` | Anything not matched above (your 404 page) |
| `<Outlet />` in Layout | active child | Replaced by whichever child route is active |

---

## Install and set up

First install the package in your project folder.

```bash
npm install react-router-dom
```

Now wrap your whole app in `BrowserRouter`. This is what reads the URL and keeps it in sync with React. You usually do this once, in `main.jsx`.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

`BrowserRouter` is the engine. It watches the address bar. Everything inside it can now use routes and links.

---

## Define your routes

Inside your app you list each URL with `Routes` and `Route`. Each `Route` takes a `path` and an `element`. The `element` is the component to show for that path.

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
```

When the URL is `/`, React shows `Home`. When it is `/about`, React shows `About`. Only one route matches at a time. You add a new page by adding one more `Route`.

---

## Navigating with Link and NavLink

To move between pages, you do not use a plain `<a>` tag. A plain anchor reloads the whole page from the server. That throws away your React state and feels slow. Instead you use `Link`. It changes the URL without a reload.

`NavLink` works like `Link`, but it also knows when its route is active. You can style the current page differently.

```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
```

`NavLink` gives you an `isActive` value. You use it to add an `active` class to the current link. Then in CSS you make the active link bold or colored. The user always knows where they are.

### Link vs NavLink vs plain anchor

| Option | Reloads page | Knows if active | Use it when |
| --- | --- | --- | --- |
| `<a href="...">` | Yes, full reload | No | External sites only |
| `<Link to="...">` | No | No | Internal links that do not need active styling |
| `<NavLink to="...">` | No | Yes, via `isActive` | Navbars and menus where you highlight the current page |

!!! tip
    Use `Link` and `NavLink` for every internal link. Never use a plain `<a>` for a page inside your app. A plain anchor reloads the page, loses your React state, and feels slow.

---

## Dynamic routes with params

Many pages share one shape. Think of product pages. You do not write a route for every product. Instead you write one route with a placeholder. A colon marks the dynamic part.

```jsx
<Route path="/product/:id" element={<Product />} />
```

Here `:id` is a param (Roman Urdu: URL mein badalne wala hissa). It matches any value. So `/product/5` and `/product/banana` both hit this route. Inside the component you read the value with `useParams`.

```jsx
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return <h1>You are viewing product {id}</h1>;
}

export default Product;
```

`useParams` returns an object. The key name must match the route. You wrote `:id`, so you read `id`. You met this idea in lesson 13.3, and it is the same here.

!!! warning
    A dynamic segment like `:id` is read with `useParams`. The names must match exactly. If your route says `:id` but you read `productId`, you get `undefined`. Check the spelling on both sides.

??? note urdu "اردو میں مزید وضاحت"
    React Router آپ کے single page app کو real website جیسا بنا دیتا ہے۔ ہر view کا اپنا URL ہوتا ہے، back button کام کرتا ہے، اور links share ہو سکتی ہیں۔ `BrowserRouter` پورے app کو wrap کرتا ہے۔ `Route` ہر path کو ایک component سے جوڑتا ہے۔ `Link` اور `NavLink` بغیر page reload کے URL بدلتے ہیں، اس لیے plain `<a>` tag کبھی internal links کے لیے استعمال نہ کریں۔ Dynamic route میں `:id` جیسا placeholder ہوتا ہے جو `useParams` سے پڑھا جاتا ہے۔ Layout component میں `<Outlet />` وہ جگہ ہے جہاں active child page show ہوتا ہے۔ ڈائنامک روٹ اور `useParams` میں نام بالکل ایک جیسا ہونا چاہیے۔

---

## Nested routes and layouts

Most apps share chrome across pages. A navbar and footer sit on every page. You do not want to repeat them in each component. Nested routes solve this. You make a parent `Route` that holds a layout. The child routes render inside it.

The layout uses `<Outlet />`. That is the slot where the active child page appears.

```jsx
import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>BanoQabil 2026</footer>
    </div>
  );
}

export default Layout;
```

Now nest your pages inside the layout route.

```jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

The parent `Route` renders `Layout`. The navbar and footer show on every child page. The `<Outlet />` swaps in the matching child. The `index` route is the default child for `/`. You write the navbar once, and every page gets it free. The `path="*"` catches any URL that does not match, giving you a proper 404 page.

---

## Programmatic navigation with useNavigate

Sometimes you move the user without a click on a link. A common case is after a form submit. The user saves a form, and you send them to a success page. For this you use the `useNavigate` hook.

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // pretend the login worked here
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;
```

`useNavigate` gives you a `navigate` function. You call it with the path you want. After the form runs, the user lands on `/dashboard`. No link click needed.

You can also go back one step in history with `navigate(-1)`. That is handy for a Cancel button.

---

## A quick word on route loaders

Newer versions of React Router add route loaders. A loader is a function that runs before a route renders. It fetches the data the page needs first. Then the page shows up with data ready. You do not need this yet. Just know the name, so it is not a surprise later.

---

### Try this

Build a small three-page app with React Router. Set up a `Layout` with a navbar of `NavLink`s and an `<Outlet />`, then nest `Home`, `About`, and a `Product` page at `product/:id` inside it. Add a `path="*"` route that shows a simple "Page not found" message. Read the id with `useParams` and show it on the page. Style the active `NavLink` so the current page stands out. Then add a button on the Home page that uses `useNavigate` to send the user to `/product/1` in code.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why should you use `Link` instead of a plain `<a>` tag for internal links?
2. In the route `/product/:id`, what does `:id` mean, and how do you read its value?
3. What does `<Outlet />` do inside a layout component?
4. You finished a form and want to send the user to another page in code. Which hook do you use?
5. What route path catches all unmatched URLs, and which component should it show?

---

## What's next

Chapter 14 is done. You can now build clean, scalable React apps with shared layouts, dynamic pages, and proper URLs. The next chapter is Next.js, a framework that adds server power, SEO, and speed on top of React.

[Next chapter: 15. Next.js &rarr;](../chapter-15-nextjs/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [React Router Home / docs](https://reactrouter.com/home)
- [React Router Routing tutorial](https://reactrouter.com/start/declarative/routing)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[routing]: Mapping each URL to the view it should show. (Roman Urdu: har URL ko us ke view se jorna)
*[Route]: A rule that links one path to one component. (Roman Urdu: ek path ko ek component se jorne wala rule)
*[Link]: A component that changes the URL with no page reload. (Roman Urdu: bina reload URL badalne wala link)
*[NavLink]: A Link that also marks itself active on its route. (Roman Urdu: apne route par active hone wala Link)
*[useParams]: A hook that reads dynamic values from the URL. (Roman Urdu: URL se dynamic value parhne wala hook)
*[Outlet]: The slot where a nested child route renders. (Roman Urdu: jahan child route dikhta hai woh jagah)
*[useNavigate]: A hook that moves the user to a route in code. (Roman Urdu: code se route badalne wala hook)
