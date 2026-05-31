---
lesson_id: frontend.ch18.l04
title: "18.4 The complete project setup"
chapter: 18
order: 4
estimated_minutes: 40
prerequisites:
  - frontend.ch18.l03
---

# 18.4 The complete project setup

You learned TypeScript and a few tools in this chapter. But a real project uses many tools together. Each tool has one small job. In this lesson you will see the full picture of a modern 2026 frontend project, from top to bottom.

## What you'll know by the end

- The main tools in a modern frontend project, and the one job each one does.
- How to read a `package.json` file and its scripts.
- The difference between dependencies and devDependencies.
- How ESLint and Prettier work together to keep code clean.
- What commit hooks do, using Husky and lint-staged.
- What CI/CD means, and how GitHub Actions and Vercel fit in.

---

## The modern stack layers

A finished project is a stack of layers. Each layer does one job and hands off to the next. Here is the full picture.

<figure markdown>
<svg viewBox="0 0 580 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-stack-title" style="max-width:100%;height:auto">
  <title id="svg-stack-title">The modern frontend stack from bottom to top: Vite or Next.js as the build tool and framework, React for components, TypeScript for type safety, Tailwind for styling, shadcn/ui for accessible components, and Vitest plus ESLint plus Prettier for code quality.</title>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="330" width="520" height="50" rx="6" fill="#f4f4f1"/>
    <rect x="30" y="268" width="520" height="50" rx="6" fill="#f4f4f1"/>
    <rect x="30" y="206" width="520" height="50" rx="6" fill="#e8f4f0"/>
    <rect x="30" y="144" width="520" height="50" rx="6" fill="#e8f4f0"/>
    <rect x="30" y="82"  width="520" height="50" rx="6" fill="#fff3e0"/>
    <rect x="30" y="20"  width="520" height="50" rx="6" fill="#f4e8ff"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="290" y="361">Vite / Next.js</text>
      <text x="290" y="299">React</text>
      <text x="290" y="237">TypeScript</text>
      <text x="290" y="175">Tailwind CSS</text>
      <text x="290" y="113">shadcn/ui</text>
      <text x="290" y="51">Vitest + ESLint + Prettier</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="290" y="378">Framework + dev server + build</text>
      <text x="290" y="316">Component model + UI tree</text>
      <text x="290" y="254">Type safety</text>
      <text x="290" y="192">Utility-first styling</text>
      <text x="290" y="130">Accessible component primitives</text>
      <text x="290" y="68">Quality: tests, lint, format</text>
    </g>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65">
    <g text-anchor="start"><text x="10" y="355">foundation</text></g>
    <g text-anchor="start"><text x="10" y="45">quality</text></g>
  </g>
</svg>
<figcaption>The modern frontend stack. The framework sits at the base. React, TypeScript, Tailwind, and shadcn/ui build on it. Testing and code quality tools sit at the top, watching over the whole thing.</figcaption>
</figure>

Every layer is optional, but this combination is what most React teams use in 2026.

---

## A tour of the toolbox

A production project is a team of tools. You do not write all of this code yourself. You pick tools, and each one solves a single problem. Here is the team.

| Tool | Its one job | When you need it |
| --- | --- | --- |
| Next.js | The framework. It builds your pages and routes. | From day one |
| TypeScript | Adds types so you catch mistakes early. | From day one |
| Tailwind | Styles your UI with utility classes. | From day one |
| shadcn/ui | Ready made components you copy into your project. | When you need accessible UI fast |
| Zustand | Holds client state, like a sidebar open or closed. | When prop-drilling gets messy |
| TanStack Query | Holds server state, like data fetched from an API. | When you fetch from a backend |
| ESLint | Finds problems in your code. | As soon as the project is real |
| Prettier | Formats your code automatically. | As soon as you work with others |
| Vitest | Runs your tests. | When code is worth protecting |
| Vercel | Hosts your site on the internet. | When you are ready to go live |

