import { expect, use } from 'chai';
import browsers from 'playwright';
import { getUserOrders } from '../src/client/orders.js';
import { login } from '../src/client/auth.js';
import User from '../src/users/user.js';

import WelcomePage from '../src/page_objects/welcome_page.js';

const sleep = async (ms) => { return new Promise((resolve) => { return setTimeout(resolve, ms); }); };

describe.only('Create user, and adding products to the cart and create order', () => {
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
    await sleep(3000);
    await page.close();
    await browser.close();
  });
  it('should create an order', async () => {
    // Creating a user
    const user = await User.User.createUser();
    console.log('username', user.email);
    // Adding address to user
    await user.addAddress();

    const welcome = new WelcomePage(page);
    // open web application
    await welcome.open();
    // searchig for Nike and choosing third one
    const productPage = await welcome.search('nike', 2);
    // on the product page adding it to the cart
    let drawer = await productPage.addProductToCart();
    // proceed to checkout
    const loginPage = await drawer.proceedToCheckout();
    // loging to the app - using new username and password (just generated)
    const dashboard = await loginPage.login({
      username: user.email,
      password: user.password
    });
    // opening cart
    drawer = await dashboard.openCart();
    //placing order
    const orderSuccess = await drawer.placeOrder();
    // saving order id
    const orderId = await orderSuccess.getOrderId();
    console.log('order Id created on the page', orderId);
    // making API call to fetch user orders
    const getOrderOpts = {
      token: user.token
    };
    const orders = (await getUserOrders(getOrderOpts)).body;
    // Searching for order
    const orderFound = orders.orders.find((order) => { return order._id===orderId; });
    expect(orderFound).to.not.be.undefined;
  });
});