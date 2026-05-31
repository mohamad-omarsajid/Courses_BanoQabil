---
lesson_id: frontend.ch20.l02
title: "20.2 Build your portfolio"
chapter: 20
order: 2
estimated_minutes: 50
prerequisites:
  - frontend.ch20.l01
---

# 20.2 Build your portfolio

In 19.1 you planned your portfolio. Now you build it. You will use the same stack you learned in this course, so nothing here is new. You just put the pieces together into one site that shows who you are.

## What you'll know by the end

- How to build each portfolio section with Next.js and Tailwind.
- How to reuse one project card component for every project.
- How to add light motion with Framer Motion or GSAP.
- What MDX is and how to write project case studies with it.
- How to make a contact form that sends real email with Resend.
- How to keep the site fast and respect reduced motion.

---

## The stack you already know

You do not need new tools. Build the portfolio with this stack:

- **Next.js + Tailwind** for the pages and styling.
- **Framer Motion or GSAP** for small, tasteful motion.
- **React Three Fiber** for one optional 3D touch, only if it fits.

Pick one motion library, not both. Keep the 3D touch small, like a slow rotating shape in the hero. A heavy 3D scene slows the site and hurts you. Start a fresh Next.js project.

```bash
npx create-next-app@latest my-portfolio
cd my-portfolio
npm run dev
```

This makes a new app and starts the dev server. Open the local URL in your browser. You now have a blank page to build on.

---

## Portfolio sections checklist

Before you start coding each section, use this table. It tells you what belongs in each piece, what to skip, and the common mistake that trips up beginners.

| Section | Must have | Skip | Common mistake |
| --- | --- | --- | --- |
| Hero | Name, one-line role, one CTA button | Long bio, skills list | Too much text; hero should be 5 seconds to read |
| About | 3 to 5 warm sentences, current goal | Job history, buzzwords | Stiff CV language; write like you talk |
| Projects | Image, title, one-line problem, tech tags, live link, repo link | Half-built demos | Too many projects; three strong ones beat ten weak ones |
| Contact | Email, GitHub, LinkedIn | Long contact form with many fields | Making it hard to reach you; keep it simple |
| Footer | Name, year, 3 quick links | Excessive navigation | Copying the full header nav; footer should be light |

---

## The anatomy of a great project card

A project card is the main unit of your Projects section. Every detail on it has a purpose. Here is what a strong card contains and why each part is there:

<figure markdown>
<svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-card-anatomy" style="max-width:100%;height:auto">
  <title id="svg-card-anatomy">Anatomy of a portfolio project card: screenshot at top, then title, one-line problem statement, tech tags row, and two buttons at the bottom for live link and repo link.</title>
  <g fill="#ffffff" stroke="currentColor" stroke-width="1.5">
    <rect x="40" y="20" width="400" height="300" rx="10"/>
  </g>
  <g fill="#6b6b65" stroke="none">
    <rect x="60" y="40" width="360" height="110" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" fill="#ffffff">
    <text x="240" y="102" font-size="13">Screenshot or preview image</text>
    <text x="240" y="118" font-size="11" fill="#c5c5c0">(shows the real app; no placeholder art)</text>
  </g>
  <g font-family="Inter, sans-serif" fill="#1f1f1c">
    <text x="60" y="178" font-size="15" font-weight="700">Weather app for Pakistani cities</text>
    <text x="60" y="198" font-size="12" fill="#6b6b65">Lets a user search any city and see live temperature</text>
    <text x="60" y="198" font-size="12" fill="#6b6b65"/>
  </g>
  <g fill="#f4f4f1" stroke="currentColor" stroke-width="1">
    <rect x="60" y="210" width="50" height="22" rx="11"/>
    <rect x="118" y="210" width="60" height="22" rx="11"/>
    <rect x="186" y="210" width="70" height="22" rx="11"/>
    <rect x="264" y="210" width="60" height="22" rx="11"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="11" fill="#1f1f1c">
    <text x="85" y="225">React</text>
    <text x="148" y="225">Tailwind</text>
    <text x="221" y="225">Next.js</text>
    <text x="294" y="225">Vercel</text>
  </g>
  <g fill="#1f1f1c" stroke="none">
    <rect x="60" y="268" width="100" height="32" rx="6"/>
    <rect x="172" y="268" width="100" height="32" rx="6" fill="#ffffff" stroke="currentColor" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle" font-size="12">
    <text x="110" y="289" fill="#ffffff">Live link</text>
    <text x="222" y="289" fill="#1f1f1c">GitHub repo</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65">
    <text x="345" y="172" text-anchor="start">2. Title</text>
    <text x="345" y="192" text-anchor="start">3. Problem line</text>
    <text x="345" y="214" text-anchor="start">4. Tech tags</text>
    <text x="280" y="318" text-anchor="start">5. Buttons</text>
  </g>
  <defs>
    <marker id="bq-card-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1" fill="none" marker-end="url(#bq-card-arrow)">
    <line x1="342" y1="168" x2="420" y2="158"/>
    <line x1="342" y1="188" x2="420" y2="180"/>
    <line x1="342" y1="210" x2="420" y2="210"/>
    <line x1="275" y1="315" x2="270" y2="302"/>
  </g>
