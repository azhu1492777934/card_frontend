<template>
  <div class="plan-usage-wrap">
    <!--    <transition name="slide-fade">-->
    <div v-show="!load_skeleton">
      <div ref="refCardInfo" class="card-info-wrap">
        <div class="operation-logo-wrap">
          <img :src="filterCardInfo.operator_logo" alt="">
        </div>
        <div class="card-info-detail">
          <p v-if="filterCardInfo.is_watch_card">手表手机号:{{filterCardInfo.msisdn}}</p>
          <p v-else>MSISDN:{{filterCardInfo.msisdn}}</p>
          <p :class="{ 'p-t-45' : (!usageInfo.imei || usageInfo.imei=='864319031839011')}">
            ICCID:{{usageInfo.iccid}}(编码:{{usageInfo.source}})</p>
          <p v-if="usageInfo.imei && usageInfo.imei!='864319031839011'">IMEI:{{usageInfo.imei}}</p>
          <div class="card-state-wrap">
            <div class="card-state1">
              <span :class="usageInfo.auth_status>=3?'cl-state-normal':'cl-state-warning'">{{filterCardInfo.real_name_state}}</span>
              <span v-if="filterCardInfo.device_state==''"
                    :class="usageInfo.status!=1?'cl-state-warning':'cl-state-primary'">{{filterCardInfo.card_str_state}}</span>
              <span :class="filterCardInfo.device_state.code==1?'cl-state-primary':'cl-state-warning'"
                    v-if="filterCardInfo.device_state!=''">{{filterCardInfo.device_state.state}}</span>
            </div>
            <div class="card-state2">
              <em @click="refreshOrActivated">{{filterCardInfo.refresh_actived}}</em>
              <a @click="toQ()">问题中心</a>
            </div>
            <div class="card-state3" v-if="sourceWhiteLists.includes(this.sourceWhite)">
              <a @click="withePhone()">白名单</a>
            </div>
          </div>
        </div>
      </div>
      <div ref="refCardData">
        <div v-if="filterCardInfo.is_flow_card" class="card-used-wrap">
          <p class="card-surplus-flow">
            <span>剩余流量</span>
            <span>{{this.filterCardInfo.flow_card_usage.detail_right}}</span>
          </p>
          <div class="card-flow-detail">
            <div class="card-used-data-wrap">
              <p>
                <span>总流量:{{this.filterCardInfo.flow_card_usage.total_flow}} / </span>
                <span>已使用:{{this.filterCardInfo.flow_card_usage.used_flow}}</span>
              </p>
            </div>
            <!-- <div @click="toConnection" class="to-flow-wrap">
              <a> 流量用量详情> </a>
            </div> -->
          </div>
        </div>
        <div v-else class="card-used-wrap">
          <p class="card-surplus-flow">
            <span>剩余流量</span>
            <span>{{this.filterCardInfo.watch_card_usage.detail_right}}</span>
          </p>
          <div class="card-flow-detail">
            <div class="card-used-data-wrap">
              <p>
                <span>总流量:{{this.filterCardInfo.watch_card_usage.total_flow}} / </span>
                <span>已使用:{{this.filterCardInfo.watch_card_usage.used_flow}}</span>
              </p>
              <p>
                <span>总通话:{{this.filterCardInfo.watch_card_usage.total_voice}} / </span>
                <span>已使用:{{this.filterCardInfo.watch_card_usage.used_voice}}</span>
              </p>
            </div>
            <!-- <div @click="toConnection" class="to-flow-wrap watch-card__to-flow-wrapper">
              <a> 流量用量详情> </a>
            </div> -->
          </div>
        </div>
      </div>
      <div class="card-plan-wrap">
        <p ref="refPlanTitle" class="card-plan-wrap-title">
          <span
            @click="planTypeClikc(index)"
            v-for="(item,index) in plan_title_array"
            :class="{'checked':index==cur_plan_type_index}" v-bind:key="index">
            {{item}}
          </span>
        </p>
        <div
          class="van-swipe-wrap"
          :class="{
            'plan-no-user__height':plan_list_height.is_normal,
            'plan-has-user__height':plan_list_height.is_c_frontend,
            'plan-app__height':plan_list_height.is_app
            }"
        >
          <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide>
              <ul v-if="hasUsagePlan" class="usage-plan-wrap">
                <li v-for="(item,index) in usageInfo.usage.plans" v-bind:key="index">
                  <div class="plan-info-wrap">
                    <p class="plan-name">{{item.rps_name}}</p>
                    <div class="plan-describe">
                      <!--/*套餐描述-->
                      <!-- <div v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
                        <div v-if="item.planCellInfo.key!='MG500'">
                          <p v-if="item.describe && item.describe!='None'">
                            <span>{{item.describe}}</span><br/>
                            <span class="">{{item.remark}}</span>
                          </p>
                          <p v-else>
                            <span>{{item.remark}}</span>
                          </p>
                        </div>
                        <span v-if="item.planCellInfo.max_high">高速流量:{{item.planCellInfo.max_high}},已使用{{item.planCellInfo.used_high}}</span><br>
                        <span v-if="item.planCellInfo.max_normal">中速流量:{{item.planCellInfo.max_normal}}</span>
                      </div> -->
                      <div>
                        <p v-if="item.describe && item.describe!='None'">
                          <span>{{item.describe}}</span><br/>
                          <span>{{item.remark}}</span>
                        </p>
                        <p v-else>
                          <span>{{item.remark}}</span>
                        </p>
                      </div>
                      <!--\*套餐描述-->
                    </div>
                  </div>
                  <div class="plan-date-wrap">
                    <p class="plan-date"
                       v-if="(filterCardInfo.is_watch_card||inArray(usageInfo.source,[1,7,8])>=0)">
                      <span>开始日期:{{filterDate(item.activated_at)}}</span><br>
                      <span>有效日期:{{filterDate(item.expired_at)}}</span>
                    </p><!--手表卡-->
                    <p class="plan-date" v-else-if="item.expired_at">
                      <span>有效日期:{{filterDate(item.expired_at)}}</span>
                    </p><!--流量卡-->
                    <div class="speedup-wrap" v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
		                                    <span v-if="item.planCellInfo.key!='MG500'">
		                                        <a v-if="item.planCellInfo.plan_cell_status==1"
                                               href="/weixin/speedup/plan_80">购买加速包</a>
		                                    </span>
                      <span v-else>
		                                        <a v-if="item.planCellInfo.plan_cell_status==1"
                                               href="/weixin/speedup/plan_500">购买加速包</a>
		                                    </span>
                    </div>

                    <div class="prefer_use" v-if="usagePlanLength > 1 && filterCardInfo.is_flow_card">
                      <a
                        @click="prefer_use_operate(usageInfo.iccid,item.id,item.priority,usageInfo.source,item.order_id)"
                        v-if="item.priority >= 1">优先使用</a>
                      <a
                        @click="prefer_use_operate(usageInfo.iccid,item.id,item.priority,usageInfo.source,item.order_id)"
                        v-if="item.priority == 0">取消优先</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="no-plan">
                <img src="../../assets/imgs/card/usage/bg_no_plan.svg" alt="">
              </div>
            </swiper-slide>

            <swiper-slide>
              <ul v-if="hasOrderPlan" class="order-plan-wrap">
                <li v-for="(item,index) in usageInfo.orders" v-bind:key="index">
                  <div class="plan-info-wrap">
                    <p class="plan-name">{{item.name}}</p>
                    <p class="plan-describe" v-if="item.rating_id==2522">
                      <span>月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。</span>
                    </p>
                    <p class="plan-describe" v-else>
                      <span
                        v-if="item.describe && item.describe!='None'&&item.describe!=''">{{item.describe}}</span><br/>
                      <span v-if="!item.describe || item.describe==''||item.describe=='None'"
                            class="">{{item.remark}}</span>
                    </p>
                    <p class="plan-orderNo">订单号:{{item.no}}</p>
                  </div>

                  <div class="plan-date-wrap">
                    <p class="plan-date">
                      <span>续费日期:{{filterDate(item.created_at)}}</span>
                    </p>
                    <p class="plan-order-status-wrap">
                      <span v-if="(item.order_type==0 || item.order_type==4)&&item.refund!=2" @click="toInvoice(item)" class="plan-order-status-blue">发票申请</span>
                      <span v-if="item.refund==2" class="plan-order-status-green">已退款</span>
                      <span v-if="item.refund!=2&&item.status!=-1" class="plan-order-status-green">{{order_state[item.status]}}</span>
                      <span v-if="item.refund!=2&&item.status==-1" class="plan-order-status-green">已删除</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div v-else class="no-plan">
                <img src="../../assets/imgs/card/usage/bg_no_recharge.svg" alt="">
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div ref="refCardButton" class="btn-recharge-wrap">
        <button @click="recharge">充值续费</button>
        <a @click="toCard()">卡券兑换</a>
      </div>
    </div>

    <div v-show="load_skeleton" class="fixed-wrap-loading">
      <div id="loading-common-center">
        <div id="loading-common-center-inner">
          <div class="loading-object" id="first_object"></div>
          <div class="loading-object" id="second_object"></div>
          <div class="loading-object" id="third_object"></div>
        </div>
      </div>
    </div>

    <van-popup
      v-model="priorityShow"
      :close-on-click-overlay="false"
    >
      <van-loading
        size="50px"
        vertical
        color="#1989fa"
      >
        加载中...
      </van-loading>
    </van-popup>

    <!-- <transition name="bounce">
      <MiGu
        :show-mi-gu-model="showMiGuModel"
        :show-btn-buy="true"
        :show-btn-no-tip="true"
      />
    </transition> -->
  </div>
</template>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";

  html {
    background-color: #fbfafa;
  }

  .p-t-45 {
    padding-bottom: 45px !important;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .plan-usage-wrap {
    .cl-state-warning {
      color: #F7532B !important;
      border-color: #F7532B !important;
    }

    .cl-state-normal {
      color: #3bce9e !important;
      border-color: #3bce9e !important;
    }

    .cl-state-primary {
      color: #38b5ed !important;
      border-color: #38b5ed !important;
    }

    .card-info-wrap {
      display: flex;
      height: 190px;
      padding: 15px;
      box-sizing: border-box;

      .operation-logo-wrap {
        margin-right: 15px;

        img {
          width: 160px;
          height: 160px;;
        }
      }

      .card-info-detail {
        text-align: left;

        > p {
          padding-bottom: 10px;

          &:first-child {
            font-size: 36px;
            color: #31b3ef;
          }

          font-size: 24px;
          color: #017ef9;
        }

        .card-state-wrap {
          display: flex;
          align-items: center;
          .card-state1 {
            flex: none!important;
          }
          .card-state2 {
            text-align: right;
            margin-left: 12px;
          }
          .card-state3 {
            text-align: right;
            margin-left: 12px!important;
          }

          span {
            font-size: 12PX !important;
          }

          span, em, a {
            display: inline-block;
            margin-right: 12px;
            padding: 0 10px;
            height: 36px;
            line-height: 36px;
            font-size: 22px;
            border: 1PX solid #3bce9e;
            color: #3bce9e;
            border-radius: 6px;
            -webkit-text-size-adjust: none;

            &:last-child {
              margin-right: 0;
            }
          }

          em {
            font-style: normal;
            color: #fff;
            border: 1PX solid #38b5ed;
            background-color: #38b5ed;
          }

          a {
            padding: 0 10px;
            font-style: normal;
            color: #fff;
            border: 1PX solid #ffb73a;
            background-color: #ffb73a;
          }
        }

      }
    }

    .card-used-wrap {
      height: 200px;
      padding: 25px;
      font-size: 26px;
      color: #fff;
      font-weight: 500;
      background-image: linear-gradient(167deg, #00d2ff 0%, #3a7bd5 100%);
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
      box-sizing: border-box;

      .card-surplus-flow {
        display: flex;
        align-items: center;

        span {
          flex: 1;

          &:first-child {
            text-align: left;
          }

          &:last-child {
            font-size: 52px;
            text-align: right;
          }
        }
      }

      .card-flow-detail {
        position: relative;
        display: flex;
        align-items: center;

        > div {
          flex: 1;
        }

        .card-used-data-wrap {
          flex: 2;
          text-align: left;
          padding-top: 20px;

          p {
            padding-bottom: 15px;
          }
        }

        .to-flow-wrap {
          position: absolute;
          right: 0;
          bottom: -15px;
          text-align: right;

          a {
            display: inline-block;
            padding: 25px 30px;
            background-color: rgba(0, 0, 0, 0.1);
          }
        }

        .watch-card__to-flow-wrapper {
          bottom: 10px;
        }

      }
    }

    .card-plan-wrap {
      .no-plan {
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }

      .card-plan-wrap-title {
        display: flex;
        height: 86px;

        span {
          display: inline-block;
          flex: 1;
          padding: 30px 25px;
          font-size: 26px;
          color: #afafaf;

          &:first-child {
            text-align: left;
          }

          &:last-child {
            text-align: right;
          }

          &.checked {
            color: #31b3ef;
          }

        }
      }

      .van-swipe-wrap {
        width: 100%;
        padding: 0 25px;
        box-sizing: border-box;

        .swiper-container {
          height: 100%;
          background-color: #fff;
          border-radius: 8px;
        }
      }

      .usage-plan-wrap li .plan-date-wrap .prefer_use a {
        position: relative;
        display: inline-block;
        margin-top: .2rem;
        padding: .17333rem 0;
        width: 2rem;
        border-radius: .08rem;
        color: #fff;
        background-image: linear-gradient(167deg, #00d2ff, #3a7bd5);
        text-align: center;
        z-index: 99;
      }

      .usage-plan-wrap, .order-plan-wrap {
        width: 100%;
        height: 100%;
        overflow-y: auto;

        li {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1PX solid #dedede;

          &:last-child {
            border-bottom: none;
          }

          .plan-info-wrap {
            flex: 3.5;
            text-align: left;

            .plan-name {
              padding: 20px 0;
              font-size: 36px;
              color: #1c1c1c;
            }

            .plan-describe {
              min-height: 40px;
              font-size: 24px;
              color: #9fa4af;
            }
          }

          .plan-date-wrap {
            position: relative;
            text-align: right;

            .plan-date {
              padding: 20px 0;
              font-size: 24px;
              color: #31b3ef;

            }
            .plan-order-status-wrap {
              .plan-order-status-blue {
                margin: 0 5px 0 0;
                display: inline-block;
                padding: 0 10px;
                height: 36px;
                line-height: 36px;
                border: 1PX solid #38b5ed;
                color: #38b5ed;
              }

              .plan-order-status-green {
                margin: 0 0 5px 0;
                display: inline-block;
                padding: 0 10px;
                height: 36px;
                line-height: 36px;
                border: 1PX solid #3bce9e;
                color: #3bce9e;
              }
            }  

            .speedup-wrap {
              a {
                display: inline-block;
                margin-top: .2rem;
                padding: .17333rem 0;
                width: 2rem;
                border-radius: .08rem;
                color: #fff;
                background-image: linear-gradient(167deg, #00d2ff, #3a7bd5);
                text-align: center;
              }
            }

          }
        }
      }

      .order-plan-wrap {
        li {
          .plan-order-status-wrap {
            padding-top: 40px;

            .plan-order-status-blue {
              margin: 0 5px 0 0;
              display: inline-block;
              padding: 0 10px;
              height: 36px;
              line-height: 36px;
              border: 1PX solid #38b5ed;
              color: #38b5ed;
            }

            .plan-order-status-green {
              margin: 0 0 5px 0;
              display: inline-block;
              padding: 0 10px;
              height: 36px;
              line-height: 36px;
              border: 1PX solid #3bce9e;
              color: #3bce9e;
            }

          }

          .plan-orderNo {
            padding-top: 15px;
            font-size: 24px;
            color: #9fa4af;
          }
        }

      }

    }

    .btn-recharge-wrap {
      position: relative;
      height: 140px;
      padding: 30px 0;
      box-sizing: border-box;

      button {
        display: inline-block;
        width: 430px;
        height: 80px;
        font-size: 28px;
        color: #fff;
        background: #38b5ed;
        border-radius: 80px;
      }

      a {
        position: absolute;
        right: 30px;
        bottom: 60px;
        color: #38b5ed;
        font-size: 28px;
      }
    }

    .plan-no-user__height {
      height: calc(~ '100vh - 190px - 200px - 86px - 140px');
    }

    .plan-has-user__height {
      height: calc(~ '100vh - 60px - 190px - 200px - 86px - 180px');
    }

    .plan-app__height {
      height: calc(~ '100vh - 60px - 190px - 200px - 86px - 160px - 49px');
    }

  }
</style>

<script>
  // @ is an alias to /src
  import {mapState} from 'vuex'
  import MiGu from '../../components/activity/migu';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {Notify, Popup, Toast, Loading, Dialog} from 'vant';
  import {getStorage, setStorage, toDecimal, checkBrowser, isMobile, removeStorage, appRate} from "../../utilies";
  import {_post, _get} from "../../http";

  export default {
    name: "home",
    data() {
      const _this = this;
      return {
        client_type: checkBrowser(),
        iccid: '',
        load_skeleton: true,
        // load_plan: false,
        load_plan_msg: '',
        watch_source: [5, 10, 12, 17, 18, 20, 22, 32, 38, 44, 52, 55], //手表卡的卡源
        auth_status: ['未实名', '审核中', '审核不通过'],
        card_state: ["未激活", "已激活", "已停机", "已废弃", "可测试", "可激活"],
        order_state: ['未支付', '已支付', '已到账'],
        plan_title_array: ['当前套餐', '历史续费套餐'],
        cur_plan_type_index: 0,//swiper 索引
        filterCardInfo: {
          operator_logo: '',//运营商icon
          msisdn: '',
          device_state: '',//机卡状态
          card_str_state: '',//卡状态
          real_name_state: '',//实名状态
          refresh_actived: '',//刷新卡状态/激活
          is_watch_card: false,//手表卡
          is_flow_card: false,//流量卡
          watch_card_usage: {
            'total_flow': '',//总流量
            'used_flow': '',//流量用量
            'total_voice': '',//总通话
            'used_voice': '',//流量通话
            'detail_right': ''//右侧详情
          },//手表卡
          flow_card_usage: {
            'total_flow': '',//总流量
            'used_flow': '',//流量用量
            'detail_right': ''//右侧详情
          }//流量卡
        },
        hasUsagePlan: false,
        usagePlanLength: 0,
        hasOrderPlan: false,
        usageInfo: {},
        priorityShow: false,
        showMiGuModel: false,
        swiperOption: {
          on: {
            slideChangeTransitionEnd: function (swiper) {
              _this.cur_plan_type_index = this.activeIndex
            }
          }
        },
        // 订单高度
        plan_list_height: {
          is_app: false,
          is_c_frontend: true,
          is_normal: false,
        },
        msisdn: null,
        sourceWhite: getStorage('source'),
        sourceWhiteLists: ['38','63']
      }
    },
    components: {
      [Notify.name]: Notify,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      [Loading.name]: Loading,
      MiGu,
      swiper,
      swiperSlide
    },
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    created() {
      removeStorage('hasValidatedPlan');
      removeStorage('plan_list_new_card');
      this.initial();
    },
    mounted() {
    },
    methods: {
      initial() {
        // 限时活动
        // this.showMiGu(this.authorizedUserInfo.mobile);

        if (getStorage('check_iccid')) {
          this.iccid = getStorage('check_iccid');
          _get('/api/v1/app/cards/telcom/usage', {
            iccid: getStorage('check_iccid'),
          }).then(res => {
            this.load_skeleton = false;
            this.priorityShow = false;
            if (res.state === 1) {
              this.usageInfo = res.data;

              if (this.usageInfo.operator === 0) {
                this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/unicom-logo.svg')
              } else if (this.usageInfo.operator === 1) {
                this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/mobile-logo.png')
              } else {
                this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/telecom-logo.svg')
              }

              if (getStorage('is_watch_card') && this.usageInfo.source !== 19) {
                if (this.usageInfo.msisdn.substr(0, 2) === '86') {
                  this.filterCardInfo.msisdn = this.usageInfo.msisdn.substr(2, this.usageInfo.msisdn.length);
                } else {
                  this.filterCardInfo.msisdn = this.usageInfo.msisdn
                }
              } else {
                this.filterCardInfo.msisdn = this.usageInfo.msisdn
              }//判断MSISDN


              if (this.inArray(this.usageInfo.source, [1, 4]) >= 0) {
                this.auth_status.push('手淘实名');
              } else {
                this.auth_status.push('已实名');
              }//实名增加状态

              if (!this.usageInfo.need_auth) {
                this.filterCardInfo.real_name_state = '已实名';
              } else {
                this.filterCardInfo.real_name_state = this.auth_status[this.usageInfo.auth_status];//实名状态
              }

              this.filterCardInfo.real_name_state = this.auth_status[this.usageInfo.auth_status];//实名状态

              if (this.inArray(this.usageInfo.source, [0, 2]) >= 0) {
                //判断是否可以点击
              }

              if (this.inArray(this.usageInfo.source, [1, 5]) >= 0 && this.usageInfo.imei) {
                if (!this.usageInfo.usage.imei || !this.usageInfo.fenli) {
                  this.filterCardInfo.device_state = {state: '机卡已绑定', code: 1}
                } else {
                  if (this.usageInfo.status === 2) {
                    this.filterCardInfo.device_state = {state: '机卡已分离停机', code: 2}
                  } else {
                    this.filterCardInfo.device_state = {state: '机卡分离', code: 2}
                  }
                }
              }//机卡状态

              this.filterCardInfo.card_str_state = this.card_state[this.usageInfo.status];//卡状态


              if (this.usageInfo.status === 2) {
                this.filterCardInfo.refresh_actived = '激活'
              } else {
                this.filterCardInfo.refresh_actived = '刷新'
              }


              if (getStorage('is_watch_card')) {
                this.filterCardInfo.is_watch_card = true;
                this.filterCardInfo.is_flow_card = false;

                if (this.usageInfo.usage.noMax === 1) {
                  this.filterCardInfo.watch_card_usage.total_flow = '无限';
                  this.filterCardInfo.watch_card_usage.detail_right = '无限'//右侧详情

                } else {
                  this.filterCardInfo.watch_card_usage.total_flow = this.flowUnit(this.usageInfo.usage.total, 0, 1)  //总用量
                  this.filterCardInfo.watch_card_usage.detail_right =
                    this.flowUnit(0, {
                      watchCard: true,
                      total: this.usageInfo.usage.total,
                      used: this.usageInfo.usage.used
                    }, 0)//右侧详情
                }

                this.filterCardInfo.watch_card_usage.used_flow = this.flowUnit(this.usageInfo.usage.used, 0, 0) //已使用流量

                if (this.usageInfo.usage.noMaxVoice === 1) {
                  this.filterCardInfo.watch_card_usage.total_voice = '无限'

                } else {
                  this.filterCardInfo.watch_card_usage.total_voice = toDecimal(this.usageInfo.usage.totalVoice) + '分钟'
                }

                this.filterCardInfo.watch_card_usage.used_voice = toDecimal(this.usageInfo.usage.usedVoice) + '分钟' //已使用通话
                localStorage.setItem("is_flow_card", 0);
                //手表卡用量
              } else {

                this.filterCardInfo.is_watch_card = false;
                this.filterCardInfo.is_flow_card = true;

                if (this.usageInfo.source === 6 || this.usageInfo.usage.noMax === 1) {
                  this.filterCardInfo.flow_card_usage.total_flow = '无限';
                  this.filterCardInfo.flow_card_usage.detail_right = '无限';
                }

                if (this.usageInfo.source !== 6 && this.usageInfo.usage.noMax !== 1) {
                  this.filterCardInfo.flow_card_usage.total_flow = this.flowUnit(this.usageInfo.usage.total, 0, 1);
                  this.filterCardInfo.flow_card_usage.detail_right =
                    this.flowUnit(0, {
                      flowCard: true,
                      total: this.usageInfo.usage.total,
                      used: this.usageInfo.usage.used
                    }, 0)
                }

                this.filterCardInfo.flow_card_usage.used_flow = this.flowUnit(this.usageInfo.usage.used, 0, 0);
                localStorage.setItem("is_flow_card", 1);
              }//流量卡

              // 是否显示套餐
              this.hasUsagePlan = !!this.usageInfo.usage.plans.length;
              this.usagePlanLength = this.usageInfo.usage.plans.length;
              this.hasOrderPlan = !!this.usageInfo.orders.length;

              if (this.global_variables.device === 'iphone' && this.client_type === "app") {
                this.plan_list_height.is_app = true;
              } else {
                this.plan_list_height.is_app = false;
                if (this.client_type === "wechat" || this.client_type === "alipay") {
                  this.plan_list_height.is_c_frontend = true;
                } else {
                  this.plan_list_height.is_c_frontend = false;
                  this.plan_list_height.is_normal = true;
                }
              }

              //显示白名单弹窗
              if (this.sourceWhiteLists.includes(this.sourceWhite)) {
                this.witheOnLoad(this.filterCardInfo.msisdn)
              }
              
            } else {
              Toast({
                icon: 'warning-o',
                message: res.msg,
                mask: true,
                duration: 0,
                forbidClick: true,
              })
            }
          })
        } else {
          this.$router.push({path: '/weixin/card/lookup'})
        }
      },
      planTypeClikc(index) {
        this.cur_plan_type_index = index;
        this.$refs.mySwiper.swiper.slideTo(index);
      },
      recharge() {
        let _this = this;
        if (this.usageInfo.source === 23) {
          if (this.usageInfo.activated_date !== "") {
            let time = this.dateDiff(this.usageInfo.activated_date, this.usageInfo.current_time);
            if (time > 360) {
              Dialog.confirm({
                title: '提示',
                message: '您的物联网卡已到期,无法继续充值,请更换卡',
                confirmButtonText: "去换卡",
                cancelButtonText: "取消",
              }).then(() => {
                // on confirm
                _this.$router.push({name: 'eqReplaceMent', params: {status: 1}});
                localStorage.setItem("replaceStatus", 1)
              }).catch(() => {
                // on cancel
                return false;
              });
              return false;
            } else if (360 - time <= 30) {
              let overplus = (360 - time).toFixed(0);
              Dialog.confirm({
                title: '提示',
                message: '您的物联网卡还有' + overplus + '天到期,到期后无法继续充值使用,请更换卡',
                confirmButtonText: "去换卡",
                cancelButtonText: "取消",
              }).then(() => {
                // on confirm
                _this.$router.push({name: 'eqReplaceMent', params: {status: 1}});
                localStorage.setItem("replaceStatus", 1)
              }).catch(() => {
                // on cancel
                return false;
              });
              return false;
            } else {
              setStorage('check_iccid', this.iccid);
              if (this.hasUsagePlan) setStorage('hasValidatedPlan', this.hasUsagePlan);
              appRate(2);
              this.$router.push({path: '/weixin/card/plan_list'})
            }
          } else {
            setStorage('check_iccid', this.iccid);
            if (this.hasUsagePlan) setStorage('hasValidatedPlan', this.hasUsagePlan);
            appRate(2);
            this.$router.push({path: '/weixin/card/plan_list'})
          }
        } else {
          setStorage('check_iccid', this.iccid);
          if (this.hasUsagePlan) setStorage('hasValidatedPlan', this.hasUsagePlan);
          appRate(2);
          this.$router.push({path: '/weixin/card/plan_list'})
        }
      },
      refreshOrActivated() {
        if (this.filterCardInfo.refresh_actived === '刷新') {
          appRate(8);
          location.reload()
        } else {
          if (!this.usageInfo.canActivated) {
            Notify({
              message: '无效套餐,无法激活',
              background: '#ff0752'
            })
            return
          }
          if (this.usageInfo.usage.used >= this.usageInfo.usage.total && this.usageInfo.usage.total > 0) {
            Notify({
              message: '流量已用完,不能激活,请充值',
              background: '#ff0752'
            });
            return
          }
          _post('/api/v1/app/activated', {iccid: this.iccid})
            .then(res => {
              if (res.state === 1) {
                Notify({
                  message: '请在5分钟内放回原绑定的设备中开机,否则会被停机',
                  background: '#00c2ff'
                })
              }
            })
        }
      },
      toConnection() {
        appRate(13);
        setStorage('check_iccid', this.iccid);
        this.$router.push({path: '/weixin/card/connection'});
      },
      inArray: function (elem, arr, i) {
        return arr == null ? -1 : arr.indexOf(elem, i);
      },
      /*
      * num:流量数据
      * detailRight：右侧剩余流量
      * isTotal:是否为总流量
      * */
      flowUnit(num, detailRight, isTotal) {
        if (Object.prototype.toString.call(detailRight) === '[object Object]' && detailRight.watchCard) {
          if (detailRight.total === detailRight.used) {
            return '0.00MB'
          } else {
            return toDecimal(detailRight.total - detailRight.used) + 'MB'
          }
        }

        if (Object.prototype.toString.call(detailRight) === '[object Object]' && detailRight.flowCard) {
          if (detailRight.total === detailRight.used) {
            return '0.00GB'
          } else {
            if ((detailRight.total - detailRight.used) < 0) {
              return "0.00GB";
            }
            return (detailRight.total - detailRight.used >= 1024) ?
              toDecimal(detailRight.total / 1024 - detailRight.used / 1024) + 'GB' : toDecimal(detailRight.total - detailRight.used) + 'MB';
          }
        }

        if (isTotal) {
          return num >= 1024 ? toDecimal(num / 1024) + 'GB' : toDecimal(num) + 'MB'
        } else {
          return num >= 1024 ? toDecimal(num / 1024) + 'GB' : toDecimal(num) + 'MB'
        }
      },
      prefer_use_operate(iccid, rating_id, priority, source, order_id) {
        this.priorityShow = true;
        _post('/api/v1/app/plans/stick', {
          iccid: iccid,
          rating_id: rating_id,
          priority: priority > 0 ? 1 : 0,
          source: source,
          order_id: order_id
        }).then(res => {
          if (res.state === 1) {
            Notify({
              message: res.msg
            });
            this.initial();
          }else if (res.state === 0 && res.msg.includes('该套餐已限速')){ //前端不显示提示语该套餐限速
            this.priorityShow = false;
          } else {
            this.priorityShow = false;
            Notify({
              message: res.msg
            });
          }
        })
      },
      toQ() {
        appRate(9);
        this.$router.push({path: "/weixin/question/index"})
      },
      toCard() {
        let _this = this;
        if (this.usageInfo.source == 23) {
          if (this.usageInfo.activated_date !== "") {
            let time = this.dateDiff(this.usageInfo.activated_date, this.usageInfo.current_time);
            if (time > 360) {
              Dialog.confirm({
                title: '提示',
                message: '您的物联网卡已到期,无法继续充值,请更换卡',
                confirmButtonText: "去换卡",
                cancelButtonText: "取消",
              }).then(() => {
                // on confirm
                _this.$router.push({name: 'eqReplaceMent', params: {status: 1}});
                localStorage.setItem("replaceStatus", 1)
              }).catch(() => {
                // on cancel
                return false;
              });
              return false;
            } else if (360 - time <= 30) {
              let overplus = (360 - time).toFixed(0);
              Dialog.confirm({
                title: '提示',
                message: '您的物联网卡还有' + overplus + '天到期,到期后无法继续充值使用,请更换卡',
                confirmButtonText: "去换卡",
                cancelButtonText: "取消",
              }).then(() => {
                // on confirm
                _this.$router.push({name: 'eqReplaceMent', params: {status: 1}});
                localStorage.setItem("replaceStatus", 1)
              }).catch(() => {
                // on cancel
                return false;
              });
              return false;
            } else {
              appRate(14);
              this.$router.push({path: "/weixin/coupon/index"})
            }
          } else {
            appRate(14);
            this.$router.push({path: "/weixin/coupon/index"})
          }
        } else {
          appRate(14);
          this.$router.push({path: "/weixin/coupon/index"})
        }

      },
      dateDiff(date1, date2) {
        var type1 = typeof date1,
          type2 = typeof date2;
        if (type1 == "string") {
          date1 = this.stringToTime(date1);
        } else if (date1.getTime) {
          date1 = date1.getTime();
        }
        if (type2 == "string") {
          date2 = this.stringToTime(date2);
        } else if (date2.getTime) {
          date2 = date2.getTime();
        }
        return (date2 - date1) / 1000 / 60 / 60 / 24; //除1000是毫秒，不加是秒
      },
      //字符串转成Time(dateDiff)所需方法
      stringToTime(string) {
        var f = string.split(" ", 2);
        var d = (f[0] ? f[0] : "").split("-", 3);
        var t = (f[1] ? f[1] : "").split(":", 3);
        return new Date(
          parseInt(d[0], 10) || null,
          (parseInt(d[1], 10) || 1) - 1,
          parseInt(d[2], 10) || null,
          parseInt(t[0], 10) || null,
          parseInt(t[1], 10) || null,
          parseInt(t[2], 10) || null
        ).getTime();
      },
      showMiGu(mobile) {
        if (isMobile(mobile) && !getStorage('showMiGu') && getStorage('MiGuMusic') && getStorage('migu_watch_card')) {
          this.showMiGuModel = true;
        }
      },
      withePhone() {
        this.$router.push({
          name: 'whiteSearch',
          query: {
            msisdn: this.filterCardInfo.msisdn,
            operator: this.usageInfo.operator
          }
        })
      },
      witheOnLoad(msisdn) {
        _get('/opi/cards/get_yd_wt_list', {
          iccid: msisdn,
          source: getStorage('source')
        }).then((res) => {
          if (res.code == 0 && this.sourceWhite == '63') {
            if (res.data.whiteList.userWhiteInfo.length <= 2) {
              Dialog.alert({
                message: '提示：您好，呼出通话前请先设置本号码的联系人（名单内的号码才可以拨打成功哦）',
                confirmButtonText: '前往'
              }).then(() => {
                this.$router.push({
                  name: 'whiteSearch',
                  query: {
                    msisdn: this.filterCardInfo.msisdn,
                    operator: this.usageInfo.operator
                  }
                })
              })
            }
          } else if (res.code == 390101) {
            Dialog.alert({
              message: '提示：您好，呼出通话前请先设置本号码的联系人（名单内的号码才可以拨打成功哦）',
              confirmButtonText: '前往'
            }).then(() => {
              this.$router.push({
                name: 'whiteSearch',
                query: {
                  msisdn: this.filterCardInfo.msisdn,
                  operator: this.usageInfo.operator
                }
              })
            })
          }

        })
      },
      toInvoice(val) {
        if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
         Notify({
            position: 'top',
            message: "请在微信或支付宝客户端申请"
          })
          return
        }
        let timer = 10
        if (this.dateDiff(val.created_at,new Date()) > timer) {
          this.$router.push({
            name: "card_invoice",
            params: {
              order: val
            }
          })
        } else {
          Notify({
            message: `充值${timer}天过后才可以申请发票`,
            background: '#f44336'
          })
        }

      }
    }
  };
</script>

