---
lesson_id: frontend.ch19.l04
title: "19.4 Production hygiene"
chapter: 19
order: 4
estimated_minutes: 40
prerequisites:
  - frontend.ch19.l03
---

# 19.4 Production hygiene

Your app is live and real people can use it. Now you need to keep it safe, fast, and easy to fix. Production hygiene means the small habits that protect your secrets and tell you when things break. This lesson gives you simple checklists you can run before every launch.

## What you'll know by the end

- Store secrets in environment variables, not in your code or Git.
- Understand why the `NEXT_PUBLIC_` prefix exposes a value to the browser.
- Add error monitoring with Sentry so you hear about bugs first.
- Add privacy-friendly analytics with one line of code.
- Run an SEO checklist and an accessibility checklist on each page.
- Use a "ready to launch" checklist before you share your app.

---

## Environment variables done right

A secret (Roman Urdu: woh cheez jo chhupani ho) is a value you must hide. Think of an API key or a database password. You learned in 5.1 to keep files out of Git with `.gitignore`. Secrets follow the same rule. They never go inside your code, and they never go into Git.

Instead, you store them as environment variables. On your computer you put them in a `.env` file. That file is listed in `.gitignore`, so Git ignores it.

```bash
# .env  (this file is in .gitignore, so Git never sees it)
DATABASE_URL=postgres://user:password@host/db
SENTRY_AUTH_TOKEN=your-secret-token
```

For production, you do not upload the `.env` file. You set the same names in your host dashboard. On Vercel or Netlify you open Settings, then Environment Variables, and add each one. The host keeps them safe and feeds them to your app at build time.

Keep separate values for development and production. Your local app can talk to a test database. Your live app talks to the real one. Mixing them is how a student deletes real user data while testing.

### What goes in environment variables

Not every variable is a secret, but it helps to know which is which before you start.

| Variable type | Example name | Example value | Keep secret? | Use `NEXT_PUBLIC_`? |
|--------------|-------------|---------------|-------------|---------------------|
| Database connection | `DATABASE_URL` | `postgres://...` | Yes | No |
| Third-party API key | `STRIPE_SECRET_KEY` | `sk_live_...` | Yes | No |
| Public site URL | `NEXT_PUBLIC_SITE_URL` | `https://myapp.com` | No | Yes |
| Analytics write key (public) | `NEXT_PUBLIC_ANALYTICS_KEY` | `abc123` | No | Yes |
| Email service key | `RESEND_API_KEY` | `re_...` | Yes | No |
| Dev flag | `NODE_ENV` | `development` | No | No (set by host) |

### The NEXT_PUBLIC_ prefix

Some values are not secret. A public site URL is fine to show. In a Next.js app, any variable starting with `NEXT_PUBLIC_` gets sent to the browser. That means anyone can read it.

```js
// Safe: this is meant to be public
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Server only: no prefix, so it stays hidden on the server
const dbUrl = process.env.DATABASE_URL;
```

!!! warning
    Anything with the `NEXT_PUBLIC_` prefix is visible to everyone who opens your site. Never put a real secret key behind that prefix. Anyone can open the browser tools and read it in seconds.

??? note urdu "اردو میں مزید وضاحت"
    سیکرٹ ویلیوز جیسے پاس ورڈ یا API key کبھی بھی کوڈ یا Git میں نہ رکھیں۔ انہیں environment variables میں رکھیں اور لائیو سائٹ پر host کے dashboard میں ڈالیں۔ Next.js میں جس variable کے شروع میں NEXT_PUBLIC_ لگا ہو وہ browser تک پہنچ جاتا ہے، یعنی ہر کوئی اسے دیکھ سکتا ہے، اس لیے کوئی اصلی secret اس prefix کے ساتھ کبھی نہ رکھیں۔ Development اور production کے لیے الگ الگ values رکھیں تاکہ testing میں اصلی data خراب نہ ہو۔ یہ چھوٹی سی احتیاط بڑے حادثے سے بچاتی ہے۔

---

## Error monitoring with Sentry

When a bug hits a real user, the user rarely tells you. They just leave. Error monitoring (Roman Urdu: errors ko pakarne wala system) fixes that gap. It catches errors that happen on real devices and reports them to you. You get the stack trace, the page, and the browser, so you can find and fix the bug fast.

The diagram below shows the full path from a user hitting a bug to you getting the alert.

<figure markdown>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-sentry-flow" style="max-width:100%;height:auto">
  <title id="svg-sentry-flow">Error monitoring flow. A user on their phone hits a JavaScript error. Sentry captures it automatically. Sentry sends you an email alert with the stack trace, the page URL, and the browser. You fix the bug and deploy.</title>
  <defs>
    <marker id="s-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="70" width="130" height="60" rx="8"/>
    <rect x="200" y="70" width="130" height="60" rx="8"/>
    <rect x="380" y="70" width="150" height="60" rx="8"/>
    <rect x="580" y="70" width="100" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="85" y="96">User hits a bug</text>
    <text x="85" y="113">on their phone</text>
    <text x="265" y="96">Sentry captures</text>
    <text x="265" y="113">the error</text>
    <text x="455" y="93">You get an alert:</text>
    <text x="455" y="110">stack trace, page,</text>
    <text x="455" y="127">browser</text>
    <text x="630" y="96">You fix</text>
    <text x="630" y="113">and deploy</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#s-arrow)">
    <line x1="150" y1="100" x2="198" y2="100"/>
    <line x1="330" y1="100" x2="378" y2="100"/>
    <line x1="530" y1="100" x2="578" y2="100"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="350" y="175">Without monitoring, the user just leaves and you never find out.</text>
  </g>
