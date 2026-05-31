---
lesson_id: frontend.ch02.l05
title: "2.5 Semantic HTML and accessibility"
chapter: 2
order: 5
estimated_minutes: 30
prerequisites:
  - frontend.ch02.l04
---

# 2.5 Semantic HTML and accessibility

So far you built pages with text, links, images, and forms. But the browser does not really know what each part means. Is that box a menu or a footer? Right now it cannot tell. In this lesson you learn tags that give your page real meaning.

## What you'll know by the end

- What "semantic HTML" means and why plain `<div>` tags are not enough
- The main landmark tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Why semantics help blind users and search engines
- How to keep a clean heading order with one `<h1>`
- How to write good `alt` text and connect labels to form fields

---

## What "semantic" means

The word "semantic" means "about meaning". A semantic tag tells you what its content is, not just how it looks.

Look at these two tags:

```html
<div>About us</div>
<header>About us</header>
```

Both can look the same on screen. But `<header>` carries meaning. It tells the browser, "this is the top part of the page". A `<div>` says nothing. It is just an empty box with no job.

Semantic HTML means you pick the tag that matches the meaning of your content. You already do this. A `<button>` means "click me". An `<h1>` means "main title". Now you learn tags for whole sections of a page.

---

## The layout landmark tags

These tags describe the big regions of a page. People call them "landmark" tags because they act like signposts.

```html
<header>
  <h1>My Cooking Blog</h1>
</header>

<nav>
  <a href="/">Home</a>
  <a href="/recipes">Recipes</a>
  <a href="/about">About</a>
</nav>

<main>
  <article>
    <h2>How to make chai</h2>
    <p>First, boil the water and milk together.</p>
  </article>

  <aside>
    <h2>Popular this week</h2>
    <p>Biryani, samosa, and karahi.</p>
  </aside>
</main>

<footer>
  <p>Made in Karachi.</p>
</footer>
```

Here is what each one is for:

- `<header>` is the top area. It often holds the site name or logo.
- `<nav>` holds the main navigation links, like a menu.
- `<main>` holds the main content of the page. Use it only once per page.
- `<section>` groups related content under a heading. Think of a chapter.
- `<article>` is a self-contained piece, like one blog post or one news story.
- `<aside>` is side content, like a sidebar or a related list.
- `<footer>` is the bottom area. It often holds copyright or contact info.

You can place a `<header>` and `<footer>` inside an `<article>` too. They then mean the header and footer of that article.

---

## The problem with "div soup"

Before these tags existed, people built whole pages from `<div>` tags only. The result looks like this:

```html
<div class="header">
  <div class="title">My Cooking Blog</div>
</div>
<div class="nav">
  <div><a href="/">Home</a></div>
</div>
<div class="content">
  <div class="post">
    <div class="post-title">How to make chai</div>
  </div>
</div>
<div class="footer">Made in Karachi.</div>
```

We call this "div soup". Every part is a `<div>`. To your eye it can look fine. But to the browser, every box is the same. There is no header, no main content, no footer. There is just a pile of boxes.

Now look at the same page with meaning added:

```html
<header>
  <h1>My Cooking Blog</h1>
</header>
<nav>
  <a href="/">Home</a>
</nav>
<main>
  <article>
    <h2>How to make chai</h2>
  </article>
</main>
<footer>Made in Karachi.</footer>
```

Same page. Same look. But now each part has a name and a job.

