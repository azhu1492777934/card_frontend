<template>
  <ul class="skeleton-list-wrap" :class="{'type-horizontal':horizontal}">
    <li v-for="(item,i) in list"></li>
  </ul>
</template>
<script>
  export default {
    name: "List",
    props:{
      number:{
        type:Number,
        default: 21,
      },
      vertical:{
        type:Boolean,
        default:true
      },
      horizontal:{
        type:Boolean,
      }
    },
    data() {
      return {
        list: [],
      }
    },
    created() {
      for(let i=0;i<this.number;i++){
        this.list.push(i);
      }
    }
  }
</script>

<style lang="less">
  .skeleton-list-wrap {
    height: 100vh;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    &.type-horizontal{
      display: flex;
      flex-wrap: wrap;
      -webkit-box-lines: multiple;
      align-content: space-between;
      li{
        width: 30%;
        margin-right: 33px;
        height: 150px;
        &:nth-child(3n){
          margin-right: 0;
        }
      }
    }
    .animationMixin() {
      background-size: 400% 100%;
      background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
      animation: skeleton-loading 1.4s ease infinite;
    }


    li {
      list-style: none;
      height: 63px;
      margin-bottom: 32px;
      .animationMixin();
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  }
</style>
