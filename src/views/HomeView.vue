<template>
  <div class="home">
    <div>
      <button draggable="true" id="py_btn" @dragstart="dragstart($event)">元素</button>
    </div>
    <div id="window" @mousedown="elementMove($event)" @drop="drop($event)" @dragover="allowDrop($event)">
      <component :is="element.type" v-for="(element,index) in elements" style="position: absolute;" :style="{'top':element.top+'px','left':element.left+'px'}" :key="index" @mousedown.native.stop="elementMove($event,element,index)"></component>
    </div>
    <div>
      {{elements}}
    </div>
  </div>
</template>

<script>
import uniqid from "uniqid";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      window: {},
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

        // 如果是内部的元素直接赋值 用vue的数据绑定 去更新样式
        if (index != undefined) {
          this.elements[index].top = top;
          this.elements[index].left = left;
        } else {
          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;

          //移动当前元素
          ele.style.left = left + "px";
          ele.style.top = top + "px";
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
      e.dataTransfer.setData("Text", e.target.id);
      let x = e.layerX;
      let y = e.layerY;

      e.dataTransfer.setData("x", x);
      e.dataTransfer.setData("y", y);
    },
    drop(evt) {
      evt.preventDefault();
      let data = evt.dataTransfer.getData("Text");

      let node = document.getElementById(data);
      node.style.position = "absolute";

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
        type: "py-button",
        top: top,
        left: left,
      });
    },
    allowDrop(e) {
      e.preventDefault();
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
  top: 100px;
  left: calc((100% - 600px) / 2);
  width: 600px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-top-width: 4px;
  background: url("../assets/bg.png") 0px 0px;
  z-index: 98;
}
</style>
