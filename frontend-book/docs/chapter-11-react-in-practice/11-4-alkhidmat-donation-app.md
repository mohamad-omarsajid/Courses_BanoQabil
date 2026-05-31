---
lesson_id: frontend.ch11.l04
title: "11.4 Project: the donation mini-app"
chapter: 11
order: 4
estimated_minutes: 60
prerequisites:
  - frontend.ch11.l03
---

# 11.4 Project: the donation mini-app

You learned a lot in Chapter 10 and the first three lessons of Chapter 11. Now you will use it all in one small app. You will build a donation mini-app for a fictional charity called Alkhidmat. The user picks an amount, fills a short form, and sees a thank you screen. No backend, just React state.

## What you'll know by the end

- How to plan a small React app before writing code
- How to split one screen into simple components
- How to keep shared state in the parent component
- How to pass data down with props and actions up with callbacks
- How to combine amount selection, a controlled form, validation, and a thank you state

---

## What you'll build

- A one-page React app where a user donates to a charity.
- Three amount cards (Rs 500, Rs 1000, Rs 5000) that the user can pick.
- A custom amount input so the user can type their own number.
- A donor form with name and email, both controlled inputs.
- Simple validation that checks the form before it submits.
- A confirmation screen that thanks the donor by name and shows the amount.

This project uses components, props, state, lifting state up, controlled forms, and conditional rendering.

---

## The app structure and data flow

Before writing a single line of code, draw the picture. This is how experienced React developers think. They map components to pieces of UI, then decide where state lives and how data moves.

<figure markdown>
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-app-structure" style="max-width:100%;height:auto">
  <title id="svg-app-structure">Component tree for the donation mini-app. App at the top owns all state. It passes props down to Header, AmountCard (times three), a custom input, DonorForm, and Confirmation. Arrows show data flowing down as props and events flowing up via callback props.</title>
  <defs>
    <marker id="bq-arr-st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="260" y="20" width="200" height="50" rx="8"/>
    <rect x="20" y="160" width="140" height="44" rx="8"/>
    <rect x="180" y="160" width="140" height="44" rx="8"/>
    <rect x="340" y="160" width="140" height="44" rx="8"/>
    <rect x="500" y="160" width="180" height="44" rx="8"/>
    <rect x="20" y="300" width="140" height="44" rx="8"/>
    <rect x="180" y="300" width="140" height="44" rx="8"/>
    <rect x="340" y="300" width="140" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#1f1f1c">
    <text x="360" y="42" font-size="15" font-weight="700">App</text>
    <text x="360" y="58" font-size="10" fill="#6b6b65">selectedAmount, form, submitted</text>
    <text x="90" y="178" font-size="13" font-weight="600">Header</text>
    <text x="90" y="193" font-size="10" fill="#6b6b65">amount prop</text>
    <text x="250" y="178" font-size="13" font-weight="600">AmountCard</text>
    <text x="250" y="193" font-size="10" fill="#6b6b65">x3: amount, isSelected</text>
    <text x="410" y="178" font-size="13" font-weight="600">Custom input</text>
    <text x="410" y="193" font-size="10" fill="#6b6b65">value=selectedAmount</text>
    <text x="590" y="178" font-size="13" font-weight="600">DonorForm</text>
    <text x="590" y="193" font-size="10" fill="#6b6b65">form, handleChange</text>
    <text x="90" y="318" font-size="12" font-weight="600">onSelect(amount)</text>
    <text x="90" y="333" font-size="10" fill="#6b6b65">event up to App</text>
    <text x="250" y="318" font-size="12" font-weight="600">onChange fires</text>
    <text x="250" y="333" font-size="10" fill="#6b6b65">setSelectedAmount</text>
    <text x="410" y="318" font-size="12" font-weight="600">handleSubmit</text>
    <text x="410" y="333" font-size="10" fill="#6b6b65">sets submitted=true</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-st)">
    <line x1="310" y1="70" x2="140" y2="158"/>
    <line x1="340" y1="70" x2="250" y2="158"/>
    <line x1="370" y1="70" x2="410" y2="158"/>
    <line x1="400" y1="70" x2="550" y2="158"/>
    <line x1="90" y1="204" x2="90" y2="298"/>
    <line x1="250" y1="204" x2="250" y2="298"/>
    <line x1="410" y1="204" x2="410" y2="298"/>
  </g>
