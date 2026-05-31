---
lesson_id: frontend.ch05.l02
title: "5.2 Building real components with Tailwind"
chapter: 5
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch05.l01
---

# 5.2 Building real components with Tailwind

In 4.1 you learned the Tailwind utilities and the responsive prefixes. Now you turn those small classes into real pieces of a website. You will build a card, a button system, a navbar, and a hero section. These are the parts you see on almost every site you visit.

## What you'll know by the end

- Build a card with an image area, a title, text, and a button.
- Create a primary and a secondary button that share base classes.
- Add `hover:` and `focus:` states to make buttons feel alive.
- Build a navbar with a mobile hamburger using no JavaScript.
- Build a full-width hero section with responsive text sizes.
- Reuse classes with `@apply` and add brand colours with `@theme`.

---

## The building blocks

Before writing any code, look at what you are about to build. Every common website is made from a small set of repeated pieces.

| Component | Main purpose | Key Tailwind classes |
| --- | --- | --- |
| Card | Group related content in a box | `rounded-xl shadow-md overflow-hidden` |
| Button | Trigger an action | `rounded-lg px-4 py-2 font-medium` |
| Navbar | Navigation across the top | `flex items-center justify-between` |
| Hero section | First big impression on a page | `w-full text-center py-20` |
| Form | Collect user input | `flex flex-col gap-4 max-w-md` |

This table is your map for the lesson. Each row becomes a full code example below.

---

## The card

A card is a small box that groups related content. It usually has a rounded shape, a soft shadow, some padding, and content inside.

```html
<div class="max-w-sm rounded-xl shadow-md overflow-hidden bg-white">
  <div class="h-40 bg-gray-200"></div>
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">Frontend Basics</h3>
    <p class="text-gray-600 mb-4">
      Learn HTML, CSS, and Tailwind step by step. No prior coding needed.
    </p>
    <button class="bg-teal-600 text-white rounded-lg px-4 py-2">
      Start now
    </button>
  </div>
</div>
```

The diagram below shows how the layers of a card relate to the Tailwind classes that create them.

<figure markdown>
<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-card-title" style="max-width:100%;height:auto">
  <title id="svg-card-title">A card component broken into four concentric layers. The outermost layer is the card shell with rounded-xl and shadow-md. Inside that is the image area with h-40 and bg-gray-200. Below it is the padding container with p-6. Innermost is the content row with title, text, and button.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="20" width="380" height="290" rx="12"/>
    <rect x="20" y="20" width="380" height="100" rx="8" fill="#e5e7eb" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="44" y="136" width="332" height="148" rx="6" fill="#f9fafb" stroke="#6b6b65" stroke-width="1" stroke-dasharray="4 3"/>
    <rect x="60" y="238" width="120" height="28" rx="5" fill="#14b8a6"/>
  </g>
  <g font-family="Inter, sans-serif" fill="#1f1f1c">
    <g>
      <text x="180" y="76" font-size="13" text-anchor="middle" fill="#6b6b65">Image area  h-40 bg-gray-200</text>
    </g>
    <g>
      <text x="210" y="158" font-size="12" fill="#6b6b65" text-anchor="middle">Content padding  p-6</text>
    </g>
    <g>
      <text x="210" y="185" font-size="14" font-weight="600">Frontend Basics</text>
    </g>
    <g>
      <text x="210" y="208" font-size="11" fill="#6b6b65" text-anchor="middle">Learn HTML, CSS, and Tailwind</text>
      <text x="210" y="224" font-size="11" fill="#6b6b65" text-anchor="middle">one small component at a time</text>
    </g>
    <g>
      <text x="120" y="256" font-size="11" fill="#ffffff" font-weight="600" text-anchor="middle">Start now</text>
    </g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <g>
      <text x="430" y="45" text-anchor="start">Card shell</text>
      <text x="430" y="59" text-anchor="start">rounded-xl shadow-md</text>
      <text x="430" y="73" text-anchor="start">overflow-hidden bg-white</text>
    </g>
  </g>
  <g stroke="#6b6b65" stroke-width="1" stroke-dasharray="3 3" fill="none">
    <line x1="400" y1="55" x2="425" y2="55"/>
  </g>
</svg>
<figcaption>A card has four layers: the outer shell sets shape and shadow, the image area fills the top, the padding container spaces the content, and the content rows hold text and the button.</figcaption>
</figure>

Here is what each class does in the card.

| Class | What it does |
| --- | --- |
| `max-w-sm` | Caps the card width so it does not stretch too wide |
| `rounded-xl` | Rounds all four corners to 12px |
| `shadow-md` | Adds a soft lifted shadow |
| `overflow-hidden` | Clips the image corners so they follow the card curve |
| `h-40 bg-gray-200` | Creates a placeholder image block |
| `p-6` | Adds 24px of padding inside the content area |
| `mb-2` and `mb-4` | Adds space below the heading and the paragraph |

