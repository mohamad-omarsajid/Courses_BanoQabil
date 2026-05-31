---
lesson_id: frontend.ch03.l01
title: "3.1 Selectors, the box model, colours and fonts"
chapter: 3
order: 1
estimated_minutes: 35
prerequisites:
  - frontend.ch02.l04
---

# 3.1 Selectors, the box model, colours and fonts

You built real HTML pages in Chapter 2. They work, but they look plain. CSS is the language that adds colour, spacing, and good fonts. In this lesson you learn how CSS attaches to your page and how it styles things. By the end your pages will start to look like real websites.

## What you'll know by the end

- What CSS is and the three ways to add it to a page.
- How to write a CSS rule with a selector and declarations.
- How element, class, and id selectors target things.
- The basic idea of specificity and the cascade.
- The box model: content, padding, border, and margin.
- How to set colours and fonts, including a Google Font.

---

## What CSS is

HTML gives your page structure. CSS gives it style. CSS stands for Cascading Style Sheets. You use it to set colours, sizes, spacing, and fonts.

You write CSS as rules. Each rule says "find these elements and style them this way". The browser reads your rules and paints the page.

---

## Three ways to add CSS

There are three ways to add CSS to a page.

The first way is an inline style on one element.

```html
<p style="color: teal;">Hello in teal.</p>
```

This styles only that one paragraph. It gets messy fast, so you rarely use it.

The second way is a `<style>` tag inside the head.

```html
<head>
  <style>
    p {
      color: teal;
    }
  </style>
</head>
```

This styles every paragraph on that one page. It is fine for tiny tests.

The third way is an external file. You make a file called `style.css` and link it in the head.

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

The external file holds all your CSS. One file can style your whole site. This is the normal choice, so use it.

Here are the three side by side:

| Way | Looks like | Use it when |
| --- | --- | --- |
| Inline | `style="..."` on a tag | almost never, a quick test only |
| `<style>` in the head | a `<style>` block | a tiny one-page test |
| External `.css` file | `<link rel="stylesheet">` | always, for real projects |

In your project, make a file named `style.css` next to your `index.html`. Write all your CSS there. Then add the `<link>` line in the head.

---

## How a CSS rule is built

Every CSS rule has the same shape. First comes a selector. Then comes a block in curly braces. Inside the block you write declarations.

```css
p {
  color: teal;
  font-size: 18px;
}
```

Here `p` is the selector. It picks all paragraphs. Inside the braces are two declarations. Each declaration is a property, a colon, a value, and a semicolon. So `color` is the property and `teal` is the value.

Always end each declaration with a semicolon. The browser ignores extra spaces and new lines, so spacing is for you, not the computer.

---

## Selectors: element, class, and id

A selector picks which elements to style. There are three common kinds.

An element selector picks every tag of one type.

```css
p {
  color: gray;
}
```

A class selector picks every element with that class. You write a dot before the name.

```css
.card {
  border: 1px solid black;
}
```

```html
<div class="card">A box.</div>
```

An id selector picks the one element with that id. You write a hash before the name.

```css
#header {
  background: teal;
}
```

```html
<header id="header">Top of page.</header>
```

You can put any class on many elements. An id must be unique on the page. In real work you use classes for almost everything.

| Selector | Picks | How you write it | Example |
| --- | --- | --- | --- |
| Element | every tag of one type | the tag name | `p { }` |
| Class | any elements with that class | a dot, then the name | `.card { }` |
| Id | the single element with that id | a hash, then the name | `#header { }` |

!!! tip
    Use classes for almost everything. Save ids for the rare case where one element is truly unique on the page. Classes are easy to reuse, and that keeps your CSS simple.

---

## Specificity and the cascade

Sometimes two rules try to style the same element. The browser needs to pick a winner. An id beats a class, and a class beats an element selector. That order is called specificity. When two rules are equally specific, the later one in the file wins. That idea of later rules and stronger rules winning is the cascade, which is the C in CSS.

<figure markdown>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-specificity" style="max-width:100%;height:auto">
  <title id="svg-specificity">Specificity from weakest to strongest: an element selector is weakest, a class selector is stronger, and an id selector is strongest.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="200" y="30" width="150" height="34" rx="6"/>
    <rect x="200" y="80" width="250" height="34" rx="6"/>
    <rect x="200" y="130" width="360" height="34" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" fill="#1f1f1c">
    <text x="210" y="52">element  p { }</text>
    <text x="210" y="102">class  .card { }</text>
    <text x="210" y="152">id  #header { }</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="end">
    <text x="190" y="52">weakest</text>
    <text x="190" y="152">strongest</text>
  </g>
</svg>
<figcaption>When two rules clash, the more specific one wins: an id beats a class, and a class beats an element. If they tie, the later rule in the file wins.</figcaption>
</figure>

---

## The box model

Every element on a page is a box. That box has four parts, from the inside out. First is the content, like your text. Then comes padding, which is space inside the border. Then comes the border, which is the edge line. Then comes margin, which is space outside the border.

<figure markdown>
<svg viewBox="0 0 620 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-box-title" style="max-width:100%;height:auto">
  <title id="svg-box-title">The box model: a content box wrapped by padding, then a border, then margin.</title>
  <rect x="20" y="20" width="580" height="380" rx="4" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5" stroke-dasharray="6 4"/>
  <rect x="90" y="70" width="440" height="280" rx="4" fill="#ffffff" stroke="#1f1f1c" stroke-width="2.5"/>
  <rect x="150" y="120" width="320" height="180" rx="4" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5" stroke-dasharray="4 4"/>
  <rect x="220" y="170" width="180" height="80" rx="4" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
  <g font-family="Inter, sans-serif" font-size="14" fill="#1f1f1c">
    <text x="30" y="40">margin</text>
    <text x="100" y="90">border</text>
    <text x="160" y="140">padding</text>
  </g>
  <text x="310" y="215" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#1f1f1c" text-anchor="middle">content</text>
