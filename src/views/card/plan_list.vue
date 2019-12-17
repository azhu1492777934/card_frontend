<template>
  <div class="plan-wrap">

    <div ref="refPLanTitle" class="plan-type-wrap">
      <!--      <div class="plan-type-inner-wrap">-->
      <!--        <div ref="RefPlanTypeScroll" class="plan-type-scroll-wrapper">-->
      <!--          <span-->
      <!--            ref="ref_plan_type"-->
      <!--            @click="planTypeClikc(index)"-->
      <!--            v-for="(item,index) in render_type_name"-->
      <!--            :class="[{'active_type':index===cur_plan_type_index},index] "-->
      <!--          >-->
      <!--              {{item}}-->
      <!--            </span>-->
      <!--        </div>-->
      <!--      </div>-->

      <swiper
        ref="swiperThumbs"
        :options="swiperOptionThumbs"
      >
        <swiper-slide
          @click="planTypeClikc(index)"
          v-for="(item,index) in render_type_name"
          :key="index"
        >
          {{item}}
        </swiper-slide>
      </swiper>

    </div>

    <div class="van-swipe-wrap" ref="vanSwiperWwrap">
      <swiper ref="swiperVant" :options="swiperOption">
        <swiper-slide v-for="(item,index) in plan_type" :key="item" :class="item">
          <ul class="plan-list-wrap">
            <li @click="choosePlanClick(inner_index)"
                v-for="(inner_item,inner_index) in plan_list[item]"
                :key="inner_index"
                :class="{
                'activedPlan':inner_index==choose_plan_index,
                'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0
                }"
            >
              <div class="plan-info-wrap">
                <p
                  :class="{'plan-icon-recommend':inner_item.is_recommend}"
                  class="plan-name">
                  {{ inner_item.name }}
                </p>

                <p class="sub-plan-name">5G优享服务</p>

                <van-collapse
                  :border="false"

                  v-model="activeNames"
                  class="van-collapse-reset"
                >
                  <van-collapse-item
                    title="套餐简介"
                    :name="inner_item.id"
                  >
                    <!--                    <div slot="title"></div>-->
                    <p class="plan-desc">
                      {{
                      inner_item.describe
                      ? inner_item.describe
                      :inner_item.remark
                      ?inner_item.remark
                      :''
                      }}
                    </p>
                  </van-collapse-item>
                </van-collapse>

                <div class="plan-split"></div>
                <p class="plan-limited-wrap">
                  <span
                    class="limited-num"
                    v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">
                    剩{{inner_item.surplus_times}}笔</span>
                  <span
                    class="limited-num"
                    v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}
                    个ELB</span>
                </p>

              </div>
              <div class="plan-price-wrap">
                <p class="plan-price">￥{{ inner_item.price }}</p>
              </div>
              <span class="plan-selected"></span>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </div>

    <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
      <button @click="recharge">{{recharge_btn_text}}</button>
      <a @click="toCard()">卡券兑换</a>
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

    <van-popup
      :close-on-click-overlay="false"
      v-model="rechargeShow">
      <p class="showTip">创建订单中,请等候</p>
    </van-popup>

  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
  import {Toast, Popup, Notify, List, Dialog, Icon, Collapse, CollapseItem} from "vant";
  import {setStorage, getStorage, checkBrowser, Today, lossRate, appRate} from "../../utilies";
  import {_get, _post} from "../../http";
  // @ is an alias to /src
  export default {
    name: "home",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
      swiper() {
        return this.$refs.swiperVant.swiper
      },
      swiperThumbs() {
        return this.$refs.swiperThumbs.swiper
      }
    },
    data() {
      const _this = this;
      return {
        client_type: checkBrowser(),
        load_plan_list: false,
        load_plan_msg: "",
        recharge_btn_text: '充值',
        plan_type: [],// 套餐类型
        plan_type_name: {
          0: "累计套餐",
          1: "月套餐",
          2: "加油包",
          5: "周期性套餐",
          6: "超量自动续费套餐",
          100: '加油包'
        },// 套餐名称
        render_type_name: {},
        cur_plan_type_index: "0", //当前选中套餐类型
        choose_plan_index: 0, //当前选中套餐
        plan_list: {},
        hasValidatedPlan: getStorage('hasValidatedPlan'),
        rechargeShow: false,
        ref_plan_type_index: 0,
        firstStatus: false,
        activeNames: [],
        //实名类型
        realnameType: getStorage('realnameType'),
        // swiper
        swiperOption: {
          loop: true,
          loopedSlides: 3, //looped slides should be the same
          on: {
            slideChangeTransitionEnd: function () {
              _this.cur_plan_type_index = _this.plan_type[this.realIndex];
              console.log(_this.cur_plan_type_index);
            }
          }
        },
        swiperOptionThumbs: {
          slidesPerView: 3,
          touchRatio: 0.2,
          loop: true,
          loopedSlides:3, //looped slides should be the same
          slideToClickedSlide: true,
        },
        // mockData
        mockData: {
          "0": [
            {
              "c_price": 1099,
              "call_time": 0,
              "card_source": 7,
              "data": -4,
              "day": 360,
              "describe": "全国通用，360天有效期。80G后限速到2M，可充值加速包50元30G，每30天后重置一次。",
              "first_price": null,
              "id": 3286,
              "image_url": null,
              "is_can_renew": 0,
              "is_elb_deductible": 0,
              "is_recommend": false,
              "market_price": 1299,
              "max_deductible_elb": null,
              "meal_message": 0,
              "name": "无限量/1年-累计套餐",
              "price": 1099,
              "remark": "月底流量不清零, 12个月有效，全国通用，套餐到期即停机",
              "surplus_times": "False",
              "type": 0,
              "vip_type_id": 0
            },
            {
              "c_price": 1099,
              "call_time": 0,
              "card_source": 7,
              "data": -4,
              "day": 360,
              "describe": "全国通用，360天有效期。80G后限速到2M，可充值加速包50元30G，每30天后重置一次。",
              "first_price": null,
              "id": 32862,
              "image_url": null,
              "is_can_renew": 0,
              "is_elb_deductible": 1,
              "is_recommend": false,
              "market_price": 1299,
              "max_deductible_elb": 10,
              "meal_message": 0,
              "name": "无限量/1年-test-累计套餐",
              "price": 1000,
              "remark": "月底流量不清零, 12个月有效，全国通用，套餐到期即停机",
              "surplus_times": "False",
              "type": 0,
              "vip_type_id": 0
            }
          ],
          "1": [
            {
              "c_price": 1099,
              "call_time": 0,
              "card_source": 7,
              "data": -4,
              "day": 360,
              "describe": "全国通用，360天有效期。80G后限速到2M，可充值加速包50元30G，每30天后重置一次。",
              "first_price": null,
              "id": 3286,
              "image_url": null,
              "is_can_renew": 0,
              "is_elb_deductible": 0,
              "is_recommend": false,
              "market_price": 1299,
              "max_deductible_elb": null,
              "meal_message": 0,
              "name": "无限量/1年-月套餐",
              "price": 1099,
              "remark": "月底流量不清零, 12个月有效，全国通用，套餐到期即停机",
              "surplus_times": "False",
              "type": 0,
              "vip_type_id": 0
            }
          ],
          "2": [
            {
              "c_price": 1099,
              "call_time": 0,
              "card_source": 7,
              "data": -4,
              "day": 360,
              "describe": "全国通用，360天有效期。80G后限速到2M，可充值加速包50元30G，每30天后重置一次。",
              "first_price": null,
              "id": 3286,
              "image_url": null,
              "is_can_renew": 0,
              "is_elb_deductible": 0,
              "is_recommend": false,
              "market_price": 1299,
              "max_deductible_elb": null,
              "meal_message": 0,
              "name": "无限量/1年-加油包",
              "price": 1099,
              "remark": "月底流量不清零, 12个月有效，全国通用，套餐到期即停机",
              "surplus_times": "False",
              "type": 0,
              "vip_type_id": 0
            }
          ],
          "5": [
            {
              "c_price": 1099,
              "call_time": 0,
              "card_source": 7,
              "data": -4,
              "day": 360,
              "describe": "全国通用，360天有效期。80G后限速到2M，可充值加速包50元30G，每30天后重置一次。",
              "first_price": null,
              "id": 3286,
              "image_url": null,
              "is_can_renew": 0,
              "is_elb_deductible": 0,
              "is_recommend": false,
              "market_price": 1299,
              "max_deductible_elb": null,
              "meal_message": 0,
              "name": "无限量/1年-周期性套餐",
              "price": 1099,
              "remark": "月底流量不清零, 12个月有效，全国通用，套餐到期即停机",
              "surplus_times": "False",
              "type": 0,
              "vip_type_id": 0
            }
          ]
        }
      };
    },
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [List.name]: List,
      [Dialog.name]: Dialog,
      [Icon.name]: Icon,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      swiper,
      swiperSlide,
    },
    created() {
      // 流失率统计
      if (getStorage('plan_list_new_card') === "1") {
        lossRate({
          type: 4,
          iccid: getStorage("check_iccid")
        });
      }
      let _this = this;
      //处理套餐数据

      // _get("/api/v1/app/plan_list", {
      //   iccid: getStorage("check_iccid")
      // }).then(res => {
      let res = {
        state: 1,
        data: this.mockData
      };
      if (res.state === 1) {
        if (JSON.stringify(res.data) === "{}" || res.data.length === 0) {
          this.load_plan_list = true;
          this.load_plan_msg = "此卡暂无充值套餐，请联系客服人员及时处理";
          return;
        }
        this.load_plan_msg = res.msg;
        this.load_plan_list = false;
        this.plan_list = res.data;
        for (let item in this.plan_list) {
          // 套餐类型
          if (this.plan_type_name.hasOwnProperty(item)) {
            this.render_type_name[item] = this.plan_type_name[item];
          }

          let newArray1 = [], newArray2 = [], newArray3 = [];
          for (let i = 0; i < this.plan_list[item].length; i++) {
            //区分推荐/未推荐
            if (this.plan_list[item][i].is_recommend === true) {
              newArray1.push(this.plan_list[item][i]);
            } else {
              newArray2.push(this.plan_list[item][i]);
            }
          }
          //分别进行排序
          newArray1.sort(this.compare2("id"));
          newArray2.sort(this.compare2("id"));
          newArray3 = newArray1.concat(newArray2);

          this.plan_list[item] = newArray3;

          // 处理加油包
          if (!this.hasValidatedPlan) {
            if (item !== '2') {
              this.plan_type.push(item);
            }
          } else {
            this.plan_type.push(item);
          }
        }

        // 处理加油包
        if (!this.hasValidatedPlan) {
          if (this.plan_list.hasOwnProperty(2)) {
            delete this.plan_list[2];
          }
          if (this.render_type_name.hasOwnProperty(2)) {
            delete this.render_type_name[2]
          }
        }
        // else {
        //   let more_flow_list = this.plan_list[2] || [];
        //   if (more_flow_list.length) {
        //     delete this.plan_list[2];
        //     this.plan_list[100] = more_flow_list
        //   }
        // }

        this.swiperOption.loopedSlides = this.plan_type.length;
        this.swiperOptionThumbs.loopedSlides = this.plan_type.length;

        this.$nextTick(() => {
          let clientHeight = document.documentElement.clientHeight ||
            document.body.clientHeight,
            refPlanButton = this.$refs.refPlanButton.offsetHeight,
            userHeight = getStorage("userHeight") || 44;
          let planTypeScrollWidth = "";
          if (this.global_variables.device === "iphone" && this.client_type === "app") {
            this.$refs.vanSwiperWwrap.style.height =
              clientHeight - refPlanButton - userHeight - 49 + "px";
          } else {
            if (this.client_type === "wechat" || this.client_type === "alipay") {
              this.$refs.vanSwiperWwrap.style.height =
                clientHeight - refPlanButton - userHeight + "px";
            } else {
              this.$refs.vanSwiperWwrap.style.height =
                clientHeight - refPlanButton - userHeight + "px";
            }
          }

        });

        //防止第一次加载气泡提示框显示错误的问题
        // setTimeout(function () {
        //   _this.firstStatus = true;
        // }, 100);

        //放底部
        // for (let i in res.data) {
        //   if (!res.data[i] && typeof res.data[i] !== "undefined" && res.data[i] !== 0) {
        //     continue;
        //   }
        //   this.choose_plan_index = res.data[i][0].id;
        //   this.ref_plan_type_index = i;
        //   return this.choose_plan_index;
        // }
      } else {
        this.load_plan_list = true;
        this.load_plan_msg = res.msg;
      }
      // });
    },
    mounted() {
      this.$nextTick(() => {
        const swiper = this.swiper;
        const swiperThumbs = this.swiperThumbs;
        swiper.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiper;
      })
    },
    methods: {
      planTypeClikc(index) {
        this.cur_plan_type_index = index;
        this.swiper.slideTo(index);
      },
      choosePlanClick: function (id, index) {
        this.ref_plan_type_index = index;
        this.choose_plan_index = id;
        index === '2' ? this.recharge_btn_text = '选择叠加加油包套餐' : this.recharge_btn_text = '充值';
      },
      recharge: function () {
        let planInfo = this.plan_list[this.cur_plan_type_index][this.choose_plan_index];

        // for (let i = 0; i < this.plan_list[this.ref_plan_type_index].length; i++) {
        //   if (this.choose_plan_index === this.plan_list[this.ref_plan_type_index][i].id) {
        //     planInfo = this.plan_list[this.ref_plan_type_index][i];
        //   }
        // }

        if (planInfo.surplus_times <= 0) {
          Toast("此套餐已售罄, 请更换套餐");
          return;
        }

        planInfo.iccid = getStorage("check_iccid");
        setStorage("planInfo", planInfo, "obj");

        console.log(this.cur_plan_type_index);

        // 加油包套餐充值
        if (this.cur_plan_type_index === '2') {
          this.$router.push('/weixin/card/more_flow');
          return;
        }

        // 实名类型流程
        if (this.realnameType === '1') {
          this.directRecharge(planInfo);
          return;
        }
        appRate(3);
        //获取当前包月套餐信息
        _get("/api/v1/app/plans/renew_info", {
          user_id: getStorage("userInfo", "obj").account.user_id,
          rating_id: planInfo.id
        }).then(res => {
          if (res.state === 1) {
            setStorage("monthlyMsg", res.data, "obj");
            this.$router.push({
              path: "/weixin/recharge/index",
              query: {type: this.$route.query.type}
            });
          } else {
            Toast({
              position: 'top',
              message: res.msg
            });
          }
        });
      },
      //直接充值
      directRecharge(planInfo) {
        if (!this.authorizedUserInfo.account.user_id) {
          Toast({
            position: 'top',
            message: "请在微信或支付宝客户端充值"
          });
          return;
        }
        let _this = this;
        let param = {
          status: this.authorizedUserInfo.account.balance > 0 ? 1 : 0,
          recharge_price: planInfo.price,
          price: planInfo.price,
          iccid: planInfo.iccid || getStorage("check_iccid"),
          rating_id: planInfo.id,
          user_id: getStorage("userInfo", "obj").account.user_id,
          env: this.client_type,
          start_time: Today(),
          type: 0,
          recharge_type: this.global_variables.packed_project === 'mifi' ? 1 : 0,
          success_page: `${window.location.protocol}//${window.location.host}/weixin/recharge/callback`,
          failed_page: window.location.href
        };

        if (this.client_type === "alipay" || this.client_type === "wechat") param.open_id = (getStorage("decrypt_data", "obj") || {}).openid;
        if (this.client_type === "wechat") param.pay_type = "WEIXIN";
        if (this.client_type === "alipay") param.pay_type = "ALIPAY";
        if (this.client_type === "app") {
          param.open_id = this.authorizedUserInfo.account.user_id;
          this.appPay.type ? param.pay_type = "WEIXIN" : param.pay_type = "ALIPAY";
        }

        Dialog.confirm({
          title: '充值',
          message: `是否确认充值'${planInfo.name}'?`
        }).then(() => {
          this.finalRecharge(param);
        }).catch(() => {
          // on cancel
        });

      },
      finalRecharge(param) {
        this.rechargeShow = true;
        let payDom = document.querySelector('form');
        if (payDom) document.removeChild(payDom);
        let _this = this;
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
      compare2(pro) {
        return function (obj1, obj2) {
          let val1 = obj1[pro];
          let val2 = obj2[pro];
          if (val1 > val2) {
            return 1;
          } else if (val1 < val2) {
            return -1;
          } else {
            return 0;
          }
        }
      },
      toCard() {
        appRate(14);
        this.$router.push({path: "/weixin/coupon/index"})
      }
    }
  };
