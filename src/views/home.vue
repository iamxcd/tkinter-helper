<template>
  <div class="home">
    <ToolBar :isSaved="isSaved"
      @updateInfo="getProjectFileInfo()"></ToolBar>
    <div class="main">
      <div class="left_side aside">
        <el-collapse class="collapse"
          :value="['widget','tree']">
          <el-collapse-item title="基础组件"
            name="widget">
            <WidgetBox></WidgetBox>
          </el-collapse-item>
          <el-collapse-item title="组件层级"
            name="tree">
            <WidgetTree :widget="frame"></WidgetTree>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class='center'>
        <Elements></Elements>
      </div>
      <div class="right_side aside">
        <el-collapse class="collapse"
          :value="['attr','event','options','table','menu']">
          <el-collapse-item title="组件配置"
            name="attr">
            <AttrsBox></AttrsBox>
          </el-collapse-item>
          <el-collapse-item v-if="isTk(['tk_list_box','tk_select_box','tk_tabs'])"
            title="选项设置"
            name="options">
            <OptionsBox></OptionsBox>
          </el-collapse-item>
          <el-collapse-item v-if="isTk(['tk_win'])"
            title="菜单设置"
            name="menu">
            <MenuEditBox></MenuEditBox>
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
    <VueContextMenu :contextMenuData="contextMenu"
      @handler="contextMenuHandler"></VueContextMenu>
  </div>
</template>

<script>
import WidgetBox from "@/components/widget-box.vue";
import AttrsBox from "@/components/attrs-box.vue";
import Elements from "@/components/elements.vue";
import EventBind from "@/components/event-bind.vue";
import OptionsBox from "@/components/options-box.vue";
import ColumnsEditBox from "@/components/columns-edit-box.vue";
import MenuEditBox from "@/components/menu-edit-box.vue";
import VueContextMenu from "@/components/VueContextMenu/VueContextMenu.vue";
import ContextMenuHandler from "@/core/handler/context-menu-handler.js";
import ToolBar from "@/components/toolbar.vue";
import WidgetTree from "@/components/widget-tree.vue";
import { Base64 } from "js-base64";
import { mapActions, mapGetters } from "vuex";
import md5 from "md5";

export default {
  components: {
    WidgetBox,
    AttrsBox,
    Elements,
    VueContextMenu,
    EventBind,
    OptionsBox,
    ColumnsEditBox,
    ToolBar,
    WidgetTree,
    MenuEditBox,
  },
  data() {
    return {};
  },
  created() {
    // 获取用户信息
    if (this.token) {
      this.$store.dispatch("user/getInfo");
    }
    // 获取文件信息
    if (this.curFile.id && this.isLogin) {
      this.getProjectFileInfo();
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame", "token", "curFile"]),
    isLogin() {
      return this.$store.getters.userInfo?.id != null;
    },
    localMd5() {
      let content = {
        win: this.frame,
      };
      content = JSON.stringify(content);
      content = Base64.encode(content);
      return md5(content);
    },
    isSaved() {
      if (!this.curFile?.id) {
        return true;
      }
      return this.localMd5 == this.curFile.md5;
    },
  },
  watch: {
    "curFile.id": {
      // 处理切换项目文件情况 监听ID变化后,获取数据覆盖本地
      handler(val, oldval) {
        if (val != oldval && this.curFile.id && this.isLogin) {
          this.setFileToFrame();
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({ setFrame: "app/setFrame" }),
    isTk(tks) {
      return tks.indexOf(this.attrsForm.type) > -1;
    },
    async init() {
      // 获取本地缓存
      let win = localStorage.getItem("win");
      win = JSON.parse(win);

      // url上有文件ID 并且 已经登录的情况
      if (this.curFile.id && this.isLogin) {
        await this.setFileToFrame();
      } else {
        if (win != null) {
          this.$store.dispatch("app/setFrame", win);
        } else {
          win = this.frame;
        }
      }
      this.$store.dispatch("app/setAttrsForm", this.frame);
    },
    async getProjectFileInfo() {
      const { data } = await this.$api.get(`project-file/${this.curFile.id}`);
      this.$store.dispatch("app/setCurFileInfo", {
        id: data.id,
        name: data.name,
        md5: data.tk == null ? null : md5(data.tk),
      });
      return data;
    },
    contextMenuHandler(handlerName) {
      let handler = new ContextMenuHandler(this.contextMenu, handlerName);
      handler.run();
    },
    async setFileToFrame() {
      try {
        let data = await this.getProjectFileInfo();
        if (data.tk == null || data.tk == "") {
          throw new Error("tk无数据");
        }
        if (this.localMd5 == this.curFile.md5) {
          return;
        }
        let tk = Base64.decode(data.tk);
        tk = JSON.parse(tk);
        if (!tk.win) {
          throw new Error("tk数据解析失败");
        }
        if (win != null) {
          this.$confirm("当前本地存在缓存, 是否覆盖?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.$store.dispatch("app/setFrame", tk.win);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      next(false);
      this.$confirm("您还未保存文件，确定离开吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        next();
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .main {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    height: calc(100% - 40px - 5px);

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
  overflow-y: scroll;
  .collapse {
    border: 1px solid #d1d1d1;
    background-color: #fff;
    border-top: none !important;
    .el-collapse-item {
      &__content {
        padding: 2px 10px;
      }
      &__header {
        padding-left: 10px;
        font-weight: 600;
        font-size: 14px;
      }
      &:last-child {
        border-bottom: 1px solid #d1d1d1;
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