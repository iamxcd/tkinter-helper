<template>
  <div class="home">
    <div class="toobar">
      <div class="menu">
        <el-tooltip class="item"
          effect="dark"
          :open-delay="openDelay"
          content="查看代码"
          placement="bottom">
          <i class="el-icon-document icon"
            @click="viewCode()"></i>
        </el-tooltip>

        <el-tooltip class="item"
          effect="dark"
          :open-delay="openDelay"
          content="预览效果"
          placement="bottom">
          <i class="el-icon-view icon"
            @click="preview()"></i>
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
                :before-upload="beforeUpload"
                :limit="1">
                导入布局文件
              </el-upload>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div class="left_side aside">
        <el-collapse class="collapse"
          :value="['widget','tree']">
          <el-collapse-item title="基础组件"
            name="widget">
            <WidgetBox></WidgetBox>
          </el-collapse-item>
          <!-- <el-collapse-item title="组件树"
              name="tree">
              开发中
            </el-collapse-item> -->
        </el-collapse>
      </div>
      <div class='center'>
        <Elements></Elements>
      </div>
      <div class="right_side aside">
        <el-collapse class="collapse"
          :value="['attr','event','options','table']">
          <el-collapse-item title="组件配置"
            name="attr">
            <AttrsBox></AttrsBox>
          </el-collapse-item>
          <el-collapse-item v-if="isTk(['tk_list_box','tk_select_box','tk_tabs'])"
            title="选项设置"
            name="options">
            <OptionsBox></OptionsBox>
          </el-collapse-item>
          <el-collapse-item v-if="isTk(['tk_table'])"
            title="表头设置"
            name="table">
            <ColumnsEditBox></ColumnsEditBox>
          </el-collapse-item>
          <el-collapse-item title="事件绑定"
            name="event">
            <EventBind></EventBind>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <CodeView ref="code_view"></CodeView>
    <VueContextMenu :contextMenuData="contextMenu"
      @handler="contextMenuHandler"></VueContextMenu>
  </div>
</template>

<script>
import GenerateCode from "@/core/generate-code";
import CodeView from "@/components/code-view.vue";
import WidgetBox from "@/components/widget-box.vue";
import IHeader from "@/components/iheader.vue";
import IFooter from "@/components/ifooter.vue";
import AttrsBox from "@/components/attrs-box.vue";
import Elements from "@/components/elements.vue";
import EventBind from "@/components/event-bind.vue";
import OptionsBox from "@/components/options-box.vue";
import ColumnsEditBox from "@/components/columns-edit-box.vue";
import LoginBox from "@/components/login-box.vue";
import UserCenter from "@/components/user-center.vue";
import VueContextMenu from "@/components/VueContextMenu/VueContextMenu.vue";
import ContextMenuHandler from "@/core/handler/context-menu-handler.js";
import { Base64 } from "js-base64";
import { mapActions, mapGetters } from "vuex";
import { preview } from "@/config.js";
export default {
  components: {
    CodeView,
    WidgetBox,
    AttrsBox,
    IHeader,
    IFooter,
    Elements,
    VueContextMenu,
    EventBind,
    OptionsBox,
    ColumnsEditBox,
    LoginBox,
    UserCenter,
  },
  data() {
    return {
      openDelay: 1000,
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame", "token"]),
  },
  methods: {
    ...mapActions({ setFrame: "app/setFrame" }),
    isTk(tks) {
      return tks.indexOf(this.attrsForm.type) > -1;
    },
    init() {
      let win = localStorage.getItem("win");
      win = JSON.parse(win);
      if (win != null) {
        this.$store.dispatch("app/setFrame", win);
      } else {
        win = this.frame;
      }
      this.$store.dispatch("app/setAttrsForm", win);
      if (this.token) {
        this.$store.dispatch("user/getInfo");
      }
      // this.qq_group();
    },
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
    onClickExportTk() {
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      // 指定文件名和后缀
      eleLink.download = this.frame.text + ".tk";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      let content = {
        win: this.frame,
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
    beforeUpload(file) {
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
    onClickLogin() {
      this.$refs["LoginBox"].open();
    },
    onClickAvatar() {
      this.$refs["UserCenter"].open();
    },
    viewCode() {
      let t = new GenerateCode(this.frame);
      let code = t.build();
      this.$refs["code_view"].open(code);
    },
    contextMenuHandler(handlerName) {
      let handler = new ContextMenuHandler(this.contextMenu, handlerName);
      handler.run();
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
    clearData() {
      this.$confirm("此操作将会清空数据和缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.frame.elements = [];
        this.frame.event_bind_list = [];
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
          this.onClickExportTk();
          break;

        default:
          break;
      }
    },
    beforeUpload(file) {
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
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  .toobar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-bottom: 5px;
    background-color: #fff;
    .menu {
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
  .main {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;

    .left_side,
    .right_side {
      width: 300px;
    }
    .center {
      display: block;
      flex: 1;
      flex-basis: auto;
      overflow: auto;
      padding: 30px 0 0 0 !important;
    }
  }
}
</style>

<style lang="scss">
.aside {
  .collapse {
    border: 1px solid #d1d1d1;
    background-color: #fff;
    .el-collapse-item {
      &__content {
        padding: 2px 10px;
      }
      &__header {
        padding-left: 10px;
        font-weight: 600;
        font-size: 14px;
      }
    }
    .el-collapse-item__header {
      padding-left: 10px;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>