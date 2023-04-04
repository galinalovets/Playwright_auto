// @ts-check
import { test, expect } from '@playwright/test';

test.only('actions', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  
  const fieldFirstName = page.locator('xpath=//input[@id= "firstName"]');
  const fieldLastName = page.getByPlaceholder('Last Name');
  const fieldEmail = page.getByPlaceholder('name@example.com');
  const radioGender  = page.getByLabel('Male', {exact : true});
  const fieldPhoneNumber = page.getByPlaceholder('Mobile Number');
  const fieldDate = page.locator('input#dateOfBirthInput');
  const fieldSubjects = page.locator('input#subjectsInput');
  const checkboxHobbySports = page.getByLabel('Sports');


  await fieldFirstName.fill('Peter');
  await expect(fieldFirstName).toHaveValue('Peter');

  await fieldLastName.fill('Parker');
  await expect(fieldLastName).toHaveValue('Parker');

  await fieldEmail.fill('avengers@assemble.com');
  await expect(fieldEmail).toHaveValue('avengers@assemble.com');
  
  await radioGender.check({force : true});
  await expect(radioGender).toBeChecked();
 
  await fieldPhoneNumber.fill('5555555555');
  await expect(fieldPhoneNumber).toHaveValue('5555555555');

  await fieldDate.fill('04/03/2023');
  await fieldDate.press('Enter');
  await expect(fieldDate).toHaveValue('03 Apr 2023');

  await fieldSubjects.fill('Math');
  await fieldSubjects.press('Enter');
  await expect(fieldSubjects).toBeVisible();

  await checkboxHobbySports.check({force : true});
  await expect(checkboxHobbySports).toBeChecked();
});

test('forum locators', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  
})