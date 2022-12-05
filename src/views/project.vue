<template>
  <div class="container">
    <div class="left">
      <div class="title"><span class="txt">项目列表</span> <span class="add"
          @click="openAdd()">新增</span></div>
      <div class="projects">
        <div class="project"
          :class="{'cur-project':curProjectId==item.id}"
          v-for="(item,index) in projectData"
          :key="index">
          <div class="name"
            @click="openProject(item)">
            {{item.name}}
          </div>
          <div class="del">
            <i class="el-icon-delete icon"
              @click="delProject(index,item.id)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <ProjectFile></ProjectFile>
    </div>
  </div>
</template>

<script>
import ProjectFile from "@/components/project-file.vue";
export default {
  components: {
    ProjectFile,
  },
  data() {
    return {
      projectData: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    curProjectId() {
      return this.$route.query.pid;
    },
  },
  methods: {
    getData() {
      this.$api.get("project").then((res) => {
        // console.log(res)
        this.projectData = res.data;
      });
    },
    delProject(index, id) {
      this.$confirm("此操作将会删除项目下所有文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.delete(`project/${id}`).then((res) => {
          this.projectData.splice(index, 1);
          this.$message.success("删除成功");
        });
      });
    },
    openProject(row) {
      this.$router.push({
        path: "/project",
        query: {
          pid: row.id,
          page: 1,
        },
      });
    },
    openAdd() {
      this.$prompt("请输入项目名称", "创建项目", {
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
        this.$api.post("project", { name: value }).then((res) => {
          this.$message.success("创建成功");
          this.getData();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  .left,
  .right {
    margin: 4px;
    padding: 4px;
    background-color: #fff;
  }

  .left {
    min-width: 300px;
    border: 1px solid #d1d1d1;
    .title {
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      font-size: 14px;
      padding: 0 10px;
      color: #303133;
      display: flex;
      box-shadow: 0 1px rgb(12 13 14 / 10%), 0 1px 6px rgb(60 65 70 / 10%);
      .txt {
        flex: 1;
      }
      .add {
        text-align: right;
        cursor: pointer;
      }
    }
    .projects {
      height: calc(100% - 40px);
      overflow-y: auto;
      white-space: nowrap;

      .project {
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        font-weight: 450;
        color: #606266;
        padding: 0 10px;
        display: flex;
        cursor: pointer;
        .name {
          flex: 1;
        }
        .del {
          display: none;
        }
        &:hover {
          background-color: #f5f7fa;
          .del {
            display: block;
          }
        }
      }

      .cur-project {
        background-color: #f5f7fa;
        .del {
          display: block;
        }
      }
    }
  }
  .right {
    flex: 1;
  }
}
</style>