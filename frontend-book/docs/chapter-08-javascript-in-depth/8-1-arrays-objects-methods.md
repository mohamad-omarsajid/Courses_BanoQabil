---
lesson_id: frontend.ch08.l01
title: "8.1 Arrays, objects, and modern methods"
chapter: 8
order: 1
estimated_minutes: 45
prerequisites:
  - frontend.ch07.l04
---

# 8.1 Arrays, objects, and modern methods

In Chapter 7 you learned variables, loops, and functions. Now you learn how to hold many values at once. Arrays hold lists. Objects hold labeled facts. With a few modern methods, you can shape this data in clean and short ways.

## What you'll know by the end

- How to create arrays, read items by index, and check `.length`.
- How to add and remove items with `push`, `pop`, `shift`, `unshift`, `splice`, and `slice`.
- How to use `forEach`, `map`, `filter`, `find`, `some`, `every`, and `includes`.
- How to sort numbers the right way and how to use `reduce` for a total.
- How to build objects and read them with dot and bracket notation.
- How to loop over object data with `Object.keys`, `Object.values`, and `Object.entries`.

---

## Arrays vs objects: what shape suits your data?

Before writing any code, pick the right container. An array is a numbered list. You access items by position. An object is a bag of labeled facts. You access items by name.

<figure markdown>
<svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-arr-obj-title" style="max-width:100%;height:auto">
  <title id="svg-arr-obj-title">Array on the left: four numbered slots 0, 1, 2, 3 holding apple, banana, mango, grape. Object on the right: four labeled keys name, age, city, enrolled each pointing to its value.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="20" width="310" height="220" rx="10"/>
    <rect x="400" y="20" width="310" height="220" rx="10"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="185" y="50">Array (ordered, numbered)</text>
    <text x="555" y="50">Object (labeled keys)</text>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="55" y="64" width="50" height="36" rx="4"/>
    <rect x="115" y="64" width="80" height="36" rx="4"/>
    <rect x="55" y="110" width="50" height="36" rx="4"/>
    <rect x="115" y="110" width="80" height="36" rx="4"/>
    <rect x="55" y="156" width="50" height="36" rx="4"/>
    <rect x="115" y="156" width="80" height="36" rx="4"/>
    <rect x="55" y="202" width="50" height="36" rx="4"/>
    <rect x="115" y="202" width="80" height="36" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="80" y="87">0</text>
    <text x="80" y="133">1</text>
    <text x="80" y="179">2</text>
    <text x="80" y="225">3</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="155" y="87">apple</text>
    <text x="155" y="133">banana</text>
    <text x="155" y="179">mango</text>
    <text x="155" y="225">grape</text>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="420" y="64" width="70" height="36" rx="4"/>
    <rect x="500" y="64" width="90" height="36" rx="4"/>
    <rect x="420" y="110" width="70" height="36" rx="4"/>
    <rect x="500" y="110" width="90" height="36" rx="4"/>
    <rect x="420" y="156" width="70" height="36" rx="4"/>
    <rect x="500" y="156" width="90" height="36" rx="4"/>
    <rect x="420" y="202" width="70" height="36" rx="4"/>
    <rect x="500" y="202" width="90" height="36" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="455" y="87">name</text>
    <text x="455" y="133">age</text>
    <text x="455" y="179">city</text>
    <text x="455" y="225">enrolled</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="545" y="87">Ayesha</text>
    <text x="545" y="133">20</text>
    <text x="545" y="179">Lahore</text>
    <text x="545" y="225">true</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="105" y1="82" x2="115" y2="82"/>
    <line x1="105" y1="128" x2="115" y2="128"/>
    <line x1="105" y1="174" x2="115" y2="174"/>
    <line x1="105" y1="220" x2="115" y2="220"/>
    <line x1="490" y1="82" x2="500" y2="82"/>
    <line x1="490" y1="128" x2="500" y2="128"/>
    <line x1="490" y1="174" x2="500" y2="174"/>
    <line x1="490" y1="220" x2="500" y2="220"/>
  </g>
</svg>
<figcaption>Use an array when order matters and items are all the same kind of thing. Use an object when you describe one thing with named facts about it.</figcaption>
</figure>

| Question | Pick |
| --- | --- |
| Is the order important? Do items have positions? | Array |
| Are all items the same kind of thing (products, names, scores)? | Array |
| Does one item have several different facts (name, age, city)? | Object |
| Do you need to look things up by a meaningful name, not a number? | Object |

---

## Arrays: a list of values

An array is an ordered list. You create one with square brackets `[]`. Each item sits at a position called an index (Roman Urdu: list mein kisi cheez ki jagah ka number). Indexes start at `0`, not `1`.

