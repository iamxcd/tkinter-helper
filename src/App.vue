<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <div class="logo">
          TkinterHelper
        </div>
        <div class="menu">
          <el-button type="danger"
            @click="clearData()">清理数据</el-button>
          <el-button type="primary"
            @click="viewCode()">Python</el-button>
          <el-dropdown split-button
            type="primary"
            class="export_btn"
            @click="onClickExport">
            导出
            <el-dropdown-menu slot="dropdown">
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
      </el-header>
      <el-container style="height:calc(100vh - 60px - 60px - 1px);">
        <WidgetBox></WidgetBox>
        <el-main>
          <div id="win"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            :style="{'top':win.top+'px','left':win.left+'px','width':win.width + 'px','height':win.height +'px'}">
            <component :is="element.type"
              @keydown.native="keyDown($event)"
              :tabindex="0"
              @contextmenu.native="showMenu($event,element,index)"
              v-for="(element,index) in elements"
              style="position: absolute;"
              :id="element.id"
              :style="{'top':element.top+'px','left':element.left+'px','width':element.width + 'px','height':element.height +'px'}"
              :key="index"
              :info="element"
              @mousedown.native.stop="elementMove($event,element,index)">
              <Resize @resize="(size)=>{eleResize(size,element,index)}"
                v-show="curIndex == index"></Resize>
            </component>
            <Resize @resize="winResize"
              v-show="curIndex == undefined"></Resize>
          </div>
          <div id="win_title"
            @mousedown="elementMove($event)"
            :style="{'top':win.top-30+'px','left':win.left+'px','width':win.width + 'px'}">
            <span class="title">{{win.text}}</span>
          </div>
        </el-main>
        <AttrsBox v-model="form"></AttrsBox>
      </el-container>
      <el-footer class="footer">
        <div class="info">
          <span> TkinterHelper布局助手 | </span>
          <a href="https://github.com/iamxcd/tkinter-helper"
            target="_blank">github | </a>
          <a href="https://zhuanlan.zhihu.com/p/532678277"
            target="_blank">使用说明 | </a>
          <a href="http://beian.miit.gov.cn/"
            target="_blank">蜀ICP备18032036号</a>
        </div>
      </el-footer>
    </el-container>

    <CodeView ref="code_view"></CodeView>
    <VueContextMenu :contextMenuData="contextMenuData"
      @delEle="delEle"></VueContextMenu>
  </div>
</template>

<script>
import uniqid from "uniqid";

import GenerateCode from "./generate-code";
import CodeView from "./components/code-view.vue";
import Resize from "./components/resize.vue";
import WidgetBox from "./components/widget-box.vue";
import PyAttrs from "./py-attrs.js";
import AttrsBox from "./components/attrs-box.vue";
import VueContextMenu from "./components/VueContextMenu/VueContextMenu.vue";
import { Base64 } from "js-base64";
export default {
  components: { CodeView, Resize, WidgetBox, AttrsBox, VueContextMenu },
  name: "HomeView",
  data() {
    return {
      win: {
        top: 130,
        left: 450,
        width: 600,
        height: 500,
        text: "我是标题 ~ TkinterHelper",
      },
      elements: [],
      curIndex: undefined, //当前选择的元素的索引
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
  created() {
    let ele = localStorage.getItem("elements");
    ele = JSON.parse(ele);
    if (ele != null && ele.length > 0) {
      this.$confirm("是否恢复上次的编辑结果?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.elements = ele;
          let win = localStorage.getItem("win");
          if (win != null) {
            this.win = JSON.parse(win);
          }
        })
        .catch(() => {
          localStorage.clear();
        });
    }

    this.form = this.win;
  },
  watch: {
    elements: {
      handler(val) {
        localStorage.setItem("elements", JSON.stringify(val));
      },
      deep: true,
    },
    win: {
      handler(val) {
        localStorage.setItem("win", JSON.stringify(val));
      },
      deep: true,
    },
  },
  methods: {
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
    elementMove(e, element, index) {
      // 只处理右键点击事件
      if (e.which != 1) {
        return;
      }
      let ele = e.currentTarget; //获取组件. 绑定事件的元素
      // ele.style.cursor = "move";
      this.curIndex = index;
      // 将属性绑定到表单中
      if (index == undefined) {
        this.form = this.win;
      } else {
        this.form = this.elements[index];
      }
      // console.log(this.curIndex);

      //算出鼠标相对元素的位置
      let disX = e.clientX - ele.offsetLeft;
      let disY = e.clientY - ele.offsetTop;

      if (index == undefined) {
        disY = disY - 30; // 减去标题栏的高度
      }

      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        if (index != undefined) {
          top = parseInt(top / 10) * 10 + (top % 10 >= 5 ? 10 : 0);
          left = parseInt(left / 10) * 10 + (left % 10 >= 5 ? 10 : 0);
        }

        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }

        // 内部元素
        if (index != undefined) {
          this.elements[index].top = top;
          this.elements[index].left = left;
        } else {
          this.win.top = top;
          this.win.left = left;
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
      };
    },
    drop(evt) {
      evt.preventDefault();

      let type = evt.dataTransfer.getData("type");

      // console.log(evt.layerX, evt.layerY);
      let x = evt.dataTransfer.getData("x");
      let y = evt.dataTransfer.getData("y");

      let top = evt.layerY - y;
      let left = evt.layerX - x;
      // console.log(evt.layerX, evt.target.offsetLeft);

      top = parseInt(top / 10) * 10 + (top % 10 >= 5 ? 10 : 0);
      left = parseInt(left / 10) * 10 + (left % 10 >= 5 ? 10 : 0);

      if (top < 0) {
        top = 0;
      }
      if (left < 0) {
        left = 0;
      }

      let py = new PyAttrs();
      this.elements.push({
        ...py[type](),

        id: uniqid(),
        type: type,
        top: top,
        left: left,
      });
    },
    allowDrop(e) {
      e.preventDefault();
    },
    winResize({ width, height }) {
      this.win.width = width;
      this.win.height = height;
    },
    eleResize({ width, height }, element, index) {
      // console.log(width, height, element, index);
      this.elements[index].width = width;
      this.elements[index].height = height;
    },
    viewCode() {
      let t = new GenerateCode(this.win, this.elements);
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
        this.elements.splice(i, 1);
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
#win {
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-top-width: 2px;
  background: url("./assets/bg.png") 0px 0px;
}
#win_title {
  position: absolute;
  height: 30px;
  background-color: #fff;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  .title {
    padding-left: 10px;
  }
}
.header {
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  box-shadow: 0 1px rgb(12 13 14 / 10%), 0 1px 6px rgb(60 65 70 / 10%);

  .logo {
    flex: 1;
    width: 200px;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
  }

  .menu {
    .export_btn {
      margin-left: 10px;
    }
  }
}

.footer {
  border-top: 1px solid rgba(12, 13, 14, 0.1);

  .info {
    font-size: 10px;
    text-align: center;
    line-height: 60px;
    color: #707070;
    a {
      text-decoration: none;
      color: #707070;
    }
  }
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