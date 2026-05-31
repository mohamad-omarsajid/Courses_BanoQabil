---
lesson_id: frontend.ch04.l03
title: "4.3 Information architecture and user flows"
chapter: 4
order: 3
estimated_minutes: 30
prerequisites:
  - frontend.ch04.l02
---

# 4.3 Information architecture and user flows

Most beginners can make a screen look nice. Very few can organise content so that a stranger opens the site, finds what they need, and finishes what they came to do. That gap is information architecture (Roman Urdu: website ki banavat, jisme content kaise rakha jaye). This lesson teaches you the thinking behind the structure, so you stop making sites that look good but leave people lost.

## What you'll know by the end

- What information architecture (IA) is and why it matters more than looks.
- How to group content, write clear labels, and show hierarchy.
- What navigation and discoverability mean, and how to test for both.
- What progressive disclosure is and when to use it.
- How to draw a user flow before you build anything.
- What card sorting is and why it is the fastest way to learn how users think.

---

## What is information architecture?

Information architecture (IA) is the work of organising and labelling content so people can find things and understand where they are. The word "architecture" is right because it is the same job as a building's floor plan. A good floor plan means you walk in and immediately know where the kitchen, bathroom, and stairs are. A good IA means you land on a site and immediately know where to go.

IA is invisible when it works. You only notice it when it breaks.

Three things make up good IA:

1. **Grouping.** Related things sit together. A menu that mixes "About us", "Our Products", and "Delete account" in a random order forces the user to read everything. Group by what the user wants to do, not by what your team built.
2. **Labelling.** Use the words your users use, not your internal jargon. A banking app that says "Initiate a remittance" when users say "Send money" has a labelling problem. The word itself is not wrong, it is just not their word.
3. **Hierarchy.** Not every piece of content is equally important. Primary content goes front and centre. Secondary content goes one level deeper. Tertiary content can hide until someone looks for it.

| Good label | Bad label | Why the bad one fails |
| --- | --- | --- |
| Send money | Initiate remittance | jargon the user never says |
| My orders | Order management | management is staff language |
| Help | Support portal | portal sounds like a door you need a pass for |
| Sign out | Terminate session | terminates sounds like the computer will explode |

---

## Navigation and discoverability

Navigation (Roman Urdu: website par idhar udhar jaane ka rasta) is how users move through your product. Discoverability (Roman Urdu: koi cheez bina kisi ke bataye dhoondhne ki salahiyat) is whether a user can find a feature without being told it exists.

A feature that exists but cannot be found without being told about it is, for most purposes, a feature that does not exist.

Three rules cover most navigation problems:

- **Keep the main menu short.** Seven items is a rough ceiling. Above that, people stop reading and start guessing.
- **Show where they are.** Breadcrumbs, highlighted nav items, and page titles all do this. A user who is lost will go back to the home page or leave. Showing location keeps them moving forward.
- **Never bury a primary action.** If the whole point of a screen is to pay, the Pay button must be obvious, not scrolled below a wall of text.

!!! tip "Test discoverability in five minutes"
    Ask one friend to open your site and find three things without any help. Do not say a word. Just watch where they click and where they stop. That five-minute test will show you more than hours of guessing.

---

## Site structure and hierarchy

Before you write one line of HTML, draw your site as a tree. The home page is the trunk. Main sections are primary branches. Sub-pages are smaller branches.

