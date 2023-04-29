const DashboardPage = require('./dashboard_page');

class LoginPage {
  constructor(page) {
    this.page = page;
  }
  /**
   * login - login to application
   * 
   * @param {object} opt - params passed in
   * @param {string} opt.username - user name
   * @param {string} opts.password - password
   */
  async login(opt) {
    await this.page.locator('(//*[@name="email"])[1]').fill(opt.username);
    await this.page.locator('(//*[@name="password"])[1]').fill(opt.password);
    await this.page.locator('(//*[@type="submit"])[1]').click();
    return new DashboardPage(this.page);
  }
  async isError() {
    await this.page.locator('.notification-error').waitFor();
    return true;
  }
}

module.exports = LoginPage;