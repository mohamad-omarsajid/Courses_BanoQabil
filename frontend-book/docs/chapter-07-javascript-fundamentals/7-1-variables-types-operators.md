---
lesson_id: frontend.ch07.l01
title: "7.1 Variables, types, and operators"
chapter: 7
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch06.l04
---

# 7.1 Variables, types, and operators

You built pages with HTML and styled them with CSS and Tailwind. Now you make them think. JavaScript is the language that adds logic and action to a page. This is your first JavaScript lesson, so we go slow and keep every step concrete.

## What you'll know by the end

- How to run JavaScript in the browser Console and in a `<script>` tag.
- How to store values with `let` and `const`, and why we avoid `var`.
- The basic data types like string, number, and boolean.
- How to build strings with template literals and `${ }`.
- How to use arithmetic, comparison, logical, and assignment operators.
- Why you always use `===` instead of `==`.

---

## How to run JavaScript

You can run JavaScript in two simple ways. The first way is the browser Console. You met the Console back in lesson 1.4.

Open any web page. Press `F12` to open DevTools. Click the **Console** tab. Type this and press Enter.

```js
console.log("Hello from JavaScript");
// Hello from JavaScript
```

`console.log` prints a value to the Console. You will use it all the time to check your work.

The second way is a `<script>` tag inside an HTML file. Put it just before the closing `</body>` tag.

```html
<body>
  <h1>My page</h1>
  <script>
    console.log("This runs when the page loads");
  </script>
</body>
```

Open that file in your browser, then open the Console to see the message. For this lesson, the Console is the fastest place to try things.

---

## Variables: storing values

A variable is a named box that holds a value. Think of it exactly like a labelled jar on a shelf. The label is the variable name. Whatever is inside the jar is the value.

<figure markdown>
<svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-var-box" style="max-width:100%;height:auto">
  <title id="svg-var-box">A variable shown as a labelled box: the name sits on top as a label and the value lives inside the box.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="170" y="60" width="180" height="80" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" fill="#1f1f1c" text-anchor="middle">
    <text x="260" y="50">variable name (label)</text>
    <text x="260" y="108" font-size="22" font-weight="700">name</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="260" y="130">value: "Ayesha"</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="none">
    <line x1="260" y1="54" x2="260" y2="60"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="30" y="100">const name = "Ayesha";</text>
  </g>
  <defs>
    <marker id="arr-var" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-var)">
    <line x1="140" y1="100" x2="168" y2="100"/>
  </g>
</svg>
<figcaption>A variable is a named container. The label on the outside is the name. The value lives inside. You can change the value inside a <code>let</code> box, but a <code>const</code> box is sealed once filled.</figcaption>
</figure>

You make a variable with the `const` keyword (Roman Urdu: ek value rakhne ke liye `const` likhte hain).

```js
const name = "Ayesha";
console.log(name);
// Ayesha
```

A `const` value cannot be reassigned. If you try, you get an error.

```js
const age = 20;
age = 21;
// TypeError: Assignment to constant variable.
```

When you need a value that will change, use `let` instead.

```js
let score = 0;
score = 10;
console.log(score);
// 10
```

So the rule is short. Use `const` for values that stay the same. Use `let` for values that change.

!!! tip
    Use `const` by default for almost everything. Only switch to `let` when you know the value must change later. This habit prevents many accidental bugs.

---

## Why we avoid var

Older code uses a third keyword called `var`. You should not use it in new code.

```js
var city = "Karachi";
```

`var` is function-scoped, not block-scoped. That means it can leak out of `if` blocks and loops in confusing ways. It also lets you redeclare the same name by mistake. `let` and `const` behave in a clear and predictable way, so stick with them.

Here is a quick comparison of all three keywords:

| Keyword | Can reassign? | Block-scoped? | Can redeclare? | Use it? |
| --- | --- | --- | --- | --- |
| `const` | No | Yes | No | Yes, for most things |
| `let` | Yes | Yes | No | Yes, when value changes |
| `var` | Yes | No (function only) | Yes | No, avoid in new code |

The "block-scoped" column is the key one. `let` and `const` stay inside their `{ }`. `var` leaks out. That leaking is exactly what creates the confusing bugs.

---

## Naming rules

A variable name must start with a letter, `_`, or `$`. It cannot start with a number. It cannot contain spaces.

The common style for JavaScript is camelCase. You write the first word in lowercase, then capitalize each new word.

