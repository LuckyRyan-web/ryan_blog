---
title: 如何在数组有对象的时候去重
categories: 前端
tags:
  - JavaScript
---

## 题目  

> let arr= [{a:1,b:1},{a:1,b:1},{a:1,b:2}]
>
>   请问如何对 arr 里面的数组进行去重

对于这道题目我一眼就看出 Object 是引用类型，所以是不能用`new Set`去重的,indexof 也不行，因为即便是同样值的数组对比都是不同的

这个题目有两种方法

## 方法 1：对象访问属性

