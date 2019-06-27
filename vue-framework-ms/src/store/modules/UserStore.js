import UserApi from '../../api/UserApi'
import User from '../../model/User'
import {BaseActions, BaseGetters, BaseMutations, BaseState} from "./BaseStore";
/**
 * 状态类
 */
class UserState extends  BaseState {

   constructor()
   {
      super(new User());
      this.init();
   }
  /**
   * 用户类型数据字典
   * @type {*[]}
   */
  typeoptions = [{
    value: '0',
    label: '普通用户'
  }, {
    value: '1',
    label: '管理用户'
  }];
  /**
   * 状态初始化
   */
   init()
   {
     /**
      * 过滤条件
      * @type {{UserName: string}}
      */
      this.filter={ UserName: '' };

     /**
      * Form验证规则
      */
      this.editFormRules =
       {
         userName: [
           {required: true, message: '请输入真实姓名', trigger: 'blur'}
         ],
         userCode: [
           {required: true, message: '请输入用户名', trigger: 'blur'}
         ], email: [
           {required: true, message: '请输入电子邮件', trigger: 'blur'}
         ], telephone: [
           {required: true, message: '请输入联系电话', trigger: 'blur'}
         ]
       };
   }
}

/**
 * get类
 */
class UserGetters extends  BaseGetters {
    typeoptions=state=>state.typeoptions;
}

/**
 * action 类
 */
class UserActions extends  BaseActions{
}
/**
 * mutaions
 */
class UserMutations extends BaseMutations {
}

export  default
{
  namespaced: true,
  state:new UserState(),
  getters:new UserGetters(),
  mutations:new UserMutations(),
  actions:new UserActions()
};
