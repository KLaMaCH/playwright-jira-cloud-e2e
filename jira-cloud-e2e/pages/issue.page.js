exports.IssuePage = class IssuePage {
  constructor(page) {
    /**
     * @param {import('@playwright/test').Page} page
     */
    this.page = page;
    this.currentIssueLink = page.getByTestId(
      'issue.views.issue-base.foundation.breadcrumbs.current-issue.item'
    );
    this.summaryHeading = page.getByTestId(
      'issue.views.issue-base.foundation.summary.heading'
    );
    this.summaryTextArea = page.getByLabel('Summary');
    this.saveSummaryButton = page.getByRole('button', { name: 'Confirm Summary' });
    this.descriptionHeading = page.getByTestId(
      'issue.views.field.rich-text.description'
    );
    this.descriptionText = this.descriptionHeading.locator(
      '.ak-renderer-document'
    );
    this.descriptionTextArea = page.getByLabel('Description area, start');
    this.descriptionSaveButton = page.getByTestId('comment-save-button');
    this.actionsButton = page.getByTestId(
      'issue-meatball-menu.ui.dropdown-trigger.button'
    );
  }

  async openCurrentIssue() {
    await this.currentIssueLink.click();
  }

  async changeSummaryAndDescription(summary, description) {
    await this.summaryHeading.click();
    await this.summaryTextArea.fill(summary);
    await this.saveSummaryButton.click();
    await this.descriptionHeading.click();
    await this.descriptionTextArea.fill(description);
    await this.descriptionSaveButton.click();
  }
};
