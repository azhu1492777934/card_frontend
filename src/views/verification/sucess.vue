<template>
  <div class="result-wrapper">
    <div class="bg-wrapper"></div>
    <div class="content-wrapper">

      <div class="tip-wrapper">
        <p>完成实名后续充值套餐方可正常使用</p>
      </div>

      <div class="result-img"></div>
      <p>实名审核通过</p>

      <div class="btn-realname-wrapper">
        <button @click="buypLan" class="btn-realname">去选购套餐</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getStorage} from "../../utilies";

  export default {
    name: "auditSuccess",
    data() {
      return {}
    },
    methods: {
      buypLan() {
        if (['26','37'].includes(getStorage('cardData','obj').source)) {
          let cardData = getStorage('cardData', 'obj');
          location.href = `http://mifi.china-m2m.com/plan_list?iccid=${cardData.iccid}`
        }
        this.$router.push('/weixin/card/plan_list');
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .result-wrapper {
    padding-top: 35px;
    font-size: 28px;
    color: #585858;

    .bg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 345px;
      background-color: #faca07;
    }

    .content-wrapper {
      position: relative;
      margin: 0 3%;
      background-color: #fff;
      -webkit-border-top-left-radius: 30px;
      -webkit-border-top-right-radius: 30px;
      min-height: calc(~ '100vh - 40px');
      box-shadow: 0 0 9px 0 #e6e6e6;
      z-index: 1;

      .tip-wrapper {
        padding: 95px 9% 70px;

        p {
          padding: 15px 0;
          color: #585858;
          background-color: #eaf3fb;
          font-size: 24px;
          text-align: center;
        }
      }

      .result-img {
        width: 85%;
        height: 320px;
        margin: 0 auto;
        .bg-image('../../assets/imgs/verification/result_success');

        & + p {
          padding: 90px 0 50px;
          font-size: 34px;
          text-align: center;
        }
      }

      .btn-realname-wrapper {
        margin: 0 5%;
      }

      .btn-realname {
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
        padding: 16px 0;
        font-size: 34px;
        border-radius: 60px;
        border: none;
        box-sizing: content-box;
        background-image: linear-gradient(135deg, #f0b546 5%, #fdd47a 100%);
      }

    }
  }

  // toast
  .van-toast--text {
    font-size: 20px;
  }
</style>
