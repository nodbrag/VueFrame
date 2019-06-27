import RoleApi from "@/api/RoleApi";
import BaseView from "@/View/BaseView";
let _api=new RoleApi();
export default class RoleList extends  BaseView {
  name='RoleList';
  constructor(){
    super(_api);
    this.addComputed();
    this.addMethod();
  }
  /**
   * 新增计算属性
   */
  addComputed()
  {

  }
  /**
   * 新增方法
   */
  addMethod(){
    let newmethod= {
    };
    this.pushMethods(newmethod);
  }
  mounted=function () {
    this.bindInfos(_api);
  }
}
