<template>
  <div>
    <div v-show="divisivePartner">
      <div v-if="!visible" class="transfer-url-wrapper">

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
          <img :src="qrImg" alt="二维码" v-show="qrImg">
        </div>
        <div class="box-wrapper">
          <img src="../../assets/imgs/transferUrl/box-deco@3x.png" alt="">
          <img src="" alt="">
        </div>
        <p type="text" disabled id="copyMy" style="opacity: 0;position:absolute">{{imei}}</p>
        <div class="iccid-wrapper">
          <div>
            <span>设备号:</span>
            <input class="text" type="text" v-model="imei">
            <div @click="copyFn()">复制 <div class="talk"></div></div>
          </div>
          <div class="search" v-if="!qrImg"><input type="button" value="查询" @click="search(imei)"></div>

          <p @click="to_watch()" v-if="video">视频教程 
            <transition 
              :duration="50000" 
              appear 
              enter-active-class="animated animate__bounce" 
              leave-active-class="animated animate__bounce" 
              appear-active-class="animated animate__bounce">
              <span v-show="!visible"></span>
          </transition>
          </p>
        </div>

      </div>

      <div v-if="visible" class="transfer-url-wrapper2">
        <div>
          <span class="word-left"></span>
          <span class="word-right"></span>
        </div>
        <div class="qrImg-wrapper">
          <div class="qr-inner-wrapper">
            <img :src="qrImg" alt="二维码" v-show="qrImg">
          </div>

          <div class="bar-wrapper">
            <p>长按关注公众号</p>
          </div>
        </div>
        <p type="text" disabled id="copyMy" style="opacity: 0;position:absolute">{{imei}}</p>
        <div class="iccid-wrapper">
          
          <div>
            <span>设备号:</span>
            <input class="text" type="text" v-model="imei">
            <div @click="copyFn()">复制 <div class="talk2"></div></div>
          </div>
          <div class="search" v-if="!qrImg"><input type="button" value="查询" @click="search(imei)"></div>
          <p @click="to_watch()" v-if="video">视频教程 
            <transition 
              :duration="50000" 
              appear 
              enter-active-class="animated animate__bounce" 
              leave-active-class="animated animate__bounce" 
              appear-active-class="animated animate__bounce">
              <span v-show="visible"></span>
          </transition>
          </p>
        </div>
      </div>
    </div>
    <loading :loading="loadingShow"/>
  </div>


  
</template>

