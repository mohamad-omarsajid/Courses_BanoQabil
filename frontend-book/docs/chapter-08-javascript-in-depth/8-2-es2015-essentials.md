---
lesson_id: frontend.ch08.l02
title: "8.2 ES2015+ essentials"
chapter: 8
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch08.l01
---

# 8.2 ES2015+ essentials

In 7.1 you worked with arrays and objects. You wrote some code that felt long and repetitive. Modern JavaScript gives you shorter, cleaner ways to do the same work. This lesson teaches the syntax you will see in every real project today.

## What you'll know by the end

- What ES2015 and ES6 mean, and why people say "modern JavaScript".
- How to pull values out of arrays and objects with destructuring.
- How to copy and merge arrays and objects with the spread operator.
- How to gather extra arguments using rest parameters.
- How to read deep values safely with `?.` and set defaults with `??`.
- How to split code into files using `export` and `import`.

---

## What ES2015 even means

JavaScript gets a new version almost every year. The big one landed in 2015. People call it ES2015 or ES6. Every version after that just adds more useful features.

You do not need to memorize version numbers. When someone says "modern JavaScript", they mean the features from 2015 onward. That is what this whole lesson covers.

---

## ES2015+ features at a glance

Here is a quick map of everything in this lesson before you go deep.

| Feature | Before ES2015 | After ES2015 | What it does |
| --- | --- | --- | --- |
| Array destructuring | `var a = arr[0]; var b = arr[1];` | `const [a, b] = arr;` | pull array items into named variables |
| Object destructuring | `var n = obj.name; var p = obj.price;` | `const { name, price } = obj;` | pull object keys into named variables |
| Spread (array) | `var c = a.concat(b);` | `const c = [...a, ...b];` | copy and merge arrays |
| Spread (object) | `Object.assign({}, base, extra)` | `{ ...base, ...extra }` | copy and merge objects |
| Rest parameters | `arguments` object | `function f(...args)` | collect all extra arguments into an array |
| Template literals | `"Hi " + name` | `` `Hi ${name}` `` | embed values in strings cleanly |
| Optional chaining | `obj && obj.a && obj.a.b` | `obj?.a?.b` | read deep values without crashing |
| Nullish coalescing | `val !== null && val !== undefined ? val : def` | `val ?? def` | default only for null or undefined |
| Modules | no native splitting | `export` / `import` | share code across files |

---

## Array destructuring

Destructuring (Roman Urdu: todna aur nikaalna, ek hi line mein values alag karna) lets you pull values out of an array into separate variables. You do it in one line.

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);  // "red"
console.log(second); // "green"
```

The positions match. `first` takes index 0, and `second` takes index 1. The names are yours to choose. You skipped writing `colors[0]` and `colors[1]` by hand.

---

## Object destructuring

You can do the same with objects. Here the names must match the keys.

```js
const product = { name: "Mouse", price: 500, stock: 12 };

const { name, price } = product;

console.log(name);  // "Mouse"
console.log(price); // 500
```

You can rename a value while you pull it out. You can also set a default for keys that might be missing.

```js
const { name: title, color = "black" } = product;

console.log(title); // "Mouse"
console.log(color); // "black" (product has no color, so the default fills in)
```

`name: title` reads the `name` key but stores it as `title`. `color = "black"` runs only when `color` is missing.

---

## Before and after: destructuring side by side

The table below shows exactly how much writing you save.

| Task | Without destructuring | With destructuring |
| --- | --- | --- |
| Pull two array items | `const a = arr[0]; const b = arr[1];` | `const [a, b] = arr;` |
| Pull two object keys | `const n = obj.name; const p = obj.price;` | `const { name, price } = obj;` |
| Rename while pulling | `const title = obj.name;` | `const { name: title } = obj;` |
| Set a default | `const c = obj.color !== undefined ? obj.color : "black";` | `const { color = "black" } = obj;` |
| Skip an array item | `const b = arr[1];` | `const [, b] = arr;` |

---

## The spread operator

The spread operator (Roman Urdu: phailana, items ko copy karke nai jagah rakhna) is three dots `...`. It spreads the items of an array or object into a new one. This is the clean way to copy and merge.

```js
const a = [1, 2];
const b = [3, 4];

const both = [...a, ...b];

console.log(both); // [1, 2, 3, 4]
```

It works on objects too. Later keys win when keys repeat.

```js
const base = { name: "Mouse", price: 500 };

const updated = { ...base, price: 450, onSale: true };

