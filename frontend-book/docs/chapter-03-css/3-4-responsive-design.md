---
lesson_id: frontend.ch03.l04
title: "3.4 Responsive design"
chapter: 3
order: 4
estimated_minutes: 40
prerequisites:
  - frontend.ch03.l03
---

# 3.4 Responsive design

Most people in Pakistan open websites on an Android phone. They rarely sit at a desktop. So your page must look good on a small screen first. In this lesson you learn to build one page that fits a phone, a tablet, and a desktop.

## What you'll know by the end

- What responsive design means and why phones come first.
- How mobile-first thinking changes the way you write CSS.
- Why the viewport meta tag is required on every page.
- How to use media queries to add styles for bigger screens.
- Which fluid units to use: percentages, `vw`, `vh`, `rem`, and `clamp()`.
- How to make images smaller on phones with `srcset`.

---

## What responsive design means

Responsive design means one page changes its layout to fit the screen. The same HTML and CSS works on a phone, a tablet, and a desktop. You do not build three separate sites. You build one site that responds to the screen size.

A phone screen is narrow. A desktop screen is wide. Your job is to make the content readable on both. Text should not be tiny. Buttons should not be hard to tap. Columns that sit side by side on a desktop often stack on a phone.

The diagram below shows how the same content takes different shapes across devices.

<figure markdown>
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-breakpoints" style="max-width:100%;height:auto">
  <title id="svg-breakpoints">Three devices: a phone showing a single-column layout, a tablet showing two columns, and a desktop showing three columns side by side.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="44" y="45" width="84" height="160" rx="11"/>
    <rect x="180" y="55" width="210" height="150" rx="11"/>
    <rect x="430" y="25" width="300" height="180" rx="11"/>
  </g>
  <g fill="#6b6b65" stroke="none">
    <rect x="72" y="52" width="28" height="4" rx="2"/>
    <rect x="54" y="66" width="64" height="12" rx="2"/>
    <rect x="54" y="86" width="64" height="48" rx="3"/>
    <rect x="54" y="142" width="64" height="56" rx="3"/>
    <rect x="190" y="70" width="88" height="122" rx="3"/>
    <rect x="292" y="70" width="88" height="122" rx="3"/>
    <rect x="440" y="37" width="280" height="12" rx="2"/>
    <rect x="440" y="58" width="84" height="140" rx="3"/>
    <rect x="538" y="58" width="84" height="140" rx="3"/>
    <rect x="636" y="58" width="84" height="140" rx="3"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#6b6b65">
    <text x="86" y="225" font-size="13" font-weight="600" fill="#1f1f1c">Phone</text>
    <text x="86" y="239" font-size="11">one column</text>
    <text x="285" y="225" font-size="13" font-weight="600" fill="#1f1f1c">Tablet</text>
    <text x="285" y="239" font-size="11">two columns</text>
    <text x="580" y="225" font-size="13" font-weight="600" fill="#1f1f1c">Desktop</text>
    <text x="580" y="239" font-size="11">three columns</text>
  </g>
</svg>
<figcaption>One set of HTML and CSS. Three different layouts. The phone gets one column, the tablet two, the desktop three.</figcaption>
</figure>

---

## Mobile-first thinking

Mobile-first means you write the phone styles first. You start with the small screen. Then you add styles for bigger screens on top. This keeps your base CSS simple.

Why start small? A phone has less space, so the layout is usually a single column. That is the easiest case to write. When the screen gets wider, you add rules to spread things out.

The opposite approach is desktop-first: you write wide styles first, then override them to make things smaller. That approach tends to produce more overrides and harder to read code.

| Approach | Base styles | Query type | Best for |
| --- | --- | --- | --- |
| Mobile-first | Phone layout | `min-width` (add rules as screen grows) | Most projects. Phone users are the majority. |
| Desktop-first | Wide layout | `max-width` (remove rules as screen shrinks) | Old projects or very complex desktop layouts. |

```css
/* Base styles: these apply to phones first */
.card {
  width: 100%;
  padding: 16px;
}

/* Bigger screens get extra rules added on top */
@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}
```

The `.card` is full width by default. That is the phone style. On screens 768px and wider, the card becomes half width. You only add what you need for the bigger screen.

---

## The viewport meta tag

