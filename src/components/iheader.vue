<template>
  <div class="iheader">
    <div class="logo"
      @click="goto('/')">
      {{$config.name}}
    </div>
    <div class="rigth_menu">
      <div class="menus">
        <div class='menu'
          @click="goto('/')">
          首页
        </div>
        <div class='menu'
          @click="goto('/project')">
          项目
        </div>
        <div class='menu'
          @click="help()">
          帮助
        </div>
        <div class='menu'
          @click="onClickGithub()">
          <img class="github-icon"
            :src="require('@/assets/svg/github.svg')">
        </div>
      </div>
      <div class="user">
        <div v-if="isLogin">
          <el-dropdown class="export_btn"
            size="medium"
            placement="bottom-start"
            @command="clickDropdown">
            <el-avatar :src="require('@/assets/avatar.png')"
              size="medium">
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">
                账户信息
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                注销登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span v-else
          @click="()=>{this.$emit('onClickLogin')}">登录</span>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["beforeUpload"],
  computed: {
    ...mapGetters(["frame", "token"]),
    isLogin() {
      return !!this.token;
    },
  },
  methods: {
    onClickAvatar() {
      this.$emit("onClickAvatar");
    },
    clickDropdown(cmd) {
      switch (cmd) {
        case "info":
          break;
        case "logout":
          this.logout();
          break;

        default:
          break;
      }
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$message.success("退出成功");
    },
    goto(path) {
      if (this.$route.fullPath == path) {
        return;
      }
      this.$router.push({ path });
    },
    onClickGithub() {
      let url = "https://github.com/iamxcd/tkinter-helper";
      window.open(url);
    },
    help() {
      let url = "https://www.pytk.net/blog/1660703137.html";
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.iheader {
  display: flex;
  align-items: center;
  padding: 0 20px;

  .logo {
    flex: 1;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
    cursor: pointer;
  }
  .rigth_menu {
    display: flex;
    align-items: center;
    .menus {
      display: flex;
      text-align: center;
      cursor: pointer;
      .menu {
        width: 100px;
        .github-icon {
          width: 22px;
        }
      }
    }
    .user {
      width: 100px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>