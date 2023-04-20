// @ts-check
import { test, expect, chromium } from '@playwright/test';

test('login', async () => {
  const browser = await chromium.launch();  
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://demoqa.com/login');
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill('HalinaTest');
  await page.getByPlaceholder('UserName').press('Tab');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Testtest1$');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://demoqa.com/profile');
  await expect(page).toHaveURL(/profile/);
  await context.storageState({ path: 'state.json'});
 })

 test('route block images', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState : 'state.json'});
  const page = await context.newPage();
  await context.storageState({ path: 'state.json'});
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  await page.goto('https://demoqa.com/books');
  const image = page.locator('[scr="**/*.{png,jpg,jpeg}"]');
  await expect(image).not.toBeVisible();
 })

 test.only('book store requests', async () => {
  const browser = await chromium.launch();  
  const context = await browser.newContext({ storageState : 'state.json'});
  const page = await context.newPage();
  const responsePromise = page.waitForResponse('https://demoqa.com/BookStore/v1/Books');
  await page.goto('https://demoqa.com/profile');
  await context.storageState({ path: 'state.json'});
  await page.getByRole('list').getByText('Book Store', { exact: true }).click();
  await expect(page).toHaveURL(/books/);
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  await page.screenshot({ path: 'pagescreen.jpeg', fullPage: true});
  const response = await responsePromise;
  response.ok();
  console.log(response.status());
  console.log(await response.json());
  //await page.route()


 })