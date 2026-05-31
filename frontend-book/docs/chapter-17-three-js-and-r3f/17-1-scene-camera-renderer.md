---
lesson_id: frontend.ch17.l01
title: "17.1 Scene, camera, renderer"
chapter: 17
order: 1
estimated_minutes: 45
prerequisites:
  - frontend.ch16.l04
---

# 17.1 Scene, camera, renderer

Welcome to your first 3D lesson. So far you drew flat pages with HTML and CSS. Now you will draw a box that spins in real 3D space inside the browser. This is new, so we will go slow and build one small piece at a time.

## What you'll know by the end

- You will know what WebGL is and why Three.js sits on top of it.
- You will install Three.js into a project with npm.
- You will name the three pieces every 3D app needs: scene, camera, renderer.
- You will tell a perspective camera apart from an orthographic camera.
- You will understand what the 3D coordinate axes mean.
- You will build a render loop that draws a frame again and again.
- You will add OrbitControls so you can drag and rotate the view.

---

## What WebGL is

WebGL is browser tech that talks to your GPU. The GPU is the chip that draws graphics fast. WebGL lets a web page push 3D work straight to that chip.

Raw WebGL is hard. You write long, low-level code just to draw one triangle. Most people never touch it directly.

Three.js is a library that wraps WebGL for you. You write short, friendly code, and Three.js talks to WebGL underneath. You get the speed of the GPU without the pain.

Think of it this way: WebGL is the engine room. Three.js is the steering wheel. You touch the wheel, not the engine room.

| Layer | What it is | Who writes it |
| --- | --- | --- |
| GPU | Graphics chip on your device | Hardware, not your concern |
| WebGL | Low-level browser API that talks to the GPU | Browser, not your concern |
| Three.js | Friendly JavaScript library over WebGL | You import it |
| Your code | Scene logic, objects, animations | You write this |

---

## Install Three.js

Start inside a project that uses npm, like a Vite app from earlier chapters. Then run this command.

```bash
npm install three
```

This downloads Three.js and adds it to your project. After it finishes, you can import Three.js in your JavaScript files. You only run this once per project.

---

## The three pieces every scene needs

Every Three.js app has three core parts. You always need all three.

- The **scene** (Roman Urdu: woh dabba jis mein sab kuch rakha hota hai) is a container. It holds your 3D objects and your lights.
- The **camera** (Roman Urdu: aap ka nuqta nazar, kahan se dekh rahe hain) is your viewpoint. It decides where you look from and what you see.
- The **renderer** (Roman Urdu: jo scene ko canvas par tasveer banata hai) does the drawing. It takes the scene and the camera and paints a picture onto a canvas on the page.

Think of these three as a team. The scene has the stuff. The camera frames the stuff. The renderer turns that into pixels you can see.

!!! tip
    Think of it like a film set. The scene is the set with all the props. The camera films the set from one spot. The renderer is the print that turns each shot into a picture on screen.

<figure markdown>
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-three-title" style="max-width:100%;height:auto">
  <title id="svg-three-title">The scene and the camera both feed the renderer, which draws the result onto a canvas on the page.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="40" y="40" width="200" height="110" rx="8"/>
    <rect x="40" y="190" width="200" height="80" rx="8"/>
    <rect x="360" y="95" width="170" height="120" rx="8"/>
    <rect x="600" y="95" width="130" height="120" rx="8" fill="#f4f4f1"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.5">
    <rect x="95" y="78" width="50" height="50"/>
    <line x1="145" y1="78" x2="165" y2="62"/>
    <line x1="95" y1="78" x2="115" y2="62"/>
    <line x1="165" y1="62" x2="115" y2="62"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#1f1f1c">
    <text x="160" y="64">Scene</text>
    <text x="100" y="235">Camera</text>
    <text x="395" y="160">Renderer</text>
    <text x="628" y="160">Canvas</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="55" y="135">objects + lights</text>
    <text x="55" y="255">viewpoint</text>
    <text x="365" y="180">draws pixels</text>
    <text x="607" y="180">on page</text>
  </g>
  <defs>
    <marker id="bq-arrow-three" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-three)">
    <line x1="240" y1="95" x2="352" y2="135"/>
    <line x1="240" y1="230" x2="352" y2="175"/>
    <line x1="530" y1="155" x2="592" y2="155"/>
  </g>
</svg>
<figcaption>The scene holds your objects, the camera is your viewpoint, and the renderer draws what the camera sees onto a canvas.</figcaption>
</figure>

---

## The 3D coordinate system

Before you move things around in space, you need to know which way is which. Three.js uses a right-hand coordinate system. Three axes describe every point in space.

- **X axis** points to the right. Positive X moves an object right.
- **Y axis** points up. Positive Y moves an object up.
- **Z axis** points toward you, out of the screen. Positive Z moves an object closer to the camera.

