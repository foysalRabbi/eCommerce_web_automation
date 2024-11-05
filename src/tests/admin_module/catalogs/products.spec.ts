import { expect, test } from "../../../fixtures/base.fixture";
import ENV from "../../../utils/env";
import productData from "./../../../test_data/product.data.json";
import { faker } from "@faker-js/faker";
import * as fs from "fs";

// Read the JSON file
const jsonFilePath = "src/test_data/product.data.json";
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

let productName = '';

test.describe("Feature: Product Management", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    /* Login as admin */
    await page.goto(ENV.BASE_URL);
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/.*login/);
    await loginPage.inputEmail(ENV.TEST_ADMIN_EMAIL);
    await loginPage.inputPassword(ENV.TEST_ADMIN_PASSWORD);
    await loginPage.clickLoginButton();
    await page.waitForURL(/.*dashboard/, { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("Verify that admin successfully redirect to the product list page @smoke", async ({ page, productPage }) => {

    await test.step("When admin click on catalog tab", async () => {
      await productPage.clickCatalogTab();
    });

    await test.step("When admin click on product tab to see the product tab page", async () => {
      await productPage.clickProductTab();
      await expect(page).toHaveURL(/#\/product\/list/i);
    });

  });

  test("Verify that product name field is required in product create page @regression", async ({ page, productPage }) => {

    await test.step("When admin click on catalog tab", async () => {
      await productPage.clickCatalogTab();
    });

    await test.step("And admin click on product menu to see the product list page", async () => {
      await productPage.clickProductTab();
    });

    await test.step("Then Admin click on to product add button", async () => {
      await productPage.clickAddNewButton();
    });

    await test.step("Then Admin input product sort description", async () => {
      await productPage.productSortDescription(productData.product_info.sortDescription);
    });

    await test.step("Then Admin input product full description", async () => {
      await productPage.productFullDescription(productData.product_info.fullDescription);
    });

    await test.step("Then Admin input product sku", async () => {
      let productSKU = faker.string.alphanumeric({ length: { min: 9, max: 11 }, casing: 'upper', exclude: ['L', 'R', 'X'] });
      // Log the generated SKU for debugging
      console.log('Generated Product SKU: ' + productSKU);
      await productPage.productSKU(productSKU);
    });

    if (productData.product_info.published === true) {
      await test.step("Then Admin select product as published", async () => {
        await productPage.publishProduct();
      });
    }

    if (productData.product_info.showOnHomePage === true) {
      await test.step("Then Admin select product to show on homepage", async () => {
        await productPage.displayHomePage();
      });

      await test.step("Then Admin select product in display order", async () => {
        await productPage.productDisplayOrder(productData.product_info.displayOrder);
      });
    }

    await test.step("Then Admin select product tag name", async () => {
      await productPage.selectProductTag(productData.product_info.productTags);
    });

    await test.step("Then Admin select manufacturers", async () => {
      await productPage.selectManufacturer(productData.product_info.manufacturers);
    });

    if (productData.product_info.allowCustomerReviews === true) {
      await productPage.customerReviewsActive();
    }

    if (productData.product_info.showReviewInProductBox === true) {
      await productPage.productReviewBoxActive();
    }

    if (productData.product_info.showDeliveryTimeInProductBox) {
      await productPage.deliveryTimeInProductActive();
    }

    await test.step("Then Admin write unit name", async () => {
      await productPage.unitName(productData.product_info.unit);
    });

    await test.step("Then Admin set price for product", async () => {
      jsonData.prices.price = faker.commerce.price()
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");

      await productPage.productPrice((productData.prices.price));
    });

    if (productData.prices.taxExempt === true) {
      await productPage.checkTaxExempt();
    }

    await test.step("Then Admin select tax category", async () => {
      await productPage.selectTaxCategory(productData.prices.taxCategory);
    });

    await test.step("Then Admin input minimum quantity", async () => {
      await productPage.selectMinimumQuantity(productData.inventory.minimumCartQTY);
    });

    await test.step("Then Admin input maximum quantity", async () => {
      await productPage.selectMaximumQuantity(productData.inventory.maximumCartQTY);
    });

    await test.step("Then Admin input Meta title", async () => {
      await productPage.inputMetaTitle(productData.seo.metaTitle);
    });

    await test.step("Then Admin input Meta keywords", async () => {
      await productPage.inputMetaKeyWords(productData.seo.metaKeyWords);
    });
    await test.step("Then Admin input Meta Description", async () => {
      await productPage.inputMetaDescription(productData.seo.metaDescription);
    });

    await test.step("Admin click on save button without give the product name", async () => {
      await productPage.clickSaveButton();
    });

    await test.step("Then admin should see proper validation error message", async () => {
      await expect(productPage.getProductNameErrorMessage()).toHaveText(productData.errorMessage.productNameRequiredErrorMessage);
    });

  });

  test("Verify that product SKU field is required in product create page @smoke", async ({ productPage }) => {

    productName = faker.commerce.productName() + ' - ' + faker.commerce.productAdjective() + ' [' + faker.color.human() + ']';

    await test.step("When admin click on catalog tab", async () => {
      await productPage.clickCatalogTab();
    });

    await test.step("When admin click on product tab to see the product tab page", async () => {
      await productPage.clickProductTab();
    });

    await test.step("Then Admin click on to product add button", async () => {
      await productPage.clickAddNewButton();
    });

    await test.step("Then Admin add product name", async () => {
      await productPage.productNameInput(productName);
    });

    await test.step("Then Admin input product sort description", async () => {
      await productPage.productSortDescription(productData.product_info.sortDescription);
    });

    await test.step("Then Admin input product full description", async () => {
      await productPage.productFullDescription(productData.product_info.fullDescription);
    });

    if (productData.product_info.published === true) {
      await test.step("Then Admin select product as published", async () => {
        await productPage.publishProduct();
      });
    }

    if (productData.product_info.showOnHomePage === true) {

      await test.step("Then Admin select product to show on homepage", async () => {
        await productPage.displayHomePage()
      });

      await test.step("Then Admin select product in display order", async () => {
        await productPage.productDisplayOrder(productData.product_info.displayOrder);
      });

    }

    await test.step("Then Admin select product tag name", async () => {
      await productPage.selectProductTag(productData.product_info.productTags);
    });

    await test.step("Then Admin select manufacturers", async () => {
      await productPage.selectManufacturer(productData.product_info.manufacturers);
    });

    if (productData.product_info.allowCustomerReviews === true) {
      await productPage.customerReviewsActive();
    }

    if (productData.product_info.showReviewInProductBox === true) {
      await productPage.productReviewBoxActive();
    }

    if (productData.product_info.showDeliveryTimeInProductBox) {
      await productPage.deliveryTimeInProductActive();
    }

    await test.step("Then Admin write unit name", async () => {
      await productPage.unitName(productData.product_info.unit);
    });

    await test.step("Then Admin set price for product", async () => {
      jsonData.prices.price = faker.commerce.price()
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");
      await productPage.productPrice((productData.prices.price));
    });

    if (productData.prices.taxExempt === true) {
      await test.step("Then Admin check tax exempt", async () => {
        await productPage.checkTaxExempt();
      });
    }

    await test.step("Then Admin select tax category", async () => {
      await productPage.selectTaxCategory(productData.prices.taxCategory);
    });

    await test.step("Then Admin input minimum quantity", async () => {
      await productPage.selectMinimumQuantity(productData.inventory.minimumCartQTY);
    });

    await test.step("Then Admin input maximum quantity", async () => {
      await productPage.selectMaximumQuantity(productData.inventory.maximumCartQTY);
    });

    await test.step("Then Admin input Meta title", async () => {
      await productPage.inputMetaTitle(productData.seo.metaTitle);
    });

    await test.step("Then Admin input Meta keywords", async () => {
      await productPage.inputMetaKeyWords(productData.seo.metaKeyWords);
    });

    await test.step("Then Admin input Meta Description", async () => {
      await productPage.inputMetaDescription(productData.seo.metaDescription);
    });

    await test.step("Admin click on save button without give the product name", async () => {
      await productPage.clickSaveButton();
    });

    await test.step("Then admin should see proper validation error message", async () => {
      await expect(productPage.getProductSKUErrorMessage()).toHaveText(productData.errorMessage.productSKURequiredErrorMessage);
    });

  });

  test("Verify that Admin successfully add a new product @smoke", async ({ productPage }) => {

    productName = faker.commerce.productName() + ' - ' + faker.commerce.productAdjective() + ' [' + faker.color.human() + ']';

    await test.step("When admin click on catalog tab", async () => {
      await productPage.clickCatalogTab();
    });

    await test.step("When admin click on product tab to see the product tab page", async () => {
      await productPage.clickProductTab();
    });

    await test.step("Then Admin click on to product add button", async () => {
      await productPage.clickAddNewButton();
    });

    await test.step("Then Admin add product name", async () => {
      await productPage.clickProductNameField();
      await productPage.productNameInput(productName);
    });

    await test.step("Then Admin input product sort description", async () => {
      await productPage.productSortDescription(productData.product_info.sortDescription);
    });

    await test.step("Then Admin input product full description", async () => {
      await productPage.productFullDescription(productData.product_info.fullDescription);
    });

    await test.step("Then Admin input product sku", async () => {
      let productSKU = faker.string.alphanumeric({ length: { min: 16, max: 21 }, casing: 'upper', exclude: ['X', 'Y', 'Z'] });
      // Log the generated SKU for debugging
      console.log('Generated Product SKU: ' + productSKU);
      await productPage.productSKU(productSKU);
    });

    if (productData.product_info.published === true) {
      await test.step("Then Admin select product as published", async () => {
        await productPage.publishProduct();
      });
    }

    if (productData.product_info.showOnHomePage === true) {
      await test.step("Then Admin select product to show on homepage", async () => {
        await productPage.displayHomePage();
      });
      await test.step("Then Admin select product in display order", async () => {
        await productPage.productDisplayOrder(productData.product_info.displayOrder);
      });
    }

    await test.step("Then Admin select product tag name", async () => {
      await productPage.selectProductTag(productData.product_info.productTags);
    });

    await test.step("Then Admin select manufacturers", async () => {
      await productPage.selectManufacturer(productData.product_info.manufacturers);
    });


    if (productData.product_info.allowCustomerReviews === true) {
      await test.step('And Select customer review', async () => {
        await productPage.customerReviewsActive();
      })
    }

    if (productData.product_info.showReviewInProductBox === true) {
      await test.step('And select review box', async () => {
        await productPage.productReviewBoxActive();
      })

    }

    if (productData.product_info.showDeliveryTimeInProductBox) {
      await test.step('And select delivery time', async () => {
        await productPage.deliveryTimeInProductActive();
      })
    }

    await test.step("Then Admin write unit name", async () => {
      await productPage.unitName(productData.product_info.unit);
    });

    await test.step("Then Admin set price for product", async () => {
      jsonData.prices.price = faker.commerce.price()
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");
      await productPage.productPrice((productData.prices.price));
    });

    if (productData.prices.taxExempt === true) {
      await test.step('And check tax exempt', async () => {
        await productPage.checkTaxExempt();
      });
    }

    await test.step("Then Admin select tax category", async () => {
      await productPage.selectTaxCategory(productData.prices.taxCategory);
    });

    await test.step("Then Admin input minimum quantity", async () => {
      await productPage.selectMinimumQuantity(productData.inventory.minimumCartQTY);
    });

    await test.step("Then Admin input maximum quantity", async () => {
      await productPage.selectMaximumQuantity(productData.inventory.maximumCartQTY);
    });

    await test.step("Then Admin input Meta title", async () => {
      await productPage.inputMetaTitle(productData.seo.metaTitle);
    });
    await test.step("Then Admin input Meta keywords", async () => {
      await productPage.inputMetaKeyWords(productData.seo.metaKeyWords);
    });

    await test.step("Then Admin input Meta Description", async () => {
      await productPage.inputMetaDescription(productData.seo.metaDescription);
    });

    await test.step("Admin click on save button to give the product name", async () => {
      await productPage.clickSaveAndContinue();
    });

    await test.step("Then Admin upload picture for a product", async () => {
      await productPage.selectPicture();
    });

    await test.step("Then Admin select category name", async () => {
      await productPage.selectCategory(productData.categories.categoryName);
    });

    await test.step("Then Admin select specification Attribute", async () => {
      await productPage.addSpecificationAttribute(
        productData.specificationAttributes.attributeType,
        productData.specificationAttributes.attribute,
        productData.specificationAttributes.attributeOption,
        productData.specificationAttributes.displayOrder
      );
      await productPage.clickSaveButton();
    });

    await test.step("Then Admin click on product attribute", async () => {
      await productPage.clickOnToAddProductAttribute();
    })

    await test.step("Then Admin select product Attribute", async () => {
      await productPage.productAttribute(
        productData.productAttribute.attribute,
        productData.productAttribute.controlType,
        productData.productAttribute.displayOrder
      );
      await productPage.clickSaveButton();
    });

    await test.step("Then Admin click on add dark store", async () => {
      await productPage.addDarkStore();
    });

    await test.step("Then Admin select dark store from dark store list", async () => {
      await productPage.addDarkStoreName(productData.darkStores.darkStoreName);
    });

    if (productData.darkStores.alwaysAvailable === true) {
      await test.step("Then Admin select always available", async () => {
        await productPage.alwaysAvailableDarkStore();
      });
    } else if (productData.darkStores.alwaysAvailable === false) {
      await test.step("Then Admin unselect always available", async () => {
        await productPage.alwaysAvailableDarkStoreUncheck();
        await productPage.turnOverTypeDarkStore(
          productData.darkStores.turnOverType
        );
      });
    }

    if (productData.darkStores.allowExpressDelivery === true) {
      await test.step("Then Admin select allow express delivery", async () => {
        await productPage.allowExpressDeliveryDarkStore();
      });
    } else if (productData.darkStores.allowExpressDelivery === false) {
      await test.step("Then Admin not allow express delivery", async () => {
        await productPage.disableExpressDeliveryDarkStore();
      });
    }

    if (productData.darkStores.enableVatTax === true) {
      await test.step("Then Admin enable vat/tax enable", async () => {
        await productPage.enableVatTaxDarkStore();
      });
    } else if (productData.darkStores.enableVatTax === false) {
      await test.step("Then Admin enable vat/tax enable", async () => {
        await productPage.disableVatTaxDarkStore();
      });
    }

    await test.step("Then Admin set dark store price", async () => {
      await productPage.setDarkStorePrice(productData.darkStores.price);
    });

    await test.step("Then Admin set dark store stock", async () => {
      await productPage.setDarkStoreStock(productData.darkStores.stock);
    });

    await test.step("Then Admin set rack number", async () => {
      await productPage.setDarkStoreRackNumber(productData.darkStores.rackNumber);
    });

    if(productData.darkStores.alwaysAvailable === false){
      await test.step("Then Admin set threshold stock", async () => {
        await productPage.setThresHoldStock(productData.darkStores.thresHoldStock);
      });
    }

    await test.step("Then Admin click delivery range dropdown menu", async () => {
      await productPage.clickDeliveryRange();
    });

    await test.step("Then Admin set delivery date range ", async () => {
      await productPage.setDeliveryRange(productData.darkStores.deliveryRange)
      await productPage.clickSaveButton();
    });

    

    await test.step("Then verify that product showing in the list", async () => {
      await productPage.searchProductNameInSearchBox(productName);
      const searchResults = await productPage.handleProductListTable();
      expect(searchResults).toContain(productName);
    });

  });

  test("Verify that Admins successfully delete a product from the admin panel. @smoke", async ({ page, productPage }) => {

    productName = faker.commerce.productName() + ' - ' + faker.commerce.productAdjective() + ' [' + faker.color.human() + ']';

    await test.step("Admin create a product successfully", async () => {
      await productPage.clickCatalogTab();
      await productPage.clickProductTab();
      await expect(page).toHaveURL(/.*product/);
      await productPage.clickAddNewButton();

      await productPage.clickProductNameField();
      await productPage.productNameInput(productName);
      await productPage.productSortDescription(productData.product_info.sortDescription);
      await productPage.productFullDescription(productData.product_info.fullDescription);

      let productSKU = faker.string.alphanumeric({ length: { min: 21, max: 26 }, casing: 'upper', exclude: ['A', 'Q'] });
      // Log the generated SKU for debugging
      console.log('Generated Product SKU: ' + productSKU);
      await productPage.productSKU(productSKU);

      await productPage.selectManufacturer(productData.product_info.manufacturers);

      await productPage.unitName(productData.product_info.unit);
      jsonData.prices.price = faker.commerce.price()
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");

      await productPage.productPrice((productData.prices.price));

      await productPage.clickSaveButton();
      const toastMsg = await productPage.getToastMessageText();

      expect(toastMsg).toEqual(expect.stringContaining(productData.toastMessages.productCreateSuccesMssg));
    });

    await test.step("Admin go to product edit details page from product list", async () => {
      await productPage.searchProductNameInSearchBox(productName);
      await productPage.productEditButton();
    });

    test.step("Verify admin successfully navigate to product edit details page", async () => {
      await expect(productPage.getProductPageTitle()).toContainText("Edit product details");
    });

    await test.step("Admin click delete button from product edit details page", async () => {
      await productPage.clickDeleteButton();
    });

    await test.step("Verify that product is deleted successfully", async () => {
      const toastMsg: string = await productPage.getToastMessageText();
      expect(toastMsg).toEqual(
        expect.stringContaining(
          productData.toastMessages.productDeleteSuccesMssg
        )
      );
    });

    await test.step("Then verify product is not showing in list", async () => {
      await productPage.searchProductNameInSearchBox(productName);
      const searchResults: string[] = await productPage.handleProductListTable();
      console.log(searchResults);
      expect(searchResults).toContain("No data available");
    });

  });

  test.afterEach(async ({ page, productPage }) => {
    console.log('----------After Test-----')
    console.log('Start cleaning product test data for test env')
    await productPage.clickProductTab();
    await page.waitForURL(/.*product/, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/#\/product\/list/i);

    console.log(`Product Name to delete - ${productName}`)

    await productPage.searchProductNameInSearchBox(productName);
    const searchResults: string[] = await productPage.getSearchItemsFromList();
    console.log('Search result: ' + searchResults)

    if (searchResults.includes(productName) && searchResults.length == 1) {
      console.log('Found test product with name [' + productName + ']')
      await productPage.productEditButton();
      await productPage.clickDeleteButton();
      const toastMsg: string = await productPage.getToastMessageText();

      if (toastMsg.toLowerCase().includes("success")) {
        console.log('Deleted test product with name [' + productName + ']')
      } else {
        console.log('Unable to delete test data due to error [' + toastMsg + ']')
      }
    } else {
      console.log('No test product found with name [' + productName + ']')
    }
  });

});