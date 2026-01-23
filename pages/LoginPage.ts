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
  readonly pageHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('//input[@placeholder="Username"]')
    this.passwordInput = page.locator('//input[@placeholder="Password"]')
    this.loginButton = page.locator('//button[@type="submit"]')
    this.pageHeading = page.locator('//h6')
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

  /**
   * Get the current page heading text
   * @returns The page heading text
   */
  async getPageHeading(): Promise<string> {
    return (await this.pageHeading.textContent()) ?? ''
  }

  /**
   * Check if currently on the expected page after Login
   * @returns True if on the expected page, false otherwise
   */
  async isOnPage(pageName: string): Promise<boolean> {
    const heading = await this.getPageHeading()
    return heading.includes(pageName)
  }
}
