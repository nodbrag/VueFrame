import { mapGetters } from "vuex";
import BaseView from "@/View/BaseView";
import UserApi from "@/api/UserApi";
let _api=new UserApi();
export default class RoleList extends  BaseView {
  name='UserList';
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
      let comp={ ...mapGetters('UserStore',['typeoptions'])};
      this.pushComputed(comp);
  }
  /**
   * 新增方法
   */
  addMethod(){
    let newmethod={
      formattype:function(row){
        if(row.type==0){
          return "普通用户";
        }else if(row.type==1){
          return "系统用户";
        }else{
          return "管理用户";
        }
      }
    };
    this.pushMethods(newmethod);
  }
  mounted=function (){
    this.bindInfos(_api);
  }
}
