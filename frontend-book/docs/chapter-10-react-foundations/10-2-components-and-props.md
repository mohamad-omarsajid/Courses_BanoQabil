---
lesson_id: frontend.ch10.l02
title: "10.2 Components and props"
chapter: 10
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch10.l01
---

# 10.2 Components and props

In 10.1 you built your first component. It returned some JSX and showed on screen. But that component always showed the same thing. Real apps need components that change based on data. Props are how you pass that data in.

## What you'll know by the end

- Write a function component and know why its name starts with a capital letter.
- Pass data into a component using props, just like HTML attributes.
- Read props by destructuring them in the function parameter.
- Pass strings, numbers, booleans, arrays, and objects as props.
- Turn an array into a list of components with `.map()` and a `key`.
- Build one `<ProductCard>` and show six cards from it.

---

## Function components, a quick recap

A component is just a function. It returns JSX. Its name starts with a capital letter.

```jsx
function Greeting() {
  return <h1>Hello there</h1>;
}
```

That is the whole idea. You call this component by writing `<Greeting />` in your JSX. React runs the function and puts the returned JSX on the page.

The capital letter matters. React treats `<greeting />` as a plain HTML tag. It treats `<Greeting />` as your component. So always capitalize component names.

---

## A component tree

Real apps are not one component. They are many components nested inside each other, like a tree. The top component is the root. It holds other components, which hold their own children.

<figure markdown>
<svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-comp-tree" style="max-width:100%;height:auto">
  <title id="svg-comp-tree">A component tree: App at the top, with Navbar, Hero, and CardList as children. CardList has three Card children.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="240" y="10" width="120" height="36" rx="6"/>
    <rect x="40" y="100" width="100" height="36" rx="6"/>
    <rect x="240" y="100" width="100" height="36" rx="6"/>
    <rect x="440" y="100" width="100" height="36" rx="6"/>
    <rect x="340" y="210" width="90" height="36" rx="6"/>
    <rect x="445" y="210" width="90" height="36" rx="6"/>
    <rect x="550" y="210" width="90" height="36" rx="6" stroke-dasharray="0"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="300" y="34">App</text>
    <text x="90" y="124">Navbar</text>
    <text x="290" y="124">Hero</text>
    <text x="490" y="124">CardList</text>
    <text x="385" y="234">Card</text>
    <text x="490" y="234">Card</text>
    <text x="595" y="234">Card</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="10" fill="#6b6b65" text-anchor="middle">
    <text x="300" y="60">root component</text>
    <text x="385" y="264">same component,</text>
    <text x="385" y="276">different data</text>
  </g>
  <g stroke="#1f1f1c" stroke-width="1" fill="none">
    <line x1="300" y1="46" x2="300" y2="80"/>
    <line x1="90" y1="80" x2="490" y2="80"/>
    <line x1="90" y1="80" x2="90" y2="100"/>
    <line x1="290" y1="80" x2="290" y2="100"/>
    <line x1="490" y1="80" x2="490" y2="100"/>
    <line x1="490" y1="136" x2="490" y2="190"/>
    <line x1="385" y1="190" x2="595" y2="190"/>
    <line x1="385" y1="190" x2="385" y2="210"/>
    <line x1="490" y1="190" x2="490" y2="210"/>
    <line x1="595" y1="190" x2="595" y2="210"/>
  </g>
</svg>
<figcaption>App is the root. It holds Navbar, Hero, and CardList. CardList holds three Card components, each with its own data. One Card component, reused three times.</figcaption>
</figure>

This tree shape is the mental model for every React app you will build. When you need to add a feature, you think: which component owns it, and which component needs the data?

---

## Props are the data you pass in

Right now `Greeting` always says the same thing. Let us make it greet a real person. You pass data using attributes, like in HTML.

```jsx
function App() {
  return <Greeting name="Ali" />;
}
```

Here `name="Ali"` is a prop (Roman Urdu: component ko bahar se bheja gaya data). The word "props" is short for "properties". Props are the inputs to your component. You decide what props a component takes, and you give them any name you like.

You can pass more than one prop.

```jsx
<Greeting name="Sara" city="Karachi" />
```

---

## Props flow one direction

Props always travel from parent to child. A child cannot push data back up to the parent through props. This one-way flow makes the app easier to understand.

<figure markdown>
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-props-flow" style="max-width:100%;height:auto">
  <title id="svg-props-flow">Props flow from parent to child in one direction only. The parent passes name and age down. The child reads them but cannot change them.</title>
  <g fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="140" y="20" width="180" height="60" rx="8"/>
    <rect x="140" y="150" width="180" height="60" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="230" y="46">Parent: App</text>
    <text x="230" y="63">name="Sara"  age={21}</text>
    <text x="230" y="176">Child: Greeting</text>
    <text x="230" y="193">reads: name, age</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="310" y="116">props flow down</text>
    <text x="150" y="116">cannot go back up</text>
  </g>
  <defs>
    <marker id="arr-props" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
    <marker id="arr-block" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#6b6b65"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#arr-props)">
    <line x1="230" y1="82" x2="230" y2="148"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#arr-block)">
    <line x1="230" y1="148" x2="230" y2="84"/>
  </g>
