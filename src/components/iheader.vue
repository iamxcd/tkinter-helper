<template>
  <div class="main">
    <div class="logo">
      {{$config.name}}
    </div>
    <div class="project">
      <div class='name'>
        当前项目
      </div>
      <div class="menu">
        <el-button type="primary"
          @click="()=>{this.$emit('viewCode')}">代码</el-button>
        <el-button type="primary"
          @click="preview()">预览</el-button>

        <el-button type="danger"
          @click="()=>{this.$emit('clearData')}">清理数据</el-button>

        <el-dropdown split-button
          type="primary"
          class="export_btn"
          @command="clickDropdown"
          @click="()=>{this.$emit('onClickExportCode')}">
          导出代码
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="onClickExportTk">
              导出布局文件
            </el-dropdown-item>
            <el-dropdown-item>
              <el-upload action=""
                :before-upload="beforeUpload"
                :limit="1">
                导入布局文件
              </el-upload>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
import { preview } from "@/config.js";
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
    clearData() {
      this.$confirm("此操作将会清空数据和缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.elements = [];
        localStorage.clear();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    clickDropdown(cmd) {
      console.log(cmd);
      switch (cmd) {
        case "onClickExportTk":
          this.$emit("onClickExportTk");
          break;

        default:
          break;
      }
    },
    onClickAvatar() {
      this.$emit("onClickAvatar");
    },
    preview() {
      let tk_code = {
        win: this.frame,
      };
      tk_code = JSON.stringify(tk_code);

      this.$http
        .post(preview.url, tk_code, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then((res) => {
          this.$message.success("发送成功");
          this.checkVersion();
        })
        .catch((err) => {
          this.$alert(
            "预览服务未启动，请按照<a href='https://www.pytk.net/tkinter-helper-preview.html'>说明文档</a>，启动后在尝试。",
            "服务未启动",
            {
              dangerouslyUseHTMLString: true,
            }
          );
        });
    },
    checkVersion() {
      this.$http.get(preview.url).then((res) => {
        if (res.data.version != preview.version) {
          this.$alert(
            "预览服务非最新版本，某些功能上可能不一致，请按照<a href='https://www.pytk.net/tkinter-helper-preview.html'>说明文档</a>进行升级。",
            "版本不一致",
            {
              dangerouslyUseHTMLString: true,
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;

  .logo {
    flex: 1;
    width: 200px;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
  }
  .project {
    flex: 2;
    width: 200px;
    display: flex;
    align-items: center;
    .name {
      cursor: pointer;
      flex: 1;
    }
    .menu {
      .export_btn {
        margin-left: 10px;
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
        background: #ebebeb;
      }
    }
    .user {
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>