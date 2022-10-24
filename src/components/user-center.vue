<template>
  <el-dialog title="用户面板"
    class="login-box"
    v-if="show"
    :close-on-click-modal="false"
    :visible.sync="show"
    fullscreen
    :before-close="close">
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
  },
};
</script>

<style>
</style>