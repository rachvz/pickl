import { type DataTable, Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { SidePanel } from '../../pages/SidePanel.js'
import { ICustomWorld } from '../support/world.js'

Given('the user views the Events type records', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const claimPage = new ClaimPage(this.page)
  await claimPage.clickConfiguration()
  await claimPage.clickEventsMenuItem()
  await claimPage.clickAddEventButton()
  expect(claimPage.isOnAddEventPage()).toBeTruthy()
})

When(
  'the user adds new event type record with the following details',
  async function (this: ICustomWorld, table: DataTable) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)
    // fetch scenario step data into dictionary.
    const dataTable = table.rowsHash()

    if (dataTable['Event Name']) {
      await claimPage.enterEventName(dataTable['Event Name'])
    }
    if (dataTable.Description) {
      await claimPage.enterDescription(dataTable.Description)
    }
    // clicking the switch Active button only when isActive is false.
    if (dataTable.isActive === 'false') {
      await claimPage.setSwitchEventActive()
    }
    await claimPage.clickSaveEventRecordButton()
  },
  // TODO save added record in session variable
)

Then('the event record is added successfully', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sidePanel = new SidePanel(this.page)
  const notif = await sidePanel.hasMessageInToastNotif('Success')
  expect(notif).toBeTruthy()

  const claimPage = new ClaimPage(this.page)
  expect(await claimPage.isRecordTableDisplayed()).toBeTruthy()
  expect(await claimPage.isRecordRetrieveInTable('Learning & Development')).toBe(true)
})
