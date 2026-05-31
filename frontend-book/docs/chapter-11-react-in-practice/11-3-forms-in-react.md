---
lesson_id: frontend.ch11.l03
title: "11.3 Forms in React"
chapter: 11
order: 3
estimated_minutes: 45
prerequisites:
  - frontend.ch11.l02
---

# 11.3 Forms in React

In 10.3 you handled one controlled input. Real apps need more. A signup form has a name, an email, and a password. You will learn how to hold many fields in one state object. You will also check the values before you submit and show clear errors.

## What you'll know by the end

- Build a form with multiple controlled inputs.
- Hold all fields in one state object.
- Write one shared `onChange` handler for every input.
- Validate fields on submit and show inline errors.
- Reset the form after a successful submit.
- Read a value with `ref` when you do not need to track every keystroke.

---

## Controlled vs uncontrolled: the big picture

Before you write any code, understand the two mental models for inputs in React.

A controlled input (Roman Urdu: woh input jiski value React state mein hoti hai) keeps its value in state. Every keystroke fires `onChange`, which updates state, which re-renders the input with the new value. React is always in charge of what the input shows.

An uncontrolled input (Roman Urdu: input jo apni value khud DOM mein rakhta hai) lets the browser manage the value the old way. You only read it when you need it, using a `ref`. No state, no re-render on each keystroke.

Here is how they compare:

| Feature | Controlled input | Uncontrolled input |
| --- | --- | --- |
| Value lives in | React state | The DOM itself |
| When you can read the value | Any time (it is in state) | Only when you ask via `ref` |
| Instant validation possible | Yes, on every keystroke | No, only at submit time |
| Default React style | Yes, preferred | For simple or one-off reads |
| Requires `onChange` handler | Yes | No |

For most forms with validation, use controlled inputs. They give you full knowledge of the value at every moment. Use uncontrolled inputs for very simple, low-priority reads like a search box that fires on submit.

---

## The controlled input data flow

It helps to see the cycle. State drives the input value. The user types. `onChange` fires. Your handler calls `setState`. That updates state and re-renders the input with the fresh value.

<figure markdown>
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-controlled-flow" style="max-width:100%;height:auto">
  <title id="svg-controlled-flow">Controlled input data-flow loop: state holds the value, the input displays that value, the user types to trigger onChange, onChange calls setState, setState updates state, and the cycle repeats.</title>
  <defs>
    <marker id="bq-arr-cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="230" y="20" width="160" height="44" rx="8"/>
    <rect x="430" y="108" width="160" height="44" rx="8"/>
    <rect x="230" y="196" width="160" height="44" rx="8"/>
    <rect x="30" y="108" width="160" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#1f1f1c">
    <text x="310" y="38" font-size="14" font-weight="600">state</text>
    <text x="310" y="54" font-size="11" fill="#6b6b65">{ name: "Ali" }</text>
    <text x="510" y="126" font-size="14" font-weight="600">input</text>
    <text x="510" y="142" font-size="11" fill="#6b6b65">value={form.name}</text>
    <text x="310" y="214" font-size="14" font-weight="600">onChange</text>
    <text x="310" y="230" font-size="11" fill="#6b6b65">user types a key</text>
    <text x="110" y="126" font-size="14" font-weight="600">setState</text>
    <text x="110" y="142" font-size="11" fill="#6b6b65">updates state</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-cf)">
    <line x1="390" y1="42" x2="432" y2="108"/>
    <line x1="510" y1="152" x2="390" y2="196"/>
    <line x1="230" y1="218" x2="188" y2="152"/>
    <line x1="110" y1="108" x2="268" y2="64"/>
  </g>
</svg>
<figcaption>The controlled input is a loop. State sets the value. The user types. onChange fires setState. setState re-renders the input with the new value. React is always the source of truth.</figcaption>
</figure>

---

## Many fields, one state object

A controlled input keeps its value in state. With one input that is easy. With three inputs you do not want three separate state variables. That gets messy fast.

Instead, hold all the fields in one object.

```jsx
import { useState } from "react";

function SignupForm() {
  // One state object holds every field.
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <form>
      <input value={form.name} />
      <input value={form.email} />
      <input value={form.password} />
    </form>
  );
}
```

