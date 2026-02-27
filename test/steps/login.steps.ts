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

  const dashboardPage = this.getPageObject<DashboardPage>(DashboardPage)
  await expect(dashboardPage.dashboardViewPage).toBeVisible({ timeout: 30_000 })
})

Then('the {string} page is displayed', async function (this: ICustomWorld, moduleName: string) {
  switch (moduleName.toLowerCase()) {
    case 'dashboard': {
      const dashboardPage = this.getPageObject<DashboardPage>(DashboardPage)
      await expect(dashboardPage.dashboardViewPage).toBeVisible({ timeout: 30_000 })
      break
    }
    case 'claim': {
      const claimPage = this.getPageObject<ClaimPage>(ClaimPage)
      await expect(claimPage.claimViewPage).toBeVisible({ timeout: 30_000 })
      break
    }
    default: {
      throw new Error('The module name provided is not yet handled.')
    }
  }
})
