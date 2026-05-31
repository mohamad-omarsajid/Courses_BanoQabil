# Chapter 12: Animation, GSAP and smooth scroll

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

A good site feels alive. Things slide in, fade up, and respond as you scroll.
Done well, motion guides the eye and makes a page feel polished. Done badly, it
annoys people and slows them down. This chapter teaches both the how and the
when.

You will learn GSAP, the most loved animation library on the web, then drive
animations with the scroll, then use it cleanly inside React. Last you add smooth
scrolling with Lenis, and you learn to respect users who prefer less motion.

## Lessons in this chapter

- [ ] [12.1 GSAP basics](12-1-gsap-basics.md): animate anything with tweens, eases, and timelines.
- [ ] [12.2 ScrollTrigger](12-2-scrolltrigger.md): start animations as the user scrolls.
- [ ] [12.3 GSAP inside React](12-3-gsap-in-react.md): animate React components cleanly, with no leftover bugs.
- [ ] [12.4 Smooth scroll with Lenis](12-4-lenis-and-locomotive.md): add smooth scrolling and keep it accessible.

!!! tip "Motion is seasoning, not the meal"
    A little animation lifts a page. Too much buries the content. As you learn
    these tools, keep asking if each effect helps the user or just shows off.

## Mega assignment

!!! bq-assignment "Bring your client site to life with scroll animation"
    Add motion that guides the eye and makes the site feel premium, without
    annoying anyone or slowing the page down.

    **What you build**

    - A hero that animates in on load with a GSAP timeline (heading, subtext, and button arriving in sequence).
    - Sections that **fade and slide up as the user scrolls to them**, using ScrollTrigger, done cleanly inside your React components.
    - Smooth scrolling with Lenis.
    - Respect for `prefers-reduced-motion`: users who ask for less motion get a calm, instant page.

    **Done when**

    - [ ] The hero animates once on load, smoothly, with no flash of unstyled content.
    - [ ] Scroll animations fire as each section enters the viewport, and do not re-fire jankily.
    - [ ] GSAP is cleaned up on unmount, with no console warnings on navigation.
    - [ ] With reduced motion turned on, the page is still fully usable and calm.

    **Stretch goal:** Add one tasteful signature moment (a pinned section, a counter that counts up, or a staggered card reveal) that fits the brand.

[Start lesson 12.1 &rarr;](12-1-gsap-basics.md){ .next-lesson }
