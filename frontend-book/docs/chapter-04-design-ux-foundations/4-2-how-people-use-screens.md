---
lesson_id: frontend.ch04.l02
title: "4.2 How people really use screens"
chapter: 4
order: 2
estimated_minutes: 30
prerequisites:
  - frontend.ch04.l01
---

# 4.2 How people really use screens

Most beginners design as if every user will sit down, pour a cup of chai, and carefully read every word on the screen. That is not what happens. Real users are in a hurry. They are distracted. They scan, they guess, they click the first thing that looks close enough to what they want. If your design does not survive that kind of use, it will frustrate people no matter how good it looks.

This lesson is about understanding how people actually behave on screens, not how you wish they would behave. Once you understand that, every layout decision, every button label, and every choice about how many options to show becomes much easier to make.

## What you'll know by the end

- Why users scan instead of read, and what satisficing means.
- What cognitive load is and why reducing it is your most important job.
- Hick's Law, Fitts's Law, Jakob's Law, and Miller's Law in plain words.
- The difference between recognition and recall, and why it matters for menus and forms.
- How to apply each of these ideas to real screens.

---

## People do not read. They scan and guess.

Open any popular website with a friend who has not seen it before. Watch their eyes. They do not start at the top left and read every sentence to the bottom right. They move fast, jumping from heading to heading, looking for the word or shape that matches what they are after. When they find something that looks close enough, they click it. They do not wait to find the perfect link.

This behaviour has a name: satisficing (Roman Urdu: "theek hai, chalega" wali soch, yani perfect ke bajay kafi acha dhoondhna). It is a mix of the words "satisfy" and "suffice." Users do not look for the best option. They look for the first option that is good enough.

This is not laziness. It is rational. Most of the time, the first good-looking link gets you there, and if it does not, you press Back and try again. For simple tasks, this is faster than carefully reading every option.

**What this means for your design:** put the most important thing in the most obvious place. Use clear headings. Make links say exactly what you get when you click them. Never make the user hunt. If someone has to read a paragraph to find a button, you have already lost them.

---

## The F-pattern: how eyes move on a screen

Eye-tracking studies show that when people land on a text page, their eyes follow a rough F shape. They read across the top, then scan down the left side, stopping briefly on things that catch their eye.

<figure markdown>
<svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-fpattern-title" style="max-width:100%;height:auto">
  <title id="svg-fpattern-title">A page layout showing an F-shaped reading pattern. The top bar of the F is a long horizontal scan across the full width. The second bar is a shorter horizontal scan partway down. The stem of the F is a short vertical scan down the left edge.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="40" y="30" width="480" height="320" rx="8"/>
  </g>
  <g fill="#e8f4f1" stroke="none">
    <rect x="56" y="50" width="448" height="32" rx="4"/>
    <rect x="56" y="98" width="280" height="22" rx="4"/>
    <rect x="56" y="136" width="56" height="148" rx="4"/>
  </g>
  <g fill="#1f1f1c" stroke="none">
    <rect x="56" y="136" width="448" height="14" rx="2" opacity="0.10"/>
    <rect x="56" y="158" width="448" height="14" rx="2" opacity="0.07"/>
    <rect x="56" y="180" width="420" height="14" rx="2" opacity="0.07"/>
    <rect x="56" y="202" width="448" height="14" rx="2" opacity="0.05"/>
    <rect x="56" y="224" width="360" height="14" rx="2" opacity="0.05"/>
    <rect x="56" y="246" width="448" height="14" rx="2" opacity="0.05"/>
    <rect x="56" y="268" width="400" height="14" rx="2" opacity="0.05"/>
    <rect x="56" y="290" width="448" height="14" rx="2" opacity="0.05"/>
    <rect x="56" y="312" width="320" height="14" rx="2" opacity="0.05"/>
  </g>
  <defs>
    <marker id="fpattern-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#0f7b6c"/>
    </marker>
  </defs>
  <g stroke="#0f7b6c" stroke-width="3" fill="none" stroke-linecap="round" marker-end="url(#fpattern-arrow)">
    <line x1="60" y1="66" x2="490" y2="66"/>
    <line x1="60" y1="109" x2="326" y2="109"/>
    <line x1="68" y1="120" x2="68" y2="330"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="280" y="46" text-anchor="middle">Top bar: users read most of the first line</text>
    <text x="190" y="94" text-anchor="middle">Second bar: a shorter scan further down</text>
    <text x="140" y="360" text-anchor="middle">Left stem: eyes drop down the left edge</text>
  </g>
