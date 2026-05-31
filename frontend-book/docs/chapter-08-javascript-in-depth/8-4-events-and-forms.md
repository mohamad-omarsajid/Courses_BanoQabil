---
lesson_id: frontend.ch08.l04
title: "8.4 Events and forms"
chapter: 8
order: 4
estimated_minutes: 45
prerequisites:
  - frontend.ch08.l03
---

# 8.4 Events and forms

So far your pages just sit there and look pretty. Now you make them react. When a user clicks a button or types in a box, your code can run. This lesson teaches events, the heart of every interactive page. By the end, your old contact form will actually check its input.

## What you'll know by the end

- What an event is and how to listen for one with `addEventListener`.
- Why `addEventListener` beats the old inline `onclick` way.
- How to read the event object and use `e.target`.
- The common events: `click`, `submit`, `input`, `change`, and `keydown`.
- How to read form values and stop a form from reloading the page.
- How to validate fields and show inline error messages to the user.

---

## What is an event

An event (Roman Urdu: koi cheez jo page par hoti hai, jaise click ya typing) is something that happens on your page. A user clicks a button. A user types a key. A user submits a form. The browser notices these things and tells your code about them. Your job is to listen and react.

To listen, you use a method called `addEventListener`. You call it on an element. You give it two things. First, the name of the event as a string. Second, a function to run when the event happens. That function is called the handler.

```js
// Grab the button from the page
const button = document.querySelector("#myButton");

// Listen for clicks on it
button.addEventListener("click", function () {
  console.log("You clicked the button");
});
```

Here you find the button, then attach a click listener. Every time the user clicks, the function runs. Open the console and you see the message. Simple as that.

---

## Why not just use onclick in the HTML

You may have seen code that puts JavaScript right in the HTML tag, like `<button onclick="doThing()">`. This is the old way. It works, but it mixes your structure and your logic in one place. That gets messy fast.

`addEventListener` keeps your HTML clean and your JavaScript separate. It also lets you attach many listeners to one element. With `onclick`, a second one just overwrites the first. So you lose the old one. Always prefer `addEventListener`.

!!! tip
    Keep your JavaScript in a separate `.js` file and your HTML clean. This makes
    your code much easier to read and fix later.

---

## The event object

When your handler runs, the browser hands it an object. This object holds details about what happened. By habit, people name this parameter `e`. You can call it anything, but `e` is short and common.

```js
const button = document.querySelector("#myButton");

button.addEventListener("click", function (e) {
  // e is the event object
  console.log(e.type);   // "click"
  console.log(e.target); // the exact element that was clicked
});
```

One useful part is `e.target`. It points to the exact element that fired the event. So if the user clicked a button, `e.target` is that button. This becomes very handy in the next section.

### Event object properties you will actually use

| Property | What it holds | Example value |
| --- | --- | --- |
| `e.type` | the name of the event | `"click"`, `"submit"`, `"keydown"` |
| `e.target` | the element that triggered the event | the button the user clicked |
| `e.target.value` | the current text in an input | `"Sara"` |
| `e.target.tagName` | the tag name of the target in uppercase | `"LI"`, `"BUTTON"` |
| `e.key` | the key that was pressed (for keyboard events) | `"Enter"`, `"a"` |
| `e.preventDefault()` | stops the browser default (form reload, link navigate) | called as a method |
| `e.stopPropagation()` | stops the event from bubbling to parent elements | called as a method |
| `e.clientX`, `e.clientY` | mouse position in pixels from the top-left corner | `350`, `180` |

---

## Common events you will use

There are many event names, but a few cover most of your work. Here are the ones you need now.

```js
const form = document.querySelector("#contactForm");
const nameField = document.querySelector("#name");

// Fires when a form is submitted
form.addEventListener("submit", function (e) {
  console.log("Form submitted");
});

// Fires on every single keystroke in a field
nameField.addEventListener("input", function (e) {
  console.log("Current value:", e.target.value);
});

// Fires when the field changes and then loses focus
nameField.addEventListener("change", function (e) {
  console.log("Field changed and blurred");
});

// Fires when a key goes down
nameField.addEventListener("keydown", function (e) {
  console.log("Key pressed:", e.key);
});
```

