---
title: instanceof 的原理
categories: 前端
tags:
  - JavaScript
---

## instanceof 的原理

## 案例

对于 JavaScript 判断类型的四个方法的优缺点可以看这篇[文章](http://47.94.172.185/interview/my/JS%E5%88%A4%E6%96%AD%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%96%B9%E6%B3%95%E5%92%8C%E5%8C%BA%E5%88%AB.html#typeof)

`typeof`判断引用类型的时候，无论是什么都会返回 Object，需要知道具体是什么对象的话，就需要掌握原理，这个时候就要用到`instanceof`

这里看看一段代码

```js
const a = 'abc';
console.log(a instanceof String); // false

const b = new String('abc');
console.log(b instanceof String); // true
```



```js
console.log(String instanceof String);  // false
console.log(Object instanceof Object);  // true
console.log(Function instanceof Function); // true
console.log(Function instanceof Object); // true
```



## instanceof 是如何工作的

在 MDN 上是这样描述 `instanceof` 的：

> 方法 `instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象原型链中的任何位置

> 换句话说，如果`A instanceof B`，那么 `A` 必须是一个对象，而 `B` 必须是一个合法的 JavaScript 函数。在这两个条件都满足的情况下：

> 判断 `B` 的 `prototype` 属性指向的原型对象`(B.prototype)`是否在对象 `A` 的原型链上。
>
> 如果存则为 `true`；如果不在，则为 `false`。

下面我们举一个例子一步步来说明：

```js
function Person() {} 
const p1 = new Person();

p1 instanceof Person; // true
```

下面图解：

第一步：每一个构造函数都有一个 `prototype` 属性

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874477)

第二步：这个 `prototype` 属性指向这个构造函数的原型对象

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874478)

第三步：通过 `new` 关键字，可以创建一个构造函数的实例(这里是 `p1`)，而实例上都有一个 `__proto__` 属性

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874479)

第四步：实例上的 `__proto__` 属性也指向构造函数的原型对象，这样我们就可以得到一张完整的关系图了

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874480)

第五步：`p1 instanceof Person` ，检查 `B(Person)` 的 `prototype` 属性指向的原型对象，是否在对象 A(p1) 的原型链上。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874481)

经过我们的一步步分解，发现 B(Person) 的 `prototype` 所指向的原型对象确实在 A(p1) 的原型链上，所以我们可以确定 `p1 instanceof Person` 一定是为 `true` 的。

我们再深入一点会发现，不仅仅 `p1 instanceof Person` 为 `true` ，`p1 instanceof Object` 也为 `true` ，这又是为什么呢？

其实，`Person` 的原型对象上也有一个 `__proto__` 属性，而这个属性指向 `Object` 的 `prototype` 属性所指向的原型对象，我们可以在控制台打印一下：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874482)

既然有这个关系，那我们再完善一下上面的图：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874483)

通过 `Person` 的例子，我们知道构造函数 `Object` 上的 `prototype` 属性会指向它的原型对象：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874484)

现在，我们要判断 `p1 instanceof Object` 的真假，还记得上面的定义么？我们再来一遍：

> 判断 B 的 prototype 属性指向的原型对象(B.prototype)是否在对象 A 的原型链上。
>
> 如果在，则为 true；如果不在，则为 false。

此时，我们发现 B(Object) 的 `prototype` 属性所指向的原型对象依然在 A(p1) 的原型链上，所以结果为 `true` 。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1460000018874485)

通过上面的例子我们可以知道，其实 `instanceof` 的原理非常简单，就是一个查找原型链的过程，所以只要你理解了原型链的相关知识，理解 `instanceof` 的原理就不会再有问题了。这里我们稍微总结两点与`instanceof` 有关的原型链知识：

1. 所有 JavaScript 对象都有 `__proto__` 属性，只有 `Object.prototype.__proto__ === null` ；
2. 构造函数的 `prototype` 属性指向它的原型对象，而构造函数实例的 `__proto__` 属性也指向该原型对象；



## 如何实现一个 instanceof

根据上面的例子，可以很容易推断出`instanceof`的实现方式

```js
function instance_of(left, right) {
  //left就是等号左边的变量，rigiht就是等号右边的变量
  const RP = right.prototype; // 构造函数的原型
  while(true) {
    if (left === null) {
      return false;
    }
    if (left === RP) { // 一定要严格比较
      return true;
    }
    left = left.__proto__; // 沿着原型链重新赋值
  }
}
```

有了上面的实现方法，我们再解释一下上面的例子：

```js
function Person() {}
const p1 = new Person();
p1 instanceof Object; // 用上面的代码解释它
```

**第一次赋值**

```js
left = p1
right = Object
RP = Object.prototype
```

**第一次判断**

`left !== null` 并且 `left !== RP` ，继续向上寻找 `left` 的原型链，准备新的赋值。

**第二次赋值**

```js
left = p1.__proto__ = Person.prototype
```

**第二次赋值判断**

`left !== null` 并且 `left !== RP` ,继续向上寻找`left`的原型链，准备新的赋值

**第三次赋值**

`left !== null` ,此时`left === RP` ，返回 true，函数执行完毕，跳出 while 循环

