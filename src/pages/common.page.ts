import { Locator, Page } from "@playwright/test";

export default class CommonPage {
    readonly page: Page;
    readonly registerTopBarButton: Locator;
    readonly loginTopBarButton: Locator;
    readonly logOutTopBarButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerTopBarButton = page.getByRole('link', { name: 'Register' });
        this.loginTopBarButton = page.getByRole('link', { name: 'Log in' })
        this.logOutTopBarButton = page.getByRole('link', { name: 'Log out' })
    }

    async gotoHomePage(testURL: string) {
        await this.page.goto(testURL);
    }

    async clickRegisterButtonFromTopBar() {
        await this.registerTopBarButton.click();
    }

    async clickLoginButtonFromTopBar() {
        await this.loginTopBarButton.click();
    }

    getLogOutTopBarButton(): Locator {
        return this.logOutTopBarButton;
    }

}