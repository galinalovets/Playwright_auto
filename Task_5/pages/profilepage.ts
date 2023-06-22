import { Page, Locator } from '@playwright/test';

export default class ProfilePage {
  readonly page: Page;
  readonly linkBookStore: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkBookStore = page
      .getByRole('list')
      .getByText('Book Store', { exact: true });
  }

  async gotoBookStore() {
    await this.linkBookStore.click();
  }
}
