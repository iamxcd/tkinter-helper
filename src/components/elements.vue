<template>
  <div class="container">
    <!-- @contextmenu.prevent.stop="showMenu($event,'win')" -->
    <div :id="id"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
      :style="{'top':frame.top+'px','left':frame.left+'px','width':frame.width + 'px','height':frame.height +'px'}">
      <comp :frame="frame">
      </comp>
      <Resize @resize="winResize"
        v-show="curId == 'win'"></Resize>
    </div>
    <!-- @contextmenu.prevent.stop="showMenu($event,'title')" -->
    <div id="win_title"
      @mousedown="winMove($event)"
      :style="{'top':frame.top-30+'px','left':frame.left+'px','width':frame.width + 'px'}">
      <span class="title">{{frame.text}}</span>
    </div>
  </div>
</template>

<script>
import uniqid from "uniqid";
import PyAttrs from "@/py-attrs.js";
import Resize from "@/components/resize.vue";
import { mapGetters, mapActions } from "vuex";
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
    winResize({ width, height }) {
      this.frame.width = width;
      this.frame.height = height;
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

      let id = evt.toElement.id;
      if (this.isWin(id)) {
        this.frame.elements.push(newele);
      } else if (this.isFrame(id)) {
        let index = this.getFrameIndex(id);
        let frame = this.frame.elements[index];
        // 处理特殊情况 选项卡 记录当前的tab索引
        if (frame.type == "tk_tabs") {
          newele.tab = frame.curTab;
        }
        frame.elements.push(newele);
      }
    },
    allowDrop(evt) {
      if (this.isWin || this.isFrame(evt.toElement.id)) {
        evt.preventDefault();
      }
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
    showMenu(event, position) {
      event.preventDefault();
      this.$store.dispatch("showContextMenu", {
        x: event.clientX,
        y: event.clientY,
        frame: this.frame,
        position,
      });
    },
    winMove(e) {
      // 只处理右键点击事件
      if (e.which != 1) {
        return;
      }
      let ele = e.currentTarget; //获取组件. 绑定事件的元素
      // ele.style.cursor = "move";
      this.$store.dispatch("setCurId", "win");
      // 将属性绑定到表单中
      this.$store.dispatch("setAttrsForm", this.frame);

      // console.log(this.curIndex);

      //算出鼠标相对元素的位置
      let disX = e.clientX - ele.offsetLeft;
      let disY = e.clientY - ele.offsetTop;

      disY = disY - 30; // 减去标题栏的高度

      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        this.frame.top = top;
        this.frame.left = left;
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
      };
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