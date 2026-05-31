---
lesson_id: frontend.ch19.l03
title: "19.3 Performance and Core Web Vitals"
chapter: 19
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch19.l02
---

# 19.3 Performance and Core Web Vitals

Most of your users open your site on a budget phone, on a slow data connection. Every megabyte you send costs them money and time. A heavy page loads slowly, jumps around, and feels broken even when the code is correct. In this lesson you learn how to measure speed and fix the worst problems.

## What you'll know by the end

- Why performance matters more for users in Pakistan.
- How to run Lighthouse in Chrome and read its four scores.
- What LCP, INP, and CLS mean in plain words.
- How to size, format, and lazy-load images so they load fast.
- How to load fonts and JavaScript so the page shows quickly.
- How to run Lighthouse on your Chapter 13 capstone and fix the top issues.

---

## Why speed matters here

Many of your users are on a slow 3G or weak 4G signal. Their phones have small memory and slow processors. Data also costs money, so a fat page wastes their rupees.

A slow page makes people leave before it even loads. If your shop is slow, the user buys nothing. So speed is not a bonus. It is part of the product.

The good news is that small fixes give big wins. You do not need a faster phone. You need a lighter page.

---

## Running Lighthouse

You met Lighthouse back in Lesson 13.4. Here is the quick recall.

Open your site in Chrome. Press `F12` to open DevTools. Click the **Lighthouse** tab. Choose **Mobile** as the device. Then click **Analyze page load**.

Lighthouse gives you four scores out of 100:

- **Performance**: how fast the page loads and responds.
- **Accessibility**: how usable it is for everyone.
- **Best Practices**: safe and correct coding habits.
- **SEO**: how well search engines can read it.

Aim for green (90 and above) on each. Red means something needs work now. Lighthouse also lists exact problems with each one, so read that list.

!!! tip
    Always test in **Mobile** mode with throttling on. Throttling slows the connection to copy a real phone on slow data. That is much closer to your actual Pakistani user than your fast laptop on Wi-Fi.

---

## The three Core Web Vitals

Google measures three numbers to judge real user experience. They are called Core Web Vitals. Learn these three names.

| Vital | Full name | What it measures | Good target | What hurts it most |
|-------|-----------|------------------|-------------|-------------------|
| LCP | Largest Contentful Paint | How fast the biggest thing on screen shows up | Under 2.5 s | Large unoptimized images, render-blocking scripts |
| INP | Interaction to Next Paint | How fast the page reacts to a tap or click | Under 200 ms | Heavy JavaScript running on every user action |
| CLS | Cumulative Layout Shift | How much the page jumps around while loading | Under 0.1 | Images with no `width`/`height`, late-loading ads or fonts |

LCP is about loading. The biggest item is usually a hero image or a big heading. If it shows in under 2.5 seconds, the user feels the page is fast.

INP is about responding. When the user taps a button, the page should react in under 200 milliseconds. A slow reaction feels frozen.

CLS is about stability. You have seen a page where you go to tap a link, then an image loads above it and pushes everything down. That jump is layout shift. Keep it under 0.1.

### What a loading timeline looks like

The diagram below shows a simplified page load timeline. The key event is LCP: the moment the biggest thing on screen is fully painted.

