import { test } from '@playwright/test';
export class SettingsPage {

  constructor(page) {
    this.page = page;
    this.passwordField = page.getByPlaceholder('Password');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });

  }

  async changeSettings(newPassword) {
    await test.step("Fill  new user password", async () => {
      await this.passwordField.click();
      await this.passwordField.fill(newPassword);
    });
    await test.step("Change password", async () => {
      await this.updateSettingsButton.click();
    });
  }


}