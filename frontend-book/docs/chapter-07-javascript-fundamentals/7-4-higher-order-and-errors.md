---
lesson_id: frontend.ch07.l04
title: "7.4 Higher-order functions and error handling"
chapter: 7
order: 4
estimated_minutes: 40
prerequisites:
  - frontend.ch07.l03
---

# 7.4 Higher-order functions and error handling

You can now make functions and call them. Next you will learn that functions are values too. You can pass one function into another function. You will also learn what to do when code breaks, because real code breaks all the time. This is the last lesson of Chapter 7.

## What you'll know by the end

- What a higher-order function is and why it helps.
- How to pass a function as a callback.
- How a function can return another function.
- How to use `try`, `catch`, and `finally` to handle errors.
- How to throw your own error with `throw new Error("message")`.
- How to run code later with `setTimeout` and on a loop with `setInterval`.

---

## Functions are values

You already store numbers and strings in variables. You can store a function too.

```js
function greet() {
  console.log("Hello");
}

const sayHi = greet; // store the function, do not call it
sayHi(); // now call it
// Hello
```

Notice there are no parentheses after `greet` on the third line. You are storing the function itself. The parentheses would call it instead. This small idea makes the rest of the lesson possible.

---

## Higher-order functions

A higher-order function is a function that does one of two things. It takes another function as an argument. Or it returns a function. That is the whole definition.

```js
function callTwice(action) {
  action();
  action();
}

function wave() {
  console.log("wave");
}

callTwice(wave);
// wave
// wave
```

Here `callTwice` takes a function called `action`. It calls that function two times. You passed `wave` into it. So `wave` ran twice. The function you pass in is called a callback (Roman Urdu: callback woh function hai jo baad mein chalaya jata hai). You pass it now, and it gets called later.

Here is a diagram of how a higher-order function receives a callback and runs it:

<figure markdown>
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-hof-title" style="max-width:100%;height:auto">
  <title id="svg-hof-title">A higher-order function diagram: the outer function callTwice receives the callback wave as an argument, then calls it twice inside its body.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="70" width="140" height="50" rx="8"/>
    <rect x="200" y="30" width="200" height="180" rx="12"/>
    <rect x="220" y="100" width="160" height="40" rx="6"/>
    <rect x="220" y="155" width="160" height="40" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="90" y="90">callback</text>
    <text x="90" y="108">wave()</text>
    <text x="300" y="58" font-weight="700">callTwice(action)</text>
    <text x="300" y="124">action()  call 1</text>
    <text x="300" y="179">action()  call 2</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="300" y="222">higher-order function body</text>
  </g>
  <defs>
    <marker id="arr-hof" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-hof)">
    <line x1="162" y1="95" x2="198" y2="78"/>
  </g>
</svg>
<figcaption>You pass the callback function into the higher-order function as an argument. The higher-order function decides when and how many times to call it.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    ہائر آرڈر فنکشن وہ فنکشن ہوتا ہے جو کسی دوسرے فنکشن کو اپنے اندر لیتا ہے۔ جو فنکشن آپ اندر بھیجتے ہیں اسے کال بیک کہتے ہیں۔ آپ اسے ابھی بھیجتے ہیں مگر وہ بعد میں چلتا ہے۔ مثال میں کال ٹوائس فنکشن نے ویو فنکشن کو دو بار چلایا۔ یہ خیال آگے بہت کام آئے گا۔

---

## Built-in array methods that use callbacks

JavaScript arrays come with powerful built-in higher-order methods. You give each one a callback function and it does the work.

| Method | What it does | Returns |
| --- | --- | --- |
| `forEach` | Runs a callback for each item | `undefined` |
| `map` | Builds a new array by transforming each item | new array |
| `filter` | Builds a new array keeping only items the callback approves | new array |
| `find` | Returns the first item the callback approves | one item or `undefined` |
| `some` | Returns `true` if at least one item passes | boolean |
| `every` | Returns `true` if all items pass | boolean |
| `reduce` | Folds all items into one value | single value |

Here are three of them in action on the same array.

