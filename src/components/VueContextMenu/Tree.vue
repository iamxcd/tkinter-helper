<template>
  <div class="child-ul-wrapper"
    :class="float">
    <div v-for="i in itemchildren"
      :key="i.name"
      class="child-li-wrapper">
      <div v-if="i.children && i.children.length > 0"
        class="has-child">
        <div class="parent-name btn-wrapper-simple">
          <!-- <i :class="i.icoName ? i.icoName : ''" class="nav-icon-fontawe"></i> -->
          <span class="nav-name-right">{{ i.btnName }}</span>
          <i class="icon"></i>
        </div>
        <tree-child-component :itemchildren="i.children"
          @childhandler="fnHandler"
          :float="float" />
      </div>
      <div v-else>
        <div @click.stop="fnHandler(i)"
          class="no-child-btn btn-wrapper-simple">
          <i :class="i.icoName ? i.icoName : ''"
            class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{ i.btnName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tree-child-component",
  props: ["itemchildren", "float"],
  methods: {
    fnHandler(item) {
      this.$emit("childhandler", item);
    },
  },
};
</script>
<style scoped>
.float-status-1 {
  left: 100%;
  bottom: -1px;
  z-index: 10001;
}
.float-status-2 {
  left: 100%;
  top: -1px;
  z-index: 10001;
}
.float-status-3 {
  right: 100%;
  top: -1px;
  z-index: 10001;
}
.float-status-4 {
  right: 100%;
  bottom: -1px;
  z-index: 10001;
}

.child-ul-wrapper .has-child {
  padding: 5px 10px;
  position: relative;
}
li {
  list-style: none;
}
.parent-name .icon {
  position: absolute;
  display: block;
  top: 4px;
  right: 0;
  border-top: 4px solid transparent;
  border-left: 8px solid #111111;
  border-bottom: 4px solid transparent;
  border-right: 4px solid transparent;
}

.no-child-btn {
  padding: 5px 10px;
}

.child-ul-wrapper {
  background: #ffffff;
  position: absolute;
  display: none;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
}
.child-li-wrapper:hover > .has-child > .child-ul-wrapper {
  display: block;
}
.context-menu-list:hover,
.child-li-wrapper:hover {
  background: #2894f8;
}

.nav-icon-fontawe {
  position: absolute;
}
.nav-name-right {
  white-space: nowrap;
  display: block;
  margin: auto 20px;
}
.btn-wrapper-simple {
  position: relative;
  height: 16px;
  line-height: 16px;
}
</style>