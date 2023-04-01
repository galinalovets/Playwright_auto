// @ts-check
import { test, expect } from '@playwright/test';

test('actions', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
   
  await page.locator('xpath=//input[@id= "firstName"]').fill('Peter');
  
});

test('forum locators', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  
})