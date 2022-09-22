<template>
  <div :style="style"
    class="tk_lable">
    <div class="val"
      :style="{'line-height':info.height+'px'}">{{info.text}}</div>
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

  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
}
</style>