!!! tip
    Start from a plain HTML structure first. Write the boxes and text with no classes. Then add Tailwind classes one by one. Do not try to style and structure at the same time. You will get confused fast.

---

## The button system

Most buttons on a site share the same shape and size. Only the colour changes. So you write the shared classes once, then change the colour per button.

```html
<button class="rounded-lg px-4 py-2 font-medium
               hover:opacity-90 focus:outline-2 focus:outline-teal-700
               bg-teal-600 text-white">
  Primary
</button>

<button class="rounded-lg px-4 py-2 font-medium
               hover:opacity-90 focus:outline-2 focus:outline-teal-700
               bg-white text-teal-600 border border-teal-600">
  Secondary
</button>
```

Both buttons share `rounded-lg px-4 py-2 font-medium`. That is the base look. The primary button uses a filled teal background. The secondary button uses a white background with a teal border. The `hover:opacity-90` makes the button slightly fade when the mouse is over it. The `focus:outline-2` shows a clear ring when a user tabs to the button with the keyboard. That focus ring matters for people who do not use a mouse.

You can see the problem already. You typed that long class string twice. If you have ten buttons, you repeat it ten times. That is a lot of copy and paste. Soon we fix this with `@apply`.

---

## The navbar with a hamburger (no JavaScript)

A navbar holds your logo and your links. On wide screens you show the links in a row. On phones you hide them behind a hamburger button. Most sites use JavaScript for this. You will use plain HTML instead.

The trick is the `<details>` and `<summary>` elements. The `<summary>` is the part you always see, so it becomes your hamburger. Everything else inside `<details>` is hidden until you click. When you click the summary, the browser opens the box for you.

```html
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <span class="text-lg font-bold text-teal-600">BanoQabil</span>

  <!-- Desktop links: hidden on phones, shown from md and up -->
  <div class="hidden md:flex gap-6">
    <a href="#" class="hover:text-teal-600">Home</a>
    <a href="#" class="hover:text-teal-600">Courses</a>
    <a href="#" class="hover:text-teal-600">Contact</a>
  </div>

  <!-- Mobile hamburger: shown on phones, hidden from md and up -->
  <details class="md:hidden relative">
    <summary class="cursor-pointer list-none px-3 py-2 border rounded">
      Menu
    </summary>
    <div class="absolute right-0 mt-2 w-40 bg-white shadow rounded p-2 flex flex-col gap-2">
      <a href="#" class="hover:text-teal-600">Home</a>
      <a href="#" class="hover:text-teal-600">Courses</a>
      <a href="#" class="hover:text-teal-600">Contact</a>
    </div>
  </details>
</nav>
```

The `<nav>` uses `flex items-center justify-between` to push the logo to the left and the menu to the right. The desktop links use `hidden md:flex`, so they stay hidden on phones and turn into a row from medium screens up. The `<details>` block uses `md:hidden`, so it only shows on phones.

When a user taps the summary, the inner `div` appears. Tap again and it closes. No JavaScript runs at all. The `absolute right-0 mt-2` classes float the menu just below the button. The `list-none` hides the small default arrow that browsers add to a summary.

!!! note "Did you know"
    The `<details>` element gives you a working dropdown with zero JavaScript. The browser handles open and close on its own. People used to write many lines of script for this exact thing.

??? note urdu "اردو میں مزید وضاحت"
    موبائل پر مینو چھپانے کے لیے عام طور پر جاوا اسکرپٹ استعمال ہوتی ہے۔ لیکن ایچ ٹی ایم ایل کا `<details>` عنصر یہ کام خود کر دیتا ہے۔ `<summary>` وہ حصہ ہے جو ہر وقت نظر آتا ہے، یعنی آپ کا ہیمبرگر بٹن۔ جب صارف اس پر کلک کرتا ہے تو اندر کا مینو کھل جاتا ہے، اور دوبارہ کلک پر بند ہو جاتا ہے۔ اس میں کوئی جاوا اسکرپٹ نہیں چلتی، براؤزر خود سب کچھ سنبھال لیتا ہے۔ ٹیل وِنڈ میں `hidden md:flex` کا مطلب ہے کہ یہ حصہ فون پر چھپا رہے گا اور میڈیم سائز اسکرین سے ظاہر ہو گا۔

---

## The hero section

A hero is the big top section of a page. It has a large heading, a short subheading, and one call to action button. It usually fills the full width.

```html
<section class="w-full px-6 py-20 text-center bg-gray-50">
  <h1 class="text-3xl md:text-5xl font-bold mb-4">
    Learn frontend the simple way
  </h1>
  <p class="text-gray-600 mb-8 max-w-xl mx-auto">
    Free, self paced lessons in plain English and Roman Urdu.
  </p>
  <button class="bg-teal-600 text-white rounded-lg px-6 py-3 hover:opacity-90">
    Browse courses
  </button>
</section>
```

