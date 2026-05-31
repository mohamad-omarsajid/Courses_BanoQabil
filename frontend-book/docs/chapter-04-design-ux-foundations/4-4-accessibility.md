---
lesson_id: frontend.ch04.l04
title: "4.4 Accessibility from day one"
chapter: 4
order: 4
estimated_minutes: 30
prerequisites:
  - frontend.ch04.l03
---

# 4.4 Accessibility from day one

Most beginners treat accessibility (Roman Urdu: har insaan ke liye kaam karne wali design) as something to add at the end, like a coat of paint. This lesson turns that idea around. When you design for the hardest constraints first, everything gets better for everyone.

Think about who is using your page. Some people have low vision and need text that stands out from its background. Some are colour blind. Some cannot use a mouse and tab through the page with a keyboard. Some use a screen reader, which reads the page aloud. Some are on a cheap phone in bright Sahiwal sunlight with a slow mobile connection. Designing for these people does not slow you down. It makes the page clearer, faster, and easier for every single visitor, including people with no disability at all.

*(Roman Urdu: Accessibility ka matlab hai ke tumhari website har tarah ke logon ke liye kaam kare. Yeh sirf ek charity nahi, balke achi design ka bunyaadi hissa hai.)*

## What you'll know by the end

- What colour contrast is, and the 4.5:1 rule for normal text.
- Why you must never rely on colour alone to show meaning.
- How keyboard navigation works, and what a visible focus state is.
- What a screen reader is, and how it reads your page.
- Why semantic HTML gives screen readers and everyone else a better experience.
- How to write good alt text and proper form labels.
- What readable typography looks like.
- How `prefers-reduced-motion` protects people from motion sickness.

---

## Colour contrast

When text is too close in colour to its background, it becomes hard or impossible to read. This affects everyone in bright light, on a low-quality screen, or with any degree of low vision.

The Web Content Accessibility Guidelines (WCAG) define a minimum contrast ratio. For normal body text, you need at least **4.5 to 1**. For large text (18pt and up, or bold 14pt and up), the minimum is 3 to 1. The ratio is the brightness difference between the foreground and background colours. Black text on white has a ratio of 21:1, the maximum possible. Light grey text on white might be 2:1, which fails.

<figure markdown>
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-contrast-title" style="max-width:100%;height:auto">
  <title id="svg-contrast-title">Two text blocks side by side. The left block shows dark text on a light background labelled good contrast, with a ratio of 7 to 1. The right block shows mid-grey text on a light background labelled poor contrast, with a ratio of 2 to 1.</title>
  <g>
    <rect x="30" y="30" width="280" height="180" rx="8" fill="#f8f8f5" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="370" y="30" width="280" height="180" rx="8" fill="#f8f8f5" stroke="#6b6b65" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="70">Good contrast</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#1a1a18" text-anchor="middle">
    <text x="170" y="115">Bano Qabil Course</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="148">Dark text on light background</text>
    <text x="170" y="168">Ratio: 7:1 (passes WCAG AA)</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="510" y="70">Poor contrast</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#b0b0a8" text-anchor="middle">
    <text x="510" y="115">Bano Qabil Course</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65" text-anchor="middle">
    <text x="510" y="148">Grey text on light background</text>
    <text x="510" y="168">Ratio: 2:1 (fails WCAG AA)</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="170" y="205">PASS</text>
    <text x="510" y="205">FAIL</text>
  </g>
</svg>
<figcaption>Left: dark text on a light background passes WCAG AA with a ratio of 7:1. Right: mid-grey text on the same background fails at 2:1. Many designers make the right block mistake because it "looks clean".</figcaption>
</figure>

Here is a quick reference for the two WCAG AA thresholds:

| Text type | Minimum contrast ratio | Example that passes |
| --- | --- | --- |
| Normal body text (under 18pt) | 4.5 : 1 | `#1a1a18` text on `#f8f8f5` background |
| Large text (18pt+ or bold 14pt+) | 3 : 1 | `#555550` text on `#ffffff` background |
| UI components and graphics | 3 : 1 | A button border against its background |
| Disabled elements | no requirement | Grey placeholder text is okay |

You do not need to calculate ratios by hand. The free WebAIM contrast checker at `webaim.org/resources/contrastchecker` does it instantly. Paste two hex values and it tells you pass or fail.

### Do not rely on colour alone

