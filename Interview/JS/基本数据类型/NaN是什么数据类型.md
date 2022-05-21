---
title: NaN 是什么数据类型
categories: 前端
tags:
  - JavaScript
---

### NaN 是什么数据类型

**NaN 是数字类型的，但是它又可以用 isNaN()检测，isNaN() 函数用于检查其参数是否是非数字值**

isNaN() 函数通常用于检测 parseFloat() 和 parseInt() 的结果，以判断它们表示的是否是合法的数字

#### isNaN()为 false 的两种情况

```jsx
isNaN(123)    //false
isNaN('123')    //false
```

通俗的讲 isNaN()是用来检测非合法数字的，只要不是数字，或者可以转换为数字的都是 true
 **注意 isNaN(true) //false   isNaN(false) //false isNaN(undefined) //true**
 这是因为:

```jsx
Number(true)    //1
Number(false)  //0
Number(undefined)  //NaN
```

**在 ES6 的 Number.isNaN()扩展方法没有出现之前，全局的 isNaN()方法是比较可靠的方式判断是否为 NaN，但是在 ES6 出来之后，我们可以使用 Number.isNaN()方法进行可靠的判断 NaN 值**
 Number.isNaN()方法的判断过程：首先判断传入的参数是否为数值类型，如果判断为 true 再使用 isNaN()方法进行判断。为 false 就直接返回 flase
 所以：

```jsx
Number.isNaN(undefined)   //false
```

由此得出 NaN 是一个非法数字，更是一个没有固定值的数字
 所以：

```jsx
NaN != NaN  // true
NaN !== NaN  // true
```
