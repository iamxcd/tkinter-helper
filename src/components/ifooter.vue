<template>
  <div class="info">
    <span>{{$config.name}} V{{$config.version}} | </span>
    <a href="https://jq.qq.com/?_wv=1027&k=z438lEw3"
      target="_blank">Q群：{{$config.qq_group}} | </a>
    <a href="https://github.com/iamxcd/tkinter-helper"
      target="_blank">Github | </a>
    <a href="https://www.pytk.net/blog/1660703137.html"
      target="_blank">使用说明 | </a>
    <a href="http://beian.miit.gov.cn/"
      target="_blank">蜀ICP备18032036号</a>
  </div>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid rgba(12, 13, 14, 0.1);

  .info {
    font-size: 10px;
    text-align: center;
    line-height: 60px;
    color: #707070;
    a {
      text-decoration: none;
      color: #707070;
    }
  }
}
</style>