```js
let fruits = ["apple", "banana", "mango"];

console.log(fruits[0]); // apple
console.log(fruits[2]); // mango
console.log(fruits.length); // 3
```

The first item is `fruits[0]`. The `.length` property tells you how many items the array has. The last index is always `length - 1`.

---

## Adding and removing items

Some methods change the array in place. We call this mutating. Here are the four common ones.

```js
let nums = [1, 2, 3];

nums.push(4); // add to the end
console.log(nums); // [1, 2, 3, 4]

nums.pop(); // remove from the end
console.log(nums); // [1, 2, 3]

nums.unshift(0); // add to the start
console.log(nums); // [0, 1, 2, 3]

nums.shift(); // remove from the start
console.log(nums); // [1, 2, 3]
```

Think of `push` and `pop` as working on the right side. Think of `unshift` and `shift` as working on the left side.

| Method | Where it acts | Changes original? | Returns |
| --- | --- | --- | --- |
| `push(item)` | end | yes | new length |
| `pop()` | end | yes | removed item |
| `unshift(item)` | start | yes | new length |
| `shift()` | start | yes | removed item |

---

## splice and slice

`splice` removes or inserts items at any index. It changes the original array. `slice` copies a part of the array. It does not change the original.

```js
let colors = ["red", "green", "blue", "pink"];

// splice(start, howMany, ...itemsToAdd)
colors.splice(1, 1); // remove 1 item at index 1
console.log(colors); // ["red", "blue", "pink"]

colors.splice(1, 0, "yellow"); // insert at index 1, remove nothing
console.log(colors); // ["red", "yellow", "blue", "pink"]

let part = colors.slice(1, 3); // copy index 1 up to (not including) 3
console.log(part); // ["yellow", "blue"]
console.log(colors); // unchanged
```

Notice that `slice` left `colors` alone. The names look similar, but only `splice` edits the original.

---

## forEach: do something per item

`forEach` runs a function once for each item. It returns nothing. You use it to act on each item, like printing.

```js
let names = ["Ali", "Sara", "Bilal"];

names.forEach(function (name) {
  console.log("Hello " + name);
});
// Hello Ali
// Hello Sara
// Hello Bilal
```

The function gets each item as its argument. This is the callback idea from Chapter 7.

---

## map: transform into a new array

`map` makes a new array. It runs your function on each item and collects the results. The original array is never touched.

```js
let prices = [100, 200, 300];

let withTax = prices.map(function (price) {
  return price * 1.1;
});

console.log(withTax); // [110, 220, 330.00000000000006]
console.log(prices); // [100, 200, 300] still the same
```

`map` returned a fresh array. That floating point ending is normal in JavaScript math.

Here is a picture of what `map` does. Each input item passes through your function and lands in a new slot.

<figure markdown>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-map-title" style="max-width:100%;height:auto">
  <title id="svg-map-title">map transforms [1, 2, 3] through the function x times 2 into a new array [2, 4, 6]. The original array is unchanged.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="40" width="60" height="40" rx="6"/>
    <rect x="30" y="100" width="60" height="40" rx="6"/>
    <rect x="30" y="160" width="60" height="40" rx="6"/>
    <rect x="590" y="40" width="60" height="40" rx="6"/>
    <rect x="590" y="100" width="60" height="40" rx="6"/>
    <rect x="590" y="160" width="60" height="40" rx="6"/>
    <rect x="290" y="80" width="120" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="16" text-anchor="middle" fill="#1f1f1c">
    <text x="60" y="66">1</text>
    <text x="60" y="126">2</text>
    <text x="60" y="186">3</text>
    <text x="620" y="66">2</text>
    <text x="620" y="126">4</text>
    <text x="620" y="186">6</text>
    <text x="350" y="108">x * 2</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="60" y="22">original</text>
    <text x="620" y="22">new array</text>
    <text x="350" y="70">your function</text>
  </g>
  <defs>
    <marker id="bq-arr-map" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-map)">
    <line x1="90" y1="60" x2="289" y2="98"/>
    <line x1="90" y1="120" x2="289" y2="108"/>
    <line x1="90" y1="178" x2="289" y2="118"/>
    <line x1="411" y1="98" x2="589" y2="60"/>
    <line x1="411" y1="108" x2="589" y2="120"/>
    <line x1="411" y1="118" x2="589" y2="178"/>
  </g>
</svg>
<figcaption>map passes every item through your function and collects each result into a brand new array. The original is never changed.</figcaption>
</figure>

---

## filter: keep items that pass a test

`filter` makes a new array with only the items that pass your test. Your function returns `true` to keep an item.

```js
let scores = [40, 75, 90, 33, 60];

let passing = scores.filter(function (score) {
  return score >= 50;
});

console.log(passing); // [75, 90, 60]
```

