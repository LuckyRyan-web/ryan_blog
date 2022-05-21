---
title: JS 继承
categories: 前端
tags:
  - JavaScript
---

## 题目 1

```JavaScript
        function createPerson(name, age, job) {
            var o = new Object()
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayNmae = function () {
                console.log(this.name);
            };
            return o;
        }
        var person1 = createPerson('Ryan', 29, 'teacher');

        console.log(person1 instanceof createPerson)
```

问：输出的结果是什么

### 答案

打印出来`false`

### 理由

先看一个案例：

```javascript
        function createPerson1(name, age, job) {
            var o = new Object()
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayNmae = function () {
                console.log(this.name);
            };
            return o;
        }

        function createPerson2(name, age, job) {
            var o = new Object()
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayNmae = function () {
                console.log(this.name);
            };
        }

        var person1 = createPerson1('Ryan', 29, 'teacher');
        var person2 = new createPerson2('Ryan', 29, 'teacher');

        console.log(person1)							//返回对象O
        console.log(person1 instanceof Object)			//true，因为对象O就是一个Object
        console.log(person1 instanceof createPerson1)	//false，因为person1不是他的实例

        console.log(person2 instanceof createPerson2)	//true
```

官方的解释如下：

> `instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

return 是把`O`返回给`person1`，`O`本身就是一个对象，所以`person1 instanceof Object` 是 true，并且`person1.__proto__ === Object.prototype`是为 true

因为`person1`的原型链上没有`createPerson` ，所以`person1 instanceof createPerson` 是 false

`createPerson`是一个函数，返回的`O`是一个是一个对象，`person1`相当于调用这个函数的意思，所以返回的是对象`O`而不是对象的实例，所以返回的是 false



如果是`person2 instanceof createPerson2`的话，这个结果就为 true，因为 new 实例化出来的对象就是属于`createPerson2`

如果`person2`有一个`return O`的话，那么结果就会跟`person1`一样，无论是否有 new，如下结果

```JavaScript
        function createPerson(name, age, job) {
            var O = new Object()
            O.name = name;
            O.age = age;
            O.job = job;
            O.sayNmae = function () {
                console.log(this.name);
            };
            return O;
        }
        var person1 = new createPerson('Ryan', 29, 'teacher');
        var person2 = createPerson('Ryan', 29, 'teacher');

        console.log(person1)    //返回对象O
        console.log(person2)    //返回对象O
        
```

因为返回的是对象`O`，那么`new O`是没有作用的