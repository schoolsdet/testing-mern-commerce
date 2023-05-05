import OrderSuccessPage from './order_success_page.js';
import LoginPage from './login_page.js';

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
export default DrawerPage;