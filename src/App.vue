<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        LOGO
      </div>
      <div class="menu">
        <el-button type="primary"
          @click="copyPy()">复制</el-button>
      </div>
    </div>
    <div>
      <button draggable="true"
        id="tk_button"
        @dragstart="dragstart($event)">元素</button>
    </div>
    <div id="window"
      @mousedown="elementMove($event)"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
      :style="{'top':window.top+'px','left':window.left+'px','width':window.width + 'px','height':window.height +'px'}">
      <component :is="element.type"
        v-for="(element,index) in elements"
        style="position: absolute;"
        :style="{'top':element.top+'px','left':element.left+'px'}"
        :key="index"
        @mousedown.native.stop="elementMove($event,element,index)"></component>
      <resize @resize="resize"></resize>
    </div>
    <div>
      {{window}}
      {{elements}}
    </div>
  </div>
</template>

<script>
import uniqid from "uniqid";

import GenerateCode from "./generate-code";
export default {
  name: "HomeView",
  data() {
    return {
      window: {
        top: 100,
        left: 450,
        width: 600,
        height: 500,
      },
      elements: [],
    };
  },
  methods: {
    elementMove(e, element, index) {
      let ele = e.target; //获取目标元素
      ele.style.cursor = "move";

      //算出鼠标相对元素的位置
      let disX = e.clientX - ele.offsetLeft;
      let disY = e.clientY - ele.offsetTop;

      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        top = parseInt(top / 10) * 10 + (top % 10 >= 5 ? 10 : 0);
        left = parseInt(left / 10) * 10 + (left % 10 >= 5 ? 10 : 0);

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
          //绑定元素位置到positionX和positionY上面
          // this.positionX = top;
          // this.positionY = left;
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        ele.style.cursor = "default";
      };
    },
    dragstart(e) {
      console.log(e);
      e.dataTransfer.setData("type", e.target.id);

      e.dataTransfer.setData("x", e.layerX);
      e.dataTransfer.setData("y", e.layerY);
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

      this.elements.push({
        id: uniqid(),
        type: type,
        top: top,
        left: left,
      });
    },
    allowDrop(e) {
      e.preventDefault();
    },
    resize({ width, height }) {
      this.window.width = width;
      this.window.height = height;
    },
    copyPy() {
      let t = new GenerateCode(this.window, this.elements);
      let code = t.build();
      console.log(code);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
#window {
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-top-width: 4px;
  background: url("./assets/bg.png") 0px 0px;
}
.header {
  border-bottom: 1px solid #d1d1d1;
  height: 70px;
  display: flex;
  align-items: center;
  .logo {
    flex: 1;
    width: 200px;
    font-size: 24px;
    line-height: 70px;
    padding-left: 30px;
  }

  .menu {
  }
}
</style>

<style>
body {
  user-select: none;
  margin: 0;
  padding: 0;
}
</style>