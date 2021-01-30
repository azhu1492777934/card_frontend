<template>
  <div class="cardInvoice" ref="cardInvoice" :style="{height: cardInvoiceHeigh}">
    <van-form>
      <div class="title">发票详情</div>

      <van-cell title="开票类型" title-class="van-field__label" value-class="van-field__value">
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" icon-size="18px">电子发票</van-radio>
          <!-- <van-radio name="2" icon-size="18px">专用发票</van-radio> -->
        </van-radio-group>
      </van-cell>

      <van-field
        v-model="invoiceHead"
        name="发票抬头"
        label="发票抬头"
        placeholder="请填写发票抬头"
      />
      <van-field
        v-model="invoiceCode"
        name="纳税识别号"
        label="纳税识别号"
        placeholder="请填写纳税识别号"
      />

      <div class="hr"></div>

      <van-field
        v-model="orderNo"
        name="充值单号"
        label="充值单号"
        readonly
      />
      <!-- <van-field
        v-model="orderMoney"
        name="订单金额"
        label="订单金额"
        readonly
      /> -->
      <!-- <van-field
        v-model="orderType"
        name="支付方式"
        label="支付方式"
        readonly
      /> -->
      <div class="title">接收方式</div>
      <van-field
        v-model="applyName"
        name="联系人"
        label="联系人"
        placeholder="请填写联系人"
        @click="resizeSroll($event)"
      />
      <van-field
        v-model="applyPhone"
        name="手机号码"
        label="手机号码"
        placeholder="请填写手机号码"
        @click="resizeSroll($event)"
        type="tel"
      />
      <van-field
        v-model="applyEmail"
        name="电子邮箱"
        label="电子邮箱"
        placeholder="请填写电子邮箱"
        @click="resizeSroll($event)"
      />
      <!-- <van-field
        v-model="areaData"
        @click="showArea=true"
        name="所在地区"
        label="所在地区"
        placeholder="请选择省市区街道"
        readonly
      />
      <van-field
        v-model="applyAreaData2"
        name="详细地址"
        label="详细地址"
        placeholder="请填写详细地址"
      /> -->

      <!-- <van-field
        v-show="showBank"
        v-model="applyBank"
        name="开户行"
        label="开户行"
        placeholder="请填写开户行"
      />
      <van-field
        v-show="showBank"
        v-model="applyBankNum"
        name="开户账户"
        label="开户账户"
        placeholder="请填写开户账户"
      /> -->

    </van-form>
    <div class="btnSubmit" ref="btnSubmit">
      <van-button :disabled="btnDisabled"  block type="info" native-type="submit" :color="btnColor" @click="invoiceApply()">
        提交
      </van-button>
    </div>

    <van-popup v-model="showArea" position="bottom" :overlay="true">
      <van-area :area-list="areaList" @cancel="showArea=false" />
    </van-popup>

    <van-dialog v-model="show" title="通知" :beforeClose="closedNotice">
      <p class="notice">春节期间该功能暂时关闭，给您带来的不便，请谅解。</p>
    </van-dialog>

  </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Cell, AddressEdit, Popup, Area, Button, Notify, Dialog  } from 'vant';
import areaList from "../../assets/js/areaData.js"
import { getStorage } from "../../utilies";
import { _post } from '../../http/index.js';
export default {
  name: 'card_invoice',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [AddressEdit.name]: AddressEdit,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Button.name]: Button,
    [Notify.name]: Notify,
  },
  data() {
    return {
      radio: '1',
      invoiceHead: '',
      invoiceCode: '',
      orderNo: '',
      orderMoney: '',
      orderType: '',
      applyName: '',
      applyPhone: '',
      applyEmail: '',

      areaData: '',
      applyAreaData2: '',

      applyBank: '',
      applyBankNum: '',

      areaList,
      showArea: false,

      cardInvoiceHeigh: '',
      btnDisabled: true,
      
      show: true,
    };
  },
  computed: {
    showBank() {
      return this.radio == 1
    },
    btnColor() {
      if (this.invoiceHead && this.applyName && this.applyPhone && this.applyEmail){
        this.btnDisabled = false
        return '#1989fa'
      } else {
        this.btnDisabled = true
        return '#E0E0E0'
      }
    }
  },
  created() {
    this.initial();
  },
  mounted() {

  },
  methods: {
    closedNotice(action, done) {
      done();
      this.$router.go(-1)
      // history.go(-1)
    },
    initial() {
      if (!this.$route.params.order) {
        Notify({
          message: '充值订单丢失，即将返回'
        })
        setTimeout( () => {
          history.go(-1)
        }, 2000)
    
        return
      }
      let order = this.$route.params.order
      this.orderNo = order.no
    },
    resizeSroll(e) {
      const _this = this
      const innerHeight = window.innerHeight
      let H_btnSubmit = this.$refs.btnSubmit.offsetHeight
      let H_cardInvoice = this.$refs.cardInvoice.clientHeight
      
      window.onresize = function () {
        const newInnerHeight = window.innerHeight;
        _this.$refs.cardInvoice.style.height = H_cardInvoice + Math.abs(newInnerHeight-e.y) + H_btnSubmit + 'px'
  
        if (innerHeight > newInnerHeight &&(Math.abs(newInnerHeight-e.y) + H_btnSubmit) < 200) {
          // 键盘弹出事件处理
          window.scroll(0,  Math.abs(newInnerHeight-e.y) + H_btnSubmit)
        } else {
          // 键盘收起事件处理
          window.scroll(0, 0)
          _this.$refs.cardInvoice.style.height = H_cardInvoice + 'px'
        }
        

      }
    },
    invoiceApply() {
      if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.applyPhone)) {
        Notify({message: "请填写正确的手机号码"})
        return false
      }
      if (!( /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(this.applyEmail)) {
        Notify({message: "请填写正确的邮箱"})
        return false
      }
      let userInfo = getStorage("userInfo", "obj")
      let params = {
        ordernum: this.orderNo,
        contacts: this.applyName.replace(/\s+/g,''),
        telphone: this.applyPhone,
        address: this.applyEmail.replace(/\s+/g,''),
        inv_head: this.invoiceHead.replace(/\s+/g,''),
        inv_ident_num: this.invoiceCode.replace(/\s+/g,''),
        user_id: userInfo?userInfo.account.user_id: 0
      }
      _post('/api/v1/app/orders/invoice_submits', {
        ...params
      }).then( (res) => {
        if (res.state == 1) {
          Notify({
            message: '申请成功，我司将在1~3个工作日内把电子发票发送您的邮箱',
            background: '#4CAF50'
          })
          this.applyName = ''
          this.applyPhone = ''
          this.applyEmail = ''
          this.invoiceHead = ''
          this.invoiceCode = ''
        } else {
          Notify({
            message: res.msg
          })
        }
      })

    }
  }

}
</script>

<style lang="less" scoped>
  .cardInvoice {
    width: 100%;
    // height: 100%;
    // position: relative;
    .title {
      width: 100%;
      height: 55px;
      background: #E0E0E0;
      text-align: left;
      padding: 0 30px;
      font-size: 26px;
      letter-spacing: 2px;
      color: #9E9E9E;
      line-height: 55px;
      box-sizing: border-box;
      position: relative;
    }
    .hr {
      margin: 0;
      height: 8px;
      background: #E0E0E0;
    }
    .btnSubmit{
      width: 100%;
      padding: 16px 76px;
      position: fixed; 
      background: #fff;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
    }
    .notice {
      padding: 20px 40px;
      font-size: 0.38rem;
      line-height: 0.5rem;
    }
  }
  .van-address-edit {
    padding: 0!important;
  }
</style>