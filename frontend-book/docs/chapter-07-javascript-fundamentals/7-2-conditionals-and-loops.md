---
lesson_id: frontend.ch07.l02
title: "7.2 Conditionals and loops"
chapter: 7
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch07.l01
---

# 7.2 Conditionals and loops

In 6.1 you stored values in variables. Now you will make your code think. A program needs to make choices and repeat work. This lesson shows you how to decide and how to loop. These two ideas are the heart of almost every program you will write.

## What you'll know by the end

- Use `if`, `else if`, and `else` to make choices in your code.
- Pick the right tool: a `switch` for many fixed cases, a ternary for short ones.
- Know which values are truthy and which are falsy.
- Repeat work with `for`, `while`, and `do...while` loops.
- Loop over arrays with `for...of` and over object keys with `for...in`.
- Control a loop with `break` and `continue`.

---

## Making decisions with if

An `if` statement runs code only when a condition is true. You put the condition inside round brackets. You put the code inside curly brackets.

```js
let age = 18;

if (age >= 18) {
  console.log("You can vote.");
}
// You can vote.
```

The condition `age >= 18` is true, so the message prints. If the condition were false, JavaScript would skip the block. Nothing would print.

You can add an `else` for the false case. Only one of the two blocks runs.

```js
let temperature = 35;

if (temperature > 40) {
  console.log("It is very hot.");
} else {
  console.log("The weather is fine.");
}
// The weather is fine.
```

Here `temperature > 40` is false. So JavaScript runs the `else` block instead.

Here is a diagram of how `if` and `else` flow:

<figure markdown>
<svg viewBox="0 0 540 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-ifelse-title" style="max-width:100%;height:auto">
  <title id="svg-ifelse-title">Flowchart of an if-else: code reaches the condition diamond, if true the if-block runs, if false the else-block runs, then both paths join and continue.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="195" y="20" width="150" height="40" rx="20"/>
    <polygon points="270,100 370,140 270,180 170,140"/>
    <rect x="70" y="220" width="140" height="40" rx="6"/>
    <rect x="330" y="220" width="140" height="40" rx="6"/>
    <rect x="195" y="295" width="150" height="36" rx="18"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="270" y="45">code runs</text>
    <text x="270" y="145">condition?</text>
    <text x="140" y="244">if block runs</text>
    <text x="400" y="244">else block runs</text>
    <text x="270" y="318">continue</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="190" y="195">true</text>
    <text x="355" y="195">false</text>
  </g>
  <defs>
    <marker id="arr-if" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-if)">
    <line x1="270" y1="60" x2="270" y2="98"/>
    <line x1="210" y1="155" x2="140" y2="218"/>
    <line x1="330" y1="155" x2="400" y2="218"/>
    <line x1="140" y1="260" x2="140" y2="281" />
    <line x1="140" y1="281" x2="268" y2="293"/>
    <line x1="400" y1="260" x2="400" y2="281"/>
    <line x1="400" y1="281" x2="272" y2="293"/>
    <line x1="270" y1="181" x2="270" y2="218"/>
  </g>
</svg>
<figcaption>When your code hits an if-else, JavaScript checks the condition. If it is true, the if block runs. If it is false, the else block runs. After that, code continues normally.</figcaption>
</figure>

---

## Many choices with else if

Sometimes you have more than two paths. You can chain `else if` blocks. JavaScript checks them from top to bottom. It stops at the first true one.

```js
let marks = 75;

if (marks >= 80) {
  console.log("Excellent");
} else if (marks >= 60) {
  console.log("Good");
} else if (marks >= 40) {
  console.log("Pass");
} else {
  console.log("Fail");
}
// Good
```

`marks >= 80` is false, so it moves on. `marks >= 60` is true, so it prints "Good". The rest is skipped. Order matters here. Always put the strictest check first.

Remember `===` from 6.1. It checks if two values are equal in value and type. Use it inside conditions when you compare for equality.

```js
let role = "admin";

if (role === "admin") {
  console.log("Welcome, boss.");
}
// Welcome, boss.
```

---

## The switch statement

When you check one value against many fixed options, an `if` chain gets long. A `switch` is cleaner. It lists each option as a `case`.

```js
let day = "Mon";

switch (day) {
  case "Sat":
    console.log("Weekend");
    break;
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Working day");
}
// Working day
```

JavaScript compares `day` to each `case` value. When it finds a match, it runs that code. The `break` keyword stops the switch. Without `break`, it keeps running into the next case by mistake. The `default` block runs when no case matches.

!!! tip
    An `if` is great for checking one thing or a range, like `marks >= 60`. A `switch` is cleaner when you compare one value against many fixed values, like names or codes. Pick the one that reads more clearly.

---

## The ternary operator

