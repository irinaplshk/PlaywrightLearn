import { test, expect } from '@playwright/test';
import { fakerRU as faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourFeedPage } from '../src/pages/yourFeedPage';
import { ExistingUser } from '../src/userData/existingUser';
import { SettingsPage } from '../src/pages/settingsPage';
import { LoginPage } from '../src/pages/loginPage';

const URL_UI = 'https://realworld.qa.guru/';

test('Registration the new user', async ({ page }) => {
test.setTimeout(60000);
const user = {
   username: faker.person.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password()
}

console.log(`${user.username}\n${user.email}\n${user.password}`);// новый пользователь 
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
test.setTimeout(60000);

console.log(ExistingUser);/// существующий пользователь

const mainPage     = new MainPage (page);
const loginPage    =new LoginPage (page);
const yourFeedPage = new YourFeedPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(ExistingUser.email,ExistingUser.password);// логирование пользователя в систему
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(ExistingUser.username);// успешное логирование


});

test('User can change password', async ({ page }) => {
test.setTimeout(120000);
const user = {
   username: faker.person.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password()
}

console.log(`${user.username}\n${user.email}\n${user.password}`);

const userNewData ={
   username: user.username,
   email: user.email,
   password: faker.internet.password()

}
console.log(userNewData);/// новые данные пользователя
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


await settingsPage.changeSettings(userNewData.password);//меняем пароль
expect (settingsPage.updateSettingsButton).not.toBeVisible();// кнопка  изменения становится недоступной

await yourFeedPage.gotoLogout(userNewData.username);/// выход 


await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(userNewData.email,userNewData.password);// логирование пользователя с новым паролем
await expect(yourFeedPage.profileNameFeed).toBeVisible();
await expect(yourFeedPage.profileNameFeed).toContainText(userNewData.username);
});


