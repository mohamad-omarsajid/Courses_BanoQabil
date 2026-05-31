import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(webRoot, '..');
const distRoot = path.join(webRoot, 'dist');

const courses = [
  {
    name: 'frontend',
    sources: [
      path.join(webRoot, 'public', 'frontend'),
      path.join(workspaceRoot, 'frontend-book', 'site'),
      path.join(workspaceRoot, 'trash', 'frontend-book', 'site'),
    ],
    required: true,
  },
  {
    name: 'design',
    sources: [
      path.join(workspaceRoot, 'design-book', 'site'),
      path.join(workspaceRoot, 'trash', 'design-book', 'site'),
      path.join(webRoot, 'public', 'design'),
    ],
    required: false,
  },
];

function firstExisting(paths) {
  return paths.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isDirectory());
}

function copyCourse(course) {
  const source = firstExisting(course.sources);
  const target = path.join(distRoot, course.name);

  if (!source) {
    if (course.required) {
      throw new Error(`Missing static source for /${course.name}/. Checked: ${course.sources.join(', ')}`);
    }

    console.warn(`[courses] Skipped /${course.name}/ because no static source exists yet.`);
    return;
  }

  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, { recursive: true });
  console.log(`[courses] Copied /${course.name}/ from ${path.relative(workspaceRoot, source)}.`);
}

if (!fs.existsSync(distRoot)) {
  throw new Error('Missing web/dist. Run vite build before preparing static courses.');
}

for (const course of courses) copyCourse(course);
