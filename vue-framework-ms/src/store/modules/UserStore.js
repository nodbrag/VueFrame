import User from '../../model/User'
import {BaseActions, BaseGetters, BaseMutations, BaseState} from "./BaseStore";
/**
 * 状态类
 */
class UserState extends  BaseState {

   constructor() {
     super(new User());
     let types=JSON.parse(localStorage.getItem("role"));
     this.typeoptions.push(...types);
   }
  /**
   * 用户类型数据字典
   * @type {*[]}
   */
  typeoptions =[{id:0,name:" "}];
  /**
   * 过滤条件
   * @type {{UserName: string}}
   */
   filter = { UserName: '' };
  /**
   * Form验证规则
   */
   editFormRules =
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
/**
 * get类
 */
class UserGetters extends  BaseGetters {
    typeoptions=state=>state.typeoptions;
}

/**
 * action 类
 */
export class UserActions extends  BaseActions{
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
