---
lesson_id: frontend.ch17.l04
title: "17.4 React Three Fiber and Drei"
chapter: 17
order: 4
estimated_minutes: 45
prerequisites:
  - frontend.ch17.l03
---

# 17.4 React Three Fiber and Drei

In the last three lessons you wrote Three.js by hand. You made a scene, a camera, and a render loop yourself. That works, but it feels different from React. In this lesson you write 3D as React components, and a library does the boring setup for you.

## What you'll know by the end

- What React Three Fiber (R3F) is and why it fits React.
- How to install R3F and drei.
- How `<Canvas>` builds the scene, camera, and renderer for you.
- How to write a mesh as JSX with geometry and material inside.
- How to animate each frame with the `useFrame` hook.
- How to use drei helpers like `OrbitControls`, `useGLTF`, and `Environment`.

---

## The R3F mental model

React Three Fiber is just Three.js for React. You already know Three.js objects like meshes, geometry, and materials. R3F lets you write those same objects as JSX components.

In plain Three.js you give orders step by step. You create a scene, add a mesh, then call `render` in a loop. That is imperative code.

In R3F you describe the scene instead. You say what is in it, and R3F builds it. R3F also runs the render loop for you, every frame. So you write less setup code and more "what I want."

The key idea: a `<mesh>` JSX tag becomes a real Three.js mesh under the hood. Same engine, friendlier code.

Here is the same spinning box written both ways side by side, so you can see exactly what R3F removes:

| Task | Plain Three.js | React Three Fiber |
| --- | --- | --- |
| Create the scene | `const scene = new THREE.Scene()` | Automatic inside `<Canvas>` |
| Create the camera | `new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)` | Automatic inside `<Canvas>` |
| Create the renderer | `new THREE.WebGLRenderer()` + `setSize()` + `appendChild` | Automatic inside `<Canvas>` |
| Add a mesh | `scene.add(new THREE.Mesh(geo, mat))` | `<mesh><boxGeometry /><meshStandardMaterial /></mesh>` |
| Add a light | `scene.add(new THREE.AmbientLight(0xffffff, 0.5))` | `<ambientLight intensity={0.5} />` |
| Render loop | `requestAnimationFrame` + `renderer.render(scene, camera)` | Automatic, `useFrame` for per-frame logic |
| Orbit controls | Import + `new OrbitControls(camera, canvas)` + `controls.update()` | `<OrbitControls />` from drei |

The R3F version is shorter because the boilerplate runs inside the library. You write only the interesting parts.

---

## Install the packages

Open your terminal in your React project and run this.

```bash
npm install three @react-three/fiber @react-three/drei
```

That installs three things. `three` is the 3D engine you already used. `@react-three/fiber` is the React layer on top of it. `@react-three/drei` is a helper pack with ready made tools, so you do not rebuild common things by hand.

---

## The Canvas component

Everything 3D goes inside a `<Canvas>`. It comes from `@react-three/fiber`. The `<Canvas>` sets up the scene, the camera, and the WebGL renderer for you. You just put 3D objects inside it.

```jsx
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas>
        {/* 3D objects go in here */}
      </Canvas>
    </div>
  );
}
```

Give the wrapper a real width and height. A `<Canvas>` fills its parent box, so without a size you see nothing. Inside the `<Canvas>` you no longer think about renderers. You only think about what to show.

<figure markdown>
<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-r3f-tree" style="max-width:100%;height:auto">
  <title id="svg-r3f-tree">R3F component tree: a div wrapper at the top, then Canvas inside it, then inside Canvas are three children side by side: a mesh (which contains boxGeometry and meshStandardMaterial), ambientLight, and OrbitControls from drei.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="230" y="10"  width="180" height="44" rx="8"/>
    <rect x="230" y="90"  width="180" height="44" rx="8" fill="#f4f4f1"/>
    <rect x="30"  y="185" width="150" height="44" rx="8"/>
    <rect x="245" y="185" width="150" height="44" rx="8"/>
    <rect x="460" y="185" width="150" height="44" rx="8"/>
    <rect x="10"  y="275" width="110" height="40" rx="6"/>
    <rect x="130" y="275" width="110" height="40" rx="6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="320" y="38">div wrapper</text>
    <text x="320" y="118">Canvas</text>
    <text x="105" y="208">mesh</text>
    <text x="320" y="208">ambientLight</text>
    <text x="535" y="208">OrbitControls</text>
    <text x="65"  y="299">boxGeometry</text>
    <text x="185" y="299">meshStandard</text>
    <text x="185" y="311">Material</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="320" y="52">width + height CSS</text>
    <text x="320" y="132">scene, camera, renderer</text>
    <text x="105" y="222">position, ref</text>
    <text x="320" y="222">intensity</text>
    <text x="535" y="222">drei helper</text>
  </g>
  <defs>
    <marker id="r3f-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.3" fill="none" marker-end="url(#r3f-arr)">
    <line x1="320" y1="54"  x2="320" y2="83"/>
    <line x1="290" y1="134" x2="175" y2="178"/>
    <line x1="320" y1="134" x2="320" y2="178"/>
    <line x1="350" y1="134" x2="465" y2="178"/>
    <line x1="95"  y1="229" x2="65"  y2="268"/>
    <line x1="115" y1="229" x2="185" y2="268"/>
  </g>
