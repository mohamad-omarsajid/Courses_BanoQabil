---
lesson_id: frontend.ch07.l03
title: "7.3 Functions"
chapter: 7
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch07.l02
---

# 7.3 Functions

So far you wrote code that runs once, from top to bottom. But real programs repeat the same work many times. You do not want to copy the same lines again and again. A function lets you wrap code into a named tool. You build it once, then run it whenever you want.

## What you'll know by the end

- What a function is and why it saves you from repeating code.
- How to write a function declaration, a function expression, and an arrow function.
- The difference between a parameter and an argument.
- How default parameters and return values work.
- What global, function, and block scope mean.
- A first look at closures and hoisting.

---

## What a function is and why you want one

A function is a named block of code. You write it once. You run it as many times as you like. Running a function is called "calling" it.

Think of a function like a machine. You feed it input, it does some work, and it hands back an output.

<figure markdown>
<svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fn-io" style="max-width:100%;height:auto">
  <title id="svg-fn-io">A function shown as a machine: input goes in on the left, the function processes it in the middle, and output comes out on the right.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="55" width="120" height="50" rx="8"/>
    <rect x="200" y="30" width="160" height="100" rx="12"/>
    <rect x="420" y="55" width="120" height="50" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="80" y="82">input</text>
    <text x="80" y="98">(arguments)</text>
    <text x="280" y="75" font-weight="700">function</text>
    <text x="280" y="95">body runs</text>
    <text x="480" y="82">output</text>
    <text x="480" y="98">(return value)</text>
  </g>
  <defs>
    <marker id="arr-fn-io" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-fn-io)">
    <line x1="142" y1="80" x2="198" y2="80"/>
    <line x1="362" y1="80" x2="418" y2="80"/>
  </g>
</svg>
<figcaption>A function takes input (arguments), runs its body, and hands back an output (return value). You can call the same function many times with different inputs.</figcaption>
</figure>

Look at this repeated code. It greets three people.

```js
console.log("Hello, Ali");
console.log("Hello, Sara");
console.log("Hello, Bilal");
```

That works, but the pattern repeats. A function removes the repeat.

```js
function greet(name) {
  console.log("Hello, " + name);
}

greet("Ali");   // Hello, Ali
greet("Sara");  // Hello, Sara
greet("Bilal"); // Hello, Bilal
```

You wrote the greeting logic one time. Now you reuse it. If you ever change the greeting, you change it in one place.

!!! tip
    Give a function a verb name that says what it does. Names like `calculateTotal`, `greet`, or `formatRupees` tell the reader the action. A vague name like `doStuff` helps nobody.

---

## The anatomy of a function

Every function has the same four parts. Here is where each one lives:

<figure markdown>
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fn-anatomy" style="max-width:100%;height:auto">
  <title id="svg-fn-anatomy">Anatomy of a function: keyword, name, parameters, body, and return statement each labelled with arrows.</title>
  <g font-family="monospace" font-size="15" fill="#1f1f1c">
    <text x="40" y="60">function</text>
    <text x="130" y="60">add</text>
    <text x="163" y="60">(</text>
    <text x="173" y="60">a, b</text>
    <text x="208" y="60">)</text>
    <text x="220" y="60">{</text>
    <text x="60" y="95">return</text>
    <text x="120" y="95">a + b</text>
    <text x="165" y="95">;</text>
    <text x="40" y="130">}</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="40" y="170">keyword</text>
    <text x="128" y="170">name</text>
    <text x="170" y="170">parameters</text>
    <text x="60" y="200">body</text>
    <text x="112" y="200">return value</text>
  </g>
  <defs>
    <marker id="arr-anat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1" fill="none" marker-end="url(#arr-anat)">
    <line x1="60" y1="163" x2="60" y2="135"/>
    <line x1="137" y1="163" x2="137" y2="135"/>
    <line x1="190" y1="163" x2="190" y2="135"/>
    <line x1="72" y1="193" x2="72" y2="135"/>
    <line x1="140" y1="193" x2="130" y2="100"/>
  </g>
</svg>
<figcaption>A function has a keyword (function), a name (add), parameters in parentheses, a body in curly braces, and an optional return statement.</figcaption>
</figure>

---

## Function declaration

