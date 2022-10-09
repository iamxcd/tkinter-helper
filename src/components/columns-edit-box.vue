<template>
  <div class="columns">
    <div class="column_table">
      <el-table :data="columns"
        border
        style="width: 100%">
        <el-table-column prop="name"
          label="字段名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column prop="width"
          label="宽度(%)"
          align="center">
        </el-table-column>
        <el-table-column label="#"
          align="center"
          width="50">
          <template slot-scope="{$index,row}">
            <i class="el-icon-edit edit_column_btn"
              @click="onEdit(row,$index)"></i>
            <i class="el-icon-delete del_column_btn"
              @click="delColumn($index)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button class="add_column"
      @click="open()">添加字段</el-button>

    <el-dialog title="表头设置"
      :visible.sync="isShow"
      width="30%">
      <el-form ref="formobj"
        class="formobj"
        label-position="left"
        :model="formobj"
        :rules="rules"
        label-width="80px">
        <el-form-item label="字段名称"
          prop="name">
          <el-input placeholder="请输入字段名称"
            v-model="formobj.name"></el-input>
        </el-form-item>
        <el-form-item label="宽度(%)"
          prop="width">
          <el-input-number v-model="formobj.width"
            :precision="0"
            :min="1"
            :max="100"></el-input-number>

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
      formobj: {
        name: "",
        width: 10,
      },
      rules: {
        name: [
          { required: true, message: "字段名称不能为空", trigger: "blur" },
        ],
        width: [{ required: true, message: "宽度不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["attrsForm"]),
    columns() {
      return this.attrsForm.columns;
    },
  },
  methods: {
    close() {
      this.isShow = false;
      this.editMode = false;
      this.editIndex = null;
      this.resetForm();
    },
    onEdit(row, index) {
      this.editMode = true;
      this.formobj.name = row.name;
      this.formobj.width = row.width;
      this.editIndex = index;
      this.open();
    },
    open() {
      this.isShow = true;
    },
    submit() {
      this.$refs["formobj"].validate((valid) => {
        if (valid) {
          if (this.editMode) {
            this.$set(
              this.columns,
              this.editIndex,
              JSON.parse(JSON.stringify(this.formobj))
            );
          } else {
            this.columns.push(JSON.parse(JSON.stringify(this.formobj)));
          }
          this.close();
        } else {
          return false;
        }
      });
    },
    delColumn(index) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.columns.splice(index, 1);
      });
    },

    resetForm() {
      this.formobj = {
        name: "",
        width: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  .columns_table {
    min-height: 100px;
    max-height: 250px;
    overflow: overlay;
  }
  .edit_column_btn {
    cursor: pointer;
    margin-right: 4px;
  }
  .del_column_btn {
    color: red;
    cursor: pointer;
  }
  .add_column {
    width: 100%;
    margin: 10px 0;
  }
  .formobj {
    .el-form-item {
      // margin-bottom: 2px;
    }
  }
}
</style>