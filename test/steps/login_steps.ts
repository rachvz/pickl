import { Given } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { LoginPage } from '../../pages/LoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('the admin user login to Orangehrm site', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  const username = process.env.USERNAME!
  const password = process.env.PASSWORD!
  await loginPage.enterUsername(username)
  await loginPage.enterPassword(password)
  await loginPage.clickLogin()

  const isLandingDashboardPage = await loginPage.isOnPage('Dashboard')
  expect(isLandingDashboardPage).toBeTruthy()
})
