import BaseView, {BaseComputed, BaseMethods} from "../View/BaseView";

class RoleMethods extends  BaseMethods{

}
class RoleComputed extends  BaseComputed{

}
let view={
  methods:new RoleMethods(),
  computed:new RoleComputed()
};

export default class RoleView extends  BaseView {
  name='RoleView';
  get store() {
    return "RoleStore";
  }
  constructor(){
    super(view);
  }
  mounted=function () {
    this.search();
  }
}