</svg>
<figcaption>Props travel in one direction: parent to child. The child can read them and show them. The child cannot change them. If you need to change data, that is state, which you will meet in lesson 10.3.</figcaption>
</figure>

---

## Props vs HTML attributes

Props look like HTML attributes. They are not exactly the same. The table below shows the key differences.

| Situation | HTML attribute | React prop |
| --- | --- | --- |
| Pass a string | `class="card"` | `className="card"` |
| Pass a number | not possible | `age={21}` |
| Pass a boolean (true) | `disabled` (just the word) | `isAdmin={true}` or just `isAdmin` |
| Pass a boolean (false) | not possible | `isAdmin={false}` |
| Pass an object or array | not possible | `user={userObj}` |
| Pass a function | not possible | `onClick={handleClick}` |

The most important pattern: strings go in quotes, everything else goes in curly braces.

---

## Reading props inside the component

React collects all the props into one object. It passes that object as the first argument to your function. People usually call it `props`.

```jsx
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}
```

So `props.name` reads the value you passed. If you wrote `<Greeting name="Ali" />`, then `props.name` is `"Ali"`. The curly braces inside the JSX let you drop a value into the markup.

There is a cleaner way. You can destructure the props right in the parameter. You pull out just the names you want.

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

This does the same job. Now you write `name` instead of `props.name`. With many props this stays much easier to read.

!!! tip
    Destructure your props in the function parameter, like `function Greeting({ name, city })`. Your code gets shorter and you can see at a glance what data the component needs.

---

## Props are read-only

A component must never change its own props. Props come from the parent. The parent owns that data. Your job is to read it and show it.

```jsx
function Greeting({ name }) {
  name = "someone else"; // do not do this
  return <h1>Hello {name}</h1>;
}
```

The code above breaks the rule. Treat every prop like a sealed gift box. You can look at what is inside. You do not repackage it. If a value needs to change over time, that is state, and you will meet state in 10.3.

!!! warning
    Never change a prop inside a component. Props are read-only. If you want data that changes, use state instead. Also, if React prints a "missing key" warning in the console, it means a list item needs a stable `key`. You will see why below.

---

## Passing different data types

A string goes in quotes. Everything else goes in curly braces. The curly braces tell JSX "this is JavaScript, not text".

```jsx
function App() {
  const hobbies = ["coding", "cricket"];
  const user = { id: 1, role: "student" };

  return (
    <Profile
      name="Bilal"
      age={21}
      isActive={true}
      hobbies={hobbies}
      user={user}
    />
  );
}
```

Look at each one. `name` is a string, so it uses quotes. `age={21}` is a number. `isActive={true}` is a boolean. `hobbies` is an array and `user` is an object. All non-string values sit inside curly braces.

If you wrote `age="21"`, React would treat it as the text "21", not the number 21. So use curly braces when you mean real JavaScript values.

---

## The children prop

There is one special prop called `children`. It holds whatever you put between the open and close tags.

```jsx
function Box({ children }) {
  return <div className="box">{children}</div>;
}

function App() {
  return (
    <Box>
      <p>This text is the children.</p>
    </Box>
  );
}
```

The `<p>` lives between `<Box>` and `</Box>`. React passes it to `Box` as `children`. This is how you wrap content. A card, a popup, or a button can all use `children` to hold whatever you place inside.

---

## Rendering lists with map and key

Most apps show a list of things. You do not write each one by hand. You take an array and turn it into an array of components. The `.map()` method does this.

```jsx
function NameList() {
  const names = ["Ali", "Sara", "Hina"];

  return (
    <ul>
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}
```

`.map()` runs once for each item. Each run returns one `<li>`. So three names give three list items. React then shows them all.

Notice the `key`. Each item in a list needs a `key` prop. A key is a stable, unique id for that item. React uses the key to track which item is which. When the list changes, React knows what to add, remove, or keep. Without a key, React prints a warning and may update the wrong items.

Do not use the array index as the key when the list can change. If items get added, removed, or reordered, the index points at the wrong item. Use a real id from your data instead, like a product id.

| Key choice | Works? | When to use |
| --- | --- | --- |
| `key={item.id}` | Best | Use when your data has a real unique id |
| `key={item.name}` | Good | Use when names are guaranteed unique and stable |
| `key={index}` | Acceptable | Only when the list never changes order or length |
| No key | Bad | Never; React will warn you and may behave oddly |

