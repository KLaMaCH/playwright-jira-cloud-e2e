const { test: setup, expect } = require('@playwright/test');

const userEmail = process.env.JIRA_USER;
const userPassword = process.env.JIRA_PASSWORD;

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, baseURL }) => {
  // Locators
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const submit = page.locator('#login-submit');
  const userPic = page.locator(
    'data-test-id=ak-spotlight-target-profile-spotlight'
  );
  // Perform authentication steps
  console.log(`Try login to Jira before all tests`);

  await page.goto('./login.jsp?os_destination=' + encodeURI(baseURL));
  await userName.click();
  await userName.fill(userEmail);
  await submit.click();
  await password.click();
  await password.fill(userPassword);
  await submit.click();
  // Check that we're logged in
  await expect(userPic).toBeVisible({ timeout: 30000 });
  // End of authentication steps.

  // Save cookie
  await page.context().storageState({ path: authFile });
});
