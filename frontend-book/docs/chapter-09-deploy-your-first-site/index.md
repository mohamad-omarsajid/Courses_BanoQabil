# Chapter 9: Deploy your first site

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

Your work has lived on your laptop until now. This chapter puts it on the real
internet. By the end you will have a live URL you can send to anyone, anywhere.
That moment, seeing your own site at a real web address, is a big one.

You will deploy with only the skills you already have: HTML, CSS, Tailwind, and
plain JavaScript. No React yet. We cover Vercel, the modern professional way, and
InfinityFree with cPanel, the shared-hosting world many Pakistani clients still
use. Then you learn how to pick the right host for any job.

## Lessons in this chapter

- [ ] [9.1 What deployment really means](9-1-what-deployment-means.md): static sites, servers, DNS, and free HTTPS, in plain words.
- [ ] [9.2 Vercel, the modern way](9-2-vercel-deep.md): connect a GitHub repo and ship the donation site live.
- [ ] [9.3 InfinityFree and cPanel](9-3-infinityfree-and-cpanel.md): the shared-hosting world a freelancer in Pakistan will meet.
- [ ] [9.4 Choosing your host](9-4-netlify-pages-hostinger-and-choosing.md): Netlify, GitHub Pages, Hostinger, and a clear way to pick.

!!! tip "You will need your GitHub repo"
    The fastest hosts connect straight to GitHub. Make sure your site is pushed to
    a repository, the way you learned in Chapter 6. Then deploying takes minutes,
    not hours.

## Mega assignment

!!! bq-assignment "Ship your client site to the real internet, two ways"
    A site nobody can reach is a private project. Put your client's site online so
    the owner can open it on their own phone and share it on WhatsApp.

    **What you build**

    - The client site deployed on **Vercel**, connected to your GitHub repo so every push updates it automatically.
    - The same site also uploaded once to **InfinityFree with cPanel**, so you have done the shared-hosting workflow many Pakistani clients still use.
    - A short note in your README comparing the two: which was faster, and which you would recommend to this client and why.

    **Done when**

    - [ ] The Vercel URL loads over `https://` with no errors.
    - [ ] Pushing a change to GitHub updates the Vercel site on its own.
    - [ ] The cPanel copy also loads at its own address.
    - [ ] Your README links the live site and gives your hosting recommendation.

    **Stretch goal:** Point a free or cheap custom-looking domain at the Vercel site, and test it on a real phone over mobile data, not just your home wifi.

[Start lesson 9.1 &rarr;](9-1-what-deployment-means.md){ .next-lesson }
