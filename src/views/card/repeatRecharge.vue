<template>
  <div class="repeat-plan-wrap">
    <div class="activityPage" ref="activityPage"></div>
    <div class="van-swipe-wrap" ref="vanSwiperWwrap">
      <ul class="plan-list-wrap">
        <li @click="choosePlanClick(inner_index)"
            v-for="(inner_item,inner_index) in repeat_plan_list"
            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
          <div class="plan-info-wrap">
            <p :class="{'plan-icon-recommend':inner_item.is_recommend}" class="plan-name">
              <span v-if="inner_item.is_recommend" class="iconfont icon-recommend"></span>
              {{ inner_item.name }}
            </p>
            <p class="plan-limited-wrap">
              <span class="limited-num" v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
            </p>
            <p class="plan-desc">
              {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''
              }}
            </p>
          </div>
          <div class="plan-price-wrap">
            <p class="plan-price">
              <i></i>
              ￥{{ inner_item.repeat_recharge_price }}</p>
            <del class="plan-origin-price">原价:￥{{ inner_item.price }}</del>
          </div>
          <span class="plan-selected"></span>
          <!--选中状态-->
          <span class="icon-sell-done"
                v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span>
          <!--售罄-->
        </li>
      </ul>
      <!-- </swiper-slide> -->
      <!-- </swiper> -->
    </div>

    <div ref="refPlanButton2" class="btn-recharge-wrap " :class="{'noDataHide':load_plan_list}">
      <button class="realNameButton" @click="goRealName">跳过此步，去实名</button>
    </div>

    <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
      <button @click="recharge">立即复充</button>
    </div>

    <van-popup :close-on-click-overlay="false" v-model="load_plan_list">
      <p class="showTip">{{load_plan_msg}}</p>
    </van-popup>

    <div v-show="load_plan_msg==''" class="fixed-wrap-loading">
      <div id="loading-common-center">
        <div id="loading-common-center-inner">
          <div class="loading-object" id="first_object"></div>
          <div class="loading-object" id="second_object"></div>
          <div class="loading-object" id="third_object"></div>
        </div>
      </div>
    </div>
    <van-popup :close-on-click-overlay="false" v-model="rechargeShow">
      <p class="showTip">创建订单中,请等候</p>
    </van-popup><!--创建订单-->
  </div>
