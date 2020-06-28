<template>
  <div class="plan-wrap">

    <div ref="refPLanTitle" class="plan-type-wrap">
      <span
        @click="planTypeClikc(index)"
        v-for="(item,index) in render_type_name"
        :key="index"
        :class="[{'active_type':index==cur_plan_type_index},index]"
      >
          {{item}}
        </span>
    </div>

    <div
      class="van-swipe-wrap"
      ref="vanSwiperWwrap"
      :class="{
      'plan-no-user__height':plan_list_height.is_normal,
      'plan-has-user__height':plan_list_height.is_c_frontend,
      'plan-app__height':plan_list_height.is_app
      }"
    >
      <swiper ref="swiperVant" :options="swiperOption">
        <swiper-slide v-for="(item,index) in plan_type" :key="item" :class="item">
          <ul class="plan-list-wrap">
            <li @click="choosePlanClick(inner_index, index, inner_item.name)"
                v-for="(inner_item,inner_index) in plan_list[item]"
                :key="inner_index"
                :name="inner_item.id"
                :class="{
                'activedPlan':inner_index==choose_plan_index,
                'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0
                }"
            >
              <div class="plan-info-wrap">
                <p
                  :class="{'plan-icon-recommend':inner_item.is_recommend}"
                  class="plan-name">
                  <span v-if="inner_item.is_recommend" class="iconfont icon-recommend"></span>
                  {{ inner_item.name }}
                </p>

                <p class="sub-plan-name">{{ inner_item.specialty ? inner_item.specialty : '优享服务' }}</p>

                <van-collapse
                  :border="false"

                  v-model="activeNames"
                  class="van-collapse-reset"
                >
                  <van-collapse-item
                    title="套餐简介"
                    :name="inner_item.id"
                  >
                    <p class="plan-desc">
                      {{
                      (inner_item.describe !== 'None' && inner_item.describe)
                      ?inner_item.describe
                      :(inner_item.remark !== 'None' && inner_item.remark)
                      ?inner_item.remark
                      :'暂无描述'
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
                <p class="plan-sell-count">已售：{{inner_item.sell_count}}</p>
              </div>
              <span class="plan-selected"></span>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </div>

    <div
      class="btn-recharge-wrap"
      :class="{'noDataHide':load_plan_list}"
    >
      <div class="guardian" v-show="guardian">
        <van-checkbox v-model="guardianChecked" icon-size="16px" shape="square" checked-color="#FFB214" id="guardian">
         
        </van-checkbox>
        <span>我同意</span>
         <p @click="goGuardia">《中国人民财产保险股份有限公司少儿走失找寻费用补偿保险条款》</p>
      </div>
      <button
        @click="toService"
      >
        <span class="iconfont icon-servicer"></span>
        <br>客服
      </button>

      <button
        @click="toQuestion"
      >
        提问
      </button>

      <button @click="recharge">{{recharge_btn_text}}</button>
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
  import MiGu from '../../components/activity/migu';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
  import {Toast, Popup, Notify, List, Dialog, Icon, Collapse, CollapseItem, Checkbox} from "vant";
  import {setStorage, getStorage, checkBrowser, Today, lossRate, appRate, isMobile} from "../../utilies";
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
          5: "周期套餐",
          6: "超量自动续费套餐",
          // 100: '加油包'
        },// 套餐名称
        render_type_name: [],
        cur_plan_type_index: 0, //当前选中套餐类型
        choose_plan_index: 0, //当前选中套餐
        plan_list: {},
        hasValidatedPlan: getStorage('hasValidatedPlan'),
        rechargeShow: false,
        ref_plan_type_index: 0,
        firstStatus: false,
        activeNames: [],
        showMiGuModel: false,
        //实名类型
        realnameType: getStorage('realnameType'),
        swiperOption: {
          loop: true,
          on: {
            slideChangeTransitionEnd: function () {
              _this.choose_plan_index = 0;
              _this.cur_plan_type_index = this.activeIndex;
            }
          }
        },
        swiperOptionThumbs: {
          loop: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
        // 套餐高度
        plan_list_height: {
          is_app: false,
          is_c_frontend: true,
          is_normal: false,
        },
        // 协议
        guardianChecked: false,
        guardian: false,
        guardianText: '翼联守护'
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
      [Checkbox.name]: Checkbox,
      MiGu,
      swiper,
      swiperSlide,
    },
    created() {
      if (!getStorage('check_iccid')) this.$router.push({path: '/weixin/card/lookup'});
      // 流失率统计
      if (getStorage('plan_list_new_card') === "1") {
        lossRate({
          type: 4,
          iccid: getStorage("check_iccid")
        });
      }

      let _this = this;
      //处理套餐数据
      _get("/api/v1/app/plan_list", {
        iccid: getStorage("check_iccid")
      }).then(async res => {

        if (res.state === 1) {
          if (JSON.stringify(res.data) === "{}" || res.data.length === 0) {
            this.load_plan_list = true;
            this.load_plan_msg = "此卡暂无充值套餐，请联系客服人员及时处理";
            return;
          }

          this.load_plan_msg = res.msg;
          this.load_plan_list = false;
          this.plan_list = res.data
    
          
          for (let item in this.plan_list) {
            // 套餐类型
            if (this.plan_type_name.hasOwnProperty(item)) {
              this.render_type_name.push(this.plan_type_name[item]);
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
            // newArray1.sort(this.compare("id", 'asc'));
            // newArray2.sort(this.compare("id", 'asc'));
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
            if (this.render_type_name.includes('加油包')) {
              this.render_type_name.splice(this.render_type_name.findIndex(item => item === '加油包'), 1);
            }
          }

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


          
         let planInfo = await this.getPlanInfo(this.choose_plan_index)
         if (planInfo.name.includes(this.guardianText))this.guardian = true

        } else {
          this.load_plan_list = true;
          this.load_plan_msg = res.msg;
        }
      });
    },
    mounted() {

    },
    methods: {
      toQuestion() {
        this.$router.push({
          path: '/weixin/question/common_question'
        });
      },
      toService() {
        location.href = 'https://cschat.antcloud.com.cn/index.htm?tntInstId=QWGLZKQM&scene=SCE00040313#'
      },
      async planTypeClikc(index) {
        this.cur_plan_type_index = index;
        this.swiper.slideTo(index);
        /* 获取当前套餐信息*/
        let planInfo = await this.getPlanInfo(0)
      
        if (planInfo.name.includes(this.guardianText))this.guardian = true
        else this.guardian = false
      },
      choosePlanClick: function (id, index, name) {
        this.ref_plan_type_index = index;
        this.choose_plan_index = id;
        index === '2' ? this.recharge_btn_text = '选择叠加加油包套餐' : this.recharge_btn_text = '充值';

        if (name.includes(this.guardianText)) this.guardian = true
        else this.guardian = false
      },
      async recharge() {

        if (this.guardian) {
          if (!this.guardianChecked) {
            Toast({
              position: 'top',
              message: "请同意该套餐协议",
              duration: 4000
            });
            return
          }
        }


        let planName = this.render_type_name[this.cur_plan_type_index];
        let planType = '';
        for (let i in this.plan_type_name) {
          if (this.plan_type_name[i] === planName) {
            planType = i;
            break
          }
        }

        let planInfo = this.plan_list[planType][this.choose_plan_index];
        let date = new Date().getDate()
        if (planName === '月套餐' && date<=26 && date>=22) {
          Dialog.alert({
            title: '温馨提醒',
            message: '此套餐默认为立即生效，并且26日24时流量清零，请注意根据需求选择生效日期。'
          })
        }

        if (planInfo.surplus_times <= 0) {
          Toast("此套餐已售罄, 请更换套餐");
          return;
        }

        planInfo.iccid = getStorage("check_iccid");
        setStorage("planInfo", planInfo, "obj");




        // 加油包套餐充值
        if (planType === '2') {
          this.$router.push({
            path:"/weixin/card/more_flow",
          });
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
              query: {
                type: this.$route.query.type
              }
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
          success_page: this.global_variables.packed_project === 'mifi'? `${window.location.protocol}//${window.location.host}/mifi/card/index`: `${window.location.protocol}//${window.location.host}/weixin/card/usage`,
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
      compare(pro, sort) {
        return function (obj1, obj2) {
          let v1 = obj1[pro];
          let v2 = obj2[pro];
          if (sort === 'asc') return v1 - v2;
          if (sort === 'desc') return v2 - v1
        }
      },
      toCard() {
        appRate(14);
        this.$router.push({path: "/weixin/coupon/index"})
      },
      getPlanInfo(index) {
       return new Promise((resolve) => {
          let planName = this.render_type_name[this.cur_plan_type_index];
          let planType = '';
          for (let i in this.plan_type_name) {
            if (this.plan_type_name[i] === planName) {
              planType = i;
              break
            }
          }
     
          let planInfo = this.plan_list[planType][index];
          resolve(planInfo)
        })

      },
      goGuardia() {
        this.$router.push({
            path:"/weixin/question/guardian",
          });
      }
    }
  };
</script>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";
  @import "../../assets/less/common";

  .plan-wrap {
    width: 100%;
    background: #F4F4F4;
    box-sizing: border-box;

    .van-swipe-wrap {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .swiper-container {
      height: 100%;
    }

    .plan-type-wrap {
      display: flex;
      border-bottom: 1px solid #f4f4f4;
      box-sizing: border-box;
      background: #fff;
      span {
        display: inline-block;
        flex: 1;
        /*min-width: 33.33%;*/
        height: 46px;
        padding: 28px 0;
        white-space: nowrap;
        color: #A6A6A6;
        font-size: 26px;
        border: 1px solid transparent;

        &.active_type {
          position: relative;
          color: #3E3E3E;

          &:after {
            position: absolute;
            left: 50%;
            bottom: 25px;
            content: '';
            width: 80px;
            height: 5px;
            margin-left: -40px;
            background: #3E3E3E;
          }
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
        /*border: 1px solid transparent;*/

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
            padding: 32px 0 32px 60px;
          }

          .icon-recommend {
            position: absolute;
            top: 14px;
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
          }
        }

        .plan-price-wrap {
          flex: 1.5;

          .plan-price {
            padding: 32px 0;
            color: #fd720d;
            font-size: 36px;
            font-weight: 700;
          }

          .plan-sell-count {
            color: #3E3E3E;
            font-size: 24px;
          }
        }

        //当前选中样式
        &.activedPlan {
          /*border: 1px solid #F1B94C;*/
          box-shadow: 0 0 30px 0 #eae9e9;
          background-image: url("../../assets/imgs/mifi/plan_group/bg_test.png");
          background-size: cover;

          .plan-name {
            font-weight: 500;
          }

          .plan-name,
          .sub-plan-name,
          .plan-desc {
            color: #533606;
          }

          .selected-plan {
            position: absolute;
            right: 0;
            bottom: 0;
          }

          // rest vant-collapse
          .van-collapse-reset {
            .van-cell__title span,
            .van-cell__title + i {
              color: #533606 !important;
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
          background: transparent;
        }

        .van-cell:not(:last-child)::after {
          border: none;
        }
      }
    }

    .btn-recharge-wrap {
      position: relative;
      display: flex;
      padding-top: 55px;

      &.noDataHide {
        display: none;
      }
      .guardian {
        width: 100%;
        height: 55px;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space:nowrap;
        padding: 0 30px;
        box-sizing: border-box;
        #guardian {
          flex: .5;
        }
        span {
          flex: 1;
        }
        p {
          flex: 8;
          color: #6D4C41;
          font-weight: 500;
          overflow: hidden;//禁止内容溢出
          text-overflow: ellipsis;
        }
      }
      button {
        display: block;
        height: 100px;
        flex: 1;
        font-size: 26px;
        color: #868686;
        background: #fff;

        &:first-child {
          border-right: 1px solid #f4f4f4;
        }

        &:last-child {
          flex: 3;
          color: #fff;
          font-size: 32px;
          font-weight: 500;
          background: linear-gradient(60deg, rgba(251, 208, 116, 1), rgba(241, 185, 76, 1));
        }

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

    // 商家答疑
    .QA-wrapper {
      width: 94%;
      height: 190px;
      margin: 40px auto 0;
      padding: 29px 24px 0;
      box-sizing: border-box;
      border-radius: 26px;
      background-color: #fff;

      .title {
        display: flex;
        padding-bottom: 20px;

        span {
          &:first-child {
            font-size: 26px;
            color: #3E3E3E;
            font-weight: 500;
          }
        }
      }

      .QA-list {
        li {
          display: flex;
          padding: 10px 0;

          span {
            font-size: 24px;

            &:first-child {
              flex: 3;
              color: #3E3E3E;
              text-align: left;
            }

            &:last-child {
              flex: 1;
              color: #666;
              text-align: right;
            }
          }
        }
      }
    }

    .plan-no-user__height {
      height: calc(~ '100vh - 100px  - 140px');
    }

    .plan-has-user__height {
      height: calc(~ '100vh - 60px - 100px  - 175px');
    }

    .plan-app__height {
      height: calc(~ '100vh - 60px - 102px - 175px - 49px');
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

  }

</style>


