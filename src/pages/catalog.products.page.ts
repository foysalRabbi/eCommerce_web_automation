import { Locator, Page, expect } from "@playwright/test";
import path from "path";
const filePath = "../test_data/images/Product-Photography.jpeg";

export default class ProductPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly catalog: Locator;
  readonly productTab: Locator;
  readonly addNewProductButton: Locator;
  readonly save: Locator;
  readonly productName: Locator;
  readonly shortDescription: Locator;
  readonly descriptionTextarea: Locator;
  readonly sku: Locator;
  readonly productNameRequiredField: Locator;
  readonly productSKUNameRequiredField: Locator;
  readonly productPublish: Locator;
  readonly showOnHomePage: Locator;
  readonly displayOrder: Locator;
  readonly productTag: Locator;
  readonly manufacturers: Locator;
  readonly manufacturerName: Locator;
  readonly allowCustomerReviews: Locator;
  readonly reviewInProductBox: Locator;
  readonly showDeliveryTimeInProduct: Locator;
  readonly markAsNew: Locator;
  readonly markNewStartDateTime: Locator;
  readonly unit: Locator;
  readonly price: Locator;
  readonly taxExempt: Locator;
  readonly taxCategory: Locator;
  readonly minimumCartQty: Locator;
  readonly maximumCartQty: Locator;
  readonly seName: Locator;
  readonly metaTitle: Locator;
  readonly metaKeywords: Locator;
  readonly metaDescription: Locator;
  readonly saveAndContinue: Locator;
  readonly uploadFiles: Locator;
  readonly addCategory: Locator;
  readonly selectCategoryOption: Locator;

  readonly addNewSpecification: Locator;
  readonly attributeTypeSelect: Locator;
  readonly attributeType: Locator;
  readonly attributeSelect: Locator;
  readonly attribute: Locator;
  readonly attributeOptionSelect: Locator;
  readonly attributeOption: Locator;
  readonly allowFiltering: Locator;
  readonly showOnProductPage: Locator;
  readonly displayOrderForSpecAttribute: Locator;
  readonly addProductAttribute: Locator;
  readonly attributeName: Locator;
  readonly textPrompt: Locator;
  readonly isRequired: Locator;
  readonly controlType: Locator;
  readonly displayOrderForProAttribute: Locator;

  readonly addNewProductAttributes: Locator;
  readonly productAttributeSelect: Locator;
  readonly textPromptProAttribute: Locator;
  readonly isRequiredProAttribute: Locator;
  readonly controlTypeProAttribute: Locator;
  readonly displayOrderProAttribute: Locator;
  readonly waitForImage: Locator;

  readonly addNewDarkStore: Locator;
  readonly darkStoreSelect: Locator;
  readonly alwaysAvailable: Locator;
  readonly allowExpressDelivery: Locator;
  readonly enableVatTax: Locator;
  readonly turnOverTypeSelect: Locator;
  readonly darkStorePrice: Locator;
  readonly darkStoreStock: Locator;
  readonly rackNumber: Locator;
  readonly thresholdStock: Locator;
  readonly deliveryRangeSelect: Locator;
  readonly deliveryDateRangeFromDays: Locator;
  readonly deliveryDateRangeFromHours: Locator;
  readonly deliveryDateRangeFromMinutes: Locator;

  readonly deliveryDateRangeToDays: Locator;
  readonly deliveryDateRangeToHours: Locator;
  readonly deliveryDateRangeToMinutes: Locator;
  readonly backToProductListPage: Locator;
  readonly toastSuccessMsg: Locator;
  readonly darkStoreTable: Locator;
  readonly productSearchBoxInput: Locator;
  readonly productListSearchButton: Locator;
  readonly productListPage: Locator;
  readonly tableForProductList: Locator;
  readonly toastContainer: Locator;
  readonly toastErrorMsg: Locator;
  readonly clickEditButton: Locator;
  readonly deleteButton: Locator;
  readonly productEditPage: Locator;
  readonly productDeletePopUpDeleteItemsButton: Locator;
  readonly productListSelectAllItem: Locator;
  readonly deleteProductSelectedItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel("Email");
    this.password = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login to Dashboard" });
    this.catalog = page.getByRole("button", { name: " Catalogs " });
    this.productTab = page.getByRole("link", { name: "Products" });
    this.addNewProductButton = page.getByRole("link", { name: "Add new" });
    this.save = page.getByRole("button", { name: "Save", exact: true });
    this.productName = page.locator('app-common-input').filter({ hasText: 'Product name' }).getByRole('textbox')
    this.shortDescription = page
      .getByRole("region", { name: "Product info" })
      .locator("textarea");
    this.descriptionTextarea = page.locator('#fullDescription').getByRole('paragraph')
    this.sku = page.locator(
      "//app-common-input[@formpropertyname='sku']/descendant::input[@type='text']"
    );
    this.productNameRequiredField = page.locator(
      "//small[normalize-space()='Please provide a name.']"
    );
    this.productSKUNameRequiredField = page.locator(
      "//small[normalize-space()='Please provide an SKU.']"
    );
    this.productPublish = page
      .locator("app-common-input")
      .filter({ hasText: "Published" })
      .getByRole("checkbox");
    this.showOnHomePage = page
      .locator("app-common-input")
      .filter({ hasText: "Show on home page" })
      .getByRole("checkbox");
    this.displayOrder = page.locator("#displayOrder");
    this.productTag = page
      .locator("app-common-input")
      .filter({ hasText: "Product tagsSelect" })
      .getByRole("textbox");
    this.manufacturers = page
      .locator("app-common-input")
      .filter({ hasText: "ManufacturersSelect" })
      .getByRole("textbox");
    this.allowCustomerReviews = page
      .locator("app-common-input")
      .filter({ hasText: "Allow customer reviews" })
      .getByRole("checkbox");
    this.reviewInProductBox = page
      .locator("app-common-input")
      .filter({ hasText: "Show review in product box" })
      .getByRole("checkbox");
    this.showDeliveryTimeInProduct = page
      .locator("app-common-input")
      .filter({ hasText: "Show delivery time in product box" })
      .getByRole("checkbox");
    this.markAsNew = page
      .locator("app-common-input")
      .filter({ hasText: /^Mark as new$/ })
      .getByRole("checkbox");
    this.markNewStartDateTime = page.locator(
      "//app-common-input[@formpropertyname='markAsNewStartDateTimeUtc']/descendant::input"
    );
    this.unit = page
      .locator("app-common-input")
      .filter({ hasText: "Unit" })
      .getByRole("textbox");
    this.price = page.locator("#price");
    this.taxExempt = page
      .getByRole("region", { name: "Prices" })
      .getByRole("checkbox");
    this.taxCategory = page
      .getByRole("region", { name: "Prices" })
      .getByRole("combobox")
      .getByRole("textbox");
    this.minimumCartQty = page.locator("#orderMinimumQuantity");
    this.maximumCartQty = page.locator("#orderMaximumQuantity");
    this.seName = page.locator('app-common-input').filter({ hasText: 'SEO friendly page name' }).getByRole('textbox');
    this.metaTitle = page
      .locator("app-common-input")
      .filter({ hasText: "Meta title" })
      .getByRole("textbox");
    this.metaKeywords = page
      .locator("app-common-input")
      .filter({ hasText: "Meta keywords" })
      .getByRole("textbox");
    this.metaDescription = page
      .getByRole("region", { name: "SEO" })
      .locator("textarea");
    this.saveAndContinue = page.getByRole("button", {
      name: "Save & Continue Edit",
    });
    this.uploadFiles = page.locator('input[type="file"]');
    this.addCategory = page.getByLabel('Categories').getByRole('textbox');
    this.selectCategoryOption = page.getByRole("button", {
      name: "Add category mapping",
    });

    this.addNewSpecification = page
      .getByRole("region", { name: "Specification attributes" })
      .getByRole("link", { name: "Add new" });

    this.attributeTypeSelect = page.locator('//app-common-input[@formpropertyname="attributeTypeId"]//input[@type="text"]');
    this.attributeSelect = page.locator('//app-common-input[@formpropertyname="specificationAttributeId"]//input[@type="text"]');

    this.attributeOptionSelect = page.locator('//app-common-input[@formpropertyname="specificationAttributeOptionId"]//input[@type="text"]');

    this.allowFiltering = page.locator('//app-common-input[@formpropertyname="allowFiltering"]//input[@type="checkbox"]');
    this.showOnProductPage = page.locator('//app-common-input[@formpropertyname="showOnProductPage"]//input[@type="checkbox"]');
    this.displayOrderForSpecAttribute = page.locator('//app-common-input[@formpropertyname="displayOrder"]//input[@type="number"]');
    this.addNewProductAttributes = page.getByRole('tabpanel', { name: 'Attributes' }).getByRole('link', { name: 'Add new' });
    this.productAttributeSelect = page.locator('//app-common-input[@formpropertyname="productAttributeId"]//input[@type="text"]');
    this.textPromptProAttribute = page
      .getByRole("tabpanel", { name: "Standard" })
      .getByRole("textbox");
    this.isRequiredProAttribute = page.locator("#isRequired");
    this.controlTypeProAttribute = page.locator('//app-common-input[@formpropertyname="attributeControlTypeId"]//input[@type="text"]');
    this.displayOrderProAttribute = page.locator("#displayOrder");
    this.waitForImage = page.locator(
      "//img[@class='table-image']"
    );

    this.addNewDarkStore = page.getByRole('region', { name: 'Dark stores' }).getByRole('link', { name: 'Add new' })
    this.darkStoreSelect = page.locator('//app-common-select[@formpropertyname="darkStoreId"]//input[@type="text"]');
    this.alwaysAvailable = page
      .locator("app-common-input")
      .filter({ hasText: "Always available" })
      .getByRole("checkbox");
    this.allowExpressDelivery = page
      .locator("app-common-input")
      .filter({ hasText: "Allow express delivery" })
      .getByRole("checkbox");
    this.enableVatTax = page
      .locator("app-common-input")
      .filter({ hasText: "Enable vat/tax" })
      .getByRole("checkbox");
    this.turnOverTypeSelect = page.locator('//ng-select[@formcontrolname="turnOverTypeId"]//input[@type="text"]');
    this.darkStorePrice = page.locator("#price");
    this.darkStoreStock = page.locator("#stock");
    this.rackNumber = page
      .locator("app-common-input")
      .filter({ hasText: "Rack number" })
      .getByRole("textbox");
    this.deliveryRangeSelect = page.locator('//app-common-select[@formpropertyname="deliveryRangeId"]//input[@type="text"]');
    this.thresholdStock = page.locator('//app-common-select[@formpropertyname="darkStoreId"]//input[@type="text"]')
    this.deliveryDateRangeFromDays = page.locator('//div[@formgroupname = "deliveryDateRangeFrom"]//ng-select[@formcontrolname="day"]//input[@type="text"]');
    this.deliveryDateRangeFromHours = page.locator('//div[@formgroupname = "deliveryDateRangeFrom"]//ng-select[@formcontrolname="hour"]//input[@type="text"]');
    this.deliveryDateRangeFromMinutes = page.locator('//div[@formgroupname="deliveryDateRangeFrom"]//ng-select[@formcontrolname="min"]//input[@type="text"]');
    this.deliveryDateRangeToDays = page.locator('//div[@formgroupname = "deliveryDateRangeTo"]//ng-select[@formcontrolname="day"]//input[@type="text"]');
    this.deliveryDateRangeToHours = page.locator('//div[@formgroupname = "deliveryDateRangeTo"]//ng-select[@formcontrolname="hour"]//input[@type="text"]');
    this.deliveryDateRangeToMinutes = page.locator('//div[@formgroupname = "deliveryDateRangeTo"]//ng-select[@formcontrolname="min"]//span[2]/span');
    this.darkStoreTable = page.locator("//app-product-dark-store-list/mat-expansion-panel//table");
    this.productSearchBoxInput = page
      .locator("app-common-input")
      .filter({ hasText: "Product name" })
      .getByRole("textbox");
    this.productListSearchButton = page
      .getByRole("region", { name: "Search" })
      .getByRole("button", { name: "Search" });
    this.productListPage = page.locator('//table[contains(@class, "table table-striped")]');
    this.tableForProductList = page.locator(
      "//app-base-layout/div/div[1]/div/div/app-product-list/div[2]/div/data-table/div/table"
    );

    this.toastContainer = page.locator('//div[@id="toast-container"]/div');
    this.toastErrorMsg = page.locator('//div[contains(@class, "toast-error")]');
    this.toastSuccessMsg = page.locator('//div[contains(@class, "toast-success")]');
    this.clickEditButton = page.locator("//app-base-layout/div/div[1]/div/div/app-product-list/div[2]/div/data-table/div/table/tbody/tr[1]/td[7]/button[1]");
    this.deleteButton = page.locator('app-product-add-edit-form div').filter({ hasText: 'Edit product details back to product list Save Save & Continue Edit Delete' }).getByRole('button', { name: 'Delete' });
    this.productEditPage = page.locator('//h3[@class="mb-1"]');
    this.productDeletePopUpDeleteItemsButton = page.getByRole('button', { name: 'Yes, Delete item(s)' });
    this.productListSelectAllItem = page.getByRole('row', { name: 'Picture Product name SKU Price Published Actions' }).getByRole('checkbox');
    this.deleteProductSelectedItems = page.getByRole('button', { name: 'Delete (selected)' });
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

  async clickCatalogTab() {
    await this.catalog.click();
  }

  async clickProductTab() {
    const loc = this.productTab;
    await loc.waitFor();
    await loc.click();

  }

  async clickAddNewButton() {
    await this.addNewProductButton.click();
    await this.page.waitForLoadState('load');
  }

  async clickSaveButton() {
    await this.save.click();
    try {
      await this.page.waitForEvent("request", { timeout: 1500 });
    } catch (error) {
      // Handle the error that may occur during the waiting
      console.log("No HTTP Call initiated to :", error);
    }
  }

  async clickProductNameField() {
    const localLangMap = this.page.locator('//*[@id="mat-tab-label-0-0"]');

    if (await localLangMap.isEnabled()) {
      await this.productName.click();
    } else {
      localLangMap.waitFor({ state: "visible", timeout: 2 * 60 * 1000 })
      await this.productName.click();
    }

  }

  async productNameInput(proName: string) {
    await this.productName.waitFor({ state: "visible" });
    await this.productName.fill(proName);
  }

  async productSortDescription(sortDes: string) {
    await this.shortDescription.fill(sortDes);
  }

  async productFullDescription(fullDes: string) {
    await this.descriptionTextarea.first().fill(fullDes);
  }

  async productSKU(skuId: string) {
    await this.sku.fill(skuId);
  }

  async publishProduct() {
    await this.productPublish.check();
  }

  async unpublishProduct() {
    await this.productPublish.uncheck();
  }

  async displayHomePage() {
    await this.showOnHomePage.check();
  }

  async notToDisplayHomePage() {
    await this.showOnHomePage.uncheck();
  }

  async productDisplayOrder(value: string) {
    await this.displayOrder.fill(value);
  }

  async selectProductTag(tagName: string) {
    await this.productTag.click();
    await this.page.getByRole("option", { name: tagName }).first().click();
  }

  async selectManufacturer(manufacturerName: string) {
    await this.manufacturers.click();
    await this.page.getByText(manufacturerName).click();
  }

  async customerReviewsActive() {
    await this.allowCustomerReviews.check();
  }
  async customerReviewsInActive() {
    await this.allowCustomerReviews.uncheck();
  }

  async productReviewBoxActive() {
    await this.reviewInProductBox.check();
  }

  async productReviewBoxDeactive() {
    await this.reviewInProductBox.uncheck();
  }

  async deliveryTimeInProductActive() {
    await this.showDeliveryTimeInProduct.check();
  }

  async deliveryTimeInProductDeactive() {
    await this.showDeliveryTimeInProduct.uncheck();
  }

  async markAsNewActive() {
    await this.markAsNew.check();
  }

  async unitName(inputUnit: string) {
    await this.unit.fill(inputUnit);
  }

  async productPrice(price: string) {
    await this.price.press("ArrowRight");
    await this.price.fill(price);
  }

  async checkTaxExempt() {
    await this.taxExempt.check();
  }

  async selectTaxCategory(taxCat: string) {
    await this.taxCategory.click();
    await this.page.getByText(taxCat, { exact: true }).click();
  }

  async selectMinimumQuantity(minQty: string) {
    await this.minimumCartQty.fill(minQty);
  }

  async selectMaximumQuantity(maxQty: string) {
    await this.maximumCartQty.fill(maxQty);
  }

  async inputSeName(seName: string) {
    await this.seName.fill(seName);
  }
  async inputMetaTitle(metaTitle: string) {
    await this.metaTitle.fill(metaTitle);
  }

  async inputMetaKeyWords(metaKey: string) {
    await this.metaKeywords.fill(metaKey);
  }

  async inputMetaDescription(metaDes: string) {
    await this.metaDescription.fill(metaDes);
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
    try {
      await this.page.waitForEvent("requestfinished", { timeout: 15000 });
    } catch (error) {
      // Handle the error that may occur during the waiting
      console.error("No HTTP Call initiated to :", error);
      // You can choose to rethrow the error or handle it as needed.
    }
  }

  async selectPicture() {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.page.getByRole("button", { name: "Upload files" }).click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, filePath));
    await this.toastContainer.last().waitFor({ state: 'hidden' });
    await this.page.waitForLoadState("domcontentloaded");
    await this.waitForImage.waitFor({ state: "visible" });
    await this.toastContainer.last().waitFor({ state: 'hidden' });
  }

  async selectCategory(catName: string) {
    await this.addCategory.click();
    await this.page.getByRole("option", { name: catName }).click();
    await this.selectCategoryOption.click();
  }

  async addSpecificationAttribute(
    attrType: string,
    attr: string,
    attrOption: string,
    orderValue: string
  ) {
    await this.addNewSpecification.click();

    await this.attributeSelect.click();
    await this.page.getByRole("option", { name: attr }).waitFor({ state: "visible" });
    await this.page.getByRole("option", { name: attr }).click();

    await this.attributeOptionSelect.click();
    await this.page.getByRole("option", { name: attrOption }).waitFor({ state: "visible" });
    await this.page.getByRole("option", { name: attrOption }).click();

    await this.allowFiltering.check();

    await this.showOnProductPage.check();

    await this.displayOrderForSpecAttribute.fill(orderValue);
  }

  async clickOnToAddProductAttribute() {
    await this.addNewProductAttributes.click();
  }

  async productAttribute(
    proAttr: string,
    controlType: string,
    displayOrder: string
  ) {
    await this.productAttributeSelect.click();
    await this.page.getByRole("option", { name: proAttr }).waitFor({ state: "visible" });
    await this.page.getByRole("option", { name: proAttr }).click();
    // await this.isRequiredProAttribute.check();
    await this.controlTypeProAttribute.click();
    await this.page.getByRole("option", { name: controlType }).waitFor({ state: "visible" });
    await this.page.getByRole("option", { name: controlType }).click();
    await this.displayOrderProAttribute.fill(displayOrder);
  }

  async addDarkStore() {
    await this.addNewDarkStore.waitFor({ state: "visible" });
    await this.addNewDarkStore.click();
  }

  async addDarkStoreName(storeName: string) {
    await this.darkStoreSelect.click();
    await this.page.getByRole('option', { name: storeName, exact: true }).waitFor({ state: "visible" });
    await this.page.getByRole('option', { name: storeName, exact: true }).click();
  }

  async alwaysAvailableDarkStore() {
    await this.alwaysAvailable.check();
  }
  async alwaysAvailableDarkStoreUncheck() {
    await this.alwaysAvailable.uncheck();
  }

  async allowExpressDeliveryDarkStore() {
    await this.allowExpressDelivery.check();
  }
  async disableExpressDeliveryDarkStore() {
    await this.allowExpressDelivery.uncheck();
  }

  async enableVatTaxDarkStore() {
    await this.enableVatTax.check();
  }
  async disableVatTaxDarkStore() {
    await this.enableVatTax.uncheck();
  }

  async turnOverTypeDarkStore(turnOverType: string) {
    await this.turnOverTypeSelect.click();
    await this.page.getByRole("option", { name: turnOverType }).click();
  }

  async setDarkStorePrice(price: string) {
    await this.darkStorePrice.click();
    await this.darkStorePrice.press("ArrowRight");
    await this.darkStorePrice.fill(price);
  }

  async setDarkStoreStock(stock: string) {
    await this.darkStoreStock.fill(stock);
  }

  async setDarkStoreRackNumber(rackNum: string) {
    await this.rackNumber.fill(rackNum);
  }

  async setThresHoldStock(thresStock: string) {
    await this.thresholdStock.fill(thresStock);
  }

  async clickDeliveryRange() {
    await this.deliveryRangeSelect.click();
  }

  async setDeliveryRange(range: string) {
    await this.page.getByRole('option', { name: range }).click();
  }

  async setDeliveryDateRangeFrom(
    rangeFromDays: string,
    rangeFromHours: string,
    rangeFromMinutes: string
  ) {
    await this.deliveryDateRangeFromDays.click();
    await this.page.getByRole("option", { name: rangeFromDays, exact: true }).click();

    await this.deliveryDateRangeFromHours.click();
    await this.page.getByRole("option", { name: rangeFromHours, exact: true }).click();

    /*await this.deliveryDateRangeFromMinutes.click();
    const minutesDropDown = this.page.getByRole("option", { name: rangeFromMinutes, exact: true });
    await minutesDropDown.scrollIntoViewIfNeeded();
    await minutesDropDown.click(); */
  }

  async setDeliveryDateRangeTo(
    rangeToDays: string,
    rangeToHours: string,
    rangeToMinutes: string
  ) {
    await this.deliveryDateRangeToDays.click();
    await this.page
      .getByRole("option", { name: rangeToDays, exact: true })
      .click();
    await this.deliveryDateRangeToHours.click();
    await this.page
      .getByRole("option", { name: rangeToHours, exact: true })
      .click();

    /*  await this.deliveryDateRangeToMinutes.click();
        await this.page
          .getByRole("option", { name: rangeToMinutes, exact: true })
          .click(); */
  }

  async backToEditProductPage() {
    await this.backToProductListPage.click();
  }

  async toastSuccessMessage() {
    await this.toastSuccessMsg.last().waitFor({ state: "visible" });
  }

  async darkStoreValidation(): Promise<string[]> {
    const table = this.darkStoreTable;
    const rows = table.locator("tbody tr");
    const cols = rows.first().locator("td");
    await rows.first().waitFor({ state: "visible" });
    return await cols.allTextContents();
  }

  async searchProductNameInSearchBox(productName: string) {
    await this.productSearchBoxInput.fill(productName);
    await this.productListSearchButton.click();

    try {
      await this.page.waitForEvent("requestfinished");
    } catch (error) {
      console.log(error)
    }
  }

  async handleProductListTable(): Promise<string[]> {
    await this.productListPage.waitFor({ state: "visible" });
    const rows = this.productListPage.locator("tbody tr");
    let rowCount: number = await rows.count();
    if (rowCount > 0) {
      const cols = rows.first().locator("td");
      const textContents = await cols.allTextContents();

      // Remove leading and trailing spaces from each element
      const trimmedTextContents = textContents.map((text) => text.trim());
      return trimmedTextContents;
    }

    return [];
  }

  async getSearchItemsFromList(): Promise<string[]> {
    try {
      await this.productListPage.waitFor({ state: "visible" });
      const rows = this.productListPage.locator("tbody tr");
      const rowCount: number = await rows.count();
      const column3Values: string[] = [];

      if (rowCount === 1) {
        const cols = rows.nth(0).locator("td");

        if (await cols.nth(2).count() > 0) {
          const textContent = await cols.nth(2).textContent();
          const trimmedTextContent = textContent.trim();
          column3Values.push(trimmedTextContent);
        } else {
          const textContent = await cols.textContent();
          const trimmedTextContent = textContent.trim();
          column3Values.push(trimmedTextContent);
        }

      } else if (rowCount > 1) {
        for (let i = 0; i < rowCount; i++) {
          const cols = rows.nth(i).locator("td");
          const textContent = await cols.nth(2).textContent();
          const trimmedTextContent = textContent.trim();
          column3Values.push(trimmedTextContent);
        }
      }

      return column3Values;
    } catch (error) {
      // Handle the error gracefully
      console.error("Error in getSearchItemsFromList:", error);
      return []; // or throw an error, depending on your use case
    }
  }





  async getToastMessageText(): Promise<string> {

    await this.toastContainer.last().waitFor({ state: 'visible' });

    return (await this.toastContainer.last().textContent()).trim();
  }


  async clickDeleteButton() {
    await this.toastContainer.last().waitFor({ state: 'hidden' });
    await this.deleteButton.click();
    await this.productDeletePopUpDeleteItemsButton.waitFor({ state: "visible" })
    await this.productDeletePopUpDeleteItemsButton.click();

    try {
      await this.page.waitForEvent("requestfinished", { timeout: 5000 });
    } catch (error) {
      // Handle the error that may occur during the waiting
      console.error("No HTTP Call initiated to :", error);
      // You can choose to rethrow the error or handle it as needed.
    }
  }

  async selectAllSearchedItems() {
    await this.productListSelectAllItem.check();
  }

  async clickDeleteSelectedSearchItems() {
    await this.deleteProductSelectedItems.click();
    await this.productDeletePopUpDeleteItemsButton.waitFor({ state: "visible" })
    await this.productDeletePopUpDeleteItemsButton.click();
    await this.page.waitForEvent("requestfinished")
  }



  async productEditButton() {
    await this.clickEditButton.waitFor({ state: "visible" });
    await this.clickEditButton.click();
  }

  getToastMessage(): Locator {
    return this.toastContainer;
  }

  getProductPageTitle(): Locator {
    return this.productEditPage;
  }
  getProductNameErrorMessage(): Locator {
    return this.productNameRequiredField;
  }

  getProductSKUErrorMessage(): Locator {
    return this.productSKUNameRequiredField;
  }
}
