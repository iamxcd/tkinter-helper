<template>
  <div class="main">
    <div class="logo">
      TkinterHelper
    </div>
    <div class="menu">
      <el-button type="danger"
        @click="()=>{this.$emit('clearData')}">清理数据</el-button>
      <el-button type="primary"
        @click="()=>{this.$emit('viewCode')}">Python</el-button>
      <el-dropdown split-button
        type="primary"
        class="export_btn"
        @click="()=>{this.$emit('onClickExport')}">
        导出
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-upload action=""
              :before-upload="beforeUpload"
              :limit="1">
              导入布局文件
            </el-upload>

          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beforeUpload"],
  methods: {
    clearData() {
      this.$confirm("此操作将会清空数据和缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.elements = [];
        localStorage.clear();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;

  .logo {
    flex: 1;
    width: 200px;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
  }

  .menu {
    .export_btn {
      margin-left: 10px;
    }
  }
}
</style>