import * as chalk from 'chalk'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import { packageInfo, templates } from './config'

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