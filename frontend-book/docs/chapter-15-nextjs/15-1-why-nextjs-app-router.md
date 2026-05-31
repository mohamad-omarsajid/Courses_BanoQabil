---
lesson_id: frontend.ch15.l01
title: "15.1 Why Next.js and the App Router"
chapter: 15
order: 1
estimated_minutes: 40
prerequisites:
  - frontend.ch14.l04
---

# 15.1 Why Next.js and the App Router

You learned React across the last few chapters. You built pages, added routing, and tried modern patterns. Now you will meet Next.js, a tool that takes React and adds the parts you used to wire up by hand. This lesson shows you what Next.js is, why people pick it, and how its folders turn into pages.

## What you'll know by the end

- What a meta-framework is and why it sits on top of React.
- The main reasons teams choose Next.js over plain React.
- How to create a new project with one command.
- How a folder plus a `page.js` file becomes a route.
- What `layout.js`, `loading.js`, `error.js`, and `not-found.js` do.
- The difference between static and dynamic rendering at a glance.

---

## What is a meta-framework

React on its own is a library. It draws your UI from components and state. But React does not give you routing, server rendering, or build setup. You add those yourself, or you glue separate tools together.

A meta-framework is a framework built on top of React. It adds routing, server rendering, and build tooling for you. So you focus on your pages, not on the plumbing. Next.js is the most popular meta-framework for React.

!!! note "Did you know"
    Many large companies run their sites on Next.js. Server rendering helps both search ranking and first-load speed, so big teams rely on it for busy public pages.

---

## Why pick Next.js over plain React

When you create a new project with Vite (Roman Urdu: plain React) everything runs in the browser. The server sends an empty HTML shell, and React fills it in with JavaScript. That works, but it has trade-offs.

Here is a direct comparison so the difference is concrete:

| What you care about | Plain React with Vite | Next.js with App Router |
| --- | --- | --- |
| HTML at first load | Empty shell, JS fills it | Full HTML from the server |
| SEO | Harder, crawlers may miss content | Good out of the box |
| Routing | You install and configure React Router | Folders become routes, zero config |
| Data fetching | `useEffect` + loading state in the browser | `async/await` directly in a server component |
| Images | Plain `<img>`, you optimise manually | Built-in `next/image` handles size and format |
| API / server code | Separate backend project | Server components and server actions live in the same project |
| Build config | Vite config file | Handled by Next.js, mostly zero touch |

You still write React. Next.js just handles the heavy parts around it.

The main reasons people reach for Next.js are:

- Better SEO, because pages can render on the server. Search engines get real HTML, not an empty shell.
- Faster first load. The user sees content sooner instead of waiting for all the JavaScript.
- The option to run server code, like reading a database, right inside your project.
- File-based routing. Your folders become your URLs, with no router config file.
- Image optimization built in, so pictures load smaller and faster.

---

## Creating a project

Open your terminal in the folder where you keep projects. Then run this command.

```bash
npx create-next-app@latest
```

This downloads the latest setup tool and asks you some questions. Say yes to the App Router when it asks. You can pick JavaScript or TypeScript. This course uses simple examples, so either choice works fine. After the prompts, it installs everything and creates your project folder.

!!! tip
    A folder with a page file becomes a route on its own. You do not write any router config to make that happen.

---

## The app folder convention

Next.js uses a folder named `app` to hold your routes. The rule is simple. A folder becomes a route. A `page.js` file (or `page.jsx`) inside it is the page for that route.

```text
app/
  page.js            ->  /
  about/
    page.js          ->  /about
  blog/
    page.js          ->  /blog
    [id]/
      page.js        ->  /blog/123
```

Nested folders make nested routes, just like nested URLs. A folder in square brackets, like `[id]`, is a dynamic route. It matches any value in that spot, so `/blog/1` and `/blog/2` use the same page file.

Here is a visual map of the same structure, showing how each file sits inside its folder and what URL it produces.

