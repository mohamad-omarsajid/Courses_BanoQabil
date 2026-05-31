---
lesson_id: frontend.ch00.l01
title: "0.1 Your Computer & The Internet"
chapter: 0
order: 1
estimated_minutes: 35
---

# 0.1 Your Computer & The Internet

Before you write a single line of code, you need to be at home on your computer
and your keyboard. This lesson is the ground floor. By the end you can type with
more confidence, find and name your files, recognise the common file types you
will meet, open a web browser, and explain in plain words how the internet brings
a web page to your screen.

*(Roman Urdu: Is sabaq ke baad tum behtar type kar sako ge, apni files dhoond aur
naam de sako ge, aam file types pehchaan sako ge, browser khol sako ge, aur bata
sako ge ke internet kaise ek page tumhari screen tak laata hai.)*

## What you'll know by the end

- Why typing well matters, and where to practise your speed
- What a file and a folder are
- What a file extension is, and the common ones like `.jpg`, `.png`, and `.pdf`
- What a web browser is
- How the web works, from the address you type to the page you see

---

## Start with your keyboard

You are going to spend years typing. So the first skill, before any code, is
typing without staring at the keys. This feels slow now and it pays you back
every single day later.

Three simple habits build it:

1. Keep both hands on the **home row** (Roman Urdu: keyboard ke beech wali line jahan ungliyan aaram se rehti hain). That is `a s d f` for the left hand and `j k l ;` for the right.
2. Look at the screen, not at your fingers. It is harder at first and worth it.
3. Go for accuracy first. Speed comes on its own once your fingers know the keys.

You do not need to be fast to code. You need to be steady. A comfortable 30 to 40
**words per minute** (Roman Urdu: ek minute mein kitne lafz type karte ho) with
few mistakes is plenty to begin.

A few minutes a day is enough. These free sites teach you and measure your speed:

- [TypingClub](https://www.typingclub.com) teaches you from zero, one key at a time. Best if you are brand new.
- [Monkeytype](https://monkeytype.com) and [TypingTest.com](https://www.typingtest.com) measure your words per minute and accuracy. Good once you want to get faster.

!!! tip "Five minutes a day"
    Do one short typing drill before each study session. In a few weeks you will
    stop hunting for keys, and writing code will feel much smoother.

---

## Files and folders

A **file** (Roman Urdu: ek cheez jo computer par save hoti hai, jaise ek photo
ya note) is one saved thing. A photo is a file. A song is a file. The code you
write will be a file too.

A **folder** (Roman Urdu: ek dabba jis mein files rakhi jati hain) holds files. You
put files inside folders so you can find them later. A folder can also hold
other folders.

Think of it like a cupboard. The cupboard is the folder. The clothes inside are
the files.

!!! tip "Make your first folders now"
    On your computer, open the Desktop. Right click, choose **New > Folder**,
    and name it `banoqabil`. Open it, and make one more folder inside called
    `chapter-0`. You will keep your work here.

---

## File extensions

Every file name has two parts. The name, then a dot, then a short word. That
short word is the **extension** (Roman Urdu: file ke naam ke baad ka chhota
hissa jo batata hai file kis type ki hai). It tells the computer what kind of
file this is and which program should open it.

Look at `photo.jpg`. The name is `photo`. The extension is `jpg`, so the computer
knows it is a picture. Change the extension and you change how the computer
treats the file.

Here are the common ones you will meet again and again:

| Type | Extensions | What they hold |
| --- | --- | --- |
| Documents | `.txt`, `.docx`, `.pdf` | plain text, Word documents, fixed-layout files for sharing |
| Images | `.jpg`, `.png`, `.gif`, `.svg`, `.webp` | photos, graphics, logos, simple animations |
| Audio and video | `.mp3`, `.mp4` | sound and video |
| Code (you will write these) | `.html`, `.css`, `.js` | web pages, their styling, and their behaviour |
| Bundles | `.zip` | many files squeezed into one, to send or store |

A few of these are worth knowing now:

- **`.jpg`** is small and great for photos. **`.png`** keeps sharp edges and can have a see-through background, so it suits logos and screenshots.
- **`.svg`** is special. It is a picture made of code, so it stays sharp at any size, from a tiny icon to a billboard. You will make these later in the course.
- **`.html`**, **`.css`**, and **`.js`** are the three files behind almost every website. You will write thousands of them.

!!! warning "Turn on file extensions"
    Windows hides extensions by default. Open any folder, click **View**, and
    turn on **File name extensions**. Now you can see the `.html` part. You need
    this for the whole course.

---

## What is a browser?

A **browser** (Roman Urdu: woh app jisse tum websites dekhte ho, jaise Chrome ya
Firefox) is the program you use to open websites. Chrome, Firefox, Edge, and
Safari are all browsers.

When you build a website, you will open your file in a browser to see it. The
browser reads your code and shows the page.

We will use **Google Chrome** in this course because it is free and works the
same on most computers.

---

## How the web works

Here is a simple picture. You do not need every detail today, just the shape of
it. You type an address, called a **URL** (Roman Urdu: website ka pata, jaise
`banoqabil.org`), and a page comes back.

<figure markdown>
<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-web-title" style="max-width:100%;height:auto">
  <title id="svg-web-title">A browser window with an address bar holding a URL, and the four-step journey of a web request: you type the address, DNS turns the name into a number, the server sends the site files, and your browser draws the page.</title>
  <g font-family="Inter, sans-serif">
    <!-- browser window mockup -->
    <rect x="235" y="20" width="350" height="150" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <line x1="235" y1="46" x2="585" y2="46" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="255" cy="33" r="5.5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="271" cy="33" r="5.5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="287" cy="33" r="5.5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="255" y="54" width="310" height="22" rx="11" fill="#ffffff" stroke="#6b6b65" stroke-width="1.5"/>
    <rect x="255" y="92" width="120" height="12" rx="3" fill="#6b6b65"/>
    <line x1="255" y1="120" x2="565" y2="120" stroke="#6b6b65" stroke-width="1"/>
    <line x1="255" y1="136" x2="565" y2="136" stroke="#6b6b65" stroke-width="1"/>
    <line x1="255" y1="152" x2="470" y2="152" stroke="#6b6b65" stroke-width="1"/>
    <rect x="15" y="226" width="175" height="64" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="215" y="226" width="175" height="64" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="415" y="226" width="175" height="64" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <rect x="615" y="226" width="175" height="64" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif" text-anchor="middle">
    <text x="410" y="69" font-size="13" fill="#1f1f1c">https://banoqabil.org</text>
    <text x="410" y="194" font-size="12" fill="#6b6b65">The bar at the top is the address bar. The web address (URL) goes there.</text>
    <text x="102" y="255" font-size="15" font-weight="600" fill="#1f1f1c">1. You type</text>
    <text x="102" y="275" font-size="12" fill="#6b6b65">banoqabil.org</text>
    <text x="302" y="255" font-size="15" font-weight="600" fill="#1f1f1c">2. DNS</text>
    <text x="302" y="275" font-size="12" fill="#6b6b65">name to number</text>
    <text x="502" y="255" font-size="15" font-weight="600" fill="#1f1f1c">3. Server</text>
    <text x="502" y="275" font-size="12" fill="#6b6b65">sends the files</text>
    <text x="702" y="255" font-size="15" font-weight="600" fill="#1f1f1c">4. Browser</text>
    <text x="702" y="275" font-size="12" fill="#6b6b65">draws the page</text>
    <text x="410" y="320" font-size="12" fill="#6b6b65">From the address you type to the page you see, the whole trip takes under a second.</text>
  </g>
  <defs>
    <marker id="bq-arrow-web" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-web)">
    <line x1="190" y1="258" x2="213" y2="258"/>
    <line x1="390" y1="258" x2="413" y2="258"/>
    <line x1="590" y1="258" x2="613" y2="258"/>
  </g>
</svg>
<figcaption>You type a URL in the address bar. DNS turns that name into a number address, the server at that address sends back your files, and the browser draws the page. All in under a second.</figcaption>
</figure>

Step by step, here is what happens:

1. You type an address like `banoqabil.org` into your browser and press Enter.
2. Your browser asks, "Where does this live?" A kind of phone book called **DNS** (Roman Urdu: internet ki phone book jo naam ko address mein badalti hai) gives back a number address.
3. Your browser sends a request to that address. A computer far away, called a **server** (Roman Urdu: ek bara computer jo websites rakhta hai aur bhejta hai), sends back the page files.
4. Your browser reads those files and draws the page on your screen.

That whole trip happens in under a second. Every time you open a website, this is
what is going on quietly in the background.

!!! tip "tl;dr"
    Practise typing a little each day. Files hold your work, folders hold your
    files, and the extension tells the computer what a file is. A browser shows
    websites. The internet is your browser asking a far-away server for a page,
    and getting it back.

??? success "Urdu mein chhoti wazahat"
    Pehle typing par thori mehnat karo, roz thora. File ek saved cheez hai, aur
    folder ek dabba hai jisme files hoti hain. Extension (jaise `.jpg` ya `.html`)
    batata hai file kis type ki hai. Browser woh app hai jisse websites dikhti
    hain. Aur internet aise kaam karta hai: tum URL likhte ho, DNS us naam ko
    address mein badalta hai, server files bhejta hai, aur browser page bana deta
    hai.

## Try this

In your `chapter-0` folder, make three folders named `practice`, `images`, and
`notes`. Inside `notes`, make a text file called `day-one.txt` and write one
line: what you hope to build by the end of this course. Save it, then close the
folder and find it again. That last step is the real exercise. Knowing where
your work lives is a skill you will use every single day.

## Knowledge check

1. What is the difference between a file and a folder?
2. In `index.html`, which part is the extension?
3. Name one image extension and one code extension.
4. Name two web browsers.
5. In one sentence, what does a server do?

## What's next

You can find your way around your computer and your keyboard now. Next you will
learn the everyday office and search tools that working developers lean on more
than beginners expect: documents, spreadsheets, and how to search Google like a
professional.

[Next lesson: 0.2 Word, Excel & Google Search →](0-2-word-excel-google.md){ .next-lesson }

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [TypingClub](https://www.typingclub.com) free, full typing course from the first key.
- [MDN - How does the internet work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
- [MDN - Dealing with files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files)

<!-- The Mark Complete button is injected here automatically by the site template. -->