You met Next.js, TypeScript, and Tailwind already. Zustand and TanStack Query get full coverage in Chapter 19. The rest you will meet right here.

The point is simple. No single tool does everything. You stack small tools, and together they form a strong project.

---

## The package.json walkthrough

Every Node project has a `package.json` file. It is the control center. It lists your tools and your commands. Here is a sample scripts block.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "test": "vitest"
  },
  "dependencies": {
    "next": "16.0.0",
    "react": "20.0.0",
    "zustand": "6.0.0"
  },
  "devDependencies": {
    "eslint": "10.0.0",
    "prettier": "3.0.0",
    "vitest": "2.0.0",
    "typescript": "6.0.0"
  }
}
```

The `scripts` part holds named commands. You run them with `npm run`. So `npm run dev` starts the dev server. `npm run build` makes the final version. `npm run lint` checks your code. `npm run test` runs your tests.

Now look at the two lists of tools. `dependencies` are tools your app needs to run for real users. Next.js and React go here. `devDependencies` are tools you need only while building, like ESLint and Vitest. Users never see them.

### Dependencies vs devDependencies

| Question | dependencies | devDependencies |
| --- | --- | --- |
| Who needs it? | Real users running the app | You, while building |
| Shipped to production? | Yes | No |
| Examples | next, react, zustand | eslint, prettier, vitest, typescript |
| How to install | `npm install zustand` | `npm install --save-dev prettier` |
| Result in package.json | Under `"dependencies"` | Under `"devDependencies"` |

```bash
npm install zustand
npm install --save-dev prettier
```

The first line adds a normal dependency. The second line adds a dev dependency with the `--save-dev` flag. npm sorts each one into the right list for you.

---

## ESLint and Prettier together

These two tools sound similar, but they do different jobs. ESLint finds problems. Prettier fixes the look.

ESLint reads your code and warns you about real issues. It can spot an unused variable or a risky pattern. Prettier does not care about logic. It only makes your code look neat. It fixes spacing, quotes, and line breaks.

You run them like this.

```bash
npm run lint
npx prettier --write .
```

The first command checks for code problems. The second command formats every file in the folder. Run both, and your code is correct and tidy.

### ESLint vs Prettier: what each one does

| Tool | Finds/fixes | Example output |
| --- | --- | --- |
| ESLint | Real code problems | `'count' is defined but never used` |
| ESLint | Risky patterns | `Unexpected use of 'any'` |
| Prettier | Indentation | Converts 3-space to 2-space |
| Prettier | Quotes | Converts double quotes to single |
| Prettier | Line length | Wraps long lines at 80 chars |
| Prettier | Trailing commas | Adds or removes them per your config |

They do not overlap. Run ESLint first to fix real issues. Run Prettier after to make the result look neat.

!!! note "Did you know"
    Prettier ends most formatting arguments on a team. People used to fight about tabs, spaces, and quotes. Prettier just decides for everyone. The debate stops because nobody has to choose.

---

## Commit hooks with Husky and lint-staged

Back in Chapter 6 you learned Git. You make a commit to save your work. But what if the code has a problem? You do not want bad code in your history.

A commit hook fixes this. It runs a command automatically before each commit. Two tools work together here. Husky sets up the hook. lint-staged runs your tools only on the files you changed.

So the flow is simple. You type `git commit`. Husky catches it. lint-staged runs ESLint and Prettier on your staged files. If something is wrong, the commit stops. You fix it, then commit again.

This means bad code never gets committed. The check happens every time, with no effort from you. You forget it is even there.

??? note urdu "اردو میں مزید وضاحت"
    ایک جدید پروجیکٹ میں ہر ٹول کا ایک ہی کام ہوتا ہے۔ Next.js صفحات بناتا ہے، TypeScript غلطیاں پکڑتا ہے، اور Tailwind ڈیزائن سنبھالتا ہے۔ ESLint کوڈ کے مسائل ڈھونڈتا ہے اور Prettier کوڈ کو خود بخود ترتیب دیتا ہے۔ dependencies وہ ٹولز ہیں جو real users کو چاہئیں، اور devDependencies وہ ہیں جو صرف آپ کو بناتے وقت چاہئیں۔ Husky اور lint-staged ہر commit سے پہلے یہ ٹولز خود چلاتے ہیں، تاکہ خراب کوڈ کبھی save نہ ہو۔ آپ کو پہلے دن سب ٹولز کی ضرورت نہیں، انہیں آہستہ آہستہ شامل کریں جب ضرورت پڑے۔

---

## CI/CD basics

CI/CD sounds big, but the idea is small. CI means continuous integration. CD means continuous deployment.

Continuous integration means a service runs your checks on every push. You push your code to GitHub. A service like GitHub Actions wakes up. It runs your lint and your tests. If anything fails, you see a red mark. You fix it before it reaches anyone.

Here is a simple GitHub Actions workflow sketch.

```yaml
name: CI
on: push
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run lint
      - run: npm run test
