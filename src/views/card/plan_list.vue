<template>
  <div class="plan-wrap">
    <!-- <div ref="refPLanTitle" class="plan-type-wrap"> -->
    <!-- <div class="plan-type-inner-wrap">
                <span
                        ref="ref_plan_type"
                        @click="planTypeClikc(index)"
                        v-for="(item,index) in plan_type_name"
                        :class="{'active_type':index==cur_plan_type_index}">{{item}}
                </span>
    </div>-->
    <!-- </div> -->
    <div class="van-swipe-wrap" ref="vanSwiperWwrap">

      <div v-for="(item,index) in plan_list" v-bind:key="index">
        <div class="planHeader">
          <div></div>
          <div ref="ref_plan_type_new">
            <span v-if="index==0">累计套餐</span>
            <span v-if="index==1">月套餐</span>
            <span v-if="index==2">加油包</span>
            <span v-if="index==5">周期性套餐</span>
          </div>
          <div></div>
        </div>

        <div class="planContent">
            <div
              @click="choosePlanClick(item_inner.id,index)"
              v-for="(item_inner,index_inner) in item"
              v-bind:key="index_inner"
              :class="{'activedPlan':item_inner.id==choose_plan_index,'plan-sell-done':item_inner.surplus_times!='False' && item_inner.surplus_times<=0}"
            >
              <el-popover
                placement="bottom"
                :content="item_inner.describe ? item_inner.describe:item_inner.remark?item_inner.remark:''"
                :value="item_inner.id==choose_plan_index&&firstStatus"
              >
                <div slot="reference">
                  <div class="contentWord1">{{item_inner.name}}</div>
                  <div class="contentWord2"></div>
                  <div class="contentWord3">
                    <p>￥{{ item_inner.price }}</p>
                    <del>￥{{ item_inner.market_price }}</del>
                  </div>
                </div>
              </el-popover>
            </div>
        </div>

      </div>
      <!-- <swiper ref="swiperVant" :options="swiperOption">
                <swiper-slide v-for="(item,index) in plan_type" :key="item" :class="item">
                    <ul class="plan-list-wrap">
                        <li @click="choosePlanClick(inner_index)"
                            v-for="(inner_item,inner_index) in plan_list[item]"
                            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
                            <div class="plan-info-wrap">
                                <p :class="{'plan-icon-recommend':inner_item.is_recommend}" class="plan-name">
                                    <span v-if="inner_item.is_recommend" class="iconfont icon-recommend"></span>
                                    {{ inner_item.name }}
                                </p>
                                <p class="plan-limited-wrap">
                                    <span class="limited-num"
                                          v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
                                    <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}个ELB</span>
                                </p>
                                <p class="plan-desc">
                                    {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''
                                    }}
                                </p>
                            </div>
                            <div class="plan-price-wrap">
                                <p class="plan-price">￥{{ inner_item.price }}</p>
                                <del class="plan-origin-price">￥{{ inner_item.market_price }}</del>
                            </div>
                            <span class="plan-selected"></span>
                            <span class="icon-sell-done"
                                  v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span>
                        </li>
                    </ul>
                </swiper-slide>
      </swiper>-->
    </div>

    <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
      <button @click="recharge">充值</button>
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
    </van-popup>
    <!--创建订单-->
  </div>
</template>

<style lang="less">
@import "~swiper/dist/css/swiper.min.css";
@import "../../assets/less/common";

