import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
export class SidePanel {
  readonly page: Page
  readonly toastNotifTitle: Locator
  readonly toastNotifMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.toastNotifTitle = page.locator('//p[contains(@class, "oxd-text--toast-title")]')
    this.toastNotifMessage = page.locator('//p[contains(@class, "oxd-text--toast-message")]')
  }

  /**
   * Click the side pane menu to view the module
   */
  async clickASidePanelModule(moduleName: string) {
    const sideMenuButton = this.page.getByRole('link', { name: moduleName })
    await sideMenuButton.click()
  }
}
