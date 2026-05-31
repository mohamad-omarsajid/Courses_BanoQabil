---
lesson_id: frontend.ch03.l02
title: "3.2 Flexbox"
chapter: 3
order: 2
estimated_minutes: 35
prerequisites:
  - frontend.ch03.l01
---

# 3.2 Flexbox

You learned how one box looks with the box model. But real pages have many boxes sitting next to each other. Lining up boxes in a neat row used to be hard and full of hacks. Flexbox fixes that with a few simple lines of CSS.

## What you'll know by the end

- Why flexbox exists and the problem it solves.
- How to turn a parent into a flex container with `display: flex`.
- The difference between the main axis and the cross axis.
- How to use `justify-content`, `align-items`, and `gap`.
- How to wrap items onto new lines with `flex-wrap`.
- How items share space with `flex-grow`, `flex-shrink`, and `flex-basis`.

---

## The problem flexbox solves

Say you want three boxes in a row, with even space between them. In the old days you tried `float` or `inline-block`. Both broke easily. Spacing was messy and centering felt impossible.

Flexbox gives you a clean way to lay out boxes. You put items in a row or a column. Then you control spacing and alignment with a few properties.

The key idea: **you give power to the parent, not the children.** One rule on the container controls how all its children arrange themselves. That is why flexbox feels so much simpler than the old float tricks.

---

## Turn a parent into a flex container

You add `display: flex` to the parent element. That parent is now a flex container (Roman Urdu: woh dabba jis par flex lagaya gaya ho). Its direct children become flex items automatically.

```html
<div class="row">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```css
.row {
  display: flex;
}
```

The `.row` is the container. The three `.item` boxes are the flex items. By default they line up side by side in a row.

!!! warning "You set flex on the parent, not the items"
    A common beginner mistake is adding `display: flex` to the items.
    You set it on the PARENT container. The children become flex items on their own. You do not add `display: flex` to each child.

---

## The main axis and the cross axis

Flexbox works with two directions. The main axis (Roman Urdu: woh seedhi line jis par items lagti hain) is the direction your items line up. The cross axis (Roman Urdu: main axis ke bilkul aare ki simat) runs across it, at ninety degrees.

`flex-direction` decides which is which. The default is `row`, so the main axis runs left to right. If you set `column`, items stack top to bottom and the main axis runs down.

```css
.row {
  display: flex;
  flex-direction: row; /* default: items go left to right */
}

