---
lesson_id: frontend.ch13.l02
title: "13.2 Home and shop pages"
chapter: 13
order: 2
estimated_minutes: 50
prerequisites:
  - frontend.ch13.l01
---

# 13.2 Home and shop pages

In 13.1 you set up the project, the routes, and the product data. Now you build the first two pages people will actually see. The home page sells the store with a hero and a few featured items. The shop page shows every product with a filter, a sort, and a search. Let's build them step by step.

## What you'll know by the end

- How to build a home page with a hero, featured cards, a testimonial, and a footer
- How to add a light GSAP entrance to the hero, the way you learned in Chapter 12
- How to build a reusable `<ProductCard>` component that links to a detail route
- How to build a `<Filter>` component for category, price sort, and name search
- How to derive the filtered list during render instead of storing it in state
- How to lay out a responsive product grid with Tailwind

---

## The two pages at a glance

Before you write code, picture the layout. Both pages share the same nav at the top. The home page is a single column that scrolls. The shop page splits into a filter area and a grid of cards.

<figure markdown>
<svg viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-wire-title" style="max-width:100%;height:auto">
  <title id="svg-wire-title">Wireframes of two pages side by side. Left is the home page with a nav, hero, three featured cards, a testimonial, and a footer. Right is the shop page with a nav, a filter sidebar, and a grid of product cards.</title>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="190" y="34">Home</text>
    <text x="570" y="34">Shop</text>
  </g>
  <rect x="40" y="50" width="300" height="400" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <rect x="420" y="50" width="300" height="400" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1">
    <rect x="56" y="66" width="268" height="22" rx="3"/>
    <rect x="56" y="98" width="268" height="74" rx="3"/>
    <rect x="56" y="184" width="80" height="72" rx="3"/>
    <rect x="150" y="184" width="80" height="72" rx="3"/>
    <rect x="244" y="184" width="80" height="72" rx="3"/>
    <rect x="56" y="268" width="268" height="48" rx="3"/>
    <rect x="56" y="328" width="268" height="106" rx="3"/>
    <rect x="436" y="66" width="268" height="22" rx="3"/>
    <rect x="436" y="98" width="74" height="336" rx="3"/>
    <rect x="522" y="98" width="88" height="78" rx="3"/>
    <rect x="616" y="98" width="88" height="78" rx="3"/>
    <rect x="522" y="186" width="88" height="78" rx="3"/>
    <rect x="616" y="186" width="88" height="78" rx="3"/>
    <rect x="522" y="274" width="88" height="78" rx="3"/>
    <rect x="616" y="274" width="88" height="78" rx="3"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="190" y="139">hero</text>
    <text x="190" y="296">testimonial</text>
    <text x="473" y="270" transform="rotate(-90 473 270)">filters</text>
  </g>
</svg>
<figcaption>The home page leads with a hero and featured items. The shop page pairs a filter sidebar with a responsive product grid.</figcaption>
</figure>

Keep this picture in your head. Each box below maps to a piece of code you write next.

---

## Build the home page hero

The hero is the first thing a visitor reads. It needs a heading, a short subheading, and one clear button. Keep it simple and bold.

```jsx
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-slate-900 text-white px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Clothes that feel like you</h1>
      <p className="mt-4 text-lg text-slate-300">
        Simple pieces, fair prices, made to last.
      </p>
      <Link
        to="/shop"
        className="mt-8 inline-block rounded bg-teal-500 px-6 py-3 font-semibold"
      >
        Shop the collection
      </Link>
    </section>
  );
}

export default Hero;
```

The `<section>` wraps the whole hero. The heading is the big promise. The subheading adds one line of detail. The `<Link>` sends people to the `/shop` route you made in 13.1. Notice the button is a link, not a button tag, because it changes the page.

---

## Add a light GSAP entrance

You learned GSAP in Chapter 12. A small fade and slide makes the hero feel alive. Keep it gentle so it does not annoy people.

```jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-slate-900 text-white px-6 py-20 text-center"
    >
      <h1 className="text-4xl font-bold">Clothes that feel like you</h1>
      <p className="mt-4 text-lg text-slate-300">
        Simple pieces, fair prices, made to last.
      </p>
      <Link to="/shop" className="mt-8 inline-block rounded bg-teal-500 px-6 py-3 font-semibold">
        Shop the collection
      </Link>
    </section>
  );
}

export default Hero;
```

The `useRef` points to the section. The `useEffect` runs once after the page mounts. `gsap.from` moves each child up from 20 pixels and fades it in. The `stagger` makes them appear one after another, not all at once.

---

## Add featured collections, a testimonial, and a footer

The rest of the home page is calm. Pick a few products from your data and show them. Add one happy customer quote. End with a footer.

```jsx
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const featured = products.slice(0, 3);

  return (
    <main>
      <Hero />

      <section className="px-6 py-16">
        <h2 className="text-2xl font-bold">Featured collection</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-16 text-center">
        <p className="text-xl italic">
          "Best kurta I have bought online. Fits great and feels soft."
        </p>
        <p className="mt-3 font-semibold">Ayesha, Lahore</p>
      </section>

      <footer className="bg-slate-900 text-slate-300 px-6 py-10 text-center">
        <p>BanoQabil Store. Built by a student, for practice.</p>
      </footer>
    </main>
  );
}

export default Home;
```

`products.slice(0, 3)` takes the first three items. The `.map` turns each one into a `<ProductCard>`, which you build next. The testimonial is plain text in a soft box. The footer closes the page.

---

## Build the reusable ProductCard

You will show product cards on the home page and the shop page. So make one component and use it in both places. It takes a `product` as a prop.

```jsx
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block rounded-lg border border-slate-200 overflow-hidden hover:shadow-md"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-1 text-slate-600">Rs {product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
```

The whole card is a `<Link>`, so clicking anywhere opens the detail route. The `to` uses a template string to put the product id in the URL. The `alt` text uses the product name, which helps screen readers. The price shows in rupees.

!!! warning
    Always give each card a stable `key` from `product.id`, not the array index. The id stays the same when the list reorders. The index changes, and that confuses React when items move or get filtered out.

---

## How the responsive grid adapts

The product grid changes its column count based on screen width. Three Tailwind classes do all the work. No media queries to write.

<figure markdown>
<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-grid-resp" style="max-width:100%;height:auto">
  <title id="svg-grid-resp">Three browser widths showing how the product grid changes columns. At phone width one card per row, at tablet two cards per row, at desktop three cards per row.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="20" width="120" height="180" rx="6"/>
    <rect x="200" y="20" width="220" height="180" rx="6"/>
    <rect x="480" y="20" width="220" height="180" rx="6"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1">
    <rect x="34" y="50" width="92" height="56" rx="3"/>
    <rect x="34" y="116" width="92" height="56" rx="3"/>
    <rect x="214" y="50" width="88" height="56" rx="3"/>
    <rect x="316" y="50" width="88" height="56" rx="3"/>
    <rect x="214" y="116" width="88" height="56" rx="3"/>
    <rect x="316" y="116" width="88" height="56" rx="3"/>
    <rect x="493" y="50" width="58" height="56" rx="3"/>
    <rect x="561" y="50" width="58" height="56" rx="3"/>
    <rect x="629" y="50" width="58" height="56" rx="3"/>
    <rect x="493" y="116" width="58" height="56" rx="3"/>
    <rect x="561" y="116" width="58" height="56" rx="3"/>
    <rect x="629" y="116" width="58" height="56" rx="3"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <g><text x="80" y="38">Phone</text></g>
    <g><text x="310" y="38">Tablet (sm:)</text></g>
    <g><text x="590" y="38">Desktop (lg:)</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="80" y="210">grid-cols-1</text>
    <text x="310" y="210">sm:grid-cols-2</text>
    <text x="590" y="210">lg:grid-cols-3</text>
  </g>
</svg>
<figcaption>One class per breakpoint handles the whole column change. Phone shows one card, tablet shows two, desktop shows three.</figcaption>
</figure>

Here is how each class maps to a screen size.

