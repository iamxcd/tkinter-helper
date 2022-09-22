<template>
  <fieldset :style="style"
    class="tk_label_frame">
    <legend class="title">{{info.text}}</legend>
    <div class="content"
      :id="id">
      <slot></slot>
    </div>
  </fieldset>

</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
    id: {
      type: String,
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

  .content {
    margin-top: 2px;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>