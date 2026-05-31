---
lesson_id: frontend.ch05.l01
title: "5.1 Tailwind utility-first"
chapter: 5
order: 1
estimated_minutes: 50
prerequisites:
  - frontend.ch03.l04
---

# 5.1 Tailwind utility-first

In Chapter 3 you wrote CSS by hand. You picked selectors and wrote rules in a separate file. That is a solid skill, and it is still useful. But writing CSS that way has a friction point: every time you want to style something, you have to name it, jump to a different file, write the rule, save, and switch back. On a big project you do this hundreds of times a day.

Tailwind takes a different path. Instead of writing rules in a CSS file, you apply small ready-made classes directly on the HTML element. This lesson explains what those classes are, why the approach is popular, how Tailwind actually generates its CSS behind the scenes, and how to get it running.

## What you'll know by the end

- What a utility class is and what "utility-first" means.
- Why people like Tailwind, and what the honest tradeoff is.
- How Tailwind generates CSS at build time, and why that needs Node and npm.
- Three ways to use Tailwind, and when to pick each.
- 35 of the most common Tailwind classes, with the CSS they produce.
- The spacing scale: why `p-4` is 16 px and `p-8` is 32 px.
- How responsive prefixes like `md:` and the `dark:` prefix work.

---

## What a utility class is

A utility class does exactly one styling job. That is the whole idea. The class `p-4` adds padding. The class `text-center` centres text. The class `bg-teal-500` sets a teal background. Each class is single-purpose. You stack many small classes on one element to build the look you want.

```html
<button class="bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold">
  Sign up
</button>
```

That button has a teal background, white text, horizontal and vertical padding, round corners, and semi-bold text. You did not open a CSS file. You read the style straight off the element.

"Utility-first" (Roman Urdu: chhoti single-purpose classes ko seedha element par lagana) means you start with these tiny classes rather than writing your own named classes first.

<figure markdown>
<svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-anatomy-title" style="max-width:100%;height:auto">
  <title id="svg-anatomy-title">Anatomy of a Tailwind class string: flex items-center gap-4 p-6 bg-white rounded-lg broken into six labelled segments with lines to descriptions.</title>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20"  y="30" width="72"  height="36" rx="6"/>
    <rect x="104" y="30" width="108" height="36" rx="6"/>
    <rect x="224" y="30" width="72"  height="36" rx="6"/>
    <rect x="308" y="30" width="44"  height="36" rx="6"/>
    <rect x="364" y="30" width="98"  height="36" rx="6"/>
    <rect x="474" y="30" width="110" height="36" rx="6"/>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <g><text x="56"  y="53">flex</text></g>
    <g><text x="158" y="53">items-center</text></g>
    <g><text x="260" y="53">gap-4</text></g>
    <g><text x="330" y="53">p-6</text></g>
    <g><text x="413" y="53">bg-white</text></g>
    <g><text x="529" y="53">rounded-lg</text></g>
  </g>
  <g stroke="#6b6b65" stroke-width="1.2" stroke-dasharray="3 3" fill="none">
    <line x1="56"  y1="66" x2="56"  y2="130"/>
    <line x1="158" y1="66" x2="158" y2="130"/>
    <line x1="260" y1="66" x2="260" y2="130"/>
    <line x1="330" y1="66" x2="330" y2="130"/>
    <line x1="413" y1="66" x2="413" y2="130"/>
    <line x1="529" y1="66" x2="529" y2="130"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <g>
      <text x="56"  y="148">Layout</text>
      <text x="56"  y="162">display: flex</text>
    </g>
    <g>
      <text x="158" y="148">Alignment</text>
      <text x="158" y="162">align-items: center</text>
    </g>
    <g>
      <text x="260" y="148">Gap</text>
      <text x="260" y="162">gap: 1rem</text>
    </g>
    <g>
      <text x="330" y="148">Padding</text>
      <text x="330" y="162">padding: 1.5rem</text>
    </g>
    <g>
      <text x="413" y="148">Background</text>
      <text x="413" y="162">background: #fff</text>
    </g>
    <g>
      <text x="529" y="148">Border radius</text>
      <text x="529" y="162">border-radius: 8px</text>
    </g>
  </g>