.column {
  display: flex;
  flex-direction: column; /* items stack top to bottom */
}
```

The diagram below shows both cases. Notice how the axes swap when you switch direction.

<figure markdown>
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-flex-axes" style="max-width:100%;height:auto">
  <title id="svg-flex-axes">Two flex containers. Top: flex-direction row, main axis left-to-right, cross axis top-to-bottom. Bottom: flex-direction column, main axis top-to-bottom, cross axis left-to-right.</title>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="13" font-weight="600">
    <text x="30" y="28">flex-direction: row</text>
    <text x="30" y="240">flex-direction: column</text>
  </g>
  <rect x="30" y="38" width="700" height="150" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="60" y="68" width="120" height="80" rx="4"/>
    <rect x="310" y="68" width="120" height="80" rx="4"/>
    <rect x="560" y="68" width="120" height="80" rx="4"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="14" text-anchor="middle">
    <text x="120" y="113">1</text>
    <text x="370" y="113">2</text>
    <text x="620" y="113">3</text>
  </g>
  <defs>
    <marker id="bq-arrow-ax" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-ax)">
    <line x1="60" y1="20" x2="680" y2="20"/>
    <line x1="10" y1="38" x2="10" y2="188"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="370" y="16">main axis</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="11">
    <text x="14" y="220" transform="rotate(-90 14 220)">cross axis</text>
  </g>
  <rect x="30" y="250" width="320" height="148" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="85" y="262" width="210" height="34" rx="4"/>
    <rect x="85" y="306" width="210" height="34" rx="4"/>
    <rect x="85" y="350" width="210" height="34" rx="4"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="14" text-anchor="middle">
    <text x="190" y="285">1</text>
    <text x="190" y="329">2</text>
    <text x="190" y="373">3</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-ax)">
    <line x1="15" y1="255" x2="15" y2="395"/>
    <line x1="30" y1="415" x2="340" y2="415"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="12">
    <text x="18" y="338" transform="rotate(-90 18 338)">main axis</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="11" text-anchor="middle">
    <text x="185" y="412">cross axis</text>
  </g>
</svg>
<figcaption>Row: main axis is horizontal, cross axis is vertical. Column: axes swap. justify-content always controls the main axis; align-items always controls the cross axis.</figcaption>
</figure>

!!! tip "Which axis is the main axis can change"
    `flex-direction` decides which axis is the main axis.
    So `justify-content` changes meaning when you switch direction. In a row it moves items left and right. In a column it moves them up and down.

---

## justify-content: align along the main axis

`justify-content` controls how items sit along the main axis. In a default row, that means left to right.

```css
.row {
  display: flex;
  justify-content: center;
}
```

Here are the common values and what they do visually. Each box in the diagram below represents one flex item.

<figure markdown>
<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-jc" style="max-width:100%;height:auto">
  <title id="svg-jc">Five rows showing justify-content values: flex-start, center, flex-end, space-between, space-around.</title>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="10" y="38">flex-start</text>
    <text x="10" y="106">center</text>
    <text x="10" y="174">flex-end</text>
    <text x="10" y="242">space-between</text>
    <text x="10" y="310">space-around</text>
  </g>
  <g fill="none" stroke="#1f1f1c" stroke-width="1">
    <rect x="160" y="14" width="510" height="32" rx="4"/>
    <rect x="160" y="82" width="510" height="32" rx="4"/>
    <rect x="160" y="150" width="510" height="32" rx="4"/>
    <rect x="160" y="218" width="510" height="32" rx="4"/>
    <rect x="160" y="286" width="510" height="32" rx="4"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="164" y="18" width="60" height="24" rx="3"/>
    <rect x="228" y="18" width="60" height="24" rx="3"/>
    <rect x="292" y="18" width="60" height="24" rx="3"/>
    <rect x="305" y="86" width="60" height="24" rx="3"/>
    <rect x="369" y="86" width="60" height="24" rx="3"/>
    <rect x="433" y="86" width="60" height="24" rx="3"/>
    <rect x="546" y="154" width="60" height="24" rx="3"/>
    <rect x="610" y="154" width="60" height="24" rx="3"/>
    <rect x="164" y="154" width="60" height="24" rx="3"/>
    <rect x="164" y="222" width="60" height="24" rx="3"/>
    <rect x="355" y="222" width="60" height="24" rx="3"/>
    <rect x="606" y="222" width="60" height="24" rx="3"/>
    <rect x="185" y="290" width="60" height="24" rx="3"/>
    <rect x="355" y="290" width="60" height="24" rx="3"/>
    <rect x="525" y="290" width="60" height="24" rx="3"/>
  </g>
</svg>
<figcaption>Visual summary of justify-content values. The outer rectangle is the flex container; the inner boxes are the items.</figcaption>
</figure>

| Value | What it does |
| --- | --- |
| `flex-start` | Pack items at the start. Default. |
| `center` | Push items into the middle. |
| `flex-end` | Pack items at the end. |
| `space-between` | First item at start, last at end, equal gaps between. |
| `space-around` | Equal space around each item (half-gaps at edges). |
| `space-evenly` | Equal space between every item and the edges too. |

Try each one and watch where the boxes move.

---

## align-items: align along the cross axis

`align-items` controls how items sit along the cross axis. In a default row, that is top to bottom.

```css
.row {
  display: flex;
  align-items: center;
  height: 200px;
}
```

| Value | What it does |
| --- | --- |
| `stretch` | Items stretch to fill the cross axis. Default. |
| `center` | Line items up in the middle of the cross axis. |
| `flex-start` | Line items up at the start of the cross axis. |
| `flex-end` | Line items up at the end of the cross axis. |
| `baseline` | Line items up so their text baselines match. |

So `justify-content` and `align-items` together let you center anything. That used to be the hardest thing in CSS. Now it is two lines.

```css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

??? note urdu "اردو میں مزید وضاحت"
    فلیکس باکس میں دو سمتیں ہوتی ہیں۔ مین ایکسز وہ سمت ہے جس میں آپ کے باکس قطار میں لگتے ہیں۔ کراس ایکسز اس کے بالکل آڑے، نوے درجے پر چلتی ہے۔ justify-content آپ کے باکسوں کو مین ایکسز پر آگے پیچھے کرتا ہے، جیسے قطار میں دائیں بائیں۔ align-items انہیں کراس ایکسز پر اوپر نیچے کرتا ہے۔ سب سے ضروری بات یہ ہے کہ display: flex والدی باکس پر لگاتے ہیں، بچوں پر نہیں۔

---

## gap: space between items

