<template>
  <div>
    <el-dialog title="提示"
      :visible.sync="is_show"
      width="50%">
      <codemirror ref="mycode"
        v-modle="curCode"
        :options="cmOptions"
        class="code">
      </codemirror>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_show: true,
      curCode: "777",
      cmOptions: {
        mode: "text/x-python", //第一个将模式名称映射到它们的构造函数，第二个将MIME类型映射到模式规范。
        theme: "liquibyte", //编辑器样式的主题
        indentWithTabs: true, //在缩进时，是否tabSize 应该用N个制表符替换前N *个空格。默认值为false。
        smartIndent: true, //是否使用模式提供的上下文相关缩进（或者只是缩进与之前的行相同）。默认为true。
        lineNumbers: true, //是否在编辑器左侧显示行号。
        matchBrackets: true, //括号匹配
      },
    };
  },
};
</script>

<style>
</style>