# Bano Qabil Sahiwal Front-End: Writing Style Guide

This is the canonical style reference for every lesson in this book. It is section 5
of `COURSE_PLAN.md`, kept here so contributors can read the rules on their own.

Read this before writing any lesson. The approved tone reference is
`docs/chapter-00-getting-ready/0-1-computer-and-internet.md`.

## 5.1 The absolute bans

These rules have zero exceptions.

1. **No em-dash (`—`).** Use a comma, colon, period, or parentheses depending on what the sentence actually wants. Search every file you write for `—` before saving and remove every instance.
2. **No en-dash (`–`).** Same fix. Search for `–` too.
3. **No "let's dive in", "in today's fast-paced world", "leverage", "robust", "delve", "embark", "navigate the complexities", "in the realm of", "it's worth noting that", "moreover", "furthermore", "additionally" used as a sentence opener.** These are AI-tells.
4. **No emoji in body prose.** Emoji is fine inside `> Note` blocks and inside the "Did you know" callouts only.
5. **No exclamation marks for emphasis.** A clear sentence does not need one. Save them for genuine excitement.
6. **No "as we have discussed" or "as mentioned earlier" without a link.** If you mean lesson 3.2, link to lesson 3.2.

## 5.2 Voice and reading level

1. Sentences average 12 words. Hard ceiling 18. If a sentence runs longer, split it.
2. One idea per sentence. One idea per paragraph cluster.
3. Active voice. "Click the button," not "the button should be clicked."
4. Second person. "You", not "the developer" or "one".
5. Contractions are fine and warm. "Don't", "you'll", "it's".
6. Define every technical term on first use. Use the dotted-underline tooltip pattern from section 5.5.
7. Friendly, not chummy. Strict when it matters. Honest about hard things.
8. Light humour is allowed in small doses. One small joke per lesson, not five. Never at the student's expense.
9. Acknowledge Pakistani context naturally where it helps (slow internet, Windows laptops, Urdu vocabulary). Don't perform it.

## 5.3 Bilingual approach

Default is BASIC English. Urdu shows up in three places only:

1. Inside tooltip definitions at the bottom of the lesson (see 5.5).
2. Inside a `> اردو میں مزید وضاحت` admonition when a concept is genuinely hard and an Urdu paragraph would help.
3. Inside example content (e.g. a form labelled "Salaam, Ali" in a JavaScript example).

Never write a paragraph in Urdu only. Never write a paragraph in English with random Urdu words sprinkled mid-sentence. Urdu is for definitions and for the optional explanation admonition.

## 5.4 Windows-first guidance

99% of the audience is on Windows. Half are on Windows 10.

1. Every install instruction must give the Windows path first, then mention macOS or Linux if relevant in one line.
2. For any Windows step that differs between Windows 10 and Windows 11, give both paths. Use a small two-column table or two separate sub-steps.
3. WSL2 is the primary development environment from Chapter 1 onwards. Always include a "If your laptop can't run WSL2" callout with the Windows-native fallback (Git for Windows + native Node.js + native VS Code).
4. Assume 4 GB RAM and a slow disk. Recommend lightweight extensions only. Warn before any step that downloads more than 200 MB.

## 5.5 Tooltip and glossary pattern

Use the MkDocs `abbr` extension. At the bottom of every lesson, define each tricky term once:

```markdown
*[DOM]: Document Object Model. The tree of HTML elements that JavaScript can read and change. More in lesson 7.3.
*[hoisting]: JavaScript's behaviour of treating variable and function declarations as if they were moved to the top of their scope. More in lesson 6.3.
```

Then anywhere in the prose, the bare term gets the tooltip automatically:

> The DOM is what your JavaScript talks to when it changes the page.

The dotted underline renders automatically. The tooltip shows on hover (desktop) or tap-and-hold (mobile).

Cross-lesson definitions live in `docs/glossary.md` (the master glossary) AND must be repeated in each lesson where the term appears (because abbreviations are scoped to the page in MkDocs).

For Urdu glosses inside tooltips:

```markdown
*[browser]: A program that turns website code into the page you see. براؤزر
```

## 5.6 Code examples

1. Every code block specifies a language: ` ```html `, ` ```css `, ` ```js `, ` ```bash `, ` ```jsx `, etc.
2. Every code block over ~6 lines gets a comment at the top saying what file it belongs to or what it does.
3. Use real-looking variable names. Not `foo`, `bar`, `baz`. Use `username`, `cartTotal`, `productList`.
4. Comments in code are in BASIC English. Urdu in code comments only when it adds clarity for a hard concept.
5. Where possible, link to a working sandbox (CodePen, StackBlitz, Tailwind Play) just below the code block.

## 5.7 Lists vs prose

1. Use a list when you have three or more parallel items. Two items go in prose.
2. List items are short. If a list item runs longer than two sentences, it should become a subsection.
3. Numbered lists for sequences. Bulleted lists for unordered sets.

## 5.8 Headings

1. One `#` H1 per file, matching the lesson title in the frontmatter.
2. Section headings are `##`. Subsections are `###`. Rarely `####`.
3. Sentence case in headings. "What is HTML", not "What Is HTML".

## 5.9 Forbidden phrasings (running list, add as you discover more)

- "It is important to note that..." -> just say the thing.
- "In conclusion..." -> don't conclude, just finish.
- "Without further ado..." -> never.
- "As an AI..." -> never.
- "Diving deep" / "deep dive" -> "go further" / "more detail".
- "Best practices" -> just describe the better way directly.
- "Cutting-edge" -> "modern".
- "Robust" -> "reliable" or just leave it out.