`click` runs when the user clicks. `submit` runs when a form is sent. `input` fires on every keystroke, so it is great for live checks. `change` fires only after the field loses focus and its value changed. `keydown` fires the moment a key goes down.

| Event name | When it fires | Good for |
| --- | --- | --- |
| `click` | user clicks the element | buttons, links, toggles |
| `submit` | user submits the form | form validation |
| `input` | every keystroke or paste into an input | live character counts, live search |
| `change` | input loses focus after a value change | dropdowns, checkboxes |
| `keydown` | the moment a key is pressed | catching Enter, blocking certain keys |
| `keyup` | the moment a key is released | action after typing finishes |
| `focus` | an element gains focus (cursor goes in) | showing hints, highlighting fields |
| `blur` | an element loses focus | validating a field after the user leaves it |
| `mouseover` | mouse enters an element | showing tooltips |
| `mouseout` | mouse leaves an element | hiding tooltips |

---

## Event bubbling

When you click an element, that click does not stay on it. The event travels up through every parent element to the top of the page. This is called bubbling.

<figure markdown>
<svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-bubble-title" style="max-width:100%;height:auto">
  <title id="svg-bubble-title">Event bubbling: a click on a button inside a div inside a section travels upward through the div, then the section, then the body, then the document.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="20" width="460" height="340" rx="12"/>
    <rect x="60" y="55" width="400" height="270" rx="10"/>
    <rect x="100" y="95" width="320" height="200" rx="8"/>
    <rect x="180" y="155" width="160" height="50" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="260" y="46">document</text>
    <text x="260" y="78">body</text>
    <text x="260" y="115">div</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="260" y="186">button (click here)</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="260" y="290">Event travels upward through every parent</text>
    <text x="260" y="310">until it reaches the document root.</text>
  </g>
  <defs>
    <marker id="bq-bubble-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#bq-bubble-arrow)">
    <path d="M420 180 Q 460 155 460 115 Q 460 78 420 68"/>
    <path d="M390 68 Q 370 50 330 42"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <text x="462" y="148">bubbles</text>
    <text x="462" y="160">up</text>
  </g>
</svg>
<figcaption>A click on the button bubbles up through every ancestor. Parent listeners see it too, unless you call e.stopPropagation().</figcaption>
</figure>

Bubbling is why event delegation works. You attach one listener to the parent, and every child click reaches it.

---

## Event delegation

Imagine a list with a hundred items. You could attach a listener to each one. That is a lot of listeners. Instead, you attach one listener to the parent. Then you use `e.target` to see which child was clicked. This trick is called event delegation (Roman Urdu: ek parent listener se saare children ko sambhalna).

```js
const list = document.querySelector("#todoList");

// One listener on the parent handles all the children
list.addEventListener("click", function (e) {
  // Check which child was actually clicked
  if (e.target.tagName === "LI") {
    console.log("You clicked:", e.target.textContent);
  }
});
```

This is great for lists that grow or shrink. New items work right away because the parent already listens. You do not need to add a new listener each time you add an item.

!!! note "Did you know"
    One event listener on a parent can handle clicks for hundreds of children.
    This is called event delegation. It saves memory and works even when you add
    new children later.

---

## Reading form values

To get what a user typed, you read the `value` property of the input. It always gives you a string.

```js
const nameField = document.querySelector("#name");

// Read whatever the user typed
const typedName = nameField.value;
console.log("The name is:", typedName);
```

So `nameField.value` holds the current text. If the box is empty, `value` is an empty string `""`. You will use this to check whether the user filled a field.

---

## Stopping the page reload

By default, when a user submits a form, the browser reloads the page. It tries to send the data to a server. For now, you want to handle things yourself in JavaScript. So you stop that default behavior with `event.preventDefault()`.

