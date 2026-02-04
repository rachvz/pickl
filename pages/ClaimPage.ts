import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Side Panel
 * URL: https://opensource-demo.orangehrmlive.com/
 */
// TODO enhance. which base page will it extends to. sidepanel?
export class ClaimPage {
  readonly page: Page
  readonly claimViewPage: Locator
  readonly eventRecordPage: Locator
  readonly addExpensePage: Locator
  readonly configurationButton: Locator
  readonly configMenuItems: Locator
  readonly eventsMenuItem: Locator
  readonly expenseMenuItem: Locator
  readonly addEventPage: Locator
  readonly expenseTypeMenuItem: Locator
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
    this.claimViewPage = page.locator('//h6[text()="Claim"]')
    this.eventRecordPage = page.locator('//h6[text()="Events"]')
    this.addEventPage = page.locator('//h6[text()="Add Event"]')
    this.addExpensePage = page.locator('//h6[text()="Add Expense Type"]')
    this.configurationButton = page.locator(
      '//div[@class="oxd-topbar-body"]//span[text()="Configuration "]',
    )
    this.configMenuItems = page.getByRole('menuitem')
    this.eventsMenuItem = page.getByText('Events')
    this.expenseMenuItem = page.getByText('Expense Types')
    this.expenseTypeMenuItem = page.getByText('Expense Types')
    this.addButton = page.locator('//button[text()=" Add "]')
    this.eventNameInput = page.locator('//label[text()="Event Name"]/../..//input')
    this.expenseNameInput = page.locator('//label[text()="Name"]/../..//input')
    this.descriptionInput = page.locator('//label[text()="Description"]/../..//textarea')
    this.switchActive = page.locator('//p[text()="Active"]/..//span')
    this.saveConfigButton = page.getByRole('button', { name: ' Save ' })
    this.pageLoadingIcon = page.locator('//div[@class=oxd-loading-spinner]')
    this.configRecordData = page.locator('//div[@class="oxd-table-body"]')
    this.inputError = page.locator('oxd-input--error')
    this.inlineError = page.locator('oxd-input-field-error-message')
  }

  /**
   * Check if currently on Dashboard page
   * @returns True if on login page, false otherwise
   */
  async isOnClaimPage(): Promise<boolean> {
    return this.claimViewPage.isVisible()
  }

  /**
   * Check if currently on Event records page
   * @returns True if on the expected page, false otherwise
   */
  async isOnEventRecordsPage(): Promise<boolean> {
    return this.eventRecordPage.isVisible()
  }

  /**
   * Check if currently on Add Event page
   * @returns True if on the expected page, false otherwise
   */
  async isOnAddEventPage(): Promise<boolean> {
    return this.addEventPage.isVisible({ timeout: 30_000 })
  }

  /**
   * Check if currently on Add Event page
   * @returns True if on the expected page, false otherwise
   */
  async isOnAddExpenseTypePage(): Promise<boolean> {
    return this.addExpensePage.isVisible({ timeout: 30_000 })
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
    await this.eventsMenuItem.click()
  }

  /**
   * Click Expense Type menu from Configuration Nav menu
   */
  async clickExpenseTypeMenuItem() {
    await this.expenseTypeMenuItem.click()
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