```

This file lives in a folder named `.github/workflows`. On every push, GitHub installs your tools, runs lint, and runs tests. You get one safe report for the whole team.

Continuous deployment is the next step. When you merge code into the `main` branch, Vercel takes it and puts it live. You do not upload files by hand. The deploy happens on its own.

### The full flow from code to production

| Step | Who does it | What happens |
| --- | --- | --- |
| You write code | You | Local dev with `npm run dev` |
| You stage changes | You | `git add` picks the files |
| Commit hook runs | Husky + lint-staged | ESLint and Prettier run on staged files |
| Commit saved | Git | Code lands in your local history |
| Push to GitHub | You | `git push` sends code to the remote |
| CI check runs | GitHub Actions | Lint and tests run automatically |
| Merge to main | You (or a team) | The pull request is approved and merged |
| Deploy | Vercel | Site goes live automatically |

(Roman Urdu: har push par GitHub Actions lint aur tests chalata hai. Agar kuch fail hua to red mark aata hai aur deploy nahi hota. Agar sab pass hua to Vercel automatically live kar deta hai.)

!!! tip
    You do not need every tool on day one. Start with Next.js and TypeScript. Add Prettier when your code looks messy. Add a commit hook when you work with others. Each tool joins when the project needs it, not before.

---

### Try this

Open the `package.json` of one of your projects and read its `scripts`, `dependencies`, and `devDependencies`. For each tool you recognise from the toolbox table, say its one job out loud. Then add Prettier with `npm install --save-dev prettier` and run `npx prettier --write .` to tidy every file.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the one job of ESLint, and how is it different from Prettier?
2. What is the difference between `dependencies` and `devDependencies`?
3. What do Husky and lint-staged do before a commit?
4. What happens in GitHub Actions when you push your code?

---

## What's next

Chapter 18 is done. You now know the full modern toolchain, and what each tool is for. The next chapter goes deep on state management, fetching server data, and shipping your work to production.

[Next chapter: 19. State, data, and going to production &rarr;](../chapter-19-state-data-and-production/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Prettier docs](https://prettier.io/docs/)
- [GitHub Actions Quickstart](https://docs.github.com/en/actions/writing-workflows/quickstart)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[ESLint]: A tool that finds problems in your code. (Roman Urdu: code ke masail dhoondne wala tool)
*[Prettier]: A tool that formats your code automatically. (Roman Urdu: code ko khud tartib dene wala tool)
*[commit hook]: A command that runs automatically before a Git commit. (Roman Urdu: commit se pehle khud chalne wala command)
*[CI/CD]: Services that run checks and deploy your code automatically. (Roman Urdu: check aur deploy khud karne wali services)
*[devDependencies]: Tools needed only while building, not by real users. (Roman Urdu: sirf banane ke waqt darkar tools)
*[GitHub Actions]: A service that runs your lint and tests on every push. (Roman Urdu: har push par lint aur tests chalane wali service)
