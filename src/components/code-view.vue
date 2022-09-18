<template>
  <div class="code_view">
    <el-dialog title="Python"
      top="30px"
      :visible.sync="is_show"
      width="80%">
      <codemirror v-model="code"
        :options="cmOption" />
    </el-dialog>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
require("codemirror/mode/python/python.js");

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      code: "",
      is_show: false,
      cmOption: {
        lineNumbers: true,
        mode: "text/x-python",
        theme: "base16-light",
      },
    };
  },
  methods: {
    open(code) {
      this.code = code;
      this.is_show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.code {
  height: auto !important;
}
</style>

<style lang="scss">
.code_view {
  .el-dialog__body {
    padding: 0;
  }

  .CodeMirror {
    height: 500px !important;
  }
}
</style>