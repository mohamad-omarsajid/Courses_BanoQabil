# Bano Qabil Sahiwal Courses

Free, beginner-first, self-paced course platform for students and job seekers. The site includes a polished landing page, a public front-end development course, and a design course placeholder while the design material is still being prepared.

## Live Routes

- `/` - landing page
- `/frontend/` - front-end development course
- `/design/` - design course status page

## What Is Inside

- React, Vite, TypeScript landing page in `web/`
- Front-end course source in `frontend-book/`
- Design course draft source in `design-book/`
- Static deploy copies in `web/public/frontend/` and `web/public/design/`
- Vercel and Netlify deployment config at the repo root

## Project Structure

```text
.
|-- frontend-book/        # MkDocs source for the front-end course
|-- design-book/          # MkDocs source for the design course draft
|-- web/                  # React landing page and deployable static assets
|-- vercel.json           # Vercel deployment config
|-- netlify.toml          # Netlify deployment config
|-- package.json          # Root scripts
```

## Local Setup

```bash
npm --prefix web install
npm run dev
```

The local app runs through Vite. By default it serves the landing page and course paths at:

```text
http://localhost:5173/
http://localhost:5173/frontend/
http://localhost:5173/design/
```

## Production Build

```bash
npm run build
```

The build output is created at `web/dist`. The build script also copies:

- `web/public/frontend` to `web/dist/frontend`
- `web/public/design` to `web/dist/design`

## Deploying

Deploy from the repository root.

### Vercel

Vercel reads `vercel.json`.

- Install command: `npm --prefix web ci`
- Build command: `npm --prefix web run build`
- Output directory: `web/dist`

### Netlify

Netlify reads `netlify.toml`.

- Build command: `npm --prefix web ci && npm --prefix web run build`
- Publish directory: `web/dist`

## Course Status

- Front-end course: public and deployable
- Design course: draft content exists, public route currently shows a coming-soon page

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Good first contributions include:

- fixing typos in lessons
- improving Roman Urdu explanations
- adding beginner-friendly examples
- reporting broken links or layout problems
- suggesting missing diagrams or screenshots

## License

This project is released under the [MIT License](LICENSE).
