---
lesson_id: frontend.ch06.l01
title: "6.1 What is version control?"
chapter: 6
order: 1
estimated_minutes: 35
prerequisites:
  - frontend.ch05.l04
---

# 6.1 What is version control?

You have built real pages in the last four chapters. Now you need a safe way to save your work over time. What if you break something and want the old version back? Version control is the tool that gives you that power, and Git is the most popular one.

## What you'll know by the end

- What version control is and why it saves you from messy folder names.
- The three states a change moves through in Git.
- How to start tracking a folder with `git init`.
- How to stage and save changes with `git add` and `git commit`.
- How to view what changed and your full history.
- Why some files belong in `.gitignore`, and why secrets never get committed.

---

## What version control is

Version control is a system that saves snapshots of your project over time. Each snapshot records the exact state of your files at one moment. Later you can look back at any snapshot. You can also return to an old one if you need to.

Think of it like a save point in a game. You play, you reach a good spot, and you save. If things go wrong after that, you load the save point and try again.

The difference between version control and a manual backup is the detail. Version control knows *exactly* which lines changed, when, and who changed them. A folder copy just has the files.

---

## Why Git exists

Maybe you have made folders like `project_final`, then `project_final_v2`, then `project_final_really_final`. It gets confusing fast. You forget which one is the real one.

Git fixes this. You keep one folder, and Git remembers every saved version inside it. You get three things:

- A safe undo. You can go back to any earlier snapshot.
- A clear record. You can see every change and when it happened.
- One clean folder. No more copies with silly names.

The table below shows the key difference.

| Approach | What you have | Problem |
| --- | --- | --- |
| Manual folder copies | `project_v1`, `project_v2`, `project_final_v2` | Hard to know which is real; no detailed history |
| Git | One folder with full history inside | Easy to go back; every change is recorded |

!!! note "Did you know"
    Git was written by Linus Torvalds in 2005. He needed a fast tool to manage the code of the Linux kernel. He built Git in a few days, and now most of the software world uses it.

---

## The three states

A change in Git moves through three places before it is saved for good. This is the most important idea in this lesson, so go slowly here.

- **Working directory** (Roman Urdu: aap ka project folder). This is your project folder with the files you edit. When you change `index.html`, the change lives here first.
- **Staging area** (Roman Urdu: agle commit ke liye changes mark karne ki jagah). This is a holding spot. You mark the changes you want in your next snapshot. You do this with `git add`.
- **Repository** (Roman Urdu: saved history ka ghar). This is the saved history. When you run `git commit`, your staged changes become a permanent snapshot here.

So the flow is simple. You edit files, you stage the ones you want, then you commit them.

<figure markdown>
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-3state-title" style="max-width:100%;height:auto">
  <title id="svg-3state-title">The three states in Git: the working directory, the staging area, and the repository. git add moves changes to staging; git commit saves them to the repository.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20" y="70" width="180" height="100" rx="10"/>
    <rect x="320" y="70" width="180" height="100" rx="10"/>
    <rect x="620" y="70" width="180" height="100" rx="10"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" text-anchor="middle">
    <text x="110" y="114" font-size="14" font-weight="600">Working directory</text>
    <text x="110" y="138" font-size="12" fill="#6b6b65">your edited files</text>
    <text x="410" y="114" font-size="14" font-weight="600">Staging area</text>
    <text x="410" y="138" font-size="12" fill="#6b6b65">marked to save</text>
    <text x="710" y="114" font-size="14" font-weight="600">Repository</text>
    <text x="710" y="138" font-size="12" fill="#6b6b65">saved history</text>
  </g>
  <defs>
    <marker id="bq-arrow-3state" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-3state)">
    <line x1="200" y1="120" x2="312" y2="120"/>
    <line x1="500" y1="120" x2="612" y2="120"/>
  </g>
  <g fill="#6b6b65" font-family="JetBrains Mono, monospace" font-size="13" text-anchor="middle">
    <text x="256" y="58">git add</text>
    <text x="556" y="58">git commit</text>
  </g>
