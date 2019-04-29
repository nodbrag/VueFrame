<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.jpg" style="padding-left:25px;"></a>
      </div>
     <!-- <div class="topbar-logos" v-show="!collapsed">
        <a href="/"><img src="../assets/logotxt.png"></a>
      </div>-->

      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">质量控制管理系统</span>
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

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title" ><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <template  >
                   <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
              <template >
                <i :class="item.iconCls"></i><span slot="title" >{{item.children[0].name}}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
export default {
  name: 'home',
  created(){

  },
  data () {
    return {
      defaultActiveIndex: "0",
      nickname: '超级管理员',
      userpower:[],
      powerpath:[],
      collapsed: false,
      fullscreen:false
    }
  },
  methods: {
    handleSelect(index){
      this.defaultActiveIndex = index;
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    // 全屏事件
    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    jumpTo(url){
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout(){
      let that = this;
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning'
      }).then(() => {
        //确认
        localStorage.removeItem('access-user');
        that.$router.go('/login'); //用go刷新
      }).catch(() => {});
    }
  },
  mounted() {
    let user = localStorage.getItem('access-user');
    //权限配置
    var superqx=[0,1,2,3,4,5,21,31,41,51,22,32,42,52,23];
    var adminqx=[0,1,3,4,5];
    let that=this;
    localStorage.setItem("role_11",JSON.stringify(superqx));
    localStorage.setItem("role_12",JSON.stringify(adminqx));
    if (user) {
      user = JSON.parse(user);
      var roles=user.UserRoles;
      this.userpower=[];
      roles.forEach(function (res) {
        var powers=JSON.parse(localStorage.getItem("role_"+res.role_id));
         powers.forEach(function (id) {
          var index= that.userpower.indexOf(id);
          if(index==-1) {
            that.userpower.push(id);
          }
         });
      });
      that.powerpath.push("/Permission");
      that.powerpath.push("/");
      that.powerpath.push("/Home");

      //根据权限控制菜单是否显示
      that.$router.options.routes.forEach(function (item) {
           var id=item.id;
          if(!item.leaf){
            if(that.userpower.indexOf(id)==-1){
              item.menuShow=false;
            }else{
              item.menuShow=true;

            }
            var childernshownum=0;
            if(item.children&&item.children.length)
            {
              item.children.forEach(function (term) {

                if (that.userpower.indexOf(term.id) == -1) {
                  term.menuShow = false;
                } else {
                  term.menuShow = true;

                  if(that.powerpath.indexOf(term.path)==-1) {
                      that.powerpath.push(term.path);
                  }
                  childernshownum++;
                }
              })
            }
            if(childernshownum==0){
              item.menuShow=false;
            }
          }else if(item.leaf&&item.children&&item.children.length){
            if(that.userpower.indexOf(item.children[0].id)==-1){
              item.menuShow=false;
            }else{

              item.menuShow=true;
            }
            if(item.children&&item.children.length)
            {
              item.children.forEach(function (term) {

                if (that.userpower.indexOf(term.id) == -1) {
                  term.menuShow = false;
                } else {
                  term.menuShow = true;

                  if(that.powerpath.indexOf(term.path)==-1) {
                    that.powerpath.push(term.path);
                  }
                }
              })
            }

          }


      });

      localStorage.setItem("curpower",JSON.stringify(that.powerpath));
      this.nickname = user.name || '';
    }
  }
}
</script>

<style scoped lang="scss">

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

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
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 200px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
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
    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>

