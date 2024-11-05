import { Locator, Page } from "@playwright/test";

export default class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async gotoHomePage(testURL: string) {
        await this.page.goto(testURL);
    }


}