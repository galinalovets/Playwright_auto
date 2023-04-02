// @ts-check
import { test, expect } from '@playwright/test';

test.only('actions', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  
  const fieldFirstName = page.locator('xpath=//input[@id= "firstName"]');
  const fieldLastName = page.getByPlaceholder('Last Name');
  const radioGender  = page.getByLabel("Male");

  await fieldFirstName.fill('Peter');
  await expect(fieldFirstName).toHaveValue('Peter');

  await fieldLastName.fill('Parker');
  await expect(fieldLastName).toHaveValue('Parker');


  //await radioGender.check();
  //await expect(radioGender).toBeChecked();
  //await page.getByLabel("Sports").check();
  
});

test('forum locators', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  
})