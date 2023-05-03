const DrawerPage = require('./drawer_page');

class ProductPage {
  constructor(page) {
    this.page = page;
  }
  async addProductToCart() {
    await this.page.getByText('Add To Bag').click();
    return new DrawerPage(this.page);
  }
}

module.exports = ProductPage;