??? note urdu "اردو میں مزید وضاحت"
    کمپوننٹ ایک فنکشن ہوتا ہے جو ڈیٹا لیتا ہے۔ یہ ڈیٹا props کہلاتا ہے، اور آپ اسے HTML کی attributes کی طرح بھیجتے ہیں۔ Props ہمیشہ ایک طرف جاتے ہیں: parent سے child تک۔ Child انہیں صرف پڑھ سکتا ہے، بدل نہیں سکتا۔ جب آپ ایک array کو list میں بدلتے ہیں، تو ہر آئٹم کو ایک key دینا ضروری ہے۔ Key ایک مستقل اور منفرد پہچان ہوتی ہے جس سے React جان لیتا ہے کہ کون سا آئٹم کون سا ہے۔

---

## Composing components

You can put components inside other components. This is called composition. A `<Card>` can hold a `<Button>` inside it.

```jsx
function Button({ label }) {
  return <button>{label}</button>;
}

function Card({ title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <Button label="Buy now" />
    </div>
  );
}
```

`Card` uses `Button` just like a normal tag. You build small pieces, then snap them together. This keeps each component simple and easy to fix.

---

## Pure components

A good component is pure. Pure means the same props always give the same output. It does not change anything outside itself while rendering.

```jsx
function Total({ price, qty }) {
  return <p>Total: {price * qty}</p>;
}
```

Give this component `price={100}` and `qty={2}`, and it always shows 200. It does not edit a global variable. It does not mess with other parts of the page. That is what pure means.

Pure components are easy to trust. You always know what they will do. React also runs faster when your components behave this way.

---

## Real-world example: ProductCard

Let us bring it together. You will build one `<ProductCard>` component. Then you will show six products from a single array. You write the card once. The data does the rest.

```jsx
function ProductCard({ name, price, inStock }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Rs {price}</p>
      <p>{inStock ? "In stock" : "Sold out"}</p>
    </div>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 1200, inStock: true },
    { id: 2, name: "Keyboard", price: 2500, inStock: true },
    { id: 3, name: "USB Cable", price: 300, inStock: false },
    { id: 4, name: "Laptop Stand", price: 1800, inStock: true },
    { id: 5, name: "Webcam", price: 4000, inStock: false },
    { id: 6, name: "Headphones", price: 3500, inStock: true },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}
```

Read it from the bottom up. `products` is an array of six objects. Each object has an `id`, `name`, `price`, and `inStock`. The `.map()` turns each object into one `<ProductCard>`.

Each card gets a `key={product.id}`. The id is unique and stable, so it is a perfect key. The card itself reads three props and shows them. The `inStock ? ... : ...` part picks the text based on the boolean.

One component, six cards. If tomorrow you add a seventh product to the array, a seventh card appears on its own. That is the power of components and props working together.

### Try this

Build a small `<StudentCard>` component that takes three props: `name`, `course`, and `passed` (a boolean). Show the name and course, and below them show "Passed" or "Not yet" based on `passed`. Then make an array of four students with an `id` on each, and use `.map()` to show four cards. Remember to give each card a `key={student.id}`.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why must a component name start with a capital letter?
2. What is the cleaner way to read props, instead of writing `props.name` everywhere?
3. Why does React want a `key` on each item in a mapped list, and why avoid the array index?
4. What does it mean for a component to be pure?

---

## What's next

You can now pass data into components and render lists from arrays. But your components are still static. They cannot react to a click or a typed value yet. In 10.3 you will add state and events, so your components can change and respond to the user.

[Next lesson: 10.3 State and events &rarr;](10-3-state-and-events.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [react.dev: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [react.dev: Rendering Lists](https://react.dev/learn/rendering-lists)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[component]: A function that returns JSX and shows on screen. (Roman Urdu: ek function jo page ka ek hissa banata hai aur usay baar baar istemal kiya ja sakta hai)
*[props]: The data you pass into a component, written like HTML attributes. (Roman Urdu: woh data jo aap component ko bahar se bhejte hain taake woh har baar alag cheez dikha sake)
*[destructuring]: Pulling values out of an object or props right in the parameter. (Roman Urdu: object ya props se zaroori values seedha nikaal lena taake naam chota ho jaye)
*[children]: A special prop holding content placed between a component's open and close tags. (Roman Urdu: tags ke darmiyan rakha gaya content)
*[key]: A stable unique id given to each item in a list. (Roman Urdu: list ke har item ki pehchaan)
*[pure component]: A component where the same props always give the same output, with no side effects. (Roman Urdu: aisa component jo same props par same nateeja deta hai)
*[composition]: Putting components inside other components to build bigger UI from small pieces. (Roman Urdu: chhote components ko milaa kar bara UI banana)
