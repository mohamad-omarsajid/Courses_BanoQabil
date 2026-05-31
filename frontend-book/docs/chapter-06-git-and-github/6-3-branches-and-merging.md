---
lesson_id: frontend.ch06.l03
title: "6.3 Branches and merging"
chapter: 6
order: 3
estimated_minutes: 35
prerequisites:
  - frontend.ch06.l02
---

# 6.3 Branches and merging

You have a website that works. Now you want to try a new idea. But what if the idea breaks everything? A branch lets you try things in a safe copy. Your working version stays clean while you experiment.

## What you'll know by the end

- Why branches exist and what problem they solve.
- What the main branch is and why it stays stable.
- How to create and switch branches with `git branch`, `git checkout -b`, and `git switch`.
- How to do work on a branch and commit it there.
- How to merge a branch back into main.
- What a merge conflict is and how to fix it calmly.

---

## Why branches exist

Think of your project as one straight line of commits. Every commit sits on that line. This main line is your safe, working version.

Now you want to add a new feature. Maybe a new navbar. Maybe a contact form. If you change the main line directly and break it, your whole site is broken.

A branch fixes this. A branch is a separate line of work. You make a copy, you try your idea there, and the main line stays safe. If the idea works, you bring it back. If it fails, you throw the branch away. Nothing on main was touched.

The real-world reason branches matter: when you work alone, a broken main just means your site is down. On a team it can block every other developer. Branches protect everyone.

---

## The main branch

When you start a Git repo, you already have one branch. It is usually called `main`.

The `main` branch holds your stable, working code. People expect `main` to always work. So you do not test risky ideas directly on `main`. You make a new branch for that.

You can see your branches like this.

```bash
git branch
```

This lists every branch. The current branch has a star next to it. Right now you only have `main`.

---

## Branch commands at a glance

There are a few ways to work with branches. This table keeps them straight.

| Command | What it does |
| --- | --- |
| `git branch` | List all branches; star marks the current one |
| `git branch new-feature` | Create a branch called `new-feature` (stays on current) |
| `git checkout -b new-feature` | Create `new-feature` and switch to it (classic way) |
| `git switch -c new-feature` | Create `new-feature` and switch to it (newer, clearer) |
| `git switch main` | Move back to the `main` branch |
| `git merge new-feature` | Merge `new-feature` into whatever branch you are on |
| `git branch -d new-feature` | Delete a branch after it is merged |
| `git branch -D new-feature` | Force-delete a branch even if unmerged (careful) |

---

## Creating and switching branches

To make a new branch and move into it, you have a few ways. The classic way is `checkout`.

```bash
git checkout -b new-feature
```

The `-b` part means "create a new branch and switch to it" in one step. After this, you are on `new-feature`.

Newer Git versions have a clearer command called `switch`.

```bash
git switch -c new-feature
```

The `-c` here means "create". This does the same thing. It makes `new-feature` and moves you to it.

To go back to main, use `switch` again.

```bash
git switch main
```

Both `checkout` and `switch` work. Use whichever your Git version supports. `switch` is the simpler name to remember.

---

## Doing work on the branch

Once you are on your branch, you work as normal. You edit files, you stage them, and you commit. Those commits live on the branch, not on main.

```bash
git switch -c new-feature
git add index.html
git commit -m "Change the homepage heading"
```

Now your change sits on `new-feature`. If you switch to main, the heading is still the old one. Your two lines of work are separate. That is the whole point.

!!! tip
    Make one branch per feature. Give it a clear name like `fix-navbar` or `add-contact-form`. When you read the name later, you know exactly what the branch is for.

---

## Merging your work back

When the branch is ready, you bring it into main. This is called a merge.

First, switch to the branch that should receive the work. That is `main`.

```bash
git switch main
```

Then merge the feature branch into it.

```bash
git merge new-feature
```

Now main has your heading change. The work moved from the branch into the safe line. After a successful merge, you can delete the branch. You do not need it anymore.

```bash
git branch -d new-feature
```

This keeps your branch list clean.

---

## Fast-forward vs merge commit

When you merge, Git uses one of two strategies. The result is the same, but the history looks different.

**Fast-forward** happens when no new commits were added to main since you branched. Git simply moves the main pointer forward along the branch's commits. No extra commit is created. The history stays a single straight line.

