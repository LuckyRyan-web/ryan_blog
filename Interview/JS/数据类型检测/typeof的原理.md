---
title: typeof 的原理
categories: 前端
tags:
  - JavaScript
---

## typeof 判断数据类型

首先需要知道的是 JavaScript 中

- 空值（null)
- 未定义(undefined)
- 布尔值（boolean)
- 数字（number)
- 字符串（string)
- 对象 (object)
- Array（数组）
- 符号（symbol, ES6 中新增)

但是 ES2020 还引入了大整数（BigInt, ES2020 引入）

除对象外，其他统称为“基本类型”。
