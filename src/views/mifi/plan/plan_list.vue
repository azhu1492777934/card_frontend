<template>
  <div class="plan-wrap">
    <div ref="refPLanTitle" class="plan-type-wrap">
      <div class="plan-type-inner-wrap">
        <span
          ref="ref_plan_type"
          @click="planTypeClikc(index)"
          v-for="(item,index) in plan_type_name"
          :class="{'active_type':index==cur_plan_type_index}">{{item}}
        </span>
      </div>
    </div>
    <div class="van-swipe-wrap" ref="vanSwiperWwrap">
      <swiper ref="swiperVant" :options="swiperOption">
        <swiper-slide v-for="(item,index) in plan_type" :key="item" :class="item">
          <ul class="plan-list-wrap">
            <li @click="choosePlanClick(inner_index)"
                v-for="(inner_item,inner_index) in plan_list[item]"
                :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
              <div class="plan-info-wrap">
                <p class="plan-name">
                  {{ inner_item.name }}
                </p>
                <p class="plan-limited-wrap">
                                    <span class="limited-num"
                                          v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
                  <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}个ELB</span>
                </p>
                <p class="plan-desc">
                  {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''}}
                </p>
              </div>

              <div class="plan-price-wrap">
                <p>￥{{ inner_item.price }}</p>
                <p>￥{{ inner_item.market_price }}</p>
              </div>

              <img v-if="inner_item.is_recommend" class="recommend"
                   src="../../../assets/imgs/mifi/plan_group/icon_recommend.png" alt=""><!--推荐-->
              <span class="icon-sell-done"
                    v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span><!--售罄-->
            </li>
          </ul>
        </swiper-slide>
      </swiper>
      <div ref="refPlanButton" class="btn-recharge-wrap">
        <button :class="{'noDataHide':JSON.stringify(plan_list) == '{}'}" @click="recharge">前往充值</button>
      </div>
    </div>
    <div v-if="showNoData">
      <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="">
    </div>

  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {Toast, Notify, Dialog} from "vant";
  import {setStorage, getStorage, checkBrowser} from "../../../utilies";
  import {_get} from "../../../http";
  // @ is an alias to /src
  export default {
    name: "home",

    data() {
      const _this = this;
      return {
        showNoData: false,
        plan_group_id: getStorage('plan_group_id'),
        client_type: checkBrowser(),
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
        }
      };
    },
    components: {
      [Dialog.name]: Dialog,
      [Toast.name]: Toast,
      swiper,
      swiperSlide,

    },
    computed: {
      swiper() {
        return this.$refs.swiperVant.swiper
      }
    },
    created() {
      //处理套餐数据
      if (getStorage('check_iccid')) {

        this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
        this.$store.commit('mifiCommon/changeErrStatus', {show: false});

        _get("/api/v1/app/plan_list", {
          iccid: getStorage("check_iccid"),
          // plan_group_id:this.plan_group_id,
        }).then(res => {
          this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
          let refPlanButton = 0;
          if (res.state === 1) {
            if (JSON.stringify(res.data) != '{}') {
              refPlanButton = this.$refs.refPlanButton.offsetHeight;
              this.plan_list = res.data;
              this.processPlsn();
              this.$nextTick(() => {
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                  refPLanTitle = this.$refs.refPLanTitle.offsetHeight;
                // userHeight = getStorage('userHeight');
                this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPLanTitle - refPlanButton) + 'px'
              })
            } else {
              this.showNoData = true;
            }
          } else {
            this.$store.commit('mifiCommon/changeErrStatus', {
              show: true,
              errorMsg: res.msg ? res.msg : '获取数据信息失败，请稍后再试'
            })
          }
        });

      } else {
        this.$router.push('/mifi/card/lookup');
      }
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
        if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
         Toast({
            position: 'top',
            message: "请在微信或支付宝客户端充值"
          })
          return
        }
        try {
          let planInfo = null,
          _this = this,
          cur_date = new Date().getDate(),
          ref_plan_type_index = 0;//当前套餐索引
          for (let i = 0; i < this.$refs.ref_plan_type.length; i++) {
            if (this.$refs.ref_plan_type[i].className === "active_type") {
              if (this.$refs.ref_plan_type[i].innerText === "累计套餐") {
                ref_plan_type_index = 0;
              } else if (this.$refs.ref_plan_type[i].innerText === "月套餐") {
                ref_plan_type_index = 1;
              } else if (this.$refs.ref_plan_type[i].innerText === "加油包") {
                ref_plan_type_index = 2;
              }
              break;
            }
          }

          planInfo = this.plan_list[ref_plan_type_index][this.choose_plan_index];

          if (planInfo.surplus_times <= 0) {
            Toast({
              message: '此套餐已售罄, 请更换套餐',
              position: 'top'
            });
            return;
          }

          planInfo.iccid = getStorage("check_iccid");
          setStorage("planInfo", planInfo, "obj");

          if (planInfo.type == 1 && planInfo.day <= 30 && cur_date >= 20 && cur_date <= 26) {

            Dialog.confirm({
              title: '温馨提示',
              message: '您购买的套餐将在本月26号清零，为避免套餐短期内失效请在充值页手动选择套餐生效时间（范围：本月27号及以后时间）。'
            }).then(() => {
              _this.toRechargeList(planInfo);
            }).catch(() => {
              return
            })

          } else {
            this.toRechargeList(planInfo)
          }
        } catch (err) {
          Toast({
            position: 'top',
            message: err.message
          })
        }
        

      },
      toRechargeList(planInfo) {
        //获取当前包月套餐信息
        _get("/api/v1/app/plans/renew_info", {
          user_id: getStorage("userInfo", "obj").account.user_id,
          rating_id: planInfo.id
        }).then(res => {
          if (res.state === 1) {
            setStorage("monthlyMsg", res.data, "obj");
            this.$router.push({
              path: "/weixin/recharge/index",
              query: {from: 'mifi'},
            });
          } else {
            Notify({message: res.msg});
          }
        });
      },
      processPlsn() {
        for (let i in this.plan_list) {
          if (this.plan_list[i]) {
            this.plan_type.push(i);
            if (i == 0) {
              this.plan_type_name.push("累计套餐");
            }
            if (i == 1) {
              this.plan_type_name.push("月套餐");
              this.isPlanMonth = true;
            }
            if (i == 2) {
              this.plan_type_name.push("加油包");
            }
          }
        }
        if (
          this.plan_type_name.length > 1 &&
          this.plan_type_name[0] != "月套餐"
        ) {
          this.cur_plan_type_index = 1;
          this.swiper.slideTo(1, 500, false);
        }
      }
    }
  };
