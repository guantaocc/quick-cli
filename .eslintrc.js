module.exports = {
  // 继承标准规则和 TypeScript 规则
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  // 指定解析器为 TypeScript 解析器
  parser: '@typescript-eslint/parser',
  // 指定环境为 Node.js
  env: {
    browser: false,
    node: true
  },
  // 添加 TypeScript 插件
  plugins: [
    '@typescript-eslint'
  ],
  // 自定义规则
  rules: {},
  // 指定解析器选项
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 6,
    // 使用模块的方式
    sourceType: 'module',
    // 启用 JSX 解析
    useJSXTextNode: true,
    // 使用指定的 TypeScript 配置文件
    project: 'tsconfig.json'
  }
}
