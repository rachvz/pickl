import { Given, Then } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { DashboardPage } from '../../pages/DashboardPage.js'
import { LoginPage } from '../../pages/LoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('the admin user login to Orangehrm site', async function (this: ICustomWorld) {
  const loginPage = this.getPageObject<LoginPage>(LoginPage)
  const username = process.env.ADMIN_USERNAME!
  const password = process.env.ADMIN_PASSWORD!
  await loginPage.goto()
  await loginPage.login(username, password)

  const isLandingDashboardPage = await loginPage.isOnPage('Dashboard')
  expect(isLandingDashboardPage).toBeTruthy()
})

Then('the {string} page is displayed', function (this: ICustomWorld, moduleName: string) {
  switch (moduleName.toLowerCase()) {
    case 'dashboard': {
      const dashboard = this.getPageObject<DashboardPage>(DashboardPage)
      expect(dashboard.isOnDashboardPage()).toBeTruthy()
      break
    }
    case 'claim': {
      const claimPage = this.getPageObject<ClaimPage>(ClaimPage)
      expect(claimPage.isOnClaimPage()).toBeTruthy()
      break
    }
    default:
      throw new Error('Module name provided is not handled.')
  }
})
