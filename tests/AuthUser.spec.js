import { test, expect } from '@playwright/test';
import { existingUser } from '../src/userData/existingUser';
import { UserBuilder } from '../src/helpers/builder/index';
import { MainPage, RegisterPage, YourFeedPage, SettingsPage, LoginPage } from '../src/pages/index';
import * as allure from "allure-js-commons";
test.setTimeout(40000);
const URL_UI = 'https://realworld.qa.guru/';

test.describe('Actions with user', () => {
    test.beforeEach('LoginUser', async ({ page }) => {
        await allure.displayName("Test Authentication");
              await allure.owner("Irina Plashko");
              await allure.tags("Web interface", "Authentication");
              await allure.severity("critical");
        
              await allure.epic("Web interface");
              await allure.feature("Essential features");
              await allure.story("Authentication");
    });

    test('Registration the new user', async ({ page }) => {

        ////используем генерацию данных
        const user = new UserBuilder().addEmail().addPassword(10).addUser().generate();

        //console.log(user);// новый пользователь 
        const mainPage = new MainPage(page);

        const registerPage = new RegisterPage(page);
        const yourFeedPage = new YourFeedPage(page);


        await mainPage.open(URL_UI);//open site

        await mainPage.gotoRegister();/// переход на страничку регистрации

        await registerPage.registerNewUser(user.username, user.email, user.password);// регистрация пользователя
        await test.step("The user has been successfully registered", async () => {
            await expect(yourFeedPage.profileNameFeed).toBeVisible();
            await expect(yourFeedPage.profileNameFeed).toContainText(user.username);/// проверка , что пользователь существует
        });
    });

    test('Login existing user', async ({ page }) => {


        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const yourFeedPage = new YourFeedPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoLogin();

        await loginPage.loginUser(existingUser.email, existingUser.password);// логирование пользователя в систему
        await test.step("The user has been successfully  signed in.", async () => {
            await expect(yourFeedPage.profileNameFeed).toBeVisible();
            await expect(yourFeedPage.profileNameFeed).toContainText(existingUser.username);// успешное логирование
        });

    });

    test('User can change password', async ({ page }) => {
        test.setTimeout(50000);
        //создаем данные нового пользователя
        const user = new UserBuilder().addEmail().addPassword(10).addUser().generate()

        //создаем новый пароль
        const userNewPassword = new UserBuilder().addPassword(10).generate();

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourFeedPage = new YourFeedPage(page);
        const settingsPage = new SettingsPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();//создаем нового пользователя

        await registerPage.registerNewUser(user.username, user.email, user.password);
        await test.step("The user has been successfully registered", async () => {
            await expect(yourFeedPage.profileNameFeed).toBeVisible();
            await expect(yourFeedPage.profileNameFeed).toContainText(user.username);//проверка , что пользователь  создан
        });

        await yourFeedPage.gotoSettings(user.username);//переходим в настройки пользователя


        await settingsPage.changeSettings(userNewPassword.password);//меняем пароль
        //await test.step("Password successfully updated, button hidden", async () => {
            expect(settingsPage.updateSettingsButton).not.toBeVisible();// кнопка  изменения становится недоступной
        //});

        await yourFeedPage.gotoLogout(user.username);/// выход 
        //await mainPage.open(URL_UI);
        await mainPage.gotoLogin();

        await loginPage.loginUser(user.email, userNewPassword.password);// логирование пользователя с новым паролем
        await test.step("The user has been successfully  signed in.", async () => {
            await expect(yourFeedPage.profileNameFeed).toBeVisible();
            await expect(yourFeedPage.profileNameFeed).toContainText(user.username);
        });
    });
});


