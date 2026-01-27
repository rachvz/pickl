import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
// TODO enhance. which base page will it extends to. sidepanel?
export class ClaimPage {
  readonly page: Page
  readonly claimViewPage: Locator
  readonly configurationButton: Locator
  readonly configMenuItems: Locator
  readonly eventsMenuItem: Locator
  readonly pageHeading: Locator
  readonly expenseTypeMenuItem: Locator
  readonly addEventButton: Locator
  readonly eventNameInput: Locator
  readonly descriptionInput: Locator
  readonly switchActive: Locator
  readonly saveEventButton: Locator
  readonly eventRecordTable: Locator

  constructor(page: Page) {
    this.page = page
    this.claimViewPage = page.locator('//h6[text()="Claim"]')
    this.configurationButton = page.getByRole('navigation', { name: 'Configuration' })
    this.configMenuItems = page.getByRole('menuitem')
    this.eventsMenuItem = page.getByRole('menuitem', { name: 'Events' })
    this.pageHeading = page.locator('//h6')
    this.expenseTypeMenuItem = page.getByRole('menuitem', { name: 'Expense Types' })
    this.addEventButton = page.locator('//button[text()=" Add "]')
    this.eventNameInput = page.getByLabel('Event Name')
    this.descriptionInput = page.getByLabel('Description')
    this.switchActive = page.locator('//p[text()="Active"]/..//span')
    this.saveEventButton = page.getByRole('button', { name: ' Save ' })
  }

  /**
   * Check if currently on Dashboard page
   * @returns True if on login page, false otherwise
   */
  async isOnClaimPage(): Promise<boolean> {
    return this.claimViewPage.isVisible()
  }

  /**
   * Click Configuration menu button
   */
  async clickConfiguration() {
    await this.configurationButton.click()
  }

  /**
   * Click Events menu from Configuration Nav menu
   */
  async clickEventsMenuItem() {
    await this.eventsMenuItem.click()
  }

  /**
   * Click Expense Type menu from Configuration Nav menu
   */
  async clickExpenseTypeMenuItem() {
    await this.expenseTypeMenuItem.click()
  }

  /**
   * Click Event button to add new Event record
   */
  async clickAddEventButton() {
    await this.addEventButton.click()
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

  /**
   * Enter name into the Event Name field
   * @param eventName - The name to enter
   */
  async enterEventName(eventName: string) {
    await this.eventNameInput.fill(eventName)
  }

  /**
   * Enter details into the Description field
   * @param descriptionInput - The name to enter
   */
  async enterDescription(description: string) {
    await this.descriptionInput.fill(description)
  }

  /**
   * Set Active switch button to true.
   * When creating new event record, the default state of Active switch is True.
   * @param shouldBeActive - the expected state of the Active switch button
   */
  async setSwitchEventActive() {
    await this.switchActive.click()
  }

  /**
   * Click Save button to create the new Event record
   */
  async clickSaveEventRecordButton() {
    await this.saveEventButton.click()
  }

  /**
   * Retrieve record element
   */
  retrieveRecordInTable(eventName: string) {
    return this.page.locator(`//div[@class="oxd-table-body"]//div[contains(text(),"${eventName}")]`)
  }
}
