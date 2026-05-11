import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/smoke",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "https://www.visionc.co.kr",
    screenshot: "only-on-failure",
    trace: "off",
    launchOptions: {
      executablePath: "/home/ubuntu/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  reporter: [["list"]],
});
