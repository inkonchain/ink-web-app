import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

console.debug(`Playwright: Running tests against ${baseUrl}`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  webServer: {
    command: "pnpm run start",
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
  },
});
