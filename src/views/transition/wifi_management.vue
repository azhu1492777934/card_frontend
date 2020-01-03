<template>
  <div class="wifi-management">
    <p class="title">为保证您的下载环境安全，请使用浏览器下载， 方式如下：</p>
    <ul class="step-wrapper">
      <li>
        <span>第一步</span>
        <p>点击本页面又上角"..."</p>
      </li>
      <li>
        <span>第二步</span>
        <p>选择在浏览器打开</p>
      </li>
      <li>
        <span>第三步</span>
        <p>耐心等待几秒钟，待跳转<br>到浏览器后，会自动下载App</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Toast} from "vant";
  import {checkBrowser} from "../../utilies";

  export default {
    name: "WifiManagement",
    comments: {
      [Toast.name]: Toast
    },
    data() {
      return {
        RuntimeEnv: checkBrowser()
      };
    },
    created() {
      if (this.RuntimeEnv !== "wechat") {
        location.href = "http://mmgr.myapp.com/msoft/sec/secure/GodDresser/26/2/3/221500/mifimanager_2.4.0.158.107100_android_20200102060510_7fb761a-reunion-release_wifi_20200102141157_221500.apk";
      }
    },
    methods: {}
  };
</script>

<style lang="less">
  .wifi-management {
    padding: 0 34px;

    .title {
      padding: 100px 27px 40px;
      color: #4D8EE5;
      font-size: 28px;
      font-weight: 500;
      text-align: left;
    }

    .step-wrapper {
      li {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        -webkit-box-lines: multiple;
        flex-direction: column;
        align-items: center;
        margin-bottom: 53px;
        border-radius: 27px;
        background-color: #62A3FA;
        background-image: linear-gradient(147deg, #62A3FA 100%, #4C8DE4 100%);
        /*background-image: linear-gradient(147deg,#62A3FA 0%,#4C8DE4 74%);*/

        span {
          display: inline-block;
          margin-top: 50px;
          padding: 10px 27px;
          font-size: 28px;
          font-weight: 500;
          color: #62A3FA;
          background-color: #fff;
          border-radius: 31px;
        }

        p {
          padding: 24px 0 55px;
          color: #fff;
          font-size: 28px;
          font-weight: 500;
        }
      }
    }

  }
</style>
