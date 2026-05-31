---
lesson_id: frontend.ch09.l01
title: "9.1 What deployment really means"
chapter: 9
order: 1
estimated_minutes: 30
prerequisites:
  - frontend.ch08.l04
---

# 9.1 What deployment really means

So far your site lives only on your laptop. When you close the lid, nobody else can see it. Deployment fixes that. It puts your files on a computer that stays on all the time, so anyone with the link can open your work.

## What you'll know by the end

- What the word "deploy" actually means in plain terms.
- What a static site is and why your work counts as one.
- What a server does the moment someone visits your site.
- The simple journey a visit takes, from URL to your files.
- Why HTTPS matters and why it is free now.
- The 5 main hosting choices and when each one fits.

---

## What "deploy" means

To deploy (Roman Urdu: deploy karna, yani apni files ko hamesha-on server par rakhna) means to put your files on a computer that is always on. That computer sits in a data center and never sleeps. People call it a host or a server.

Once your files live there, anyone can reach them. They just type your link. Your laptop can be closed, and the site still works.

Right now your files only exist on your machine. Deployment copies them to a place the whole internet can see.

---

## Static versus dynamic sites

There are two kinds of websites. Understanding the difference tells you exactly why your site is easy to host.

A **static site** is just HTML, CSS, and JavaScript files. When a visitor arrives, the server picks up the files and sends them as they are. Nothing changes between visitors. The files sit on a disk and wait.

A **dynamic site** has a server that runs code on every request. It pulls data from a database, builds the page on the spot, and sends it back. A login page, a shop with a cart, or a news feed are all dynamic. The page is different for each person.

| Feature | Static site | Dynamic site |
| --- | --- | --- |
| What the server does | Sends files as they are | Runs code, queries a database |
| Languages needed | HTML, CSS, JS only | Also PHP, Python, Node, etc. |
| Database needed | No | Usually yes |
| Speed | Very fast, files cached easily | Can be slower without caching |
| Cost to host | Often free | Usually paid |
| Your site right now | Yes | Not yet |

Your site across Chapters 1 to 7 is static. You wrote pages, styled them, and added JavaScript. That is a static site, and static sites are simple to host. They are cheap, fast, and safe. Many big sites are static too.

---

## What a server actually does

A server is a computer that waits for visitors. When someone wants your site, the server hears the request. Then it sends your files back to that person.

That is the whole job for a static site. The browser asks, the server answers with HTML, CSS, and JS. The browser then draws the page on screen.

Think of it like a shop assistant. You ask for an item, and they hand it to you. The server hands over your files.

---

## The journey of one visit

A lot happens when someone opens your site. It feels instant, but there are clear steps. Here is the simple version.

1. **The URL.** The visitor types your address, like `https://my-site.com`.
2. **DNS.** The name turns into a number. Recall from lesson 0.1 that DNS is like a phone book. It maps the name to the real address of the host.
3. **The host sends files.** The host receives the request and sends back your HTML, CSS, and JS.
4. **The build step.** Some hosts run a build first. A build turns your source files into the final files the browser needs. You will see this with tools like Tailwind later.
5. **The cache.** Hosts keep copies of your files in many places around the world. These copies sit close to users, so the site loads fast for everyone.

You do not control most of this. The host handles it for you. Your job is mainly to push good files.

### How a domain name resolves

Before the host can send your files, the browser must find the right server. This lookup is done by DNS. Here is that journey as a picture.

