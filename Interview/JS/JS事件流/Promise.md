---
title: 写出 promise 的构造函数
categories: 前端
tags:
  - JavaScript
---

```javascript
var promise=new Promise(
    function (resolve,reject) {
    if("异步处理成功"){
        resolve ();
    }else{
        reject();
    }

});
promise.then(
    function A () {
        console.log("事件处理成功时的操作")
    },
    function B() {
        console.log("事件处理失败时的操作")
    }
)
```

> 本题详解https://www.jb51.net/article/111741.htm
>
> `promise`其实就是一个对象，跟`JavaScript`的其他对象一样的；其次`promise`起到一个代理的作用，`充当异步操作与回调函数之间的中介`，它使得异步操作具备同步操作的接口，使得程序具备正常的同步运行的流程，回调函数不必再一层层嵌套。