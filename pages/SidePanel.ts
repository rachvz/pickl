import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
export class SidePanel {
  readonly page: Page
  readonly pageHeading: Locator
  readonly toastNotifTitle: Locator
  readonly toastNotifMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeading = page.locator('//h6')
    this.toastNotifTitle = page.locator('//p[contains(@class, "oxd-text--toast-title")]')
    this.toastNotifMessage = page.locator('//p[contains(@class, "oxd-text--toast-message")]')
  }

  /**
   * Click the side pane menu to view the module
   */
  async clickModule(moduleName: string) {
    const sideMenuButton = this.page.locator(`//li//span[text()="${moduleName}"]`)
    await sideMenuButton.click()
  }

  /**
   * Get the current page heading text
   * @returns The page heading text
   */
  async getPageHeading(): Promise<string> {
    return (await this.pageHeading.textContent()) ?? ''
  }

  /**
   * Check if currently on the expected page
   * @returns True if on login page, false otherwise
   */
  async isOnPage(pageName: string): Promise<boolean> {
    const heading = await this.getPageHeading()
    return heading.includes(pageName)
  }
}
