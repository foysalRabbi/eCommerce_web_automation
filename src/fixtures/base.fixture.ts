import { test as base, Page } from '@playwright/test';
import LoginPage from '../pages/login.admin.page';
import CommonPage from '../pages/common.page';
import DashboardPage from '../pages/dashboard.admin.page';
import CategoryPage from '../pages/category.page';
import { WebUtility } from '../utils/web-utility';
import ProductPage from '../pages/catalog.products.page';

type pages = {
    webUtility: WebUtility;
    commonPage: CommonPage;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    productPage: ProductPage;
    categoryPage: CategoryPage;
}

const testPages = base.extend<pages>({
    webUtility: async ({ page }, use) => {
        await use(new WebUtility(page));
    },

    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page))
        
    },
    productPage: async ({page}, use) => {
        await use(new ProductPage(page))
        
    },

    categoryPage:async ({page}, use) => {
        await use(new CategoryPage(page))
    }

})

export const test = testPages;
export const expect = testPages.expect;