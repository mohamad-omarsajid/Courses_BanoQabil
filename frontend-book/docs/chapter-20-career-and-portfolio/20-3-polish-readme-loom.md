---
lesson_id: frontend.ch20.l03
title: "20.3 Polish and the README that wins interviews"
chapter: 20
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch20.l02
---

# 20.3 Polish and the README that wins interviews

You built your portfolio in 19.2. Now you make it speak for you. Most reviewers spend less than a minute on each project. A clear README and a short demo do the talking when you are not in the room. This lesson shows you how to polish both.

## What you'll know by the end

- The five questions every good README answers.
- How to write a README section by section.
- How to record a 60-second Loom demo for each project.
- How to pin your six best repos on GitHub.
- How to run a final polish pass before you share links.
- A full README template you can copy and reuse.

---

## The five questions a README must answer

A README is the text file that shows on a repo's home page. Reviewers read it first. A good one answers five clear questions.

1. What is it? One line that says what the app does.
2. Why did you build it? Show the reason or the problem it solves.
3. What is the stack? List the tools and languages you used.
4. What is the live URL? Give a link they can click right now.
5. What was hard about it? Explain one real challenge you solved.

The last question matters most. Anyone can list features. Telling a reviewer what was hard, and how you fixed it, shows how you think. That builds trust.

!!! tip
    The "what was hard" section is what makes a reviewer trust you. Do not skip it. It turns a plain project into proof that you can solve real problems.

---

## What a README that wins interviews contains

Use this table to plan each section before you write it. Every part has a clear purpose. Skip a part and you leave a gap the reviewer notices.

| Section | What to write | Why it matters |
| --- | --- | --- |
| Title | Project name in one short phrase | First thing the eye lands on; must be memorable |
| One-line description | What the app does, for whom | Answers "should I keep reading?" in two seconds |
| Live demo link | Deployed URL, near the top | Reviewers click before they read; make it easy |
| Screenshot or GIF | One image of the real, working UI | Shows the result without asking them to run anything |
| Why I built this | One to three sentences on the problem | Shows you build for a reason, not just to practice syntax |
| Stack | Bullet list of main tools | Lets the reader judge your technical choices at a glance |
| Features | Three to five bullet points of what a user can do | Shows product thinking, not just code |
| Run locally | Exact copy-paste commands: clone, install, dev | Proves the project is real and respects the reader's time |
| What I learned | One honest paragraph on the hardest part | The part reviewers remember; shows how you think |

The live demo link at the top of the table is not an accident. Put it high on the page. If the reviewer can click it in three seconds, some of them will. If they have to scroll to find it, most will not.

---

## A perfect README, section by section

Walk through a strong README one piece at a time. Each piece has a job.

- Title. The project name, short and clear.
- One-line description. What it does, in one sentence.
- Live demo link. The deployed URL at the top, easy to find.
- A screenshot or GIF. One image so they see it without clicking.
- The stack. The main tools, like React, Vite, and Tailwind.
- Features. A short bullet list of what users can do.
- How to run locally. The exact commands to start it.
- What you learned. One honest paragraph on the hard part.

Keep each section short. A reviewer scans, so use headings and bullets. White space is your friend.

---

## A README template you can copy

Here is a full template. Copy it into a file named `README.md` at the root of each repo. Replace the bracket text with your own words.

```markdown
# Project Name

A weather app that shows the live forecast for any Pakistani city.

## Live demo

https://your-project.vercel.app

## Screenshot

![App home screen](docs/screenshot.png)

## Why I built this

I wanted to practice fetching live data and showing it in a clean UI.
The goal was a fast, mobile-first app that loads in under two seconds.

## Stack

- React and Vite
- Tailwind CSS
- OpenWeather API
- Deployed on Vercel

## Features

- Search any city by name
- Shows temperature, humidity, and wind
- Saves your last searched city
- Works on mobile and desktop

## Run it locally

git clone https://github.com/your-name/your-project.git
cd your-project
npm install
npm run dev

## What I learned

The hardest part was handling the loading and error states.
At first the screen flashed blank while data loaded.
I added a loading spinner and a clear error message.
Now the app feels stable even on a slow connection.
```

Notice the live link sits near the top. Notice the "what I learned" part is honest and specific. That is the part reviewers remember.

---

## Record a 60-second Loom demo

A Loom demo is a short screen recording. You click through your app and explain it out loud. Loom is a free tool that records your screen and your voice.

Many reviewers will not run your code. They are busy. But they will watch a one-minute video. So give them one.

Keep it to 60 seconds. The five stages below form a clear structure. Each stage has one job.

<figure markdown>
<svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-loom-title" style="max-width:100%;height:auto">
  <title id="svg-loom-title">A 60-second Loom walkthrough divided into five labelled segments: problem (0-10s), live demo (10-40s), tech used (40-50s), your role (50-55s), what you would improve (55-60s).</title>
  <defs>
    <marker id="loom-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="#1f1f1c" stroke="none">
    <rect x="20"  y="55" width="116" height="40" rx="6"/>
    <rect x="148" y="55" width="176" height="40" rx="6"/>
    <rect x="336" y="55" width="116" height="40" rx="6"/>
    <rect x="464" y="55" width="116" height="40" rx="6"/>
    <rect x="592" y="55" width="148" height="40" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">
    <text x="78"  y="79">Problem</text>
    <text x="236" y="79">Live demo</text>
    <text x="394" y="79">Tech used</text>
    <text x="522" y="79">Your role</text>
    <text x="666" y="71">What you</text>
    <text x="666" y="85">would improve</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="78"  y="115">0-10 s</text>
    <text x="236" y="115">10-40 s</text>
    <text x="394" y="115">40-50 s</text>
    <text x="522" y="115">50-55 s</text>
    <text x="666" y="115">55-60 s</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#loom-arrow)">
    <line x1="137" y1="75" x2="146" y2="75"/>
    <line x1="325" y1="75" x2="334" y2="75"/>
    <line x1="453" y1="75" x2="462" y2="75"/>
    <line x1="581" y1="75" x2="590" y2="75"/>
  </g>
