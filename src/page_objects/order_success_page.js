class OrderSuccessPage {
  constructor(page) {
    this.page = page;
  }
  async getOrdferId() {
    const text = this.page.locator('.order-label').textContent();
    console.log(text);
  }
}

module.exports = OrderSuccessPage;