<figure markdown>
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-semantic-title" style="max-width:100%;height:auto">
  <title id="svg-semantic-title">Left: a page built only from div tags, all unnamed. Right: the same page using header, nav, main, aside, and footer.</title>
  <text x="180" y="28" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#1f1f1c" text-anchor="middle">Div soup</text>
  <text x="580" y="28" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#1f1f1c" text-anchor="middle">Semantic</text>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="40" y="50" width="280" height="40" rx="6"/>
    <rect x="40" y="100" width="280" height="30" rx="6"/>
    <rect x="40" y="140" width="190" height="150" rx="6"/>
    <rect x="240" y="140" width="80" height="150" rx="6"/>
    <rect x="40" y="300" width="280" height="34" rx="6"/>
    <rect x="440" y="50" width="280" height="40" rx="6"/>
    <rect x="440" y="100" width="280" height="30" rx="6"/>
    <rect x="440" y="140" width="190" height="150" rx="6"/>
    <rect x="640" y="140" width="80" height="150" rx="6"/>
    <rect x="440" y="300" width="280" height="34" rx="6"/>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="180" y="74">&lt;div&gt;</text>
    <text x="180" y="119">&lt;div&gt;</text>
    <text x="135" y="218">&lt;div&gt;</text>
    <text x="280" y="218">&lt;div&gt;</text>
    <text x="180" y="321">&lt;div&gt;</text>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="580" y="74">&lt;header&gt;</text>
    <text x="580" y="119">&lt;nav&gt;</text>
    <text x="535" y="218">&lt;main&gt;</text>
    <text x="680" y="218">&lt;aside&gt;</text>
    <text x="580" y="321">&lt;footer&gt;</text>
  </g>
</svg>
<figcaption>Both pages look the same to the eye. Only the right one tells a screen reader and Google what each part is.</figcaption>
</figure>

The `<div>` is not a bad tag. You still use it for grouping when no semantic tag fits. The problem is using only `<div>` for everything.

---

## Why semantics help

Two big groups benefit from semantic tags.

First, people who cannot see the screen. They use a screen reader. This is software that reads the page out loud. A screen reader can list all the landmarks on a page. The user can then jump straight to the `<main>` content or the `<nav>` menu. With div soup, there are no landmarks to jump to. The user must listen to everything in order.

Second, search engines. When Google reads your page, semantic tags help it understand the structure. It can tell the main content from the sidebar. This helps your page show up in search results. That benefit is called SEO.

!!! note "Did you know"
    Over a billion people live with some kind of disability. Many of them use screen readers, keyboard-only navigation, or other tools to browse the web. When you write semantic HTML, your page works better for all of them.

??? note urdu "اردو میں مزید وضاحت"
    سیمینٹک ٹیگز صرف صفحے کی شکل نہیں بناتے، بلکہ ہر حصے کا مطلب بھی بتاتے ہیں۔ نابینا افراد ایک خاص سافٹ ویئر استعمال کرتے ہیں جسے اسکرین ریڈر کہتے ہیں، جو صفحہ آواز میں پڑھ کر سناتا ہے۔ جب آپ header، nav، اور main جیسے ٹیگز استعمال کرتے ہیں، تو اسکرین ریڈر صارف کو سیدھا اہم حصے تک پہنچا دیتا ہے۔ اگر پورا صفحہ صرف div سے بنا ہو، تو ان کے لیے کوئی نشان باقی نہیں رہتا اور انہیں سب کچھ ترتیب سے سننا پڑتا ہے۔ اسی لیے درست ٹیگ کا انتخاب صرف اچھی عادت نہیں، بلکہ دوسروں کے لیے آسانی بھی ہے۔

---

## Accessibility basics

Accessibility means making your page usable for everyone. Here are three simple rules you can follow today.

### Keep a clean heading order

Use exactly one `<h1>` per page. It is the main title. After that, go in order. An `<h2>` for a section, then `<h3>` inside it, and so on.

```html
<h1>My Cooking Blog</h1>
<h2>Drinks</h2>
<h3>How to make chai</h3>
<h2>Snacks</h2>
```

Do not skip levels. Do not jump from `<h1>` straight to `<h4>` just because it looks smaller. A screen reader user builds a mental map from headings. A broken order confuses that map. You will style the size later with CSS.

### Write meaningful alt text

Every content image needs `alt` text. This is text that describes the image. A screen reader reads it out. Search engines read it too.

```html
<img src="chai.jpg" alt="A cup of hot chai with steam rising">
```

Describe what the image shows. Do not write "image of" or "photo of". The screen reader already says it is an image.

### Connect labels to form fields

