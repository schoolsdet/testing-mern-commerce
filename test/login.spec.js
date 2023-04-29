const { expect } = require('chai');
const browsers = require('playwright');
const username = 'Jerome20@hotmail.com';
const password = 'Password1';
const WelcomePage = require('../src/page_objects/welcome_page');

const sleep = async (ms) => { return new Promise((resolve) => { return setTimeout(resolve, ms); }); };

describe.only('Login functionality', () => {
  let browser;
  let context;
  let page;
  beforeEach(async() => {
    const browserType = browsers['webkit'];
    browser = await browserType.launch({
      headless: false
    });
    console.log(browser.version());
    context = await browser.newContext({
      viewport:{
        width: 1200,
        height: 800
      }
    });
    await context.setDefaultTimeout(5000);
    page = await context.newPage();
  });
  
  afterEach(async() => {
    await sleep(6000);
    await page.close();
    await browser.close();
  });
  it('should login and open dashboard if credentials are correct', async () => {
    const welcome = new WelcomePage(page);
    welcome.open();
    const loginPage = await welcome.openLoginPage();
    const credentials = { username, password };
    const dashboardPage = await loginPage.login(credentials);
    expect(await dashboardPage.isOpen()).to.equal('Member');
  });
  it('should show error notification if credentials are incorrect', async () => {
    const welcome = new WelcomePage(page);
    welcome.open();
    const loginPage = await welcome.openLoginPage();
    const credentials = { username, password: 'wrongPassword' };
    await loginPage.login(credentials);
    expect(await loginPage.isError()).to.be.true;
  });
});