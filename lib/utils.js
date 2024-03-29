"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFolder = exports.log = void 0;
var chalk = require("chalk");
var fs = require("fs-extra");
var inquirer = require("inquirer");
var config_1 = require("./config");
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