Many people cannot tell red from green, or blue from purple. If your form shows an error only by turning a field red, a colour-blind user may never know which field is wrong. Always pair colour with a second signal: an icon, a label, or a shape change.

```html
<!-- bad: colour only -->
<input class="error-red">

<!-- good: colour plus text label -->
<input class="error-red" aria-describedby="email-error">
<span id="email-error" class="error-msg">Please enter a valid email address.</span>
```

---

## Keyboard navigation

Many people never touch a mouse. They tab through the page using the keyboard. Some have motor disabilities. Some are power users on a laptop who find the keyboard faster. Some are using a phone with a Bluetooth keyboard. Your page must work for all of them.

When a user presses Tab, the browser moves focus to the next interactive element in order: links, buttons, inputs, selects. When they press Enter or Space on a focused button, it should activate. When they press Enter on a focused link, it should follow the link. This all works for free if you use the right HTML elements.

The two rules:

1. Every clickable thing must be a real `<a>` (for navigation) or a real `<button>` (for actions). Never put a click handler on a bare `<div>`. A div is not keyboard-reachable, not readable by a screen reader, and not operated by Enter.
2. The focused element must have a visible focus ring. Browsers draw one by default. Do not write `outline: none` without providing a replacement. Without a visible focus state, keyboard users have no idea where they are on the page.

<figure markdown>
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-focus-title" style="max-width:100%;height:auto">
  <title id="svg-focus-title">A simple form with three fields. Focus order shown as numbered arrows: 1 moves to the name input, 2 moves to the email input, 3 moves to the submit button. Each focused element has a visible teal ring around it.</title>
  <defs>
    <marker id="bq-arrow-focus" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g>
    <rect x="60" y="30" width="560" height="200" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="100" y="60" width="480" height="38" rx="6" fill="#ffffff" stroke="#6b6b65" stroke-width="1.5"/>
    <rect x="100" y="118" width="480" height="38" rx="6" fill="#ffffff" stroke="#0d9488" stroke-width="2.5"/>
    <rect x="100" y="176" width="160" height="38" rx="6" fill="#0d9488" stroke="#0d9488" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#6b6b65">
    <text x="108" y="83">Name</text>
    <text x="108" y="141">Email</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">
    <text x="180" y="200">Submit</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#0d9488">
    <text x="590" y="141">focused</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-focus)">
    <path d="M30 79 Q45 79 98 79"/>
    <path d="M30 79 Q28 137 98 137"/>
    <path d="M30 79 Q26 195 98 195"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="15" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="26" y="75">1</text>
    <text x="26" y="134">2</text>
    <text x="26" y="192">3</text>
  </g>
</svg>
<figcaption>Tab moves focus in document order: 1 to the name field, 2 to the email field (shown with a teal ring), 3 to the submit button. A visible focus ring tells the keyboard user exactly where they are.</figcaption>
</figure>

```css
/* Good: custom visible focus style */
:focus-visible {
  outline: 3px solid #0d9488;
  outline-offset: 2px;
}
```

Use `:focus-visible` instead of `:focus`. It shows the ring for keyboard users but not for mouse clicks, which most designers prefer.

---

## Screen readers

A screen reader (Roman Urdu: software jo page ko zor se parhta hai) is software that reads the page content aloud through speakers or a braille display. NVDA and JAWS on Windows, VoiceOver on Mac and iPhone, and TalkBack on Android are common ones. Blind users, low-vision users, and people with reading disabilities rely on them every day.

A screen reader does not see the page visually. It reads the DOM: the tree of HTML elements your browser builds from your code. If your structure is meaningful HTML, the screen reader can announce the page heading, list the navigation links, move between sections, fill in a form, and activate buttons. If your structure is a pile of divs and spans, the screen reader announces almost nothing useful.

### Semantic HTML connects directly to accessibility

You covered HTML structure in Chapter 2. Every semantic tag you learned there has a direct effect on screen readers. Here is the connection:

| Semantic element | What the screen reader announces | Why it matters |
| --- | --- | --- |
| `<header>` | "Banner landmark" | Users can jump straight to the banner |
| `<nav>` | "Navigation landmark" | Users can skip to or past the nav |
| `<main>` | "Main landmark" | The fastest skip-to-content shortcut |
| `<footer>` | "Content info landmark" | Separates footer from main content |
| `<h1>` to `<h6>` | "Heading level 1..6, text" | Users navigate by heading like a table of contents |
| `<button>` | "Button, label" | Activatable with Enter or Space |
| `<a href>` | "Link, label" | Followable with Enter |
| `<label>` for `<input>` | Input announced with its label | User knows what to type |
| `<div>` / `<span>` | (nothing extra) | Completely silent to screen readers |

