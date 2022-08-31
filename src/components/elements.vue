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
  created() {
    this.init();
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
    ...mapActions(["setCurId", "setAttrsForm"]),
    winResize,
    dragToFrame,
    allowDrop,
    isWin,
    isFrame,
    getFrameIndex,
    elementShowMenu,
    winMove,
    init() {
      let win = localStorage.getItem("win");
      win = JSON.parse(win);
      if (win != null) {
        this.$confirm("是否恢复上次的编辑结果?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("setFrame", win);
            this.$store.dispatch("setAttrsForm", win);
          })
          .catch(() => {
            localStorage.clear();
            this.$store.dispatch("setAttrsForm", this.frame);
          });
      } else {
        this.$store.dispatch("setAttrsForm", this.frame);
      }
    },
    onClickWin() {
      this.$store.dispatch("setCurId", "win");
    },
  },
};
</script>


<style lang="scss" scoped>
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