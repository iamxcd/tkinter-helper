<template>
  <div :style="style"
    class="tk_frame">
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
.tk_frame {
  border: 1px dashed #000;
}
</style>