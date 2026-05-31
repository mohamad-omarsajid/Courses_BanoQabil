---
lesson_id: design.ch3.l2
title: "3.2 Layers, Masks & Selections"
chapter: 3
order: 2
estimated_minutes: 40
---

# 3.2 Layers, Masks & Selections

!!! info "Why this lesson?"
    By the end of this lesson you can stack layers in the right order, select a
    part of a photo, and use a mask to hide things without deleting them.

    *(Roman Urdu: Is sabaq ke baad tum layers ko theek order mein laga sako ge,
    photo ka koi hissa select kar sako ge, aur mask se cheezein chhupa sako ge
    bina delete kiye.)*

## What you will learn

- How layer order works
- How to select part of a photo
- The Quick Selection tool and the Magic Wand
- What a layer mask is
- Why a mask is better than the eraser

## Layer order

Layers stack on top of each other. The layer at the top of the layers panel sits
in front. The layer at the bottom sits behind.

This order matters a lot. If your text layer is below your photo layer, the photo
covers the text. Move the text above the photo, and now you can see it.

To change the order, drag a layer up or down in the layers panel. That is it.

!!! example "Top wins"
    Put a photo on the bottom layer. Put your name on a layer above it. Now your
    name shows on top of the photo. Drag the name layer below the photo, and it
    vanishes behind it. Top layer always wins.

## What is a selection?

A **selection** (Roman Urdu: photo ka woh hissa jo tum chunte ho taake sirf usi
par kaam ho) is the part of a photo you choose to work on. When you make a
selection, Photoshop only changes that part. The rest stays safe.

You will see a moving dotted line around your selection. People call it the
"marching ants" because it looks like tiny ants walking.

Why select? Because you often want to change just one thing. Maybe you want to
cut out a person. Maybe you want to brighten only the sky. A selection lets you
touch only that area.

## Two easy selection tools

There are many ways to select. Two are easy for a beginner.

1. The **Quick Selection tool** (Roman Urdu: tool jo brush ki tarah ghuma kar
   hissa select karta hai) works like a brush. You drag over an object, and it
   grows the selection to fit the edges. It is great for people and objects.
2. The **Magic Wand** (Roman Urdu: tool jo ek jaisa rang ek click mein select
   karta hai) selects areas of one similar color. Click a plain sky, and it
   grabs the whole sky at once. It is great for flat backgrounds.

!!! tip "Add and remove from a selection"
    No selection is perfect on the first try. Hold **Shift** and drag to add more
    area. Hold **Alt** and drag to remove area. Build up the selection bit by
    bit until it looks right.

## Layer masks vs the eraser

Now the most important idea in this lesson.

The **eraser** (Roman Urdu: tool jo pixels ko hamesha ke liye mita deta hai)
deletes pixels for good. Once you erase and save, those pixels are gone. If you
made a mistake, you cannot get them back.

A **layer mask** (Roman Urdu: ek parat jo cheezein chhupati hai bina delete
kiye) hides pixels instead of deleting them. The pixels are still there. They are
just hidden. You can bring them back any time.

Here is how a mask works:

- A mask is attached to a layer.
- Paint **black** on the mask to hide that part of the layer.
- Paint **white** on the mask to show it again.

So a mask is like a curtain. You can close it to hide, and open it to show. The
thing behind it never gets thrown away.

!!! warning "Use a mask, not the eraser"
    New designers reach for the eraser. Then they cannot undo it later. Use a
    layer mask instead. It does the same job, but it never deletes anything. You
    will thank yourself when you change your mind.

To add a mask, select your layer and click the mask button at the bottom of the
layers panel. It looks like a small rectangle with a circle inside.

!!! tip "tl;dr"
    The top layer shows in front, so order matters. A selection chooses the part
    of a photo you want to edit. Quick Selection works like a brush, and the
    Magic Wand grabs one color. A layer mask hides pixels without deleting them,
    so use a mask instead of the eraser.

## Knowledge check

1. Which layer shows in front, the top one or the bottom one?
2. What is a selection, and why is it useful?
3. When would you use the Magic Wand instead of Quick Selection?
4. What is the difference between a mask and the eraser?
5. On a mask, what does painting black do?

??? success "Urdu mein chhoti wazahat"
    Sab se upar wali layer aage dikhti hai, is liye order zaroori hai. Selection
    photo ka woh hissa hai jise tum edit karna chahte ho. Quick Selection brush
    ki tarah chalta hai, aur Magic Wand ek jaisa rang pakarta hai. Eraser pixels
    ko hamesha ke liye mita deta hai, lekin mask sirf chhupata hai bina delete
    kiye. Mask par black paint karne se woh hissa chhup jata hai.

## Optional assignment

Open a photo of yourself in Photoshop or Photopea. Use the Quick Selection tool
to select your body. Add a layer mask to the photo layer. Now the background
should hide, and only you should show. Put a new color or another photo on a
layer below. Save it as a `.psd`.

[Next lesson: 3.3 Retouching →](3-3-retouching.md){ .next-lesson }

## Want more? (optional)

- [Adobe - Layer masks](https://helpx.adobe.com/photoshop/using/masking-layers.html)
- [Photopea Learn](https://www.photopea.com/learn/)
