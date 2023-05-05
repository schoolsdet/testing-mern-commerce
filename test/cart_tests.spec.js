import { expect } from 'chai';
import browsers from 'playwright';
import { getUserOrders } from '../src/client/orders.js';
import { login } from '../src/client/auth.js';

import WelcomePage from '../src/page_objects/welcome_page.js';

const username = 'Jerome20@hotmail.com';
const password = 'Password1';


const sleep = async (ms) => { return new Promise((resolve) => { return setTimeout(resolve, ms); }); };

describe.only('Cart functionality', () => {
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
  it.only('should place product to the cart', async () => {
    const welcome = new WelcomePage(page);
    await welcome.open();
    const productPage = await welcome.search('nike', 2);
    let drawer = await productPage.addProductToCart();
    const loginPage = await drawer.proceedToCheckout();
    const dashboard = await loginPage.login({
      username,
      password
    });
    drawer = await dashboard.openCart();
    const orderSuccess = await drawer.placeOrder();
    const orderId = await orderSuccess.getOrderId();
    console.log('order Id created on the page', orderId);

    const loginResponse = await login({
      email: username,
      password
    });
    const getOrderOpts = {
      token: loginResponse.body.token
    };

    const orders = (await getUserOrders(getOrderOpts)).body;
    const orderFound = orders.orders.find((order) => { return order._id===orderId; });
    expect(orderFound).to.not.be.undefined;

    
  });
  it.skip('should throw an error if product not exist', async () => {
    const welcome = new WelcomePage(page);
    await welcome.open();
    let error;
    try{
      await welcome.search('bike', 2);
    } catch(err) {
      error = err;
    }
    expect(error.message).to.include('Timeout');
  });
  it.skip('should throw an error if product out of bounds', async () => {
    const welcome = new WelcomePage(page);
    await welcome.open();
    let error;
    try{
      await welcome.search('nike', 5);
    } catch(err) {
      error=err;
    }
    expect(error.message).to.be.equal('search index out of bounds');
  });
});