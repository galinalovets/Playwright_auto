// @ts-check
import { test, expect, chromium } from '@playwright/test';
import userData from '../resourses/user.json';
test('API test', async ({ request }) => {
  const baseURL = 'https://demoqa.com';
  const browser = await chromium.launch({
    logger: {
      isEnabled: () => true,
      log: (name, severity, message, args) => console.log(`name => ${name}, msg => ${message}`),
    },
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  const userLogin = userData['username'];
  const userPassword = userData['password'];
  
  await test.step('Log in', async () => {
    await page.goto(`${baseURL}/login`);
    await page.getByPlaceholder('UserName').fill(userLogin);
    await page.getByPlaceholder('Password').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(`${baseURL}/profile`);
    await expect(page).toHaveURL(/profile/);
  });

  const cookiesAll = await context.cookies();
  const userID = cookiesAll.find((c) => c.name === 'userID');
  const userName = cookiesAll.find((c) => c.name === 'userName');
  const expires = cookiesAll.find((c) => c.name === 'expires');
  const token = cookiesAll.find((c) => c.name === 'token');

  await test.step('Verify Cookies', async () => {
    expect(userID).toBeTruthy();
    expect(userName).toBeTruthy();
    expect(expires).toBeTruthy();
    expect(token).toBeTruthy();
  });

  await test.step('Block images', async () => {
    await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
    await page.goto(`${baseURL}/books`);
    await page.screenshot({ path: 'resourses/noimages.jpeg' });
  });
  
  await test.step('Verify books amount', async () => {
    const responsePromise = page.waitForResponse(
      `${baseURL}/BookStore/v1/Books`
    );
    await page.goto(`${baseURL}/profile`);
    await page
      .getByRole('list')
      .getByText('Book Store', { exact: true })
      .click();
    await expect(page).toHaveURL(/books/);
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await page.screenshot({
      path: 'resourses/pagescreen.jpeg',
      fullPage: true,
    });
    const responseBooks = await responsePromise;
    expect(responseBooks.status()).toBe(200);
    const responseBooksBody = await responseBooks.json();
    const booksAmount = await page.locator('div.action-buttons').count();
    await expect(page.locator('div.action-buttons')).toHaveCount(booksAmount);
    const booksResponseAmount = await responseBooksBody.books.length;
    expect(booksAmount).toBe(booksResponseAmount);
  });
  
  const randomPages = Math.floor(Math.random() * 100) + 1;

  await test.step('Modify response - random pages', async () => {
    await page.route(`${baseURL}/BookStore/v1/Book?ISBN=*`, async (route) => {
      const response = await route.fetch();
      let body = await response.text();
      const bookBody = JSON.parse(body);
      body = body.replace(bookBody.pages, `${randomPages}`);
      route.fulfill({
        response,
        body,
        headers: { ...response.headers() },
      });
    });
    const responsePromise = page.waitForResponse(
      `${baseURL}/BookStore/v1/Books`
    );
    await page.goto(`${baseURL}/profile`);
    await page
      .getByRole('list')
      .getByText('Book Store', { exact: true })
      .click();
    await expect(page).toHaveURL(/books/);
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await page.screenshot({
      path: 'resourses/pagescreen.jpeg',
      fullPage: true,
    });
    const responseBooks = await responsePromise;
    expect(responseBooks.status()).toBe(200);
    const responseBooksBody = await responseBooks.json();
    const booksResponseAmount = await responseBooksBody.books.length;
    const bookListIndex = Math.floor(Math.random() * booksResponseAmount);
    const bookItemTitle = page.locator('div.action-buttons').nth(bookListIndex);
    await bookItemTitle.click();
    await expect(
      page.getByRole('button', { name: 'Back To Book Store' })
    ).toBeVisible();
    const numberPages = page.locator('label#userName-value.form-label').nth(6);
    await expect(numberPages).toHaveText(`${randomPages}`);
    await page.screenshot({ path: 'resourses/bookPages.jpeg' });
  });

  await test.step('Add token', async () => {
    const response = await request.get(
      `${baseURL}/Account/v1/User/${userID?.value}`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.username).toBe(userLogin);
    expect(responseBody.books.length).toBe(0);
    expect(responseBody.books).toStrictEqual([]);
    await page.screenshot({ path: 'resourses/bookPages.jpeg' });
  });
});
