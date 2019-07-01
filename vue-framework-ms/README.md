# vue-framework-ms

> A Vue.js project
搭建 基于 es6-> vue+vuex+vue-router+ElementUI 管理系统
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#目录层次说明

api =》 实现跟后台api 对应地址及实现 异步调用 数据底层

libs=》 存放库 如 axias 

model=》 存放每个实体

pages=》 存放路由vue

router=》存放vue路由 配置

store=》 实现  数据逻辑中间层次 调用 api层

utils=》 实现 公共方法 

view=》实现 ui 层逻辑 调用 store层
