<template>
  <div class="container">
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
      @mousedown.native.stop="elementMove($event,element,index)">
      <Resize @resize="(size)=>{eleResize(size,element,index)}"
        v-show="curId == element.id"></Resize>
      <template v-if="element.frame">
        <comp :frame="element"></comp>
      </template>
    </component>
  </div>
</template>

<script>
import Resize from "@/components/resize.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["frame"],
  components: {
    Resize,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["curId"]),
  },
  methods: {
    ...mapActions(["setCurId", "setAttrsForm"]),
    elementMove(e, element, index) {
      // 只处理右键点击事件
      if (e.which != 1) {
        return;
      }
      let ele = e.currentTarget; //获取组件. 绑定事件的元素
      // ele.style.cursor = "move";
      this.$store.dispatch("setCurId", element.id);
      // 将属性绑定到表单中
      this.$store.dispatch("setAttrsForm", element);

      // console.log(this.curId);

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

        this.frame.elements[index].top = top;
        this.frame.elements[index].left = left;
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
      };
    },
    eleResize({ width, height }, element, index) {
      this.frame.elements[index].width = width;
      this.frame.elements[index].height = height;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 0;
  height: 0;
}
</style>