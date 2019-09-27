<template>
  <div class="empty-wrapper">
    <div class="empty-inner">
      <div class="no-data-wrapper"></div>
      <div class="text-wrapper">{{text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      text: {
        type: String,
        default: "暂无数据"
      },//文案
    },
  }
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .empty-wrapper {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .no-data-wrapper {
      width: 380px;
      height: 333px;
      .bg-image('../../assets/imgs/mifi/common/noData');
    }

    .text-wrapper {
      padding: 10px;
      font-size: 28px;
      text-align: center;
    }
  }
</style>
