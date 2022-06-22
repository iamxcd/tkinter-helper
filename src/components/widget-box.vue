<template>
  <div class="ele_box">
    <div class="group">
      <div class="group_name">
        基础组件
      </div>
      <div class="list">
        <div :id="ele.type"
          class="item"
          draggable="true"
          v-for="(ele,index) in widgetList"
          @dragstart="dragstart($event)"
          :key="index">
          <div class="title">
            {{ele.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import widgetList from "@/widget-list.js";
export default {
  data() {
    return {
      widgetList,
    };
  },
  methods: {
    dragstart(e) {
      // console.log(e);
      e.dataTransfer.setData("type", e.target.id);

      // 获取鼠标拖动位置相对被拖动元素的偏移量
      e.dataTransfer.setData("x", e.offsetX);
      e.dataTransfer.setData("y", e.offsetY);
    },
  },
};
</script>

<style lang="scss" scoped>
.ele_box {
  width: 250px;
  border: 1px solid #d1d1d1;
  background-color: #fff;
  padding-bottom: 40px;
  position: fixed;
  left: 10px;
  top: 90px;
  z-index: 1000;
  .group {
    margin: 0 10px;
    .group_name {
      font-weight: 600;
      font-size: 14px;
      margin: 20px 4px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &:after {
        content: "";
        width: 30%;
        border: 1px solid transparent;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: center;

        background: #fff;
        color: #000;
        width: 30%;
        height: 30px;

        margin: 3px 0;

        border: 1px solid #eee;
        border-radius: 4px;

        cursor: pointer;

        .title {
          font-size: 12px;
        }
      }
      .item:hover {
        border: 1px solid #2e73ff;
        color: #2e73ff;
      }
    }
  }
}
</style>