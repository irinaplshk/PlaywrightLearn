import { test, expect } from '@playwright/test';
import { existingUser } from '../src/userData/existingUser';
import { ArticleBuilder } from '../src/helpers/builder/article.Builder';
import { MainPage,LoginPage,YourFeedPage,AddArticlePage,ArticlePage} from '../src/pages/index';

const URL_UI = 'https://realworld.qa.guru/';


test.describe('User actions with articles', () => {


   test.beforeEach('LoginUser', async ({ page }) => {
      
      const mainPage = new MainPage(page);
      const loginPage = new LoginPage(page);
      await mainPage.open(URL_UI);
      await mainPage.gotoLogin();

      await loginPage.loginUser(existingUser.email, existingUser.password);///логирование существующего пользователя в системе
      //console.log(`${existingUser.username}\n${existingUser.email}\n${existingUser.password}`);



   })

   test('User can add new article', async ({ page }) => {


      const articleData = new ArticleBuilder().addArticle().addDescribeArticle().addArticleTitle().addTag().generate();
      //console.log(articleData);

      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);


      await yourFeedPage.gotoNewArticle();//после регистрации переходим на страницу создания новой статьи

      await addArticlePage.publishNewArticle(
         articleData.ArticleTitle,
         articleData.DescribeArticle,
         articleData.Article,
         articleData.Tag);///создаем новую статью с тестовыми данными и публикуем


      await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);//статья сохранилась-открылась новая старница + заголовок статьи совпадает

      //await articlePage.deleteArticle();//удалить статью чтобы потом заново добавить  тк есть проверка на уникальность


   });


   test('User can add new comment in article', async ({ page }) => {

      const articleData = new ArticleBuilder().addArticle().addDescribeArticle().addArticleTitle().addTag().addComment().generate();
      //console.log(articleData);


      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page);
      const articlePage = new ArticlePage(page);

      //после регистрации переходим на станицу создания новой статьи
      await yourFeedPage.gotoNewArticle();
      ///создаем новую статью и публикуем
      await addArticlePage.publishNewArticle(articleData.ArticleTitle, articleData.DescribeArticle, articleData.Article, articleData.Tag);

      //статья сохранилась-открылась новая старница + заголовок статьи совпадает
      await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);
      //перейти в  изменение статьи

      
      await articlePage.postNewComment(articleData.Comment);
      await expect(articlePage.commentField).toContainText(articleData.Comment);

      //await articlePage.deleteArticle();
   });




});





