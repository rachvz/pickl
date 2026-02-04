import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
export class DashboardPage {
  readonly page: Page
  readonly dashboardViewPage: Locator

  constructor(page: Page) {
    this.page = page
    this.dashboardViewPage = page.locator('//h6[text()="Dashboard"]')
  }

  /**
   * Click the side pane menu to view the module
   */
  // TODO rach : other way?
  async clickModule(moduleName: string) {
    const newMenuButton = this.page.locator(`//li//span[text()="${moduleName}"]`)
    await newMenuButton.click()
  }

  /**
   * Check if currently on Dashboard page
   * @returns True if on login page, false otherwise
   */
  async isOnDashboardPage(): Promise<boolean> {
    return this.dashboardViewPage.isVisible()
  }
}
