---
lesson_id: frontend.ch18.l03
title: "18.3 Testing with Vitest"
chapter: 18
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch18.l02
---

# 18.3 Testing with Vitest

You changed one line of code, and now a button on another page is broken. You did not even touch that page. Tests are how you catch this kind of surprise before your users do. In this lesson you write your first tests for a function and a component.

## What you'll know by the end

- Why tests are worth your time, even on small projects.
- What Vitest and React Testing Library are, and why they fit React work.
- How to install and set up Vitest in a project.
- How to write a unit test for a plain function.
- How to write a component test that clicks a button and checks the result.
- What you should test, and what you should leave alone.

---

## Why test at all

Tests are small pieces of code that check your real code. They run fast, and they tell you if something broke.

Tests give you two big wins:

- They catch bugs when you change code. You edit one thing, run the tests, and see what broke.
- They let you refactor with confidence. You can clean up messy code, and the tests confirm it still works.

You do not need to test every single line. Chasing 100 percent coverage wastes time. Instead, test the important parts. Test the logic your users depend on, like a price total or a login check.

### The testing pyramid

Not all tests are equal. There are three levels, and they form a pyramid.

<figure markdown>
<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-pyramid-title" style="max-width:100%;height:auto">
  <title id="svg-pyramid-title">The testing pyramid: unit tests form a wide base with many fast tests, integration tests form a smaller middle, and end-to-end tests form a small top with few slow tests.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <polygon points="280,20 520,280 40,280" fill="#f4f4f1"/>
    <line x1="130" y1="190" x2="430" y2="190" stroke="#6b6b65" stroke-dasharray="4 3"/>
    <line x1="200" y1="105" x2="360" y2="105" stroke="#6b6b65" stroke-dasharray="4 3"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="280" y="72">E2E tests</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="280" y="92">Few, slow, expensive</text>
      <text x="280" y="108">Playwright / Cypress</text>
    </g>
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="280" y="155">Integration tests</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="280" y="172">Several, moderate speed</text>
    </g>
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="280" y="230">Unit tests</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="280" y="248">Many, fast, cheap</text>
      <text x="280" y="264">Vitest + RTL</text>
    </g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <g text-anchor="start"><text x="530" y="40">fewer</text></g>
    <g text-anchor="start"><text x="530" y="295">more</text></g>
  </g>
  <defs>
    <marker id="arr-py" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1" marker-end="url(#arr-py)" marker-start="url(#arr-py)">
    <line x1="525" y1="50" x2="525" y2="280"/>
  </g>
</svg>
<figcaption>The testing pyramid. Write many fast unit tests at the base, a smaller number of integration tests in the middle, and only a few end-to-end tests at the top. Most of your time goes on the base.</figcaption>
</figure>

| Level | What it tests | Speed | Tools |
| --- | --- | --- | --- |
| Unit | One function or one component in isolation | Very fast, milliseconds | Vitest |
| Integration | Several parts working together, like a form + fetch | Moderate | Vitest + RTL |
| E2E | The full app in a real browser, like a user buying something | Slow, seconds | Playwright, Cypress |

Start with unit tests. They are fast to write, fast to run, and easy to fix when they fail.

---

## What Vitest and React Testing Library are

Vitest is a fast test runner. It finds your test files, runs them, and reports passes and failures. It works great with Vite and Next.js because it shares the same setup style.

React Testing Library, often called RTL, is a tool to test components. It renders a component into a fake page. Then it lets you interact with that component the way a user would, like clicking a button or reading text.

You use both together. Vitest runs the tests, and RTL handles the React parts.

---

## Setting up Vitest

Open your terminal in your project folder. Install the testing packages as dev dependencies.

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Here is what each one does:

| Package | Its job |
| --- | --- |
| `vitest` | The test runner. Finds and runs your test files. |
| `@testing-library/react` | Renders components and lets you query them. |
| `@testing-library/jest-dom` | Adds helpful checks like `toBeInTheDocument`. |
| `jsdom` | Fakes a browser so tests can use the DOM without a real browser. |

Next, add a test script to your `package.json`.

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Now `npm test` will start Vitest. It watches your files and reruns tests as you save.

Last, tell Vitest to use the jsdom environment. Create a file named `vitest.config.js` in your project root.

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

The `environment: "jsdom"` line gives your tests a fake browser. The `globals: true` line lets you use `describe`, `it`, and `expect` without importing them every time.

---

## Writing a unit test for a function

A unit test checks one small piece of logic. Let us test a plain `add` function.

First, here is the function in a file called `math.js`.

```js
export function add(a, b) {
  return a + b;
}
```

Now create a test file next to it called `math.test.js`. Vitest looks for files ending in `.test.js`.

```js
import { describe, it, expect } from "vitest";
import { add } from "./math.js";

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("works with negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });
});
```

Read this top to bottom. The `describe` block groups related tests under one name. Each `it` block is one test, and its text says what should happen. The `expect(...)` part runs your code, and `.toBe(...)` checks the result. An `expect` line is called an assertion. If `add(2, 3)` does not equal `5`, the test fails and tells you.

Run `npm test` and you should see both tests pass.

---

## The arrange-act-assert shape

Every test, whether it tests a function or a component, follows the same three-step shape.

<figure markdown>
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-aaa-title" style="max-width:100%;height:auto">
  <title id="svg-aaa-title">Arrange-Act-Assert: three boxes from left to right. Arrange means set up your data and render the component. Act means do something like clicking a button. Assert means check that the result is what you expected.</title>
  <defs>
    <marker id="arr-aaa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20"  y="50" width="170" height="100" rx="8" fill="#f4f4f1"/>
    <rect x="235" y="50" width="170" height="100" rx="8" fill="#e8f4f0"/>
    <rect x="450" y="50" width="170" height="100" rx="8" fill="#fff3e0"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="16" font-weight="700" fill="#1f1f1c">
      <text x="105" y="92">Arrange</text>
      <text x="320" y="92">Act</text>
      <text x="535" y="92">Assert</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="105" y="114">Set up your data</text>
      <text x="105" y="130">or render the</text>
      <text x="105" y="146">component</text>
      <text x="320" y="114">Do something:</text>
      <text x="320" y="130">click a button,</text>
      <text x="320" y="146">call the function</text>
      <text x="535" y="114">Check the result</text>
      <text x="535" y="130">matches what</text>
      <text x="535" y="146">you expected</text>
    </g>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-aaa)">
    <line x1="193" y1="100" x2="233" y2="100"/>
    <line x1="408" y1="100" x2="448" y2="100"/>
  </g>
