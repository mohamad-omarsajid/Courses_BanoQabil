import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const bookRoot = path.resolve(here, '..');
const docsRoot = path.join(bookRoot, 'docs');
const outDir = path.join(bookRoot, 'test-results', 'svg-audit');

const files = process.argv.slice(2);
const mdFiles = files.length ? files.map((file) => path.resolve(file)) : await collectMarkdown(docsRoot);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 980, height: 720 }, deviceScaleFactor: 1 });
const results = [];

for (const file of mdFiles) {
  const markdown = await readFile(file, 'utf8');
  const svgs = [...markdown.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)];

  for (let index = 0; index < svgs.length; index += 1) {
    const svg = svgs[index][0];
    const before = markdown.slice(0, svgs[index].index);
    const line = before.split(/\r?\n/).length;
    const id = svg.match(/aria-labelledby="([^"]+)"/)?.[1] || svg.match(/id="([^"]+)"/)?.[1] || `svg-${index + 1}`;
    const slug = `${path.relative(docsRoot, file).replace(/[\\/]/g, '__').replace(/\.md$/, '')}__${line}__${id}`
      .replace(/[^a-zA-Z0-9_.-]+/g, '-')
      .slice(0, 180);
    const screenshot = path.join(outDir, `${slug}.png`);

    await page.setContent(
      `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { margin: 0; padding: 24px; background: #f7f6f1; font-family: Arial, sans-serif; }
            .frame { width: 900px; padding: 20px; background: white; border: 1px solid #d6d1c5; }
            svg { width: 100%; height: auto; display: block; outline: 1px dashed rgba(0,0,0,.12); }
          </style>
        </head>
        <body><main class="frame">${svg}</main></body>
      </html>`,
      { waitUntil: 'domcontentloaded' }
    );

    const metrics = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      const viewBox = svg.viewBox.baseVal;
      const svgBox = svg.getBoundingClientRect();
      const elements = [...svg.querySelectorAll('text, rect, circle, ellipse, line, path, polygon, polyline')];
      const offenders = [];
      const texts = [];

      for (const el of elements) {
        let box;
        try {
          box = el.getBBox();
        } catch {
          continue;
        }
        const pad = 1;
        const clipped =
          box.x < viewBox.x - pad ||
          box.y < viewBox.y - pad ||
          box.x + box.width > viewBox.x + viewBox.width + pad ||
          box.y + box.height > viewBox.y + viewBox.height + pad;
        if (clipped) {
          offenders.push({
            tag: el.tagName,
            text: el.textContent.trim().slice(0, 80),
            x: Math.round(box.x),
            y: Math.round(box.y),
            width: Math.round(box.width),
            height: Math.round(box.height),
          });
        }
        if (el.tagName.toLowerCase() === 'text') {
          texts.push({
            text: el.textContent.trim(),
            x: Math.round(box.x),
            y: Math.round(box.y),
            width: Math.round(box.width),
            height: Math.round(box.height),
          });
        }
      }

      const overlaps = [];
      for (let i = 0; i < texts.length; i += 1) {
        for (let j = i + 1; j < texts.length; j += 1) {
          const a = texts[i];
          const b = texts[j];
          if (!a.text || !b.text) continue;
          const xOverlap = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
          const yOverlap = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
          if (xOverlap > 4 && yOverlap > 4) {
            overlaps.push({ a: a.text.slice(0, 50), b: b.text.slice(0, 50), xOverlap, yOverlap });
          }
        }
      }

      return {
        viewBox: {
          x: viewBox.x,
          y: viewBox.y,
          width: viewBox.width,
          height: viewBox.height,
        },
        rendered: { width: Math.round(svgBox.width), height: Math.round(svgBox.height) },
        textCount: texts.length,
        offenders,
        overlaps,
      };
    });

    await page.locator('.frame').screenshot({ path: screenshot });

    const status = metrics.offenders.length || metrics.overlaps.length ? 'review' : 'ok';
    results.push({
      status,
      file: path.relative(bookRoot, file).replace(/\\/g, '/'),
      line,
      id,
      screenshot: path.relative(bookRoot, screenshot).replace(/\\/g, '/'),
      ...metrics,
    });
  }
}

await browser.close();

const reportPath = path.join(outDir, 'report.json');
await writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`);

const review = results.filter((item) => item.status === 'review');
console.log(JSON.stringify({
  total: results.length,
  review: review.length,
  report: path.relative(bookRoot, reportPath).replace(/\\/g, '/'),
  firstReviewItems: review.slice(0, 30).map((item) => ({
    file: item.file,
    line: item.line,
    id: item.id,
    offenders: item.offenders.length,
    overlaps: item.overlaps.length,
    screenshot: item.screenshot,
  })),
}, null, 2));

async function collectMarkdown(root) {
  const fs = await import('node:fs/promises');
  const found = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      if (entry.isFile() && entry.name.endsWith('.md')) found.push(full);
    }
  }
  await walk(root);
  return found.sort();
}
