# Chapter 17: 3D on the web with Three.js

<p class="byline" markdown>Muhammad Umar Sajid · Trainer at Bano Qabil Sahiwal · Front End Development and Graphic Design</p>

The web is not flat anymore. Product viewers, game-like scenes, and interactive 3D
all run right in the browser. Three.js is the library that makes this possible,
and React Three Fiber lets you build it the React way.

This chapter starts with a single rotating cube and ends with a 3D product viewer
for your ecommerce store. Three.js has a steep first step, so go slowly. Once the
scene, camera, and renderer click, the rest follows.

## Lessons in this chapter

- [ ] [17.1 Scene, camera, renderer](17-1-scene-camera-renderer.md): the three pieces behind every 3D scene, and your first cube.
- [ ] [17.2 Geometry, materials, lighting](17-2-geometry-materials-lighting.md): shapes, surfaces, light, and textures.
- [ ] [17.3 Loading models](17-3-loading-models.md): bring real 3D models into your scene.
- [ ] [17.4 React Three Fiber and Drei](17-4-r3f-and-drei.md): build 3D the React way, and a product viewer.

!!! tip "Heavier on low-end phones"
    3D uses the GPU and can drain a low-end phone. Test on a real device, keep
    scenes simple, and always offer a plain image fallback for those who need it.

## Mega assignment

!!! bq-assignment "Add an interactive 3D product viewer to your store"
    A customer who can spin a product and look at it from every angle trusts the
    shop more. Build that, the React way, and keep it kind to low-end phones.

    **What you build**

    - A **3D product viewer** on one product page, built with React Three Fiber: a real loaded model (or a well-lit primitive shape if you have no model), proper lighting, and orbit controls so the user can rotate and zoom.
    - A **plain-image fallback** that shows instead on devices that cannot handle 3D, or while the model loads.
    - Performance care: the scene is light enough to stay smooth on a mid-range phone.

    **Done when**

    - [ ] The viewer loads and the user can rotate and zoom the product.
    - [ ] A loading state shows while the model downloads, not a frozen blank canvas.
    - [ ] There is an image fallback for unsupported or slow devices.
    - [ ] It runs smoothly when you test on a real phone, not just your laptop.

    **Stretch goal:** Let the user switch the product's colour or material, and have the 3D model update live.

[Start lesson 17.1 &rarr;](17-1-scene-camera-renderer.md){ .next-lesson }