The example above is a function declaration. It starts with the word `function`, then a name, then parentheses, then a body in curly braces.

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

The `return` keyword sends a value back to the caller. We cover return in detail soon.

---

## Function expression

You can also store a function inside a variable. This is called a function expression.

```js
const add = function (a, b) {
  return a + b;
};

console.log(add(2, 3)); // 5
```

Here the function has no name. You assign it to the `const` named `add`. You call it the same way, with `add(2, 3)`.

---

## Arrow functions

Arrow functions are a shorter way to write a function. You drop the word `function` and add an arrow `=>`.

```js
const add = (a, b) => {
  return a + b;
};

console.log(add(2, 3)); // 5
```

When the function body is just one expression, you can make it even shorter. You drop the braces and the `return`.

```js
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```

This short form returns the value of the expression for you. It is clean and common in modern code.

Here is a side-by-side comparison of all three styles doing the same job:

| Style | Syntax | Hoisted? | Common use |
| --- | --- | --- | --- |
| Function declaration | `function add(a, b) { return a + b; }` | Yes | Named utilities, top-level helpers |
| Function expression | `const add = function(a, b) { return a + b; };` | No | Stored in a variable, conditional creation |
| Arrow function | `const add = (a, b) => a + b;` | No | Short callbacks, modern code everywhere |

The arrow function is the one you will see most often in modern JavaScript. All three produce the same result here. The real differences (like how `this` works) matter later; for now focus on arrow syntax because it is the shortest.

---

## Parameters and arguments

These two words sound similar. People mix them up. Here is the simple rule.

A parameter (Roman Urdu: function ki definition mein naam) is the name in the function definition. An argument (Roman Urdu: call karte waqt di jaane wali asli value) is the real value you pass when you call.

```js
function greet(name) { // "name" is a parameter
  console.log("Hello, " + name);
}

greet("Ali"); // "Ali" is an argument
```

So `name` is the parameter. The text `"Ali"` is the argument. The parameter waits for a value. The argument is the value that arrives.

---

## Default parameters

What if someone calls your function with no value? You can set a default.

```js
function greet(name = "friend") {
  console.log("Hello, " + name);
}

greet("Sara"); // Hello, Sara
greet();       // Hello, friend
```

When you skip the argument, `name` falls back to `"friend"`. Defaults make your function safer to call.

---

## Return values

A function gives a value back with `return`. You can store that value or use it right away.

```js
function square(n) {
  return n * n;
}

const result = square(4);
console.log(result); // 16
```

If a function has no `return`, it gives back `undefined`.

```js
function noReturn() {
  const x = 5;
}

console.log(noReturn()); // undefined
```

Also, code after a `return` does not run. The function stops at `return`.

```js
function test() {
  return "done";
  console.log("this never runs");
}

console.log(test()); // done
```

!!! note "A note on wafa"
    A function makes a quiet promise: give me this input, I will return that output.
    Keeping that promise, every time, is a kind of wafa. A function that lies, or
    changes things it should not, breaks the trust of everyone who calls it.

??? note urdu "اردو میں مزید وضاحت"
    فنکشن کوئی قدر واپس بھیجنے کے لیے `return` لفظ استعمال کرتا ہے۔ جو قدر واپس آتی ہے، آپ اسے کسی متغیر میں محفوظ کر سکتے ہیں یا فوراً استعمال کر سکتے ہیں۔ اگر فنکشن میں `return` نہ ہو تو وہ `undefined` واپس کرتا ہے۔ یاد رکھیں کہ `return` کے بعد لکھا ہوا کوڈ کبھی نہیں چلتا، کیونکہ فنکشن وہیں رک جاتا ہے۔ اسی لیے `return` کو ہمیشہ سوچ سمجھ کر اور صحیح جگہ پر لکھیں۔

---

## Scope

Scope means where a variable is visible. Some variables are seen everywhere. Some are seen only inside a small block.

Global scope means the variable lives at the top level. Any code can read it.

```js
const country = "Pakistan";

function show() {
  console.log(country); // Pakistan
}

show();
```

Function scope means the variable lives inside a function. Code outside cannot see it.

```js
function compute() {
  const secret = 42;
  console.log(secret); // 42
}

compute();
// console.log(secret); // error, secret is not visible here
```

Block scope means `let` and `const` live only inside their `{ }` block. A block can be an `if` or a loop.

