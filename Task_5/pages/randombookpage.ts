import { Locator, Page } from '@playwright/test';

export default class RandomBookPage {
  readonly page: Page;
  readonly numberPages: Locator;
  readonly booksOnPageAmount: Locator;
  readonly buttonBackToBookStore: Locator;

  constructor(page: Page) {
    this.page = page;
    this.numberPages = page.locator('label#userName-value.form-label').nth(6);
    this.booksOnPageAmount = page.locator('div.action-buttons');
    this.buttonBackToBookStore = page.getByRole('button', { name: 'Back To Book Store' });
  }

  async pageScreenshot() {
    await this.page.screenshot({ path: 'resourses/bookPages.jpeg' });
  }
}