<template>
  <div v-show="visible" class="transfer-url-wrapper">
    <div>
      <span class="deco-left"></span>
      <span class="deco-right"></span>
      <span class="word-left"></span>
      <span class="word-right"></span>
    </div>

    <div class="subscribe-wrapper">
      <img src="../../assets/imgs/transferUrl/subscribe@3x.png" alt="">
    </div>
    <div class="qr-wrapper">
      <img :src="qrImg" alt="二维码">
    </div>
    <div class="box-wrapper">
      <img src="../../assets/imgs/transferUrl/box-deco@3x.png" alt="">
      <img src="../../assets/imgs/transferUrl/only-box@3x.png" alt="">
    </div>

  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {_get} from "../../http";

  export default {
    name: "index",
    data() {
      return {
        name: "",
        message: "",
        qrImg: "",
        visible: true,
      }
    },
    components: {
      [Toast.name]: Toast,
    },
    created() {
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
      });
      _get('/newiot/v1/qrcode/conf')
        .then(res => {
          Toast.clear();
          if (res.state === 1) {
            this.visible = true;
            this.name = res.data.title;
            this.message = res.data.desc;
            this.qrImg = res.data.img;
          } else {
            Toast({
              message: res.msg,
              mask: true,
              duration: 0
            })
          }
        })
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .transfer-url-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    padding: 7vh 0 45px;
    box-sizing: border-box;
    background-image: url("../../assets/imgs/transferUrl/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .deco-left {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 361px;
      .bg-image('../../assets/imgs/transferUrl/icon-left');
      z-index: 1;
    }

    .deco-right {
      display: inline-block;
      position: absolute;
      top: 15px;
      right: 0;
      width: 110px;
      height: 334px;
      .bg-image('../../assets/imgs/transferUrl/icon-right');
      z-index: 1;
    }

    .word-left {
      display: inline-block;
      position: absolute;
      width: 226px;
      height: 363px;
      top: 50%;
      left: -70px;
      margin-top: -196.5px;
      .bg-image('../../assets/imgs/transferUrl/call-word');
    }

    .word-right {
      display: inline-block;
      position: absolute;
      width: 186px;
      height: 378px;
      top: 49%;
      right: 0;
      margin-top: -189px;
      .bg-image('../../assets/imgs/transferUrl/recharge-word');
    }

    .subscribe-wrapper {
      img {
        width: 470px;
        height: 284px;
      }
    }

    .qr-wrapper {
      padding-top: 70px;

      img {
        position: relative;
        width: 300px;
        height: 300px;
        z-index: 1;
      }
    }

    .box-wrapper {
      position: absolute;
      width: 100%;
      margin-top: calc(100vh * 0.38);

      img {
        &:first-child {
          position: absolute;
          left: 50%;
          width: 100%;
          margin-left: -50%;
          bottom: 185px;

        }

        &:last-child {
          position: absolute;
          left: 60%;
          margin-left: -50%;
          width: 574px;
          height: 417px;
          bottom: 0;
        }

      }
    }
  }


  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .transfer-url-wrapper {
      padding-top: 15vh;

      .deco-left {
        top: 10vh;
      }

      .deco-right {
        top: 10vh;
      }

      .box-wrapper {
        margin-top: calc(100vh * 0.39);

        img {
          &:first-child {
            bottom: 314px;
          }

          &:last-child {
            bottom: 145px;
          }
        }
      }
    }
  }

</style>