<script>
  import { Toast, Dialog } from 'vant';
  import { _get } from "../../http";
  import { getUrlParam } from "../../utilies";
  import loading from '../../components/loading'
  export default {
    name: "index",
    data() {
      return {
        iccid: '',
        qrImg: '',
        visible: '',
        imei: getUrlParam('imei'),
        video:'',
        show: false,
        divisivePartner: false, // 区分代理商 走不同的流程
        partnerGroup: [7235], // 走二维码引导页面的代理ID
        loadingShow: true
      }
    },
    components: {
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
      loading
    },
    async created() {
      this.loadingShow = true
      if (this.imei) {
        const partner_id = await this.search(this.imei)
        this.loadingShow = false
        if (this.partnerGroup.includes(partner_id)) {
          this.divisivePartner = true
        } else {
          window.location.href = `http://mifi.china-m2m.com/mifi/index?imei=${this.imei}`
        }
      } else {
        Dialog.alert({
          message: '未识别到设备号'
        })
      }
    },
    methods: {
      to_watch() {
        window.location.href = this.video
      },
      copyFn() {
        this.show = !this.show
        let val = document.getElementById('copyMy');
        window.getSelection().selectAllChildren(val);
        document.execCommand("Copy");
        Toast({
          message: '复制成功',
        })
      },
      search() {
        return  new Promise((resolve) => {
          _get('/iot/v1/partners/get_partner_wx_config', {
            imei: this.imei
          }).then(res => {
            Toast.clear();
            if (res.state == 1) {
              this.iccid = res.data.iccid
              this.qrImg = res.data.wx_img_path
              this.video = res.data.wx_video_path
              this.visible = res.data.is_qiyu
              resolve(res.data.partner_id)
            }else {
              resolve(0)
            }
          })
        })
      }
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
      position: relative;
      padding-top: 50px;
      img {
        position: relative;
        width: 320px;
        height: 320px;
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
          opacity: 0;
        }

      }
    }

    .iccid-wrapper {
      position: relative;
      top: 80px;
      // bottom: 120px;
      left: 95px;
      width: 560px;
      height: 250px;
      background: #fafafa;
      z-index: 888;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        width: 100%;
        height: 90px;
        display: flex;
        span {
          display: inline-block;
          width: 150px;
          font-size: 30px;
          line-height: 90px;
          text-align: right;
          color: #FF6F00;
          font-weight: 600;
        }
        .text {
          margin: 10px;
          box-sizing: border-box;
          width: 320px;
          background: #fff;
          border-radius: 15px;
          font-size: 28px;
          color: #333;
          text-align: left;
        }
        div {
          width: 64px;
          height: 64px;
          font-size: 22px;
          font-weight: 600;
          background-size: 100% 100%;
          position: relative;
          color: #FF6F00;
          top: 25px;
          left: 5px;
          z-index: 999;
        }
      }
      p {
        width: 100%;
        height: 70px;
        font-size: 32px;
        color: #FF6F00;
        font-weight: 700;
        line-height: 70px;
        
        span {
          display: inline-block;
          position: relative;
          top: 10px;
          width: 48px;
          height: 48px;
          background-image: url("../../assets/imgs/transferUrl/video.png");
          background-size: 100% 100%;
        }
      }
      .talk {
        position: absolute;
        top: 17px;
        left: -3px;
        display: inline-block;
        width: 64px;
        height: 64px;
        background-image: url("../../assets/imgs/transferUrl/finger.png");
        background-size: 100% 100%;
        z-index: 999;
      }
      .search{
        display: flex;
        justify-content: center;
        input {
          width: 120px;
          height: 50px;
          border-radius: 10px;
          line-height: 35px;
          background: linear-gradient(#FF6D00, #FB8C00);
          color: #fff;
        }
      }
    }

    
  }

  .transfer-url-wrapper2 {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding:15vh 0;
    box-sizing: border-box;
    background-image: url("../../assets/imgs/transferUrl/bg.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .subscribe-wrapper {
      img {
        width: 470px;
        height: 284px;
      }
    }

    .qrImg-wrapper {
      /*padding-top: 20vh;*/

      .qr-inner-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -15px auto 0;
        width: 390px;
        height: 390px;
        padding: 5px;
        background-color: #fff;
        border-radius: 8px;
        img {
          width: 380px;
          height: 380px;
        }
      }

      .bar-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 450px;
        height: 100px;
        margin: 0 auto;
        font-size: 32px;
        color: #fff;
        background-image: url("../../assets/imgs/transferUrl/bar.png");
        background-size: 100% 100%;

        p {
          padding-top: 5px;
        }
      }
    }

    .word-left {
      display: inline-block;
      position: absolute;
      width: 226px;
      height: 363px;
      top: 33%;
      left: -70px;
      margin-top: -196.5px;
      .bg-image('../../assets/imgs/transferUrl/call-word-qiyu');
    }

    .word-right {
      display: inline-block;
      position: absolute;
      width: 165px;
      height: 367px;
      top: 33%;
      right: 0;
      margin-top: -189px;
      .bg-image('../../assets/imgs/transferUrl/recharge-word-qiyu');
    }

    .iccid-wrapper {
      position: relative;
      top: 80px;
      // bottom: 120px;
      left: 95px;
      width: 560px;
      height: 250px;
      background: #fafafa;
      z-index: 888;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        width: 100%;
        height: 90px;
        display: flex;
        span {
          display: inline-block;
          width: 150px;
          font-size: 30px;
          line-height: 90px;
          text-align: right;
          color: #81d4fa;
          font-weight: 600;
        }
        .text {
          color: #81d4fa;
          margin: 10px;
          box-sizing: border-box;
          width: 320px;
          background: #fff;
          border-radius: 15px;
          font-size: 28px;
          text-align: left;
        }
        div {
          width: 64px;
          height: 64px;
          font-size: 22px;
          font-weight: 600;
          background-size: 100% 100%;
          position: relative;
          color: #81d4fa;
          top: 25px;
          left: 5px;
          z-index: 999;
        }
      }
      p {
        color: #81d4fa;
        width: 100%;
        height: 70px;
        font-size: 32px;
        font-weight: 700;
        line-height: 70px;
        span {
          display: inline-block;
          position: relative;
          top: 10px;
          width: 48px;
          height: 48px;
          background-image: url("../../assets/imgs/transferUrl/video2.png");
          background-size: 100% 100%;
        }
      }
      .talk2 {
        position: absolute;
        top: 17px;
        left: -3px;
        display: inline-block;
        width: 64px;
        height: 64px;
        background-image: url("../../assets/imgs/transferUrl/finger2.png");
        background-size: 100% 100%;
        z-index: 999;
      }
      .search{
        display: flex;
        justify-content: center;
        input {
          width: 120px;
          height: 50px;
          border-radius: 10px;
          line-height: 35px;
          background: linear-gradient(#0288D1, #81D4FA);
          color: #fff;
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