<figure markdown>
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-sitemap-title" style="max-width:100%;height:auto">
  <title id="svg-sitemap-title">A site map tree showing a Home page at the top, branching down to three sections: Products, About, and Help. Products branches to Catalogue and Compare. About branches to Team and Story. Help branches to FAQ and Contact.</title>
  <defs>
    <marker id="ia-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="270" y="10" width="140" height="36" rx="6"/>
    <rect x="60" y="100" width="120" height="36" rx="6"/>
    <rect x="270" y="100" width="120" height="36" rx="6"/>
    <rect x="490" y="100" width="120" height="36" rx="6"/>
    <rect x="10" y="210" width="100" height="32" rx="6"/>
    <rect x="120" y="210" width="100" height="32" rx="6"/>
    <rect x="245" y="210" width="100" height="32" rx="6"/>
    <rect x="355" y="210" width="100" height="32" rx="6"/>
    <rect x="455" y="210" width="100" height="32" rx="6"/>
    <rect x="565" y="210" width="100" height="32" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="340" y="33">Home</text>
    <text x="120" y="123">Products</text>
    <text x="330" y="123">About</text>
    <text x="550" y="123">Help</text>
    <text x="60" y="231">Catalogue</text>
    <text x="170" y="231">Compare</text>
    <text x="295" y="231">Team</text>
    <text x="405" y="231">Story</text>
    <text x="505" y="231">FAQ</text>
    <text x="615" y="231">Contact</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="270" y1="28" x2="180" y2="100"/>
    <line x1="340" y1="46" x2="330" y2="100"/>
    <line x1="410" y1="28" x2="490" y2="100" marker-end="url(#ia-arrow)"/>
    <line x1="180" y1="28" x2="120" y2="100" marker-end="url(#ia-arrow)"/>
    <line x1="330" y1="46" x2="330" y2="100" marker-end="url(#ia-arrow)"/>
    <line x1="120" y1="136" x2="60" y2="210" marker-end="url(#ia-arrow)"/>
    <line x1="120" y1="136" x2="170" y2="210" marker-end="url(#ia-arrow)"/>
    <line x1="330" y1="136" x2="295" y2="210" marker-end="url(#ia-arrow)"/>
    <line x1="330" y1="136" x2="405" y2="210" marker-end="url(#ia-arrow)"/>
    <line x1="550" y1="136" x2="505" y2="210" marker-end="url(#ia-arrow)"/>
    <line x1="550" y1="136" x2="615" y2="210" marker-end="url(#ia-arrow)"/>
  </g>
</svg>
<figcaption>A simple site map. Home is the root. Three main sections branch off it. Each section has two sub-pages. Drawing this before building prevents you from burying important pages three clicks deep.</figcaption>
</figure>

Drawing a tree like this takes ten minutes and prevents a common mistake: building pages in the order you thought of them, which is never the order users expect.

---

## Progressive disclosure

Progressive disclosure (Roman Urdu: pehle sirf zaroori cheezein dikhao, baqi baad mein) means showing only what the user needs right now, and revealing more when they ask for it. The goal is to avoid overwhelming someone with every option and every detail on the first screen.

A familiar example: a short product card on a listing page shows the photo, name, and price. When you click, the full detail page shows sizes, reviews, delivery date, return policy, and technical specs. The listing page is not hiding information to be sneaky. It is making a choice: here is enough to decide whether to look further. Everything else is one step away.

??? note urdu "اردو میں مزید وضاحت"
    انفارمیشن آرکیٹیکچر کا مطلب ہے کہ ویب سائٹ پر مواد کو اس طرح ترتیب دو کہ لوگ آسانی سے تلاش کر سکیں۔ پروگریسو ڈسکلوژر کا مطلب ہے پہلے صرف ضروری چیزیں دکھاؤ، اور باقی چیزیں تب دکھاؤ جب صارف مانگے۔ یوزر فلو وہ قدم بہ قدم راستہ ہے جو کوئی شخص اپنا کام مکمل کرنے کے لیے اٹھاتا ہے۔ یہ سب چیزیں مل کر ویب سائٹ کو سمجھنے اور استعمال کرنے میں آسان بناتی ہیں۔

<figure markdown>
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-disclosure-title" style="max-width:100%;height:auto">
  <title id="svg-disclosure-title">Progressive disclosure shown as a compact card on the left that expands to a full detail view on the right. The compact card shows photo, name, and price only. The expanded view adds size options, reviews, delivery info, and a large call-to-action button.</title>
  <defs>
    <marker id="ia-arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="20" width="200" height="220" rx="8"/>
  </g>
  <g fill="#6b6b65">
    <rect x="36" y="36" width="168" height="100" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" fill="#1f1f1c">
    <text x="36" y="158" font-size="14" font-weight="600">Blue Shirt</text>
    <text x="36" y="178" font-size="13">Rs 1,200</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1" fill="#1f1f1c">
    <rect x="36" y="192" width="168" height="28" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" fill="#ffffff" text-anchor="middle">
    <text x="120" y="211" font-size="13">View details</text>
  </g>
  <g font-family="Inter, sans-serif" fill="#6b6b65" text-anchor="middle">
    <text x="120" y="252" font-size="11">Compact card</text>
  </g>
  <g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#ia-arrow2)">
    <line x1="225" y1="130" x2="278" y2="130"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="285" y="20" width="375" height="220" rx="8"/>
  </g>
  <g fill="#6b6b65">
    <rect x="300" y="36" width="140" height="100" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" fill="#1f1f1c">
    <text x="455" y="56" font-size="14" font-weight="600">Blue Shirt</text>
    <text x="455" y="76" font-size="13">Rs 1,200</text>
    <text x="455" y="100" font-size="12" fill="#6b6b65">Size: S  M  L  XL</text>
    <text x="455" y="120" font-size="12" fill="#6b6b65">4.5 stars (120 reviews)</text>
    <text x="300" y="162" font-size="12" fill="#6b6b65">Delivery in 2-3 days</text>
    <text x="300" y="180" font-size="12" fill="#6b6b65">Free returns within 7 days</text>
    <text x="300" y="198" font-size="12" fill="#6b6b65">100% cotton, machine wash</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1" fill="#1f1f1c">
    <rect x="300" y="210" width="345" height="18" rx="4"/>
  </g>
  <g font-family="Inter, sans-serif" fill="#ffffff" text-anchor="middle">
    <text x="472" y="223" font-size="11">Add to cart</text>
  </g>
  <g font-family="Inter, sans-serif" fill="#6b6b65" text-anchor="middle">
    <text x="472" y="252" font-size="11">Full detail page</text>
  </g>
