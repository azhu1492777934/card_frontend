<template>
  <div class="result-wrapper">
    <div class="bg-wrapper"></div>
    <div class="content-wrapper">

      <div class="tip-wrapper">
        <p>完成实名后续充值套餐方可正常使用</p>
      </div>

      <div class="result-img"></div>
      <p>实名未通过</p>

      <!--原因-->
      <div class="causes-wrapper">
        <p>可能原因：</p>
        <p>1、证件照反光有水印/证件过期</p>
        <p>2、姓名与证件号不符</p>
        <p>3、持证人与证件不符/头发遮挡面部</p>
        <p>4、照片非本人拍摄</p>
      </div>

      <!--联系客服-->
      <div @click="toService" class="contact-wrapper">联系客服</div>

      <!--操作-->
      <button @click="goToIndex" class="btn-exit">退出实名</button>
      <div class="btn-realname-wrapper">
        <button @click="realnameAgain" class="btn-realname">再次实名</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getStorage,inArray} from "../../utilies";

  export default {
    name: "uploadIdCard",
    data() {
      return {
        cardData: getStorage('cardData') || {},
      }
    },
    methods: {
      goToIndex() {
        if (inArray(this.cardData.source, ['26', '37']) >= 0) {
          location.href = `http://mifi.china-m2m.com?iccid=${this.cardData.iccid}`;
        } else {
          this.$router.push('/');
        }
      },
      realnameAgain() {
        this.$router.push('/realname/upload_info');
      },
      toService() {
        location.href = 'https://cschat.antcloud.com.cn/index.htm?tntInstId=QWGLZKQM&scene=SCE00040313#/'
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .result-wrapper {
    padding-top: 35px;
    /*font-size: 24px;*/
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
        padding: 70px 9% 70px;

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
        .bg-image('../../assets/imgs/verification/result_error');

        & + p {
          padding: 25px 0 30px;
          font-size: 29px;
          text-align: center;
        }
      }

      .causes-wrapper {
        padding: 0 30px;
        font-size: 24px;
        line-height: 1.8;
        text-align: left;

        p {
          text-indent: 40px;

          &:first-child {
            text-indent: 0;
          }
        }
      }

      .contact-wrapper {
        position: relative;
        margin: 0 9%;
        color: #2e82ff;
        font-size: 24px;
        text-align: right;

        &:after {
          position: absolute;
          right: 0;
          content: '';
          display: block;
          width: 95px;
          height: 1px;
          background-color: #2e82ff;
        }
      }

      .btn-exit {
        width: 100%;
        padding: 45px 10px;
        font-size: 34px;
        text-align: center;
        background-color: transparent;

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
