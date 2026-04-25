import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const pages = [
  { path: "/", name: "홈", keyword: "홈페이지를" },
  { path: "/security", name: "보안", keyword: "해킹 시도 중" },
  { path: "/ai-solution", name: "AI 솔루션", keyword: "AI 솔루션" },
  { path: "/app-dev", name: "앱 개발", keyword: "앱·시스템 개발" },
  { path: "/new-website", name: "신규 사이트", keyword: "신규 사이트 구축" },
  { path: "/renewal", name: "리뉴얼", keyword: "홈페이지 리뉴얼" },
  { path: "/privacy", name: "개인정보처리방침", keyword: "개인정보처리방침" },
  { path: "/terms", name: "이용약관", keyword: "이용약관" },
];

async function collectErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

for (const pg of pages) {
  test.describe(pg.name, () => {
    test(`${pg.path} renders visibly with key content`, async ({ page }) => {
      const errors = await collectErrors(page);

      const response = await page.goto(pg.path, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);

      await expect(page.locator('main').getByText(pg.keyword).first()).toBeVisible({
        timeout: 10_000,
      });

      const body = page.locator("body");
      await expect(body).toBeVisible();

      const mainSection = page.locator("main, [role='main'], section").first();
      const styles = await mainSection.evaluate((el) => {
        const cs = window.getComputedStyle(el);
        return {
          opacity: parseFloat(cs.opacity),
          visibility: cs.visibility,
          display: cs.display,
        };
      });
      expect(styles.opacity).toBeGreaterThanOrEqual(0.1);
      expect(styles.visibility).not.toBe("hidden");
      expect(styles.display).not.toBe("none");

      const critical = errors.filter(
        (e) =>
          e.includes("Content-Security-Policy") ||
          e.includes("hydration") ||
          e.includes("Hydration") ||
          e.includes("framer-motion"),
      );
      expect(critical, `Critical console errors on ${pg.path}: ${critical.join("; ")}`).toHaveLength(0);
    });
  });
}
