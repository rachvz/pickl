import { Given } from '@cucumber/cucumber'
import { SidePanel } from '../../pages/SidePanel.js'
import { ICustomWorld } from '../support/world.js'

Given(
  'the user views the {string} Module',
  async function (this: ICustomWorld, moduleName: string) {
    // TODO rach : enhance this. validate acceptable module name param
    const sidePanel = this.getPageObject<SidePanel>(SidePanel)
    await sidePanel.clickModule(moduleName)
  },
)