</svg>
<figcaption>App owns all state. It passes data down as props (solid arrows). Child components report user actions back up through callback props like onSelect and handleSubmit (dashed arrows going upward).</figcaption>
</figure>

This picture answers the key question before you code: where does each piece of state live? All shared state sits in `App` because multiple components need to read or change it. Cards need to know which one is selected. The header needs to show the amount. The form fires the final submit. One parent, all the shared state.

---

## The app pieces at a glance

Here is a table of every piece in the app and its job:

| Piece | File | Job |
| --- | --- | --- |
| `App` | `App.jsx` | Owns all state, wires all children together |
| `Header` | `Header.jsx` | Shows charity name and selected amount (read only) |
| `AmountCard` | `AmountCard.jsx` | One clickable card per preset amount |
| Custom input | inside `App.jsx` | Free-text number input tied to `selectedAmount` |
| `DonorForm` | inside `App.jsx` | Name and email controlled inputs plus submit |
| `Confirmation` | inside `App.jsx` | Thank you screen shown after valid submit |
| `selectedAmount` state | `App` | The chosen Rs amount, 0 if nothing picked |
| `form` state | `App` | `{ name: "", email: "" }` object |
| `submitted` state | `App` | Boolean that flips the screen |

---

## Plan the state first

Before you write code, decide what data the app must remember. In React, changing data lives in state. This app needs three pieces of state, and they all live in the `App` component.

```jsx
// App.jsx
import { useState } from "react";

function App() {
  // The amount the user chose, as a number. 0 means nothing picked yet.
  const [selectedAmount, setSelectedAmount] = useState(0);

  // The donor's name and email, kept together as one object (from 10.3).
  const [form, setForm] = useState({ name: "", email: "" });

  // Has the user submitted a valid form? This flips the screen.
  const [submitted, setSubmitted] = useState(false);

  return <div>App goes here</div>;
}

export default App;
```

These three pieces decide everything you see. `selectedAmount` drives the header and the cards. `form` drives the input boxes. `submitted` decides which screen shows. The whole app reacts to these values.

---

## The Header component

The header shows the charity name and the amount the user picked. The amount comes from the parent as a prop. Data flows down. The header never changes the amount, it only shows it.

```jsx
// Header.jsx
function Header({ amount }) {
  return (
    <header className="header">
      <h1>Alkhidmat Donations</h1>
      {/* Show the amount only if the user picked one */}
      {amount > 0 ? (
        <p>You are donating Rs {amount}</p>
      ) : (
        <p>Pick an amount below</p>
      )}
    </header>
  );
}

export default Header;
```

The `{ amount }` part reads the prop sent by the parent. The `?` and `:` is a ternary. It is conditional rendering inside JSX. If the amount is more than 0, you show the chosen amount. If not, you show a hint. This is the same idea from Chapter 10.

---

## The AmountCard component

Each amount is one card. Instead of writing three near-identical blocks, you write one reusable `AmountCard` and use it three times. The card does not own the selected state. The parent owns it. The card just calls a function when clicked.

```jsx
// AmountCard.jsx
function AmountCard({ amount, isSelected, onSelect }) {
  return (
    <button
      type="button"
      // Add a class when this card is the selected one
      className={isSelected ? "card card-selected" : "card"}
      onClick={() => onSelect(amount)}
    >
      Rs {amount}
    </button>
  );
}

export default AmountCard;
```

The card takes three props. `amount` is the number to show. `isSelected` is true or false, sent by the parent. `onSelect` is a function from the parent. When the user clicks, the card calls `onSelect(amount)`. It tells the parent which amount was clicked. This is lifting state up (Roman Urdu: state ko parent mein le jaana). The child reports an event, and the parent updates the real state.

