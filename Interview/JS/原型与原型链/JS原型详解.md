---
title: JS 原型详解
categories: 前端
tags:
  - JavaScript
---

:::tip
本文参考于[阮一峰老师的文章 1](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html) 和[文章 2](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)的心得

部分参考[此文章](https://segmentfault.com/a/1190000017254949)

部分内容引用于此篇文章
:::

## 原型链设计的初衷

众所周知，JavaScript 是 Netscape（网景）公司的 Brendan Eich 设计的，当时受 C++和 Java 的影响，JavaScript 也必须更新迭代。

如果真的是一种简易的脚本语言，其实不需要有"继承"机制。但是，Javascript 里面都是对象，必须有一种机制，将所有对象联系起来。所以，Brendan Eich 最后还是设计了"继承"。

但是，他不打算引入"类"（class）的概念，因为一旦有了"类"，Javascript 就是一种完整的面向对象编程语言了，这好像有点太正式了，而且增加了初学者的入门难度。

他考虑到，C++和 Java 语言都使用 new 命令，生成实例。

C++的写法是：

```c++
ClassName *object = new ClassName(param);
```

Java 的写法是：

```java
Foo foo = new Foo();
```

因此，他就把 new 命令引入了 Javascript，用来从原型对象生成一个实例对象。但是，Javascript 没有"类"，怎么来表示原型对象呢？

这时，他想到 C++和 Java 使用 new 命令时，都会调用"类"的构造函数（constructor）。他就做了一个简化的设计，在 Javascript 语言中，new 命令后面跟的不是类，而是构造函数。

举例来说，现在有一个叫做 DOG 的构造函数，表示狗对象的原型。

```javascript
　　function DOG(name){

　　　　this.name = name;

　　}
```

对这个构造函数使用 new，就会生成一个狗对象的实例。

```javascript
　　var dogA = new DOG('大毛');

　　alert(dogA.name); // 大毛
```

### new 运算符的缺点

但是有个问题出现了，用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。

比如，在 DOG 对象的构造函数中，设置一个实例对象的共有属性 species。

```javascript
　　function DOG(name){

　　　　this.name = name;

　　　　this.species = '犬科';

　　}
```

然后，生成两个实例对象：

```JavaScript
　　var dogA = new DOG('大毛');

　　var dogB = new DOG('二毛');
```

这两个对象的 species 属性是独立的，修改其中一个，不会影响到另一个。

```JavaScript
　　dogA.species = '猫科';

　　alert(dogB.species); // 显示"犬科"，不受dogA的影响
```

每一个实例对象，都有自己的属性和方法的副本。这不仅无法做到数据共享，也是极大的资源浪费。

### prototype 属性的引入

考虑到这一点，Brendan Eich 决定为构造函数设置一个 prototype 属性。

这个属性包含一个对象（以下简称"prototype 对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。

实例对象一旦创建，将自动引用 prototype 对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

还是以 DOG 构造函数为例，现在用 prototype 属性进行改写：

```JavaScript
　　function DOG(name){

　　　　this.name = name;

　　}

　　DOG.prototype = { species : '犬科' };


　　var dogA = new DOG('大毛');

　　var dogB = new DOG('二毛');


　　alert(dogA.species); // 犬科

　　alert(dogB.species); // 犬科
```

现在，species 属性放在 prototype 对象里，是两个实例对象共享的。只要修改了 prototype 对象，就会同时影响到两个实例对象。

```JavaScript
　　DOG.prototype.species = '猫科';


　　alert(dogA.species); // 猫科

　　alert(dogB.species); // 猫科
```

### 总结

由于所有的实例对象共享同一个`prototype`对象，那么从外界看起来，`prototype`对象就好像是实例对象的原型，而实例对象则好像"继承"了`prototype`对象一样。

## 原型链

在 JS 中，每个对象都有自己的原型。当我们访问对象的属性和方法时，JS 会先访问对象本身的属性和方法。如果对象本身不包含这些属性和方法，则访问对象对应的原型。

所谓的原型链，即原型链条。它是由原型、原型的原型、原型的原型的原型...这一规则组合成的，经常被应用于继承。

下面来看一个例子：

```JavaScript
function Person(name,age){
    // 对象自身的属性
    this.name = name;
    this.age = age;
    
    // 对象自身的方法
    this.sayName = function(){
        alert(this.name);
    };
}

//原型上的方法
Person.prototype.sayAge = function(){
    console.log(this.age);
}

var xiaoming = new Person("XiaoMing",12);
var xiaoHong = new Person("XiaoHong",11);

// 调用自身不存在的方法
xiaoming.sayAge(); // 12
xiaoHong.sayAge(); // 11
```

此题的图解如下：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/3301668477-5c073bc092c15_articlex)

调用的方法是在原型上，而不是在自身的对象上

### 原型链的原理

原型自身也是一个对象（默认情况下所有对象都是 Object 的实例)。

```JavaScript
console.log(xiaoming instanceof Object); // true
console.log(Person.prototype instanceof Object); // true
```

每个对象都有自己的原型，所以`Person`的原型也有它自己的原型，那就是：`Object.prototype`(部分浏览器允许通过实例的`“__proto__”`属性访问其原型)

```javascript
console.log(Person.prototype.__proto__ === Object.prototype); //true
```

既然原型是一个对象，那么，当我们访问的属性和方法在原型不存在，就会继续访问原型的原型，直至`Object.prototype`。

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name);
    };
}
Person.prototype.sayAge = function(){
    alert(this.age)
}

// 在Object.prototype增加一个“自我介绍”的方法
Object.prototype.introduce = function(){
    console.log(this.name+"My name is " + this.name + ",I'm " + this.age + " years old!")
}

var xiaoming = new Person("XiaoMing",12);
// 调用对象自身和原型上均不存在的方法
xiaoming.introduce(); // My name is XiaoMing,I'm 12 years old!
```

此题图解

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/bVbkAT4)

### 总结

原型链是 JS 的一个特性，它实现的核心机制是：

1. 访问对象的属性(方法)时，若对象本身不存在该属性(方法)，则会转向访问该对象的原型；
2. 对象的原型也是一个对象。访问的属性(方法)依旧不存在于该原型，则会继续访问该原型的原型...