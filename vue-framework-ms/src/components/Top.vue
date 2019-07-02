<template>
  <el-col :span="24" class="topbar-wrap">
  <div class="topbar-logo topbar-btn" v-show="!collapsed">
    <a href="/"><img src="../assets/logo.jpg" style="padding-left:25px;"></a>
  </div>

  <div class="topbar-title">
    <span style="font-size: 18px;color: #fff;">VueDemo管理系统</span>
  </div>

  <div class="topbar-account topbar-btn">
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
        <i class="el-icon-rank"></i>
      </el-tooltip>
    </div>
    <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="jumpTo('/userprofile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="jumpTo('/userchangepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
        </el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
  </el-col>
</template>
<script>
  import { mapGetters,mapActions } from "vuex";
    export default {
        name: "Top",
       computed:{
          ...mapGetters('TopStore',['fullscreen','collapsed','nickname','defaultActiveIndex'])
       },
       methods:{
          ...mapActions('TopStore',['handleFullScreen','handleSelect']),
         jumpTo(url){
           this.handleSelect(url);
           this.$router.push(url);
         },
         logout(){
           let that = this;
           this.$confirm('确认退出吗?', '提示', {
             confirmButtonClass: 'el-button--warning'
           }).then(() => {
             //确认
             localStorage.clear();
             that.$router.go('/login'); //用go刷新;
           }).catch(() => {});
         }
       }
    }
</script>

<style scoped  lang="scss">
  .topbar-wrap {
    height: 100px;
    line-height: 60px;
    background: #373d41;
    padding: 0px;

  .topbar-btn {
    color: #fff;
  }
  /*.topbar-btn:hover {*/
  /*background-color: #4A5064;*/
  /*}*/
  .topbar-logo {
    float: left;
    width: 169px;
    margin-left: 30px;
    line-height: 60px;
  }
  .topbar-logos {
    float: left;
    width: 120px;
    line-height: 26px;
  }
  .topbar-logo img, .topbar-logos img {
    height: 60px;
    margin-top: 5px;
    margin-left: 2px;
  }
  .topbar-title {
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 10px;
    border-left: 1px solid #000;
  }
  .topbar-account {
    float: right;
    padding-right: 12px;
  }
  .userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }
  }
  .btn-fullscreen{
    float: left;
    transform: rotate(45deg);
    margin-right: 5px;
    margin-top: 5px;
    font-size: 20px;
  }
  .btn-fullscreen{
    position: relative;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