| Tailwind class | Applies when | Columns shown |
| --- | --- | --- |
| `grid-cols-1` | Always (base, smallest first) | 1 |
| `sm:grid-cols-2` | Screen is 640 px or wider | 2 |
| `lg:grid-cols-3` | Screen is 1024 px or wider | 3 |
| `gap-6` | Always | 24 px between cards |

You write these four classes and Tailwind handles the rest. The grid classes do the heavy lifting. They change the number of columns based on the screen width. Read the classes left to right as the screen grows.

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

`grid-cols-1` gives one column on a phone, so cards stack. `sm:grid-cols-2` switches to two columns on a small screen and up. `lg:grid-cols-3` gives three columns on a large screen. The `gap-6` adds even space between cards. You write no media queries by hand.

---

## Build the shop page state

The shop page needs three pieces of state. One for the search text, one for the chosen category, and one for the sort order. These are the only things you store. You compute the visible list from them.

```jsx
import { useState } from "react";
import { products } from "../data/products";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  // ... filtering happens during render, shown below

  return null;
}
```

Each `useState` holds one simple value. The user changes these by typing and clicking. You never store the filtered products list itself. You build it fresh on every render.

| State variable | Initial value | What changes it |
| --- | --- | --- |
| `search` | `""` | User types in the search input |
| `category` | `"all"` | User picks from the category select |
| `sort` | `"none"` | User picks from the sort select |

---

## Derive the filtered list during render

This is the key idea. Back in 10.1 you learned that you might not need an effect. The filtered list is derived data. It depends only on the products, the search, the category, and the sort. So compute it right in the component body.

```jsx
function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  let visible = products;

  if (category !== "all") {
    visible = visible.filter((p) => p.category === category);
  }

  if (search.trim() !== "") {
    visible = visible.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "low") {
    visible = [...visible].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    visible = [...visible].sort((a, b) => b.price - a.price);
  }

  // render uses `visible`
}
```

Read it top to bottom. You start with all products. If a category is picked, you `.filter` to that category. If there is search text, you `.filter` by name using `.includes`. Both sides go lowercase so the search ignores case. Then you sort a copy with the spread, so you never mutate the original array.

### How search and filtering flow through the component

The data flows in one direction: user input updates state, state drives the derived list, and the list drives what the grid renders.

<figure markdown>
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-filter-flow" style="max-width:100%;height:auto">
  <title id="svg-filter-flow">Data-flow diagram for filtering. User input feeds into three state variables: search, category, and sort. All three feed into a derived list computation. The derived list feeds into the product grid render.</title>
  <defs>
    <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="80" width="130" height="38" rx="6"/>
    <rect x="200" y="20" width="110" height="32" rx="5"/>
    <rect x="200" y="84" width="110" height="32" rx="5"/>
    <rect x="200" y="148" width="110" height="32" rx="5"/>
    <rect x="380" y="80" width="120" height="38" rx="6"/>
    <rect x="560" y="80" width="110" height="38" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <g><text x="85" y="95">User Input</text><text x="85" y="110">(type / click)</text></g>
    <g><text x="255" y="41">search state</text></g>
    <g><text x="255" y="105">category state</text></g>
    <g><text x="255" y="169">sort state</text></g>
    <g><text x="440" y="95">visible list</text><text x="440" y="110">(derived)</text></g>
    <g><text x="615" y="95">Grid</text><text x="615" y="110">renders</text></g>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr2)">
    <line x1="150" y1="99" x2="198" y2="38"/>
    <line x1="150" y1="99" x2="198" y2="100"/>
    <line x1="150" y1="99" x2="198" y2="163"/>
    <line x1="310" y1="36" x2="378" y2="92"/>
    <line x1="310" y1="100" x2="378" y2="100"/>
    <line x1="310" y1="164" x2="378" y2="108"/>
    <line x1="500" y1="99" x2="558" y2="99"/>
  </g>
</svg>
<figcaption>User input updates state. All three state values combine during render to produce a single visible list. The grid always mirrors that list exactly.</figcaption>
</figure>