</svg>
<figcaption>Every element on a project card has a purpose: the screenshot lets a reviewer see the work instantly; the one-line problem shows you understood the goal; tech tags let them know your tools; the two buttons give easy next steps.</figcaption>
</figure>

---

## The hero

The hero is the first thing people see. Keep it simple. Show your name, one line on what you do, and one call to action.

```jsx
export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6">
      <h1 className="text-5xl font-bold">Ayesha Khan</h1>
      <p className="mt-4 text-xl text-gray-600">
        I build fast, accessible websites with React and Next.js.
      </p>
      <a
        href="#projects"
        className="mt-8 inline-block rounded bg-black px-6 py-3 text-white"
      >
        See my work
      </a>
    </section>
  );
}
```

Your name is big. One line says what you do. The button sends people to your projects. That is all a hero needs.

!!! warning
    Keep hero motion light and respect prefers-reduced-motion. A flashy portfolio that lags on a phone loses you the job. Most hiring managers open your site on their phone first. Test it there.

---

## About

The about section is a short, warm paragraph. Write like you talk. Say what you enjoy and what you want to do next. Keep it to four or five sentences.

```jsx
export default function About() {
  return (
    <section className="px-6 py-20">
      <h2 className="text-3xl font-bold">About me</h2>
      <p className="mt-4 max-w-2xl text-gray-700">
        I am a front-end developer from Karachi. I love turning designs into
        clean, fast pages. I am always learning new tools and ideas. Right now
        I am looking for my first full-time role.
      </p>
    </section>
  );
}
```

Notice the line about always learning. That is honest and it matters.

!!! note "A note on talab al-ilm"
    This course ends, but learning does not. The web changes every year, and the
    best developers keep studying. Talab al-ilm, the seeking of knowledge, is a
    lifelong path. Say in your About section that you are always learning. It is
    true, and employers respect it.

---

## Projects

Your projects are the heart of the portfolio. Build one card component and reuse it for every project. This is the same idea as the ProductCard from Chapter 10.

```jsx
export default function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border p-4">
      <img
        src={project.image}
        alt={project.title}
        className="rounded"
      />
      <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{project.problem}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <li key={tag} className="rounded bg-gray-100 px-2 py-1 text-sm">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4">
        <a href={project.live} className="underline">Live link</a>
        <a href={project.repo} className="underline">Repo</a>
      </div>
    </article>
  );
}
```

Each card shows an image, a title, a one-line problem statement (Roman Urdu: masla kya tha), the stack tags, a live link, and a repo link. You pass in one `project` object and the card draws itself. Then you map over your projects list to show them all.

!!! tip
    Reuse one ProjectCard component for every project, just like the ProductCard from Chapter 10. If you want to change the card style later, you edit one file and every project updates.

---

## MDX for project case studies

A simple card is good, but a case study tells the full story. For that, use MDX. MDX is Markdown plus React components. So you write your project writeup in plain Markdown, then drop in live components where you want them.

Next.js supports MDX. You can show a working demo button right next to your text. Here is a small MDX file.

