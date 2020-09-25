<template>
  <div>
    <div class="loading" v-if="loading">
      <van-loading vertical size="64px" :color="colorLoading"/>
      <span>{{loadingText}}</span> 
    </div>
  </div>
</template>

<script>
import { Loading } from 'vant'
export default {
  name: 'loading',
  components: {
    [Loading.name]: Loading
  },
  props: {
    loading: {
      trpe: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    colorLoading: {
      type: String,
      default: '#c8c9cc'
    }
  }
}
</script>

<style lang="less" scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 260px;
    background: #3C3C3C;
    opacity: .68;
    border-radius: 9px;
    z-index: 11;
    font-size: 24px;
    color: #EBEBEB;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    span:nth-child(2){
      display: block;
      margin-top: 15px; 
      font-size: 30px;
    }
  }
</style>