import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
export class SidePanel {
  readonly page: Page
  readonly pageHeading: Locator
  readonly toastNotifMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeading = page.locator('//h6')
    this.toastNotifMessage = page.locator(
      '//div[starts-with(@class, "oxd-toast-container") and starts-with(@id, "oxd-toaster")]',
    )
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

  /**
   * Check if currently on the expected page
   * @returns True if on login page, false otherwise
   */
  async hasMessageInToastNotif(message: string): Promise<boolean> {
    await this.toastNotifMessage.isVisible({ timeout: 15000 })
    const notifMessage = (await this.toastNotifMessage.textContent()) ?? ''
    return notifMessage.includes(message)
  }
}
