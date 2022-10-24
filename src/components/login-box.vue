<template>
  <el-dialog title="欢迎使用Tkinter布局助手"
    class="login-box"
    v-if="show"
    :close-on-click-modal="false"
    :visible.sync="show"
    width="30%"
    :size="size"
    :before-close="close">
    <el-tabs v-model="curTab"
      lazy
      @tab-click="handleClickTab">
      <el-tab-pane label="登录"
        name="login">
        <el-form ref="login_form"
          :model="loginForm">
          <el-form-item>
            <el-input :size="size"
              placeholder="请输入您的邮箱地址"
              prefix-icon="el-icon-user"
              v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :size="size"
              placeholder="请输入您的密码"
              type="password"
              prefix-icon="el-icon-lock"
              show-password
              v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="captcha_input">
              <el-input :size="size"
                placeholder="请输入验证码"
                prefix-icon="el-icon-lock"
                v-model="loginForm.captcha_code"></el-input>
              <img class="captcha"
                @click="getCaptcha()"
                :src="captcha.img">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button :size="size"
              type="primary"
              style="width:100%"
              @click="onClickLogin()">登录</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="注册"
        name="register">
        <el-form ref="register_form"
          :model="registerForm">
          <el-form-item>
            <el-input :size="size"
              placeholder="请输入您的邮箱地址"
              prefix-icon="el-icon-user"
              v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :size="size"
              placeholder="请输入您的密码"
              type="password"
              prefix-icon="el-icon-lock"
              show-password
              v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :size="size"
              placeholder="再次确认您的密码"
              type="password"
              prefix-icon="el-icon-lock"
              show-password
              v-model="registerForm.password2"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="captcha_input">
              <el-input :size="size"
                placeholder="请输入验证码"
                prefix-icon="el-icon-lock"
                v-model="registerForm.captcha_code"></el-input>
              <img class="captcha"
                @click="getCaptcha()"
                :src="captcha.img">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button :size="size"
              type="primary"
              style="width:100%"
              @click="onClickRegister()">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer"
      class="dialog-footer">
      登录/注册即表示您已阅读并同意<a target="_blank"
        href="https://www.pytk.net/serve_and_privacy.html">服务条款</a>
    </span>
  </el-dialog>

</template>

<script>
import { register } from "@/api/user";
export default {
  data() {
    return {
      curTab: "login",
      show: false,
      loginForm: {},
      registerForm: {},
      size: "large",
      captcha: {},
    };
  },
  methods: {
    open() {
      this.getCaptcha();
      this.show = true;
    },
    close() {
      this.reset();
      this.show = false;
    },
    reset() {
      this.loginForm = {};
      this.registerForm = {};
    },
    handleClickTab(tab, evt) {
      this.curTab = tab.name;
      this.getCaptcha();
      this.reset();
    },
    getCaptcha() {
      this.$api.get("captcha").then((res) => {
        this.captcha = res.data.captcha;
      });
    },
    onClickLogin() {
      this.$store
        .dispatch("user/login", {
          ...this.loginForm,
          captcha_key: this.captcha.key,
        })
        .then(() => {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          this.close();
        })
        .catch(() => {
          this.getCaptcha();
        });
    },
    onClickRegister() {
      register({
        ...this.registerForm,
        captcha_key: this.captcha.key,
      })
        .then((res) => {
          this.reset();
          this.curTab = "login";
          this.getCaptcha();
          this.$message({
            message: "注册成功",
            type: "success",
          });
        })
        .catch(() => {
          this.getCaptcha();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  .captcha_input {
    display: flex;
    .captcha {
      padding: 4px;
    }
  }
}
.dialog-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  height: 42px;
  line-height: 42px;
  font-size: 12px;
  color: #9aa5b8;
  background: #f9f9f9;
}
</style>