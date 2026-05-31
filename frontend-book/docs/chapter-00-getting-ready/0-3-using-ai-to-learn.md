---
lesson_id: frontend.ch00.l03
title: "0.3 Using AI to learn"
chapter: 0
order: 3
estimated_minutes: 30
prerequisites:
  - frontend.ch00.l02
---

# 0.3 Using AI to learn

AI tools like ChatGPT and Claude can act like a patient teacher who never gets
tired of your questions. Used well, they speed up your learning a lot. Used
badly, they do your thinking for you and you learn nothing. This lesson shows you
the tools people use worldwide, how to ask them good questions, and the one
strict rule that protects your learning while you are a beginner.

## What you'll know by the end

- What a large language model is, in plain words
- The big AI tools people use today, and what each one is best at
- The one strict rule for beginners: ask, do not let it write your code yet
- How to ask a question that gets a useful answer
- How to check an answer so you don't learn something wrong
- Other everyday ways to use AI

---

## What an AI chat tool really is

An AI chat tool is a program you talk to in normal language. You type a question,
and it writes back an answer. Under the hood is a **large language model**
(Roman Urdu: aisa program jo bohat saara text parh kar agle lafz ka andaza laga
kar jawab deta hai). In one sentence: it has read a huge amount of text, and it
answers by predicting the words that most likely come next.

That is powerful, and it is also the catch. It predicts a likely answer, not
always a true one. So you treat it as a smart helper, never as the final word.

??? note urdu "اردو میں مزید وضاحت"
    اے آئی ٹول ایک پروگرام ہے جس سے آپ عام زبان میں بات کرتے ہیں۔ یہ بہت سارا متن
    پڑھ چکا ہوتا ہے، اور جواب دیتے وقت یہ اندازہ لگاتا ہے کہ اگلا لفظ کیا ہو سکتا
    ہے۔ اسی لیے اس کا جواب ہمیشہ سچ نہیں ہوتا۔ اسے ایک مددگار سمجھیں، حتمی استاد
    نہیں۔

---

## The big AI tools people use today

AI moves fast. New models arrive every few months. Here is the short history, so
you can see how quickly it grew.

<figure markdown>
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-ai-timeline" style="max-width:100%;height:auto">
  <title id="svg-ai-timeline">A timeline of well-known AI chat models from 2020 to 2026: GPT-3 in 2020, ChatGPT in 2022, GPT-4 and Claude in 2023, Gemini in 2024, and the current GPT-5, Claude 4, and Gemini 3 families by 2026.</title>
  <g stroke="#1f1f1c" stroke-width="1.5">
    <line x1="50" y1="120" x2="775" y2="120"/>
  </g>
  <g fill="#1f1f1c" stroke="#1f1f1c" stroke-width="1.5">
    <circle cx="90" cy="120" r="5"/>
    <circle cx="255" cy="120" r="5"/>
    <circle cx="415" cy="120" r="5"/>
    <circle cx="565" cy="120" r="5"/>
    <circle cx="715" cy="120" r="7"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <text x="90" y="95" font-size="13" font-weight="600" fill="#1f1f1c">GPT-3</text>
    <text x="90" y="148" font-size="12" fill="#6b6b65">2020</text>
    <text x="255" y="95" font-size="13" font-weight="600" fill="#1f1f1c">ChatGPT</text>
    <text x="255" y="148" font-size="12" fill="#6b6b65">2022</text>
    <text x="415" y="95" font-size="13" font-weight="600" fill="#1f1f1c">GPT-4, Claude</text>
    <text x="415" y="148" font-size="12" fill="#6b6b65">2023</text>
    <text x="565" y="95" font-size="13" font-weight="600" fill="#1f1f1c">Gemini</text>
    <text x="565" y="148" font-size="12" fill="#6b6b65">2024</text>
    <text x="715" y="89" font-size="13" font-weight="700" fill="#1f1f1c">GPT-5, Claude 4,</text>
    <text x="715" y="105" font-size="13" font-weight="700" fill="#1f1f1c">Gemini 3</text>
    <text x="715" y="148" font-size="12" fill="#6b6b65">2026, now</text>
  </g>
