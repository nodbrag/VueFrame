import MutationTypes from "@/store/MutationTypes";
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
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
    ]
  }
}
/**
 * action 类
 */
class AuthActions
{
   login=({commit,state, rootGetters },api)=>{
     let parms = Object.assign({}, state.account);
     commit('CommonStore/' + MutationTypes.SET_LOADING, true, {root: true});
     let commonDictionaryApi= rootGetters['CommonDictionaryStore/api'];
     return new Promise((resolve, reject) => {
       api.getToken(parms).then(data => {
         let success = data.success;
         if (success){
           localStorage.setItem('token', JSON.stringify(data.result));
           let username=data.result.user.userName;
           //更新公共的信息
           commit('TopStore/'+MutationTypes.SET_NICKNAME,username,{root:true});
           //初始化数据
           commonDictionaryApi.getCommonDictionry({}).then(dic=>{
               for(let [key,value] of Object.entries(dic.result)) {
                 window.localStorage.setItem(key,JSON.stringify(value));
               }
           });
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
class AuthMutations {

}
export  default
{
  namespaced: true,
  state:new AuthState(),
  getters:new AuthGetters(),
  mutations:new AuthMutations(),
  actions:new AuthActions()
};
