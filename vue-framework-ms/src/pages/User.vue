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
                      style="min-width: 240px;" @keyup.enter.native="search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="datalist" highlight-current-row @selection-change="selectInfos"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="userCode" label="登录名" width="120" sortable>
        </el-table-column>

        <el-table-column prop="userRoleId" label="用户角色" min-width="120"  :formatter="formattype" sortable>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="telephone" label="固定电话" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="mobilePhone" label="移动电话" min-width="120" sortable>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="">域授权</el-button>
            <el-button size="small" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del('userId',scope.row.userId)" size="small">删除</el-button>
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
      <el-dialog title="新增用户" :visible.sync ="addFormVisible"  :before-close="closeAddDialog">
        <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addForm">
          <el-form-item label="用户名" prop="userCode">
            <el-input v-model="addForm.userCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="addForm.userName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户角色" prop="userRoleId">
            <el-select v-model="addForm.userRoleId" placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="固定电话" prop="telephone">
            <el-input v-model="addForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="移动电话" prop="mobilePhone">
            <el-input v-model="addForm.mobilePhone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeAddDialog">取消</el-button>
          <el-button type="primary" @click.native="add" :loading="loading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑用户" :visible.sync ="editFormVisible"   :before-close="closeEditDialog">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="userCode">
            <el-input v-model="editForm.userCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="editForm.userName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户角色" prop="userRoleId">
            <el-select v-model="editForm.userRoleId"  placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="固定电话" prop="telephone">
            <el-input v-model="editForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="移动电话" prop="mobilePhone">
            <el-input v-model="editForm.mobilePhone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeEditDialog">取消</el-button>
          <el-button type="primary" @click.native="edit">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import UserView from '../View/UserView'
export default new UserView();
</script>

<style scoped>

</style>
