// @ts-check
import { test, expect, chromium } from '@playwright/test';
import userData from '../resourses/user.json';
test('API test', async ({ request }) => {
  const baseURL = 'https://demoqa.com';
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const userLogin = userData['username'];
  const userPassword = userData['password'];

  await page.goto(`${baseURL}/login`);
  await page.getByPlaceholder('UserName').fill(userLogin);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(`${baseURL}/profile`);
  await expect(page).toHaveURL(/profile/);
  
  const cookiesAll = await context.cookies();
  const userID = cookiesAll.find((c) => c.name == 'userID');
  await expect(userID).toBeTruthy();
  const userName = cookiesAll.find((c) => c.name == 'userName');
  await expect(userName).toBeTruthy();
  const expires = cookiesAll.find((c) => c.name == 'expires');
  await expect(expires).toBeTruthy();
  const token = cookiesAll.find((c) => c.name == 'token');
  await expect(token).toBeTruthy();

  await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
  await page.goto(`${baseURL}/books`);
  await page.screenshot({ path: 'resourses/noimages.jpeg' });

  const responsePromise = page.waitForResponse(`${baseURL}/BookStore/v1/Books`);
  await page.goto(`${baseURL}/profile`);
  await page.getByRole('list').getByText('Book Store', { exact: true }).click();
  await expect(page).toHaveURL(/books/);
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  await page.screenshot({ path: 'resourses/pagescreen.jpeg', fullPage: true });
  const responseBooks = await responsePromise;
  console.log(responseBooks.status());
  const responseBooksBody = await responseBooks.json();
  await expect(responseBooksBody.books).toHaveLength(8);

  await page.route(`${baseURL}/BookStore/v1/Book?ISBN=*`, async (route) => {
    const response = await route.fetch();
    let body = await response.text();
    let bookBody = JSON.parse(body);
    body = body.replace(bookBody.pages, '852');
    route.fulfill({
      response,
      body,
      headers: { ...response.headers() },
    });
  });
  await page.getByText('Speaking JavaScript').click();
  await expect(
    page.getByRole('button', { name: 'Back To Book Store' })
  ).toBeVisible();
  await page.screenshot({ path: 'resourses/bookPages.jpeg' });

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
  console.log(responseBody);
  await page.screenshot({ path: 'resourses/bookPages.jpeg' });
});
