
import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const LOGIN_URL = 'https://me.sparkl.training/org/pprm/signin';

const authFile = 'playwright/.auth/user.json';

setup('Login and save authentication', async ({ page }) => {

    // Step 1: Open login page
    await page.goto(LOGIN_URL);

    // Step 2: Enter username
    const username = page.getByRole('textbox', {
        name: 'Username'
    });

    await username.fill(process.env.SPARKL_USERNAME);

    // Step 3: Enter four-digit PIN
    const pin = process.env.SPARKL_PASSWORD;

    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        throw new Error('SPARKL_PIN must contain exactly 4 digits');
    }

    for (let i = 0; i < 4; i++) {

        const pinField = page.locator(`#pin-input-${i}`);

        await pinField.fill(pin[i]);

    }

    // Step 4: Click Login
    // const loginButton = page.getByRole('button', {
    //     name: /login/i
    // });

    // await expect(loginButton).toBeEnabled({
    //     timeout: 10000
    // });

    // await loginButton.click();

    // Step 5: Verify successful login or Verify dashboard
    await expect(
        page.getByText('Dashboard')
    ).toBeVisible();

    // Wait for successful login
    await expect(page).toHaveURL(/dashboard/);


    // Step 6: Save authentication state
    await page.context().storageState({
        path: authFile
    });

});
