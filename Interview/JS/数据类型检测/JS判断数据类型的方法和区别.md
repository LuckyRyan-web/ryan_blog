---
title: JS 判断数据类型和方法的区别
categories: 前端
tags:
  - JavaScript
---

> 本文来源于：
>
> https://www.cnblogs.com/crackedlove/p/10331317.html
>
> https://segmentfault.com/a/1190000015264821
>
> 本文只添加个人理解

## JavaScript 总共有 7 种数据类型

`string、Boolean、Array、Object、Number、Null、undefined`

其中 Object 和 Array 是引用类型，其余的都是基本数据类型



## typeof

看看控制台输出什么

```js
console.log(typeof "");		//String	
console.log(typeof 1);		//number
console.log(typeof true);	//boolean
console.log(typeof null);	//object
console.log(typeof undefined);	//undefined
console.log(typeof []);		//object
console.log(typeof function(){});	//function
console.log(typeof {});		//object
console.log(typeof new Date())	//object
console.log(typeof new RegExp()) //object
```

可以看到，`typeof`对于基本数据类型判断是没有问题的，但是遇到引用数据类型（如：Array）是不起作用的。

准确的说 typeof 判断`‘boolean’、‘number’、’string’、‘function’`是靠谱的，但是如果是其他的数据类型就会出现不可预期的错误，比如说不能区分`object`类型的具体类型，比如 `Array` 、`Date` 以及`自定义类`，而对于`null`及数组、对象，typeof 均检测出为 object，不能进一步判断它们的类型。

针对`typeof`的软肋，我们有一些比较好的解决方式：

- 判断`Array` 要使用`Array.isArray(arr)`
- 判断`null`请使用`myVar === null`
- 判断某个全局变量是否存在用`typeof window.myVar=== ‘undefined’`
- 函数内部判断某个变量是否存在用`typeof myVar === ‘undefined’`

但是通过以上解决方法，我们还是没有办法判断 `typeof myVar === ‘undefined’`的时候具体是定义还是未定义

于是我们想出了另外一种解决方案，可以封装成一个函数：

```js
function isDefined(va) {
    //var va;
    //var va = null;
    //var va = 'xxxx';
    try{
        // 已经声明
        // 判断是否已经定义
        if (va === undefined){ 
        // 不能使用 ==，因为当 "var va = null;"时 被判定为未定义是错误的。
        //if (typeof  va === 'undefined'){  // 这种方式也是不可取的。
            // 未定义
            window.console && console.log("变量未定义.");
        }else {
            // 已经定义了，可能为null 
            window.console && console.log("变量已定义.");
        }
    } catch(e){
        // va 未声明
        window.console && console.log("变量未声明，");
    }
}
```

## instanceof

`instanceof` 本意是用来判断 A 是否为 B 的实例对象，表达式为：`A instanceof B`，如果 A 是 B 的实例，则返回`true`,否则返回`false`。 在这里需要特别注意的是：`instanceof`检测的是原型，那它是怎么检测的呢，我们用一段伪代码来模拟其内部执行过程：

```js
        instanceof(A, B) = {
            var L = A.__proto__;
            var R = B.prototype;
            if (L === R) {
                //A的内部属性__proto__指向B的原型对象
                return true;
            }
            return false;
        }
```

如果是用代码来实现的话

```js
function instance(left,right){
    let prototype = right.prototype;  //获取类型的原型
    let proto = left.__proto__;       //获取对象的原型
    while(true){    //循环判断对象的原型是否等于类型的原型，直到对象原型为null，因为原型链最终为null
       if (proto === null || proto === undefined){
           return false;
       }
       if (proto === prototype){
           return true;
       }
       proto = proto.__proto__;
     }
}
console.log(instance({},Object)); //true
console.log(instance([],Number)); //false
```

从上述过程可以看出，当 A 的`__proto__` 指向 B 的`prototype`时，就认为 A 就是 B 的实例对象，我们再来看几个例子

```js
console.log(bool instanceof Boolean);// false
console.log(num instanceof Number);// false
console.log(str instanceof String);// false
console.log(und instanceof Object);// false
console.log(arr instanceof Array);// true
console.log(nul instanceof Object);// false
console.log(obj instanceof Object);// true
console.log(fun instanceof Function);// true

var bool2 = new Boolean()
console.log(bool2 instanceof Boolean);// true

var num2 = new Number()
console.log(num2 instanceof Number);// true

var str2 = new String()
console.log(str2 instanceof String);//  true

function Person(){}
var per = new Person()
console.log(per instanceof Person);// true

function Student(){}
Student.prototype = new Person()
var haoxl = new Student()
console.log(haoxl instanceof Student);// true
console.log(haoxl instanceof Person);// true
```

从结果中看出`instanceof`不能区别`undefined`和`null`，而且对于基本类型如果不是用 new 声明的则也测试不出来，对于是使用 new 声明的类型，它还可以检测出多层继承关系。

## constructor

 当一个函数 F 被定义时，JS 引擎会为 F 添加 prototype 原型，然后在 prototype 上添加一个 constructor 属性，并让其指向 F 的引用，F 利用原型对象的 constructor 属性引用了自身，当 F 作为构造函数创建对象时，原型上的 constructor 属性被遗传到了新创建的对象上，从原型链角度讲，构造函数 F 就是新对象的类型。这样做的意义是，让对象诞生以后，就具有可追溯的数据类型。

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1523596-20190128175441624-282258963.png)

constructor 不能判断 undefined 和 null，并且使用它是不安全的，因为 contructor 的指向是可以改变的

## Object.prototype.toString.call

这个方法其实是最简单和最方便的

 `toString()`是`Object`的原型方法，调用该方法，默认返回当前对象的`[[Class]]`。这是一个内部属性，其格式为`[object Xxx]`,其中`Xxx`就是对象的类型。

 对于`Object`对象，直接调用`toString()`就能返回`[object Object]`,而对于其他对象，则需要通过`call、apply`来调用才能返回正确的类型信息，如下图

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200826192644293.png)

但是对于其他的对象，那么就要使用 call 或者是 this 来改变指向

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1523596-20190128180522674-291035001.png)
但是它不能检测非原生构造函数的构造函数名。

并且 jquery 上的`$.type`方法也是用`Object.prototype.toString.call()`的

## 封装一个准确判断数据类型的函数

```js
function getType(obj){
  let type  = typeof obj;
  if(type != "object"){
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
```

