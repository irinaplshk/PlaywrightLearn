import { test } from '@playwright/test';
export class RegisterPage {

  constructor(page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Your Name');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signupButton = page.getByRole('button', { name: 'Sign up' });


  }

  async registerNewUser(username, email, password) {
    await test.step("Fill user information - Name ", async () => {
      await this.usernameField.click();
      await this.usernameField.fill(username);
    });
    await test.step("Fill user information -Email", async () => {
      await this.emailField.click();
      await this.emailField.fill(email);
    });
    await test.step("Fill user information -Password", async () => {
      await this.passwordField.click();
      await this.passwordField.fill(password);
    });
    await test.step("Register user", async () => {
      await this.signupButton.click();
    });
  }

}