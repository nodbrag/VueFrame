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
      <el-col :span="24" class="toolbar" style="padding-bottom:0px;">
        <el-form :inline="true" :model="filter">
          <el-form-item>
            <el-input v-model="filter.RoleName" placeholder="角色名"
                      style="min-width: 240px;"  @keyup.enter.native="search"></el-input>
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
        <el-table-column prop="roleName" label="角色名称"  sortable>
        </el-table-column>
        <el-table-column prop="description" label="备注" width="280" sortable>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="">菜单授权</el-button>
            <el-button size="small" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del('roleId',scope.row.roleId)" size="small">删除</el-button>
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
      <el-dialog title="新增角色" :visible.sync ="addFormVisible"  :before-close="closeAddDialog">
        <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="description">
            <el-input v-model="addForm.description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeAddDialog">取消</el-button>
          <el-button type="primary" @click.native="add" :loading="loading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑角色" :visible.sync ="editFormVisible"   :before-close="closeEditDialog">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="description">
            <el-input v-model="editForm.description" auto-complete="off"></el-input>
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
  import RoleView from '../View/RoleView';
  export default new RoleView()
</script>
<style scoped>

</style>
