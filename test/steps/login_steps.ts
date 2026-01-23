import { Given, Then } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { ClaimPage } from '../../pages/ClaimPage.js'
import { DashboardPage } from '../../pages/DashboardPage.js'
import { LoginPage } from '../../pages/LoginPage.js'
import { SidePanel } from '../../pages/SidePanel.js'
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

Given(
  'the user views the {string} Module',
  async function (this: ICustomWorld, moduleName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    // TODO enhance this. validate acceptable module name param
    const sidePanel = new SidePanel(this.page)
    await sidePanel.clickModule(moduleName)
  },
)

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
