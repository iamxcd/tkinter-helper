<template>
  <button>
    {{info.text}}
    <slot></slot>
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

<style>
</style>