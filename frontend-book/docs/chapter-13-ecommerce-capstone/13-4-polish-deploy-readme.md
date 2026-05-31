---
lesson_id: frontend.ch13.l04
title: "13.4 Polish, deploy, and a great README"
chapter: 13
order: 4
estimated_minutes: 50
prerequisites:
  - frontend.ch13.l03
---

# 13.4 Polish, deploy, and a great README

Your store works. Now you make it shine and ship it. This last lesson adds smooth motion, checks speed and access, and puts your project online. By the end you will hold a real URL you can send to anyone.

## What you'll know by the end

- Add tasteful GSAP page transitions and scroll reveals that respect reduced motion.
- Run a Lighthouse audit and read the four scores.
- Apply quick fixes for performance and accessibility.
- Deploy your store to Vercel and get a live URL.
- Write a portfolio-grade README from a clear template.
- Record a 60-second Loom demo of your store.

---

## Add polish with GSAP

In Chapter 12 you learned GSAP and ScrollTrigger. Now use them gently. Two touches are enough. First, fade pages in when the route changes. Second, reveal product cards as they scroll into view.

Here is a small page transition you can wrap around your routed content.

```jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

function PageFade({ children }) {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 });
  }, [location.pathname]);

  return <div ref={ref}>{children}</div>;
}
```

This runs every time the path changes. The content fades up softly. If the user asked for less motion, you skip the animation and show the page right away.

Now reveal product cards on scroll. Add this once on your product grid page.

```jsx
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  gsap.from(".product-card", {
    opacity: 0,
    y: 24,
    duration: 0.5,
    stagger: 0.08,
    scrollTrigger: { trigger: ".product-grid", start: "top 80%" },
  });
}, []);
```

Each card rises into place as the grid enters the screen. The `stagger` makes them appear one after another. Keep durations short. Slow motion feels heavy and annoys people.

!!! warning
    Keep animations tasteful and respect prefers-reduced-motion. A flashy store that nobody can use is a failed store. Some people get dizzy from motion, so always give them a calm version.

---

## A performance pass with Lighthouse

Lighthouse (Roman Urdu: page ko jaanchne wala muft tool) is a free tool built into Chrome. It grades your page and tells you what to fix. You do not guess. The report points at the problem.

Open your live site or local site in Chrome. Press F12 to open DevTools. Click the **Lighthouse** tab. Pick **Mobile**, then click **Analyze page load**. Wait a few seconds.

### The four Lighthouse scores

<figure markdown>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lighthouse" style="max-width:100%;height:auto">
  <title id="svg-lighthouse">Four Lighthouse score dials side by side. Performance, Accessibility, Best Practices, and SEO, each showing a circular gauge from 0 to 100 with a needle.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="88" cy="95" r="62"/>
    <circle cx="263" cy="95" r="62"/>
    <circle cx="438" cy="95" r="62"/>
    <circle cx="613" cy="95" r="62"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="2" fill="none">
    <path d="M38 130 A62 62 0 0 1 138 130" stroke="#6b6b65" stroke-width="8" stroke-linecap="round"/>
    <path d="M38 130 A62 62 0 0 1 138 130" stroke="#1f1f1c" stroke-width="8" stroke-linecap="round" stroke-dasharray="90 110"/>
    <path d="M213 130 A62 62 0 0 1 313 130" stroke="#6b6b65" stroke-width="8" stroke-linecap="round"/>
    <path d="M213 130 A62 62 0 0 1 313 130" stroke="#1f1f1c" stroke-width="8" stroke-linecap="round" stroke-dasharray="100 110"/>
    <path d="M388 130 A62 62 0 0 1 488 130" stroke="#6b6b65" stroke-width="8" stroke-linecap="round"/>
    <path d="M388 130 A62 62 0 0 1 488 130" stroke="#1f1f1c" stroke-width="8" stroke-linecap="round" stroke-dasharray="95 110"/>
    <path d="M563 130 A62 62 0 0 1 663 130" stroke="#6b6b65" stroke-width="8" stroke-linecap="round"/>
    <path d="M563 130 A62 62 0 0 1 663 130" stroke="#1f1f1c" stroke-width="8" stroke-linecap="round" stroke-dasharray="88 110"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <g><text x="88" y="88">Perf</text><text x="88" y="105">0-100</text></g>
    <g><text x="263" y="88">Access</text><text x="263" y="105">0-100</text></g>
    <g><text x="438" y="88">Best</text><text x="438" y="105">Practices</text></g>
    <g><text x="613" y="88">SEO</text><text x="613" y="105">0-100</text></g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="88" y="175">Performance</text>
    <text x="263" y="175">Accessibility</text>
    <text x="438" y="175">Best Practices</text>
    <text x="613" y="175">SEO</text>
  </g>
