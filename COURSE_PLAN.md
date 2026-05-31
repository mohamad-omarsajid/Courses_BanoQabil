# Bano Qabil Sahiwal: Front-End Course Build Plan

> This document is the single source of truth for building the Front-End book at `frontend-book/`.
> Read it in full at the start of every work session. Update task checkboxes as you complete work.

---

## 0. How to use this document

You are Claude Code working on the Bano Qabil Sahiwal Front-End course.

**At the start of every session:**

1. Read this entire file from top to bottom.
2. Look at the task list in section 11. Find the lowest-numbered unchecked task.
3. Either pick that task, or ask the user which task to work on.
4. Do the work. Follow the style guide in section 5 like your life depends on it.
5. When the task is complete, edit this file to mark the checkbox `[x]` and append the completion date in `YYYY-MM-DD` format inside the task line.
6. Commit with a clear message that references the task ID (e.g. `L-02-03: write CSS Grid lesson`).

**Rules:**

- Never invent content scope. The chapter outline in section 10 is locked. If a lesson genuinely needs an extra subsection, ASK the user before adding it.
- Never break the style guide. No em-dashes. No en-dashes. No AI-tells. See section 5.
- Never write a lesson without reading the lesson template in section 7 first.
- When a lesson needs a real-software screenshot or a real photo, do NOT generate one. Mark the placeholder per section 6 and add it to the matching `_NEEDED.md` file.
- When a lesson needs a diagram (flowchart, system diagram, conceptual illustration), write it as inline SVG per section 6.
- If the user asks for something that contradicts this plan, point to the relevant section and confirm before changing course.

---

## 1. Project context

**What this is.** A free, self-paced Front-End Development book hosted at `courses.banoqabilsahiwal.org/frontend/`. It teaches absolute beginners in Pakistan from zero to a shippable animated React site with one capstone ecommerce project. The book also serves as the written textbook for the in-person Bano Qabil Sahiwal classroom course, but the book is self-contained: a remote student can complete it without ever attending a class.

**Audience.** Absolute beginners in Pakistan. They read BASIC English and BASIC Urdu. Most are students aged 16-24. Most are on Windows laptops, roughly half on Windows 10, often with 4 GB RAM and slow internet. Most browse on Android phones outside of study sessions.

**Tone.** Friendly like The Odin Project. Plain. A little funny here and there. Strict where it matters. Not corporate, not condescending, never AI-flavoured. The approved tone reference is `frontend-book/docs/chapter-0/0-1-computer-and-internet.md` (lesson 0.1).

**What already exists.**

- MkDocs Material scaffold at `frontend-book/`
- An older 6-chapter folder layout from a previous plan (chapters 1 through 6 in the repo are from the OLD outline and need restructuring per section 4)
- The approved lesson 0.1 at `frontend-book/docs/chapter-0/0-1-computer-and-internet.md`
- Brand stylesheet stub at `frontend-book/docs/stylesheets/brand.css`
- Glossary stub at `frontend-book/docs/glossary.md`
- A separate Design book scaffold at `design-book/` (out of scope for this plan)
- A landing page in progress at `web/`  (out of scope for this plan)

**Stack the book runs on.**

- MkDocs Material for the static site
- Cloudflare Pages for hosting
- Supabase (planned, separate work) for auth + lesson-complete tracking
- Single GitHub repo, this folder hierarchy

**Stack the course teaches (so you write content accordingly).**

- HTML5, CSS3, modern JavaScript (ES2015+)
- Tailwind CSS
- Figma (read-only, design-to-code workflow)
- Git and GitHub
- Free deployment hosts (Vercel deeply, InfinityFree deeply, Netlify and GitHub Pages and Hostinger briefly)
- React 19 with Vite
- GSAP 3, Locomotive Scroll / Lenis
- Next.js 15 with App Router (Tier 2)
- Framer Motion, Anime.js (Tier 2)
- Three.js + React Three Fiber (Tier 2)
- TypeScript intro, shadcn/ui, Zustand, TanStack Query (Tier 2)

---

## 2. Visual identity (short version)

The design system is captured in `Design_System/Design System.html`. Key tokens you need when writing inline SVGs and embedded snippets:

| Token | Value |
|---|---|
| Primary | `#0fab95` (teal) |
| Primary dark | `#087767` |
| Primary light | `#5fd9c5` |
| Ink (body text) | `#1f1f1c` |
| Ink muted | `#6b6b65` |
| Surface | `#ffffff` |
| Border | `#e6e6e2` |
| Saffron (celebrations only) | `#f0a01a` |
| Danger | `#d83a3a` |

Fonts the site loads (do not load others in markdown):

- Recoleta or Fraunces for big headings (`# H1`, `## H2`)
- Inter for body text
- JetBrains Mono for code
- Noto Nastaliq Urdu for Urdu blocks, Jameel Noori Nastaleeq for inline Urdu glosses

The "GitBook-like" look for the book is achieved through MkDocs Material configuration in section 8, not through custom theming work.

---

## 3. Workflow rules for Claude Code

**Session start ritual.**

1. `git status` to see what changed since last session.
2. Read this `PLAN.md` from the top.
3. Read `STYLE_GUIDE.md` (created as task F-03 below) for the style rules in their canonical form.
4. Read `frontend-book/docs/chapter-0/0-1-computer-and-internet.md` as the tone reference if you have not seen it this session.
5. Pick the lowest-numbered unchecked task in section 11, or ask the user which task to do.

**Per-task workflow.**

1. Write the file or change.
2. Self-check against the style guide. Specifically: search the file for `—` and `–` and remove every one.
3. Self-check the lesson template: does it have all the required sections?
4. Self-check Visual Asset rules: is every screenshot marked correctly? Every needed diagram inline as SVG?
5. Update this `PLAN.md`: tick the box, add the date.
6. Update `SCREENSHOTS_NEEDED.md` and `IMAGES_NEEDED.md` if you added any placeholders.
7. Commit with message `<task-id>: <short description>`.

**Asking the user.**

Ask the user when:
- The chapter outline does not give you enough scope detail to write the lesson well.
- An external resource you planned to cite is broken or paywalled.
- A code example in the lesson would exceed about 40 lines (some lessons may need this; confirm before writing).
- You discover a contradiction between this plan and what the user said in chat.

Do NOT ask when:
- The next task is unambiguous from the chapter outline.
- You need to make a small wording choice (the style guide and lesson 0.1 are your reference).

**Never:**

- Run `mkdocs serve` or any build command unless the user asks. The user runs the local preview.
- Touch the `design-book/`, `web/`, or `Design_System/` directories. They are out of scope.
- Delete files outside `frontend-book/` without explicit instruction.
- Add tasks to section 11 without user approval.

---

## 4. Repository structure and conventions

### 4.1 Target structure for `frontend-book/`

The current repo has chapter folders 0 through 6 from an older plan. The new outline has 19 chapters. The reorganization is task **F-01** below.

Final structure after F-01:

```
frontend-book/
├── docs/
│   ├── index.md                         # course home, "start here"
│   ├── glossary.md                      # full A-Z glossary
│   ├── stylesheets/
│   │   └── brand.css                    # brand tokens + GitBook-style tweaks
│   ├── overrides/                       # template overrides (mark-complete button later)
│   ├── chapter-00-getting-ready/
│   │   ├── index.md                     # chapter intro and lesson list
│   │   ├── 0-1-computer-and-internet.md
│   │   ├── 0-2-word-excel-google.md
│   │   ├── 0-3-using-ai-to-learn.md
│   │   └── 0-4-learning-to-learn.md
│   ├── chapter-01-orientation/
│   │   ├── index.md
│   │   ├── 1-1-what-is-frontend.md
│   │   ├── 1-2-install-everything.md
│   │   ├── 1-3-the-terminal.md
│   │   └── 1-4-devtools.md
│   ├── chapter-02-html/
│   │   ├── index.md
│   │   ├── 2-1-first-html-tags.md
│   │   ├── 2-2-text-lists-links-images.md
│   │   ├── 2-3-forms-and-inputs.md
│   │   └── 2-4-semantic-and-accessibility.md
│   ├── chapter-03-css/
│   ├── chapter-04-tailwind-and-figma/
│   ├── chapter-05-git-and-github/
│   ├── chapter-06-javascript-fundamentals/
│   ├── chapter-07-javascript-in-depth/
│   ├── chapter-08-deploy-your-first-site/
│   ├── chapter-09-react-foundations/
│   ├── chapter-10-react-in-practice/
│   ├── chapter-11-animation-gsap/
│   ├── chapter-12-ecommerce-capstone/
│   ├── chapter-13-modern-react-patterns/
│   ├── chapter-14-nextjs/
│   ├── chapter-15-more-animation/
│   ├── chapter-16-three-js-and-r3f/
│   ├── chapter-17-typescript-and-tooling/
│   ├── chapter-18-state-data-and-production/
│   └── chapter-19-career-and-portfolio/
├── mkdocs.yml
├── SCREENSHOTS_NEEDED.md                 # generated list, see section 6
├── IMAGES_NEEDED.md                      # generated list, see section 6
├── STYLE_GUIDE.md                        # canonical style rules
└── .gitignore
```

Each chapter has an `index.md` (chapter overview), then four lesson files.

### 4.2 Naming conventions

- Chapter folders: `chapter-NN-slug` where `NN` is zero-padded (`00`, `01`, ..., `19`) and `slug` is kebab-case.
- Lesson files: `N-M-slug.md` where `N` is the chapter number (unpadded), `M` is the lesson number 1 to 4, and `slug` is kebab-case.
- Examples: `chapter-04-tailwind-and-figma/4-3-reading-figma-designs.md`, `chapter-11-animation-gsap/11-2-scrolltrigger.md`.

### 4.3 Frontmatter convention

Every lesson file starts with this YAML block. The `lesson_id` is what the Mark Complete button uses later, so it must be stable.

