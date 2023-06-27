import { Page } from '@playwright/test';
import { baseURL } from './base_page';

export default class Navigation {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${baseURL}/login`);
  }

  async gotoLogin() {
    await this.page.goto(`${baseURL}/login`);
  }

  async gotoProfile() {
    await this.page.goto(`${baseURL}/profile`);
  }

  async gotoBookStore() {
    await this.page.goto(`${baseURL}/books`);
  }
}
