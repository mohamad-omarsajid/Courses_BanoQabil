---
lesson_id: frontend.ch17.l02
title: "17.2 Geometry, materials, lighting"
chapter: 17
order: 2
estimated_minutes: 40
prerequisites:
  - frontend.ch17.l01
---

# 17.2 Geometry, materials, lighting

In 16.1 you made a cube spin on screen. That cube had a shape and a surface. Now you learn how to control both. You also learn why some objects show up black, and how light fixes that.

## What you'll know by the end

- What geometry is and three common shapes you can use.
- How a mesh joins a geometry and a material together.
- The difference between `MeshBasicMaterial` and `MeshStandardMaterial`.
- Why a standard material looks black with no light in the scene.
- How to add ambient, directional, point, and spot lights.
- How to wrap an image onto a surface with `TextureLoader`.

---

## Geometry is the shape

Geometry is the shape of an object. It is the set of points and faces that form a 3D form. Three.js gives you ready-made shapes so you do not build them by hand.

```js
import * as THREE from "three";

const boxGeo    = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
const planeGeo  = new THREE.PlaneGeometry(5, 5);
```

`BoxGeometry` makes a box. The three numbers are width, height, and depth. `SphereGeometry` makes a ball. The first number is the radius, and the next two control how smooth it looks. `PlaneGeometry` makes a flat surface. A plane is good for floors and walls.

Here are the built-in shapes a beginner uses most, with the constructor arguments that matter:

| Shape | Constructor | Key arguments | Good for |
| --- | --- | --- | --- |
| Box | `BoxGeometry` | width, height, depth | crates, buildings, buttons |
| Sphere | `SphereGeometry` | radius, widthSegments, heightSegments | planets, balls, heads |
| Plane | `PlaneGeometry` | width, height | floors, walls, backdrops |
| Cylinder | `CylinderGeometry` | radiusTop, radiusBottom, height | pillars, cans, trees |
| Torus | `TorusGeometry` | radius, tube, radialSeg, tubularSeg | rings, donuts |
| Cone | `ConeGeometry` | radius, height, segments | hats, rockets, trees |

Higher segment counts make a shape smoother but heavier. For a `SphereGeometry`, 16 segments is fine for most work; 64 is very smooth but costs more. The reason segments matter is that 3D geometry is made of flat triangles, and a sphere built from 8 segments looks blocky like a gem. More segments means more triangles, which means the GPU has to process more work every frame. Start low and only raise segments when you can see the blockiness from the camera's distance.

---

## A mesh joins geometry and material

A geometry alone is just a shape with no surface. A material is the surface look. A mesh combines a geometry and a material into one object you can add to the scene.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const mesh     = new THREE.Mesh(geometry, material);