You saw this tag back in lesson 2.1. It goes inside the `<head>` of your page. Without it, phones pretend to be a wide desktop and shrink your whole page. Your text becomes too small to read.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` tells the phone to use its real width. `initial-scale=1.0` sets the zoom to normal. Add this tag to every page you build. Media queries do not work correctly without it.

---

## Media queries

A media query applies CSS only when a condition is true. The most common condition is screen width. You write rules that turn on above a certain width.

<figure markdown>
<svg viewBox="0 0 660 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-mq-anatomy" style="max-width:100%;height:auto">
  <title id="svg-mq-anatomy">Anatomy of a media query rule. The at-rule keyword is @media. The condition in parentheses is min-width 768px. The block in curly braces holds the CSS that applies when the condition is true.</title>
  <defs>
    <marker id="bq-arrow-mq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
  </defs>
  <rect x="12" y="18" width="636" height="56" rx="8" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <g font-family="'JetBrains Mono', monospace" font-size="16" fill="#1f1f1c">
    <text x="34" y="53">@media</text>
    <text x="140" y="53">(min-width: 768px)</text>
    <text x="408" y="53">{ ... }</text>
  </g>
  <g stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#bq-arrow-mq)">
    <line x1="70" y1="118" x2="70" y2="64"/>
    <line x1="232" y1="118" x2="232" y2="64"/>
    <line x1="438" y1="118" x2="438" y2="64"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="70" y="138">at-rule keyword</text>
    <text x="232" y="138">the condition</text>
    <text x="438" y="138">the CSS to apply</text>
  </g>
</svg>
<figcaption>A media query has three parts: the @media keyword, the condition in parentheses, and the CSS block that applies when the condition is true.</figcaption>
</figure>

```css
@media (min-width: 768px) {
  .menu {
    display: flex;
    gap: 24px;
  }
}
```

This means: when the screen is 768px wide or more, make the menu a flex row. Below 768px, these rules do nothing. So phones skip them, and the menu stays in its default phone layout.

You can have more than one media query. A common pattern uses one for tablets and one for desktops.

!!! tip
    Start with the phone layout. Then slowly widen your browser window. Watch the page. When it starts to look bad or too stretched, that is where you add a breakpoint. Let the design tell you where to break, not a fixed rule.

---

## Common breakpoints

A breakpoint (Roman Urdu: woh chaurai jahan layout badalta hai) is the width where your layout changes. These three widths are common starting points:

- Around `640px` for large phones.
- Around `768px` for tablets.
- Around `1024px` for laptops and desktops.

Treat these as rough guides, not strict rules. Every design is different. Pick the width where your own page needs to change. The numbers above are just a friendly place to start.

---

## Fluid units

Fixed pixel widths do not bend. Fluid units do. They scale with the screen or with the font size. Here are the ones you will use most.

```css
.box {
  width: 90%;          /* 90% of the parent's width */
}

.hero {
  width: 100vw;        /* full width of the viewport */
  height: 50vh;        /* half the height of the viewport */
}

h1 {
  font-size: 2rem;     /* 2 times the root font size */
  margin-bottom: 1rem;
}
```

A percentage is relative to the parent element. `vw` means viewport width, so `100vw` is the full screen width. `vh` means viewport height. `rem` is relative to the root font size, which is usually 16px. Use `rem` for text and spacing so everything scales together.

| Unit | Relative to | Good for | Avoid for |
| --- | --- | --- | --- |
| `px` | Nothing, fixed | Borders, shadows, small icons | Layout widths on responsive pages |
| `%` | Parent element's size | Column widths inside a container | Top-level layout (use fr instead) |
| `vw` | Viewport width | Full-bleed sections, hero areas | Font size (can get too big or small) |
| `vh` | Viewport height | Full-screen sections | Heights that contain text (use min-height) |
| `rem` | Root font size (16px default) | Font sizes, padding, margin | Width that should relate to the viewport |
| `em` | Nearest parent font size | Padding inside buttons (scales with button text) | Top-level spacing (rem is simpler) |
| `fr` | Leftover grid space | Grid column and row tracks | Outside a grid container |

Now meet `clamp()`. It picks a size that flexes between a minimum and a maximum.

```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

This reads: never smaller than `1.5rem`, never bigger than `3rem`, and `5vw` in between. So the heading grows on wide screens and shrinks on phones, but stays inside safe limits. One line, no media query needed.

---

## Responsive images

A big image on a small phone is wasteful. The browser downloads all those pixels the phone cannot even show. The `srcset` attribute lets the browser pick a smaller image on a phone.

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w"
  alt="A student coding">
```

You list a few image sizes. The browser checks the screen and picks the best fit. A phone grabs the 400px version. A desktop grabs the 800px version. The phone saves data, and the page loads faster.

!!! note "A note on israf"
    Many users in Pakistan pay for every megabyte. A huge image wastes their data
    and their money. Sending a giant photo to a small phone screen is israf, plain
    waste. Serve images the right size and your users keep more of their balance.

---

## Testing in DevTools

You met the device toolbar in lesson 1.4. It lets you see your page at phone, tablet, and desktop sizes without a real device.

Open DevTools with `F12`. Click the device toolbar icon, the little phone and tablet symbol. Now pick a device from the dropdown, or drag the edges to test any width. Watch your media queries turn on and off as you resize.

??? note urdu "اردو میں مزید وضاحت"
    موبائل فرسٹ کا مطلب ہے کہ پہلے آپ چھوٹی اسکرین یعنی فون کے لیے اسٹائل لکھیں۔ اس کے بعد آپ بڑی اسکرین کے لیے میڈیا کوئری کے ذریعے اضافی اسٹائل شامل کرتے ہیں۔ میڈیا کوئری ایک شرط ہوتی ہے، جیسے min-width: 768px، جو صرف اسی وقت لاگو ہوتی ہے جب اسکرین اتنی چوڑی ہو۔ rem یونٹ روٹ فونٹ سائز کے حساب سے ہوتا ہے، عام طور پر سولہ پکسل۔ vw پوری اسکرین کی چوڑائی ہے۔ clamp() فنکشن تین اقدار لیتا ہے: کم سے کم، درمیانی، اور زیادہ سے زیادہ۔ اس طرح فون پر لے آؤٹ سادہ رہتا ہے اور بڑی اسکرین پر چیزیں پھیل جاتی ہیں۔

---

## Project: make your contact-form page responsive

Remember the contact form you built in Chapter 2? Now you make it look great on every screen. You will write a mobile-first stylesheet, then add one media query for bigger screens.

First, make sure the viewport tag is in your `<head>`.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact us</title>
  <link rel="stylesheet" href="style.css">
</head>
```

