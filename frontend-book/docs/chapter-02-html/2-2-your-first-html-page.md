---
lesson_id: frontend.ch02.l02
title: "2.2 Your first HTML page"
chapter: 2
order: 2
estimated_minutes: 35
prerequisites:
  - frontend.ch02.l01
---

# 2.2 Your first HTML page

Now you build a real page. First you will set up VS Code the right way, then write
the page skeleton by hand so you understand every line, then learn the shortcut
that writes it for you in one keystroke.

## What you'll know by the end

- How to open a project folder in VS Code, and why a folder
- How to create files, and what `index.html` is
- The VS Code integrated terminal, and how it differs from a normal one
- The three parts of a tag, and what an attribute is
- How to write the HTML boilerplate by hand, then with the emmet `!` shortcut
- What boilerplate is, and why nearly every language has some

---

## Start in a folder, not a file

Open VS Code, then choose **File > Open Folder** and pick (or make) a folder for
your work, like `banoqabil/chapter-2`.

Why a folder and not just a file? Because a website is never one file. It is HTML,
CSS, JavaScript, and images, all living together. VS Code is built to work on a
whole **folder**, which it calls your project. With the folder open it can see
every file at once, search across all of them, and run tools for you. Open a lone
file and you lose all of that.

!!! tip "Trust the folder"
    Always open the folder, then create files inside it. This one habit prevents a
    surprising number of beginner headaches later.

---

## Create your first file

In the Explorer on the left, hover your folder name and click the **New File**
icon. Name the file `index.html`. Later you will add `style.css` and `script.js`
next to it, and they will all be part of the same project.

### Why the name `index.html`?

`index.html` is the default home page name on the web. When a browser opens a
folder or a website address, it looks for `index.html` first and shows it without
being told. It is the front door of your site. So your main page is almost always
named `index.html`, and other pages get names like `about.html` or `contact.html`.

---

## The integrated terminal in VS Code