</svg>
<figcaption>Eye-tracking studies show a rough F pattern on text-heavy pages. Users read the top, skim a bit lower, then mostly scan the left side. Content on the right and at the bottom gets little attention.</figcaption>
</figure>

The practical conclusion: put your most important content at the top and on the left. Navigation labels, headings, and the first few words of every paragraph carry most of the weight. The right side and the bottom are the least-seen parts of any screen.

---

## Cognitive load: the real enemy

Every single thing on your screen that a user must look at, understand, or remember takes mental effort. That mental effort is called cognitive load (Roman Urdu: dimaag par padne wala bojh, yani kitna sochna pad raha hai).

The human brain has a limited working memory. When too many things compete for attention at once, users slow down, make mistakes, give up, or get annoyed. They blame themselves, but the real failure is in the design.

Cognitive load comes in three forms on a screen:

| Type | What causes it | Example |
| --- | --- | --- |
| Too much to look at | Clutter, too many colours, too many fonts, too many buttons at once | A homepage with fifteen calls to action |
| Unclear meaning | Vague labels, unexplained icons, jargon | A button that just says "Proceed" |
| Too much to remember | Asking users to recall information from a previous step | Showing a one-time code on screen A and asking for it on screen B with no way to go back |

Your job as a designer is to reduce all three. Cut options. Use clear words. Show information where people need it. Do not hide it behind another step.

---

## The laws that predict user behaviour

UX designers use a small set of well-tested principles, called laws, to make design decisions. They are not laws of physics. They are observations about how people consistently behave, tested on thousands of users over decades. Learn them and you will have reasons behind your choices, not just opinions.

### Hick's Law: more choices, slower decisions

The more options you give someone, the longer they take to decide. This is called Hick's Law (Roman Urdu: jitne zyada options, utna zyada waqt lagta hai faisla karne mein).

<figure markdown>
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-hick-title" style="max-width:100%;height:auto">
  <title id="svg-hick-title">Two navigation bars compared. The first has three clear options and is labelled fast decision. The second has nine options crammed in and is labelled slow, overwhelmed.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="30" y="30" width="220" height="44" rx="6"/>
    <rect x="310" y="30" width="220" height="44" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="80" y="57">Home</text>
    <text x="140" y="57">Shop</text>
    <text x="200" y="57">Contact</text>
    <text x="325" y="57">Home</text>
    <text x="358" y="57">Shop</text>
    <text x="391" y="57">Blog</text>
    <text x="420" y="57">About</text>
    <text x="453" y="57">Team</text>
    <text x="486" y="57">Help</text>
    <text x="519" y="57">FAQ</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="140" y="110" fill="#0f7b6c" font-weight="600">3 choices. Fast decision.</text>
    <text x="420" y="110" fill="#c0392b" font-weight="600">7+ choices. User slows down.</text>
  </g>
  <g fill="#0f7b6c" stroke="none">
    <rect x="80" y="125" width="120" height="60" rx="6"/>
  </g>
  <g fill="#c0392b" stroke="none">
    <rect x="310" y="125" width="220" height="60" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#ffffff" text-anchor="middle">
    <text x="140" y="160">User clicks quickly</text>
    <text x="140" y="176">and confidently.</text>
    <text x="420" y="153">User pauses. Reads each</text>
    <text x="420" y="169">option. Wonders if they</text>
    <text x="420" y="185">are missing something.</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="140" y="220">Fewer options = faster action</text>
    <text x="420" y="220">More options = decision fatigue</text>
  </g>
</svg>
<figcaption>Hick's Law: three navigation items get a fast click. Seven or more items make the user slow down and wonder if they are missing something. Group and reduce options wherever you can.</figcaption>
</figure>

