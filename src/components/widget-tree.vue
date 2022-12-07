<template>
  <div>
    <el-tree :data="treeData"
      :props="defaultProps"
      node-key="key"
      :indent="8"
      ref="tree"
      default-expand-all
      @node-click="handleNodeClick">
      <div class="custom-tree-node"
        :class="{active:isSelected(data)}"
        slot-scope="{ node, data }">
        <div>{{ widgetNmae(node.label) }}</div>
        <div class="key">
          {{data.id}}
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getWidgetConfig } from "@/core/widget-list";

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "type",
      },
    };
  },
  computed: {
    ...mapGetters(["attrsForm", "frame"]),
    treeData() {
      return [this.getTree(this.frame)];
    },
    isSelected() {
      return (val) => {
        let key = val.type + "_" + val.id;
        let v = this.attrsForm;
        let curKey = v.type + "_" + v.id;
        return key == curKey;
      };
    },
  },
  methods: {
    handleNodeClick(data) {
      this.$store.dispatch("app/setCurId", data.ele.id);
      this.$store.dispatch("app/setAttrsForm", data.ele);
    },
    getTree(ele) {
      let data = {};
      if (ele.frame) {
        let children = [];
        for (const i in ele.elements) {
          children.push(this.getTree(ele.elements[i]));
          data["children"] = children;
        }
      }
      data.type = ele.type;
      data.id = ele.id || "-";
      data.ele = ele;
      data.key = ele.type + "_" + ele.id;
      return data;
    },
    widgetNmae(type) {
      if (type == "tk_win") {
        return "主窗口";
      }
      let config = getWidgetConfig(type);
      return config.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  &.active {
    color: #09f;
  }
  .key {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-size: 10px;
    color: #707070;
  }
}
</style>