</script>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";
  @import "../../assets/less/common";

  html,
  body,
  #app {
    height: 100%;
  }

  /*.el-popover {*/
  /*  font-size: 24px !important;*/
  /*}*/

  .plan-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    background: #F4F4F4;
    box-sizing: border-box;

    .van-swipe-wrap {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /*.plan-type-name {*/
    /*  display: flex;*/
    /*  height: 55px;*/
    /*  margin-bottom: 10px;*/
    /*  align-items: center;*/
    /*  justify-content: center;*/
    /*  font-size: 30px;*/
    /*  font-weight: bold;*/
    /*  text-align: center;*/
    /*  color: #f1a53c;*/
    /*  background: rgba(255, 251, 243, 1);*/

    /*  &::before, &::after {*/
    /*    display: block;*/
    /*    width: 129px;*/
    /*    height: 8px;*/
    /*    content: '';*/
    /*    background-size: 100% 100% !important;*/
    /*  }*/

    /*  &::before {*/
    /*    margin-right: 24px;*/
    /*    background: url("../../assets/imgs/card/usage/leftIcon.png") no-repeat;*/
    /*  }*/

    /*  &::after {*/
    /*    margin-left: 24px;*/
    /*    background: url("../../assets/imgs/card/usage/rightIcon.png") no-repeat;*/
    /*  }*/
    /*}*/

    /*.planContent {*/
    /*  display: flex;*/
    /*  width: 100%;*/
    /*  flex-flow: row wrap;*/
    /*  align-content: flex-start;*/
    /*  padding: 0 20px;*/
    /*  box-sizing: border-box;*/

    /*  .plan-icon-recommend {*/
    /*    text-align: left;*/
    /*    position: absolute;*/
    /*    bottom: 4px;*/
    /*    left: 8px;*/
    /*  }*/

    /*  .iconfont {*/
    /*    font-size: 38px;*/
    /*  }*/

    /*  .centerBox {*/
    /*    height: 100%;*/
    /*    display: flex;*/
    /*    align-items: center;*/
    /*    flex-direction: column;*/
    /*    justify-content: center;*/
    /*    position: relative;*/

    /*    .gift {*/
    /*      position: absolute;*/
    /*      top: -35px;*/
    /*      right: -20px;*/

    /*      > img {*/
    /*        width: 40px;*/
    /*        height: 40px;*/
    /*      }*/
    /*    }*/
    /*  }*/

    /*  > div {*/
    /*    border: 2px solid rgba(230, 230, 230, 1);*/
    /*    border-radius: 13px;*/
    /*    padding: 10px;*/
    /*    margin: 10px;*/
    /*    box-sizing: border-box;*/
    /*    flex: 0 0 30%;*/
    /*    position: relative;*/

    /*    .contentWord1 {*/
    /*      font-size: 24px;*/
    /*      font-weight: 400;*/
    /*      color: rgba(51, 51, 51, 1);*/
    /*    }*/

    /*    .contentWord2 {*/
    /*      width: 60px;*/
    /*      height: 3px;*/
    /*      background: rgba(241, 165, 60, 1);*/
    /*      margin: 10px auto;*/
    /*    }*/

    /*    .contentWord3 {*/
    /*      font-size: 28px;*/
    /*      font-weight: 400;*/
    /*      color: #fd720d;*/

    /*      del {*/
    /*        color: #868686;*/
    /*        font-size: 21px;*/
    /*      }*/
    /*    }*/
    /*  }*/

    /*  //当前选中样式*/
    /*  .activedPlan {*/
    /*    position: relative;*/
    /*    border-color: #dca85f;*/
    /*    box-shadow: 0 0 30px 0 #eae9e9;*/

    /*    .plan-name {*/
    /*      color: #fd720d;*/
    /*    }*/
    /*  }*/

    /*  .activedPlan::after {*/
    /*    content: "";*/
    /*    position: absolute;*/
    /*    width: 21px;*/
    /*    height: 21px;*/
    /*    right: -2px;*/
    /*    bottom: 0;*/
    /*    background: url("../../assets/imgs/card/usage/right.png") no-repeat;*/
    /*    background-size: 100% 100%;*/
    /*  }*/

    /*  //售罄状态*/
    /*  .plan-sell-done {*/
    /*    background-color: #f0f0f0;*/

    /*    .plan-name,*/
    /*    .plan-price {*/
    /*      color: #868686;*/
    /*    }*/

    /*    .icon-sell-done {*/
    /*      position: absolute;*/
    /*      top: 40px;*/
    /*      left: 50%;*/
    /*      margin-left: -100px;*/
    /*      padding: 10px 20px;*/
    /*      font-size: 28px;*/
    /*      box-sizing: border-box;*/
    /*      border: 4px solid #ed6153;*/
    /*      color: #ed6153;*/
    /*      border-radius: 12px;*/
    /*      transform: rotate(-28deg);*/
    /*    }*/

    /*    .icon-sell-done::after {*/
    /*      content: "已售罄";*/
    /*    }*/
    /*  }*/

    /*  // 加油提示*/
    /*  !*.warning-wrapper {*!*/
    /*  !*  flex: auto;*!*/
    /*  !*  border: none;*!*/
    /*  !*  width: 100%;*!*/

    /*  !*  p {*!*/
    /*  !*    color: #654828;*!*/
    /*  !*    font-size: 26px;*!*/
    /*  !*    line-height: 1.5;*!*/
    /*  !*    text-align: left;*!*/

    /*  !*    &:first-child {*!*/
    /*  !*      color: #ff3448;*!*/
    /*  !*      font-size: 28px;*!*/
    /*  !*    }*!*/

    /*  !*    &:before {*!*/
    /*  !*      content: "*";*!*/
    /*  !*      color: #ff4e35;*!*/
    /*  !*    }*!*/
    /*  !*  }*!*/
    /*  !*}*!*/
    /*}*/

    .swiper-container {
      height: 100%;
    }

    .plan-type-wrap {
      /*display: flex;*/
      /*flex-wrap: wrap;*/
      /*-webkit-box-lines: multiple;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      background: #fff;

      /*.plan-type-inner-wrap {*/
      /*  width: 90%;*/
      /*overflow: auto;*/

      /*.plan-type-scroll-wrapper {*/
      /*  display: flex;*/
      /*  flex-wrap: nowrap;*/
      /*  -webkit-box-lines: single;*/
      /*}*/


      /*}*/

      span {
        display: inline-block;
        flex: 1;
        min-width: 33.33%;
        height: 46px;
        padding: 28px 0;
        white-space: nowrap;
        color: #A6A6A6;
        font-size: 30px;
        border: 1px solid transparent;

        &.active_type {
          position: relative;
          color: #3E3E3E;

          &:after {
            position: absolute;
            left: 50%;
            bottom: 25px;
            content: '';
            width: 40%;
            height: 5px;
            margin-left: -20%;
            background: #3E3E3E;
          }
        }
      }

      .swiper-slide {
        width: 25%;
        height: 46px;
        line-height: 46px;
        padding: 28px 0;
        /*opacity: 0.4;*/
        color: #A6A6A6;
      }

      .swiper-slide-active {
        position: relative;
        color: #3E3E3E;
        opacity: 1;
        &:after {
          position: absolute;
          left: 50%;
          bottom: 25px;
          content: '';
          width: 40%;
          height: 5px;
          margin-left: -20%;
          background: #3E3E3E;
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
        width: 94%;
        min-height: 95px;
        margin: 0 auto;
        padding: 0 15px 24px;
        box-sizing: border-box;
        color: #868686;
        border-radius: 10px;
        margin-bottom: 25px;
        font-size: 20px;
        background: #fff;
        align-items: self-start;
        border: 1px solid transparent;

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
            padding: 32px 0;
            font-size: 30px;
            color: #2c251d;
            font-weight: 500;
          }

          .sub-plan-name {
            padding-bottom: 20px;
            font-size: 22px;
            color: #666;
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
            /*padding-bottom: 20px;*/
          }
        }

        .plan-price-wrap {
          flex: 1.5;

          .plan-price {
            padding: 32px 0;
            color: #F1B94C;
            font-size: 36px;
            font-weight: 700;
          }
        }

        //当前选中样式
        &.activedPlan {
          border: 1px solid #F1B94C;
          box-shadow: 0 0 30px 0 #eae9e9;

          .plan-name {
            color: #e8a92d;
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

      // 重置collapse类
      .van-collapse-reset {

        .van-collapse-item__title {
          display: block;
        }

        .van-cell__title {
          display: inline-block;
          font-size: 24px;
          color: #3E3E3E;
        }

        .van-cell__right-icon {
          vertical-align: middle;
        }

        .van-collapse-item__title,
        .van-collapse-item__content {
          padding: 0;
        }

        .van-cell:not(:last-child)::after {
          border: none;
        }

        /*&::after{*/
        /*  border:none;*/
        /*}*/
      }
    }

    .btn-recharge-wrap {
      padding: 40px 32px;
      position: relative;

      &.noDataHide {
        display: none;
      }

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

      a {
        position: absolute;
        right: 30px;
        bottom: 60px;
        color: rgba(253, 212, 122, 1);
        font-size: 28px;
        text-decoration: underline;
      }
    }

  }
</style>