```js
const prices = [200, 800, 150, 1200, 500];

// map: add 10% tax to each price
const withTax = prices.map(p => p * 1.1);
console.log(withTax);
// [220, 880, 165, 1320, 550]

// filter: keep only items under 600
const affordable = prices.filter(p => p < 600);
console.log(affordable);
// [200, 150, 500]

// find: get the first item over 700
const expensive = prices.find(p => p > 700);
console.log(expensive);
// 800
```

Each method takes a callback arrow function. The method calls that function for every item in the array. You write the logic once, and the method handles the looping.

---

## Returning a function

A function can also return another function. This sounds strange at first. Look at a simple example.

```js
function makeMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

`makeMultiplier` builds a new function for you. You gave it the factor `2`, so `double` always multiplies by 2. You gave it `3`, so `triple` always multiplies by 3. The inner function remembers the factor you passed. This is a maker that builds custom functions.

---

## When code breaks

Some code can fail at runtime. Maybe the input is bad. Maybe a value is missing. When code fails, JavaScript throws an error. By default that error stops your program.

```js
const data = "not a number";
const result = JSON.parse(data); // this throws an error
console.log("this line never runs");
```

You need a way to catch the failure and keep going. That is where `try` and `catch` come in.

---

## try, catch, and finally

You wrap risky code in a `try` block. If it fails, the `catch` block runs. The `finally` block runs every time, pass or fail.

```js
try {
  const result = JSON.parse("not valid json");
  console.log(result);
} catch (err) {
  console.log("Something went wrong");
} finally {
  console.log("Done trying");
}
// Something went wrong
// Done trying
```

The `try` block tried the risky line. It failed, so the `catch` block ran. The variable `err` holds the error object. The `finally` block ran at the end no matter what. Use `finally` for cleanup, like closing something you opened.

Here is a flowchart of the whole try-catch-finally flow:

<figure markdown>
<svg viewBox="0 0 560 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-trycatch-title" style="max-width:100%;height:auto">
  <title id="svg-trycatch-title">try-catch-finally flowchart: the try block runs, if it succeeds the finally block runs, if it throws an error the catch block runs and then the finally block runs.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="185" y="20" width="190" height="44" rx="8"/>
    <polygon points="280,110 390,150 280,190 170,150"/>
    <rect x="60" y="230" width="150" height="44" rx="8"/>
    <rect x="350" y="230" width="150" height="44" rx="8"/>
    <rect x="185" y="300" width="190" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="280" y="46">try block runs</text>
    <text x="280" y="155">did it throw?</text>
    <text x="135" y="256">catch block runs</text>
    <text x="425" y="256">skip catch</text>
    <text x="280" y="325">finally always runs</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="178" y="208">yes (error)</text>
    <text x="388" y="208">no (success)</text>
  </g>
  <defs>
    <marker id="arr-tc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-tc)">
    <line x1="280" y1="64" x2="280" y2="108"/>
    <line x1="210" y1="165" x2="135" y2="228"/>
    <line x1="350" y1="165" x2="425" y2="228"/>
    <line x1="135" y1="274" x2="220" y2="298"/>
    <line x1="425" y1="274" x2="342" y2="298"/>
  </g>
</svg>
<figcaption>The try block runs. If it throws, catch handles the error. Either way, finally runs at the end. Use finally for cleanup work that must always happen.</figcaption>
</figure>

!!! tip
    Only wrap risky code in `try`. Things like parsing input or network calls can fail, so wrap those. Do not wrap every line of your program. Most code does not need it.

---

## Reading the error message

The error object has a `message` property. It tells you what went wrong. Read it inside `catch`.

```js
try {
  JSON.parse("broken");
} catch (err) {
  console.log(err.message);
}
// Unexpected token 'b', "broken" is not valid JSON
```

The exact message depends on the error. Reading `err.message` helps you understand the problem. It is much better than guessing.

!!! warning
    An empty `catch` block hides the error. That makes bugs invisible and very hard to find. At least log the error with `console.log(err.message)` so you can see it.

---

## Throwing your own errors

You can throw an error on purpose. Use `throw new Error("message")`. Do this when something is wrong and you want to stop.

```js
function setAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
  return age;
}

