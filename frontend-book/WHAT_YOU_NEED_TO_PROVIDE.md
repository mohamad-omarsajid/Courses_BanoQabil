# What you need to provide

This file is the master checklist for assets that need human input before the
book can be called complete.

## Current status

The live course content is complete from an asset-placeholder point of view:

- [x] No `[SCREENSHOT: ...]` placeholders remain in `docs/`.
- [x] No `[IMAGE: ...]` placeholders remain in `docs/`.
- [x] No `[FIGMA: ...]` placeholders remain in `docs/`.
- [x] No `Screenshot coming soon` blocks remain in `docs/`.

## What was filled

### Screenshots and instructional captures

The detailed screenshot list lives in `SCREENSHOTS_NEEDED.md`. Every item used by
the current lessons has been placed in `docs/assets/img/`.

### Images

The image list lives in `IMAGES_NEEDED.md`. The homepage thumbnails used in
Lesson 1.1 are already present.

### Figma design files

Lesson 5.4 now uses the public community Figma file for the Bano Qabil Sahiwal
website design:

- [Bano Qabil Sahiwal website design](https://www.figma.com/community/file/1578793749331470425/bano-qabil-sahiwal-website-design)

Lesson 13.1 still uses a local ecommerce capstone design-spec image:

- `docs/assets/img/design-spec-ecommerce-store.png`

If a teacher later creates a public Figma file for the ecommerce capstone, paste
that link into Lesson 13.1 and use it as the source of truth for exact spacing,
colours, and typography.

## How to check again later

Run these searches inside `frontend-book` after adding new lessons:

```bash
rg "\[(SCREENSHOT|IMAGE|FIGMA):|Screenshot coming soon" docs
rg "assets/img" docs
```

If the first command prints nothing, there are no live missing-asset markers.