**In practice:** keep main navigation to five items or fewer. Break long lists into groups. Use progressive disclosure (show a few options first, let users expand if they want more). On a checkout page, remove every link that is not about finishing the purchase.

### Fitts's Law: bigger and closer is faster

The time it takes to hit a target depends on how big the target is and how far away it is. A big button close to your finger is fast and easy. A tiny link far away is slow and frustrating. This is Fitts's Law (Roman Urdu: jitna bara aur paas ka button, utna jaldi tap ho jaata hai).

**In practice:** make your primary action button large. On a phone, put important buttons where the thumb reaches naturally. The bottom half of a mobile screen, near the center, is where thumbs land without stretching. The top corners are hard to reach. Never put a critical button in a corner unless it has to be there.

### Jakob's Law: users bring expectations from everywhere else

Users spend most of their time on other websites and apps, not yours. By the time they open your site, they already have a mental model of how things work: the logo is top left, the menu is top right or in a hamburger icon, the search bar is at the top, blue underlined text is a link.

If you break these conventions, users slow down and feel uncertain. This is Jakob's Law (Roman Urdu: log jo cheez dusri jagah seekh chuke hain, wohi aapki site par bhi expect karte hain).

**In practice:** use familiar patterns. Put the logo where logos go. Put the cart icon where cart icons go. Save your creativity for content and brand, not for where the navigation lives. When something unexpected happens, the user does not think "how clever." They think "something is broken."

### Miller's Law: people hold only a few things in mind at once

The average person can hold about five to nine items in working memory at one time. That number is sometimes called 7 plus or minus 2. This is Miller's Law (Roman Urdu: insaan ek waqt mein sirf kuch cheezein hi yaad rakh sakta hai).

**In practice:** chunk information. A phone number is easier to remember as 0314-236-7890 than as 03142367890. A navigation menu with two groups of four items is easier to process than one group of eight. Forms with sections and labels are easier than one long list of fields.

---

## All four laws together

| Law | What it says | What to do in your UI |
| --- | --- | --- |
| Hick's Law | More choices = slower, harder decisions | Cut options. Group them. Show fewer at once. |
| Fitts's Law | Bigger and closer targets are faster to hit | Make primary buttons large. Put them where thumbs land. |
| Jakob's Law | Users expect your site to work like every other site | Follow common patterns. Put things where people expect them. |
| Miller's Law | Working memory holds only a few items | Chunk information. Use groups, sections, and short lists. |

---

## Recognition over recall

It is much easier for a person to recognise something when they see it than to pull it from memory on their own. This is one of the most well-supported findings in psychology, and it has direct design consequences.

**Recall** (Roman Urdu: yad se batana, bina kisi hint ke) means a user has to produce information from memory. "What command do I type to save a file?" is recall. It is hard.

**Recognition** (Roman Urdu: dekh ke pehchaan lena) means a user sees options and picks the right one. A menu that shows "Save", "Save As", and "Export" is recognition. The user does not have to remember the names. They just have to confirm which one they want.

| Situation | Recall-based (hard) | Recognition-based (easier) |
| --- | --- | --- |
| Saving a file | User types the keyboard shortcut from memory | User sees "Save" in a File menu or a button |
| Choosing a country | User types the country code | User picks from a dropdown list |
| Login error | "Invalid credentials" with no hint | "Wrong password. Try again or reset it." with a link |
| Shopping filter | User types a category name | User ticks visible checkboxes |

**In practice:** show options, do not make people remember them. Use dropdowns, visible buttons, and clear labels rather than blank text fields. Show the user what they entered on a previous step if they need it on the current step. Autocomplete and search suggestions are recognition tools. They are almost always better than blank boxes.

---

### Try this

**Exercise 1:** Open a website that you use often (Daraz, your university portal, a bank app, anything). Set a timer. Pick one simple task (find a product, check your result, find a phone number). Time how long it takes you to complete it. Then write down every moment where you had to slow down, re-read, or click the wrong thing first. Those friction points are cognitive load in action.

