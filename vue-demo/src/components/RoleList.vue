<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="角色名" @keyup.enter.native="handleSearch"></el-input>
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
      <el-table :data="roles" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="role_name" label="角色名" sortable></el-table-column>
        <el-table-column prop="created_at" label="创建时间" :formatter="formatdate" width="180" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="delRole(scope.$index,scope.row)" size="small">删除</el-button>
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
      <el-dialog title="新增角色" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="角色名" prop="role_name">
            <el-input v-model="addForm.role_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑角色" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="editForm.role_name" auto-complete="off"></el-input>
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
import util from '../lib/util';
import * as httpRequest from '../lib/Http';

export default {
  name: 'RoleList',
  data(){
    return {
      filters: {
        role_name: ''
      },
      roles: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      sels: [], //列表选中列

      //编辑相关数据
      editFormVisible: false,//编辑界面是否显示
      editFormRules: {
        role_name: [
          {required: true, message: '请输入角色名', trigger: 'blur'}
        ]
      },
      editForm: {
        id: 0,
        role_name: ''
      },

      //新增相关数据
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        role_name: [
          {required: true, message: '请输入角色名', trigger: 'blur'}
        ]
      },
      addForm: {
       role_name: ''
      }
    }
  },
  methods: {
    formatdate:function (row, column){
      return util.formatDate.format(new Date(row.created_at), 'yyyy-MM-dd hh:mm:ss');
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
    search(){
      let that = this;
      let params = {
        page: that.page,
        limit: 10,
        name: that.filters.name
      };

      that.loading = true;
      httpRequest.GET(`/datas/role/getRoles`, params).then(function (result) {
        that.loading = false;
        if (result && result.IsSuccess==1) {
          that.total = result.data.totalnum;
          that.roles = result.data.res;
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
    delRole: function (index, row) {
      let that = this;
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        that.loading = true;
        httpRequest.GET(`/datas/role/deleteRole`,{id:row.id}).then(function (result) {
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
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //编辑
    editSubmit: function () {
      let that = this;
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let para = Object.assign({}, this.editForm);
          var parms={editType:1,json:encodeURI( JSON.stringify(para))};
          httpRequest.POST(`/datas/role/editRole`, parms).then(function (result) {
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
        role_name: ''
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
          httpRequest.POST(`/datas/role/editRole`, parms).then(function (result) {
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
  }
}
</script>

<style scoped>

</style>
