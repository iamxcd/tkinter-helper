<template>
  <div class="container">
    <Draggable v-for="(element,index) in frame.elements"
      @mousedown.native.stop="elementMove($event,element,index,frame)"
      @drop.native.stop="dragToFrame($event,frame)"
      @dragover.native.stop="allowDrop($event,frame)"
      v-show="isShowTabElement(frame,element)"
      @resize="(size)=>{elementResize(size,element,index,frame)}"
      :key="index"
      :active="curId == element.id"
      :element="element">
      <component :is="element.type"
        @keydown.native="elementKeyDown($event,attrsForm)"
        :tabindex="0"
        :style="{'top':element.top+'px','left':element.left+'px','width':element.width + 'px','height':element.height +'px'}"
        @contextmenu.native.stop.prevent="elementShowMenu($event,index,frame)"
        :id="element.id"
        :info="element"
        :class="{frame:element.frame == true}">
        <template v-if="element.frame">
          <comp :frame="element"></comp>
        </template>
      </component>
    </Draggable>

  </div>
</template>

<script>
import Resize from "@/components/resize.vue";
import { mapActions, mapGetters } from "vuex";
import Draggable from "@/components/draggable/index.vue";
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
    Draggable,
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
    ...mapGetters(["attrsForm", "curId"]),
  },
  methods: {
    ...mapActions({
      setCurId: "app/setCurId",
      setAttrsForm: "app/setAttrsForm",
      showContextMenu: "app/showContextMenu",
    }),
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