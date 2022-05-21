---
title: 详解 JSON.stringify 和 JSON.parse
categories: 前端
tags:
  - JavaScript
---

## 不可被序列化的类型

JSON.stringify 和 JSON.parse 一起使用的作用是深拷贝，但是这个是有弊端的，并不是所有的值都可以被序列化

`undefined`、`Function`、`Symbol`  在对象里面的话 ，JSON.parse 后会直接忽略掉，如下

```js
const obj = {
    name: 'A',
    name1: 
    ,
    name3: function() {},
    name4:  Symbol('A'),
    name5: RegExp('ab+c', 'i'),
    name6: Date('1995-12-17T03:24:00')
}
const obj2 = JSON.parse(JSON.stringify(obj));
```

`undefined`、`Function`、`Symbol` 三种类型在对象中被忽略，`RegExp` 类型会返回为空对象，`Date`（转换后变成了字符串，而非 Date 类的对象）

并且如果有循环引用类型的话还会报错，如下

```js
const a = { key: 'value' };
a['a'] = a;
JSON.stringify(a);

// Uncaught TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Object'
//     --- property 'a' closes the circle
//     at JSON.stringify (<anonymous>)
```

## 循环引用类型

JSON.stringify 是不能识别循环引用类型的，如果一定要使用循环引用类型去序列化，可以添加 ，`toJSON` 方法，这个方法主要是为了在循环引用的时候返回一个合理的值


```js
const a = { key: 'value',toJSON() {return '这个是 toJSON 的返回'}};
a['a'] = a;
console.log(JSON.stringify(a))
```

## JSON.stringify 的第二个参数

JSON.stringify 是有第二个参数的 `replacer`,第二个参数可以写数组或者是函数，来指定序列化的值哪些需要被处理

### 函数

如果是函数的话，需要对对象里面的所有属性都调用一次，每次传递两个参数（第一个参数 k 是属性名字，v 是值），如果需要忽略哪个属性就把这个属性返回 undefined 

```js
const obj = {
  a: 42,
  b: 30,
  c: 100,
};
JSON.stringify(obj, (k, v) => {
  // 注意：第一次 k 是 undefined，v 是原对象
  if (k !== 'c') return v;
}); // "{"a":42,"b":30}"
```

### 数组

如果第二个参数是数组的话，那么只需要传递属性的名字就可以指定对象需要返回的属性

```js
const obj = {
  a: 42,
  b: 30,
  c: 100,
};
JSON.stringify(obj, ['a', 'c']); // {"a":42,"c":100}
```