try {
  setAge(-5);
} catch (err) {
  console.log(err.message); // Age cannot be negative
}
```

The function checked the input. The age was bad, so it threw an error. The `catch` block caught it and read the message. Now your function protects itself from bad data.

---

## Running code later

Sometimes you want code to run after a delay. Use `setTimeout(fn, ms)`. It runs the function once after the given milliseconds. There are 1000 milliseconds in one second.

```js
console.log("start");

setTimeout(function () {
  console.log("3 seconds passed");
}, 3000);

console.log("end");
// start
// end
// 3 seconds passed
```

Notice the order. "start" and "end" print first. The delayed message prints last. `setTimeout` does not pause your code. It schedules the function to run later.

---

## Running code on a loop

`setInterval(fn, ms)` runs a function again and again. It repeats every few milliseconds until you stop it. Save the value it returns, then pass it to `clearInterval` to stop.

```js
let count = 0;

const timer = setInterval(function () {
  count = count + 1;
  console.log(count);
  if (count === 3) {
    clearInterval(timer); // stop the loop
  }
}, 1000);
// 1
// 2
// 3
```

The function ran once per second. After it reached 3, you called `clearInterval` to stop it. If you forget `clearInterval`, the loop runs forever. That is rarely what you want.

A quick note. JavaScript also has Promises and `async`/`await` for timing and waiting. You will learn those later in the course. You do not need them now.

---

## Real example: retry up to 3 times

Network calls and parsing often fail by chance. A common fix is to try again a few times. Here is a small wrapper that retries an action.

```js
function retry(action, times) {
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return action(); // success, return and stop
    } catch (err) {
      console.log("Attempt " + attempt + " failed: " + err.message);
    }
  }
  console.log("Gave up after " + times + " tries");
}
```

The `retry` function takes an action and a number of tries. It runs the action inside `try`. If the action works, it returns the result and stops. If the action throws, the `catch` logs it and the loop tries again. After the last failed try, it gives up with a clear message.

```js
let calls = 0;

function flaky() {
  calls = calls + 1;
  if (calls < 2) {
    throw new Error("network blip");
  }
  return "loaded data";
}

const result = retry(flaky, 3);
console.log(result);
// Attempt 1 failed: network blip
// loaded data
```

The `flaky` function fails the first time. The second call works. So `retry` succeeds on attempt 2 and returns the data. The first failure was logged so you can still see it.

### Try this

Write a function `parseAge(text)` that uses `Number(text)` to turn the text into a number. If the result is `NaN`, use `throw new Error("Not a valid age")`. Call `parseAge` inside a `try` block once with `"25"` and once with `"hello"`, and log `err.message` in the `catch`.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What two things can make a function a higher-order function?
2. In `try`, `catch`, and `finally`, which block always runs?
3. How do you throw your own error with a message?
4. What does `clearInterval` do, and why do you need it?

---

## What's next

Chapter 7 is done, and you now know the core of JavaScript. You have variables, conditionals, loops, functions, callbacks, and error handling. The next chapter goes deeper into arrays, objects, modern syntax, and the DOM, where JavaScript finally touches the page.

[Next chapter: 8. JavaScript in depth &rarr;](../chapter-08-javascript-in-depth/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- javascript.info, "Error handling, try...catch" (https://javascript.info/try-catch)
- MDN, "Control flow and error handling" (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[higher-order function]: A function that takes a function as an argument or returns a function. (Roman Urdu: aisa function jo doosre function ko leta ya wapas karta hai)
*[callback]: A function you pass into another function to be called later. (Roman Urdu: woh function jo aap baad mein chalne ke liye bhejte hain)
*[try-catch]: A way to run risky code and handle the error if it fails. (Roman Urdu: risky code chalane aur error sambhalne ka tareeqa)
*[throw]: To raise your own error on purpose so code stops. (Roman Urdu: jaan boojh kar apni error uthana)
*[error]: An object that describes what went wrong while code ran. (Roman Urdu: ek object jo batata hai kya ghalat hua)
*[setTimeout]: A function that runs another function once after a delay. (Roman Urdu: ek function jo doosre function ko der baad ek baar chalata hai)