<figure markdown>
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-dns-title" style="max-width:100%;height:auto">
  <title id="svg-dns-title">Domain name resolution: the browser asks a DNS resolver for an IP address, the resolver queries root and TLD name servers, gets the IP, and the browser connects to the host server at that IP.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="90" width="140" height="64" rx="8"/>
    <rect x="210" y="90" width="140" height="64" rx="8"/>
    <rect x="400" y="20" width="140" height="64" rx="8"/>
    <rect x="400" y="160" width="140" height="64" rx="8"/>
    <rect x="640" y="90" width="150" height="64" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="600" fill="#1f1f1c">
      <text x="90" y="118">Your browser</text>
      <text x="280" y="118">DNS resolver</text>
      <text x="470" y="48">Root / TLD</text>
      <text x="470" y="188">Name server</text>
      <text x="715" y="118">Host server</text>
    </g>
    <g font-size="11" fill="#6b6b65">
      <text x="90" y="138">types the URL</text>
      <text x="280" y="138">your ISP or 8.8.8.8</text>
      <text x="470" y="64">name servers</text>
      <text x="470" y="204">stores the IP</text>
      <text x="715" y="138">sends your files</text>
    </g>
  </g>
  <defs>
    <marker id="bq-arrow-dns" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-dns)">
    <line x1="160" y1="119" x2="202" y2="119"/>
    <line x1="350" y1="108" x2="392" y2="55"/>
    <line x1="350" y1="130" x2="392" y2="185"/>
    <line x1="540" y1="52" x2="630" y2="108"/>
    <line x1="540" y1="192" x2="630" y2="136"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="182" y="112">asks</text>
    <text x="366" y="76">queries</text>
    <text x="366" y="155">queries</text>
    <text x="598" y="72">IP</text>
    <text x="598" y="172">IP</text>
  </g>
</svg>
<figcaption>When you type a domain name, a DNS resolver finds the matching IP address by asking a chain of name servers. The browser then connects to the host at that IP and downloads your files.</figcaption>
</figure>

---

## Key terms in plain words

Three ideas come up every time you talk about hosting. Here they are without jargon.

| Term | What it actually is | Plain example |
| --- | --- | --- |
| **DNS** (Roman Urdu: internet ki phone book) | A system that turns a domain name into a number so computers can find each other | You look up "Ali" in a contact book and get his phone number |
| **HTTPS** (Roman Urdu: mehfooz connection) | A secure version of HTTP that scrambles data on the way so nobody can read it in transit | Like sending a letter in a sealed envelope instead of an open postcard |
| **Hosting** (Roman Urdu: apni files ko kisi server par rakhna) | Renting space on a server that stays on all the time | Like renting a shop unit so customers can visit even when you are at home |

---

## HTTPS, free now

You have seen the small padlock next to a web address. That padlock means the connection uses HTTPS. HTTPS scrambles the data so others cannot read it on the way.

HTTPS matters because it keeps visitors safe. It protects passwords and forms. Browsers also warn people when a site has no padlock, which scares users away.

Good news. Modern hosts give you HTTPS for free. They set up the certificate for you, with no extra work and no yearly fee.

!!! note "Did you know"
    HTTPS used to cost money every single year. You had to buy a certificate and renew it. Now a service called Let's Encrypt gives certificates for free, and most hosts add them automatically.

---

## The 5 main hosting choices

You have many options, but five cover almost every beginner case. Here is each one in a single line.

- **Vercel.** Modern and connected to git. Great for frontend sites and easy to start.
- **Netlify.** Very similar to Vercel. Also git based, also smooth for static sites.
- **GitHub Pages.** Free and simple. Best for plain static sites and small projects.
- **Hostinger.** Paid shared hosting with cPanel. Popular in Pakistan and good for full websites.
- **InfinityFree.** Free shared hosting with cPanel. Good for learning how cPanel works.

When you want speed and a clean git flow, pick Vercel or Netlify. When you want a free quick page, pick GitHub Pages. When you want to learn cPanel, try InfinityFree, then move to Hostinger when you are ready to pay.

| Host | Free tier | Custom domain on free plan | Best for |
| --- | --- | --- | --- |
| Vercel | Yes, generous | Yes | Modern git-based projects |
| Netlify | Yes, generous | Yes | Same as Vercel, drag-and-drop option too |
| GitHub Pages | Yes | Yes (with CNAME) | Portfolios, open-source docs |
| InfinityFree | Yes | Subdomain only for free | Learning cPanel without paying |
| Hostinger | No (paid from day one) | Yes | Pakistani clients, email on domain, PHP sites |

!!! tip
    Start with a free host while you learn. You do not need to pay anything to put your first site online. You can always move to a paid host later, once you know what you need.

!!! info "This is not a detour, and it is not only for static sites"
    You have only built static HTML, CSS, and JavaScript sites so far, so that is what you deploy in this chapter. But the same skills carry straight over to the React apps you build later. A React project just adds one build step, and hosts like Vercel run it for you. You will come back to Vercel in Chapter 13 to deploy your ecommerce capstone. Learn the flow well here and that later step will feel easy.

---

