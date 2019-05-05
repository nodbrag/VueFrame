import HelloWorld from '../pages/HelloWorld'
import Home from '../pages/Home'
import  UserList from '../pages/UserList'
export  default [
  {
    path: '/',
    component: Home,
    name: 'Test',
    menuShow: true,
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-home', // 图标样式class
    children: [
      {path: '/HelloWorld', component: HelloWorld, name: '首 页', id:0, menuShow: true},
      {path: '/', component: HelloWorld, id:0, name: '首 页', menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '用户管理',
    menuShow: true,
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/UserList', component: UserList,  name: '用户管理', id:1, menuShow: true}
    ]
  }
]