<figure markdown>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lcp-timeline" style="max-width:100%;height:auto">
  <title id="svg-lcp-timeline">A horizontal page load timeline from 0 to 4 seconds. The HTML arrives near 0s. CSS and fonts arrive by 0.8s. The first content paint happens around 1s. The LCP, the largest image, paints at 2.1s which is inside the good target of 2.5s. At 3s an ad banner loads late and causes a layout shift, pushing CLS above the good threshold.</title>
  <defs>
    <marker id="tl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g font-family="Inter, sans-serif">
    <line x1="40" y1="100" x2="660" y2="100" stroke="#1f1f1c" stroke-width="2" marker-end="url(#tl-arrow)"/>
    <g stroke="#6b6b65" stroke-width="1" stroke-dasharray="4 3">
      <line x1="40" y1="40" x2="40" y2="160"/>
      <line x1="195" y1="40" x2="195" y2="160"/>
      <line x1="350" y1="40" x2="350" y2="160"/>
      <line x1="505" y1="40" x2="505" y2="160"/>
      <line x1="660" y1="40" x2="660" y2="160"/>
    </g>
    <g fill="#6b6b65" font-size="11" text-anchor="middle">
      <text x="40" y="175">0 s</text>
      <text x="195" y="175">1 s</text>
      <text x="350" y="175">2 s</text>
      <text x="505" y="175">3 s</text>
      <text x="660" y="175">4 s</text>
    </g>
    <rect x="40" y="80" width="30" height="20" rx="3" fill="#1f1f1c"/>
    <rect x="75" y="80" width="90" height="20" rx="3" fill="#6b6b65"/>
    <rect x="170" y="80" width="40" height="20" rx="3" fill="#6b6b65"/>
    <rect x="80" y="55" width="220" height="20" rx="3" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <g fill="#1f1f1c" font-size="12" text-anchor="middle">
      <text x="55" y="94">HTML</text>
      <text x="120" y="94">CSS + Fonts</text>
      <text x="190" y="94">JS</text>
      <text x="190" y="70">Hero image (LCP element)</text>
    </g>
    <line x1="295" y1="50" x2="295" y2="115" stroke="#1f1f1c" stroke-width="2" stroke-dasharray="none"/>
    <g fill="#1f1f1c" font-size="12" text-anchor="middle">
      <text x="295" y="135">LCP: 2.1 s</text>
      <text x="295" y="150">(good, under 2.5 s)</text>
    </g>
    <line x1="505" y1="50" x2="505" y2="115" stroke="#6b6b65" stroke-width="2" stroke-dasharray="5 3"/>
    <g fill="#6b6b65" font-size="12" text-anchor="middle">
      <text x="530" y="135">Late ad loads</text>
      <text x="530" y="150">CLS jumps</text>
    </g>
  </g>
</svg>
<figcaption>A simplified load timeline. The hero image paints at 2.1 s, inside the 2.5 s LCP target. A late-loading ad at 3 s causes a layout shift, hurting CLS. Fix the ad by reserving space for it, and fix a slow LCP by optimizing the hero image.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    Core Web Vitals تین اہم پیمائشیں ہیں جو صفحے کا تجربہ ناپتی ہیں۔ LCP بتاتا ہے کہ سب سے بڑی چیز، عموماً ہیرو تصویر، کتنی جلدی نظر آتی ہے، اور یہ ڈھائی سیکنڈ سے کم ہونی چاہیے۔ INP ناپتا ہے کہ صفحہ آپ کے ٹچ کا کتنی جلدی جواب دیتا ہے، اور یہ دو سو ملی سیکنڈ سے کم ہونا چاہیے۔ CLS بتاتا ہے کہ صفحہ لوڈ ہوتے وقت کتنا اچھلتا ہے، جیسے تصویر بغیر سائز کے لوڈ ہو اور نیچے کا مواد نیچے چلا جائے۔ تصویر پر width اور height لگانا CLS کا سب سے آسان علاج ہے۔

---

## Images done right

Images are usually the heaviest part of a page. You saw image basics in Lessons 3.4 and 14.4. Here is the performance view.

Size the image to the space it fills. Do not load a 4000 pixel wide photo into a 400 pixel box. Resize it first.

Always set `width` and `height` on the image. This reserves the space before the image loads, so the page does not jump. That protects your CLS score.

```jsx
// Bad: no size, so the page jumps when this loads
<img src="/shoe.jpg" alt="Running shoe" />

// Good: space is reserved, no layout shift
<img src="/shoe.jpg" alt="Running shoe" width="400" height="300" />
```

Use modern formats like WebP or AVIF. They are much smaller than old JPG or PNG for the same quality.

Lazy-load images that are below the fold, meaning the ones the user must scroll to see. They load only when needed, so the first screen is fast.

```jsx
// Lazy-load an offscreen product image
<img
  src="/product-12.webp"
  alt="Blue jacket"
  width="300"
  height="300"
  loading="lazy"
/>
```

If you use Next.js, the `next/image` component does most of this for you. It sets sizes, picks modern formats, and lazy-loads automatically.

!!! warning
    A heavy hero image or an image with no `width` and `height` is the most common cause of a bad LCP and a bad CLS. Fix your big images first. You will see the score jump.

---

## Loading fonts without the jump

Custom fonts take time to download. While they load, the browser may hide your text or swap it in suddenly. Both feel bad.

Use `font-display: swap`. This shows your text in a normal fallback font right away. When the real font arrives, it swaps in. The user always sees words, never a blank space.

```css
@font-face {
  font-family: "Sora";
  src: url("/fonts/sora.woff2") format("woff2");
  font-display: swap;
}
```

This keeps text visible during load and helps avoid layout shift, which protects CLS.

---

## Code splitting

Your JavaScript also has a size. If you send all of it on the first load, even pages that do not need it, the start is slow.

Code splitting means you load only the JavaScript a page needs right now. You load the rest later, when the user actually goes there.

In plain JavaScript you use a dynamic `import`.

