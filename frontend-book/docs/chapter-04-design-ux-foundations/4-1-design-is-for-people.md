---
lesson_id: frontend.ch04.l01
title: "4.1 Design is for people, not decoration"
chapter: 4
order: 1
estimated_minutes: 30
prerequisites:
  - frontend.ch03.l04
---

# 4.1 Design is for people, not decoration

You have learned HTML and CSS. You can build a page that looks like something. But here is a question worth sitting with: if your page looks beautiful yet confuses the person trying to use it, is it well designed?

The answer is no. Design is not about decoration. Design is about helping a person reach a goal without confusion, wasted time, or mistakes. A designer named Don Norman spent decades studying why everyday objects confuse people, and he wrote a book about it called "The Design of Everyday Things." His ideas changed how the whole industry thinks, and they will change how you build things too.

*(Roman Urdu: Design ka matlab sirf khubsoorat banana nahi hai. Iska matlab hai ke koi bhi shakhs apna kaam asaani se kar sake, bina pareshan huye.)*

## What you'll know by the end

- Why good design is about usability, not looks.
- What affordances and signifiers are, and why they matter every time you build a button.
- What feedback, mapping, constraints, and mental models mean in practice.
- Why, when a user makes a mistake, the design is usually at fault, not the user.
- How to spot bad design in the physical world and in apps around you.

---

## Start with a door

Before you think about pixels, think about a door.

You walk up to a glass door. There is a flat metal plate on it. You push. The door opens. Good. Now imagine: there is a handle on the door, a curved one you can wrap your hand around. You grab it and pull. The door does not move. You pull harder. Still nothing. You feel a little foolish. A sign says "PUSH." You push and it opens.

That door failed you. It had the wrong signal. The curved handle told your brain "pull me," but the door needed a push. You did nothing wrong. The designer did something wrong. This kind of door has a nickname now, a "Norman door," named after Don Norman himself.

That story contains everything in this lesson. Let us go through the ideas one at a time.

---

## Norman's six design principles

Every time an interface confuses someone, you can usually trace it back to one of six ideas Norman identified. They apply to physical objects and to every screen you will ever build.

| Principle | What it means | Everyday example |
| --- | --- | --- |
| Affordance | What an object lets you do | A chair affords sitting, a button affords pressing |
| Signifier | The visible hint that shows you how | A door handle signals "pull," a flat plate signals "push" |
| Feedback | The system tells you your action worked | A light switch that clicks, a button that changes colour |
| Mapping | Controls match what they control | Stove knobs laid out to match the burner positions |
| Constraint | Limiting options so mistakes are harder | A form field that only accepts numbers for a phone field |
| Mental model | What the user thinks your system does | People expect the back arrow to undo, always |

You will come back to this table again and again. Print it out if it helps.

---

## Affordance and signifier

An **affordance** (Roman Urdu: kisi cheez ki woh salahiyat jo use kisi kaam ke liye istemal hone deti hai) is what an object lets you do with it. A door affords opening. A button affords pressing. A text box affords typing. Affordances exist whether or not anyone sees them.

A **signifier** (Roman Urdu: woh nishaan ya hint jo bataye ke kisi cheez ko kaise use karna hai) is the visible hint that communicates the affordance. The flat plate on the door is a signifier. It says "I am flat, push me." The handle says "I am shaped to be grabbed, pull me."

On screen, a box with a shadow that makes it look raised is a signifier for "I am a button, press me." A field with a light border and placeholder text is a signifier for "type here." When you remove those visual hints, users slow down and make guesses.

The gap between affordance and signifier is where most confusion lives. The door can be opened (affordance), but the handle sends the wrong message (bad signifier).