</svg>
<figcaption>Sentry sits between the user's device and your inbox. A bug that would silently drive users away becomes a clear report you can act on.</figcaption>
</figure>

Sentry has a free tier that is plenty for a student project. You install it and wrap your app once.

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

The wizard adds the setup files for you. After that, Sentry watches your app and sends you an email when something breaks.

!!! tip
    Add error monitoring before you launch, not after. That way your first bug report comes from Sentry with a clear stack trace, not from an angry user with a vague "it does not work" message.

---

## Analytics that respect privacy

Analytics (Roman Urdu: maaloomat ke kaun kaun se log aaye) tell you which pages people visit and how many came by. You do not need heavy trackers that follow users around. Privacy-friendly tools like Plausible or Vercel Analytics give you the numbers without all that.

Vercel Analytics turns on with one small piece of code in your app layout.

```js
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
```

Now you can see your most popular pages in the dashboard. This helps you decide what to improve next.

---

## SEO checklist

Good SEO helps people find your site through search. You met titles and meta tags in 2.4, and performance in 14.4. Run this list on each page.

- A clear, unique title for every page.
- A short meta description that says what the page is about.
- Semantic HTML, so headings and sections have real meaning.
- Alt text on every image.
- A `sitemap.xml` and a `robots.txt` file.
- Fast load time, since slow pages rank lower.

---

## Accessibility checklist

Accessibility means everyone can use your site, including people with disabilities. You covered the basics in 2.4. Check these before launch.

- Keyboard navigation works, so you can reach everything without a mouse.
- Focus is visible, so users can see where they are.
- Alt text describes every meaningful image.
- Inputs have labels, so screen readers can name them.
- Color contrast is strong enough to read.
- Headings follow order, from `h1` to `h2` to `h3`, with no jumps.

---

## The "ready to launch" checklist

Run this final list right before you tell people about your app. Tick every box before you share the link.

| Check | How to verify | Pass condition |
|-------|--------------|----------------|
| Works on mobile | Open on your phone (not just DevTools) | No broken layout, text readable, buttons tappable |
| Lighthouse score | Run in Mobile + throttling mode | Performance, Accessibility, SEO all 90+ |
| No console errors | Open DevTools on the live URL, check Console tab | Zero red errors |
| Secrets are out of Git | Check `.gitignore` for `.env`; search repo for raw keys | No keys in any committed file |
| Error monitoring is live | Trigger a test error, confirm Sentry email arrives | Alert received |
| Analytics are on | Open the analytics dashboard after a page visit | Visit recorded |
| Custom domain with HTTPS | Open the site URL in browser | Padlock icon visible, `https://` in address bar |
| README explains the project | Open the repo root | README is clear to someone who has not seen the project |
| No `console.log` left in production code | Grep the source files | Clean output |

!!! note
    You will not tick every box on your very first project. That is fine. The list exists so you know what "done" looks like. Over time it becomes a habit, not a chore.

---

### Try this

Pick one project you have deployed and run the "ready to launch" checklist on it. Move any secret into a `.env` file and confirm that file is listed in `.gitignore`. Open the live site on your phone, check the browser console for errors, and tick off each box on the list. Note down anything that fails so you have a short fix list before you share the link.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Where do you store secrets for a live app, and why not in Git?
2. What does the `NEXT_PUBLIC_` prefix do to a variable?
3. What problem does error monitoring solve for you?
4. Name three items from the accessibility checklist.

---

## What's next

Chapter 19 is done. You can now manage state and data, and ship a clean production app that is safe and watched. The final chapter helps you build a strong portfolio and land your first job.

[Next chapter: 20. Career and portfolio capstone &rarr;](../chapter-20-career-and-portfolio/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Sentry for JavaScript](https://docs.sentry.io/platforms/javascript/)
- [Vercel Analytics](https://vercel.com/docs/analytics)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[environment variable]: A named value stored outside your code, used to keep secrets and settings safe. (Roman Urdu: code ke bahar rakhi gayi value jo secrets mehfooz rakhti hai)
*[error monitoring]: A tool that catches errors on real users' devices and reports them to you. (Roman Urdu: aisa tool jo asli users ke errors pakar kar aap ko batata hai)
*[Sentry]: A popular error monitoring service with a free tier for small projects. (Roman Urdu: ek mashhoor error monitoring service jiska free plan hai)
*[analytics]: Data about who visits your site and which pages they see. (Roman Urdu: maaloomat ke kitne log aaye aur kaun se pages dekhe)
*[launch checklist]: A short list of checks you run before sharing your app publicly. (Roman Urdu: app share karne se pehle ki choti checklist)
