# Chapter 14: Modern React patterns

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

You can build real React apps now. This chapter makes you a stronger React
developer. You learn the hooks that handle tricky cases, how to package logic into
your own hooks, how to share data cleanly, and how to build real multi-page apps.

None of this is harder than what you have done. It is the next layer of polish.
These patterns are what separate a beginner who can copy code from a developer who
understands it.

## Lessons in this chapter

- [ ] [14.1 useRef, useMemo, useCallback](14-1-useref-usememo-usecallback.md): three hooks for refs, speed, and stable functions, and when they matter.
- [ ] [14.2 Custom hooks](14-2-custom-hooks.md): pull reusable logic into your own hooks.
- [ ] [14.3 Context API in depth](14-3-context-in-depth.md): share state across the app without prop drilling.
- [ ] [14.4 React Router](14-4-react-router.md): build proper multi-page apps with real navigation.

!!! tip "Learn the why, not just the how"
    It is easy to sprinkle these hooks everywhere. The skill is knowing when each
    one helps and when it just adds noise. This chapter spends as much time on
    "when not to" as on "how to".

## Mega assignment

!!! bq-assignment "Refactor your store with real React patterns"
    Take the store you shipped in Chapter 13 and level up its insides. The
    features stay the same; the code gets cleaner, faster, and more professional.

    **What you build**

    - The cart moved into **Context** so any component can read and update it without prop drilling.
    - At least one **custom hook** that holds reusable logic (for example `useCart`, `useLocalStorage`, or `useFetch`).
    - `useMemo` or `useCallback` applied where you can actually measure or reason about a benefit, not sprinkled everywhere.
    - Clean **React Router** navigation, including a real 404 page and scroll-to-top on route change.

    **Done when**

    - [ ] Cart state lives in Context; no cart props are threaded through three layers.
    - [ ] One custom hook is extracted and reused in more than one place.
    - [ ] You can explain, in your README or a comment, why each `useMemo`/`useCallback` is there.
    - [ ] Routing has a 404 route, and the page scrolls to top when you navigate.

    **Stretch goal:** Write a one-paragraph note for each pattern explaining when you would *not* use it. Knowing when to stop is the senior skill.

[Start lesson 14.1 &rarr;](14-1-useref-usememo-usecallback.md){ .next-lesson }
