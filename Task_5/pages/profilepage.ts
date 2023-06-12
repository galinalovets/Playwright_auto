import { expect, Page, Locator, chromium } from '@playwright/test';

const baseURL = 'https://demoqa.com';

export default class ProfilePage {
  readonly page: Page;
  readonly cookiesUserID: any;
  readonly cookiesUserName: any;
  readonly cookiesExpires: any;
  readonly cookiesToken: any;
  readonly browser: any;
  readonly context: any;
  readonly cookies: any;
  readonly linkBookStore: Locator;
  readonly userID: any;
  readonly token: any;

  constructor(page: Page) {
    this.page = page;
    this.browser = async () => await chromium.launch();
    this.context = async () => await this.browser.newContext();
    this.cookies = async () => await this.context.cookies();
    this.linkBookStore = page
      .getByRole('list')
      .getByText('Book Store', { exact: true });
  }

  async goto() {
    await this.page.goto(`${baseURL}/profile`);
  }

  async gotoBookStore() {
    await this.linkBookStore.click();
  }

  async getCookies() {
    return await this.context().cookies();
  }

  async verifyUserID() {
    const cookies = await this.page.context().cookies();
    const cookiesUserID = cookies.find((c) => c.name === 'userID');
    expect(cookiesUserID).toBeTruthy();
  }

  async verifyUserName() {
    const cookies = await this.page.context().cookies();
    const cookiesUserName = cookies.find((c) => c.name === 'userName');
    expect(cookiesUserName).toBeTruthy();
    console.log(cookiesUserName);
  }

  async verifyExpires() {
    const cookies = await this.page.context().cookies();
    const cookiesExpires = cookies.find((c) => c.name === 'expires');
    expect(cookiesExpires).toBeTruthy();
  }

  async verifyToken() {
    const cookies = await this.page.context().cookies();
    const cookiesToken = cookies.find((c) => c.name === 'token');
    expect(cookiesToken).toBeTruthy();
  }

  async getUserID() {
    const cookies = await this.page.context().cookies();
    const cookiesUserID = cookies.find((c) => c.name === 'userID');
    return cookiesUserID ? cookiesUserID.value : null;
  }

  async getToken() {
    const cookies = await this.page.context().cookies();
    const cookiesToken = cookies.find((c) => c.name === 'token');
    return cookiesToken ? cookiesToken.value : null;
  }

  async addUserAuthInfo(userID, token) {
    const responseAPI = await this.page.request.get(
      `https://demoqa.com/Account/v1/User/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAPI;
  }
}
