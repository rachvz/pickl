import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ICustomWorld } from '../support/world.js'
import { CheckboxesPage } from '../../pages/CheckboxesPage.js'

Given('I am on the checkboxes page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkboxesPage = new CheckboxesPage(this.page)
  await checkboxesPage.goto()
})

When('I check checkbox {int}', async function (this: ICustomWorld, checkboxNumber: number) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkboxesPage = new CheckboxesPage(this.page)
  await checkboxesPage.check(checkboxNumber)
})

When('I uncheck checkbox {int}', async function (this: ICustomWorld, checkboxNumber: number) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkboxesPage = new CheckboxesPage(this.page)
  await checkboxesPage.uncheck(checkboxNumber)
})

Then(
  'checkbox {int} should be checked',
  async function (this: ICustomWorld, checkboxNumber: number) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkboxesPage = new CheckboxesPage(this.page)
    const isChecked = await checkboxesPage.isChecked(checkboxNumber)
    expect(isChecked).toBe(true)
  },
)

Then(
  'checkbox {int} should be unchecked',
  async function (this: ICustomWorld, checkboxNumber: number) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkboxesPage = new CheckboxesPage(this.page)
    const isChecked = await checkboxesPage.isChecked(checkboxNumber)
    expect(isChecked).toBe(false)
  },
)
