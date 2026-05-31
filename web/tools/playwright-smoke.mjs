import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5173/';
const outDir = path.resolve('test-results');
const requiredTexts = [
  /Bano Qabil/i,
  /Courses/i,
  /Front[- ]?End|frontend/i,
  /Graphic/i,
  /Sahiwal/i,
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];
const issues = [];

async function runInteractions(page, name) {
  const checks = [];

  await page.getByRole('button', { name: 'Roman Urdu' }).click();
  await page.waitForTimeout(250);
  const ruBody = await page.locator('body').innerText();
  const ruVisible = /Apna\s+tech|Free\s+shuru\s+karo|Kaise\s+chalta\s+hai/i.test(ruBody);
  checks.push({ name: 'language-toggle-ru', ok: ruVisible });
  if (!ruVisible) issues.push(`${name}: Roman Urdu language toggle did not update visible copy`);

  await page.getByRole('button', { name: 'English' }).click();
  await page.waitForTimeout(250);
  const enBody = await page.locator('body').innerText();
  const enVisible = /Start\s+your|Get\s+started/i.test(enBody);
  checks.push({ name: 'language-toggle-en', ok: enVisible });
  if (!enVisible) issues.push(`${name}: English language toggle did not restore visible copy`);

  const beforeTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await page.getByRole('button', { name: 'Switch theme' }).click();
  await page.waitForTimeout(250);
  const afterTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const themeOk = beforeTheme !== afterTheme;
  checks.push({ name: 'theme-toggle', ok: themeOk, before: beforeTheme, after: afterTheme });
  if (!themeOk) issues.push(`${name}: theme toggle did not change data-theme`);

  const menuButton = page.getByRole('button', { name: 'Open menu' });
  if (await menuButton.isVisible().catch(() => false)) {
    await menuButton.click();
    await page.waitForTimeout(250);
    const expanded = await menuButton.getAttribute('aria-expanded');
    const mobileCourseLinkVisible = await page.locator('header').getByRole('link', { name: 'Courses' }).nth(1).isVisible().catch(() => false);
    const menuOk = expanded === 'true' && mobileCourseLinkVisible;
    checks.push({ name: 'mobile-menu', ok: menuOk, expanded });
    if (!menuOk) issues.push(`${name}: mobile menu did not open correctly`);
    await menuButton.click();
  }

  await page.locator('#start').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const ctaHref = await page.locator('#start a[href="/frontend/"]').first().getAttribute('href').catch(() => null);
  const contactHref = await page.locator('#start a[href^="mailto:"]').first().getAttribute('href').catch(() => null);
  const ctaOk = ctaHref === '/frontend/' && Boolean(contactHref);
  checks.push({ name: 'cta-links', ok: ctaOk, ctaHref, contactHref });
  if (!ctaOk) issues.push(`${name}: CTA links are missing or point to the wrong destination`);

  return checks;
}

async function runViewport(name, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('[aria-hidden="true"].fixed.inset-0'), null, {
    timeout: 8000,
  }).catch(() => {});
  await page.waitForTimeout(1200);

  const viewportScreenshot = path.join(outDir, `${name}-viewport.png`);
  await page.screenshot({ path: viewportScreenshot, fullPage: false });

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y <= pageHeight; y += Math.floor(viewportHeight * 0.7)) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);

  const missingTexts = [];
  for (const text of requiredTexts) {
    const count = await page.getByText(text).count();
    if (count === 0) missingTexts.push(text.toString());
  }

  const courseLinks = await page.locator('#courses a').evaluateAll((links) =>
    links.map((link) => ({
      text: link.textContent?.trim() || '',
      href: link.getAttribute('href') || '',
    }))
  );
  const hasFrontendLink = courseLinks.some((link) => link.href === '/frontend/');
  const hasDesignLink = courseLinks.some((link) => link.href === '/design/');

  const interactionChecks = await runInteractions(page, name);
  const routeChecks = [];
  for (const routePath of ['/frontend/', '/design/']) {
    const routePage = await context.newPage();
    const routeResponse = await routePage.goto(new URL(routePath, baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }).catch(() => null);
    const status = routeResponse?.status() ?? null;
    const ok = Boolean(routeResponse?.ok());
    routeChecks.push({ path: routePath, status, ok });
    if (!ok) issues.push(`${name}: ${routePath} returned ${status}`);
    await routePage.close();
  }

  const screenshot = path.join(outDir, `${name}-full.png`);
  await page.screenshot({ path: screenshot, fullPage: true });

  const title = await page.title();
  const bodyText = await page.locator('body').innerText({ timeout: 5000 });
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      hasHorizontalOverflow: root.scrollWidth > root.clientWidth + 1,
    };
  });

  const result = {
    name,
    status: response?.status() ?? null,
    title,
    screenshots: { viewport: viewportScreenshot, fullPage: screenshot },
    textLength: bodyText.length,
    missingTexts,
    courseLinks,
    interactionChecks,
    routeChecks,
    consoleErrors,
    pageErrors,
    overflow,
  };

  if (!response || !response.ok()) issues.push(`${name}: page returned ${result.status}`);
  if (missingTexts.length) issues.push(`${name}: missing expected text ${missingTexts.join(', ')}`);
  if (!hasFrontendLink) issues.push(`${name}: frontend course card does not link to /frontend/`);
  if (!hasDesignLink) issues.push(`${name}: design course card does not link to /design/`);
  if (consoleErrors.length) issues.push(`${name}: console errors: ${consoleErrors.join(' | ')}`);
  if (pageErrors.length) issues.push(`${name}: page errors: ${pageErrors.join(' | ')}`);
  if (overflow.hasHorizontalOverflow) {
    issues.push(`${name}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
  }

  results.push(result);
  await context.close();
}

try {
  await runViewport('home-desktop', { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await runViewport('home-mobile', { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, ok: issues.length === 0, issues, results }, null, 2));
if (issues.length) process.exitCode = 1;
