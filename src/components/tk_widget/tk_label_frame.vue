<template>
  <fieldset :style="style"
    class="tk_label_frame">
    <legend>{{info.text}}</legend>
    <slot></slot>
  </fieldset>

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
.tk_label_frame {
  position: absolute;
  border: 1px solid #bbb;
  .label {
    top: -12px;
    left: 20px;
  }
}
</style>