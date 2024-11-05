import { faker } from "@faker-js/faker";
import { expect, test } from "../../../fixtures/base.fixture";
import ENV from "../../../utils/env"
import * as fs from 'fs';

// Read the JSON file
const categoryDataJsonFilePath = 'src/test_data/category.data.json';
const jsonTestData = JSON.parse(fs.readFileSync(categoryDataJsonFilePath, 'utf-8'));

/* Create Random fake data */
const categoryName = faker.commerce.department();

test.describe('Feature: Category -> Create Categories', () => {

    test.beforeEach(async ({ page, loginPage }) => {
        /* Login as admin */
        await page.goto(ENV.BASE_URL);
        await page.waitForLoadState('domcontentloaded')
        await expect(page).toHaveURL(/.*login/);
        await loginPage.inputEmail(ENV.TEST_ADMIN_EMAIL);
        await loginPage.inputPassword(ENV.TEST_ADMIN_PASSWORD);
        await loginPage.clickLoginButton();
        await page.waitForURL(/.*dashboard/, { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*dashboard/);

        /* Admin navigate to categories List page */
        await page.goto(ENV.BASE_URL + '/#/category/list')
        await page.waitForURL(/.*category/, { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*category/);
    });

    test('Verify that admins unable to create a category without category name @smoke', async ({ page, categoryPage }) => {
        await test.step("Admin go to category create page", async () => {
            await categoryPage.clickAddNewButton()
            await page.waitForLoadState('domcontentloaded')
            await expect(page).toHaveURL(/.*create/);
        })

        if (jsonTestData.display.published == false) {
            await test.step('Admin uncheck published option', async () => {
                await categoryPage.uncheckPublishOption();
            })
        }

        if (jsonTestData.display.showOnHomePage == true) {
            await test.step('Admin checked Show on home page option', async () => {
                await categoryPage.checkShowOnHomePageOption();
            })
        }

        await test.step('Admin input category page size', async () => {
            await categoryPage.inputCategoryPageSize(jsonTestData.display.pageSize);
        })

        if (jsonTestData.display.priceRangeFiltering == true) {
            await test.step('Admin checked price range filtering option', async () => {
                await categoryPage.checkPriceRangeFilteringOption();
            })
        }

        await test.step('Admin input category display order', async () => {
            await categoryPage.inputCategoryDisplayOrder(jsonTestData.display.displayOrder);
        })

        await test.step('Admin select category visibility', async () => {
            await categoryPage.inputCategoryVisibility(jsonTestData.display.visibility);
        })

        await test.step('Admin upload category menu icon', async () => {
            await categoryPage.inputUploadMenuIcon(jsonTestData.images.menuIconImagePath);
        })

        await test.step('Admin upload category banner for mobile', async () => {
            await categoryPage.inputUploadBannersMobile(jsonTestData.images.bannerMobileImagePath);
        })

        await test.step('Admin upload category banner for desktop', async () => {
            await categoryPage.inputUploadBannersDesktop(jsonTestData.images.bannerDesktopImagePath);
        })

        await test.step('Admin upload category banner for app', async () => {
            await categoryPage.inputUploadBannersApp(jsonTestData.images.bannerAppImagePath);
        })


        await test.step('Admin upload category pictures for mobile', async () => {
            await categoryPage.inputUploadPicturesMobile(jsonTestData.images.picturesMobileImagePath);
        })

        await test.step('Admin upload category pictures for desktop', async () => {
            await categoryPage.inputUploadPicturesDesktop(jsonTestData.images.picturesDesktopImagePath);
        })

        await test.step('Admin upload category pictures for app', async () => {
            await categoryPage.inputUploadPicturesApp(jsonTestData.images.picturesAppImagePath);
        })

        await test.step('Admin input category meta keywords', async () => {
            await categoryPage.inputMetaKeyword(jsonTestData.seo.metaKey);
        })

        await test.step('Admin input category meta description', async () => {
            await categoryPage.inputMetaDescription(jsonTestData.seo.metaDes);
        })

        await test.step('Admin click save button', async () => {
            await categoryPage.clickSaveButton();
        })

        await test.step('Verify category name required field validation error message showing', async () => {
            await expect(categoryPage.getCategoryNameValidationError()).toHaveText(jsonTestData.errorList.categoryNameRequired);
        })
    })

    test('Verify that Admins successfully create a category with category name only. @regression', async ({ page, categoryPage }) => {
        await test.step("Admin go to category create page", async () => {
            await categoryPage.clickAddNewButton()
            await page.waitForLoadState('domcontentloaded')
            await expect(page).toHaveURL(/.*create/);
        })

        await test.step('Admin input category name', async () => {
            jsonTestData.category_info.name = categoryName;

            await categoryPage.inputCategoryName(categoryName);

            /* Write the updated object back to the JSON file */
            fs.writeFileSync(categoryDataJsonFilePath, JSON.stringify(jsonTestData, null, 2), 'utf-8');
        })

        await test.step('Admin click save button', async () => {
            await categoryPage.clickSaveButton();
        })

        await test.step('And admin should see category create success message', async () => {
            const toastMsg: string = await categoryPage.getToastMessageText();
            expect(toastMsg).toEqual(expect.stringContaining(jsonTestData.toastMessages.categoryCreateSuccessMsg));
        })

        await test.step('Then verify category showing in list', async () => {
            await categoryPage.searchCategoryNameInListPage(jsonTestData.category_info.name);
            const searchResults = await categoryPage.getSearchResultColNameValues();
            console.log(searchResults)
            expect(searchResults).toContain(jsonTestData.category_info.name);
        })
    })

    test('Verify that Admins successfully create a category from the admin panel. @smoke', async ({ page, categoryPage }) => {
        await test.step("Admin go to category create page", async () => {
            await categoryPage.clickAddNewButton()
            await page.waitForLoadState('domcontentloaded')
            await expect(page).toHaveURL(/.*create/);
        })

        await test.step('Admin input category name', async () => {
            jsonTestData.category_info.name = categoryName;

            await categoryPage.inputCategoryName(categoryName);

            /* Write the updated object back to the JSON file */
            fs.writeFileSync(categoryDataJsonFilePath, JSON.stringify(jsonTestData, null, 2), 'utf-8');
        })

        if (jsonTestData.display.published == false) {
            await test.step('Admin uncheck published option', async () => {
                await categoryPage.uncheckPublishOption();
            })
        }

        if (jsonTestData.display.showOnHomePage == true) {
            await test.step('Admin checked Show on home page option', async () => {
                await categoryPage.checkShowOnHomePageOption();
            })
        }

        await test.step('Admin input category page size', async () => {
            await categoryPage.inputCategoryPageSize(jsonTestData.display.pageSize);
        })

        if (jsonTestData.display.priceRangeFiltering == true) {
            await test.step('Admin checked price range filtering option', async () => {
                await categoryPage.checkPriceRangeFilteringOption();
            })
        }

        await test.step('Admin input category display order', async () => {
            await categoryPage.inputCategoryDisplayOrder(jsonTestData.display.displayOrder);
        })

        await test.step('Admin select category visibility', async () => {
            await categoryPage.inputCategoryVisibility(jsonTestData.display.visibility);
        })

        await test.step('Admin upload category menu icon', async () => {
            await categoryPage.inputUploadMenuIcon(jsonTestData.images.menuIconImagePath);
        })

        await test.step('Admin upload category banner for mobile', async () => {
            await categoryPage.inputUploadBannersMobile(jsonTestData.images.bannerMobileImagePath);
        })

        await test.step('Admin upload category banner for desktop', async () => {
            await categoryPage.inputUploadBannersDesktop(jsonTestData.images.bannerDesktopImagePath);
        })

        await test.step('Admin upload category banner for app', async () => {
            await categoryPage.inputUploadBannersApp(jsonTestData.images.bannerAppImagePath);
        })


        await test.step('Admin upload category pictures for mobile', async () => {
            await categoryPage.inputUploadPicturesMobile(jsonTestData.images.picturesMobileImagePath);
        })

        await test.step('Admin upload category pictures for desktop', async () => {
            await categoryPage.inputUploadPicturesDesktop(jsonTestData.images.picturesDesktopImagePath);
        })

        await test.step('Admin upload category pictures for app', async () => {
            await categoryPage.inputUploadPicturesApp(jsonTestData.images.picturesAppImagePath);
        })

        await test.step('Admin input category meta keywords', async () => {
            await categoryPage.inputMetaKeyword(jsonTestData.seo.metaKey);
        })

        await test.step('Admin input category meta description', async () => {
            await categoryPage.inputMetaDescription(jsonTestData.seo.metaDes);
        })

        await test.step('Admin click save button', async () => {
            await categoryPage.clickSaveButton();
        })

        await test.step('And admin should see category create success message', async () => {
            const toastMsg: string = await categoryPage.getToastMessageText();
            expect(toastMsg).toEqual(expect.stringContaining(jsonTestData.toastMessages.categoryCreateSuccessMsg));
        })

        await test.step('Then verify category showing in list', async () => {
            await categoryPage.searchCategoryNameInListPage(jsonTestData.category_info.name);
            const searchResults = await categoryPage.getSearchResultColNameValues();
            console.log(searchResults)
            expect(searchResults).toContain(jsonTestData.category_info.name);
        })
    })

    test('Verify that Admins successfully delete a category from the admin panel. @smoke', async ({ page, categoryPage }) => {

        await test.step('Admin create a category successfully', async () => {
            /* Admin go to category create page */
            await categoryPage.clickAddNewButton()
            await page.waitForLoadState('domcontentloaded')
            await expect(page).toHaveURL(/.*create/);

            /* Admin create a category with all valid input */
            jsonTestData.category_info.name = categoryName;
            await categoryPage.inputCategoryName(categoryName);
            fs.writeFileSync(categoryDataJsonFilePath, JSON.stringify(jsonTestData, null, 2), 'utf-8');
            // await categoryPage.inputCategoryDescription(jsonTestData.category_info.description);
            await categoryPage.inputCategoryPageSize(jsonTestData.display.pageSize);
            await categoryPage.inputCategoryDisplayOrder(jsonTestData.display.displayOrder);
            await categoryPage.inputCategoryVisibility(jsonTestData.display.visibility);
            await categoryPage.clickSaveButton();
            const toastMsg: string = await categoryPage.getToastMessageText();
            expect(toastMsg).toEqual(expect.stringContaining(jsonTestData.toastMessages.categoryCreateSuccessMsg));

            if (toastMsg.includes('successfully')) {
                await categoryPage.toastSuccessMsg.waitFor({ state: "hidden" })
            } else {
                await categoryPage.toastErrorMsg.waitFor({ state: "hidden" })
            }
        })

        await test.step('Admin go to category edit details page from list', async () => {
            await categoryPage.searchCategoryNameInListPage(jsonTestData.category_info.name);
            await categoryPage.goToCategoryEditDetailsPage();
        })

        test.step('Verify admin successfully navigate to category edit details page', async () => {
            await expect(categoryPage.getCategoryPageTitle()).toContainText('Edit category details')
        })

        await test.step('Admin click delete button from category details page', async () => {
            await categoryPage.clickDeleteButton();
        })

        await test.step('Verify category deleted successfully', async () => {
            const toastMsg: string = await categoryPage.getToastMessageText();
            expect(toastMsg).toEqual(expect.stringContaining(jsonTestData.toastMessages.categoryDeleteSuccessMsg));
        })

        await test.step('Then verify category not showing in list', async () => {
            await categoryPage.searchCategoryNameInListPage(jsonTestData.category_info.name);
            const searchResults: string[] = await categoryPage.getSearchResultColNameValues();
            expect(searchResults).toContain('No data available');
        })

    })

    test.afterEach(async ({ page, categoryPage }) => {
        console.log('----------After Test-----')
        console.log('Start cleaning category test data for test env')
        await page.goto(ENV.BASE_URL + '/#/category/list')
        await page.waitForURL(/.*category/, { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*category/);

        await categoryPage.searchCategoryNameInListPage(jsonTestData.category_info.name);
        const searchResults: string[] = await categoryPage.getSearchResultColNameValues();

        if (!searchResults.includes("No data available")) {
            console.log('Found test category with name [' + jsonTestData.category_info.name + ']')
            await categoryPage.selectAllSearchedItems();
            await categoryPage.clickDeleteSelectedSearchItems();
            const toastMsg: string = await categoryPage.getToastMessageText();

            if (toastMsg.toLowerCase().includes("success")) {
                console.log('Deleted test category with name [' + jsonTestData.category_info.name + ']')
            } else {
                console.log('Unable to delete test data due to error [' + toastMsg + ']')
            }
        } else {
            console.log('No test category found with name [' + jsonTestData.category_info.name + ']')
        }
    })
})

