<template>
  <div class="info">
    <span>{{$config.name}} | </span>
    <span>V{{$config.version}} | </span>
    <a href="https://github.com/iamxcd/tkinter-helper"
      target="_blank">github | </a>
    <a href="https://zhuanlan.zhihu.com/p/532678277"
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