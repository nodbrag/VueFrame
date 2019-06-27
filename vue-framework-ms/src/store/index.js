import  Vue from 'vue';
import  Vuex from  'vuex';
import  UserStore from './modules/UserStore'
import  TopStore from './modules/TopStore'
import  CommonStore from './modules/CommonStore'
import  RoleStore from './modules/RoleStore'
import  AuthStore from './modules/AuthStore'
//注入插件Vuex
Vue.use(Vuex);
export  default new Vuex.Store({
  modules: {
     UserStore
    ,TopStore
    ,CommonStore
    ,RoleStore
    ,AuthStore
  }
});

