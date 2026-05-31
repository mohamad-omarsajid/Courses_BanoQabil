---
lesson_id: frontend.ch08.l03
title: "8.3 The DOM"
chapter: 8
order: 3
estimated_minutes: 45
prerequisites:
  - frontend.ch08.l02
---

# 8.3 The DOM

So far your JavaScript has lived in the console. It never touched the page. That changes now. In this lesson you learn how JavaScript reads and changes your HTML while it runs. This is where buttons start to do real things.

## What you'll know by the end

- You can explain what the DOM is in plain words.
- You can select elements with `getElementById`, `querySelector`, and `querySelectorAll`.
- You can read and change text with `textContent`, and you know why `innerHTML` is risky.
- You can add, remove, and toggle classes with `classList`.
- You can create new elements and remove old ones.
- You can build a small todo list with add and delete, using no library.

---

## What the DOM is

DOM stands for Document Object Model (Roman Urdu: document ka ek live structure jo browser banata hai). When the browser loads your HTML, it does not keep it as plain text. It turns your HTML into a tree of objects. Each tag becomes a node in that tree. JavaScript can read this tree and change it.

This tree is live. When you change a node, the page changes too. Add a node and a new thing appears. Remove a node and it disappears. So the DOM is the bridge between your code and what the user sees.

Picture your HTML as a family tree. The `document` sits at the top. Inside it sits `<html>`. Inside that sit `<head>` and `<body>`. Each tag holds its children below it.

<figure markdown>
<svg viewBox="0 0 800 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-dom-title" style="max-width:100%;height:auto">
  <title id="svg-dom-title">The DOM as a tree: document holds html, which holds head and body. head holds title; body holds an h1 and a ul, and the ul holds two li items.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="330" y="20" width="140" height="44" rx="8"/>
    <rect x="340" y="110" width="120" height="44" rx="8"/>
    <rect x="120" y="200" width="120" height="44" rx="8"/>
    <rect x="500" y="200" width="160" height="44" rx="8"/>
    <rect x="120" y="290" width="120" height="44" rx="8"/>
    <rect x="380" y="290" width="100" height="44" rx="8"/>
    <rect x="560" y="290" width="100" height="44" rx="8"/>
    <rect x="500" y="390" width="100" height="44" rx="8"/>
    <rect x="640" y="390" width="100" height="44" rx="8"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="15" text-anchor="middle">
    <text x="400" y="47">document</text>
  </g>
  <g fill="#1f1f1c" font-family="JetBrains Mono, monospace" font-size="14" text-anchor="middle">
    <text x="400" y="137">&lt;html&gt;</text>
    <text x="180" y="227">&lt;head&gt;</text>
    <text x="580" y="227">&lt;body&gt;</text>
    <text x="180" y="317">&lt;title&gt;</text>
    <text x="430" y="317">&lt;h1&gt;</text>
    <text x="610" y="317">&lt;ul&gt;</text>
    <text x="550" y="417">&lt;li&gt;</text>
    <text x="690" y="417">&lt;li&gt;</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="400" y1="64" x2="400" y2="110"/>
    <line x1="400" y1="154" x2="180" y2="200"/>
    <line x1="400" y1="154" x2="580" y2="200"/>
    <line x1="180" y1="244" x2="180" y2="290"/>
    <line x1="580" y1="244" x2="430" y2="290"/>
    <line x1="580" y1="244" x2="610" y2="290"/>
    <line x1="610" y1="334" x2="550" y2="390"/>
    <line x1="610" y1="334" x2="690" y2="390"/>
  </g>
</svg>
<figcaption>The browser turns your HTML into this live tree of nodes. JavaScript reads and changes the tree, and the page updates.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    جب براؤزر آپ کا HTML پڑھتا ہے، تو وہ اسے ایک درخت کی شکل میں بدل دیتا ہے۔ اس درخت کو DOM کہتے ہیں۔ ہر ٹیگ اس درخت میں ایک نوڈ بن جاتا ہے۔ جاوا اسکرپٹ اس درخت کو پڑھ بھی سکتا ہے اور بدل بھی سکتا ہے۔ جب آپ درخت کو بدلتے ہیں، تو صفحہ بھی فوراً بدل جاتا ہے۔ querySelector ایک CSS selector لیتا ہے اور آپ کو پہلا ملنے والا عنصر دیتا ہے، جیسے آپ کسی درخت پر انگلی رکھیں۔

---

## Selecting elements

Before you change a node, you must grab it. JavaScript gives you a few ways to find nodes in the tree.

```js
// Grab one element by its id.
const title = document.getElementById("main-title");

// Grab the first element that matches a CSS selector.
const firstBtn = document.querySelector(".btn");

// Grab every element that matches. This returns a NodeList.
const allItems = document.querySelectorAll("li");
```

`getElementById` takes a plain id string with no `#`. It returns one element. `querySelector` takes any CSS selector, like `.btn`, `#main-title`, or `ul li`. It returns the first match only.

`querySelectorAll` returns a NodeList of all matches. A NodeList is like an array. You can loop over it with `forEach`.