```js
const firstName = "Bilal";
const totalBillAmount = 1500;
```

Pick names that describe the value. `x` tells you nothing. `userEmail` tells you a lot.

---

## The primitive types

A type tells you what kind of value something is. JavaScript has seven primitive types. You will use the first three every single day.

| Type | Example | What it holds | How common |
| --- | --- | --- | --- |
| `string` | `"Sana"` | Text in quotes or backticks | Every day |
| `number` | `42`, `3.14` | Any number, whole or decimal | Every day |
| `boolean` | `true`, `false` | Only true or false | Every day |
| `null` | `null` | Empty on purpose, you set it yourself | Often |
| `undefined` | `undefined` | Declared but no value yet, happens on its own | Often |
| `bigint` | `9007199254740993n` | Very large whole numbers | Rarely |
| `symbol` | `Symbol("id")` | A unique, one-of-a-kind value | Rarely |

Here is one short example of each:

```js
const username = "Sana";        // string: text in quotes
const points = 42;              // number: any number, with or without decimals
const isLoggedIn = true;        // boolean: only true or false
const middleName = null;        // null: a value that is empty on purpose
let result;                     // undefined: declared but no value yet
const bigCount = 9007199254740993n; // bigint: for very large whole numbers
const id = Symbol("id");        // symbol: a unique value
```

The key distinction to remember: you set `null` yourself when you want to say "nothing here". `undefined` appears on its own when you forget to assign a value.

---

## Template literals

Sometimes you want to put a value inside a string. The old way uses `+` to join pieces, which gets messy.

Template literals make this clean. You wrap the string in backticks instead of quotes. Then you place values inside `${ }`.

```js
const product = "shoes";
const price = 2000;
console.log(`The ${product} cost ${price} rupees.`);
// The shoes cost 2000 rupees.
```

The backtick key sits above the Tab key on most keyboards. Template literals can also span more than one line, which normal strings cannot.

---

## Operators

An operator does an action on values. There are four groups you need right now.

### Arithmetic operators

Arithmetic operators (Roman Urdu: hisaab karne ke nishaan) do math.

```js
console.log(10 + 3); // 13
console.log(10 - 3); // 7
console.log(10 * 3); // 30
console.log(10 / 3); // 3.3333333333333335
console.log(10 % 3); // 1   (the remainder after dividing)
```

| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.33...` |
| `%` | Remainder | `10 % 3` | `1` |
| `**` | Exponent | `2 ** 8` | `256` |

The `%` (modulo) operator is handy for checking if a number is even or odd. `n % 2 === 0` means even.

### Comparison operators

Comparison operators ask a question and return a boolean.

```js
console.log(5 < 10);   // true
console.log(5 > 10);   // false
console.log(5 <= 5);   // true
console.log(5 >= 6);   // false
console.log(5 === 5);  // true
console.log(5 !== 8);  // true
```

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `<` | Less than | `5 < 10` | `true` |
| `>` | Greater than | `5 > 10` | `false` |
| `<=` | Less than or equal | `5 <= 5` | `true` |
| `>=` | Greater than or equal | `5 >= 6` | `false` |
| `===` | Equal in value AND type | `5 === 5` | `true` |
| `!==` | Not equal in value or type | `5 !== 8` | `true` |
| `==` | Equal (converts types) | `0 == ""` | `true` (avoid this) |

### Logical operators

Logical operators combine boolean values. `&&` means and. `||` means or. `!` means not.

```js
console.log(true && false); // false
console.log(true || false); // true
console.log(!true);         // false
```

| Operator | Name | Rule | Example | Result |
| --- | --- | --- | --- | --- |
| `&&` | AND | Both must be true | `true && false` | `false` |
| `\|\|` | OR | At least one must be true | `true \|\| false` | `true` |
| `!` | NOT | Flips true to false and vice versa | `!true` | `false` |

### Assignment operators

Assignment operators set or update a value. `+=` adds to a variable. `-=` subtracts from it.

```js
let total = 100;
total += 50; // same as total = total + 50
console.log(total); // 150
total -= 30;
console.log(total); // 120
```

| Operator | Meaning | Example | Same as |
| --- | --- | --- | --- |
| `=` | Assign | `x = 5` | `x = 5` |
| `+=` | Add and assign | `x += 3` | `x = x + 3` |
| `-=` | Subtract and assign | `x -= 3` | `x = x - 3` |
| `*=` | Multiply and assign | `x *= 2` | `x = x * 2` |
| `/=` | Divide and assign | `x /= 2` | `x = x / 2` |

---

## The big one: == vs ===

This trips up many beginners, so read it twice.

`===` checks both the value and the type. It does not change anything. This is the one you want.

`==` checks the value but converts types first. That hidden conversion causes strange bugs.

```js
console.log(0 == "");   // true   (== converts the empty string to 0)
console.log(0 === "");  // false  (=== sees a number and a string, so not equal)
```

The number `0` and an empty string `""` are clearly different things. Yet `==` calls them equal. `===` correctly calls them different.

!!! warning
    Always use `===` and `!==`. The `==` operator converts types behind your back and creates bugs that are hard to find. Make `===` a permanent habit from day one.

??? note urdu "اردو میں مزید وضاحت"
    جاوا اسکرپٹ میں دو چیزوں کا موازنہ کرنے کے دو طریقے ہیں۔ `==` پہلے دونوں قدروں کی قسم بدل دیتا ہے، پھر موازنہ کرتا ہے۔ اسی وجہ سے کبھی کبھی غلط نتیجہ آتا ہے، جیسے صفر اور خالی لفظ برابر لگنے لگتے ہیں۔ `===` قدر اور قسم دونوں کو دیکھتا ہے اور کچھ نہیں بدلتا۔ اسی لیے ہمیشہ `===` استعمال کریں اور `==` سے بچیں۔

---

## typeof: check a type

When you are not sure what type a value is, ask with `typeof`. It returns the type name as a string.

```js
console.log(typeof "Sana");    // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object"  <-- a known JS quirk, not a bug you made
```

That last line surprises people. `typeof null` returns `"object"`, not `"null"`. It is a historical quirk in the language. You did not do anything wrong. Just check for null with `=== null` directly.

---

## Real world example: a tip calculator

Let us put it all together. You will build a small tip calculator in the Console.

Open the Console, type each line, and press Enter. We use `const` because these values do not change once we set them.

```js
const billAmount = 1800;
const tipPercent = 10;

