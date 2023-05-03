const DrawerPage = require('./drawer_page');

class DasboardPage {
  constructor(page) {
    this.page = page;
  }
  async isOpen() {
    const element = await this.page.locator('//*[@class="role member "]');
    return element.textContent();
  }
  async openCart() {
    await this.page.locator('.bag-icon').click();
    return new DrawerPage(this.page);
  }

}
module.exports = DasboardPage;