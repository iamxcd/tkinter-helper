<template>
  <div :style="style"
    class="tk_tabs">
    <div class="tabs">
      <div class="tab"
        v-for="(title,index) in tabs"
        :key="index"
        @click="info.curTab = index"
        :class="{active:info.curTab==index}">
        {{title}}
      </div>
    </div>
    <div class="content"
      :id="id">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      curTab: 0,
    };
  },
  computed: {
    style() {
      return {
        width: this.info.width,
        height: this.info.height,
      };
    },
    tabs() {
      return this.info.tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_tabs {
  .tabs {
    height: 24px;

    line-height: 24px;
    display: flex;
    .tab {
      padding: 0 2px;
      border: 1px solid #bbb;
      border-left: none;
      border-bottom: none;
      font-size: 12px;
      font-weight: 500;
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
    width: 100%;

    position: absolute;
    border: 1px solid #bbb;
  }
}
</style>