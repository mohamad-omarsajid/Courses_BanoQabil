---
lesson_id: frontend.ch05.l04
title: "5.4 Figma to website workflow"
chapter: 5
order: 4
estimated_minutes: 75
prerequisites:
  - frontend.ch05.l03
---

# 5.4 Figma to website workflow

You know Tailwind now. You can also read a Figma design. This lesson joins those two skills into one real job: take a design and turn it into a working website. We use a clear five-step workflow, walk through every step in detail, and build a Bano Qabil Sahiwal landing page from a real community Figma file.

## What you'll know by the end

- The common kinds of websites and what each one needs
- The questions to ask a client before you write any code
- A thorough five-step workflow from design spec to finished page
- How to break a design into semantic HTML that also supports accessibility
- How to translate a design's layout to flexbox and grid Tailwind classes
- How to apply styles section by section, matching the design values
- How to refine your build against the design and test across screen sizes
- A complete checklist for any design-to-code job

---

## Kinds of websites and what they ask for

Most beginner jobs fall into a few types. Each type has a job to do.

| Site type | Main goal | Key sections |
| --- | --- | --- |
| Charity or donation landing | Get people to donate | Hero, impact stats, donate form |
| E-commerce | Sell products | Product cards, cart, checkout |
| SaaS (software product) | Drive sign-up conversions | Hero, features, pricing, testimonials |
| Restaurant | Drive visits and orders | Menu, hours, map, contact |
| Real estate | Show listings | Search, listing cards, contact agent |
| Portfolio | Win clients or jobs | Project showcase, about, contact |
| Blog or news | Keep readers informed | Article list, article page, search |

When you know the type, you already know most of what the page will hold. You can plan before you open the design file or local spec.

---

## What to ask a client before you start

A client gives you a job. Your job is to ask good questions first. These questions save you hours of rework later.

| Question | Why it matters |
| --- | --- |
| Who is this website for? | Shapes language, layout, and imagery choices |
| What is the one main action you want people to take? | Defines the call to action and page goal |
| Do you have a logo and brand colours? | You need these before you read the design |
| Do you have the text and images ready? | Missing content is the most common delay |
| What pages do you need? | Scope: one page or many? |
| What is the deadline? | Helps you plan the work |
| Who owns the design file or spec? | You need view access, a share link, or a clear local reference |

The answers shape every choice you make later.

!!! note "A note on ukhuwwah"
    A client is a partner, not just a payer. Ask questions early, listen well, and
    explain your choices in plain words. Good communication is a form of ukhuwwah,
    the care between people working toward one goal. It also prevents rework.

---

## The five-step workflow

Every design follows the same path. Learn it once and use it on every project.

1. **Read** the design. Understand the layout, collect every value.
2. **Structure**: write the semantic HTML first, before any styling.
3. **Layout**: add flex and grid classes to place sections and groups.
4. **Style**: add colours, typography, and spacing to match the design.
5. **Refine**: compare the browser to the design and fix differences.

<figure markdown>
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-wf5-title" style="max-width:100%;height:auto">
<title id="svg-wf5-title">The five-step design-to-code workflow shown as five boxes connected by arrows: step 1 Read the Figma design, step 2 Structure with semantic HTML, step 3 Layout with flex and grid, step 4 Style with Tailwind values, step 5 Refine by comparing browser to design. A return arrow from step 5 back to step 4 shows the fix-and-refine loop.</title>
<g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
  <rect x="14" y="60" width="120" height="100" rx="8"/>
  <rect x="154" y="60" width="120" height="100" rx="8"/>
  <rect x="294" y="60" width="120" height="100" rx="8"/>
  <rect x="434" y="60" width="120" height="100" rx="8"/>
  <rect x="574" y="60" width="120" height="100" rx="8"/>
