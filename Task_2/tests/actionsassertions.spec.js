// @ts-check
import { test, expect } from '@playwright/test';

test('practice form', async ({ page }) => {
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
  
  await fieldFirstName.fill('Peter');
  await expect(fieldFirstName).toHaveValue('Peter');

  await fieldLastName.fill('Parker');
  await expect(fieldLastName).toHaveValue('Parker');

  await fieldEmail.type('avengers');
  await fieldEmail.press('Control+ArrowRight');
  await fieldEmail.press('@');
  await fieldEmail.press('Control+ArrowRight');
  await fieldEmail.type('assemble.com');
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

});

test('select', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');

  const selectedItem = page.locator('select#oldSelectMenu');

  await selectedItem.selectOption('Red');
  await expect(selectedItem).toHaveValue('red');
 
})

test('menu', async ({ page }) => {
  await page.goto('https://demoqa.com/menu');

  const selectedMenuItem = page.getByText('Main Item 2');
  const selectedSubMenuItem = page.getByText('SUB SUB LIST »');
  const selectedSubSubMenuItem = page.getByText('Sub Sub Item 1');

  await selectedMenuItem.hover();
  await selectedSubMenuItem.hover();
  await selectedSubSubMenuItem.hover();
  await expect(selectedSubSubMenuItem).toBeVisible();
 
})

test('upload', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  const uploadFile = page.locator('#uploadFile');
  const uploadedFilePath = page.locator('#uploadedFilePath');

  await uploadFile.setInputFiles('newtext.txt');
  await expect(uploadedFilePath).toBeVisible();
 
})

test('drag & drop', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable');

  const itemToDrag = page.locator('div #simpleDropContainer div#draggable');
  const placeToDrop = page.locator('div #simpleDropContainer div#droppable');
  
  await itemToDrag.dragTo(placeToDrop);
  await expect(placeToDrop).toHaveText('Dropped!');
 
})