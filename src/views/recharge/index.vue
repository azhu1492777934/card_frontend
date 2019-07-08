<template>
  <div class="recharge-wrap">
    <div class="recharge-tip">
      <p>充值活动：充值钻石送ELB，钻石ELB可等额购买套餐。</p>
    </div>
    <div class="content-wrap">
      <div class="title-wrap">
        <em class="title-line"></em>
        <span class="title-name">支付选择</span>
        <em class="title-line rotate-180"></em>
      </div>
      <ul class="discount-wrap">
        <li @click="rechargeTypeClick(index)" v-for="(item,index) in new_recharge_list" data-rmb="100"
            data-elb="20"
            :class="{'checked':index==activeIndex}">
          <div :class="{'monthlyPlan ':item.is_renew==true,'midPlan':item.is_first==false}">

            <div class="monthlyTop " v-if="item.is_first==true">
              <div class="monthlyFirst">首月</div>
              <div class="monthlyMoney">{{"¥"+item.first_price}}</div>
            </div>
            <p class="discount-rmb" :class="{'monthly-rmb':item.is_renew}">
              {{item.pay_type=='diamond_charge'?'钻石支付':item.pay_money+'元'}}
            </p>

            <span v-show="item.pay_type!='diamond_charge'" class="line"></span>

            <p v-show="item.pay_type=='diamond_charge'" class="discount-appendix discount-diamond">
              <span class="surplus-recharge" v-if="surplus_cash >= 0">支付{{surplus_cash}}元</span>
              可抵扣<em class="j-user-rmb cl-primary">{{item.user_rmb}}</em>钻石<br>无ELB赠送
            </p><!--钻石支付-->

            <p class="monthlyDes" v-if="item.is_renew">使用钻石连续包月</p>

            <p v-show="item.pay_type=='normal_charge'" class="discount-appendix">无ELB赠送</p><!--正常支付-->

            <p class="discount-appendix" v-show="item.pay_type=='over_charge'">赠送<em class="cl-elb">
              {{item.give_elb}}</em>ELB
            </p><!--多充值支付-->
          </div>
        </li>
        <li class="special"></li>
      </ul>
      <div class="choice-wrap">
        <div v-show="isShowChoice.showDate">
          <span class="cl-primary">生效日期：</span>
          <div @click="changedCheck('date')">
            <input :checked="!check_date" type="radio">
            <span>立即生效</span>
          </div>
          <div @click="changedCheck('date')">
            <input :checked="check_date" type="radio">
            <span>选择时间</span>
          </div>
          <input @click="showChooseDate" v-show="check_date" id="dateSelector" v-model="val_date" readonly
                 placeholder="请选择时间"
                 type="text">
        </div><!--生效日期-->
        <div v-show="isShowChoice.showCode">
          <span class="cl-primary">使用抵扣券：</span>
          <div @click="changedCheck('coupon')">
            <input :checked="!check_coupon" type="radio">
            <span>否</span>
          </div>
          <div @click="changedCheck('coupon')">
            <input :checked="check_coupon" type="radio">
            <span>是</span>
          </div>
          <input v-show="check_coupon" id="codeSelector" v-model="val_coupon" placeholder="请输入券码,券码不退不补"
                 type="text">
        </div><!--抵扣券-->
        <div v-show="isShowChoice.showELB">
          <span class="cl-primary">使用ELB：</span>
          <div @click="changedCheck('elb')">
            <input :checked="!check_elb" type="radio">
            <span>否</span>
          </div>
          <div @click="changedCheck('elb')">
            <input :checked="check_elb" type="radio">
            <span>是</span>
          </div>
          <input v-show="check_elb" id="elbSelector" v-model="val_elb" placeholder="请输入抵扣数,ELB不退不补"
                 type="number">
        </div><!---elb-->
      </div>
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
          <p @click="changePayType(1)" :class="{'choose_type':appPay.type}">微信支付</p>
          <p @click="changePayType(0)" :class="{'choose_type':!appPay.type}">支付宝支付</p>
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
  import {setStorage, getStorage, checkBrowser, lossRate, toDecimal} from "../../utilies";
  import {_post} from "../../http";

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
          }, {
            pay_type: 'over_charge',
            pay_money: 100,
            give_elb: 20
          }, {
            pay_type: 'over_charge',
            pay_money: 200,
            give_elb: 50
          }, {
            pay_type: 'over_charge',
            pay_money: 300,
            give_elb: 80
          }, {
            pay_type: 'normal_charge',
            pay_money: 0,
            give_elb: 0
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

        val_date: this.getToday(),
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

      }
    },
    created() {
      // 用户流失率统计
      lossRate({
        type: 4,
        iccid: this.planInfo.iccid || getStorage('check_iccid')
      });

      if (getStorage('decrypt_data', 'obj')) {
        this.open_id = getStorage('decrypt_data', 'obj').openid
      }

      if (!this.planInfo) {
        this.$router.push({'path': '/card/plan_list'});
      }

      if (this.planInfo) {
        if (this.planInfo.is_elb_deductible === 0) {
          this.isShowChoice.showELB = false
        }
      }//是否显示ELB

      if (getStorage('newCard')) {
        if (getStorage('newCard') == 1) {
          this.isShowChoice.showELB = false;
          this.isShowChoice.showCode = false;
          this.isShowChoice.showDate = false;
        }
      }//新卡默认不显示所有选择

      if (getStorage('isSpeedUp')) {
        if (getStorage('isSpeedUp') == 1) {
          this.isShowChoice.showDate = false;
        }
      }//加速包默认不显示生效时间

      /*
      * 用户钻石数
      * 套餐价格
      * */
      let user_rmb = 0;
      this.userInfo = this.authorizedUserInfo;

      if (this.userInfo.account.rmb > 0) {
        user_rmb = this.userInfo.account.rmb;
      }
      this.new_recharge_list = this.filterRechargeList(user_rmb, this.planInfo.price);//根据套餐价格过滤充值参数



      /*
     * 增加包月套餐
     * 条件限制:存在钻石用量
     * */

      if (this.userInfo.account.rmb > 0 && this.planInfo.is_can_renew == 1) {
        const monthlyMsg = getStorage("monthlyMsg", "obj");
        monthlyMsg.give_elb = 0;
        if (monthlyMsg.is_first) {
          monthlyMsg.pay_money = monthlyMsg.first_price;
        } else {
          monthlyMsg.pay_money = monthlyMsg.price;
        }
        monthlyMsg.pay_type = "monthly_recharge";

        monthlyMsg.is_renew = true;
        this.new_recharge_list.push(monthlyMsg);

      } else if (this.userInfo.account.rmb <= 0) {
        this.showOriginPrice == 1 ? this.activeIndex = (this.new_recharge_list.length - 1) : this.activeIndex = 0;
      }



       
            if(this.showOriginPrice==2||this.showOriginPrice==3){
              let newData=[];
              console.log(this.new_recharge_list);
              for(let i=0;i<this.new_recharge_list.length;i++){
                  if(this.showOriginPrice==2){
                    // ||this.new_recharge_list[i].pay_type=="diamond_charge"
                      if(this.new_recharge_list[i].pay_type=="over_charge"){
                          newData.push(this.new_recharge_list[i]);
                      }
                  }else if(this.showOriginPrice==3){
                      if(this.new_recharge_list[i].pay_type=="normal_charge"){
                          newData.push(this.new_recharge_list[i]);
                      }
                  }
              }
              console.log(newData);
                this.new_recharge_list=newData;
            }


    },
    methods: {
      changedCheck: function (type) {
        switch (type) {
          case 'date':
            this.check_date = !this.check_date;
            if (!this.check_date) {
              this.val_date = this.getToday()
            }
            break;
          case 'coupon':
            this.check_coupon = !this.check_coupon;
            break;
          case 'elb':
            this.check_elb = !this.check_elb;
            break;
        }
      },
      rechargeTypeClick: function (index) {
        this.activeIndex = index
      },
      dateFormatter: function (type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value;
      },
      getToday: function (val) {
        let date = new Date();
        if (val) {
          date = new Date(val);
        }
        let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        return year + '-' + month + '-' + day
      },
      getEndDate: function () {
        let date = new Date();
        date.setDate(date.getDate() + 90);
        let end_month = date.getMonth() + 1,
          end_date = date.getDate(),
          end_year = date.getFullYear();
        if (end_month < 10) {
          end_month = '0' + end_month
        }
        if (end_date < 10) {
          end_date = '0' + end_date
        }
        return {
          endDay: end_date,
          endMonth: end_month - 1,
          endYear: end_year
        }
      },
      showChooseDate: function () {
        this.showDate = true;
      },
      dateConfirm: function (value) {
        this.val_date = this.getToday(value);
        this.showDate = false;
      },//确定弹窗
      dateCancel: function () {
        this.showDate = false;
      },//取消日期弹窗
      recharge: function () {
        if (!this.userInfo.account.user_id) {
          Notify({message: '请在微信或支付宝客户端充值'});
          return
        }
        let rechargeInfo = this.new_recharge_list[this.activeIndex];
        let param = {},
          _this = this;

        rechargeInfo.pay_type === 'diamond_charge' || rechargeInfo.pay_type === 'monthly_recharge' ? param.status = 1 : param.status = 0;
        if (rechargeInfo.pay_type === 'over_charge' || rechargeInfo.pay_type === 'normal_charge' || rechargeInfo.pay_type === 'monthly_recharge') {
          param.recharge_price = rechargeInfo.pay_money
        }

        if (this.client_type === 'alipay' || this.client_type === 'wechat') {
          param.open_id = this.open_id;
        } else if (this.client_type === 'app') {
          param.open_id = this.userInfo.account.user_id

        }

        if (this.$route.query.un_pay_order === '1') param.no = this.planInfo.no;

        param.iccid = this.planInfo.iccid || getStorage('check_iccid');
        param.rating_id = this.planInfo.id;
        param.is_renew = rechargeInfo.is_renew;
        if (rechargeInfo.is_renew == true) {
          param.price = rechargeInfo.first_price;
        } else {
          param.price = this.planInfo.price;
        }

        param.user_id = this.userInfo.account.user_id;
        param.env = this.client_type;

        if (this.client_type === 'app') {
          if (this.appPay.type) {
            param.pay_type = 'WEIXIN'
          } else {
            param.pay_type = 'ALIPAY'
          }
        } else if (this.client_type === 'wechat') {
          param.pay_type = 'WEIXIN'
        } else if (this.client_type === 'alipay') {
          param.pay_type = 'ALIPAY'
        }


        if (this.check_elb) {
          let userElb = parseInt(this.userInfo.account.rmb);
          if (!this.val_elb) {
            Notify({message: '请输入ELB抵扣数'})
            return
          }
          if (this.planInfo.is_elb_deductible == 0) {
            Notify({message: '此套餐不可抵扣ELB'})
            return
          }
          if (!(/^[1-9]\d*$/.test(this.val_elb))) {
            Notify({message: 'ELB最低抵扣数额为1'})
            return
          }
          if (this.val_elb > userElb) {
            Notify({message: '您的ELB余额不足'})
            return
          }
          if (this.planInfo.is_elb_deductible == 1 && this.val_elb > this.planInfo.max_deductible_elb) {
            Notify({message: '此套餐ELB最大抵扣值为' + this.planInfo.max_deductible_elb})
            return
          }
          if (this.val_elb >= this.planInfo.price) {
            Notify({message: 'ELB抵扣数不能超过套餐总值'})
            return
          }
          param.elb_deduction = this.val_elb

        }
        if (this.check_coupon) {
          if (!this.val_coupon) {
            Notify({message: '请输入券码'})
            return
          } else {
            param.coupon_no = this.val_coupon
          }
        }
        if (this.check_date) {
          if (!this.val_date) {
            Notify({message: '请选择套餐生效时间'})
            return
          } else {
            param.start_time = this.val_date
          }
        } else {
          param.start_time = this.val_date
        }

        this.global_variables.packed_project === 'mifi' ? param.type = 1 : param.type = 0;
        this.rechargeShow = true;
        _post('/api/v1/pay/weixin/create', param)
          .then(res => {
            if (res.state === 1) {
              this.rechargeShow = false;
              if (/<[^>]+>/.test(res.data)) {

                document.write(res.data);

              } else if (res.data && Object.prototype.toString.call(res.data) == '[object String]' && res.data.substr(0, 4) == 'http') { //app
                this.global_variables.packed_project === 'mifi' ?
                  location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data;
              } else {
                Notify({
                  message: '充值成功',
                  background: '#60ce53'
                })

                setTimeout(function () {
                  if (localStorage.getItem("currentType") === "esim") {
                    location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                  } else {
                    _this.global_variables.packed_project === 'mifi' ?
                      location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data.return_url
                  }

                }, 1500);
              }//纯钻石支付
            } else {
              this.rechargeShow = false;
              Notify({
                message: res.msg
              })
            }
          })
      },
      normalPay() {
        let rechargeInfo = this.new_recharge_list[this.activeIndex];
        if (this.client_type === 'app') {

          if (rechargeInfo.pay_type === 'diamond_charge' && this.userInfo.account.rmb > this.planInfo.price) {
            this.appPay.show = false
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
            if (planPrice > 100 && planPrice <= 200) {
              return (item.pay_type === 'over_charge' && item.pay_money == 200)
                || item.pay_type === 'normal_charge'
            } else if (planPrice > 200 && planPrice <= 300) {
              return (item.pay_type === 'over_charge' && item.pay_money > 200)
                || item.pay_type === 'normal_charge'

            } else if (planPrice > 300) {
              return item.pay_type === 'normal_charge'
            } else {
              return item.pay_money >= 0
                && item.pay_type !== 'diamond_charge'
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
            if (planPrice > 100 && planPrice <= 200) {
              return item.pay_type === 'diamond_charge'
                || (item.pay_type === 'over_charge' && item.pay_money == 200)
                || item.pay_type === 'normal_charge'


            } else if (planPrice > 200 && planPrice <= 300) {
              return item.pay_type === 'diamond_charge'
                || (item.pay_type === 'over_charge' && item.pay_money > 200)
                || item.pay_type === 'normal_charge'


            } else if (planPrice > 300) {
              return item.pay_type === 'diamond_charge'
                || item.pay_type === 'normal_charge'
            } else {
              return item.pay_money >= 0
            }
          }
        })
      },//用户rmb,套餐价格planPrice
      changePayType(type) {
        if (type) {
          this.appPay.type = true
        } else {
          this.appPay.type = false
        }
      },

      closePayType() {
        this.appPay.type = true;
        this.appPay.show = false
      }
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
    //充值按钮

  }
</style>