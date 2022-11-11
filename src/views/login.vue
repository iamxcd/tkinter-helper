<template>
  <div class="container">
    <img class="left-img"
      :src="require('@/assets/svg/login-bg.svg')">
    <div class="form-box">
      <div class="title">
        欢迎使用Tkinter布局助手
      </div>
      <el-tabs v-model="curTab"
        stretch
        class="tabs"
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
        <el-tab-pane label="注册 [暂未开放]"
          name="register"
          disabled>
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
      <div class="footer">
        登录/注册即表示您已阅读并同意<a target="_blank"
          href="https://www.pytk.net/serve_and_privacy.html">服务条款</a>
      </div>
    </div>
  </div>

</template>

<script>
import { register } from "@/api/user";
export default {
  data() {
    return {
      curTab: "login",
      loginForm: {},
      registerForm: {},
      size: "large",
      captcha: {},
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
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
          this.$router.push({ path: "/" });
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
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  .left-img {
    width: 300px;
    margin-right: 300px;
  }
  .title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    padding: 20px 20px 20px 0px;
  }
  .form-box {
    width: 400px;
    padding: 0 20px 20px 20px;
    color: #606266;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
    .tabs {
      padding-top: 30px;
      .captcha_input {
        display: flex;
        align-items: center;
        .captcha {
          width: 120px;
          height: 36px;
          padding: 4px;
          cursor: pointer;
        }
      }
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #9aa5b8;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>