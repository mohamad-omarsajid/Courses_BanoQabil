# Chapter 19: State, data, and going to production

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

Small apps manage state with useState and Context. Bigger apps need stronger
tools. This chapter teaches the libraries real teams use for app state and server
data, then shows you how to measure speed and ship a clean, production-ready site.

By the end you can manage a cart with Zustand, fetch server data with TanStack
Query, read a Lighthouse report, and run through a launch checklist with
confidence.

## Lessons in this chapter

- [ ] [19.1 Zustand for state](19-1-zustand.md): a simple store for app-wide state.
- [ ] [19.2 TanStack Query for server state](19-2-tanstack-query.md): fetch, cache, and refresh server data the easy way.
- [ ] [19.3 Performance and Core Web Vitals](19-3-performance.md): measure speed and fix the issues that matter.
- [ ] [19.4 Production hygiene](19-4-production-hygiene.md): env vars, monitoring, analytics, and a launch checklist.

!!! tip "Reach for these when you need them"
    You do not need Zustand or TanStack Query for a small site. Learn them so you
    recognise when a project has outgrown useState and Context, then add them.

## Mega assignment

!!! bq-assignment "Take your store to production-grade state and speed"
    A site that loads slowly or breaks under real data loses customers. Upgrade
    how your store handles state and server data, then prove it is fast.

    **What you build**

    - The cart moved to a **Zustand** store, with its logic in one clean place and persisted across reloads.
    - Product and order data handled by **TanStack Query**: cached, refetched sensibly, with loading and error states for free.
    - A **performance pass**: measure with Lighthouse, then fix the real issues (image sizes, lazy loading, bundle weight).
    - A short **launch checklist** in your README: env vars handled, no secrets committed, errors monitored.

    **Done when**

    | Metric | Target |
    | --- | --- |
    | Lighthouse Performance | 90 or above on mobile |
    | Largest Contentful Paint | under 2.5s |
    | Cumulative Layout Shift | under 0.1 |

    - [ ] Cart state lives in Zustand and survives a refresh.
    - [ ] Data fetching uses TanStack Query with cached, deduped requests.
    - [ ] The three metrics above are met on the deployed site.
    - [ ] No API keys or secrets are committed to the repo.

    **Stretch goal:** Add a global error boundary and a simple analytics or error-monitoring tool, so you find out about breakages before your client does.

[Start lesson 19.1 &rarr;](19-1-zustand.md){ .next-lesson }
