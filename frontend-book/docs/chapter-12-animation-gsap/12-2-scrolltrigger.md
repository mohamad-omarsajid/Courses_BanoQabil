---
lesson_id: frontend.ch12.l02
title: "12.2 ScrollTrigger"
chapter: 12
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch12.l01
---

# 12.2 ScrollTrigger

In 12.1 you played animations on page load. But many sites animate things as you scroll down. A card fades in when it enters the screen. A section freezes while you scroll past it. ScrollTrigger is the GSAP plugin that makes all of this easy.

## What you'll know by the end

- What scroll-driven animation means and when to use it.
- How to register the ScrollTrigger plugin so GSAP can use it.
- How to attach a ScrollTrigger to a tween with the `scrollTrigger` object.
- What `trigger`, `start`, and `end` mean in plain words.
- How `scrub`, `pin`, and `toggleActions` change the behavior.
- How to build a fade-in on scroll and stagger items as they appear.

---

## What is scroll-driven animation

A normal tween starts the moment your code runs. A scroll-driven animation starts based on the scroll position instead. The animation plays when a certain element reaches a certain spot on the screen.

This feels natural to users. They scroll, and content reacts. ScrollTrigger (Roman Urdu: scroll par chalne wala GSAP plugin) watches an element and fires your animation at the right moment.

---

## Register the plugin first

ScrollTrigger is a separate plugin. GSAP does not know about it until you register it. You do this once, near the top of your file.

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

If you forget this line, your scroll animations will not work. GSAP may even warn you in the console. So register the plugin before you write any ScrollTrigger code.

---

## Attaching a ScrollTrigger to a tween

You add scroll behavior inside the vars object of a tween. You pass a `scrollTrigger` object. Inside it you describe what to watch and when to fire.

```js
gsap.from(".box", {
  y: 60,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
  },
});
```

The `trigger` (Roman Urdu: woh element jise GSAP nazar mein rakhta hai) is the element GSAP watches. The `start` tells GSAP when to begin the animation. Here it begins when the top of the box reaches 80 percent down the screen.

---

## Understanding start and end

The `start` and `end` use a two word form like `"top 80%"`. The first word is a position on the element. The second word is a position in the viewport. So `"top 80%"` means the top of the element hits the line 80 percent down the screen.

The same idea works for `end`, like `"bottom 20%"`. As the element scrolls from the start line to the end line, GSAP tracks the progress. With `scrub` on, that progress drives the animation.

<figure markdown>
<svg viewBox="0 0 560 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-st-title" style="max-width:100%;height:auto">
  <title id="svg-st-title">A browser viewport with two lines. The start line is near the bottom where an element enters; the end line is near the top where it leaves. The page scrolls upward.</title>
  <g font-family="Inter, sans-serif">
    <g text-anchor="middle">
      <text x="280" y="20" font-size="13" fill="#6b6b65">browser viewport</text>
    </g>
    <rect x="150" y="30" width="260" height="410" rx="8" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="200" y="358" width="160" height="62" rx="4" fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5"/>
    <g text-anchor="middle">
      <text x="280" y="394" font-size="14" fill="#1f1f1c">element</text>
    </g>
    <g stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="6 4">
      <line x1="150" y1="350" x2="410" y2="350"/>
      <line x1="150" y1="140" x2="410" y2="140"/>
    </g>
    <g fill="#1f1f1c">
      <text x="420" y="346" font-size="14" font-weight="600">start</text>
      <text x="420" y="136" font-size="14" font-weight="600">end</text>
    </g>
    <g fill="#6b6b65" font-size="12">
      <text x="420" y="364">element enters</text>
      <text x="420" y="154">element leaves</text>
    </g>
  </g>
  <defs>
    <marker id="bq-arrow-st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-st)">
    <line x1="115" y1="360" x2="115" y2="180"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="100" y="280" transform="rotate(-90 100 280)">scroll</text>
  </g>
</svg>
<figcaption>start and end are positions in the viewport. As the element scrolls from the start line to the end line, the animation plays.</figcaption>
</figure>

Here is a quick reference for the most common start/end strings.

| String | Meaning |
| --- | --- |
| `"top 80%"` | Element top reaches 80% down the viewport. Common for fade-in entrances. |
| `"top center"` | Element top reaches the middle of the screen. |
| `"top top"` | Element top reaches the top of the viewport. Used with `pin`. |
| `"bottom top"` | Element bottom reaches the top of the viewport. Used to end parallax. |
| `"center center"` | Center of element meets center of viewport. |
| `"+=500"` | 500px after the start position. Used as an end offset for pinned sections. |

