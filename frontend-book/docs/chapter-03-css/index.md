# Chapter 3: CSS foundations

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

HTML gives a page its structure. CSS gives it a look. Color, spacing, fonts, and
layout all come from CSS. This is the chapter where your plain pages start to feel
like real websites.

You begin with selectors and the box model, the heart of how CSS thinks. Then you
learn the two modern layout tools, Flexbox and Grid. Last, you make a page that
looks good on a phone, a tablet, and a desktop.

## Lessons in this chapter

- [ ] [3.1 Selectors, the box model, colours and fonts](3-1-selectors-box-model.md): how to target elements and how every box is built.
- [ ] [3.2 Flexbox](3-2-flexbox.md): line things up in a row or a column with one layout tool.
- [ ] [3.3 CSS Grid](3-3-css-grid.md): build two-dimensional layouts with rows and columns.
- [ ] [3.4 Responsive design](3-4-responsive-design.md): make one page work on every screen size.

!!! tip "Play the games"
    CSS sticks faster when you play with it. Each lesson points you to a free
    browser game, like CSS Diner and Flexbox Froggy. Ten minutes of play beats an
    hour of reading.

## Mega assignment

!!! bq-assignment "Turn the skeleton into a responsive landing page"
    Now make your client's page look like a real business site, using only CSS.
    Build mobile first, because most of their customers will open it on a phone.

    **What you build**

    - One stylesheet: a colour palette and fonts that suit the business, spacing controlled with the box model, a nav and cards laid out with Flexbox, a gallery or feature grid with CSS Grid, and media queries so it works at every size.

    **Done when**

    | Screen | Width | Must be true |
    | --- | --- | --- |
    | Phone | 360px | No horizontal scrollbar, text easy to read |
    | Tablet | 768px | Layout reflows sensibly, nothing overlaps |
    | Desktop | 1280px | Content is centred, not stretched edge to edge |

    - [ ] Looks clean at all three widths above.
    - [ ] No horizontal scrollbar on mobile.
    - [ ] Buttons and links are big enough to press with a thumb.
    - [ ] Text and background have enough contrast to read comfortably.

    **Stretch goal:** Add hover states to buttons and cards, and a sticky header that stays put as you scroll.

[Start lesson 3.1 &rarr;](3-1-selectors-box-model.md){ .next-lesson }