!!! tip
    Compute the filtered and sorted list during render from the search, category, and sort state. Do not keep a second copy in state. A second copy can fall out of sync, and then you fight bugs that should not exist.

??? note urdu "اردو میں مزید وضاحت"
    فلٹر شدہ فہرست کو الگ سے state میں محفوظ کرنے کی ضرورت نہیں ہے۔ یہ ایک ماخوذ ڈیٹا ہے، یعنی یہ search، category، اور sort کی موجودہ حالت پر منحصر ہے۔ ہر render کے وقت آپ اسے نئے سرے سے بنا لیتے ہیں۔ اگر آپ ایک اور copy بھی state میں رکھیں گے تو دونوں کے درمیان فرق پیدا ہو سکتا ہے۔ اسی لیے فہرست کو render کے دوران ہی filter اور sort کریں۔

---

## Build the Filter component

The `<Filter>` component holds the controls. It does not own the state. The parent owns the state and passes it down with setter functions. This keeps the logic in one place.

```jsx
function Filter({ search, setSearch, category, setCategory, sort, setSort }) {
  return (
    <aside className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
        className="w-full rounded border px-3 py-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="all">All categories</option>
        <option value="kurta">Kurta</option>
        <option value="shirt">Shirt</option>
        <option value="trouser">Trouser</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="none">Sort by</option>
        <option value="low">Price: low to high</option>
        <option value="high">Price: high to low</option>
      </select>
    </aside>
  );
}

export default Filter;
```

The search input is controlled. Its `value` comes from state, and `onChange` updates that state on every keystroke. The two `<select>` menus work the same way. Each one reads its value from props and reports changes back up.

Why does `<Filter>` not own the state? Because the `Shop` page needs the filtered list to render the grid. If `<Filter>` owned the state, you would have to pass the filtered list back up, which is awkward. Keeping state in `Shop` and passing setters down is the right direction for data flow in React.

---

## Put the shop page together

Now combine the state, the filter, and the grid. The `<Filter>` sits on the left. The product grid sits on the right and grows as the screen widens.

```jsx
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

function Shop() {
  // state and `visible` from the sections above

  return (
    <main className="px-6 py-10 grid gap-8 lg:grid-cols-[200px_1fr]">
      <Filter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-slate-500">No products match your search.</p>
        )}
      </section>
    </main>
  );
}

export default Shop;
```

The outer grid puts the filter and the products side by side on large screens. You map over `visible`, not the full list, so the filters take effect. The last line shows a friendly message when nothing matches.

---

### Try this

Build out the home and shop pages in your own store. Add the `Hero`, the featured grid, a testimonial, and a footer, then make the `ProductCard` and `Filter` components. Wire up the three pieces of shop state and derive the visible list during render. When that works, extend it: add a fourth control to the filter, a price range or an "in stock only" checkbox, and make the derived list respect it too. Resize your browser to check the grid moves from one to three columns.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why do you compute the filtered list during render instead of storing it in state?
2. What value should you pass as the `key` on each product card, and why?
3. How does a controlled search input update the list as the user types?
4. Which Tailwind classes set one column on a phone and three on a large screen?

---

## What's next

Your store now has a home page and a working shop. People can browse, filter, and search. In 13.3 you build the product detail page, then add a cart and a simple checkout flow. That is where the store starts to feel real.

[Next lesson: 13.3 Product detail, cart, and checkout &rarr;](13-3-detail-cart-checkout.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Tailwind docs: Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns)
- [react.dev: Rendering Lists](https://react.dev/learn/rendering-lists)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[hero section]: The large top section of a page with a heading and a main button. (Roman Urdu: page ka sab se upar wala bara section)
*[product card]: A small reusable block showing one product image, name, and price. (Roman Urdu: aik product dikhane wala chota box)
*[filter]: A control that narrows a list down to items that match a choice. (Roman Urdu: list ko choti karne wala control)
*[derived state]: Data you compute from other state during render, not stored separately. (Roman Urdu: doosri state se banaya gaya data jo store nahi hota)
*[responsive grid]: A layout that changes its column count based on screen width. (Roman Urdu: screen ke size ke mutabiq columns badalne wala layout)
