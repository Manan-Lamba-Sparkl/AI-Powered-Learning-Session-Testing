
import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://me.sparkl.training/org/pprm/signin';

test.describe('Sparkl Login Page Test Scenarios', () => {

    // Runs before every test
    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_URL);
    });

    // TC01: Verify login page loads
    test('TC01 - Verify login page loads', async ({ page }) => {

        await expect(page).toHaveURL(/signin/);

    });

    // TC02: Verify username field is visible
    test('TC02 - Verify username field is visible', async ({ page }) => {

        const username = page.getByRole('textbox', {
            name: 'Username'
        });

        await expect(username).toBeVisible();

    });

    // TC03: Verify four PIN fields exist
    test('TC03 - Verify four PIN fields exist', async ({ page }) => {

        const pinFields = page.locator('[id^="pin-input-"]');

        await expect(pinFields).toHaveCount(4);

    });

    // TC04: Verify Login button is visible
    test('TC04 - Verify Login button is visible', async ({ page }) => {

        const loginButton = page.getByRole('button', {
            name: /login/i
        });

        await expect(loginButton).toBeVisible();

    });

    // TC05: Enter username
    test('TC05 - Enter username', async ({ page }) => {

        const username = page.getByRole('textbox', {
            name: 'Username'
        });

        await username.fill('se182');

        await expect(username).toHaveValue('se182');

    });

    // TC06: Enter PIN
    test('TC06 - Enter PIN', async ({ page }) => {

        const pin = ['1', '2', '3', '4'];

        for (let i = 0; i < 4; i++) {

            const pinField = page.locator(`#pin-input-${i}`);

            await pinField.fill(pin[i]);

            await expect(pinField).toHaveValue(pin[i]);

        }

    });

});