---

## Wire the cards into the App

Now put the cards inside `App` and connect them to state. You render one card per amount and pass the right props to each.

```jsx
const amounts = [500, 1000, 5000];

// inside App, in the return:
<div className="cards">
  {amounts.map((value) => (
    <AmountCard
      key={value}
      amount={value}
      // This card is selected if it matches the state
      isSelected={selectedAmount === value}
      // When clicked, save this amount in the parent state
      onSelect={setSelectedAmount}
    />
  ))}
</div>
```

You loop over the `amounts` array with `.map()`, just like Chapter 10. Each card gets a `key`. The `isSelected` prop compares the card value with `selectedAmount`. Only the matching card gets the selected style. When a user clicks any card, `setSelectedAmount` runs and the screen updates.

---

## The custom amount input

Some users want to give their own number. You add one controlled input for that. Its value comes from `selectedAmount`. Typing in it updates the same state. So the cards and the input share one source of truth.

```jsx
// inside App, in the return:
<div className="custom">
  <label htmlFor="custom-amount">Or type your own amount</label>
  <input
    id="custom-amount"
    type="number"
    value={selectedAmount}
    // Convert the text to a number before saving it
    onChange={(e) => setSelectedAmount(Number(e.target.value))}
  />
</div>
```

The input is controlled. Its `value` is tied to state, and `onChange` updates that state. Because both the cards and the input write to `selectedAmount`, they stay in sync. Click a card and the input shows that number. Type a number and the cards update their selected look.

---

## The donor form

Next you collect the donor's name and email. You use the object pattern from 10.3. One state object holds both fields. One change handler updates the right key by its `name` attribute.

```jsx
// inside App:
function handleChange(e) {
  const { name, value } = e.target;
  // Keep the other fields, change only the typed one
  setForm((prev) => ({ ...prev, [name]: value }));
}

function handleSubmit(e) {
  e.preventDefault(); // stop the page from reloading

  // Simple validation
  if (form.name.trim() === "") {
    alert("Please enter your name");
    return;
  }
  if (!form.email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }
  if (selectedAmount <= 0) {
    alert("Please pick an amount");
    return;
  }

  // All good, show the confirmation screen
  setSubmitted(true);
}
```

The `handleChange` function works for both inputs. It reads `name` and `value` from the event. Then it copies the old object with `...prev` and changes one key. The `handleSubmit` function checks the data. If anything is wrong, it shows an alert and stops with `return`. If all checks pass, it sets `submitted` to true.

Here is the form itself.

```jsx
// inside App, in the return:
<form onSubmit={handleSubmit} className="donor-form">
  <input
    name="name"
    placeholder="Your name"
    value={form.name}
    onChange={handleChange}
  />
  <input
    name="email"
    placeholder="Your email"
    value={form.email}
    onChange={handleChange}
  />
  <button type="submit">Donate Rs {selectedAmount}</button>
</form>
```

Both inputs are controlled. Their `value` reads from `form`, and their `onChange` calls `handleChange`. The `name` attribute tells the handler which field changed. The submit button shows the chosen amount, so the user sees what they are about to give.

---

!!! tip
    Build one piece at a time and test it before you add the next. Get the header showing. Then add the cards. Then the input, then the form. Small steps are easier to fix. If something breaks, you know it was the last piece you added.

---

## The confirmation screen

When the form is valid, the app should switch screens. You do this with conditional rendering (Roman Urdu: shart ke hisaab se alag UI dikhana). The `submitted` flag decides what to show. This is the same idea as the header, just for the whole page.

```jsx
// A small component for the thank you screen
function Confirmation({ name, amount }) {
  return (
    <div className="confirmation">
      <h2>Thank you, {name}</h2>
      <p>Your donation of Rs {amount} means a lot.</p>
      <p>This is a demo, so no real payment was made.</p>
    </div>
  );
}
```

The confirmation takes the donor name and amount as props. It shows a clear thank you message. There is no real payment here. The app only uses React state.

