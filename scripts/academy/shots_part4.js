// slides.html의 각 .slide 요소를 PNG로 스크린샷 (2x, 코스1 풀슬라이드 이미지 방식)
const { chromium } = require('playwright-core');
const fs = require('fs');

const IN = process.argv[2];
const OUTDIR = process.argv[3];
const EXEC = process.env.HOME + '/.cache/ms-playwright/chromium-1217/chrome-linux/chrome';

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const exe = fs.existsSync(EXEC) ? EXEC : undefined;
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await page.goto('file://' + IN, { waitUntil: 'networkidle' });
  const slides = await page.$$('.slide');
  let n = 0;
  for (let i = 0; i < slides.length; i++) {
    const p = `${OUTDIR}/slide-${String(i + 1).padStart(2, '0')}.png`;
    await slides[i].screenshot({ path: p });
    n++;
  }
  await browser.close();
  console.log('스크린샷', n, '장 →', OUTDIR);
})().catch((e) => { console.error(e); process.exit(1); });
