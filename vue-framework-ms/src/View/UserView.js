import { mapGetters } from "vuex";
import BaseView, {BaseComputed, BaseMethods} from "../View/BaseView";
/**
 * UI 层方法
 */
class UserMethods extends  BaseMethods{
  /**
   * 用户类型
   * @param row
   * @returns {string}
   */
  formattype=function (row) {
    let rolelist= JSON.parse(window.localStorage.getItem("role"));
    let role= rolelist.find((obj)=>obj.id==row.userRoleId);
    if(role!=undefined)
      return role.name;
    else
      return "";
  };
  /**
   * 返回 vuex 混入的方法
   * @returns {{}}
   * @constructor
   */
  get MapMethods() {
    return {};
  }
}
class UserComputed extends  BaseComputed{
  /**
   * 返回vuex 混入的计算属性
   * @returns {{[p: string]: () => any}}
   * @constructor
   */
  get MapComputed() {
    return { ...mapGetters('UserStore',['typeoptions'])};
  }

}
let view={
  methods:new UserMethods(),
  computed:new UserComputed()
};

export default class UserView extends  BaseView {
  name='UserView';

  get store() {
    return "UserStore"
  }
  constructor(){
    super(view);
  }
  mounted=function (){
    this.search();
  }
}
