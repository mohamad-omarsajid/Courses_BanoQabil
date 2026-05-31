# Chapter 10: React foundations

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

You can already build pages with HTML, CSS, and JavaScript. React is the tool most
modern jobs use to build them faster and keep them organised. It lets you build a
page from small, reusable pieces called components, and it updates the screen for
you when your data changes.

Everything you learned still matters. React is just JavaScript with a smart way to
draw the page. In this chapter you set up a React project, build your first
components, give them memory with state, and make parts of the page talk to each
other.

## Lessons in this chapter

- [ ] [10.1 Why React, Vite, and JSX](10-1-why-react-vite-jsx.md): set up a React project and write your first component.
- [ ] [10.2 Components and props](10-2-components-and-props.md): build reusable pieces and pass data into them.
- [ ] [10.3 State and events](10-3-state-and-events.md): give a component memory and respond to clicks and typing.
- [ ] [10.4 Conditional rendering and lifting state up](10-4-conditional-rendering-lifting-state.md): show things based on data, and share state between components.

!!! tip "You already know the hard part"
    React is JavaScript. The arrays, objects, functions, and map from Chapters 6
    and 7 are the real foundation. If those feel shaky, review them first. React
    will feel much easier.

## Mega assignment

!!! bq-assignment "Rebuild your client site as a React app"
    Now build the same site the way modern teams do: out of small, reusable
    components, in a Vite + React project.

    **What you build**

    - A fresh Vite React project for your client site.
    - The page broken into real components: `Navbar`, `Hero`, `Card` or `MenuItem`, `ContactForm`, `Footer`.
    - The list of items (menu, services, products) passed in as **props** and rendered with `map`, not copied by hand.
    - At least one piece of **state**: a category filter, a "show more" toggle, or a working quantity counter.

    **Done when**

    - [ ] The page is made of separate component files, each doing one job.
    - [ ] The repeated items render from an array via props, not duplicated JSX.
    - [ ] At least one interaction uses `useState` and updates the screen.
    - [ ] The Console has no React key warnings or errors.

    **Stretch goal:** Lift the filter state up so two components (a filter bar and the list) stay in sync from one source of truth.

[Start lesson 10.1 &rarr;](10-1-why-react-vite-jsx.md){ .next-lesson }
