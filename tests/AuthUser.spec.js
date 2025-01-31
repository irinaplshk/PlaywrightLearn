import { test, expect } from '@playwright/test';
import { existingUser } from '../src/userData/existingUser';
import { UserBuilder } from '../src/helpers/builder/index'; 
import { MainPage,RegisterPage,YourFeedPage,SettingsPage,LoginPage} from '../src/pages/index';

const URL_UI = 'https://realworld.qa.guru/';

test('Registration the new user', async ({ page }) => {

////используем генерацию данных
const user = new UserBuilder().addEmail().addPassword(10).addUser().generate();

//console.log(user);// новый пользователь 
const mainPage = new MainPage (page);
const registerPage = new RegisterPage(page);
const yourFeedPage = new YourFeedPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoRegister();/// переход на страничку регистрации

await registerPage.registerNewUser(user.username,user.email,user.password);// регистрация пользователя
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(user.username);/// проверка , что пользователь существует

});

test('Login existing user', async ({ page }) => {


const mainPage     = new MainPage (page);
const loginPage    =new LoginPage (page);
const yourFeedPage = new YourFeedPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(existingUser.email,existingUser.password);// логирование пользователя в систему
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(existingUser.username);// успешное логирование


});

test('User can change password', async ({ page }) => {

//создаем данные нового пользователя
const user = new UserBuilder().addEmail().addPassword(10).addUser().generate()

//создаем новый пароль
const userNewPassword = new UserBuilder().addPassword(10).generate();

const mainPage = new MainPage (page);
const registerPage = new RegisterPage(page);
const yourFeedPage = new YourFeedPage(page);
const settingsPage = new SettingsPage(page);
const loginPage    = new LoginPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoRegister();//создаем нового пользователя

await registerPage.registerNewUser(user.username,user.email,user.password);
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(user.username);//проверка , что пользователь  создан


await yourFeedPage.gotoSettings(user.username);//переходим в настройки пользователя


await settingsPage.changeSettings(userNewPassword.password);//меняем пароль
expect (settingsPage.updateSettingsButton).not.toBeVisible();// кнопка  изменения становится недоступной

await yourFeedPage.gotoLogout(user.username);/// выход 


await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(user.email,userNewPassword.password);// логирование пользователя с новым паролем
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(user.username);
});