You met this in lesson 2.4. Every input needs a label. Connect them with `for` and `id`.

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email">
```

Now a screen reader knows that label belongs to that box. When the user reaches the box, the reader says "Email address". A box with no label is a mystery to them.

---

## A quick word on roles

You may see code with `role="navigation"` or `role="banner"`. A role is a label that tells assistive tools what an element is.

The good news is that semantic tags already carry roles. A `<nav>` has the navigation role built in. A `<main>` has the main role. So when you use the right tag, you almost never need to write `role="..."` yourself. Pick the correct tag and the role comes free.

!!! tip
    Test your page without a mouse. Press the Tab key over and over. The focus should move through links and form fields in a sensible order. You can also run Lighthouse in DevTools, which you opened back in lesson 1.4. It gives your page an accessibility score and lists problems to fix.

---

### Try this

Take the contact-form page you built in lesson 2.4 and wrap it in semantic
landmarks. Put the site name in a `<header>`, a few links in a `<nav>`, the
form inside `<main>`, and a line of contact info in a `<footer>`. Then open the
page, press the Tab key over and over, and check that focus moves through the
links and fields in a sensible order. You just turned a plain page into one a
screen reader can navigate.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does the word "semantic" mean, and why is `<header>` better than `<div>` for the top of a page?
2. Name three landmark tags and say what each one is for.
3. Why is a page made only of `<div>` tags a problem for a blind user?
4. How many `<h1>` tags should one page have, and why should you not skip from `<h1>` to `<h4>`?

---

## Assignment

!!! bq-assignment "Assignment: Build a small documentation page"
    You have learned semantic tags, headings, lists, links, and nav. Now put them together into one page that looks like a simple documentation site, the kind of page you are reading right now.

    The goal is to practice choosing the right tag for each part. There is no CSS yet. A plain, well-structured HTML file is the whole point.

    **What you build**

    - A `<header>` at the top with the name of your imaginary project or topic as an `<h1>`
    - A `<nav>` that holds an unordered list of at least four anchor links, each pointing to a section lower on the same page (use `href="#section-id"`)
    - A `<main>` area with at least three `<section>` blocks, each with its own `<h2>` heading and a short paragraph or list of content
    - One `<aside>` inside `<main>` that holds a short "related links" or "quick tips" list
    - A `<footer>` with your name and a made-up copyright line

    **Before you start:** open the page you are reading now in a browser and look at its structure. What is the header? What is the nav? Try pressing Tab and see where focus goes. That page is your reference.

    **Done when**

    - [ ] The page has exactly one `<h1>`.
    - [ ] The `<nav>` links jump to the correct sections when you click them.
    - [ ] Each `<section>` has an `id` attribute that matches the link in the nav.
    - [ ] The heading order never skips a level (no going from `<h2>` straight to `<h4>`).
    - [ ] The file passes the W3C HTML validator at validator.w3.org with no errors.
    - [ ] You can Tab through all the links without touching the mouse.

    **Stretch goal:** Add a second `<nav>` inside the `<footer>` with three links to imaginary related pages, and give each `<section>` its own short `<header>` containing the `<h2>` plus a one-line description paragraph.

---

## What's next

That is the end of Chapter 2. You now know how to build the full structure of a page with meaning, from the document setup to text, images, forms, and semantic landmarks. But right now your pages still look plain. The next chapter is CSS, the language that controls color, spacing, fonts, and layout. CSS is where your pages start to look good.

[Next chapter: 3. CSS foundations &rarr;](../chapter-03-css/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [MDN: HTML element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [web.dev: Learn Accessibility, HTML](https://web.dev/learn/accessibility/html)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[semantic HTML]: HTML where each tag describes the meaning of its content, not just its look. (Roman Urdu: aise tags jo content ka matlab batayen)
*[div]: A plain box tag with no meaning, used for grouping when no semantic tag fits. (Roman Urdu: bina matlab wala dabba tag)
*[landmark]: A semantic tag that marks a major region of a page, like a signpost. (Roman Urdu: safhe ke bare hisse ka nishan)
*[screen reader]: Software that reads a web page out loud for blind users. (Roman Urdu: software jo safha awaz mein parh kar sunata hai)
*[SEO]: Search engine optimization, making a page easier for Google to understand and rank. (Roman Urdu: safhe ko Google ke liye behtar banana)
*[accessibility]: Making a page usable for everyone, including people with disabilities. (Roman Urdu: safhe ko sab ke liye qabil-e-istemal banana)
*[heading hierarchy]: A clean order of headings, with one h1, then h2, then h3, and so on. (Roman Urdu: headings ki sahi tarteeb)
