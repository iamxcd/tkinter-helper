<template>
  <div class="draggable"
    :style="{'top':element.top+'px','left':element.left+'px','width':element.width + 'px','height':element.height +'px'}">
    <template v-if="active">
      <div class="xy">
        {{element.left}},{{element.top}}
      </div>
      <div class="line vertical">
      </div>
      <div class="line horizontal">
      </div>
      <div v-for="(point,index) in points"
        :key="index"
        :style="getPointStyle(point)"
        class="point"
        @mousedown.stop="resize($event,point)"
        :class="point">
      </div>
    </template>
    <div class="comp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["element", "active"],
  data() {
    return {
      points: [
        "left",
        "right",
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
    };
  },
  methods: {
    getPointStyle(point) {
      let style = {};
      point.split("-").forEach((ele) => {
        style[ele] = "-2px";
      });
      return style;
    },
    resize(evt, point) {
      let disX = evt.clientX;
      let disY = evt.clientY;

      /**
       * 原坐标和宽高
       */
      let x = this.element.left;
      let y = this.element.top;
      let w = this.element.width;
      let h = this.element.height;

      document.onmousemove = (evt1) => {
        /**
         * 鼠标的偏移量
         */
        let _x = evt1.clientX - disX;
        let _y = evt1.clientY - disY;

        let size = {};
        if (point == "bottom-right") {
          size.w = w + _x;
          size.h = h + _y;
        } else if (point == "bottom") {
          size.h = h + _y;
        } else if (point == "right") {
          size.w = w + _x;
        } else if (point == "top") {
          size.y = y + _y;
          size.h = h - _y;
        } else if (point == "top-right") {
          size.y = y + _y;
          size.h = h - _y;
          size.w = w + _x;
        } else if (point == "top-left") {
          size.y = y + _y;
          size.h = h - _y;
          size.x = x + _x;
          size.w = w - _x;
        } else if (point == "left") {
          size.x = x + _x;
          size.w = w - _x;
        } else if (point == "bottom-left") {
          size.x = x + _x;
          size.w = w - _x;
          size.h = h + _y;
        }

        this.$emit("resize", size);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.draggable {
  position: absolute;
  z-index: 10;

  .comp {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .xy {
    top: -5px;
    left: -8px;
    position: absolute;
    padding: 5px;
    transform: translate(-100%, -100%);
    color: #409eff;
    font-size: 18px;
    white-space: nowrap;
    cursor: move;
  }
  .point {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #09f;
    z-index: 1;

    &.left,
    &.right {
      top: 50%;
    }

    &.top,
    &.bottom {
      left: 50%;
    }

    &.top-right:hover,
    &.bottom-left:hover {
      cursor: nesw-resize;
    }

    &.top:hover,
    &.bottom:hover {
      cursor: n-resize;
    }

    &.left:hover,
    &.right:hover {
      cursor: e-resize;
    }

    &.top-left:hover,
    &.bottom-right:hover {
      cursor: nw-resize;
    }
  }

  .line {
    &.horizontal {
      position: absolute;
      border-top: 1px dashed #09f;
      width: 10000px;
      height: 0;
      top: 0;
      transform: translateX(-100%);
    }

    &.vertical {
      position: absolute;
      border-left: 1px dashed #09f;
      width: 0;
      height: 10000px;
      left: 0;
      transform: translateY(-100%);
    }
  }
}
</style>
