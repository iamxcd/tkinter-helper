<template>
  <div :style="style"
    class="tk_list_box">
    <div v-for="(txt,index) in list"
      :key="index"
      :class="{'cur-index':curIndex==index}"
      @click="curIndex = index">
      {{txt}}
    </div>
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
      // list: ["列表框", "Python", "Tkinter Helper"],
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
.tk_list_box {
  border: 1px solid #000;
  background-color: #fff;
  overflow: hidden;
  .cur-index {
    background-color: rgb(0, 120, 215);
    color: #fff;
  }
}
</style>