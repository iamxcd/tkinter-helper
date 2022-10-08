<template>
  <div :style="style"
    class="tk_select_box">
    <select class="select">
      <option class="options"
        v-for="(txt,index) in list"
        :key="index">
        {{txt}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      curIndex: 0,
      // list: ["下拉选择框", "Python", "Tkinter Helper"],
    };
  },
  computed: {
    style() {
      return {
        width: this.info.width,
        height: this.info.height,
      };
    },
    list() {
      return this.info.options;
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_select_box {
  overflow: hidden;
  .select {
    width: 100%;
    height: 100%;
    // .options {
    //   &:hover {
    //     background-color: rgb(0, 120, 215) !important;
    //     color: #fff !important;
    //   }
    // }
  }
}
</style>