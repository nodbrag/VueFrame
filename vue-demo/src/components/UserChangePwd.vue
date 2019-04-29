<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Dashboard' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form"  :rules="rules" class="demo-ruleForm login-container" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPwd" auto-complete="off" type="password" ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd" auto-complete="off"  type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import * as httpRequest from '../lib/Http';
export default {
  data() {
    return {
      loading: false,
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
        id: '',
        realoldpwd: ''
      }
      , rules: {
        oldPwd: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
        ],
        newPwd: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
        ]
        ,
        realoldpwd: [
          {required: true, message: '请输入确认新密码', trigger: 'blur'},
        ]
      }
    }
  }
  ,
  methods: {
    handleChangepwd() {
      let that = this;

      this.$refs.form.validate((valid) => {
        if (valid) {

          if(this.form.oldPwd!=this.form.realoldpwd){
            that.$message.error({showClose: true, message:"原密码输入错误！", duration: 2000});
            return;
          }
          if(this.form.newPwd!=this.form.confirmPwd){
            that.$message.error({showClose: true, message:"新密码输入不一致！", duration: 2000});
            return;
          }
          this.loading = true;
          let loginParams = {id: this.form.id, password: this.form.newPwd};
          var parms={json:JSON.stringify(loginParams)};
          httpRequest.GET(`/datas/user/editUser`,parms).then(function (result) {
            that.loading = false;
            if (result &&  parseInt(result.IsSuccess) === 1) {
              that.$message.success({showClose: true, message: '密码修改成功', duration: 2000});
              that.$refs['form'].resetFields();
              localStorage.removeItem('access-user');
              that.$router.go('/login'); //用go刷新
            } else {
              that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
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
    }, mounted() {
      let user = localStorage.getItem('access-user');

      if (user) {
        user = JSON.parse(user);
        this.form.realoldpwd = user.password;
        this.form.id = user.id;
      }
  }
}

</script>
