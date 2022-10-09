<template>
  <div :style="style"
    class="tk_table">
    <table class="tbl">
      <tr class="title">
        <td v-for="(item,i) in columns"
          :style="{'width':getpx(item.width)+'px'}"
          :key="i">{{item.name}}</td>
      </tr>
    </table>
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
      // columns: [
      //   { name: "ID", width: 50 },
      //   { name: "网站名", width: 100 },
      //   { name: "地址", width: 300 },
      // ],
    };
  },
  computed: {
    style() {
      return {
        width: this.info.width,
        height: this.info.height,
      };
    },
    columns() {
      return this.info.columns;
    },
  },
  methods: {
    getpx(r) {
      return (this.info.width * r) / 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_table {
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