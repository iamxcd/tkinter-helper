<template>
  <button>
    {{info.text}}
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