</svg>
<figcaption>Every element is a box. The content sits in the middle, padding wraps it, a border wraps that, and margin is the space outside.</figcaption>
</figure>

Here is a box with all four parts set.

```css
.card {
  padding: 16px;
  border: 2px solid teal;
  margin: 24px;
}
```

The padding adds space between the text and the border. The border draws a teal line. The margin pushes other elements away from the card.

By default the width of a box does not include its padding and border. That can make boxes wider than you expect. The fix is `box-sizing: border-box`. It makes the width include padding and border, which feels friendly.

```css
.card {
  box-sizing: border-box;
}
```

??? note urdu "اردو میں مزید وضاحت"
    ہر عنصر ایک ڈبے کی طرح ہوتا ہے۔ سب سے اندر مواد ہوتا ہے، جیسے آپ کا متن۔ مواد کے گرد پیڈنگ ہوتی ہے، جو بارڈر کے اندر کی جگہ ہے۔ پیڈنگ کے باہر بارڈر ہوتا ہے، یعنی کنارے کی لکیر۔ بارڈر کے باہر مارجن ہوتا ہے، جو دوسرے عناصر سے فاصلہ بناتا ہے۔ یاد رکھیں پیڈنگ اندر کی جگہ ہے اور مارجن باہر کی جگہ ہے۔

---

## Colours

CSS gives you four common ways to write a colour. You can use any of them.

```css
.demo {
  color: red;
  color: #0fab95;
  color: rgb(15, 171, 149);
  color: hsl(170, 84%, 36%);
}
```

A named colour like `red` is the simplest. A hex value like `#0fab95` uses six characters for red, green, and blue. An rgb value sets the same three channels with numbers from 0 to 255. An hsl value sets hue, saturation, and lightness, which is handy when you want a lighter or darker shade.

| Format | Example | Handy when |
| --- | --- | --- |
| Name | `red` | you want quick and simple |
| Hex | `#0fab95` | you are copying from a design |
| RGB | `rgb(15, 171, 149)` | you are mixing exact channels |
| HSL | `hsl(170, 84%, 36%)` | you want a lighter or darker shade |

---

## Fonts

A font sets how your text looks. Web-safe fonts are already on almost every computer. Good ones are Arial and Georgia. You pick a font with `font-family`.

```css
body {
  font-family: Arial, sans-serif;
}
```

The second name is a fallback. If Arial is missing, the browser uses any sans-serif font.

For more choice you can use a Google Font. First add a `<link>` in the head. Get the link from fonts.google.com.

```html
<head>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
</head>
```

Then name that font in your CSS.

```css
body {
  font-family: "Poppins", Arial, sans-serif;
}
```

Now your text uses Poppins, with Arial as a backup. Keep a web-safe fallback at the end, just in case.

!!! note "Did you know"
    A man named Hakon Wium Lie proposed CSS in 1994. Before that, styling a page was a real headache, and every browser did its own thing.

!!! example "Play: CSS Diner"
    Practice selectors with a free browser game called CSS Diner. It teaches
    every selector in a few fun levels. Play it here: https://flukeout.github.io

---

### Try this

Make an external `style.css` file and link it from the head of a page. In it, write one rule for a `.card` class: give it `padding`, a `border`, a `margin`, and a background colour of your choice. Add `<div class="card">` with some text to your HTML and check the four box-model parts show up. Then set a Google Font on the `body` and see the text change.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What are the three ways to add CSS to a page, and which one is normal?
2. How do you write a class selector and an id selector?
3. In the box model, what is the difference between padding and margin?
4. Name three ways to write the colour teal in CSS.

---

## What's next

You can now style single elements with colour, spacing, and fonts. Next you learn how to place many elements in a neat row or column. That is the job of Flexbox, and it makes layouts simple.

[Next lesson: 3.2 Flexbox &rarr;](3-2-flexbox.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Learn CSS: Selectors](https://web.dev/learn/css/selectors)
- [web.dev: Learn CSS: The box model](https://web.dev/learn/css/box-model)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[CSS]: Cascading Style Sheets, the language that styles your HTML. (Roman Urdu: page ko style karne wali language)
*[selector]: The part of a rule that picks which elements to style. (Roman Urdu: kis cheez ko style karna hai woh chunta hai)
*[class]: A reusable label you put on many elements, targeted with a dot. (Roman Urdu: dobara use hone wala naam)
*[id]: A unique label for one element, targeted with a hash. (Roman Urdu: ek hi element ka khaas naam)
*[specificity]: The rule that decides which style wins: id beats class beats element. (Roman Urdu: kaun sa rule jeetega woh tay karta hai)
*[cascade]: How later and stronger rules win when styles clash. (Roman Urdu: baad wale aur mazboot rule jeet jate hain)
*[box model]: The idea that every element is a box of content, padding, border, and margin. (Roman Urdu: har element ek dabba hai)
*[padding]: Space inside the border, between content and edge. (Roman Urdu: border ke andar ki jagah)
*[margin]: Space outside the border, between this box and others. (Roman Urdu: border ke bahar ki jagah)
