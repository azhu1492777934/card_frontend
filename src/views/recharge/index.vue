<template>
  <div class="recharge-wrap">
    <!-- <div class="recharge-tip">
      <p>充值活动：充值余额送ELB，余额ELB可等额购买套餐。</p>
    </div> -->
    <div class="content-wrap">
      <div class="title-wrap">
        <em class="title-line"></em>
        <span class="title-name">支付选择</span>
        <em class="title-line rotate-180"></em>
      </div>
      <ul class="discount-wrap">
        <li @click="rechargeTypeClick(index)" v-for="(item,index) in new_recharge_list" data-rmb="100"
            v-bind:key="index"
            data-elb="20"
            :class="{'checked':index==activeIndex}">
          <div :class="{'monthlyPlan ':item.is_renew==true,'midPlan':item.is_first==false}">

            <div class="monthlyTop " v-if="item.is_first==true">
              <div class="monthlyFirst">首月</div>
              <div class="monthlyMoney">{{"¥"+item.first_price}}</div>
            </div>
            <p class="discount-rmb" :class="{'monthly-rmb':item.is_renew}" v-show="!item.newStatus">
              {{item.pay_type=='diamond_charge'?'余额支付':'充值'+item.pay_money+'元'}}
            </p>
            <p class="discount-rmb" :class="{'monthly-rmb':item.is_renew}"
               v-show="item.newStatus&&global_variables.packed_project == 'card'">
              {{item.pay_type=='diamond_charge'?'余额支付':'充值'+item.newPrice+'元'}}
            </p>
            <span v-show="item.pay_type!='diamond_charge'" class="line"></span>

            <p v-show="item.pay_type=='diamond_charge'" class="discount-appendix discount-diamond">
              <span class="surplus-recharge" v-if="surplus_cash >= 0">支付{{surplus_cash}}元</span>
              可抵扣<em class="j-user-rmb cl-primary">{{item.user_rmb}}</em>余额<br>无ELB赠送
            </p><!--钻石支付-->

            <p class="monthlyDes" v-if="item.is_renew">使用余额连续包月</p>

            <!-- <p v-show="item.pay_type=='normal_charge'" class="discount-appendix">无ELB赠送</p>      -->

            <p class="discount-appendix"
               v-show="item.pay_type=='over_charge'&&item.give_elb&&item.give_elb>0&&item.is_give_balance&&!item.newStatus">
              赠送<em
              class="cl-elb">
              {{item.give_elb}}</em>ELB
            </p><!--多充值支付-->
            <p class="discount-appendix"
               v-show="item.pay_type=='over_charge'&&item.give_balance&&item.give_balance>0&&item.is_give_balance&&!item.newStatus">
              赠送<em
              class="cl-elb">
              {{item.give_balance}}</em>元余额
            </p>
            <p class="discount-appendix"
               v-show="item.pay_type=='over_charge'&&item.give_balance&&item.give_balance>0&&item.is_give_balance&&item.newStatus&&global_variables.packed_project == 'card'">
              只需支付<em
              class="cl-elb">
              {{item.pay_money}}</em>元
            </p>

            <!-- <p v-show="item.migu===true && isMobile && isMiGuWatch" class="third-appendix">赠送7天咪咕铃声会员</p> -->

          </div>
          <div class="discountIcon"
               v-if="item.newStatus&&item.is_give_balance&&global_variables.packed_project === 'card'">
            <span>{{item.discount|discountFilters}}</span><span>折</span>
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
        <div v-show="isShowChoice.showCode &&isShowBalancePay">
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
      <!-- <div v-show="showMiGuTip && isMobile && isMiGuWatch" class="migu-expression-wrapper">
        <p>咪咕铃声会员规则说明</p>
        <ul>
          <li>1、赠送7天咪咕音乐振铃会员可在已安装手表铃声的新讯4G手表使用；</li>
          <li>2、未有已安装咪咕音乐的新讯4G手表的用户可下载咪咕音乐后使用绑定公众号的手机号码进行登录，享受咪咕音乐振铃会员权限，仅限安卓手机可设置；</li>
          <li>3、单账号限制赠送一次，取消或再次购买亦无法享受赠送咪咕7天铃声会员的权益。</li>
          <li>4、赠送7天铃声会员无需扣费，7天过后会按月收取4元/月资费，由用户话费支付。每月月初1号扣费自动续订；</li>
          <li>5、可通过电话10086人工，或者按照退订短信提示即可完成退订；</li>
          <li>5、活动解释权归前海翼联所有。</li>
        </ul>
      </div> -->
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
             <!-- v-if="global_variables.device!='android'&&client_type=='app'">微信支付</p> -->
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
  import {DatetimePicker, Area, Popup, Notify, Toast} from 'vant';
  import {removeStorage, getStorage, checkBrowser, lossRate, toDecimal, Today, appRate, isMobile} from "../../utilies";
  import {_post, _get} from "../../http";

  export default {
    name: "recharge",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner,
        isShowBalancePay: state => state.userInfo.showBalancePay,
      }),
    },
    components: {
      [Toast.name]: Toast,
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

        isMobile: false,
        isMiGuWatch:getStorage('migu_watch_card') === '1',
        showMiGuTip: false,

        userInfo: '',//用户信息
        openid: '', //用户openid
        planInfo: getStorage('planInfo', 'obj'),//当前充值套餐信息

        client_type: checkBrowser(),

        appPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
        settingRechargeList: [],
        advertisement: 'https://interaction.clotfun.online/horse', // 广告链接
        advertisementParam: 'https://interaction.clotfun.online/horse?appkey=9140154da0d728363fb5da33239d3316&adSpaceKey=7ef927bb19c43f04f948bb4138d21ee2&from=H5&1=1'

      }
    },
    filters: {
      discountFilters(val) {
        if (String((val * 100)).indexOf(0)) {
          return String(val * 100).replace("0", "");
        } else {
          return val * 100
        }
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
      if (this.global_variables.device === "android" && this.client_type === "app") {
        this.appPay.type = false;
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


      let balance_pay_card = await this.getBalancePayCard()

      if (this.isShowBalancePay && balance_pay_card == 1) { //余额期限
        this.recharge_list = [
          {
            pay_type: 'diamond_charge',
            pay_money: 0,
            user_rmb: 0,
            give_elb: 0,
          }, {
            pay_type: 'normal_charge',
            pay_money: 0,
            give_elb: 0
          }
        ]
      } else {
        this.recharge_list = [
          {
            pay_type: 'normal_charge',
            pay_money: 0,
            give_elb: 0
          }
        ]
      }

      // }
      this.new_recharge_list = this.filterRechargeList(user_rmb, this.planInfo.price);       //根据套餐价格过滤充值参数
      /*
     * 增加包月套餐
     * 条件限制:存在钻石用量
     * */

      if (this.userInfo.account.balance > 0 && this.planInfo.is_can_renew == 1) {
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

      } else if (this.userInfo.account.balance <= 0) {
        this.showOriginPrice === '1' ? this.activeIndex = (this.new_recharge_list.length - 1) : this.activeIndex = 0;
      }

      if (this.showOriginPrice === '2' || this.showOriginPrice === '3') {
        let newData = [];
        for (let i = 0; i < this.new_recharge_list.length; i++) {
          if (this.showOriginPrice === '2') {
            // ||this.new_recharge_list[i].pay_type=="diamond_charge"
            if (this.new_recharge_list[i].pay_type === "over_charge") {
              newData.push(this.new_recharge_list[i]);
            }
          } else if (this.showOriginPrice === '3') {
            if (this.new_recharge_list[i].pay_type === "normal_charge") {
              newData.push(this.new_recharge_list[i]);
            }
          }
        }
        this.new_recharge_list = newData;
      }


    },
    methods: {
      changedCheck: function (type) {
        switch (type) {
          case 'date':
            this.check_date = !this.check_date;
            if (!this.check_date) {
              this.val_date = Today()
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
        this.val_date = Today(value);
        this.showDate = false;
      },//确定弹窗
      dateCancel: function () {
        this.showDate = false;
      },//取消日期弹窗
      recharge: function () {
        if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
         Toast({
            position: 'top',
            message: "请在微信或支付宝客户端充值"
          })
          return
        }
        try {
          let rechargeInfo = this.new_recharge_list[this.activeIndex];
          if (this.client_type === "app" && this.planInfo.price > 100 && rechargeInfo.pay_money === 50) {
            Notify({message: '充值后余额不足抵扣套餐价格，请选择其他套餐进行充值'});
            return
          }
          // 广告
          let advert = this.advertisement
          if (rechargeInfo.pay_type === 'diamond_charge' && (this.planInfo.price < getStorage("userInfo", "obj").account.balance)) {
            advert = this.advertisementParam
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
            failed_page: window.location.href,
            success_page:  getStorage('advertState') ? `${window.location.protocol}//${window.location.host}` :this.global_variables.packed_project === 'mifi'? this.advertisement :  advert,
            //  mifiserve `${window.location.protocol}//${window.location.host}/mifi/card/index`
            //  cardserve `${window.location.protocol}//${window.location.host}/weixin/card/usage`,
            recharge_id: rechargeInfo.id ? rechargeInfo.id : 0
          };

          if (this.$route.query.un_pay_order === '1') param.no = this.planInfo.no;
          if (this.client_type === 'alipay' || this.client_type === 'wechat') param.open_id = (getStorage('decrypt_data', 'obj') || {}).openid
          if (this.client_type === 'wechat') param.pay_type = 'WEIXIN';
          if (this.client_type === 'alipay') param.pay_type = 'ALIPAY';
          if (this.client_type === 'app') {
            param.open_id = this.userInfo.account.user_id;
            (this.appPay.type) ? param.pay_type = 'WEIXIN' : param.pay_type = 'ALIPAY';
          }
          // 折扣相关参数判断
          let elbDiscountParams = [{
            pattern: !this.val_elb,
            msg: '请输入ELB抵扣数'
          }, {
            pattern: this.planInfo.is_elb_deductible === 0,
            msg: '此套餐不可抵扣ELB'
          }, {
            pattern: !/^[1-9]\d*$/.test(this.val_elb),
            msg: 'ELB最低抵扣数额为1'
          }, {
            pattern: this.val_elb > parseInt(this.userInfo.account.elb),
            msg: '您的ELB余额不足'
          }, {
            pattern: this.planInfo.is_elb_deductible === 1 && this.val_elb > this.planInfo.max_deductible_elb,
            msg: `此套餐ELB最大抵扣值为${this.planInfo.max_deductible_elb}`
          }, {
            pattern: this.val_elb >= this.planInfo.price,
            msg: 'ELB抵扣数不能超过套餐总值'
          }];

          if (this.check_elb) {
            let hasError = false;
            for (let i = 0; i < elbDiscountParams.length; i++) {
              if (elbDiscountParams[i].pattern) {
                Notify({message: elbDiscountParams[i].msg});
                hasError = true;
                break;
              }
            }
            if (hasError) return;

            param.elb_deduction = this.val_elb
          }
          if (this.check_coupon) {
            if (!this.val_coupon) {
              Notify({message: '请输入券码'});
              return
            } else {
              if (rechargeInfo.pay_type === 'diamond_charge') {
                param.coupon_no = this.val_coupon
              } else {
                Notify({message: '必须使用余额支付才能使用抵扣券'});
                return
              }
            }
          }
          if (this.check_date) {
            if (!this.val_date) {
              Notify({message: '请选择套餐生效时间'});
              return
            }
            param.start_time = this.val_date
          } else {
            param.start_time = this.val_date
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
                    if (this.global_variables.device === "iphone" && this.client_type === "app") {
                      Notify({
                        message: '购买成功。',
                        background: '#60ce53'
                      });
                    } else {
                      Notify({
                        message: '购买成功，兑换码已发放到您的手机号啦，请在7天内进行兑换。',
                        background: '#60ce53'
                      });
                    }

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
        } catch (err) {
          Toast({
            position: 'top',
            message: err.message
          })
        }
       
        
      },
      normalPay() {
        let rechargeInfo = this.new_recharge_list[this.activeIndex];

        appRate(4);

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
        appRate(5);
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
        appRate(6);
        if (this.global_variables.device === "android" && this.client_type === "app") {
          this.appPay.type = false;
        } else {
          this.appPay.type = true;
        }
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
      },
      getBalancePayCard() {
        return new Promise((resolve) => {
          _get("/api/v1/app/user/balance_pay_card", {
            iccid: getStorage('check_iccid'),
            user_id: getStorage("userInfo", "obj").account.user_id,
          }).then(res => {
            if (res.state === 1) {
              resolve(res.data.balance_pay_card)
            } else {
              resolve(1)
            }
          });
        })

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

          .third-appendix {
            padding-top: 5px;
            color: #333;
            font-size: 22px;
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

      .discountIcon {
        display: inline-block;
        width: 53px;
        height: 68px;
        background: url("../../assets/imgs/card/usage/fire.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -30px;
        right: -10px;
        color: #fff;
        font-size: 27px;
        font-weight: bold;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        padding-top: 20px;

        > span:nth-child(2) {
          font-size: 15px;
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

    .migu-expression-wrapper {
      p {
        padding-bottom: 15px;
        font-size: 30px;
        color: #2c251d;
      }

      li {
        padding-bottom: 10px;
        line-height: 1.5;
        font-size: 26px;
        color: #888;
      }
    }

    //充值方式选择
    .btn-large {
      display: block;
      width: 100%;
      padding: 20px;
      margin: 70px 0;
      color: #fff;
      background-color: #dca85f;
      font-size: 34px;
      border-radius: 13px;
    }

  }
</style>
