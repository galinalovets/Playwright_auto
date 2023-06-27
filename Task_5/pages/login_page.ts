import { expect, Locator, Page } from '@playwright/test';
import userData from '../resourses/user.json';
import { baseURL } from './base_page';

export default class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly buttonLogin: Locator;
  readonly userLogin: string;
  readonly userPassword: string;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByPlaceholder('UserName');
    this.password = page.getByPlaceholder('Password');
    this.buttonLogin = page.getByRole('button', { name: 'Login' });
    this.userLogin = userData['username'];
    this.userPassword = userData['password'];
  }

  async fillUserName() {
    await this.userName.fill(this.userLogin);
    await expect(this.userName).toBeVisible();
  }

  async fillPassword() {
    await this.password.fill(this.userPassword);
    await expect(this.password).toBeVisible();
  }

  async clickButtonLogin() {
    await this.buttonLogin.click();
  }

  async waitForUrl() {
    await this.page.waitForURL(`${baseURL}/profile`);
  }
}
