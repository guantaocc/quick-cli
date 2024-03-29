#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageInfo = exports.templates = exports.templateRootFolder = exports.rootFolder = void 0;
var path = require("path");
var os = require("os");
exports.rootFolder = path.join(__dirname, '..');
exports.templateRootFolder = path.join(os.homedir(), '.wy');
exports.templates = [{
        name: '模板库（vite+vue2.7',
        value: 'template-vite-vue2.7'
    }];
exports.packageInfo = [{
        type: 'input',
        name: 'version',
        message: '请输入项目版本号',
        default: '1.0.0'
    }, {
        type: 'input',
        name: 'description',
        message: '请填写项目描述',
        default: '项目描述'
    }];