</template>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";
  @import "../../assets/less/common";

  html, body, #app {
    height: 100%;
  }

  .repeat-plan-wrap {
    .activityPage {
      background: url("../../assets/imgs/card/usage/activityPage.png") no-repeat;
      background-size: 100% 100%;
      height: 322px;
    }

    .swiper-container {
      height: 100%;
    }

    .plan-type-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;

      .plan-type-inner-wrap {
        border: 1PX solid #dca85f;
        border-radius: 46px;
      }

      span {
        display: inline-block;
        height: 46px;
        padding: 0 50px;
        color: #868686;
        border: 1px solid transparent;
        font-size: 28px;
        line-height: 50px;
        border-radius: 46px;

        &.active_type {
          color: #fff;
          background-color: #dca85f;
        }
      }
    }

    //套餐列表
    .plan-list-wrap {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      li {
        position: relative;
        display: flex;
        width: 90%;
        min-height: 95px;
        margin: 0 auto;
        padding: 0 15px;
        box-sizing: border-box;
        color: #868686;
        border: 1PX solid #e6e6e6;
        border-radius: 10px;
        margin-bottom: 25px;
        align-items: center;
        font-size: 20px;

        &:first-child {
          margin-top: 20px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        //套餐信息
        .plan-info-wrap {
          flex: 5;
          box-sizing: border-box;
          text-align: left;
          font-size: 24px;

          .plan-name {
            padding: 20px 0 10px;
            font-size: 30px;
            color: #2c251d;
            font-weight: 500;
          }

          .plan-icon-recommend {
            padding: 20px 0 20px 60px;
          }

          .icon-recommend {
            position: absolute;
            top: 5px;
            left: 10px;
            font-size: 60px;
          }

          .plan-limited-wrap {
            .limited-num {
              display: inline-block;
              padding: 6px 20px 4px;
              margin: 0 5px 10px 0;
              font-size: 20px;
              color: #f11919;
              background-color: #f9d8d8;
              border-radius: 4px;
              line-height: 1;
            }
          }

          .plan-desc {
            font-size: 28px;
            padding-bottom: 20px;
          }
        }

        .plan-price-wrap {
          flex: 1.5;

          .plan-price {
            color: #fd720d;
            font-size: 36px;
            display: flex;

            i {
              display: inline-block;
              width: 56px;
              height: 40px;
              background: url("../../assets/imgs/card/usage/unchecked.png") no-repeat;
              background-size: 100% 100%;
            }
          }

        }

        //当前选中样式
        &.activedPlan {
          border: 1PX solid #dca85f;
          box-shadow: 0 0 30px 0 #eae9e9;

          .plan-name {
            color: #fd720d;
          }

          .selected-plan {
            position: absolute;
            right: 0;
            bottom: 0;
          }

          .plan-price {
            i {
              background: url("../../assets/imgs/card/usage/checked.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }

        //售罄状态
        &.plan-sell-done {
          background-color: #f0f0f0;

          .plan-name,
          .plan-price {
            color: #868686;
          }

          .icon-sell-done {
            position: absolute;
            top: 40px;
            left: 50%;
            margin-left: -100px;
            padding: 10px 20px;
            font-size: 28px;
            box-sizing: border-box;
            border: 4px solid #ed6153;
            color: #ed6153;
            border-radius: 12px;
            transform: rotate(-28deg);
          }

          .icon-sell-done::after {
            content: "已售罄";
          }
        }
      }
    }

    .btn-recharge-wrap {
      padding: 18px 32px;

      &.noDataHide {
        display: none;
      }

      button {
        display: block;
        width: 100%;
        padding: 20px 0;
        font-size: 34px;
        color: #fff;
        background-color: #dca85f;
        border-radius: 8px;
      }

      .realNameButton {
        background: #fff;
        border: 1px solid #979797;
        padding: 20px 0;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(183, 183, 183, 1);
      }
    }

  }
</style>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {Toast, Popup, Notify, List} from "vant";
  import {setStorage, getStorage,removeStorage, checkBrowser, lossRate} from "../../utilies";
  import {_get, _post} from "../../http";
  // @ is an alias to /src
  export default {
    name: "home",

    data() {
      const _this = this;
      return {
        client_type: checkBrowser(),
        moth_plan: null,
        accumulated_plan: null,
        speedup_plan: null,
        load_plan_list: false,
        load_plan_msg: "",
        plan_type: [],
        plan_type_name: [],
        cur_plan_type_index: 0, //当前选中套餐类型
        choose_plan_index: 0, //当前选中套餐
        plan_list: {},
        ref_plan_type: null,
        swiperOption: {
          on: {
            slideChangeTransitionEnd: function (swiper) {
              _this.cur_plan_type_index = this.activeIndex
            }
          }
        },
        rechargeShow: false,
        repeat_plan_list: [],
        auth_url: "",
        allow_recharge: ""
      };
    },
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [List.name]: List,
      swiper,
      swiperSlide,

    },
    computed: {
      swiper() {
        return this.$refs.swiperVant.swiper
      }
    },
    created() {
      removeStorage('plan_list_new_card');
      //处理套餐数据
      _get("/api/v1/app/repeat_recharge/plans", {
        iccid: getStorage("check_iccid")
      }).then(res => {
        if (res.state === 1) {
          if (res.data.rate_plans.length === 0) {
            location.href = res.data.auth_url;
            return false;
          }
          // 流失率统计
          lossRate({
            iccid: getStorage('check_iccid'),
            type: 6
          });
          this.load_plan_msg = res.msg;
          this.load_plan_list = false;
          this.repeat_plan_list = res.data.rate_plans;
          this.auth_url = res.data.auth_url;

          this.$nextTick(() => {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
              refPlanButton = this.$refs.refPlanButton.offsetHeight,
              refPlanButton2 = this.$refs.refPlanButton2.offsetHeight,
              activityPage = this.$refs.activityPage.offsetHeight,
              userHeight = getStorage('userHeight') || 44;
            if (this.client_type === 'wechat' || this.client_type === 'alipay') {
              this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPlanButton - refPlanButton2 - activityPage - userHeight) + 'px'
            } else {
              this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPlanButton - refPlanButton2 - activityPage) + 'px'
            }
          })

        } else {
          this.load_plan_list = true;
          this.load_plan_msg = res.msg;
        }
      });
    },
    methods: {
      swiperOnChange: function (index) {
        this.cur_plan_type_index = index;
        this.choose_plan_index = 0;
      },
      planTypeClikc: function (index) {
        this.cur_plan_type_index = index;
        this.choose_plan_index = 0;
        this.swiper.slideTo(index);
      },
      choosePlanClick: function (index) {
        this.choose_plan_index = index;
      },
      recharge: function () {
        let planInfo = this.repeat_plan_list[this.choose_plan_index];
        planInfo.iccid = getStorage("check_iccid");
        planInfo.price = planInfo.repeat_recharge_price;
        planInfo.is_repeat_plan = true;
        setStorage("planInfo", planInfo, "obj");
        this.directRecharge(planInfo);
      },
      //跳转实名
      goRealName() {
        location.href = this.auth_url;
      },
      //直接充值
      directRecharge(planInfo) {
        if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
          Notify({message: '请在微信或支付宝客户端充值'});
          return
        }
        let param = {},
          _this = this;
        param.status = 0;
        param.recharge_price = planInfo.price;
        param.price = planInfo.price;

        if (this.client_type === 'alipay' || this.client_type === 'wechat') {
          param.open_id = (getStorage('decrypt_data', 'obj') || {}).openid;
        } else if (this.client_type === 'app') {
          param.open_id = getStorage("userInfo", "obj").account.user_id

        }
        param.iccid = planInfo.iccid || getStorage('check_iccid');
        param.rating_id = planInfo.id;


        param.user_id = getStorage("userInfo", "obj").account.user_id;
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

        param.start_time = this.getToday();

        param.type = 0;
        if (planInfo.is_repeat_plan) {
          param.is_repeat_plan = 1;
        }
        this.rechargeShow = true;
        _post('/api/v1/pay/weixin/create', param)
          .then(res => {
            if (res.state === 1) {
              this.rechargeShow = false;

              if (/<[^>]+>/.test(res.data)) {

                document.write(res.data);

              } else if (res.data && Object.prototype.toString.call(res.data) === '[object String]' && res.data.substr(0, 4) === 'http') { //app
                this.global_variables.packed_project === 'mifi' ?
                  location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data;
              } else {
                Notify({
                  message: '充值成功',
                  background: '#60ce53'
                });
                setTimeout(function () {
                  if (localStorage.getItem("currentType") === "esim") {
                    location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                  } else {
                    _this.global_variables.packed_project === 'mifi' ?
                      location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data.return_url
                  }
                }, 1500);
              }//纯钻石支付
            } else if (res.state == "10015") {
              Notify({message: res.msg,})
              setTimeout(function () {
                _this.$router.push({path: '/weixin/card/plan_list'});
              }, 1500);
            } else {
              this.rechargeShow = false;
              Notify({
                message: res.msg
              })
            }
          })
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

    }
  };
</script>

