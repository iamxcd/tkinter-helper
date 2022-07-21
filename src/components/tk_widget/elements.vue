<template>
  <div :id="id"
    @drop="drop($event)"
    @dragover="allowDrop($event)"
    :style="{'top':frame.top+'px','left':frame.left+'px','width':frame.width + 'px','height':frame.height +'px'}">
    <component :is="element.type"
      @keydown.native="keyDown($event)"
      :tabindex="0"
      @contextmenu.native="showMenu($event,element,index)"
      v-for="(element,index) in frame.elements"
      style="position: absolute;"
      :id="element.id"
      :style="{'top':element.top+'px','left':element.left+'px','width':element.width + 'px','height':element.height +'px'}"
      :key="index"
      :info="element"
      :class="{frame:element.frame == true}"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
      @mousedown.native="elementMove($event,element,index)">
      <template v-if="element.frame">
      </template>

      <Resize @resize="(size)=>{eleResize(size,element,index)}"
        v-show="curIndex == index"></Resize>
    </component>
    <Resize @resize="winResize"
      v-show="curIndex == undefined"></Resize>
  </div>
</template>

<script>
import uniqid from "uniqid";
import PyAttrs from "@/py-attrs.js";
import Resize from "@/components/resize.vue";
export default {
  props: ["id", "frame"],
  components: {
    Resize,
  },
  data() {
    return {
      curIndex: undefined, //当前选择的元素的索引
    };
  },
  methods: {
    winResize({ width, height }) {
      this.frame.width = width;
      this.frame.height = height;
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
        this.form = this.frame;
      } else {
        this.form = this.frame.elements[index];
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
          this.frame.elements[index].top = top;
          this.frame.elements[index].left = left;
        } else {
          this.frame.top = top;
          this.frame.left = left;
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
      let newele = {
        ...py[type](),

        id: uniqid(),
        type: type,
        top: top,
        left: left,
      };
      console.log(newele);
      let id = evt.toElement.id;
      if (this.isWin(id)) {
        this.frame.elements.push(newele);
      } else if (this.isFrame(id)) {
        let index = this.getFrameIndex(id);
        this.frame.elements[index].elements.push(newele);
      }
    },
    allowDrop(evt) {
      if (this.isWin || this.isFrame(evt.toElement.id)) {
        evt.preventDefault();
      }
    },
    eleResize({ width, height }, element, index) {
      // console.log(width, height, element, index);
      this.frame.elements[index].width = width;
      this.frame.elements[index].height = height;
    },
    isWin(id) {
      return id == "win";
    },
    isFrame(id) {
      if (this.isWin(id)) {
        return false;
      }
      let ele = _.find(this.frame.elements, { id, frame: true });
      return ele != undefined;
    },
    getFrameIndex(id) {
      return _.findIndex(this.frame.elements, { id, frame: true });
    },
  },
};
</script>


<style lang="scss" scoped>
#win {
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-top-width: 2px;
  background: url("@/assets/bg.png") 0px 0px;
}
</style>