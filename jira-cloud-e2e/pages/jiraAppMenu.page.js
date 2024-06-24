exports.JiraAppMenuPage =  class JiraAppMenuPage {
  constructor(page) {
    this.page = page;
    this.filtersButton = page.getByRole('button', { name: 'Filters' });
    this.viewAllIssuesButton = page.getByRole('link', {
      name: 'View all issues',
    });
  }

  async openAllIssuesFilter() {
    await this.filtersButton.click();
    await this.viewAllIssuesButton.click();
  }
}
