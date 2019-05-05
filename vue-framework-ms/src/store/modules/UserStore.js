import UserApi from '../../api/UserApi'
import MutationTypes from '../MutationTypes'

let _userApi=new UserApi();

const state={
     users:[],
     mes:'',
     filter: {
       UserName: ''
     },
     selectusers:[]
     ,
    editFormRules:
      {
    userName: [
      {required: true, message: '请输入真实姓名', trigger: 'blur'}
    ],
    userCode: [
      {required: true, message: '请输入用户名', trigger: 'blur'}
    ],email: [
      {required: true, message: '请输入电子邮件', trigger: 'blur'}
    ],telephone: [
      {required: true, message: '请输入联系电话', trigger: 'blur'}
    ]
  },
  editForm: {
    id: 0,
    userCode:'',
    userName: '',
    type:0,
    email:'',
    telephone:''
  },
  addForm: {
    userCode:'',
    userName: '',
    type:0,
    email:'',
    telephone:''
  },typeoptions: [{
    value: '0',
    label: '普通用户'
  },{
    value: '1',
    label: '管理用户'
  }]
};
const getters = {
  mes: state => state.mes,
  users: state => state.users,
  filter:state=>state.filter,
  selectusers:state=>state.selectusers,
  editFormRules:state=>state.editFormRules,
  editForm:state=>state.editForm,
  addForm:state=>state.addForm,
  typeoptions:state=>state.typeoptions
};
const actions={
    getUserInfo({commit}){
        _userApi.get({
          "userId": 1
        }).then(data=>{
          //commit(MutationTypes.SET_LISTData, {data})
        })
    },
  /**
   * 绑定用户列表
   * @param commit
   * @param state
   * @param rootGetters
   */
   bindUserInfo({commit,state, rootGetters }) {

    let maxResultCount = rootGetters['CommonStore/maxResultCount'];
    let skipCount = rootGetters['CommonStore/skipCount'];
    let parms = {filter: state.filter, maxResultCount: maxResultCount, skipCount: skipCount};
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {
      _userApi.getAll(parms).then(data => {
        let success = data.success;
        if (success) {
          let users = data.result.items;
          let count=data.result.totalCount;
          commit(MutationTypes.SET_LISTData, {users});

          commit('CommonStore/' + MutationTypes.SET_TOTALCOUNT, count, {root: true});
          resolve(users);
        } else {
          reject(new Error(data.error))
        }
        commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
      }).catch(error=>{
           reject(error);
      })
    });
  },
  /**
   * 设置选中用户记录
   * @param commit
   * @param selectusers
   */
  selectUsersChange({commit},selectusers){
    commit(MutationTypes.SET_SELECTUSERS, selectusers);
  },
  showEditDialog({commit,state},row){
    commit(MutationTypes.SET_EDITFORM, Object.assign({}, row));
    commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, true, {root: true});
  },closeEditDialog({commit,state}){
    commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, false, {root: true});
  },
  showAddDialog({commit}){
    commit('CommonStore/' + MutationTypes.SET_AddFORMVISIBLE, true, {root: true});
  },closeAddDialog({commit}){
    commit('CommonStore/' + MutationTypes.SET_AddFORMVISIBLE, false, {root: true});
  },
  /**
   * 新增用户
   * @param commit
   * @param state
   * @returns {Promise<any>}
   */
  createUser({commit,state}){
    let user = Object.assign({}, state.addForm);
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {
      _userApi.update(user).then(data=>{
        let success = data.success;
        if (success) {
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
  },
  /**
   * 编辑用户
   * @param commit
   * @param user
   * @returns {Promise<any>}
   */
  updateUser({commit,state}){
     let user = Object.assign({}, state.editForm);
    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
      return new Promise((resolve, reject) => {
         _userApi.update(user).then(data=>{
           let success = data.success;
           if (success) {
             resolve();
           }else{
             reject(new Error(data.error))
           }
           commit('CommonStore/' + MutationTypes.SET_EDITFORMVISIBLE, false, {root: true});
           commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
         }).then(error=>{
           reject(error);
         })
    });
  },
  /**
   * 删除用户
   * @param commit
   * @param id
   * @returns {Promise<any>}
   */
  delelteUser({commit},id){

    commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
    return new Promise((resolve, reject) => {
       let parms={userId:id};
       _userApi.delete(parms).then(data=>{
         let success = data.success;
         if (success) {
           resolve();
         }else{
           reject(new Error(data.error))
         }
         commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
       }).then(error=>{
         reject(error);
       })
    });
  }
};

const mutations= {
  [MutationTypes.SET_LISTData](state, {users}) {
    state.users = users;
  },
  [MutationTypes.SET_SELECTUSERS](state, selectusers) {
    state.selectusers = selectusers;
  },
  [MutationTypes.SET_EDITFORM](state,edituser) {
    state.editForm = edituser;
  }
};

export  default
{
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