```yaml
---
lesson_id: frontend.ch04.l03
title: "4.3 Reading Figma designs"
chapter: 4
order: 3
estimated_minutes: 35
prerequisites:
  - frontend.ch04.l02
---
```

`estimated_minutes` is a realistic read-plus-practice estimate.

### 4.4 What to do with files from the old outline

The existing folders `chapter-0`, `chapter-1` through `chapter-6` are the old 6-chapter plan. Task F-01 handles this:

- `chapter-0/0-1-computer-and-internet.md` is approved and moves to `chapter-00-getting-ready/0-1-computer-and-internet.md`.
- `chapter-0/0-2-word-excel-google.md`, `0-3-using-ai-to-learn.md`, `0-4-learning-to-learn.md` were drafts. Move them to the new location, then audit each against the style guide and rewrite where they break the rules. Treat them as drafts, not approved work.
- `chapter-1` through `chapter-6` from the old plan are based on the wrong outline. Move them into `frontend-book/_archive/` so we can grep them for useful prose later, but they are NOT shipped content.

---

## 5. Writing style guide (canonical rules)

This is the version everyone agrees on. It also lives at `frontend-book/STYLE_GUIDE.md` after task F-03.

### 5.1 The absolute bans

These rules have zero exceptions.

1. **No em-dash (`—`).** Use a comma, colon, period, or parentheses depending on what the sentence actually wants. Search every file you write for `—` before saving and remove every instance.
2. **No en-dash (`–`).** Same fix. Search for `–` too.
3. **No "let's dive in", "in today's fast-paced world", "leverage", "robust", "delve", "embark", "navigate the complexities", "in the realm of", "it's worth noting that", "moreover", "furthermore", "additionally" used as a sentence opener.** These are AI-tells.
4. **No emoji in body prose.** Emoji is fine inside `> Note` blocks and inside the "Did you know" callouts only.
5. **No exclamation marks for emphasis.** A clear sentence does not need one. Save them for genuine excitement.
6. **No "as we have discussed" or "as mentioned earlier" without a link.** If you mean lesson 3.2, link to lesson 3.2.

### 5.2 Voice and reading level

1. Sentences average 12 words. Hard ceiling 18. If a sentence runs longer, split it.
2. One idea per sentence. One idea per paragraph cluster.
3. Active voice. "Click the button," not "the button should be clicked."
4. Second person. "You", not "the developer" or "one".
5. Contractions are fine and warm. "Don't", "you'll", "it's".
6. Define every technical term on first use. Use the dotted-underline tooltip pattern from section 5.5.
7. Friendly, not chummy. Strict when it matters. Honest about hard things.
8. Light humour is allowed in small doses. One small joke per lesson, not five. Never at the student's expense.
9. Acknowledge Pakistani context naturally where it helps (slow internet, Windows laptops, Urdu vocabulary). Don't perform it.

### 5.3 Bilingual approach

Default is BASIC English. Urdu shows up in three places only:

1. Inside tooltip definitions at the bottom of the lesson (see 5.5).
2. Inside a `> اردو میں مزید وضاحت` admonition when a concept is genuinely hard and an Urdu paragraph would help.
3. Inside example content (e.g. a form labelled "Salaam, Ali" in a JavaScript example).

Never write a paragraph in Urdu only. Never write a paragraph in English with random Urdu words sprinkled mid-sentence. Urdu is for definitions and for the optional explanation admonition.

**DECISION (2026-05-25, user-confirmed).** Use BOTH scripts, split by place:

- **Tooltip glosses (5.5) use Roman Urdu** (Latin letters, WhatsApp style), e.g. `woh app jis se tum websites dekhte ho`. Easiest to read inline and on phones.
- **The optional `اردو میں مزید وضاحت` admonition uses Urdu (Nastaliq) script**, for the few genuinely hard concepts that deserve a full Urdu paragraph. Give the admonition the `urdu` class so the stylesheet renders it right-to-left in Noto Nastaliq Urdu: `??? note "اردو میں مزید وضاحت" { .urdu }` is not valid admonition syntax, so instead add the class via the block. The body stays BASIC English.

### 5.4 Windows-first guidance

99% of the audience is on Windows. Half are on Windows 10.

1. Every install instruction must give the Windows path first, then mention macOS or Linux if relevant in one line.
2. For any Windows step that differs between Windows 10 and Windows 11, give both paths. Use a small two-column table or two separate sub-steps.
3. WSL2 is the primary development environment from Chapter 1 onwards. Always include a "If your laptop can't run WSL2" callout with the Windows-native fallback (Git for Windows + native Node.js + native VS Code).
4. Assume 4 GB RAM and a slow disk. Recommend lightweight extensions only. Warn before any step that downloads more than 200 MB.

### 5.5 Tooltip and glossary pattern

Use the MkDocs `abbr` extension. At the bottom of every lesson, define each tricky term once:

```markdown
*[DOM]: Document Object Model. The tree of HTML elements that JavaScript can read and change. More in lesson 7.3.
*[hoisting]: JavaScript's behaviour of treating variable and function declarations as if they were moved to the top of their scope. More in lesson 6.3.
```

Then anywhere in the prose, the bare term gets the tooltip automatically:

> The DOM is what your JavaScript talks to when it changes the page.

The dotted underline renders automatically. The tooltip shows on hover (desktop) or tap-and-hold (mobile).

Cross-lesson definitions live in `frontend-book/docs/glossary.md` (the master glossary) AND must be repeated in each lesson where the term appears (because abbreviations are scoped to the page in MkDocs).

For Urdu glosses inside tooltips:

```markdown
*[browser]: A program that turns website code into the page you see. (Roman Urdu: woh app jis se tum websites dekhte ho)
```

### 5.6 Code examples

1. Every code block specifies a language: ```` ```html ````, ```` ```css ````, ```` ```js ````, ```` ```bash ````, ```` ```jsx ````, etc.
2. Every code block over ~6 lines gets a comment at the top saying what file it belongs to or what it does.
3. Use real-looking variable names. Not `foo`, `bar`, `baz`. Use `username`, `cartTotal`, `productList`.
4. Comments in code are in BASIC English. Urdu in code comments only when it adds clarity for a hard concept.
5. Where possible, link to a working sandbox (CodePen, StackBlitz, Tailwind Play) just below the code block.

### 5.7 Lists vs prose

1. Use a list when you have three or more parallel items. Two items go in prose.
2. List items are short. If a list item runs longer than two sentences, it should become a subsection.
3. Numbered lists for sequences. Bulleted lists for unordered sets.

### 5.8 Headings

1. One `#` H1 per file, matching the lesson title in the frontmatter.
2. Section headings are `##`. Subsections are `###`. Rarely `####`.
3. Sentence case in headings. "What is HTML", not "What Is HTML".

### 5.9 Forbidden phrasings (running list, add as you discover more)

- "It is important to note that..." → just say the thing.
- "In conclusion..." → don't conclude, just finish.
- "Without further ado..." → never.
- "As an AI..." → never.
- "Diving deep" / "deep dive" → "go further" / "more detail".
- "Best practices" → just describe the better way directly.
- "Cutting-edge" → "modern".
- "Robust" → "reliable" or just leave it out.

---

## 6. Visual asset rules

Three kinds of visual:

### 6.1 SVG diagrams (you produce these)

When the lesson needs a conceptual diagram, flowchart, system illustration, or annotated layout, write it as **inline SVG inside the markdown**. No external files.

**SVG rules:**

- `viewBox="0 0 800 400"` for desktop diagrams. Tall diagrams use `0 0 800 600`. Mobile-only diagrams use `0 0 380 X`.
- **DECISION (2026-05-25): the book uses a black-and-white theme, so diagrams are grayscale, not teal.** Use ink and gray, never the teal accent (the only green in the book is the Next button).
  - Stroke and emphasis: `#1f1f1c` (ink), with `#6b6b65` for secondary lines
  - Fill for surfaces: `#ffffff` with `#e6e6e2` stroke (use `#f6f6f6` for subtle fills)
  - Body text in SVG: `#1f1f1c`, font-family `Inter, sans-serif`, font-size `14` to `18`
  - Code/mono text in SVG: `JetBrains Mono, monospace`
  - Diagrams must also read in dark mode; prefer `currentColor` for strokes/text where possible, or keep contrast high with ink-on-white panels.
- Wrap every SVG in `<figure>` with a `<figcaption>` underneath in plain text.
- Include a `<title>` element inside the SVG for accessibility.
- Keep SVGs simple. No gradients beyond a subtle linear gradient. No drop shadows. No filters that need browser support beyond standard.

**SVG template:**

```html
<figure>
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-title-NAME">
  <title id="svg-title-NAME">Plain English title of what this shows</title>
  <!-- diagram contents -->
</svg>
<figcaption>One-line caption explaining the diagram.</figcaption>
</figure>
```

**When NOT to make an SVG:** Anything that is a real screenshot of real software (VS Code, Figma, Chrome DevTools). Anything that needs photographic detail. Anything that would take more than ~80 lines of SVG to draw. In those cases, use a screenshot or image placeholder.

### 6.2 Screenshot placeholders (the user captures these)

When the lesson needs a screenshot of real software, write the placeholder inline:

```markdown
[SCREENSHOT: Windows 11 File Explorer with the View menu open and "File name extensions" checkbox highlighted with a saffron arrow. Resolution at least 1280px wide.]
```

Format requirements:
1. The word `SCREENSHOT:` in caps.
2. The application and OS version (e.g., "VS Code 1.95 on Windows 11").
3. What exactly to capture (which window, which menu open, which area).
4. What to highlight (arrow, circle, box) and in what color.
5. Minimum resolution.

After writing any lesson with screenshot placeholders, append them to `frontend-book/SCREENSHOTS_NEEDED.md` in this format:

```markdown
## Lesson 1.2: Install everything
- **File:** `chapter-01-orientation/1-2-install-everything.md`
- VS Code installer on Windows 11, the "Add to PATH" checkbox screen, that checkbox highlighted with saffron arrow.
- Same screen on Windows 10. The dialog looks slightly different.
- VS Code first-launch welcome screen with the Extensions icon highlighted on the left rail.
```

