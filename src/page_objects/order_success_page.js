class OrderSuccessPage {
  constructor(page) {
    this.page = page;
  }
  async getOrderId() {
    const text = await this.page.locator('.order-label').textContent();
    return text.substring(1);
  }
}

export default OrderSuccessPage;