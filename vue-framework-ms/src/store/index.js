import  Vue from 'vue';
import  Vuex from  'vuex';
import  UserStore from './modules/UserStore'
import  TopStore from './modules/TopStore'
import  CommonStore from './modules/CommonStore'
import  RoleStore from './modules/RoleStore'
import  AuthStore from './modules/AuthStore'
import CommonDictionaryStore from './modules/CommonDictionaryStore'
import UserApi from "../api/UserApi";
import MutationTypes from './MutationTypes'
import RoleApi from "../api/RoleApi";
import CommonDictionaryApi from "../api/CommonDictionaryApi";

//注入插件Vuex
Vue.use(Vuex);
let store= new Vuex.Store({
  modules: {
     UserStore
    ,TopStore
    ,CommonStore
    ,RoleStore
    ,AuthStore
    ,CommonDictionaryStore
  }
});
/**
 * 全局注册Api
 */
store.commit('UserStore/' + MutationTypes.SET_API, new UserApi(), {root: true});
store.commit('RoleStore/' + MutationTypes.SET_API, new RoleApi(), {root: true});
store.commit('CommonDictionaryStore/' + MutationTypes.SET_API, new CommonDictionaryApi(), {root: true});
export  default store;
