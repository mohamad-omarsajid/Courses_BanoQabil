---
lesson_id: frontend.ch13.l03
title: "13.3 Product detail, cart, and checkout"
chapter: 13
order: 3
estimated_minutes: 55
prerequisites:
  - frontend.ch13.l02
---

# 13.3 Product detail, cart, and checkout

You built the home and shop pages in the last lesson. Now you make the store feel real. A shopper clicks a product, picks a size and color, and adds it to a cart. The cart follows them from page to page, and they finish with a checkout form. Let's build the heart of your shop.

## What you'll know by the end

- Read a product id from the URL with `useParams`.
- Build a detail page with size and color choices held in state.
- Share one cart across all pages using a React context.
- Write cart actions that update state immutably.
- Compute the cart total during render.
- Save and load the cart with `localStorage` so it survives refresh.

---

## The product detail page

When a shopper clicks a card in the shop, React Router takes them to a route like `/product/3`. You set up that route in lesson 13.1. Now the detail page needs to know which product to show. The `useParams` hook (Roman Urdu: URL ke badalne wale hisse, jaise product ki id, ko parh kar deta hai) reads the dynamic part of the URL for you.

```jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../cart/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const { addToCart } = useCart();

  if (!product) {
    return <p>Sorry, we could not find that product.</p>;
  }

  return (
    <div className="detail">
      <img src={product.image} alt={product.name} />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p className="price">Rs {product.price}</p>
        <p>{product.description}</p>

        <label>
          Size
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </label>

        <label>
          Color
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option>Black</option>
            <option>White</option>
            <option>Blue</option>
          </select>
        </label>

        <button onClick={() => addToCart(product, size, color)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
```

The URL gives you a string, so `Number(id)` turns it into a number to match your data. The `find` method returns the first product with that id. You guard against a missing product so a bad URL does not crash the page. The two `select` inputs are controlled by `size` and `color` state. When the shopper clicks the button, you call `addToCart` with the product and their choices.

---

## Why we need a cart context

The cart is needed in many places. The header shows a count. The detail page adds items. The cart page lists them. The checkout reads the total. If you stored the cart in one page and passed it down through props, every page in between would have to carry it. That gets messy fast.

React context (Roman Urdu: sab pages ke liye shared data) lets you put the cart in one shared place. Any component can read it directly. This avoids passing the cart through every page as props.

!!! tip
    `useContext` saves you from passing the cart through every page as props. You create it once at the top, and any child can reach it. This pattern is called avoiding prop drilling.

---

## Building the CartContext and useCart hook

