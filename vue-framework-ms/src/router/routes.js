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
    name: '能源监控',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/MonitorElectricPower', component: null,  name: '电力', id:1, menuShow: true},
      {path: '/MonitorSoftwater', component: null,  name: '软水', id:1, menuShow: true},
      {path: '/MonitorPureWater', component: null,  name: '软水', id:1, menuShow: true},
      {path: '/MonitorVapourPower', component: null,  name: '软水', id:1, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '能源报表',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/EnergyReportActual', component: null,  name: '能源使用分析', id:1, menuShow: true},
      {path: '/EnergyCostForecast', component: null,  name: '能源成本预测', id:1, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '仪表管理',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/GaugeList', component: null,  name: '仪表档案', id:1, menuShow: true},
      {path: '/GaugeAlarmSetting', component: null,  name: '报警设置', id:1, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '能源定义',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
      {path: '/Energy', component: null,  name: '能源定义', id:1, menuShow: true},
      {path: '/EnergyProperty', component: null,  name: '能源属性', id:1, menuShow: true},
      {path: '/EnergyPrice', component: null,  name: '能源计价', id:1, menuShow: true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '基础档案',
    menuShow: true,
    leaf: false, // 只有一个节点
    iconCls: 'iconfont icon-roles', // 图标样式class
    children: [
       {path: '/WorkCenter', component: null,  name: '车间定义', id:1, menuShow: true}
      ,{path: '/WorkArea', component: null,  name: '区域定义', id:1, menuShow: true}
      ,{path: '/WorkShift', component: null,  name: '班次定义', id:1, menuShow: true}
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
     ,{path: '/GaugeAlarmLog', component: null,  name: '报警日志', id:1, menuShow: true}
    ]
  }
]
