<template>
  <div :style="style"
    class="tk_check_button">
    <input type="checkbox">
    <span class="val">{{info.text}}</span>
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
.tk_check_button {
  border: 1px dashed #000;
  overflow: hidden;
}
</style>