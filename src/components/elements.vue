<template>
  <div class="container">
    <div :id="id"
      @drop="dragToFrame($event,frame)"
      @dragover="allowDrop($event,frame)"
      :style="{'top':frame.top+'px','left':frame.left+'px','width':frame.width + 'px','height':frame.height +'px'}"
      @mousedown="onClickWin()">
      <comp :frame="frame">
      </comp>
      <Resize @resize="(size)=>{winResize(size,frame)}"
        v-show="curId == 'win'"></Resize>
    </div>
    <div id="win_title"
      @mousedown="winMove($event,frame)"
      :style="{'top':frame.top-30+'px','left':frame.left+'px','width':frame.width + 'px'}">
      <span class="title">{{frame.text}}</span>
    </div>
  </div>
</template>

<script>
import Resize from "@/components/resize.vue";
import { mapGetters, mapActions } from "vuex";
import {
  isWin,
  isFrame,
  getFrameIndex,
  elementShowMenu,
  allowDrop,
  dragToFrame,
  winMove,
  winResize,
} from "@/core/comp-func.js";
export default {
  components: {
    Resize,
  },
  data() {
    return {
      id: "win",
    };
  },
  computed: {
    ...mapGetters(["curId", "frame"]),
  },
  watch: {
    frame: {
      handler(val) {
        localStorage.setItem("win", JSON.stringify(val));
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({ attrsForm: "app/attrsForm", setCurId: "app/setCurId" }),
    winResize,
    dragToFrame,
    allowDrop,
    isWin,
    isFrame,
    getFrameIndex,
    elementShowMenu,
    winMove,
    onClickWin() {
      this.$store.dispatch("app/setCurId", "win");
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  position: relative;
}
#win {
  position: absolute;
  background-color: #f0f0f0;
  border: 1px solid #cccccc;
  border-top-width: 2px;
  background-size: 20px 20px, 20px 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 0);
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
</style>