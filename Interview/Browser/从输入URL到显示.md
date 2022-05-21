---
title: 要把 URL 变网页，一共分几步？（简略版）
categories: 前端
tags:
  - 浏览器
---

这个是常见的面试题

## HTTP 的请求到响应过程

简单的说就是

1. DNS 解析
2. TCP 连接
3. HTTP 的请求
4. HTTP 的响应
5. 页面的渲染（HTML 解析 CSS 渲染）
6. JS 解析执行
7. TCP 连接关闭

而在第三步到第五步就是浏览器渲染的过程，这两部简单的说就是

1. 浏览器使用 HTTP 或者 HTTPS 向服务器发起请求
2. 解析服务器返回的 HTML 代码，构建 DOM 树
3. 计算 DOM 上的 CSS 属性
4. 根据 CSS 的属性对元素逐个渲染，得到内存中的位图
5. 合成完毕之后再进行界面的渲染


![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/oB4EfO.jpg)

>需要注意的是，从 HTTP  请求回来开始，这个过程并非一步做完再做下一步，而是一条流水线，产生了流式的数据，后续的 DOM 树 构建、 CSS  计算、渲染、合成、绘制，都是尽可能地流式处理前一步的产出：即不需要等到上一步骤完全结束，就开始处理上一步的输出，这样我们在浏览网页时，才会看到逐步出现的页面。

那么得到的 HTML 代码是如何渲染成我们所看到的界面的呢？

## 第一阶段：从 HTML 代码构造成完整的 DOM 树

那么从请求返回的 HTML 代码是如何渲染到页面上的呢

这里以 webkit 为例，具体可以分为两步

1. 网页加载过程：从 URL 到构建 DOM 树，过程如下图：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/jlf2H2.jpg)


2. 网页渲染过程：从 DOM 树到页面图像，过程如下图

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/20200629174505)

详细步骤如下：

1. 用户输入 URL 到网页，webkit 调用资源加载器加载 返回的 HTML 代码

2. 加载器依赖网络模块建立连接，发送请求并接收答复

3. webkit 接收到各种网页或者资源的数据，其中某些资源可能是同步或异步获取的

4. 网页被交给 HTML 解释器转换成一系列的词语

5. 解释器根据词语创建节点，形成 DOM 树

6. 如果节点是 Javascript 代码的话，调用 JavaScript 解释器并执行（JavaScript 代码可能会修改 DOM 树的结构）

7. 如果节点依赖其他资源如图片，视频等，调用资源加载器来加载他们，但这些请求是异步的，不会阻塞当前 DOM 树的继续创建。但是，如果是 JavaScript 资源，则当前 DOM 树停止创建，直到对应的 JavaScript 资源被加载并被执行后才继续创建。

## 第二阶段：从 DOM 树构造成 Webkit 绘图上下文

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/20200629174520)

具体步骤如下：

1. CSS 文件被解释器解释成内部表示结构

2. CSS 解释器工作完之后，在 DOM 树上附加解释后的样式信息，这就是 RenderObject 树

3. RenderObject 节点在创建的同时，Webkit 会根据网页的层次结构创建 RenderLayer 树，同时构建一个虚拟的绘图上下文。

4. 在网页存续期间：DOM 树，RenderObject 树，RenderLayer 树，绘图上下文一直都会存在，直到网页被销毁。

5. 最后根据绘图上下文生产最终的图像，这一过程主要依赖 2D 和 3D 图形库

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/nLq9Rz.jpg)


在看 chrome 渲染的时候，发现页面一共有 3 个事件点，`first paint`，`DOMContentLoaded`，`onLoad`。`fisrt paint` 就是所谓的首屏时间

[first paint 详述](https://www.cnblogs.com/hongrunhui/p/8929001.html)