### 6.3 Image placeholders (the user provides these)

For photos, character illustrations, decorative art, or anything else that needs a designer:

```markdown
[IMAGE: A young Pakistani student smiling at a laptop in a small home study setup. Square crop, around 600x600. Used to illustrate "studying at home" callout.]
```

Same logging discipline as screenshots, into `frontend-book/IMAGES_NEEDED.md`.

### 6.4 What goes where (summary)

| Visual need | How to handle |
|---|---|
| Flowchart, system diagram, conceptual illustration | Inline SVG, you draw it |
| Annotated UI mockup (not a real screenshot) | Inline SVG |
| Real software screenshot (VS Code, Figma, browser) | `[SCREENSHOT: ...]` placeholder |
| Photograph or character art | `[IMAGE: ...]` placeholder |
| Code output, terminal output | Use a fenced code block, not an image |
| Math, equations | Use plain text or LaTeX. Don't draw. |

---

## 7. Lesson template

Every lesson follows this skeleton. The approved canonical example is lesson 0.1 (`chapter-00-getting-ready/0-1-computer-and-internet.md`). Re-read it before writing any new lesson.

```markdown
---
lesson_id: frontend.chNN.lM
title: "N.M Lesson title in sentence case"
chapter: N
order: M
estimated_minutes: <realistic estimate>
prerequisites:
  - frontend.chNN.l(M-1)
---

# N.M Lesson title in sentence case

<Opening paragraph: friendly hook in 2-4 sentences. Set the scene. No "Welcome to lesson N.M!". Just start.>

## What you'll know by the end

- <Outcome 1, concrete and observable>
- <Outcome 2>
- <Outcome 3 to 5, max 5 bullets>

<Optional: "That's it." or "No code yet. Promise." or similar reassurance.>

---

## <First section heading in sentence case>

<Body. BASIC English. Tooltips on hard words. Inline SVG where helpful. Screenshot placeholders where needed.>

> **Tip: <short title>**
>
> <One small piece of useful side info. Use sparingly.>

### Try this (<X> minutes)

<Numbered list of concrete steps. Each step starts with a verb.>

---

## <Second section heading>

<More body content.>

> **Did you know**
>
> <Genuinely interesting trivia tied to the topic. One per lesson maximum.>

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's exactly what this section is for.

1. <Question that tests outcome 1>
2. <Question that tests outcome 2>
3. <Question that synthesises across the lesson>
4. <Optional 4th question>
5. <Optional 5th question, max 5>

---

## What's next

<2-3 sentences teasing the next lesson and how this one feeds into it.>

---

## Going deeper (optional)

These are for the curious. You don't need to read them to continue.

- <Source>: [Resource title](url) <one-line description of what it adds>
- <Source>: [Resource title](url) <one-line description>
- <Source>: [Resource title](url) <one-line description>

<Maximum 3 resources. If you have more, pick the best 3 and cut the rest.>

---

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[term1]: Plain English definition. Urdu gloss where helpful. Cross-ref to where it's covered in depth.
*[term2]: ...
```

Mandatory sections (in order): YAML frontmatter, H1 title, opening paragraph, "What you'll know by the end", at least one content section, Knowledge check, What's next, Going deeper, glossary tooltips.

Optional sections (use when they fit): "Try this" boxes, Tip callouts, Did you know callouts, Urdu explanation admonitions, SVG figures.

---

## 8. MkDocs configuration (GitBook-style)

This is task **F-02**. The look is clean, sidebar-led, easy to navigate, similar to GitBook. The home page itself is the user's existing Astro/React landing at `web/` and is unrelated to this config.

**DECISION (2026-05-25, user-confirmed): the chosen theme is the existing black-and-white GitBook design, NOT the exact YAML below.** The config below was the original proposal. What actually shipped (and what to keep): `primary: white` (light) / `black` (dark) with no teal chrome; sidebar-led navigation with NO top tabs (so `navigation.tabs` is intentionally omitted); a single-open accordion via `docs/javascripts/nav.js`; short topic-only sidebar labels; small dense type; the only green is the `.next-lesson` button. The styling lives in `docs/stylesheets/brand.css`. The plugins `glightbox` and `git-revision-date-localized` are NOT enabled (the repo is not git-initialised and we avoid extra install/preview risk). Treat the YAML below as historical; the live `frontend-book/mkdocs.yml` is the truth.

```yaml
site_name: Bano Qabil Sahiwal, Front-End
site_url: https://courses.banoqabilsahiwal.org/frontend/
site_description: A free, beginner-first Front-End course from absolute zero to shipping animated React sites.
site_author: Bano Qabil Sahiwal

repo_url: https://github.com/<org>/<repo>
edit_uri: edit/main/frontend-book/docs/

theme:
  name: material
  custom_dir: docs/overrides
  language: en
  features:
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.sections
    - navigation.expand
    - navigation.indexes
    - navigation.top
    - navigation.tracking
    - toc.follow
    - toc.integrate
    - search.suggest
    - search.highlight
    - search.share
    - content.code.copy
    - content.code.annotate
    - content.tabs.link
    - content.action.edit
    - announce.dismiss
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: custom
      accent: custom
      toggle:
        icon: material/weather-night
        name: Switch to dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: custom
      accent: custom
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode
  font:
    text: Inter
    code: JetBrains Mono
  icon:
    repo: fontawesome/brands/github
    edit: material/pencil
    view: material/eye

markdown_extensions:
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - tables
  - toc:
      permalink: true
      toc_depth: 3
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets:
      auto_append:
        - docs/glossary.md
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg

plugins:
  - search
  - tags
  - glightbox
  - git-revision-date-localized:
      enable_creation_date: true
      type: date

extra_css:
  - stylesheets/brand.css

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/<org>
  generator: false

nav:
  - Home: index.md
  - "Chapter 0: Getting Ready":
      - chapter-00-getting-ready/index.md
      - "0.1 Your computer and the internet": chapter-00-getting-ready/0-1-computer-and-internet.md
      - "0.2 Word, Excel, and Google for developers": chapter-00-getting-ready/0-2-word-excel-google.md
      - "0.3 Using AI to learn": chapter-00-getting-ready/0-3-using-ai-to-learn.md
      - "0.4 Learning to learn": chapter-00-getting-ready/0-4-learning-to-learn.md
  - "Chapter 1: Orientation and setup":
      - chapter-01-orientation/index.md
      - "1.1 What is frontend development?": chapter-01-orientation/1-1-what-is-frontend.md
      - "1.2 Install everything": chapter-01-orientation/1-2-install-everything.md
      - "1.3 The terminal": chapter-01-orientation/1-3-the-terminal.md
      - "1.4 Browser DevTools": chapter-01-orientation/1-4-devtools.md
  # ... continue for all 19 chapters; full nav is task F-04
  - Glossary: glossary.md
```

The `nav:` block is fully populated in task **F-04** after all chapters exist.

**Brand CSS** (`docs/stylesheets/brand.css`) is task **F-05**. It maps Material's CSS variables to the design tokens in section 2.

---

## 9. The locked chapter outline (Tier 1 and Tier 2, 19 chapters, 76 lessons)

Each lesson lists: title, learning outcomes (terse, full versions go in the lesson YAML), main concepts, key external references to cite at the bottom, and any notable visual or capstone notes.

We do not call out the Tier boundary in the navigation. Students see one continuous syllabus. The Tier 1 / Tier 2 split is internal for production planning only.

### Chapter 0: Getting Ready (4 lessons)

Computer literacy gap-fill before any code.

- **0.1 Your computer and the internet** *(approved)*, files, folders, extensions; what a browser is; what happens when you visit a website.
  - Refs: MDN "How the Internet works"; Cloudflare "What is DNS?"; Mozilla "What is a web browser?"
  - SVG: simple browser→DNS→server diagram (already present as ASCII; convert to SVG per F-01).
  - Screenshots: Windows 11 and Windows 10 File Explorer "Show file extensions" toggle.

- **0.2 Word, Excel, and Google for developers**: type, format, save a .docx; SUM/AVERAGE/COUNTIF; advanced Google search operators (`site:`, quotes, minus); when to use which.
  - Refs: Microsoft "Word basics", "Excel basics"; Google "Search operators" cheatsheet.
  - Screenshots: Excel SUM formula bar; Google search showing `site:mdn.io` filter.

- **0.3 Using AI to learn**: what an LLM is in one paragraph; how to ask a good question; how to verify an answer; when AI is wrong; ethics and academic honesty.
  - Refs: Anthropic "Prompting basics"; OpenAI "Best practices for asking questions".
  - SVG: a "good prompt vs bad prompt" before/after panel.

- **0.4 Learning to learn**: YouTube at 1.5x with captions; spaced practice; the "stuck for 15 minutes" routine; how to take notes that work; the Pomodoro Technique briefly.
  - Refs: Barbara Oakley "Learning How to Learn" intro; Andy Hunt "Pragmatic Thinking and Learning" key ideas.

### Chapter 1: Orientation and environment setup (4 lessons)

This is where the real work starts. Niyyah callout fits here.

- **1.1 What is frontend development?**: define frontend vs backend vs full-stack; types of websites the student will be able to build (portfolio, ecommerce, SaaS landing, blog, dashboard, charity, restaurant menu); show 5-6 real Pakistani sites as examples; the halal web idea naturally placed.
  - Refs: MDN "Front-end web developer"; The Odin Project Foundations intro.
  - Niyyah callout fits here (intention behind learning to build).
  - SVG: a 3-panel diagram showing "you write code → browser reads it → user sees a website".
  - Visual: 5-6 real-site mini-cards as inline image grid (placeholder for screenshots).

