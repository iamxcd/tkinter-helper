<template>
  <div :style="style"
    class="tk_lable">
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
.tk_lable {
  border: 1px dashed #000;
  text-align: center;
  overflow: hidden;
}
</style>