The `w-full` makes the section span the full width. The `px-6 py-20` adds breathing room on the sides and lots of space top and bottom. The `text-center` centers everything. The most useful part is `text-3xl md:text-5xl`. On a phone the heading is large. On a wider screen it grows even bigger. The `max-w-xl mx-auto` on the subheading stops the line from getting too long, and centers it.

---

## Reusing classes with @apply

Remember the long button class string you repeated. You can move it into one CSS class with `@apply`. Then you write `class="btn"` instead.

```css
.btn {
  @apply rounded-lg px-4 py-2 font-medium hover:opacity-90 focus:outline-2;
}
```

Now your HTML is much shorter.

```html
<button class="btn bg-teal-600 text-white">Primary</button>
<button class="btn bg-white text-teal-600 border border-teal-600">Secondary</button>
```

Use `@apply` only for things you truly repeat, like buttons or cards. Do not make a class for every element. If you wrap every single thing, you lose the speed that Tailwind gives you. Use it sparingly.

---

## Adding brand colours with @theme

You used `teal-600` a lot. But your brand may have its own exact colour. In Tailwind v4 you add your colours in CSS with `@theme`.

```css
@theme {
  --color-brand: #0fab95;
}
```

Now Tailwind builds new classes from that name. You can write `bg-brand` for the background and `text-brand` for the text.

```html
<button class="bg-brand text-white rounded-lg px-4 py-2">Brand button</button>
```

You add your brand colours once, then reuse them everywhere. If the brand colour ever changes, you edit one line and the whole site updates.

---

## Hands-on: rebuild the Chapter 2 contact form

In Chapter 2 you built a contact form with plain HTML. Now you give it the Tailwind look. Keep it mobile first, so it looks good on a phone before anything else.

```html
<form class="max-w-md mx-auto p-6 flex flex-col gap-4">
  <div>
    <label class="block mb-1 font-medium" for="name">Name</label>
    <input id="name" type="text" class="border rounded p-2 w-full">
  </div>

  <div>
    <label class="block mb-1 font-medium" for="email">Email</label>
    <input id="email" type="email" class="border rounded p-2 w-full">
  </div>

  <div>
    <label class="block mb-1 font-medium" for="message">Message</label>
    <textarea id="message" class="border rounded p-2 w-full" rows="4"></textarea>
  </div>

  <button type="submit" class="bg-brand text-white rounded p-2 hover:opacity-90">
    Send message
  </button>
</form>
```

The `max-w-md mx-auto` centers the form and keeps it from getting too wide. The `flex flex-col gap-4` stacks every field with even space between them. Each input shares `border rounded p-2 w-full`. The `w-full` makes inputs fill the form width, which is exactly what you want on a phone. The labels use `block mb-1` so they sit above the input with a small gap. Try this in your browser and resize the window.

---

### Try this (15 minutes)

1. Pick one component from this lesson: the card, the button, or the form.
2. Rebuild it in a fresh HTML file using Tailwind classes.
3. Change only three values: one colour, one spacing class, and one border radius.
4. Resize the browser and check that it still works on a phone width.
5. Write one sentence explaining which classes control the component's shape.

Changing a component carefully teaches you which classes matter and which ones are decoration.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Which classes give a card its rounded corners and its soft shadow?
2. Why do the primary and secondary buttons share some classes?
3. Which two HTML elements let you build a hamburger menu with no JavaScript?
4. In Tailwind v4, how do you add a brand colour you can use as `bg-brand`?

---

## What's next

You can now build the common parts of a website with Tailwind. Real projects rarely start from a blank page though. A designer hands you a file, and you turn it into code. In 4.3 you learn to read a Figma design like a developer.

[Next lesson: 4.3 Reading Figma like a developer &rarr;](5-3-reading-figma.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Tailwind docs: Reusing styles](https://tailwindcss.com/docs/styling-with-utility-classes#reusing-styles)
- [MDN: the details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[component]: A reusable piece of a website, like a card or a button. (Roman Urdu: website ka dobara istemaal hone wala hissa)
*[card]: A rounded box that groups related content with a shadow and padding. (Roman Urdu: ek box jis mein milti julti cheezen rakhi jati hain)
*[hero section]: The big top section of a page with a heading and a call to action. (Roman Urdu: page ka sab se upar wala bara hissa)
*[hamburger menu]: A small button on phones that opens a hidden list of links. (Roman Urdu: phone par menu kholne wala chhota button)
*[@apply]: A CSS rule that puts several Tailwind utilities into one class. (Roman Urdu: kai Tailwind classes ko ek class mein rakhne ka tareeqa)
*[theme]: Your set of brand colours and values that Tailwind builds classes from. (Roman Urdu: aap ke brand ke rang aur values ka set)
