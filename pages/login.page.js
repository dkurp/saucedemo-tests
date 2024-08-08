export class Login {

  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
      this.page = page;
      this.username = page.getByTestId('username')
      this.password = page.getByTestId('password')
      this.loginBtn = page.getByTestId('login-button')
      this.logo = page.locator('.login_logo')

      this.errorContainer = page.locator('.error-message-container.error')
      this.error = page.getByTestId('error')
      this.closeError = page.getByTestId('error-button')
    }

    async login(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
  };