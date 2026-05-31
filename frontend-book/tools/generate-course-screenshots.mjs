import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const outDir = resolve(__dirname, '../docs/assets/img');

const saffron = '#f0a01a';

function chromeFrame({ title, url, body, dark = false }) {
  return `
    <main class="browser ${dark ? 'dark' : ''}">
      <div class="chrome-top">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="tab">${title}</div>
        <div class="url">${url}</div>
      </div>
      <section class="viewport">${body}</section>
    </main>
  `;
}

function terminalFrame({ body }) {
  return `
    <main class="terminal-frame">
      <div class="terminal-top"><span>Windows PowerShell</span><b>_</b><b>[]</b><b>x</b></div>
      <pre>${body}</pre>
    </main>
  `;
}

function vscodeFrame({ body }) {
  return `
    <main class="vscode">
      <aside>
        <div>EXPLORER</div>
        <p>my-app</p>
        <span>package.json</span>
        <span>index.html</span>
        <span class="active">src/App.jsx</span>
        <span>src/main.jsx</span>
      </aside>
      <section>
        <header>App.jsx</header>
        <pre>${body}</pre>
      </section>
    </main>
  `;
}

const scenes = [
  {
    file: 'devtools-network-waterfall.png',
    html: chromeFrame({
      title: 'Chrome DevTools - Network',
      url: 'https://courses.banoqabilsahiwal.org/frontend/',
      dark: true,
      body: `
        <div class="site-preview">
          <h1>Bano Qabil Courses</h1>
          <p>Beginner-first frontend lessons for students in Pakistan.</p>
          <button>Start learning</button>
        </div>
        <div class="devtools">
          <nav><b>Elements</b><b>Console</b><b class="selected">Network</b><b>Sources</b><b>Lighthouse</b></nav>
          <div class="network-toolbar">Preserve log&nbsp;&nbsp; Disable cache&nbsp;&nbsp; No throttling</div>
          <div class="network-table">
            <div class="row head"><span>Name</span><span>Status</span><span>Type</span><span>Size</span><span>Waterfall</span></div>
            <div class="row"><span>index.html</span><span>200</span><span>document</span><span>18 KB</span><i style="width:14%"></i></div>
            <div class="row"><span>brand.css</span><span>200</span><span>stylesheet</span><span>42 KB</span><i style="width:31%"></i></div>
            <div class="row highlight"><span>hero-image.webp</span><span>200</span><span>image</span><span>486 KB</span><i style="width:78%"></i></div>
            <div class="row"><span>quiz.js</span><span>200</span><span>script</span><span>24 KB</span><i style="width:22%"></i></div>
          </div>
        </div>
      `,
    }),
  },
  {
    file: 'figma-dev-mode-button.png',
    html: chromeFrame({
      title: 'Figma - Dev Mode',
      url: 'figma.com/file/bq-button-system',
      body: `
        <div class="figma-app">
          <aside class="figma-left">Layers<br><span>Donation card</span><span class="active">Donate button</span><span>Footer</span></aside>
          <div class="figma-canvas"><div class="button-art">Donate now</div></div>
          <aside class="figma-right">
            <h3>Dev Mode</h3>
            <label>Fill</label><div class="token highlight">#0F766E</div>
            <label>Typography</label><div class="token">Inter / 16 / 600</div>
            <label>Padding</label><div class="token highlight">16 px left + right<br>12 px top + bottom</div>
            <label>Radius</label><div class="token">12 px</div>
            <label>CSS</label><pre>background: #0F766E;
padding: 12px 16px;
border-radius: 12px;</pre>
          </aside>
        </div>
      `,
    }),
  },
  {
    file: 'figma-export-panel.png',
    html: chromeFrame({
      title: 'Figma - Export',
      url: 'figma.com/file/bq-logo-export',
      body: `
        <div class="figma-app">
          <aside class="figma-left">Layers<br><span class="active">BQ Logo</span><span>Header</span><span>Hero</span></aside>
          <div class="figma-canvas"><div class="logo-mark">BQ</div></div>
          <aside class="figma-right">
            <h3>Design</h3>
            <label>Export</label>
            <div class="export-row highlight"><b>1x</b><b>SVG</b><button>Export BQ Logo</button></div>
            <div class="export-row"><b>2x</b><b>PNG</b><button>Export PNG</button></div>
            <p class="hint">Choose SVG for logos and icons. Use PNG when a tool does not accept SVG.</p>
          </aside>
        </div>
      `,
    }),
  },
  {
    file: 'vercel-import-project.png',
    html: chromeFrame({
      title: 'Vercel - New Project',
      url: 'vercel.com/new',
      body: `
        <div class="dashboard">
          <h1>Import Git Repository</h1>
          <p>Select the GitHub repository you want to deploy.</p>
          <div class="repo"><span>banoqabil-donation-site</span><em>Updated 2 minutes ago</em><button class="highlight">Import</button></div>
          <div class="repo"><span>html-practice</span><em>Updated yesterday</em><button>Import</button></div>
          <div class="repo"><span>portfolio-v1</span><em>Updated last week</em><button>Import</button></div>
        </div>
      `,
    }),
  },
  {
    file: 'vercel-deployment-success.png',
    html: chromeFrame({
      title: 'Vercel - Deployment',
      url: 'vercel.com/omar/donation-site',
      body: `
        <div class="success">
          <div class="check">✓</div>
          <h1>Congratulations!</h1>
          <p>Your project has been deployed to production.</p>
          <div class="live-url highlight">https://bq-donation.vercel.app</div>
          <button>Visit</button>
        </div>
      `,
    }),
  },
  {
    file: 'vercel-build-log-ready.png',
    html: chromeFrame({
      title: 'Vercel - Build Logs',
      url: 'vercel.com/omar/donation-site/deployments',
      dark: true,
      body: `
        <div class="logs">
          <h1>Building donation-site</h1>
          <p>13:42:05 Running "npm run build"</p>
          <p>13:42:07 vite v6.0.1 building for production...</p>
          <p>13:42:10 dist/index.html 0.48 kB</p>
          <p>13:42:11 Uploading build outputs...</p>
          <p class="highlight ready">13:42:13 Ready - Deployed to Production</p>
        </div>
      `,
    }),
  },
  {
    file: 'infinityfree-dashboard.png',
    html: chromeFrame({
      title: 'InfinityFree - Client Area',
      url: 'app.infinityfree.net/accounts',
      body: `
        <div class="hosting">
          <h1>Hosting Accounts</h1>
          <button class="create">Create Account</button>
          <div class="account highlight"><b>bqproject.infinityfreeapp.com</b><span>Active hosting account</span><button>Manage</button></div>
          <div class="account"><b>portfolio.infinityfreeapp.com</b><span>Active hosting account</span><button>Manage</button></div>
        </div>
      `,
    }),
  },
  {
    file: 'cpanel-main-tiles.png',
    html: chromeFrame({
      title: 'cPanel - Tools',
      url: 'cpanel.example.com',
      body: `
        <div class="cpanel">
          <h1>Tools</h1>
          <div class="tiles">
            <div class="tile highlight">File Manager</div><div class="tile">Domains</div><div class="tile">SSL/TLS Status</div>
            <div class="tile">Email Accounts</div><div class="tile">MySQL Databases</div><div class="tile">Backup</div>
          </div>
        </div>
      `,
    }),
  },
  {
    file: 'cpanel-file-manager-public-html.png',
    html: chromeFrame({
      title: 'cPanel - File Manager',
      url: 'cpanel.example.com/filemanager',
      body: `
        <div class="filemanager">
          <aside><b>home</b><span class="highlight">public_html</span><span>tmp</span><span>mail</span></aside>
          <section>
            <header><button class="highlight">Upload</button><button>Extract</button><button>Delete</button></header>
            <div class="file-row head">Name <span>Size</span></div>
            <div class="file-row">index.html <span>12 KB</span></div>
            <div class="file-row">assets <span>Folder</span></div>
            <div class="file-row">style.css <span>31 KB</span></div>
          </section>
        </div>
      `,
    }),
  },
  {
    file: 'cpanel-ssl-free-certificate.png',
    html: chromeFrame({
      title: 'cPanel - SSL/TLS',
      url: 'cpanel.example.com/ssl',
      body: `
        <div class="ssl">
          <h1>SSL/TLS Status</h1>
          <p>Install HTTPS so visitors see the padlock in the browser.</p>
          <div class="cert highlight"><b>bqproject.infinityfreeapp.com</b><span>Free certificate available</span><button>Run AutoSSL</button></div>
          <div class="cert"><b>www.bqproject.infinityfreeapp.com</b><span>Pending DNS check</span><button>View</button></div>
        </div>
      `,
    }),
  },
  {
    file: 'vite-create-react-prompt.png',
    html: terminalFrame({
      body: `<span class="muted">PS C:\\Users\\Student\\Desktop&gt;</span> npm create vite@latest my-app
? Select a framework:
  Vanilla
  Vue
<span class="highlight-line">&gt; React</span>
  Preact
  Svelte
  Solid
  Qwik`,
    }),
  },
  {
    file: 'vite-react-starter-localhost.png',
    html: chromeFrame({
      title: 'Vite + React',
      url: 'http://localhost:5173/',
      body: `
        <div class="vite-page">
          <div class="logo-pair"><span>V</span><span>R</span></div>
          <h1>Vite + React</h1>
          <button>count is 0</button>
          <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
        </div>
      `,
    }),
  },
  {
    file: 'vscode-app-jsx-boilerplate.png',
    html: vscodeFrame({
      body: `<span class="line">1</span> import { useState } from 'react'
<span class="line">2</span> import reactLogo from './assets/react.svg'
<span class="line">3</span> import viteLogo from '/vite.svg'
<span class="line">4</span> import './App.css'
<span class="line">5</span>
<span class="line">6</span> <span class="highlight-line">function App() {</span>
<span class="line">7</span>   const [count, setCount] = useState(0)
<span class="line">8</span>
<span class="line">9</span>   return (
<span class="line">10</span>     &lt;&gt;
<span class="line">11</span>       &lt;h1&gt;Vite + React&lt;/h1&gt;
<span class="line">12</span>     &lt;/&gt;
<span class="line">13</span>   )
<span class="line">14</span> }`,
    }),
  },
  {
    file: 'design-spec-alkhidmat-donation.png',
    html: chromeFrame({
      title: 'Design Spec - Donation Landing Page',
      url: 'local design handoff',
      body: `
        <div class="spec">
          <section class="phone">
            <h1>Give a warm meal today</h1>
            <p>A small gift can help a family eat with dignity.</p>
            <button>Donate now</button>
            <div class="amounts"><b>Rs 500</b><b>Rs 1000</b><b>Rs 2000</b></div>
            <div class="why">Why give<br><span>Meals, school support, and emergency relief.</span></div>
          </section>
          <aside>
            <h2>Mobile design spec</h2>
            <p><b>Primary:</b> #0F766E</p>
            <p><b>Accent:</b> #F0A01A</p>
            <p><b>Radius:</b> 16 px cards, 999 px buttons</p>
            <p><b>Spacing:</b> 24 px page padding</p>
            <p class="highlight">Use this local spec until a public Figma link is added.</p>
          </aside>
        </div>
      `,
    }),
  },
  {
    file: 'design-spec-ecommerce-store.png',
    html: chromeFrame({
      title: 'Design Spec - Ecommerce Capstone',
      url: 'local design handoff',
      body: `
        <div class="store-spec">
          <h1>5-page store design</h1>
          <div class="screens">
            <section><b>Home</b><span>Hero, categories, featured products</span></section>
            <section><b>Shop</b><span>Filters, product grid, sort menu</span></section>
            <section><b>Detail</b><span>Gallery, sizes, add to cart</span></section>
            <section><b>Cart</b><span>Quantity controls and subtotal</span></section>
            <section><b>Checkout</b><span>Contact, address, order summary</span></section>
          </div>
          <p class="highlight">Build these screens from the written spec and replace this with a public Figma link later.</p>
        </div>
      `,
    }),
  },
];

