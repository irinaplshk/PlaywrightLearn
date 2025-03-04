import { test } from '@playwright/test';
export class AddArticlePage {

    constructor(page){ 
      this.page = page;
      this.articleTitleField= page.getByPlaceholder('Article Title');
      this.describeArticleField = page.getByPlaceholder('What\'s this article about?');
      this.articleField = page.getByPlaceholder('Write your article (in');
      this.enterTagsField = page.getByPlaceholder('Enter tags');
      this.publishArticleButton =  page.getByRole('button', { name: 'Publish Article' })
     

    }

     async publishNewArticle(articleTitle,describeArticle,article,enterTags){

      await test.step("Fill title", async () => {
        await this.articleTitleField.click();
        await this.articleTitleField.fill(articleTitle);
      });
      await test.step("Fill discribe ", async () => {
        await this.describeArticleField.click();
        await this.describeArticleField.fill(describeArticle);
      });
      await test.step("Fill article ", async () => {
        await this.articleField.click();
        await this.articleField.fill(article);
      });
      await test.step("Fill tag ", async () => {
        await this.enterTagsField.click();
        await this.enterTagsField.fill(enterTags);
      });
      await test.step("Save article ", async () => {
        await this.publishArticleButton.click();
      });  
     } 
    
    }
   