</svg>
<figcaption>Lighthouse gives four scores from 0 to 100. Aim for green (90+) in each. The report tells you exactly which lines to change.</figcaption>
</figure>

Here is what each score measures and what beginners usually fix first.

| Score | What it measures | Common beginner fix |
| --- | --- | --- |
| Performance | How fast the page loads and reacts | Compress images, add `width`/`height`, use `loading="lazy"` |
| Accessibility | How easily everyone can use the site | Add `alt` text, link `<label>` to inputs, keep focus visible |
| Best Practices | Safe and correct coding habits | Use HTTPS, avoid deprecated APIs |
| SEO | How well search engines can read the page | Add a `<meta name="description">`, use heading order correctly |

Most beginner stores lose points on images. Here are three common fixes.

```jsx
<img
  src="/shoe.webp"
  alt="Black running shoe, side view"
  width="400"
  height="400"
  loading="lazy"
/>
```

The `width` and `height` stop the page from jumping while images load. The `loading="lazy"` tells the browser to load images only when they come near the screen. Also compress big images first. A 3 MB photo should become around 100 KB. Use a tool like Squoosh to shrink them.

!!! tip
    Run Lighthouse before you call the project done. The score points you straight to easy wins. A red item is often a one-line fix that lifts your whole grade.

---

## An accessibility pass

Accessibility (Roman Urdu: sab logon ke liye istemaal asaani) means your store works for everyone. That includes people using a keyboard or a screen reader. This is not extra. It is part of a finished site.

Walk through this checklist on your store before you deploy.

| Check | Pass when | How to fix if it fails |
| --- | --- | --- |
| Images have `alt` text | Every `<img>` has a clear description | Add `alt="..."` that describes what the image shows |
| Keyboard reachable | Tab key reaches every link and button | Do not hide or remove focusable elements |
| Visible focus ring | Focused item shows an outline | Never remove `outline` without adding your own ring |
| Labels tied to fields | Every input has a linked `<label>` | Match `htmlFor` on the label to `id` on the input |
| Colour contrast | Text is easy to read on its background | Use Lighthouse or the Chrome contrast checker to verify |

Here is a labelled field with a visible focus state.

```jsx
<label htmlFor="email">Email</label>
<input id="email" type="email" className="focus:outline focus:outline-2" />
```

The `htmlFor` matches the input `id`, so screen readers announce the label. The focus class draws a clear ring when the user tabs to it. Never remove focus outlines without adding your own. A keyboard user gets lost without them.

??? note urdu "اردو میں مزید وضاحت"
    Lighthouse ایک مفت ٹول ہے جو آپ کے ویب پیج کو جانچتا ہے۔ یہ چار چیزوں کو نمبر دیتا ہے، یعنی رفتار، رسائی، اچھی عادات، اور سرچ۔ آپ کروم میں F12 دبا کر اور Lighthouse ٹیب کھول کر اسے چلاتے ہیں۔ کم نمبر کا مطلب ہے کہ کوئی مسئلہ ہے، اور رپورٹ آپ کو بتاتی ہے کہ کیا ٹھیک کرنا ہے۔ اکثر تصویروں کو چھوٹا کرنا اور alt text لگانا ہی سب سے بڑا فرق ڈالتا ہے۔

---

## Deploy to Vercel

In Chapter 9 you deployed once. The steps are the same here. Push your project to GitHub, then let Vercel build it for you.

```bash
git add .
git commit -m "Polish store and add README"
git push
```

This sends your latest code to GitHub. Now go to vercel.com and sign in with GitHub. Click **Add New** and then **Project**. Pick your store repository and click **Import**. Vercel reads your Vite setup on its own. Click **Deploy** and wait.

When it finishes, Vercel gives you a live URL like `your-store.vercel.app`. Open it and click around. That link is your project, online, for anyone in the world to see.

### Pre-deploy checklist

Go through this table before you push your final commit. Each item takes two minutes or less.

