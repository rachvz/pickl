import { type DataTable, Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ConfigurationRecord } from '../../models/configurations.js'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { SidePanel } from '../../pages/SidePanel.js'
import { ICustomWorld } from '../support/world.js'

Given(
  'the user views the {string} records',
  async function (this: ICustomWorld, configMenu: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const claimPage = new ClaimPage(this.page)
    await claimPage.clickConfiguration()

    switch (configMenu.toLowerCase()) {
      case 'events type':
        await claimPage.clickEventsMenuItem()
        await claimPage.clickAddButton()
        expect(claimPage.isOnAddEventPage()).toBeTruthy()
        break
      case 'expense type':
        await claimPage.clickExpenseMenuItem()
        await claimPage.clickAddButton()
        expect(claimPage.isOnAddExpenseTypePage()).toBeTruthy()
        break
      default:
        throw new Error('The record type arg from the scenario step is not defined.')
    }
  },
)

When(
  'the user adds new event type record with the following details',
  async function (this: ICustomWorld, table: DataTable) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)
    // fetch scenario step data into dictionary.
    const dataTable = table.rowsHash()

    const newEventRecord: ConfigurationRecord = {
      name: '',
      description: '',
      isActive: true,
    }

    if (dataTable['Event Name']) {
      await claimPage.enterEventName(dataTable['Event Name'])
      newEventRecord.name = dataTable['Event Name']
    }
    if (dataTable.Description) {
      await claimPage.enterDescription(dataTable.Description)
      newEventRecord.description = dataTable.Description
    }
    // clicking the switch Active button only when isActive is false.
    newEventRecord.isActive = String(dataTable['Is Active']).trim().toLowerCase() === 'true'
    if (dataTable['Is Active'] === 'false') {
      await claimPage.setSwitchEventActive()
    }
    await claimPage.clickSaveConfigRecordButton()

    // store data to scenario-scope session
    this.setData('newEventRecord', newEventRecord)
  },
)

When(
  'the user adds new expense type record with the following details',
  async function (this: ICustomWorld, table: DataTable) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)
    // fetch scenario step data into dictionary.
    const dataTable = table.rowsHash()

    const newExpenseRecord: ConfigurationRecord = {
      name: '',
      description: '',
      isActive: true,
    }

    if (dataTable['Expense Type']) {
      await claimPage.enterExpenseName(dataTable['Expense Type'])
      newExpenseRecord.name = dataTable['Expense Type']
    }
    if (dataTable.Description) {
      await claimPage.enterDescription(dataTable.Description)
      newExpenseRecord.description = dataTable.Description
    }
    // clicking the switch Active button only when isActive is false.
    newExpenseRecord.isActive = String(dataTable['Is Active']).trim().toLowerCase() === 'true'
    if (dataTable['Is Active'] === 'false') {
      await claimPage.setSwitchEventActive()
    }
    await claimPage.clickSaveConfigRecordButton()

    // store data to scenario-scope session
    this.setData('newExpenseRecord', newExpenseRecord)
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
        throw new Error('The record type arg from the scenario step is not defined.')
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
