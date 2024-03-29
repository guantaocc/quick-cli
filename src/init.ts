import * as inquirer from "inquirer"
import { checkFolder, log } from "./utils"
import { packageInfo, templates } from "./config"
import * as ora from "ora"

export default (folder: string): void => {
  const root = process.cwd()
  const projectFolder = folder ? `${root}/${folder}` : root
  const projectName = folder || root.split('/').pop()
  checkFolder(projectFolder, () => {
    inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '请选择工程类型：',
      choices: templates
    }).then(projectName => {
      inquirer.prompt(packageInfo).then(pkg => {
        console.log(projectName, pkg)
        // 下载相应的模板创建项目
        const spinner = ora('工程初始化中，请稍等。。。').start()
      })
    })
  })
}