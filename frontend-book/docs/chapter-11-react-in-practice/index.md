# Chapter 11: React in practice

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

You know components, props, and state. Now you use React for the jobs real apps
need every day. You will run code at the right moment, pull live data from the
internet, handle real forms, and tie it all together in a small project.

This chapter turns React from an idea into a working tool. By the end you will
have built a donation mini-app that fetches nothing, breaks nothing, and shows a
real confirmation screen, using only what you have learned.

## Lessons in this chapter

- [ ] [11.1 useEffect and the lifecycle](11-1-useeffect.md): run code after render, and clean it up properly.
- [ ] [11.2 Fetching data](11-2-fetching-data.md): pull data from an API and handle loading and error states.
- [ ] [11.3 Forms in React](11-3-forms-in-react.md): build a multi-field form with validation and reset.
- [ ] [11.4 Project: the donation mini-app](11-4-alkhidmat-donation-app.md): put it all together in one small real app.

!!! tip "Build along, do not just read"
    This chapter is hands-on. Keep a Vite project open and type each example.
    React clicks into place when you see your own code run, not when you read
    about someone else's.

## Mega assignment

!!! bq-assignment "Make your client app live and data-driven"
    Real apps load data from somewhere and handle the moments when that data is
    slow, empty, or broken. Build those moments properly.

    **What you build**

    - Move your client's items out of the code and fetch them from an API. Use a free fake API (like JSONPlaceholder or a small JSON file you host), or a real one that fits the business.
    - Three honest UI states for that fetch: **loading**, **error**, and **empty**, each with its own message.
    - A real React form (booking, enquiry, or order) with validation, a disabled-while-submitting button, and a clear success confirmation.

    **Done when**

    - [ ] The list renders from a fetch inside `useEffect`, not from hard-coded JSX.
    - [ ] Slow network shows a loading state; a failed fetch shows an error, not a blank page.
    - [ ] The form blocks invalid input and shows a confirmation on success.
    - [ ] No "missing dependency" or key warnings in the Console.

    **Stretch goal:** Add a retry button to the error state, and disable the form's submit button until every required field is valid.

[Start lesson 11.1 &rarr;](11-1-useeffect.md){ .next-lesson }
