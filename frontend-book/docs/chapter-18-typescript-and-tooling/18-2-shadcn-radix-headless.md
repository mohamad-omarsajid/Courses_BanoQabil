---
lesson_id: frontend.ch18.l02
title: "18.2 shadcn/ui, Radix, Headless UI"
chapter: 18
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch18.l01
---

# 18.2 shadcn/ui, Radix, Headless UI

Building good components by hand takes time. A dropdown must handle the keyboard, focus, and screen readers. A modal must trap focus and close on Escape. Component libraries do this hard work for you, and this lesson shows you the smart ones.

## What you'll know by the end

- What shadcn/ui, Radix UI, and Headless UI are.
- How unstyled libraries differ from styled ones like MUI.
- Why shadcn/ui copies code into your project instead of installing a package.
- How to init shadcn/ui in a Next.js app and add a component.
- How to theme shadcn/ui with CSS variables in one place.
- How to build a small accessible form with shadcn primitives.

---

## Two kinds of component libraries

There are two main styles of component library, and they work in very different ways.

The first kind is **styled**. You install it, and you get buttons and menus that already look a certain way. Material UI (MUI) is the famous example. It follows Google's Material design. You install it and theme it, but you do not own the source code. You change it through its theme system, not by editing the files.

The second kind is **unstyled**. Radix UI and Headless UI give you the behavior with no looks at all. A Radix dropdown handles keyboard arrows, focus, and screen readers. But it has no colors, no padding, and no font. You add all of that yourself with Tailwind.

Tailwind UI is a different thing again. It is a paid set of ready made HTML and React snippets you copy. It is not a behavior library like Radix.

!!! tip
    Unstyled accessible libraries like Radix and Headless UI handle the hard keyboard and focus work for you. You just add the Tailwind looks on top. You get strong accessibility without writing tricky logic yourself.

---

## How the headless idea works

The word "headless" means the logic and accessibility exist, but the visual head (colors, padding, fonts) does not. You attach your own styles.

<figure markdown>
<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-headless-title" style="max-width:100%;height:auto">
  <title id="svg-headless-title">The headless concept: a Radix component has a logic and accessibility layer that you cannot see, but no styles. You add a Tailwind style layer on top to produce the final visible component.</title>
  <defs>
    <marker id="arr-hl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="20"  y="30"  width="200" height="60" rx="8" fill="#f4f4f1"/>
    <rect x="20"  y="120" width="200" height="60" rx="8" fill="#e8f4f0"/>
    <rect x="380" y="75"  width="260" height="60" rx="8" fill="#ffffff"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <g font-size="14" font-weight="600" fill="#1f1f1c">
      <text x="120" y="56">Radix / Headless UI</text>
      <text x="120" y="76">Logic + Accessibility</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="120" y="98">keyboard, focus, ARIA roles</text>
      <text x="120" y="115">No colors. No padding.</text>
    </g>
    <g font-size="14" font-weight="600" fill="#0d7a5f">
      <text x="120" y="146">Your Tailwind Classes</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="120" y="166">bg-white rounded px-4 py-2</text>
      <text x="120" y="183">text-sm font-medium ...</text>
    </g>
    <g font-size="14" font-weight="700" fill="#1f1f1c">
      <text x="510" y="100">Final visible</text>
      <text x="510" y="120">component</text>
    </g>
    <g font-size="12" fill="#6b6b65">
      <text x="510" y="140">Accessible + styled</text>
    </g>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arr-hl)">
    <line x1="235" y1="105" x2="375" y2="105"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="305" y="96">combine</text>
  </g>
</svg>
<figcaption>A headless library provides the logic and accessibility. You add your own Tailwind classes for the look. Both layers join to form a finished, accessible component.</figcaption>
</figure>

---

## Library comparison

Choosing a library is a real decision. Here is how the main options compare.

| Library | Styled out of the box? | You own the code? | Based on | Best for |
| --- | --- | --- | --- | --- |
| MUI (Material UI) | Yes, Material Design look | No, lives in node_modules | React | Teams that want a full ready look fast |
| Ant Design | Yes, Ant Design look | No, lives in node_modules | React | Enterprise-style admin dashboards |
| Radix UI | No, no styles at all | No, lives in node_modules | React | Building your own design system on accessible primitives |
| Headless UI | No, no styles at all | No, lives in node_modules | React + Vue | Projects using Tailwind CSS |
| shadcn/ui | Yes, Tailwind styles | Yes, copied into your project | Radix + Tailwind | Projects wanting accessible components they can fully edit |
| Tailwind UI | Yes, polished snippets | Yes, you paste the HTML | HTML + React | Teams that buy ready snippets |

The key difference: MUI and Ant Design are opinionated about looks. Radix and Headless UI give behavior only. shadcn/ui sits in the middle: it has Tailwind styles, but you own the files.

(Roman Urdu: MUI mein design already hota hai, tum sirf theme se bahar se badal sakte ho. Radix mein koi look nahi, sirf behavior. shadcn/ui mein Tailwind look hai aur files tumhari hain, yaani poora control tumhare paas hai.)

---

## Where shadcn/ui fits

shadcn/ui is built on top of Radix UI and Tailwind. But it works in a new way.

