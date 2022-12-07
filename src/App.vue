<template>
  <div>
    <div class="header">
      <IHeader @onClickLogin="onClickLogin"
        @onClickAvatar="onClickAvatar"></IHeader>
    </div>
    <div class="main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div class="footer"
      style="height: 40px;">
      <IFooter></IFooter>
    </div>
  </div>
</template>

<script>
import IHeader from "./components/iheader.vue";
import IFooter from "./components/ifooter.vue";
export default {
  components: {
    IHeader,
    IFooter,
  },
  data() {
    return {
      paths: {
        userCenter: "/user-center",
        login: "/login",
      },
    };
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
      this.goto("login");
    },
    onClickAvatar() {
      this.goto("userCenter");
    },
    goto(to) {
      this.$router.push({ path: this.paths[to] });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: 0 1px rgb(12 13 14 / 10%), 0 1px 6px rgb(60 65 70 / 10%);
}
.main {
  height: calc(100vh - 60px - 40px - 2px);
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

<style>
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}
</style>