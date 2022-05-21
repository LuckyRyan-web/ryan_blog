---
title: GET 和 POST 的区别
categories: 前端
tags:
  - JavaScript
---

首先 Get 是不安全的，在传输的过程中参数是放在 URL 中，比如`127.0.0.1?name=Ryan`；而 POST 是不可见的

其次 Get 的传送数据很小，这个不可能 URL+参数那么一大串传过去；而 POST 请求数据量比较多

Get 限制表单的数据集必须为 ASCII 字符；而 Post 支持整个 ISO10646 字符集

Get 执行效率却比 Post 方法好

Get 是 form 提交的默认方法

