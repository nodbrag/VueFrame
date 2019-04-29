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
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="用户名/真实姓名"
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
      <el-table :data="users" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="loginname" label="登录名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120" :formatter="formatSex"
                         sortable>
        </el-table-column>
        <el-table-column prop="type" label="用户类型" min-width="120"  :formatter="formattype" sortable>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" min-width="120"  sortable>
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
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <!--新增界面-->
      <el-dialog title="新增用户" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="用户名" prop="loginname">
            <el-input v-model="addForm.loginname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择">
              <el-option
                v-for="item in sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="所属角色" prop="roleids">
            <el-select v-model="addForm.roleids" multiple placeholder="请选择角色">
              <el-option
                v-for="item in rolesoptions"
                :key="item.id"
                :label="item.role_name"
                :value="item.id">
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
            <el-input v-model="editForm.loginname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="editForm.sex" placeholder="请选择">
              <el-option
                v-for="item in sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="所属角色" prop="roleids">
            <el-select @visible-change="selectChange"  multiple  v-model="editForm.roleids" value-key="id"  placeholder="请选择角色">
              <el-option
                v-for="item in rolesoptions"
                :key="item.id"
                :label="item.role_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editForm.phone" auto-complete="off"></el-input>
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
import * as httpRequest from '../lib/Http';
export default {
  name: 'UserList',
  data(){
    return {
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      sels: [], //列表选中列

      //编辑相关数据
      editFormVisible: false,//编辑界面是否显示
      editFormRules: {
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        loginname: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],email: [
          {required: true, message: '请输入电子邮件', trigger: 'blur'}
        ],phone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'}
        ]
      },
      editForm: {
        id: 0,
        loginname:'',
        name: '',
        type:0,
        sex:0,
        email:'',
        phone:'',
        roleids:[],
        rolename:''
      },

      //新增相关数据
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        loginname: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],email: [
          {required: true, message: '请输入电子邮件', trigger: 'blur'}
        ],phone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'}
        ]
      },
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
      sexoptions: [{
        value: '0',
        label: '女'
      },{
        value: '1',
        label: '男'
      }],
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
  methods: {
    //性别显示转换
    formatSex: function (row, column) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
    },
    formattype:function(row,column){
      if(row.type==0){
        return "智慧建筑管理平台用户";
      }else if(row.type==1){
        return "防火实验室监控系统用户";
      }else{
        return "智慧建筑管理平台用户";
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.search();
    },
    handleSearch(){
      this.total = 0;
      this.page = 1;
      this.search();
    },
    selectChange(val) {
    },
    search(){
      let that = this;
      let params = {
        page: that.page,
        limit: 10,
        name: that.filters.name
      };

      that.loading = true;
      httpRequest.GET(`/datas/user/getUsers`, params).then(function (result) {
        that.loading = false;
        if (result && result.IsSuccess==1) {
          that.total = result.data.totalnum;
          that.users = result.data.res;

        }
      }, function (err) {
        that.loading = false;
        that.$message.error({showClose: true, message: err.toString(), duration: 2000});
      }).catch(function (error) {
        that.loading = false;
        console.log(error);
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      });
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //删除
    delUser: function (index, row) {
      let that = this;
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        that.loading = true;
        httpRequest.GET(`/datas/user/deleteUser`,{id:row.id}).then(function (result) {
          that.loading = false;
          if (result && parseInt(result.IsSuccess) === 1) {
            that.$message.success({showClose: true, message: '删除成功', duration: 1500});
            that.search();
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
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
          this.loading = true;
          let para = Object.assign({}, this.editForm);
          var parms={editType:1,json:encodeURI( JSON.stringify(para))};
          httpRequest.POST(`/datas/user/editUser`, parms).then(function (result) {
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
          });
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
          that.loading = true;
          let para = Object.assign({}, this.addForm);
          var parms={editType:0,json:encodeURI( JSON.stringify(para))};

          httpRequest.POST(`/datas/user/editUser`, parms).then(function (result) {
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
          });

        }
      });
    }
  },
  mounted() {
    this.handleSearch()
  },created(){
    let that = this;
    let params = {
      page: '1',
      limit: 50,
      name: ''
    };
    httpRequest.GET(`/datas/role/getRoles`, params).then(function (result) {
      if (result && result.IsSuccess==1) {
         that.rolesoptions = result.data.res;
      }
    }, function (err) {
      that.$message.error({showClose: true, message: err.toString(), duration: 2000});
    }).catch(function (error) {
      console.log(error);
      that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
    });
  }
}
</script>

<style scoped>

</style>
