<template>
  <button class="tk_button">
    <div :style="{'line-height':info.height+'px'}">
      {{info.text}}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.tk_button {
  text-align: center;
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
}
</style>