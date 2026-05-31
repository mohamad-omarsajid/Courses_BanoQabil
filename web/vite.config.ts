import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, '..');

const mimeTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function firstExisting(paths: string[]) {
  return paths.find((p) => fs.existsSync(p) && fs.statSync(p).isDirectory());
}

function serveCourse(prefix: string, candidates: string[]) {
  const root = firstExisting(candidates);
  return {
    name: `serve-${prefix.slice(1)}-course`,
    configureServer(server) {
      if (root) server.middlewares.use(courseMiddleware(prefix, root));
    },
    configurePreviewServer(server) {
      if (root) server.middlewares.use(courseMiddleware(prefix, root));
    },
  };
}

function courseMiddleware(prefix: string, root: string) {
  return (req, res, next) => {
    const rawUrl = req.url?.split('?')[0] || '/';
    if (rawUrl !== prefix && !rawUrl.startsWith(`${prefix}/`)) return next();

    const relativeUrl = rawUrl === prefix ? '/' : rawUrl.slice(prefix.length);
    const decoded = decodeURIComponent(relativeUrl);
    const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(root, normalized);

    if (!filePath.startsWith(root)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath) && !path.extname(filePath)) {
      const htmlPath = `${filePath}.html`;
      if (fs.existsSync(htmlPath)) filePath = htmlPath;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.statusCode = 404;
      res.end('Course page not found');
      return;
    }

    res.setHeader('Content-Type', mimeTypes[path.extname(filePath)] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  };
}

// https://vite.dev/config
export default defineConfig({
  plugins: [
    serveCourse('/frontend', [
      path.join(workspaceRoot, 'frontend-book', 'site'),
      path.join(workspaceRoot, 'trash', 'frontend-book', 'site'),
    ]),
    serveCourse('/design', [
      path.join(workspaceRoot, 'design-book', 'site'),
      path.join(workspaceRoot, 'trash', 'design-book', 'site'),
    ]),
    react(),
    tailwindcss(),
  ],
});
