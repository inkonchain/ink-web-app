import { expect, test } from "@playwright/test";

import { routing } from "@/routing";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const locator = page.locator("#threejs-loader");
  await expect(locator).toHaveCount(0);
});

test.describe("Home Page", () => {
  test.skip("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });

  test.skip("can join the waitlist", async ({ page }) => {
    const waitlistButton = await page.$('button[aria-label="mail"]');
    await waitlistButton!.click();

    const emailBox = page
      .getByTestId("centered-modal")
      .getByRole("textbox", { name: "Email" });
    await emailBox.fill("something@something.com");
    await emailBox.press("Enter");
  });

  test.skip("can join the discord", async ({ page }) => {
    // Get the button element
    const discordButton = page
      .getByRole("button", {
        name: "Join Discord",
      })
      .first();

    // Click the button
    await discordButton.click();

    // Wait for the new page to load
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      discordButton.click(),
    ]);

    // Verify the new page URL is the Discord link
    await expect(newPage.url()).toBe(routing.pathnames.discord);

    // Verify the new page title
    await expect(await newPage.title()).toMatch(/^(Ink|Discord)$/);
  });
});
