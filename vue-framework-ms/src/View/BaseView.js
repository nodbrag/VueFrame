import { mapGetters,mapActions } from "vuex";
export default class  BaseView {

  constructor(_api){

    let newmethod= {
      search: function () {
        this.bindInfos(_api);
      },
      handleCurrentChange: function (val) {
        this.pageChange(val);
        this.bindInfos(_api);
      },
      del: function (key, val) {
        let parms = {};
        parms[key] = val;
        let arrobj = [];
        arrobj.push(parms);
        arrobj.push(_api);
        this.delete(arrobj).then(() => {
          this.bindInfos(_api);
        }).catch((error) => {
          this.$message.error({showClose: true, message: '删除失败:' + error, duration: 2000});
        });
      },
      //编辑
      edit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.update(_api).then(data => {
              this.$refs['editForm'].resetFields();
              this.bindInfos(_api);
            }).catch((error) => {
              this.$message.error({showClose: true, message: '修改失败:' + error, duration: 2000});
            })
          }
        });
      },
      //新增
      add: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.create(_api).then(data => {
              this.$refs['addForm'].resetFields();
              this.bindInfos(_api);
            }).catch((error) => {
              this.$message.error({showClose: true, message: '新增失败:' + error, duration: 2000});
            })
          }
        });
      }
    }
    this.pushMethods(newmethod);
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
  computed={
    ...mapGetters('RoleStore',['datalist','filter','editFormRules','editForm','addForm']),
    ...mapGetters('CommonStore',['loading','totalCount','maxResultCount','editFormVisible','addFormVisible'])
  };
  /**
   * 方法
   */
  methods= {
    ...mapActions('RoleStore',['bindInfos','selectinfos','delete','update','create','showEditDialog','closeEditDialog','closeAddDialog','showAddDialog']),
    ...mapActions('CommonStore',['pageChange'])
  };
  /**
   * 新增computed 信息的记录
   * @param computed
   */
  pushComputed(computed){
    this.computed=Object.assign(computed,this.computed);
  }
  /**
   * 新增methods 信息的记录
   * @param methods
   */
  pushMethods(methods){
    this.methods=Object.assign(methods,this.methods);
  }

}
