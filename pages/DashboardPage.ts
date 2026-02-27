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
    this.dashboardViewPage = page.getByRole('heading', { name: 'Dashboard', exact: true })
  }
}
