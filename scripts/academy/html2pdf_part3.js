// HTML 파일 → PDF (캐시된 Chromium으로 인쇄). 기존 코스1 PDF와 동일 방식.
const { chromium } = require('playwright-core');
const fs = require('fs');

const IN = process.argv[2];
const OUT = process.argv[3];
const EXEC = process.env.HOME + '/.cache/ms-playwright/chromium-1217/chrome-linux/chrome';

(async () => {
  const exe = fs.existsSync(EXEC) ? EXEC : undefined;
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const url = 'file://' + IN;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await browser.close();
  console.log('PDF 저장:', OUT, fs.statSync(OUT).size, '바이트');
})().catch((e) => { console.error(e); process.exit(1); });
