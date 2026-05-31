---
lesson_id: frontend.ch17.l03
title: "17.3 Loading models"
chapter: 17
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch17.l02
---

# 17.3 Loading models

In the last lessons you built boxes, spheres, and lights by hand. That works for simple shapes. But a real car, a robot, or a character is far too complex to code by hand. Artists build those in tools like Blender, then you load the finished file into your scene.

## What you'll know by the end

- Why you load real 3D models instead of coding shapes by hand.
- What the GLTF format is and why the web loves it.
- How to use GLTFLoader to load a model and add it to your scene.
- What DRACO compression is and when you need it.
- How to position, scale, and rotate a loaded model.
- How to play a model's built-in animations with AnimationMixer.

---

## Why load models at all

A cube needs six faces. A detailed dragon can need a hundred thousand faces. You will never type all of that by hand. Nobody does.

Instead, 3D artists build models in apps like Blender. They shape the mesh, paint the textures, and even set up animations. Then they export one file. You load that file in your code. The hard art part is already done for you.

This split is normal. Artists make assets. Developers load and control them. You just need to know how to bring the file into Three.js.

---

## The GLTF format

A 3D file can come in many formats. For the web, the standard is GLTF. It stores geometry, materials, textures, and animations together.

GLTF comes in two flavors:

- `.gltf` is a JSON text file. It often links to extra texture and binary files.
- `.glb` is the packed binary version. It puts everything inside one small file.

GLTF is fast to load and small in size. People call it "the JPEG of 3D" because it became the common format everyone agrees on. For the web you almost always want `.glb`.

Here is how the most common 3D file formats compare for web use:

| Format | Extension | Size | Web support | Notes |
| --- | --- | --- | --- | --- |
| GLTF binary | `.glb` | Small | Excellent | Best choice for web; one file holds everything |
| GLTF text | `.gltf` | Small-medium | Excellent | Splits geometry and textures into separate files |
| OBJ | `.obj` | Medium | Good | Old but widely supported; no animation or PBR |
| FBX | `.fbx` | Large | Poor | No native browser loader; needs conversion |
| USDZ | `.usdz` | Medium | iOS only | Apple AR format; good for iPhone AR Quick Look |

You will almost always receive assets as `.glb` or need to export to `.glb` from Blender. Avoid FBX for the web; it is common in game engines but not in browsers.

!!! tip
    Prefer `.glb` files when you can. One `.glb` packs the geometry, materials, and textures into a single small binary. Fewer files means fewer network requests and less to break.

---

## Loading a model with GLTFLoader

