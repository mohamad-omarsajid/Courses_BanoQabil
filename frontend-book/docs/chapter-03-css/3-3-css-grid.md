---
lesson_id: frontend.ch03.l03
title: "3.3 CSS Grid"
chapter: 3
order: 3
estimated_minutes: 35
prerequisites:
  - frontend.ch03.l02
---

# 3.3 CSS Grid

Flexbox lined up your items in one direction. But real pages need rows and columns at the same time. That is where CSS Grid helps you. Grid lets you build a full page layout with a few short lines of CSS.

## What you'll know by the end

- You can turn a box into a grid with `display: grid`.
- You can set columns and rows with `grid-template-columns` and `grid-template-rows`.
- You can use the `fr` unit to split space into equal parts.
- You can add space between cells with `gap`.
- You can place an item across many cells using grid line numbers.
- You can name page areas and know when to pick Grid or Flexbox.

---

## What is CSS Grid

CSS Grid lays out items in two dimensions. That means rows and columns together. Flexbox mostly works in one direction, a single row or a single column. Grid is great for the whole page shape. Flexbox is great for a line of items inside that shape.

You start by making a container a grid.

```css
.page {
  display: grid;
}
```

```html
<div class="page">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</div>
```

The `.page` box is now a grid container (Roman Urdu: woh dabba jis par grid lagaya gaya ho). The boxes inside are grid items. On their own they stack in one column. Next you tell Grid how many columns and rows you want.

---

## The anatomy of a grid

Before you write any properties, it helps to see the vocabulary. Every grid has the same set of parts.

<figure markdown>
<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-grid-anatomy" style="max-width:100%;height:auto">
  <title id="svg-grid-anatomy">A 3-column, 2-row grid. Labels show: grid lines (vertical and horizontal), tracks (columns and rows), cells, gap, and the outer container.</title>
  <rect x="60" y="60" width="540" height="340" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="2"/>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="76" y="76" width="148" height="138" rx="3"/>
    <rect x="242" y="76" width="148" height="138" rx="3"/>
    <rect x="408" y="76" width="148" height="138" rx="3"/>
    <rect x="76" y="232" width="148" height="138" rx="3"/>
    <rect x="242" y="232" width="148" height="138" rx="3"/>
    <rect x="408" y="232" width="148" height="138" rx="3"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1" stroke-dasharray="5 3" fill="none">
    <line x1="76" y1="60" x2="76" y2="400"/>
    <line x1="224" y1="60" x2="224" y2="400"/>
    <line x1="390" y1="60" x2="390" y2="400"/>
    <line x1="556" y1="60" x2="556" y2="400"/>
    <line x1="60" y1="76" x2="600" y2="76"/>
    <line x1="60" y1="214" x2="600" y2="214"/>
    <line x1="60" y1="370" x2="600" y2="370"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="76" y="50">line 1</text>
    <text x="224" y="50">line 2</text>
    <text x="390" y="50">line 3</text>
    <text x="556" y="50">line 4</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="150" y="145">cell</text>
    <text x="316" y="145">cell</text>
    <text x="482" y="145">cell</text>
    <text x="150" y="301">cell</text>
    <text x="316" y="301">cell</text>
    <text x="482" y="301">cell</text>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="11" text-anchor="middle">
    <text x="150" y="420">column track</text>
    <text x="316" y="420">column track</text>
    <text x="482" y="420">column track</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="11" text-anchor="middle">
    <text x="230" y="225">gap</text>
  </g>
  <defs>
    <marker id="bq-arrow-ga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#bq-arrow-ga)">
    <line x1="225" y1="222" x2="225" y2="215"/>
    <line x1="225" y1="228" x2="225" y2="235"/>
  </g>
</svg>
<figcaption>Grid vocabulary: lines separate tracks; tracks are columns or rows; cells are the intersections; gap is the space between tracks.</figcaption>
</figure>

| Term | What it is |
| --- | --- |
| Container | The box you set `display: grid` on. |
| Item | A direct child of the container. |
| Track | One column or one row. |
| Cell | The box at the intersection of one column and one row. |
| Line | The numbered boundary between tracks. Columns: lines 1 to (columns + 1). |
| Gap | Space between tracks. No margins needed. |
| Area | A rectangle of one or more cells, usually named. |