scene.add(mesh);
```

Think of it like a body and clothes. The geometry is the body shape. The material is the clothes on top. The mesh is the full person you place in the room.

<figure markdown>
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-mesh-eq" style="max-width:100%;height:auto">
  <title id="svg-mesh-eq">Geometry plus material equals mesh. The geometry is the wireframe shape, the material is the colored surface, and the mesh is the combined result added to the scene.</title>
  <g stroke="#1f1f1c" stroke-width="1.5" fill="#ffffff">
    <rect x="20" y="50" width="140" height="100" rx="8"/>
    <rect x="240" y="50" width="140" height="100" rx="8"/>
    <rect x="460" y="50" width="160" height="100" rx="8" fill="#f4f4f1"/>
  </g>
  <g fill="none" stroke="#1f1f1c" stroke-width="1.2">
    <polygon points="65,75 115,75 135,100 115,145 65,145 45,120" />
    <line x1="65" y1="75" x2="45" y2="120"/>
    <line x1="115" y1="75" x2="135" y2="100"/>
    <line x1="115" y1="145" x2="135" y2="100"/>
  </g>
  <g fill="#6b6b65" stroke="none">
    <rect x="252" y="62" width="116" height="76" rx="6" fill="#6b6b65" opacity="0.15"/>
    <rect x="260" y="70" width="100" height="60" rx="4" fill="#6b6b65" opacity="0.4"/>
  </g>
  <g fill="#f4f4f1" stroke="#1f1f1c" stroke-width="1.2">
    <polygon points="485,75 535,75 555,100 535,145 485,145 465,120" />
    <line x1="485" y1="75" x2="465" y2="120"/>
    <line x1="535" y1="75" x2="555" y2="100"/>
    <line x1="535" y1="145" x2="555" y2="100"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#1f1f1c" text-anchor="middle">
    <text x="90" y="168">Geometry</text>
    <text x="90" y="183">(shape)</text>
    <text x="310" y="168">Material</text>
    <text x="310" y="183">(surface)</text>
    <text x="540" y="168">Mesh</text>
    <text x="540" y="183">(in scene)</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="#6b6b65" text-anchor="middle">
    <text x="195" y="108">+</text>
    <text x="415" y="108">=</text>
  </g>
</svg>
<figcaption>A geometry gives the shape, a material gives the surface, and combining them into a mesh gives you something you can add to the scene.</figcaption>
</figure>

---

## Materials are the surface

A material controls how the surface looks. There are two materials you will use most as a beginner.

`MeshBasicMaterial` shows a flat color. It ignores light. It is always visible, even with no lights in the scene.

`MeshStandardMaterial` is a realistic material. It reacts to light. With no light in the scene, it renders black.

```js
const basic    = new THREE.MeshBasicMaterial({ color: 0xff6633 });
const standard = new THREE.MeshStandardMaterial({ color: 0xff6633 });
```

Both have the same color value here. But `basic` shows that orange right away. The `standard` one needs light before you can see the orange.

The reason there are different material types is cost. Every material that reacts to light has to do extra math for each pixel each frame. `MeshBasicMaterial` skips all that math, so it draws fast and always shows a color. `MeshStandardMaterial` does the full PBR (Roman Urdu: haqeeqi roshni ka hisaab) calculation, which looks real but costs more. On a slow phone, using `MeshBasicMaterial` for objects that are far away or unimportant can keep the frame rate smooth.

Here is a quick guide to the most common materials, with when to reach for each:

| Material | Reacts to light | Needs lights? | When to use |
| --- | --- | --- | --- |
| `MeshBasicMaterial` | No | No | Testing shapes, cartoon style, UI icons, zero light cost |
| `MeshStandardMaterial` | Yes (PBR) | Yes | Realistic surfaces, products, environments |
| `MeshPhongMaterial` | Yes (older model) | Yes | Older projects, shiny plastic look, cheaper than Standard |
| `MeshToonMaterial` | Yes (flat steps) | Yes | Comic-book or anime look |
| `MeshNormalMaterial` | No | No | Debugging normals, colorful rainbow surfaces |

!!! warning
    `MeshStandardMaterial` needs a light in the scene. With no light it renders fully black, and beginners think their code is broken. The code is fine. The scene is just dark. Add a light and the surface appears.

---

## Lighting brings the scene to life

A standard material needs light to be seen. Three.js gives you several light types. Here are the four you will use most.

`AmbientLight` is soft light from everywhere. It lights all surfaces evenly. It casts no shadows.

`DirectionalLight` sends parallel rays, like the sun. It comes from one direction and can cast shadows.

`PointLight` shines from one point in all directions, like a bulb.

`SpotLight` sends a cone of light from one point, like a theatre spotlight or a torch.

The reason there are so many light types is that real-world light behaves differently depending on the source. The sun is so far away that all its rays arrive in parallel, which is why `DirectionalLight` has no single position, only a direction. A bare bulb in a room floods light outward equally, which is `PointLight`. A torch with a reflector focuses light into a cone, which is `SpotLight`. Matching your light choice to the story you are telling makes a scene read as natural without any extra work.

```js
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(3, 5, 2);
scene.add(sun);

const bulb = new THREE.PointLight(0xffffff, 1);
bulb.position.set(0, 2, 0);
scene.add(bulb);

