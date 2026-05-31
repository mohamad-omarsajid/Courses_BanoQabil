---
lesson_id: frontend.ch15.l04
title: "15.4 Deploy, SEO, and images"
chapter: 15
order: 4
estimated_minutes: 40
prerequisites:
  - frontend.ch15.l03
---

# 15.4 Deploy, SEO, and images

You built your Next.js app in the last three lessons. Now you need to put it online so people can use it. You also want fast images and good Google results. This lesson shows you how to deploy, optimize images, and help search engines find your site.

## What you'll know by the end

- How to deploy a Next.js app to Vercel in a few clicks.
- Why the `next/image` component is better than a plain `<img>` tag.
- How to set a page title and description with the Metadata API.
- How to add a sitemap and a robots file for search engines.
- How to set secret values safely with environment variables.
- Why the `NEXT_PUBLIC_` prefix matters for the browser.

---

## Deploy to Vercel

Vercel is the company that makes Next.js. So deploying a Next.js app there is very easy. It almost feels unfair to other tools.

Recall Chapter 9, where you pushed code to GitHub. The flow is the same here.

```bash
git add .
git commit -m "Ready to deploy"
git push
```

These commands send your code to GitHub. Now go to the Vercel website and sign in with GitHub. Click "Add New Project" and import your repository.

Vercel reads your code and sees it is a Next.js app. It picks the right settings on its own. You just click "Deploy" and wait a minute. Vercel gives you a live URL like `your-app.vercel.app`. Every time you push to GitHub after this, Vercel builds and deploys again on its own.

---

## The next/image component

A plain `<img>` tag works, but it has problems. It sends one big file to every user. It can also jump the page around while it loads. That jump is called layout shift (Roman Urdu: page ka load hote waqt hilna), and it feels broken.

Next.js gives you a smart `<Image>` component instead. Import it from `next/image`.

```jsx
import Image from "next/image";

export default function Profile() {
  return (
    <Image
      src="/student.jpg"
      alt="A student smiling at a laptop"
      width={400}
      height={300}
    />
  );
}
```

This component does a lot of work for you. It resizes the image to fit the screen. It sends modern formats that are smaller in size. It loads images only when they scroll into view, which is called lazy loading (Roman Urdu: sirf screen par aane ke baad load hona). The `width` and `height` reserve space, so the page does not jump.

Here is a side-by-side comparison so you can see exactly what you gain:

| Feature | Plain `<img>` | `next/image` |
| --- | --- | --- |
| Resize to screen size | No, always full size | Yes, automatic |
| Serve modern format (WebP, AVIF) | No | Yes, automatic |
| Lazy load (only when in view) | Not by default | Yes, by default |
| Reserve space to stop layout shift | Only if you set CSS | Yes, from `width` and `height` props |
| Works with external image URLs | Yes | Yes, but you must allowlist the domain in `next.config.js` |
| Any extra config needed | None | Just `width`, `height`, and `alt` |

This matters a lot for Pakistani users. Many of them are on slow mobile data. Smaller images mean faster pages and less data used.

!!! tip
    Always use `next/image` instead of a plain `<img>` tag. It saves your users data and stops layout shift for free.

---

## SEO with the Metadata API

SEO (Roman Urdu: site ko Google par dhoondhne ke qabil banana) means making your site easy for Google to understand. When Google understands your page, it shows it to more people. Social previews on WhatsApp and Facebook also look better.

Next.js gives you the Metadata API for this. You export a `metadata` object from a page or layout file.

```jsx
export const metadata = {
  title: "Learn Front-End | BanoQabil",
  description: "A free beginner course to build websites with HTML, CSS, and React.",
};

export default function Page() {
  return <h1>Welcome to the course</h1>;
}
```

Next.js reads this object and adds the right tags to your page. Here is what each field does and where it shows up:

| Field | What it produces | Where you see it |
| --- | --- | --- |
| `title` | `<title>` tag in the HTML head | Browser tab, Google search result heading |
| `description` | `<meta name="description">` tag | Small text under the title in Google |
| `openGraph.title` | `<meta property="og:title">` tag | WhatsApp / Facebook link preview title |
| `openGraph.description` | `<meta property="og:description">` tag | WhatsApp / Facebook link preview text |
| `openGraph.images` | `<meta property="og:image">` tag | The thumbnail image in a link preview |
| `robots` | `<meta name="robots">` tag | Tells crawlers to index or skip this page |

A fuller metadata example with Open Graph for social previews:

```jsx
export const metadata = {
  title: "Learn Front-End | BanoQabil",
  description: "A free beginner course to build websites with HTML, CSS, and React.",
  openGraph: {
    title: "Learn Front-End | BanoQabil",
    description: "Build your first website for free.",
    images: ["/og-image.png"],
  },
};
```

