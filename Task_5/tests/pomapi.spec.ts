// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginpage';
import ProfilePage from '../pages/profilepage';
import BookStorePage from '../pages/bookstorepage';
import RandomBookPage from '../pages/randombookpage';

test('API testing using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillUserName();
  await loginPage.fillPassword();
  await loginPage.clickButtonLogin();
  await loginPage.waitForUrl();
  await expect(page).toHaveURL(/profile/);

  const profilePage = new ProfilePage(page);

  await profilePage.verifyUserID();
  await profilePage.verifyUserName();
  await profilePage.verifyExpires();
  await profilePage.verifyToken();

  const bookStorePage = new BookStorePage(page);

  const booksResponseAmount = await bookStorePage.waitForResponse();
  await bookStorePage.imgRouteAbort();
  await bookStorePage.goto();
  await expect(page).toHaveURL(/books/);
  await bookStorePage.pageScreenshot();

  await expect(bookStorePage.booksOnPageAmount).toHaveCount(
    booksResponseAmount
  );
  await bookStorePage.modifyResponse();
  await bookStorePage.randomPageClick();

  const randomBookPage = new RandomBookPage(page);

  await expect(randomBookPage.buttonBackToBookStore).toBeVisible();
  await expect(randomBookPage.numberPages).toHaveText(
    `${bookStorePage.randomPages}`
  );
  await randomBookPage.pageScreenshot();

  const userID = await profilePage.getUserID();
  const token = await profilePage.getToken();
  const response = await profilePage.addUserAuthInfo(userID, token);

  expect(response.status()).toBe(200);
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.username).toBe(loginPage.userLogin);
  expect(responseBody.books.length).toBe(0);
  expect(responseBody.books).toStrictEqual([]);
});
