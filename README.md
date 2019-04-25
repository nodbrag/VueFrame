
# vue 特点

1.遵循mvvm 模式

学习参考文章<a target='_blank' href="https://github.com/DMQ/mvvm">剖析vue实现原理，自己动手实现mvvm</a>

2.数据双向绑定技术

 学习参考文章
 <a target='_blank' href="http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day">谈谈JavaScript中的双向数据绑定</a>

3.虚拟DOM技术

virtual-dom(后文简称vdom)  映射生成虚拟的JavaScript DOM结构，又通过在这个虚拟DOM上实现了一个 diff 算法找出最小变更，再把这些变
更写入实际的DOM中。这个虚拟DOM以JS结构的形式存在，计算性能会比较好，而且由于减少了实际DOM操作次数，性能会有较大提升

学习参考文章
<a target='_blank' href="https://juejin.im/entry/591a5f14128fe1005cdad9b5">vue 的 Virtual Dom 实现 - snabbdom 解密</a>

<a target='_blank' href="https://github.com/DDFE/DDFE-blog/issues/18">Vue 2.0 的 virtual-dom 实现简析</a>

4.基于html模板语法

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
    
 5.生命周期   
<img src="https://cn.vuejs.org/images/lifecycle.png"></img>

 生命周期钩子函数：
 
 1). 初始化显示
 
    * beforeCreate()  在此函数中还没有实现对 data 数据代理 所有无法使用 this.data定义的属性 
    
    * created()   已经完成 对事件监听，及数据劫持  在此函数中可以访问 this. data定义的属性
    
    * beforeMount() 已完成 this.$el 的定义
    
    * mounted()   已经 完成 this.$el 对于的html模板 替换
    
  2). 更新状态
  
    * beforeUpdate()   数据更新前
    
    * updated()   数据已经完成更新
    
  3). 销毁vue实例: vm.$destory()
  
    * beforeDestory() 
    
    * destoryed()
    
# vue 的扩展插件(库):

* vue-cli: vue脚手架

* vue-resource(axios): ajax请求

* vue-router: 路由

* vuex: 状态管理

* vue-lazyload: 图片懒加载

* mint-ui: 基于vue的组件库(移动端)

* element-ui: 基于vue的组件库(PC端)
		
 
