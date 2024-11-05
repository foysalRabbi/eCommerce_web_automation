import { Locator, Page } from "@playwright/test";
import path from "path";


export class WebUtility {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fileUploader(element: Locator, filePath: string) {
        const fileChooserPromise = this.page.waitForEvent("filechooser");
        await element.click();
        const fileChooser = await fileChooserPromise;
        // Set the files in the file input
        await fileChooser.setFiles(path.join(__dirname, filePath));
    }
}