shadcn/ui is **not** an npm component library. You do not install it as a package and import from it. Instead, you run a command, and it **copies** the component files straight into your own project. After that, the files are yours. You can read them, edit them, and change them however you like.

Compare this to MUI. With MUI, the source lives inside `node_modules`. You import a `Button` and theme it from the outside. You cannot easily rewrite how it works. With shadcn/ui, the `Button` file sits in your `components` folder. If you want a new look or new behavior, you just edit the file.

So shadcn/ui gives you the Radix behavior, the Tailwind styles, and full ownership of the code.

!!! note "Did you know"
    shadcn/ui copies code into your project, so you own it and can change anything. This is different from a normal package, where the code hides in `node_modules` and you only theme it from outside.

??? note urdu "اردو میں مزید وضاحت"
    عام لائبریری جیسے MUI کو آپ انسٹال کرتے ہیں اور اس کا کوڈ آپ کے پاس نہیں ہوتا، صرف node_modules میں چھپا رہتا ہے۔ shadcn/ui اس سے مختلف ہے۔ یہ ایک کمانڈ چلانے پر کمپوننٹ کی فائلیں سیدھا آپ کے پروجیکٹ میں نقل کر دیتا ہے۔ اس کا مطلب ہے کہ وہ فائلیں اب آپ کی اپنی ہیں اور آپ انہیں جیسے چاہیں بدل سکتے ہیں۔ Headless کا مطلب ہے کہ component کا logic اور accessibility موجود ہے، لیکن کوئی visual style نہیں ہے۔ آپ Tailwind سے خود style لگاتے ہیں۔ یوں آپ کو Radix کا محفوظ رویہ اور Tailwind کا لُک ملتا ہے، اور پورا کنٹرول بھی آپ کے ہاتھ میں رہتا ہے۔

---

## Installing shadcn/ui in a Next.js project

Open your Next.js project in the terminal. First you run the init command.

```bash
npx shadcn@latest init
```

This sets up shadcn/ui in your project. It asks a few questions, like which base color you want. Then it adds the config and the CSS variables for your theme. You only run this once per project.

Next you add the components you need, one at a time.

```bash
npx shadcn@latest add button
```

This copies the `Button` component into your project, usually into `components/ui/button.tsx`. The file is now part of your codebase. You can open it and read every line.

You add more pieces the same way, for example `npx shadcn@latest add input label`. Each command drops the files into your project. Nothing stays hidden in a black box.

---

## Theming with CSS variables

shadcn/ui sets your colors as CSS variables. These live in your global CSS file in one place. You change a few values there, and the whole app updates.

```tsx
// app/globals.css (part of it)
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
}
```

Each variable holds a color. The components read these variables through Tailwind. So if you change `--primary` to a new color, every button and link that uses the primary color changes too. You edit one line instead of hunting through many files.

This is why theming feels easy. The colors are defined once, and the whole project follows them.

---

## Building a small accessible form

Now let's build a tiny sign in form. It uses the shadcn `Input`, `Label`, and `Button` primitives. These are accessible by default, so the label links to the input and the keyboard works.

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  return (
    <form className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}
```

Look at the `htmlFor="email"` on the label and the matching `id="email"` on the input. This links them, so clicking the label focuses the input. Screen readers read them together. The `Button` already has good focus styles and keyboard support.

You did not write any of that hard accessibility logic. shadcn/ui and Radix gave it to you, and you can still edit the files anytime.

---

### Try this

In a Next.js project, run `npx shadcn@latest init`, then `npx shadcn@latest add button input label`. Build the small sign in form above. Open `components/ui/button.tsx` and read it, since the code is now yours. Then change `--primary` in your global CSS and watch the button color change across the app.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does an unstyled library like Radix give you, and what does it leave to you?
2. How is shadcn/ui different from a normal npm package like MUI?
3. After you run `npx shadcn@latest add button`, where does the button code live?
4. How does shadcn/ui let you change your app colors in one place?

---

## What's next

You now know how to add ready made, accessible components and own the code. Next you make sure your code keeps working as you change it. In 17.3 you learn testing with Vitest, so your app does not break by surprise.

[Next lesson: 17.3 Testing with Vitest &rarr;](18-3-testing-vitest-rtl.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [shadcn/ui docs](https://ui.shadcn.com/docs)
- [Radix UI primitives](https://www.radix-ui.com/primitives)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[shadcn/ui]: A set of components built on Radix and Tailwind that you copy into your own project. (Roman Urdu: aisi components jo aap apne project mein copy karte hain)
*[Radix UI]: An unstyled library that gives accessible component behavior with no looks. (Roman Urdu: behavior deta hai magar koi style nahi)
*[Headless UI]: An unstyled component library from the Tailwind team that handles behavior and accessibility. (Roman Urdu: bina style ke accessible components)
*[unstyled component]: A component that has behavior but no colors or styling, so you add your own. (Roman Urdu: jis component ka koi look na ho)
*[CSS variable]: A named value in CSS you set once and reuse, like a theme color. (Roman Urdu: CSS mein ek naam wali value jo baar baar use hoti hai)
*[component library]: A package of ready made UI parts like buttons and menus. (Roman Urdu: tayar shuda UI hisson ka package)
