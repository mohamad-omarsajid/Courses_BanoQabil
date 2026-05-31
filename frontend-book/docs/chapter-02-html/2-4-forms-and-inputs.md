---
lesson_id: frontend.ch02.l04
title: "2.4 Forms and inputs"
chapter: 2
order: 4
estimated_minutes: 35
prerequisites:
  - frontend.ch02.l03
---

# 2.4 Forms and inputs

So far your pages only talk to the user. Forms let the page listen back. A form is how a website asks a question and waits for an answer. By the end you will build a real contact form with proper labels.

## What you'll know by the end

- What the `<form>` element is and why you need it.
- How to pair a `<label>` with an input using `for` and `id`.
- The common `<input>` types like text, email, password, and date.
- How checkboxes, radio buttons, dropdowns, and text areas work.
- How to add a submit button and useful attributes like `required`.
- What happens when a user submits the form.

---

## The form element

Every form lives inside a `<form>` tag. The form groups all your fields together. When the user submits, the browser collects everything inside the form.

```html
<form>
  <!-- inputs go here -->
</form>
```

The `<form>` by itself does nothing visible. It is a container. You fill it with fields, and you add a button so the user can send their answers.

---

## Labels and the for attribute

Every input needs a label. A label is the small piece of text that tells the user what to type. You connect a label to an input with two attributes. The label gets a `for` attribute. The input gets a matching `id`.

```html
<label for="fullname">Your name</label>
<input type="text" id="fullname">
```

The value of `for` must match the value of `id` exactly. Here both are `fullname`, so they are linked.

Why does this matter? First, the user can click the label to focus the field. This makes small checkboxes much easier to tap on a phone. Second, a screen reader reads the label out loud when a blind user reaches the field. Without a label, that user hears nothing useful.

!!! tip
    Always pair every input with a label. One label, one input, matching `for` and `id`. If a field has no label, your form is broken for many users even if it looks fine to you.

??? note urdu "اردو میں مزید وضاحت"
    لیبل اور انپٹ کو جوڑنے کے لیے دو چیزیں استعمال ہوتی ہیں۔ لیبل پر `for` لکھتے ہیں اور انپٹ پر `id` لکھتے ہیں۔ ان دونوں کی ویلیو بالکل ایک جیسی ہونی چاہیے۔ جب یہ ایک جیسی ہوں تو دونوں آپس میں جڑ جاتے ہیں۔ اب اگر صارف لیبل پر کلک کرے تو کرسر سیدھا اسی انپٹ میں چلا جاتا ہے۔

---

## The input element and its types

The `<input>` tag is the most common field. Its `type` attribute decides what kind of data it accepts. The same tag becomes many different things just by changing the type.

```html
<input type="text">
<input type="email">
<input type="password">
<input type="number">
<input type="tel">
<input type="date">
<input type="file">
```

Here is what each type does:

- `text` is a plain single line, good for names.
- `email` expects an email address. The browser checks for an `@` sign.
- `password` hides the typed characters with dots.
- `number` only allows numbers and shows tiny up and down arrows.
- `tel` is for phone numbers. On phones it shows a number keypad.
- `date` shows a small calendar picker.
- `file` lets the user pick a file from their device.

Notice that `<input>` has no closing tag. It is a self closing element. You just write it once and move on.

!!! warning
    Never collect a password on a form served over plain HTTP. Use HTTPS, the secure version. Also, `required` and `type="email"` give light checks only. They do not fully protect your data. You will add real validation with JavaScript in Chapter 8.

---

## Checkboxes and radio buttons

A checkbox is a small box the user can turn on or off. It is good for yes or no choices, like agreeing to terms.

```html
<input type="checkbox" id="terms">
<label for="terms">I agree to the terms</label>
```

Radio buttons let the user pick one option from a group. To make them one group, give them the same `name`. The browser then allows only one to be selected at a time.

```html
<input type="radio" id="basic" name="plan">
<label for="basic">Basic plan</label>

<input type="radio" id="pro" name="plan">
<label for="pro">Pro plan</label>
```

Both radios share `name="plan"`. So the user can choose Basic or Pro, but not both. If you forget to match the names, every radio acts alone and the user can select all of them.

---

## Textarea and select

An `<input type="text">` is only one line. For a long message, use `<textarea>` instead. It gives a big box that can hold many lines. Notice it has a real closing tag.

```html
<label for="message">Your message</label>
<textarea id="message" name="message"></textarea>
```

For a dropdown menu, use `<select>` with `<option>` tags inside. Each `<option>` is one choice in the list.

