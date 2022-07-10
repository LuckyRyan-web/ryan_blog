---
title: 链表解法
id: linkList_intro
---

## JS 与 链表

JavaScript 中是没有链表这个数据结构的，但是可以用对象来代替

JavaScript 的原型链也可以看作是一个链表，只不过原型链是通过 `__proto__`，而链表的表示是一个 next

## 实践

可以拿 JSON 来描述链表的数据结构

```ts
const json = {
    a: {
        b: {
            c: 1
        }
    },
    d: {
        e: 2
    }
}

// path 表示遍历的路径
const path = ['a', 'b', 'c']

let p = json

path.forEach((v) => {
    p = p[v]
})
```

## 分类列表
```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```