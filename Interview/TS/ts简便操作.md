---
title: typescript 中的 `?:` 和 `?.` 是什么意思？
categories: 前端
tags:
  - typescript
  - Vue
---

**`??`**

`??` 和 `||` 的意思有点相似，但是又有点区别,`??` 相较 `||` 比较严谨, 当值等于 0 的时候 `||` 就把他给排除了，但是 `??` 不会

```ts
console.log(null || 5)   //5
console.log(null ?? 5)     //5

console.log(undefined || 5)      //5
console.log(undefined ?? 5)      //5

console.log(0 || 5)       //5
console.log(0 ?? 5)      //0
```

**`?.`**

`?.` 的意思基本和 `&&` 是一样的 `a?.b` 相当于 `a && a.b ? a.b : undefined`

```ts
const a = {
      b: { c: 7 }
};
console.log(a?.b?.c);     //7
console.log(a && a.b && a.b.c);    //7
```

> 本文来源于: [思否](https://segmentfault.com/a/1190000038782759)
