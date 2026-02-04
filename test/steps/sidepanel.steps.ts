import { Given } from '@cucumber/cucumber'
import { SidePanel } from '../../pages/SidePanel.js'
import { ICustomWorld } from '../support/world.js'

Given(
  'the user views the {string} Module',
  async function (this: ICustomWorld, moduleName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    // TODO rach : enhance this. validate acceptable module name param
    const sidePanel = new SidePanel(this.page)
    await sidePanel.clickModule(moduleName)
  },
)
