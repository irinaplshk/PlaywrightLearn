import { test } from '@playwright/test';
export class LoginPage {

  constructor(page) {
    this.page = page;

    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });


  }

  async loginUser(email, password) {
    await test.step("Fill user email", async () => {
      await this.emailField.click();
      await this.emailField.fill(email);
    });
    await test.step("Fill user password", async () => {
      await this.passwordField.click();
      await this.passwordField.fill(password);
    });
    await test.step("User signed in", async () => {
      await this.loginButton.click();
    });
  }

}