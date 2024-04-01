#!/usr/bin/env node

import * as path from 'path'
import * as os from 'os'

// 工程所在的根目录
export const rootFolder = path.join(__dirname, '..')
// 模板缓存的根目录
export const templateRootFolder = path.join(os.homedir(), '.qk')
// 脚手架模板列表
export const templates = [{
  name: '模板库（vite+vue2.7）',
  value: 'vite-vue2-template'
}]

// 需要动态写入的 package.json 信息
export const packageInfo = [{
  type: 'input',
  name: 'version',
  message: '请输入项目版本号',
  default: '1.0.0'
}, {
  type: 'input',
  name: 'description',
  message: '请填写项目描述',
  default: '项目描述'
}]
