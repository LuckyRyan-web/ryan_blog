---
title: JS 实现数组的 find 方法
categories: 前端
tags:
  - JavaScript
---

> 本文来源于：https://blog.csdn.net/weixin_39503495/article/details/99854484
>
> 本文只写心得

## JS 实现数组的 find 方法

这个是我在今年遇到的面试题，先写出编程思路：先**确定**方法要**传入的参数**和**返回的值**，再通过原型定义，在 Array 的原型上添加自定的方法，验证是否达到预期效果。

数组的 find 方法是什么呢

## 目标

目标：find()返回符合条件的元素，之后的值不会再执行函数。如果没有符合条件的元素则返回 undefined。

还有以下两个注意点：

1. 注意: find() 对于空数组，函数是不会执行的。
2. 注意: find() 并没有改变数组的原始值。



## 分析

1. 传入：参数 1 为条件函数、参数 2（可选）为调用的数组（默认是 this）。
2. 返回： 返回满足条件的第一个元素，不满足条件则返回 undefined



## 实现

```javascript
Array.prototype.myFind = function (condition, thisValue = this) {
  //将满足条件的元素放入到临时的数组中
  let temp = [];
  //遍历当前数组
  thisValue.forEach((item, index, arr) => {
    // 如果第一项存在，则直接返回，停止遍历
    if (temp[0]) {
      return
    } else{
      // 如果第一项不存在，则执行判断语句，满足则推进栈。不满足则继续遍历
      if (condition(item, index, arr)) {
        temp.push(item)
      }
    }
  })
  //可以直接只返回temp[0]，全都不满足条件时，自然为undefined
  return temp[0] || undefined
}
```

## 测试

```JavaScript
const myCondition = function(item, index, arr){ return item > 2}
[1,2,3,4].myFind(myCondition)//3

const myCondition = function(item, index, arr){ return item > 5}
[1,2,3,4].myFind(myCondition)//undefined
```

