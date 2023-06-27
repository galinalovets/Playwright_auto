import { Locator, Page } from '@playwright/test';

export default class BookStorePage {
  readonly page: Page;
  readonly booksOnPageAmount: Locator;
  readonly btnNext: Locator;

  constructor(page: Page) {
    this.page = page;
    this.booksOnPageAmount = page.locator('div.action-buttons');
    this.btnNext = page.getByRole('button', { name: 'Next' });
  }
}
