import DrawerPage from './drawer_page.js';

class ProductPage {
  constructor(page) {
    this.page = page;
  }
  async addProductToCart() {
    await this.page.getByText('Add To Bag').click();
    return new DrawerPage(this.page);
  }
}

export default ProductPage;