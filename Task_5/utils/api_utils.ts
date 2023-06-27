import { baseURL } from '../pages/base_page';
import { generateRandomAmount } from './general_utils';

async function imgRouteAbort(page) {
  await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
}

async function pageScreenshot(page, imagePath) {
  await page.screenshot({
    path: `${imagePath}`,
    fullPage: true,
  });
}

async function modifyResponseBookPages(page) {
  const randomPages = await generateRandomAmount(1, 1000);
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
  randomPageClick,
  addUserAuthInfo,
};
