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

    const newEventRecord = {
      eventName: '',
      description: '',
      isActive: true,
    }
    if (dataTable['Event Name']) {
      await claimPage.enterEventName(dataTable['Event Name'])
      newEventRecord.eventName = dataTable['Event Name']
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
    await claimPage.clickSaveEventRecordButton()

    // TODO handling session variables
    // this.data.eventData = newEventRecord
    // return this.data.eventData
  },
)

Then('the event type record is added successfully', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sidePanel = new SidePanel(this.page)
  await expect(sidePanel.toastNotifTitle).toHaveText('Success', { timeout: 30_000 })
  await expect(sidePanel.toastNotifMessage).toHaveText('Successfully Saved')

  // // TODO handling session variables
  // const seshData = this.data.eventData
  // console.warn(seshData)

  const claimPage = new ClaimPage(this.page)
  await expect(claimPage.eventsRecordData).toBeVisible({ timeout: 30_000 })
  expect(claimPage.eventsRecordData.filter({ hasText: 'Learning & Development' }))
})