html,
body,
#app {
  height: 100%;
}
.el-popover {
  font-size: 24px !important;
}
.plan-wrap {
  .van-swipe-wrap {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .planHeader {
    height: 55px;
    background: rgba(255, 251, 243, 1);
    line-height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    > div:nth-child(1) {
      width: 129px;
      height: 8px;
      background: url("../../assets/imgs/card/usage/leftIcon.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 24px;
    }
    > div:nth-child(2) {
      font-size: 30px;
      font-family: SourceHanSansSC-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      background: linear-gradient(
        0deg,
        rgba(241, 165, 60, 1) 0%,
        rgba(255, 198, 65, 1) 91.259765625%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    > div:nth-child(3) {
      width: 129px;
      height: 8px;
      background: url("../../assets/imgs/card/usage/rightIcon.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 24px;
    }
  }

  .planContent {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    align-content: flex-start;
    //  align-items:center;
    //   justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    > div {
      border: 2px solid rgba(230, 230, 230, 1);
      border-radius: 13px;
      padding: 10px;
      margin: 10px;
      box-sizing: border-box;
      flex: 0 0 30%;
      .contentWord1 {
        font-size: 24px;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .contentWord2 {
        width: 60px;
        height: 3px;
        background: rgba(241, 165, 60, 1);
        margin: 10px auto;
      }
      .contentWord3 {
        font-size: 28px;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: #fd720d;
        del {
          color: #868686;
          font-size: 21px;
        }
      }
    }

    //当前选中样式
    .activedPlan {
      position: relative;
      // border: 2PX solid #dca85f;
      border-color: #dca85f;
      box-shadow: 0 0 30px 0 #eae9e9;
      .plan-name {
        color: #fd720d;
      }
    }
    .activedPlan::after {
      content: "";
      position: absolute;
      width: 21px;
      height: 21px;
      right: -2px;
      bottom: 0;
      background: url("../../assets/imgs/card/usage/right.png") no-repeat;
      background-size: 100% 100%;
    }
    //售罄状态
    .plan-sell-done {
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
  .swiper-container {
    height: 100%;
  }
  .plan-type-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    .plan-type-inner-wrap {
      border: 1px solid #dca85f;
      border-radius: 46px;
      width: 90%;
      display: flex;
    }
    span {
      display: inline-block;
      height: 46px;
      flex: 1;
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
      border: 1px solid #e6e6e6;
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
        }
      }

      //当前选中样式
      &.activedPlan {
        border: 1px solid #dca85f;
        box-shadow: 0 0 30px 0 #eae9e9;
        .plan-name {
          color: #fd720d;
        }
        .selected-plan {
          position: absolute;
          right: 0;
          bottom: 0;
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
    padding: 40px 32px;
    &.noDataHide {
      display: none;
    }
    button {
      display: block;
      width: 100%;
      padding: 20px 0;
      font-size: 36px;
      color: #000;
      background:linear-gradient(-33deg,rgba(253,212,122,1),rgba(240,181,70,1));
        border-radius:40px;
    }
  }
}
</style>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Toast, Popup, Notify, List } from "vant";
import { setStorage, getStorage, checkBrowser, lossRate } from "../../utilies";
import { _get, _post } from "../../http";
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
      ref_plan_type_new: null,
      swiperOption: {
        on: {
          slideChangeTransitionEnd: function(swiper) {
            _this.cur_plan_type_index = this.activeIndex;
          }
        }
      },
      rechargeShow: false,
      ref_plan_type_index: 0,
      firstStatus: false
    };
  },
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [List.name]: List,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.swiperVant.swiper;
    }
  },
  created() {
    lossRate({
      type: 2,
      iccid: getStorage("check_iccid")
    }); // 流失率统计
    let _this = this;
    //处理套餐数据
    _get("/api/v1/app/plan_list", {
      iccid: getStorage("check_iccid")
    }).then(res => {
      if (res.state == 1) {
        if (JSON.stringify(res.data) == "{}") {
          this.load_plan_list = true;
          this.load_plan_msg = "此卡暂无套餐";
          return;
        }

        this.load_plan_msg = res.msg;

        this.load_plan_list = false;
        this.plan_list = res.data;
        this.choose_plan_index = res.data[0][0].id;
        // for (let i in this.plan_list) {
        //     if (this.plan_list[i]) {
        //         this.plan_type.push(i);
        //         if (i == 0) {
        //             this.plan_type_name.push("累计套餐");
        //         }
        //         if (i == 1) {
        //             this.plan_type_name.push("月套餐");
        //             this.isPlanMonth = true;
        //         }
        //         if (i == 2) {
        //             this.plan_type_name.push("加油包");
        //         }
        //         if(i==5){
        //             this.plan_type_name.push("周期性套餐");
        //         }
        //     }
        // }
        // if (
        //     this.plan_type_name.length > 1 &&
        //     this.plan_type_name[0] != "月套餐"
        // ) {
        //     this.cur_plan_type_index = 1;
        //     this.swiper.slideTo(1, 500, false);
        // }

        this.$nextTick(() => {
          let clientHeight =
              document.documentElement.clientHeight ||
              document.body.clientHeight,
            // refPLanTitle = this.$refs.refPLanTitle.offsetHeight,
            refPlanButton = this.$refs.refPlanButton.offsetHeight,
            userHeight = getStorage("userHeight") || 44;
          if (this.client_type == "wechat" || this.client_type == "alipay") {
            this.$refs.vanSwiperWwrap.style.height =
              clientHeight - refPlanButton - userHeight + "px";
          } else {
            this.$refs.vanSwiperWwrap.style.height =
              clientHeight - refPlanButton + "px";
          }
        });

        //防止第一次加载气泡提示框显示错误的问题
        setTimeout(function() {
          _this.firstStatus = true;
        }, 100);
      } else {
        this.load_plan_list = true;
        this.load_plan_msg = res.msg;
      }
    });
  },
  mounted() {},
  methods: {
    // swiperOnChange: function (index) {
    //     this.cur_plan_type_index = index;
    //     this.choose_plan_index = 0;
    // },
    // planTypeClikc: function (index) {
    //     this.cur_plan_type_index = index;
    //     this.choose_plan_index = 0;
    //     this.swiper.slideTo(index);
    // },
    choosePlanClick: function(id, index) {
      this.ref_plan_type_index = index;
      this.choose_plan_index = id;
    },
    recharge: function() {
      let planInfo = null;
      // for (let i = 0; i < this.$refs.ref_plan_type_new.length; i++) {
      //     if (this.$refs.ref_plan_type_new[i].className == "active_type") {
      //         if (this.$refs.ref_plan_type_new[i].innerText == "累计套餐") {
      //             ref_plan_type_index = 0;
      //         } else if (this.$refs.ref_plan_type_new[i].innerText == "月套餐") {
      //             ref_plan_type_index = 1;
      //         } else if (this.$refs.ref_plan_type_new[i].innerText == "加油包") {
      //             ref_plan_type_index = 2;
      //         }else if(this.$refs.ref_plan_type_new[i].innerText == "周期性套餐"){
      //             ref_plan_type_index = 5;

      //         }
      //         break;
      //     }
      // }
      for (
        let i = 0;
        i < this.plan_list[this.ref_plan_type_index].length;
        i++
      ) {
        if (
          this.choose_plan_index ==
          this.plan_list[this.ref_plan_type_index][i].id
        ) {
          planInfo = this.plan_list[this.ref_plan_type_index][i];
        }
      }
      // planInfo = this.plan_list[ref_plan_type_index][this.choose_plan_index];
      if (planInfo.surplus_times <= 0) {
        Toast("此套餐已售罄, 请更换套餐");
        return;
      }

      planInfo.iccid = getStorage("check_iccid");

      setStorage("planInfo", planInfo, "obj");

      if (getStorage("isCardPool")) {
        this.directRecharge(planInfo);
      } else {
        //获取当前包月套餐信息
        _get("/api/v1/app/plans/renew_info", {
          user_id: getStorage("userInfo", "obj").account.user_id,
          rating_id: planInfo.id
        }).then(res => {
          if (res.state == 1) {
            setStorage("monthlyMsg", res.data, "obj");
            this.$router.push({ path: "/weixin/recharge/index" });
          } else {
            Notify({ message: res.msg });
          }
        });
      }
      // if (this.client_type != 'alipay' && this.client_type != 'wechat') {
      //     Notify({message: '请在微信或支付宝客服端打开充值'});
      //     return
      // }
    },
    //直接充值
    directRecharge(planInfo) {
      if (this.client_type != "alipay" && this.client_type != "wechat") {
        Notify({ message: "请在微信或支付宝客户端充值" });
        return;
      }

      let param = {},
        _this = this;
      param.status = 0;
      param.recharge_price = planInfo.price;
      param.price = planInfo.price;

      if (this.client_type == "alipay" || this.client_type == "wechat") {
        param.open_id = getStorage("decrypt_data", "obj").openid;
      } else if (this.client_type == "app") {
        param.open_id = getStorage("userInfo", "obj").account.user_id;
      }
      param.iccid = planInfo.iccid || getStorage("check_iccid");
      param.rating_id = planInfo.id;

      param.user_id = getStorage("userInfo", "obj").account.user_id;
      param.env = this.client_type;

      if (this.client_type == "app") {
        if (this.appPay.type) {
          param.pay_type = "WEIXIN";
        } else {
          param.pay_type = "ALIPAY";
        }
      } else if (this.client_type == "wechat") {
        param.pay_type = "WEIXIN";
      } else if (this.client_type == "alipay") {
        param.pay_type = "ALIPAY";
      }

      param.start_time = this.getToday();

      param.type = 0;

      this.rechargeShow = true;
      _post("/api/v1/pay/weixin/create", param).then(res => {
        if (res.state == 1) {
          this.rechargeShow = false;

          if (/<[^>]+>/.test(res.data)) {
            document.write(res.data);
          } else if (
            res.data &&
            Object.prototype.toString.call(res.data) == "[object String]" &&
            res.data.substr(0, 4) == "http"
          ) {
            //app
            this.global_variables.packed_project === "mifi"
              ? (location.href = `${
                  this.global_variables.authorized_redirect_url
                }/mifi/card/index`)
              : (location.href = res.data);
          } else {
            Notify({
              message: "充值成功",
              background: "#60ce53"
            });

            setTimeout(function() {
              if (localStorage.getItem("currentType") == "esim") {
                location.href = `${
                  _this.global_variables.authorized_redirect_url
                }/weixin/card/esim_usage`;
              } else {
                _this.global_variables.packed_project === "mifi"
                  ? (location.href = `${
                      _this.global_variables.authorized_redirect_url
                    }/mifi/card/index`)
                  : (location.href = res.data.return_url);
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
    getToday: function(val) {
      let date = new Date();
      if (val) {
        date = new Date(val);
      }
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    }
  }
};
</script>

