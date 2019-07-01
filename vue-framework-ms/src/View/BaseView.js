import { mapGetters,mapActions } from "vuex";

export  class BaseMethods {
  /**
   * 创建实例
   */
   static createInstance(obj,store)
  {
    let newmethod= {
      ...mapActions(store,['bindInfos','selectInfos','delete','update','create','showEditDialog','closeEditDialog','closeAddDialog','showAddDialog']),
      ...mapActions('CommonStore',['pageChange']),
     };
    if(obj.MapMethods!=undefined)
       return  Object.assign(Object.assign(newmethod,obj.MapMethods),obj);
    else
      return  Object.assign(newmethod,obj);
  }

  get MapMethods(){
     return this.map
  }
   set MapMethods(obj){
     this.map=obj;
  }
  /**
   * 列表数据加载
   */
   search=function(){
    this.bindInfos().then((datas)=>{
      this.$message.success({showClose: true, message: '数据加载完成', duration: 2000});
    }).catch((error)=>{
      this.$message.error({showClose: true, message: '数据加载失败:' + error, duration: 2000});
    });
  };

  /**
   * 分页加载
   * @param val
   */
  handleCurrentChange= function(val){
    this.pageChange(val);
    this.search();
  };
  /**
   * 删除
   * @param key
   * @param val
   */
  del= function(key, val){
    let parms = {};
    parms[key] = val;
    this.delete(parms).then(() => {
      this.$message.success({showClose: true, message: '删除成功', duration: 2000});
    }).catch((error) => {
      this.$message.error({showClose: true, message: '删除失败:' + error, duration: 2000});
    });
  };
  /**
   * 编辑
   */
  edit=  function(){
    this.$refs.editForm.validate((valid) => {
      if (valid) {
        this.update().then(data => {
          this.$refs['editForm'].resetFields();
          this.$message.success({showClose: true, message: '编辑成功', duration: 2000});
        }).catch((error) => {
          this.$message.error({showClose: true, message: '编辑失败:' + error, duration: 2000});
        })
      }
    });
  };
  /**
   * 新增
   */
  add= function(){
    this.$refs.addForm.validate((valid) => {
      if (valid) {
        this.create().then(data => {
          this.$refs['addForm'].resetFields();
          this.$message.success({showClose: true, message: '新增成功', duration: 2000});
        }).catch((error) => {
          this.$message.error({showClose: true, message: '新增失败:' + error, duration: 2000});
        })
      }
    });
  };
}

/**
 * 基本的计算属性类
 */
export  class BaseComputed {

  /**
   * 创建实例
   */
  static createInstance(obj,store) {
    let newcomputed = {
      ...mapGetters(store, ['datalist', 'filter', 'editFormRules', 'editForm', 'addForm']),
      ...mapGetters('CommonStore', ['loading', 'totalCount', 'maxResultCount', 'editFormVisible', 'addFormVisible'])
    };

    if (obj.MapComputed != undefined)
      return Object.assign(Object.assign(newcomputed, obj.MapComputed), obj);
    else
      return Object.assign(newcomputed, obj);
  }

  get MapComputed(){
    return this.map
  }
  set MapComputed(obj){
    this.map=obj;
  }
}

export default class  BaseView {
  constructor(obj){
    this.methods=BaseMethods.createInstance(obj.methods,this.store);
    this.computed=BaseComputed.createInstance(obj.computed,this.store);
  }
  get store() {
    return this._store;
  }
  set store(s) {
    this._store = s;
  }
  /**
   * 名称
   * @type {string}
   */
  name='';
  /**
   * 计算属性
   * @type {{[p: string]: () => any, [p: string]: () => any}}
   */
  computed={};
  /**
   * 方法
   */
   methods={};
}