</g>
<g font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#1f1f1c" text-anchor="middle">
  <g><text x="74" y="92">1. Read</text></g>
  <g><text x="214" y="92">2. Structure</text></g>
  <g><text x="354" y="92">3. Layout</text></g>
  <g><text x="494" y="92">4. Style</text></g>
  <g><text x="634" y="92">5. Refine</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65" text-anchor="middle">
  <g><text x="74" y="112">Collect colours,</text></g>
  <g><text x="74" y="126">sizes, spacing,</text></g>
  <g><text x="74" y="140">assets</text></g>
  <g><text x="214" y="112">Write semantic</text></g>
  <g><text x="214" y="126">HTML: header,</text></g>
  <g><text x="214" y="140">section, footer</text></g>
  <g><text x="354" y="112">Add flex, grid,</text></g>
  <g><text x="354" y="126">gap, w-full,</text></g>
  <g><text x="354" y="140">max-w-*</text></g>
  <g><text x="494" y="112">Colours, fonts,</text></g>
  <g><text x="494" y="126">padding, border</text></g>
  <g><text x="494" y="140">radius, shadows</text></g>
  <g><text x="634" y="112">Compare browser</text></g>
  <g><text x="634" y="126">vs Figma;</text></g>
  <g><text x="634" y="140">fix mismatches</text></g>
</g>
<defs>
  <marker id="bq-arr-wf5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
  </marker>
</defs>
<g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arr-wf5)">
  <line x1="135" y1="110" x2="150" y2="110"/>
  <line x1="275" y1="110" x2="290" y2="110"/>
  <line x1="415" y1="110" x2="430" y2="110"/>
  <line x1="555" y1="110" x2="570" y2="110"/>
