
# vue 特点

1.遵循mvvm 模式

学习参考文章<a target='_blank' href="https://github.com/DMQ/mvvm">剖析vue实现原理，自己动手实现mvvm</a>

2.数据双向绑定技术

 学习参考文章
 <a target='_blank' href="http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day">谈谈JavaScript中的双向数据绑定</a>

3.虚拟DOM技术

学习参考文章
<a target='_blank' href="https://juejin.im/entry/591a5f14128fe1005cdad9b5">vue 的 Virtual Dom 实现 - snabbdom 解密</a>

<a target='_blank' href="https://github.com/DDFE/DDFE-blog/issues/18">Vue 2.0 的 virtual-dom 实现简析</a>

4.基于模板化

* 模板的理解:
  动态的html页面
  包含了一些JS语法代码
    大括号表达式
    指令(以v-开头的自定义标签属性)
* 双大括号表达式
  语法: {{exp}} 或 {{{exp}}}
  功能: 绑定页面数据向页面输出数据
  可以调用对象的方法
* 指令一: 强制数据绑定
  功能: 指定变化的属性值   v-bind 绑定标签属性值  v-model 绑定输入框双向数据绑定
  完整写法:
    v-bind:xxx='data'  //data会作为表达式解析执行
  简洁写法:
    :xxx='data'
* 指令二: 绑定事件监听
  功能: 绑定指定事件名的回调函数
  完整写法:
    v-on:click='xxx'
  简洁写法:
    @click='xxx'

