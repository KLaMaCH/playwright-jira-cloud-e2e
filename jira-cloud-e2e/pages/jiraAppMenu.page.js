exports.JiraAppMenuPage = class JiraAppMenuPage {
  constructor(page) {
    this.page = page;
    this.filtersButton = page
      .getByLabel('Primary')
      .getByRole('button', { name: 'Filters' });
    this.viewAllIssuesLink = page
      .getByLabel('Filters')
      .getByRole('link', { name: 'View all issues' });
  }

  async openAllIssuesPage() {
    await this.filtersButton.click();
    await this.viewAllIssuesLink.click();
  }
};
