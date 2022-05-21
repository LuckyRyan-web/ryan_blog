---
title: ES6 Map 与 Set
categories: 前端
tags:
  - JavaScript
  - ES6
---

## Map 对象

Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

## Maps 和 Objects 的区别

1. 一个 `Object` 的键只能是字符串或者 `Symbols`，但一个 `Map` 的键可以是任意值。
2. `Map` 中的键值是有序的`（FIFO 原则）`，而添加到对象中的键则不是。
3. `Map` 的键值对个数可以从 size 属性获取，而 `Object` 的键值对个数只能手动计算。
4.  都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/rBKdSK.jpg)

## Map 中的 key 类型

### key 为字符串

```js
var myMap = new Map();
var keyString = "a string"; 
 
myMap.set(keyString, "和键'a string'关联的值");
 
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get("a string");   // "和键'a string'关联的值"
                         // 因为 keyString === 'a string'
```

### key 为对象

```js
var myMap = new Map();
var keyObj = {}, 
 
myMap.set(keyObj, "和键 keyObj 关联的值");
﻿
myMap.get(keyObj); // "和键 keyObj 关联的值"
myMap.get({}); // undefined, 因为 keyObj !== {}
```

### key 是函数

```js
var myMap = new Map();
var keyFunc = function () {}, // 函数
 
myMap.set(keyFunc, "和键 keyFunc 关联的值");
 
myMap.get(keyFunc); // "和键 keyFunc 关联的值"
myMap.get(function() {}) // undefined, 因为 keyFunc !== function () {}
```

### key 是 NaN

```js
var myMap = new Map();
myMap.set(NaN, "not a number");
 
myMap.get(NaN); // "not a number"
 
var otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```

虽然 NaN 和任何值甚至和自己都不相等(NaN !== NaN 返回 true)，NaN 作为 Map 的键来说是没有区别的。



> 本文来源于[菜鸟教程](https://www.runoob.com/w3cnote/es6-map-set.html)
