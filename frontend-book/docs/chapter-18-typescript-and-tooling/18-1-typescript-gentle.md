---
lesson_id: frontend.ch18.l01
title: "18.1 TypeScript for React"
chapter: 18
order: 1
estimated_minutes: 45
prerequisites:
  - frontend.ch17.l04
---

# 18.1 TypeScript for React

You already write JavaScript. TypeScript is JavaScript with a small extra step. You add types to your values, and the editor checks them as you type. So you catch many bugs before the browser ever runs your code. Think of it as a helpful friend reading over your shoulder.

## What you'll know by the end

- Why TypeScript helps you, and how it relates to plain JavaScript.
- The basic types: string, number, boolean, arrays, objects, and unions.
- How to type function parameters and return values.
- How to type React props with an `interface` or a `type`.
- How to type state with `useState<T>` and when the type is inferred.
- How to type an event handler, and why you avoid `any`.

---

## Why TypeScript

JavaScript lets you do almost anything. That freedom is nice, but it hides mistakes. You can pass a number where a string was expected. The bug only shows up later, when a user clicks something.

TypeScript adds types on top of JavaScript. A type says what kind of value something is. The editor reads these types while you write. If you pass the wrong kind of value, you see a red squiggle right away.

```ts
let username: string = "Ayesha";
username = 42; // Error: a number is not a string
```

The second line never reaches the browser. TypeScript stops you first. You also get better autocomplete, because the editor knows the shape of your data.

### JS bug caught at runtime vs TS caught while typing

This is the core difference. In plain JavaScript, you find the bug only when it crashes. In TypeScript, the editor underlines the mistake before you save the file.

=== "JavaScript (bug at runtime)"

    ```js
    // JS: No warning. Bug hides until a user triggers it.
    function greet(user) {
      return "Hello, " + user.name.toUpperCase();
    }

    greet(null); // Crashes: Cannot read properties of null
    ```

=== "TypeScript (error while typing)"

    ```ts
    // TS: Editor shows a red squiggle immediately.
    function greet(user: { name: string }) {
      return "Hello, " + user.name.toUpperCase();
    }

    greet(null);
    // Error: Argument of type 'null' is not assignable
    //        to parameter of type '{ name: string }'
    ```

The TypeScript version never compiles. You fix it at your desk, not after a user reports a crash.

---

## Anatomy of a type annotation

A type annotation is the part you add after the colon. It tells TypeScript what kind of value a name holds.

<figure markdown>
<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-annotation-title" style="max-width:100%;height:auto">
  <title id="svg-annotation-title">Anatomy of a type annotation: the name 'username', then a colon, then the type 'string', then equals sign, then the value in quotes.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="60" width="110" height="40" rx="6" fill="#f4f4f1"/>
    <rect x="150" y="60" width="40" height="40" rx="6" fill="#ffffff"/>
    <rect x="210" y="60" width="100" height="40" rx="6" fill="#e8f4f0"/>
    <rect x="330" y="60" width="40" height="40" rx="6" fill="#ffffff"/>
    <rect x="390" y="60" width="120" height="40" rx="6" fill="#f4f4f1"/>
  </g>
  <g font-family="Inter, monospace" font-size="16" font-weight="600" text-anchor="middle">
    <g fill="#1f1f1c"><text x="75" y="86">username</text></g>
    <g fill="#6b6b65"><text x="170" y="86">:</text></g>
    <g fill="#0d7a5f"><text x="260" y="86">string</text></g>
    <g fill="#6b6b65"><text x="350" y="86">=</text></g>
    <g fill="#1f1f1c"><text x="450" y="86">"Ayesha"</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <g><text x="75" y="120">name</text></g>
    <g><text x="170" y="120">annotation</text></g>
    <g><text x="260" y="120">type</text></g>
    <g><text x="350" y="120">assignment</text></g>
    <g><text x="450" y="120">value</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <g><text x="75" y="136">what you name it</text></g>
    <g><text x="170" y="136">separates name</text></g>
    <g><text x="260" y="136">what kind it is</text></g>
    <g><text x="450" y="136">the actual data</text></g>
  </g>
</svg>
<figcaption>A type annotation: name, colon, type, equals, value. The colon and type are the only new parts TypeScript adds over JavaScript.</figcaption>
</figure>

A typed function looks the same, with annotations on each parameter and on the return type after the closing parenthesis.

