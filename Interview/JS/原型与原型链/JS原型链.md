---
title: JS 原型链面试题案例
categories: 前端
tags:
  - JavaScript
---

## 题目 1

问：三个打印出来的结果分别是什么

```JavaScript
    function Animal(name,color,like){
        this.name = name;
        this.color = color;
        this.like = like;
    }
    Animal.prototype = {
        eat: function(){
            console.log(this.name+'他是'+this.color+'喜欢'+this.like);
        }
    }
    var dog = new Animal('旺财','白色的','啃骨头')
    dog.eat();

    console.log(dog.__proto__ === Animal.prototype)
    console.log(dog.construct === Animal)
    console.log(Animal.prototype.construct === Animal)
```

### 答案

```plain
旺财他是白色的喜欢啃骨头
true
false
false
```

### 理由

`Animal.prototype` 一开始被赋值为 `{  eat: function }`，原型上的构造函数就丢失了

`dog.constructor` 从 `Animal` 原型上查找，查找不到，只能取 `Object.constructor`