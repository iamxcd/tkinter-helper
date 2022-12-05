<template>
  <div class="attrs_box">
    <el-form ref="form"
      class="form"
      size="mini"
      label-position="left"
      :model="attrsForm"
      label-width="50px">
      <el-form-item label="ID"
        v-if="attrsForm.id != null">
        <el-input v-model="attrsForm.id">
          <template slot="prepend">{{attrsForm.type}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="width">
        <el-input v-model="attrsForm.width"></el-input>
      </el-form-item>
      <el-form-item label="height">
        <el-input v-model="attrsForm.height"></el-input>
      </el-form-item>
      <el-form-item v-if="!isWin"
        label="top">
        <el-input v-model="attrsForm.top"></el-input>
      </el-form-item>
      <el-form-item v-if="!isWin"
        label="left">
        <el-input v-model="attrsForm.left"></el-input>
      </el-form-item>
      <el-form-item v-if="attrsForm.text != null"
        label="text">
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