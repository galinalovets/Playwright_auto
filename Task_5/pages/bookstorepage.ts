import { expect, Locator, Page } from '@playwright/test';

const baseURL = 'https://demoqa.com';
export default class BookStorePage {
  readonly page: Page;
  readonly responsePromise: any;
  readonly responseBooks: any;
  readonly booksResponseAmount: any;
  readonly responseBooksBody: any;
  readonly booksOnPageAmount: Locator;
  readonly randomPages: any;
  readonly bookListIndex: any;
  readonly bookItemTitle: any;

  constructor(page: Page) {
    this.page = page;
    this.booksOnPageAmount = page.locator('div.action-buttons');
    this.randomPages = Math.floor(Math.random() * 100) + 1;
    this.bookListIndex = Math.floor(Math.random() * this.booksResponseAmount);
    this.bookItemTitle = page
      .locator('div.action-buttons')
      .nth(this.bookListIndex);
  }

  async goto() {
    await this.page.goto(`${baseURL}/books`);
  }

  async imgRouteAbort() {
    await this.page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
  }

  async waitForResponse() {
    const responsePromise = this.page.waitForResponse(
      `${baseURL}/BookStore/v1/Books`
    );
    await this.page.goto(`${baseURL}/books`);
    const responseBooks = await responsePromise;
    expect(responseBooks.status()).toBe(200);
    const responseBooksBody = await responseBooks.json();
    const booksResponseAmount = await responseBooksBody.books.length;
    return booksResponseAmount;
  }

  async pageScreenshot() {
    await this.page.screenshot({
      path: 'resourses/pagescreen.jpeg',
      fullPage: true,
    });
  }

  async modifyResponse() {
    await this.page.route(
      `${baseURL}/BookStore/v1/Book?ISBN=*`,
      async (route) => {
        const response = await route.fetch();
        let body = await response.text();
        const bookBody = JSON.parse(body);
        body = body.replace(bookBody.pages, `${this.randomPages}`);
        route.fulfill({
          response,
          body,
          headers: { ...response.headers() },
        });
      }
    );
  }

  async randomPageClick() {
    const booksResponseAmount = await this.waitForResponse();
    const bookListIndex = Math.floor(Math.random() * booksResponseAmount);
    const bookItemTitle = this.page
      .locator('div.action-buttons')
      .nth(bookListIndex);
    await bookItemTitle.click();
  }
}
