<template>
  <div class="recharge-wrap">
    <div class="content-wrap">
      <div class="plan-type-name">充值选择</div>
      <ul class="discount-wrap">
        <li @click="rechargeTypeClick(index)" v-for="(item,index) in settingRechargeList"
            :class="{'checked':index==activeIndex}">
          <div>
            <span class="line">￥{{item.price}}</span>
          </div>
        </li>
        <li class="special"></li>
      </ul>
      <button @click="normalPay" class="btn-large">支付</button>
    </div>

    <van-popup :close-on-click-overlay="false" v-model="rechargeShow">
      <p class="showTip">创建订单中,请等候</p>
    </van-popup><!--创建订单-->

    <van-popup :close-on-click-overlay="false" v-model="appPay.show" class="border-radius-10">
      <div class="appContext-pay-wrap">
        <div class="title">
          支付方式选择
        </div>
        <div class="content">
          <p @click="changePayType(true)" :class="{'choose_type':appPay.type}">微信支付</p>
          <p @click="changePayType(false)" :class="{'choose_type':!appPay.type}">支付宝支付</p>
        </div>
        <div class="footer">
          <button @click="closePayType">取消</button>
          <button @click="recharge">确定</button>
        </div>
      </div>
    </van-popup><!--app支付选择-->

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Popup, Toast} from 'vant';
  import {getStorage, checkBrowser, lossRate, toDecimal, Today} from "../../utilies";
  import {_post, _get} from "../../http";

  export default {
    name: "recharge",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    components: {
      [Popup.name]: Popup,
      [Toast.name]: Toast
    },
    data() {
      return {
        rechargeShow: false,//创建订单遮罩
        activeIndex: 0,//当前选择充值方式索引
        showDate: false,//选择时间弹出
        openid: '', //用户openid
        client_type: checkBrowser(),
        appPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
        settingRechargeList: [{
          price: 0.01,
          is_give_balance: false,
          balance: 0
        }, {
          price: 0.02,
          is_give_balance: false,
          balance: 0
        }, {
          price: 0.03,
          is_give_balance: false,
          balance: 0
        }]
      }
    },
    created() {
      if (getStorage('decrypt_data', 'obj')) {
        this.open_id = getStorage('decrypt_data', 'obj').openid
      }
      this.getRechargeList()
        .then(res => {
          if (res.length) this.settingRechargeList = res.sort((a, b) => {return a.price - b.price;});
        });
    },
    methods: {
      getRechargeList() {
        const toast = Toast({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner'
        });
        let env;
        this.global_variables.packed_project === 'mifi' ? env = "mifi" : env = "cardserver";
        return new Promise((resolve, reject) => {
          _get("/api/v1/app/recharge/info", {
            iccid: getStorage('check_iccid'),
            env: env
          }).then(res => {
            toast.clear();
            if (res.state === 1) {
              resolve(res.data);
            } else {
              resolve([])
            }
          });
        });
      },
      rechargeTypeClick: function (index) {
        this.activeIndex = index
      },
      recharge: function () {
        if (!this.authorizedUserInfo.account.user_id) {
          Toast({
            position: 'top',
            message: '请在微信或支付宝客户端充值'
          });
          return
        }
        let param = {
          user_id: this.authorizedUserInfo.account.user_id,
          env: this.client_type,
          iccid: getStorage('check_iccid'),
          price: this.settingRechargeList[this.activeIndex].price,
          recharge_type: 0,
          success_page: `${window.location.host}/weixin/recharge/callback`,
          failed_page: window.location.href
        };

        if (this.client_type === 'alipay' || this.client_type === 'wechat') param.open_id = this.open_id;
        if (this.client_type === 'wechat') param.pay_type = 'WEIXIN';
        if (this.client_type === 'alipay') param.pay_type = 'ALIPAY';
        if (this.client_type === 'app') {
          param.open_id = this.authorizedUserInfo.account.user_id;
          (this.appPay.type) ? param.pay_type = 'WEIXIN' : param.pay_type = 'ALIPAY';
        }

        this.rechargeShow = true;
        // 墙出此前创建的form表单
        let payDom = document.querySelector('form');
        if (payDom) document.removeChild(payDom);
        _post('/api/v1/pay/balance/recharge_create', param)
          .then(res => {
            this.rechargeShow = false;
            if (res.state === 1) {
              const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);
              document.forms[0].submit();
            } else {
              Toast({
                position: 'top',
                message: res.msg
              })
            }
          })
      },
      normalPay() {
        if (this.client_type === 'app') {
          this.appPay.show = true
        } else {
          this.recharge();
        }
      },
      changePayType(type) {
        this.appPay.type = !!type;
      },
      closePayType() {
        this.appPay.type = true;
        this.appPay.show = false
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/common";

  .recharge-wrap {
    text-align: left;

    .border-radius-10 {
      width: 80%;
      border-radius: 10px;
    }

    .appContext-pay-wrap {
      color: #333;
      background-color: #fff;

      .title {
        font-size: 32px;
        font-weight: 500;
        padding-top: 25px;
        text-align: center;
      }

      .content {
        padding: 25px;
        line-height: 1.5;
        max-height: 60vh;
        overflow-y: auto;
        text-align: center;
        color: #7d7e80;
        font-size: 28px;

        p {
          margin: 10px 0;
          padding: 10px;
        }

        .choose_type {
          background-color: #f1af4c;
          color: #fff;
          border-radius: 5px;
        }
      }

      .footer {
        display: flex;
        border-top: 1PX solid #f5f5f5;
        height: 90px;

        button {
          flex: 1;
          font-size: 28px;
          background-color: transparent;

          &:first-child {
            color: #000;
            border-right: 1PX solid #f5f5f5;
          }

          &:last-child {
            color: @primary;
          }
        }
      }
    }

    .recharge-tip {
      background-color: #feeae5;

      p {
        text-align: center;
        padding: 20px;
        font-size: 24px;
        color: #ff562f;
      }
    }

    //充值提醒

    .content-wrap {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      -webkit-box-lines: multiple;
      height: 95vh;

      .plan-type-name {
        display: flex;
        height: 55px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        color: #f1a53c;
        background: rgba(255, 251, 243, 1);

        &::before, &::after {
          display: block;
          width: 129px;
          height: 8px;
          content: '';
          background-size: 100% 100% !important;
        }

        &::before {
          margin-right: 24px;
          background: url("../../assets/imgs/card/usage/leftIcon.png") no-repeat;
        }

        &::after {
          margin-left: 24px;
          background: url("../../assets/imgs/card/usage/rightIcon.png") no-repeat;
        }
      }

      .discount-wrap {
        display: flex;
        flex-wrap: wrap;
        -webkit-box-lines: multiple;
        justify-content: space-between;
        padding: 30px 5% 0;
        box-sizing: border-box;
      }

      li {
        display: table;
        position: relative;
        width: 31%;
        max-width: 33.33%;
        min-height: 183px;
        margin: 0 0 20px;
        font-size: 28px;
        text-align: center;
        border: 1PX solid #e6e6e6;
        border-radius: 16px;
        -webkit-text-size-adjust: none;

        &.special {
          min-height: 1px;
          margin: 0;
          border-color: transparent;
          visibility: hidden
        }

        .line {
          position: relative;
          display: inline-block;

          &:after {
            position: absolute;
            left: 0;
            bottom: -20px;
            width: 110%;
            content: '';
            background: #EBEBEB;
            height: 3px;
          }
        }

        div {
          display: table-cell;
          vertical-align: middle;
          color: #EBEBEB;
        }


        &.checked {
          border-color: #c89439;
          box-shadow: 0 50px 0 #fff;

          div {
            color: #333;
          }

          .line {
            &:after {
              background: #dca85f;
            }
          }

          &::after {
            position: absolute;
            right: 0;
            bottom: 0;
            content: '✓';
            width: 33px;
            height: 25px;
            color: #fff;
            background-color: #c89439;
            font-size: 22px;
            border-top-left-radius: 16px;
            border-bottom-right-radius: 16px;
          }
        }

      }
    }

    //充值列表结束

    .choice-wrap {
      position: relative;
      padding-top: 60px;
      font-size: 28px;
      color: #2c251d;

      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        -webkit-box-lines: multiple;
        padding-bottom: 30px;
      }

      div {
        span,
        div {
          flex: 1;
          max-width: 200px;

          input {
            vertical-align: middle;
          }

          input + span {
            padding-left: 8px;
            vertical-align: middle;
          }
        }
      }

      span:first-child {
        max-width: 200px;
        text-align: right;
      }

      input[type="text"],
      input[type="number"] {
        display: block;
        width: 100%;
        font-size: 28px;
        margin: 10px 30px 0;
        padding: 10px;
        border-bottom: 1PX solid #cac7c7;
      }

    }

    //充值方式选择
    .btn-large {
      display: block;
      width: 80%;
      margin: auto auto 90px;
      padding: 20px;
      color: #fff;
      background-color: #dca85f;
      font-size: 34px;
      border-radius: 13px;
    }

  }
</style>
