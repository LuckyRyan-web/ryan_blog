---
title: JS 中 this 的指向问题
categories: 前端
tags:
  - JavaScript
---

## Javascript 的 this 用法

`this`是 JavaScript 语言的一个关键字，指向当前作用域的对象，接下来分几种场合来介绍

### 情况一 纯粹的函数调用

```javascript
var x = 6;
function demo() {
   console.log(this.x);
}
test();  // 6
```

此时的 x 就是全局变量

### 情况二 作为对象方法的调用

函数还可以作为某个对象的方法调用，这时`this`就指这个上级对象。

```JavaScript
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

### 情况三 作为构造函数调用

所谓构造函数，就是通过这个函数，可以生成一个新对象。这时，`this`就指这个新对象。

```JavaScript
function test() {
　this.x = 1;
}

var obj = new test();
obj.x // 1
```

运行结果为 1。为了表明这时 this 不是全局对象，我们对代码做一些改变：

```JavaScript
var x = 2;
function test() {
  this.x = 1;
}

var obj = new test();
x  // 2
```

运行结果为 2，表明全局变量`x`的值根本没变。

### 情况四 apply 调用

`apply()`是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时`this`指的就是这第一个参数。

```JavaScript
var x = 0;
function test() {
　console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply() // 0
```

`apply()`的参数为空时，默认调用全局对象。因此，这时的运行结果为`0`，证明`this`指的是全局对象。

如果把最后一行代码修改为

```JavaScript
obj.m.apply(obj); //1
```

运行结果就变成了`1`，证明了这时`this`代表的是对象`obj`。