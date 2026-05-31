---
lesson_id: frontend.ch06.l02
title: "6.2 GitHub"
chapter: 6
order: 2
estimated_minutes: 35
prerequisites:
  - frontend.ch06.l01
---

# 6.2 GitHub

In 5.1 you saved your work with Git on your own computer. That is great, but your commits only live on one machine. If that laptop breaks, your project is gone. GitHub fixes this by storing your repository online, where it stays safe and easy to share.

## What you'll know by the end

- The difference between Git and GitHub, and why you want both.
- How to create a new repository on the GitHub website.
- How to connect your local project to GitHub with a remote.
- How to send commits up with `git push` and get changes down with `git pull` and `git clone`.
- How to sign in from the terminal without a password.
- How to write a simple README in Markdown.

---

## Git is not GitHub

People mix these up all the time, so let us make it clear.

Git is the tool on your computer. It tracks changes and saves commits. It works fully offline. You used it in 5.1 with no website at all.

GitHub is a website that hosts Git repositories online. Think of Git as your camera and GitHub as the photo album you keep in the cloud. You can take photos with no album, but the album keeps them safe and lets you share.

| | Git | GitHub |
| --- | --- | --- |
| What it is | A command-line tool you install | A website you log into |
| Where it runs | On your computer | In the cloud |
| Works offline | Yes, fully | No, needs the internet |
| Main job | Track changes, save commits | Host repos, show history, enable collaboration |
| Cost | Free, open source | Free for public and private repos |
| Made by | Linus Torvalds (2005) | Founded 2008, owned by Microsoft since 2018 |

So you can use Git with no GitHub. But GitHub gives you free backup, a place to share code, and a home for your projects. Most jobs expect you to know it.

---

## Your local repo and the remote

When you push to GitHub, two copies of your project exist at the same time: one on your computer, one on GitHub. Here is how they relate.

<figure markdown>
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-localremote-title" style="max-width:100%;height:auto">
  <title id="svg-localremote-title">A laptop on the left labelled Local repository and a cloud shape on the right labelled GitHub remote. Arrows between them: git push going right, git pull and git clone going left.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="70" width="220" height="120" rx="12"/>
    <rect x="570" y="70" width="220" height="120" rx="12"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#1f1f1c">
    <text x="140" y="115" font-size="15" font-weight="600">Local repository</text>
    <text x="140" y="140" font-size="12" fill="#6b6b65">your computer</text>
    <text x="140" y="158" font-size="12" fill="#6b6b65">works offline</text>
    <text x="680" y="115" font-size="15" font-weight="600">GitHub remote</text>
    <text x="680" y="140" font-size="12" fill="#6b6b65">github.com</text>
    <text x="680" y="158" font-size="12" fill="#6b6b65">always online</text>
  </g>
  <defs>
    <marker id="bq-arrow-remote" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-remote)">
    <line x1="254" y1="118" x2="566" y2="118"/>
    <line x1="566" y1="148" x2="254" y2="148"/>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="410" y="108">git push</text>
    <text x="410" y="170">git pull / git clone</text>
  </g>
</svg>
<figcaption>git push sends your commits up to GitHub. git pull brings new commits down. git clone copies the whole repo to a new machine.</figcaption>
</figure>

This two-copy idea is why Git is called a "distributed" system. Neither copy is the only one. You could work offline for days, commit freely, then push everything at once.

??? note urdu "اردو میں مزید وضاحت"
    گٹ آپ کے کمپیوٹر پر چلنے والا ایک ٹول ہے۔ یہ آپ کی تبدیلیاں محفوظ کرتا ہے اور انٹرنیٹ کے بغیر بھی کام کرتا ہے۔ گٹ ہب ایک ویب سائٹ ہے جو آپ کی ریپوزٹری کو آن لائن رکھتی ہے۔ اس سے آپ کا کام محفوظ رہتا ہے اور آپ اسے دوسروں کے ساتھ آسانی سے شیئر کر سکتے ہیں۔ git push سے آپ commits اوپر بھیجتے ہیں، git pull سے نئی تبدیلیاں نیچے لاتے ہیں، اور git clone سے پوری ریپو کسی نئی مشین پر copy کرتے ہیں۔ مختصر یہ کہ گٹ ٹول ہے اور گٹ ہب وہ جگہ ہے جہاں آپ اپنا کام رکھتے ہیں۔

---

## Create a new repository on GitHub