</g>
<g stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" fill="none" marker-end="url(#bq-arr-wf5)">
  <path d="M 634 162 C 634 220 494 220 494 162"/>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65" text-anchor="middle">
  <g><text x="564" y="240">refine loop: fix then test again</text></g>
</g>
</svg>
<figcaption>The five-step workflow runs left to right. Steps 4 and 5 form a small loop: style a section, compare it to the design, and fix anything that does not match before moving on.</figcaption>
</figure>

Here is the full checklist. Keep a copy open while you work.

| Step | What to do | Watch out for |
| --- | --- | --- |
| 1. Read | Open Dev Mode; note every colour, font size, and gap value; list the sections | Colours that look similar but have different hex codes |
| 2. Structure | Write the full HTML with semantic tags before adding any class | Skipping `<header>`, `<main>`, `<footer>`; missing ARIA roles |
| 3. Layout | Add flex or grid containers, gap, width, and max-width first | Adding colours before the layout is stable |
| 4. Style | Work top to bottom, one section at a time | Applying `text-center` to the whole page instead of only where needed |
| 5. Refine | Open the browser and design reference side by side; measure anything that looks wrong | Forgetting to test at 320 px mobile width before desktop |

---

## Step 1 in detail: reading the design

Before you type a single character of code, spend ten minutes with the design reference. In this lesson, use the public Figma community file:

[Bano Qabil Sahiwal website design](https://www.figma.com/community/file/1578793749331470425/bano-qabil-sahiwal-website-design)

Open the file, duplicate it to your drafts if Figma asks, and inspect it like a developer. Do not rush to code. First collect the visible sections, colours, type sizes, spacing, and responsive behaviour.

**Collect the type scale.** Click each different text element and note its font size and weight. A well-designed page has three to five distinct sizes. Write them down.

**Collect the colours.** Note the background colours, text colours, and accent colours. A simple page might have three: a near-white background, a near-black text, and one brand accent.

**Identify the layout pattern.** Is the main layout a full-width single column? A two-column side by side? A three-column card grid? Make a quick sketch on paper.

**Note the sections in order.** Write a list: header, hero, courses, final call to action, footer. This list becomes your HTML skeleton.

**Mark the responsive breakpoints.** Check if the design shows a mobile and a desktop frame. Note what changes: usually a column count and a font size.

<figure markdown>
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-step1-read" style="max-width:100%;height:auto">
<title id="svg-step1-read">A reading notes diagram showing four columns: type scale, colour palette, section order, and layout notes for the Bano Qabil landing page.</title>
<g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
  <rect x="14" y="30" width="150" height="210" rx="8"/>
  <rect x="182" y="30" width="150" height="210" rx="8"/>
  <rect x="350" y="30" width="150" height="210" rx="8"/>
  <rect x="518" y="30" width="160" height="210" rx="8"/>
</g>
<g font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#1f1f1c" text-anchor="middle">
  <g><text x="89" y="56">Type scale</text></g>
  <g><text x="257" y="56">Colours</text></g>
  <g><text x="425" y="56">Sections</text></g>
  <g><text x="598" y="56">Layout</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#1f1f1c">
  <g><text x="24" y="80">36 px / 700 → h1</text></g>
  <g><text x="24" y="98">24 px / 700 → h2</text></g>
  <g><text x="24" y="116">18 px / 600 → h3</text></g>
  <g><text x="24" y="134">16 px / 400 → body</text></g>
  <g><text x="24" y="152">13 px / 400 → caption</text></g>
</g>
<g>
  <rect x="192" y="70" width="24" height="24" rx="4" fill="#111827"/>
  <rect x="222" y="70" width="24" height="24" rx="4" fill="#6b7280"/>
  <rect x="252" y="70" width="24" height="24" rx="4" fill="#059669"/>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65">
  <g><text x="192" y="112">#111827 text</text></g>
  <g><text x="192" y="128">#6b7280 muted</text></g>
  <g><text x="192" y="144">#059669 brand</text></g>
  <g><text x="192" y="164">#f9fafb page bg</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#1f1f1c">
  <g><text x="360" y="80">1. header</text></g>
  <g><text x="360" y="98">2. hero</text></g>
  <g><text x="360" y="116">3. courses</text></g>
  <g><text x="360" y="134">4. CTA section</text></g>
  <g><text x="360" y="152">5. footer</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#1f1f1c">
  <g><text x="528" y="80">Mobile: 1 col</text></g>
  <g><text x="528" y="98">Desktop: 2 col hero</text></g>
  <g><text x="528" y="116">Courses: 1 col to 2 col</text></g>
  <g><text x="528" y="134">max-width: 1280 px</text></g>
  <g><text x="528" y="152">center content</text></g>
</g>
</svg>
<figcaption>Before writing any code, collect your four sets of notes from the design reference: the type scale, the colour palette, the section order, and the layout pattern at each breakpoint.</figcaption>
</figure>

---

## Step 2 in detail: writing semantic HTML

Lesson 4.4 taught accessibility. Semantic HTML is the foundation of accessible pages. Before you add a single Tailwind class, write the full HTML skeleton using meaningful tags. A semantic skeleton tells the browser, assistive technology, and your future self what each part of the page is.

Here are the tags and what they communicate:

| HTML tag | What it means | Accessibility benefit |
| --- | --- | --- |
| `<header>` | The page header with logo and main navigation | Screen readers announce it as a landmark |
| `<nav>` | A navigation block | Users can jump directly to it |
| `<main>` | The main content of the page | Screen readers skip straight here |
| `<section>` | A thematic group of content | Divides the page into named regions |
| `<article>` | Self-contained content (a blog post, a card) | Can be understood outside the page |
| `<aside>` | Content related but not central | Screen readers can skip it |
| `<footer>` | The page footer | Announced as a landmark |
| `<h1>` to `<h6>` | Headings in order of importance | Screen readers build a table of contents |
| `<button>` | A clickable action | Keyboard focusable; announces "button" |
| `<a href>` | A link to another page | Keyboard focusable; announces destination |
| `<label>` and `<input>` | A form field with its label | Screen readers read the label aloud |

The rule from lesson 4.4 holds here too: if a screen reader user removed every class from your page, could they still understand the structure and use the page? If the answer is yes, your HTML is semantic.

### The Bano Qabil page skeleton

Here is the HTML skeleton for our Bano Qabil landing page before any Tailwind classes go on.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bano Qabil Sahiwal | Free Courses</title>
</head>
<body>

  <header>
    <a href="/">Bano Qabil Sahiwal</a>
    <nav>
      <a href="#courses">Courses</a>
      <a href="#start">Start learning</a>
    </nav>
  </header>

  <main>

    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Free skills for a better future</h1>
      <p>Beginner-friendly web development and design courses for students and job seekers in Sahiwal.</p>
      <a href="#courses">Explore courses</a>
    </section>

    <section aria-labelledby="courses-heading" id="courses">
      <h2 id="courses-heading">Courses</h2>
      <ul>
        <li>
          <h3>Frontend Web Development</h3>
          <p>HTML, CSS, JavaScript, React, deployment, and portfolio projects.</p>
        </li>
        <li>
          <h3>Graphic Design</h3>
          <p>Design basics, Canva, Photoshop, typography, and client-ready work.</p>
        </li>
      </ul>
    </section>

    <section aria-labelledby="start-heading" id="start">
      <h2 id="start-heading">Start learning today</h2>
      <p>Choose a course, follow each lesson, and build real projects step by step.</p>
      <a href="#courses">View courses</a>
    </section>

  </main>

  <footer>
    <p>Bano Qabil Sahiwal</p>
    <p>Sahiwal, Pakistan</p>
    <p>2026 All rights reserved.</p>
  </footer>

</body>
</html>
```

Notice what is here even before styling:

- `lang="en"` on the `<html>` tag tells screen readers the language.
- Every section has `aria-labelledby` pointing to its `<h2>` id. This lets screen reader users understand each section's purpose when navigating by landmarks.
- The course list uses real headings, so each course can be scanned quickly.
- The final CTA uses a normal link because it jumps to the courses section.
- Navigation links use IDs like `<a href="#courses">` so users can jump to any section with the keyboard.

This is the skeleton. It works without any CSS at all. Now we add layout.

---

## Step 3 in detail: layout with flex and grid

Layout classes go on before colour or typography. You are placing the sections and their children in the right positions first.

The approach is mobile-first: the base classes set the phone layout. Responsive prefixes like `sm:` and `md:` adjust for larger screens.

```html
<body class="font-sans antialiased">

  <header class="flex items-center justify-between px-4 py-4 md:px-8">
    ...
  </header>

  <main>

    <section class="px-4 py-16 text-center md:py-24">
      ...
    </section>

    <section class="px-4 py-12">
      <ul class="mt-8 grid grid-cols-1 gap-6 text-center sm:grid-cols-3 list-none">
        ...
      </ul>
    </section>

    <section class="px-4 py-12">
      <form class="mx-auto mt-8 max-w-md">
        <fieldset class="flex flex-wrap justify-center gap-3 border-0 p-0">
          ...
        </fieldset>
        ...
      </form>
    </section>

  </main>

  <footer class="px-4 py-8 text-center">
    ...
  </footer>

</body>
```

At this stage the page has the right structure but no colours. You can check the layout on a phone by narrowing the browser window.

**Why layout before colour?** Because if the structure is wrong, no amount of colour fixes it. Check alignment, spacing, and column behaviour first. Colour comes next.

---

## Step 4 in detail: styling with Tailwind values from the design

Now you add colour, typography, border radius, and shadows. You work section by section, top to bottom, exactly matching the values you read in step 1.

!!! tip "Use the Bano Qabil Figma file"
    Open the [Bano Qabil Sahiwal website design](https://www.figma.com/community/file/1578793749331470425/bano-qabil-sahiwal-website-design) and keep it beside your browser. The code below shows the workflow. Your exact classes may change depending on the values you read from the Figma file.

Use the Figma file as the source of truth. If a colour or spacing value in your file differs from the example below, follow the Figma value.

### The header

```html
<header class="flex items-center justify-between px-4 py-4 md:px-8 bg-white shadow-sm">
  <a href="/" class="text-xl font-bold text-emerald-700">Bano Qabil Sahiwal</a>
  <nav class="flex gap-4">
    <a href="#courses" class="text-sm text-gray-600 hover:text-emerald-700">Courses</a>
    <a href="#start"
       class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
      Start learning
    </a>
  </nav>
</header>
```

`flex items-center justify-between` puts the logo on the left and the nav on the right. `shadow-sm` adds a very light underline shadow that visually separates the header from the page. The start button uses the main brand colour from the design and a darker hover state.

### The hero section

```html
<section aria-labelledby="hero-heading"
         class="bg-emerald-50 px-4 py-16 text-center md:py-24">
  <h1 id="hero-heading"
      class="text-3xl font-bold text-gray-900 md:text-5xl">
    Free skills for a better future
  </h1>
  <p class="mt-4 text-base text-gray-600 md:text-lg max-w-xl mx-auto">
    Free beginner-friendly courses for students and job seekers in Sahiwal.
  </p>
  <a href="#courses"
     class="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700">
    Explore courses
  </a>
</section>
```

`bg-emerald-50` is a very light tint, almost white, that gives the hero warmth without being too strong. `text-3xl md:text-5xl` expresses the type scale from your reading notes: small on phone, large on desktop. `max-w-xl mx-auto` keeps the paragraph from stretching too wide on a desktop, which matches the line-length guidance from lesson 4.5.

### The courses section

```html
<section aria-labelledby="courses-heading" id="courses"
         class="px-4 py-12">
  <h2 id="courses-heading"
      class="text-center text-2xl font-bold text-gray-900">Courses</h2>
  <ul class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 list-none p-0">
    <li>
      <h3 class="text-xl font-bold text-emerald-700">Frontend Web Development</h3>
      <p class="mt-2 text-sm text-gray-600">HTML, CSS, JavaScript, React, deployment, and portfolio projects.</p>
    </li>
    <li>
      <h3 class="text-xl font-bold text-emerald-700">Graphic Design</h3>
      <p class="mt-2 text-sm text-gray-600">Design basics, Canva, Photoshop, layouts, typography, and client work.</p>
    </li>
  </ul>
</section>
```

`grid-cols-1` stacks the course cards on a phone. `sm:grid-cols-2` puts them side by side on screens 640 px and above. `gap-6` separates them. The course title gets stronger colour and weight so it stands out from the description.

### The final call to action

```html
<section aria-labelledby="start-heading" id="start"
         class="bg-gray-50 px-4 py-12">
  <h2 id="start-heading"
      class="text-center text-2xl font-bold text-gray-900">
    Start learning today
  </h2>
  <p class="mx-auto mt-3 max-w-xl text-center text-gray-600">
    Choose a course, follow each lesson, and build real projects step by step.
  </p>
  <div class="mt-8 flex justify-center">
    <a href="#courses"
       class="rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white
              hover:bg-emerald-700 focus:outline-none focus:ring-2
              focus:ring-emerald-500 focus:ring-offset-2">
      View courses
    </a>
  </div>
</section>
```

The CTA is simple on purpose. One heading, one short paragraph, one clear action. The `focus:ring-2` classes ensure the link shows a visible focus ring when navigated by keyboard.

### The footer

```html
<footer class="bg-gray-900 px-4 py-8 text-center text-sm text-gray-400">
  <p>Bano Qabil Sahiwal</p>
  <p class="mt-1">Sahiwal, Pakistan</p>
  <p class="mt-2">2026 All rights reserved.</p>
</footer>
```

Dark background, light text, centred. The hierarchy is inverted here: the footer is the quietest part of the page by design.

---

## Step 5 in detail: refining against the design

After step 4 the page looks close but rarely perfect. Step 5 is about closing the gap.

**Open both side by side.** Put the design reference in one half of your screen and the browser in the other. If you have a Figma file, zoom it to the same size as the browser. If you are using the local spec, keep the image and notes visible. Now scan from top to bottom.

**What to check systematically:**

| Check | Method | Common fix |
| --- | --- | --- |
| Colour accuracy | Click the element in Figma; compare hex to what you used | Switch to an arbitrary value `bg-[#hex]` |
| Font size | Figma panel shows px; compare to your text-* class | Adjust the text size class |
| Spacing accuracy | Click a gap in Figma; read the px value | Adjust the gap-* or p-* class |
| Line length | Compare paragraph width at desktop | Add `max-w-prose` or `max-w-xl` |
| Responsive behaviour | Drag the browser window narrow | Fix the grid-cols breakpoint |
| Focus visible | Tab through the page with the keyboard | Add focus:ring-* classes |
| Touch target size | Tap buttons on a phone | Ensure buttons have at least py-3 |

**The refine loop.** Fix one issue, save, refresh the browser, and compare again. Do not fix ten things at once, because you can then not tell which fix solved which problem.

---

## Full design-to-code translation table

Use this as a reference when you build your own pages.

| Design element | Figma value | Tailwind class used | Reason |
| --- | --- | --- | --- |
| Header layout | horizontal auto-layout | `flex items-center justify-between` | Logo left, nav right |
| Header shadow | shadow, 0 1px 3px 0 | `shadow-sm` | Light separator line |
| Brand green | `#059669` (emerald-600) | `bg-emerald-600` | Direct palette match |
| Hero background | `#ecfdf5` (emerald-50) | `bg-emerald-50` | Light brand tint |
| Hero heading, phone | 30 px / 700 | `text-3xl font-bold` | 30 px = 3xl |
| Hero heading, desktop | 48 px / 700 | `md:text-5xl` | 48 px = 5xl |
| Hero vertical padding, phone | 64 px top/bottom | `py-16` | 64 / 4 = step 16 |
| Hero vertical padding, desktop | 96 px top/bottom | `md:py-24` | 96 / 4 = step 24 |
| Hero paragraph max width | 576 px | `max-w-xl mx-auto` | Readable line length |
| Courses layout, phone | 1 column | `grid-cols-1` | Stack on phone |
| Courses layout, tablet and up | 2 columns | `sm:grid-cols-2` | Side by side on tablet |
| Course title colour | brand green | `text-emerald-700` | Brand accent |
| Course title size | about 20 px / 700 | `text-xl font-bold` | Clear card heading |
| Button corner radius | 8 px | `rounded-lg` | lg = 8 px |
| CTA button padding | 12 px / 32 px | `py-3 px-8` | 12/4=3; 32/4=8 |
| Amount button border | 1 px emerald-600 | `border border-emerald-600` | Outline style |
| Focus ring | 2 px offset ring | `focus:ring-2 focus:ring-emerald-500` | Keyboard accessibility |
| Input border focus | emerald | `focus:border-emerald-600` | Reinforces brand on focus |
| Form max width | 448 px | `max-w-md mx-auto` | Comfortable form width |
| Footer background | `#111827` | `bg-gray-900` | Near-black |
| Footer text | `#9ca3af` | `text-gray-400` | Quiet, legible on dark |

---

## Responsive testing

You are now at step 5. Before calling the page done, test every screen size.

Open the browser DevTools (F12 on Windows, Cmd + Option + I on Mac). Click the device toolbar icon (a small phone/tablet symbol). Drag the width from 320 px up to 1280 px and watch the page change.

Check these at 320 px:

- Header: does the nav overlap the logo? If yes, consider hiding the text nav links behind a menu button on mobile.
- Hero: is the heading too large? The `text-3xl` should be fine; `text-5xl` only applies at `md:` and above.
- Courses: are they stacked in one column? The `grid-cols-1` base class handles this.
- Form: does the form fill the width without overflowing? The `max-w-md` only limits width, it does not cause overflow.
- Footer: centred text, readable? Should be fine.

Check these at 768 px and 1280 px:

- Courses: do they switch to two columns? The `sm:grid-cols-2` triggers at 640 px.
- Hero heading: does it grow to `text-5xl`? The `md:text-5xl` triggers at 768 px.
- Form: centred with `mx-auto`? It should sit in the middle of the page on wide screens.

If something looks wrong, open the design reference and check what it says at that width.

---

## Common mistakes and how to fix them

| Mistake | What it looks like | Fix |
| --- | --- | --- |
| Styling before structure | HTML has many `<div>` tags with classes, no semantic tags | Rewrite the HTML skeleton first, then re-add classes |
| Missing responsive classes | Course cards stay in two columns even on 320 px phone | Add the `grid-cols-1` base class and the breakpoint prefix |
| Wrong arbitrary colour | Background looks slightly off | Open Dev Mode, copy the hex exactly, use `bg-[#hex]` |
| No focus styles | Tabbing the page shows no visible indicator | Add `focus:ring-2` classes to all interactive elements |
| Long lines on desktop | Text stretches full width on 1280 px screen | Add `max-w-prose` or `max-w-2xl mx-auto` to paragraphs |
| Text contrast too low | Body text looks faded on a bright background | Switch to a darker text colour, `text-gray-800` at minimum |

---

## Workflow diagram: the whole picture

<figure markdown>
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-full-wf" style="max-width:100%;height:auto">
<title id="svg-full-wf">A complete workflow diagram showing two phases. Phase one is preparation: ask client questions and read the design reference to collect values. Phase two is build: write HTML structure, add layout classes, add style classes, then refine against the design. A final check confirms the page is accessible and responsive before it is done.</title>
<g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
  <rect x="14" y="14" width="200" height="170" rx="10"/>
  <rect x="14" y="210" width="200" height="170" rx="10"/>
</g>
<g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
  <rect x="240" y="14" width="200" height="170" rx="10"/>
  <rect x="240" y="210" width="200" height="170" rx="10"/>
  <rect x="466" y="14" width="200" height="170" rx="10"/>
  <rect x="466" y="210" width="200" height="170" rx="10"/>
</g>
<g font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#1f1f1c" text-anchor="middle">
  <g><text x="114" y="38">Preparation phase</text></g>
  <g><text x="114" y="234">Build phase</text></g>
  <g><text x="340" y="38">2. Structure</text></g>
  <g><text x="340" y="234">4. Style</text></g>
  <g><text x="566" y="38">3. Layout</text></g>
  <g><text x="566" y="234">5. Refine</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65">
  <g><text x="24" y="60">Ask client questions</text></g>
  <g><text x="24" y="78">Collect type scale</text></g>
  <g><text x="24" y="96">Collect colour palette</text></g>
  <g><text x="24" y="114">List sections in order</text></g>
  <g><text x="24" y="132">Note breakpoints</text></g>
  <g><text x="24" y="254">Add colours, font sizes,</text></g>
  <g><text x="24" y="272">weights, border radius,</text></g>
  <g><text x="24" y="290">hover states, shadows</text></g>
  <g><text x="24" y="308">Work top to bottom,</text></g>
  <g><text x="24" y="326">one section at a time</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65">
  <g><text x="250" y="60">Write header, main,</text></g>
  <g><text x="250" y="78">section, footer tags</text></g>
  <g><text x="250" y="96">Add aria-labelledby</text></g>
  <g><text x="250" y="114">Use label + input pairs</text></g>
  <g><text x="250" y="132">No classes yet</text></g>
  <g><text x="250" y="254">Compare browser and</text></g>
  <g><text x="250" y="272">Figma side by side</text></g>
  <g><text x="250" y="290">Fix colour, spacing,</text></g>
  <g><text x="250" y="308">and size mismatches</text></g>
  <g><text x="250" y="326">Test on 320 px phone</text></g>
</g>
<g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65">
  <g><text x="476" y="60">Add flex or grid first</text></g>
  <g><text x="476" y="78">Set gap and padding</text></g>
  <g><text x="476" y="96">Set max-w and w-full</text></g>
  <g><text x="476" y="114">Add responsive prefixes</text></g>
  <g><text x="476" y="132">Check layout at 320 px</text></g>
  <g><text x="476" y="254">Tab through page:</text></g>
  <g><text x="476" y="272">focus ring visible?</text></g>
  <g><text x="476" y="290">Labels read aloud?</text></g>
  <g><text x="476" y="308">Page is done when</text></g>
  <g><text x="476" y="326">all checks pass</text></g>
</g>
<defs>
  <marker id="bq-arr-fw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
  </marker>
</defs>
<g stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#bq-arr-fw)">
  <line x1="214" y1="100" x2="234" y2="100"/>
  <line x1="440" y1="100" x2="460" y2="100"/>
  <line x1="214" y1="295" x2="234" y2="295"/>
  <line x1="440" y1="295" x2="460" y2="295"/>
  <line x1="114" y1="185" x2="114" y2="205"/>
  <line x1="340" y1="185" x2="340" y2="205"/>
  <line x1="566" y1="185" x2="566" y2="205"/>
</g>
<g font-family="Inter, sans-serif" font-size="9" fill="#6b6b65" text-anchor="middle">
  <g><text x="114" y="199">go to build phase</text></g>
  <g><text x="340" y="199">add layout classes</text></g>
  <g><text x="566" y="199">add style classes</text></g>
</g>
</svg>
<figcaption>The complete workflow from client questions to a finished, accessible, responsive page. The preparation phase feeds the build phase. Within the build phase, structure comes before layout, and layout comes before style.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    کسی بھی ڈیزائن کو ویب سائٹ میں بدلنے کے لیے پانچ منظم قدم ہیں۔ پہلا: فیگما فائل کو غور سے پڑھیں، رنگ، فونٹ سائز، اور خالی جگہ نوٹ کریں۔ دوسرا: کوئی بھی Tailwind کلاس لگانے سے پہلے صرف semantic HTML لکھیں، جیسے header، main، section، footer اور مناسب heading tags۔ یہ accessibility کے لیے ضروری ہے جو آپ نے سبق 4.4 میں سیکھا تھا۔ تیسرا: flex، grid، gap اور max-w کلاسیں ڈال کر layout سیٹ کریں۔ چوتھا: رنگ، فونٹ، padding اور border radius ڈیزائن کے مطابق شامل کریں۔ پانچواں: browser کو Figma کے ساتھ رکھ کر ہر فرق درست کریں اور 320 px phone سے لے کر desktop تک ہر screen پر چیک کریں۔

---

### Try this

Build the complete Bano Qabil landing page from this lesson in a single HTML file using Tailwind CDN. Then do these checks yourself:

1. Open the page and press Tab six times. Does every button and link show a visible focus ring?
2. Narrow the browser to 320 px. Do the course cards stack in a single column?
3. Open a free screen reader (NVDA on Windows is free) and navigate the page. Does it announce the page `<h1>`, then each `<h2>` section?
4. Open the Bano Qabil Sahiwal Figma file again. Follow the five steps from this lesson to compare your build with the design. Note which step takes the longest.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up.

1. What are the five steps of the workflow, in order?
2. Why do you write the HTML structure before adding Tailwind classes?
3. Which HTML tag marks the main content of a page, and why does this matter for screen readers?
4. Why should the course cards use real headings instead of plain bold text only?
5. The courses section uses `grid-cols-1 sm:grid-cols-2`. What does it look like on a 320 px phone and on a 768 px tablet?
6. Name two things from the "refine" step that relate back to the accessibility ideas in Chapter 4.

---

## What's next

Chapter 5 is done. You can style a page with Tailwind and build it from a design using a clear, repeatable workflow. The next chapter is Git and GitHub: tools that let you save and share your work safely, and that every developer uses every day.

[Next chapter: 6. Git and GitHub &rarr;](../chapter-06-git-and-github/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Bano Qabil Sahiwal website design](https://www.figma.com/community/file/1578793749331470425/bano-qabil-sahiwal-website-design) the Figma community file used in this lesson.
- [Tailwind docs: Responsive design](https://tailwindcss.com/docs/responsive-design)
- [web.dev: Learn Accessibility](https://web.dev/learn/accessibility) (building on the Chapter 4 foundation)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[workflow]: A set order of steps you follow to finish a job. (Roman Urdu: kaam mukammal karne ke tay shuda qadam, ek ke baad ek)
*[landing page]: A single page built to make a visitor take one action. (Roman Urdu: ek hi maqsad wala page)
*[call to action]: The main button or link you want people to click. (Roman Urdu: asal button jo dabwana ho)
*[trust signal]: Proof on a page that builds confidence, like impact numbers. (Roman Urdu: bharosa barhane wali cheez)
*[client brief]: The notes and answers a client gives you about the job. (Roman Urdu: client ki di hui maaloomat)
*[mockup]: A picture of how the finished page should look. (Roman Urdu: design ki tasveer)
*[semantic HTML]: HTML that uses tags whose names describe the content's meaning, not just its appearance. (Roman Urdu: woh HTML tags jo content ka matlab bhi batate hain)
*[aria-labelledby]: An HTML attribute that links an element to a visible label by id, helping screen readers. (Roman Urdu: screen reader ko element ka naam batane wala attribute)
*[mobile-first]: Writing base CSS for phones first, then adding classes for larger screens. (Roman Urdu: pehle mobile ke liye style likhna, phir bade screen ke liye)
