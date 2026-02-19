import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
// TODO rach : enhance. which base page will it extends to. sidepanel?
export class ClaimPage {
  readonly page: Page
  readonly claimViewPage: Locator
  readonly eventRecordPage: Locator
  readonly expenseRecordPage: Locator
  readonly addExpensePage: Locator
  readonly configurationButton: Locator
  readonly configMenuItems: Locator
  readonly eventsMenuItem: Locator
  readonly expenseMenuItem: Locator
  readonly addEventPage: Locator
  readonly addButton: Locator
  readonly eventNameInput: Locator
  readonly expenseNameInput: Locator
  readonly descriptionInput: Locator
  readonly switchActive: Locator
  readonly saveConfigButton: Locator
  readonly pageLoadingIcon: Locator
  readonly configRecordData: Locator
  readonly inputError: Locator
  readonly inlineError: Locator

  constructor(page: Page) {
    this.page = page
    this.claimViewPage = page.getByRole('heading', { name: 'Claim', exact: true })
    this.eventRecordPage = page.getByRole('heading', { name: 'Events', exact: true })
    this.expenseRecordPage = page.getByRole('heading', { name: 'Expense Types', exact: true })
    this.addEventPage = page.getByRole('heading', { name: 'Add Event', exact: true })
    this.addExpensePage = page.getByRole('heading', { name: 'Add Expense Type', exact: true })
    this.configurationButton = page.locator(
      '//div[@class="oxd-topbar-body"]//span[text()="Configuration "]',
    )
    this.configMenuItems = page.getByRole('menuitem')
    this.eventsMenuItem = page.getByText('Events')
    this.expenseMenuItem = page.getByText('Expense Types')
    this.addButton = page.locator('//button[text()=" Add "]')
    this.eventNameInput = page.locator('//label[text()="Event Name"]/../..//input')
    this.expenseNameInput = page.locator('//label[text()="Name"]/../..//input')
    this.descriptionInput = page.locator('//label[text()="Description"]/../..//textarea')
    this.switchActive = page.locator('//p[text()="Active"]/..//span')
    this.saveConfigButton = page.getByRole('button', { name: ' Save ' })
    this.pageLoadingIcon = page.locator('//div[@class=oxd-loading-spinner]')
    this.configRecordData = page.locator('//div[@class="oxd-table-body"]')
    this.inputError = page.locator('//input[contains(@class, "oxd-input--error")]')
    this.inlineError = page.locator('//span[contains(@class, "oxd-input-field-error-message")]')
  }

  /**
   * Check if currently on Dashboard page
   * @returns True if on login page, false otherwise
   */
  async isOnClaimPage(): Promise<boolean> {
    return this.claimViewPage.isVisible()
  }

  /**
   * Check if currently on Expense records page
   * @returns True if on the expected page, false otherwise
   */
  async isOnExpenseRecordsPage(): Promise<boolean> {
    return this.expenseRecordPage.isVisible()
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
   * Click Expense menu from Configuration Nav menu
   */
  async clickExpenseMenuItem() {
    await this.expenseMenuItem.click()
  }

  /**
   * Click Add button to add a new Event or an Expense record
   */
  async clickAddButton() {
    await this.addButton.click()
  }

  /**
   * Enter name into the Event Name field
   * @param eventName - The name to enter
   */
  async enterEventName(eventName: string) {
    await this.eventNameInput.fill(eventName)
  }

  /**
   * Enter name into the Expense Name field
   * @param expenseName - The name to enter
   */
  async enterExpenseName(eventName: string) {
    await this.expenseNameInput.fill(eventName)
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
  async clickSaveConfigRecordButton() {
    await this.saveConfigButton.click()
  }
}
