/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-01-11 14:44:42
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-04-29 17:01:47
 * @Description: file content
 * @FilePath: /smart-logistics-applet/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2, // 函数参数不能重复
    "no-extra-semi": 2, // 禁止多余的冒号
    "no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
    "no-func-assign": 2, // 禁止重复的函数声明
    "no-redeclare": 2, // 禁止重复声明变量
    "no-unused-vars": [2, { vars: "all", args: "none" }], // 不能有声明后未被使用的变量或参数
    "no-trailing-spaces": 1, // 一行结束后面不要有空格
    "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
    "comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾
    "consistent-this": [2, "that"], // this别名
    "space-before-function-paren": [2, "never"], // 在函数括号前需要或不允许有空格
    indent: [2, 2], // 缩进风格
    "max-len": [0, 120, 4], // 字符串最大长度
    quotes: [2, "double"],
    "quote-props": [2, "as-needed"], // 对象字面量中的属性名是否强制双引号
    strict: 2, // 使用严格模式
    eqeqeq: 0, // 要求===和！==（eqeqeq）
    "no-debugger": 0
  },
  globals: {
    globalConfig: true,
    uni: true
  }
}
