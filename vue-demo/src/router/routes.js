import  Home from '../components/Home'
import  DeviceList from '../components/DeviceList'
import  UserChangePwd from '../components/UserChangePwd'
import  UserProfile from '../components/UserProfile'
import  UserList from '../components/UserList'
import  RoleList from '../components/RoleList'

/*声明路由列表*/
let routes = [
  {
    path: '/',
    component: Home,
    name: '用户管理',
    menuShow: true,
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-users', // 图标样式class
    children: [
      {path: '/UserList', component: UserList, name: '用户管理', id:0, menuShow: true},
      {path: '/', component: UserList, id:0, name: '用户管理', menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '角色管理',
    menuShow: true,
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/RoleList', component: RoleList,  name: '角色管理', id:1, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '设备管理',
    menuShow: true,
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-books', // 图标样式class
    children: [
      {path: '/DeviceList', component: DeviceList, name: '设备管理', id:2, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    id:5,
    name: '设置',
    menuShow: true,
    iconCls: 'iconfont icon-setting1',
    children: [
      {path: '/UserProfile', component: UserProfile, name: '个人信息', id:51, menuShow: true},
      {path: '/UserChangePwd', component: UserChangePwd, name: '修改密码', id:52, menuShow: true}
    ]
  }
];
export default routes;
