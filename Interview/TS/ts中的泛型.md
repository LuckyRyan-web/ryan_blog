---
title: typescript 中 泛型的使用
categories: 前端
tags:
  - typescript
  - Vue
---

## 泛型的使用

如果输入的值得类型不确定，使用 any 的话，就会出现一个 bug

```ts
function echo(args: any): any {
    return args
}
const result: string = echo(123)
```

即便是上述这样的程序也不会报错，因为返回的值也是 any 类型

但是上述这样做的就很不合理，因为输入的是 number 类型，但是返回的是 string 类型

此时需要的程序是输入的是什么类型，返回的就是什么类型

此时泛型的作用就来了

```ts
function echo<T>(args: T): T {
    return args
}

const result = echo(123)
```

T 的作用只是一个占位符，不管用户输入的是什么，返回的也一定要是这个值

比如下面的两个类型的值相互转换

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

const result2 = swap(['string', 123])
```

此时就不必定义两个类型来确定返回值，使用泛型就可以方便的定义

## 泛型的约束

如果是在函数里面，是要使用到形参的一个方法，比如输入的是一个数组，我要使用数组的 `.length` 方法，但是泛型 T 不一定是数组

```ts
function echoWithArray<T>(args: T): T {
    console.log(args.length)
    return args
}
```

如上面的代码所示，在编辑器肯定会报类型错误的，当然可以投机取巧的这样做

```ts
function echoWithArray<T>(args: T[]): T[] {
    console.log(args.length)
    return args
}
```

但是 string 类型和 Object 类型都是有 length 方法的，上述的代码又限定死了

此时可以定义一个类型

```ts
interface IWithLength {
    length: number
}

function echoWithArray<T extends IWithLength>(args: T): T {
    console.log(args.length)
    return args
}
```

上述代码的意思也就是看看输入的变量有没有 length 这个属性，如果没有编辑器就报错

```ts
interface IWithLength {
    length: number
}

function echoWithArray<T extends IWithLength>(args: T): T {
    console.log(args.length)
    return args
}

echoWithArray('123')

echoWithArray({ length: 1 })

echoWithArray([1, 2, 3])
```

## 泛型在类中的使用

```ts
class Queue<T> {
    private data = []
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.pop()
    }
}

const queue = new Queue<number>()
queue.push(1)
```
