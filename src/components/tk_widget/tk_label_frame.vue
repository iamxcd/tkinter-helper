<template>
  <fieldset :style="style"
    class="tk_label_frame">
    <legend class="title">{{info.text}}</legend>
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
        padding: 0,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_label_frame {
  border: 1px solid #bbb;
  .title {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>