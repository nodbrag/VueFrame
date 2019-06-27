import MutationTypes from "@/store/MutationTypes";
import Vue from 'vue';
let vue=new Vue();
/**
 * 角色状态类
 */
class AuthState  {

  account= {
    userCode: '',
    password: ''
  };
  editFormRules={
    userCode: [
      {required: true, message: '请输入账号', trigger: 'blur'},
      //{ validator: validaePass }
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      //{ validator: validaePass2 }
    ]
  }
}
/**
 * action 类
 */
class AuthActions
{
   login=function({commit,state, rootGetters },api) {
     let parms = Object.assign({}, state.account);
     commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
     return new Promise((resolve, reject) => {
       api.getToken(parms).then(data => {
         let success = data.success;
         if (success){
           localStorage.setItem('token', JSON.stringify(data.result));
           let username=data.result.user.userName;
           commit('TopStore/'+MutationTypes.SET_NICKNAME,username,{root:true});
           //更新公共的信息
           resolve(data);
         } else {
           reject(new Error(data.error))
         }
         commit('CommonStore/' + MutationTypes.SET_LOADING, false, {root: true});
       }).catch(error=>{
         reject(error);
       })
     });
   }
}
/**
 * getters 类
 */
class AuthGetters  {
  account=state=>state.account;
  editFormRules=state=>state.editFormRules;
}
/**
 * mutaions
 */
class AuthMutations  {

}

export  default
{
  namespaced: true,
  state:new AuthState(),
  getters:new AuthGetters(),
  mutations:new AuthMutations(),
  actions:new AuthActions()
};