- **1.2 Install everything (WSL2-first, Windows-native fallback)**: install WSL2 on Windows 10 and 11, install Ubuntu, install VS Code with the Remote-WSL extension, install Node.js via nvm inside WSL, install Git, create a GitHub account.
  - Refs: Microsoft "WSL2 install guide"; VS Code "Remote development in WSL".
  - Big screenshot inventory: PowerShell as admin running `wsl --install`; Ubuntu first-run username/password prompt; VS Code opening a WSL folder; `node -v` in WSL terminal.
  - Mandatory fallback callout: "If your laptop can't run WSL2" with Git for Windows + native Node.js + native VS Code path.

- **1.3 The terminal**: what a terminal is; `pwd`, `ls`, `cd`, `mkdir`, `touch`, `rm`, `cp`, `mv`; the difference between Windows PowerShell and a Linux shell; piping basics (`|`, `>`); reading error messages.
  - Refs: Ubuntu "Command line for beginners"; The Odin Project "Command line basics".
  - SVG: an annotated terminal screenshot mockup labeling prompt, cwd, command, output.

- **1.4 Browser DevTools**: open with F12 or right-click Inspect; Elements panel; Console panel; Network panel; Device toolbar for mobile preview; live-editing CSS in DevTools.
  - Refs: Chrome DevTools docs landing; MDN "What are browser developer tools?".
  - Screenshots: Chrome with the Elements panel open on a known site, the Network panel during a page load, the device toolbar showing iPhone preview.

### Chapter 2: HTML5 foundations (4 lessons)

- **2.1 Your first HTML tags**: what HTML is; a minimal HTML5 document; `<h1>` through `<h6>`, `<p>`, comments; the head vs body; how the browser parses HTML.
  - Refs: web.dev "Learn HTML: Overview of HTML"; MDN "HTML basics".
  - SVG: HTML document tree diagram showing head, body, nested elements.

- **2.2 Text, lists, links, and images**: `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, `<a>` with absolute vs relative URLs, `<img>` with `alt` and `width/height`, the difference between block and inline elements.
  - Refs: web.dev "Learn HTML: Images", "Lists", "Links".
  - Try-this: a 3-image gallery with captions.

- **2.3 Forms and inputs**: `<form>`, `<input>` of every common type, `<label>` and the `for` attribute, `<textarea>`, `<select>`, `<button>`, `required`, `placeholder` vs `value`; submitting a form (we'll handle the data in Chapter 7).
  - Refs: web.dev "Learn Forms"; MDN "Your first form".
  - Project: build a contact form that looks real.

- **2.4 Semantic HTML and accessibility**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`; why semantics help screen readers and SEO; heading hierarchy (only one h1, never skip levels); alt text for images; landmark roles briefly.
  - Refs: MDN "HTML5 element reference"; web.dev "Learn Accessibility: HTML basics".
  - Sitr (privacy) callout fits when discussing forms.
  - SVG: side-by-side div-soup-vs-semantic-HTML comparison.

### Chapter 3: CSS foundations (4 lessons)

- **3.1 Selectors, the box model, colours and fonts**: element / class / ID selectors, specificity intro, the cascade in one paragraph, the box model (content / padding / border / margin), colors (named, hex, rgb, hsl), web-safe fonts vs Google Fonts.
  - Refs: web.dev "Learn CSS: Selectors", "The box model".
  - Required play: CSS Diner (flukeout.github.io).
  - SVG: the box model diagram.

- **3.2 Flexbox**: `display: flex`, the main axis vs cross axis, `justify-content`, `align-items`, `flex-direction`, `gap`, `flex-wrap`, `flex-grow / shrink / basis`.
  - Refs: CSS-Tricks "A Complete Guide to Flexbox"; web.dev "Learn CSS: Flexbox".
  - Required play: Flexbox Froggy.
  - SVG: flex axes diagram.

- **3.3 CSS Grid**: `display: grid`, `grid-template-columns / rows`, `gap`, `grid-column`, `grid-row`, `fr` units, named grid areas; when to use Grid vs Flexbox.
  - Refs: CSS-Tricks "A Complete Guide to Grid"; Grid Garden game.
  - SVG: grid track and line numbering diagram.

- **3.4 Responsive design**: mobile-first thinking, the viewport meta tag, media queries (`@media (min-width: 768px)`), fluid units (`%`, `vw`, `vh`, `rem`, `clamp()`), responsive images with `srcset` briefly, testing in DevTools.
  - Refs: web.dev "Learn Responsive Design"; MDN "Responsive design".
  - Israf (no waste) callout fits when discussing performance and image sizes.
  - Project: take the contact-form site from chapter 2 and make it look great on a phone, tablet, and desktop.

### Chapter 4: Tailwind CSS and Figma (4 lessons)

Tailwind plus the design-to-code workflow. This chapter also covers the practical side: how do you actually start from a Figma file a client sent you.

- **4.1 Tailwind utility-first**: what utility-first means; CDN setup for learning, then the Vite + Tailwind 4 setup for real projects; common utilities (`flex`, `grid`, `p-4`, `text-lg`, `bg-teal-500`, `rounded-xl`); responsive prefixes (`sm:`, `md:`, `lg:`); dark mode prefix briefly.
  - Refs: Tailwind docs "Installation" + "Utility-first fundamentals"; Tailwind Play.
  - Taharah (cleanliness) callout fits when discussing organising long class strings with `clsx` / line-wrapping.
  - SVG: visual cheat sheet of the most common 20 Tailwind utilities grouped by purpose.

- **4.2 Building real components with Tailwind**: a card, a button system, a navbar with a mobile hamburger (no JS yet, CSS-only with `<details>`), a hero section. Reusing classes with `@apply` briefly. Tailwind config customization (extending the theme with brand colors).
  - Refs: Tailwind UI free patterns; shadcn/ui browse-only.
  - Hands-on: rebuild the chapter 2 contact form using Tailwind.

- **4.3 Reading Figma like a developer**: sign up to Figma; the Figma interface tour; using Inspect mode (Dev Mode) to get colors, font sizes, spacing, dimensions; exporting assets as SVG/PNG; copying CSS straight from Figma and converting it to Tailwind in your head.
  - Refs: Figma "Inspect" docs; Figma for Developers free YouTube playlist.
  - Screenshots: Figma Inspect panel showing a button's properties; Figma export dialog.

- **4.4 Translating a Figma design into a working website (the real workflow)**: this lesson is the bridge from "I know Tailwind classes" to "I can build what a client asked for". Walk through a complete worked example: a fictional Alkhidmat donation landing page. Talk about types of websites and what each type asks for: charity landing pages (donation flow, trust signals), ecommerce (product cards, cart, admin panel later), SaaS (hero, features, pricing, testimonial), restaurant (menu, hours, location), real-estate (search filters, listing cards), portfolio (project showcase, contact). Discuss what to ask a client before you start. Show how to break a Figma file into HTML structure, then style.
  - Refs: real Pakistani sites as examples (Daraz, FoodPanda, AlKhidmat, Cheetay, Bykea).
  - Ukhuwwah (unity) callout fits when discussing client communication.
  - Hands-on: build a one-page donation landing in HTML + Tailwind, from a Figma file we provide.
  - SVG: a "from Figma to HTML" workflow diagram showing 4 steps.

### Chapter 5: Git and GitHub (4 lessons)

- **5.1 What is version control?**: why git exists; the three states (working dir, staging, committed); `git init`, `git status`, `git add`, `git commit -m`, `git log`; `.gitignore`.
  - Refs: Pro Git book chapter 1 and 2 (free); GitHub Git Handbook.
  - SVG: the three-state diagram.
  - Amanah (trust) callout fits when discussing never committing secrets.

- **5.2 GitHub**: what GitHub is and how it differs from Git; create a repo via the GitHub web UI; `git remote add origin`, `git push -u origin main`, `git clone`, `git pull`; README files in Markdown; the GitHub web interface tour.
  - Refs: GitHub Docs "Hello World"; GitHub Skills "Introduction to GitHub".
  - Hands-on: push the donation site from chapter 4 to GitHub.

- **5.3 Branches and merging**: why branches; `git branch`, `git checkout -b`, `git switch`, `git merge`; the typical feature-branch workflow; merge conflicts (what they are, how to resolve, calmly).
  - Refs: Atlassian "Git branching tutorial"; Pro Git chapter 3.
  - SVG: a simple branch-and-merge diagram with two branches and a merge commit.

- **5.4 Pull requests, GitHub Pages, collaboration etiquette**: what a pull request is and the typical review flow; deploying any static HTML site to GitHub Pages for free; collaborating without breaking each other's work; commit message conventions.
  - Refs: GitHub Docs "Creating a pull request"; GitHub Pages docs.
  - Sidq (honesty) callout fits when discussing commit messages and what they say about you.

### Chapter 6: JavaScript fundamentals (4 lessons)

This is where Pakistani students traditionally get stuck. Pace slow, examples concrete.

- **6.1 Variables, types, and operators**: `let`, `const`, `var` (why we avoid var); primitive types (string, number, boolean, null, undefined, bigint, symbol); template literals; arithmetic, comparison, logical, assignment operators; `==` vs `===` (always use ===); typeof.
  - Refs: javascript.info chapter 2 "Fundamentals"; MDN "JavaScript first steps".
  - Real-world example: build a tip calculator that runs in the browser console.

- **6.2 Conditionals and loops**: `if`/`else if`/`else`, `switch`, ternary operator, truthy/falsy values; `for`, `while`, `do...while`, `for...of`, `for...in`; `break` and `continue`.
  - Refs: javascript.info "Logical operators", "Loops"; MDN "Making decisions in your code".
  - Real-world example: a small grading system that takes a score 0-100 and returns A/B/C/D/F.
  - Sabr (patience in debugging) callout fits here.

- **6.3 Functions**: function declarations, function expressions, arrow functions; parameters and arguments; default parameters; return values; scope (global, function, block); closures briefly; hoisting briefly.
  - Refs: javascript.info "Functions", "Function expressions", "Arrow functions"; MDN "Functions".
  - Real-world example: build a small library of pure utility functions (`add`, `multiply`, `formatRupees`, `slugify`).
  - Wafa (keeping promises) callout fits when discussing `return`.

