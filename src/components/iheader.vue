<template>
  <div class="main">
    <div class="logo">
      {{$config.name}}
    </div>
    <div class="rigth_menu">
      <div class="menus">
        <div class='menu'>
          菜单
        </div>
        <div class='menu'>
          菜单
        </div>
        <div class='menu'>
          菜单
        </div>
        <div class='menu'>
          菜单
        </div>
      </div>
      <div class="nav-gap">
      </div>
      <div class="user">
        <el-avatar v-if="isLogin"
          :src="require('@/assets/avatar.png')"
          @click.native="onClickAvatar()"
          size="medium">
        </el-avatar>
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
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  padding: 0 20px;

  .logo {
    flex: 1;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
  }
  .rigth_menu {
    display: flex;
    align-items: center;
    .menus {
      display: flex;
      cursor: pointer;
      .menu {
        width: 100px;
      }
    }
    .nav-gap {
      position: relative;
      width: 1px;
      padding: 0 20px;
      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 20px;
        background: #909399;
      }
    }
    .user {
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>