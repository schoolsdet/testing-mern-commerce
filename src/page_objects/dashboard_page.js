class DasboardPage {
  constructor(page) {
    this.page = page;
  }
  async isOpen() {
    const element = await this.page.locator('//*[@class="role member "]');
    return element.textContent();
  }

}
module.exports = DasboardPage;