console.log(updated); // { name: "Mouse", price: 450, onSale: true }
```

You made a fresh object. The original `base` stayed the same. That is called working immutably, and it prevents many bugs.

Here is a picture of what spread does to an array.

<figure markdown>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-spread-title" style="max-width:100%;height:auto">
  <title id="svg-spread-title">Spread copies array a holding 1 and 2, then array b holding 3 and 4, into a new array both holding 1, 2, 3, 4. The originals are unchanged.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="50" width="55" height="36" rx="5"/>
    <rect x="85" y="50" width="55" height="36" rx="5"/>
    <rect x="20" y="130" width="55" height="36" rx="5"/>
    <rect x="85" y="130" width="55" height="36" rx="5"/>
    <rect x="490" y="50" width="55" height="36" rx="5"/>
    <rect x="555" y="50" width="55" height="36" rx="5"/>
    <rect x="490" y="96" width="55" height="36" rx="5"/>
    <rect x="555" y="96" width="55" height="36" rx="5"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="15" text-anchor="middle" fill="#1f1f1c">
    <text x="47" y="73">1</text>
    <text x="112" y="73">2</text>
    <text x="47" y="153">3</text>
    <text x="112" y="153">4</text>
    <text x="517" y="73">1</text>
    <text x="582" y="73">2</text>
    <text x="517" y="119">3</text>
    <text x="582" y="119">4</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="64" y="38">array a</text>
    <text x="64" y="118">array b</text>
    <text x="536" y="38">both = [...a, ...b]</text>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="290" y="84" width="120" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" text-anchor="middle" fill="#1f1f1c">
    <text x="350" y="111">spread ...</text>
  </g>
  <defs>
    <marker id="bq-arr-spread" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-spread)">
    <line x1="141" y1="68" x2="289" y2="100"/>
    <line x1="141" y1="148" x2="289" y2="110"/>
    <line x1="411" y1="100" x2="489" y2="75"/>
    <line x1="411" y1="108" x2="489" y2="114"/>
  </g>
</svg>
<figcaption>Spread unpacks the items of each array and places them in order into a new one. The originals stay exactly as they were.</figcaption>
</figure>

---

## Rest parameters

Rest parameters look like spread, but they do the opposite. They gather many arguments into one array. You use them inside a function.

```js
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sum(2, 4, 6));    // 12
console.log(sum(10, 20));     // 30
console.log(sum(5));          // 5
```

You can call `sum` with any number of arguments. JavaScript collects them all into the `nums` array for you.

| | Spread | Rest |
| --- | --- | --- |
| Where | outside a function, on arrays or objects | inside a function parameter list |
| What it does | unpacks items from a collection | packs arguments into an array |
| Example | `[...a, ...b]` | `function f(...args)` |

---

## Template literals (quick recap)

You met these in 6.1. Use backticks and `${}` to drop values straight into a string, like `` `Total is ${price} rupees` ``.

---

## Optional chaining with ?.

Sometimes you read a value deep inside an object. If a middle part is missing, your code crashes. Optional chaining (Roman Urdu: mehfooz rastay se parhna, crash se bachna) stops that crash.

```js
const user = { name: "Sara" };

console.log(user.address.city);   // crashes: cannot read city of undefined
console.log(user?.address?.city); // undefined (no crash)
```

The `?.` checks each step. If something is missing, it stops and gives `undefined` instead of throwing an error.

!!! tip
    Optional chaining saves you from the famous "cannot read property of undefined" error. When data comes from an API, you cannot trust that every field exists. A few `?.` marks keep your page alive.

---

## Nullish coalescing with ??

The `??` operator gives a default value, but only when the left side is `null` or `undefined`.

```js
const stock = 0;

console.log(stock ?? 10); // 0  (0 is a real value, so it stays)
console.log(stock || 10); // 10 (|| treats 0 as missing)
```

This is the key difference. The `||` operator also fires on `0`, an empty string `""`, and `false`. The `??` operator only fires on `null` and `undefined`.

!!! warning
    The `||` operator treats `0` and `""` as missing. So a price of 0 or an empty name would get replaced. When `0` or `""` is a valid value, use `??` instead.

| Left side value | `\|\|` result | `??` result | Which is right? |
| --- | --- | --- | --- |
| `null` | uses default | uses default | both same |
| `undefined` | uses default | uses default | both same |
| `0` | uses default | keeps `0` | `??` is right here |
| `""` | uses default | keeps `""` | `??` is right here |
| `false` | uses default | keeps `false` | `??` is right here |
| `"hello"` | keeps `"hello"` | keeps `"hello"` | both same |

??? note urdu "اردو میں مزید وضاحت"
    یہ lesson modern JavaScript کا خلاصہ ہے۔ destructuring کا مطلب ہے کہ array یا object سے values نکال کر ایک ہی لائن میں الگ الگ variables میں رکھ لو۔ spread کا مطلب ہے کہ array یا object کو کاپی کرو اور نئی جگہ رکھو۔ rest کا مطلب ہے کہ function میں آنے والے سارے arguments کو ایک array میں اکٹھا کرو۔ Optional chaining یعنی `?.` آپ کو محفوظ رکھتا ہے۔ جب object کے اندر کوئی value موجود نہ ہو، تو کوڈ کریش نہیں ہوتا۔ اس کی جگہ آپ کو `undefined` ملتا ہے۔ دوسری طرف `??` صرف اسی وقت ڈیفالٹ value دیتا ہے جب اصل value `null` یا `undefined` ہو۔ یاد رکھیں کہ `||` صفر اور خالی string کو بھی غائب سمجھ لیتا ہے، اس لیے ایسے موقع پر `??` بہتر ہے۔

---

## Modules: export and import

Real projects split code across many files. You share code between files using `export` and `import`. A file that shares code is called a module.

```js
// cart.js
export function addItem(cart, item) {
  return [...cart, item];
}