Three.js does not load GLTF by default. You import a loader from the addons folder. Then you call `loader.load()` with a URL and a callback. The callback runs when the file finishes downloading.

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  '/models/robot.glb',
  (gltf) => {
    // This runs after the model finishes loading.
    scene.add(gltf.scene);
  },
  (progress) => {
    // Optional: track download progress here.
    console.log('Loading', progress.loaded, 'of', progress.total);
  },
  (error) => {
    // Optional: catch load errors here.
    console.error('Could not load model', error);
  }
);
```

The first argument is the path to your file. The second is the success callback. It receives a `gltf` object. The real 3D content sits inside `gltf.scene`. You add that to your own scene.

Loading takes time, so the callback is key. Your code keeps running while the file downloads. When it is ready, Three.js calls your function. Only then can you touch the model.

<figure markdown>
<svg viewBox="0 0 740 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-gltf-flow" style="max-width:100%;height:auto">
  <title id="svg-gltf-flow">Model loading flow: GLTFLoader fetches the .glb file over the network, parses geometry, materials, and animations out of the binary, then hands a gltf object to your callback, which adds gltf.scene to your Three.js scene.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="10"  y="70" width="150" height="60" rx="8"/>
    <rect x="210" y="70" width="150" height="60" rx="8"/>
    <rect x="410" y="70" width="155" height="60" rx="8"/>
    <rect x="615" y="70" width="115" height="60" rx="8" fill="#f4f4f1"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="85"  y="96">GLTFLoader</text>
    <text x="85"  y="112">fetches file</text>
    <text x="285" y="96">Parse binary</text>
    <text x="285" y="112">geometry + textures</text>
    <text x="487" y="96">callback fires</text>
    <text x="487" y="112">(gltf object)</text>
    <text x="672" y="96">scene.add</text>
    <text x="672" y="112">(gltf.scene)</text>
  </g>
  <defs>
    <marker id="gf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#gf-arr)">
    <line x1="160" y1="100" x2="202" y2="100"/>
    <line x1="360" y1="100" x2="402" y2="100"/>
    <line x1="565" y1="100" x2="607" y2="100"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="85"  y="148">.glb from /public</text>
    <text x="285" y="148">animations included</text>
    <text x="487" y="148">runs asynchronously</text>
    <text x="672" y="148">visible in render</text>
  </g>
</svg>
<figcaption>The loader fetches the file, parses it into Three.js objects, then calls your callback. You only add the model to the scene inside that callback, not before it.</figcaption>
</figure>

??? note urdu "اردو میں مزید وضاحت"
    ماڈل لوڈ ہونے میں وقت لگتا ہے، اس لیے ہم کال بیک فنکشن استعمال کرتے ہیں۔ `loader.load()` کو آپ فائل کا راستہ اور ایک فنکشن دیتے ہیں۔ جب فائل مکمل ڈاؤن لوڈ ہو جاتی ہے، تب Three.js خود وہ فنکشن چلاتا ہے۔ اس فنکشن کو ایک `gltf` آبجیکٹ ملتا ہے، اور اصل ماڈل اس کے اندر `gltf.scene` میں ہوتا ہے۔ اسی لیے ماڈل کو ہمیشہ کال بیک کے اندر ہی سین میں شامل کریں، باہر نہیں۔ ویب پر تین ڈی فائلوں کے لیے سب سے بہتر فارمیٹ GLB ہے کیونکہ یہ تمام جیومیٹری، ٹیکسچر اور اینیمیشن ایک ہی فائل میں رکھتا ہے۔ لوڈنگ کے دوران ایک جگہ دار (placeholder) دکھانا اچھی عادت ہے تاکہ صارف کو خالی صفحہ نہ لگے۔

---

## DRACO compression

Big models carry a lot of geometry. That makes files heavy. DRACO is a method that shrinks model geometry by a large amount. It can cut file size to a fraction.

To use it, you set a `DRACOLoader` on your `GLTFLoader`. The model must already be exported with DRACO.

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
```

You only need DRACO for big models. For a small prop, plain `.glb` is fine. Keep this trick in your pocket for heavy scenes.

---

## Positioning, scaling, and rotating

A loaded model may appear too big, too small, or facing the wrong way. You fix that on `gltf.scene`. It behaves like any other Three.js object.

```js
loader.load('/models/robot.glb', (gltf) => {
  const model = gltf.scene;

  model.position.set(0, -1, 0); // move it down a bit
  model.scale.set(0.5, 0.5, 0.5); // make it half size
  model.rotation.y = Math.PI / 4; // turn it 45 degrees

  scene.add(model);
});
```

`position` moves the model in space. `scale` changes its size on each axis. `rotation` turns it, and the values are in radians. `Math.PI` is half a turn, so `Math.PI / 4` is a quarter of that.

Save a reference like `const model = gltf.scene` so you can use the model later in your render loop.

---

## Playing model animations

Some models carry animation clips. A character might have a walk or a wave built in. Those clips live in `gltf.animations`. To play one, you use an `AnimationMixer`.

A mixer controls playback. You make an action from a clip, then play it. You must update the mixer every frame, or the animation freezes.

```js
import * as THREE from 'three';

let mixer;
const clock = new THREE.Clock();

loader.load('/models/robot.glb', (gltf) => {
  scene.add(gltf.scene);

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // seconds since last frame
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
animate();
```

You create the mixer from the model. `clipAction` turns the first clip into an action. `play()` starts it. Inside the loop, `clock.getDelta()` gives the time since the last frame. You pass that to `mixer.update()` so the motion plays at the right speed.

