---
title: Symbol
categories: 前端
tags:
  - JavaScript
  - ES6
---

ES6 引入了一种新的原始数据类型 `Symbol` ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。

ES6 数据类型除了 `Number 、 String 、 Boolean 、 Objec t、 null` 和 `undefined` ，还新增了 `Symbol` 。

## 基本用法

`Symbol` 是代表唯一的数据类型，哪怕是同样的值也不会相等

`Symbol` 函数栈不能用 new 命令，因为 `Symbol` 是原始数据类型，不是对象。

```js
a = Symbol(123)
b = Symbol(123)
a === b // false
```

## 应用场景

### 2.1 作为属性名

因为每个 Symbol 都是唯一的，所以 Symbol 作为对象的属性可以保证唯一性

```js
let sy = Symbol('key1')

let syObject = {}
syObject[sy] = 'kk'
console.log(syObject) // {Symbol(key1): "kk"}
```

### 3.2 注意点

但是不会出现在 `for...in` 、 `for...of` 的循环中，也不会被 `Object.keys()` 、 `Object.getOwnPropertyNames()` 返回。如果要读取到一个对象的 `Symbol` 属性，可以通过 `Object.getOwnPropertySymbols()` 和 `Reflect.ownKeys()` 取到。

`Object.getOwnPropertySymbols()`是获取对象的 Symbol 字段

`Reflect.ownKeys()` 是获取对象的所有字段包括 Symbol

```js
let syObject = {
}
syObject[Symbol('key1')] = 'kk'
console.log(syObject)

for (let i in syObject) {
  console.log(i)
}

Object.keys(syObject) // []
Object.getOwnPropertySymbols(syObject) // [Symbol(key1)]
Reflect.ownKeys(syObject) // [Symbol(key1)]
```


### 3.3 Symbol.for()

`Symbol.for()` 类似单例模式，首先会在全局搜索被登记的 `Symbol` 中是否有该字符串参数作为名称的 `Symbol` 值，如果有即返回该 `Symbol` 值，若没有则新建并返回一个以该字符串参数为名称的 `Symbol` 值，并登记在全局环境中供搜索。

```js
let yellow = Symbol('Yellow')
let yellow1 = Symbol.for('Yellow')
yellow === yellow1 // false

let yellow2 = Symbol.for('Yellow')
yellow1 === yellow2 // true
```

### 3.4 Symbol.keyFor()

`Symbol.keyFor()` 返回一个已登记的 `Symbol` 类型值的 key ，用来检测该字符串参数作为名称的 `Symbol` 值是否已被登记。

```js
let yellow1 = Symbol.for('Yellow')
Symbol.keyFor(yellow1) // "Yellow"
```
