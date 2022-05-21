---
title: promise 如何解决多个异步回调问题
categories: 前端
tags:
  - JavaScript
---

首先题目如下：

我先要取得用户名`getUserName()`，才能去获取用户信息`getUser()`

也就是说`getUserName()`需要在`getUser()`之前

## promise.all

```js
        function getUserPromise(promiseX, promiseY) {
            return Promise.all([promiseX, promiseY])
                .then(values =>
                    // 返回的values由 promiseX 与 promiseY返回的值所构成的数组。
                    values
                )
        }

        function getUserName() {
            let data = 'superman';
            return new Promise((resolve, reject) => {
                setTimeout(resolve(data), 1000);
            })
        }

        function getUser() {
            let data = {
                id: 1,
                username: 'superman',
                gender: 'male'
            }
            return new Promise((resolve, reject) => {
                setTimeout(resolve(data), 2000);
            })
        }
        
        getUserPromise(getUserName(), getUser())
            .then(data => {
                // 这里的data就是包含了getUserName 和 getUser返回值所组成的数组
                console.log(data); // [ 'superman', { id: 1, username: 'superman', gender: 'male' } ]
            })
```

这个方法其实就是设置延时，然后 promise.all 调用

## promise 链式调用

```js
        function getUserName() {
            let data = 'superman';
            return new Promise((resolve, reject) => {
                setTimeout(resolve(data), 4000);
            })
        }

        function getUser(username) {
            let data = {
                id: 1,
                username: 'superman',
                gender: 'male'
            }
            return new Promise((resolve, reject) => {
                if (username) {
                    setTimeout(resolve(data), 2000);
                } else {
                    reject('err');
                }
            })
        }
        getUserName().then(username => {
                return getUser();
            })
            .then(user => {
                console.log(user);
            })
            .catch(err => {
                console.log(err);
            })
```

