<template>
  <div :style="style"
    class="tk_radio_button">
    <input type="radio">
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
.tk_radio_button {
  border: 1px dashed #000;
  overflow: hidden;
}
</style>