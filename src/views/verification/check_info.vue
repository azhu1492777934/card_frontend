<template>
  <div class="g-wrap card-activated-wrap">
    <div v-show="card_tip" class="tip-wrap text-center"><span class="iconfont icon-warning"></span>
      根据工信部相关法规：物联网卡须完成实名认证且绑定相应设备。
    </div>
    <div v-show="!card_tip" class="tip-wrap p-15">
      <span>1.根据工信部相关法规：物联网卡须完成实名认证且绑定相应设备,才允许使用。</span><br>
      <span>2.请在支付宝生活号‘万物互联’或微信公众号‘物联网通信运营商’中充值续费，在其他平台充值无法到账且无法退款</span>
    </div>
    <img class="realname-tip" src="../../assets/imgs/card/realname/tip.png" alt="">
    <div class="info-wrap">
      <div>
        <span>ICCID</span>
        <input v-model="info_iccid" readonly placeholder="请输入ICCID" type="text">
      </div>
      <div v-if="showItem.showImei">
        <span>IMEI</span>
        <input v-model="info_imei" placeholder="请输入IMEI" type="number">
        <span class="iconfont icon-scan"></span>
      </div>
      <p v-if="showItem.showImei" class="tip-imei">可录入IMEI,也可使用默认IMEI;系统检测到设备IMEI后将自动更新。</p>
      <!--      <div v-show="showItem.showID">-->
      <!--        <span>身份证</span>-->
      <!--        <input v-model="info_id" placeholder="请输入身份证" type="number">-->
      <!--      </div>-->
      <!--      <div v-show="showItem.showName">-->
      <!--        <span>姓名</span>-->
      <!--        <input v-model="info_name" maxlength="15" placeholder="请输入姓名" type="text">-->
      <!--      </div>-->
      <div>
        <span>手机号</span>
        <input v-model="info_phone" placeholder="请输入" type="number">
      </div>
      <div class="code-wrap">
        <input v-model="info_code" placeholder="请输入验证码" type="number" v-on:input ="limlit()">
        <button @click="getCode" class="btn-code" :disabled="disabled_code">{{countDownMsg}}</button>
      </div>
    </div>
    <div class="tip-wrap p-15" v-show="!card_tip">
      <p>移动号码实名仅支持一证五号，若实名卡数已超出请更换证件</p>
    </div>
    <p class="tutorial-wrap">
      <a @click="toTutorial"><span class="iconfont icon-tutorial"></span>查看实名教程</a>
    </p>
    <div class="btn-next-wrap">
      <button @click="checkInfo" class="btn-next">完成实名 激活卡</button>
    </div>
    <div class="phone-tip">
      温馨提示<br/>以'145','146','166','177','191','199'号段开头的号码无法接收短信验证码
    </div>

  </div>
</template>

