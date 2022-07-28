<template>
  <div :style="style"
    class="tk_tabs">
    <div class="tabs">
      <div class="tab"
        v-for="(title,index) in tabs"
        :key="index"
        @click="curTab = index"
        :class="{active:curTab==index}">
        {{title}}
      </div>
    </div>
    <div class="content">

    </div>
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
      curTab: 0,
      tabs: ["选项卡1", "选项卡2"],
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
.tk_tabs {
  position: absolute;
  .tabs {
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    .tab {
      padding: 0 2px;
      font-weight: 500;
      border: 1px solid #bbb;
      border-left: none;
      &:first-child {
        border-left: 1px solid #bbb;
      }
      &.active {
        background-color: #fff;
        border-bottom: 1px solid #fff;
      }
    }
  }
  .content {
    margin-top: -1px;
    border: 1px solid #bbb;
    height: calc(100% - 24px);
  }
}
</style>