<template>
  <div class="info">
    <span>{{$config.name}} V{{$config.version}} | </span>
    <span>Q群：{{$config.qq_group}} | </span>
    <a href="http://beian.miit.gov.cn/"
      target="_blank">蜀ICP备18032036号</a>
  </div>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.info {
  font-size: 10px;
  text-align: center;
  color: #707070;
  user-select: text;
  a {
    text-decoration: none;
    color: #707070;
  }
}
</style>