---
lesson_id: frontend.ch06.l04
title: "6.4 Pull requests, Pages, and etiquette"
chapter: 6
order: 4
estimated_minutes: 35
prerequisites:
  - frontend.ch06.l03
---

# 6.4 Pull requests, Pages, and etiquette

You can branch, commit, and merge now. But how do teams agree on a change before it lands? And how do you put your site on the real internet for free? This last lesson of Chapter 6 answers both. You will learn pull requests, GitHub Pages, and the simple manners of working with other people.

## What you'll know by the end

- What a pull request is and why teams use one.
- The normal flow from a branch to a merged change.
- Why a pull request helps you even when you work alone.
- How to deploy a static site for free with GitHub Pages.
- The basic etiquette of working on a shared project.
- How to write a clear commit message.

---

## What is a pull request?

A pull request is a request to merge one branch into another on GitHub. You finished some work on a branch. Now you ask the project to pull your changes into the main branch.

The word "request" matters. You are not forcing the change in. You are asking. Other people can read your work first and comment. This step is called code review.

A pull request page shows the exact lines you added and removed. It shows your commits. It gives everyone one place to talk about the change before it merges.

The reason pull requests exist is that code mistakes are much cheaper to catch before merging than after. A ten-minute review can save an hour of debugging later. That is the practical value, not ceremony.

---

## The pull request flow

Here is the path a change takes from idea to merged code. You will follow this loop on every real project.

<figure markdown>
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-prflow-title" style="max-width:100%;height:auto">
  <title id="svg-prflow-title">Five steps in a row connected by arrows: 1 Create branch, 2 Push to GitHub, 3 Open pull request, 4 Review and update, 5 Merge.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="70" width="130" height="60" rx="8"/>
    <rect x="188" y="70" width="130" height="60" rx="8"/>
    <rect x="356" y="70" width="130" height="60" rx="8"/>
    <rect x="524" y="70" width="130" height="60" rx="8"/>
    <rect x="692" y="70" width="108" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="85" y="97">1. Create</text>
    <text x="85" y="114">branch</text>
    <text x="253" y="97">2. Push to</text>
    <text x="253" y="114">GitHub</text>
    <text x="421" y="97">3. Open</text>
    <text x="421" y="114">pull request</text>
    <text x="589" y="97">4. Review</text>
    <text x="589" y="114">and update</text>
    <text x="746" y="97">5. Merge</text>
    <text x="746" y="114">into main</text>
  </g>
  <defs>
    <marker id="bq-arrow-pr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-pr)">
    <line x1="152" y1="100" x2="185" y2="100"/>
    <line x1="320" y1="100" x2="353" y2="100"/>
    <line x1="488" y1="100" x2="521" y2="100"/>
    <line x1="656" y1="100" x2="689" y2="100"/>
  </g>
</svg>
<figcaption>The pull request loop: branch, push, open a PR, address feedback, merge. You repeat this for every feature or fix.</figcaption>
</figure>

---

## The normal flow

Here is the typical path a change takes. Read it as a story.

```text
1. You create a branch and do your work.
2. You push the branch to GitHub.
3. You open a pull request on GitHub.
4. Reviewers read it and leave comments.
5. You update your branch and push again.
6. When everyone agrees, the PR gets merged.
```

You already know steps 1 and 2 from the last lesson. The push command looks like this.

```bash
git push -u origin add-contact-form
```

This sends your branch named `add-contact-form` to GitHub. After this, GitHub usually shows a button to open a pull request. You click it, write a short description, and submit.

When reviewers ask for changes, you do not start over. You just make more commits on the same branch and push again. The pull request updates itself.

!!! tip
    Open your pull request early as a draft. A draft says "not ready to merge yet." You still get eyes on your work sooner, and early feedback saves you time.

---

## Why bother when you work alone?

Maybe you have no team yet. Pull requests still help you.

A pull request is a record. Months later you can open it and see why a change happened. It is a checklist too. You review your own diff line by line before you merge.

It is also good practice. The job you want will use pull requests every day. Building the habit now makes that first week feel normal.

??? note urdu "اردو میں مزید وضاحت"
    پل ریکویسٹ ایک درخواست ہوتی ہے کہ آپ کی برانچ کو مین برانچ میں شامل کر لیا جائے۔ پہلے آپ اپنی برانچ گٹ ہب پر بھیجتے ہیں، پھر پل ریکویسٹ کھولتے ہیں۔ دوسرے لوگ آپ کا کام پڑھتے ہیں اور تبصرے کرتے ہیں۔ اگر کوئی تبدیلی درکار ہو تو آپ دوبارہ کام کر کے بھیج دیتے ہیں۔ سب کی رضامندی کے بعد آپ کا کام مرج ہو جاتا ہے۔ اکیلے کام کرنے پر بھی پل ریکویسٹ فائدہ مند ہے کیونکہ یہ آپ کی تاریخ محفوظ رکھتی ہے اور آپ کو کام کے ٹیم طریقے کی عادت ڈالتی ہے۔