Here is a simple version of the form. The name and email fields sit in their own rows.

```html
<form class="contact-form">
  <div class="field">
    <label for="name">Name</label>
    <input id="name" type="text">
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email">
  </div>
  <div class="field">
    <label for="message">Message</label>
    <textarea id="message"></textarea>
  </div>
  <button type="submit">Send</button>
</form>
```

Now write the mobile-first CSS. On a phone, every field stacks in one column. This is the base style.

```css
/* Mobile first: one column, full width */
body {
  font-size: 1rem;
  padding: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.field {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
}
```

Everything is full width and stacked. This looks clean on a phone. The form uses `max-width: 500px` so it never gets too wide, and `margin: 0 auto` centers it.

Now add one media query for tablets and desktops. On a wider screen, you place the name and email fields side by side.

```css
/* Tablet and up: name and email side by side */
@media (min-width: 768px) {
  .contact-form {
    max-width: 700px;
  }

  .top-row {
    display: flex;
    gap: 1rem;
  }

  .top-row .field {
    flex: 1;
  }
}
```

To use this, wrap the name and email fields in a `<div class="top-row">` in your HTML.

```html
<div class="top-row">
  <div class="field">
    <label for="name">Name</label>
    <input id="name" type="text">
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email">
  </div>
</div>
```

Below 768px, the `.top-row` is a plain block, so its fields still stack. At 768px and up, it becomes a flex row, and the two fields sit side by side. The message box and button stay full width on every screen.

Now test it. Open the page, press `F12`, and click the device toolbar from lesson 1.4. Try a phone width like 375px. The fields should stack. Then drag to 800px. The name and email should jump side by side. That is your media query working.

---

### Try this (12 minutes)

1. Open the contact form from Chapter 2.
2. Write the mobile CSS first, with all fields stacked.
3. Add one media query at `768px`.
4. Inside that media query, make only the name and email fields sit side by side.
5. Test at `375px`, `768px`, and `1024px` in the Device toolbar.

If the layout breaks on phone size, fix the phone first. Mobile is the base.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does mobile-first mean when you write CSS?
2. Why is the viewport meta tag required on a responsive page?
3. What does `@media (min-width: 768px)` do?
4. Why is `srcset` good for users on a slow or costly connection?

---

## What's next

Chapter 3 is done. You can now style a page and lay it out by hand with the box model, flexbox, grid, and responsive design. Before you reach for faster styling tools, the next chapter steps back to the most important question of all: how to design things people can actually use. You will learn usability, how people think and scan, information architecture, and accessibility, so that every visual choice you make later has a reason behind it.

[Next chapter: 4. Design and UX Foundations &rarr;](../chapter-04-design-ux-foundations/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Learn Responsive Design](https://web.dev/learn/design)
- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[responsive design]: One page that changes its layout to fit any screen size. (Roman Urdu: aisa design jo har screen size ke mutabiq badal jaye)
*[mobile-first]: Writing phone styles first, then adding styles for bigger screens. (Roman Urdu: pehle phone ke liye style likhna, phir bari screen ke liye)
*[viewport]: The visible area of a web page on the screen. (Roman Urdu: screen par nazar aane wala page ka hissa)
*[media query]: A CSS rule that applies styles only when a condition like screen width is true. (Roman Urdu: aisa CSS rule jo sirf kisi shart par lagu hota hai)
*[breakpoint]: The screen width where your layout changes. (Roman Urdu: woh width jahan layout badalta hai)
*[rem]: A unit relative to the root font size, usually 16px. (Roman Urdu: root font size ke hisab se unit, aam tor par 16px)
*[vw]: Viewport width, where 100vw is the full screen width. (Roman Urdu: screen ki chaurai, 100vw poori screen)
*[clamp]: A CSS function that keeps a size between a minimum and a maximum. (Roman Urdu: aisa function jo size ko kam se kam aur zyada se zyada ke beech rakhta hai)