<figure markdown>
<svg viewBox="0 0 740 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-appfolder-title" style="max-width:100%;height:auto">
  <title id="svg-appfolder-title">App Router folder structure. The app folder contains page.js for the root, layout.js, loading.js, error.js, an about folder with page.js, and a blog folder with page.js and an [id] subfolder with page.js.</title>
  <defs>
    <marker id="arr-f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#1f1f1c" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="20" width="120" height="36" rx="6" fill="#ffffff"/>
    <rect x="20" y="100" width="120" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="20" y="148" width="120" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="20" y="196" width="120" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="20" y="244" width="120" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="190" y="100" width="140" height="36" rx="6" fill="#ffffff"/>
    <rect x="190" y="148" width="140" height="36" rx="6" fill="#ffffff"/>
    <rect x="190" y="196" width="140" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="190" y="270" width="140" height="36" rx="6" fill="#ffffff"/>
    <rect x="190" y="318" width="140" height="36" rx="6" fill="#ffffff"/>
    <rect x="380" y="196" width="140" height="36" rx="6" fill="#f4f4f1"/>
    <rect x="380" y="318" width="140" height="36" rx="6" fill="#ffffff"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="80" y="44">app/</text>
    <text x="80" y="123">page.js</text>
    <text x="80" y="171">layout.js</text>
    <text x="80" y="219">loading.js</text>
    <text x="80" y="267">error.js</text>
    <text x="260" y="123">about/</text>
    <text x="260" y="171">about/page.js</text>
    <text x="260" y="219">blog/</text>
    <text x="260" y="293">blog/page.js</text>
    <text x="260" y="341">blog/[id]/</text>
    <text x="450" y="219">[id]/</text>
    <text x="450" y="341">blog/[id]/page.js</text>
  </g>
  <g stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#arr-f)">
    <line x1="140" y1="118" x2="188" y2="118"/>
    <line x1="140" y1="214" x2="188" y2="214"/>
    <line x1="330" y1="214" x2="378" y2="214"/>
    <line x1="330" y1="338" x2="378" y2="338"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="start">
    <text x="540" y="123">route: /</text>
    <text x="540" y="171">wraps every page</text>
    <text x="540" y="219">shows while loading</text>
    <text x="540" y="267">shows on error</text>
    <text x="190" y="380">route: /about</text>
    <text x="190" y="400">route: /blog</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="start">
    <text x="540" y="341">route: /blog/123</text>
  </g>
</svg>
<figcaption>The app folder is the root. Every sub-folder becomes a URL segment. A page.js file inside a folder is the page for that route. Special files like layout.js and loading.js sit alongside page.js and do their own jobs automatically.</figcaption>
</figure>

---

## A minimal page

A page is just a React component that you export as the default. Here is the page for the home route.

```jsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to my site</h1>
      <p>This is the home page.</p>
    </main>
  );
}
```

Drop this in `app/page.js` and you have your home page. No import for a router, no route table. The file location does the work.

---

## Special files

Next.js gives some file names a special job. You place them next to your pages. You do not import them anywhere. Next.js finds them by name and uses them at the right moment.

| File | Where you put it | What it does |
| --- | --- | --- |
| `page.js` | Inside any route folder | The page shown for that URL |
| `layout.js` | Inside any route folder | Wraps children with shared chrome (header, footer). The root layout owns `<html>` and `<body>`. |
| `loading.js` | Inside any route folder | Shows a fallback skeleton while the page loads its data |
| `error.js` | Inside any route folder | Shows a friendly error screen when the page throws |
| `not-found.js` | Inside any route folder | Shows a 404 screen when `notFound()` is called or no route matches |
| `route.js` | Inside any route folder | Builds an API endpoint for that URL (returns JSON, not a page) |

