---
title: 如何去除 img 元素底部的空白
categories: 前端
tags:
  - HTML
  - CSS
---

> 本文来源于https://www.jianshu.com/p/e7373c2bbef1
>
> 本文只写心得

## 什么是空白间隙

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1245223-0663c3d63243614d.png)

这个是 img 的默认样式引起的

用过 ps 文字工具的同学头知道，在使用文本工具中会出现如下的现象，字母或者汉字会超出那条基线

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1245223-d352b32f3623f453.png)

而在 CSS 中也有那条线，而且 inline 默认的垂直对齐方式 vertical-align 默认值是 baseline(基线对齐)，也是以**x 字母**的下方为基准。（在平面设计中，字体设计也同样基于这样的一个原则，x 的下方为基线）

![基准线问题](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/1245223-a1d7789ea88eef3f.png)

观察上方的代码，字体的大小直接影响着超出基线间隙，所以字体大小可以影响基线间隙。
 同时行内本身的`line-height`是会移动基线的（文字垂直居中可以通过 line-height 实现）。所以行高也是可以影响基线的位置

## 解决方法

知道底部间隙的原因是因为行内元素默认的垂直对齐方式为 baseline 造成的字体下方会有间隙，所以解决起来就挺好办了。一切的原因都是 inline 行内属性在作怪，只要对症下药即可。

### 第一种方法

修改 img 行内元素的垂直居中方式，让它不在以基线对齐。

```css
img {
    vertical-align: bottom;
}
```



### 第二种方法

```css
div {
    line-height: 0px;
}
```

### 第三种方法

修改 img 行内元素的字体大小，基线的下方间隙是部分字体超过基线下方而产生的，如果把父元素的`font-size`变的超小，基线的下方距离将忽略不计。

```css
div {
    font-size: 0px;
}
```

### 第四种方法

```css
img {
    display: block;
}

/* 浮动也可以让元素变成块级 */
img {
    float：left;
}

/* 只要能变成块级的属性都可以 */
...
```