**A merge commit** happens when main got new commits while you were working on your branch. Git cannot just fast-forward, so it creates one extra commit that ties both lines together.

| Situation | Strategy Git uses | Extra commit created? |
| --- | --- | --- |
| main has no new commits since the branch | Fast-forward | No |
| main has new commits since the branch | Merge commit (3-way merge) | Yes |

For solo projects you will often see fast-forwards. On a team, merge commits are common and normal.

---

## The feature-branch workflow

Most teams follow the same simple loop. You will use it every day.

1. Make a branch for the feature.
2. Work and commit on that branch.
3. Switch to main.
4. Merge the branch into main.
5. Delete the branch.

That is it. One feature, one branch, one merge. Repeat for the next feature. This keeps main stable and your work organised.

!!! warning
    Commit or stash your work before you switch branches. If you switch with uncommitted changes, you may lose them or get a confusing error. Save your work first, then switch.

---

## Merge conflicts

Sometimes a merge cannot finish on its own. This is a merge conflict. It happens when two branches changed the same lines in the same file. Git does not know which version to keep, so it asks you.

Do not panic. A conflict is normal. It is just Git being careful.

When a conflict happens, Git puts special markers inside the file. They look like this.

```text
<<<<<<< HEAD
<h1>Welcome to my site</h1>
=======
<h1>Welcome to my portfolio</h1>
>>>>>>> new-feature
```

Here is what each marker means. The code between `<<<<<<< HEAD` and `=======` is the version from your current branch. The code between `=======` and `>>>>>>> new-feature` is the version from the branch you are merging.

To resolve it, stay calm and do this.

