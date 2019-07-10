<template>
  <div class="empty-wrapper">
    <div class="empty-inner">
      <van-icon :name="name" :size="size" :color="color"/>
      <div class="text-wrapper">{{text}}</div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'vant';

  export default {
    name: "index",
    props: {
      name: {
        type: String,
        default: "warn-o"
      },
      text: {
        type: String,
        default: "暂无数据"
      },//文案
      color: {
        type: String,
        default: "#323233"
      },
      size: {
        type: Number,
        default: 40
      }
    },
    components: {
      [Icon.name]: Icon,
    }
  }
</script>

<style lang="less">
  .empty-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    align-content: center;
    .empty-inner{
      margin: 0 auto;
    }
    .text-wrapper {
      font-size: 28px;
    }
  }
</style>