</svg>
<figcaption>Every class in a Tailwind string maps directly to one CSS property. Reading left to right you see layout, then alignment, gap, padding, colour, and radius.</figcaption>
</figure>

---

## Why people like it, and what the tradeoff is

Before looking at how to install Tailwind it helps to understand why the approach exists. Here is the honest picture.

**The problems Tailwind solves**

Writing hand CSS has some friction that grows as a project grows:

- You name things. Every component needs a class name: `.card`, `.card-header`, `.card-body`, `.btn-primary`. Naming is surprisingly hard and takes real time.
- You jump between files. Style on the element, rule in the CSS file. Back and forth, all day.
- CSS is global. A class you add for one page can accidentally break something on another page. This gets scary on large codebases.
- You repeat yourself. You write `display: flex; align-items: center; gap: 1rem` for the twentieth card this week.

Tailwind helps with all of these. You do not name things. You do not jump files. Each class is scoped to the element you put it on. And you reach for the same short class names every time instead of rewriting long declarations.

The result is **speed** and **consistency**. Two developers on the same Tailwind project automatically use the same spacing steps, the same colour names, and the same class patterns.

**The tradeoff**

Tailwind class lists can get long.

```html
<div class="flex items-center gap-4 px-6 py-4 bg-white rounded-xl shadow-md
            border border-gray-100 hover:shadow-lg transition-shadow">
```

This is harder to scan than a single class name like `.card`. Some developers find long class lists messy. Some teams split them across lines or use a formatter. Whether that tradeoff is worth it is a real debate. This course uses Tailwind because it is standard in the React ecosystem and speeds up prototyping, but hand-written CSS is never wrong.

---

## How Tailwind works behind the scenes

This part is important. Tailwind is not a big pre-built stylesheet you load. It generates CSS on demand from your actual HTML.

**The build step** (Roman Urdu: woh process jo tumhara code chalane se pehle chalta hai aur CSS file banaata hai)

Here is what happens:

1. You write HTML (or JSX) with Tailwind class names.
2. You run a build command.
3. Tailwind scans every file it can see and collects every class name you actually used.
4. For each class it found, it generates the matching CSS.
5. The result is a small CSS file with only the rules your project uses.

If you use 60 classes out of the thousands Tailwind knows, your CSS file has only those 60 rules. Nothing unused is shipped.

<figure markdown>
<svg viewBox="0 0 740 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-build-title" style="max-width:100%;height:auto">
  <title id="svg-build-title">Build pipeline: HTML and JSX files with class names feed into the Tailwind build step, which outputs a tiny CSS file with only the rules you used.</title>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20"  y="60" width="170" height="60" rx="8"/>
    <rect x="285" y="60" width="170" height="60" rx="8"/>
    <rect x="550" y="60" width="170" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <g><text x="105" y="86" font-weight="600">Your HTML / JSX</text></g>
    <g><text x="105" y="104" font-size="11" fill="#6b6b65">class="flex p-4 bg-white"</text></g>
    <g><text x="370" y="86" font-weight="600">Tailwind build</text></g>
    <g><text x="370" y="104" font-size="11" fill="#6b6b65">scans classes, generates CSS</text></g>
    <g><text x="635" y="86" font-weight="600">Tiny CSS file</text></g>
    <g><text x="635" y="104" font-size="11" fill="#6b6b65">only the rules you used</text></g>
  </g>
  <defs>
    <marker id="bq-arrow-build" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-build)">
    <line x1="192" y1="90" x2="282" y2="90"/>
    <line x1="457" y1="90" x2="547" y2="90"/>
  </g>