A `<div>` styled to look like a button announces itself as nothing. A real `<button>` announces "Button, Sign up". That one change helps blind users, keyboard users, and voice-control users all at once, with zero extra CSS.

---

## Alt text and form labels

Two of the most common accessibility mistakes are missing alt text on images and missing labels on form inputs.

**Alt text** goes in the `alt` attribute on every `<img>`. A screen reader reads it aloud instead of showing the image.

```html
<!-- bad: no alt -->
<img src="hero.jpg">

<!-- bad: useless alt -->
<img src="hero.jpg" alt="image">

<!-- good: describes what the image shows -->
<img src="hero.jpg" alt="Three students working on laptops at the Bano Qabil campus in Sahiwal">

<!-- decorative image: empty alt, screen readers skip it -->
<img src="divider-line.svg" alt="">
```

If an image is pure decoration, use `alt=""`. The screen reader will skip it. If an image conveys information, describe what it shows, not how it looks ("a photo of..."). If an image is a chart, describe the data it shows.

**Form labels** connect a text description to its input. Without one, a screen reader announces "edit text" with no idea what the field is for.

```html
<!-- bad: placeholder only, no label -->
<input type="email" placeholder="Your email">

<!-- good: label linked by the for/id pair -->
<label for="user-email">Your email address</label>
<input type="email" id="user-email" placeholder="you@example.com">
```

The `for` on the label and the `id` on the input must match. When they do, clicking the label also focuses the input, which is a free bonus for everyone.

---

## Readable typography

A page can have perfect contrast and correct HTML and still be hard to read if the typography is poor. Three things matter most for beginners:

- **Font size**: Use at least 16px for body text. Anything smaller is a burden on low-vision users and anyone reading on a phone.
- **Line height**: Set `line-height` to about 1.5 for body text. Lines packed too tight feel hard to follow from the end of one line to the start of the next.
- **Line length**: Keep lines to roughly 65 to 75 characters wide. Very long lines make the eye work too hard to find the next line.

```css
body {
  font-size: 16px;
  line-height: 1.5;
  max-width: 70ch; /* ch is roughly one character wide */
}
```

`70ch` is a convenient CSS unit because it measures in characters. `70ch` means "70 average-width characters", which puts your line length in the right zone without any calculation.

---

## Motion sensitivity

Some people experience nausea, vertigo, or headaches from large animations. Parallax scrolling, spinning loaders, and heavy transitions can all trigger this. CSS gives you a media query to detect when a user has turned on "reduce motion" in their system settings.

