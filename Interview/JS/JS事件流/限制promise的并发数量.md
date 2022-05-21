---
title: 如何限制 promise 的并发数量
categories: 前端
tags:
  - JavaScript
---
## 如何限制 promise 的并发数量

> 题目是这样的：
> 有 8 个图片资源的 url，已经存储在数组 urls 中（即 urls = [‘http://example.com/1.jpg’, ……., ‘http://example.com/8.jpg’]），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
>
> 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。