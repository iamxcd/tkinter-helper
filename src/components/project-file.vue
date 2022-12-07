<template>
  <div class="file-list">
    <div class="action-btn">
      <div class="btn">
        <el-button type="primary"
          @click="openAdd()">新增</el-button>
      </div>
      <div class="btn">
        <el-button type="danger">删除</el-button>
      </div>
    </div>
    <el-table :data="tableData">
      <el-table-column type="selection"
        width="50">
      </el-table-column>
      <el-table-column type="index"
        width="50"
        label="#">
      </el-table-column>
      <el-table-column prop="name"
        label="文件名">
      </el-table-column>
      <el-table-column label="操作"
        width="180">
        <template slot-scope="{$index,row}">
          <el-button type="text"
            @click="handleDesign($index, row)">设计布局</el-button>
          <el-button type="text"
            @click="handleEdit($index, row)">修改</el-button>
          <el-button type="text"
            @click="handleDelete($index, row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import md5 from "md5";

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        page: 1,
        page_size: 15,
        total: 0,
      },
    };
  },
  computed: {
    curProjectId() {
      return this.$route.query.pid;
    },
  },
  watch: {
    "$route.query": {
      handler(val) {
        let pid = val.pid;
        this.pagination.page = val.page;
        if (pid == null) {
          return;
        }
        this.getProjectFiles();
      },
      immediate: true,
    },
  },
  methods: {
    getProjectFiles() {
      this.$api
        .get("project-file", {
          params: { pid: this.curProjectId, page: this.pagination.page },
        })
        .then((res) => {
          // console.log(res);
          this.tableData = res.data;
          this.pagination = res.pagination;
        });
    },
    openAdd() {
      this.$prompt("请输入文件名称", "创建布局文件", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: (val) => {
          if (val == "" || val == null) {
            return "不能为空";
          }
          if (val.length > 20) {
            return "名称过长";
          }
          return true;
        },
      }).then(({ value }) => {
        this.$api
          .post("project-file", { name: value, pid: this.curProjectId })
          .then((res) => {
            this.$message.success("创建成功");
            this.getProjectFiles();
          });
      });
    },
    handleDesign(index, row) {
      this.$store.dispatch("app/setCurFileInfo", {
        id: row.id,
        name: row.name,
        md5: row.tk == null ? null : md5(row.tk),
      });
      this.$router.push({
        path: "/",
      });
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
  },
};
</script>


<style lang="scss" scoped>
.file-list {
  .action-btn {
    height: 40px;
    display: flex;
    align-items: center;
    .btn {
      margin-right: 10px;
    }
  }
}
</style>