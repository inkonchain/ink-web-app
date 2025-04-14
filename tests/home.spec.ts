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
});