Open [github.com](https://github.com) and sign in. You made this account in lesson 1.2.

Now follow these steps in the website:

1. Click the green **New** button near the top left. You can also go to the **+** menu in the top right and pick **New repository**.
2. Type a **repository name**. Keep it short and clear, like `donation-site`.
3. Pick **Public** or **Private**. Public means anyone can see it. Private means only you and people you invite can see it.
4. You can add a **README** file here. For your first push, leave it unticked. You will add one yourself later.
5. Click **Create repository**.

GitHub now shows you a page with setup commands. Keep that tab open. You will need the URL from it soon.

!!! tip
    Make the repository name match your project. Use lowercase letters with dashes, like `donation-site`, not `Donation Site`. Spaces and capitals cause headaches in URLs and commands.

!!! warning
    A public repository is visible to everyone on the internet. Never push secrets like passwords or API keys. Remember the `.gitignore` file from 5.1. Use it to keep private files out of your commits.

---

## Connect your local project to GitHub

You have a local repository from 5.1. Now you link it to the empty GitHub repository. The online copy is called a **remote**.

```bash
git remote add origin https://github.com/your-username/donation-site.git
git branch -M main
git push -u origin main
```

Here is what each line does:

- `git remote add origin <url>` tells Git about the online copy. The name `origin` is just the normal nickname for your main remote.
- `git branch -M main` renames your current branch to `main`. GitHub expects this name by default.
- `git push -u origin main` sends your commits up to GitHub. The `-u` flag links your local `main` to the remote `main`, so next time you can type less.

Swap the URL for the one GitHub showed you. After this, just use `git push` to send new commits.

```bash
git push
```

That short command works because `-u` already set up the link.

---

## Get code down: clone and pull

Sometimes the code already lives on GitHub and you want it on your computer. That is what `git clone` does.

```bash
git clone https://github.com/some-user/some-project.git
```

This copies the whole repository, including its history, into a new folder. You use this for your own projects on a new machine, or to grab someone else's code.

When a repository changes online and you want the latest version locally, you pull.

```bash
git pull
```

`git pull` brings down new commits and adds them to your project. A simple rhythm to remember: pull before you start, push when you finish.

| Command | When to use it |
| --- | --- |
| `git clone <url>` | You have no local copy yet; you want to download the repo for the first time |
| `git pull` | You already have the repo locally; you want to get the latest changes from GitHub |
| `git push` | You made new commits locally; you want to send them up to GitHub |

---

## Signing in from the terminal

The first time you push, GitHub needs to know it is really you. Password login does not work in the terminal anymore.

You have two easy options:

=== "Personal Access Token"
    Make one on GitHub under **Settings > Developer settings > Personal access tokens > Tokens (classic)**. When the terminal asks for a password, paste the token instead. A PAT is a long password, so keep it somewhere safe like a password manager.

    ```bash
    # when prompted for password, paste your PAT here
    git push
    ```

=== "GitHub CLI"
    Install the `gh` tool from [cli.github.com](https://cli.github.com), then run this once.

    ```bash
    gh auth login
    ```

    It opens a browser, you approve, done. Your computer remembers the login for future pushes.

Either way you sign in once, and your computer remembers it.

---

## README files in Markdown

A README is the front page of your repository. It tells people what the project is and how to use it. GitHub shows it right under your file list.

You write a README in Markdown, the same simple format this book uses. Here are the basics:

```markdown
# Donation Site

A simple page that collects donations for a cause.

## Features

- Clean layout
- A donation form
- Built with HTML and CSS

Run it by opening `index.html` in your browser.

See the live notes in [this guide](https://github.com).
```

What each part does:

- `#` makes a heading. More hashes make smaller headings, like `##`.
- `-` at the start of a line makes a bullet in a list.
- Backticks around text like `index.html` show it as code.
- `[text](url)` makes a link. The words go in square brackets and the address in round brackets.

Save this as `README.md` in your project folder, then commit and push it.

---

## A quick tour of the GitHub page

Open your repository on the website. Here is what you see:

| Tab or button | What it shows |
| --- | --- |
| Code tab | Your main view. Every file and folder. |
| Commits count | Click it to see your full history, just like `git log`. |
| File view | Click any file to read its contents online. |
| Issues tab | A to-do list and bug tracker. People report problems here. |
| Green Code button | Gives you the clone URL. |
| Settings | Repository options, including GitHub Pages (lesson 6.4). |

Spend a minute clicking around. Seeing your own commits online makes the whole idea click.

---

## Hands-on: push your donation site

Let us put your Chapter 5 donation site on GitHub. Open your terminal inside that project folder.

First check your commits are saved.

```bash
git status
git log --oneline
```

If `git status` shows changes, add and commit them first.

```bash
git add .
git commit -m "Finish donation site"
```

Now go to GitHub and create a new repository called `donation-site`. Leave the README unticked. Copy the URL it shows.

Back in the terminal, connect and push.

```bash
git remote add origin https://github.com/your-username/donation-site.git
git branch -M main
git push -u origin main
```

If it asks for a password, paste your Personal Access Token. Now refresh the GitHub page. Your files are there. As a bonus, add a `README.md` file using the Markdown above, then commit and push it.

```bash
git add README.md
git commit -m "Add README"
git push
```

---

### Try this (15 minutes)

1. Open your GitHub profile in the browser.
2. Create a test repository named `github-practice`.
3. On your computer, make a folder with one `README.md` file.
4. Commit that file with Git.
5. Connect the folder to the GitHub repo and push it.
6. Refresh GitHub and confirm the README appears online.

Delete the practice repo later if you want. The important part is doing the full push flow once with low pressure.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between Git and GitHub?
2. What does `git remote add origin <url>` do?
3. When would you use `git clone` instead of `git pull`?
4. Why should you never push secrets to a public repository?

---

## What's next

Right now you commit everything onto one line called `main`. Real projects often need to test new ideas without breaking the working version. In 5.3 you learn branches and merging, which let you do exactly that.

[Next lesson: 5.3 Branches and merging &rarr;](6-3-branches-and-merging.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [GitHub Docs: Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)
- [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[GitHub]: A website that hosts Git repositories online for backup and sharing. (Roman Urdu: Git repos online rakhne wali website)
*[remote]: The online copy of your repository that your local Git connects to. (Roman Urdu: aap ki repo ki online copy)
*[origin]: The default nickname for your main remote on GitHub. (Roman Urdu: aap ki online copy ka aam rakha gaya naam jise Git pehchanta hai)
*[push]: Sending your local commits up to the remote on GitHub. (Roman Urdu: commits online bhejna)
*[pull]: Getting the latest changes from the remote down to your computer. (Roman Urdu: online changes neeche lana)
*[clone]: Copying a whole repository from GitHub onto your computer. (Roman Urdu: poori repo apne computer par copy karna)
*[README]: The front page file of a repository, written in Markdown. (Roman Urdu: repo ka pehla safha jo batata hai project kya hai aur kaise chalana hai)
