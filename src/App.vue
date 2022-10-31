<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <IHeader @onClickLogin="onClickLogin"
          @onClickAvatar="onClickAvatar"></IHeader>
      </el-header>
      <el-container style="height:calc(100vh - 60px - 40px - 1px);">
        <router-view />
      </el-container>
      <el-footer class="footer"
        style="height: 40px;">
        <IFooter></IFooter>
      </el-footer>
    </el-container>

    <LoginBox ref="LoginBox"></LoginBox>
    <UserCenter ref="UserCenter"></UserCenter>
  </div>
</template>

<script>
import IHeader from "./components/iheader.vue";
import IFooter from "./components/ifooter.vue";
import LoginBox from "./components/login-box.vue";
import UserCenter from "./components/user-center.vue";
export default {
  components: {
    IHeader,
    IFooter,
    LoginBox,
    UserCenter,
  },
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.token) {
        this.$store.dispatch("user/getInfo");
      }
    },
    onClickLogin() {
      this.$refs["LoginBox"].open();
    },
    onClickAvatar() {
      this.$refs["UserCenter"].open();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #d1d1d1;
  box-shadow: 0 1px rgb(12 13 14 / 10%), 0 1px 6px rgb(60 65 70 / 10%);
}

.footer {
  border-top: 1px solid rgba(12, 13, 14, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss">
body {
  user-select: none;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}

* {
  outline: none;
}

.el-notification__content {
  user-select: text;
}
</style>