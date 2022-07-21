<template>
  <div :id="id"
    @drop="drop($event)"
    @dragover="allowDrop($event)"
    :style="{'top':frame.top+'px','left':frame.left+'px','width':frame.width + 'px','height':frame.height +'px'}">
    <comp :frame="frame">
    </comp>
    <Resize @resize="winResize"
      v-show="curId == 'win'"></Resize>
  </div>
</template>

<script>
import uniqid from "uniqid";
import PyAttrs from "@/py-attrs.js";
import Resize from "@/components/resize.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["id", "frame"],
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
    ...mapActions(["setCurId"]),
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