Create a file at `src/cart/CartContext.jsx`. It holds three things. A context object, a provider component that owns the cart state, and a small `useCart` hook so other files read the cart cleanly.

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      // localStorage may be full or blocked, so we ignore it
    }
  }, [items]);

  function addToCart(product, size, color) {
    setItems((current) => {
      const key = product.id + "-" + size + "-" + color;
      const found = current.find((item) => item.key === key);
      if (found) {
        return current.map((item) =>
          item.key === key
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...current, { key, product, size, color, qty: 1 }];
    });
  }

  function removeFromCart(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function updateQuantity(key, qty) {
    setItems((current) =>
      current.map((item) =>
        item.key === key ? { ...item, qty } : item
      )
    );
  }

  const value = { items, addToCart, removeFromCart, updateQuantity };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

You wrap your app with `<CartProvider>` once, usually in `App.jsx` around your routes. Now any page calls `useCart()` and gets the cart plus the actions. Each cart item gets a unique `key` built from the product id, size, and color. That way a black medium shirt and a white large shirt stay as two separate lines.

### The cart item data shape

Each object inside the `items` array follows a fixed shape. Knowing this shape helps you understand why the cart page renders correctly.

| Key | Type | Example | Purpose |
| --- | --- | --- | --- |
| `key` | string | `"1-M-Black"` | Unique ID for this size/color combo |
| `product` | object | `{ id:1, name:…, price:1500, … }` | Full product data for display |
| `size` | string | `"M"` | Chosen size |
| `color` | string | `"Black"` | Chosen color |
| `qty` | number | `2` | How many units the shopper wants |

The `key` is built as `productId + "-" + size + "-" + color`. A black M shirt is `"1-M-Black"`. A white L shirt is `"1-L-White"`. These are two separate cart lines even though they are the same product.

### How cart state changes on every action

Every action follows the same pattern: take the current items, apply a transformation, and return a new array.

<figure markdown>
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-cart-flow" style="max-width:100%;height:auto">
  <title id="svg-cart-flow">Cart state flow diagram. Adding an item either increments quantity if the key exists or appends a new line. Updating quantity maps over items and changes qty for the matching key. Removing calls filter to drop the matching key. After each action the new array is written to localStorage.</title>
  <defs>
    <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="120" width="120" height="60" rx="6"/>
    <rect x="210" y="40" width="130" height="44" rx="5"/>
    <rect x="210" y="128" width="130" height="44" rx="5"/>
    <rect x="210" y="216" width="130" height="44" rx="5"/>
    <rect x="420" y="120" width="130" height="60" rx="6"/>
    <rect x="570" y="120" width="130" height="60" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <g>
      <text x="80" y="145">User action</text>
      <text x="80" y="162">(add/update/remove)</text>
    </g>
    <g><text x="275" y="67">addToCart</text><text x="275" y="80">(map or append)</text></g>
    <g><text x="275" y="155">updateQuantity</text><text x="275" y="168">(map, change qty)</text></g>
    <g><text x="275" y="243">removeFromCart</text><text x="275" y="256">(filter out key)</text></g>
    <g>
      <text x="485" y="145">New items</text>
      <text x="485" y="162">array</text>
    </g>
    <g>
      <text x="635" y="145">localStorage</text>
      <text x="635" y="162">updated</text>
    </g>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr3)">
    <line x1="140" y1="148" x2="208" y2="65"/>
    <line x1="140" y1="150" x2="208" y2="150"/>
    <line x1="140" y1="152" x2="208" y2="236"/>
    <line x1="340" y1="62" x2="418" y2="142"/>
    <line x1="340" y1="150" x2="418" y2="150"/>
    <line x1="340" y1="238" x2="418" y2="158"/>
    <line x1="550" y1="150" x2="568" y2="150"/>
  </g>
</svg>
<figcaption>Every cart action produces a fresh array from the current one. The result is written to localStorage automatically by the useEffect in CartProvider.</figcaption>
</figure>

!!! warning
    Always update cart state immutably with `map`, `filter`, and spread. Never push into the array or change an item in place. If you mutate the old array, React may not see a change and may not re-render. Also wrap every `localStorage` read in a `try/catch`, because the stored text can be missing or broken.

---

## Wiring the provider into your app

The provider must sit above every page that uses the cart. You place it once near the top of your route tree.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./cart/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
```

The `:id` part in `/product/:id` is the dynamic value that `useParams` reads. Because `CartProvider` wraps everything, all five pages can call `useCart`.

---

## The cart page and the total

The cart page lists every item, lets the shopper change quantity or remove a line, and shows the total. You compute the total during render. No extra state is needed, because the total always follows from the items.

```jsx
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      {items.map((item) => (
        <div className="cart-row" key={item.key}>
          <span>{item.product.name}</span>
          <span>{item.size} / {item.color}</span>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQuantity(item.key, Number(e.target.value))
            }
          />
          <span>Rs {item.product.price * item.qty}</span>
          <button onClick={() => removeFromCart(item.key)}>Remove</button>
        </div>
      ))}

      <p className="cart-total">Total: Rs {total}</p>
      <Link to="/checkout">Go to Checkout</Link>
    </div>
  );
}

export default Cart;
```

The `reduce` method walks the items and adds each price times its quantity. You start the sum at `0`. Because you read `items` from the context, the page updates the moment any action changes the cart. The quantity input calls `updateQuantity` with the new number.

---

## The checkout form

The checkout collects a name, an address, and a payment field. The payment field is only a placeholder. You are not taking real money here, so do not type a real card. On submit you check the fields and show a simple order summary.

### The checkout steps

Before you write the form code, picture the two states the checkout page lives in: the form, and the success screen.

<figure markdown>
<svg viewBox="0 0 660 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-checkout-steps" style="max-width:100%;height:auto">
  <title id="svg-checkout-steps">Checkout flow with two states. State one is the checkout form showing name, address, payment fields and a Place Order button. An arrow labelled validation passes leads to state two, the order success screen, showing thank-you message, address, and total.</title>
  <defs>
    <marker id="arr4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="30" width="250" height="140" rx="6"/>
    <rect x="390" y="30" width="250" height="140" rx="6"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1">
    <rect x="36" y="56" width="218" height="20" rx="3"/>
    <rect x="36" y="86" width="218" height="20" rx="3"/>
    <rect x="36" y="116" width="218" height="20" rx="3"/>
    <rect x="80" y="146" width="130" height="18" rx="3"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <g><text x="145" y="46">Checkout Form</text></g>
    <g><text x="145" y="70">Name field</text></g>
    <g><text x="145" y="100">Address field</text></g>
    <g><text x="145" y="130">Payment field (demo)</text></g>
    <g><text x="145" y="159">Place Order</text></g>
    <g><text x="515" y="46">Order Placed</text></g>
    <g><text x="515" y="80">Thank you, {name}</text></g>
    <g><text x="515" y="104">Shipping to: {address}</text></g>
    <g><text x="515" y="128">Total: Rs {total}</text></g>
    <g><text x="515" y="152">Demo only notice</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="320" y="88">validation</text>
    <text x="320" y="101">passes</text>
    <text x="320" y="114">(placed = true)</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr4)">
    <line x1="270" y1="100" x2="388" y2="100"/>
  </g>
</svg>
<figcaption>The checkout page has two states. While placed is false, the form shows. Once validation passes and placed becomes true, the success screen replaces it.</figcaption>
</figure>

```jsx
import { useState } from "react";
import { useCart } from "../cart/CartContext";

