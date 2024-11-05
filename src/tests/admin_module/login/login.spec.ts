import { faker } from "@faker-js/faker";
import { expect, test } from "../../../fixtures/base.fixture";
import * as testData from "../../../test_data/login-errors.data.json"
import ENV from "../../../utils/env"


test.describe('Feature: Admin panel login module', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(ENV.BASE_URL);
    });

    test('Verify admin login page logo is visible @regression', async ({ page, loginPage }) => {
        await test.step("Login page logo is visible", async () => {
            await page.waitForLoadState('domcontentloaded')

            const imgLogo: string = await loginPage.getImgSrcOfLogo();
            expect(imgLogo.length, 'logo img dom element do not have src path define').toBeGreaterThan(1);

            if (imgLogo.length > 1) {
                console.log(ENV.BASE_URL + imgLogo)
                const res = await page.request.get(ENV.BASE_URL + imgLogo);
                console.log(res.status())
                expect(res.status(), 'Failed to load Logo: Image Src: [' + imgLogo + ']').toBe(200);
            }
        })
    });

    test('Verify user successfully redirect to login page @smoke @regression', async ({ page }) => {
        await test.step("Admin should be able to see the login page", async () => {
            await expect(page).toHaveURL(/.*login/);
        })
    });

    test('Verify admin unable to login with valid email and wrong password @regression', async ({ page, loginPage }) => {
        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input valid email and wrong password in login page', async () => {
            const wrongPassword = faker.internet.password({ length: 12 });
            await loginPage.inputEmail(ENV.TEST_ADMIN_EMAIL);
            await loginPage.inputPassword(wrongPassword);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should see invalid credentials error message', async () => {
            await expect(loginPage.getInvalidCredentialsErrorMessage()).toHaveText(testData.loginPageErrorsList.invalidCredentialsErrorMessage);
        })

    });

    test('Verify admin unable to login with invalid email and valid password @regression', async ({ page, loginPage }) => {

        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input invalid email and valid password in login page', async () => {
            await loginPage.inputEmail(faker.internet.email());
            await loginPage.inputPassword(ENV.TEST_ADMIN_PASSWORD);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should see invalid credentials error message', async () => {
            await expect(loginPage.getInvalidCredentialsErrorMessage()).toHaveText(testData.loginPageErrorsList.invalidCredentialsErrorMessage);
        })

    });

    test('Verify admin unable to login without email @regression', async ({ page, loginPage }) => {

        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input only password', async () => {
            await loginPage.inputPassword(ENV.TEST_CUSTOMER_PASSWORD);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should see email input field error message', async () => {
            await expect(loginPage.getEmailErrorMessage().first()).toHaveText(testData.loginPageErrorsList.requiredValueErrorMessage);
        })

    });

    test('Verify admin unable to login without password @regression', async ({ page, loginPage }) => {

        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input only email', async () => {
            await loginPage.inputEmail(ENV.TEST_CUSTOMER_EMAIL);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should see password input field error message', async () => {
            await expect(loginPage.getEmailErrorMessage().last()).toHaveText(testData.loginPageErrorsList.requiredValueErrorMessage);
        })

    });

    test('Verify admin unable to login with invalid email @regression', async ({ page, loginPage }) => {

        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input invalid email and valid password', async () => {
            await loginPage.inputEmail(faker.internet.domainName());
            await loginPage.inputPassword(ENV.TEST_CUSTOMER_PASSWORD);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should see wrong credentials error message', async () => {
            await expect(loginPage.getInvalidCredentialsErrorMessage()).toHaveText(testData.loginPageErrorsList.invalidCredentialsErrorMessage);
        })

    });

    test('Verify admin successfully login with valid email and password @smoke @regression', async ({ page, loginPage, commonPage }) => {

        await test.step('Given admin is on login page', async () => {
            await page.waitForURL(/.*login/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*login/);
        })

        await test.step('When admin input valid email and password', async () => {
            await loginPage.inputEmail(ENV.TEST_ADMIN_EMAIL);
            await loginPage.inputPassword(ENV.TEST_ADMIN_PASSWORD);
        })

        await test.step('And admin click login to Dashboard button from login page', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Then admin should successfully login and redirect to admin dashboard', async () => {
            await page.waitForURL(/.*dashboard/, { waitUntil: 'networkidle' });
            await expect(page).toHaveURL(/.*dashboard/);
        })

    });

})
