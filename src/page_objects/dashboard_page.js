import DrawerPage from './drawer_page.js';

class DasboardPage {
  constructor(page) {
    this.page = page;
  }
  async isOpen() {
    const element = await this.page.locator('//*[@class="role member "]');
    return element.textContent();
  }
  async openCart() {
    await this.page.locator('.bag-icon').nth(1).click();
    return new DrawerPage(this.page);
  }

}
export default DasboardPage;