```js
// Loop over every matched element.
allItems.forEach((item) => {
  console.log(item.textContent);
});
```

The picture below shows `querySelector` reaching into the tree and picking one node.

<figure markdown>
<svg viewBox="0 0 740 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-qs-title" style="max-width:100%;height:auto">
  <title id="svg-qs-title">querySelector(".card") travels into the DOM tree and highlights the first element that has the class card, returning it to your variable.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="310" y="20" width="120" height="40" rx="8"/>
    <rect x="140" y="110" width="120" height="40" rx="8"/>
    <rect x="480" y="110" width="120" height="40" rx="8"/>
    <rect x="60" y="200" width="120" height="40" rx="8"/>
    <rect x="240" y="200" width="120" height="40" rx="8"/>
    <rect x="400" y="200" width="140" height="40" rx="8"/>
    <rect x="580" y="200" width="120" height="40" rx="8"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="2.5">
    <rect x="400" y="200" width="140" height="40" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" text-anchor="middle" fill="#1f1f1c">
    <text x="370" y="45">document</text>
    <text x="200" y="135">&lt;body&gt;</text>
    <text x="540" y="135">&lt;head&gt;</text>
    <text x="120" y="225">&lt;h1&gt;</text>
    <text x="300" y="225">&lt;div&gt;</text>
    <text x="470" y="225">.card (match!)</text>
    <text x="640" y="225">&lt;footer&gt;</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="370" y1="60" x2="200" y2="110"/>
    <line x1="370" y1="60" x2="540" y2="110"/>
    <line x1="200" y1="150" x2="120" y2="200"/>
    <line x1="200" y1="150" x2="300" y2="200"/>
    <line x1="200" y1="150" x2="470" y2="200"/>
    <line x1="200" y1="150" x2="640" y2="200"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="20" y="310">querySelector(".card")</text>
    <text x="20" y="330">scans the tree and returns</text>
    <text x="20" y="350">the first .card it finds.</text>
  </g>
  <defs>
    <marker id="bq-qs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="5 3" marker-end="url(#bq-qs-arrow)">
    <path d="M200 310 Q 340 270 400 240"/>
  </g>
</svg>
<figcaption>querySelector scans the live tree from top to bottom and hands back the first element that matches your CSS selector.</figcaption>
</figure>

!!! tip
    Give your elements a clear `id` or `class` in the HTML. Then you can select them in one short line. Selecting is much harder when elements have no name.

---

## DOM methods reference table

| Method or property | What it does | Example |
| --- | --- | --- |
| `getElementById(id)` | returns one element by exact id | `document.getElementById("main")` |
| `querySelector(sel)` | returns first element matching CSS selector | `document.querySelector(".card")` |
| `querySelectorAll(sel)` | returns NodeList of all matching elements | `document.querySelectorAll("li")` |
| `textContent` | reads or sets the plain text inside an element | `el.textContent = "Hello"` |
| `innerHTML` | reads or sets the HTML inside an element (risky with user input) | `el.innerHTML = "<b>Hi</b>"` |
| `classList.add(c)` | adds a CSS class | `el.classList.add("active")` |
| `classList.remove(c)` | removes a CSS class | `el.classList.remove("hidden")` |
| `classList.toggle(c)` | adds the class if missing, removes it if present | `el.classList.toggle("open")` |
| `classList.contains(c)` | returns true if the class is on the element | `el.classList.contains("active")` |
| `createElement(tag)` | creates a new element in memory | `document.createElement("li")` |
| `appendChild(child)` | attaches a child to the end of a parent | `list.appendChild(li)` |
| `append(child)` | modern version of appendChild, also accepts strings | `list.append(li)` |
| `remove()` | removes the element from the page | `li.remove()` |
| `style.prop` | sets an inline style (camelCase) | `el.style.color = "teal"` |

---

## Reading and changing content

Once you hold an element, you can read or change its text.

```js
const heading = document.querySelector("h1");

// Read the current text.
console.log(heading.textContent);

// Change the text. The page updates at once.
heading.textContent = "Welcome to my page";
```

`textContent` is plain text. It is safe. If a user types `<b>hi</b>`, it shows those characters as text. It does not become bold. This is what you want for any text that came from a user.

`innerHTML` is different. It parses your string as HTML. So tags inside it become real elements.

```js
const box = document.querySelector(".box");

// This creates a real bold element inside the box.
box.innerHTML = "<b>Hello</b>";
```

There is also `innerText`. It gives the visible text only. It skips text hidden by CSS. For most beginner work, `textContent` is the one to reach for.

!!! warning
    Never set `innerHTML` from text a user typed. A user could type a `<script>` tag or other markup. `innerHTML` would run it inside your page. This is a real attack. For any user text, use `textContent` instead. It is always safe.

---

## Changing classes

You usually style elements with CSS classes. JavaScript can add and remove those classes while the page runs. This lets you turn styles on and off.

```js
const card = document.querySelector(".card");

card.classList.add("active");     // add a class
card.classList.remove("hidden");  // remove a class
card.classList.toggle("open");    // add it if missing, remove it if there

// Check if a class is present. Returns true or false.
if (card.classList.contains("active")) {
  console.log("The card is active");
}
```

`toggle` is handy for things like a menu. Click once to open, click again to close. You write the styles in your CSS file, then flip them on with `classList`.

---

## Changing inline style

You can also set style directly on an element.

```js
const note = document.querySelector(".note");

note.style.color = "teal";
note.style.fontSize = "20px";
```

Note that CSS names with a dash become camelCase here. So `font-size` turns into `fontSize`. This works, but classes are usually better. A class keeps your style in the CSS file where it belongs. Inline style spreads design rules across your JavaScript, and that gets messy fast.

---

## Creating and removing elements

You can build new nodes in code and add them to the tree. You can also remove nodes.

```js
// Create a new element. It is not on the page yet.
const li = document.createElement("li");

// Set its text.
li.textContent = "A new list item";

// Find the parent and add the child inside it.
const list = document.querySelector("ul");
list.appendChild(li);

// Later, remove an element from the page.
li.remove();
```

`createElement` builds a node in memory. It does nothing visible until you attach it. `appendChild` puts the child at the end of a parent. `remove` takes the element off the page. With these three, you can build and clear whole sections.

---

## Real example: a todo list

Now you have every piece you need. Let us build a small todo list. The user types a task, clicks Add, and the task appears with a Delete button. Click Delete and the task goes away. No library, just the DOM.

Here is the HTML.

```html
<input id="task-input" type="text" placeholder="Write a task" />
<button id="add-btn">Add</button>

<ul id="task-list"></ul>
```

You have an input, an Add button, and an empty `<ul>`. The list starts empty. Your JavaScript will fill it.

Here is the JavaScript.

```js
// Grab the three elements we need.
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");

// Run this function when the Add button is clicked.
addBtn.addEventListener("click", () => {
  // Read what the user typed. trim() removes extra spaces.
  const text = input.value.trim();

  // If the box is empty, do nothing.
  if (text === "") {
    return;
  }

  // Create the list item.
  const li = document.createElement("li");

  // Use textContent for user text. It is safe.
  li.textContent = text;

  // Create the small Delete button.
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  // When Delete is clicked, remove this whole li.
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  // Put the Delete button inside the li.
  li.appendChild(delBtn);

  // Put the li inside the list on the page.
  list.appendChild(li);

  // Clear the input so the user can type the next task.
  input.value = "";
});
```

Read it slowly. You select your three elements once. On each Add click you read the input, skip empty text, and build an `<li>`. You set its text with `textContent`, so user input stays safe. You build a Delete button and give it its own click job. You attach the button to the `<li>`, attach the `<li>` to the list, then clear the input.

You used `addEventListener` here without a full explanation. That is the topic of the next lesson, so do not worry. Just know it runs your function when the click happens.

!!! note "A note on husn al-khuluq"
    A clear, easy page is a kindness to the person using it. Readable text, working
    buttons, and honest labels show husn al-khuluq, good character, toward your
    users. You may never meet them, but your care reaches them through the screen.

### Try this

Make a tiny HTML file with one `<h1 id="title">Hello</h1>` and a linked script. In the script, select the heading with `getElementById("title")` and change its `textContent` to your own name. Open the file in the browser and watch the heading change. Just this one step, no buttons yet.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does the DOM let your JavaScript do to the page?
2. What is the difference between `querySelector` and `querySelectorAll`?
3. Why should you never set `innerHTML` from text a user typed?
4. Which two steps turn a brand new element into something the user can see?

---

## What's next

You can now find, change, and build elements. But your todo list only worked because of one mystery line, `addEventListener`. The next lesson covers events and forms in full. You will learn how clicks, typing, and form submits trigger your code.

[Next lesson: 7.4 Events and forms &rarr;](8-4-events-and-forms.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [javascript.info: Document](https://javascript.info/document)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[DOM]: The Document Object Model. The browser's live tree of objects made from your HTML. (Roman Urdu: HTML ka live tree jise JavaScript parh aur badal sakta hai)
*[node]: One item in the DOM tree, usually made from one HTML tag. (Roman Urdu: DOM tree ka aik hissa, aam tor par aik tag)
*[querySelector]: A method that returns the first element matching a CSS selector. (Roman Urdu: CSS selector se page par pehla matching element dhoond kar wapas deta hai.)
*[textContent]: The plain text inside an element. Safe for user input. (Roman Urdu: element ke andar ka saada text, user input ke liye mehfooz)
*[innerHTML]: The HTML inside an element. It parses tags, so it is risky with user input. (Roman Urdu: element ke andar ka HTML, user input ke saath khatarnak)
*[classList]: An object on an element used to add, remove, toggle, and check CSS classes. (Roman Urdu: classes add, remove aur toggle karne ke liye)
*[createElement]: A method that builds a new element in memory before you attach it. (Roman Urdu: naya element banata hai jise baad mein page par lagaya jata hai)
