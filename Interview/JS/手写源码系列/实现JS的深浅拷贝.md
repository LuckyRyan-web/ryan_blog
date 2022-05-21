---
title: 如何实现 JS 的深拷贝与浅拷贝
categories: 前端
tags:
  - JavaScript
---

## 浅拷贝

浅拷贝就是只是复制值，但是指向的内存地址还是一样的

一般情况下，使用 “=” 可以实现赋值。但对于[数组](http://caibaojian.com/t/数组)、对象、函数等这些引用类型的数据，这个符号就不好使了。本文讲解利用 js 原生已实现的方法，我们就可以不用自己写循环实现数组的拷贝复制。

先举个例子：

原数组为`let array1 = [1,'a',true,null,undefined];`

### slice()方法

```js
let c1 = array1.slice();
```

### concat()方法

```js
let cc1 = array1.concat();
```

### from()方法

```js
let fc1 = Array.from(array1);
```

### push()方法

```js
let pc1 = [];
Array.prototype.push.apply(pc1,array1);
```

### map()方法

```js
let mc1 = array1.map(function(item){
    return item;
    });
```

### ES6 的解构语法

```js
let a = {age:1}

let b = {...a}

```

以上几种方法都能实现数组的`浅拷贝`，即数组的每一项只能是原始类型的数据，如果数组的项包含引用类型，如数组（即 js 中的二维数组），对象等，以上方法复制的项只是引用。


### 简单的引用复制

```js
        function shallowClone(copyObj) {
            var obj = {};
            for (var i in copyObj) {
                obj[i] = copyObj[i];
            }
            return obj;
        }
        var x = {
            a: 1,
            b: {
                f: {
                    g: 1
                }
            },
            c: [1, 2, 3]
        };
        var y = shallowClone(x);
        console.log(y.b.f === x.b.f); // true
```

### Object.assign()

`Object.assign()` 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

```js
        var x = {
            a: 1,
            b: {
                f: {
                    g: 1
                }
            },
            c: [1, 2, 3]
        };
        var y = Object.assign({}, x);
        console.log(y.b.f === x.b.f); // true
```



### 结论

但是经过测试，当数组大小超过 1000000 时，push 方式就挂了，报错：`Maximum call stack size exceeded`

webkit 浏览器使用 cocat().非 webkit 使用 slice()。

## 深度拷贝

深度拷贝就是内存地址都不一样了

### JSON 方法

```js
        var arr1 = [1, 2, [3, 4], {
                a: 5,
                b: 6
            }, 7];
        var arr2 = JSON.parse(JSON.stringify(arr1));

        console.log(arr1, arr2);    //[1, 2, [3,4], {a: 5, b: 6}, 7]   [1, 2, [3,4], {a: 5, b: 6}, 7]
        arr2[1] = 10;
        arr2[3].a = 20;
        console.log(arr1[1], arr2[1]);  //2 10
        console.log(arr1[3], arr2[3]);  //{a: 5, b: 6} {a: 20, b: 6}
```

此方法存在对古老浏览器的兼容性问题。如确需要作兼容，可引入如下兼容文件解决：

https://github.com/douglascrockford/JSON-js/blob/master/json2.js

**注意：**如果数组值为函数，上述方法还是不行的，如`Date、Function、RegExp`等对象都不行

并且这种方法可以变相的实现`深拷贝`,但是这种方法也有其限制：

- 首先，数组中的项如果是`undefined`，那么转换后将变为`null`
- 如果数组的项为对象，那么对象之间不可相互引用。会造成循环引用，无法 JSON 序列化。

### JSON 方法的改进

全部思路的代码为：

```js
function deepClone(obj) {
    let copy

    if (typeof obj !== 'object') {
        return obj
    }


    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    if (obj instanceof Array) {
        copy = []
        for (let val of obj) {
            if (typeof val === 'object') {
                copy.push(deepClone(val))
            } else {
                copy.push(val)
            }
        }
        return copy
    }

    if (obj instanceof Object) {
        copy = {}
        for (let key in obj) {
            if (obj[key] instanceof Object) {
                copy[key] = deepClone(obj[key])
            } else {
                copy[key] = obj[key]
            }
        }
        return copy
    }

    if (obj instanceof Date) {
        copy = new Date()
        copy.setTime(obj.getTime())
        return copy
    }

    if (obj instanceof Function) {
        copy = function () {
            return obj.apply(this, arguments)
        }
        return copy
    }
}

```

### 深度复制的完全实现

```js
//方法的实现
Object.prototype.clone = function () {
    var o = {};
    for (var i in this) {
        o[i] = this[i];
    }
    return o;
};
Array.prototype.clone = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++)
        if (typeof this[i] !== 'object') {
            arr.push(this[i]);
        } else {
            arr.push(this[i].clone());
        }
    return arr;
};
```

测试代码：

```js
        //测试1 Object
        var obj1 = {
            name: 'Rattz',
            age: 20,
            hello: function () {
                return "I'm " + name;
            }
        };
        var obj2 = obj1.clone();
        obj2.age++;
        console.log(obj1.age);  //20
        console.log(obj2.age);  //21

        //测试2 Array
        var fun = function (log) {
                console.log
            },
            arr1 = [1, 2, [3, 4], {
                a: 5,
                b: 6
            }, fun],
            arr2 = arr1.clone();

        console.log(arr1, arr2);

        arr2[2][1] = 'Mike';
        arr2[3].a = 50;
        arr2[4] = 10;
        console.log(arr1, arr2);
```

### [jQuery](http://caibaojian.com/jquery/) 的 extend

如果你在使用 jQuery，那么最简单的方法是使用 extend 插件方法。示例：

```js
var arr1 = [1, 2, [3, 4], {a: 5, b: 6}, 7],
arr2 = $.extend(true, [], arr1);

console.log(arr1, arr2);
arr2[1] = 10;
console.log(arr1, arr2);
```

> 本文参考于
> 
> 作者：yck
> 
> 链接：https://juejin.cn/post/6844904021627502599
> 
> 来源：掘金
