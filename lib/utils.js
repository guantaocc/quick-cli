"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRepositry = exports.checkFolder = exports.log = void 0;
var chalk = require("chalk");
var fs = require("fs-extra");
var inquirer = require("inquirer");
var config_1 = require("./config");
var shell = require("shelljs");
var path = require("path");
exports.log = {
    info: function (text, br) {
        if (br === void 0) { br = true; }
        console.log();
        console.log(chalk.blue('info：') + text);
        if (br)
            console.log();
    },
    ok: function (text, br) {
        if (br === void 0) { br = true; }
        console.log();
        console.log(chalk.green('Success：') + text);
        if (br)
            console.log();
    },
    error: function (text, key, br) {
        if (key === void 0) { key = true; }
        if (br === void 0) { br = true; }
        console.log();
        console.log(chalk.red(key ? "Error\uFF1A".concat(text) : text));
        if (br)
            console.log();
    },
    cmd: function (text) {
        console.log("".concat(chalk.gray('$'), " ").concat(chalk.cyan(text)));
    }
};
var checkFolder = function (filePath, fn) {
    var cover = false;
    fs.readdir(filePath, function (error, files) {
        console.log('files', files);
        if (error && error.code !== 'ENOENT') {
            exports.log.error(error.toString(), true);
            process.exit();
        }
        if (!(!files || !files.length)) {
            inquirer.prompt({
                type: 'list',
                name: 'type',
                message: '请选择工程类型：',
                choices: config_1.templates
            });
        }
        else {
            fn();
        }
    });
};
exports.checkFolder = checkFolder;
var initRepositry = function (templateName, projectFolder, fn) {
    shell.config.silent = true;
    try {
        shell.exec('git --help');
    }
    catch (error) {
        exports.log.error('请先安装git命令');
    }
    if (!fs.existsSync(config_1.templateRootFolder)) {
        fs.mkdirSync(config_1.templateRootFolder);
    }
    var remoteRepositry = "https://github.com/guantaocc/".concat(templateName, ".git");
    var localRespositry = path.join(config_1.templateRootFolder, templateName);
    if (!fs.existsSync(localRespositry)) {
        exports.log.info('模板初始化中，请稍等');
        try {
            shell.cd(config_1.templateRootFolder);
            shell.exec("git clone ".concat(remoteRepositry));
        }
        catch (error) {
            exports.log.error("\u6A21\u677F\u62C9\u53D6\u8D85\u65F6:".concat(remoteRepositry));
            return;
        }
    }
    shell.cd(localRespositry);
    shell.exec('git pull');
    try {
        fs.copySync(localRespositry, projectFolder, {
            overwrite: true
        });
        fs.removeSync(path.join(projectFolder, '/.git/'));
    }
    catch (error) {
        exports.log.error("\u590D\u5236\u6587\u4EF6\u5931\u8D25".concat(error));
        return;
    }
    fn();
};
exports.initRepositry = initRepositry;
