---
title: 如何防止 promise 的链式调用
categories: 前端
tags:
  - JavaScript
---

## 如何阻止 promise 的链式调用

现在有这么一段代码

```js
        let p = new Promise((resolve, reject) => {
            resolve();
        })

        p.then(data => {
            console.log(data);
            return 'step2';
        }).then(data => {
            console.log(data);
            return 'step3';
        }).then(data => {
            console.log(data);
            return 'step4';
        }).catch(reason => {
            console.log(reason);
        }).finally(() => {
            console.log('finished.');
        });
```

这样的确是可以调用，但是很不美观，而且链式调用的链一长就难以维护

那么如何去解决这个问题呢

