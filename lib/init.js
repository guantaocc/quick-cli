"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var utils_1 = require("./utils");
var config_1 = require("./config");
var ora = require("ora");
exports.default = (function (folder) {
    if (!folder) {
        utils_1.log.info('Missing required argument [dir]');
        return;
    }
    var root = process.cwd();
    var projectFolder = folder ? "".concat(root, "/").concat(folder) : root;
    var projectName = folder || root.split('/').pop();
    (0, utils_1.checkFolder)(projectFolder, function () {
        inquirer.prompt({
            type: 'list',
            name: 'type',
            message: '请选择工程类型：',
            choices: config_1.templates
        }).then(function (templateInfo) {
            inquirer.prompt(config_1.packageInfo).then(function (pkgInfo) {
                var spinner = ora('工程初始化中，请稍等。。。').start();
                (0, utils_1.initRepositry)(templateInfo.type, projectFolder, function () {
                    spinner.text = '模板创建成功，正在初始化';
                    spinner.stop();
                    utils_1.log.ok('项目初始化完成');
                });
            });
        });
    });
});
