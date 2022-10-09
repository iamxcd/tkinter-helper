<template>
  <div class="event_bind">
    <div class="event_bind_list">
      <el-table :data="event_bind_list"
        border
        style="width: 100%">
        <el-table-column prop="name"
          label="事件名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column prop="call"
          label="函数名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="#"
          align="center"
          width="40">
          <template slot-scope="{$index}">
            <i class="el-icon-delete del_bind_btn"
              @click="delBind($index)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button class="add_event_btn"
      @click="isShow=true">添加事件</el-button>

    <el-dialog title="事件管理"
      :visible.sync="isShow"
      width="30%">
      <el-form ref="eventForm"
        class="eventForm"
        label-position="left"
        :model="eventForm"
        :rules="rules"
        label-width="80px">
        <el-form-item label="事件名称"
          prop="name">
          <el-select v-model="eventForm.name"
            placeholder="请选择事件"
            allow-create
            filterable
            style="width:100%">
            <el-option-group v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option v-for="item in group.options"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.intro }}</span>
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="回调函数"
          prop="call">
          <el-input placeholder="请输入事件处理函数名"
            v-model="eventForm.call"></el-input>
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
import { key_event, mouse_event, other_event } from "@/core/py-events";
import { getWidgetConfig } from "@/core/widget-list";

export default {
  data() {
    return {
      isShow: false,
      eventForm: {
        name: "",
        call: "",
      },
      rules: {
        name: [
          { required: true, message: "事件名称不能为空", trigger: "blur" },
        ],
        call: [
          { required: true, message: "函数名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["attrsForm"]),
    event_bind_list() {
      if (this.attrsForm.event_bind_list == undefined) {
        [(this.attrsForm.event_bind_list = [])];
      }
      return this.attrsForm.event_bind_list;
    },
    options() {
      let mouseOptions = mouse_event;
      let keyOptions = key_event;
      // 合并组件自有的虚拟事件
      let otherOptions = other_event.concat(this.getVirtuaEvents());

      return [
        {
          label: "鼠标相关事件",
          options: mouseOptions,
        },
        {
          label: "键盘相关事件",
          options: keyOptions,
        },
        {
          label: "其他类型事件",
          options: otherOptions,
        },
      ];
    },
  },
  methods: {
    close() {
      this.isShow = false;
    },
    submit() {
      this.$refs["eventForm"].validate((valid) => {
        if (valid) {
          this.close();
          this.event_bind_list.push(JSON.parse(JSON.stringify(this.eventForm)));
          this.resetForm();
        } else {
          return false;
        }
      });
    },
    delBind(index) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.event_bind_list.splice(index, 1);
      });
    },
    resetForm() {
      this.eventForm = {
        name: "",
        call: "",
      };
    },
    getVirtuaEvents() {
      let type = this.attrsForm.type;
      if (!type || type == "tk_win") {
        return [];
      }

      let config = getWidgetConfig(type);
      return config["virtual_events"];
    },
  },
};
</script>

<style lang="scss" scoped>
.event_bind {
  .event_bind_list {
    min-height: 100px;
    max-height: 250px;
    overflow: overlay;
  }
  .del_bind_btn {
    color: red;
    cursor: pointer;
  }
  .add_event_btn {
    width: 100%;
    margin: 10px 0;
  }
  .eventForm {
    .el-form-item {
      // margin-bottom: 2px;
    }
  }
}
</style>