1. Open the file in your editor.
2. Decide which code is correct. Maybe one side, maybe both, maybe a new mix.
3. Delete the three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`).
4. Keep only the final code you want.
5. Save the file.

Then finish the merge with a normal add and commit.

```bash
git add index.html
git commit -m "Resolve merge conflict in heading"
```

The conflict is gone. Conflicts feel scary the first time. After you fix two or three, they stop being scary.

??? note urdu "اردو میں مزید وضاحت"
    برانچ آپ کے پروجیکٹ کی ایک الگ لائن ہوتی ہے۔ اس پر آپ نیا کام آزماتے ہیں جبکہ مین برانچ محفوظ رہتی ہے۔ جب دو برانچوں نے ایک ہی لائن کو بدلا ہو تو merge conflict آتا ہے۔ ایسے میں گھبرائیں مت، فائل کھولیں اور درست کوڈ رکھ کر باقی نشانات ہٹا دیں۔ fast-forward merge میں کوئی اضافی commit نہیں بنتی کیونکہ main پر کوئی نیا کام نہیں تھا، جبکہ merge commit اس وقت بنتی ہے جب دونوں لائنوں پر الگ الگ کام ہوا ہو۔ پھر add اور commit کر کے کام مکمل کر لیں۔

---

## A small example, start to finish

Let us walk through one full cycle. You change a heading on a branch and merge it.

First, create a branch and switch to it.

```bash
git switch -c edit-heading
```

Open `index.html` and change the `<h1>` text. Then stage and commit it.

```bash
git add index.html
git commit -m "Update homepage heading"
```

Now switch back to main. Notice the heading there is still the old one.

```bash
git switch main
```

Bring your change in with a merge.

```bash
git merge edit-heading
```

main now has the new heading. Clean up the branch.

```bash
git branch -d edit-heading
```

You just used the full feature-branch workflow. This is exactly how real projects move forward.

<figure markdown>
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-branch-title" style="max-width:100%;height:auto">
  <title id="svg-branch-title">A main branch with commits along the top. A feature branch splits off, gets two commits, then merges back into main.</title>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="60" y1="90" x2="700" y2="90"/>
    <line x1="280" y1="210" x2="440" y2="210"/>
    <line x1="160" y1="90" x2="280" y2="210"/>
    <line x1="440" y1="210" x2="560" y2="90"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="60" cy="90" r="14"/>
    <circle cx="160" cy="90" r="14"/>
    <circle cx="420" cy="90" r="14"/>
    <circle cx="560" cy="90" r="14"/>
    <circle cx="680" cy="90" r="14"/>
    <circle cx="280" cy="210" r="14"/>
    <circle cx="440" cy="210" r="14"/>
  </g>
  <g fill="#1f1f1c" font-family="Inter, sans-serif" font-size="13">
    <text x="44" y="64">main</text>
    <text x="250" y="248">feature</text>
  </g>
  <g fill="#6b6b65" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="560" y="64">merge</text>
  </g>
</svg>
<figcaption>The feature branch splits off main, gets its own commits, then merges back. main stays safe the whole time.</figcaption>
</figure>

The diagram below zooms in on the difference between a fast-forward and a merge commit.

<figure markdown>
<svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-ff-merge-title" style="max-width:100%;height:auto">
  <title id="svg-ff-merge-title">Two rows. Top row: fast-forward. Main has two commits, branch adds one, after merge main simply extends to include that commit with no extra dot. Bottom row: merge commit. Main has two commits and then a new one while the branch also has one; a merge commit ties them together as a fifth dot.</title>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="20" y="42">Fast-forward (main had no new commits)</text>
    <text x="20" y="182">Merge commit (main moved while you worked)</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="60" y1="80" x2="440" y2="80"/>
    <line x1="260" y1="80" x2="360" y2="130"/>
    <line x1="360" y1="130" x2="460" y2="80"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="60" cy="80" r="13"/>
    <circle cx="160" cy="80" r="13"/>
    <circle cx="360" cy="130" r="13"/>
    <circle cx="460" cy="80" r="13"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#1f1f1c" text-anchor="middle">
    <text x="60" y="58">C1</text>
    <text x="160" y="58">C2</text>
    <text x="360" y="108">C3 (branch)</text>
    <text x="460" y="58">C3 (merged, no extra dot)</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="60" y1="230" x2="600" y2="230"/>
    <line x1="260" y1="230" x2="360" y2="280"/>
    <line x1="360" y1="280" x2="500" y2="230"/>
  </g>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="60" cy="230" r="13"/>
    <circle cx="160" cy="230" r="13"/>
    <circle cx="360" cy="230" r="13"/>
    <circle cx="360" cy="280" r="13"/>
    <circle cx="500" cy="230" r="13"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#1f1f1c" text-anchor="middle">
    <text x="60" y="208">C1</text>
    <text x="160" y="208">C2</text>
    <text x="360" y="208">C3 (main)</text>
    <text x="360" y="258">C4 (branch)</text>
    <text x="500" y="208">C5 merge commit</text>
  </g>
</svg>
<figcaption>Fast-forward: no extra commit, the line stays straight. Merge commit: an extra dot ties both lines together when both had new work.</figcaption>
</figure>

---

### Try this

In one of your Git projects, run `git switch -c add-footer`. On that branch, add a footer to your `index.html`, then stage and commit it. Switch back to main with `git switch main` and notice the footer is gone. Now run `git merge add-footer` to bring it in, then delete the branch with `git branch -d add-footer`. You just ran the full feature-branch loop.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why would you make a branch instead of working on main directly?
2. What does the `-b` in `git checkout -b new-feature` do?
3. What two steps bring a finished branch into main?
4. What causes a merge conflict, and what do the markers `<<<<<<<`, `=======`, and `>>>>>>>` separate?

---

## What's next

You can now branch, work, and merge on your own computer. Next you will learn how to share branches with others on GitHub. In 5.4 you will see pull requests, GitHub Pages, and good etiquette for working with a team.

[Next lesson: 5.4 Pull requests, Pages, and etiquette &rarr;](6-4-pull-requests-pages-etiquette.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Atlassian: Git branching tutorial](https://www.atlassian.com/git/tutorials/using-branches)
- [Pro Git: Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[branch]: A separate line of work in your repo where you can try changes safely. (Roman Urdu: alag line jahan aap mehfooz tareeqe se naya kaam karte hain)
*[main branch]: The stable, working line of your project that people expect to always work. (Roman Urdu: project ki mustaqil aur kaam karne wali line)
*[checkout]: A Git command to switch branches, and with -b to create one too. (Roman Urdu: branch badalne ka command)
*[switch]: A newer Git command to move between branches, clearer than checkout. (Roman Urdu: branch ke darmiyan jane ka naya command)
*[merge]: Bringing the work from one branch into another branch. (Roman Urdu: ek branch ka kaam dusri branch mein lana)
*[merge conflict]: When two branches changed the same lines and Git asks you to pick. (Roman Urdu: jab do branch ne aik hi line badli ho aur Git aap se poochhe)
