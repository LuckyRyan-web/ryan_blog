---
title: vue 组件通信方法
categories: 前端
tags:
  - JavaScript
  - Vue
---

> 本文来源于 浪里行舟,地址为（https://segmentfault.com/a/1190000019208626）

## props/@on+\$emit
### 父组件向子组件传值 props
父组件 [演示地址详情](https://codesandbox.io/s/nostalgic-currying-8vecv?file=/src/App.vue)
```vue
<template>
  <div id="app">
    <p>这个是父组件</p>
    <child :movie="movieList"></child>
  </div>
</template>

<script>
import child from "./components/children";

export default {
  name: "App",
  components: {
    child,
  },
  data() {
    return {
      movieList: ["霸王别姬", "阿飞正传", "倩女幽魂"],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

子组件
```vue
<template>
  <div>
    <div v-for="(item, keys) in movie" :key="keys">{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
};
</script>

<style scoped>
</style>
```

### 子组件向父组件传值
父组件
```vue
<template>
  <div id="app">
    <p>这个是父组件</p>
    <p>子组件传递的数据为{{ fatherdata }}</p>
    <child @clickbutton="fathevent"></child>
  </div>
</template>

<script>
import child from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    child,
  },
  data() {
    return {
      fatherdata: "",
    };
  },
  methods: {
    fathevent(childata) {
      this.fatherdata = childata;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

子组件 [演示地址为](https://codesandbox.io/s/elastic-thunder-w2bp3?file=/src/components/HelloWorld.vue:0-338)

```vue
<template>
  <div>
    <div>
      <button @click="childevent(childdata)">子组件按钮</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childdata: "这个是子组件的数据",
    };
  },
  methods: {
    childevent(data) {
      this.$emit("clickbutton", data);
    },
  },
};
</script>

<style scoped>
</style>
```
## $children / $parent

这个方法是官方都不推荐使用的，如下图所示：

![官方实例](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/EaE7BS.png)

能访问到实例就说明可以访问到组件的所有的数据和方法
这种方式是很不推荐的

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/UnWu8j.png)

[完整实例演示地址为](https://codesandbox.io/s/twilight-cloud-8lfur)

父组件
```vue
<template>
  <div class="hello_world">
    <div>{{ msg }}</div>
    <button @click="changechild">点击改变子组件值</button>
    <child></child>
    
  </div>
</template>

<script>
import child from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    child,
  },
  data() {
    return {
      msg: "Welcome",
    };
  },

  methods: {
    changechild() {
      console.log(this.$children);
      this.$children[0].childdata = "this is new value";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
子组件
```vue
<template>
  <div>
    <div>
      <p>子组件的值为{{ childdata }}</p>
      <button @click="childclick">子组件按钮</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childdata: "这个是子组件的数据",
    };
  },
  methods: {
    childclick() {
      console.log(this.$parent.msg);
    },
  },
  created() {},
};
</script>

<style scoped>
</style>
```

## provide/ inject
官方说法为

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/4lPvVE.png)

即 `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

具体的流程如下图（图来源与网上）

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/vxMaQq.jpg)

