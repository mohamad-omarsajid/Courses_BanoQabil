# Chapter 8: JavaScript in depth

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

In Chapter 7 you learned the core of the language. Now you put it to work on real
data and on the page itself. You will store lists and records, shape them with
modern methods, and finally reach into a web page and change it as the user
clicks.

This is the chapter where JavaScript stops being an exercise in the Console and
starts moving things on screen. By the end you will build a working todo list and
a contact form that checks itself.

## Lessons in this chapter

- [ ] [8.1 Arrays, objects, and modern methods](8-1-arrays-objects-methods.md): store lists and records, and reshape them with map, filter, and reduce.
- [ ] [8.2 ES2015+ essentials](8-2-es2015-essentials.md): destructuring, spread, optional chaining, and modules for cleaner code.
- [ ] [8.3 The DOM](8-3-the-dom.md): find, change, create, and remove elements on a live page.
- [ ] [8.4 Events and forms](8-4-events-and-forms.md): react to clicks and typing, and validate a form yourself.

!!! tip "Keep the Console open"
    Every example here runs. Open DevTools, paste the code, and watch the result.
    For the DOM lessons, make a small HTML file and connect a script, so you can
    see your changes on the page.

## Mega assignment

!!! bq-assignment "Build a data-driven, filterable list for your client"
    Real sites show lists that come from data, not hand-typed HTML. Build one for
    your client and let visitors search and filter it live.

    **What you build**

    - An array of objects in JavaScript holding the real items (menu dishes, services with prices, products, class timings).
    - Code that renders that array onto the page by creating DOM elements, not by pasting HTML.
    - A search box and at least one filter (by category or price) that update the visible list as the user types or clicks, using `map`, `filter`, and event listeners.
    - Validation on the contact form: empty fields are caught and a clear message is shown.

    **Done when**

    - [ ] Changing the data array changes what appears on the page, with no HTML edits.
    - [ ] Search and filter update the list instantly.
    - [ ] An empty search shows a friendly "nothing found" message, not a blank gap.
    - [ ] The contact form blocks a bad submit and tells the user why.

    **Stretch goal:** Save the user's last search to `localStorage` so it is still there when they come back.

[Start lesson 8.1 &rarr;](8-1-arrays-objects-methods.md){ .next-lesson }