</svg>
<figcaption>Everything 3D lives inside Canvas. Lights, meshes, and helpers like OrbitControls are siblings inside it. A mesh contains its geometry and material as children.</figcaption>
</figure>

---

## Declarative 3D with JSX

Remember a mesh in Three.js. It needs a geometry and a material. In R3F you write the mesh as a `<mesh>` tag. You nest the geometry and material inside it as children.

```jsx
import { Canvas } from "@react-three/fiber";

function Box() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Box />
    </Canvas>
  );
}
```

Read it like normal JSX. The `<mesh>` is the object. The `<boxGeometry>` is its shape, and `args` are the constructor numbers, here width, height, and depth. The `<meshStandardMaterial>` is its surface. The `position` prop sets the transform, the same as `mesh.position` in plain Three.js. The `<meshStandardMaterial>` needs light to show, so we add an `ambientLight` and a `directionalLight`.

??? note urdu "اردو میں مزید وضاحت"
    React Three Fiber میں آپ تھری ڈی منظر کو JSX کمپوننٹس کی شکل میں لکھتے ہیں۔ ایک `<mesh>` ٹیگ اصل میں ایک تھری جے ایس میش بن جاتا ہے۔ اس کے اندر `<boxGeometry>` شکل دیتی ہے اور `<meshStandardMaterial>` سطح کا رنگ اور انداز طے کرتی ہے۔ `position` جیسی پراپس آبجیکٹ کی جگہ مقرر کرتی ہیں، بالکل ویسے ہی جیسے سادہ تھری جے ایس میں۔ یوں آپ قدم بہ قدم حکم دینے کے بجائے صرف بتاتے ہیں کہ منظر میں کیا ہونا چاہیے۔ اینیمیشن کے لیے `useFrame` استعمال کریں اور `delta` سے ضرب کریں تاکہ ہر ڈیوائس پر رفتار برابر رہے۔ drei لائبریری تیار شدہ ہیلپرز دیتی ہے جیسے `OrbitControls` اور `Environment`، جن سے آپ کا کوڈ مختصر اور صاف رہتا ہے۔

---

## Animate with useFrame

R3F runs a render loop for you. The `useFrame` hook lets you run code on every single frame. You use it to animate objects, like spinning a box.

You need a `ref` on the mesh first. Then you change values on that ref inside `useFrame`.

```jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function SpinningBox() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
```

The `useFrame` callback runs about 60 times a second. The `delta` is the seconds since the last frame. Adding `delta` to the rotation gives smooth, steady spinning on every machine. You mutate `meshRef.current.rotation.y` directly. You do not use state for this.

The reason you use `delta` instead of a fixed number like `0.01` is that not every device runs at the same frame rate. A fast computer runs at 120 frames a second; a slow phone at 30. If you add `0.01` each frame, the box spins four times faster on the fast machine. If you multiply by `delta` (seconds since last frame), the total rotation per second is always the same on any device.

| Approach | Fast machine (120 fps) | Slow phone (30 fps) | Result |
| --- | --- | --- | --- |
| `rotation += 0.01` (fixed) | 1.2 rad/s | 0.3 rad/s | Inconsistent speed |
| `rotation += delta` (time-based) | 1 rad/s | 1 rad/s | Same speed everywhere |

!!! warning
    Animate inside `useFrame` by mutating a ref. Do not call `setState` every frame. State updates re-render your component, so 60 frames a second means 60 re-renders a second. That is slow and not needed. Mutating the ref changes the 3D object straight away with no re-render.

---

## Helpers from drei

The `@react-three/drei` library gives you ready made helpers. You import them and drop them in. Here are the ones you will use most.

```jsx
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  Stage,
  Text,
  useTexture,
} from "@react-three/drei";
```

- `OrbitControls` lets the user drag to rotate and scroll to zoom the camera.
- `useGLTF` loads a 3D model file in one line.
- `Environment` adds nice lighting and reflections from a preset, so you do not place many lights by hand.
- `Html` places normal HTML, like a label or button, at a point in 3D space.
- `Stage` gives you a clean default setup with good lighting and framing in one component.

The reason drei exists is that the same helpers get written in every R3F project. Instead of everyone writing their own orbit camera or environment setup, the drei team wrote one good version and published it. You focus on your scene, not on the plumbing.