<figure markdown>
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-deploy-title" style="max-width:100%;height:auto">
  <title id="svg-deploy-title">The deploy pipeline: your code, then git push, then the host builds it, then a live URL anyone can open.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="70" width="160" height="100" rx="10"/>
    <rect x="230" y="70" width="160" height="100" rx="10"/>
    <rect x="440" y="70" width="160" height="100" rx="10"/>
    <rect x="650" y="70" width="150" height="100" rx="10"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" text-anchor="middle">
    <text x="100" y="112" font-size="16" font-weight="600">Your code</text>
    <text x="100" y="136" font-size="12" fill="#6b6b65">HTML, CSS, JS</text>
    <text x="310" y="112" font-size="16" font-weight="600">git push</text>
    <text x="310" y="136" font-size="12" fill="#6b6b65">to GitHub</text>
    <text x="520" y="112" font-size="16" font-weight="600">Host builds</text>
    <text x="520" y="136" font-size="12" fill="#6b6b65">prepares files</text>
    <text x="725" y="112" font-size="16" font-weight="600">Live URL</text>
    <text x="725" y="136" font-size="12" fill="#6b6b65">anyone opens</text>
  </g>
  <defs>
    <marker id="bq-arrow-deploy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-deploy)">
    <line x1="180" y1="120" x2="222" y2="120"/>
    <line x1="390" y1="120" x2="432" y2="120"/>
    <line x1="600" y1="120" x2="642" y2="120"/>
  </g>
</svg>
<figcaption>Deploying is a short pipeline. You push your code, the host builds it, and the world gets a live URL.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    سرور ایک ایسا کمپیوٹر ہے جو ہر وقت چلتا رہتا ہے۔ جب کوئی شخص آپ کی ویب سائٹ کھولنا چاہتا ہے، تو اس کا براؤزر سرور سے درخواست بھیجتا ہے۔ سرور وہ درخواست سنتا ہے اور آپ کی فائلیں واپس بھیج دیتا ہے۔ DNS ایک فون بک کی طرح کام کرتا ہے جو ڈومین کا نام لے کر اس کا نمبری پتہ (IP) ڈھونڈتا ہے۔ HTTPS آپ کے ڈیٹا کو محفوظ رکھتا ہے۔ آج کل یہ سب کے لیے مفت دستیاب ہے۔ سٹیٹک سائٹ، یعنی صرف HTML، CSS اور JS والی سائٹ، ہوسٹ کرنا سب سے آسان اور سستا ہوتا ہے۔

### Try this

Open three sites you use often in your browser. For each one, click the address bar and check for the padlock and the `https://` at the start. Note which of the five hosts from this lesson you would pick for your own portfolio, and write down one reason in a sentence.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. In your own words, what does it mean to deploy a site?
2. What three kinds of files make up the static site you have built?
3. What does a server do the moment a visitor asks for your page?
4. Why does HTTPS not cost money anymore on modern hosts?

---

## What's next

Now you know what deployment is and what a host does. Next you will actually do it. In lesson 9.2 you will deploy a real site with Vercel, the modern git based way.

[Next lesson: 8.2 Vercel, the modern way &rarr;](9-2-vercel-deep.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: How browsers work](https://web.dev/articles/howbrowserswork)
- [Cloudflare: What is web hosting?](https://www.cloudflare.com/learning/performance/what-is-web-hosting/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[deploy]: To put your files on a computer that is always on, so anyone can reach them. (Roman Urdu: apni files ko hamesha on rehne wale computer par dalna)
*[host]: A computer that stays on and sends your files to visitors. (Roman Urdu: woh computer jo files visitors ko bhejta hai)
*[static site]: A site made of just HTML, CSS, and JS files, with no server code. (Roman Urdu: sirf HTML, CSS aur JS files wali site)
*[build]: A step that turns your source files into the final files the browser needs. (Roman Urdu: source files ko final files mein badalne ka step)
*[cache]: Copies of your files kept close to users so the site loads fast. (Roman Urdu: files ki copies jo users ke kareeb rakhi jati hain)
*[HTTPS]: A secure connection shown by the padlock, which scrambles data on the way. (Roman Urdu: mehfooz connection jo padlock se nazar aata hai)
*[DNS]: A system that turns a domain name into a number address so the browser can find the server. (Roman Urdu: internet ki phone book jo naam ko number mein badalti hai)
