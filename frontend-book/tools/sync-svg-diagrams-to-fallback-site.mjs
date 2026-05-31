import { readFile, writeFile } from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const bookRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(bookRoot, '..');
const docsRoot = path.join(bookRoot, 'docs');
const fallbackSite = path.join(workspaceRoot, 'trash', 'frontend-book', 'site');

const changedDocs = [
  'chapter-04-design-ux-foundations/4-1-design-is-for-people.md',
  'chapter-05-tailwind-and-figma/5-2-building-real-components.md',
  'chapter-10-react-foundations/10-2-components-and-props.md',
  'chapter-12-animation-gsap/12-4-lenis-and-locomotive.md',
  'chapter-14-modern-react-patterns/14-1-useref-usememo-usecallback.md',
  'chapter-16-more-animation/16-4-choosing-the-right-tool.md',
  'chapter-17-three-js-and-r3f/17-1-scene-camera-renderer.md',
  'chapter-20-career-and-portfolio/20-2-build-your-portfolio.md',
  'chapter-20-career-and-portfolio/20-4-first-clients-freelancing-halal-income.md',
];

let replaced = 0;
const missing = [];

for (const relativeDoc of changedDocs) {
  const sourcePath = path.join(docsRoot, relativeDoc);
  const sitePath = sitePathFor(relativeDoc);
  if (!fs.existsSync(sitePath)) {
    missing.push(path.relative(workspaceRoot, sitePath).replace(/\\/g, '/'));
    continue;
  }

  const markdown = await readFile(sourcePath, 'utf8');
  let html = await readFile(sitePath, 'utf8');
  const svgs = [...markdown.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)].map((match) => match[0]);

  for (const svg of svgs) {
    const id = svg.match(/aria-labelledby="([^"]+)"/)?.[1];
    if (!id) continue;
    const pattern = new RegExp(`<svg\\b(?=[^>]*aria-labelledby="${escapeRegex(id)}")[\\s\\S]*?<\\/svg>`, 'i');
    if (!pattern.test(html)) continue;
    html = html.replace(pattern, svg);
    replaced += 1;
  }

  await writeFile(sitePath, html);
}

console.log(JSON.stringify({ replaced, missing }, null, 2));

function sitePathFor(relativeDoc) {
  const parsed = path.parse(relativeDoc);
  if (parsed.name === 'index') {
    return path.join(fallbackSite, parsed.dir, 'index.html');
  }
  return path.join(fallbackSite, parsed.dir, parsed.name, 'index.html');
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