<figure markdown>
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fn-title" style="max-width:100%;height:auto">
  <title id="svg-fn-title">Anatomy of a typed function: keyword, name, open paren, param a colon number, comma, param b colon number, close paren, colon number return type, then the body.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="10"  y="60" width="80"  height="40" rx="6" fill="#f4e8ff"/>
    <rect x="100" y="60" width="50"  height="40" rx="6" fill="#f4f4f1"/>
    <rect x="160" y="60" width="130" height="40" rx="6" fill="#e8f4f0"/>
    <rect x="300" y="60" width="130" height="40" rx="6" fill="#e8f4f0"/>
    <rect x="440" y="60" width="100" height="40" rx="6" fill="#fff3e0"/>
    <rect x="550" y="60" width="120" height="40" rx="6" fill="#f4f4f1"/>
  </g>
  <g font-family="Inter, monospace" font-size="13" font-weight="600" text-anchor="middle">
    <g fill="#7c3aed"><text x="50" y="86">function</text></g>
    <g fill="#1f1f1c"><text x="125" y="86">add</text></g>
    <g fill="#1f1f1c"><text x="225" y="86">(a: number,</text></g>
    <g fill="#1f1f1c"><text x="365" y="86">b: number)</text></g>
    <g fill="#0d7a5f"><text x="490" y="86">: number</text></g>
    <g fill="#6b6b65"><text x="610" y="86">{ ... }</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <g><text x="50"  y="120">keyword</text></g>
    <g><text x="125" y="120">function name</text></g>
    <g><text x="225" y="120">param + type</text></g>
    <g><text x="365" y="120">param + type</text></g>
    <g><text x="490" y="120">return type</text></g>
    <g><text x="610" y="120">body</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <g><text x="225" y="136">what goes IN</text></g>
    <g><text x="490" y="136">what comes OUT</text></g>
  </g>
</svg>
<figcaption>A typed function. Each parameter has a `: type` after its name. The return type sits after the closing parenthesis, before the body.</figcaption>
</figure>

---

## Basic types

Here are the types you will use most. You write a colon, then the type, after the name.

```ts
let title: string = "Hello";
let count: number = 10;
let isOpen: boolean = false;

let names: string[] = ["Ali", "Sana"]; // an array of strings
let scores: number[] = [90, 85, 70]; // an array of numbers
```

An object type lists each field and its type. This describes the shape of the data.

```ts
let user: { name: string; age: number } = {
  name: "Bilal",
  age: 20,
};
```

A union type means "one of these allowed values". You join them with a `|` symbol.

```ts
let size: "sm" | "md" | "lg" = "md";
size = "xl"; // Error: "xl" is not one of the three
```

A question mark makes a field optional. The value can be there, or it can be missing.

```ts
let profile: { name: string; bio?: string } = {
  name: "Zara",
}; // bio is allowed to be absent
```

### Common TypeScript types at a glance

| Type | Written as | Example value | What it means |
| --- | --- | --- | --- |
| String | `string` | `"Karachi"` | Any text value |
| Number | `number` | `42`, `3.14` | Any numeric value, int or float |
| Boolean | `boolean` | `true`, `false` | A yes/no value |
| Array of strings | `string[]` | `["Ali", "Sara"]` | A list where every item is a string |
| Array of numbers | `number[]` | `[1, 2, 3]` | A list where every item is a number |
| Object | `{ key: type }` | `{ name: string }` | A shape that describes an object |
| Union | `"a" \| "b"` | `"sm" \| "lg"` | One of several allowed values |
| Optional field | `field?: type` | `bio?: string` | The field may be absent |
| Void | `void` | (no return) | A function that returns nothing |
| Null or a value | `Type \| null` | `string \| null` | A value that might not be there yet |

---

## Typing functions

You type the parameters and the return value. The return type comes after the parentheses.

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(2, 3); // fine
add("2", 3); // Error: "2" is a string, not a number
```

Now `add` only accepts numbers. If you forget and pass a string, the editor warns you. The `: number` after the parentheses says the function gives back a number.

---

## Typing React props

This is the part you will use every day. You describe the props with an `interface` or a `type`. Both work the same way for simple cases.

```tsx
interface CardProps {
  title: string;
  count: number;
  variant?: "sm" | "lg";
}