export const TAX = 0.1;

export default function emptyCart() {
  return [];
}
```

`export` shares named things. `export default` marks one main thing per file. Now you import them in another file.

```js
// main.js
import emptyCart, { addItem, TAX } from "./cart.js";

const cart = emptyCart();
const updated = addItem(cart, { name: "Mouse", price: 500 });
```

The default import needs no braces. Named imports go inside braces. To make this run in a browser, use `<script type="module" src="main.js"></script>`. In a tool like Vite, it just works.

---

## const does not freeze contents

A `const` variable cannot be reassigned. But this does not lock the contents of an array or object. You can still change what is inside.

```js
const cart = [];

cart.push("Mouse"); // this works fine
console.log(cart);   // ["Mouse"]

cart = ["Keyboard"]; // this throws an error: reassignment is blocked
```

So `const` blocks the variable from pointing somewhere new. It does not block you from editing the thing it already points to.

---

## Real-world example: refactor the cart

Remember the cart code from 7.1. Let us make it cleaner with destructuring and spread.

```js
const products = [
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1200 },
];

// Destructure name and price out of each product
products.forEach((product) => {
  const { name, price } = product;
  console.log(`${name} costs ${price} rupees`);
});
// Mouse costs 500 rupees
// Keyboard costs 1200 rupees

// Add an item to the cart immutably with spread
const cart = [{ name: "Mouse", price: 500 }];
const newItem = { name: "Cable", price: 200 };

const updatedCart = [...cart, newItem];

console.log(updatedCart);
// [ { name: "Mouse", price: 500 }, { name: "Cable", price: 200 } ]
```

Destructuring pulled `name` and `price` straight out of each product. Spread built a new cart with the extra item, while the old cart stayed untouched.

### Try this

Make an object `const user = { name: "Sara", city: "Lahore" }`. On the next line, use object destructuring to pull `name` and `city` into their own variables. Then log one sentence using them, like `Sara lives in Lahore`. Keep it to these two steps.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does `const { name, price } = product` do?
2. How do you copy an array and add one more item in a single line?
3. Why might `??` be safer than `||` when the value could be `0`?
4. Can you `push` to an array that was declared with `const`? Why or why not?

---

## What's next

You now write modern JavaScript with short, clean syntax. So far your code only logs to the console. Next you learn the DOM, which lets your JavaScript change the actual page that users see and touch.

[Next lesson: 7.3 The DOM &rarr;](8-3-the-dom.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [javascript.info: Destructuring assignment](https://javascript.info/destructuring-assignment)
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[ES2015]: The 2015 version of JavaScript, also called ES6, that added modern syntax. (Roman Urdu: JavaScript ka 2015 wala modern version)
*[destructuring]: Pulling values out of an array or object into separate variables in one line. (Roman Urdu: array ya object ke andar se values nikal kar seedha alag alag variables mein rakhna, aik hi line mein.)
*[spread operator]: Three dots that spread items of an array or object into a new one. (Roman Urdu: teen dots jo items ko phaila kar copy karte hain)
*[rest parameter]: A function parameter with three dots that gathers many arguments into one array. (Roman Urdu: kayi arguments ko ek array mein jama karna)
*[optional chaining]: The `?.` operator that reads deep values without crashing when a part is missing. (Roman Urdu: gehri value safely parhna bina crash ke)
*[nullish coalescing]: The `??` operator that gives a default only when a value is null or undefined. (Roman Urdu: default sirf null ya undefined par dena)
*[module]: A JavaScript file that shares its code using export and import. (Roman Urdu: code share karne wali JavaScript file)
