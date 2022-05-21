---
title: JS 加载的方式
categories: 前端
tags:
  - JavaScript
---

## 同步加载

这个方法就是常用的吧 script 标签放在 body 底下，如果 js 中有输出 document 内容、修改 dom、重定向等行为，就会造成页面堵塞

所以一般建议把`<script>`标签放在`<body>`结尾处，这样尽可能减少页面阻塞

## 异步加载

异步加载主要有三种方式

### （1）async

async 表示异步操作，如果浏览器遇到带有 async 属性的 script 的时候，请求该脚本的网络请求是异步的，网络请求回来之后，如果 HTML 解析还没有完成，浏览器就会暂停解析，先让 JS 脚本执行代码（如 DOM 操作等），执行完毕后再继续 HTML 解析，如下图：

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/99xtWL.jpg)

当然如果是该脚本执行完毕，且 HTML 代码解析完成，那么就立即执行 JS 脚本代码，如下图

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/Bmvlwb.jpg)

::: tip
由于带有 async 的 script 脚本执行之间不定，如果是 DOM 操作，那么有可能执行的时候这个 DOM 还没有被渲染。

如果有多个 async 的时候，执行的顺序也不一定，所以 async 脚本一般是用于不依赖于其他库的，如百度分析、谷歌分析等
:::

### （2）defer

- 只支持 IE
- defer 属性规定是否对脚本执行进行延迟，直到页面加载为止。有的 javascript 脚本 document.write 方法来创建当前的文档内容，其他脚本就不一定是了。
- 如果您的脚本不会改变文档的内容，可将 defer 属性加入到 页面

```html
<script type="text/javascript" defer="defer"> 
    alert(document.getElementById("p1").firstChild.nodeValue); 
</script>
```

### （3）创建 script，插入到 DOM 中，加载完毕后 callBack

```javascript
function loadScript(url, callback){ 
    var script = document.createElement_x("script") 
    script.type = "text/javascript"; 
    if (script.readyState){ //IE 
        script.onreadystatechange = function(){ 
            if (script.readyState == "loaded" || script.readyState == "complete"){ 
                script.onreadystatechange = null; 
                callback(); 
            } 
        }; 
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function(){ 
            callback(); 
        }; 
    } 
    script.src = url; 
    document.body.appendChild(script); 
}
```
## 兼容性

上面说的 async 和 defer 有些脚本会两个都写，因为 async 在 IE<=9 的时候不支持，但是 defer 在 IE<=9 的时候支持，但是会有 bug ，所以两个属性都写上是为了在 async 不起作用的时候使用 defer

## 总结

| script 标签 | JS 执行顺序 |是否阻塞解析 HTML |
| :-----| ----: | :----: |
| `<script>` | 在 HTML 中的顺序 | 阻塞 |
| `<script async>`| 网络请求返回顺序 | 可能阻塞，也可能不阻塞 |
| `<script defer>`| 在 HTML 中的顺序 | 不阻塞 |

## chrome 的优化

当然，上面的总结都是理论化的，浏览器会对此作出优化，来看看 chrome 是如何做的

::: tip

1. 当用户输入网页 URL 的时候，WebKit 调用其资源加载器加载该 URL 对应的网页。
        
2. 加载器依赖网络模块建立连接，发送请求并接受答复。

3. WebKit 接收到各种网页或者资源的数据，其中某些资源可能是同步或异步获取的。

4. 网页被交给 HTML 解释器转变成一系列的词语（Token）。

5. 解释器根据词语构建节点（Node），形成 DOM 树。

6. 如果节点是 JavaScript 代码的话，调用 JavaScript 引擎解释并执行。

7. JavaScript 代码可能会修改 DOM 树的结构。

8. 如果节点需要依赖其他资源，例如图片、CSS、视频等，调用资源加载器来加载他们，但是他们是异步的，不会阻碍当前 DOM 树的继续创建；如果是 JavaScript 资源 URL（没有标记异步方式），则需要停止当前 DOM 树的创建，直到 JavaScript 的资源加载并被 JavaScript 引擎执行后才继续 DOM 树的创建。

::: right
来自<<WebKit 技术内幕>>
:::

所以，通俗来讲，chrome 浏览器首先会请求 HTML 文档，然后对其中的各种资源调用相应的资源加载器进行异步网络请求，同时进行 DOM 渲染，直到遇到`<script>`标签的时候，主进程才会停止渲染等待此资源加载完毕然后调用 V8 引擎对 js 解析，继而继续进行 DOM 解析。我的理解如果加了 async 属性就相当于单独开了一个进程去独立加载和执行，而 defer 是和将`<script>`放到`<body>`底部一样的效果。



> 参考文章
>
> [掘金：浅谈 script 标签的 defer 和 async，作者:Balled](https://juejin.cn/post/6844903560879013896)
>
> [掘金: 图解 script 标签中的 async 和 defer 属性,作者:乔珂力](https://juejin.cn/post/6894629999215640583)
>
