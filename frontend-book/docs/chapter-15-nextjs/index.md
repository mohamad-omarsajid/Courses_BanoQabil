# Chapter 15: Next.js

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

React builds great interfaces, but it runs in the browser only. Real businesses
also need fast loading, good search ranking, and the option to run code on a
server. Next.js is a framework built on top of React that adds all of that.

You do not throw away your React skills. Next.js is React with extra powers. In
this chapter you set up a Next.js project, learn the server and client split,
fetch data the new way, and deploy a fast, search-friendly site.

## Lessons in this chapter

- [ ] [15.1 Why Next.js and the App Router](15-1-why-nextjs-app-router.md): what a framework adds and how a Next.js project is laid out.
- [ ] [15.2 Server and client components](15-2-server-vs-client-components.md): the mental model that runs through all of Next.js.
- [ ] [15.3 Data fetching and server actions](15-3-data-fetching-server-actions.md): load data and handle forms the modern way.
- [ ] [15.4 Deploy, SEO, and images](15-4-deploy-seo-images.md): ship to Vercel, rank on Google, and serve fast images.

!!! tip "Next.js is still React"
    Every component, prop, hook, and piece of state you learned still works here.
    Next.js mostly adds rules about where code runs and how files are organised.

## Mega assignment

!!! bq-assignment "Rebuild a page in Next.js so Google can find it"
    A store that does not show up on Google loses customers before they arrive.
    Rebuild your store's home and product pages in Next.js, where fast loading and
    search ranking come built in.

    **What you build**

    - A Next.js project with the App Router, with the home and product pages moved over.
    - A clear split: data fetched in **server components**, interactivity (cart buttons) in **client components**.
    - Real **SEO**: a title and meta description per page, Open Graph tags so the link looks good when shared on WhatsApp, and dynamic metadata on product pages.
    - Images served through `next/image` so they load fast on slow connections.

    **Done when**

    - [ ] Home and product pages render with server components fetching the data.
    - [ ] Each page has a unique title and description that show in the browser tab and in search.
    - [ ] Sharing a product link shows a proper preview card.
    - [ ] Images are optimised and the layout does not jump as they load.

    **Stretch goal:** Run Lighthouse on the deployed site and get the SEO and Performance scores both above 90.

[Start lesson 15.1 &rarr;](15-1-why-nextjs-app-router.md){ .next-lesson }
