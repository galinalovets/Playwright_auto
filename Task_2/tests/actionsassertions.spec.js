// @ts-check
import { test, expect } from '@playwright/test';

test('actions', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  
  const fieldFirstName = page.locator('xpath=//input[@id= "firstName"]');
  const fieldLastName = page.getByPlaceholder('Last Name');
  const fieldEmail = page.getByPlaceholder('name@example.com');
  const radioGender  = page.getByLabel('Male', {exact : true});
  const fieldPhoneNumber = page.getByPlaceholder('Mobile Number');
  const fieldDate = page.locator('input#dateOfBirthInput');
  const fieldSubjects = page.locator('input#subjectsInput');
  const checkboxHobbySports = page.getByLabel('Sports');
  const uploadPicture = page.locator('input#uploadPicture');
  const fileChooserPromise = page.waitForEvent('filechooser');
  const selectState = page.locator('input#react-select-3-input');
  const buttonSubmit = page.getByRole('button', {name : 'Submit'});
  const modalDialog = page.locator('div.modal-content');


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

  await uploadPicture.click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('newtext.txt');
  await expect(uploadPicture).toBeVisible();

  await selectState.click({force : true});
  await selectState.press('Enter');
  await expect(selectState).toBeVisible();

  await buttonSubmit.hover();
  await buttonSubmit.click();
  await expect(modalDialog).toBeVisible();
});

test('select', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');

  const selectedItem = page.locator('select#oldSelectMenu');

  await selectedItem.selectOption('Red');
  await expect(selectedItem).toHaveValue('red');


  
})