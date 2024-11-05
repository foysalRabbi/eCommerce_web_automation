import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  /* Only the files matching one of these patterns are executed as test files. */
  testMatch: ["**.spec.ts"],

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [
    ['junit', { outputFile: './playwright-report/result.xml' }],
    ['@skilbourn/playwright-report-summary', { outputFile: './playwright-report/custom-summary.txt' }],
    ['github'],
    ['list']
  ] : [
    ['list'],
    ['html', { open: 'on-failure' }],
    ['@skilbourn/playwright-report-summary', { outputFile: './playwright-report/custom-summary.txt' }]
  ],

  /* Path to the global setup file. This file will be required and run before all the tests. - For initializing DotEnv Utility class*/
  globalSetup: "src/utils/global-setup.ts",

  /* This is a base timeout for all tests.*/
  timeout: 1 * 60 * 1000,

  /* This is a base timeout for all tests assertion.*/
  expect: {
    timeout: 10 * 1000,
  },

  /* Global options for all tests */
  use: {
    // Run browser in headless mode in CI
    headless: process.env.CI ? true : false,

    // Capture screenshot only after each test failure.
    screenshot: process.env.CI ? 'off' : 'only-on-failure',
    video: process.env.ci ? 'off' : 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'off' : 'on',

    /* This is a default one page to another page navigation timeout */
    navigationTimeout: 2 * 60 * 1000,
  },

  /* Configure projects for all environment */
  projects: [
    {
      name: `${process.env.test_env} - Chrome`,
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ],


});
