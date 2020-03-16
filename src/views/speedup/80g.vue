<template>
  <div class="speedup-wrap-parent">
    <speedup :list="list" @rechargeSpeedup="recharge_80"></speedup>
    <!--app支付-->
    <app-pay :appPay="speedupAppPay"
             @changeAppPayType="changePayType80"
             @closeAppPayType="closePayType80"
             @finalAppPay="finalAppPay80"
    >

    </app-pay>

    <van-popup :close-on-click-overlay="false" v-model="recharge_speedup_wrapper">
      <p class="showTip">{{recharge_speedup_msg}}</p>
    </van-popup>
  </div>
</template>

<style lang="less">
  .speedup-wrap-parent, .speedup-wrap {
    height: 90%;
    
  }
</style>

<script>
  // @ is an alias to /src
  import {Notify, Popup} from 'vant'
  import {_post} from "../../http";
  import {getStorage, checkBrowser} from "../../utilies";

  export default {
    name: "home",
    components: {
      [Popup.name]: Popup,
      speedup: () => import('../../components/speedup/index'),
      appPay: () => import('../../components/common/appPay'),
    },
    data() {
      return {
        rechargeListIndex: 0,
        userInfo: '',
        open_id: '',
        iccid: '',
        client_type: checkBrowser(),
        list: [
        //   {
        //   name: '30G加速包',
        //   flow: 30,
        //   price: 50.00,
        //   rating_id: '2870'
        // }, {
        //   name: '5G加速包',
        //   flow: 5,
        //   price: 9.50,
        //   rating_id: '2533'
        // }
        {
          name: '10G加速包',
          flow: 1,
          price: 29.0,
          rating_id: '52918'
        },{
          name: '20G加速包',
          flow: 1,
          price: 39.0,
          rating_id: '52919'
        },
        {
          name: '30G加速包',
          flow: 1,
          price: 49.0,
          rating_id: '53231'
        }
        ],
        speedupAppPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
        recharge_speedup_wrapper: false,
        recharge_speedup_msg: '创建订单中',
      }
    },
    created() {
      if (getStorage('userInfo', 'obj')) {
        this.userInfo = getStorage('userInfo', 'obj');
      }

      if (getStorage('decrypt_data', 'obj')) {
        this.open_id = getStorage('decrypt_data', 'obj').openid
      }

      if (getStorage('check_iccid')) {
        this.iccid = getStorage('check_iccid');
      } else {
        this.global_variables.packed_project === 'mifi' ? this.$router.push({path: '/mifi/card/lookup'}) : this.$router.push({path: '/weixin/card/lookup'});
      }
    },
    methods: {
      changePayType80(type) {
        if (type) {
          this.speedupAppPay.type = true
        } else {
          this.speedupAppPay.type = false
        }
      },
      closePayType80() {

        this.speedupAppPay.type = true;
        this.speedupAppPay.show = false
      },
      finalAppPay80() {

        this.trulyRechargeSpeedup(this.rechargeListIndex);
      },
      trulyRechargeSpeedup(speedupIndex) {

        if (!this.userInfo) {
          Notify({message: '请在支付宝或微信环境中充值'});
          return
        }

        if (this.client_type === 'app') {
          this.speedupAppPay.show = false;
        }//重置重置弹窗

        this.recharge_speedup_wrapper = true;//创建订单提醒

        var param = {
          status: 0,
          iccid: this.iccid,
          rating_id: this.list[speedupIndex].rating_id,
          recharge_price: this.list[speedupIndex].price,
          price: this.list[speedupIndex].price,
          user_id: this.userInfo.account.user_id,
          open_id: this.open_id,
          env: this.client_type
        };

        if (this.client_type === 'app') {
          if (this.speedupAppPay.type) {
            param.pay_type = 'WEIXIN'
          } else {
            param.pay_type = 'ALIPAY'
          }
          param.open_id = this.userInfo.account.user_id;//app修改openid参数
        } else if (this.client_type === 'wechat') {
          param.pay_type = 'WEIXIN'
        } else if (this.client_type === 'alipay') {
          param.pay_type = 'ALIPAY'
        }

        this.global_variables.packed_project === 'mifi' ? param.type = 1 : param.type = 0;
        let payDom = document.querySelector('form');
        if (payDom) document.removeChild(payDom);
        _post('/api/v1/pay/weixin/create', param).then(res => {
          if (res.state === 1) {
            if (/<[^>]+>/.test(res.data)) {
              // document.write(res.data);
              const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);
              document.forms['Ordersubmit'].submit();
            } else if (res.data && Object.prototype.toString.call(res.data) === '[object String]' && res.data.substr(0, 4) === 'http') { //app
              location.href = res.data
            }
          } else {
            this.recharge_speedup_wrapper = false;
            Notify({message: res.msg})
          }
        })
      },
      recharge_80(speedupIndex) {
        /*
        * speedupIndex:当前选中的加速包的index
        * */
        this.rechargeListIndex = speedupIndex;

        if (this.client_type === 'app') {
          this.speedupAppPay.show = true;
        } else if (this.client_type === 'wechat' || this.client_type === 'alipay') {
          this.trulyRechargeSpeedup(speedupIndex)
        } else {
          Notify({message: '请在支付宝或微信客户端充值'});
        }
      }
    }
  };
</script>

