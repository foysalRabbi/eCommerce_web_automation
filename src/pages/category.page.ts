import { Locator, Page } from "@playwright/test";
import path from "path";
import { WebUtility } from "../utils/web-utility";
import ENV from "../utils/env";

export default class CategoryPage {
    readonly page: Page;
    readonly webUtility: WebUtility;
    readonly addNewButton: Locator;
    readonly categoryPageTitle: Locator;
    readonly nameInput: Locator;
    readonly descriptionTextBox: Locator;
    readonly parentCategorySelect: Locator;
    readonly publishedCheckbox: Locator;
    readonly showOnHomePageCheckbox: Locator;
    readonly includeInTopMenuCheckbox: Locator;
    readonly pageSizeInput: Locator;
    readonly priceRangeFilteringCheckbox: Locator;
    readonly manualPriceRangeFilteringCheckbox: Locator;
    readonly priceFormInput: Locator;
    readonly priceToInput: Locator;
    readonly displayOrderInput: Locator;
    readonly visibilitySelect: Locator;
    readonly menuIconUploader: Locator;
    readonly menuIconUploaderImagePreview: Locator;
    readonly bannersMobileImageUploader: Locator;
    readonly bannersMobileImagePreview: Locator
    readonly bannersDesktopImageUploader: Locator;
    readonly bannersDesktopImagePreview: Locator
    readonly bannersAppImageUploader: Locator;
    readonly bannersAppImagePreview: Locator
    readonly picturesMobileImageUploader: Locator;
    readonly picturesMobileImagePreview: Locator
    readonly picturesDesktopImageUploader: Locator;
    readonly picturesDesktopImagePreview: Locator
    readonly picturesAppImageUploader: Locator;
    readonly picturesAppImagePreview: Locator
    readonly searchEngineFriendlyPageNameInput: Locator;
    readonly metaTitleInput: Locator;
    readonly metaKeywords: Locator;
    readonly metaDescription: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;
    readonly saveAndContinueButton: Locator;
    readonly toastContainer: Locator;
    readonly toastErrorMsg: Locator;
    readonly toastSuccessMsg: Locator;
    readonly categoryListSearchInput: Locator;
    readonly categoryListSearchButton: Locator;
    readonly categoryListPage: Locator;
    readonly categoryListSelectAllCheckbox: Locator;
    readonly categoryListDeleteSelectedButton: Locator;
    readonly categoryDeleteSelectPopupDeleteItemsButton: Locator;
    readonly categoryNameValidationErrorMsg: Locator;