</svg>
<figcaption>Every test follows Arrange, Act, Assert. Set things up, do the action, then check the outcome. This shape applies whether you are testing a function or a component.</figcaption>
</figure>

Looking back at the `Counter` test in the next section, you will see: `render(...)` is Arrange, `userEvent.click(button)` is Act, and `expect(...).toBeInTheDocument()` is Assert.

---

## Writing a component test

A component test renders a real component, acts like a user, and checks what changed. Let us test a counter button.

Here is the component in `Counter.jsx`.

```jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

Now the test in `Counter.test.jsx`.

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Counter } from "./Counter.jsx";

describe("Counter", () => {
  it("counts up when you click it", async () => {
    // Arrange
    render(<Counter />);
    const button = screen.getByRole("button", { name: /clicked 0 times/i });

    // Act
    await userEvent.click(button);

    // Assert
    expect(screen.getByText(/clicked 1 times/i)).toBeInTheDocument();
  });
});
```

Step through it. `render` puts the component on the fake page. `screen.getByRole("button", ...)` finds the button by its role and its visible text, just like a user would. Then `userEvent.click` simulates a real click. Finally the assertion checks that the new text shows up. You can also use `fireEvent.click(button)` for a simpler click, but `userEvent` acts more like a real person.

!!! tip
    Find elements by their visible text or role, the way a user finds them. Do not search by class name or test id when you can avoid it. This way your tests survive a redesign, even if the CSS changes.

---

## The Testing Library philosophy

