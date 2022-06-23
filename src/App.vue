<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <div class="logo">
          TkHelper
        </div>
        <div class="menu">
          <el-button type="primary"
            @click="viewCode()">Python</el-button>
        </div>
      </el-header>
      <el-container style="height:calc(100vh - 60px - 60px - 1px);">
        <WidgetBox></WidgetBox>
        <el-main>
          <div id="window"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            :style="{'top':window.top+'px','left':window.left+'px','width':window.width + 'px','height':window.height +'px'}">
            <component :is="element.type"
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
            :style="{'top':window.top-30+'px','left':window.left+'px','width':window.width + 'px'}">
            <span class="title">{{window.text}}</span>
          </div>
        </el-main>
        <AttrsBox v-model="form"></AttrsBox>
      </el-container>
      <el-footer class="footer">
        <div class="info">
          <span> TkHelper布局助手 | </span>
          <a href="https://www.zhihu.com/people/iamxcd"
            target="_blank">知乎 | </a>
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
export default {
  components: { CodeView, Resize, WidgetBox, AttrsBox, VueContextMenu },
  name: "HomeView",
  data() {
    return {
      window: {
        top: 130,
        left: 450,
        width: 600,
        height: 500,
        text: "我是标题",
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
  methods: {
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
        this.form = this.window;
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
          this.window.top = top;
          this.window.left = left;
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
      this.window.width = width;
      this.window.height = height;
    },
    eleResize({ width, height }, element, index) {
      // console.log(width, height, element, index);
      this.elements[index].width = width;
      this.elements[index].height = height;
    },
    viewCode() {
      let t = new GenerateCode(this.window, this.elements);
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
  },
};
</script>

<style lang="scss" scoped>
.home {
}
#window {
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
</style>