Each item that returned `true` was kept. The rest were dropped from the new array.

---

## find, findIndex, some, every, includes

These methods ask questions about your array. They are short and clear.

```js
let ages = [12, 18, 25, 30];

console.log(ages.find(a => a >= 18)); // 18  (first match)
console.log(ages.findIndex(a => a >= 18)); // 1  (its index)
console.log(ages.some(a => a > 28)); // true  (any over 28?)
console.log(ages.every(a => a >= 10)); // true  (all 10 or more?)
console.log(ages.includes(25)); // true  (contains 25?)
```

`find` returns the first matching value. `findIndex` returns its position. `some` checks if at least one passes. `every` checks if all pass. `includes` checks for an exact value.

---

## Array methods reference table

Here is a side-by-side view of the most useful array methods. Print it, keep it next to you.

| Method | What it does | Changes original? | Returns |
| --- | --- | --- | --- |
| `forEach(fn)` | runs `fn` for each item | no | `undefined` |
| `map(fn)` | transforms each item | no | new array |
| `filter(fn)` | keeps items where `fn` returns `true` | no | new array |
| `find(fn)` | first item where `fn` returns `true` | no | item or `undefined` |
| `findIndex(fn)` | position of first match | no | number or `-1` |
| `some(fn)` | true if at least one item passes | no | `true` or `false` |
| `every(fn)` | true if all items pass | no | `true` or `false` |
| `includes(val)` | true if `val` is in the array | no | `true` or `false` |
| `reduce(fn, start)` | boils the whole array to one value | no | any value |
| `sort(fn)` | puts items in order | yes | same array |
| `splice(i, n)` | removes or inserts at index | yes | removed items |
| `slice(a, b)` | copies a portion | no | new array |
| `push(item)` | adds to the end | yes | new length |
| `pop()` | removes from the end | yes | removed item |

---

## sort: putting items in order

`sort` orders the items. But it has a trap. By default it turns items into strings before comparing.

```js
let list = [10, 9, 2, 100];

list.sort();
console.log(list); // [10, 100, 2, 9]  wrong order
```

That looks broken, and the joke is that the computer is technically correct, which is the worst kind of correct. As strings, "10" comes before "2". To sort numbers, pass a compare function.

```js
let nums = [10, 9, 2, 100];

nums.sort((a, b) => a - b);
console.log(nums); // [2, 9, 10, 100]  correct
```

The `(a, b) => a - b` compare function sorts numbers from low to high.

!!! warning
    `sort` converts items to strings by default. So `[10, 9, 2].sort()` gives a wrong order. Always use `(a, b) => a - b` when sorting numbers.

---

## reduce: boil an array down to one value

`reduce` takes a list and returns one value. A common use is adding numbers into a total. It keeps a running value called the accumulator (Roman Urdu: jama karne wala, har qadam par total ko update karta hai).

```js
let cart = [50, 120, 30];

let total = cart.reduce(function (sum, item) {
  return sum + item;
}, 0);

console.log(total); // 200
```

The `0` is the starting value of `sum`. For each item, you return the new sum. At the end you get one number.

!!! tip
    `map`, `filter`, and `reduce` return a new array or value. They do not change the original. This keeps your data safe and your bugs fewer.

---

## Objects: labeled facts

An array uses number positions. An object uses names, called keys (Roman Urdu: naam, jis se value dhoondi jati hai). You create one with curly braces `{}`. Each entry is a key and a value.

```js
let student = {
  name: "Ayesha",
  age: 20,
  enrolled: true
};

console.log(student.name); // Ayesha  (dot notation)
console.log(student["age"]); // 20  (bracket notation)
```

Dot notation is the common way to read a value. Bracket notation does the same, but uses a string key.

---

## When you need bracket notation

You need brackets when the key is dynamic. That means the key lives inside a variable, not typed directly.

```js
let car = { brand: "Toyota", year: 2021 };

let key = "brand";
console.log(car[key]); // Toyota
console.log(car.key); // undefined  (looks for a key literally named "key")
```

With `car[key]`, JavaScript reads the variable `key` first, which is `"brand"`. With `car.key`, it looks for a key spelled `key`, which does not exist.

---

## Looping over object data

Three helpers turn an object into arrays you can loop. They are `Object.keys`, `Object.values`, and `Object.entries`.

```js
let book = { title: "JS Basics", pages: 120, free: true };

console.log(Object.keys(book)); // ["title", "pages", "free"]
console.log(Object.values(book)); // ["JS Basics", 120, true]
console.log(Object.entries(book)); // [["title", "JS Basics"], ["pages", 120], ["free", true]]
```

