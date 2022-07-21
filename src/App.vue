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
        <AttrsBox v-model="form"></AttrsBox>
      </el-container>
      <el-footer class="footer">
        <IFooter></IFooter>
      </el-footer>
    </el-container>

    <CodeView ref="code_view"></CodeView>
    <VueContextMenu :contextMenuData="contextMenuData"
      @delEle="delEle"></VueContextMenu>
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

import VueContextMenu from "./components/VueContextMenu/VueContextMenu.vue";
import { Base64 } from "js-base64";
import { mapActions } from "vuex";
export default {
  components: {
    CodeView,
    WidgetBox,
    AttrsBox,
    VueContextMenu,
    IHeader,
    IFooter,
    Elements,
  },
  name: "HomeView",
  data() {
    return {
      form: {},
      // contextmenu data (菜单数据)
      contextMenuData: {
        menuName: "demo",
        eleIndex: null,
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null,
        },
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: "delEle", // Binding events(绑定事件)
            btnName: "删除", // The name of the menu option (菜单名称)
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["setCurId"]),
    winMove(e) {
      // 只处理右键点击事件
      if (e.which != 1) {
        return;
      }
      let ele = e.currentTarget; //获取组件. 绑定事件的元素
      // ele.style.cursor = "move";
      this.$store.dispatch("setCurId", "win");
      // 将属性绑定到表单中
      this.form = this.win;
      // console.log(this.curIndex);

      //算出鼠标相对元素的位置
      let disX = e.clientX - ele.offsetLeft;
      let disY = e.clientY - ele.offsetTop;

      disY = disY - 30; // 减去标题栏的高度

      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        this.win.top = top;
        this.win.left = left;
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
      };
    },
    keyDown(evt) {
      let keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (keys.indexOf(evt.key) > -1) {
        evt.preventDefault();
        switch (evt.key) {
          case "ArrowUp":
            if (this.form.top >= 1) this.form.top -= 1;
            break;
          case "ArrowDown":
            this.form.top += 1;
            break;
          case "ArrowLeft":
            if (this.form.left >= 1) this.form.left -= 1;
            break;
          case "ArrowRight":
            this.form.left += 1;
            break;
          default:
            break;
        }
      }
    },
    onClickExport() {
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      // 指定文件名和后缀
      eleLink.download = this.win.text + ".tk";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      let content = {
        win: this.win,
        elements: this.elements,
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
          if (!info.win || !info.elements) {
            throw new Error();
          }
          this.win = info.win;
          this.elements = info.elements;
          this.$message.success("数据导入成功");
        } catch (error) {
          this.$message.error("文件解析错误");
        }
      };
      // console.log(file);
      return false;
    },
    viewCode() {
      let t = new GenerateCode(this.win, this.win.elements);
      let code = t.build();
      this.$refs["code_view"].open(code);
    },
    showMenu(event, ele, index) {
      event.preventDefault();
      let x = event.clientX;
      let y = event.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y,
      };
      this.contextMenuData.eleIndex = index;
    },
    delEle() {
      let i = this.contextMenuData.eleIndex;
      if (i != null) {
        this.win.elements.splice(i, 1);
        this.contextMenuData.eleIndex = null;
      }
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