</svg>
<figcaption>Tailwind scans your source files for class names, then generates only the CSS those classes need. Nothing unused is included in the final file.</figcaption>
</figure>

**Why this needs Node and npm**

The scanning and CSS generation is a program. That program runs in Node.js. You install it with npm. These are the same Node.js and npm you installed in lesson 1.2: `node -v` and `npm -v` should both print version numbers in your terminal. If they do not, go back to that lesson and finish the setup before continuing here.

The build step runs automatically while you code, so you never trigger it by hand. You just save your file, and the CSS updates.

---

## Three ways to use Tailwind

There are three common ways to get Tailwind running. Each one suits a different situation.

| Method | Setup effort | Needs Node and npm | Good for |
| --- | --- | --- | --- |
| CDN script tag | One line, instant | No | Learning, quick experiments |
| Tailwind CLI | A few commands | Yes | Plain HTML sites, no framework |
| Vite + PostCSS | A few commands | Yes | Real projects, React, this course |

### Method 1: CDN script tag

Add one `<script>` line in the `<head>` of any HTML file. Tailwind loads from the internet and works at once, with no install.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <h1 class="text-2xl font-bold text-teal-600">Hello Tailwind</h1>
    <p class="mt-2 text-gray-700">Styled with no build step at all.</p>
  </body>
</html>
```

Open this file in your browser and the heading is large, bold, and teal. This is the fastest way to try classes while you learn.

!!! warning
    The CDN version runs in the browser on every page load. It is slow, much larger than a built file, and does not support all features. Use it only for learning. Do not ship it to a real site.

### Method 2: Tailwind CLI

If you have a plain HTML project and do not want a full Vite setup, you can use the Tailwind CLI. It scans your HTML and builds a CSS file.

```bash
npm install -D tailwindcss
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

Your `input.css` has the import directive, and Tailwind watches for changes. This is good for small projects that are just HTML and CSS, with no JavaScript framework.

### Method 3: Vite and the Tailwind Vite plugin (what this course uses)

This is the setup this course uses for all projects. Vite is the same build tool you will use for React in later chapters. The Tailwind Vite plugin (Roman Urdu: Vite ke andar Tailwind chalane wala tool) connects both tools so everything builds together in one command.

**Step 1: create the Vite project**

```bash
npm create vite@latest my-app
cd my-app
npm install
```

When `npm create vite` asks you to pick a framework, choose **Vanilla** for now. Later chapters pick **React** here. When it asks for a variant, choose **JavaScript**.

**Step 2: install Tailwind**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 3: add the plugin to your Vite config**

Open `vite.config.js` and add the plugin. The file will look like this:

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

**Step 4: add the import to your CSS file**

Open `src/style.css` and put this one line at the very top:

```css
@import "tailwindcss";
```

That single line pulls in Tailwind's base styles, components, and utilities. Everything you need.

**Step 5: run the dev server**

```bash
npm run dev
```

Vite starts a local server and prints a URL, usually `http://localhost:5173`. Open it in your browser. Any Tailwind class you add to your HTML now works. Vite watches your files and rebuilds the CSS every time you save.