[演示地址](https://codesandbox.io/s/inject-uuxrs?file=/src/components/chil2.vue:0-250)

父组件
```vue
<template>
  <div id="app">
    <p>这个是父组件</p>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/chil1";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  provide: {
    father: "这个是父亲组件的数据",
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

子组件 1
```vue
<template>
  <div>
    <p>这个是子组件1的数据:{{child1data}}</p>
    <chil2></chil2>
  </div>
</template>

<script>
import chil2 from './chil2'
export default {
  name: "chil1",
  components: {
    chil2
  },
  inject: ['father'],
  data(){
    return{
      child1data:this.father
    }
  }

};
</script>

<style scoped>

</style>
```

子组件 2
```vue
<template>
  <div>
    <p>这个是子组件2的数据：{{ child2data }}</p>
  </div>
</template>

<script>
export default {
  name: "chil2",
  inject: ["father"],
  data() {
    return {
      child2data: this.father,
    };
  },
};
</script>

<style scoped>
</style>
```
得出结果

![leCkP2](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/leCkP2.png)

即无论子组件嵌套的有多深，父组件 provide 的数据都可以被子组件调用到

### provide 和 inject 响应式
但是这里要注意一点，官方的解释有如下说法

![CUWj3R](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/CUWj3R.png)

这个意味着如果是父组件修改了 provide 的数据的话，子组件是不会去响应式的改变的

#### 依赖注入

对于这种方法可以使用在子孙组件注入依赖来解决

**这个是我在网上找到的解决办法** 
> provide 祖先组件的实例，然后在子孙组件中注入依赖，这样就可以在子孙组件中直接修改祖先组件的实例的属性，不过这种方法有个缺点就是这个实例上挂载很多没有必要的东西比如 props，methods。

解决代码如下：
```vue
// 父级组件
var Provider = {
  provide() {
    return {
      theme: this // 提供实例
    };
  }
};

// 子组件注入
var Child = {
  inject: {
    theme: {
      default: () => ({})
    }
  },
  created() {
    console.log(this.theme);
  }
  // ...
};
```

其次，在 vue 2.6 的版本中有对于这种情况的优化

![lzh9fV](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/lzh9fV.png)

#### 使用 Vue.observable 优化响应式 provide (推荐)

## ref / refs
这个方法是最简单的，只需要在调用的组件上添加一个 ref ，引用的就是这个组件的 DOM 元素，如果是在子组件上，就可以引用组件的实例，也就是可以使用子组件的数据和方法

[演示地址](https://codesandbox.io/s/late-glitter-1fo08?file=/src/components/HelloWorld.vue:0-447)

```vue
<template>
  <div id="app">
    <helloworld ref="chil"></helloworld>
    <button @click="changedata">点击按钮修改子组件的数据</button>
  </div>
</template>

<script>
import helloworld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    helloworld,
  },
  methods: {
    changedata() {
      console.log(this.$refs.chil);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

```vue
<template>
  <div class="hello">
    <p>{{ childata }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      childata: "这个是子组件的数据",
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

## $attrs/$listeners
多级组件嵌套需要传递数据时，通常使用的方法是通过 vuex。但如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，未免有点大材小用。为此 Vue2.4 版本提供了另一种方法----`$attrs/$listeners`

**$attrs**包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 interitAttrs 选项一起使用。

[演示地址](https://codesandbox.io/s/competent-hooks-mv7v2?file=/src/components/childCom3.vue:0-197)

父组件
```vue
// index.vue
<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./components/childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue",
    };
  },
};
</script>
```

子组件 1
```vue
// childCom1.vue
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2,
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String, // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  },
};
</script>
```

子组件 2
```vue
// childCom2.vue
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3,
  },
  inheritAttrs: false,
  props: {
    boo: String,
  },
  created() {
    console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  },
};
</script>
```

子组件 3
```vue
// childCom3.vue
<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String,
  },
};
</script>
```
得到的结果

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/V5yvp1.png)

**注意：子组件逐级减少父组件传递过去的属性，因为 $attrs 只会传递非 props 的值，如果子组件调用了父组件的 foo 值，那么子组件就不会再传递 foo**

>如上图所示 $attrs 表示没有继承数据的对象，格式为{属性名：属性值}。Vue2.4 提供了$attrs , $listeners 来传递数据与事件，跨级组件之间的通讯变得更简单。
>
>简单来说：$attrs 与 $listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners 里存放的是父组件中绑定的非原生事件。

**$listeners**包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

用法也是一样的,父组件传递一个事件给子组件

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/4z20OI.png)

子组件 1

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/tP3aVg.png)

子组件 3

![](https://txy-tc-ly-1256104767.cos.ap-guangzhou.myqcloud.com/uPic/H1V0q2.png)


## EventBus

EventBus 又称为事件总线。在 Vue 中可以使用 EventBus 来作为组件传递数据的桥梁的，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的灾难，因此才需要更完善的 Vuex 作为状态管理中心，将通知的概念上升到共享状态层次。

官方推荐的状态管理方案是 Vuex。不过如果项目不是很大，状态管理也没有很复杂的话，使用 Vuex 没必要。


## 其余
剩余的组件通信方法还有 vuex 、 localStorage / sessionStorage ，当然这些都是比较麻烦的，比如说就是简单的几个组件调用方法的话就用不上 vuex 了，其余的方法还有常见的 slot 

## 总结

常见使用场景可以分为三类：

父子通信：
父向子传递数据是通过 props，子向父是通过 events（$emit）；
通过父链 / 子链也可以通信（$parent / $children）；
ref 也可以访问组件实例；
provide / inject API；
$attrs/$listeners

兄弟通信：
Bus；Vuex

跨级通信：
Bus；Vuex；provide / inject API、$attrs/$listeners