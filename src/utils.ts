import * as chalk from 'chalk'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import { packageInfo, templateRootFolder, templates } from './config'
import * as shell from 'shelljs'
import * as path from 'path'

// 统一的日志输出
export const log = {
  info: (text: string, br = true): void => {
    console.log()
    console.log(chalk.blue('info：') + text)
    if (br) console.log()
  },
  ok: (text: string, br = true): void => {
    console.log()
    console.log(chalk.green('Success：') + text)
    if (br) console.log()
  },
  error: (text: string, key = true, br = true): void => {
    console.log()
    console.log(chalk.red(key ? `Error：${text}` : text))
    if (br) console.log()
  },
  cmd: (text: string): void => {
    console.log(`${chalk.gray('$')} ${chalk.cyan(text)}`)
  }
}

export const checkFolder = (filePath: string, fn: () => void) => {
  let cover = false

  fs.readdir(filePath, (error: NodeJS.ErrnoException, files: string[]) => {
    console.log('files', files)
    if(error && error.code !== 'ENOENT'){
      log.error(error.toString(), true)
      process.exit()
    }
    if (!(!files || !files.length)) {
      inquirer.prompt({
        type: 'list',
        name: 'type',
        message: '请选择工程类型：',
        choices: templates
      })
    } else {
      fn()
    }
  })
}

// 初始化 git 仓库，拉取代码
export const initRepositry = (templateName: string, projectFolder: string, fn: () => void): void => {
  shell.config.silent = true
  try {
    shell.exec('git --help')
  } catch (error) {
    log.error('请先安装git命令')
  }
  if(!fs.existsSync(templateRootFolder)){
    fs.mkdirSync(templateRootFolder)
  }

  // https://github.com/guantaocc/vite-vue2-template.git
  const remoteRepositry = `https://github.com/guantaocc/${templateName}.git`

  // 本地地址
  const localRespositry = path.join(templateRootFolder, templateName)


  if(!fs.existsSync(localRespositry)){
    log.info('模板初始化中，请稍等')
    try {
      shell.cd(templateRootFolder)
      shell.exec(`git clone ${remoteRepositry}`)
    } catch (error) {
      log.error(`模板拉取超时:${remoteRepositry}`)
      return
    }
  }

  shell.cd(localRespositry)
  shell.exec('git pull')

  try {
    // 复制项目目录
    fs.copySync(localRespositry, projectFolder, {
      overwrite: true
    })
    fs.removeSync(path.join(projectFolder, '/.git/'))
  } catch (error) {
    log.error(`复制文件失败${error}`)
    return
  }
  fn()
}


// 提示
export const showSuccessTooltip = (folder) => {
  log.info('请输入以下命令启动项目...')
  console.log(`cd ${folder}`)
  console.log('pnpm install')
  console.log('pnpm dev')
}