!!! tip
    Turn on `markers: true` while you build. ScrollTrigger draws the start and end lines right on the screen. This helps you see exactly where your animation begins and ends. Remove it before you ship.

??? note urdu "اردو میں مزید وضاحت"
    `start` اور `end` دو لفظوں سے بنتے ہیں۔ پہلا لفظ خود ایلیمنٹ پر ایک جگہ بتاتا ہے، اور دوسرا لفظ اسکرین پر ایک جگہ بتاتا ہے۔ مثلاً `"top 80%"` کا مطلب ہے کہ جب ایلیمنٹ کا اوپری کنارہ اسکرین کے اوپر سے 80 فیصد نیچے والی لائن تک پہنچے، تب اینیمیشن شروع ہو۔ `scrub` اینیمیشن کو گھڑی کے بجائے آپ کے اسکرول سے جوڑ دیتا ہے۔ `toggleActions` چار لمحوں پر کیا کرنا ہے وہ بتاتا ہے: اندر آنا، باہر جانا، واپس اندر آنا، اور واپس اوپر جانا۔

---

## Fade-in on scroll

This is the most common pattern. An element starts invisible and slightly low. When it scrolls into view, it fades up into place.

```js
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".card",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
});
```

The card animates from `y: 50` and `opacity: 0` to its normal spot. It starts when the card top reaches 85 percent down the screen. The `toggleActions` controls four moments, which we cover next.

---

## toggleActions

`toggleActions` takes four values in order. They are enter, leave, enter back, and leave back. Each value says what to do at that moment. Common choices are `play`, `reverse`, `none`, and `restart`.

```js
scrollTrigger: {
  trigger: ".card",
  start: "top 85%",
  toggleActions: "play none none reverse",
}
```

This means: play when you scroll in, do nothing when you scroll past it, do nothing when you scroll back to it, and reverse when you scroll back above it. So the card fades in coming down and fades out going up. Use `none` for moments you want to ignore.

---

## scrub versus toggleActions

`scrub` and `toggleActions` are the two main ways to control how your animation relates to scroll. They do very different things.

| Feature | `toggleActions` | `scrub` |
| --- | --- | --- |
| How it works | Fires the tween like a button (play, reverse, restart, etc.) at key scroll moments | Ties animation progress directly to scroll position |
| Timing | Runs on its own clock (duration still counts) | Duration ignored; scroll position is the clock |
| Scroll up behavior | You choose per moment (`reverse`, `none`, etc.) | Always plays backward as you scroll up |
| Smoothing | Not applicable | `scrub: 1` adds a 1-second lag for a softer feel |
| Best for | Entrance effects that play once or reverse | Parallax, storytelling sections, progress bars |
| Requires `end`? | No (only uses `start` by default) | Yes, needs `end` to define the range |

Use `toggleActions` when you want a one-shot entrance animation. Use `scrub` when you want the animation to feel physically glued to your scroll hand.

---

## scrub: tie the animation to the scroll

With `scrub`, the animation progress follows your scroll position. Scroll down and it plays forward. Scroll up and it plays backward. The animation is glued to your scroll, not to the clock.

```js
gsap.to(".banner", {
  x: 200,
  scrollTrigger: {
    trigger: ".banner",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
  },
});
```

The banner moves right as you scroll the element from the start line to the end line. Stop scrolling, and the banner stops. You can also write `scrub: 1` to add a small smoothing delay in seconds.

---

## Staggering elements on scroll

You can animate many elements together and stagger them. They appear one after another as the group scrolls into view. This works just like the stagger you learned in 12.1.

```js
gsap.from(".feature", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".features",
    start: "top 75%",
  },
});
```

GSAP watches the `.features` container. When its top hits 75 percent down the screen, each `.feature` fades up in turn. The `stagger: 0.15` adds a small gap between them.

---

## pin: freeze a section while scrolling

`pin` holds an element in place while the user keeps scrolling. The rest of the page moves, but the pinned section stays still until the trigger ends. This is great for storytelling sections.

```js
gsap.to(".panel", {
  scale: 1.2,
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",
    end: "+=500",
    pin: true,
    scrub: true,
  },
});
```

