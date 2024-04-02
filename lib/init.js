"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var utils_1 = require("./utils");
var config_1 = require("./config");
var ora = require("ora");
var path = require("path");
var fs = require("fs-extra");
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
                    var pkgPath = path.join(projectFolder, '/package.json');
                    fs.writeFileSync(pkgPath, JSON.stringify(__assign(__assign({}, require(pkgPath)), { version: pkgInfo.version, description: pkgInfo.description, name: folder }), null, 2));
                    spinner.stop();
                    utils_1.log.ok('项目初始化完成');
                    (0, utils_1.showSuccessTooltip)(folder);
                });
            });
        });
    });
});
