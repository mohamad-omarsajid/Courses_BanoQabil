---
lesson_id: frontend.ch02.l03
title: "2.3 Text, lists, links, and images"
chapter: 2
order: 3
estimated_minutes: 30
prerequisites:
  - frontend.ch02.l02
---

# 2.3 Text, lists, links, and images

In lesson 2.2 you built your first HTML page with headings and paragraphs. Now you will give that text real meaning and structure. You will mark words as important, build neat lists, add links to other pages, and show images. By the end your page will feel like a real web page, not just a wall of text.

## What you'll know by the end

- How to mark text as important with `<strong>` and stressed with `<em>`.
- How to build ordered and unordered lists, and when to pick each one.
- How to link to other websites and to your own files.
- How to add images with good `alt` text and a fixed size.
- The difference between block elements and inline elements.

---

## Text emphasis: strong and em

Sometimes a word in your text matters more than the rest. HTML has two tags for this.

```html
<p>This is <strong>very important</strong> to read.</p>
<p>I said the <em>blue</em> button, not the red one.</p>
```

`<strong>` means the text is important. The browser usually shows it in bold. `<em>` means you stress the word when you speak it. The browser usually shows it in italic.

The key idea is meaning, not looks. These tags tell the browser and screen readers that the word carries weight. Do not use them just to make text bold or italic for style. You will learn the styling way (CSS) in a later chapter.

---

## Line breaks: use them sparingly

A `<br>` tag forces a line break inside text. It has no closing tag.

```html
<p>Roses are red,<br>violets are blue.</p>
```

This is useful for things like a postal address or a short poem. Do not use `<br>` to create space between paragraphs. For separate ideas, use separate `<p>` tags instead. Spacing is a job for CSS, not for stacking many `<br>` tags.

---

## Lists: ordered and unordered

Lists turn a group of items into a clean, readable block.

An unordered list uses `<ul>`. Each item sits inside an `<li>` tag. The browser shows a bullet point.

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

An ordered list uses `<ol>`. It also uses `<li>` for each item. The browser shows numbers instead of bullets.

```html
<ol>
  <li>Open your editor</li>
  <li>Write the HTML</li>
  <li>Open the file in a browser</li>
</ol>
```

Pick based on meaning. Use `<ul>` when the order does not matter, like a list of skills. Use `<ol>` when the order matters, like the steps in a recipe.

---

## Links: the anchor tag

A link uses the anchor tag `<a>`. The `href` attribute holds the address you want to go to.

```html
<a href="https://banoqabil.pk">Visit Bano Qabil</a>
<a href="about.html">About us</a>
```

The first link uses an absolute URL. That is the full address, starting with `https://`, to another website. Use it when you link outside your own site.

The second link uses a relative URL. That points to a file inside your own folder. Here `about.html` sits next to your current file. Use relative URLs to link between your own pages.

You can also open a link in a new browser tab. Add `target="_blank"`.

```html
<a href="https://banoqabil.pk" target="_blank">Open in a new tab</a>
```

This is nice for outside links, so the reader does not leave your page.

??? note urdu "اردو میں مزید وضاحت"
    لنک کے دو طریقے ہوتے ہیں۔ مطلق پتہ (absolute URL) پوری ایڈریس ہوتی ہے جو https سے شروع ہوتی ہے اور کسی دوسری ویب سائٹ کی طرف لے جاتی ہے۔ متعلقہ پتہ (relative URL) صرف فائل کا نام ہوتا ہے جو آپ کے اپنے فولڈر میں موجود ہے، جیسے about.html۔ جب آپ اپنی ویب سائٹ کے صفحات کو آپس میں جوڑیں تو متعلقہ پتہ استعمال کریں۔ جب کسی باہر کی سائٹ کا لنک دیں تو مطلق پتہ استعمال کریں۔ اگر فائل کا راستہ غلط ہو تو لنک کام نہیں کرے گا۔

