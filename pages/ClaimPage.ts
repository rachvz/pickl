import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
// TODO enhance. which base page will it extends to. sidepanel?
export class ClaimPage {
  readonly page: Page
  readonly claimViewPage: Locator

  constructor(page: Page) {
    this.page = page
    this.claimViewPage = page.locator('//h6[text()="Claim"]')
  }

  /**
   * Check if currently on Dashboard page
   * @returns True if on login page, false otherwise
   */
  async isOnClaimPage(): Promise<boolean> {
    return this.claimViewPage.isVisible()
  }
}
