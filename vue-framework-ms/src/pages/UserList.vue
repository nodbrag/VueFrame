<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filter">
          <el-form-item>
            <el-input v-model="filter.UserName" placeholder="用户名/真实姓名"
                      style="min-width: 240px;" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="users" highlight-current-row @selection-change="selectUsersChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="userCode" label="登录名" width="120" sortable>
        </el-table-column>

        <el-table-column prop="type" label="用户类型" min-width="120"  :formatter="formattype" sortable>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="telephone" label="电话号码" min-width="120" sortable>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="delUser(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="maxResultCount" :total="totalCount"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <!--新增界面-->
      <el-dialog title="新增用户" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addForm">
          <el-form-item label="用户名" prop="loginname">
            <el-input v-model="addForm.loginname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户类型" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addForm.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑用户" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="loginname">
            <el-input v-model="editForm.userCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="editForm.userName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户类型" prop="type">
            <el-select v-model="editForm.type"  placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>
<script>
  import { mapGetters,mapActions } from "vuex";
export default {
  name: 'UserList',
  data(){
    return {
      //编辑相关数据
      editFormVisible: false,//编辑界面是否显示

      editForm: {
        id: 0,
        userCode:'',
        userName: '',
        type:0,
        email:'',
        telephone:''
      },
      //新增相关数据
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addForm: {
        loginname:'',
        name: '',
        type:'',
        sex:'',
        email:'',
        phone:'',
        roleids:[],
        rolename:''

      },
      typeoptions: [{
        value: '0',
        label: '智慧建筑管理平台用户'
      },{
        value: '1',
        label: '防火实验室监控系统用户'
      }],
      rolesoptions:[]
    }
  },
  computed:{
    ...mapGetters('UserStore',['users','filter','editFormRules']),
    ...mapGetters('CommonStore',['loading','totalCount','maxResultCount'])
  },
  methods: {
    ...mapActions('UserStore',['bindUserInfo','selectUsersChange','delelteUser']),
    ...mapActions('CommonStore',['pageChange']),
    //性别显示转换
    formattype:function(row,column){
      if(row.type==0){
        return "普通用户";
      }else if(row.type==1){
        return "系统用户";
      }else{
        return "管理用户";
      }
    },
    handleCurrentChange(val) {
      this.pageChange(val);
      this.search();
    },
    handleSearch(){
      this.handleCurrentChange(1);
    },
    search(){
      this.bindUserInfo().then(data=>{
      }).catch(error=>{
        this.$message.error({showClose: true, message: error.toString(), duration: 2000});
      });
    },
    //删除
    delUser: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        this.delelteUser(row.userId).then(()=>{
          this.$message.success({showClose: true, message: '删除成功', duration: 1500});
          this.search();
        }).catch(error=>{
          this.$message.error({showClose: true, message: error.toString(), duration: 2000});
        })
      }).catch(() => {
      });
    },
    //显示编辑界面
    showEditDialog: function (index, row) {
      this.editForm = Object.assign({}, row);
      this.editFormVisible = true;
      //var ids=row.roleids.split(',');
     var intids=[];
     for(var i=0;i<row.roleids.length;i++){
       intids.push(parseInt(row.roleids[i]))
     }
      this.editForm.roleids=intids;
    },
    //编辑
    editSubmit: function () {
      let that = this;
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //this.loading = true;
          let para = Object.assign({}, this.editForm);
          var parms={editType:1,json:encodeURI( JSON.stringify(para))};
          this.$message.success({showClose: true, message: '修改成功', duration: 2000});
          that.editFormVisible = false;
         /* httpRequest.POST(`/datas/user/editUser`, parms).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.IsSuccess) === 1) {
              that.$message.success({showClose: true, message: '修改成功', duration: 2000});
              that.$refs['editForm'].resetFields();
              that.editFormVisible = false;
              that.search();
            } else {
              that.$message.error({showClose: true, message: '修改失败', duration: 2000});
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });*/
        }
      });
    },
    showAddDialog: function () {
      this.addFormVisible = true;
      this.addForm = {
        loginname:'',
        name: '',
        type:'',
        sex:'',
        email:'',
        phone:'',
        roleids:[],
        rolename:''
      };
    },
    //新增
    addSubmit: function () {
      let that = this;
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          that.loading = false;
          let para = Object.assign({}, this.addForm);
          var parms={editType:0,json:encodeURI( JSON.stringify(para))};
          that.$message.success({showClose: true, message: '新增成功', duration: 2000});
          that.addFormVisible = false;
          /*httpRequest.POST(`/datas/user/editUser`, parms).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.IsSuccess) === 1) {
              that.$message.success({showClose: true, message: '新增成功', duration: 2000});
              that.$refs['addForm'].resetFields();
              that.addFormVisible = false;
              that.search();
            } else {
              that.$message.error({showClose: true, message: '新增失败', duration: 2000});
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });*/

        }
      });
    }
  },
  mounted() {
    this.search();
  }
}
</script>

<style scoped>

</style>
