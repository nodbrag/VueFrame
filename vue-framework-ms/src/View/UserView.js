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
    if(row.type==0){
      return "普通用户";
    }else if(row.type==1){
      return "系统用户";
    }else{
      return "管理用户";
    }
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