You can add space between flex items with `gap`. It is cleaner than adding margins to each item.

```css
.row {
  display: flex;
  gap: 16px;
}
```

Now every item has 16 pixels of space between it and the next one. The gap does not add space on the outer edges, which is usually what you want.

You can also give two values. The first is row gap and the second is column gap (useful when items wrap to a new line).

```css
.grid-like {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 16px; /* 24px between rows, 16px between columns */
}
```

---

## flex-wrap: move items to a new line

By default, flex items try to stay on one line. If they run out of room, they shrink. Sometimes that looks bad. `flex-wrap: wrap` lets items move to a new line instead.

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

Now when the row gets too tight, extra items drop down to the next line. This is great for card layouts on small screens.

| Value | What it does |
| --- | --- |
| `nowrap` | All items stay on one line, they shrink if needed. Default. |
| `wrap` | Items move to a new line when there is no room. |
| `wrap-reverse` | Same as wrap but new lines go upward instead of downward. |

---

## Sharing leftover space: flex-grow, flex-shrink, flex-basis

A flex container often has leftover space. Or items can be too big. You can tell items how to handle that.

- `flex-grow`: how much an item grows to fill extra space. `0` means do not grow. `1` means grow equally with siblings.
- `flex-shrink`: how much an item shrinks when space is tight. `1` means it can shrink. `0` means never shrink.
- `flex-basis`: the starting size of the item before growing or shrinking. Think of it as the item's "preferred" width.

The shorthand `flex: 1` is the most common one you will use. It sets grow to 1, shrink to 1, and basis to 0.

```css
.item {
  flex: 1; /* every item grows to share space equally */
}
```

With `flex: 1` on each item, they split the row into equal widths. Change one to `flex: 2` and it takes twice the share.

| Property | Default | Plain meaning |
| --- | --- | --- |
| `flex-grow` | `0` (do not grow) | How hungry is this item for extra space? |
| `flex-shrink` | `1` (can shrink) | How willing is this item to give up space? |
| `flex-basis` | `auto` (use its width) | How big should this item start? |
| `flex` shorthand | `0 1 auto` | All three in one. `flex: 1` = grow, shrink, start at 0. |

!!! tip "Use the shorthand"
    Write `flex: 1` rather than setting `flex-grow`, `flex-shrink`, and `flex-basis` separately. The shorthand resets all three together so you never get unexpected leftovers.

---

## All flex container properties at a glance

Here is a quick reference for every property you set on the flex container (the parent).

| Property | Common values | What it controls |
| --- | --- | --- |
| `display` | `flex`, `inline-flex` | Turns the box into a flex container. |
| `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` | Which way is the main axis? |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` | Can items move to a new line? |
| `justify-content` | `flex-start`, `center`, `space-between`, `space-around`, `space-evenly` | Spacing along the main axis. |
| `align-items` | `stretch`, `center`, `flex-start`, `flex-end`, `baseline` | Alignment on the cross axis for one line. |
| `align-content` | same values as justify-content | Cross-axis spacing when there are multiple lines (needs wrap). |
| `gap` | any length, e.g. `16px` | Space between items, no margins needed. |

---

## A navbar built with flex

Here is a simple navbar. The logo sits on the left and the links sit on the right.

```html
<nav class="navbar">
  <div class="logo">BanoQabil</div>
  <ul class="links">
    <li>Home</li>
    <li>Courses</li>
    <li>About</li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
}
```

The `.navbar` uses `space-between` to push the logo and links apart. The `.links` list is its own flex container, so the links sit in a neat row with even gaps. This pattern of nesting flex containers is very common. Each container only worries about its own direct children.

---

### Try this

Build the navbar from this lesson. Make a `<nav>` with a logo `div` on the left and a `<ul>` of three links on the right. Give the `<nav>` `display: flex`, `justify-content: space-between`, and `align-items: center`. Make the `<ul>` its own flex container with `gap: 24px`. Then change `justify-content` to `center` and watch where everything moves.

---

!!! example "Play: Flexbox Froggy"
    Learn flexbox by guiding frogs to their lily pads. It is a free browser game
    and one of the best ways to make flexbox stick. Play it here: https://flexboxfroggy.com

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Do you set `display: flex` on the parent or on the children?
2. Which property aligns items along the main axis?
3. What does `flex-wrap: wrap` do when items run out of room?
4. What does the shorthand `flex: 1` tell an item to do?

---

## Practice

Now try it for points. Click an answer or type it in, and you get instant feedback. Each one you get right earns XP and keeps your daily streak going.

```quiz
MCQ: You are building a navbar. You want the logo stuck to the far left and the menu links stuck to the far right, with all the empty space pushed into the middle. Which one do you use on the nav?
( ) `align-items: center`
(x) `justify-content: space-between`
( ) `flex-wrap: wrap`
Why: `space-between` pushes the first item to the start and the last to the end, so all the spare space sits in the middle. That is exactly the logo-on-one-side, links-on-the-other look.