<script>
  import {Notify} from 'vant';
  import {_get, _post} from "../../http";
  import {getStorage, removeStorage, inArray} from "../../utilies";
  import '../../assets/less/common.less'
  // @ is an alias to /src
  export default {
    name: "home",
    props: {
      decrypt_data: {},
    },
    data() {
      return {
        //校验数据
        regex_phone: /(?:^1[3456789]|^9[28])\d{9}$/,
        regex_num: /^[1-9]\d*$/,
        regex_name: /^[\u4e00-\u9fa5a-zA-Z]+$/,

        card_tip: true,
        card_source: '',//卡源
        info_iccid: '',
        info_imei: '864319031839011',
        info_id: '',
        info_code: '',
        info_phone: '',
        info_name: '',

        countDown: 60,
        countDownMsg: '获取验证码',
        showTipMsg: '检测信息中，请等候',

        timer: null,
        disabled_code: false,
      }
    },
    components: {
      [Notify.name]: Notify,
    },
    created() {

      if (inArray(this.card_source, ['18', '19', '20', '21', '22', '27']) >= 0) {
        this.card_tip = !this.card_tip
      }
    },
    methods: {
      inArray: function (elem, arr, i) {
        return arr == null ? -1 : arr.indexOf(elem, i);
      },
      checkPhone: function () {
        if (!this.info_phone) {
          return {
            state: 0,
            msg: '请输入您的手机号码'
          }
        }
        if (!this.regex_phone.test(this.info_phone)) {
          return {
            state: 0,
            msg: '手机号码有误'
          }
        }
        let pre_three_num = this.info_phone.substr(0, 3),
          watch_card = ['145', '146', '166', '177', '199'];
        if (watch_card.includes(pre_three_num)) {
          return {
            state: 0,
            msg: '请勿输入以145/146/166/177/199开头的手机号码'
          }
        }
        return {
          state: 1
        }
      },
      checkCode: function () {
        if (!this.regex_num.test(this.info_code)) {
          return {
            state: 0,
            msg: '验证码有误'
          }
        }
        return {
          state: 1
        }
      },
      getCode: function () {
        let _this = this;
        let resultCheckPhone = this.checkPhone();
        if (!resultCheckPhone.state) {
          Notify({
            message: resultCheckPhone.msg,
            background: '#ce4141'
          });
          return
        }

        Notify({
          message: '检测手机号码中,请等候'
        });

        _post('/api/v1/app/phone/check', {mobile: this.info_phone})
          .then(res => {
            if (res.state == 1) {

              clearInterval(this.timer);
              this.disabled_code = true;
              this.countDownMsg = this.countDown + 's';

              this.timer = setInterval(function () {
                _this.countDown--;
                _this.countDownMsg = _this.countDown + 's'
                if (_this.countDown <= 0) {
                  clearInterval(_this.timer);
                  _this.countDownMsg = '获取验证码';
                  _this.countDown = 60;
                  _this.disabled_code = false;
                }
              }, 1000)

              _post('/api/v1/app/messages/send', {mobile: this.info_phone})
                .then(function (res) {

                  if (res.state === 1) {
                    Notify({
                      message: '验证码发送成功',
                      background: '#60ce53'
                    });
                  } else {
                    Notify({message: res.msg});
                  }
                })

            } else {

              Notify({message: res.msg,})
            }
          })


      },//获取验证码
      checkInfo: function () {
        let checkPhone = this.checkPhone(),
          checkCode = this.checkCode();

        if (!checkPhone.state) {
          Notify({
            message: checkPhone.msg,
            background: '#ce4141'
          });
          return
        }

        if (!checkCode.state) {
          Notify({
            message: checkCode.msg,
            background: '#ce4141'
          })
          return
        }

        this.bindImei();
      },
      bindImei() {
        let param = {
          mobile: this.info_phone,
          iccid: this.info_iccid,
          code: this.info_code,
          imei: this.info_imei,
          realname: this.info_name || '***',
          id_no: this.info_id || '***',
          alibind: true,
        };
        let _this = this;
        Notify({message: '正在绑定手机号码,请等候'});
        _post('/api/v1/app/bind/imei', param)
          .then(res => {
            if (res.state === 1) {
              Notify({message: '绑定成功,正在前往第三方实名,请耐心等候'});
              _get('/api/v1/app/jump/taobao', {
                imei: this.info_imei,
                iccid: this.info_iccid,
                source: this.card_source,
                type: 0,
              }).then(res => {
                if (res.data.indexOf("taobao") !== -1) {
                  let ua = navigator.userAgent.toLowerCase();
                  if (ua.match(/MicroMessenger/i) === "micromessenger") {
                    this.$router.push({path: 'to_tb', query: {url: res.data}});
                  } else {
                    location.href = res.data;
                  }
                } else {
                  location.href = res.data;
                }
              })
            } else if (res.state === 10015) {
              Notify({message: res.msg});
              setTimeout(function () {
                _this.$router.push({path: '/plan_list'});
              }, 1500);
            } else {
              if (res.msg) {
                Notify({message: res.msg,})
              } else {
                Notify({message: '绑定手机失败,请稍后再试',})
              }
            }
          })
      },
      toTutorial: function () {
        if (this.card_source === '18' || this.card_source === '19') {
          location.href = 'https://mp.weixin.qq.com/s/IMUU9Wan63K00QEFcxUnjg'
        } else {
          location.href = 'https://mp.weixin.qq.com/s?__biz=MzUxODA0OTAyOQ==&mid=100000010&idx=1&sn=a5269b403df4782a2413184f027a01d2&chksm=798f9d604ef81476a074d02828cc355331e354d3c37f89aa3f87ddb21004903190d858842300&mpshare=1&scene=23&srcid=0601LjTN6Zs9SunY3rvoUg4Y#rd';
        }
      },
      limlit: function() { //ios键盘输入触发两次输入事件
        if (this.info_code.length == 8) {
          this.info_code = this.info_code.slice(0, 4)
        }
        if (this.info_code.length == 12) {
          this.info_code = this.info_code.slice(0, 6)
        }
      }
    }
  };
