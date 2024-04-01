import * as inquirer from "inquirer"
import { checkFolder, initRepositry, log } from "./utils"
import { packageInfo, templates } from "./config"
import * as ora from "ora"

export default (folder: string): void => {
  if(!folder){
    log.info('Missing required argument [dir]')
    return
  }
  const root = process.cwd()
  const projectFolder = folder ? `${root}/${folder}` : root
  const projectName = folder || root.split('/').pop()
  checkFolder(projectFolder, () => {
    inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '请选择工程类型：',
      choices: templates
    }).then(templateInfo => {
      inquirer.prompt(packageInfo).then(pkgInfo => {
        // 下载相应的模板创建项目
        const spinner = ora('工程初始化中，请稍等。。。').start()
        initRepositry(templateInfo.type, projectFolder, () => {
          spinner.text = '模板创建成功，正在初始化'
          spinner.stop()
          log.ok('项目初始化完成')
        })
      })
    })
  })
}