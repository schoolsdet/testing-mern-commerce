const OrderSuccessPage = require('./order_success_page');
const LoginPage = require('./login_page.js');

class DrawerPage {
  constructor(page) {
    this.page = page;
  }

  async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
    return new LoginPage(this.page);
  }

  async placeOrder() {
    await this.page.getByText('Place Order').click();
    return new OrderSuccessPage(this.page);
  }

}
module.exports = DrawerPage;