</script>

<style lang="less">
  input, button {
    border: none;
    outline: none;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center !important;
  }

  .p-15 {
    padding: 25px !important;
  }

  .fixed-wrap-imei {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  .check-imei-info {
    position: relative;
    top: 40%;
    width: 80%;
    margin: 0 auto;
    padding: 30px;
    background: #fff;
    color: #333;
    text-align: center;
    font-size: 24px;
    border-radius: 5px;
  }

  .card-activated-wrap {
    .tip-wrap {
      padding: 18px 10px;
      font-size: 22px;
      line-height: 1.3;
      color: #ff562f;
      background-color: #fff1ee;
      text-align: left;
    }

    .realname-tip {
      display: block;
      width: 100%;
      height: auto;
    }

    .info-wrap {
      font-size: 30px;
      background-color: #fff;

      .tip-imei {
        padding: 30px 40px;
        margin: 0;
        background-color: #f7f7f7;
        color: #616161;
        font-size: 28px;
        text-align: left;
        line-height: 1.3;
      }

      div {
        display: flex;
        padding: 33px 0;
        margin: 0 40px;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;

        span {
          width: 1.4rem;
          text-align: left;
          color: #2c251d;
        }

        input {
          flex: 6;
          font-size: 30px;
        }

        &:last-child {
          border-bottom: none;
        }

        &.code-wrap {
          justify-content: space-between;

          input {
            display: inline-block;
            max-width: 60%;
          }
        }
      }

      .icon-scan {
        font-size: 52px;
        color: #e4a750;
        line-height: .8;
      }

      .btn-code {
        padding: 17px 30px;
        font-size: 26px;
        color: #fff;
        background-color: #dca85f;
        border-radius: 10px;
      }
    }

    .btn-next-wrap {
      display: block;
      margin: 40px 40px;

      button {
        width: 100%;
        color: #fff;
        background: #e4a750;
        padding: 23px;
        font-size: 34px;
        border-radius: 10px;
      }
    }

    .tutorial-wrap {
      padding-left: 30px;
      text-align: left;

      a {
        text-decoration: none;
        color: #c84512;
        font-size: 26px;
      }
    }

    .phone-tip {
      font-size: 24px;
      line-height: 32px;
      color: #ff562f;
      text-align: center;
    }

    .verify-code-wrap {
      width: 100%;
      background-color: transparent;
    }

    .verify-code-inner {
      align-items: center;
      position: relative;
      width: 90%;
      margin: 0 auto;
      padding: 25px;
      background-color: #fff;
      color: #333;
      font-size: 32px;
      box-sizing: border-box;
      border-radius: 10px;

      p {
        padding-bottom: 25px;

        &:last-child {
          padding: 25px 0;
          text-align: right;
        }
      }

      button {
        padding: 15px 30px;
        border-radius: 8px;
        color: #fff;
        font-size: 26px;
        background-color: #e4a750;
      }

      .title {
        font-size: 38px;
        text-align: center;
      }

      .btn-close {
        position: absolute;
        top: 20px;
        right: 20px;
        line-height: .9;
        color: #e4a750;
      }

      .code-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .code-wrap input {
        width: 150px
      }
    }

  }
</style>



