const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/dasboard.page.js');

test.describe('Dashboard', async () => {
  let dashboardName;

  test.beforeEach(async ({ page }, testInfo) => {
    const dashboardPage = new DashboardPage(page);
    dashboardName = testInfo.title + ' ' + Date.now();

    await page.goto('.');
    await dashboardPage.createDashboard(dashboardName);
    await expect(dashboardPage.dashboardHeaderTitle).toHaveText(dashboardName);
  });

  test.afterEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.deleteDashboard(dashboardName);
  });

  [
    { gadgetName: 'Activity Stream', 
      gadgetItemLocator: '.jira-activity-item' 
    },
    {
      gadgetName: 'List multiple projects',
      gadgetItemLocator: '.project-item',
    },
  ].forEach(({ gadgetName, gadgetItemLocator }) => {
    test(`add and delete ${gadgetName} gadget`, async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.addGadgetByName(gadgetName);
      await expect(page.locator(gadgetItemLocator)).toHaveCount(10);
      await dashboardPage.deleteGadget();
      await expect(page.getByText('This dashboard is empty')).toBeVisible();
    });
  });
});
