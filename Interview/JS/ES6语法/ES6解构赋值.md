---
title: ES6 解构赋值
categories: 前端
tags:
  - JavaScript
  - ES6
---

## Array 数组的解构

### 一般用法

```js
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3
```

### 剩余运算符

```js
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

### 字符串的解构

```js
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

## 对象的解构

### 基本用法

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
```

### 剩余运算符

```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```