- **6.4 Higher-order functions and error handling**: functions that take or return functions; introduction to callbacks; `try / catch / finally`; throwing errors; intro to async via `setTimeout` and a tiny `setInterval` example (no Promises yet, that comes in Tier 2).
  - Refs: javascript.info "Error handling, try...catch".
  - Real-world example: a small "retry up to 3 times" wrapper around a function.

### Chapter 7: JavaScript in depth (4 lessons)

- **7.1 Arrays, objects, and modern array methods**: array creation and indexing; `push`, `pop`, `shift`, `unshift`, `splice`, `slice`; `map`, `filter`, `find`, `findIndex`, `some`, `every`, `reduce`, `forEach`, `includes`, `sort`; objects (key-value), dot vs bracket notation, `Object.keys`, `Object.values`, `Object.entries`.
  - Refs: javascript.info "Arrays", "Array methods", "Objects"; MDN "Array".
  - Ilm (knowledge) callout fits when discussing how data structures are tools for thinking.
  - Real-world example: take an array of 10 product objects and use `map`, `filter`, `reduce` to compute total cart price.

- **7.2 ES2015+ essentials**: destructuring, spread/rest, template literals, optional chaining (`?.`), nullish coalescing (`??`), modules (`import` / `export`), `const` immutability vs mutability of contents.
  - Refs: javascript.info "Destructuring assignment", "Modules"; MDN "Modules".
  - Real-world example: refactor the chapter 7.1 cart code using destructuring and the spread operator.

- **7.3 The DOM**: what the DOM is; `document.getElementById`, `querySelector`, `querySelectorAll`; `textContent` vs `innerHTML` vs `innerText` (and why innerHTML is risky); `classList.add/remove/toggle`; `element.style`; creating and removing elements (`createElement`, `appendChild`, `remove`).
  - Refs: MDN "Introduction to the DOM"; javascript.info "Document".
  - SVG: the DOM tree diagram for a simple page.
  - Husn al-Khuluq (good manners in UI) callout fits when discussing how a clear, accessible UI is good manners toward your users.
  - Real-world example: an interactive todo list with add and delete (no React yet).

- **7.4 Events and forms**: `addEventListener` and the event object; common events (`click`, `submit`, `input`, `change`, `keydown`); event delegation briefly; reading form values; `event.preventDefault()`; basic client-side form validation.
  - Refs: MDN "Introduction to events"; javascript.info "Browser events".
  - Real-world example: take the contact form from chapter 2.3, validate it with JavaScript, show inline error messages.
  - Su' al-Dhan (validate inputs) callout fits here.

### Chapter 8: Deploy your first site (4 lessons)

This chapter ships BEFORE React, so students have the satisfaction of a live URL using only HTML / CSS / Tailwind / vanilla JS. Vercel and InfinityFree are covered deeply because they cover both the modern-pro and budget-shared-host extremes.

- **8.1 What deployment really means**: what a static site is; what a server actually does for you when you "deploy"; the URL, the DNS, the build, the cache; HTTPS for free; the 5 main hosting choices we'll discuss (Vercel, Netlify, GitHub Pages, Hostinger, InfinityFree) and when each makes sense.
  - Refs: web.dev "How browsers work"; Cloudflare "What is hosting".
  - SVG: a "your code → git push → host builds → live URL" pipeline diagram.

- **8.2 Vercel, the modern way (deep dive)**: create a Vercel account; connect your GitHub repo; understand the build settings (output directory, framework preset); custom subdomains; environment variables briefly; preview deployments per branch; the Vercel CLI for local testing.
  - Refs: Vercel docs "Deploying" + "Vercel CLI".
  - Screenshots: Vercel dashboard new-project flow; deployed site URL; build log.
  - Hands-on: deploy the chapter 4 donation site to Vercel.

- **8.3 InfinityFree and the traditional cPanel world (deep dive)**: why this matters in Pakistan (many local clients still pay for shared hosting from companies like Hostinger and need cPanel deploy); create an InfinityFree account; create a hosting account; access cPanel; use the File Manager to upload your site as a zip; install Free SSL; understand the basics of cPanel that a freelancer will need.
  - Refs: InfinityFree quick start docs; Hostinger cPanel tutorials.
  - Screenshots: InfinityFree dashboard; cPanel main page; File Manager with the public_html folder; SSL/TLS section.
  - Discuss: why a freelance Pakistani frontend developer will run into cPanel constantly.

- **8.4 Netlify, GitHub Pages, Hostinger (the brief tour) and choosing your host**: Netlify in 1 page; GitHub Pages in 1 page; Hostinger in 1 page; a decision flowchart for "which host should I use for this project?"; setting up a custom domain (.com from Namecheap with a Vercel project as the worked example).
  - SVG: the host-choice decision flowchart.

### Chapter 9: React foundations (4 lessons)

- **9.1 Why React, Vite setup, and JSX**: what React is and why it exists; create a project with `npm create vite@latest`, choose React + JavaScript; the project structure tour; what JSX is and the rules (`className` not `class`, one root element, `{}` for JS expressions); your first component.
  - Refs: react.dev "Quick Start"; Vite docs "Getting Started".
  - Screenshots: Vite scaffold output in terminal; the boilerplate App.jsx open in VS Code; the dev server in the browser.
  - Nizam (modular order) callout fits when discussing component-based architecture.

- **9.2 Components and props**: function components; props as the data you pass in; destructuring props in the parameter; rendering lists with `map` and the `key` prop; composing components (a `<Card>` that contains a `<Button>`); the importance of pure components.
  - Refs: react.dev "Your First Component", "Passing Props to a Component", "Rendering Lists".
  - Real-world example: a `<ProductCard>` component reused with 6 different product objects from an array.

- **9.3 State and events**: what state is and how it's different from props; `useState`; the rules of hooks (top level only); updating state correctly (functional updater for derived state); handling events in React (`onClick`, `onChange`, `onSubmit`); a controlled input.
  - Refs: react.dev "State: A Component's Memory", "Responding to Events".
  - Real-world example: a counter with `+`, `-`, `reset`, and a clamp so it can't go below zero.
  - Tafakkur (reflection) callout fits when discussing managing state thoughtfully.

- **9.4 Conditional rendering and lifting state up**: `if` and ternary in JSX; the `&&` short-circuit pattern (and its `0` gotcha); when to lift state up; passing setter functions down as props; "the data flows down, the events flow up".
  - Refs: react.dev "Conditional Rendering", "Sharing State Between Components".
  - Real-world example: a small "shopping cart" UI where the cart total in the header updates when items are added from product cards.

### Chapter 10: React in practice (4 lessons)

- **10.1 useEffect and the lifecycle in one hook**: what side effects are; `useEffect(fn, deps)`; the empty dependency array (`[]`), the dep-included array, the no-array form; the cleanup function; common bugs (forgetting deps, infinite loops); when you genuinely need useEffect vs when you don't.
  - Refs: react.dev "Synchronizing with Effects", "You Might Not Need an Effect".
  - SVG: a small "render → effect → cleanup → re-render" timeline diagram.

- **10.2 Fetching data and handling loading/error states**: `fetch` inside `useEffect`; loading / error / data state pattern; the AbortController for cleanup; building a `useFetch` custom hook as a first taste of custom hooks.
  - Refs: MDN "Using the Fetch API"; react.dev "Fetching data".
  - Real-world example: pull and display 20 products from a public API (DummyJSON or FakeStore).

- **10.3 Forms in React (controlled and uncontrolled)**: controlled inputs revisited with multiple fields; the `useState` object pattern; validating on submit; resetting after submit; uncontrolled inputs with `ref`.
  - Refs: react.dev "Manipulating the DOM with Refs".
  - Real-world example: a full multi-field signup form with inline validation.

- **10.4 Project: the Alkhidmat donation mini-app**: students build a small one-page React app: a header, three donation-amount cards, a custom-amount input, a name+email form, a confirmation screen on submit (no backend, just state). Uses everything from Chapters 9 and 10.
  - Ahd (commitments) callout fits when discussing finishing this project before moving on.

### Chapter 11: Animation: GSAP and smooth scroll (4 lessons)

- **11.1 GSAP basics**: what GSAP is and why we use it over CSS animations for complex work; `gsap.to`, `gsap.from`, `gsap.fromTo`; eases (`power2.out`, `back.out(1.7)`); the `duration`, `delay`, `stagger` properties; timelines.
  - Refs: GSAP "Getting Started"; GSAP docs "Timeline".
  - Real-world example: animate a hero section (heading slides in, paragraph fades in, button scales up) on page load.

- **11.2 ScrollTrigger**: what scroll-driven animation is; basic ScrollTrigger setup; `start`, `end`, `scrub`, `pin`, `toggleActions`; staggering elements as the user scrolls; common scroll patterns (fade-in on scroll, parallax, pinning a section).
  - Refs: GSAP ScrollTrigger docs; ihatetomatoes "ScrollTrigger tutorial".
  - SVG: a diagram showing what `start` and `end` mean in the viewport.

- **11.3 GSAP inside React**: the `useGSAP` hook; cleaning up animations on unmount; using refs to target elements; animating React state changes; the common pitfalls (StrictMode double-render).
  - Refs: GSAP "React docs"; the official `@gsap/react` package.

- **11.4 Smooth scroll with Lenis and Locomotive**: why smooth scroll exists and the accessibility concerns; setting up Lenis (the modern lightweight choice); a quick note on Locomotive Scroll (the older, heavier alternative still common in agency work); integrating Lenis with GSAP ScrollTrigger; respecting `prefers-reduced-motion`.
  - Refs: Studio Freight Lenis GitHub README; Locomotive Scroll docs.
  - Wasatiyyah (moderation) callout fits here, when discussing animation restraint and accessibility.

### Chapter 12: The ecommerce capstone (4 lessons)

