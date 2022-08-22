<template>
  <div class="container">
    <component :is="element.type"
      @keydown.native="elementKeyDown($event,attrsForm)"
      :tabindex="0"
      @contextmenu.native.stop.prevent="elementShowMenu($event,index,frame)"
      v-for="(element,index) in frame.elements"
      v-show="isShowTabElement(frame,element)"
      style="position: absolute;"
      :id="element.id"
      :style="{'top':element.top+'px','left':element.left+'px','width':element.width + 'px','height':element.height +'px'}"
      :key="index"
      :info="element"
      :class="{frame:element.frame == true}"
      @drop.native.stop="dragToFrame($event,frame)"
      @dragover.native.stop="allowDrop($event,frame)"
      @mousedown.native.stop="elementMove($event,element,index,frame)">
      <Resize @resize="(size)=>{elementResize(size,element,index,frame)}"
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

import {
  isWin,
  isFrame,
  getFrameIndex,
  elementMove,
  elementResize,
  elementKeyDown,
  elementShowMenu,
  isShowTabElement,
  allowDrop,
  dragToFrame,
} from "@/core/comp-func.js";

export default {
  props: ["frame"],
  components: {
    Resize,
  },
  data() {
    return {
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
  computed: {
    ...mapGetters(["curId", "attrsForm"]),
  },
  methods: {
    ...mapActions(["setCurId", "setAttrsForm", "showContextMenu"]),
    elementMove,
    elementKeyDown,
    elementShowMenu,
    elementResize,
    isShowTabElement,
    isWin,
    isFrame,
    getFrameIndex,
    allowDrop,
    dragToFrame,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 0;
  height: 0;
}
</style>