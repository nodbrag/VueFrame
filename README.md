
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
    
    
 6. 自定义过滤器
 
* 理解
	对需要显示的数据进行格式化后再显示

* 编码
	1). 定义过滤器
		Vue.filter(filterName, function(value[,arg1,arg2,...]){
		  // 进行一定的数据处理
		  return newValue
		})
	2). 使用过滤器
		<div>{{myData | filterName}}</div>
		<div>{{myData | filterName(arg)}}</div>
	
7. vue内置指令
 
	v-text/v-html: 指定标签体
    	* v-text : 当作纯文本
		* v-html : 将value作为html标签来解析
		
	v-if v-else v-show: 显示/隐藏元素
		* v-if : 如果vlaue为true, 当前标签会输出在页面中
		* v-else : 与v-if一起使用, 如果value为false, 将当前标签输出到页面中
		* v-show: 就会在标签中添加display样式, 如果vlaue为true, display=block, 否则是none
		
	v-for : 遍历
		* 遍历数组 : v-for="(person, index) in persons"   
		* 遍历对象 : v-for="value in person"   $key
		
	v-on : 绑定事件监听
		* v-on:事件名, 可以缩写为: @事件名
		* 监视具体的按键: @keyup.keyCode   @keyup.enter
		* 停止事件的冒泡和阻止事件默认行为: @click.stop   @click.prevent
		* 隐含对象: $event
		
	v-bind : 强制绑定解析表达式  
		* html标签属性是不支持表达式的, 就可以使用v-bind
		* 可以缩写为:  :id='name'
		* :class
		  * :class="a"
			* :class="{classA : isA, classB : isB}"
			* :class="[classA, classB]"
		* :style
			:style="{color : color}"
			
	v-model
		* 双向数据绑定
		* 自动收集用户输入数据
		
	ref : 标识某个标签
		* ref='xxx'
		* 读取得到标签对象: this.$refs.xxx
		
		
# vue 的扩展插件(库):

* vue-cli: vue脚手架

* vue-resource(axios): ajax请求

* vue-router: 路由

* vuex: 状态管理

* vue-lazyload: 图片懒加载

* mint-ui: 基于vue的组件库(移动端)

* element-ui: 基于vue的组件库(PC端)
		
 