For a short choice, a full `if` block feels heavy. The ternary operator gives you a one line choice. It has the form `condition ? a : b`. If the condition is true, you get `a`. If false, you get `b`.

```js
let score = 55;
let result = score >= 50 ? "Pass" : "Fail";

console.log(result);
// Pass
```

Read it like a question. Is `score >= 50` true? Yes, so `result` becomes "Pass". Keep ternaries short. For complex logic, an `if` is easier to read.

---

## Truthy and falsy values

A condition does not always need `===`. JavaScript can treat any value as true or false on its own. Values that act as false are called falsy. Everything else is truthy.

There are exactly six falsy values. Learn them by heart.

| Value | Type | Why it is falsy |
| --- | --- | --- |
| `false` | boolean | it literally is false |
| `0` | number | zero means nothing |
| `""` | string | empty string, no text |
| `null` | null | you set it as empty on purpose |
| `undefined` | undefined | no value was assigned |
| `NaN` | number | the result of bad math |

```js
let name = "";

if (name) {
  console.log("Name is set.");
} else {
  console.log("Name is empty.");
}
// Name is empty.
```

The empty string `""` is falsy. So the `else` block runs. If `name` held any text, the `if` block would run instead. This is handy for checking if a value exists.

!!! note "Did you know"
    The empty string `""` and the number `0` are both falsy. Many beginners expect `0` to behave like a normal number inside an `if`. It does not. JavaScript reads it as false. Keep this in mind when you check counts or input.

---

## Looping with for

A loop repeats code. The `for` loop is the most common. It has three parts inside the brackets. They are the init, the condition, and the step.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 0
// 1
// 2
// 3
// 4
```

The init `let i = 0` runs once at the start. The condition `i < 5` is checked before each turn. The step `i++` runs after each turn. The loop stops when the condition becomes false. Here it counts from 0 to 4.

Here is how that cycle looks:

<figure markdown>
<svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-loop-title" style="max-width:100%;height:auto">
  <title id="svg-loop-title">Loop flowchart: init runs once, then condition is checked, if true the body runs and the step runs then condition is checked again, if false the loop ends.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="175" y="20" width="170" height="40" rx="6"/>
    <polygon points="260,100 370,140 260,180 150,140"/>
    <rect x="175" y="215" width="170" height="40" rx="6"/>
    <rect x="175" y="290" width="170" height="40" rx="6"/>
    <rect x="380" y="128" width="110" height="40" rx="20"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="260" y="44">init  (let i = 0)</text>
    <text x="260" y="145">condition (i &lt; 5)?</text>
    <text x="260" y="239">body  (code runs)</text>
    <text x="260" y="314">step  (i++)</text>
    <text x="435" y="153">loop ends</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="213" y="200">true</text>
    <text x="355" y="155">false</text>
  </g>
  <defs>
    <marker id="arr-loop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-loop)">
    <line x1="260" y1="60" x2="260" y2="98"/>
    <line x1="260" y1="182" x2="260" y2="213"/>
    <line x1="260" y1="255" x2="260" y2="288"/>
    <line x1="330" y1="143" x2="378" y2="143"/>
    <path d="M260 330 Q100 330 100 140 Q100 98 148 140" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </g>
</svg>
<figcaption>A for loop: the init runs once, then the condition is tested. If true, the body runs, then the step, then the condition is tested again. This repeats until the condition is false.</figcaption>
</figure>

---

## while and do...while

A `while` loop repeats as long as a condition stays true. It checks the condition first, before each turn.

```js
let count = 3;

while (count > 0) {
  console.log(count);
  count--;
}
// 3
// 2
// 1
```

If the condition is false at the start, a `while` loop never runs. A `do...while` loop is different. It runs the body once first, then checks the condition.

```js
let n = 10;

do {
  console.log("This runs at least once.");
  n++;
} while (n < 5);
// This runs at least once.
```

Even though `n < 5` is false, the body ran one time. Use `do...while` when the code must run at least once.

---

## Choosing the right loop

All loops repeat code. The difference is when and how they check the condition.

| Loop | Condition checked | Use it when |
| --- | --- | --- |
| `for` | Before each turn | You know the exact count in advance |
| `while` | Before each turn | You repeat until something changes, unknown count |
| `do...while` | After each turn | Code must run at least once no matter what |
| `for...of` | Automatically, per item | You want each value from an array |
| `for...in` | Automatically, per key | You want each key from an object |

---

## Looping over arrays and objects

To loop over the values in an array, use `for...of`. It gives you each item, one by one.

```js
let fruits = ["apple", "mango", "banana"];

for (let fruit of fruits) {
  console.log(fruit);
}
// apple
// mango
// banana
```

To loop over the keys of an object, use `for...in`. Note that it gives you the keys, not the values. You use the key to read the value.

```js
let student = { name: "Ali", city: "Lahore" };

