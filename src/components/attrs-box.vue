<template>
  <div class="attrs_box">
    <div class="title">组件配置</div>
    <el-form ref="form"
      class="form"
      label-position="left"
      :model="form"
      label-width="50px">
      <el-form-item label="ID"
        v-if="form.id != null">
        <el-input v-model="form.id">
          <template slot="prepend">{{form.type}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="width">
        <el-input v-model="form.width"></el-input>
      </el-form-item>
      <el-form-item label="height">
        <el-input v-model="form.height"></el-input>
      </el-form-item>
      <el-form-item label="top">
        <el-input v-model="form.top"></el-input>
      </el-form-item>
      <el-form-item label="left">
        <el-input v-model="form.left"></el-input>
      </el-form-item>
      <el-form-item v-if="form.text != null"
        label="text">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  model: {
    prop: "form",
    event: "change",
  },
  props: {
    form: Object,
  },
  data() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
.attrs_box {
  width: 300px;

  position: fixed;
  top: 90px;
  right: 10px;
  border: 1px solid #d1d1d1;
  background-color: #fff;

  padding-bottom: 30px;

  z-index: 1000;
  .title {
    font-weight: 600;
    font-size: 14px;
    margin: 20px 10px;
  }
  .form {
    margin: 10px;
  }
}
</style>