</script>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";
  @import "../../../assets/less/common";

  html, body, #app {
    height: 100%;
  }

  .plan-wrap {
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
          background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
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
        align-items: center;
        padding: 33px 54px;
        border-bottom: 1px solid #efece6;
        background-size: cover;
        box-sizing: border-box;

        img.recommend {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 92px;
          height: 92px;
        }

        //套餐信息
        .plan-info-wrap {
          flex: 4;
          box-sizing: border-box;
          text-align: left;
          font-size: 24px;

          .plan-name {
            padding: 0 0 30px;
            font-size: 34px;
            color: #2c251d;
            font-weight: 500;
          }

          .plan-icon-recommend {
            padding: 20px 0 20px 60px;
          }

          .icon-recommend {
            position: absolute;
            top: 5px;
            left: 40px;
            font-size: 60px;
          }

          .plan-limited-wrap {
            .limited-num {
              display: inline-block;
              padding: 4px 20px;
              margin: 0 5px 10px 0;
              font-size: 20px;
              color: #ffa400;
              background-color: #fff;
              border-radius: 4px;
              line-height: 1.2;
            }
          }

          .plan-desc {
            max-width: 502px;
            letter-spacing: 1px;
            line-height: 1.3;
            color: #868686;
            font-size: 24px;
            word-break: break-all;
          }
        }

        .plan-price-wrap {
          flex: 1.5;
          text-align: right;

          p {
            &:first-child {
              font-size: 46px;
              color: #fd720d;
            }

            &:last-child {
              font-size: 24px;
              color: #868686;
              text-decoration: line-through;
            }
          }
        }

        //当前选中样式
        &.activedPlan {
          background-image: url("../../../assets/imgs/mifi/plan_group/bg_test.png");

          p {
            color: #533606 !important;
          }

          .plan-price-wrap {
            p {
              &:first-child {
                color: #fd720d !important;
              }
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
      padding: 40px 0;
      height: 80px;

      button {
        &.noDataHide {
          display: none;
        }

        width: 565px;
        height: 80px;
        color: #443f37;
        font-size: 36px;
        border-radius: 80px;
        background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
      }
    }
  }
</style>