function pageHtml(scene) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; width: 1440px; height: 900px; background: #d9dee8; color: #15202b; font-family: "Segoe UI", Arial, sans-serif; }
  .browser, .terminal-frame, .vscode { width: 1280px; height: 760px; margin: 70px auto; overflow: hidden; border-radius: 18px; background: #fff; box-shadow: 0 30px 90px rgba(26, 34, 55, .28); border: 1px solid rgba(0,0,0,.12); }
  .chrome-top { height: 72px; background: #f4f6f9; display: grid; grid-template-columns: 90px 220px 1fr; gap: 12px; align-items: center; padding: 0 18px; border-bottom: 1px solid #d8dde7; }
  .dots span { display: inline-block; width: 13px; height: 13px; margin-right: 7px; border-radius: 50%; background: #ff5f57; }
  .dots span:nth-child(2) { background: #ffbd2e; } .dots span:nth-child(3) { background: #28c840; }
  .tab, .url { height: 38px; display: flex; align-items: center; border-radius: 999px; padding: 0 18px; background: #fff; color: #3d4655; font-size: 14px; }
  .url { color: #687285; }
  .viewport { height: calc(100% - 72px); position: relative; background: #fbfcfe; }
  .dark .chrome-top { background: #22252d; border-color: #343944; } .dark .tab, .dark .url { background: #11141a; color: #cfd7e5; } .dark .viewport { background: #10141c; color: #e8edf7; }
  .highlight, .highlight-line { outline: 4px solid ${saffron}; outline-offset: 3px; border-radius: 8px; }
  .site-preview { position: absolute; left: 0; top: 0; width: 48%; height: 100%; padding: 72px; background: linear-gradient(135deg,#f7faf8,#ecf7f4); }
  .site-preview h1 { font-size: 54px; margin: 0 0 20px; line-height: 1; } .site-preview p { font-size: 21px; line-height: 1.45; color: #4e5b67; } button { border: 0; border-radius: 999px; background: #0f766e; color: #fff; font-weight: 700; padding: 13px 22px; }
  .devtools { position: absolute; right: 0; top: 0; width: 52%; height: 100%; background: #11141a; color: #cfd7e5; border-left: 1px solid #333945; }
  .devtools nav { display: flex; gap: 24px; padding: 18px 22px; border-bottom: 1px solid #313744; } .devtools .selected { color: ${saffron}; }
  .network-toolbar { padding: 13px 22px; color: #9fa9b9; border-bottom: 1px solid #313744; }
  .network-table { padding: 10px 16px; } .row { display: grid; grid-template-columns: 2fr .7fr .9fr .8fr 2fr; gap: 10px; align-items: center; padding: 12px; border-bottom: 1px solid #252b36; font-size: 14px; } .row.head { color: #8994a7; } .row i { display: block; height: 12px; background: linear-gradient(90deg,#47b4ff,#e78a3b); border-radius: 5px; }
  .figma-app { height: 100%; display: grid; grid-template-columns: 230px 1fr 320px; } .figma-left, .figma-right { background: #f6f7fa; padding: 24px; border-right: 1px solid #dde2eb; font-size: 14px; } .figma-right { border-right: 0; border-left: 1px solid #dde2eb; }
  .figma-left span { display: block; margin: 14px 0; padding: 10px; border-radius: 8px; color: #596579; } .figma-left .active { background: #e7f2f1; color: #0f766e; font-weight: 700; }
  .figma-canvas { display: grid; place-items: center; background: #eef2f7; background-image: linear-gradient(#dfe5ee 1px,transparent 1px), linear-gradient(90deg,#dfe5ee 1px,transparent 1px); background-size: 32px 32px; }
  .button-art { background: #0f766e; color: white; padding: 18px 34px; border-radius: 14px; font-size: 24px; font-weight: 800; box-shadow: 0 18px 45px rgba(15,118,110,.25); }
  .logo-mark { width: 160px; height: 160px; display: grid; place-items: center; background: #0f766e; color: white; font-size: 48px; font-weight: 900; border-radius: 34px; }
  .figma-right h3 { margin-top: 0; font-size: 24px; } .figma-right label { display: block; margin: 18px 0 8px; color: #6b7485; font-weight: 700; } .token, .figma-right pre, .export-row { background: white; border: 1px solid #dfe4ed; border-radius: 10px; padding: 13px; } .export-row { display: grid; grid-template-columns: 50px 70px 1fr; align-items: center; margin: 12px 0; gap: 8px; } .hint { color: #677386; line-height: 1.45; }
  .dashboard, .success, .hosting, .cpanel, .ssl, .logs, .vite-page, .spec, .store-spec { padding: 58px 70px; }
  .dashboard h1, .hosting h1, .cpanel h1, .ssl h1, .store-spec h1 { font-size: 38px; margin: 0 0 12px; } .dashboard p, .ssl p { color: #687285; font-size: 18px; }
  .repo, .account, .cert { display: grid; grid-template-columns: 1fr 220px 120px; align-items: center; gap: 20px; margin: 18px 0; padding: 22px; border: 1px solid #dfe4ed; border-radius: 12px; background: #fff; font-size: 18px; } .repo em, .account span, .cert span { color: #687285; font-style: normal; }
  .success { text-align: center; padding-top: 90px; } .check { margin: 0 auto 18px; width: 88px; height: 88px; border-radius: 50%; display: grid; place-items: center; background: #0f766e; color: white; font-size: 52px; } .success h1 { font-size: 50px; margin: 0; } .live-url { margin: 30px auto 20px; width: 480px; padding: 20px; border: 1px solid #dfe4ed; border-radius: 12px; font-size: 22px; background: #fff; }
  .logs p { font-family: Consolas, monospace; padding: 12px 16px; margin: 8px 0; background: #171c25; border-radius: 8px; color: #cfd7e5; } .logs h1 { color: white; } .ready { color: #b8f7d4 !important; }
  .create { float: right; } .tiles { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 32px; } .tile { min-height: 118px; display: grid; place-items: center; border: 1px solid #dfe4ed; border-radius: 14px; background: #fff; font-size: 22px; font-weight: 800; }
  .filemanager { display: grid; grid-template-columns: 260px 1fr; height: 100%; } .filemanager aside { background: #f2f5f8; padding: 32px; border-right: 1px solid #dfe4ed; } .filemanager aside span { display: block; padding: 13px; margin: 10px 0; border-radius: 8px; } .filemanager section { padding: 32px; } .filemanager header { display: flex; gap: 12px; margin-bottom: 26px; } .file-row { display: flex; justify-content: space-between; padding: 18px; border-bottom: 1px solid #dfe4ed; font-size: 18px; } .file-row.head { color: #687285; font-weight: 800; }
  .terminal-frame { background: #0c1117; color: #dce7f4; } .terminal-top { height: 48px; display: flex; gap: 18px; justify-content: flex-end; align-items: center; padding: 0 18px; background: #151b23; } .terminal-top span { margin-right: auto; } .terminal-frame pre { margin: 0; padding: 48px; font: 24px/1.65 Consolas, monospace; white-space: pre-wrap; } .muted { color: #94a3b8; }
  .vite-page { text-align: center; } .logo-pair { display: flex; justify-content: center; gap: 28px; font-size: 74px; font-weight: 900; } .logo-pair span { width: 110px; height: 110px; display: grid; place-items: center; border-radius: 28px; color: white; background: #646cff; } .logo-pair span + span { background: #61dafb; color: #10141c; } .vite-page h1 { font-size: 58px; } .vite-page button { background: #20242c; }
  .vscode { display: grid; grid-template-columns: 250px 1fr; background: #1e1e1e; color: #d4d4d4; font-family: Consolas, monospace; } .vscode aside { background: #252526; padding: 22px; border-right: 1px solid #333; } .vscode aside p { color: #fff; font-weight: 700; } .vscode aside span { display: block; padding: 9px; color: #c7c7c7; } .vscode aside .active { background: #37373d; color: #fff; } .vscode header { height: 44px; background: #2d2d2d; padding: 12px 18px; } .vscode pre { margin: 0; padding: 28px; font-size: 20px; line-height: 1.58; } .line { color: #7f858d; display: inline-block; width: 36px; }
  .spec { display: grid; grid-template-columns: 390px 1fr; gap: 58px; background: #f7faf9; height: 100%; } .phone { width: 360px; height: 620px; border: 12px solid #111827; border-radius: 44px; padding: 42px 26px; background: linear-gradient(#e6f7f4,#fff); box-shadow: 0 24px 60px rgba(17,24,39,.2); } .phone h1 { font-size: 38px; line-height: 1; margin: 0 0 14px; } .phone p { color: #52606f; } .phone button { width: 100%; margin: 18px 0; } .amounts { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; } .amounts b { background: #fff; padding: 12px 6px; border: 1px solid #dbe7e5; border-radius: 12px; text-align: center; } .why { margin-top: 24px; padding: 18px; border-radius: 16px; background: #fff; } .why span { color: #607080; }
  .spec aside h2 { font-size: 42px; margin: 20px 0; } .spec aside p { font-size: 21px; line-height: 1.4; }
  .store-spec { background: #fbfaf7; height: 100%; } .screens { display: grid; grid-template-columns: repeat(5,1fr); gap: 18px; margin: 48px 0; } .screens section { min-height: 300px; padding: 20px; border-radius: 18px; background: #fff; border: 1px solid #e3ded2; box-shadow: 0 18px 45px rgba(70,55,30,.08); } .screens b { display: block; font-size: 25px; margin-bottom: 16px; } .screens span { color: #687285; line-height: 1.4; } .store-spec p { font-size: 22px; padding: 20px; background: #fff; }
</style>
</head>
<body>${scene.html}</body>
</html>`;
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const scene of scenes) {
  await page.setContent(pageHtml(scene), { waitUntil: 'networkidle' });
  await page.screenshot({ path: resolve(outDir, scene.file), fullPage: false });
  console.log(`generated ${scene.file}`);
}

await browser.close();
