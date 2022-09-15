<template>
  <div :style="style"
    class="tk_progressbar">
    <div class="val"
      :style="valStyle"></div>
    
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  computed: {
    style() {
      return {
        width: this.info.width,
        height: this.info.height,
      };
    },
    valStyle() {
      let v = {
        position: "absolute",
        width: "inherit",
        height: "60%",
        bottom: 0,
      };
      let h = {
        width: "60%",
        height: "inherit",
      };
      return this.info.width > this.info.height ? h : v;
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_progressbar {
  border: 1px solid #000;
  background-color: #fff;
  padding: 2px;

  .val {
    background: rgb(6, 176, 37);
  }
}
</style>