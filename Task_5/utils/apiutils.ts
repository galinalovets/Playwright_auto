import { baseURL } from '../utils/basepage';
import { generateRandomAmount } from './generalutils';

async function imgRouteAbort(page) {
  await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
}

async function pageScreenshot(page) {
  await page.screenshot({
    path: 'resourses/pagescreen.jpeg',
    fullPage: true,
  });
}

async function modifyResponseBookPages(page) {
  const randomPages = await generateRandomAmount();
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
  return randomPages;
}

async function generateRandomBookListIndex(booksResponseAmount) {
  const bookListIndex = Math.floor(Math.random() * booksResponseAmount);
  return bookListIndex;
}

async function randomPageClick(page, bookListIndex) {
  const bookItemTitle = page.locator('div.action-buttons').nth(bookListIndex);
  await bookItemTitle.click();
}

async function addUserAuthInfo(page, userID, token) {
  const responseAPI = await page.request.get(
    `https://demoqa.com/Account/v1/User/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responseAPI;
}

export {
  imgRouteAbort,
  pageScreenshot,
  modifyResponseBookPages,
  generateRandomAmount,
  generateRandomBookListIndex,
  randomPageClick,
  addUserAuthInfo,
};
