const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('Test', async ({ page }) => {
  console.log(`Try login to Jira`);
  await page.goto('/');
  await expect(userPic).toBeVisible({ timeout: 30000 });
});