<figure markdown>
<svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-axes-title" style="max-width:100%;height:auto">
  <title id="svg-axes-title">3D coordinate axes: X points right, Y points up, Z points toward the viewer.</title>
  <g stroke="#1f1f1c" stroke-width="1" fill="none">
    <rect x="10" y="10" width="400" height="320" rx="6" stroke="#6b6b65" stroke-dasharray="4 3"/>
  </g>
  <defs>
    <marker id="ax-x" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#c0392b"/>
    </marker>
    <marker id="ax-y" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#27ae60"/>
    </marker>
    <marker id="ax-z" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#2980b9"/>
    </marker>
  </defs>
  <g>
    <line x1="210" y1="185" x2="360" y2="185" stroke="#c0392b" stroke-width="2.5" marker-end="url(#ax-x)"/>
    <line x1="210" y1="185" x2="210" y2="60" stroke="#27ae60" stroke-width="2.5" marker-end="url(#ax-y)"/>
    <line x1="210" y1="185" x2="100" y2="285" stroke="#2980b9" stroke-width="2.5" marker-end="url(#ax-z)"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="700">
    <text x="368" y="190" fill="#c0392b">X</text>
    <text x="204" y="50" fill="#27ae60">Y</text>
    <text x="84" y="300" fill="#2980b9">Z</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" fill="#6b6b65">
    <text x="328" y="166">right (+)</text>
    <text x="158" y="50">up (+)</text>
    <text x="50" y="270">toward you (+)</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" fill="#1f1f1c" text-anchor="middle">
    <text x="210" y="192">origin</text>
    <text x="210" y="207">(0, 0, 0)</text>
  </g>
</svg>
<figcaption>Three.js places the origin at (0, 0, 0). X goes right, Y goes up, Z comes toward you. Every position you set is a mix of these three numbers.</figcaption>
</figure>

When you write `camera.position.z = 5`, you are placing the camera 5 units toward you along the Z axis, which puts the scene in front of the camera. When you write `mesh.position.x = 2`, you move the mesh two units to the right.

---

## Two kinds of camera

Three.js gives you more than one camera. Two are most common.

A `PerspectiveCamera` works like your eyes. Objects far away look smaller. Objects close to you look bigger. This looks natural, so you use it most of the time.

An `OrthographicCamera` has no perspective. Far objects and near objects stay the same size. This is good for flat diagrams, plans, and some 2D-style games.

For this lesson you will use a perspective camera.

`new THREE.PerspectiveCamera(fov, aspect, near, far)` takes four numbers. Knowing what each does helps you fix problems.

| Parameter | What it controls | Typical value |
| --- | --- | --- |
| `fov` | Field of view in degrees. Higher = wider view, more distortion | 60 to 75 |
| `aspect` | Width divided by height. Match your canvas size | `window.innerWidth / window.innerHeight` |
| `near` | Closest distance the camera can see. Objects nearer are clipped | `0.1` |
| `far` | Farthest distance the camera can see. Objects farther are hidden | `1000` |

---

## A mesh is geometry plus material

You will hear the word **mesh** a lot. A mesh is one 3D object in your scene.

A mesh is made of two parts. The geometry is the shape, like a box or a sphere. The material is the surface, like the color or how shiny it looks.

You will learn geometry and materials in full detail in the next lesson. For now, just know a mesh equals geometry plus material.

---

## The render loop

A 3D screen is not drawn once. It is drawn many times per second. Each drawing is one frame.

You ask the browser to draw the next frame with `requestAnimationFrame`. It calls your function before the next screen refresh, about 60 times a second. Inside that function you call `renderer.render(scene, camera)` to draw one frame. You can also change things a little each frame to make motion, like rotating a cube.

<figure markdown>
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-loop-title" style="max-width:100%;height:auto">
  <title id="svg-loop-title">The render loop: animate() calls requestAnimationFrame which calls animate() again, while also updating the scene and calling renderer.render each frame.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="200" y="20" width="160" height="44" rx="8"/>
    <rect x="30" y="130" width="160" height="44" rx="8"/>
    <rect x="370" y="130" width="160" height="44" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="280" y="47">animate()</text>
    <text x="110" y="155">update scene</text>
    <text x="110" y="170">(rotation, etc.)</text>
    <text x="450" y="155">renderer.render</text>
    <text x="450" y="170">(scene, camera)</text>
  </g>
  <defs>
    <marker id="bq-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-loop-arrow)">
    <line x1="220" y1="64" x2="155" y2="128"/>
    <line x1="340" y1="64" x2="405" y2="128"/>
    <path d="M 280 64 Q 280 200 280 210 Q 280 225 200 225 Q 100 225 100 210 Q 100 200 100 174"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="157" y="100">each frame:</text>
    <text x="400" y="100">each frame:</text>
    <text x="280" y="222">requestAnimationFrame(animate)</text>
    <text x="280" y="236">calls animate() again next frame</text>
  </g>
