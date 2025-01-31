import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/mainPage';
import { LoginPage } from '../src/pages/loginPage';
import { YourFeedPage } from '../src/pages/yourFeedPage';
import { AddArticlePage} from '../src/pages/addArticlePage';
import { ArticlePage } from '../src/pages/ArticlePage';  
import { existingUser } from '../src/userData/existingUser';
import { fakerRU as faker } from '@faker-js/faker';

const URL_UI = 'https://realworld.qa.guru/';




test.describe('User actions with articles', () => {
   

   test.beforeEach('LoginUser', async ({page}) => {
      
      
      const mainPage = new MainPage (page);
      const loginPage = new LoginPage(page);
      await mainPage.open(URL_UI);
      await mainPage.gotoLogin();

      await loginPage.loginUser(existingUser.email,existingUser.password);///логирование существующего пользователя в системе
      
      
   })

   test('User can add new article', async ({ page }) => {
      
      
      const articleData = {
          newArticleTitle : faker.science.chemicalElement().name,
          newDescribeArticle: "test",
          newArticle: "test",
          newTag : "test"
      
      };

      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);
      
      
      await yourFeedPage.gotoNewArticle();//после регистрации переходим на страницу создания новой статьи
      
      await addArticlePage.publishNewArticle(
         articleData.newArticleTitle,
         articleData.newDescribeArticle,
         articleData.newArticle,articleData.newTag);///создаем новую статью с тестовыми данными и публикуем
      
      
      await expect(articlePage.articleTitleField).toContainText(articleData.newArticleTitle);//статья сохранилась-открылась новая старница + заголовок статьи совпадает
      
   
      });


      test('User can add new comment in article', async ({ page }) => {
      
      
      const articleData = {
         newArticleTitle : faker.science.chemicalElement().name,
         newDescribeArticle: "test",
         newArticle: "test",
         newTag : "test"
     
     };
      
      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);
      
      //после регистрации переходим на станицу создания новой статьи
      await yourFeedPage.gotoNewArticle();
      ///создаем новую статью и публикуем
      await addArticlePage.publishNewArticle(articleData.newArticleTitle,articleData.newDescribeArticle,articleData.newArticle,articleData.newTag);
      
      //статья сохранилась-открылась новая старница + заголовок статьи совпадает
      await expect(articlePage.articleTitleField).toContainText(articleData.newArticleTitle);
      //перейти в  изменение статьи
      
      const textComment = 'test comment'
      await articlePage.postNewComment(textComment);
      await expect(articlePage.commentField).toContainText(textComment);
      
      
      });
      
      
      

});





