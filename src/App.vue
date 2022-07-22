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
        <WidgetBox></WidgetBox>
        <el-main>
          <Elements></Elements>
        </el-main>
        <AttrsBox v-model="attrsForm"></AttrsBox>
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
import GenerateCode from "./generate-code";
import CodeView from "./components/code-view.vue";
import WidgetBox from "./components/widget-box.vue";
import IHeader from "./components/iheader.vue";
import IFooter from "./components/ifooter.vue";
import AttrsBox from "./components/attrs-box.vue";
import Elements from "./components/elements.vue";
import VueContextMenu from "@/components/VueContextMenu/VueContextMenu.vue";
import ContextMenuHandler from "@/context-menu-handler.js";
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
  },
  name: "HomeView",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame"]),
  },
  methods: {
    ...mapActions(["setFrame"]),
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
</style>

<style>
body {
  user-select: none;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
* {
  outline: none;
}
</style>