function Card({ title, count, variant }: CardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Items: {count}</p>
    </div>
  );
}
```

`CardProps` lists the props the `Card` component expects. The `: CardProps` part tells TypeScript to check every use of `Card`. If you forget `title`, or pass a string where a number belongs, you see an error before you run anything.

You can use `type` instead of `interface` and get the same result.

```tsx
type CardProps = {
  title: string;
  count: number;
};
```

For props, pick one and stay consistent. Many React teams use `type`. Both are fine.

### interface vs type: when to use which

| Feature | `interface` | `type` |
| --- | --- | --- |
| Describe a props shape | Yes | Yes |
| Extend (add more fields) | `interface B extends A {}` | `type B = A & { ... }` |
| Union types | No | Yes: `type Size = "sm" \| "lg"` |
| Can be merged by TS | Yes (declaration merging) | No |
| Common convention | Library authors prefer it | App code teams often prefer it |

For beginners, use `type` for everything in your React app. It covers all the cases you will meet.

??? note urdu "اردو میں مزید وضاحت"
    TypeScript میں type annotation کا مطلب ہے کہ آپ ہر variable یا prop کے بعد colon لگا کر اس کی قسم بتاتے ہیں جیسے `: string` یا `: number`۔ JavaScript میں یہ نہیں ہوتا، اس لیے غلطی صرف runtime پر پکڑی جاتی ہے جب user کچھ کرتا ہے۔ TypeScript میں یہ غلطی editor میں فوری سرخ لکیر کی صورت میں نظر آتی ہے۔ props کے لیے آپ ایک `interface` یا `type` بناتے ہیں جو بتاتا ہے کہ component کو کون سی props چاہئیں۔ union type کا مطلب ہے "صرف یہ چند values allowed ہیں"، جیسے `"sm" | "md" | "lg"`۔

---

## Typing state with useState

`useState` can take a type inside angle brackets. This is the `useState<T>` pattern. The `T` is the type you want for that state.

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Often you do not need to write the type at all. TypeScript can infer it from the starting value. Because `0` is a number, `count` is a number automatically.

```tsx
const [count, setCount] = useState(0); // count is inferred as number
```

You write the type when the start value does not tell the full story. For example, a value that starts as `null` but later holds a user object.

```tsx
const [user, setUser] = useState<{ name: string } | null>(null);
```

### When to write the type on useState

| Situation | Write the type? | Example |
| --- | --- | --- |
| Starting value is a number | No, inferred | `useState(0)` |
| Starting value is a string | No, inferred | `useState("")` |
| Starting value is a boolean | No, inferred | `useState(false)` |
| Starting value is `null` but will be an object | Yes | `useState<User \| null>(null)` |
| Starting value is an empty array | Yes | `useState<string[]>([])` |
| Starting value is `null` but will be a string | Yes | `useState<string \| null>(null)` |

---

## Typing event handlers

Event handlers receive an event object. TypeScript wants to know its type. For an input `onChange`, the type is `React.ChangeEvent<HTMLInputElement>`.

```tsx
function NameInput() {
  const [name, setName] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return <input value={name} onChange={handleChange} />;
}
```

The type tells the editor that `event.target` is an input element. So `event.target.value` autocompletes and is known to be a string. The type looks long, but you copy it once and reuse it.

### Common event handler types

| Event | Element | TypeScript type |
| --- | --- | --- |
| `onChange` on text input | `<input>` | `React.ChangeEvent<HTMLInputElement>` |
| `onChange` on select | `<select>` | `React.ChangeEvent<HTMLSelectElement>` |
| `onSubmit` on form | `<form>` | `React.FormEvent<HTMLFormElement>` |
| `onClick` on button | `<button>` | `React.MouseEvent<HTMLButtonElement>` |
| `onKeyDown` on input | `<input>` | `React.KeyboardEvent<HTMLInputElement>` |

!!! tip
    Let TypeScript infer simple types for you. You do not need a type on `useState(0)` or on a value that is clearly a number. Write types where they add clarity, like props and function return values. Less noise, same safety.

---

## The `any` type and gradual migration

There is a type called `any`. It means "skip all checks for this value". It makes errors disappear, but for the wrong reason.

```ts
let data: any = "hello";
data = 42;
data.doesNotExist(); // No error, but this will crash at runtime
```

With `any`, TypeScript stops protecting you. The bug returns, just later and harder to find.

!!! warning
    Avoid `any`. It switches off the checks that make TypeScript useful. If you do not know a type yet, leave a comment and come back. Reaching for `any` is like turning off the smoke alarm because it keeps beeping.

You do not convert a whole project in one day. TypeScript allows JavaScript files alongside TypeScript files. So you migrate one file at a time.

The steps are simple. Rename a `.js` file to `.ts`, or a `.jsx` file to `.tsx`. Then fix the errors that appear, one by one. The rest of your app keeps working while you do this.

---

### Try this

Take a small React component you wrote before and rename its file to `.tsx`. Write an `interface` for its props, then add `: YourProps` to the component. Type any `useState` that needs it, and type one event handler with `React.ChangeEvent<HTMLInputElement>`. Fix each red squiggle until the editor is calm.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does TypeScript add on top of JavaScript, and when does it catch mistakes?
2. How do you write a union type that allows only `"sm"`, `"md"`, or `"lg"`?
3. When can you skip writing a type on `useState`, and when should you write one?
4. Why should you avoid `any`?

---

## What's next

You can now type your props, your state, and your event handlers. Next you will use ready made component libraries that ship with these types built in. You will meet shadcn/ui, Radix, and Headless UI, and see how they speed up your work.

[Next lesson: 17.2 shadcn/ui, Radix, Headless UI &rarr;](18-2-shadcn-radix-headless.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Using TypeScript](https://react.dev/learn/typescript)
- [TypeScript handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[TypeScript]: JavaScript with types added, checked as you write. (Roman Urdu: JavaScript jis mein types lagti hain.)
*[type]: A label that says what kind of value something is. (Roman Urdu: value ki qisam batane wala label.)
*[interface]: A way to describe the shape of an object, often used for props. (Roman Urdu: object ki shakal bayan karne ka tareeqa.)
*[union type]: A type that allows one of several listed values. (Roman Urdu: kai mein se ek allowed value.)
*[type inference]: When TypeScript guesses the type from the value. (Roman Urdu: value se type khud andaza lagana.)
*[any]: A type that turns off all checks for a value. Avoid it. (Roman Urdu: saare checks band kar dene wali type.)