The `if (mixer)` check matters. The model loads later, so the mixer may not exist on the first frames. Skipping it avoids an error.

---

## Showing a fallback while the model loads

The network request for a `.glb` file takes time. During that time your scene is empty. Users see nothing. That looks broken.

The fix is to show something simple while the model loads. In plain Three.js you can add a placeholder box to the scene, then remove it in the success callback when the real model arrives.

```js
// Add a temporary box while the real model loads
const placeholderGeo = new THREE.BoxGeometry(1, 1, 1);
const placeholderMat = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true });
const placeholder    = new THREE.Mesh(placeholderGeo, placeholderMat);
scene.add(placeholder);

loader.load('/models/robot.glb', (gltf) => {
  scene.remove(placeholder);   // remove the stand-in
  scene.add(gltf.scene);       // show the real model
});
```

In React Three Fiber the same idea is handled by React `<Suspense>`, which you will see in lesson 17.4. The pattern is the same: show something simple, swap to the real thing when it is ready.

| Loading state | What the user sees | How you handle it |
| --- | --- | --- |
| File not yet started | Empty scene | Add placeholder or spinner |
| File downloading | Empty scene | Keep placeholder visible |
| File parsed and ready | Real model | Remove placeholder, add model |
| File failed to load | Error | Log error, show fallback UI |

---

## Performance considerations

3D models can be heavy. On a phone or a slow connection, that hurts. A few habits keep things smooth.

- Use `.glb` to keep everything in one small file.
- Compress textures and keep their resolution sane.
- Use DRACO for models with heavy geometry.
- Keep the poly count low so phones can render it.
- Lazy-load the 3D part. Load it only when the user needs it, not on first paint.

The reason lazy loading matters so much is that JavaScript and images block or delay each other during page startup. If you load a 4 MB model on every page open, the rest of your site slows down while the browser processes it. Loading the 3D only when the user clicks "view in 3D" means most users never pay that cost.

A heavy model that loads on page open can stall the whole site. Think about your user on a budget phone, not just your own machine.

!!! warning
    3D models can be several megabytes. On slow Pakistani connections that is a long wait. Compress geometry with DRACO and lazy-load the model, or the page stalls and users leave before it appears.

---

### Try this

Find a free `.glb` model online, for example from a site like Sketchfab, and put it in your project's public folder. Load it with `GLTFLoader` and add `gltf.scene` to your scene inside the callback. If it looks too big or faces the wrong way, fix it with `model.scale.set(...)` and `model.rotation.y`. Make sure you have a light in the scene so the model is visible.

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. Why do you load models from artists instead of coding shapes by hand?
2. What is the difference between a `.gltf` file and a `.glb` file?
3. After `loader.load()` finishes, where does the actual model sit, and what do you add to your scene?
4. Why must you call `mixer.update(delta)` inside the render loop?

---

## What's next

Writing all this loader and loop code by hand gets long. In the next lesson you meet React Three Fiber and Drei. They let you write 3D scenes as React components, with ready-made helpers that handle the boring parts.

[Next lesson: 16.4 React Three Fiber and Drei &rarr;](17-4-r3f-and-drei.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Three.js: Loading 3D Models](https://threejs.org/manual/#en/load-gltf)
- [glTF on Khronos](https://www.khronos.org/gltf/)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[GLTF]: The standard 3D file format for the web. Stores geometry, materials, textures, and animations together. (Roman Urdu: web ke liye standard 3D file format)
*[glb]: The packed binary form of GLTF. Puts everything into one small file. (Roman Urdu: sab kuch ek choti file mein)
*[GLTFLoader]: A Three.js addon that downloads and reads GLTF model files. (Roman Urdu: GLTF model load karne wala tool)
*[DRACO]: A method to compress model geometry so files get much smaller. (Roman Urdu: model ko chota karne ka tareeqa)
*[AnimationMixer]: A Three.js object that controls playback of a model's animation clips. (Roman Urdu: model ki animation chalane wala)
*[poly count]: The number of triangles in a model. Lower is lighter and faster. (Roman Urdu: model mein triangles ki tadaad)
