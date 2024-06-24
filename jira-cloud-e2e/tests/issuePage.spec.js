const { test, expect } = require('@playwright/test');
const { IssuePage } = require('../pages/issue.page.js');
const { JiraAppMenuPage } = require('../pages/jiraAppMenu.page.js');

require('dotenv').config();

test.describe('Issue Page tests', () => {
  test('Edit Jira Issue', async ({ page, context }) => {
    const jiraAppMenuPage = new JiraAppMenuPage(page);
    const issuePage = new IssuePage(page);

    // Navigate to first issue in search
    await page.goto('.');
    const newSummary = 'Summary ' + Date.now().toString();
    const newDescription = 'Description ' + Date.now().toString();
    await jiraAppMenuPage.openAllIssuesFilter();
    const pagePromise = context.waitForEvent('page');
    await issuePage.openCurrentIssue();
    const newPage = await pagePromise;
    const newJiraPage = new IssuePage(newPage);
    await newJiraPage.changeSummaryAndDescription(newSummary, newDescription);
    //check that changes have applied
    await newPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(newJiraPage.summaryHeading).toHaveText(newSummary, {
      timeout: 10000,
    });
    await expect(newJiraPage.descriptionText).toHaveText(newDescription, {
      timeout: 10000,
    });
  });
});