</svg>
<figcaption>Progressive disclosure in action. The compact card shows enough to spark interest. One click reveals the full detail. Nothing is hidden permanently, only deferred until the user is ready.</figcaption>
</figure>

The opposite of progressive disclosure is dumping everything on screen at once. This is why some government portals are hard to use. Every link, every form field, and every warning is visible at the same time, and the user has to hunt for what they actually need.

---

## User flows

A user flow (Roman Urdu: woh qadam ba qadam rasta jo user apna kaam poora karne ke liye uthata hai) is the sequence of steps a person takes to complete one goal. You draw the flow before you build the screens.

Here is the flow for ordering food from an app:

**Browse menu -> Pick an item -> Add to cart -> Enter address -> Choose payment -> Review order -> Confirm**

That looks simple. But when you draw it with decision points, gaps appear. What if the user is not logged in when they tap "Confirm"? What if their saved address is wrong? What if payment fails?

<figure markdown>
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-userflow-title" style="max-width:100%;height:auto">
  <title id="svg-userflow-title">A user flow diagram for ordering food. The user browses the menu and picks an item. A decision diamond asks: logged in? If yes, they go to cart then address then payment then confirmation. If no, they are sent to the login screen and then return to cart.</title>
  <defs>
    <marker id="ia-arrow3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="140" width="100" height="36" rx="6"/>
    <rect x="165" y="140" width="100" height="36" rx="6"/>
    <rect x="350" y="140" width="100" height="36" rx="6"/>
    <rect x="490" y="140" width="100" height="36" rx="6"/>
    <rect x="560" y="240" width="100" height="36" rx="6"/>
    <rect x="420" y="240" width="100" height="36" rx="6"/>
    <rect x="280" y="240" width="100" height="36" rx="6"/>
    <rect x="140" y="240" width="100" height="36" rx="6"/>
  </g>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <polygon points="310,130 350,158 310,186 270,158"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#1f1f1c" text-anchor="middle">
    <text x="70" y="163">Browse</text>
    <text x="215" y="163">Pick item</text>
    <text x="310" y="163">Logged in?</text>
    <text x="400" y="163">Cart</text>
    <text x="540" y="163">Address</text>
    <text x="610" y="263">Payment</text>
    <text x="470" y="263">Review</text>
    <text x="330" y="263">Confirm</text>
    <text x="190" y="263">Login</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="360" y="145">Yes</text>
    <text x="295" y="200">No</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#ia-arrow3)">
    <line x1="120" y1="158" x2="163" y2="158"/>
    <line x1="265" y1="158" x2="252" y2="158"/>
    <line x1="215" y1="158" x2="268" y2="158"/>
    <line x1="350" y1="158" x2="330" y2="158"/>
    <line x1="350" y1="158" x2="398" y2="158" marker-end="url(#ia-arrow3)"/>
    <line x1="450" y1="158" x2="488" y2="158" marker-end="url(#ia-arrow3)"/>
    <line x1="590" y1="158" x2="618" y2="240" marker-end="url(#ia-arrow3)"/>
    <line x1="608" y1="258" x2="522" y2="258" marker-end="url(#ia-arrow3)"/>
    <line x1="420" y1="258" x2="382" y2="258" marker-end="url(#ia-arrow3)"/>
    <line x1="280" y1="258" x2="242" y2="258" marker-end="url(#ia-arrow3)"/>
    <line x1="310" y1="186" x2="190" y2="240" marker-end="url(#ia-arrow3)"/>
    <line x1="190" y1="240" x2="350" y2="158"/>
  </g>