</svg>
<figcaption>From one big model in 2020 to a crowded, fast-moving field today. The names and version numbers keep changing, so always check for the newest one.</figcaption>
</figure>

No single tool is best at everything, and the leader changes often. Here is an
honest map of what to reach for, with free tiers you can start on today.

| What you want to do | Good options to try |
| --- | --- |
| Ask questions, learn, explain code | [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai), [Gemini](https://gemini.google.com) |
| Use a free or open model | [Llama](https://www.llama.com), [DeepSeek](https://chat.deepseek.com) |
| Make images | [Midjourney](https://www.midjourney.com), DALL-E (inside ChatGPT), [Gemini](https://gemini.google.com), [Flux](https://blackforestlabs.ai) |
| Help design and build interfaces | [v0](https://v0.dev), [Figma](https://www.figma.com), [GitHub Copilot](https://github.com/features/copilot), [Cursor](https://www.cursor.com) |

A few honest notes for a beginner in 2026:

- For **learning, writing, and code**, the strongest models right now are the Claude family (this very book was built with Claude), the GPT-5 family inside ChatGPT, and Google's Gemini. Any of them is a fine study partner. Start with the free tier of one.
- For **images**, Midjourney and the big chat tools all produce strong results. Open models like Flux and Stable Diffusion let you run things yourself.
- For **design and front-end code**, tools like v0 and Copilot can generate interfaces. They are useful later. They are not for now, and the next section explains why.

---

## The one rule for now: ask, do not copy

This is the most important paragraph in the lesson. Read it twice.

!!! danger "While you are a beginner, do not let AI write your code"
    Use AI to **ask questions** and clear your confusions. Do not use it to write
    your code or do your exercises for you. If the machine writes it, the machine
    learned it, not you. You can lean on AI once the basics are truly yours,
    which is many months away. For now: ask, understand, then type it yourself.

Why so strict? Because writing code yourself is the whole point of the early
months. Reading an AI answer feels like learning. It is not. The struggle of
doing it by hand is where the skill forms. As the people who created the C
language put it:

> "The only way to learn a new programming language is by writing programs in it."
>
> Brian Kernighan and Dennis Ritchie, *The C Programming Language*

Teachers and senior developers across the industry give beginners the same
warning, and researchers studying AI and learning have found the same pattern:
people who let AI do the thinking remember and understand far less of their own
work. So let AI explain a topic, then close it and build the thing yourself.

!!! tip "Keep your hands on the wheel"
    A good test: if the AI writes something, ask it to walk you through each line
    until you could write that line again from memory, with the tool closed. If
    you cannot, you have not learned it yet.

---

## Ask a better question

A weak question gets a weak answer. A clear question gets a clear answer. Tell
the AI three things: who you are, what you want, and the size or shape of the
answer you need.

<figure markdown>
<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-prompt-title" style="max-width:100%;height:auto">
  <title id="svg-prompt-title">A weak prompt that just says "explain html" next to a strong prompt that gives your level, the topic, and the size of answer you want.</title>
  <g font-family="Inter, sans-serif">
    <!-- weak panel -->
    <rect x="30" y="40" width="340" height="220" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <text x="50" y="72" font-size="14" font-weight="700" fill="#1f1f1c">WEAK</text>
    <text x="50" y="120" font-size="16" fill="#1f1f1c">"explain html"</text>
    <text x="50" y="170" font-size="13" fill="#6b6b65">Too short. The AI guesses your</text>
    <text x="50" y="190" font-size="13" fill="#6b6b65">level and dumps a wall of text.</text>
    <!-- strong panel -->
    <rect x="430" y="40" width="340" height="220" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <text x="450" y="72" font-size="14" font-weight="700" fill="#1f1f1c">STRONG</text>
    <text x="450" y="112" font-size="14" fill="#1f1f1c">"I am a complete beginner.</text>
    <text x="450" y="134" font-size="14" fill="#1f1f1c">Explain what HTML is in</text>
    <text x="450" y="156" font-size="14" fill="#1f1f1c">simple English, with one</text>
    <text x="450" y="178" font-size="14" fill="#1f1f1c">small example, under 100 words."</text>
    <text x="450" y="214" font-size="13" fill="#6b6b65">Your level, the topic, the size.</text>
  </g>
</svg>
<figcaption>A weak prompt versus a strong one. The strong prompt gives your level, the topic, and the size of answer you want.</figcaption>
</figure>

If the answer is still unclear, say so. "Explain that again like I am twelve" or
"give me one more example" both work. The tool will happily try a different way.

---

## Check the answer, every time that matters

Sometimes an AI states something wrong as if it were true. This is called a
**hallucination** (Roman Urdu: jab AI ghalat baat ko sach ki tarah keh de). It
can sound very confident and still be incorrect.

So for anything important, check it:

1. Ask the AI for a small example you can run yourself.
2. Search the same thing on a trusted site like [MDN](https://developer.mozilla.org).
3. If the two agree, trust it. If they disagree, trust MDN.

> **Did you know**
>
> The word "hallucination" for AI mistakes became common only around 2023. The
> behaviour is older. Giving a problem a clear name is half of handling it.

---

## More ways to use AI every day

Once the strict rule is respected, AI is a genuine time-saver outside of writing
your code. A few honest uses:

- Summarise a long article or explain a hard paragraph in simpler words.
- Explain an error message you do not understand, then fix it yourself.
- Draft an email, a message to a client, or a study plan, then edit it in your own voice.
- Translate between English and Urdu when a word is blocking you.
- Brainstorm project ideas, or quiz you with practice questions before a test.

Never paste passwords or other people's private data into any AI tool. Treat it
like a public place.

!!! note "Later: an AI helper in your terminal"
    Further on, after you know JavaScript, you will install an AI coding
    assistant that lives right in your terminal, such as
    [OpenCode](https://opencode.ai) or [Claude Code](https://www.anthropic.com/claude-code).
    You do not need it now, and you should not. Note the name, and come back to it
    when the course tells you to, well after the JavaScript chapters.

---

### Try this

Open ChatGPT or Claude and write one strong prompt using the three parts from
this lesson: who you are, what you want, and the size of the answer. For example:
"I am a complete beginner. Explain what a web browser does in simple English,
under 80 words, with one everyday example." Read the answer, then ask it to
explain again "like I am twelve." Notice how a clear question gives a clear
answer, and notice that you did not ask it to write any code.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you
can't, scroll back up. That's exactly what this section is for.

1. In one sentence, how does a large language model produce its answer?
2. Name one AI tool good for learning, and one good for making images.
3. What is the one strict rule for using AI while you are a beginner, and why?
4. What three things make a question strong?
5. What is a hallucination, and how do you guard against one?

---

## What's next

You have a study partner and you know its limits. The last piece of getting
ready is the skill under every other skill: how to learn well. The right order of
video, reading, and practice, a calm routine for when you get stuck, and the
focus habits that make hard things easier.

[Next lesson: 0.4 Learning to learn &rarr;](0-4-learning-to-learn.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- The Odin Project: [Motivation and mindset](https://www.theodinproject.com/lessons/foundations-introduction) why beginners should not lean on AI for code.
- Anthropic: [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) how to ask clearly.
- MDN: [Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development) the trusted site to check answers against.

---

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[large language model]: A program trained on huge amounts of text that answers by predicting likely next words. ChatGPT and Claude are examples. (Roman Urdu: aisa program jo bohat saara text parh kar agle lafz ka andaza laga kar jawab deta hai)
*[hallucination]: When an AI states something wrong as if it were true. (Roman Urdu: jab AI ghalat baat ko sach ki tarah keh de)
*[prompt]: The question or instruction you type into an AI tool. (Roman Urdu: woh sawaal ya hidayat jo tum AI ko likh kar dete ho)