```jsx
# How I built the weather app

I started with the API and a simple fetch. Here is a live demo
you can click right inside the writeup:

<WeatherDemo />

The hardest part was caching the results to keep it fast.
```

The `# heading` and the paragraphs are normal Markdown. The `<WeatherDemo />` is a real React component. This lets you explain your work and let people try it at the same time.

??? note urdu "اردو میں مزید وضاحت"
    ایم ڈی ایکس کا مطلب ہے مارک ڈاؤن کے ساتھ ری ایکٹ کمپوننٹ۔ آپ اپنے پراجیکٹ کی کہانی عام مارک ڈاؤن میں لکھتے ہیں۔ پھر جہاں چاہیں وہاں ایک زندہ ری ایکٹ کمپوننٹ شامل کر دیتے ہیں۔ اس طرح لوگ آپ کا کام پڑھ بھی سکتے ہیں اور چلا کر بھی دیکھ سکتے ہیں۔ نیکسٹ جے ایس اس کو آسانی سے سپورٹ کرتا ہے۔ پراجیکٹ کارڈ میں ایک لائن کا مسئلہ لکھنا بہت ضروری ہے، اس سے دیکھنے والے کو فوری سمجھ آتا ہے کہ آپ نے کیا بنایا اور کیوں بنایا۔

---

## Contact form with Resend

A contact form is useless if the messages never reach you. Use Resend to send real email. Resend has a free tier. You write a server action or API route that takes the form and emails it to you.

First install the package.

```bash
npm install resend
```

This adds the Resend library to your project. Next, write the handler. Here is a sketch of an API route.

```jsx
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, message } = await request.json();

  await resend.emails.send({
    from: "portfolio@yourdomain.com",
    to: "you@example.com",
    subject: `New message from ${name}`,
    text: `${message} (reply to ${email})`,
  });

  return Response.json({ ok: true });
}
```

The route reads the name, email, and message from the form. Then it calls Resend to send you an email. Keep your API key in an environment variable, never in the code. Your form on the page posts to this route.

---

## Footer and speed

The footer is small. Add your name, the year, and links to your GitHub and LinkedIn. That is enough.

Now think about speed. Recall Chapter 19. Compress your images. Lazy load anything heavy. Keep motion light and short. Respect `prefers-reduced-motion`, which you learned in 11.4, so people who turn off animation get a calm page.

```jsx
import { useReducedMotion } from "framer-motion";

function FadeIn({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
```

When `reduce` is true, the element just appears with no fade. This respects the user setting and keeps the site kind to everyone.

---

### Try this

Start a fresh Next.js project with `create-next-app` and build the hero and projects sections. Write a single `ProjectCard` component that takes a `project` object, then map over an array of your 3 real projects to render them all. Make sure each card has a `problem` field with one clear sentence about what the project solves. Style it with Tailwind and check that it looks good on a narrow phone width. If you add any motion, wire up `useReducedMotion` so the page stays calm for people who turn animation off.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why do you build one ProjectCard component instead of writing each card by hand?
2. What is MDX, and what does it let you add to a Markdown writeup?
3. Why do you keep your Resend API key in an environment variable?
4. What does respecting prefers-reduced-motion do for your visitors?

---

## What's next

Your portfolio works, but it is not done. Next you polish the small details and write a README that makes people want to hire you. Good polish is what turns a fine portfolio into one that wins interviews.

[Next lesson: 19.3 Polish and the README that wins interviews &rarr;](20-3-polish-readme-loom.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Next.js: MDX](https://nextjs.org/docs/app/guides/mdx)
- [Resend: Next.js](https://resend.com/docs/send-with-nextjs)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[MDX]: Markdown that can also use React components inside it. (Roman Urdu: Markdown jisme React components bhi chalte hain)
*[Resend]: An email service that sends real email from your code, with a free tier. (Roman Urdu: ek email service jo aapke code se asli email bhejti hai)
*[server action]: A function that runs on the server, often used to handle a form. (Roman Urdu: server par chalne wala function, aksar form ke liye)
*[project card]: One reusable component that shows a single project on your portfolio. (Roman Urdu: ek reusable component jo aik project dikhata hai)