```js
if (true) {
  let mood = "happy";
  console.log(mood); // happy
}

// console.log(mood); // error, mood lives only in the block
```

Here is a summary of where each kind of variable is visible:

| Scope | Declared with | Visible where |
| --- | --- | --- |
| Global | `const`/`let` at the top level | Everywhere in the file |
| Function | `const`/`let` inside a function | Only inside that function |
| Block | `const`/`let` inside `{ }` | Only inside that block |

So keep variables small and local when you can. Local variables cause fewer surprises.

---

## Closures, briefly

A function remembers the variables from the place where you made it. This memory is called a closure.

```js
function makeCounter() {
  let count = 0;
  return function () {
    count = count + 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

The inner function still sees `count` after `makeCounter` finishes. It holds on to that variable. That is a closure. You will meet closures more later.

---

## Hoisting, briefly

A function declaration can be called before it appears in the file. JavaScript moves the declaration to the top behind the scenes. This is called hoisting.

```js
sayHi(); // Hi (this works)

function sayHi() {
  console.log("Hi");
}
```

But `const` and `let` do not work that way. You cannot use them before their line.

```js
// console.log(name); // error
const name = "Sara";
```

Keep it simple. Declare things before you use them, and you avoid the whole problem.

---

## Real example: a small library of utility functions

Now you build four small tools. Each one takes input and returns output. None of them change anything outside. These are pure functions, and pure functions are easy to test.

First, `add` and `multiply`.

```js
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(add(150, 50));    // 200
console.log(multiply(4, 25)); // 100
```

Next, `formatRupees`. It takes a number and returns a clean string with commas.

```js
function formatRupees(amount) {
  return "Rs " + amount.toLocaleString("en-PK");
}

console.log(formatRupees(1500));   // Rs 1,500
console.log(formatRupees(250000)); // Rs 2,50,000
```

The method `toLocaleString` adds the commas for you. You just add the `Rs ` label in front.

Last, `slugify`. It turns a title into a URL friendly string.

```js
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

console.log(slugify("My First Post")); // my-first-post
```

It makes the text lower case, trims spaces from the ends, then swaps any run of spaces for a dash. The result is safe to use in a web address.

!!! note "Did you know"
    A pure function always returns the same output for the same input. It changes nothing else around it. This makes it easy to test and easy to trust, because the result never depends on hidden surprises.

### Try this

Write a function `calculateTotal(price, quantity)` that returns `price * quantity`. Give `quantity` a default of `1`. Call it once with both values, like `calculateTotal(200, 3)`, and once with only a price, like `calculateTotal(200)`, and print each result with `console.log`.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between a parameter and an argument?
2. What does a function return if it has no `return` statement?
3. Why can you not see a `let` variable outside the block where you made it?
4. What does the short arrow form `const add = (a, b) => a + b` return?

---

## What's next

You can now build and call your own functions. Next you will pass functions into other functions, which are called higher-order functions. You will also learn how to handle errors so your code does not crash.

[Next lesson: 6.4 Higher-order functions and error handling &rarr;](7-4-higher-order-and-errors.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [javascript.info: Functions](https://javascript.info/function-basics)
- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[function]: A named block of code you can run many times. (Roman Urdu: aik named code block jo aap baar baar chala sakte hain)
*[parameter]: The name in a function definition that waits for a value. (Roman Urdu: function ki definition mein wo naam jo value ka intezar karta hai)
*[argument]: The real value you pass when you call a function. (Roman Urdu: asal value jo aap function call karte waqt dete hain)
*[return]: The keyword that sends a value back from a function. (Roman Urdu: wo keyword jo function se value wapas bhejta hai)
*[arrow function]: A short way to write a function using the => arrow. (Roman Urdu: function likhne ka chhota tareeqa jo => arrow se hota hai)
*[scope]: Where a variable is visible in your code. (Roman Urdu: aap ke code mein aik variable kahan dikhai deta hai)
*[closure]: A function that remembers variables from where it was made. (Roman Urdu: aik function jo apni jaye paidaish ke variables yaad rakhta hai)
*[pure function]: A function that returns the same output for the same input and changes nothing else. (Roman Urdu: aisa function jo same input par same output deta hai aur kuch aur nahi badalta)
