<template>
  <div class="recharge-success-wrap">
    <p class="recharge-success">
      <img class="icon-success" src="../../assets/imgs/recharge_success/icon-recharge_20181001.svg" alt=""><br>支付成功!
    </p>
    <div class="oneMsg" v-if="planInfo.vip_type_id!=0&&global_variables.device!='iphone'&&client_type!='app'">购买成功，兑换码已发放到您的手机号啦，请在7天内进行兑换。</div>

    <!-- <img class="success-banner" src="../../assets/imgs/recharge_success/recharge_callback_20181126.jpg" alt=""> -->
    <span class="btn_to_lottery">({{time}}S后跳转) </span>
    <!-- <span id="jump_plan" @click="to_another_way('card')" class="btn_to_plan">跳过</span> -->
  </div>
</template>

<style lang="less">
  html, body, #app {
    height: 100%;
  }

  .recharge-success-wrap {
    background-color: #ececec;
    text-align: center;
    width: 100%;
    min-height: 100%;
    background-image: linear-gradient(135deg, rgb(81, 151, 241) 5%, rgba(77, 176, 241, 0.2) 100%);

    .success-banner {
      display: block;
      width: 100%;
      height: auto;
    }

    .oneMsg {
      font-size: 28px;
      padding: 0 30px;
    }

    .recharge-success {
      padding: 80px 0;
      font-size: 36px;
      letter-spacing: 2px;
      color: #fff;

      .icon-success {
        width: 81px;
        height: 81px;
      }
    }

    .btn_to_lottery {
      display: block;
      width: 98%;
      height: 96px;
      margin: 120px auto 55px;
      font-size: 40px;
      line-height: 96px;
      color: #fff;
      background-color: #da5655;
      text-decoration: none;
      text-align: center;
    }

    .btn_to_plan {
      display: inline-block;
      position: relative;
      color: #da5655;
      font-size: 32px;
      text-decoration: none;
    }
  }


</style>

<script>
  // @ is an alias to /src
  import {checkBrowser, getStorage, removeStorage,appRate} from "../../utilies";

  export default {
    name: "recharge_success",

    data() {
      return {
        iccid: '',
        time: 5,
        client_type: checkBrowser(),
        planInfo: getStorage('planInfo', 'obj') || {},//当前充值套餐信息
        realnameType: getStorage('realnameType') || 0,
      }
    },
    created() {

      appRate(7);
      removeStorage('plan_list_new_card');
      removeStorage('hasValidatedPlan');// remove more net flowing mark
      let _this = this;
      let timer = setInterval(() => {
        if (_this.time > 0) {
          _this.time--;
        } else {
          clearInterval(timer);
          if (this.$route.query.balance) {
            _this.$router.push('/weixin/card/plan_list');
          }
          _this.global_variables.packed_project === 'mifi' ? _this.$router.push({path: '/mifi/card/index'}) : _this.$router.push({path: '/weixin/card/usage'})
        }
      }, 1000)
    },
    methods: {
      to_another_way: function (location) {
        if (location === 'card') {
          if (localStorage.getItem("currentType") === "esim") {
            this.$router.push({path: '/weixin/card/esim_usage'})
          } else {
            this.$router.push({path: '/weixin/card/usage'})
          }
        } else {
          location.href = 'http://wxgame.china-m2m.com/common/home';
        }
      }
    }
  };
</script>

