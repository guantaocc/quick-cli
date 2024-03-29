import { Command } from 'commander'
import init from './init'

const program = new Command()

program
  .command('init [dir]')
  .description('请选择初始化模板工程')
  .action(init)


program.parse(process.argv)