```js
const form = document.querySelector("#contactForm");

form.addEventListener("submit", function (e) {
  // Stop the page from reloading
  e.preventDefault();

  console.log("Now I can handle the form myself");
});
```

Call `e.preventDefault()` first thing in your submit handler. After that, the page stays put and your code runs. You keep full control.

!!! tip
    Always call `preventDefault` in a form submit handler. If you forget, the page
    reloads and you lose the data and any work you were doing.

---

## A note on validating input

!!! note "A note on validating input"
    Never assume the data is clean. Users make mistakes, and some people send bad
    input on purpose. Checking every field is a healthy caution. Client checks help
    the user, but the server must check too, because anything from the browser can
    be faked.

---

## Form validation flow

Here is the logical shape of every validation you will ever write. Each submit goes through the same steps.

<figure markdown>
<svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-form-flow-title" style="max-width:100%;height:auto">
  <title id="svg-form-flow-title">Form submit flow: user clicks Submit, preventDefault stops reload, each field is checked, if any check fails an error message appears under that field, if all checks pass a success message is shown and the form is cleared.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="200" y="20" width="160" height="44" rx="8"/>
    <rect x="200" y="104" width="160" height="44" rx="8"/>
    <rect x="200" y="188" width="160" height="44" rx="8"/>
    <rect x="30" y="284" width="180" height="44" rx="8"/>
    <rect x="350" y="284" width="180" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" text-anchor="middle" fill="#1f1f1c">
    <text x="280" y="46">User clicks Submit</text>
    <text x="280" y="130">preventDefault()</text>
    <text x="280" y="207">Check each field</text>
    <text x="120" y="301">show error</text>
    <text x="120" y="315">under that field</text>
    <text x="440" y="301">show success</text>
    <text x="440" y="315">clear form</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="280" y="96">stops reload</text>
    <text x="140" y="272">field invalid</text>
    <text x="420" y="272">all fields valid</text>
  </g>
  <defs>
    <marker id="bq-form-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-form-arrow)">
    <line x1="280" y1="64" x2="280" y2="103"/>
    <line x1="280" y1="148" x2="280" y2="187"/>
    <line x1="200" y1="210" x2="120" y2="283"/>
    <line x1="360" y1="210" x2="440" y2="283"/>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="280" y1="232" x2="280" y2="260"/>
    <line x1="120" y1="260" x2="440" y2="260"/>
  </g>
</svg>
<figcaption>Every submit handler follows this path: stop the reload, check each field, show errors for failures, show success only when all pass.</figcaption>
</figure>

---

## Real example: the contact form

Remember the contact form from lesson 2.3. It looked nice but did nothing. Now you make it work. Here is the HTML. Notice each field has a small empty box below it for an error message.

```html
<form id="contactForm" novalidate>
  <!-- Name field -->
  <label for="name">Name</label>
  <input type="text" id="name" />
  <small class="error" id="nameError"></small>

  <!-- Email field -->
  <label for="email">Email</label>
  <input type="email" id="email" />
  <small class="error" id="emailError"></small>

  <!-- Message field -->
  <label for="message">Message</label>
  <textarea id="message"></textarea>
  <small class="error" id="messageError"></small>

  <button type="submit">Send</button>

  <!-- Success message shows here when all is well -->
  <p id="successMessage"></p>
</form>
```

The `novalidate` attribute turns off the browser's own checks. You do them yourself instead. Each `small` tag with the class `error` will hold one error message. They start empty.

You also want the error text to be small and red. Add this CSS.

```css
.error {
  color: red;
  font-size: 0.8rem;
  display: block;
}
```

Now the JavaScript. Read it slowly. The comments explain each step.