```html
<label for="subject">Subject</label>
<select id="subject" name="subject">
  <option value="support">Support</option>
  <option value="sales">Sales</option>
  <option value="other">Other</option>
</select>
```

The text between the option tags is what the user sees. The `value` is what gets sent when they pick that option.

---

## Useful attributes

A few attributes make your fields smarter. Learn these four.

```html
<label for="city">City</label>
<input type="text" id="city" name="city" placeholder="e.g. Karachi" required>
```

- `name` is the key sent to the server. Every field that holds data needs a name. Think of it as the label on a box.
- `placeholder` is a faint hint inside the field. It disappears the moment the user starts typing. It is not real data.
- `value` is an actual starting value. Unlike a placeholder, it stays and gets sent as real data.
- `required` means the field cannot be empty. The browser blocks submit until the user fills it.

The difference between `placeholder` and `value` trips up many beginners. A placeholder is just a ghost hint. A value is real text already sitting in the field.

```html
<input type="text" placeholder="Type your name">
<input type="text" value="Ali">
```

The first field looks empty with a grey hint. The second field already contains the word Ali, which the user can edit or send.

---

## What happens on submit

You end a form with a submit button. When the user clicks it, the browser collects every field value by its `name`.

```html
<button type="submit">Send message</button>
```

Right now nothing is sent anywhere. We have not connected the form to a server or any code. So for now the form just shows structure and gathers values. In Chapter 8 you will use JavaScript to read those values and do something with them. The form is the skeleton. The behavior comes later.

!!! note "A note on sitr"
    When you collect someone's name, email, or phone, you hold a trust. Collect only what you truly need for the task. Never share it or sell it to others. Guarding people's information is a form of sitr, covering what should stay private.

---

## Project: a complete contact form

Now put it all together. Build a contact form with a name field, an email, a phone, a subject dropdown, a message box, a subscribe checkbox, and a submit button. Every field has its own label.

```html
<form>
  <label for="name">Full name</label>
  <input type="text" id="name" name="name" placeholder="Your full name" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="you@example.com" required>

  <label for="phone">Phone</label>
  <input type="tel" id="phone" name="phone" placeholder="03xx-xxxxxxx">

  <label for="subject">Subject</label>
  <select id="subject" name="subject">
    <option value="general">General question</option>
    <option value="support">Need support</option>
    <option value="feedback">Feedback</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" placeholder="Write your message here" required></textarea>

  <input type="checkbox" id="subscribe" name="subscribe">
  <label for="subscribe">Subscribe to updates</label>

  <button type="submit">Send message</button>
</form>
```

Read it from top to bottom. Each label sits right next to its input, and the `for` matches the `id`. The required fields will block an empty submit. The checkbox label comes after its box, which is the normal pattern for checkboxes. Save this in an HTML file and open it in your browser to see it work.

---

### Try this (10 minutes)

1. Create a file called `contact.html`.
2. Copy the full form example into the `<body>`.
3. Add one more field for `city`, with a matching `<label>`.
4. Open the page in Chrome and try to submit it empty.
5. Fix any label where `for` and `id` do not match.

The goal is not beauty yet. The goal is a form that is clear, labelled, and usable.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What two attributes link a label to its input, and what must be true about their values?
2. What is the difference between `placeholder` and `value`?
3. How do you make two radio buttons part of the same group?
4. When the user clicks submit, where does the data go in our current form?

---

## What's next

Your form works, but the browser does not yet understand the meaning of each part of your page. Next you will learn semantic HTML, tags that describe what content actually is. You will also see how this helps users with screen readers.

[Next lesson: 2.5 Semantic HTML and accessibility &rarr;](2-5-semantic-and-accessibility.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Learn Forms](https://web.dev/learn/forms)
- [MDN: Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[form]: A container that groups input fields so the browser can collect them together. (Roman Urdu: ek dabba jo saare fields ko jama karta hai)
*[input]: A field where the user types or picks a value. (Roman Urdu: jagah jahan user value likhta ya chunta hai)
*[label]: Text that names a field and connects to it for clicks and screen readers. (Roman Urdu: field ka naam batane wali tehreer, jis par click karne se cursor seedha usi field mein chala jata hai)
*[placeholder]: A faint hint inside a field that disappears when the user types. (Roman Urdu: halka ishaara jo likhte hi gaayab ho jata hai)
*[required]: An attribute that stops submit until the field is filled. (Roman Urdu: field bharna zaroori bana deta hai)
*[submit]: The action of sending the form's collected values. (Roman Urdu: form ki values bhejne ka amal)
*[textarea]: A multi line box for long text like messages. (Roman Urdu: lambi tehreer ke liye bara box)
