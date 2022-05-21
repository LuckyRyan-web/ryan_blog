---
title: 实现一个异步的 sleep 函数
categories: 前端
tags:
  - JavaScript
---

## Promise

```js
const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

sleep(1000).then(() => {
    console.log(1)
})
```

## Generator

```js
function* sleepGenerator(time) {
    yield new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

sleepGenerator(1000)
    .next()
    .value.then(() => {
        console.log(1)
    })

```

## async await

```js
function sleep(time = 0) {
    return new Promise((resolve) => {
        let timeId = setTimeout(function () {
            resolve(timeId)
        }, time)
    })
}

await sleep(1000)

console.log("1")
```

## ES5

```js
function sleep(callback, time) {
    if (typeof callback === 'function') setTimeout(callback, time)
}

function output() {
    console.log(1)
}
sleep(output, 1000)
```

