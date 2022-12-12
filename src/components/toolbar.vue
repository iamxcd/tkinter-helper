<template>
  <div class="toolbar">
    <div class="info"
      v-if="curFile.id && isLogin">
      <div class="name">
        <span>{{curFile.name}}</span>
      </div>
      <div class="save">
        <el-tooltip class="item"
          effect="dark"
          :open-delay="openDelay"
          content="保存"
          placement="bottom">
          <el-badge :is-dot="!isSaved"
            type="warning">
            <span class="icon-save icon iconfont"
              @click="onClickSave()"></span>
          </el-badge>
        </el-tooltip>
      </div>
    </div>

    <div class="divider"
      v-if="curFile.id && isLogin">
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="menu">

      <el-tooltip class="item"
        effect="dark"
        :open-delay="openDelay"
        content="查看代码"
        placement="bottom">
        <span class="icon-code icon iconfont"
          @click="viewCode()"></span>
      </el-tooltip>
      <el-tooltip class="item"
        effect="dark"
        :open-delay="openDelay"
        content="预览效果"
        placement="bottom">
        <span class="icon-yunxin icon iconfont"
          @click="preview()"></span>
      </el-tooltip>

      <el-tooltip class="item"
        effect="dark"
        :open-delay="openDelay"
        content="清空数据"
        placement="bottom">
        <i class="el-icon-delete icon"
          @click="clearData()"></i>
      </el-tooltip>

      <el-tooltip class="item"
        effect="dark"
        :open-delay="openDelay"
        content="导出文件"
        placement="bottom">
        <i class="el-icon-download icon"
          @click="onClickExportCode()"></i>
      </el-tooltip>
      <el-dropdown class="export_btn"
        size="medium"
        placement="bottom-start"
        @command="clickDropdown">
        <i class="el-icon-more icon"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="onClickExportTk">
            导出布局文件
          </el-dropdown-item>
          <el-dropdown-item>
            <el-upload action=""
              :before-upload="importTk"
              accept=".tk"
              :limit="1">
              导入布局文件
            </el-upload>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-upload action=""
              :before-upload="importTkAndFix"
              accept=".tk"
              :limit="1">
              导入并修复布局
            </el-upload>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <CodeView ref="code_view"></CodeView>
  </div>
</template>

<script>
import GenerateCode from "@/core/generate-code";
import { Base64 } from "js-base64";
import { mapGetters } from "vuex";
import md5 from "md5";
import CodeView from "@/components/code-view.vue";
import { preview } from "@/config.js";
import { Loading } from "element-ui";
import { win_default } from "@/core/py-attrs";
import Attrs from "@/core/py-attrs";
import config from "@/config";
export default {
  props: {
    isSaved: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CodeView,
  },
  data() {
    return {
      openDelay: 1000,
    };
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame", "token", "curFile"]),
    isLogin() {
      return this.$store.getters.userInfo?.id != null;
    },
    localFileMd5() {
      let content = {
        win: this.frame,
      };
      content = JSON.stringify(content);
      content = Base64.encode(content);
      return md5(content);
    },
  },
  methods: {
    clearData() {
      this.$confirm("此操作将会清空数据和缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.frameRerest();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    frameRerest() {
      localStorage.clear();
      let frame = win_default();
      this.$store.dispatch("app/setFrame", frame);
    },
    clickDropdown(cmd) {
      switch (cmd) {
        case "onClickExportTk":
          this.onClickExportTk();
          break;

        default:
          break;
      }
    },
    onClickExportTk() {
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      // 指定文件名和后缀
      eleLink.download = this.frame.text + ".tk";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      let content = {
        win: this.frame,
        ...config,
      };
      content = JSON.stringify(content);
      content = Base64.encode(content);
      let blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    onClickExportCode() {
      let t = new GenerateCode(this.frame);
      let code = t.build();
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      // 指定文件名和后缀
      eleLink.download = this.frame.text + ".py";
      eleLink.style.display = "none";
      let blob = new Blob([code]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    viewCode() {
      let t = new GenerateCode(this.frame);
      let code = t.build();
      this.$refs["code_view"].open(code);
    },
    importTkAndFix(file) {
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      reader.onload = () => {
        // console.log(res);
        try {
          let info = reader.result;
          info = Base64.decode(info);
          info = JSON.parse(info);
          if (!info.win) {
            throw new Error();
          }
          console.log("开始修复");
          let attrs = new Attrs();
          console.log(attrs);
          let win = this.fixTk(info.win, attrs);
          console.log(win);
          this.$store.dispatch("app/setFrame", win);
          this.$message.success("数据导入成功");
        } catch (error) {
          throw error;
          this.$message.error("文件解析错误");
        }
      };
      // console.log(file);
      return false;
    },
    fixTk(ele, attrs) {
      if (ele?.elements) {
        for (const key in ele.elements) {
          ele.elements[key] = this.fixTk(ele.elements[key], attrs);
        }
      }
      if (ele.type == "tk_win" || !ele.type) {
        ele = { ...win_default(), ...ele };
      } else {
        ele = { ...attrs[ele.type](), ...ele };
      }
      return ele;
    },
    importTk(file) {
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      reader.onload = () => {
        // console.log(res);
        try {
          let info = reader.result;
          info = Base64.decode(info);
          info = JSON.parse(info);
          if (!info.win) {
            throw new Error();
          }
          this.$store.dispatch("app/setFrame", info.win);
          this.$message.success("数据导入成功");
        } catch (error) {
          this.$message.error("文件解析错误");
        }
      };
      // console.log(file);
      return false;
    },
    onClickSave() {
      if (this.isSaved) {
        this.$message.warning("当前修改已保存");
        return;
      }
      let content = {
        win: this.frame,
      };
      content = JSON.stringify(content);
      content = Base64.encode(content);
      let id = this.curFile.id;
      this.$api.put(`project-file/${id}`, { tk: content }).then((res) => {
        this.$message.success("保存成功");
        this.$emit("updateInfo");
      });
    },
    preview() {
      let tk_code = {
        win: this.frame,
      };
      tk_code = JSON.stringify(tk_code);

      let loadingInstance = Loading.service();
      this.$http
        .post(preview.url, tk_code, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then((res) => {
          loadingInstance.close();
          this.$message.success("发送成功");
          this.checkVersion();
        })
        .catch((err) => {
          loadingInstance.close();
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
.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid #d1d1d1;
  .info {
    display: flex;
    .name {
      padding: 0 16px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 400;
      span {
        padding-right: 5px;
      }
    }
    .save {
      margin: 0 16px;
      color: #606266;
      cursor: pointer;
      .icon {
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .divider {
    margin: 0 5px;
  }
  .menu {
    display: flex;
    .icon {
      margin: 0 16px;
      font-size: 24px;
      font-weight: 400;
      color: #606266;
      cursor: pointer;

      &:hover {
        color: #5cb6ff;
      }
    }
    .export_btn {
      margin-left: 10px;
    }
  }
}
</style>