This is the big one. Students build a full ecommerce store using React + Tailwind + GSAP, modeled on the previous session's `BQ-Store-FED` project (https://github.com/mohamad-omarsajid/BQ-Store-FED). Each lesson is one phase of the project.

- **12.1 Planning and scaffolding**: what we're building (a 5-page ecommerce store: home, shop, product detail, cart, checkout); reading the Figma file we provide; setting up the Vite + React + Tailwind project; folder structure for a real app (`/components`, `/pages`, `/data`, `/hooks`, `/lib`); routing setup with React Router DOM (light introduction, full coverage in Ch 13); the product data model.
  - Refs: the BQ-Store-FED repo.
  - Hands-on: full project scaffold done by end of lesson.

- **12.2 Building the home and shop pages**: the home page (hero, featured collections, testimonial, footer); the shop page (filter by category, sort by price, search by name); reusable `<ProductCard>` and `<Filter>` components; mobile responsive grid with Tailwind.
  - SVG: a wireframe of the home and shop pages side by side.

- **12.3 Product detail, cart, and checkout**: product detail page with size/color selection; the cart context (`useContext` introduced lightly); add to cart / remove / update quantity; the checkout form (name, address, payment placeholder); cart persistence with `localStorage`.
  - Refs: react.dev "Passing Data Deeply with Context".

- **12.4 Polish, animate, deploy, and write a great README**: GSAP page transitions; ScrollTrigger reveals on product cards; performance pass (Lighthouse audit); accessibility pass (alt text, keyboard nav, focus states); deploy to Vercel; write a portfolio-grade README that wins junior-dev interviews; record a 60-second Loom demo.
  - Shukr (gratitude) callout fits naturally at the end.
  - End-of-lesson: every student now has a real, shippable, portfolio-worthy project URL.

### Chapter 13: Modern React patterns (4 lessons)

Tier 2 begins quietly here, no fanfare in the UI.