| Helper | What it gives you | Typical use |
| --- | --- | --- |
| `OrbitControls` | Drag to rotate, scroll to zoom, no setup | Every interactive 3D scene |
| `useGLTF` | Loads a `.glb` model, returns `{ scene, animations }` | Showing any 3D model |
| `Environment` | HDRI lighting from a preset image, no lights to place | Realistic product lighting |
| `Html` | Renders regular HTML anchored to a 3D position | Tooltips, price tags, UI labels |
| `Stage` | Lighting, shadows, and camera framing in one component | Quick product viewers |
| `Text` | Renders 3D text as a mesh, any font | Labels, titles inside the scene |
| `useTexture` | Loads one or several image textures cleanly | Surface maps for meshes |
| `Bounds` | Auto-fits the camera to show your objects | Scenes where model size varies |
| `ContactShadows` | Soft flat shadow under objects, no light setup | Ground shadow on product shots |

!!! tip
    drei gives you ready helpers like `OrbitControls` and `Environment`. Do not rebuild camera controls or lighting setups by hand. The helpers are tested and short, so you write less code and get a better result.

Loading a model with `useGLTF` looks like this.

```jsx
import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/product.glb");
  return <primitive object={scene} />;
}
```

`useGLTF` reads the `.glb` file and gives you back its `scene`. The `<primitive>` tag drops any existing Three.js object straight into your JSX. That is how you show a loaded model.

---

## Combine R3F with GSAP and Framer Motion

You can still use the animation tools from earlier chapters. GSAP can animate the camera or any object value over time, like moving the camera closer on a click. Framer Motion has a package called `framer-motion-3d` that lets you animate R3F props the same way you animate normal components. For most beginner work, `useFrame` and `OrbitControls` are enough. Reach for GSAP when you want timed, scripted moves.

---

## Hands-on: a 3D product viewer

Now build a small 3D product viewer for one product card in your ecommerce capstone. The user can drag to rotate the product. You will use a `<Canvas>`, `OrbitControls`, a model from `useGLTF`, and `Environment` for soft lighting.

If you do not have a model file yet, use a simple box as a stand-in. The structure stays the same.

```jsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function ProductModel() {
  const { scene } = useGLTF("/models/shoe.glb");
  return <primitive object={scene} scale={2} />;
}

// Stand-in if you have no model yet:
function ProductBox() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#4f46e5" />
    </mesh>
  );
}

export default function ProductViewer() {
  return (
    <div style={{ width: "100%", height: "420px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ProductModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
```

Read it part by part. The wrapper `div` gives the canvas a real size. The `camera` prop on `<Canvas>` sets where the camera starts. The `<Suspense>` shows a fallback while the model loads, since `useGLTF` loads a file. The `<Environment preset="city" />` adds soft, ready lighting, so the product looks good with no extra lights. The `<OrbitControls />` lets the user drag to spin the product, and `enablePan={false}` stops them from sliding it off screen.

To use the box stand-in, swap `<ProductModel />` for `<ProductBox />`. Drop this `ProductViewer` into your product card, and one product now turns in 3D.

---

### Try this (20 minutes)

1. Create a new component called `ProductViewer.jsx`.
2. Add a `<Canvas>` with a camera position of `[0, 0, 5]`.
3. Put the `ProductBox` stand-in inside it first.
4. Add `<OrbitControls enablePan={false} />`.
5. Give the wrapper `div` a fixed height, like `420px`.
6. Load the page and drag the object with your mouse.

Start with the box before you load a real model. If the box works, your canvas, camera, and controls are wired correctly.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What does the `<Canvas>` component set up for you automatically?
2. How do you write a Three.js mesh as JSX in R3F?
3. Why should you mutate a ref inside `useFrame` instead of calling `setState`?
4. Which drei helper lets the user drag to rotate the camera?

---

## What's next

Chapter 17 is done. You can now build 3D on the web, both by hand with Three.js and as components with R3F and drei. The next chapter adds TypeScript and professional tooling, so your code is safer and your projects are easier to grow.

[Next chapter: 18. TypeScript and tooling &rarr;](../chapter-18-typescript-and-tooling/index.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [React Three Fiber docs](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [drei docs](https://github.com/pmndrs/drei)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[React Three Fiber]: A React library that lets you write Three.js scenes as JSX components. (Roman Urdu: React ke andar Three.js ko JSX components ki tarah likhne ka library)
*[Canvas]: The R3F component that creates the scene, camera, and renderer, and holds your 3D objects. (Roman Urdu: scene, camera aur renderer khud bana deta hai, andar 3D objects rakhte hain)
*[useFrame]: An R3F hook that runs your code on every animation frame. (Roman Urdu: har frame par chalne wala hook, animation ke liye)
*[drei]: A helper pack for R3F with ready made tools like OrbitControls and Environment. (Roman Urdu: R3F ke liye tayar helpers ka package)
*[useGLTF]: A drei hook that loads a .glb 3D model file in one line. (Roman Urdu: ek line mein 3D model file load karne wala hook)
*[Environment]: A drei helper that adds soft lighting and reflections from a preset. (Roman Urdu: preset se aasan, naram lighting deta hai)
