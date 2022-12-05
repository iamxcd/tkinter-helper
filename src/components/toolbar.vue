<template>
  <div class="toolbar">
    <div class="info"
      v-if="curProjectFileId">
      <el-dropdown size="large">
        <span class="name">
          {{projectFile.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="save">
        <el-tooltip class="item"
          effect="dark"
          :open-delay="openDelay"
          content="保存"
          placement="bottom">
          <el-badge is-dot
            type="warning">
            <span class="icon-save icon iconfont"
              @click="onClickSave()"></span>
          </el-badge>
        </el-tooltip>
      </div>
    </div>

    <div class="divider"
      v-if="curProjectFileId">
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
              :before-upload="beforeUpload"
              :limit="1">
              导入布局文件
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
import uniqid from "uniqid";

export default {
  components: {
    CodeView,
  },
  data() {
    return {
      openDelay: 1000,
      projectFile: {
        id: null,
        name: null,
        md5: null,
      },
    };
  },
  computed: {
    ...mapGetters(["attrsForm", "contextMenu", "frame", "token"]),
    curProjectFileId() {
      return this.$route.query.fid;
    },
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
      let frame = {
        top: 20,
        left: 60,
        width: 600,
        height: 500,
        id: uniqid(),
        type: "tk_win",
        text: "我是标题 ~ Tkinter布局助手",
        elements: [],
        event_bind_list: [],
      };
      this.$store.dispatch("app/setFrame", frame);
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
    viewCode() {
      let t = new GenerateCode(this.frame);
      let code = t.build();
      this.$refs["code_view"].open(code);
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