```js
const form = document.querySelector("#contactForm");

form.addEventListener("submit", function (e) {
  // Step 1: stop the page from reloading
  e.preventDefault();

  // Step 2: grab the fields and their values
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  // Step 3: grab the error boxes
  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const messageError = document.querySelector("#messageError");
  const success = document.querySelector("#successMessage");

  // Step 4: clear any old messages first
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  success.textContent = "";

  // Step 5: assume valid until a check fails
  let isValid = true;

  // Check the name is not empty
  if (name.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }

  // Check the email has a basic shape
  // It needs some text, an @, more text, a dot, and more text
  const emailShape = /^.+@.+\..+$/;
  if (email.value.trim() === "") {
    emailError.textContent = "Please enter your email.";
    isValid = false;
  } else if (!emailShape.test(email.value)) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  }

  // Check the message is not empty
  if (message.value.trim() === "") {
    messageError.textContent = "Please write a message.";
    isValid = false;
  }

  // Step 6: if all checks passed, show success
  if (isValid) {
    success.textContent = "Thank you. Your message is ready to send.";
    form.reset(); // clears the fields
  }
});
```

Walk through it. You stop the reload. You read each value. You clear old errors so they do not pile up. You set a flag called `isValid` to `true`. Each failing check writes a red message and flips the flag to `false`. The `trim()` part removes spaces, so a box full of spaces still counts as empty.

The email check uses a simple pattern. It just looks for text, an `@`, a dot, and more text. This is a basic shape, not a perfect test. That is fine for the user side. At the end, if `isValid` is still `true`, you show the success message and clear the form.

### Try this

Make a small HTML file with one button and an empty `<p id="output"></p>`. In your script, add a `click` listener on the button that sets the paragraph's `textContent` to "Clicked!". Open it and click. That single listener is the whole task before you try the full form.

??? note urdu "اردو میں مزید وضاحت"
    جب صارف فارم بھیجتا ہے تو براؤزر عام طور پر صفحہ دوبارہ لوڈ کر دیتا ہے۔ اس سے آپ کا ڈیٹا ضائع ہو جاتا ہے۔ اسے روکنے کے لیے ہم سب سے پہلے `e.preventDefault()` لکھتے ہیں۔ اس کے بعد صفحہ وہیں رکا رہتا ہے اور آپ کا اپنا کوڈ چلتا ہے۔ event bubbling کا مطلب یہ ہے کہ جب آپ کسی element پر click کریں، تو وہ event اوپر والے سارے parent elements تک بھی پہنچتا ہے۔ یوں آپ parent پر صرف ایک listener لگا کر سارے بچوں کے clicks سنبھال سکتے ہیں۔ یوں آپ خود fields کی جانچ کر سکتے ہیں اور غلطی کا پیغام دکھا سکتے ہیں۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What two things do you pass to `addEventListener`?
2. Why do you call `e.preventDefault()` inside a form submit handler?
3. What does `e.target` point to when a click happens?
4. What is the difference between the `input` event and the `change` event?

---

## What's next

Chapter 8 is done. Your pages now react to clicks and typing, and your forms check their own input before they say thank you. The next chapter takes your site off your laptop and onto the real internet, using a free host that anyone in the world can reach.

[Next chapter: 9. Deploy your first site &rarr;](../chapter-09-deploy-your-first-site/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [javascript.info: Browser events](https://javascript.info/introduction-browser-events)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[event]: Something that happens on a page, like a click or a keystroke. (Roman Urdu: aisa kaam jo page par hota hai, jaise click)
*[event listener]: Code that waits for an event and runs a function when it happens. (Roman Urdu: aisa code jo kisi event ka intezaar karta hai aur jab woh ho to aap ka function chala deta hai.)
*[event object]: An object the browser passes to your handler with details about the event. (Roman Urdu: event ki tafseel rakhne wala object)
*[submit]: The event that fires when a user sends a form. (Roman Urdu: woh event jo tab chalta hai jab user form ka Send ya Submit button dabata hai.)
*[preventDefault]: A method that stops the browser's default action, like a form reload. (Roman Urdu: browser ka default kaam rok deta hai)
*[validation]: Checking that user input is correct before you use it. (Roman Urdu: input sahi hai ya nahi, yeh jaanchna)
*[event delegation]: Attaching one listener to a parent to handle events from its children. (Roman Urdu: parent par aik listener laga kar bachon ko sambhalna)