**Exercise 2:** On the same page or on any web page, count the number of clickable choices visible on the screen at once. Then count the number of different font sizes and colours. Write down the number. Most overloaded designs have twenty or more clickable things on one screen. A focused screen has five to eight.

**Exercise 3:** Find one form on the web, any login or signup page. Ask yourself: which fields require recall (the user must remember something) and which allow recognition (the user picks from options or sees hints)? Write one change that would shift a recall field to a recognition field.

---

??? note urdu "اردو میں مزید وضاحت"
    اصل صارف (user) صفحہ کو پڑھتا نہیں، بلکہ جلدی جلدی نظر دوڑاتا ہے۔ وہ پہلی ایسی چیز پر کلک کرتا ہے جو اس کے کام کی لگے۔ اسے "satisficing" کہتے ہیں۔ ہر اضافی انتخاب، غیر واضح لیبل، یا یاد رکھنے والی چیز دماغ پر بوجھ ڈالتی ہے۔ اسے cognitive load کہتے ہیں۔ Hick's قانون کہتا ہے: جتنے زیادہ آپشن، اتنا سست فیصلہ۔ Fitts کا قانون کہتا ہے: بڑا اور قریب بٹن جلدی دباؤ۔ Jakob کا قانون کہتا ہے: لوگ وہی توقع رکھتے ہیں جو انہوں نے دوسری جگہوں پر سیکھا ہے۔ Miller کا قانون کہتا ہے: انسان ایک وقت میں صرف چند چیزیں یاد رکھ سکتا ہے، اس لیے معلومات کو حصوں میں تقسیم کریں۔ اور یاد رکھیں: دکھانا یاد کروانے سے آسان ہے، اس لیے ہمیشہ آپشن دکھائیں بجائے یاد کروانے کے۔

---

## Knowledge check

Do not write anything down. Just try to answer these in your head. If you cannot, scroll back up. That is what this section is for.

1. What is satisficing? Why do users do it instead of looking for the perfect option?
2. A checkout page has twelve links in the header and footer. Which law says this is a problem, and what should you do?
3. A phone app has a "Complete Purchase" button tucked into the top right corner of the screen. Which law says this is a problem, and why?
4. A form shows a country code field as a blank text input instead of a dropdown. Is that recognition or recall, and which is harder for the user?

---

## What's next

You now understand how real users see, decide, and act on screens. The next step is to use that understanding to organise content so users can find what they need and finish what they came to do. That is called information architecture.

[Next lesson: 4.3 Information architecture and user flows &rarr;](4-3-information-architecture.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You do not need them to continue.

- **"Don't Make Me Think"** by Steve Krug. Short, funny, and the most practical usability book ever written. Read it in a weekend.
- **"Laws of UX"** by Jon Yablonski. A clean, visual guide to the principles covered in this lesson. The companion website at [lawsofux.com](https://lawsofux.com) shows each law with real design examples.
- **Nielsen Norman Group** at [nngroup.com](https://www.nngroup.com). The world's most trusted UX research organisation. Their free articles go deep on every topic in this chapter.

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[cognitive load]: The mental effort required to process what is on the screen. (Roman Urdu: dimaag par padne wala bojh, kitna sochna pad raha hai)
*[scanning]: Reading quickly by jumping between headings and bold words instead of reading every word. (Roman Urdu: puri cheez padhne ki jagah jaldi jaldi nazar daudana)
*[satisficing]: Choosing the first option that is good enough rather than searching for the best one. (Roman Urdu: perfect dhoondhne ki jagah pehla theek-thak option chunna)
*[Hick's Law]: More choices lead to slower decisions. Reduce and group options to speed users up. (Roman Urdu: jitne zyada option, utna zyada waqt lagta hai)
*[Fitts's Law]: Bigger and closer targets are faster and easier to click or tap. (Roman Urdu: bara aur paas ka button jaldi dabta hai)
*[Jakob's Law]: Users expect your site to behave like every other site they already use. (Roman Urdu: log wahi expect karte hain jo unhon ne dusri jagah seekha hai)
*[recognition over recall]: Showing options so users can pick them is easier than making users remember something on their own. (Roman Urdu: dikhana yad karne se aasaan hai)
