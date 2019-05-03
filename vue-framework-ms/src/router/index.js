import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../pages/HelloWorld'
import Home from '../pages/Home'
Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Test',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld', id:0, menuShow: true},
        {path: '/', component: HelloWorld, id:0, name: 'HelloWorld', menuShow: true}
      ]
    }
  ]
})
