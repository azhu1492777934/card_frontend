<template>
  <div class="refund-applying-wrap">
    <div class="reason-wrapper">
      <van-radio-group
        v-model="radio"
        @change="radioChange"
      >
        <van-radio name="1" checked-color="#dca85f">停机无法使用</van-radio>
        <van-radio name="2" checked-color="#dca85f">无短信功能</van-radio>
        <van-radio name="3" checked-color="#dca85f">用量显示不准确</van-radio>
        <van-radio name="4" checked-color="#dca85f">服务态度不好/客服无应答</van-radio>
        <van-radio name="5" checked-color="#dca85f">其他</van-radio>
      </van-radio-group>
    </div>
    <ul>
      <transition name="fade">
        <li v-show="isOther">
          <span>其他原因</span>
          <input v-model="refundInfo.reason" placeholder="请输入其他退款原因" type="text">
        </li>
      </transition>
      <li v-show="isShowAccount">
        <span>支付宝账号</span>
        <input v-model="refundInfo.aliAccount" placeholder="请填写支付宝账号" type="text">
      </li>
      <li v-show="isShowAccount">
        <span>支付宝姓名</span>
        <input v-model="refundInfo.aliName" placeholder="请填写支付宝实名验证真实姓名" type="text">
      </li>
    </ul>

    <card-button @clickThrotle="btnRefund" :btnText="'提交申请'">
      <button @click="btnRefund" class="btn"></button>
    </card-button>


  </div>
</template>

<script>
  // @ is an alias to /src
  import {_post} from "../../http";
  import {getStorage} from "../../utilies";
  import {Notify, Popup, RadioGroup, Radio, Toast} from "vant";
  import cardButton from "../../components/button";
  import {mapState} from 'vuex'

  Toast.setDefaultOptions({
    position: 'top'
  });

  export default {
    name: "home",

    data() {
      return {
        radio: '1',
        order_id: getStorage('refundOrderId'),
        isOther: false,
        reasonArr: ['停机无法使用', '无短信功能', '用量显示不准确', '服务态度不好/客服无应答', '其他'],
        refundInfo: {
          brand: '',
          model: '',
          address: '',
          reason: '',
          aliAccount: '',
          aliName: '',
        },
        isShowAccount: false
      };
    },
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    components: {
      cardButton,
      [Notify.name]: Notify,
      [Popup.name]: Popup,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Toast.name]: Toast
    },
    created() {
      if (!this.authorizedUserInfo.account.user_id) {
        Toast({message: '请在微信或支付宝客户端查询'});
        return
      }

      if (getStorage('refundPayType') == 3) {
        this.isShowAccount = true
      }
    },
    methods: {
      radioChange(name) {
        if(name !== '5') this.refundInfo.reason = '';
        this.isOther = name === '5';
      },
      btnRefund() {
        let _this = this;

        if (this.radio === '5' && !this.refundInfo.reason) {
          Toast({message: '请输入退款原因'});
          return
        }

        if (this.isShowAccount) {
          if (!this.refundInfo.aliAccount) {
            Toast({message: '请填写支付宝账号'});
            return
          }
          if (!this.refundInfo.aliName) {
            Toast({message: '请填写支付宝实名验证真实姓名'});
            return
          }
        }

        _post('/api/v1/app/cards/refund', {
          order_id: this.order_id,
          device_brand: this.refundInfo.brand,
          device_model: this.refundInfo.model,
          use_address: this.refundInfo.address,
          refund_reason: this.radio === '5' ? this.refundInfo.reason : this.refund_reason[this.radio - 1],
          refund_account: this.refundInfo.aliAccount,
          refund_account_name: this.refundInfo.aliName,
          user_id: this.authorizedUserInfo.account.user_id
        }).then(res => {
          if (res.state === 1) {
            Notify({
              message: '退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候',
              background: '#60ce53'
            });
            setTimeout(function () {
              _this.$router.push({path: '/weixin/refund/index'});
            }, 1500)
          } else {
            Toast({message: res.msg})
          }
        })

      }//申请退款
    }
  };
</script>

<style lang="less">
  @import "../../assets/less/common";

  html, body, #app, .inner-wrap, .refund-applying-wrap {
    height: 100%;
    background-color: #f9fafc;
  }

  .refund-applying-wrap {

    .reason-wrapper {

      .van-radio {
        padding: 30px 15px;
      }

      span {
        font-size: 30px;
      }
    }

    ul {
      li {
        display: flex;
        padding: 30px 15px;
        font-size: 30px;
        background-color: #fff;
        box-sizing: border-box;

        span {
          flex: 2;
          color: #2c251d;
        }

        input {
          flex: 5;
          color: #595959;
        }

        &:nth-child(odd) {
          border-bottom: 1px solid #f5f5f5;
        }

        &:nth-child(2),
        &:nth-child(4) {
          margin-bottom: 40px;
        }
      }
    }

    .btn-wrap {
      position: absolute;
      width: 100%;
      bottom: 40px;

      button {
        width: 80%;
        margin: 60px auto 0;
        padding: 20px 0;
        font-size: 30px;
        background-color: #dca85f;
        color: #fff;
        border-radius: 10px;

      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

  }
</style>


