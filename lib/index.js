"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var init_1 = require("./init");
var program = new commander_1.Command();
program
    .command('init [dir]')
    .description('请选择初始化模板工程')
    .action(init_1.default);
program.parse(process.argv);
