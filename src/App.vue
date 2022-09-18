<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <IHeader @viewCode="viewCode"
          @clearData="clearData"
          @onClickExport="onClickExport"
          :beforeUpload="beforeUpload"></IHeader>
      </el-header>
      <el-container style="height:calc(100vh - 60px - 60px - 1px);">
        <el-aside class="left_side">
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
        </el-aside>
        <el-main>
          <Elements></Elements>
        </el-main>
        <el-aside class="right_side">
          <el-collapse class="collapse"
            :value="['attr','event','style']">
            <el-collapse-item title="组件配置"
              name="attr">
              <AttrsBox v-model="attrsForm"></AttrsBox>
            </el-collapse-item>
            <el-collapse-item title="事件绑定"
              name="event">
              <EventBind v-model="attrsForm"></EventBind>
            </el-collapse-item>
            <!-- <el-collapse-item title="样式设置"
              name="style">
              开发中
            </el-collapse-item> -->
          </el-collapse>
        </el-aside>
      </el-container>
      <el-footer class="footer">
        <IFooter></IFooter>
      </el-footer>
    </el-container>

    <CodeView ref="code_view"></CodeView>
    <VueContextMenu :contextMenuData="contextMenu"
      @handler="contextMenuHandler"></VueContextMenu>
  </div>
</template>

<script>
import GenerateCode from "./core/generate-code";
import CodeView from "./components/code-view.vue";
import WidgetBox from "./components/widget-box.vue";
import IHeader from "./components/iheader.vue";
import IFooter from "./components/ifooter.vue";
import AttrsBox from "./components/attrs-box.vue";
import Elements from "./components/elements.vue";
import EventBind from "./components/event-bind.vue";
import VueContextMenu from "@/components/VueContextMenu/VueContextMenu.vue";
import ContextMenuHandler from "@/core/handler/context-menu-handler.js";
import { Base64 } from "js-base64";
import { mapActions, mapGetters } from "vuex";
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
  },
  name: "HomeView",
  data() {
    return {};
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame"]),
  },
  methods: {
    ...mapActions(["setFrame"]),
    qq_group() {
      this.$notify({
        title: "交流反馈",
        message: `Tkinter布局助手QQ交流群: ${this.$config.qq_group}`,
        dangerouslyUseHTMLString: true,
        position: "bottom-right",
        duration: 10 * 1000,
      });
    },
    init() {
      let win = localStorage.getItem("win");
      win = JSON.parse(win);
      if (win != null) {
        this.$store.dispatch("setFrame", win);
      } else {
        win = this.frame;
      }
      this.$store.dispatch("setAttrsForm", win);
      this.qq_group();
    },
    onClickExport() {
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
          this.$store.dispatch("setFrame", info.win);
          this.$message.success("数据导入成功");
        } catch (error) {
          this.$message.error("文件解析错误");
        }
      };
      // console.log(file);
      return false;
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
    clearData() {
      this.$confirm("此操作将会清空数据和缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.frame.elements = [];
        localStorage.clear();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
}

.header {
  border-bottom: 1px solid #d1d1d1;
  box-shadow: 0 1px rgb(12 13 14 / 10%), 0 1px 6px rgb(60 65 70 / 10%);
}

.right_side {
  width: 100%;
  .collapse {
  }
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

.el-aside {
  width: auto;
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
  }
}
</style>