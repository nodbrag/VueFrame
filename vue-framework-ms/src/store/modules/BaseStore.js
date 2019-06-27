import MutationTypes from "../MutationTypes";
import Vue from 'vue';
let vue=new Vue();
/**
 * state  基类
 */
export  class  BaseState {
  /**
   * 数据列表数组定义
   * @type {Array}
   */
  datalist = [];
  /**
   * 消息定义
   * @type {string}
   */
  mess="";
  /**
   * 编辑Form对象
   * @type {{}}
   */
  editForm = { };
  /**
   * 新增Form对象
   * @type {{}}
   */
  addForm = { };
  /**
   * 选择的数据列表
   * @type {Array}
   * @public
   */
  selectdatas = [];

  /**
   * 搜索过滤条件
   * @type {{UserName: string}}
   */
  filter = { };

  /**
   * 验证规则
   */
  editFormRules = {};

  constructor(obj){
    this.addForm=obj;
    this.editForm=obj;
  }
}

/**
 * getters 基类
 */
export  class BaseGetters
{
  mes=state => state.mes;
  datalist= state => state.datalist;
  filter=state=>state.filter;
  selectdatas=state=>state.selectdatas;
  editFormRules=state=>state.editFormRules;
  editForm=state=>state.editForm;
  addForm=state=>state.addForm;
}

/**
 * Mutation 基类
 */
export  class  BaseMutations {
  [MutationTypes.SET_LISTData]=function(state, {datas}) {
    state.datalist = datas;
  };
  [MutationTypes.SET_SELECTUSERS]=function(state, selectdatas) {
    state.selectdatas = selectdatas;
  };
  [MutationTypes.SET_EDITFORM]=function(state,editobj) {
    state.editForm = editobj;
  };
}

/**
 * action 基类
 */
export class  BaseActions {
  /**
   * 绑定列表信息
   * @param commit
   * @param state
   * @param rootGetters
   */
    bindInfos=function({commit,state, rootGetters },api) {
    let maxResultCount = rootGetters['CommonStore/maxResultCount'];
    let skipCount = rootGetters['CommonStore/skipCount'];
    let parms = {filter: state.filter, maxResultCount: maxResultCount, skipCount: skipCount};
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {

      api.getAll(parms).then(data => {
        let success = data.success;
        if (success){
          let datas = data.result.items;
          let count=data.result.totalCount;
          commit(MutationTypes.SET_LISTData, {datas});
          commit('CommonStore/' + MutationTypes.SET_TOTALCOUNT, count, {root: true});
          resolve(datas);
        } else {
          vue.$message.error({showClose: true, message: data.error.toString(), duration: 2000});
          reject(new Error(data.error))
        }
        commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
      }).catch(error=>{
        vue.$message.error({showClose: true, message: error.toString(), duration: 2000});
        reject(error);
      })
    });
  };
  /**
   * 设置选中记录
   * @param commit
   * @param selectusers
   */
  selectInfos=function({commit},selectdatas){
    commit(MutationTypes.SET_SELECTUSERS, selectdatas);
  };
  /**
   * 显示编辑弹出框
   * @param commit
   * @param state
   * @param row
   */
  showEditDialog=function({commit,state},row){
    commit(MutationTypes.SET_EDITFORM, Object.assign({}, row));
    commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, true, {root: true});
  };
  closeEditDialog=function({commit,state}){
    commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, false, {root: true});
  };
  showAddDialog=function({commit}){
    commit('CommonStore/' + MutationTypes.SET_AddFORMVISIBLE, true, {root: true});
  };
  closeAddDialog=function({commit}){
    commit('CommonStore/' + MutationTypes.SET_AddFORMVISIBLE, false, {root: true});
  };
  /**
   * 新增用户
   * @param commit
   * @param state
   * @returns {Promise<any>}
   */
  create=function({commit,state},api){
    let obj = Object.assign({}, state.addForm);
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {
      api.create(obj).then(data=>{
        let success = data.success;
        if (success) {
          vue.$message.success({showClose: true, message: '新增成功', duration: 2000});
          resolve();
        }else{
          reject(new Error(data.error))
        }
        commit('CommonStore/' + MutationTypes.SET_AddFORMVISIBLE, false, {root: true});
        commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
      }).then(error=>{
        reject(error);
      })
    });
  };
  /**
   * 编辑信息
   * @param commit
   * @param user
   * @returns {Promise<any>}
   */
  update=function({commit,state,rootGetters},api){
    let obj = Object.assign({}, state.editForm);
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {
      api.update(obj).then(data=>{
        let success = data.success;
        if (success) {
          resolve();
          vue.$message.success({showClose: true, message: '修改成功', duration: 2000});
        }else{
          reject(new Error(data.error));
        }
        commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, false, {root: true});
        commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
      }).then(error=>{
        reject(error);
      })
    });
  };
  /**
   * 删除信息
   * @param commit
   * @param id
   * @returns {Promise<any>}
   */
  delete=function({commit},arrobj){
    let parms=arrobj[0];
    let api=arrobj[1];
    return new Promise((resolve, reject) => {
      vue.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
       api.delete(parms).then(data => {
          let success = data.success;
          if (success) {
            vue.$message.success({showClose: true, message: '删除成功', duration: 1500});
            resolve();
          } else {
            reject(new Error(data.error))
          }
          commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
        }).then(error => {
          reject(error);
        })
      }).catch(()=>{
      });
    });
  };
}