for (let key in student) {
  console.log(key + ": " + student[key]);
}
// name: Ali
// city: Lahore
```

An easy way to remember: `for...of` is for array values (Roman Urdu: array ki values), and `for...in` is for object keys (Roman Urdu: object ki keys).

---

## break and continue

Sometimes you want to stop a loop early. The `break` keyword does that. It ends the loop right away.

```js
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}
// 0
// 1
// 2
```

When `i` reaches 3, `break` stops the whole loop. The `continue` keyword is gentler. It skips the rest of the current turn and moves to the next one.

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
// 0
// 1
// 3
// 4
```

When `i` is 2, `continue` skips the print and jumps to the next turn. So 2 is missing from the output.

---

## Real world example: a grading system

Let us build something useful. You have a score from 0 to 100. You want a letter grade. The rule is simple. 90 and above is A. 80 and above is B. 70 and above is C. 60 and above is D. Anything else is F.

We will use a function for now. You will learn functions fully in 6.3. For now, just read it top to bottom.

```js
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(getGrade(95));
// A
console.log(getGrade(72));
// C
console.log(getGrade(40));
// F
```

The `else if` chain checks from high to low. The first true check wins. `return` sends the letter back and stops the function. The order is important. If you checked `score >= 60` first, every passing score would return "D".

A `switch` would not fit well here. A `switch` matches exact values, not ranges like `>= 90`. So the `if` chain is the cleaner choice for this job. This shows that the right tool depends on the problem.

Now let us loop over many scores. We print a grade for each one.

```js
let scores = [88, 53, 91, 67];

for (let score of scores) {
  let grade = getGrade(score);
  console.log(score + " gets grade " + grade);
}
// 88 gets grade B
// 53 gets grade F
// 91 gets grade A
// 67 gets grade D
```

The `for...of` loop visits each score in the array. For each one, it calls `getGrade` and prints the result. One small function plus one loop does all the work.

### Try this

In the Console, make a variable `hour` set to a number from 0 to 23. Use an `if`, `else if`, `else` chain to print a greeting: before 12 print "Good morning", before 18 print "Good afternoon", otherwise print "Good evening". Change `hour` and run it again to test each path.

!!! note "A note on sabr"
    Your code will not work the first time. That is normal, not failure. Read the
    error, check one line at a time, and try again. Sabr, calm patience, is the
    real skill of a programmer. The bug always has a reason, and you will find it.

??? note urdu "اردو میں مزید وضاحت"
    جاوا اسکرپٹ میں ہر قدر یا تو سچ مانی جاتی ہے یا جھوٹ۔ صرف چھ قدریں جھوٹی یعنی falsy ہیں۔ یہ ہیں false، صفر، خالی سٹرنگ، null، undefined اور NaN۔ ان کے علاوہ باقی سب کچھ سچ یعنی truthy ہے۔ یہی وجہ ہے کہ خالی سٹرنگ اور صفر دونوں if کے اندر جھوٹ بن جاتے ہیں۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. In an `else if` chain, why must you put the strictest check first?
2. Name three of the six falsy values in JavaScript.
3. What is the difference between `for...of` and `for...in`?
4. What does `break` do, and how is `continue` different from it?

---

## What's next

You have made your code decide and repeat. You also saw a small function in the grading example. In 6.3 you will learn functions properly. You will see how to package code into reusable blocks that take input and return output.

[Next lesson: 6.3 Functions &rarr;](7-3-functions.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [javascript.info: Loops: while and for](https://javascript.info/while-for)
- [MDN: Making decisions in your code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[conditional]: Code that runs only when a condition is true. (Roman Urdu: shart par chalne wala code)
*[if statement]: A block that runs code when its condition is true. (Roman Urdu: aisa block jo sirf tab chalta hai jab uski shart sachi ho.)
*[switch]: A statement that matches one value against many fixed cases. (Roman Urdu: aik value ko kai tay shuda options se milata hai, lambi if chain ki jagah saaf tareeqa.)
*[ternary operator]: A short one line choice written as condition ? a : b. (Roman Urdu: aik line mein faisla: agar shart sachi hai to a, warna b milta hai.)
*[truthy]: A value that JavaScript treats as true in a condition. (Roman Urdu: aisi value jise if ke andar JavaScript sach maan leta hai.)
*[falsy]: A value that JavaScript treats as false, like 0 or an empty string. (Roman Urdu: aisi value jise if ke andar JavaScript jhoot maan leta hai, jaise 0 ya khali string.)
*[loop]: Code that repeats while a condition stays true. (Roman Urdu: dobara dobara chalne wala code)
*[for...of]: A loop that goes over the values in an array. (Roman Urdu: array ki values par loop)
