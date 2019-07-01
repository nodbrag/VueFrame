import HelloWorld from '../pages/HelloWorld'
import Home from '../pages/Home'
import  User from '../pages/User'
import  Role from '../pages/Role'
import  Login from '../pages/Login'
export  default [
  {
    path: '/login',
    name: '登录',
    component: Login
  },
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
    name: '系统设置',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/User', component: User,  name: '用户管理', id:1, menuShow: true}
     ,{path: '/Role', component: Role,  name: '角色管理', id:1, menuShow: true}
    ]
  }
]
