---
lesson_id: frontend.ch02.l01
title: "2.1 HTML, CSS, and JavaScript"
chapter: 2
order: 1
estimated_minutes: 25
prerequisites:
  - frontend.ch01.l04
---

# 2.1 HTML, CSS, and JavaScript

Every website you have ever used, from Daraz to Google, is built from just three
languages. Before you write any code, it helps to know what those three are, why
the browser loves them, and where everything else you have heard of fits in.

## What you'll know by the end

- The three languages of the web, and what each one does
- Why the browser only really speaks these three
- Where other languages and big frameworks fit in
- What a tag is, and why we mark up text instead of typing it plainly

---

## The three languages of the web

A web page is built in three layers, and each layer has its own language.

<figure markdown>
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-three-langs" style="max-width:100%;height:auto">
  <title id="svg-three-langs">Three panels showing the three web languages: HTML is structure, like the walls of a house; CSS is style, like the paint; JavaScript is behaviour, like the switches that make things work.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="30" width="220" height="140" rx="10"/>
    <rect x="270" y="30" width="220" height="140" rx="10"/>
    <rect x="520" y="30" width="220" height="140" rx="10"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <text x="130" y="78" font-size="19" font-weight="700" fill="#1f1f1c">HTML</text>
    <text x="130" y="106" font-size="13" fill="#1f1f1c">Structure</text>
    <text x="130" y="132" font-size="12" fill="#6b6b65">the walls and rooms</text>
    <text x="380" y="78" font-size="19" font-weight="700" fill="#1f1f1c">CSS</text>
    <text x="380" y="106" font-size="13" fill="#1f1f1c">Style</text>
    <text x="380" y="132" font-size="12" fill="#6b6b65">the paint and decoration</text>
    <text x="630" y="78" font-size="19" font-weight="700" fill="#1f1f1c">JavaScript</text>
    <text x="630" y="106" font-size="13" fill="#1f1f1c">Behaviour</text>
    <text x="630" y="132" font-size="12" fill="#6b6b65">the switches that do things</text>
  </g>
</svg>
<figcaption>Think of a house. HTML builds the walls and rooms, CSS paints and decorates them, and JavaScript adds the switches and doors that actually do something.</figcaption>
</figure>

- **HTML** (Roman Urdu: page ki structure aur content) gives the page its structure and content: headings, paragraphs, images, buttons. This whole chapter is about HTML.
- **CSS** (Roman Urdu: page ki shakl aur rang) sets the look: colours, fonts, spacing, and layout. That is Chapter 3.
- **JavaScript** (Roman Urdu: page ka amal aur harkat) adds behaviour: things that happen when you click, type, or scroll. That starts in Chapter 7.

| Language | Its job | Without it you get |
| --- | --- | --- |
| HTML | structure and content | nothing, a blank page |
| CSS | colours, fonts, layout | plain black text on white |
| JavaScript | behaviour and interaction | a page that cannot react |

---

## Why only these three?

A browser like Chrome is built to understand exactly these three languages and
nothing else. They are the native tongue of the web. Whatever you build, however
you build it, it has to reach the browser as HTML, CSS, and JavaScript. That is
why they are the foundation of everything here.

??? note urdu "اردو میں مزید وضاحت"
    ویب کی تین زبانیں ہیں: HTML صفحے کی ساخت بناتی ہے، CSS اسے خوبصورت بناتی ہے، اور
    JavaScript اسے حرکت اور عمل دیتی ہے۔ براؤزر صرف انہی تین زبانوں کو سمجھتا ہے۔ آپ
    چاہے کوئی بھی ٹول استعمال کریں، آخر میں سب کچھ انہی تین میں بدل کر براؤزر تک
    پہنچتا ہے۔

---

## Then what are Python, Java, and the rest?

You may have heard of Python, Java, or C++. These are real and powerful, but they
are for different jobs. Languages split roughly by where they run.

| Language | Mainly used for |
| --- | --- |
| HTML, CSS, JavaScript | the frontend, inside the browser |
| Python | servers, data, AI, and scripts |
| Java, C# | large apps, Android, business systems |
| C, C++ | operating systems, games, hardware |
| PHP | the backend of many older websites |

So if you want to build a Windows program or train an AI model, you reach for a
different language. To build the part of a website a person sees and clicks, you
reach for HTML, CSS, and JavaScript.

---

## What about React, Django, and frameworks?

Soon you will hear names like React, Vue, Next.js, Django, and Laravel. These are
**frameworks** and **libraries**: ready-made toolkits that make building faster.
But here is the part that surprises people.

