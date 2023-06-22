// @ts-check
import { test, chromium, expect } from '@playwright/test';
import userData from '../resourses/user.json';
import LoginPage from '../pages/loginpage';
import ProfilePage from '../pages/profilepage';
import BookStorePage from '../pages/bookstorepage';
import RandomBookPage from '../pages/randombookpage';
import { baseURL } from '../utils/basepage';
import { getCookieValue } from '../utils/cookiesutils';
import {
  imgRouteAbort,
  pageScreenshot,
  modifyResponseBookPages,
  randomPageClick,
  generateRandomBookListIndex,
  addUserAuthInfo,
} from '../utils/apiutils';
import Navigation from '../pages/navigation';

test('API testing using POM', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  const navigation = new Navigation(page);

  await navigation.gotoLogin();
  await loginPage.fillUserName();
  await loginPage.fillPassword();
  await loginPage.clickButtonLogin();
  await loginPage.waitForUrl();
  await expect(page).toHaveURL(/profile/);

  const profilePage = new ProfilePage(page);

  const userName = await getCookieValue(context, 'userName');
  expect(userName).toBeTruthy();
  expect(userName).toBe(userData['username']);

  const bookStorePage = new BookStorePage(page);

  await imgRouteAbort(page);
  await navigation.gotoBookStore();
  await expect(page).toHaveURL(/books/);

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url() === `${baseURL}/BookStore/v1/Books` &&
      response.status() === 200
  );
  await navigation.gotoProfile();
  await profilePage.gotoBookStore();
  await expect(page).toHaveURL(/books/);
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  const responseBooks = await responsePromise;
  const responseBooksBody = await responseBooks.json();
  const booksResponseAmount = await responseBooksBody.books.length;
  await expect(bookStorePage.booksOnPageAmount).toHaveCount(
    booksResponseAmount
  );

  const randomPages = await modifyResponseBookPages(page);
  const bookListIndex = await generateRandomBookListIndex(booksResponseAmount);
  await randomPageClick(page, bookListIndex);

  const randomBookPage = new RandomBookPage(page);

  await expect(randomBookPage.buttonBackToBookStore).toBeVisible();
  await expect(randomBookPage.numberPages).toHaveText(`${randomPages}`);
  await pageScreenshot(page);

  const userID = await getCookieValue(context, 'userID');
  const token = await getCookieValue(context, 'token');
  const response = await addUserAuthInfo(page, userID, token);

  expect(response.status()).toBe(200);
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.username).toBe(userData['username']);
  expect(responseBody.books.length).toBe(0);
  expect(responseBody.books).toStrictEqual([]);
});