const spot = new THREE.SpotLight(0xffffff, 1);
spot.position.set(0, 5, 0);
spot.angle = Math.PI / 6; // 30 degrees wide
scene.add(spot);
```

The second argument in each light is the intensity, or brightness. Ambient light alone looks flat. A directional light adds a bright side and a dark side, so shapes look solid.

<figure markdown>
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-lights-title" style="max-width:100%;height:auto">
  <title id="svg-lights-title">Four light types side by side: AmbientLight fills everything evenly, DirectionalLight sends parallel rays from above, PointLight radiates in all directions from a central point, SpotLight projects a cone downward.</title>
  <g stroke="#1f1f1c" stroke-width="1.2" fill="#ffffff">
    <rect x="10"  y="10" width="155" height="280" rx="8"/>
    <rect x="185" y="10" width="155" height="280" rx="8"/>
    <rect x="360" y="10" width="155" height="280" rx="8"/>
    <rect x="535" y="10" width="175" height="280" rx="8"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#1f1f1c" text-anchor="middle">
    <text x="87"  y="35">AmbientLight</text>
    <text x="262" y="35">DirectionalLight</text>
    <text x="437" y="35">PointLight</text>
    <text x="622" y="35">SpotLight</text>
  </g>
  <g stroke="#6b6b65" stroke-width="1" fill="none">
    <rect x="50"  y="100" width="75" height="50" rx="4"/>
    <rect x="225" y="130" width="75" height="50" rx="4"/>
    <rect x="400" y="150" width="75" height="50" rx="4"/>
    <rect x="574" y="175" width="100" height="50" rx="4"/>
  </g>
  <g stroke="#6b6b65" stroke-width="1.4" stroke-dasharray="4 3" fill="none">
    <line x1="30"  y1="80" x2="160" y2="80"/>
    <line x1="30"  y1="90" x2="160" y2="90"/>
    <line x1="30"  y1="100" x2="160" y2="100"/>
  </g>
  <defs>
    <marker id="lg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#lg-arr)">
    <line x1="262" y1="50" x2="262" y2="122"/>
    <line x1="252" y1="50" x2="236" y2="122"/>
    <line x1="272" y1="50" x2="288" y2="122"/>
    <line x1="437" y1="175" x2="437" y2="143"/>
    <line x1="437" y1="175" x2="470" y2="155"/>
    <line x1="437" y1="175" x2="404" y2="155"/>
    <line x1="437" y1="175" x2="437" y2="207"/>
    <line x1="437" y1="175" x2="408" y2="195"/>
    <line x1="437" y1="175" x2="466" y2="195"/>
    <line x1="624" y1="60" x2="594" y2="168"/>
    <line x1="624" y1="60" x2="654" y2="168"/>
    <line x1="624" y1="60" x2="624" y2="168"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11" fill="#6b6b65" text-anchor="middle">
    <text x="87"  y="175">fills everything</text>
    <text x="87"  y="188">evenly, no shadows</text>
    <text x="262" y="200">parallel rays,</text>
    <text x="262" y="213">like the sun</text>
    <text x="437" y="215">all directions</text>
    <text x="437" y="228">from one point</text>
    <text x="622" y="238">cone from</text>
    <text x="622" y="251">one point</text>
  </g>
</svg>
<figcaption>Each light type matches a real-world source. Use AmbientLight as a base fill, then pick one or two others to match the feel of your scene.</figcaption>
</figure>

| Light type | Rays | Shadows | Best for |
| --- | --- | --- | --- |
| `AmbientLight` | Everywhere, equal | No | Base fill, stops pure-black dark sides |
| `DirectionalLight` | Parallel, one direction | Yes | Sun, moon, distant light source |
| `PointLight` | All directions from one point | Yes (optional) | Bulbs, candles, torches |
| `SpotLight` | Cone from one point | Yes | Stage lighting, car headlights, flashlight |
| `HemisphereLight` | Sky color above, ground color below | No | Outdoor ambient, sky-to-ground gradient |

!!! tip
    Use `MeshBasicMaterial` while you test your shapes and layout. It always shows up, so you never wonder if a light is missing. Once the layout is right, switch to `MeshStandardMaterial` and add lights for a real look.

---

## A lit sphere

Now put it together. Here is a sphere with a standard material, plus an ambient light and a directional light.

```js
const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0x3399ff });
const sphere    = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(3, 5, 2);
scene.add(sun);
```

The ambient light keeps the dark side from being pure black. The directional light makes one side bright. Together they make the ball look round and solid.

---

## Texture mapping

A texture is an image wrapped onto a surface. Instead of one flat color, you can show a picture. You load the image with `TextureLoader` and set it as the material `map`.

```js
const loader      = new THREE.TextureLoader();
const woodTexture = loader.load("/textures/wood.jpg");

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMat = new THREE.MeshStandardMaterial({ map: woodTexture });
const box    = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);
```

`loader.load()` reads the image file. You pass the texture to `map`, and Three.js paints it on every face of the box. Make sure the image path is correct, or the surface stays blank.

Beyond the color `map`, `MeshStandardMaterial` accepts other texture slots that give a surface more life:

| Texture slot | What it does |
| --- | --- |
| `map` | Base color, the main image |
| `roughnessMap` | Controls how rough or glossy patches are |
| `metalnessMap` | Which parts look metallic |
| `normalMap` | Fakes small surface bumps without extra geometry |
| `aoMap` | Ambient occlusion, darkens crevices for realism |

For beginner work, `map` alone is enough. The others add realism one layer at a time.

---

## PBR vs basic materials

`MeshStandardMaterial` uses PBR, which means physically based rendering (Roman Urdu: haqeeqi roshni dikhane ka tareeqa). PBR tries to copy how real light behaves on real surfaces. It uses two key values: `roughness` controls how scattered the light reflection is, from mirror-smooth at 0 to fully matte at 1, and `metalness` controls whether the surface acts like a dielectric or a metal.

```js
const mat = new THREE.MeshStandardMaterial({
  color: 0x888888,
  roughness: 0.3,   // 0 = mirror, 1 = chalk
  metalness: 0.8,   // 0 = plastic, 1 = metal
});
```

This is why PBR looks realistic: the same set of rules produces a copper finish, a rubber floor, or a wet rock just by changing those two numbers. The tradeoff is that it needs lights and costs more work for the GPU.

Basic materials are fast and flat. They need no light. They are great for tests, simple shapes, or a cartoon style. Choose the one that fits your goal.

| Property | Value 0 | Value 1 | Effect |
| --- | --- | --- | --- |
| `roughness` | Mirror-smooth reflection | Fully matte, scattered | How spread out the highlight is |
| `metalness` | Plastic or dielectric surface | Full metallic surface | Whether reflection uses object color |

### Try this

Make a sphere with a `MeshStandardMaterial` and add it to your scene, with no light at all. It shows up black, just as warned. Now add an `AmbientLight` and a `DirectionalLight`, and watch the ball turn round and solid. Move the directional light's `position` and see the bright side move with it.

??? note urdu "اردو میں مزید وضاحت"
    ہر آبجیکٹ دو حصوں سے بنتا ہے۔ ایک جیومیٹری یعنی شکل، اور ایک میٹیریل یعنی سطح۔ ان دونوں کو ملا کر ایک میش بنتی ہے جو سین میں نظر آتی ہے۔ بیسک میٹیریل سادہ رنگ دکھاتا ہے اور اسے روشنی کی ضرورت نہیں ہوتی اس لیے یہ تیز بھی ہے۔ اسٹینڈرڈ میٹیریل حقیقی نظر آتا ہے مگر روشنی کے بغیر بالکل کالا دکھائی دیتا ہے، اس لیے سین میں لائٹ ضرور شامل کریں۔ اسٹینڈرڈ میٹیریل میں roughness صفر مطلب آئینہ اور ایک مطلب بالکل میٹ، اور metalness صفر مطلب پلاسٹک اور ایک مطلب دھات۔ چار قسم کی لائٹس ہیں: ایمبیئنٹ ہر طرف سے یکساں روشنی دیتی ہے، ڈائریکشنل سورج جیسی سیدھی کرنیں ڈالتی ہے، پوائنٹ لائٹ بلب کی طرح ہر سمت چمکتی ہے، اور اسپاٹ لائٹ ایک مخروط میں روشنی ڈالتی ہے۔

---

## Knowledge check

Don't write anything down. Just see if you can answer these in your head. If you can't, scroll back up. That's what this section is for.

1. What two parts join together to make a mesh?
2. Why does a `MeshStandardMaterial` object look black with no light?
3. Which light works like the sun and casts shadows?
4. What does `TextureLoader` let you put on a surface?
5. Which material should you use while you are testing your layout and want to see shapes quickly?

---

## What's next

You now know how to build shapes, give them surfaces, and light them up. Next you will load full 3D models that artists already made, so you do not build every shape by hand. This opens the door to richer scenes.

[Next lesson: 16.3 Loading models &rarr;](17-3-loading-models.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- [Three.js manual: Materials](https://threejs.org/manual/#en/materials)
- [Three.js manual: Lights](https://threejs.org/manual/#en/lights)

<!-- The Mark Complete button is injected here automatically by the site template. -->
<!-- Glossary tooltips used in this lesson. -->
*[geometry]: The shape of a 3D object, made from points and faces. (Roman Urdu: object ki shakl, yaani woh box ya ball hai ya kuch aur)
*[material]: The surface look of an object, like color or texture. (Roman Urdu: object ke upar ka look, jaise rang ya chamak ya tasveer)
*[mesh]: An object made by joining a geometry and a material. (Roman Urdu: shakl aur surface mil kar jo ek nazar aane wali cheez bante hain)
*[AmbientLight]: A soft light that lights everything evenly with no shadows. (Roman Urdu: har taraf se halki roshni)
*[DirectionalLight]: Parallel light rays from one direction, like the sun. (Roman Urdu: sooraj jaisi seedhi roshni)
*[texture]: An image wrapped onto a surface instead of a flat color. (Roman Urdu: tasveer jo sitah par lipat jati hai)
*[PBR]: Physically based rendering, a realistic way to show light on surfaces. (Roman Urdu: haqeeqi roshni dikhane ka tareeqa)