</svg>
<figcaption>A 60-second Loom has five stages. The live demo gets the most time because that is what a reviewer actually wants to see.</figcaption>
</figure>

Here is a simple script for each stage.

1. **Problem (0-10 s).** Say the project name and the problem it solves. One sentence.
2. **Live demo (10-40 s).** Click through the main feature live. Show the real app working.
3. **Tech used (40-50 s).** Name the main tools you used and why you chose them.
4. **Your role (50-55 s).** If it was a team project, say exactly what part you built.
5. **What you would improve (55-60 s).** Name one honest thing you would change next time.

Add the Loom link near the top of your README, next to the live demo. Speak slowly and clearly. You do not need a perfect voice, just a calm one.

!!! note "Did you know"
    Many reviewers watch a 60-second demo before they ever clone your repo. A short video can do more for you than a long README.

---

??? note urdu "اردو میں مزید وضاحت"
    ایک اچھا README وہ ہوتا ہے جو پانچ سوالوں کا واضح جواب دے: یہ کیا ہے، آپ نے کیوں بنایا، کون سے ٹولز استعمال کیے، لائیو لنک کیا ہے، اور سب سے مشکل حصہ کیا تھا۔ آخری سوال سب سے اہم ہے، کیونکہ یہ بتاتا ہے کہ آپ مسائل کیسے حل کرتے ہیں۔ اوپر والی ٹیبل میں ہر حصے کا کام بتایا گیا ہے تاکہ آپ لکھنے سے پہلے منصوبہ بنا سکیں۔ لائیو لنک ہمیشہ اوپر رکھیں، یعنی صفحے کے شروع میں، تاکہ ریویور فوری کلک کر سکے۔ Loom ویڈیو بھی بہت ضروری ہے کیونکہ زیادہ تر ریویور آپ کا کوڈ نہیں چلاتے، لیکن ایک منٹ کی ویڈیو ضرور دیکھتے ہیں۔ پانچ مراحل یاد رکھیں: مسئلہ، لائیو ڈیمو، ٹیکنالوجی، آپ کا کردار، اور آپ اگلی بار کیا بہتر کرتے۔

---

## Pin your six best repos

GitHub lets you pin up to six repos on your profile page. These pinned repos are your shop window. They are the first thing a recruiter sees.

Pin your strongest work only. Each pinned repo should have a clean README and a live link. Do not pin a half-finished project. Quality beats quantity here.

To pin a repo, go to your GitHub profile. Find the "Customize your pins" link. Tick your six best, then save. Put your most impressive project first.

---

## The final polish pass

Before you share any link, do one careful pass over each project. Small bugs cost you trust. Here is the checklist.

- Consistent naming. Use clear, similar names across files and repos.
- No leftover `console.log`. Remove every debug line from your code.
- No dead links. Click every link and button. Fix anything broken.
- Mobile works. Open the live site on your phone and test it.
- Lighthouse is green. Run the audit from Chapter 19 and fix red scores.

Recall Chapter 19, where you ran Lighthouse for performance and accessibility. Run it again on the deployed site. Green scores tell a reviewer you care about quality.

A clean project says you finish your work. That is the message you want to send.

---

### Try this

Pick your strongest project and write a real `README.md` for it using the template above. Make sure it answers all five questions, with the live link near the top and an honest "what I learned" paragraph at the end. Then record a 60-second Loom demo following the five-stage timeline, and add that link next to the live demo. Finish with the polish pass: remove every `console.log`, click each link to catch dead ones, and pin the repo on your GitHub profile.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What are the five questions a good README must answer?
2. Why does the "what was hard" section matter most to a reviewer?
3. Why record a 60-second Loom demo instead of just sharing the code?
4. How many repos can you pin on your GitHub profile, and how should you choose them?

---

## What's next

Your portfolio now looks sharp and reads clearly. The next step is earning from your skills. In 19.4 you will learn how to find your first clients and freelance for halal income in Pakistan.

[Next lesson: 19.4 First clients and freelancing in Pakistan &rarr;](20-4-first-clients-freelancing-halal-income.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Make a README](https://www.makeareadme.com/)
- [Pinning items to your profile (GitHub)](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[README]: A text file that shows on a repo's home page and explains the project. (Roman Urdu: aik file jo project ko samjhati hai)
*[Loom]: A free tool that records your screen and voice to make a short demo video. (Roman Urdu: screen record karne wala muft tool)
*[pinned repo]: A repo you fix to the top of your GitHub profile as featured work. (Roman Urdu: aap ka behtareen kaam jo aap GitHub profile ke upar saja kar dikhate hain taake log pehle wahi dekhein)
*[demo]: A short walkthrough that shows your app working. (Roman Urdu: chhoti video jo app chalti hui dikhaye)
