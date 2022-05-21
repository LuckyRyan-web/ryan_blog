---
title: CSS 两列布局的 N 种实现
categories: 前端
tags:
  - CSS
---

## 一，什么是两列布局

两列布局分为两个，一种是垂直定宽，右侧自适应，另一种是两列都自适应（即纵向宽度由子元素决定，右侧补齐剩余空间）在 css 面试题里面属于常考题，也是一个前端开发工程师必须掌握的技能，下面将分别介绍实现方式。

## 二，顶端定宽，右侧自适应如何实现

### 1、双列直插式

原理：两个元素都设置 `dislpay：inline-block`，为了消除 HTML 空间的影响，父元素的字体大小需要设置为 0，正确匹配元素的宽度使用计算函数计算。如果两个元素的高度不一样，可以给元素设置 `vertical-align：top` 调整

缺点：由于父元素设置了 `font-size` 为 0，子元素内文字不会显示。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
       *{
         padding: 0;
         margin: 0;
       }
      .box{
        height: 600px;
        width: 100%;
        font-size:0;
      }
      .left{
        display: inline-block;
        width: 100px;
        height: 200px;
        background-color: red;
        vertical-align: top;

      }
      .right{
        display: inline-block;
        width: calc(100% - 100px);
        height: 400px;
        background-color: blue;
        vertical-align: top;
      }
</style>
  </head>
  <body>
    <div>
      <div>
        <span>1234</span>
      </div>
      <div>
        <span>1234</span>
      </div>
    </div>
  </body>
</html>
```
### 2、双浮动

原理：两个元素设置浮动，右侧自适应元素宽度使用 calc 函数计算

缺点：父元素需要清除浮动
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        padding: 0;
        margin: 0;
      }
      .box{
        height: 600px;
        width: 100%;

      }
      .left{
        float: left;
        width: 100px;
        height: 200px;
        background-color: red;
      }
      .right{
        float: left;
        width: calc(100% - 100px);
        height: 400px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div>
        <span>
          123adadadddddddddddddddddddddddddddddddddddddddd
        </span>
      </div>
      <div></div>
    </div>
  </body>
</html>
```

### 3、浮动+保证金

原理：预设定宽元素浮动，右侧自适应元素设置 `margin-left` 的值大于定宽元素的宽度即可

缺点：父元素需要清除浮动。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        padding: 0;
        margin: 0;
      }
      .box{
        height: 600px;
        width: 100%;

      }
      .left{
        float: left;
        width: 100px;
        height: 200px;
        background-color: red;
      }
      .right{
        margin-left: 100px;
        height: 400px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div>
        <p>1234</p>
      </div>
      <div>
        <p>1234</p>
      </div>
    </div>
  </body>
</html>
```
### 4、浮动+ BFC

原理：父元素设置溢出：隐藏，左侧定宽元素浮动，右侧自适应元素设置溢出：自动创建 BFC

缺点：前端元素的内容如果超过设定宽度会重叠到右侧元素上。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        padding: 0;
        margin: 0;
      }
      .box{
        height: 600px;
        width: 100%;
        overflow: hidden;
      }
      .left{
        float: left;
        width: 100px;
        height: 200px;
        background-color: red;
      }
      .right{
        overflow: auto;
        height: 400px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111111111111111111111111</div>
    </div>
    <div></div>
  </body>
</html>
```

### 5、绝对+左边距

原理：父元素相对定位，垂直元素绝对定位，右侧自适应元素设置 `margin-left` 的值大于定宽元素的宽度

缺点：父元素设置了相对定位
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        padding: 0;
        margin: 0;
      }
      .box{
        height: 600px;
        width: 100%;
        position: relative;
      }
      .left{
        position: absolute;
        width: 100px;
        height: 200px;
        background-color: red;
      }
      .right{
        margin-left: 100px;
        height: 400px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>
```
### 6、flex 布局

原理：父元素设置 `display：flex`，自适应元素设置 `flex：1`

缺点：存在兼容性问题，IE10 以下不支持

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        padding: 0;
        margin: 0;
      }
      .box{
        height: 600px;
        width: 100%;
        display: flex;
      }
      .left{
        width: 100px;
        height: 200px;
        background-color: red;
      }
      .right{
        flex: 1;
        height: 400px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>
```

## 三，左右两端元素都自适应

严格来说，并不算两个元素都是适应，只是将上面的定宽替换由子元素撑开而已
### 1、浮动+ BFC

原理和上面一样，只是稍微元素的宽度没有设置，由子元素撑开

### 2、table 布局

原理：父元素显示：表格，垂直元素外围用一个 div 包装，该 div 设置显示：表格单元格，宽度：0.1％（保证最小宽度），右侧元素内部设置 `margin-right`，右侧元素设置显示：`table-cell`。

缺点：IE7 及以下不支持，当 `display：tabletime，padding` 失效，父元素的 `line-height` 属性失效，当 `display：table-cell` 时，`margin` 无效。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      .parent{
        display: table;
        width: 100%;

      }
      .box{
        display: table-cell;
        width: 0.1%;
      }
      .left{
        margin-right: 20px;
        background-color: red;
        height: 200px;
      }    
      .right{
        display: table-cell;
        background-color: blue;
        height: 300px;
      }
</style>
  </head>
  <body>
    <div>
      <div>
        <div>126545453dddddddd453453453</div>
      </div>
      <div>12121</div>
    </div>
  </body>
</html>
```

### 3、flex 布局

原理，缺点同上面的 flex 布局

### 4、网格布局

原理：父元素设置显示：`grid，grid-template-columns：auto 1fr;`（这个属性定义列宽，auto 关键字表示由浏览器自己决定长度。fr 是一个相对尺寸单位，表示剩余空间做等分） `grid-gap：20px`（行间距）

缺点：兼容性太差，IE11 都不支持，谷歌 57 以上才可以。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      .parent{
        display:grid;
        grid-template-columns:auto 1fr;
        grid-gap:20px
      }  
      .left{
        background-color: red;
        height: 200px;
      }
      .right{
        height:300px;
        background-color: blue;
      }
</style>
  </head>
  <body>
    <div>
      <div>1111111111111111111111111</div>
      <div></div>
    </div>
  </body>
</html>
```
 
本文完~

> 参考文章
>
> [fly63 前端网:CSS 两列布局的 N 种实现](http://www.fly63.com/article/detial/9541)
