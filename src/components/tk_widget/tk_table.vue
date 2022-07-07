<template>
  <div :style="style"
    class="container">
    <table class="tbl">
      <tr class="title">
        <td v-for="(item,i) in columns"
          :style="{'width':item.width+'px'}"
          :key="i">{{item.name}}</td>
      </tr>
      <tr class="list"
        v-for="(item,i) in tableData"
        :key="i"
        :class="{selected: selected == i}"
        @click="selected = i">
        <td v-for="(val,j) in item"
          :key="j">
          {{val}}
        </td>

      </tr>
    </table>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      selected: null,
      columns: [
        { name: "ID", width: 50 },
        { name: "网站名", width: 100 },
        { name: "地址", width: 300 },
      ],
      tableData: [
        [1, "github", "https://github.com/iamxcd/tkinter-helper"],
        [2, "演示地址", "https://www.codingstudy.cn/tkinter-helper"],
      ],
    };
  },
  computed: {
    style() {
      return {
        width: this.info.width,
        height: this.info.height,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #aaa;
  background-color: #fff;
  overflow: hidden;
  font-size: 12px;
  .tbl {
    border-collapse: collapse;
    td {
      text-align: center;
    }

    .title {
      td {
        border-right: 1px #aaa solid;
        &:last-child {
          border-right: none;
        }
      }
    }

    .list {
      &.selected {
        background-color: rgb(0, 120, 215);
        color: #fff;
      }
    }
  }
}
</style>