</svg>
<figcaption>A change moves through three states. git add stages it; git commit saves it to history.</figcaption>
</figure>

Here is a quick summary of what each area holds and what it feels like to work with.

| Area | What lives there | Command to move out of it |
| --- | --- | --- |
| Working directory | Your edited files, not yet told to Git | `git add <file>` |
| Staging area | Changes you marked for the next snapshot | `git commit -m "..."` |
| Repository | Permanent history of snapshots (commits) | nothing, it is saved |

Staging exists so you can pick exactly which changes go into one commit. You might change three files, but only two are ready. Stage those two and commit. The third change waits safely in the working directory.

??? note urdu "اردو میں مزید وضاحت"
    گٹ میں آپ کی تبدیلی تین جگہوں سے گزرتی ہے۔ پہلی جگہ ورکنگ ڈائریکٹری ہے، یعنی وہ فولڈر جہاں آپ اپنی فائلیں ایڈٹ کرتے ہیں۔ جب آپ کوئی فائل بدلتے ہیں تو وہ تبدیلی پہلے یہیں رہتی ہے۔ دوسری جگہ سٹیجنگ ایریا ہے، جہاں آپ git add سے یہ نشان لگاتے ہیں کہ اگلے سنیپ شاٹ میں کون سی تبدیلیاں محفوظ ہوں گی۔ تیسری جگہ ریپوزیٹری ہے، جہاں git commit کے بعد آپ کا سنیپ شاٹ ہمیشہ کے لیے محفوظ ہو جاتا ہے۔ سٹیجنگ اس لیے ہے کہ آپ ایک ساتھ صرف وہی تبدیلیاں commit کریں جو تیار ہیں، باقی بعد میں۔

---

## One-time setup

Before your first commit, Git needs to know who you are. You set this once on your computer. It stamps your name on every snapshot you save.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

The `--global` part means this applies to all your projects. You only run these two commands once. Use the same email you will use for your GitHub account later.

---

## Tracking your first project

Let us track a small project from start to finish. Make a folder with one file in it, for example `index.html`. Open your terminal inside that folder. Then follow these steps.

### Step 1: start tracking with git init

```bash
git init
```

This tells Git to start watching this folder. Git creates a hidden folder called `.git` inside. That is where it stores all your history. You run `git init` only once per project.

### Step 2: see what changed with git status

```bash
git status
```

This shows you the current state of your files. Right now it lists `index.html` as an untracked file. Git is telling you it sees the file but is not saving it yet. Run `git status` often. It is your map.

### Step 3: stage changes with git add

```bash
git add index.html
```

This moves `index.html` into the staging area. You have marked it to be saved in your next snapshot. To stage every changed file at once, use a dot:

```bash
git add .
```

The dot means "all changes in this folder". Run `git status` again and you will see the file is now staged.

### Step 4: save a snapshot with git commit

```bash
git commit -m "Add home page"
```

This saves your staged changes as one snapshot in the repository. The `-m` part lets you write a short message that explains the change. You just made your first commit.

### Step 5: see your history with git log

```bash
git log
```

This shows your list of commits, newest first. Each entry has a long ID, your name, the date, and your message. To leave the log on Windows, press `q`.

!!! tip
    Commit often, in small steps, with a clear message. One commit for one idea. Small commits are easy to read and easy to undo. A giant commit with fifty changes is hard to understand later.

---

## A commit timeline

Every time you run `git commit`, Git adds a dot to your project's timeline. Each dot is a snapshot you can come back to.

<figure markdown>
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-timeline-title" style="max-width:100%;height:auto">
  <title id="svg-timeline-title">A horizontal commit timeline. Four dots connected by a line, each labelled with a sample commit message below and a short hash above.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="none">
    <line x1="80" y1="90" x2="740" y2="90"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="130" cy="90" r="16"/>
    <circle cx="310" cy="90" r="16"/>
    <circle cx="490" cy="90" r="16"/>
    <circle cx="670" cy="90" r="16"/>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="130" y="58">a1b2c3</text>
    <text x="310" y="58">d4e5f6</text>
    <text x="490" y="58">7g8h9i</text>
    <text x="670" y="58">j0k1l2</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="130" y="126">Add home page</text>
    <text x="310" y="126">Add nav bar</text>
    <text x="490" y="126">Fix nav link</text>
    <text x="670" y="126">Add footer</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="130" y="143">commit 1</text>
    <text x="310" y="143">commit 2</text>
    <text x="490" y="143">commit 3</text>
    <text x="670" y="143">commit 4</text>
  </g>