</svg>
<figcaption>The render loop keeps itself alive by calling requestAnimationFrame at the start of each frame. Each cycle updates your objects and redraws the scene.</figcaption>
</figure>

!!! warning
    3D is heavy on low-end phones. Many students here use such phones. Keep your scenes small, use few objects, and always test on a real device.

---

## A complete minimal example

Here is a full, working example. It makes a scene, a perspective camera, and a renderer. It adds a spinning cube and runs a render loop. It also adds OrbitControls so you can drag to look around.

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Scene: the container for objects and lights
const scene = new THREE.Scene();

// 2. Camera: your viewpoint (fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 3. Renderer: draws the scene onto a canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. A mesh: geometry plus material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00b3a4 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. OrbitControls: drag the mouse to rotate the view
const controls = new OrbitControls(camera, renderer.domElement);

// 6. The render loop: runs about 60 times a second
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
```

Read it from the top. First you make the three core parts: scene, camera, renderer. The camera sits back a bit with `camera.position.z = 5`, or you would be inside the cube. The renderer fills the window and adds a canvas to the page.

Next you build the cube. The geometry is a box and the material gives it a teal color. You add the cube to the scene with `scene.add(cube)`.

Then `OrbitControls` lets you drag with the mouse to rotate the view. You import it from `three/addons`, not from the main `three` package.

Last is the loop. `requestAnimationFrame(animate)` asks for the next frame. You turn the cube a little on two axes, update the controls, then call `renderer.render(scene, camera)` to draw. The cube spins.

---

### Try this

Copy the full example into a Vite project and get the spinning cube on screen. Then change three things one at a time: set the material color to a different hex value, change `camera.position.z` to `8` and see the cube get smaller, and change the two rotation speeds so the cube tumbles at a different rate. Drag with the mouse to test OrbitControls.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What are the three core parts every Three.js app needs, and what does each one do?
2. Why does Three.js exist when the browser already has WebGL?
3. How is a perspective camera different from an orthographic camera?
4. What does `requestAnimationFrame` do inside the render loop?
5. If `camera.position.z = 5`, which direction is the camera from the origin?

---

## What's next

You now have a spinning cube and a working loop. Next you will go deeper into the cube itself. Lesson 17.2 covers geometry, materials, and lighting, so your objects can have real shape and a surface that reacts to light.

[Next lesson: 16.2 Geometry, materials, lighting &rarr;](17-2-geometry-materials-lighting.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Three.js: Creating a scene](https://threejs.org/manual/#en/creating-a-scene)
- [Three.js manual](https://threejs.org/manual/)

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[WebGL]: Browser tech that talks to the GPU to draw 2D and 3D graphics fast. (Roman Urdu: browser ka graphics engine jo GPU se baat karta hai)
*[Three.js]: A JavaScript library that wraps WebGL so 3D code stays short and friendly. (Roman Urdu: 3D ke liye aasan JavaScript library)
*[scene]: A container that holds your 3D objects and lights. (Roman Urdu: woh dabba jismein objects aur lights rehti hain)
*[camera]: Your viewpoint into the scene that decides what you see. (Roman Urdu: aap ka nuqta nazar, kahan se dekh rahe hain)
*[renderer]: The part that draws the scene from the camera onto a canvas each frame. (Roman Urdu: jo scene ko canvas par tasveer banata hai)
*[mesh]: One 3D object made of a geometry plus a material. (Roman Urdu: aik 3D cheez jo shape aur surface se banti hai)
*[OrbitControls]: A Three.js add-on that lets you drag the mouse to rotate the view. (Roman Urdu: mouse se view ghumane wala add-on)

??? note urdu "اردو میں مزید وضاحت"
    تھری ڈی بنانے کے لیے ہمیشہ تین چیزیں چاہیے ہوتی ہیں۔ سین ایک ڈبہ ہے جس میں آپ کی تمام اشیاء اور روشنیاں رہتی ہیں۔ کیمرہ آپ کا نقطہ نظر ہے، یعنی آپ کہاں سے دیکھ رہے ہیں۔ رینڈرر وہ ہے جو سین اور کیمرے کو لے کر اسکرین پر تصویر بناتا ہے۔ تھری جے ایس میں تین محور ہوتے ہیں: X دائیں جاتا ہے، Y اوپر جاتا ہے، اور Z آپ کی طرف آتا ہے۔ ہر فریم میں رینڈر لوپ چلتا ہے اور تصویر دوبارہ بنائی جاتی ہے، جس سے حرکت کا احساس ہوتا ہے۔
