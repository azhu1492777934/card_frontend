<template>
  <div class="recharge-wrap">
    <div class="content-wrap">
      <div class="title-wrap">
        <em class="title-line"></em>
        <span class="title-name">支付选择</span>
        <em class="title-line rotate-180"></em>
      </div>
      <ul class="discount-wrap">
        <li @click="rechargeTypeClick(index)" v-for="(item,index) in new_recharge_list"
            :class="{'checked':index==activeIndex}">
          <div>

          </div>
        </li>
        <li class="special"></li>
      </ul>
      <button @click="normalPay" class="btn-large">支付</button>
    </div>

    <van-popup
      v-model="showDate"
      position="bottom"
      :overlay="true"
      :lock-scroll="true"
      :lazy-render="true"
      :close-on-click-overlay="true"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="dateFormatter"
        @confirm="dateConfirm"
        @cancel="dateCancel"
      >
      </van-datetime-picker>
    </van-popup><!--时间选择-->

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
          <button @click="FinalAppPay">确定</button>
        </div>
      </div>
    </van-popup><!--app支付选择-->

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {DatetimePicker, Area, Popup, Notify} from 'vant';
  import {removeStorage, getStorage, checkBrowser, lossRate, toDecimal, Today} from "../../utilies";
  import {_post, _get} from "../../http";

  export default {
    name: "recharge",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    components: {
      [DatetimePicker.name]: DatetimePicker,
      [Area.name]: Area,
      [Popup.name]: Popup,
      [Notify.name]: Notify
    },
    data() {
      return {
        showOriginPrice: getStorage('originPrice'),
        rechargeShow: false,//创建订单遮罩
        surplus_cash: -1, // 钻石支付情况下，显示需要支付的价格
        recharge_list: [
          {
            pay_type: 'diamond_charge',
            pay_money: 0,
            user_rmb: 0,
            give_elb: 0,
          }
        ],//充值列表数据
        new_recharge_list: [],

        minDate: new Date(),
        maxDate: new Date(this.getEndDate().endYear, this.getEndDate().endMonth, this.getEndDate().endDay),
        currentDate: new Date(),

        isShowChoice: {
          showDate: true,
          showELB: true,
          showCode: true,
        },

        check_date: false,
        check_coupon: false,
        check_elb: false,

        val_date: Today(),
        val_coupon: '',
        val_elb: '',

        activeIndex: 0,//当前选择充值方式索引
        showDate: false,//选择时间弹出

        userInfo: '',//用户信息
        openid: '', //用户openid
        planInfo: getStorage('planInfo', 'obj'),//当前充值套餐信息

        client_type: checkBrowser(),

        appPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
        settingRechargeList: []
      }
    },
    async created() {
      // 用户流失率统计
      if (getStorage('plan_list_new_card') === "1") {
        lossRate({
          type: 5,
          iccid: getStorage("check_iccid")
        });
      }

      if (getStorage('decrypt_data', 'obj')) {
        this.open_id = getStorage('decrypt_data', 'obj').openid
      }

      if (!this.planInfo) {
        this.$router.push({'path': '/weixin/card/plan_list'});
      }

      if (this.planInfo) {
        if (this.planInfo.is_elb_deductible === 0) {
          this.isShowChoice.showELB = false
        }
      }//是否显示ELB

      if (getStorage('newCard') === '1') {
        this.isShowChoice.showELB = false;
        this.isShowChoice.showCode = false;
        this.isShowChoice.showDate = false;
      }//新卡默认不显示所有选择

      if (getStorage('isSpeedUp') === '1') {
        this.isShowChoice.showDate = false;
      }//加速包默认不显示生效时间

      /*
      * 用户钻石数
      * 套餐价格
      * */
      let user_rmb = 0;
      this.userInfo = this.authorizedUserInfo;

      if (this.userInfo.account.balance > 0) {
        user_rmb = this.userInfo.account.balance;
      }
      this.settingRechargeList = await this.getRechargeInfo();

      if (this.settingRechargeList.length > 0) {
        let data = this.settingRechargeList;
        data.sort(this.jsonSort);
        for (let i = 0; i < data.length; i++) {
          this.recharge_list.push({
            pay_type: 'over_charge',
            pay_money: data[i].price,
            give_elb: data[i].elb,
            give_balance: data[i].balance,
            is_give_balance: data[i].is_give_balance
          })
        }
        this.recharge_list.push({
          pay_type: 'normal_charge',
          pay_money: 0,
          give_elb: 0
        });
      } else {
        this.recharge_list = [
          {
            pay_type: 'diamond_charge',
            pay_money: 0,
            user_rmb: 0,
            give_elb: 0,
          }, {
            pay_type: 'over_charge',
            pay_money: 100,
            give_elb: 50
          }, {
            pay_type: 'over_charge',
            pay_money: 200,
            give_elb: 200,
          }, {
            pay_type: 'over_charge',
            pay_money: 300,
            give_elb: 300
          }, {
            pay_type: 'normal_charge',
            pay_money: 0,
            give_elb: 0
          }
        ]
      }

      this.new_recharge_list = this.filterRechargeList(user_rmb, this.planInfo.price);       //根据套餐价格过滤充值参数
    },
    methods: {
      rechargeTypeClick: function (index) {
        this.activeIndex = index
      },
      recharge: function () {
        if (!this.userInfo.account.user_id) {
          Notify({message: '请在微信或支付宝客户端充值'});
          return
        }
        let rechargeInfo = this.new_recharge_list[this.activeIndex];
        if (this.client_type === "app" && this.planInfo.price > 100 && rechargeInfo.pay_money === 50) {
          Notify({message: '充值后余额不足抵扣套餐价格，请选择其他套餐进行充值'});
          return
        }
        let _this = this;
        let param = {
          user_id: this.userInfo.account.user_id,
          env: this.client_type,
          iccid: this.planInfo.iccid || getStorage('check_iccid'),
          rating_id: this.planInfo.id,
          is_renew: rechargeInfo.is_renew,
          price: rechargeInfo.is_renew == true ? rechargeInfo.first_price : this.planInfo.price,
          status: (rechargeInfo.pay_type === 'diamond_charge' || rechargeInfo.pay_type === 'monthly_recharge') ? 1 : 0,
          recharge_price: (rechargeInfo.pay_type === 'over_charge' || rechargeInfo.pay_type === 'normal_charge' || rechargeInfo.pay_type === 'monthly_recharge') ? rechargeInfo.pay_money : this.planInfo.price,
          recharge_type: this.global_variables.packed_project === 'mifi' ? 1 : 0,
        };

        if (this.$route.query.un_pay_order === '1') param.no = this.planInfo.no;
        if (this.client_type === 'alipay' || this.client_type === 'wechat') param.open_id = this.open_id;
        if (this.client_type === 'app') param.open_id = this.userInfo.account.user_id;
        if (this.client_type === 'wechat') param.pay_type = 'WEIXIN';
        if (this.client_type === 'alipay') param.pay_type = 'ALIPAY';
        if (this.client_type === 'app') {
          (this.appPay.type) ? param.pay_type = 'WEIXIN' : param.pay_type = 'ALIPAY';
        }

        this.rechargeShow = true;
        // 墙出此前创建的form表单
        let payDom = document.querySelector('form');
        if (payDom) document.removeChild(payDom);
        _post('/api/v1/pay/weixin/create', param)
          .then(res => {
            this.rechargeShow = false;
            if (res.state === 1) {
              if (/<[^>]+>/.test(res.data)) {
                // document.write(res.data);
                const div = document.createElement('div');
                div.innerHTML = res.data;
                document.body.appendChild(div);
                document.forms[0].submit();
              } else if (res.data && Object.prototype.toString.call(res.data) === '[object String]' && res.data.substr(0, 4) === 'http') { //app
                this.global_variables.packed_project === 'mifi' ?
                  location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index` :
                  location.href = res.data;
              } else {
                if (this.planInfo.vip_type_id != 0) {
                  Notify({
                    message: '购买成功，兑换码已发放到您的手机号啦，请在7天内进行兑换。',
                    background: '#60ce53'
                  });
                } else {
                  Notify({
                    message: '充值成功',
                    background: '#60ce53'
                  });
                }
                this.$emit('getUserData');
                setTimeout(function () {
                  if (localStorage.getItem("currentType") === "esim") {
                    location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                  } else {
                    _this.global_variables.packed_project === 'mifi' ?
                      location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` :
                      location.href = res.data.return_url
                  }
                }, 1500);
              }//纯钻石支付
            } else {
              Notify({
                message: res.msg
              })
            }
          })
      },
      normalPay() {
        let rechargeInfo = this.new_recharge_list[this.activeIndex];
        if (this.client_type === 'app') {
          if (rechargeInfo.pay_type === 'diamond_charge' && this.userInfo.account.balance > this.planInfo.price) {
            this.appPay.show = false;
            this.recharge()
          } else {
            this.appPay.show = true
          }
        } else {
          this.recharge()
        }

      },//普通支付
      FinalAppPay() {
        this.recharge();
      },//app支付
      filterRechargeList: function (rmb, planPrice) {
        return this.recharge_list.filter(item => {
          if (item.pay_type === 'normal_charge') {
            item.pay_money = planPrice;
          }
          if (rmb <= 0) {

            if (planPrice < item.pay_money) {
              return item.pay_type === 'over_charge' || item.pay_type === 'normal_charge';
            } else {
              if (this.client_type === "app" && item.pay_money === 50) {
                return item.pay_money === 50 || item.pay_type === 'normal_charge';
              } else {
                return item.pay_money > planPrice || item.pay_type === 'normal_charge';
              }
            }

          } else {
            rmb - planPrice >= 0 ? this.surplus_cash = 0.00 : this.surplus_cash = toDecimal(planPrice - rmb);
            if (item.pay_type === 'diamond_charge') {
              if (planPrice < rmb) {
                item.user_rmb = planPrice
              } else {
                item.user_rmb = rmb
              }
            }

            if (planPrice < item.pay_money) {
              return item.pay_type === 'diamond_charge' || item.pay_type === 'over_charge' || item.pay_type === 'normal_charge';
            } else {
              if (this.client_type === "app" && item.pay_money === 50) {
                return item.pay_type === 'diamond_charge' || item.pay_money === 50 || item.pay_type === 'normal_charge';
              } else {
                return item.pay_type === 'diamond_charge' || item.pay_money > planPrice || item.pay_type === 'normal_charge';
              }
            }
          }
        })
      },//用户rmb,套餐价格planPrice
      changePayType(type) {
        this.appPay.type = !!type;
      },
      closePayType() {
        this.appPay.type = true;
        this.appPay.show = false
      },
      getRechargeInfo() {
        let env;
        this.global_variables.packed_project === 'mifi' ? env = "mifi" : env = "cardserver";
        let p = new Promise((resolve, reject) => {
          _get("/api/v1/app/recharge/info", {
            iccid: this.planInfo.iccid || getStorage('check_iccid'),
            env: env
          }).then(res => {
            if (res.state === 1) {
              resolve(res.data);
            } else {
              resolve([])
            }
          });
        });
        return p;
      },
      jsonSort(a, b) {
        return a.price - b.price;
      }
    },
    beforeDestroy() {
      removeStorage('plan_list_new_card');
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/common";

  input[type=radio] {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1PX solid #bcbcbc;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: text-top;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type=radio]:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #dca85f;
    border-radius: 12px;
    transform: scale(0);
    transition: all ease-in-out 300ms;
  }

  input[type=radio]:checked {
    border-color: #dca85f;
  }

  input[type=radio]:checked:after {
    transform: scale(1);
  }

  input[type=radio]:checked + em {
    vertical-align: middle
  }

  .cl-primary {
    color: #c19252;
  }

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

    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      text-align: center;
      font-size: 28px;
      color: #c89439;

      span {
        padding: 0 30px;
      }

      .rotate-180 {
        transform: rotate(180deg);
      }

      .title-line {
        display: inline-block;
        flex: 1;
        height: 3px;
        max-width: 20%;
        content: '';
        background: linear-gradient(45deg, #fff 0, #c19252 100%);
      }

    }

    //支付title

    .content-wrap {
      width: 95%;
      margin: 0 auto;

      .discount-wrap {
        display: flex;
        flex-wrap: wrap;
        -webkit-box-lines: multiple;
        justify-content: space-between;
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

        .midPlan {
          vertical-align: middle;
          padding-top: 30px;
        }

        .monthlyPlan {
          vertical-align: top;
          border-radius: 16px;
          background: linear-gradient(-45deg, rgba(255, 222, 123, 1), rgba(250, 197, 84, 1), rgba(255, 209, 120, 1), rgba(247, 194, 80, 1));
        }

        .monthlyTop {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;

          > div:nth-child(1) {
            margin-left: 12px;
          }

          > div:nth-child(2) {
            margin-right: 9px;
          }
        }

        .monthlyDes {
          font-size: 20px;
          font-weight: 400;
          color: rgba(131, 96, 25, 1);
        }

        .monthlyFirst {
          font-size: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }

        .monthlyMoney {
          font-size: 20px;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(44, 37, 29, 1);
        }

        .monthly-rmb {
          margin-top: 12px;
          font-size: 38px !important;
          font-weight: 400;
          color: rgba(44, 37, 29, 1) !important;
        }

        .line {
          display: block;
          width: 60px;
          height: 3px;
          margin: 10px auto 13px;
          background-color: #c89439;
        }

        div {
          display: table-cell;
          vertical-align: middle;
        }

        .cl-elb {
          color: #70a6ec;
        }

        .discount-rmb {
          font-size: 28px;
          color: #2c251d;
          line-height: 1;
        }

        .discount-diamond {
          padding-top: 5px;

          .surplus-recharge {
            display: block;
            padding: 8px 0;
            font-size: 24px;
            color: #2c251d;
          }
        }

        .discount-appendix {
          color: #888;
          font-size: 20px;
          letter-spacing: 1PX;
        }

        &.checked {
          border-color: #c89439;
          box-shadow: 0 50px 0 #fff;

          .discount-rmb {
            color: #fd720d;
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
      width: 100%;
      padding: 20px;
      margin: 90px 0;
      color: #fff;
      background-color: #dca85f;
      font-size: 34px;
      border-radius: 13px;
    }

  }
</style>
