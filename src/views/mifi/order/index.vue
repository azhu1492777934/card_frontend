<template>
  <div class="order-wrap">
    <div ref="orderTop" class="order-top">
      <p>卡号：</p>
      <p>{{iccid}}</p>
      <ul>
        <li v-for="(item,index) in statusList" :class="{'checked':statusIndex==index}"
            @click="changeStatus(index)">
          {{item}}
          <span class="deco-border-arrow"></span>
        </li>
      </ul>
    </div>
    <div class="swipe-wrap" ref="SwiperWwrap">
      <transition-group name="fade" tag="div" class="swipe-wrap-inner">
        <div class="swiper-slide" v-for="(item,index) in statusList" v-show="statusIndex === index" :key="index">
          <ul v-show="orderListObj[index].length>0" class="order-list-wrap">
            <li v-for="(inner_item,inner_index) in orderListObj[index]">
              <div class="order-info-wrap">
                                <span class="order-status"
                                      :class="{
                                    'status-refund': inner_item.status == -1,
                                    'status-unPay' : inner_item.status == 0,
                                    'status-account': inner_item.status == 3,
                                  }"
                                >
                                    {{orderStatusList[inner_item.status+1]}}
                                </span>
                                <span class="order-status"  v-if="(inner_item.order_type==0 || inner_item.order_type==4)&&inner_item.refund!=2" @click="toInvoice(inner_item)">发票申请</span>
                <p class="plan-name">
                  <span class="iconfont icon-plan"></span>
                  {{ inner_item.rating_name }}
                </p>
                <p class="plan-order">
                  <span>订单号：</span>
                  {{ inner_item.no }}
                </p>
              </div>

              <div class="order-price-wrap">
                <p>￥{{ inner_item.price }}</p>
              </div>
            </li>
          </ul>
          <div v-show="orderListObj[index].length==0">
            <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="暂无数据">
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {Toast, Popup, Notify, Loading} from "vant";
  import {getStorage, setStorage, checkBrowser} from "../../../utilies";
  import {_get} from '../../../http'

  export default {
    name: "index",
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Loading.name]: Loading,
      swiper,
      swiperSlide,
    },
    data() {
      const _this = this;
      return {
        iccid: getStorage('check_iccid'),
        client_type: checkBrowser(),
        statusList: ['全部', '待支付', '已支付', '已完成'],
        orderStatusList: ['已退款', '待支付', '已支付', '已到账'],
        statusIndex: 0,
        orderListObj: {0: [], 1: [], 2: [], 3: []},
        bsList: [null, null, null, null],
        swiperOption: {
          on: {
            slideChangeTransitionEnd: function (swiper) {
              _this.statusIndex = this.activeIndex;
            }
          }
        },
      }
    },
    created() {
      this.iccid ? this.initial() : this.$router.push({path: '/mifi/card/lookup'});
    },
    computed: {
      // swiper() {
      //     return this.$refs.mySwiper.swiper
      // }
    },
    methods: {
      initial() {
        this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
        this.$store.commit('mifiCommon/changeErrStatus', {show: false});
        _get('/api/v1/app/order/status', {
          recharge_type: 1,
          iccid: this.iccid,
        }).then(res => {
          this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
          if (res.state === 1) {
            this.orderListObj = res.data;

            let allOrder = res.data[0] || [],
              filterUnPayOrder = [],
              unPayOrder = [],
              sortAllOrder = [];

            if (allOrder.length > 0) {
              allOrder.map(item => {
                if (item.status == 0) {
                  unPayOrder.push(item);
                }
              });
              filterUnPayOrder = allOrder.filter(item => item.status != 0);
              sortAllOrder = unPayOrder.concat(filterUnPayOrder);
              this.orderListObj[0] = sortAllOrder;
            }// 优先显示未支付订单
            this.$nextTick(() => {
              let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                orderTop = this.$refs.orderTop.offsetHeight,
                userHeight = getStorage('userHeight');

              if (this.client_type === 'wechat' || this.client_type === 'alipay') {
                this.$refs.SwiperWwrap.style.height = (clientHeight - orderTop - userHeight) + 'px'
              } else {
                this.$refs.SwiperWwrap.style.height = (clientHeight - orderTop) + 'px'
              }

              let swiperSlideList = document.querySelectorAll('.swipe-wrap .swiper-slide');


              if (!this.bsList[0]) {
                swiperSlideList.forEach((item, index) => {
                  this.bsList[index] = new BScroll(item, {
                    click: true
                  })
                });
              } else {

                swiperSlideList.forEach((item, index) => {
                  this.bsList[index].refresh()
                });
              }
            });
          } else {
            this.$store.commit('mifiCommon/changeErrStatus', {
              show: true,
              errorMsg: res.msg ? res.msg : '获取数据信息失败，请稍后再试'
            })
          }

        })
      },
      changeStatus(index) {
        this.statusIndex = index;
        this.$nextTick(() => {
          this.bsList[index].refresh();
        })
      },
      toPay(params) {
        params.rate_plan.no = params.no;
        setStorage('planInfo', params.rate_plan, 'obj');
        this.$router.push({
          path: '/weixin/recharge/index',
          query: {'un_pay_order': 1}
        });
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
      toInvoice(val) {
        if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
         Notify({
            position: 'top',
            message: "请在微信或支付宝客户端申请"
          })
          return
        }
        let timer = 10
        if (this.dateDiff(val.paid_at,new Date()) > timer) {
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
  }
</script>

<style lang="less">
  /*@import "~swiper/dist/css/swiper.min.css";*/
  @import "../../../assets/less/utitlies";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .order-wrap {
    .swiper-slide, .swipe-wrap-inner {
      height: 100%;
      overflow: hidden;
    }

    .order-top {
      padding: 55px 46px 0;
      height: 208px;
      .bg-image('../../assets/imgs/mifi/order/orderTopBg');

      p {
        &:first-child {
          font-size: 35px;
          color: #353335;
          text-align: left;
        }

        &:nth-child(2) {
          padding: 18px 0 30px;
          text-align: center;
          color: #fa7500;
          font-size: 46px;
          font-weight: 500;
        }
      }

      ul {
        display: flex;
        padding: 0 29px;

        li {
          position: relative;
          flex: 1;
          color: #8a8a8a;
          font-size: 30px;

          &.checked {
            color: #fab214;

            .deco-border-arrow {
              position: absolute;
              left: 50%;
              bottom: -32px;
              display: inline-block;
              width: 125px;
              height: 24px;
              transform: translateX(-50%);
              .bg-image('../../assets/imgs/mifi/order/orderArrow');
            }
          }
        }
      }
    }

    .swipe-wrap {
      padding: 25px 23px;
      background-color: #efeaea;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;

      .order-list-wrap {
        /*height: 100%;*/
        /*overflow-y: auto;*/
      }

      li {
        display: flex;
        align-items: center;
        min-height: 158px;
        padding: 0 18px 0 31px;
        margin-bottom: 15px;
        background-color: #fff;
        border-radius: 12px;

        &:last-child {
          margin-bottom: 0;
        }

        .order-info-wrap {
          flex: 4;
          text-align: left;

          .order-status {
            font-size: 26px;
            color: #fa7600;

            &.status-refund {
              color: #a9a9a9;
            }

            &.status-account {
              color: #faa500;
            }

            &.status-unPay {
              color: #ff4426;
            }
          }

          .plan-name {
            display: flex;
            align-items: center;
            padding: 25px 0 0;
            font-size: 36px;
            color: #555;
            font-weight: 500;

            .icon-plan {
              padding-right: 10px;
              color: #faa500;
              font-size: 30px;
            }
          }

          .plan-order {
            padding-top: 15px;
            font-size: 22px;
            color: #9fa4af;
          }

        }

        .order-price-wrap {
          flex: 2;
          text-align: center;

          p {
            font-size: 60px;
            font-weight: 500;
            color: #fa7600;
          }

          .toPay {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 35px;
            font-size: 28px;
            color: #333;
            border-radius: 15px;
            background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
          }

        }
      }
    }
  }

</style>
