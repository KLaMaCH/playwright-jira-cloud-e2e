const { test, expect } = require('@playwright/test');
const { IssuePage } = require('../pages/issue.page.js');
const { JiraAppMenuPage } = require('../pages/jiraAppMenu.page.js');

test.describe('Issue page', () => {
  let currentPage;
  test.beforeEach('open Jira Issue page', async ({ page, context }) => {
    const jiraAppMenuPage = new JiraAppMenuPage(page);
    const issuePage = new IssuePage(page);
    // Navigate to first issue in search
    await page.goto('.');
    await jiraAppMenuPage.openAllIssuesPage();
    const pagePromise = context.waitForEvent('page');
    await issuePage.openCurrentIssue();
    currentPage = await pagePromise;
  });

  test('edit summary and description', async () => {
    const newSummary = 'Summary ' + Date.now().toString();
    const newDescription = 'Description ' + Date.now().toString();
    const issuePage = new IssuePage(currentPage);
    await issuePage.changeSummaryAndDescription(newSummary, newDescription);
    await currentPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(issuePage.summaryHeading).toHaveText(newSummary);
    await expect(issuePage.descriptionText).toHaveText(newDescription);
  });

  test('edit status', async () => {
    const issuePage = new IssuePage(currentPage);
    const newStatus = await issuePage.changeStatus();
    await currentPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(issuePage.statusButton).toHaveText(newStatus, {
      ignoreCase: true,
    });
  });

  test('edit assignee', async () => {
    const issuePage = new IssuePage(currentPage);
    const newAssignee = await issuePage.changeAssignee();
    await expect(issuePage.assigneeButton).toHaveText(
      newAssignee.replace(' (Assign to me)', ''),
      {
        ignoreCase: true,
      }
    );
  });
});
