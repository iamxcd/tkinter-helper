<template>
  <div :style="style"
    class="text">
    文本框
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
.text {
  border: 1px solid #000;
  background-color: #fff;
}
</style>