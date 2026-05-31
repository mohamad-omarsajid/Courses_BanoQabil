---
lesson_id: frontend.ch09.l04
title: "9.4 Choosing your host"
chapter: 9
order: 4
estimated_minutes: 35
prerequisites:
  - frontend.ch09.l03
---

# 9.4 Choosing your host

You have already shipped a site on Vercel and on cPanel hosting. Now you will meet three more hosts in one quick tour. Then you will learn a simple way to pick the right one every time. By the end your site can even live on its own custom domain.

## What you'll know by the end

- What Netlify does and why it feels like Vercel.
- How GitHub Pages hosts a static site straight from a repo.
- When Hostinger makes sense for a Pakistani client.
- A clear decision guide for choosing any host.
- How to point a custom domain at your site with DNS.
- How to get free HTTPS on that domain.

---

## Netlify

Netlify is very close to Vercel. You connect a Git repo, and it deploys on every push. You can also drag and drop a folder onto the Netlify dashboard, and it goes live in seconds.

It has a free tier that is fine for most learning projects. Netlify is built for static sites and JAMstack sites, just like Vercel. If you liked Vercel, you will feel at home here.

So why pick one over the other? Honestly, for a beginner the difference is small. Use whichever one a tutorial or a teammate already uses.

---

## GitHub Pages

You met GitHub Pages back in lesson 6.4. It is free, and it hosts a static site straight from a GitHub repo.

You push your HTML, CSS, and JS to a repo. Then you open the repo Settings, click Pages, and choose a branch. GitHub serves the site at a free address for you.

GitHub Pages is great for portfolios and simple sites. It has no server code, so it cannot run PHP or a database. For a personal portfolio, that is all you need anyway.

---

## Hostinger

Hostinger is paid shared hosting. It is very popular in Pakistan, and many local clients already use it.

It uses cPanel and hPanel, the same kind of control panel you saw in lesson 9.3. You upload files, manage email accounts, and set up databases from one dashboard.

Hostinger makes sense when a client already pays for it. It also helps when the project needs email on the domain or PHP on the server. For a plain static site, a free host is usually enough.

---

## Host comparison at a glance

Before you look at the decision guide, here is the whole picture in one table. Scan this whenever you forget which host does what.

| Host | Free tier | Custom domain (free plan) | Auto-deploys from Git | Best for |
| --- | --- | --- | --- | --- |
| **Vercel** | Yes, generous | Yes | Yes | Modern frontend, React, Vite |
| **Netlify** | Yes, generous | Yes | Yes, or drag-and-drop | Same as Vercel, also good for forms |
| **GitHub Pages** | Yes | Yes (via CNAME file) | Yes (branch-based) | Portfolios, docs, open-source sites |
| **InfinityFree** | Yes | Subdomain only | No, manual upload | Learning cPanel without spending money |
| **Hostinger** | No (paid) | Yes | No, manual upload | Pakistani clients, email hosting, PHP |

A few notes on the table. "Custom domain on free plan" means you can point your `yourname.com` at the host without paying the host itself. You still pay the domain registrar. GitHub Pages needs a CNAME file in your repo or a setting in the repo UI. InfinityFree only gives you a subdomain unless you bring your own domain.

---

## How to choose

You do not need to memorise every host. You just answer a few questions in order. Follow the first yes you reach, and you have your answer.

- If you push to Git and want auto-deploy, use Vercel or Netlify.
- If you just want a free static site simply, use GitHub Pages.
- If the client uses cPanel shared hosting, use Hostinger or InfinityFree.
- When you are unsure, start with Vercel.

<figure markdown>
<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-hostchoice-title" style="max-width:100%;height:auto">
  <title id="svg-hostchoice-title">A decision guide for choosing a host. Push to Git and want auto-deploy: use Vercel or Netlify. Plain static and free: GitHub Pages. Client uses cPanel: Hostinger or InfinityFree. Otherwise start with Vercel.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="40" y="30" width="380" height="64" rx="8"/>
    <rect x="40" y="150" width="380" height="64" rx="8"/>
    <rect x="40" y="270" width="380" height="64" rx="8"/>
    <rect x="40" y="390" width="380" height="56" rx="8"/>
    <rect x="470" y="34" width="250" height="56" rx="8"/>
    <rect x="470" y="154" width="250" height="56" rx="8"/>
    <rect x="470" y="274" width="250" height="56" rx="8"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="14">
    <text x="60" y="58">Push to Git and want</text>
    <text x="60" y="78">auto-deploy?</text>
    <text x="60" y="178">Plain static site,</text>
    <text x="60" y="198">free and simple?</text>
    <text x="60" y="298">Client uses cPanel</text>
    <text x="60" y="318">shared hosting?</text>
    <text x="60" y="423">Not sure? Start here</text>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="14" font-weight="600" text-anchor="middle">
    <text x="595" y="67">Vercel or Netlify</text>
    <text x="595" y="187">GitHub Pages</text>
    <text x="595" y="307">Hostinger or InfinityFree</text>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="16" font-weight="600">
    <text x="225" y="425" text-anchor="middle">Vercel</text>
  </g>
  <defs>
    <marker id="bq-arrow-host" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-host)">
    <line x1="420" y1="62" x2="462" y2="62"/>
    <line x1="420" y1="182" x2="462" y2="182"/>
    <line x1="420" y1="302" x2="462" y2="302"/>
    <line x1="230" y1="94" x2="230" y2="150"/>
    <line x1="230" y1="214" x2="230" y2="270"/>
    <line x1="230" y1="334" x2="230" y2="390"/>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="12">
    <text x="430" y="54">yes</text>
    <text x="430" y="174">yes</text>
    <text x="430" y="294">yes</text>
    <text x="238" y="128">no</text>
    <text x="238" y="248">no</text>
    <text x="238" y="368">no</text>
  </g>