</svg>
<figcaption>Each commit is a dot on the timeline. It carries a short hash ID, a message, and a full snapshot of your files at that moment.</figcaption>
</figure>

Each commit has a unique ID (a long string of letters and numbers). You can jump back to any commit. That is why good messages matter: they help you find the right dot fast.

---

## Common Git commands at a glance

You will use these commands every day. Keep this table nearby.

| Command | What it does |
| --- | --- |
| `git init` | Start tracking a folder with Git |
| `git status` | Show what changed since the last commit |
| `git add <file>` | Stage one file for the next commit |
| `git add .` | Stage all changed files at once |
| `git commit -m "..."` | Save staged changes as a snapshot with a message |
| `git log` | Show the full commit history |
| `git log --oneline` | Show history as one compact line per commit |
| `git diff` | Show exact line differences not yet staged |
| `git diff --staged` | Show exact line differences already staged |
| `git config --global user.name` | Set your name for all commits on this computer |

---

## Ignoring files with .gitignore

Some files should never be tracked. Build folders, downloaded packages, and secret files do not belong in your history. You list them in a file named `.gitignore` in your project folder.

```bash
node_modules/
.env
*.log
```

Each line names something for Git to ignore. The first line ignores a whole folder. The second ignores a secret settings file. The third ignores all files that end in `.log`. Git will not stage or commit anything listed here.

!!! note "A note on amanah"
    Never commit a password, an API key, or a private file. Once it is in your
    history, it is hard to remove. People's data and secrets are an amanah, a trust
    you must guard. Put secret files in .gitignore before your first commit.

---

## Writing good commit messages

A commit message tells the future you what you did. Keep it short and clear. Write what the change does, not how you feel.

Good messages look like this:

```bash
git commit -m "Fix broken nav link on mobile"
git commit -m "Add contact form to home page"
```

These are short and they say what happened. A weak message like "stuff" or "asdf" helps nobody. Aim for around five to ten words.

---

### Try this

Make a new folder with one `index.html` file inside. Open a terminal there and run `git init`. Add a `.gitignore` with a line for `.env`. Now run `git add .`, then `git commit -m "Add home page"`. Edit the file, run `git status` to see the change, then stage and commit it again. Finish with `git log` to see your two commits.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What are the three states a change moves through in Git?
2. Which command moves a change from the working directory into the staging area?
3. What does `git init` do, and how many times do you run it per project?
4. Why should a password never go into your Git history?

---

## What's next

You can now save snapshots of your work on your own computer. But your history still lives only on your machine. In lesson 6.2 you will meet GitHub, a website that stores your repository online so you can back it up and share it.

[Next lesson: 5.2 GitHub &rarr;](6-2-github.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Pro Git book: Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [GitHub: Set up Git](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[version control]: A system that saves snapshots of your project over time. (Roman Urdu: aap ke project ke purane versions save karne ka system)
*[Git]: The most popular version control tool, run from the terminal. (Roman Urdu: sabse mashhoor version control tool)
*[repository]: The folder where Git stores your saved history. (Roman Urdu: jahan Git aap ki history rakhta hai)
*[commit]: One saved snapshot of your staged changes. (Roman Urdu: ek saved snapshot)
*[staging area]: A holding spot for changes you marked to save next. (Roman Urdu: woh jagah jahan agle commit ke liye changes mark hote hain)
*[working directory]: Your project folder with the files you edit. (Roman Urdu: aap ka project folder jahan files edit hoti hain)
*[.gitignore]: A file that lists things Git should ignore. (Roman Urdu: woh file jo batati hai Git kya ignore kare)
