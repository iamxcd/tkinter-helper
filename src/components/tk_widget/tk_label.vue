<template>
  <div :style="style"
    class="lable">
    <span class="val">{{info.text}}</span>
    <slot></slot>
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
  },
};
</script>

<style lang="scss" scoped>
.lable {
  border: 1px dashed #000;
  text-align: center;
  overflow: hidden;
}
</style>