You met the terminal in lesson 1.3. VS Code has one built right in. Open it with
**View > Terminal**, or the shortcut `` Ctrl + ` ``.

It runs the very same shell as your normal terminal (on Windows it can run
PowerShell or your WSL bash). The difference is small but genuinely useful:

- The integrated terminal opens **already inside your project folder**, so you are in the right place from the start.
- It sits **right under your code**, so you do not switch windows to run a command and read its output.
- When an error prints a file path, you can **click it** and VS Code jumps to that file and line.

A normal terminal is a separate app that starts in some default folder. The
integrated one is the same tool, just living inside your editor and tied to your
project. Same commands, far less switching back and forth.

---

## The anatomy of a tag

Most tags come in pairs: an opening tag, your content, then a closing tag. The
closing tag has a slash before its name.

```html
<p>Hello</p>
```

- `<p>` is the opening tag. It starts a paragraph.
- `Hello` is the content. This is what the user reads.
- `</p>` is the closing tag. The slash means "this paragraph ends here."

An opening tag, its content, and its closing tag together make one **element**.

Sometimes a tag needs extra information. You add it with an **attribute** inside
the opening tag, in the form `name="value"`.

```html
<html lang="en">
```

Here `lang` is the attribute name and `"en"` is its value, telling the browser the
page is in English.

---

## Write the skeleton by hand

Type this into `index.html` yourself, line by line. Typing it once by hand is how
you learn what each line is for.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

Read it line by line:

- `<!DOCTYPE html>` tells the browser this is a modern HTML page.
- `<html lang="en">` is the root tag. Everything else goes inside it.
- `<head>` holds information about the page, not shown on screen.
- `<meta charset="UTF-8">` sets the text encoding, so every letter and symbol shows correctly.
- `<meta name="viewport" ...>` makes the page fit nicely on phones.
- `<title>` is the page name shown on the browser tab.
- `<body>` holds the content users actually see.
- `<h1>` and `<p>` are the heading and paragraph inside the body.

---

## The faster way: emmet and the `!`

Typing that whole skeleton every time would be slow. VS Code ships with **Emmet**,
a shortcut system that expands short abbreviations into full code.

Try it. In an empty `.html` file, type a single exclamation mark and press `Tab`:

```text
!
```

Emmet instantly writes the entire skeleton above for you. One character, a full
starting page. You will meet more Emmet shortcuts in a later lesson, where one
short line expands into many tags.

!!! tip "Hand first, shortcut after"
    Write the skeleton by hand at least once so you understand it. After that, use
    `!` every time. Understanding first, speed second.

---

## What is boilerplate?

That skeleton is called **boilerplate**: the standard starting code that is almost
the same in every file of its kind. Every HTML page needs this same opening
structure, so it is boilerplate.

Does every language have boilerplate? Most do. A Python script, a React app, a C
program: each has a small, standard block you write to begin. We write it (or let
a tool like Emmet generate it) because the language and the browser expect that
structure before anything else will work properly. The boilerplate sets up
encoding, mobile scaling, and the title, so everything you add afterwards behaves.

---

## Headings, paragraphs, and comments

HTML gives you six heading levels, `<h1>` down to `<h6>`. Use one `<h1>` per page
as the main title, like the name of a book. The smaller ones break content into
sections. The `<p>` tag holds normal blocks of text.

```html
<h1>This is the main title</h1>
<h2>This is a section title</h2>
<p>This is normal paragraph text.</p>
```

A **comment** is a note for you, not the user. The browser ignores it. You write
one between `<!--` and `-->`.

```html
<!-- This is a comment. The browser will not show it. -->
<p>This paragraph is visible.</p>
```

??? note urdu "اردو میں مزید وضاحت"
    HTML کا ہر صفحہ ایک ہی جیسے ڈھانچے سے شروع ہوتا ہے جسے boilerplate کہتے ہیں۔
    اسے ایک بار خود ہاتھ سے لکھیں تاکہ سمجھ آ جائے، پھر VS Code میں صرف `!` لکھ کر
    Tab دبائیں اور Emmet پورا ڈھانچہ خود لکھ دے گا۔ صفحہ دو حصوں میں ہوتا ہے: head
    معلومات کے لیے، اور body اس مواد کے لیے جو صارف دیکھتا ہے۔

---

## How the browser reads your HTML

The browser reads your file top to bottom and builds a tree of elements. The
`<html>` element sits at the top. Inside it sit `<head>` and `<body>`, and inside
those sit more elements.

<figure markdown>
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-tree-title" style="max-width:100%;height:auto">
  <title id="svg-tree-title">An HTML document as a tree: html contains head and body; head contains title; body contains an h1 and a p.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="320" y="20" width="120" height="44" rx="8"/>
    <rect x="180" y="120" width="120" height="44" rx="8"/>
    <rect x="460" y="120" width="120" height="44" rx="8"/>
    <rect x="180" y="230" width="120" height="44" rx="8"/>
    <rect x="400" y="230" width="120" height="44" rx="8"/>
    <rect x="540" y="230" width="120" height="44" rx="8"/>
  </g>
  <g fill="#1f1f1c" font-family="JetBrains Mono, monospace" font-size="15" text-anchor="middle">
    <text x="380" y="47">&lt;html&gt;</text>
    <text x="240" y="147">&lt;head&gt;</text>
    <text x="520" y="147">&lt;body&gt;</text>
    <text x="240" y="257">&lt;title&gt;</text>
    <text x="460" y="257">&lt;h1&gt;</text>
    <text x="600" y="257">&lt;p&gt;</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="380" y1="64" x2="240" y2="120"/>
    <line x1="380" y1="64" x2="520" y2="120"/>
    <line x1="240" y1="164" x2="240" y2="230"/>
    <line x1="520" y1="164" x2="460" y2="230"/>
    <line x1="520" y1="164" x2="600" y2="230"/>
  </g>
</svg>
<figcaption>The browser turns your HTML into a tree. The html element holds head and body, and each of those holds more elements.</figcaption>
</figure>

---

## Try this

1. In VS Code, open your `chapter-2` folder with **File > Open Folder**.
2. Create a new file named `index.html`.
3. In the empty file, type `!` and press `Tab` to drop in the skeleton.
4. Change the `<title>` to `My first page` and the `<h1>` to your own name, like `Hello, I am Ayesha`.
5. Save with `Ctrl + S`. Then right-click the file and open it in your browser, or use the Live Server extension and click "Go Live".

You should see your heading in the browser. Change the `<h1>`, save, and refresh:
only the part you changed moves. That is the loop you will repeat thousands of
times.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you
can't, scroll back up. That's exactly what this section is for.

1. Why do you open a folder in VS Code instead of a single file?
2. Why is the main page usually named `index.html`?
3. What does typing `!` and pressing `Tab` do in an HTML file?
4. What is boilerplate, and why do we write it?
5. What is the difference between the `<head>` and the `<body>`?

---

## What's next

You can build a basic page and you understand its skeleton. Next you fill it with
real content: formatted text, lists, links to other pages, and images.

[Next lesson: 2.3 Text, lists, links, and images &rarr;](2-3-text-lists-links-images.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- web.dev: [Learn HTML, overview](https://web.dev/learn/html/overview)
- MDN: [HTML basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)
- Emmet: [Emmet cheat sheet](https://docs.emmet.io/cheat-sheet/) every abbreviation, for later.

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[element]: An opening tag, its content, and its closing tag taken together. (Roman Urdu: opening tag, content aur closing tag mila kar ek element)
*[attribute]: Extra information inside an opening tag, written as name equals value. (Roman Urdu: opening tag ke andar extra maloomat, name="value")
*[head]: The part of the page that holds information about the page and is not shown to users. (Roman Urdu: page ki maloomat wala hissa jo screen par nazar nahi aata)
*[body]: The part of the page that holds the content users see on screen. (Roman Urdu: page ka wo hissa jo user screen par dekhta hai)
*[index.html]: The default home page name a browser looks for first. (Roman Urdu: website ka default home page jo browser sab se pehle dhoondta hai)
*[boilerplate]: The standard starting code that is almost the same in every file of its kind. (Roman Urdu: har file mein ek jaisa shuruati standard code)
*[Emmet]: A shortcut system in VS Code that expands short abbreviations into full HTML. (Roman Urdu: VS Code ka shortcut jo chhoti abbreviation ko poore HTML mein badal deta hai)
