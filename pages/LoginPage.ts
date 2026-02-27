import { Locator, Page } from '@playwright/test'
/**
 * Page Object Model for the Login page
 * URL: https://opensource-demo.orangehrmlive.com/
 */
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByRole('textbox', { name: 'Username' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/web/index.php/auth/login')
  }

  /**
   * Enter username into the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
  }

  /**
   * Enter password into the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click()
  }

  /**
   * Perform complete login action
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLogin()
  }
}
