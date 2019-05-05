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
  }
};
const getters = {
  mes: state => state.mes,
  users: state => state.users,
  filter:state=>state.filter,
  selectusers:state=>state.selectusers,
  editFormRules:state=>state.editFormRules
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
   * @param users
   */
  selectUsersChange({commit},selectusers){
    commit(MutationTypes.SET_SELECTUSERS, selectusers);
  },
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
