<template>
  <div :style="style"
    class="tk_input">
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
.tk_input {
  border: 1px solid #000;
  background-color: #fff;
}
</style>