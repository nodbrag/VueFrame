<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Dashboard' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="设备名称"
                      style="min-width: 240px;" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filters.type"  style="min-width: 240px;" clearable @keyup.enter.native="handleSearch"  placeholder=" 设备类型">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      <el-table :data="Devices" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="200" sortable>
        </el-table-column>
        <el-table-column prop="deviceType" label="设备类型" width="120" :formatter="formatType" sortable>
        </el-table-column>

        <el-table-column prop="deviceModel" label="设备模型" min-width="120"   sortable>
        </el-table-column>
        <el-table-column prop="manufacturer" label="厂商" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="outFactoryDate" label="出厂日期" min-width="120" :formatter="formatdate"  sortable>
        </el-table-column>
        <el-table-column prop="outFactoryNo" label="出厂编号" min-width="120" sortable>
        </el-table-column>
        <el-table-column prop="identityNo" label="识别编号" min-width="120" sortable>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="delDeviceInfo(scope.$index,scope.row)" size="small">删除</el-button>
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
      <el-dialog title="新增设备" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="addForm.deviceName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备型号" prop="deviceModel">
            <el-input v-model="addForm.deviceModel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-select v-model="addForm.deviceType" placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="厂商" prop="manufacturer">
            <el-input v-model="addForm.manufacturer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出厂编号" prop="outFactoryNo">
            <el-input v-model="addForm.outFactoryNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出厂日期" prop="outFactoryDate">
            <el-date-picker type="date" placeholder="开始日期" v-model="addForm.outFactoryDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="识别编码" prop="identityNo">
            <el-input v-model="addForm.identityNo" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>


      <el-dialog title="编辑用户" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="editForm.deviceName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备型号" prop="deviceModel">
            <el-input v-model="editForm.deviceModel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-select v-model="editForm.deviceType" placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="厂商" prop="manufacturer">
            <el-input v-model="editForm.manufacturer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出厂编号" prop="outFactoryNo">
            <el-input v-model="editForm.outFactoryNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出厂日期" prop="outFactoryDate">
            <el-date-picker type="date" placeholder="开始日期" v-model="editForm.outFactoryDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="识别编码" prop="identityNo">
            <el-input v-model="editForm.identityNo" auto-complete="off"></el-input>
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
  name: '设备信息',
  data(){
    return {
      filters: {
        name: '',
        type:''
      },
      Devices: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      sels: [], //列表选中列

      //编辑相关数据
      editFormVisible: false,//编辑界面是否显示
      editFormRules: {
        deviceName: [
          {required: true, message: '请输入设备名', trigger: 'blur'}
        ],
        deviceModel: [
          {required: true, message: '请输入设备型号', trigger: 'blur'}
        ],deviceType: [
          {required: true, message: '请选择设备类型', trigger: 'blur'}
        ],identityNo: [
          {required: true, message: '请输入识别编码', trigger: 'blur'}
        ]
      },
      editForm: {
        id: 0,
        deviceName:'',
        deviceType: '',
        deviceModel:'',
        manufacturer:'',
        outFactoryDate:'',
        outFactoryNo:'',
        identityNo:''
      },

      //新增相关数据
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        deviceName: [
          {required: true, message: '请输入设备名', trigger: 'blur'}
        ],
        deviceModel: [
          {required: true, message: '请输入设备型号', trigger: 'blur'}
        ],deviceType: [
          {required: true, message: '请选择设备类型', trigger: 'blur'}
        ],identityNo: [
          {required: true, message: '请输入识别编码', trigger: 'blur'}
        ]
      },
      addForm: {
        deviceName:'',
        deviceType: '',
        deviceModel:'',
        manufacturer:'',
        outFactoryDate:'',
        outFactoryNo:'',
        identityNo:''
      },
      typeoptions: [{
        value: '0',
        label: '立炉'
      },{
        value: '1',
        label: '卧炉'
      }]
    }
  },
  methods: {
    //工作状态显示转换
    formatType: function (row, column) {
      return row.deviceType == 1 ? '卧炉' : row.deviceType == 0 ? '立炉' : '立炉';
    },
    formatdate:function (row, column){
      return util.formatDate.format(new Date(row.outFactoryDate), 'yyyy-MM-dd');
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
        name: that.filters.name,
        type:that.filters.type
      };

      that.loading = true;
      httpRequest.GET(`/datas/deviceInfo/getDeviceInfos`, params).then(function (result) {
        that.loading = false;
        if (result && result.IsSuccess==1) {
          that.total = result.data.totalnum;
          that.Devices = result.data.res;
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
    delDeviceInfo: function (index, row) {
      let that = this;
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        that.loading = true;
        httpRequest.GET(`/datas/deviceInfo/deleteDeviceInfo`,{id:row.id}).then(function (result) {
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
    },
    //编辑
    editSubmit: function () {
      let that = this;
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let para = Object.assign({}, this.editForm);
          var parms={editType:1,json:encodeURI( JSON.stringify(para))};
          httpRequest.POST(`/datas/deviceInfo/editDeviceInfo`, parms).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.IsSuccess) === 1) {
              that.$message.success({showClose: true, message: '修改成功', duration: 2000});
              that.$refs['editForm'].resetFields();
              that.editFormVisible = false;
              that.search();
            } else {
              that.$message.error({showClose: true, message:'修改失败:'+result.msg, duration: 2000});
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
        deviceName:'',
        deviceType: '',
        deviceModel:'',
        manufacturer:'',
        outFactoryDate:'',
        outFactoryNo:'',
        identityNo:''
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

          httpRequest.POST(`/datas/deviceInfo/editDeviceInfo`, parms).then(function (result) {
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
