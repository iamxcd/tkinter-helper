<template>
  <div class="attrs_box">
    <el-form ref="form"
      class="form"
      size="mini"
      label-position="left"
      :model="attrsForm"
      label-width="70px">
      <el-form-item label="组件ID"
        v-if="attrsForm.id != null">
        <el-input v-model="attrsForm.id">
          <template slot="prepend">{{attrsForm.type}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="attrsForm.width"></el-input>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="attrsForm.height"></el-input>
      </el-form-item>
      <el-form-item v-if="!isWin"
        label="距顶距离">
        <el-input v-model="attrsForm.top"></el-input>
      </el-form-item>
      <el-form-item v-if="!isWin"
        label="距左距离">
        <el-input v-model="attrsForm.left"></el-input>
      </el-form-item>
      <el-form-item label="显示组件"
        v-if="!isWin">
        <el-switch v-model="attrsForm.is_show"></el-switch>
      </el-form-item>
      <el-form-item v-if="attrsForm.text != null"
        label="文字">
        <el-input v-model="attrsForm.text"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["attrsForm"]),
    isWin() {
      return this.attrsForm.type == "tk_win";
    },
  },
};
</script>


<style lang="scss" scoped>
.attrs_box {
  z-index: 10;
  .form {
    .el-form-item {
      margin-bottom: 2px;
    }
  }
}
</style>