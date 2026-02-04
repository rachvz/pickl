import { type DataTable, Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ConfigurationRecord } from '../../models/configurations.js'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { SidePanel } from '../../pages/SidePanel.js'
import { ICustomWorld } from '../support/world.js'

Given(
  'the user views the {string} type records',
  async function (this: ICustomWorld, configMenu: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const claimPage = new ClaimPage(this.page)
    await claimPage.clickConfiguration()

    switch (configMenu.toLowerCase()) {
      case 'events':
        await claimPage.clickEventsMenuItem()
        expect(claimPage.isOnEventRecordsPage()).toBeTruthy()
        break
      case 'expense':
        await claimPage.clickExpenseMenuItem()
        expect(claimPage.isOnExpenseRecordsPage()).toBeTruthy()
        break
      default:
        throw new Error('The record type arg from the scenario step is not defined.')
    }
  },
)

When(
  'the user fills-up the {string} type details for new record with the following',
  async function (this: ICustomWorld, recordType: string, table: DataTable) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)

    // view Events or Expense record page
    switch (recordType.toLowerCase()) {
      case 'events':
        await claimPage.clickAddButton()
        expect(claimPage.isOnAddEventPage()).toBeTruthy()
        break
      case 'expense':
        await claimPage.clickAddButton()
        expect(claimPage.isOnAddExpenseTypePage()).toBeTruthy()
        break
      default:
        throw new Error('The record type arg from the scenario step is not defined.')
    }

    // fetch scenario step data into dictionary.
    const dataTable = table.rowsHash()

    const tempRecord: ConfigurationRecord = {
      name: '',
      description: '',
      isActive: true,
    }

    if (dataTable['Event Name']) {
      await claimPage.enterEventName(dataTable['Event Name'])
      tempRecord.name = dataTable['Event Name']
    }
    if (dataTable['Expense Type']) {
      await claimPage.enterEventName(dataTable['Expense Type'])
      tempRecord.name = dataTable['Expense Type']
    }
    if (dataTable.Description) {
      await claimPage.enterDescription(dataTable.Description)
      tempRecord.description = dataTable.Description
    }
    // clicking the switch Active button only when isActive is false.
    tempRecord.isActive = String(dataTable['Is Active']).trim().toLowerCase() === 'true'
    if (dataTable['Is Active'] === 'false') {
      await claimPage.setSwitchEventActive()
    }

    // store data to scenario-scope session
    const sessionRecordName =
      // eslint-disable-next-line no-nested-ternary
      recordType === 'event'
        ? 'tempEventRecord'
        : recordType === 'expense'
          ? 'tempExpenseRecord'
          : 'throwable'
    this.setData(sessionRecordName, tempRecord)
  },
)

When(
  'the user save the {string} type details',
  async function (this: ICustomWorld, configType: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const claimPage = new ClaimPage(this.page)
    let recordType = ''
    let newConfigRecord: ConfigurationRecord

    switch (configType.toLowerCase()) {
      case 'event':
        recordType = 'newEventRecord'
        newConfigRecord = this.getData<ConfigurationRecord>('tempEventRecord')!
        break
      case 'expense':
        recordType = 'newExpenseRecord'
        newConfigRecord = this.getData<ConfigurationRecord>('tempExpenseRecord')!
        break
      default:
        throw new Error('The configuration record type arg from the scenario step is not defined.')
    }

    // save the config record
    await claimPage.clickSaveConfigRecordButton()

    // store data to scenario-scope session
    this.setData(recordType, newConfigRecord)
  },
)

Then(
  'the {string} type record is added successfully',
  async function (this: ICustomWorld, configType: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const sidePanel = new SidePanel(this.page)
    await expect(sidePanel.toastNotifTitle).toHaveText('Success', { timeout: 50_000 })
    await expect(sidePanel.toastNotifMessage).toHaveText('Successfully Saved')

    // retrieve data from scenario-scope session
    let recordType = ''
    switch (configType.toLowerCase()) {
      case 'event':
        recordType = 'newEventRecord'
        break
      case 'expense':
        recordType = 'newExpenseRecord'
        break
      default:
        throw new Error('The configuration record type arg from the scenario step is not defined.')
    }
    const sessionData = this.getData<ConfigurationRecord>(recordType)
    const claimPage = new ClaimPage(this.page)
    await expect(claimPage.configRecordData).toBeVisible({ timeout: 30_000 })
    expect(claimPage.configRecordData.filter({ hasText: sessionData?.name }))
  },
)

Then(
  /^adding the (?:event|expense) type record is not successful$/,
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)
    await expect(claimPage.configRecordData).toHaveCount(0)
    await expect(claimPage.inputError).toHaveCount(1, { timeout: 30_000 })
  },
)

Then('an inline message is displayed', async function (this: ICustomWorld, table: DataTable) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const claimPage = new ClaimPage(this.page)
  // fetch scenario step data into dictionary.
  const dataTable = table.rowsHash()

  const validationMsg: string = dataTable.message!
  await expect(claimPage.inlineError).toHaveText(validationMsg)
})