| Item | Why it matters | Done? |
| --- | --- | --- |
| All five routes load without errors | A broken route fails the whole project | |
| Cart persists after page refresh | Shows localStorage works correctly | |
| Every image has `alt` text | Accessibility and Lighthouse score | |
| No console errors in the browser | Errors scare future employers | |
| Images compressed to under 200 KB each | Big images tank the Performance score | |
| Form shows error messages when empty | Shows you handle edge cases | |
| `<title>` tag set in `index.html` | Basic SEO requirement | |
| README.md is in the repo root | First thing visitors see on GitHub | |

Tick these off before you call the project done. Skipping them is the difference between a project that looks finished and one that just barely works.

---

## Write a portfolio-grade README

The README (Roman Urdu: project ko samjhane wali file) is the first thing people read on GitHub. A strong README makes you look serious. Create a file named `README.md` in your project root. Use this template.

```markdown
# Shoe Store

A small ecommerce store built with React and Tailwind CSS.

**Live demo:** https://your-store.vercel.app

![Store screenshot](./screenshot.png)

## Tech stack

- React + Vite
- React Router
- Tailwind CSS
- GSAP for animation

## Features

- Browse products in a responsive grid
- Add items to a cart
- Update quantities and remove items
- Smooth page transitions and scroll reveals

## Run locally

```bash
git clone https://github.com/you/shoe-store.git
cd shoe-store
npm install
npm run dev
```

## What I learned

I learned how to manage state, route between pages, and deploy a real site.
```

Replace the title, links, and details with your own. The screenshot line shows an image saved in your project. The "What I learned" part matters most to employers. It shows you understood the work, not just copied it.

### What a great README contains

| Section | What to write | Why it matters |
| --- | --- | --- |
| Title and one-line description | Name + what it does in plain words | Tells readers in three seconds what the project is |
| Live demo link | Your Vercel URL | Lets anyone see it without cloning |
| Screenshot | A clear image of the running app | Shows the design at a glance |
| Tech stack | List of libraries and tools | Tells employers what you know |
| Features | 3 to 5 bullet points | Shows the scope of work you did |
| Run locally | Clone, install, and dev commands | Lets other developers run it |
| What I learned | One to two paragraphs in your own words | This is the most important part for job applications |

You do not need all eight. A README with at least the first five sections already puts you ahead of most student projects.

---

## Record a 60-second Loom demo

A short video shows your store in action. Go to loom.com and install the free recorder. Click record, pick your browser tab, and walk through the store. Open the home page, click a product, add it to the cart, and show the cart.

Keep it under 60 seconds. Speak simply. Say what you built and what each part does. Paste the Loom link into your README and your job applications. People trust what they can see working.

---

!!! note "A note on shukr"
    You started not knowing what HTML was. Now you have built and shipped a real
    store. Pause and feel shukr, gratitude, for the time, the teachers, and your own
    effort that brought you here. Then go build the next thing.

---

### Try this

Ship your store the whole way. Add the `PageFade` transition and the scroll reveal, both guarding for `prefers-reduced-motion`. Run a Lighthouse audit on mobile and fix the easy image wins until all four scores look healthy. Push to GitHub, deploy on Vercel, and get your live URL. Then write your README from the template, drop in a screenshot and your live link, and record a 60-second Loom walking through the store. Paste the Loom link into the README.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why do you check for `prefers-reduced-motion` before running an animation?
2. What four scores does a Lighthouse audit give you?
3. Name two quick fixes that improve image performance.
4. What part of a README matters most to employers, and why?

---

## What's next

Chapter 13 is done. You now have a shippable, portfolio-worthy project with a live URL. The next chapter starts Tier 2 and covers modern React patterns. These patterns make you a stronger, more confident developer.

[Next chapter: 14. Modern React patterns &rarr;](../chapter-14-modern-react-patterns/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)
- [Make a README](https://www.makeareadme.com/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Lighthouse]: A free Chrome tool that grades a page on speed, access, habits, and search. (Roman Urdu: page ko jaanchne wala muft tool)
*[performance]: How fast a page loads and responds to the user. (Roman Urdu: page kitni tezi se chalta hai)
*[accessibility]: How easily everyone, including keyboard and screen reader users, can use a site. (Roman Urdu: sab logon ke liye istemaal asaani)
*[README]: A text file that explains what a project is and how to run it. (Roman Urdu: project ko samjhane wali file)
*[lazy loading]: Loading images only when they come near the screen. (Roman Urdu: tasveer tabhi load karna jab zaroorat ho)
