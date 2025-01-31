export class SettingsPage {

    constructor(page){ 
      this.page = page;
      this.passwordField = page.getByPlaceholder('Password');
      this.updateSettingsButton  = page.getByRole('button', { name: 'Update Settings' });
     
    }
   
    async changeSettings(newPassword){

      await this.passwordField.click();
      await this.passwordField.fill(newPassword);
      await this.updateSettingsButton.click();

    }

    
    }