---

## Put it all together

Now the full `App` return. You use `submitted` to choose between the donation form and the confirmation screen.

```jsx
return (
  <div className="app">
    <Header amount={selectedAmount} />

    {/* If submitted, show the thank you. If not, show the form. */}
    {submitted ? (
      <Confirmation name={form.name} amount={selectedAmount} />
    ) : (
      <>
        <div className="cards">
          {amounts.map((value) => (
            <AmountCard
              key={value}
              amount={value}
              isSelected={selectedAmount === value}
              onSelect={setSelectedAmount}
            />
          ))}
        </div>

        <div className="custom">
          <label htmlFor="custom-amount">Or type your own amount</label>
          <input
            id="custom-amount"
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
          />
        </div>

        <form onSubmit={handleSubmit} className="donor-form">
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
          />
          <button type="submit">Donate Rs {selectedAmount}</button>
        </form>
      </>
    )}
  </div>
);
```

The header always shows. Below it, the `submitted` flag picks one of two views. The `<>` and `</>` is a fragment. It groups many elements without adding an extra box. This is your finished app. It is small, but it is a real React app, and it is portfolio-worthy. Add some CSS to make it look clean, and you can show it to anyone.

---

??? note urdu "اردو میں مزید وضاحت"
    اس ایپ میں سب سے اہم بات یہ ہے کہ تمام اہم ڈیٹا والد یعنی App کمپوننٹ میں رہتا ہے۔ منتخب رقم، فارم کے خانے، اور سبمٹ کا فلیگ سب ایک ہی جگہ موجود ہیں۔ کارڈ اور ان پٹ خود ڈیٹا نہیں رکھتے، وہ صرف والد کو بتاتے ہیں کہ کلک یا ٹائپ ہوا ہے۔ والد اسٹیٹ بدلتا ہے، پھر یہی نئی اسٹیٹ نیچے پراپس کی صورت میں ہر حصے کو ملتی ہے۔ اسی لیے کارڈ، ان پٹ، اور تصدیقی اسکرین سب ایک دوسرے کے ساتھ ہم آہنگ رہتے ہیں۔

---

!!! note "Did you know"
    A small finished project beats a big unfinished one in a portfolio. People can click a working app and understand it in seconds. A half-done project with grand plans tells them little. Ship the small thing.

---

!!! note "A note on ahd"
    Promise yourself you will finish this app before the next chapter. A half-built
    project teaches little. Keeping that small ahd, a commitment to yourself, is how
    real skill grows. Finished work also gives you something to show.

---

### Try this

Build the full donation app in a fresh Vite project, one piece at a time as the tip above suggests. Once it works, add one new feature on your own: a fourth amount card for Rs 10000, and a "Donate again" button on the confirmation screen that sets `submitted` back to `false` and resets `selectedAmount` to `0` and the `form` to empty. This proves you understand where the state lives and how the screens switch.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why does `selectedAmount` live in `App` and not inside `AmountCard`?
2. How does a card tell the parent which amount the user clicked?
3. What makes an input controlled, and how do the form fields use the object pattern?
4. How does the app switch from the form to the confirmation screen?

---

## What's next

Chapter 11 is done. You have built a real React app with components, props, state, lifting state up, controlled forms, and conditional rendering. The next chapter adds motion. You will use GSAP and smooth scroll to make your sites feel alive.

[Next chapter: 12. Animation: GSAP and smooth scroll &rarr;](../chapter-12-animation-gsap/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Thinking in React](https://react.dev/learn/thinking-in-react)
- [react.dev: Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[mini-app]: A small, complete app that does one job well. (Roman Urdu: chhoti mukammal app)
*[conditional rendering]: Showing different UI based on a condition or state value. (Roman Urdu: shart ke hisaab se alag UI dikhana)
*[lifting state up]: Moving shared state to a common parent so children can use it. (Roman Urdu: state ko parent mein le jaana)
*[controlled input]: An input whose value is held in React state. (Roman Urdu: jis ki value React state mein ho)