```css
/* default: animations are fine */
.card {
  transition: transform 0.3s ease;
}

/* user asked for less motion: respect it */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

This is one small habit with a big payoff. It costs you perhaps five lines of CSS per animation, and it prevents real physical discomfort for the people who need it.

??? note urdu "اردو میں مزید وضاحت"
    ایکسیسیبیلٹی کا مطلب ہے اپنی ویب سائٹ کو ہر طرح کے لوگوں کے لیے قابل استعمال بنانا۔ رنگوں کا فرق کافی ہونا چاہیے تاکہ کم نظر والے پڑھ سکیں۔ ہر چیز کی بورڈ سے بھی کام کرنی چاہیے، صرف ماؤس سے نہیں۔ سیمنٹک ایچ ٹی ایم ایل جیسے `header`، `nav`، اور `button` استعمال کریں کیونکہ اسکرین ریڈر انہیں سمجھتا ہے۔ تصویروں پر `alt` ٹیکسٹ لازمی لگائیں۔ فارم کے ہر خانے پر `label` ضرور لگائیں۔ اور جن لوگوں کو حرکت سے تکلیف ہوتی ہے ان کے لیے `prefers-reduced-motion` کا خیال رکھیں۔

---

## Semantic landmarks diagram

<figure markdown>
<svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-landmarks-title" style="max-width:100%;height:auto">
  <title id="svg-landmarks-title">A page layout showing semantic HTML regions: a header landmark at the top, a nav landmark below it, a main landmark in the centre taking most of the height, and a footer landmark at the bottom.</title>
  <g>
    <rect x="60" y="20" width="380" height="380" rx="8" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="80" y="36" width="340" height="52" rx="6" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="80" y="100" width="340" height="36" rx="6" fill="#f4f4f1" stroke="#6b6b65" stroke-width="1.5" stroke-dasharray="5 3"/>
    <rect x="80" y="148" width="340" height="192" rx="6" fill="#f8f8f5" stroke="#0d9488" stroke-width="2"/>
    <rect x="80" y="352" width="340" height="36" rx="6" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="250" y="67">&lt;header&gt;: Banner landmark</text>
    <text x="250" y="122">&lt;nav&gt;: Navigation landmark</text>
    <text x="250" y="248">&lt;main&gt;: Main landmark</text>
    <text x="250" y="374">&lt;footer&gt;: Content info landmark</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="250" y="84">Logo, site name, skip link</text>
    <text x="250" y="137">Primary navigation links</text>
    <text x="250" y="265">Page content lives here</text>
    <text x="250" y="283">Headings, text, images, forms</text>
    <text x="250" y="388">Links, copyright, contact</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="10" fill="#0d9488" text-anchor="end">
    <text x="420" y="165">screen reader landmark</text>
  </g>
</svg>
<figcaption>Using semantic elements creates named landmarks. Screen reader users press a shortcut to jump directly to the main landmark and skip the header and nav completely. This is one of the biggest time-savers for blind users on a page they visit often.</figcaption>
</figure>

---

### Try this

Close your mouse. Open any website you use regularly and try to complete a simple task using only the keyboard. Press Tab to move through the page. Press Enter or Space to activate things. Press Shift+Tab to go back.

Notice:

1. Can you see where the focus is at all times? If the focus ring disappears, that is a real accessibility failure.
2. Does Tab move through things in a sensible order, or does it jump around the page unexpectedly?
3. Can you reach every button and link?

Then open the WebAIM contrast checker at `webaim.org/resources/contrastchecker`. Pick the main text colour and background colour from a website you are building or plan to build. Paste in the hex values and check whether it passes WCAG AA. If it fails, adjust the foreground colour until it passes.

---

## Knowledge check

Do not write anything down. Just see if you can answer these in your head. If you cannot, scroll back up.

1. What is the minimum contrast ratio for normal body text under WCAG AA?
2. Why should you never use a `<div>` for a clickable action instead of a `<button>`?
3. What does the `alt` attribute on an `<img>` tag do, and what should you write for a purely decorative image?
4. What does the CSS media query `prefers-reduced-motion: reduce` let you do?
5. Name three semantic HTML elements that create landmarks a screen reader user can jump to.

---

## What's next

You can now build pages that work for everyone, not just people exactly like you. The next lesson brings the visual side: how to use contrast, size, space, and weight so the most important thing on the page is also the most visible.

[Next lesson: 4.5 Visual hierarchy, then polish &rarr;](4-5-visual-hierarchy-and-polish.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You do not need them to continue.

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker) - paste any two hex colours and get an instant pass or fail with the ratio shown.
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/) - the official guidelines in plain checklist form. Focus on Level AA, which is the standard most projects aim for.
- [Nielsen Norman Group: Accessibility Articles](https://www.nngroup.com/topic/accessibility/) - short, research-backed articles on making interfaces usable for everyone. The pieces on form design and focus indicators are especially practical.

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[accessibility]: Designing so that people with disabilities can use your page. (Roman Urdu: har insaan ke liye kaam karne wali design)
*[contrast ratio]: The brightness difference between a text colour and its background. (Roman Urdu: text aur background ke darmiyan ujale ka farq)
*[screen reader]: Software that reads the page aloud for blind or low-vision users. (Roman Urdu: software jo page ko zor se parhta hai)
*[keyboard navigation]: Using Tab, Enter, and arrow keys instead of a mouse. (Roman Urdu: mouse ki bajaye keyboard se page use karna)
*[focus state]: The visual ring or highlight that shows which element the keyboard is currently on. (Roman Urdu: keyboard abhi kahan hai woh dikhane wala nishan)
*[alt text]: The text description inside the alt attribute of an img tag. (Roman Urdu: tasveer ki jagah screen reader ke liye likhi gai ibaarat)
*[semantic HTML]: Using tags whose names describe their meaning, like header, nav, and button. (Roman Urdu: woh HTML tags jo apna matlab khud batate hain)
*[prefers-reduced-motion]: A CSS media query that detects when a user has asked their device to reduce animations. (Roman Urdu: user ne apne device mein animations kam karne ka option on kiya hua ho)