The panel pins at the top of the screen. It stays pinned for 500 pixels of scrolling. During that time the scale grows because `scrub` ties it to the scroll. The `end: "+=500"` means the trigger ends 500 pixels after it starts.

Here is a diagram of what a pinned section looks like in the scroll timeline.

<figure markdown>
<svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-pin-title" style="max-width:100%;height:auto">
  <title id="svg-pin-title">Three stages of a pinned section: before pin where the section scrolls normally, during pin where the section is frozen at the top of the viewport while the page scrolls underneath, and after pin where the section scrolls away normally.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="30" width="180" height="240" rx="8"/>
    <rect x="240" y="30" width="180" height="240" rx="8"/>
    <rect x="460" y="30" width="180" height="240" rx="8"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="50" y="140" width="120" height="50" rx="4"/>
    <rect x="270" y="40" width="120" height="50" rx="4"/>
    <rect x="490" y="200" width="120" height="50" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="110" y="170">panel</text>
    <text x="330" y="66">panel (pinned)</text>
    <text x="550" y="228">panel</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle" font-weight="600">
    <text x="110" y="20">Before pin</text>
    <text x="330" y="20">During pin</text>
    <text x="550" y="20">After pin</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="110" y="290">Panel scrolls normally</text>
    <text x="330" y="275">Panel frozen at top.</text>
    <text x="330" y="290">Page scrolls underneath.</text>
    <text x="550" y="290">Panel scrolls away</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="330" y1="96" x2="330" y2="270" stroke-dasharray="5 3"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <text x="338" y="190">page content</text>
    <text x="338" y="205">scrolling past</text>
  </g>
</svg>
<figcaption>During a pin, the panel stays fixed at the top of the viewport. The rest of the page continues scrolling underneath it. Once the trigger ends, the panel scrolls away normally.</figcaption>
</figure>

---

## A quick word on parallax

Parallax means a background moves slower than the foreground. It adds depth. You make it by giving a background a small `y` move with `scrub` on, while the content scrolls normally.

```js
gsap.to(".bg-image", {
  y: -120,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

The background image drifts up slowly as you scroll the hero. The text on top moves at normal speed. The difference in speed creates the parallax feel.

!!! warning
    Pinning and scrub can feel heavy on low-end phones. They run on every scroll frame, so they cost more power. Test on a real device, not just your laptop, and use them sparingly.

---

### Try this

Build a page tall enough to scroll. Register the plugin, then give a `.card` a fade-in on scroll: start it at `y: 50, opacity: 0` and add a `scrollTrigger` with `trigger: ".card"`, `start: "top 85%"`, and `markers: true` so you can see the lines. Scroll and watch it fade up as it crosses the start line. Then add a second element with `scrub: true` and a `start` and `end`, and notice how its motion now follows your scroll instead of the clock.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Which line do you write once before any ScrollTrigger code?
2. In `start: "top 80%"`, what does the `80%` refer to?
3. What does `scrub: true` do to an animation?
4. In `toggleActions: "play none none reverse"`, what happens when you scroll back above the element?

---

## What's next

You now know how to animate things as users scroll. Next you will use GSAP inside React. React controls the DOM in its own way, so you need a safe pattern to run GSAP code. Lesson 12.3 shows you that pattern.

[Next lesson: 12.3 GSAP inside React &rarr;](12-3-gsap-in-react.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Scroll-driven animation](https://gsap.com/scroll/)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[ScrollTrigger]: The GSAP plugin that plays animations based on scroll position. (Roman Urdu: scroll par chalne wala GSAP plugin)
*[trigger]: The element ScrollTrigger watches to decide when to fire. (Roman Urdu: woh element jise GSAP nazar mein rakhta hai, aur jab woh aapki scroll ke sath khaas jagah par aata hai to animation chal jati hai)
*[start]: The scroll position where the trigger begins, like "top 80%". (Roman Urdu: jahan animation shuru hoti hai)
*[end]: The scroll position where the trigger finishes. (Roman Urdu: jahan animation khatam hoti hai)
*[scrub]: Ties animation progress to the scroll position, forward and backward. (Roman Urdu: animation ko scroll se baandh dena, aap scroll neeche karein to aage chale aur upar karein to peeche, ghari ke bajaye aapki ungli chalati hai)
*[pin]: Freezes a section in place while you scroll past it. (Roman Urdu: section ko jagah par roke rakhna)
