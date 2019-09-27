<template>
  <div class="plan-wrap">
    <div class="van-swipe-wrap" ref="vanSwiperWwrap">
      <div v-for="(item,index) in plan_list" v-bind:key="index">

        <div class="plan-type-name" v-if="index==='0'">{{plan_type_name[0]}}</div>
        <div class="plan-type-name" v-if="index==='1'">{{plan_type_name[1]}}</div>
        <div class="plan-type-name" v-if="index==='100'&&plan_list[100]">{{'加油包'}}</div>
        <div class="plan-type-name" v-if="index==='5'">{{plan_type_name[5]}}</div>
        <div class="plan-type-name" v-if="index==='6'">{{plan_type_name[6]}}</div>

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
              <div slot="reference" class="centerBox">
                <div class="contentWord1">{{item_inner.name}}</div>
                <div class="contentWord2"></div>
                <div class="contentWord3">
                  <p>￥{{ item_inner.price }}</p>
                  <del>￥{{ item_inner.market_price }}</del>
                </div>
                <p :class="{'plan-icon-recommend':item_inner.is_recommend}" class="plan-name">
                  <span v-if="item_inner.is_recommend" class="iconfont icon-recommend"></span>
                </p>
                <div class="gift" v-if="item_inner.image_url">
                  <img :src="item_inner.image_url" alt="">
                </div>
              </div>

            </el-popover>
          </div>

          <div v-if="index==='100'&&plan_list[100]" class="warning-wrapper">
            <p>加油包暂不支持退款请慎重选择</p>
            <p>加油包有效期和指定套餐有效期相同</p>
            <p>月套餐充值加油包仅当月有效</p>
            <p>加油包需充值到指定套餐中方可使用</p>
          </div>

        </div>
      </div>
    </div>

    <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
      <button @click="recharge">{{recharge_btn_text}}</button>
      <router-link to="/weixin/coupon/index">卡券兑换</router-link>
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
  import {Toast, Popup, Notify, List} from "vant";
  import {setStorage, getStorage, checkBrowser, Today, lossRate} from "../../utilies";
  import {_get, _post} from "../../http";
  // @ is an alias to /src
  export default {
    name: "home",

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
          6: "超量自动续费套餐"
        },// 套餐名称
        cur_plan_type_index: 0, //当前选中套餐类型
        choose_plan_index: 0, //当前选中套餐
        plan_list: {},
        hasValidatedPlan: getStorage('hasValidatedPlan'),
        rechargeShow: false,
        ref_plan_type_index: 0,
        firstStatus: false,
      };
    },
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [List.name]: List,
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

      _get("/api/v1/app/plan_list", {
        iccid: getStorage("check_iccid")
      }).then(res => {
        if (res.state === 1) {
          if (JSON.stringify(res.data) === "{}") {
            this.load_plan_list = true;
            this.load_plan_msg = "此卡暂无套餐";
            return;
          }
          this.load_plan_msg = res.msg;
          this.load_plan_list = false;
          this.plan_list = res.data;
          for (let item in this.plan_list) {
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
            newArray1.sort(this.compare2("price"));
            newArray2.sort(this.compare2("price"));
            newArray3 = newArray1.concat(newArray2);
            this.plan_list[item] = newArray3;
            this.plan_type.push(item);
          }

          // 处理加油包
          if (!this.hasValidatedPlan) {
            this.plan_list[2] = null;
          } else {
            let more_flow_list = this.plan_list[2];
            if (more_flow_list.length) {
              delete this.plan_list[2];
              this.plan_list[100] = more_flow_list
            }
          }

          this.$nextTick(() => {
            let clientHeight = document.documentElement.clientHeight ||
              document.body.clientHeight,
              refPlanButton = this.$refs.refPlanButton.offsetHeight,
              userHeight = getStorage("userHeight") || 44;
            if (this.client_type === "wechat" || this.client_type === "alipay") {
              this.$refs.vanSwiperWwrap.style.height =
                clientHeight - refPlanButton - userHeight + "px";
            } else {
              this.$refs.vanSwiperWwrap.style.height =
                clientHeight - refPlanButton - userHeight + "px";
            }
          });

          //防止第一次加载气泡提示框显示错误的问题
          setTimeout(function () {
            _this.firstStatus = true;
          }, 100);

          //放底部
          for (let i in res.data) {
            this.choose_plan_index = res.data[i][0].id;
            this.ref_plan_type_index = i;
            return this.choose_plan_index;
          }
        } else {
          this.load_plan_list = true;
          this.load_plan_msg = res.msg;
        }
      });
    },
    mounted() {
    },
    methods: {
      choosePlanClick: function (id, index) {
        this.ref_plan_type_index = index;
        this.choose_plan_index = id;
        index === '2' ? this.recharge_btn_text = '选择叠加加油包套餐' : this.recharge_btn_text = '充值';
      },
      recharge: function () {
        let planInfo = null;
        for (let i = 0; i < this.plan_list[this.ref_plan_type_index].length; i++) {
          if (this.choose_plan_index == this.plan_list[this.ref_plan_type_index][i].id) {
            planInfo = this.plan_list[this.ref_plan_type_index][i];
          }
        }
        if (planInfo.surplus_times <= 0) {
          Toast("此套餐已售罄, 请更换套餐");
          return;
        }

        planInfo.iccid = getStorage("check_iccid");
        setStorage("planInfo", planInfo, "obj");

        // 加油包套餐充值
        if (this.ref_plan_type_index === '100') {
          this.$router.push('/weixin/card/more_flow');
          return;
        }
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
            Notify({message: res.msg});
          }
        });
      },
      //直接充值
      directRecharge(planInfo) {
        if (this.client_type !== "alipay" && this.client_type !== "wechat") {
          Notify({message: "请在微信或支付宝客户端充值"});
          return;
        }
        let _this = this;
        let param = {
          status: 0,
          recharge_price: planInfo.price,
          price: planInfo.price,
          iccid: planInfo.iccid || getStorage("check_iccid"),
          rating_id: planInfo.id,
          user_id: getStorage("userInfo", "obj").account.user_id,
          env: this.client_type,
          start_time: Today(),
          type: 0,
          recharge_type: this.global_variables.packed_project === 'mifi' ? 1 : 0,
        };

        if (this.client_type === "alipay" || this.client_type === "wechat") param.open_id = getStorage("decrypt_data", "obj").openid;
        if (this.client_type === "app") param.open_id = getStorage("userInfo", "obj").account.user_id;
        if (this.client_type === "wechat") param.pay_type = "WEIXIN";
        if (this.client_type === "alipay") param.pay_type = "ALIPAY";
        if (this.client_type === "app") {
          this.appPay.type ? param.pay_type = "WEIXIN" : param.pay_type = "ALIPAY";
        }

        this.rechargeShow = true;
        _post("/api/v1/pay/weixin/create", param).then(res => {
          if (getStorage('plan_list_new_card') === "1") {
            lossRate({
              type: 5,
              iccid: getStorage("check_iccid")
            });
          }
          if (res.state === 1) {
            this.rechargeShow = false;
            let payDom = document.querySelector('form');
            if (payDom) document.removeChild(payDom);
            if (/<[^>]+>/.test(res.data)) {
              const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);
              document.forms[0].submit();
            } else if (res.data && Object.prototype.toString.call(res.data) === "[object String]" && res.data.substr(0, 4) === "http") {
              //app
              this.global_variables.packed_project === "mifi" ?
                (location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index`) :
                (location.href = res.data);
            } else {
              Notify({
                message: "充值成功",
                background: "#60ce53"
              });
              setTimeout(function () {
                if (localStorage.getItem("currentType") === "esim") {
                  location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                } else {
                  _this.global_variables.packed_project === "mifi" ?
                    (location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index`) :
                    (location.href = res.data.return_url);
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
      //排序
      compare(pro) {
        return function (obj) {
          let val = obj[pro];
          if (val == true) {
            return -1;
          } else if (val == false) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      //排序2
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

  .el-popover {
    font-size: 24px !important;
  }

  .plan-wrap {
    .van-swipe-wrap {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .m-t-0 {
      margin-top: 0 !important;
    }

    .plan-type-name {
      display: flex;
      height: 55px;
      margin-bottom: 10px;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      color: #f1a53c;
      background: rgba(255, 251, 243, 1);

      &::before, &::after {
        display: block;
        width: 129px;
        height: 8px;
        content: '';
        background-size: 100% 100% !important;
      }

      &::before {
        margin-right: 24px;
        background: url("../../assets/imgs/card/usage/leftIcon.png") no-repeat;
      }

      &::after {
        margin-left: 24px;
        background: url("../../assets/imgs/card/usage/rightIcon.png") no-repeat;
      }
    }

    .planContent {
      display: flex;
      width: 100%;
      flex-flow: row wrap;
      align-content: flex-start;
      padding: 0 20px;
      box-sizing: border-box;

      .plan-icon-recommend {
        text-align: left;
        position: absolute;
        bottom: 4px;
        left: 8px;
      }

      .iconfont {
        font-size: 38px;
      }

      .centerBox {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;

        .gift {
          position: absolute;
          top: -35px;
          right: -20px;

          > img {
            width: 40px;
            height: 40px;
          }
        }
      }

      > div {
        border: 2px solid rgba(230, 230, 230, 1);
        border-radius: 13px;
        padding: 10px;
        margin: 10px;
        box-sizing: border-box;
        flex: 0 0 30%;
        position: relative;

        .contentWord1 {
          font-size: 24px;
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

      // 加油提示
      .warning-wrapper {
        flex: auto;
        border: none;

        p {
          color: #654828;
          font-size: 26px;
          line-height: 1.5;
          text-align: left;

          &:first-child {
            color: #ff3448;
            font-size: 28px;
          }

          &:before {
            content: "*";
            color: #ff4e35;
          }
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


