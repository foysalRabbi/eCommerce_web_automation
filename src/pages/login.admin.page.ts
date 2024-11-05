import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly rememberMe: Locator;
    readonly forgotPassword: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMsg: Locator;
    readonly loginRequiredValueError: Locator;
    readonly loginPageLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Password');
        this.rememberMe = page.getByLabel('Remember me?');
        this.loginButton = page.getByRole('button', { name: 'Login to Dashboard' });
        this.forgotPassword = page.getByRole('link', { name: 'Forgot password?' });
        this.loginErrorMsg = page.locator('//div[contains(@class, "toast-error")]');
        this.loginRequiredValueError = page.locator('//small[contains(@class, text-danger)]');
        this.loginPageLogo = page.getByRole('img', { name: 'Shwapno' });

    }

    async inputEmail(cusEmail: string) {
        await this.email.fill(cusEmail);
    }

    async inputPassword(cusPassword: string) {
        await this.password.fill(cusPassword);
    }

   async clickLoginButton() {
        await this.loginButton.click();
    }

    getInvalidCredentialsErrorMessage(): Locator {
        return this.loginErrorMsg;
    }

    getEmailErrorMessage(): Locator {
        return this.loginRequiredValueError;
    }

    async getImgSrcOfLogo(): Promise<string> {
        return await this.loginPageLogo.getAttribute('src');
    }

}
