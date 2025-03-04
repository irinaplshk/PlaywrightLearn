import { test } from '@playwright/test';
export class YourFeedPage {

    constructor(page){ 
      this.page = page;
      this.profileNameFeed = page.getByRole('navigation');
      this.newArticleLink  = page.getByRole('link', { name: 'New Article' });
      this.settingsLink    = page.getByRole('link', { name: 'Settings' });
      this.logoutLink      = page.getByRole('link', { name: 'Logout' });
      this.profileLink     = page.getByRole('link', { name: 'Profile' })
    }
   
    async gotoNewArticle (){
      await test.step("Go to create new article", async () => {
      await this.newArticleLink.click();
    });
    }
    async gotoSettings (user){
      await test.step("Go to user settings", async () => {
      await this.profileNameFeed.getByText(user).click();
      await this.settingsLink.click();
    });
    }
    async gotoProfile (user){
      await test.step("Go to user profile", async () => {
      await this.profileNameFeed.getByText(user).click();
      await this.profileLink.click();
    });
    }
    async gotoLogout (user){
      await test.step("Go to log out", async () => {
      await this.profileNameFeed.getByText(user).click();
      await this.logoutLink.click();
    })
    }
    
    }