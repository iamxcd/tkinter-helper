<template>
  <div class="attrs_box">
    <el-form ref="form"
      class="form"
      size="mini"
      label-position="left"
      :model="attrsForm"
      label-width="100px">
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
      <el-form-item v-if="!isWin">
        <template slot="label">
          <el-tooltip placement="top"
            class="tip">
            <div slot="content">
              当某个组件被上层遮住，无法操作时，可将其隐藏。
              <br />
              仅在在布局助手中隐藏，生成代码时仍会生成相应组件。
            </div>
            <span>显示组件<i class="el-icon-question"></i></span>
          </el-tooltip>
        </template>
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


<style lang="scss">
.attrs_box {
  z-index: 10;
  .form {
    .el-form-item {
      margin-bottom: 2px;
      .el-form-item__content {
        text-align: right;
      }
    }
  }
}
</style>