The `form` object has one key per field. Each input reads its value from that object. Next you need a way to update the right key when the user types.

---

## One onChange handler for all inputs

You could write a separate handler for each field. That is a lot of repeated code. A smarter way uses the input's `name` attribute.

Give each input a `name` that matches its key in the state object. Then one handler can update any field.

```jsx
function handleChange(e) {
  // e.target.name is "name", "email", or "password".
  // e.target.value is what the user typed.
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
}
```

Look closely at this line. `setForm` gets a function. The function receives `prev`, the old state. You spread `prev` first to keep the other fields. Then `[e.target.name]` sets just the one field that changed.

The square brackets are a computed property name (Roman Urdu: bracket mein likhi gayi key jo value se banti hai). JavaScript reads the value inside the brackets and uses it as the key. So if `e.target.name` is `"email"`, you update the `email` key.

```jsx
<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>
<input
  name="email"
  value={form.email}
  onChange={handleChange}
/>
```

Both inputs call the same `handleChange`. The `name` attribute tells the handler which field to update.

!!! tip
    Give each input a `name` attribute that matches its key in the state object. Then one `onChange` handler works for every field. Less code, fewer bugs.

!!! warning
    When you update an object in state, spread the old object first. If you write `setForm({ [e.target.name]: e.target.value })`, you erase all the other fields. The spread `...prev` keeps them safe.

---

## Validating on submit

You do not always check input on every keystroke. A common pattern is to check everything when the user submits.

First, stop the page from reloading. Then check each field. Collect any problems into an `errors` object in state. Show those errors next to each input.

```jsx
const [errors, setErrors] = useState({});

function handleSubmit(e) {
  e.preventDefault(); // Stop the page reload.

  const newErrors = {};

  // Name must not be empty.
  if (form.name.trim() === "") {
    newErrors.name = "Please enter your name.";
  }

  // Email must have an @ and a dot.
  if (!form.email.includes("@") || !form.email.includes(".")) {
    newErrors.email = "Please enter a valid email.";
  }

  // Password must be at least 6 characters.
  if (form.password.length < 6) {
    newErrors.password = "Password needs at least 6 characters.";
  }

  setErrors(newErrors);

  // If newErrors has no keys, the form is valid.
  if (Object.keys(newErrors).length === 0) {
    console.log("Form is valid:", form);
  }
}
```

`preventDefault` stops the browser's default submit, which reloads the page. You build a fresh `newErrors` object. For each field, you add a message if it fails the check. Then you save it with `setErrors`.

`Object.keys(newErrors).length` counts how many errors you found. If it is `0`, every field passed. That is when you accept the form.

To show an error under an input, read it from the `errors` object:

```jsx
<input name="email" value={form.email} onChange={handleChange} />
{errors.email && <p className="error">{errors.email}</p>}
```

The `&&` only shows the paragraph when `errors.email` has a message. No error means nothing renders.

Here are the common validation states you will use most often:

| Field type | Rule to check | Error message to show |
| --- | --- | --- |
| Name / text | `value.trim() === ""` | "Please enter your name." |
| Email | `!value.includes("@")` | "Please enter a valid email." |
| Password | `value.length < 6` | "Password needs at least 6 characters." |
| Number | `isNaN(value) or value <= 0` | "Please enter a valid number." |
| Required select | `value === ""` | "Please choose an option." |

---

## Resetting the form

After a successful submit, you often clear the form. To do that, set the state back to empty values.

```jsx
function handleSubmit(e) {
  e.preventDefault();
  // ...validation runs here...

  if (Object.keys(newErrors).length === 0) {
    // Success. Clear every field.
    setForm({ name: "", email: "", password: "" });
    setErrors({});
    setSuccess("Account created.");
  }
}
```

You reset `form` to the same empty object you started with. You also clear `errors`. A success message tells the user it worked.

---

## The full signup form

Here is everything together. Read the comments to follow the flow.