FILL: You put three boxes inside a div, but they keep stacking on top of each other instead of sitting side by side. To make the div lay its boxes out in a row, you add `display: ___;` to the div.
Answer: flex
Why: Until you add `display: flex`, the boxes behave like normal blocks and stack downward. Adding it lays them out in a row.

MCQ: On a small phone screen, your row of product cards is too wide and spills off the edge. You want the extra cards to drop down onto a new line instead. What do you reach for?
( ) `flex-direction: column`
(x) `flex-wrap: wrap`
( ) `justify-content: center`
Why: `flex-wrap: wrap` lets items move down to a new line when they run out of room, so nothing spills off the screen.

FILL: You have three buttons in a row, and you want each one to stretch so they share the space equally and fill the whole width. On each button you write `flex: ___;`
Answer: 1
Why: `flex: 1` tells every item to grow and take an equal share of the space, so the three buttons split the row evenly.
```

---

## Assignment

!!! bq-assignment "Assignment: Design the BanoQabil header and footer with Flexbox"
    Open banoqabil.org in your browser. Look at the header. A logo or name sits on the left. Navigation links sit on the right. Now look at the footer. It has columns of links and a copyright row along the bottom. Your job is to recreate that kind of layout using only Flexbox.

    Do not start writing CSS first. Start by thinking about the structure.

    For the header: what is the flex container? What are its two main children? Which justify-content value pushes one child to the far left and the other to the far right? How do you get them to sit at the same vertical height? What gap would look right?

    For the footer columns: think of the whole footer as one flex container. Each column of links is a flex item. How would you distribute three or four columns evenly? Then think about the copyright row below. It is a second flex container with text on one side and maybe a small logo or tagline on the other.

    Open DevTools (F12) on banoqabil.org or any site you like. Click the inspector, hover over their header, and read what CSS they actually wrote. You do not have to copy it. Just look and then close DevTools and try your own way.

    **What you build**

    - An HTML file with a `<header>` and a `<footer>` (no other CSS needed except what controls layout)
    - The header has a logo element on the left and a nav list of links on the right, in one row
    - The footer has at least three columns of links sitting side by side
    - A copyright bar below the footer columns, with text on the left and something small on the right

    **Done when**

    - [ ] The logo and nav links are on the same line and stay there.
    - [ ] There is visible space between the nav links (no links are touching each other).
    - [ ] The logo and links are vertically centred in the header, not sitting at different heights.
    - [ ] The footer columns sit side by side on a wide screen.
    - [ ] At a narrow window (below 480px), the header links wrap below the logo instead of overflowing off screen. Try `flex-wrap: wrap` and see what happens.

    **Stretch goal:** Make the header sticky so it stays at the top when you scroll, and add a hover colour change to each nav link using just CSS.

---

## What's next

You now know how to line boxes up in a row or a column. Flexbox is great for one direction at a time. Next you will learn CSS Grid, which lays things out in rows and columns together for full page layouts.

[Next lesson: 3.3 CSS Grid &rarr;](3-3-css-grid.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [web.dev: Learn CSS Flexbox](https://web.dev/learn/css/flexbox)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[flexbox]: A CSS layout system for arranging boxes in a row or column. (Roman Urdu: box ko row ya column mein lagane ka tareeqa)
*[flex container]: The parent element you give display flex to. (Roman Urdu: woh parent jis par display flex lagta hai)
*[flex item]: A direct child of a flex container. (Roman Urdu: flex container ka seedha bachcha)
*[main axis]: The direction flex items line up in. (Roman Urdu: woh simat jis mein items lagte hain)
*[cross axis]: The direction across the main axis, at ninety degrees. (Roman Urdu: main axis ke aaray chalne wali simat)
*[justify-content]: Aligns items along the main axis. (Roman Urdu: items ko main axis par set karta hai)
*[align-items]: Aligns items along the cross axis. (Roman Urdu: items ko cross axis par set karta hai)
*[gap]: Space added between flex items. (Roman Urdu: items ke darmiyan ki jagah)
