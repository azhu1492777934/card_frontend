<template>
  <div class="toAli-wrap">
    <p class="realname-tip">点击屏幕右上角按钮，选择在浏览器中打开<img src="../../assets/imgs/to_tb/right_top_arrow@2x.png"></p>
    <div class="browser-kind-wrap">
      <div class="flex system-wrap">
        <p>
          <span class="iconfont icon-android"></span>
          <span>Android系统</span>
        </p>
        <p>
          <span class="iconfont icon-apple"></span>
          <span>IOS系统</span>
        </p>
      </div>
      <div class="flex system-browser-wrap">
        <p>
          <span class="iconfont icon-android-browser"></span>
          <span>浏览器打开</span>
        </p>
        <p>
          <img class="icon-safari vertical-super" src="../../assets/imgs/to_tb/safari.png" alt="">
          <span class="p-t-4">safari打开</span>
        </p>

      </div>
    </div>
    <div class="modal-browser-wrap">
      <span class="modal-android"></span>
      <span class="modal-ios"></span>
    </div>
  </div>
</template>

<style lang="less">
  .toAli-wrap {
    .vertical-super {
      vertical-align: super;
    }
    .p-t-4 {
      padding-top: 4px !important;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .realname-tip {
      position: relative;
      padding: 30px;
      color: #0C0807;
      background-color: #fbe9e5;
      font-size: 32px;
      font-weight: lighter;
      text-align: left;
      img {
        position: absolute;
        top: 10px;
        right: 30px;
        width: 80px;
        height: 80px;
        vertical-align: middle;
      }
    }
    .browser-kind-wrap {
      padding: 60px 158px 0;
      box-sizing: border-box;
      .icon-android-browser {
        display: inline-block;
        width: 139px;
        height: 139px;
        text-align: center;
        line-height: 139px;
        box-shadow: inset 0 0 4px 2px #ccc9c9;
      }
      .system-wrap {
        align-items: flex-end;
        .icon-android {
          font-size: 140px;
          color: #b8cb60;
          line-height: .8;
        }
        .icon-apple {
          font-size: 130px;
          color: #797979;
          line-height: 1;
        }

      }

      .system-wrap,
      .system-browser-wrap {
        span:last-child {
          display: block;
          color: #090909;
          font-size: 22px;
          text-align: center;
          padding: 15px 0 45px;
        }
      }

      .system-browser-wrap {
        .icon-safari {
          width: 139px;
          height: 139px;
        }
        .icon-android-browser {
          font-size: 90px;
          color: #7d7e80;
        }
      }
    }

    .modal-browser-wrap {
      display: flex;
      justify-content: space-between;
      padding: 20px 18px 0;
      span {
        display: inline-block;
        width: 350px;
        height: 265px;
        background-size: 100% 100%;
      }
      .modal-android {
        background-image: url("../../assets/imgs/to_tb/android@2x.png");
      }
      .modal-ios {
        background-image: url("../../assets/imgs/to_tb/ios@2x.png");
      }
    }
  }

</style>

<script>
  // @ is an alias to /src
  import {Notify, Popup} from 'vant';
  import {getUrlParam, checkBrowser, lossRate} from "../../utilies";

  export default {
    name: "home",
    data() {
      return {
        client_type: checkBrowser(),
        iccid: '',
        imei: '',
        qrSrc: '',
        source: ''
      }
    },
    components: {
      [Notify.name]: Notify,
      [Popup.name]: Popup,
    },
    created() {
      lossRate({
        type: 6,
        iccid: getUrlParam('iccid'),
      });
      this.iccid = getUrlParam('iccid');
      this.imei = getUrlParam('imei');
      this.source = getUrlParam('source');
      this.qrSrc = 'http://cardserver_test.china-m2m.com/qrcode?iccid=' + this.iccid + '&imei=' + this.imei;
      if (this.client_type !== 'wechat') {
        location.href = this.$route.query.url;
      }
    },
    mounted() {

    },
    methods: {}
  };
</script>