Some pages are dynamic, like a single course page. For those, you write a `generateMetadata` function instead. It can read the page data and return a title for each one. You do not need it yet, but it is good to know it exists.

---

## Sitemap and robots

Search engines send small programs called crawlers to read your site. You can help them by adding two files in your `app` folder.

A `sitemap.js` file lists all your pages. This tells crawlers what exists on your site.

```jsx
export default function sitemap() {
  return [
    {
      url: "https://your-app.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://your-app.vercel.app/courses",
      lastModified: new Date(),
    },
  ];
}
```

A `robots.js` file tells crawlers what they may visit. It also points to your sitemap.

```jsx
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://your-app.vercel.app/sitemap.xml",
  };
}
```

Next.js turns these files into the correct formats on its own. With both files in place, Google can crawl your whole site with ease.

---

## Environment variables for production

Your app may use secret values, like an API key. You must never write secrets directly in your code. Recall the `.gitignore` lesson, where you learned to keep secrets out of GitHub.

Instead, you set these values in the Vercel dashboard. Go to your project settings and open the "Environment Variables" tab. Add a name and a value there. Vercel keeps it safe and gives it to your app at build time.

There are two kinds of values. Most secrets must stay on the server only. Some values are safe for the browser to see, like a public site name. For those, you add the `NEXT_PUBLIC_` prefix to the name.

```jsx
// Safe for the browser, because of the prefix
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

// Server only, stays hidden from users
const secretKey = process.env.PAYMENT_API_KEY;
```

The first value can be used anywhere, even in the browser. The second value stays on the server and users never see it.

| Variable name | Accessible in | Typical use |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Server and browser | Public config like site name or analytics ID |
| `DATABASE_URL` | Server only | Connection string for a database |
| `PAYMENT_API_KEY` | Server only | Secret API key, never safe to expose |

!!! warning
    Only values with the `NEXT_PUBLIC_` prefix are safe in the browser. Never put a secret key, like a password or payment key, behind that prefix.

??? note urdu "اردو میں مزید وضاحت"
    ڈپلوئی کا مطلب ہے اپنی ایپ کو انٹرنیٹ پر لائیو کرنا۔ Vercel پر یہ بہت آسان ہے، بس GitHub سے جوڑیں اور Deploy پر کلک کریں۔ next/image آپ کی تصویروں کو خود بخود چھوٹا، تیز اور بہتر فارمیٹ میں بھیجتا ہے، جو سست انٹرنیٹ والے صارفین کے لیے بہت مفید ہے۔ SEO کے لیے metadata آبجیکٹ export کریں جس میں title اور description ہو۔ environment variables میں خفیہ چیزیں رکھیں اور NEXT_PUBLIC_ صرف وہاں لگائیں جہاں براؤزر کو وہ value دکھانا محفوظ ہو۔

---

### Try this

Take a Next.js project and ship it. Swap any plain `<img>` for the `next/image` component with a `width`, `height`, and `alt`. Export a `metadata` object from a page with a `title` and `description`, then check the browser tab and view the page source to see the tags. Add a `sitemap.js` and a `robots.js` in your `app` folder. Push to GitHub, import the repo on Vercel, and deploy to get a live URL.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why is deploying a Next.js app to Vercel so easy?
2. Name two things the `next/image` component does for you.
3. Where do you export the `metadata` object, and what two fields did you set?
4. What does the `NEXT_PUBLIC_` prefix do to an environment variable?

---

## What's next

Chapter 15 is done. You can now build a Next.js site and ship it fast, with smart images and good search results. The next chapter goes deeper into animation and advanced motion, so your sites feel alive.

[Next chapter: 16. More animation and motion &rarr;](../chapter-16-more-animation/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[next/image]: The built-in Next.js component that optimizes images automatically. (Roman Urdu: tasveer ko khud chhota karne wala component)
*[metadata]: Data about a page, like its title and description, used by browsers and search engines. (Roman Urdu: page ki maaloomat jaise title aur description)
*[SEO]: Search engine optimization, the work of making your site easy for Google to find. (Roman Urdu: site ko Google par dhoondhne ke qabil banana)
*[sitemap]: A file that lists all the pages on your site for search engine crawlers. (Roman Urdu: site ke saare pages ki list)
*[environment variable]: A named value set outside your code, often used for secrets and settings. (Roman Urdu: code se bahar rakhi gayi value, aksar raaz ke liye)
*[layout shift]: When content jumps around on a page as images load without reserved space. (Roman Urdu: page ka load hote waqt hilna)
*[Open Graph]: A set of meta tags that control how your page looks when shared on social apps. (Roman Urdu: social media par share hone par page ka preview control karne wale tags)