</svg>
<figcaption>A basic user flow for ordering food. The decision diamond at "Logged in?" reveals a branch. Without drawing this first, it is easy to build all the happy-path screens and forget the login detour entirely.</figcaption>
</figure>

Drawing the flow first, before touching any design tool, does three things:

1. It shows missing steps. "What happens if the payment card fails?" is a question you ask on paper, not in production.
2. It shows redundant steps. If the user has to confirm the same address twice, you see that on the flow and remove one.
3. It gives you a checklist. When you build the screens, every box in the flow is a screen you need to make.

| Good user flow | Bad user flow |
| --- | --- |
| One clear goal per flow | Multiple unrelated goals mixed in |
| Decision points have both branches drawn | Happy path only, error states missing |
| Steps are in the user's language | Steps name internal components |
| Short and achievable in one session | So long the user gives up halfway |

---

## Card sorting

Card sorting (Roman Urdu: card sorting mein log khud batate hain ke kaunsi cheezein ek saath honi chahiye) is a research method where you write each piece of content on a card and ask real users to group the cards into categories that make sense to them. Then you name each group.

You do this before you finalise the menu. The result tells you how users think about your content, not how your team thinks about it. It takes about thirty minutes per person and reveals grouping problems that no amount of internal discussion will catch.

You do not need special software. Paper cards and a table are enough.

!!! tip "Try a five-card sort today"
    Pick five pages from any app you use. Write each on a sticky note. Ask a friend to sort them into groups and name each group. Compare their groups to the app's actual menu. You will almost always find at least one mismatch.

---

### Try this

Pick one real task: booking a bus ticket, paying a utility bill, or ordering groceries.

On paper, draw the user flow from the moment the user opens the app to the moment the task is fully done. Include at least one decision diamond (for example: "Already have an account?"). Make sure both branches of the diamond go somewhere.

Then write the menu labels you would use for the main sections of that app. Write them in the words the user would say, not in jargon.

Compare your flow to the real app if one exists. Count how many steps you drew versus how many steps the real app takes.

---

## Knowledge check

Do not write anything down. Answer in your head. Scroll back if you cannot.

1. What three things make up good information architecture?
2. What is the difference between navigation and discoverability?
3. In one sentence, what does progressive disclosure do?
4. What is a user flow, and why do you draw it before building screens?
5. What does card sorting tell you that internal team discussion does not?

---

## What's next

You can now structure information before you design a single screen. The next lesson covers accessibility, which is how you make sure every user, including those using screen readers or keyboard navigation, can actually use what you build.

[Next lesson: 4.4 Accessibility from day one &rarr;](4-4-accessibility.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You do not need them to continue.

- *Information Architecture for the Web and Beyond* by Peter Morville, Louis Rosenfeld, and Jorge Arango. The definitive book on the subject, very readable, with real examples throughout.
- [Nielsen Norman Group: Navigation Design](https://www.nngroup.com/topic/navigation-ia/) covers mental models, mega-menus, and mobile navigation patterns with research backing.
- [Nielsen Norman Group: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) explains when to hide details and when hiding them hurts more than helps.

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[information architecture]: Organising and labelling content so people can find things and understand where they are. (Roman Urdu: content ko tarteeb se rakhna taake log asani se dhoondh sakein)
*[navigation]: The paths and menus that let users move through a site or app. (Roman Urdu: site ke andar idhar udhar jaane ke raaste)
*[discoverability]: Whether a user can find a feature without being told it exists. (Roman Urdu: koi cheez bina kisi ke bataye dhoondhne ki salahiyat)
*[progressive disclosure]: Showing only what the user needs now and revealing more on demand. (Roman Urdu: pehle sirf zaroori cheezein dikhao, baqi baad mein)
*[user flow]: The step-by-step path a person takes to complete one goal. (Roman Urdu: kisi kaam ko mukammal karne ke liye uthaye jaane wale qadam)
*[hierarchy]: The order of importance that decides what goes front and centre versus what sits deeper. (Roman Urdu: kaunsi cheez zyada ahem hai aur kaunsi kam, us hisaab se jagah dena)
*[card sorting]: A method where users group content cards to show how they naturally think about your content. (Roman Urdu: logon se cards ko groups mein daalne ki practice jo batati hai ke woh kaise sochte hain)
