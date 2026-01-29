import { type DataTable, Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { SidePanel } from '../../pages/SidePanel.js'
import { CustomWorld, ICustomWorld } from '../support/world.js'

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
  async function (this: ICustomWorld, session: CustomWorld, table: DataTable) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const claimPage = new ClaimPage(this.page)
    // fetch scenario step data into dictionary.
    const dataTable = table.rowsHash()

    const newEventRecord = new Map()
    if (dataTable['Event Name']) {
      await claimPage.enterEventName(dataTable['Event Name'])
      newEventRecord.set('Event Name', dataTable['Event Name'])
    }
    if (dataTable.Description) {
      await claimPage.enterDescription(dataTable.Description)
      newEventRecord.set('Description', dataTable.Description)
    }
    // clicking the switch Active button only when isActive is false.
    if (dataTable.isActive === 'false') {
      await claimPage.setSwitchEventActive()
    }
    newEventRecord.set('isActive', dataTable.isActive)
    await claimPage.clickSaveEventRecordButton()

    // TODO handling session variables
    session.data.eventData = newEventRecord
  },
)

Then(
  'the event record is added successfully',
  async function (this: ICustomWorld, session: CustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const sidePanel = new SidePanel(this.page)
    await expect(sidePanel.toastNotifTitle).toHaveText('Success', { timeout: 30_000 })
    await expect(sidePanel.toastNotifMessage).toHaveText('Successfully Saved')

    // TODO handling session variables
    const seshData = session.data.eventData
    console.warn(seshData)

    const claimPage = new ClaimPage(this.page)
    await expect(claimPage.eventsRecordData).toBeVisible({ timeout: 30_000 })
    expect(claimPage.eventsRecordData.filter({ hasText: 'Learning & Development' }))
  },
)