Here is a minimal root layout.

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>My Site</header>
        {children}
        <footer>Made with Next.js</footer>
      </body>
    </html>
  );
}
```

The `children` value is the page for the current route. Your layout wraps it, so the header and footer show on every page. The root layout owns the `<html>` and `<body>` tags.

---

## Static vs dynamic rendering

Next.js can build some pages once, at build time. That is static rendering. The same HTML serves every visitor, so it is very fast. An "About us" page is a good fit.

Other pages render fresh for each request. That is dynamic rendering. You need it when the page depends on the user or live data. Next.js decides which to use based on what your code does. You do not flip a switch by hand for most cases.

| Rendering type | When HTML is built | Good for |
| --- | --- | --- |
| Static | Once, when you run `next build` | Marketing pages, blog posts, docs |
| Dynamic | On every incoming request | Dashboards, user profiles, live prices |
| Incremental revalidation | Rebuilt in the background after N seconds | News feeds, product listings |

Next.js picks static by default. The moment your code reads a dynamic value, like request headers or cookies, Next.js switches to dynamic for that page on its own.

### Try this

Create a new Next.js project with `npx create-next-app@latest` and say yes to the App Router. Then make three routes by hand: edit `app/page.js` for the home route, add `app/about/page.js`, and add `app/blog/[id]/page.js`. Give each page a simple heading. Add a root `layout.js` with a header and footer so they show on every page. Run `npm run dev` and visit `/`, `/about`, and `/blog/5` to see your folders turn into URLs.

??? note urdu "اردو میں مزید وضاحت"
    Next.js میں روٹنگ آپ کے فولڈرز سے بنتی ہے۔ آپ جو فولڈر بناتے ہیں، وہی آپ کا یو آر ایل بن جاتا ہے۔ ہر فولڈر کے اندر ایک page.js فائل ہوتی ہے، اور یہی اس روٹ کا صفحہ ہوتی ہے۔ نیسٹڈ فولڈرز نیسٹڈ روٹس بناتے ہیں، اور بریکٹ والا فولڈر جیسے [id] ڈائنامک روٹ ہوتا ہے۔ layout.js ہر صفحے کو ہیڈر اور فوٹر دیتی ہے، loading.js لوڈنگ کے وقت دکھتی ہے، اور error.js غلطی آنے پر صارف کو تکلیف سے بچاتی ہے۔ اس طرح آپ کو الگ سے کوئی راؤٹر کنفگ فائل لکھنے کی ضرورت نہیں پڑتی۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does a meta-framework add on top of React?
2. In the `app` folder, which file makes a route into a real page?
3. What is a folder like `[id]` called, and what does it match?
4. What is the job of the root `layout.js` file?
5. Name one difference between static and dynamic rendering.

---

## What's next

You now know how Next.js turns folders into pages. But Next.js splits components into two kinds, and that choice changes where your code runs. In 14.2 you will learn server components and client components, and when to use each.

[Next lesson: 14.2 Server and client components &rarr;](15-2-server-vs-client-components.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Next.js Get Started](https://nextjs.org/docs/app/getting-started)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[Next.js]: A meta-framework built on React that adds routing, server rendering, and build tooling. (Roman Urdu: React ke upar bana framework jo routing aur server par chalne ki suvidha saath deta hai)
*[meta-framework]: A framework built on top of another library to add routing, rendering, and tooling. (Roman Urdu: React jaisi library par bana aik bara tool jo routing aur server rendering jaise kaam khud sambhal leta hai)
*[App Router]: The Next.js routing system that uses the app folder, where folders become routes. (Roman Urdu: Next.js ka tareeqa jahan app folder ke andar bana har folder khud aik URL ban jata hai)
*[page file]: A page.js or page.jsx file that defines the page shown for its route. (Roman Urdu: page.js naam ki file jo batati hai ke us URL par kaunsa safha dikhana hai)
*[layout]: A file that wraps pages with shared parts like a header and footer. (Roman Urdu: aisi file jo har safhe ke gird header aur footer jaise mushtarka hisse laga deti hai)
*[dynamic rendering]: Rendering a page fresh for each request instead of once at build time. (Roman Urdu: har request par naya banna)
*[static rendering]: Building the page HTML once at build time and serving the same file to every visitor. (Roman Urdu: build ke waqt ek baar bana ke sab ko wahi HTML dena)
