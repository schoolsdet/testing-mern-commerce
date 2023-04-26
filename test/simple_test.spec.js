const { expect } = require('chai');
const browsers = require('playwright');
const username = 'Jerome20@hotmail.com';
const password = 'Password12';

const sleep = async (ms) => { return new Promise((resolve) => { return setTimeout(resolve, ms); }); };

describe('Very simple test', () => {
  it('should make a simple test', async() => {
    const browserType = browsers['webkit'];

    const browser = await browserType.launch({
      headless: false
    });
    console.log(browser.version());
    const context = await browser.newContext({
      viewport:{
        width: 1200,
        height: 800
      }
    });
    const page = await context.newPage();
    await page.goto('https://mern-ecommerce.sdet.school/');
    await page.getByText('Welcome!').click();
    await page.getByText('Login').click();
    await page.locator('(//*[@name="email"])[1]').fill(username);
    await page.locator('(//*[@name="password"])[1]').fill(password);
    await page.locator('(//*[@type="submit"])[1]').click();

    const element = await page.locator('//*[@class="role member "]');
    expect(await element.textContent()).to.equal('Member');

    await sleep(5000);
    page.close();
    browser.close();

  });
});