---

## Defining columns and rows

You set columns with `grid-template-columns`. You set rows with `grid-template-rows`. Each value is one track. A track is one column or one row.

```css
.page {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

This makes three columns and two rows. Each column is 200 pixels wide. Each row is 100 pixels tall. Items fill the cells from left to right, top to bottom.

---

## The fr unit

Fixed pixel sizes are not flexible. The `fr` unit fixes that. `fr` means one fraction of the leftover space. The browser shares free space between the tracks.

```css
.page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

This makes three equal columns. Each one takes one third of the width. If the screen grows, the columns grow with it. You can also mix units, like `250px 1fr`. The first column stays fixed and the second takes the rest.

<figure markdown>
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fr-unit" style="max-width:100%;height:auto">
  <title id="svg-fr-unit">A grid with columns 250px 1fr 2fr. The first column is a fixed 250px. The remaining space is split: one part goes to the second column, two parts go to the third.</title>
  <rect x="20" y="40" width="600" height="120" rx="6" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  <rect x="28" y="48" width="246" height="104" rx="3" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
  <rect x="282" y="48" width="106" height="104" rx="3" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
  <rect x="396" y="48" width="216" height="104" rx="3" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="151" y="103">250px</text>
    <text x="335" y="103">1fr</text>
    <text x="504" y="103">2fr</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="151" y="118">fixed</text>
    <text x="335" y="118">1 share</text>
    <text x="504" y="118">2 shares</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="320" y="24">grid-template-columns: 250px 1fr 2fr</text>
  </g>
</svg>
<figcaption>Mix fixed and fr columns. Here 250px is reserved first, then the leftover space is divided: the middle column gets 1 share, the right gets 2 shares.</figcaption>
</figure>

!!! tip
    Use the `fr` unit instead of percentages. Percentages do not count your `gap`, so the row can overflow. The `fr` unit shares the leftover space after the gap. That saves you a lot of small fixes.

---

## Adding gap

You usually want space between cells. The `gap` property does this in one line. No margins needed.