</svg>
<figcaption>A quick way to choose. Answer each question top to bottom, and follow the first yes to your host.</figcaption>
</figure>

!!! note "Did you know"
    You can host a free static site on GitHub Pages, and it can stay live for years. Many developer portfolios live there with no monthly cost at all.

---

## Adding a custom domain

A free host gives you a long address. A custom domain (Roman Urdu: aap ka apna web address, jaise yourname.com) like `yourname.com` looks far more professional. Here is the full walkthrough using Vercel and Namecheap.

First, buy a `.com` domain from Namecheap. It costs a small yearly fee. Pick a short name you can spell out loud.

Next, open your project in Vercel. Go to Settings, then Domains, and add your domain. Vercel then shows you the DNS records to use.

Now copy those records into Namecheap. Open your domain, go to the DNS settings, and add each record exactly. A typical setup looks like this.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

After you save, wait for Vercel to verify the records. Once it verifies, your site is live on the custom domain. Vercel adds free HTTPS for you, so the address shows a padlock automatically.

### Why DNS changes take time

When you add or change a DNS record, that change has to spread from your domain registrar out to thousands of DNS servers around the world. Each server has its own copy, and it refreshes at its own pace. This spreading process is called DNS propagation (Roman Urdu: DNS tabdeeli ka poori duniya mein phailna). It can take anywhere from a few minutes to 48 hours.

The practical rule: if your domain does not work one hour after adding the records, wait a bit more before assuming you made a mistake. You can check whether the change has spread with a free tool like `whatsmydns.net`.

!!! tip
    DNS changes can take a while to spread across the internet. Wait a few hours before you assume the setup failed. The records often need time, not a fix.

??? note urdu "اردو میں مزید وضاحت"
    اپنا میزبان (ہوسٹ) منتخب کرنا آسان ہے اگر آپ ترتیب وار سوال پوچھیں۔ اگر آپ گٹ پر پُش کرتے ہیں اور خودکار ڈیپلائے چاہتے ہیں تو ورسل یا نیٹلیفائی استعمال کریں۔ سادہ مفت سائٹ کے لیے گٹ ہب پیجز بہترین ہے، اور کلائنٹ کے سی پینل کے لیے ہوسٹنگر مناسب ہے۔ اپنی ڈومین کو جوڑنے کے لیے ورسل کے دیے گئے ڈی این ایس ریکارڈ نیم چیپ میں ڈالیں۔ پھر تھوڑا انتظار کریں کیونکہ ڈی این اس کی تبدیلی پھیلنے میں وقت لیتی ہے۔ اگر ایک گھنٹے بعد بھی ڈومین کام نہ کرے تو گھبرائیں نہیں، صرف مزید انتظار کریں۔

---

### Try this (10 minutes)

1. Write down three imaginary projects: a portfolio, a client brochure site, and a React app.
2. Choose the best host for each one from this lesson.
3. For each choice, write one reason in plain English.
4. Pick one custom domain name you might buy later.
5. Write which DNS record type you would expect to edit first: `A` or `CNAME`.

This is decision practice. Real clients often need a clear recommendation more than a long list of options.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Which two hosts deploy automatically when you push to Git?
2. Where in a GitHub repo do you turn on GitHub Pages?
3. When does Hostinger make more sense than a free static host?
4. After you add a custom domain in Vercel, where do you paste the DNS records?

---

## What's next

Chapter 9 is done, and your site is live on the internet. You can deploy, you can manage hosting, and you can point a real domain at your work. The next chapter starts React, the library that powers most modern frontend jobs.

[Next chapter: 10. React foundations &rarr;](../chapter-10-react-foundations/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Netlify docs: Get started](https://docs.netlify.com/get-started/)
- [Namecheap: How to set up DNS](https://www.namecheap.com/support/knowledgebase/article.aspx/9776/2237/how-to-change-dns-for-a-domain/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[Netlify]: A host that deploys static and JAMstack sites from Git or a dropped folder. (Roman Urdu: ek hosting service jo Git se site live karti hai)
*[custom domain]: Your own web address, like yourname.com, that points to your site. (Roman Urdu: aap ka apna web address)
*[DNS record]: An entry that tells the internet where your domain should point. (Roman Urdu: domain ka pata batane wali entry)
*[nameserver]: A server that holds the DNS records for your domain. (Roman Urdu: jo server domain ke DNS records rakhta hai)
*[Hostinger]: A paid shared host with cPanel, popular in Pakistan. (Roman Urdu: Pakistan mein mashhoor paid shared hosting)
*[DNS propagation]: The time it takes for a DNS change to spread to servers around the world. (Roman Urdu: DNS tabdeeli ka poori duniya mein phailna)
