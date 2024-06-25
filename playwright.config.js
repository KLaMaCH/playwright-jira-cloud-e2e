// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
const baseUrl = process.env.JIRA_URL;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './jira-cloud-e2e/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  retries: 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1920, height: 1080 },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,

    /* Record trace for each test. When test run passes, remove the recorded trace. */
    trace: 'on',

    actionTimeout: 10000,
  },

  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.js/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      //dependencies: ['setup'],
    },
  ],
});
