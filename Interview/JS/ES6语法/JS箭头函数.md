---
title: JS 箭头函数的区别
categories: 前端
tags:
  - JavaScript
  - ES6
---
> 本文转载于：https://www.jianshu.com/p/02958d3b58da
>
> 本文只添加心得

## 区别

区别总共有 4 点：

1. 写法不一样

3. 箭头函数不能作为构造函数使用

4. 两者 this 的指向不同

5. 箭头函数的 arguments 指向它的父级函数所在作用域的 arguments



## 写法不一样

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/16021827-39c9fca447ea83b3.png)

明显写法更为的简洁

## 箭头函数不能作为构造函数使用

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/16021827-f861d69b3ebe9233.png)

并且箭头函数检测出来是不能用于构造函数的

> 先说明下 new.target 是干嘛的，这家伙是用来检测函数是否被当做构造函数使用，他会返回一个指向构造函数的引用。
>
> 因为箭头函数不能当做构造函数使用，自然是没有 new.target 的。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/16021827-c5b6b745bb9eec63.png)

## 两者的 this 指向不同

> 普通函数的 this 指向的是谁调用该函数就指向谁
>
> 箭头函数的 this 指向的是在你书写代码时候的上下文环境对象的 this，如果没有上下文环境对象，那么就指向最外层对象 window。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/16021827-bbd21fc63a929fe7.png)

## 箭头函数的 arguments 指向其父级函数作用域的 arguments

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/16021827-808506906716ac37.jpg)

但是！箭头函数是没有 arguments 的，但是这个要怎么做到 arguments 的功能呢

就可以用剩余运算符

```js
let func = (...rest) => {
  console.log(rest)
  //[1,2,3]
}

func(1,2,3)
```

