
// const { test, expect } = require('@playwright/test');

// test('My first Playwright test', async ({ page }) => {
//     await page.goto('https://www.google.com');

//     await expect(page).toHaveTitle(/Google/);

//     console.log('Google website opened successfully!');
// });



// const { test, expect } = require('@playwright/test');

// test('My first Playwright test', async ({ page }) => {
//     await page.goto('https://www.google.com');

//     await expect(page).toHaveTitle(/Google/);

//     console.log('Google website opened successfully!');
// });

import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        launchOptions: {
            slowMo: 5000
        }
    }
});


const { test } = require('@playwright/test');

test('Google test', async ({ page }) => {

    await page.goto('https://www.google.com');

    await page.waitForTimeout(3000);

    await page.locator('textarea[name="q"]').fill('Playwright');

    await page.waitForTimeout(3000);

    await page.keyboard.press('Enter');

    await page.waitForTimeout(5000);

});