---

## Deploy a static site free with GitHub Pages

Your donation site from Chapter 5 is just HTML, CSS, and JavaScript. That is a static site. GitHub Pages can host it for free and give it a live web address.

Here is the path.

```text
1. Push your site files to a GitHub repository.
2. Open the repository on GitHub.
3. Go to Settings, then Pages.
4. Pick the branch (often main) and the root folder.
5. Save. Wait about a minute.
```

GitHub then gives you a live URL. It looks like this.

```text
https://username.github.io/repo-name
```

Replace `username` with your GitHub name and `repo-name` with your repository name. Open it in a browser and your site is live for anyone to see.

One rule to remember. GitHub Pages only serves static files like HTML, CSS, and JavaScript. It cannot run a database or server code. For your donation site, that is a perfect fit.

!!! note "Did you know"
    GitHub Pages is free and hosts millions of sites. Many developers keep their personal portfolio there. Yours can live next to theirs at no cost.

---

## Collaboration etiquette

Working with others is mostly good manners. A few simple habits keep a team calm.

| Habit | Why it matters |
| --- | --- |
| Pull before you start | You build on fresh code, not code that is already out of date |
| Work on a branch | main stays clean; your experiment cannot break other people's work |
| Write a clear PR description | Reviewers understand what you changed and why without guessing |
| Give kind, specific review comments | People fix things faster when they feel helped, not attacked |
| Never push straight to main | A PR gives everyone a chance to catch problems before they land |
| Respond to comments promptly | Leaving comments unanswered blocks the whole team |

A good review comment sounds helpful, not harsh. Say "Can we rename this variable for clarity?" instead of "This is wrong." People work harder for teammates who are kind.

---

## Commit message conventions

A commit message describes one change. Keep the first line short, under about 50 characters. Write it in present tense, as a command.

Here is what separates a good message from a weak one.

| Good message | Weak message | Why the good one wins |
| --- | --- | --- |
| `Add contact form` | `stuff` | Says exactly what was done |
| `Fix broken navbar link` | `fix` | Names the exact thing that was fixed |
| `Update donation amount labels` | `changes` | Tells you which labels changed |
| `Remove unused CSS variables` | `cleanup` | Specific about what was cleaned |

If the change needs more explanation, leave a blank line and write a body below.

```text
Add contact form

The form posts name, email, and message. Validation
runs before submit so empty fields are blocked.
```

A clear message helps your future self. Six months later, "Add contact form" tells you exactly what happened. A message like "stuff" tells you nothing.

!!! note "A note on sidq"
    A commit message should tell the truth about what you changed. Do not write
    "fix" when you added a feature, or hide a mistake in a vague message. Honest,
    clear messages are a small sidq, and they build trust with everyone who reads
    your history later, including you.

---

### Try this

Take your donation site repository on GitHub. Create a branch, make one small change, and push it with `git push -u origin your-branch`. Open a pull request on GitHub, write a short description of what you changed, and merge it. Then go to Settings, Pages, pick the main branch, and save. Wait a minute and open your live `https://username.github.io/repo-name` URL.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. In one sentence, what is a pull request?
2. What kind of files can GitHub Pages serve, and what can it not run?
3. Name two etiquette rules for working on a shared project.
4. Why should the first line of a commit message stay short and in present tense?

---

## What's next

Chapter 6 is done. Your code is saved with Git, shared on GitHub, and it can even go live for the world to see. Next comes JavaScript, where your pages stop sitting still and start to think and react.

[Next chapter: 7. JavaScript fundamentals &rarr;](../chapter-07-javascript-fundamentals/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- GitHub Docs: [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- GitHub Pages: [Getting started](https://docs.github.com/en/pages/getting-started-with-github-pages)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[pull request]: A request to merge one branch into another on GitHub, where others can review it first. (Roman Urdu: ek branch ko doosri mein milane ki darkhwast)
*[code review]: When people read your changes and comment before they merge. (Roman Urdu: jab doosre log aap ke code ko merge se pehle parh kar raye dete hain)
*[GitHub Pages]: A free GitHub service that hosts static sites at a live URL. (Roman Urdu: GitHub ki muft service jo aap ki site ko live address par chalati hai)
*[deploy]: To put your site or app on a server so people can use it live. (Roman Urdu: site ko live karna)
*[static site]: A site made only of HTML, CSS, and JavaScript with no server code. (Roman Urdu: sirf HTML, CSS aur JS wali site)
*[commit message]: A short note that describes what a commit changed. (Roman Urdu: commit ki tafseel ka chhota note)