!!! tip
    You can try any Tailwind class with no setup at all. Open [play.tailwindcss.com](https://play.tailwindcss.com) in your browser. Type HTML on one side and see the result live on the other. It is great for testing a class quickly before adding it to your project.

---

## The complete utility reference table

This is the table you will come back to. It covers the classes you will use most days, grouped by category. The "CSS it produces" column is exactly what Tailwind writes to your CSS file.

| Tailwind class | CSS it produces | What it does |
| --- | --- | --- |
| **Layout** | | |
| `block` | `display: block` | Full-width block element |
| `inline` | `display: inline` | Inline element, flows with text |
| `flex` | `display: flex` | Flexbox container |
| `inline-flex` | `display: inline-flex` | Inline flexbox container |
| `grid` | `display: grid` | Grid container |
| `hidden` | `display: none` | Hides the element completely |
| **Flex alignment** | | |
| `items-start` | `align-items: flex-start` | Children align to the top |
| `items-center` | `align-items: center` | Children align to the vertical middle |
| `items-end` | `align-items: flex-end` | Children align to the bottom |
| `justify-start` | `justify-content: flex-start` | Children packed to the left |
| `justify-center` | `justify-content: center` | Children centred horizontally |
| `justify-between` | `justify-content: space-between` | Children spread to both edges |
| `justify-end` | `justify-content: flex-end` | Children packed to the right |
| `flex-col` | `flex-direction: column` | Stack children top to bottom |
| **Spacing** | | |
| `p-4` | `padding: 1rem` | Padding on all four sides |
| `px-4` | `padding-left: 1rem; padding-right: 1rem` | Horizontal padding only |
| `py-4` | `padding-top: 1rem; padding-bottom: 1rem` | Vertical padding only |
| `pt-2` | `padding-top: 0.5rem` | Top padding only |
| `m-4` | `margin: 1rem` | Margin on all four sides |
| `mx-auto` | `margin-left: auto; margin-right: auto` | Centre a block element |
| `mt-6` | `margin-top: 1.5rem` | Top margin only |
| `gap-4` | `gap: 1rem` | Gap between flex or grid children |
| `space-y-2` | `margin-top: 0.5rem` on each child | Vertical gap between stacked children |
| **Sizing** | | |
| `w-full` | `width: 100%` | Full width of parent |
| `w-screen` | `width: 100vw` | Full viewport width |
| `h-screen` | `height: 100vh` | Full viewport height |
| `max-w-md` | `max-width: 28rem` | Cap width at medium size |
| `max-w-xl` | `max-width: 36rem` | Cap width at extra-large |
| **Typography** | | |
| `text-sm` | `font-size: 0.875rem` | Small text |
| `text-base` | `font-size: 1rem` | Default body text size |
| `text-lg` | `font-size: 1.125rem` | Slightly larger text |
| `text-xl` | `font-size: 1.25rem` | Large text |
| `text-2xl` | `font-size: 1.5rem` | Heading-size text |
| `font-normal` | `font-weight: 400` | Regular weight |
| `font-semibold` | `font-weight: 600` | Semi-bold weight |
| `font-bold` | `font-weight: 700` | Bold weight |
| `text-center` | `text-align: center` | Centre-align text |
| `text-left` | `text-align: left` | Left-align text |
| `leading-tight` | `line-height: 1.25` | Tighter line spacing |
| `leading-relaxed` | `line-height: 1.625` | Looser, readable line spacing |
| `uppercase` | `text-transform: uppercase` | All caps |
| `tracking-wide` | `letter-spacing: 0.025em` | Wider letter spacing |
| **Colour** | | |
| `bg-white` | `background-color: rgb(255 255 255)` | White background |
| `bg-gray-100` | `background-color: rgb(243 244 246)` | Very light grey background |
| `bg-teal-500` | `background-color: rgb(20 184 166)` | Teal background |
| `text-white` | `color: rgb(255 255 255)` | White text |
| `text-gray-700` | `color: rgb(55 65 81)` | Dark grey text |
| `text-teal-600` | `color: rgb(13 148 136)` | Dark teal text |
| **Borders and radius** | | |
| `border` | `border-width: 1px` | 1px border on all sides |
| `border-2` | `border-width: 2px` | 2px border |
| `border-gray-200` | `border-color: rgb(229 231 235)` | Light grey border colour |
| `rounded` | `border-radius: 0.25rem` | Slight rounding |
| `rounded-lg` | `border-radius: 0.5rem` | Moderate rounding |
| `rounded-xl` | `border-radius: 0.75rem` | Strong rounding |
| `rounded-full` | `border-radius: 9999px` | Pill shape or circle |
| **Effects and interaction** | | |
| `shadow` | `box-shadow: 0 1px 3px ...` | Small drop shadow |
| `shadow-md` | `box-shadow: 0 4px 6px ...` | Medium drop shadow |
| `opacity-75` | `opacity: 0.75` | 75% opacity |
| `transition` | `transition-property: all; ...` | Smooth CSS transitions |
| `hover:bg-teal-600` | Applied only on `:hover` | Background changes on hover |
| `hover:shadow-lg` | Applied only on `:hover` | Larger shadow on hover |
| `focus:outline-none` | Applied only on `:focus` | Remove default outline on focus |
| `cursor-pointer` | `cursor: pointer` | Hand cursor on hover |

??? note urdu "اردو میں مزید وضاحت"
    یہ ٹیبل آپ کے لیے ایک حوالہ ہے۔ ہر Tailwind کلاس دراصل ایک CSS قاعدے کا چھوٹا نام ہے۔ مثلاً `p-4` کا مطلب ہے `padding: 1rem`، اور `flex` کا مطلب ہے `display: flex`۔ آپ کو یہ سب ایک دن میں یاد نہیں کرنے ہیں۔ جیسے جیسے آپ استعمال کریں گے، یہ خود بخود یاد ہو جائیں گے۔ اگر کوئی کلاس نہیں جانتے تو ہمیشہ tailwindcss.com کی documentation دیکھیں۔

---

## How the spacing scale works

Tailwind uses a step scale for spacing. The steps are not pixels directly. They are multiples of 0.25rem. The rule is simple: divide the step by 4 to get rem.

| Step | rem | px (at default 16px root) | Common use |
| --- | --- | --- | --- |
| `1` | 0.25 rem | 4 px | Tiny nudge, icon inner gap |
| `2` | 0.5 rem | 8 px | Tight inner spacing |
| `3` | 0.75 rem | 12 px | Compact button padding |
| `4` | 1 rem | 16 px | Standard padding, one unit |
| `6` | 1.5 rem | 24 px | Comfortable card padding |
| `8` | 2 rem | 32 px | Section breathing room |
| `10` | 2.5 rem | 40 px | Large button or input height |
| `12` | 3 rem | 48 px | Large section gap |
| `16` | 4 rem | 64 px | Hero vertical padding |
| `24` | 6 rem | 96 px | Very large vertical section |

The same scale works for padding (`p-`), margin (`m-`), gap (`gap-`), width (`w-`), and height (`h-`). Once `4 = 1rem` is in your head, everything else follows. You never need to think in raw pixels.

---

## Responsive prefixes

Tailwind is mobile-first. A class with no prefix applies at all screen sizes. A prefix like `md:` applies only at that minimum width and above.

```html
<div class="text-center md:text-left lg:text-right">
  This text moves as the screen grows.
</div>
```

On a phone the text is centred. On a medium screen and up it aligns left. On a large screen and up it aligns right.

| Prefix | Min-width | Typical device |
| --- | --- | --- |
| (none) | 0 px | All screens, phones first |
| `sm:` | 640 px | Large phones, small tablets |
| `md:` | 768 px | Tablets, small laptops |
| `lg:` | 1024 px | Laptops, desktops |
| `xl:` | 1280 px | Wide desktop monitors |
| `2xl:` | 1536 px | Very wide screens |

Mobile-first makes practical sense. Writing the phone layout first means the most common screen size is always correct. You layer improvements for bigger screens on top.

---

## Dark mode

The `dark:` prefix applies a class only when the user has dark mode turned on in their operating system.

```html
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  I switch with the system theme.
</div>
```

In light mode this box is white with dark text. In dark mode it flips to a dark background with white text. You will use this more in later chapters when you build full page layouts.

---

## One element, two ways

Here is the same card built with hand CSS and then with Tailwind. Look at what changes and what stays the same.

=== "Hand CSS"
    ```css
    /* style.css */
    .card {
      background-color: #14b8a6;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-weight: 600;
    }
    ```
    ```html
    <div class="card">Hand CSS card</div>
    ```

=== "Tailwind"
    ```html
    <div class="bg-teal-500 text-white px-6 py-4 rounded-xl shadow-md font-semibold">
      Tailwind card
    </div>
    ```

Both produce the same visual result. With Tailwind there is no separate file and no class name to invent. The style is readable directly on the element. That is the speed gain once the class names are in your memory.

---

!!! note "Keep your class order clean"
    Tailwind class lists can grow long. A good habit is to keep them in a consistent order: layout first, then spacing, then sizing, then typography, then colour, then borders, then effects. This makes long lists easier to scan. A tool called Prettier with the Tailwind plugin can sort them automatically. You will meet that in a later chapter.

---

### Try this

**Option A (no install needed):** Open [play.tailwindcss.com](https://play.tailwindcss.com) in your browser. Build a card with these classes: `bg-white border border-gray-200 rounded-xl p-6 shadow-md max-w-sm`. Then add a heading inside with `text-xl font-bold text-gray-900` and a paragraph with `mt-2 text-gray-600 leading-relaxed`. Then add a button with `mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600`.

**Option B (full setup):** Run the Vite + Tailwind setup from the "Method 3" section above. Create the same card in your `index.html` and start the dev server with `npm run dev`. Open `http://localhost:5173` and see the card. Change one class while the server is running and watch the browser update instantly.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That is what this section is for.

1. What does "utility-first" mean in one sentence?
2. What is the honest tradeoff of Tailwind, the thing that some developers dislike?
3. Tailwind generates CSS at build time. What does "build time" mean, and which tool runs that process?
4. Why should you not ship the CDN script to a real site?
5. In the spacing scale, how many pixels is `p-4` at default settings, and how would you calculate `p-10`?
6. What does the `md:` prefix do, and what does a class with no prefix do?

---

## What's next

You now know what utility classes are, why they exist, how Tailwind builds its CSS, and how to get it running in three different ways. You also have a reference table of 35 plus common classes to come back to. Next you will use all of this to build real components: cards, buttons, and a navigation bar.

[Next lesson: 5.2 Building real components with Tailwind &rarr;](5-2-building-real-components.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You do not need them to continue.

- [Tailwind docs: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind docs: Responsive design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind docs: Dark mode](https://tailwindcss.com/docs/dark-mode)
- [Tailwind Play](https://play.tailwindcss.com)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) VS Code extension that autocompletes class names as you type.

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[Tailwind]: A CSS framework that gives you small ready-made classes to style HTML. (Roman Urdu: aik CSS framework jo chhoti class deta hai)
*[utility class]: A small class that does one styling job, like padding or colour. (Roman Urdu: chhoti class jo aik kaam karti hai)
*[utility-first]: A way of styling where you stack many small classes on the element. (Roman Urdu: chhoti class jorr kar design banana)
*[CDN]: A web link that delivers a file fast from servers near the user. (Roman Urdu: file ko jaldi pohanchane wala web link)
*[Vite]: A fast build tool used to set up and run real web projects. (Roman Urdu: ek tez tool jo asli project banata aur chalata hai)
*[build step]: A process that runs before your code is served, transforming source files into final output. (Roman Urdu: code chalane se pehle ka process jo final files banaata hai)
*[responsive prefix]: A prefix like md: that applies a class only at that screen width and up. (Roman Urdu: screen size ke hisab se class lagana)
*[spacing scale]: Tailwind's step system where step 4 means 1rem, so the numbers are steps not pixels. (Roman Urdu: spacing ke steps, pixels nahi)
*[PostCSS]: A tool that processes CSS with plugins, used by Vite to run Tailwind. (Roman Urdu: CSS process karne wala tool jo Vite ke saath kaam karta hai)
*[Node.js]: A program that runs JavaScript outside the browser. (Roman Urdu: aisa program jo JavaScript ko browser ke baghair chalata hai)
*[npm]: The tool that installs code packages for Node.js. (Roman Urdu: Node.js ke packages install karne ka tool)
