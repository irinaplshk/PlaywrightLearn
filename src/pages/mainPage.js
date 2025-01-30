 export class MainPage {

constructor(page){ 
  this.page = page;
  this.sighupButton = page.getByRole('link', { name: 'Sign up' });
  this.loginButton  = page.getByRole('link', { name: 'Login' });

}
async gotoLogin(){
  await this.loginButton.click();

}
async gotoRegister(){
  await this.sighupButton.click();

}
async open (url){
      await this.page.goto(url);
}
}