!!! warning "Common mistake: broken relative paths"
    If your file is in a different folder, a plain name like `about.html` will not work. The browser looks for that file next to the current page. Always check that the file really sits where your `href` points.

---

## Images: the img tag

An image uses the `<img>` tag. It has no closing tag. The `src` attribute holds the path to the image file.

```html
<img src="team-photo.jpg" alt="Our team standing in front of the office" width="600" height="400">
```

The `src` works like an `href`. It can be a relative path to a file in your folder, or a full URL to an image online.

The `alt` attribute holds text that describes the image. This text matters for three reasons. Screen readers read it aloud for users who cannot see. The browser shows it if the image fails to load. Search engines read it to understand your page.

The `width` and `height` set the size of the image. When you set them, the browser saves the right amount of space before the image loads. This stops the page from jumping around. That jump is called layout shift, and your readers will thank you for avoiding it.

!!! tip "Write alt text that describes the image"
    Good alt text says what the image shows, like "A red bicycle leaning on a wall". Do not write "image" or "photo". Also download and shrink large images before you use them, so your page loads fast.

---

## Block elements vs inline elements

Every element behaves in one of two ways on the page.

A block element starts on a new line and takes the full width available. Headings (`<h1>`), paragraphs (`<p>`), lists (`<ul>`), and list items (`<li>`) are block elements. They stack on top of each other.

An inline element sits inside the text flow and takes only the space it needs. `<strong>`, `<em>`, `<a>`, and `<img>` are inline elements. They sit beside other content on the same line.

```html
<p>You can <strong>bold</strong> a word and add a <a href="about.html">link</a> in one line.</p>
```

Here the paragraph is a block. The `<strong>` and `<a>` are inline, so they live inside the same line of text. Knowing this difference helps you predict how your page will lay out.

---

## Try this

Build a small image gallery to practice. Create a page with three images. After each image, add a short paragraph as its caption.

```html
<h1>My Gallery</h1>

<img src="photo-1.jpg" alt="A sunset over the sea" width="400" height="300">
<p>Sunset at the beach near Karachi.</p>

<img src="photo-2.jpg" alt="A green mountain trail" width="400" height="300">
<p>A hiking trail in the north.</p>

<img src="photo-3.jpg" alt="A busy city street at night" width="400" height="300">
<p>City lights after dark.</p>
```

Save the three images in the same folder as your HTML file. Open the file in your browser and check that all three show with their captions.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What is the difference between `<strong>` and `<em>` in meaning?
2. When would you use `<ol>` instead of `<ul>`?
3. What is the difference between an absolute URL and a relative URL?
4. Name two reasons why `alt` text on an image matters.

---

## What's next

You can now structure text, lists, links, and images on a page. Next you will let users send information back to you. Lesson 2.4 covers forms and inputs, like text boxes and buttons.

[Next lesson: 2.4 Forms and inputs &rarr;](2-4-forms-and-inputs.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [web.dev: Learn HTML, Images](https://web.dev/learn/html/images)
- [web.dev: Learn HTML, Lists](https://web.dev/learn/html/lists)
- [web.dev: Learn HTML, Links](https://web.dev/learn/html/links)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[anchor]: The `<a>` tag that creates a link to another page or site. (Roman Urdu: link banane wala tag)
*[attribute]: Extra info inside a tag, like href or alt, written as name="value". (Roman Urdu: tag ke andar di gayi maloomat)
*[absolute URL]: A full web address starting with https that points to another site. (Roman Urdu: poora pata jo https se shuru hota hai)
*[relative URL]: A short path to a file inside your own folder. (Roman Urdu: apne folder ki file ka chhota pata)
*[alt text]: Text that describes an image for screen readers and broken images. (Roman Urdu: tasveer ka likha hua bayan, jo nabina log sunte hain aur jo tab dikhta hai jab tasveer load na ho)
*[block element]: An element that starts on a new line and takes the full width. (Roman Urdu: nayi line se shuru hone wala element)
*[inline element]: An element that sits inside the text flow on the same line. (Roman Urdu: text ke beech baithne wala element)
