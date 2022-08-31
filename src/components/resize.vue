<template>
  <div class="resize"
    @mousedown.stop="resize($event)">
  </div>
</template>

<script>
export default {
  methods: {
    resize(evt) {
      let parentEle = evt.target.parentElement;
      let info = parentEle.getBoundingClientRect();
      let x = evt.pageX;
      let y = evt.pageY;
      let w = info.width;
      let h = info.height;
      document.onmousemove = (e) => {
        this.$emit("resize", {
          width: Math.max(24, parseInt(e.pageX - x + w)),
          height: Math.max(24, parseInt(e.pageY - y + h)),
        });
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.resize {
  width: 5px;
  height: 5px;
  overflow: hidden;
  cursor: se-resize;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #409eff;
}
</style>