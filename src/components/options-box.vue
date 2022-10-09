<template>
  <div class="set-options">
    <div class="list">
      <div class="item"
        v-for="(item,index) in list"
        :key="index">
        <span class="text">{{item}}</span>
        <i class="el-icon-edit edit_option_btn"
          @click="onEdit(item,index)"></i>
        <i class="el-icon-delete del_option_btn"
          @click="delOption(index)"></i>
      </div>
    </div>
    <el-button class="add_options"
      @click="open()">添加</el-button>

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
      editMode: false,
      editIndex: null,
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
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.attrsForm[this.key].splice(index, 1);
      });
    },
    close() {
      this.isShow = false;
      this.editMode = false;
      this.editIndex = null;
    },
    submit() {
      this.$refs["optionForm"].validate((valid) => {
        if (valid) {
          if (this.editMode) {
            this.$set(
              this.attrsForm[this.key],
              this.editIndex,
              this.optionForm.name
            );
          } else {
            this.attrsForm[this.key].push(this.optionForm.name);
          }
          this.close();
          this.resetForm();
        } else {
          return false;
        }
      });
    },
    onEdit(item, index) {
      this.editMode = true;
      this.optionForm.name = item;
      this.editIndex = index;
      this.open();
    },
    open() {
      this.isShow = true;
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
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px 4px;
    .item {
      display: flex;
      align-items: center;
      padding: 2px 4px;
      border-radius: 3px;
      &:hover {
        background-color: rgb(0, 120, 215);
        color: #fff;
      }
      .text {
        flex: 1;
      }
      .edit_option_btn {
        cursor: pointer;
        margin-right: 4px;
      }
      .del_option_btn {
        color: red;
        cursor: pointer;
      }
    }
  }
  .add_options {
    width: 100%;
    margin: 10px 0;
  }
}
</style>