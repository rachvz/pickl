import { Given, Then } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { DashboardPage } from '../../pages/DashboardPage.js'
import { LoginPage } from '../../pages/LoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('the admin user login to Orangehrm site', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  const username = process.env.ADMIN_USERNAME!
  const password = process.env.ADMIN_PASSWORD!
  await loginPage.goto()
  await loginPage.login(username, password)

  const isLandingDashboardPage = await loginPage.isOnPage('Dashboard')
  expect(isLandingDashboardPage).toBeTruthy()
})

Then('the {string} page is displayed', function (this: ICustomWorld, moduleName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  switch (moduleName.toLowerCase()) {
    case 'dashboard': {
      const dashboard = new DashboardPage(this.page)
      expect(dashboard.isOnDashboardPage()).toBeTruthy()
      break
    }
    case 'claim': {
      const claimPage = new ClaimPage(this.page)
      expect(claimPage.isOnClaimPage()).toBeTruthy()
      break
    }
    default:
      throw new Error('Module name provided is not handled.')
  }
})