`Object.keys` gives the names. `Object.values` gives the values. `Object.entries` gives pairs. Now you can use array methods on object data.

| Helper | What you get | Good for |
| --- | --- | --- |
| `Object.keys(obj)` | array of key names | looping over all property names |
| `Object.values(obj)` | array of values | totaling, filtering by value |
| `Object.entries(obj)` | array of `[key, value]` pairs | rendering each key and value together |

---

## Real world: a shopping cart total

Here is a real task. You have a list of products. Each product is an object with `name`, `price`, and `inStock`. You want the total price of in stock items only.

```js
let products = [
  { name: "Keyboard", price: 1500, inStock: true },
  { name: "Mouse", price: 800, inStock: true },
  { name: "Monitor", price: 12000, inStock: false },
  { name: "USB Cable", price: 300, inStock: true },
  { name: "Webcam", price: 4000, inStock: false },
  { name: "Headset", price: 2500, inStock: true }
];

// 1. Keep only in stock items
let available = products.filter(function (item) {
  return item.inStock;
});

// 2. Get just the prices
let prices = available.map(function (item) {
  return item.price;
});

// 3. Add the prices into one total
let total = prices.reduce(function (sum, price) {
  return sum + price;
}, 0);

console.log(prices); // [1500, 800, 300, 2500]
console.log(total); // 5100
```

You used three methods as a small pipeline. `filter` picked in stock items. `map` pulled out the prices. `reduce` added them up. None of these changed the original `products` array.

### Try this

Make one array of five numbers. Use `filter` to keep only the numbers above 10, and log the new array. That is the whole task. Once that works, try `map` on the same array to double every number.

!!! note "A note on ilm"
    An array and an object are more than storage. They are tools for thinking
    clearly about your data. Choosing the right shape is part of ilm, useful
    knowledge. The clearer your data, the clearer your code and your mind.

??? note urdu "اردو میں مزید وضاحت"
    array اور object دونوں ڈیٹا رکھتے ہیں، لیکن انداز الگ ہے۔ array میں ہر چیز ایک نمبر والی جگہ پر ہوتی ہے، جیسے قطار میں لگے لوگ۔ object میں ہر چیز کا ایک نام ہوتا ہے، جیسے کسی طالب علم کا نام، عمر، اور شہر۔ map، filter اور reduce سمجھنے کے لیے انہیں ایک قطار میں سوچیں۔ filter صرف وہ چیزیں رکھتا ہے جو آپ کی شرط پوری کریں۔ map ہر چیز کو بدل کر ایک نیا array بناتا ہے۔ reduce پورے array کو ایک قیمت میں جمع کر دیتا ہے، جیسے کل رقم۔ یاد رکھیں کہ یہ تینوں اصل array کو نہیں بدلتے، بلکہ نیا نتیجہ دیتے ہیں۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What index holds the first item of an array, and what does `.length` return?
2. Which method makes a new array of transformed items, and which keeps only items that pass a test?
3. Why does `[10, 9, 2].sort()` give a wrong order, and how do you fix it for numbers?
4. When do you need bracket notation instead of dot notation on an object?

---

## What's next

You now hold and shape data with confidence. Next you learn newer JavaScript features that make this code even shorter and clearer. These include arrow functions, destructuring, and the spread operator.

[Next lesson: 7.2 ES2015+ essentials &rarr;](8-2-es2015-essentials.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [javascript.info: Array methods](https://javascript.info/array-methods)
- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[array]: An ordered list of values stored together. (Roman Urdu: aik tarteeb wali list jahan kai cheezen aik hi jagah par store hoti hain.)
*[object]: A value with named keys and their values. (Roman Urdu: aisi cheez jahan har value ka aik naam (key) hota hai, jaise student ka name aur age.)
*[index]: The number position of an item, starting at 0. (Roman Urdu: list mein kisi cheez ki jagah ka number, jo 0 se shuru hota hai.)
*[map]: A method that builds a new array of transformed items. (Roman Urdu: har item ko badal kar aik nayi list banata hai, purani list waisi hi rehti hai.)
*[filter]: A method that keeps only items that pass a test. (Roman Urdu: sirf wo items rakhta hai jo aap ki shart poori karen, baqi chhod deta hai.)
*[reduce]: A method that turns an array into one value. (Roman Urdu: poori list ko jor kar aik hi value bana deta hai, jaise sab keemton ka total.)
*[property]: A single key and value pair inside an object. (Roman Urdu: object ke andar aik naam aur uski value ka jora, jaise age: 20.)
*[sort]: A method that puts array items in order. (Roman Urdu: list ki cheezon ko tarteeb se laga deta hai, chote se bare ya alphabet ke hisaab se.)