    constructor(page: Page) {
        this.page = page;
        this.webUtility = new WebUtility(page);

        this.addNewButton = page.getByRole('link', { name: 'Add new' });
        this.categoryPageTitle = page.locator('//h3[@class="mb-1"]');
        this.nameInput = page.getByLabel('Category info').getByLabel('Standard').getByRole('textbox');
        this.descriptionTextBox = page.locator('div').filter({ hasText: /^Enter text here\.\.\.$/ }).locator('div');
        this.parentCategorySelect = page.getByLabel('Category info').getByRole('combobox').getByRole('textbox');
        this.publishedCheckbox = page.locator('app-common-input').filter({ hasText: 'Published' }).getByRole('checkbox');
        this.showOnHomePageCheckbox = page.locator('app-common-input').filter({ hasText: 'Show on home page' }).getByRole('checkbox');
        this.includeInTopMenuCheckbox = page.locator('app-common-input').filter({ hasText: 'Include in top menu' }).getByRole('checkbox');
        this.pageSizeInput = page.locator('#pageSize');
        this.priceRangeFilteringCheckbox = page.locator('app-common-input').filter({ hasText: /^Price range filtering$/ }).getByRole('checkbox');
        this.manualPriceRangeFilteringCheckbox = page.locator('app-common-input').filter({ hasText: 'Manual price range filtering' }).getByRole('checkbox');
        this.priceFormInput = page.locator('#priceFrom');
        this.priceToInput = page.locator('#priceTo');
        this.displayOrderInput = page.locator('#displayOrder');
        this.visibilitySelect = page.getByLabel('Display').getByRole('textbox');
        this.menuIconUploader = page.locator('app-file-upload').filter({ hasText: 'Menu icon Upload a file' }).getByRole('button');
        this.menuIconUploaderImagePreview = page.locator('app-file-upload').filter({ hasText: /\bMenu icon Upload a file\b/ }).getByAltText('No preview');
        this.bannersAppImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="banner"]//button [normalize-space () ="Upload a file"]) [3]');
        this.bannersAppImagePreview = page.locator('app-file-upload').filter({ hasText: /\App image Upload a file\b/ }).getByAltText('No preview');
        this.bannersDesktopImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="banner"]//button [normalize-space () ="Upload a file"]) [2]');
        this.bannersDesktopImagePreview = page.locator('app-file-upload').filter({ hasText: /\bDesktop image Upload a file\b/ }).getByAltText('No preview');
        this.bannersMobileImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="banner"]//button [normalize-space () ="Upload a file"]) [1]');
        this.bannersMobileImagePreview = page.locator('app-file-upload').filter({ hasText: /\bMobile image Upload a file\b/ }).getByAltText('No preview')
        this.picturesAppImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="picture"]//button [normalize-space () ="Upload a file"]) [3]');
        this.picturesAppImagePreview = page.getByLabel('Images').getByText('pictureAppImage.jpg')
        this.picturesDesktopImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="picture"]//button [normalize-space () ="Upload a file"]) [2]');
        this.picturesDesktopImagePreview = page.getByLabel('Images').getByText('picturesDesktopImage.jpg')
        this.picturesMobileImageUploader = page.locator('(//app-dynamic-image[@formpropertyname="picture"]//button [normalize-space () ="Upload a file"]) [1]');
        this.picturesMobileImagePreview = page.getByLabel('Images').getByText('pictureMobileImage.jpg')
        this.searchEngineFriendlyPageNameInput = page.locator('//app-common-input[@formpropertyname="seName"]//input[@type="text"]');
        this.metaTitleInput = page.locator('//app-common-input[@formpropertyname="metaTitle"]//input[@type="text"]');
        this.metaKeywords = page.locator('//app-common-input[@formpropertyname="metaKeywords"]//input[@type="text"]');
        this.metaDescription = page.locator('//app-common-input[@formpropertyname="metaDescription"]//textarea');
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.deleteButton = page.locator('app-category-add-edit-form').getByRole('button', { name: 'Delete' });
        this.saveAndContinueButton = page.getByRole('button', { name: 'Save & Continue Edit' });
        this.toastContainer = page.locator('//div[@id="toast-container"]/div');
        this.toastErrorMsg = page.locator('//div[contains(@class, "toast-error")]');
        this.toastSuccessMsg = page.locator('//div[contains(@class, "toast-success")]');
        this.categoryListSearchInput = page.locator('app-common-input').filter({ hasText: 'Category name' }).getByRole('textbox');
        this.categoryListSearchButton = page.getByLabel('Search').getByRole('button', { name: 'Search' });
        this.categoryListPage = page.locator('//table[contains(@class, "table table-striped")]');
        this.categoryListSelectAllCheckbox = page.getByRole('row', { name: 'Name Published Display order Total products Actions' }).getByRole('checkbox')
        this.categoryListDeleteSelectedButton = page.getByRole('button', { name: 'Delete (selected)' });
        this.categoryDeleteSelectPopupDeleteItemsButton = page.getByRole('button', { name: 'Yes, Delete item(s)' });
        this.categoryNameValidationErrorMsg = page.locator('//app-common-input[@formpropertyname="name"]//field-validation-error');
    }

    async clickAddNewButton() {
        await this.addNewButton.click();
    }

    getCategoryPageTitle(): Locator{
        return this.categoryPageTitle;
    }

    async inputCategoryName(name: string) {
        await this.nameInput.fill(name);
    }

    async inputCategoryDescription(description: string) {
        await this.descriptionTextBox.click();
        await this.descriptionTextBox.fill(description);
    }

    async uncheckPublishOption() {
        await this.publishedCheckbox.uncheck();
    }

    async checkShowOnHomePageOption() {
        await this.showOnHomePageCheckbox.check();
    }

    async checkIncludeInTopMenuOption() {
        await this.includeInTopMenuCheckbox.check();
    }

    async inputCategoryPageSize(pageSize: string) {
        await this.pageSizeInput.fill(pageSize);
    }

    async checkPriceRangeFilteringOption() {
        await this.priceRangeFilteringCheckbox.check();
    }

    async checkManualPriceRangeFilteringOption() {
        await this.manualPriceRangeFilteringCheckbox.check();
    }

    async inputPriceForm(priceFrom: string) {
        await this.priceFormInput.fill(priceFrom);
    }

    async inputPriceTo(priceTo: string) {
        await this.priceFormInput.fill(priceTo);
    }

    async inputCategoryDisplayOrder(displayOrder: string) {
        await this.displayOrderInput.fill(displayOrder);
    }

    async inputCategoryVisibility(visibility: string) {
        await this.visibilitySelect.click()
        await this.page.getByRole('option', { name: visibility }).click();
    }

    async inputUploadMenuIcon(menuIconImagePath: string) {
        await this.webUtility.fileUploader(this.menuIconUploader, menuIconImagePath);
        await this.menuIconUploaderImagePreview.waitFor({ state: "visible" });
    }

    async inputUploadBannersMobile(bannerMobileImagePath: string) {
        await this.webUtility.fileUploader(this.bannersMobileImageUploader, bannerMobileImagePath);
        await this.bannersMobileImagePreview.waitFor({ state: "visible" });
    }

    async inputUploadBannersDesktop(bannerDesktopImagePath: string) {
        await this.webUtility.fileUploader(this.bannersDesktopImageUploader, bannerDesktopImagePath);
        await this.bannersDesktopImagePreview.waitFor({ state: "visible" });
    }

    async inputUploadBannersApp(bannerAppImagePath: string) {
        await this.webUtility.fileUploader(this.bannersAppImageUploader, bannerAppImagePath);
        await this.bannersAppImagePreview.waitFor({ state: "visible" });
     }

    async inputUploadPicturesMobile(picturesMobileImagePath: string) {
        await this.webUtility.fileUploader(this.picturesMobileImageUploader, picturesMobileImagePath);
        await this.picturesMobileImagePreview.waitFor({ state: "visible" });
    }

    async inputUploadPicturesDesktop(picturesDesktopImagePath: string) {
        await this.webUtility.fileUploader(this.picturesDesktopImageUploader, picturesDesktopImagePath);
        await this.picturesDesktopImagePreview.waitFor({ state: "visible" });
    }

    async inputUploadPicturesApp(picturesAppImagePath: string) {
        await this.webUtility.fileUploader(this.picturesAppImageUploader, picturesAppImagePath);
        await this.picturesAppImagePreview.waitFor({ state: "visible" });
        await this.toastSuccessMsg.last().waitFor({ state: 'hidden' });
    }

    async getSeoSEName(): Promise<string> {
        return await this.searchEngineFriendlyPageNameInput.getAttribute('value');
    }

    async getSeoSETitle(): Promise<string> {
        return await this.metaTitleInput.getAttribute('value');
    }

    async inputMetaKeyword(metaKey: string) {
        await this.metaKeywords.fill(metaKey);
    }

    async inputMetaDescription(metaDes: string) {
        await this.metaDescription.fill(metaDes);
    }

    async clickSaveButton() {
        await this.saveButton.click();
        try {
            await this.page.waitForEvent("requestfinished", { timeout: 5000 });
        } catch (error) {
            // Handle the error that may occur during the waiting
            console.error("No HTTP Call initiated to :", error);
            // You can choose to rethrow the error or handle it as needed.
        }
    }

    async clickDeleteButton() {
        await this.deleteButton.click();
        await this.categoryDeleteSelectPopupDeleteItemsButton.waitFor({ state: "visible" })
        await this.categoryDeleteSelectPopupDeleteItemsButton.click();
        try {
            await this.page.waitForEvent("requestfinished", { timeout: 5000 });
        } catch (error) {
            // Handle the error that may occur during the waiting
            console.error("No HTTP Call initiated to :", error);
            // You can choose to rethrow the error or handle it as needed.
        }
    }

    getSuccessToastMessage(): Locator {
        return this.toastSuccessMsg.last();
    }

    getErrorToastMessage(): Locator {
        return this.toastErrorMsg.last();
    }

    getToastMessage(): Locator {
        return this.toastContainer;
    }

    async getToastMessageText(): Promise<string> {
        await this.toastContainer.last().waitFor({state: 'visible'})
        return (await this.toastContainer.textContent()).trim();
    }

    async searchCategoryNameInListPage(searchName: string) {
        await this.categoryListPage.waitFor({ state: "visible" });
        await this.categoryListSearchInput.fill(searchName);
        await this.categoryListSearchButton.click();
        await this.page.waitForEvent('requestfinished')
    }

    async getSearchResultColNameValues(): Promise<string[]> {
        await this.categoryListPage.waitFor({ state: "visible" });
        const rows = this.categoryListPage.locator('tbody tr');
        let rowCount: number = await rows.count();

        if (rowCount > 0) {
            const cols = rows.first().locator('td');
            const textContents = await cols.allTextContents();

            // Remove leading and trailing spaces from each element
            const trimmedTextContents = textContents.map(text => text.trim());
            return trimmedTextContents;
        }
        return []; // Return an empty array if there are no rows or columns

    }

    async selectAllSearchedItems() {
        await this.categoryListSelectAllCheckbox.click();
    }

    async clickDeleteSelectedSearchItems() {
        await this.categoryListDeleteSelectedButton.click();
        await this.categoryDeleteSelectPopupDeleteItemsButton.waitFor({ state: "visible" })
        await this.categoryDeleteSelectPopupDeleteItemsButton.click();
        await this.page.waitForEvent("requestfinished")
    }

    getCategoryNameValidationError(): Locator {
        return this.categoryNameValidationErrorMsg;
    }

    async goToCategoryEditDetailsPage() {
        await this.categoryListPage.waitFor({ state: "visible" });
        const rows = this.categoryListPage.locator('tbody tr');
        const firstCol = rows.first().locator('td');
        const editButton = firstCol.last().locator('//button[@type="button"][normalize-space()="Edit"]')
        editButton.click()
    }


}