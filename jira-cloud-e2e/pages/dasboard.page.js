const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    // Jira menu
    this.jiraMenuDashboardsButton = page
      .getByLabel('Primary')
      .getByRole('button', { name: 'Dashboards' });
    this.jiraMenuViewAllDashboardsLink = page
      .getByLabel('Dashboards')
      .getByRole('link', { name: 'View all dashboards' });
    this.jiraMenuCreateDashboardLink = page
      .getByLabel('Dashboards')
      .getByRole('button', { name: 'Create dashboard' });

    // all dashboards page locators
    this.createDashboardButton = page.locator(
      '[data-test-id="directory\\.dashboards-v2\\.create-button"]'
    );
    this.searchDashboardsInput = page.getByLabel('Search dashboards');
    this.dashboardLink = page.locator('a[href*="/jira/dashboards/"]');
    // create dashboard dialog locators
    this.newDashboardNameField = page.getByTestId(
      'shareable-entity-dialog.text-field'
    );
    this.saveNewDashboardButton = page.getByRole('button', {
      name: 'Save',
      exact: true,
    });
    // current dashboard page locators
    this.dashboardHeaderTitle = page.getByTestId(
      'dashboard-internal-common.ui.dashboard-content.header.header-title'
    );
    this.moreActionsButton = page.getByLabel('More dashboard actions');
    this.moveToTrashMenuItem = page.getByRole('menuitem', {
      name: 'Move to trash',
    });
    this.confirmMoveToTashButton = this.editDashboardButton = page.getByTestId(
      'dashboard-view.ui.header-readonly.dashboard-edit-button'
    );
    this.addGadgetButton = page.getByTestId(
      'dashboard-edit.ui.header-editable.add-gadget-button.add-gadget-panel.gadget-directory-item.dashboard-add-gadget-button'
    );
    this.searchGadgetsInput = page.getByTestId(
      'dashboard-edit.ui.header-editable.add-gadget-button.add-gadget-panel.dashboard-add-gadget-search'
    );
    this.doneEditButton = page.getByRole('link', { name: 'Done', exact: true });
    // common gadget locators
    this.gadgetMoreActionsButton = page.getByTestId(
      'dashboard-edit.ui.gadget-editable.config-dropdown.dropdown-button'
    );
    this.deleteGadgetButton = page.getByTestId(
      'dashboard-edit.ui.gadget-editable.config-dropdown.delete'
    );
    this.confirmDeleteGadgetButton = page.getByRole('button', { name: 'Delete' , exact: true });
    // Activity Stream gadget locators
    this.activityStreamItem = page.locator('.jira-activity-item');
  }

  async goto() {
    await this.page.goto('/');
    await this.openAllDashboardsPage();
  }

  async openAllDashboardsPage() {
    await this.jiraMenuDashboardsButton.click();
    await this.jiraMenuViewAllDashboardsLink.click();
  }

  async openCreateDashboardPage() {
    await this.jiraMenuDashboardsButton.click();
    await this.jiraMenuCreateDashboardLink.click();
  }

  async createDashboard(name) {
    await this.openCreateDashboardPage();
    await this.newDashboardNameField.fill(name);
    await this.saveNewDashboardButton.click();
    await this.doneEditButton.click();
  }

  async addGadgetByName(name) {
    await this.editDashboardButton.click();
    await this.searchGadgetsInput.fill(name);
    await expect(this.addGadgetButton).toHaveCount(1);
    await this.addGadgetButton.click();
    await this.doneEditButton.click();
  }

  async deleteGadget() {
    await this.editDashboardButton.click();
    await this.gadgetMoreActionsButton.click();
    await this.deleteGadgetButton.click();
    await this.confirmDeleteGadgetButton.click();
    await this.doneEditButton.click();
  }

  async deleteDashboard(name) {
    await this.openAllDashboardsPage();
    await this.searchDashboardsInput.fill(name);
    await this.page.getByRole('link', { name: name }).click();
    await this.moreActionsButton.click();
    await this.moveToTrashMenuItem.click();
  }
};
