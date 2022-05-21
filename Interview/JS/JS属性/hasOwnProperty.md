---
title: hasOwnProperty
categories: 前端
tags:
  - JavaScript
---

Object 的 hasOwnProperty 用于判断对象属性是否包含自身的（非继承）的属性（也就是是否有指定的键）

## 判断自身属性

```js
const object1 = {};
object1.property1 = 42;


console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// expected output: false
```

只检测自身属性的键，不检测自身含有的属性

哪怕子属性是 undefined 或者是 null 都可以被检测出来

```js
o = new Object();

o.propOne = null;
o.hasOwnProperty('propOne'); // 返回 true

o.propTwo = undefined;
o.hasOwnProperty('propTwo'); // 返回 true

// 检测自身属性
o.hasOwnProperty('prop'); // 返回 false

o.prop = 'exists';
o.hasOwnProperty('prop'); // 返回 true

delete o.prop;
o.hasOwnProperty('prop'); // 返回 false
```

只要是自身属性存在就可以被检测

## hasOwnProperty 作为属性名

JavaScript 没有保护 hasOwnProperty 这个属性名，所以可以用作对象的属性名

```js
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false
```

此时调用 `foo.hasOwnProperty('bar')` 是调用属性的 `return false` 方法

如果出现这种清空可以使用 `({}).hasOwnProperty.call` 或者是 Object 的 `hasOwnProperty` 属性 `Object.prototype.hasOwnProperty.call`

```js
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

({}).hasOwnProperty.call(foo, 'bar'); // true

Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```