```css
.page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

Now there is a 16 pixel space between every column and every row. You can give two values, like `gap: 24px 12px`. The first is row gap and the second is column gap.

---

## Grid lines and placing items

Grid counts the lines between tracks, not the tracks themselves. Three columns have four vertical lines. Two rows have three horizontal lines. You use these line numbers to place an item.

<figure markdown>
<svg viewBox="0 0 620 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-grid-title" style="max-width:100%;height:auto">
  <title id="svg-grid-title">A grid of three columns and two rows. Column lines are numbered 1 to 4 across the top; row lines 1 to 3 down the left.</title>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="80" y="70" width="150" height="130" rx="3"/>
    <rect x="245" y="70" width="150" height="130" rx="3"/>
    <rect x="410" y="70" width="150" height="130" rx="3"/>
    <rect x="80" y="215" width="150" height="130" rx="3"/>
    <rect x="245" y="215" width="150" height="130" rx="3"/>
    <rect x="410" y="215" width="150" height="130" rx="3"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="13" text-anchor="middle">
    <text x="80" y="58">1</text>
    <text x="237" y="58">2</text>
    <text x="402" y="58">3</text>
    <text x="560" y="58">4</text>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="13" text-anchor="middle">
    <text x="62" y="74">1</text>
    <text x="62" y="219">2</text>
    <text x="62" y="350">3</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="320" y="40">column lines</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="12">
    <text x="4" y="200" transform="rotate(-90 4 200)">row lines</text>
  </g>
</svg>
<figcaption>Grid counts the lines between tracks, not the tracks. <code>grid-column: 1 / 3</code> means start at line 1 and end at line 3, covering two columns.</figcaption>
</figure>

Now place one item across two columns.

```css
.page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.feature {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

```html
<div class="page">
  <div class="feature">Big box</div>
  <div>Small</div>
  <div>Small</div>
</div>
```

The `.feature` item starts at column line 1 and ends at column line 3. So it covers the first two columns. It sits in the first row. The other items flow into the spaces that are left.

You can also use the keyword `span` to avoid counting lines manually.

```css
.feature {
  grid-column: span 2; /* same result: cover 2 columns */
}
```

---

## The repeat() helper

Writing `1fr 1fr 1fr` is fine for three columns. For twelve columns it gets long. The `repeat()` function shortens it.

```css
.page {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

`repeat(3, 1fr)` means "give me `1fr` three times". It is the same as `1fr 1fr 1fr`. Less typing and easier to read.

---

## Named grid areas

You can also name parts of your layout. This makes the code read like a small map. You draw the layout with `grid-template-areas`. Then you give each item a name with `grid-area`.

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

```html
<div class="layout">
  <header class="header">Header</header>
  <nav class="sidebar">Sidebar</nav>
  <main class="main">Main content</main>
  <footer class="footer">Footer</footer>
</div>
```

Read the `grid-template-areas` value top to bottom. Each line is one row. `header` spans both columns on the top row. The middle row has `sidebar` on the left and `main` on the right. `footer` spans both columns at the bottom. This is a full page layout in a few lines.

Why is this so useful? Because when you want to change the layout for a phone, you just redraw the map inside a media query. You do not have to change the HTML at all.

---

## Key grid properties at a glance

Here is a quick reference for all the properties you set on the grid container.

| Property | Example | What it does |
| --- | --- | --- |
| `display` | `grid` | Turns the box into a grid. |
| `grid-template-columns` | `1fr 1fr 1fr` | Sets column sizes. |
| `grid-template-rows` | `auto 1fr auto` | Sets row sizes. `auto` means fit the content. |
| `grid-template-areas` | `"header header"` | Names zones so items can claim them by name. |
| `gap` | `16px` | Space between all tracks. |
| `column-gap` | `12px` | Space between columns only. |
| `row-gap` | `24px` | Space between rows only. |

And on grid items:

| Property | Example | What it does |
| --- | --- | --- |
| `grid-column` | `1 / 3` | Start and end column lines. |
| `grid-row` | `1 / 2` | Start and end row lines. |
| `grid-area` | `sidebar` | Claim a named area. |

---

## Grid or Flexbox

Both tools are useful. They are not rivals. You will often use them together.

| Situation | Reach for |
| --- | --- |
| Full page layout (header, sidebar, main, footer) | Grid |
| A single row of buttons, links, or cards | Flexbox |
| A gallery or card grid that wraps to multiple rows | Grid |
| Centering one element in a box | Flexbox |
| Overlapping elements (one covers another) | Grid |
| Content inside a grid cell that needs its own alignment | Flexbox inside the cell |

A very common pattern: use Grid for the page, then Flexbox inside each grid cell. The two tools complement each other well.

!!! note "Grid or Flexbox"
    Use Grid for the overall page layout in two dimensions, like header, sidebar, main, and footer. Use Flexbox for one row or one column of items, like a navbar or a list of buttons. A common pattern is Grid for the page and Flexbox inside each grid cell.

---

??? note urdu "اردو میں مزید وضاحت"
    گرڈ ٹریکس کے درمیان موجود لائنوں کو گنتا ہے، خود ٹریکس کو نہیں۔ تین کالم کی چار عمودی لائنیں ہوتی ہیں، لائن نمبر ایک سے چار تک۔ جب آپ لکھتے ہیں grid-column: 1 / 3، تو آئٹم لائن ایک سے شروع ہو کر لائن تین پر ختم ہوتا ہے اور پہلے دو کالم گھیر لیتا ہے۔ fr یونٹ بچی ہوئی جگہ کا حصہ ہے، جیسے روٹی کے برابر ٹکڑے۔ ایک fr والا ٹریک اور دو fr والا ٹریک ہو تو دوسرے کو دگنی جگہ ملتی ہے۔ grid-template-areas سے آپ صفحے کا نقشہ بنا سکتے ہیں، بالکل ایسے جیسے کسی کمرے کی تصویر بنائیں۔

---

### Try this

Build a six-card photo grid. Make a container with `display: grid`, set `grid-template-columns: repeat(3, 1fr)`, and add `gap: 16px`. Put six `div` boxes inside. Then pick one box and make it span two columns with `grid-column: 1 / 3`, and watch the others flow around it.

---

!!! example "Play: Grid Garden"
    Water your carrots while you learn CSS Grid. Grid Garden is a free browser
    game that teaches grid line by line. Play it here: https://cssgridgarden.com

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does `display: grid` do to a box?
2. What does the `fr` unit mean, and what does `repeat(3, 1fr)` create?
3. How many columns does `grid-column: 1 / 3` cover, and why?
4. When would you reach for Grid, and when for Flexbox?

---

## Assignment

!!! bq-assignment "Assignment: Build a bento grid"
    Search "Apple bento layout" or "bento grid CSS" in your browser. You will see a style of dashboard where boxes of different sizes sit in a clean grid together. Some cells are one column wide, some span two. Some are tall, some short. The result looks organized but lively. That is what you will build.

    This assignment is meant to push you further than the lesson examples. You will need to combine several things at once.

    Start by planning on paper. Draw a small sketch. Think: how many columns do you want? Which cells should be wider or taller? A good starting point is four or five columns and three or four rows. Pick six to eight boxes. Some should be normal cells, and at least two should span more than one column or row.

    Then think through these questions before you write CSS:

    What goes in `grid-template-columns`? Will you use `repeat()` with `fr` units, or a mix of sizes? How will you make one box span two columns? Will you use `grid-column: 1 / 3` or `grid-column: span 2`? To make a box taller, what property do you use? What `gap` value keeps the grid looking airy but tight? How will the grid look on a phone? Can you change `grid-template-columns` inside a media query to drop to two columns?

    To experiment, go to CSS Grid Garden at cssgridgarden.com. It will sharpen your feel for grid lines fast. Also try resizing the browser while watching your grid in DevTools. The Firefox grid inspector is especially good, because it draws the column and row lines right on top of your page.

    **What you build**

    - A grid of at least six boxes with different background colours or short text labels
    - At least two boxes that span more than one column
    - At least one box that spans more than one row
    - A `gap` value that keeps boxes clearly separated
    - A media query that changes the column layout for narrow screens

    **Done when**

    - [ ] The grid has at least four columns on desktop.
    - [ ] At least two cells span multiple columns.
    - [ ] At least one cell spans multiple rows.
    - [ ] There is no horizontal scroll on a 360px wide screen.
    - [ ] The grid uses `fr` units, not fixed pixel widths for columns.
    - [ ] Opening DevTools and toggling the grid overlay shows the lines matching your layout.

    **Stretch goal:** Give each cell a short heading and a line of text, and use Flexbox inside each cell to centre that content both horizontally and vertically.

---

## What's next

You can now build a full layout with rows and columns. But that layout still looks the same on a phone and a wide monitor. In 3.4 you will learn responsive design, so your page changes shape to fit any screen.

[Next lesson: 3.4 Responsive design &rarr;](3-4-responsive-design.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- CSS-Tricks, "A Complete Guide to Grid": https://css-tricks.com/snippets/css/complete-guide-grid/
- web.dev, "Learn CSS: Grid": https://web.dev/learn/css/grid

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[CSS Grid]: A layout system that places items in rows and columns at the same time. (Roman Urdu: rows aur columns dono mein layout banane ka tareeqa)
*[grid container]: The box you set to display: grid; its direct children become grid items. (Roman Urdu: woh box jis par grid lagti hai)
*[track]: One column or one row in the grid. (Roman Urdu: grid ka aik column ya aik row)
*[grid line]: The line between or around tracks, numbered from 1. (Roman Urdu: tracks ke darmiyan ki line, number 1 se shuru)
*[fr unit]: A fraction of the leftover free space in the grid. (Roman Urdu: bachi hui jagah ka aik hissa)
*[grid area]: A named region of the grid made from one or more cells. (Roman Urdu: grid ka aik naam wala hissa)
*[gap]: The space added between grid tracks. (Roman Urdu: tracks ke darmiyan ki jagah)