```jsx
import { useState } from "react";

function SignupForm() {
  // One object holds all three fields.
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // One handler updates the field that matches the input's name.
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // No page reload.
    setSuccess(""); // Clear any old message.

    const newErrors = {};

    if (form.name.trim() === "") {
      newErrors.name = "Please enter your name.";
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Please enter a valid email.";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password needs at least 6 characters.";
    }

    setErrors(newErrors);

    // No errors means the form is valid.
    if (Object.keys(newErrors).length === 0) {
      setSuccess("Account created.");
      // Reset the form back to empty.
      setForm({ name: "", email: "", password: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      {errors.name && <p className="error">{errors.name}</p>}

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      {errors.email && <p className="error">{errors.email}</p>}

      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="error">{errors.password}</p>}

      <button type="submit">Sign up</button>

      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default SignupForm;
```

This form uses one state object, one `onChange`, and one `onSubmit`. It checks all three fields, shows inline errors, and resets on success. You can add more fields with very little extra code.

---

## Uncontrolled inputs with ref

Controlled inputs track every keystroke in state. Sometimes you do not need that. Maybe you only want the value once, at submit time.

For that, you can use an uncontrolled input with a `ref`. A `ref` (Roman Urdu: DOM element tak pohanchne wala React hook) lets you reach into the DOM and read the input directly.

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    // Read the value only when you need it.
    console.log(inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />
      <button type="submit">Search</button>
    </form>
  );
}
```

`useRef` gives you an object with a `current` property. You attach it to the input with `ref={inputRef}`. Then `inputRef.current.value` reads what the user typed. No state, no re-render on each keystroke.

Controlled inputs are the usual choice. They give you full control for validation and live feedback. Use uncontrolled inputs for simple or one-off reads, like a quick search box.

??? note urdu "اردو میں مزید وضاحت"
    ری ایکٹ میں جب فارم میں کئی فیلڈز ہوں، تو سب کو ایک اسٹیٹ آبجیکٹ میں رکھنا آسان ہے۔ ہر ان پٹ کو ایک name دیں جو آبجیکٹ کی کلید سے ملے۔ پھر ایک ہی onChange ہینڈلر تمام فیلڈز کو سنبھال لیتا ہے۔ اسٹیٹ بدلتے وقت پہلے پرانے آبجیکٹ کو ...prev کے ساتھ پھیلائیں، ورنہ باقی فیلڈز مٹ جائیں گی۔ کنٹرولڈ ان پٹ وہ ہے جس کی ویلیو ری ایکٹ اسٹیٹ میں ہو اور انکنٹرولڈ وہ جسے صرف ref سے پڑھیں۔ فارم ویلیڈیشن کا مطلب ہے کہ سبمٹ کرنے سے پہلے چیک کریں کہ سب فیلڈز ٹھیک بھری ہیں۔

### Try this

Build a small contact form with two controlled fields, `email` and `message`, held in one state object. Use a single `onChange` handler that updates the right key with `[e.target.name]`. On submit, call `e.preventDefault()`, then check that the email contains an `@` and the message is at least 10 characters. Show an inline error under any field that fails, and on success, clear both fields and show a "Message sent" line.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why do you hold all the form fields in one state object instead of many?
2. What does `[e.target.name]` do inside `setForm`?
3. Why must you spread `...prev` when you update an object in state?
4. When would you pick an uncontrolled input with `ref` over a controlled input?

---

## What's next

You now know how to build, validate, and reset a real form. Next you will put your React skills to work on a project. In 11.4 you will build a donation mini-app that uses state, a form, and a list together.

[Next lesson: 11.4 Project: the donation mini-app &rarr;](11-4-alkhidmat-donation-app.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [react.dev: Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[controlled input]: An input whose value lives in React state and updates on every change. (Roman Urdu: woh input jiski value React state mein hoti hai)
*[uncontrolled input]: An input that holds its own value in the DOM, read with a ref when needed. (Roman Urdu: input jo apni value khud DOM mein rakhta hai)
*[useRef]: A React hook that gives a stable object to point at a DOM element or value. (Roman Urdu: DOM element tak pohanchne wala React hook)
*[computed property name]: An object key written in square brackets so its value becomes the key. (Roman Urdu: bracket mein likhi gayi key jo value se banti hai)
*[form validation]: Checking that the user's input is correct before you accept it. (Roman Urdu: submit se pehle input ki janch karna)