```jsx
// Load the chart code only when the user opens the report
button.addEventListener("click", async () => {
  const { drawChart } = await import("./chart.js");
  drawChart();
});
```

In React you use `React.lazy` to split a component into its own chunk.

```jsx
import { lazy, Suspense } from "react";

// This heavy page loads only when someone visits it
const Checkout = lazy(() => import("./Checkout.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Checkout />
    </Suspense>
  );
}
```

The first load stays small, so the user sees something fast.

---

## Bundle analysis

Sometimes your JavaScript is big and you do not know why. A bundle analyzer shows you. It draws a map of every library inside your build, sized by how much space it takes.

```bash
# One common analyzer for Vite projects
npm install --save-dev rollup-plugin-visualizer
```

After you build, it opens a chart. You might find one chart library or one date library eating half your bundle. Then you can replace it with a smaller one or remove it. You only fix what you can see, so measure first.

---

## Performance fixes at a glance

Here is a checklist you can run on any project. If a row is failing in Lighthouse, use the fix column.

| Problem | Which metric it hurts | Fix |
|---------|----------------------|-----|
| Hero image is a large JPG, not compressed | LCP | Convert to WebP, resize to the display size |
| Images have no `width` or `height` | CLS | Add both attributes to every `<img>` |
| All images load on page start | LCP (first paint is slow) | Add `loading="lazy"` to below-the-fold images |
| A big library is imported for one small job | LCP (large JS bundle) | Replace with a small helper or plain JS |
| All routes share one big JS file | LCP | Use `React.lazy` + `Suspense` to split routes |
| Custom font hides text while downloading | CLS, perceived speed | Add `font-display: swap` to your `@font-face` |
| Heavy event handler runs on every keystroke | INP | Debounce the handler or move work off the main thread |
| Third-party scripts load early | LCP | Load them with `async` or `defer` |

---

## Hands-on: speed up your Chapter 13 capstone

Open your Chapter 13 ecommerce capstone. Run Lighthouse in Mobile mode with throttling on. Read the top problems. You will likely see these three.

**1. Images have no dimensions.** Your product images probably have no `width` and `height`. Add them. This stops the page from jumping and helps both LCP and CLS.

```jsx
<img src={product.image} alt={product.name} width="300" height="300" />
```

**2. All images load at once.** Your product grid loads every image, even the ones far down the page. Add `loading="lazy"` to images below the first screen.

```jsx
<img src={product.image} alt={product.name} width="300" height="300" loading="lazy" />
```

**3. A heavy library bloats the bundle.** Maybe you pulled in a big library for one small job, like a full date library to show one date. Swap it for a tiny helper or plain JavaScript. Smaller bundle, faster first load.

Run Lighthouse again after each fix. Watch the score climb. That feedback loop is the whole game.

---

### Try this

Open any site you have built in Chrome, press `F12`, and run Lighthouse in Mobile mode with throttling on. Write down your four scores. Then pick the single biggest problem it lists, often an image with no `width` and `height`, fix just that one thing, and run Lighthouse again. Compare the before and after scores so you can see the win from one small change.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What do LCP, INP, and CLS each measure, and what is a good target for each?
2. Why does setting `width` and `height` on an image help your CLS score?
3. What does `font-display: swap` do while a custom font is still loading?
4. What problem does code splitting with `React.lazy` solve?

---

## What's next

You can now measure your site and fix the worst speed problems. The last step before launch is making sure your project is clean and safe to ship. In 18.4 you learn production hygiene, like checking environment variables, removing console logs, and a final pre-launch checklist.

[Next lesson: 18.4 Production hygiene &rarr;](19-4-production-hygiene.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [Chrome: Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[Core Web Vitals]: Three numbers Google uses to judge real page experience, LCP, INP, and CLS. (Roman Urdu: teen ahem maap jo page ka tajurba naapte hain)
*[LCP]: Largest Contentful Paint, how fast the biggest item on screen shows up. (Roman Urdu: sab se bari cheez kitni jaldi nazar aati hai)
*[INP]: Interaction to Next Paint, how fast the page reacts to a tap or click. (Roman Urdu: page tap ka kitni jaldi jawab deta hai)
*[CLS]: Cumulative Layout Shift, how much the page jumps around while loading. (Roman Urdu: page load hote waqt kitna uchalta hai)
*[code splitting]: Loading only the JavaScript a page needs now, and the rest later. (Roman Urdu: sirf zaroori JavaScript abhi load karna)
*[bundle]: The single packed file of all your JavaScript that the browser downloads. (Roman Urdu: tamam JavaScript ka ek packed file)
