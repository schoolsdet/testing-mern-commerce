// const { expect } = require('chai');
// const browsers = require('playwright');
// const username = 'Jerome20@hotmail.com';
// const password = 'Password1';
//
// const sleep = async (ms) => { return new Promise((resolve) => { return setTimeout(resolve, ms); }); };
//
// describe('Login test', () => {
//   let browser;
//   let context;
//   let page;
//   beforeEach(async() => {
//     const browserType = browsers['webkit'];
//     browser = await browserType.launch({
//       headless: false
//     });
//     console.log(browser.version());
//     context = await browser.newContext({
//       viewport:{
//         width: 1200,
//         height: 800
//       }
//     });
//     await context.setDefaultTimeout(5000);
//   });
//
//   afterEach(async() => {
//     await sleep(2000);
//     await page.close();
//     await browser.close();
//   });
//
//   it('should login to user dashboard', async() => {
//     page = await context.newPage();
//     await page.goto('https://mern-ecommerce.sdet.school/');
//     await page.getByText('Welcome!').click();
//     await page.getByText('Login').click();
//     await page.locator('(//*[@name="email"])[1]').fill(username);
//     await page.locator('(//*[@name="password"])[1]').fill(password);
//     await page.locator('(//*[@type="submit"])[1]').click();
//
//     const element = await page.locator('//*[@class="role member "]');
//     expect(await element.textContent()).to.equal('Member');
//   });
//
//   it('should show error notification', async() => {
//     page = await context.newPage();
//     await page.goto('https://mern-ecommerce.sdet.school/');
//     await page.getByText('Welcome!').click();
//     await page.getByText('Login').click();
//     await page.locator('(//*[@name="email"])[1]').fill(username);
//     await page.locator('(//*[@name="password"])[1]').fill(password+'1');
//     await page.locator('(//*[@type="submit"])[1]').click();
//
//     await page.locator('.notification-error').waitFor();
//   });
// });