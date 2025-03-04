import { test, expect } from '@playwright/test';
import { existingUser } from '../src/userData/existingUser';
import { ArticleBuilder } from '../src/helpers/builder/article.Builder';
import { MainPage,LoginPage,YourFeedPage,AddArticlePage,ArticlePage} from '../src/pages/index';
import * as allure from "allure-js-commons";
const URL_UI = 'https://realworld.qa.guru/';
test.setTimeout(40000);

test.describe('User actions with articles', () => {


   test.beforeEach('LoginUser', async ({ page }) => {

      //await allure.displayName("Test Authentication");
      await allure.owner("Irina Plashko");
      await allure.tags("Web interface", "Article");
      await allure.severity("critical");

      await allure.epic("Web interface");
      await allure.feature("Essential features");
      await allure.story("Actions with articlels");

      const mainPage = new MainPage(page);
      const loginPage = new LoginPage(page);
      await mainPage.open(URL_UI);
      await mainPage.gotoLogin();

      await loginPage.loginUser(existingUser.email, existingUser.password);///логирование существующего пользователя в системе

   })

   test('User can add new article', async ({ page }) => {


      const articleData = new ArticleBuilder().addArticle().addDescribeArticle().addArticleTitle().addTag().generate();
      

      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);


      await yourFeedPage.gotoNewArticle();//после регистрации переходим на страницу создания новой статьи

      await addArticlePage.publishNewArticle(
         articleData.ArticleTitle,
         articleData.DescribeArticle,
         articleData.Article,
         articleData.Tag);///создаем новую статью с тестовыми данными и публикуем

      await test.step("New article is saved", async () => {
      await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);//статья сохранилась-открылась новая старница + заголовок статьи совпадает
      });

   });


   test('User can add new comment in article', async ({ page }) => {

      const articleData = new ArticleBuilder().addArticle().addDescribeArticle().addArticleTitle().addTag().addComment().generate();
      
      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);

      //после регистрации переходим на станицу создания новой статьи
      await yourFeedPage.gotoNewArticle();
      ///создаем новую статью и публикуем
      await addArticlePage.publishNewArticle(articleData.ArticleTitle, articleData.DescribeArticle, articleData.Article, articleData.Tag);

      //статья сохранилась-открылась новая старница + заголовок статьи совпадает
     // await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);
      //перейти в  изменение статьи

      
      await articlePage.postNewComment(articleData.Comment);

      await test.step("User can add comment in article", async () => {
         await expect(articlePage.commentField).toContainText(articleData.Comment);
      });
      
   });


});





