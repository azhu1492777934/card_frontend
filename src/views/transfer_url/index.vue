<template>
  <div v-show="visible" class="transfer-url-wrapper">
    <div class="note-tip-wrapper">
      {{message}}
      <span class="triangle"></span>
    </div>
    <div class="qrImg-wrapper">
      <div class="animater-wrapper">
        <div class="animater-img"></div>
      </div>

      <div class="qr-inner-wrapper">
        <img :src="qrImg" alt="">
      </div>

      <div class="bar-wrapper">
        <p>{{name}}</p>
      </div>
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
      _get('/iot/v1/qrcode/conf')
        .then(res => {
          Toast.clear();
          if (res.state === 1) {
            this.visible = true;
            this.name = res.datas.title;
            this.message = res.datas.desc;
            this.qrImg = res.datas.img;
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
  .transfer-url-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding:10vh 0;
    box-sizing: border-box;
    background-image: url("../../assets/imgs/transferUrl/bg.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .note-tip-wrapper {
      width: 55%;
      height: 147px;
      margin-left: 220px;
      padding: 20px;
      color: #fff;
      text-align: left;
      font-size: 28px;
      background-image: url("../../assets/imgs/transferUrl/dialog.png");
      background-size: 100% 100%;
      box-sizing: border-box;
      .triangle{
        position: absolute;
      }
    }

    .qrImg-wrapper {
      /*padding-top: 20vh;*/

      .animater-img {
        width: 411px;
        height: 300px;
        margin: 0 auto;
        background-image: url("../../assets/imgs/transferUrl/animater.png");
        background-size: 100% 100%;
      }

      .qr-inner-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -15px auto 0;
        width: 430px;
        height: 430px;
        padding: 15px;
        background-color: #fff;

        img {
          width: 400px;
          height: 400px;
        }
      }

      .bar-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 100px;
        margin: 0 auto;
        font-size: 26px;
        color: #fff;
        background-image: url("../../assets/imgs/transferUrl/bar.png");
        background-size: 100% 100%;

        p {
          padding-top: 5px;
        }
      }
    }
  }
</style>