<template>
  <div class="more-flow-wrapper">
    <div v-if="plan_list.length">
      <ul class="plan-wrapper">
        <li :class="{'active':index === choose_plan_index}" v-for="(item,index) in plan_list"
            @click="changePlan(index)">
          <div>
            <span class="plan-name">{{item.name}}</span>
            <div class="plan-content">
              <div>
                {{item.describe}}
                <p>{{item.remark}}</p>
              </div>
              <div v-if="item.total >= 0">流量使用:{{changedUnit(item.used,true)}}/{{changedUnit(item.total,true)}}</div>
              <div v-if="item.total < 0">流量使用:{{changedUnit(item.used,true)}}/不限量</div>

              <div v-if="(item.used_voice > 0 || item.total_voice > 0) ">通话使用:{{toDecimal(item.used_voice)}}Min/{{toDecimal(item.total_voice)}}Min</div>
              <div v-if="item.total_voice < 0">通话使用:{{toDecimal(item.used_voice)}}Min/不限量
              </div>
            </div>
          </div>
          <div>
            <span class="plan-type">{{plan_type_name[item.type]}}</span>
            <p class="date-wrapper">开始时间:{{filterDate(item.activated_at)}}</p>
            <p class="date-wrapper">结束时间:{{filterDate(item.expired_at)}}</p>
          </div>
        </li>
      </ul>
      <div class="warning-wrapper">
        <p>加油包暂不支持退款请慎重选择</p>
        <p>加油包有效期和指定套餐有效期相同</p>
        <p>月套餐充值加油包仅当月有效</p>
        <p>加油包需充值到指定套餐中方可使用</p>
      </div>

      <div class="btn-recharge-wrap">
        <button @click="recharge">充值</button>
      </div>
    </div>

    <!--充值弹窗-->
    <van-Dialog
      v-model="show_recharge_popup"
      title="充值方式"
      show-cancel-button
      :beforeClose="balanceRecharge"
    >
      <div class="recharge-dialog-wrapper">
        <div :class="{'active':isBalance}" @click="chooseRechargeType(true)">
          <p class="cl-balance">余额支付</p>
          <p>支付{{final_money}}元</p>
          <p>可抵扣{{recharge_balance}}余额</p>
        </div>

        <div :class="{'active':!isBalance}" @click="chooseRechargeType(false)">
          <p>充值{{more_flow_plan_info.price}}元</p>
        </div>
      </div>

      <!--      &lt;!&ndash;app 支付选择&ndash;&gt;-->
      <!--      <div class="app-pay-wrapper">-->
      <!--        <p>微信支付</p>-->
      <!--        <p>支付宝支付</p>-->
      <!--      </div>-->

    </van-Dialog>

    <!--创建套餐-->
    <van-popup
      :close-on-click-overlay="false"
      v-model="rechargeShow">
      <p class="showTip">创建订单中,请等候</p>
    </van-popup>

    <!--loading plan-->
    <van-popup
      v-model="loading"
    >
      <van-loading color="#1989fa">
        <p>加载加油包叠加套餐列表</p>
      </van-loading>
    </van-popup>

    <!--loading callback-->
    <no-data v-if="show_callback" :text="callback_msg"/>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import {Toast, Popup, Notify, Dialog, Loading} from "vant";
  import {setStorage, getStorage, checkBrowser, Today, toDecimal} from "../../utilies";
  import {_get, _post} from "../../http";
  import noData from '@/components/empty'
  // @ is an alias to /src
  export default {
    name: "MoreFlowPlan",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    data() {
      return {
        client_type: checkBrowser(),
        cur_plan_type_index: 0, //当前选中套餐类型
        choose_plan_index: 0, //当前选中套餐
        plan_type_name: {
          0: "累计套餐",
          1: "月套餐",
          2: "加油包",
          5: "周期性套餐",
          6: "超量自动续费套餐"
        },// 套餐名称
        plan_list: [],
        choose_plan_info: {},// 选择叠加的目标套餐
        more_flow_plan_info: getStorage('planInfo', 'obj') || {},
        // loading
        loading: true,
        rechargeShow: false,
        show_recharge_popup: false,
        // loading callback
        callback_msg: '暂无数据',
        show_callback: false,
        isBalance: true,
        // 充值数据
        recharge_balance: 0,
        final_money: 0,
        appPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
      };
    },
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
      [Loading.name]: Loading,
      noData
    },
    created() {
      _get("/api/v1/app/cards/plan/usage", {
        iccid: getStorage("check_iccid")
      }).then(res => {
        this.loading = false;
        if (res.state === 1) {
          this.plan_list = res.data;
          if (!this.plan_list.length) {
            this.show_callback = true;
            this.callback_msg = '暂无数据';
          }
        } else {
          this.show_callback = true;
          this.callback_msg = res.msg;
        }
      });
    },
    methods: {
      recharge: function () {
        this.choose_plan_info = this.plan_list[this.choose_plan_index];
        // 是否存在余额
        if (this.authorizedUserInfo.account.balance <= 0) {
          this.directRecharge(this.more_flow_plan_info);
        }
        // 存在余额 - 计算余额
        if (this.authorizedUserInfo.account.balance > 0) {
          if (this.authorizedUserInfo.account.balance - this.more_flow_plan_info.price >= 0) {
            this.final_money = 0.00;
            this.recharge_balance = this.more_flow_plan_info.price;
          } else {
            this.final_money = toDecimal(this.more_flow_plan_info.price - this.authorizedUserInfo.account.balance);
            this.recharge_balance = this.authorizedUserInfo.account.balance;
          }

          this.show_recharge_popup = true;
        }
      },
      //直接充值
      directRecharge(planInfo, isBalance) {
        if (this.client_type !== "alipay" && this.client_type !== "wechat") {
          Notify({message: "请在微信或支付宝客户端充值"});
          return;
        }
        let _this = this;
        let param = {
          status: isBalance ? 1 : 0,// 区分现金与非现金
          recharge_price: planInfo.price,
          price: planInfo.price,
          iccid: planInfo.iccid || getStorage("check_iccid"),
          rating_id: planInfo.id,
          user_id: this.authorizedUserInfo.account.user_id,
          env: this.client_type,
          recharge_type: this.global_variables.packed_project === 'mifi' ? 1 : 0,
          // type: 0,
          start_time: Today(),
          band_rating_id: this.choose_plan_info.id,
          band_order_id: this.choose_plan_info.order_id
        };
        if (this.client_type === "alipay" || this.client_type === "wechat") param.open_id = getStorage("decrypt_data", "obj").openid;
        if (this.client_type === "app") param.open_id = this.authorizedUserInfo.account.user_id;
        if (this.client_type === "app") this.appPay.type ? param.pay_type = "WEIXIN" : param.pay_type = "ALIPAY";
        if (this.client_type === "wechat") param.pay_type = "WEIXIN";
        if (this.client_type === "alipay") param.pay_type = "ALIPAY";

        this.rechargeShow = true;
        let payDom = document.querySelector('form');
        if (payDom) document.removeChild(payDom);
        _post("/api/v1/pay/weixin/create", param).then(res => {
          if (res.state === 1) {
            this.rechargeShow = false;
            if (/<[^>]+>/.test(res.data)) {
              const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);
              document.forms[0].submit();
            }
            if (res.data && Object.prototype.toString.call(res.data) === "[object String]" && res.data.substr(0, 4) === "http") {
              //app
              this.global_variables.packed_project === "mifi" ?
                location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index`
                : location.href = res.data;
            } else {
              Notify({
                message: "创建订单成功",
                background: "#60ce53"
              });

              setTimeout(function () {
                if (localStorage.getItem("currentType") === "esim") {
                  location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                } else {
                  _this.global_variables.packed_project === "mifi" ? location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data.return_url;
                }
              }, 1500);
            } //纯钻石支付
          } else {
            this.rechargeShow = false;
            Notify({
              message: res.msg
            });
          }
        });
      },
      balanceRecharge(action, done) {
        if (action === 'cancel') done();
        if (action === 'confirm') {
          done();
          this.isBalance ? this.directRecharge(this.more_flow_plan_info, true) : this.directRecharge(this.more_flow_plan_info);
        }
      },
      changePlan(index) {
        this.choose_plan_index = parseInt(index);
      },
      chooseRechargeType(flag) {
        this.isBalance = !!flag
      }
    }
  };
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .more-flow-wrapper {
    padding: 20px 20px 0;
    box-sizing: border-box;

    .plan-wrapper {
      height: 55vh;
      overflow: auto;

      li {
        display: flex;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #ededed;
        box-sizing: border-box;

        &.active {
          background-image: linear-gradient(90deg, #ebb85d 10%, #fae4b3 100%);

          .plan-name {
            color: #000;
          }

          .plan-content, .date-wrapper {
            color: #543200;
          }
        }

        > div {
          &:first-child {
            flex: 6;
            text-align: left;
          }

          &:last-child {
            flex: 4;
            text-align: right;
          }
        }

        .plan-name {
          position: relative;
          display: inline-block;
          margin-bottom: 35px;
          color: #808080;
          font-size: 30px;

          &::after {
            position: absolute;
            bottom: -20px;
            display: block;
            content: '';
            width: 100%;
            height: 4px;
            background-color: #c78f38;
          }
        }

        .plan-content {
          color: #808080;
          font-size: 26px;
          line-height: 1.5;
        }

        .plan-type {
          display: inline-block;
          width: 170px;
          height: 50px;
          margin-bottom: 20px;
          padding-left: 10px;
          text-align: center;
          color: #fff;
          font-size: 22px;
          line-height: 52px;
          .bg-image('../../assets/imgs/card/more_flow/bg-plan-type');
        }

        .date-wrapper {
          color: #808080;
          font-size: 26px;
        }

      }
    }

    .warning-wrapper {
      width: 100%;
      padding: 50px 0;
      margin: 0 20px;

      p {
        color: #654828;
        font-size: 26px;
        line-height: 1.5;
        text-align: left;
        &:first-child{
          color: #ff3448;
          font-size: 28px;
        }

        &:before {
          content: "*";
          color: #ff4e35;
        }
      }
    }

    .btn-recharge-wrap {
      padding: 40px 32px;
      position: relative;

      button {
        display: block;
        width: 430px;
        height: 80px;
        font-size: 36px;
        color: #000;
        background: linear-gradient(-33deg, rgba(253, 212, 122, 1), rgba(240, 181, 70, 1));
        border-radius: 40px;
        margin: 0 auto;
      }

    }

    .recharge-dialog-wrapper {
      /*display: table;*/
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: center;

      .cl-balance {
        color: #ff562f;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
        width: 33%;
        max-width: 33.33%;
        min-height: 150px;
        padding: 15px;
        font-size: 28px;
        text-align: center;
        border: 1PX solid #e6e6e6;
        border-radius: 16px;
        -webkit-text-size-adjust: none;
        vertical-align: middle;

        p {
          width: 100%;
        }

        &.active {
          border-color: #c89439;

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

        &:first-child {
          margin-right: 10px;

          p {
            &:last-child {
              font-size: 20px;
              color: #888;
            }
          }
        }

        &:last-child {
          margin-left: 10px;

          p {
            position: relative;
            display: inline-block;

            &:after {
              position: absolute;
              display: block;
              left: 50%;
              bottom: -10px;
              margin-left: -25%;
              width: 50%;
              height: 4px;
              background: #c78f38;
              content: '';
            }
          }
        }
      }
    }

    /*.app-pay-wrapper {*/
    /*  margin-top: 15px;*/
    /*  border-top: 1px solid #f5f5f5;*/

    /*  p {*/
    /*    width: 49%;*/
    /*    margin: 0 auto 10px;*/
    /*    padding: 20px;*/
    /*    border: 1px solid #ff0000;*/
    /*    border-radius: 10px;*/
    /*    &.active {*/

    /*    }*/
    /*  }*/
    /*}*/

    .van-loading {
      width: 70%;
      padding: 15px;
      background: #fff;
      overflow: hidden;

      .van-loading__text {
        padding-top: 10px;
        display: block;
      }
    }
  }
</style>