<figure markdown>
<svg viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-aff-sig-title" style="max-width:100%;height:auto">
  <title id="svg-aff-sig-title">Two doors side by side. The left door has a flat plate and the label Push with a green tick. The right door has a handle but also needs a push, labeled Bad signifier with a red cross.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="40" y="40" width="240" height="200" rx="6"/>
    <rect x="400" y="40" width="240" height="200" rx="6"/>
  </g>
  <g fill="#6b6b65" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="230" y="118" width="30" height="44" rx="3"/>
    <rect x="400" y="118" width="8" height="44" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="160" y="270">Flat plate = push signifier</text>
    <text x="160" y="285">GOOD</text>
    <text x="520" y="270">Curved handle = pull signifier</text>
    <text x="520" y="285">but door needs a push. BAD</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="22" text-anchor="middle">
    <text x="160" y="30" fill="#1f1f1c">PUSH</text>
    <text x="520" y="30" fill="#1f1f1c">PUSH</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="30" text-anchor="middle">
    <text x="160" y="155" fill="#1f1f1c">[ ]</text>
    <text x="520" y="155" fill="#1f1f1c">( )</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="160" y="230">flat plate on door</text>
    <text x="520" y="230">curved handle on door</text>
  </g>
</svg>
<figcaption>Left: a flat plate on the door is an honest signifier. It says "push." Right: a curved handle on a push door is a lying signifier. It says "pull" but the door opens with a push. The user fails and feels confused. The door is to blame.</figcaption>
</figure>

---

## Feedback

Imagine pressing a button in a lift and nothing happens. No light, no sound, no movement. Did it register? Should you press again? You press again. And again. Now the lift goes to three floors because you pressed three times.

**Feedback** (Roman Urdu: system ka woh jawab jo bataye ke tumhara kaam ho gaya) is the system telling you that your action worked. Good feedback is immediate, clear, and honest. Bad feedback is delayed, missing, or confusing.

On a website:

- A button that changes colour when you click it is good feedback.
- A form that shows a green tick after you submit is good feedback.
- A button that does nothing visible while it loads, so you click it four times, is bad feedback.

The feedback loop has three steps. You act, the system responds, and you see the result. If any step breaks, confusion follows.

<figure markdown>
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-feedback-title" style="max-width:100%;height:auto">
  <title id="svg-feedback-title">A feedback loop: User Action flows to System, System flows to Visible Feedback, Visible Feedback flows back to User sees result, which is also labeled Confidence.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="70" width="140" height="60" rx="8"/>
    <rect x="270" y="70" width="140" height="60" rx="8"/>
    <rect x="520" y="70" width="140" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="90" y="96">User</text>
    <text x="90" y="114">action</text>
    <text x="340" y="96">System</text>
    <text x="340" y="114">responds</text>
    <text x="590" y="96">Visible</text>
    <text x="590" y="114">feedback</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="90" y="150">Click, tap, type</text>
    <text x="340" y="150">Process the input</text>
    <text x="590" y="150">Colour, sound, text</text>
  </g>
  <defs>
    <marker id="fb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#fb-arrow)">
    <line x1="162" y1="100" x2="268" y2="100"/>
    <line x1="412" y1="100" x2="518" y2="100"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65" text-anchor="middle">
    <text x="215" y="90">sends</text>
    <text x="465" y="90">shows</text>
  </g>
</svg>
<figcaption>Every interaction is a loop. The user acts, the system responds, and a visible sign tells the user the action worked. If the visible sign is missing or delayed, the user is left guessing.</figcaption>
</figure>

---

## Mapping

**Mapping** (Roman Urdu: controls aur unke kaam ka aapas mein seedha rishta) is the relationship between a control and what it controls. Good mapping makes the connection obvious without any labels. Bad mapping forces you to memorise arbitrary rules.

Classic bad mapping: four stove burners arranged in a square, but the four knobs sit in a row. Which knob controls which burner? You have to read labels or guess. You burn your hand once and you learn. But you should not have to learn. The designer should have arranged the knobs in a square too, matching the layout of the burners.

Classic good mapping: a cooker where the knobs are arranged in the same shape as the burners. You look at the front-left burner, and your eye goes straight to the front-left knob. No guessing needed.