const tip = billAmount * (tipPercent / 100);
const total = billAmount + tip;

console.log(`Bill: ${billAmount} rupees, tip: ${tip} rupees, total: ${total} rupees.`);
// Bill: 1800 rupees, tip: 180 rupees, total: 1980 rupees.
```

Read it from the top. You store the bill and the tip percent. You compute the tip with arithmetic. You add the tip to the bill to get the total. Then a template literal builds one friendly line. Change `billAmount` or `tipPercent` and run it again to see new results.

### Try this

In the Console, make a `const` for a product name and a `const` for its price in rupees. Add a `const` for the quantity. Work out the total with `*`, then print one line with a template literal, like `5 books cost 2500 rupees.` Run it, then change the quantity and run it again.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. When do you use `const` and when do you use `let`?
2. What does a template literal use instead of quotes, and how do you put a value inside it?
3. What is the result of `0 == ""` and `0 === ""`, and which operator should you use?
4. What does `typeof true` return?

---

## What's next

You can now store values and do math and comparisons. Next you will teach your code to make decisions and repeat work. Lesson 7.2 covers conditionals and loops.

[Next lesson: 6.2 Conditionals and loops &rarr;](7-2-conditionals-and-loops.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [javascript.info: An Introduction to JavaScript / Fundamentals](https://javascript.info/first-steps)
- [MDN: JavaScript first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[JavaScript]: The language that adds logic and action to web pages. (Roman Urdu: web pages mein logic aur amal add karne wali zaban.)
*[variable]: A named box that holds a value. (Roman Urdu: aik naam wala dabba jo koi value rakhta hai.)
*[let]: A keyword for a variable whose value can change. (Roman Urdu: aisi variable ke liye jiski value badal sakti hai.)
*[const]: A keyword for a variable that cannot be reassigned. (Roman Urdu: aisi variable ke liye jiski value dobara set nahi ki ja sakti.)
*[string]: Text wrapped in quotes or backticks. (Roman Urdu: quotes ya backticks mein likha gaya text.)
*[boolean]: A value that is only true or false. (Roman Urdu: aisi value jo sirf true ya false hoti hai.)
*[template literal]: A string in backticks that can hold values with ${ }. (Roman Urdu: backticks wali string jo ${ } se values rakh sakti hai.)
*[operator]: A symbol that does an action on values, like + or ===. (Roman Urdu: aisa nishan jo values par amal karta hai, jaise + ya ===.)