function Checkout() {
  const { items } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState([]);
  const [placed, setPlaced] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();
    const found = [];
    if (name.trim() === "") found.push("Please enter your name.");
    if (address.trim() === "") found.push("Please enter your address.");
    if (payment.trim() === "") found.push("Please enter a payment value.");
    setErrors(found);
    if (found.length === 0) {
      setPlaced(true);
    }
  }

  if (placed) {
    return (
      <div className="summary">
        <h2>Thank you, {name}</h2>
        <p>We will ship to: {address}</p>
        <p>Order total: Rs {total}</p>
        <p>This is a demo, so no real payment was taken.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout">
      {errors.map((msg) => (
        <p className="error" key={msg}>{msg}</p>
      ))}

      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Address
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>

      <label>
        Payment (demo only, do not use a real card)
        <input
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        />
      </label>

      <p>Total to pay: Rs {total}</p>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default Checkout;
```

The `e.preventDefault()` stops the browser from reloading the page. You collect any error messages in an array and store them in state. If the array is empty, the form is valid, and you set `placed` to true. The success view shows the order summary and reminds everyone this is only a demo.

Why collect errors in an array rather than separate boolean flags? Because you can show every missing field at once. If you used separate booleans, you would need three separate conditionals. The array approach scales to ten fields just as easily as three.

---

## Saving the cart with localStorage

A shopper hates losing a full cart on refresh. You already added persistence inside `CartProvider`, so let's look at the two parts closely.

!!! note "localStorage is for learning, not for a real shop"
    `localStorage` is perfect here: it is simple and it keeps the cart on refresh. But know its limits before you carry this habit into paid work. It only holds text, it caps out around 5 MB, it cannot share data between two open tabs, and it lives on one device only. A real store keeps its cart and orders in a database on a server. You will meet more reliable state and data tools in Chapter 14 (Context and routing) and Chapter 19 (Zustand and TanStack Query).

```jsx
const [items, setItems] = useState(() => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    // ignore storage errors
  }
}, [items]);
```

The first part is a lazy initial state. You pass a function to `useState`, so React runs it once to set the starting cart. It reads the saved text and turns it back into an array with `JSON.parse`. The second part is a `useEffect` that runs whenever `items` changes. It writes the cart back as a string with `JSON.stringify`. Both parts use `try/catch`, because storage can be blocked or hold broken text.

??? note urdu "اردو میں مزید وضاحت"
    کارٹ کو ہر صفحے پر شیئر کرنے کے لیے ہم ری ایکٹ کا کونٹیکسٹ استعمال کرتے ہیں۔ اس سے کارٹ کو پراپس میں ایک ایک صفحے سے گزارنے کی ضرورت نہیں رہتی۔ ہم کونٹیکسٹ ایک بار بناتے ہیں اور کوئی بھی کمپوننٹ اسے سیدھا پڑھ سکتا ہے۔ کارٹ کو لوکل اسٹوریج میں محفوظ کرتے ہیں تاکہ صفحہ ریفریش ہونے پر بھی وہ موجود رہے۔ ہمیشہ اسٹیٹ کو میپ، فلٹر اور اسپریڈ سے بدلیں، پرانی ارے کو سیدھا نہ چھیڑیں۔

---

### Try this

Wire the detail page, cart context, cart page, and checkout into your own store. Add a product to the cart, refresh the page, and confirm the cart survives. When the basic flow works, extend it: add a small cart count badge in your navbar that reads `items` from `useCart` and shows the total number of items. It should update the moment you add or remove anything, and stay correct after a refresh.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does `useParams` give you, and why do you wrap the id in `Number`?
2. Why do we put the cart in a context instead of passing it through props?
3. Why must you use `map`, `filter`, and spread instead of changing the array in place?
4. Which two parts of the provider make the cart survive a page refresh?

---

## What's next

Your shop now works from browse to buy. In 13.4 you polish the look, deploy the site so others can open it, and write a clear README that explains your project. That last step turns your code into something you can proudly share.

[Next lesson: 13.4 Polish, deploy, and a great README &rarr;](13-4-polish-deploy-readme.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [MDN: Window localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[useParams]: A React Router hook that reads dynamic values from the URL. (Roman Urdu: URL ke badalne wale hisse, jaise product ki id, ko parh kar deta hai)
*[useContext]: A React hook that reads a shared value from a context. (Roman Urdu: shared value parhne wala hook)
*[context]: A shared box of data that many components can read without props. (Roman Urdu: sab pages ke liye shared data)
*[provider]: A component that owns the context value and wraps the children. (Roman Urdu: context ki value rakhne wala component)
*[localStorage]: A browser store that keeps text data even after refresh. (Roman Urdu: browser mein data save rakhne ki jagah)
*[immutable update]: Making a new array or object instead of changing the old one. (Roman Urdu: purani cheez badalne ke bajaye nayi banana)