- **13.1 useRef, useMemo, useCallback**: useRef for DOM refs and for mutable values; useMemo for expensive computations; useCallback for stable function references; when these actually matter (and when they don't, the common over-use trap).
  - Refs: react.dev "Referencing Values with Refs", "useMemo", "useCallback".

- **13.2 Custom hooks**: extracting logic into reusable hooks; `useLocalStorage`, `useDebounce`, `useMediaQuery` as worked examples; the "rules of hooks" applied; naming conventions.
  - Refs: react.dev "Reusing Logic with Custom Hooks"; usehooks.com.

- **13.3 Context API in depth**: when to reach for Context vs lifting state vs an external state library; creating a provider; the performance gotcha (re-renders); a worked example refactoring the ecommerce cart from Chapter 12 to use proper Context.
  - Refs: react.dev "Scaling Up with Reducer and Context".

- **13.4 React Router**: multi-page apps in React; `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`; dynamic routes with params (`/product/:id`); nested routes and layouts; programmatic navigation with `useNavigate`; route loaders briefly.
  - Refs: React Router v6 docs (or current version).

### Chapter 14: Next.js (4 lessons)

- **14.1 Why Next.js, App Router setup**: what a meta-framework is; why Next.js (SEO, performance, server-side capability); `npx create-next-app@latest`; the App Router folder convention; pages, layouts, loading.tsx, error.tsx; static vs dynamic rendering at a glance.
  - Refs: nextjs.org "Get Started".

- **14.2 Server components vs client components**: the mental model (default is server, opt into client with `"use client"`); when to use which; passing data from server to client; common mistakes.
  - Refs: nextjs.org "Server and Client Components".
  - SVG: a tree diagram showing a page with mixed server/client components.

- **14.3 Data fetching, server actions, and the new way**: fetching data in server components (just `await fetch()`); server actions for forms; basic caching and revalidation; the `loading.tsx` and Suspense.
  - Refs: nextjs.org "Data Fetching", "Server Actions".

- **14.4 Deploying to Vercel, SEO, image optimization**: connecting a Next.js repo to Vercel (one click); the built-in `<Image>` component and why it matters; metadata API for SEO; sitemap and robots.txt; environment variables for production.
  - Refs: nextjs.org "Image Optimization", "Metadata".

### Chapter 15: More animation: Framer, Anime, beyond (4 lessons)

- **15.1 Framer Motion: the React-native animation library**: `motion.div`, `initial`/`animate`/`exit`, `transition`, `whileHover`, `whileTap`; AnimatePresence for mount/unmount; layout animations.
  - Refs: framer.com/motion docs.

- **15.2 Anime.js: small, declarative, fun**: when to reach for anime.js over GSAP; basic timeline; SVG path animations; staggered animations; comparison with GSAP feature-by-feature.
  - Refs: animejs.com docs.

- **15.3 Lenis deep, plus the smooth-scroll family**: Lenis options in detail; integrating Lenis with Framer Motion and Next.js App Router; common pitfalls (sticky elements, anchor links, hash navigation); a brief survey of other options (Locomotive Scroll v5, Studio Freight Hamo).
  - Refs: Lenis GitHub; Studio Freight blog posts.

- **15.4 Choosing the right tool, and not over-animating**: a real "when to use what" guide; the performance cost of animations; the `prefers-reduced-motion` discipline; common animation anti-patterns from agency portfolio sites; a worked example combining 2 libraries cleanly.
  - Wasatiyyah callout fits here again, longer treatment.

### Chapter 16: 3D on the web with Three.js (4 lessons)

- **16.1 Scene, camera, renderer (your first rotating cube)**: what WebGL is at a high level; setting up a basic Three.js scene; PerspectiveCamera vs OrthographicCamera; the render loop with `requestAnimationFrame`; OrbitControls.
  - Refs: discoverthreejs.com chapters 1-3; three.js manual.
  - SVG: scene/camera/renderer diagram.

- **16.2 Geometry, materials, lighting, textures**: BoxGeometry, SphereGeometry, PlaneGeometry; MeshBasicMaterial vs MeshStandardMaterial; AmbientLight, DirectionalLight, PointLight; basic texture mapping; the difference between PBR and basic materials.
  - Refs: three.js manual.

- **16.3 Loading models and animations**: the GLTF format; GLTFLoader; using DRACO compression briefly; positioning, scaling, rotating models; playing model animations; performance considerations.
  - Refs: three.js manual "Loading 3D Models".

- **16.4 React Three Fiber and Drei**: the "Three.js for React" mental model; the `<Canvas>` component; declarative 3D; common helpers from `@react-three/drei`; combining R3F with GSAP and Framer Motion.
  - Refs: docs.pmnd.rs (R3F docs).
  - End-of-lesson hands-on: build a 3D product viewer for one product card in the ecommerce capstone.

### Chapter 17: TypeScript and component libraries (4 lessons)

- **17.1 TypeScript for React (gentle)**: why TS; basic types; typing props with `interface` or `type`; the `useState<T>` pattern; typing event handlers; `any` and why we avoid it; gradual migration from a JS to TS project.
  - Refs: react.dev "Using TypeScript"; TypeScript handbook (relevant chapters).

- **17.2 shadcn/ui, Radix, Headless UI**: what these are and why they're different from Tailwind UI or MUI; installing shadcn/ui into a Next.js project; copying components into your codebase; theming with CSS variables; building a polished form using shadcn primitives.
  - Refs: ui.shadcn.com docs.

- **17.3 Testing basics with Vitest and React Testing Library**: why test (briefly); setting up Vitest in a Vite or Next.js project; writing a unit test for a function; writing a component test that simulates a click; what NOT to test.
  - Refs: vitest.dev; testing-library.com.

- **17.4 The complete project setup**: what a 2026 production frontend project looks like top to bottom (Next.js + TS + Tailwind + shadcn + Zustand + TanStack Query + ESLint + Prettier + Vitest + Vercel); the `package.json` walkthrough; commit hooks; the CI/CD basics.

### Chapter 18: State, data, and going to production (4 lessons)

- **18.1 Zustand for state management**: why a state library; Zustand vs Redux Toolkit vs Jotai vs Context; setting up a Zustand store; selectors; persistence middleware; refactoring the ecommerce cart from Chapters 12/13 to Zustand.
  - Refs: zustand-demo.pmnd.rs docs.

- **18.2 TanStack Query for server state**: the difference between UI state and server state; queries and mutations; caching and revalidation; pagination and infinite scroll briefly; integrating with Next.js.
  - Refs: tanstack.com/query docs.

- **18.3 Performance: Lighthouse, Core Web Vitals, image strategy**: running Lighthouse; LCP, INP, CLS explained; image sizing and `next/image` revisited; font loading strategy; code splitting basics; bundle analysis.
  - Refs: web.dev "Vitals"; Vercel "Speed Insights".
  - Hands-on: run Lighthouse on the ecommerce capstone and fix the top 3 issues.

- **18.4 Production hygiene**: environment variables done right; error monitoring with Sentry (free tier); analytics with Plausible or Vercel Analytics; basic SEO checklist; an accessibility checklist; the "ready to launch" checklist.

### Chapter 19: Career and portfolio capstone (4 lessons)

- **19.1 Planning a portfolio site that gets you hired**: what a strong junior portfolio looks like in 2026; the 5 sections (hero, about, projects, contact, footer); writing about yourself without sounding like a CV; choosing 3 projects to feature and why; the role of "process writeups" alongside live URLs.
  - Refs: example portfolios from Pakistani devs (curated list to be added).

- **19.2 Build your portfolio: Next.js + everything you know**: students build their personal portfolio in Next.js + Tailwind + Framer Motion or GSAP + optionally one R3F touch. Each section walked through with patterns and pitfalls. MDX for project case studies. Contact form with a real email service (Resend free tier).
  - Talab al-Ilm (continuous learning) callout fits in the "About" section discussion.

- **19.3 Polish, performance, and the README that wins interviews**: every project repo's README should answer: what is it, why did you build it, what's the stack, what's the live URL, what's hard about it. Walking through one perfect example. Recording a 60-second Loom demo per project. Pinning projects on GitHub.

- **19.4 First clients, freelancing in Pakistan, the halal income journey**: local clients (mosques, charities, small shops); international (Upwork, Fiverr, LinkedIn DMs); pricing in PKR vs USD; contracts and invoicing basics; the trainer's own story of first client; staying on the halal path with client work (no haram industries, no deceptive sites); Pakistani-friendly payment rails (Payoneer, Wise, bank wire); continuous learning resources for after this course.
  - Shukr callout: gratitude and the responsibility of skill.

---

## 10. Master glossary planning

`frontend-book/docs/glossary.md` is a single A-Z file. Every technical term that appears in any lesson tooltip is also defined here in long form.

As lessons are written, append entries to glossary.md in the same commit. Format:

```markdown
## D

### DOM (Document Object Model)
The tree-like representation of an HTML page that JavaScript can read and change.
First introduced in lesson 7.3.

**اردو:** ڈی او ایم وہ درخت ہے جو ایچ ٹی ایم ایل صفحے کو ظاہر کرتا ہے، جسے جاوا اسکرپٹ پڑھ اور بدل سکتی ہے۔
```

The glossary is task **F-06** (initial skeleton with A-Z headings) and is then continuously appended throughout content production.

---

## 11. Task list

Tasks are grouped into Foundation (F-NN), Lesson (L-CC-LL), and Chapter-level (C-CC).

Mark `[x]` and append the completion date inside the line when done, like:
`- [x] F-01: Reorganize folder structure (2026-05-28)`

### 11.1 Foundation tasks (do these first, in order)

- [x] F-01: Reorganize `frontend-book/docs/` folder structure to the 19-chapter layout per section 4.1. Move approved lesson 0.1 to `chapter-00-getting-ready/0-1-computer-and-internet.md`. Move existing draft lessons 0.2 / 0.3 / 0.4 to the same folder with the same filenames. Move existing old chapters 1-6 from the OLD plan into `frontend-book/_archive/` (do not delete). Create empty folders for chapters 01 through 19 with the naming convention from section 4.2. Each chapter folder must contain a stub `index.md` with just the H1 and one sentence. (2026-05-25)
- [x] F-02: Replace `frontend-book/mkdocs.yml` with the GitBook-style configuration in section 8. Leave the `nav:` block populated only for Chapter 0 and the Glossary for now (F-04 will fill in the rest as chapters get written). [reconciled: kept the user's black-and-white GitBook theme instead of the section-8 teal/tabs config; nav points to chapter-00; added def_list/tables/tasklist extensions] (2026-05-25)
- [x] F-03: Create `frontend-book/STYLE_GUIDE.md` containing section 5 of this plan verbatim. This is the canonical style reference contributors will read. (2026-05-25)
- [x] F-04: Set up the empty inventory files `frontend-book/SCREENSHOTS_NEEDED.md` and `frontend-book/IMAGES_NEEDED.md` with a brief header explaining their purpose (see section 6). (2026-05-25)
- [x] F-05: Create `frontend-book/docs/stylesheets/brand.css` mapping Material's CSS variables to the brand tokens in section 2. Include the dotted-underline style for `abbr` elements, the bilingual-gloss style for inline Urdu, and a slightly tighter typographic scale to feel GitBook-like. [added abbr dotted-underline + Urdu gloss styles to the existing B/W brand.css] (2026-05-25)
- [x] F-06: Create `frontend-book/docs/glossary.md` with A-Z section headings (## A, ## B, etc.) and an empty body under each. As lessons are written, glossary entries get appended. (2026-05-25)
- [x] F-07: Create `frontend-book/docs/overrides/main.html` as an empty template-override file (will be populated later for the Mark Complete button; for now just an empty Jinja extends). (2026-05-25)
- [x] F-08: Write `frontend-book/docs/index.md` (the course home page) using the lesson template structure adapted for an intro page: friendly hello, what this book is, how to use it, what you'll know by the end, a "start here" link to lesson 0.1, a note about marking lessons complete, a note about the in-person Bano Qabil class. (2026-05-25)
- [x] F-09: Audit lesson 0.1 (`chapter-00-getting-ready/0-1-computer-and-internet.md`) one last time against the style guide. Convert any remaining ASCII art diagram to inline SVG. Verify zero em-dashes, zero en-dashes. Add the SVG-version of the browser→DNS→server diagram. [added a B/W browser->DNS->server inline SVG (currentColor, adapts to dark mode); 0 em/en dashes in all docs; no ASCII art remained] (2026-05-25)
- [x] F-10: Audit and rewrite existing drafts 0.2 / 0.3 / 0.4 against the new style guide (the originals were drafts from earlier). Use lesson 0.1 as the tone reference. Each rewrite is a separate commit. [rewrote 0.2/0.3/0.4 to the section-7 template + style guide; Roman Urdu tooltips, one Nastaliq box in 0.3, good/bad-prompt SVG, screenshot placeholders logged, glossary terms appended] (2026-05-25)

### 11.2 Chapter and lesson tasks

Per chapter: write the chapter `index.md`, then the four lessons in order, then update the mkdocs.yml `nav:` block to include the new lessons.

Per lesson: write the lesson .md file following the template, with inline SVG diagrams where called for, screenshot placeholders where called for, glossary tooltips at the bottom, and append any new glossary terms to `docs/glossary.md`.

Each lesson is one task. Estimated effort: 1 to 3 hours per lesson depending on complexity.

#### Chapter 0 (mostly done)

- [x] C-00: Write `chapter-00-getting-ready/index.md` introducing the chapter, listing its 4 lessons with one-line summaries. (2026-05-25)
- [x] L-00-01: `0-1-computer-and-internet.md` (existing, audit in F-09)
- [x] L-00-02: `0-2-word-excel-google.md` (rewrite from existing draft per F-10) (2026-05-25)
- [x] L-00-03: `0-3-using-ai-to-learn.md` (rewrite from existing draft per F-10) (2026-05-25)
- [x] L-00-04: `0-4-learning-to-learn.md` (rewrite from existing draft per F-10) (2026-05-25)

#### Chapter 1

- [x] C-01: Write chapter 1 index page. (2026-05-25)
- [x] L-01-01: `1-1-what-is-frontend.md` (types of websites tour, halal-web framing, Niyyah callout) (2026-05-25)
- [x] L-01-02: `1-2-install-everything.md` (WSL2 primary, Windows-native fallback, heavy screenshot inventory) (2026-05-25)
- [x] L-01-03: `1-3-the-terminal.md` (2026-05-25)
- [x] L-01-04: `1-4-devtools.md` (2026-05-25)

#### Chapter 2

- [x] C-02: Write chapter 2 index page. (2026-05-25)
- [x] L-02-01: `2-1-first-html-tags.md` (with HTML document tree SVG) (2026-05-25)
- [x] L-02-02: `2-2-text-lists-links-images.md` (2026-05-25)
- [x] L-02-03: `2-3-forms-and-inputs.md` (2026-05-25)
- [x] L-02-04: `2-4-semantic-and-accessibility.md` (with semantic-vs-div-soup SVG, Sitr callout) (2026-05-25)

#### Chapter 3

- [x] C-03: Write chapter 3 index page. (2026-05-25)
- [x] L-03-01: `3-1-selectors-box-model.md` (with box model SVG, link to CSS Diner) (2026-05-25)
- [x] L-03-02: `3-2-flexbox.md` (with flex axes SVG, link to Flexbox Froggy) (2026-05-25)
- [x] L-03-03: `3-3-css-grid.md` (with grid track SVG, link to Grid Garden) (2026-05-25)
- [x] L-03-04: `3-4-responsive-design.md` (Israf callout, responsive project at end) (2026-05-25)

#### Chapter 4

- [x] C-04: Write chapter 4 index page. (2026-05-25)
- [x] L-04-01: `4-1-tailwind-utility-first.md` (with utilities cheatsheet SVG, Taharah callout) (2026-05-25)
- [x] L-04-02: `4-2-building-real-components.md` (2026-05-25)
- [x] L-04-03: `4-3-reading-figma.md` (Figma screenshot inventory) (2026-05-25)
- [x] L-04-04: `4-4-figma-to-website-workflow.md` (Ukhuwwah callout, with Figma-to-HTML SVG workflow diagram, donation landing hands-on) (2026-05-25)

#### Chapter 5

- [x] C-05: Write chapter 5 index page. (2026-05-25)
- [x] L-05-01: `5-1-version-control.md` (with three-state SVG, Amanah callout) (2026-05-25)
- [x] L-05-02: `5-2-github.md` (2026-05-25)
- [x] L-05-03: `5-3-branches-and-merging.md` (with branch-and-merge SVG) (2026-05-25)
- [x] L-05-04: `5-4-pull-requests-pages-etiquette.md` (Sidq callout in commit-message section) (2026-05-25)

#### Chapter 6

- [x] C-06: Write chapter 6 index page. (2026-05-25)
- [x] L-06-01: `6-1-variables-types-operators.md` (tip calculator example) (2026-05-25)
- [x] L-06-02: `6-2-conditionals-and-loops.md` (grading system example, Sabr callout) (2026-05-25)
- [x] L-06-03: `6-3-functions.md` (utility library example, Wafa callout) (2026-05-25)
- [x] L-06-04: `6-4-higher-order-and-errors.md` (retry wrapper example) (2026-05-25)

#### Chapter 7

- [x] C-07: Write chapter 7 index page. (2026-05-25)
- [x] L-07-01: `7-1-arrays-objects-methods.md` (cart math example, Ilm callout) (2026-05-25)
- [x] L-07-02: `7-2-es2015-essentials.md` (refactor with destructuring + spread) (2026-05-25)
- [x] L-07-03: `7-3-the-dom.md` (DOM tree SVG, todo list example, Husn al-Khuluq callout) (2026-05-25)
- [x] L-07-04: `7-4-events-and-forms.md` (validated contact form example, Su' al-Dhan callout) (2026-05-25)

#### Chapter 8

- [x] C-08: Write chapter 8 index page. (2026-05-25)
- [x] L-08-01: `8-1-what-deployment-means.md` (with pipeline SVG) (2026-05-25)
- [x] L-08-02: `8-2-vercel-deep.md` (Vercel dashboard screenshot inventory) (2026-05-25)
- [x] L-08-03: `8-3-infinityfree-and-cpanel.md` (cPanel + File Manager + SSL screenshot inventory) (2026-05-25)
- [x] L-08-04: `8-4-netlify-pages-hostinger-and-choosing.md` (with host-choice decision flowchart SVG, custom domain walkthrough) (2026-05-25)

#### Chapter 9

- [x] C-09: Write chapter 9 index page. (2026-05-25)
- [x] L-09-01: `9-1-why-react-vite-jsx.md` (Vite scaffold screenshot inventory, Nizam callout) (2026-05-25)
- [x] L-09-02: `9-2-components-and-props.md` (ProductCard reuse example) (2026-05-25)
- [x] L-09-03: `9-3-state-and-events.md` (clamped counter example, Tafakkur callout) (2026-05-25)
- [x] L-09-04: `9-4-conditional-rendering-lifting-state.md` (cart header sync example) (2026-05-25)

#### Chapter 10

- [x] C-10: Write chapter 10 index page. (2026-05-25)
- [x] L-10-01: `10-1-useeffect.md` (with render-effect-cleanup timeline SVG) (2026-05-25)
- [x] L-10-02: `10-2-fetching-data.md` (DummyJSON product list example) (2026-05-25)
- [x] L-10-03: `10-3-forms-in-react.md` (multi-field validated signup example) (2026-05-25)
- [x] L-10-04: `10-4-alkhidmat-donation-app.md` (full mini-project, Ahd callout) (2026-05-25)

#### Chapter 11

- [x] C-11: Write chapter 11 index page. (2026-05-25)
- [x] L-11-01: `11-1-gsap-basics.md` (hero animation example) (2026-05-25)
- [x] L-11-02: `11-2-scrolltrigger.md` (with start/end viewport SVG) (2026-05-25)
- [x] L-11-03: `11-3-gsap-in-react.md` (2026-05-25)
- [x] L-11-04: `11-4-lenis-and-locomotive.md` (Wasatiyyah callout, prefers-reduced-motion discipline) (2026-05-25)

#### Chapter 12: Ecommerce capstone

- [x] C-12: Write chapter 12 index page. Include a link to the reference BQ-Store-FED repo and a clear "what you'll have built by the end" framing. (2026-05-25)
- [x] L-12-01: `12-1-planning-and-scaffolding.md` (2026-05-25)
- [x] L-12-02: `12-2-home-and-shop.md` (with wireframe SVG) (2026-05-25)
- [x] L-12-03: `12-3-detail-cart-checkout.md` (2026-05-25)
- [x] L-12-04: `12-4-polish-deploy-readme.md` (Shukr callout, Lighthouse/a11y pass, deployment to Vercel, README template) (2026-05-25)

#### Chapter 13

- [x] C-13: Write chapter 13 index page. (2026-05-25)
- [x] L-13-01: `13-1-useref-usememo-usecallback.md` (2026-05-25)
- [x] L-13-02: `13-2-custom-hooks.md` (2026-05-25)
- [x] L-13-03: `13-3-context-in-depth.md` (refactor of ch 12 cart) (2026-05-25)
- [x] L-13-04: `13-4-react-router.md` (2026-05-25)

#### Chapter 14: Next.js

- [x] C-14: Write chapter 14 index page. (2026-05-25)
- [x] L-14-01: `14-1-why-nextjs-app-router.md` (2026-05-25)
- [x] L-14-02: `14-2-server-vs-client-components.md` (with component tree SVG) (2026-05-25)
- [x] L-14-03: `14-3-data-fetching-server-actions.md` (2026-05-25)
- [x] L-14-04: `14-4-deploy-seo-images.md` (2026-05-25)

#### Chapter 15

- [x] C-15: Write chapter 15 index page. (2026-05-25)
- [x] L-15-01: `15-1-framer-motion.md` (2026-05-25)
- [x] L-15-02: `15-2-anime-js.md` (2026-05-25)
- [x] L-15-03: `15-3-lenis-deep.md` (2026-05-25)
- [x] L-15-04: `15-4-choosing-the-right-tool.md` (longer Wasatiyyah treatment) (2026-05-25)

#### Chapter 16: Three.js

- [x] C-16: Write chapter 16 index page. (2026-05-25)
- [x] L-16-01: `16-1-scene-camera-renderer.md` (with scene/camera/renderer SVG) (2026-05-25)
- [x] L-16-02: `16-2-geometry-materials-lighting.md` (2026-05-25)
- [x] L-16-03: `16-3-loading-models.md` (2026-05-25)
- [x] L-16-04: `16-4-r3f-and-drei.md` (3D product viewer hands-on) (2026-05-25)

#### Chapter 17

- [x] C-17: Write chapter 17 index page. (2026-05-25)
- [x] L-17-01: `17-1-typescript-gentle.md` (2026-05-25)
- [x] L-17-02: `17-2-shadcn-radix-headless.md` (2026-05-25)
- [x] L-17-03: `17-3-testing-vitest-rtl.md` (2026-05-25)
- [x] L-17-04: `17-4-complete-project-setup.md` (2026-05-25)

#### Chapter 18

- [x] C-18: Write chapter 18 index page. (2026-05-25)
- [x] L-18-01: `18-1-zustand.md` (refactor of ch 12 cart again) (2026-05-25)
- [x] L-18-02: `18-2-tanstack-query.md` (2026-05-25)
- [x] L-18-03: `18-3-performance.md` (Lighthouse run on ch 12 capstone) (2026-05-25)
- [x] L-18-04: `18-4-production-hygiene.md` (2026-05-25)

#### Chapter 19: Career capstone

- [x] C-19: Write chapter 19 index page. (2026-05-25)
- [x] L-19-01: `19-1-planning-a-portfolio.md` (2026-05-25)
- [x] L-19-02: `19-2-build-your-portfolio.md` (Talab al-Ilm callout in About section) (2026-05-25)
- [x] L-19-03: `19-3-polish-readme-loom.md` (2026-05-25)
- [x] L-19-04: `19-4-first-clients-freelancing-halal-income.md` (Shukr callout) (2026-05-25)

### 11.3 Post-content tasks (after all 76 lessons are written)

- [x] P-01: Update `frontend-book/mkdocs.yml` `nav:` block to include every chapter and lesson in order. (2026-05-25) All 19 chapters + Home + Glossary listed; verified by strict build.
- [x] P-02: Full content audit: re-read every lesson once for tone consistency. Fix any remaining em-dashes (`grep -rn '—' frontend-book/docs/`). Fix any forbidden phrasings (section 5.9 list). (2026-05-25) Repo-wide grep: 0 em/en dashes, 0 forbidden phrasings. ("Best Practices" appears twice only as the literal Lighthouse audit-category label, kept intentionally.)
- [x] P-03: Cross-link audit: verify every "more in lesson X.Y" reference points to a real, written lesson. (2026-05-25) `mkdocs build --strict` passed, which fails on any broken internal link; all next-lesson/next-chapter buttons resolve.
- [x] P-04: Glossary audit: verify every term used with a tooltip anywhere in the book has a long-form entry in `docs/glossary.md`. (2026-05-25) 424 unique tooltip terms vs 430 glossary entries; only 2 cosmetic variants (`Context`/`context`, `use server`/`"use server"`), both concepts present.
- [ ] P-05: Screenshot capture: hand `frontend-book/SCREENSHOTS_NEEDED.md` to whoever takes the screenshots; replace every placeholder with the real image. (HANDOFF READY: SCREENSHOTS_NEEDED.md + WHAT_YOU_NEED_TO_PROVIDE.md list all 16 shots for 0.2, 1.2, 1.4, 4.3, 8.2, 8.3, 9.1. Needs a human with the apps.)
- [ ] P-06: Image capture: same for `frontend-book/IMAGES_NEEDED.md`. (HANDOFF READY: 5 Pakistani site thumbnails for lesson 1.1. Needs a human/designer.)
- [x] P-07: Build and serve locally (`mkdocs serve`); click through every link in the nav; fix any 404s; verify all SVGs render and all tooltips work on desktop and mobile. (2026-05-25) `python -m mkdocs build --strict` built cleanly in ~6s, no link/nav errors. Final visual click-through + mobile tooltip check is best done by the user running `mkdocs serve` locally.
- [ ] P-08: Deploy to Cloudflare Pages under `courses.banoqabilsahiwal.org/frontend/`. (NEEDS USER: requires Cloudflare account + credentials.)
- [ ] P-09: Smoke test with 3 real beginners; gather feedback; iterate on lessons that confused them most. (NEEDS USER: requires real testers.)

---

## 12. Open questions to bring back to the user

If you hit any of these during a session, stop and ask:

1. The reference BQ-Store-FED repo (https://github.com/mohamad-omarsajid/BQ-Store-FED): does the user want us to fork it as the literal starting point for chapter 12, or use it only as a design/UX reference and rebuild from scratch?
2. The Figma file mentioned for chapter 4.4 and chapter 12.1 (the donation landing, the ecommerce store): does it exist yet, or does the user need to commission one? If commissioning, we should design those lessons assuming "here is a Figma URL the user will paste in later".
3. The Mark Complete button and Supabase integration: where does that work sit in the priority order vs writing content? This plan currently assumes the button arrives after Chapter 0 ships.
4. Does the user want a paid Three.js Journey upgrade mentioned in Chapter 16, or stick strictly to free resources?
5. Does the user have a curated list of Pakistani developer portfolios for Chapter 19.1 examples, or should we research and propose one?

---

*End of plan. Last updated: 2026-05-25.*