<figure markdown>
<svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-frameworks" style="max-width:100%;height:auto">
  <title id="svg-frameworks">Frameworks like React and Django all end up producing HTML, CSS, and JavaScript, which is then sent to the browser.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="55" width="230" height="80" rx="10"/>
    <rect x="300" y="55" width="200" height="80" rx="10"/>
    <rect x="550" y="55" width="190" height="80" rx="10"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <text x="135" y="90" font-size="15" font-weight="600" fill="#1f1f1c">Frameworks</text>
    <text x="135" y="112" font-size="12" fill="#6b6b65">React, Vue, Django, more</text>
    <text x="400" y="90" font-size="15" font-weight="600" fill="#1f1f1c">HTML + CSS + JS</text>
    <text x="400" y="112" font-size="12" fill="#6b6b65">what the browser reads</text>
    <text x="645" y="90" font-size="15" font-weight="600" fill="#1f1f1c">The browser</text>
    <text x="645" y="112" font-size="12" fill="#6b6b65">draws the page</text>
  </g>
  <defs>
    <marker id="bq-arrow-fw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-fw)">
    <line x1="250" y1="95" x2="298" y2="95"/>
    <line x1="500" y1="95" x2="548" y2="95"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
    <text x="274" y="86">become</text>
    <text x="524" y="86">sent to</text>
  </g>
</svg>
<figcaption>No matter which framework you use, it all turns into HTML, CSS, and JavaScript before it reaches the browser. The browser speaks nothing else.</figcaption>
</figure>

The browser still only understands HTML, CSS, and JavaScript. So every framework,
in the end, produces those three for the browser. React is written in JavaScript
and generates HTML. Django runs on the server and sends HTML, CSS, and JS back to
the browser. The toolkit changes; the destination never does.

That is why learning HTML, CSS, and JavaScript is never wasted. It is the ground
under every framework you will ever touch. Start strong here, and the rest gets
easier.

---

## What is a tag, and why do we need it?

The browser cannot read your mind. If you simply type:

```text
Welcome to my site
```

the browser shows grey text and has no idea what it is. Is it a big title? A
button? A paragraph? It cannot tell. So you wrap the text in a **tag**, a small
label in angle brackets that says what the text is:

```html
<h1>Welcome to my site</h1>
```

Now the browser knows this is `h1`, the main heading, and shows it big and bold.
That is the whole idea of HTML: plain text carries no meaning, and tags give it
meaning.

Why can we not just type normally? Because the structure that tags add is what
lets the browser show the right style, lets CSS decorate it, lets JavaScript find
and change it, and lets Google and screen readers understand your page. Without
tags, a page is just a flat wall of text.

### Try this

Open any website in Chrome, right-click something, and choose **Inspect** (the
trick from lesson 1.4). In the Elements panel you will see that every single piece
of the page is wrapped in tags. Find one `<h1>` and one `<p>`. That tree of tags
is exactly the HTML you are about to learn to write yourself.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you
can't, scroll back up. That's exactly what this section is for.

1. What does each of the three web languages do?
2. Why does the browser only need HTML, CSS, and JavaScript?
3. React and Django are very different, but what do both eventually send to the browser?
4. Why do we wrap text in tags instead of typing it plainly?

---

## What's next

Now you have the big picture. Next you open VS Code and write your very first HTML
page, first by hand so you understand every line, then with a shortcut that writes
the skeleton for you.

[Next lesson: 2.2 Your first HTML page &rarr;](2-2-your-first-html-page.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- MDN: [What is HTML?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content) a gentle first look.
- web.dev: [Learn HTML, overview](https://web.dev/learn/html/overview) the bigger map of the language.

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[HTML]: HyperText Markup Language, the language that gives a web page its structure and content. (Roman Urdu: web page ki structure banane wali zaban)
*[CSS]: Cascading Style Sheets, the language that styles a page: colours, fonts, and layout. (Roman Urdu: page ko khoobsurat banane wali zaban)
*[JavaScript]: The language that adds behaviour to a page, like reacting to clicks and typing. (Roman Urdu: page ko harkat aur amal dene wali zaban)
*[framework]: A ready-made toolkit that makes building software faster, like React or Django. (Roman Urdu: banaane ko aasan karne wala tayar-shuda toolkit)
*[frontend]: The part of a website that runs in the browser and that users see and click. (Roman Urdu: website ka woh hissa jo browser mein nazar aata hai)
*[backend]: The part that runs on a server, handling data and logic the user never sees. (Roman Urdu: server par chalne wala hissa jo user ko nazar nahi aata)
*[tag]: A label in angle brackets that tells the browser what a piece of content is. (Roman Urdu: angle brackets mein likha label jo content ka matlab batata hai)
