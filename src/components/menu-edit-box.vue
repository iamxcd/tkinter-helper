<template>
  <div class="menu-edit-box">
    <el-tree :data="menus"
      class="menu-tree"
      :props="defaultProps"
      node-key="key"
      :indent="8"
      ref="tree">
      <div class="custom-tree-node"
        slot-scope="{ node, data }">
        <div>{{ node.label }}</div>
        <div class="action">
          <el-button type="text"
            size="mini"
            @click.stop="() => append(data)">
            创建子菜单
          </el-button>
          <el-button type="text"
            size="mini"
            @click.stop="() => edit(data)">
            编辑
          </el-button>
          <el-button type="text"
            size="mini"
            @click.stop="() => remove(node, data)">
            删除
          </el-button>
        </div>
      </div>
    </el-tree>

    <el-button class="add_menu_btn"
      @click="isShow=true">添加主菜单</el-button>

    <el-dialog title="菜单管理"
      :visible.sync="isShow"
      width="30%">
      <el-form ref="menuForm"
        class="menuForm"
        label-position="left"
        :model="menuForm"
        :rules="rules"
        label-width="80px">
        <el-form-item label="菜单名称"
          prop="name">
          <el-input placeholder="请输入菜单名称"
            v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="回调函数"
          prop="call">
          <el-input placeholder="请输入回调函数名"
            v-model="menuForm.call"></el-input>
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
import uniqid from "uniqid";

export default {
  data() {
    return {
      menuForm: {
        id: uniqid(),
        name: "",
        call: "",
      },
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        call: [{ message: "函数名称不能为空", trigger: "blur" }],
      },
      isShow: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      _menu_tmp: null, // 临时保存父节点信息
    };
  },
  computed: {
    ...mapGetters(["frame"]),
    menus() {
      return this.frame.menus;
    },
  },
  methods: {
    close() {
      this.isShow = false;
    },
    resetForm() {
      this.menuForm = {
        id: uniqid(),
        name: "",
        call: "",
      };
    },
    submit() {
      this.$refs["menuForm"].validate((valid) => {
        if (valid) {
          this.close();
          if (this.menuForm?._submenu) {
            // const newChild = { id: id++, label: "testtest", children: [] };
            delete this.menuForm["_submenu"];
            if (!this._menu_tmp.children) {
              this.$set(this._menu_tmp, "children", []);
            }
            this._menu_tmp.children.push(
              JSON.parse(JSON.stringify(this.menuForm))
            );
            this._menu_tmp = null;
          } else if (this.menuForm?._edit) {
            this.$set(this._menu_tmp, "name", this.menuForm.name);
            this.$set(this._menu_tmp, "call", this.menuForm.call);
            this._menu_tmp = null;
          } else {
            this.menus.push(JSON.parse(JSON.stringify(this.menuForm)));
          }
          this.resetForm();
        } else {
          return false;
        }
      });
    },
    append(data) {
      this.menuForm["_submenu"] = true;
      this.isShow = true;
      this._menu_tmp = data;
    },
    edit(data) {
      this.menuForm = JSON.parse(JSON.stringify(data));
      this.menuForm["_edit"] = true;
      this.isShow = true;
      this._menu_tmp = data;
    },
    remove(node, data) {
      this.$confirm("此操作将会删除当前菜单和子菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-edit-box {
  .menu-tree {
    min-height: 100px;
    max-height: 250px;
    overflow: overlay;
  }
  .add_menu_btn {
    width: 100%;
    margin: 10px 0;
  }
  .menuForm {
    .el-form-item {
      // margin-bottom: 2px;
    }
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  &:hover {
    .action {
      display: block;
    }
  }
  .action {
    display: none;
  }
}
</style>