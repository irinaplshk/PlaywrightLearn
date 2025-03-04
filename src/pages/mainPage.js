import { test } from '@playwright/test';
export class MainPage {

  constructor(page) {
    this.page = page;
    this.sighupButton = page.getByRole('link', { name: 'Sign up' });
    this.loginButton = page.getByRole('link', { name: 'Login' });

  }
  async gotoLogin() {
    await test.step("Go to login page", async () => {
      await this.loginButton.click();
    });
  }
  async gotoRegister() {
    await test.step("Go to register page", async () => {
      await this.sighupButton.click();
    });
  }

  async open(url) {
    await test.step("Open site", async () => {
      await this.page.goto(url);

    });
  }
}