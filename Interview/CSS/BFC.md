---
title: BFC、IFC、GFC、FFC 分别是什么
categories: 前端
tags:
- HTML
- CSS
---
## BFC、IFC、GFC、FFC

CSS2.1 中只有 BFC 和 IFC, CSS3 中才有 GFC 和 FFC。

到底什么是 BFC、IFC、GFC 和 FFC

## 什么是 FC

首先这些后面的 FC，指的是 Formatting Contexts，是 W3C 规范的一个概念，是页面中的一块渲染区域，并且有自己的渲染规则，决定了子元素的定位

## BFC

BFC(Block Formatting Contexts)直译为"块级格式化上下文"。Block Formatting Contexts 就是页面上的一个隔离的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此。如何产生 BFC？
float 的值不为 none。 
overflow 的值不为 visible。 
position 的值不为 relative 和 static。
display 的值为 table-cell, table-caption, inline-block 中的任何一个。 
那 BFC 一般有什么用呢？比如常见的多栏布局，结合块级别元素浮动，里面的元素则是在一个相对隔离的环境里运行。

BFC 是最多人问到的，因为这个设计到清除浮动的设计

### 如何触发 BFC

只需要元素满足以下任何一个都可以触发 BFC 的特性：

- body 跟元素
- 浮动元素：float 除了 none 以外的值
- 绝对定位的元素：position（absolute、fixed）
- display 为 inline-block、table-cells、flex（flex 其实也可以，但是 flex 就算是 FFC 的了，其实就是外部是 BFC，内部是 FFC）
- overflow 除了 visible 以外的值（hidden、auto、scroll）（脱离了文档流自动划分出去的区域）

其实总而言之，就是只要能脱落文档流的元素都能触发 BFC

### BFC 的特性

说了这么多，来演示一下 BFC 的特性

#### 清除外边距重叠

比如说在同一个的 BFC 下面，外边距是会自动发生折叠的

```html
<html>

<head>
    <style type="text/css">
        div {
            width: 100px;
            height: 100px;
            background: red;
            margin: 100px;
        }
    </style>
</head>

<body>
    <div></div>
    <div></div>
</body>
</html>
```

body 会创造一个 BFC 出来，所以两个正方形都在一个 BFC 下

理论上两个正方形的相隔应该是 200px，但是实际上只有 100px

![image-20200822171650076](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822171650076.png)

这个不是 css 的 bug，可以理解为一种规范，如果要避免外边距的折叠的话，那么就要设计成两个 BFC，将两个正方形放在不同的 BFC 容器里

如下代码所示，在父元素添加了一个 overflow: hidden;属性

```html
<html>

<head>
    <style type="text/css">
        .container {
            overflow: hidden;
        }

        p {
            width: 100px;
            height: 100px;
            background: red;
            margin: 100px;
        }
    </style>
</head>

<body>
    <div class="container">
        <p></p>
    </div>
    <div class="container">
        <p></p>
    </div>
</body>

</html>
```

![image-20200822171936989](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822171936989.png)

只要放在两个不同的 BFC 容器里，就可以避免外边距重叠的问题

#### BFC 可以包含浮动的元素（清除浮动）

经常做前端工作的人都知道，浮动的元素会脱离文档流，比如

```html
<body>
    <div style="border: 1px solid #000;">
        <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
    </div>
</body>
```

![image-20200822172625741](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822172625741.png)

这个会出现父元素的高度塌陷，也就是浮动元素会脱离正常的文档流，使得父元素不能计算子元素的高度

如果触发容器的 BFC，那么这个容器就会包含浮动元素，还是老样子加个`overflow: hidden;`元素

```html
<body>
    <div style="border: 1px solid #000;overflow: hidden;">
        <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
    </div>
</body>
```

![image-20200822172929059](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822172929059.png)



#### BFC 可以阻止元素被浮动元素覆盖

先看一个文字环绕的效果

```html
<body>
    <div style="height: 100px;width: 100px;float: left;background:lightblue;">
        我是一个左浮动的元素
    </div>
    <div style="width: 200px;height: 200px;background: #eeeeee;">
        我是一个没有设置浮动，也没有触发BFC的元素，width: 200px;height: 200px;
    </div>
</body>
```

![image-20200822173858691](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822173858691.png)

如果想设置成两个元素不被覆盖，可以设置第二个元素为 BFC，加入`overflow: hidden;`元素即可

```html
<body>
    <div style="height: 100px;width: 100px;float: left;background:lightblue;">
        我是一个左浮动的元素
    </div>
    <div style="width: 200px;height: 200px;background: #eeeeee;overflow: hidden;">
        我是一个没有设置浮动，也没有触发BFC的元素，width: 200px;height: 200px;
    </div>
</body>
```

![image-20200822174116656](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822174116656.png)

## IFC

IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC 的 line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 padding/margin 影响)
IFC 中的 line box 一般左右都贴紧整个 IFC，但是会因为 float 元素而扰乱。float 元素会位于 IFC 与与 line box 之间，使得 line box 宽度缩短。 同个 ifc 下的多个 line box 高度会不同。 IFC 中时不可能有块级元素的，当插入块级元素时（如 p 中插入 div）会产生两个匿名块与 div 分隔开，即产生两个 IFC，每个 IFC 对外表现为块级元素，与 div 垂直排列。
那么 IFC 一般有什么用呢？
水平居中：当一个块要在环境中水平居中时，设置其为`display:inline-block`则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。

### 实例

比如在 P 标签里面，里面是不可以去渲染块级元素的，想必大家都没有去在`<p>`标签里面去写块级元素的代码，他有自己的一套规则，这个规则就是 IFC，也就是行级元素上下文，如果强行这样设计的话，会出现什么结果呢？

```html
//这个是我的html代码
<body>
    <p>
        123
        <div></div>
        456
	</p>
</body>
```

但是渲染到浏览器上显示的结果却是

![image-20200822162739298](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/image-20200822162739298.png)

也就是说 div 把一个一个 IFC 的区域分割成两个 IFC 的区域

## GFC

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置`display值为grid`的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。 
那么 GFC 有什么用呢，和 table 又有什么区别呢？首先同样是一个二维的表格，但 GridLayout 会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

## FFC

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，`display值为flex`或者`inline-flex`的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少 safari 和 chrome 还是 OK 的，毕竟这俩在移动端才是王道。
Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。
伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

