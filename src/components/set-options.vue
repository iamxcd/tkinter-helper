<template>
  <div class="set-options">
    <div class="list">
      <div class="item"
        v-for="(item,index) in list"
        :key="index">
        {{item}}
        <i class="el-icon-delete del_bind_btn"
          @click="delOption(index)"></i>
      </div>
    </div>
    <el-button class="add_options"
      @click="isShow=true">添加</el-button>

    <el-dialog title="选项管理"
      :visible.sync="isShow"
      width="30%">
      <el-form ref="optionForm"
        class="optionForm"
        label-position="left"
        :model="optionForm"
        :rules="rules"
        label-width="80px">
        <el-form-item label="名称"
          prop="name">
          <el-input placeholder="请输入选项名称"
            v-model="optionForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="close();resetForm();">取 消</el-button>
        <el-button type="primary"
          @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isShow: false,
      optionForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["attrsForm"]),
    list() {
      return this.attrsForm[this.key];
    },
    key() {
      return this.attrsForm.type == "tk_tabs" ? "tabs" : "options";
    },
  },
  methods: {
    delOption(index) {
      this.attrsForm[this.key].splice(index, 1);
    },
    close() {
      this.isShow = false;
    },
    submit() {
      this.$refs["optionForm"].validate((valid) => {
        if (valid) {
          this.close();
          this.attrsForm[this.key].push(this.optionForm.name);
          this.resetForm();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.optionForm = {
        name: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.set-options {
  .list {
    min-height: 100px;
    max-height: 250px;
    overflow: overlay;
  }
  .add_options {
    width: 100%;
    margin: 10px 0;
  }
}
</style>