RTL pushes one big idea. Find elements the way a user finds them.

A user does not know your class names. A user sees a button labeled "Submit" and reads text on the screen. So you query by text and by role, not by `.btn-primary` or internal details.

This makes your tests stronger. When you rename a class or move some markup, your test still passes, because the user-facing behavior did not change.

### Querying elements: preferred order

| Query | How to use it | When to prefer it |
| --- | --- | --- |
| `getByRole` | `screen.getByRole("button", { name: /submit/i })` | Almost always, best for accessibility |
| `getByLabelText` | `screen.getByLabelText(/email/i)` | Form inputs with a label |
| `getByText` | `screen.getByText(/welcome/i)` | Non-interactive text, headings |
| `getByPlaceholderText` | `screen.getByPlaceholderText(/search.../i)` | Inputs with no label |
| `getByTestId` | `screen.getByTestId("my-id")` | Last resort when nothing else works |

Prefer the queries near the top of this table. `getByRole` is nearly always the right choice.

??? note urdu "اردو میں مزید وضاحت"
    Testing pyramid کا مطلب ہے کہ سب سے زیادہ unit tests لکھیں، جو تیز اور سستے ہوتے ہیں۔ کم integration tests اور بہت کم E2E tests لکھیں۔ ہر test تین حصوں میں ہوتا ہے: Arrange یعنی تیاری، Act یعنی کچھ کریں، اور Assert یعنی نتیجہ چیک کریں۔ React Testing Library کا اصول ہے کہ elements کو ان کے دکھائی دینے والے متن اور role سے تلاش کریں، بالکل ویسے جیسے ایک user کرتا ہے، نہ کہ class name سے۔ اس طرح design بدلنے پر بھی tests کام کرتے رہتے ہیں۔

---

## What not to test

Tests cost time, so spend it well.

| Skip these | Test these |
| --- | --- |
| Internal implementation details | Visible behavior the user sees |
| Third-party library internals | Your own business logic |
| A line that just returns a fixed string | A form that validates and submits |
| CSS class names | Text content that appears on screen |
| The exact HTML structure | Whether a button is disabled or enabled |
| Private helper functions nobody calls | Functions that compute a price or check a condition |

The short rule: test what users see and do, not how you built it inside.

!!! warning
    Do not chase 100 percent coverage, and do not test third-party code. High coverage numbers can hide weak tests. Test the behavior your users depend on, and your time pays off.

---

### Try this

Set up Vitest in a project and write the `add` unit test, then run `npm test` and watch it pass. Now break the `add` function on purpose, return `a - b`, and run the test again to see it fail and tell you why. Then write a component test for the `Counter` that clicks the button and checks the count went up.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What are the two big wins that tests give you?
2. What is the job of Vitest, and what is the job of React Testing Library?
3. Why should you find elements by text or role instead of by class name?
4. Name two kinds of code you should not bother testing.

---

## What's next

You can now write tests for functions and components. In 17.4 you put the whole toolchain together. You will see TypeScript, linting, and testing working as one complete project setup.

[Next lesson: 17.4 The complete project setup &rarr;](18-4-complete-project-setup.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Vitest: Getting Started](https://vitest.dev/guide/)
- [Testing Library: React](https://testing-library.com/docs/react-testing-library/intro/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[test]: A small piece of code that checks your real code works as expected. (Roman Urdu: aik chhota code jo aapke asli code ko jaanchta hai)
*[Vitest]: A fast test runner that finds and runs your test files. (Roman Urdu: aik tez test chalane wala tool)
*[React Testing Library]: A tool to render components and interact with them like a user. (Roman Urdu: components ko user ki tarah test karne ka tool)
*[unit test]: A test that checks one small piece of logic on its own. (Roman Urdu: aik chhoti logic ko alag se jaanchne wala test)
*[assertion]: A line that checks if a value matches what you expect. (Roman Urdu: aik line jo value ko expected se milati hai)
*[coverage]: A number showing how much of your code the tests run. (Roman Urdu: kitna code tests chalate hain, uska number)