On screen: a settings page where the toggle for "dark mode" sits right next to the preview that shows dark mode. Mapping. A slider that moves left or right to control volume: moving right makes it louder, which matches how we think of "more." That is natural mapping.

| Design | Mapping quality | Why |
| --- | --- | --- |
| Stove knobs in a row for burners in a square | Bad | You must memorise which knob is which |
| Stove knobs mirroring the burner layout | Good | The position tells you immediately |
| Volume slider: right = louder | Good | Matches the mental picture of "more" |
| On/off toggle where "on" looks off visually | Bad | The state of the control contradicts its label |
| Image gallery: left arrow goes to next photo | Bad | Contradicts every other gallery on the web |

---

## Constraints

A **constraint** (Roman Urdu: ek had jo galat kaam karna mushkil ya namumkin bana de) limits what a user can do, so mistakes are harder to make. Constraints are not mean. They are kind. They protect the user from errors.

A date picker that only shows valid dates is a constraint. You cannot type February 30. A form that grays out the Submit button until all required fields are filled is a constraint. A file uploader that only accepts `.jpg` and `.png` is a constraint.

Physical constraints work too. A USB plug that only fits one way is a constraint. A car gear that only moves into reverse when you press a button first is a constraint. You cannot do the wrong thing by accident.

When you build an interface, ask: "What is the worst mistake a user could make here, and how can I make that mistake hard to trigger?"

---

## Mental models

A **mental model** (Roman Urdu: insaan ke zehan mein kisi cheez ke kaam karne ka tasavvur) is the picture someone carries in their head about how your system works. It may not match how your system actually works. When the mental model is wrong, the user is constantly surprised, and not in a good way.

People build mental models from experience. They have used dozens of apps, websites, and real-world objects before yours. They come in with expectations. Your job is to match those expectations or, if you must break them, to gently correct the model.

A few mental models everyone already has:

- The back arrow goes back.
- The trash icon deletes.
- Blue underlined text is a link.
- A magnifying glass icon opens a search.
- Swiping left on mobile often deletes or dismisses.

If you break one of these without a very good reason, people will make mistakes and blame themselves, when they should be blaming you.

---

## Blame the design, not the user

This is the single most important shift in this chapter. Read it twice.

**When a user makes the same mistake repeatedly, the design is broken, not the user.**

Designers who do not understand this say things like, "Users are stupid." Designers who do understand it say, "I made something confusing, I need to fix it."

This matters because it changes where you look for solutions. If you blame the user, you do nothing and the problem stays. If you blame the design, you find the broken affordance or the missing signifier and you fix it.

Norman calls this **human error** reframing. Most "human errors" are design errors.

| Old thinking | New thinking |
| --- | --- |
| "Users keep pressing the wrong button, they're not paying attention." | "The two buttons look too similar, I need to make the difference clearer." |
| "Users never read the instructions." | "If they need instructions to use it, the design is already failing." |
| "She always forgets her password here." | "The login flow adds too much friction, simplify it." |
| "He submitted the form without filling the address field." | "The field was not clearly marked as required, that is on me." |
| "They clicked Cancel instead of Confirm again." | "The two buttons are too close together and look the same, move and style them differently." |

---

## How usability reduces confusion

Usability (Roman Urdu: kitni asaani se koi system use ho sakta hai) is the measure of how well a design lets people reach their goals. A usable design reduces five things:

1. **Confusion:** the user always knows where they are and what to do next.
2. **Mental effort:** they do not have to think hard about how the interface works.
3. **Wasted time:** they find what they need quickly.
4. **Uncertainty:** after they act, they know it worked.
5. **Mistakes:** the design makes errors rare and recoverable.

You will never achieve all five perfectly. But keeping all five in mind while you build means your work gets better with every project.

---

### Try this

Pick any three of these sources: the apps on your phone, a website you use often, a TV remote, the stove or microwave at home, or a door in a building near you.

For each one, find one confusing moment. Then answer these questions about it:

1. What were you trying to do?
2. What did the object or screen signal to you?
3. What actually happened?
4. Which of Norman's six principles was missing or broken (affordance, signifier, feedback, mapping, constraint, mental model)?
5. How would you fix it in one sentence?

Write the answers in a notebook or a text file. Doing this once trains you to see design problems everywhere, and that skill makes you a better builder.

---

## Knowledge check

Think through these in your head. Do not look at the answers in the section above. If you cannot answer, scroll back and re-read that part.

1. What is the difference between an affordance and a signifier? Give one physical example of each.
2. A button on a website does something when clicked, but the page looks the same afterwards. Which Norman principle is broken?
3. Your stove has four burners in a square, but the knobs are in a row. What is wrong with the mapping?
4. A user keeps deleting items they did not mean to delete. A colleague says "the user is clumsy." What does Norman's human-error reframing say instead?

---

## What's next

You now have the vocabulary to talk about why things confuse people, and more importantly, to fix them. The next step is to look at how people actually scan and read screens, because they do not read the way you expect.

[Next lesson: 4.2 How people really use screens &rarr;](4-2-how-people-use-screens.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You do not need them to continue.

- **"The Design of Everyday Things"** by Don Norman. The book this lesson is built on. Read at least the first two chapters. It will permanently change how you see the world around you.
- **Nielsen Norman Group** at [nngroup.com](https://www.nngroup.com). The world's leading UX research organisation. Their free articles are some of the best writing on usability available anywhere.

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[affordance]: What an object or interface element lets you do with it. (Roman Urdu: kisi cheez ki woh salahiyat jo use istemal karne deti hai)
*[signifier]: The visible hint that tells you how to use something. (Roman Urdu: woh nishaan jo bataye ke kaise use karna hai)
*[feedback]: The signal from a system that your action was received and processed. (Roman Urdu: system ka jawab jo bataye ke kaam ho gaya)
*[mapping]: The relationship between a control and what it controls; good mapping makes the link obvious. (Roman Urdu: control aur uske kaam ka seedha rishta)
*[mental model]: The picture a person carries in their head about how a system works. (Roman Urdu: insaan ke zehan mein system ke kaam karne ka tasavvur)
*[constraint]: A design limit that makes certain mistakes hard or impossible to make. (Roman Urdu: woh had jo galat kaam karna mushkil bana de)
*[usability]: How well a design lets people reach their goals without confusion or wasted effort. (Roman Urdu: system ke asaani se istemal hone ki salahiyat)

??? note urdu "اردو میں مزید وضاحت"
    ڈیزائن کا مطلب صرف خوبصورت بنانا نہیں ہے۔ اچھا ڈیزائن وہ ہوتا ہے جو کسی بھی انسان کو اپنا کام آسانی سے کرنے دے، بغیر کسی الجھن یا غلطی کے۔ ڈان نارمن نے چھ اہم اصول بتائے ہیں۔ پہلا: ہر چیز کچھ کام کرنے دیتی ہے، اسے افورڈنس کہتے ہیں۔ دوسرا: ایک اشارہ ہونا چاہیے جو بتائے کہ اسے کیسے استعمال کریں، اسے سگنیفائر کہتے ہیں۔ تیسرا: جب آپ کوئی کام کریں تو سسٹم کو فوری جواب دینا چاہیے، اسے فیڈبیک کہتے ہیں۔ چوتھا: بٹن اور اس کا کام آپس میں منطقی طور پر ملنے چاہییں، اسے میپنگ کہتے ہیں۔ پانچواں: غلطی کرنا مشکل ہونا چاہیے، اسے کنسٹرینٹ کہتے ہیں۔ چھٹا: لوگ آپ کے سسٹم کے بارے میں جو سوچتے ہیں اسے ذہنی نقشہ کہتے ہیں۔ سب سے اہم بات یہ ہے کہ اگر کوئی صارف بار بار غلطی کرے تو قصور ڈیزائن کا ہے، صارف کا نہیں۔
