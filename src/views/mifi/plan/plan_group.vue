<template>
  <div class="plan-group-wrapper">

    <div ref="refPLanTitle" class="plan-type-wrap">
      <div class="plan-type-inner-wrap">
        <span
          ref="ref_plan_type"
          @click="handleConfirm(item)"
          v-for="(item,index) in columns[0].values" v-bind:key="index"
          :class="{'active_type':item.keyId==cur_plan_type_index}">{{item.text}}
        </span>
      </div>
    </div>

    <div ref="planList" class="group-list-wrap">
      <ul v-show="JSON.stringify(group_list)!='[]'" class="plan-list-wrap" id="plan-list-wrap" ref="innerPlanList">
        <li @click="choosePlanClick(inner_index)" v-for="(inner_item,inner_index) in group_list"
            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
          <div class="plan-info-wrap">

            <p class="plan-name">
              {{ inner_item.name }}
            </p>
            <div class="plan-label"></div>
            <p class="plan-limited-wrap">
              <span class="limited-num" v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
              <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}个ELB</span>
            </p>

            <!-- <p class="plan-desc">
              {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''}}
            </p> -->
            <van-collapse
              :border="false"
              class="van-collapse-reset"
               v-model="activeNames"
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
            <!-- <p class="plan-desc">
              {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''}}
            </p> -->
          </div>

          <div class="plan-price-wrap">
            <p>￥{{ inner_item.price }}</p>
            <p>￥{{ inner_item.market_price }}</p>
          </div>

          <img v-if="inner_item.is_recommend" class="recommend"
               src="../../../assets/imgs/mifi/plan_group/icon_recommend.png" alt=""><!--推荐-->
          <span class="icon-sell-done" v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span>
          <!--售罄-->
          <span v-if="inner_item.vip_type_id!=0" class="youku"></span>   <!--优酷活动-->
        </li>

      </ul>

      <div v-if="showNoData">
        <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="">
      </div>

    </div>

    <div ref="btnRechargeWrap" class="btn-recharge-wrap">
      <button :class="{'noDataHide':JSON.stringify(group_list) == '[]'}" @click="recharge">前往充值</button>
    </div>

    <van-popup :close-on-click-overlay="false" v-model="rechargeShow">
      <p class="showTip">创建订单中,请等候</p>
    </van-popup><!--创建订单-->

    <van-popup
      v-model="picker.showPlanSelect"
      position="bottom"
      :overlay="true"
      :lock-scroll="true"
      :lazy-render="true"
      :close-on-click-overlay="true"
      :loading="picker.loading">
      <van-picker
        ref="picker"
        show-toolbar title="套餐选择"
        :columns="columns"
        @confirm="handleConfirm"
        @cancel="handleCancel">
      </van-picker>
    </van-popup><!--套餐喧闹着-->

    <van-popup :close-on-click-overlay="false" v-model="appPay.show" class="border-radius-10">
      <div class="appContext-pay-wrap">
        <div class="title">
          支付方式选择
        </div>
        <div class="content">
          <p @click="changePayType(1)" :class="{'choose_type':appPay.type}">微信支付</p>
          <p @click="changePayType(0)" :class="{'choose_type':!appPay.type}">支付宝支付</p>
        </div>
        <div class="footer">
          <button @click="closePayType">取消</button>
          <button @click="FinalAppPay">确定</button>
        </div>
      </div>
    </van-popup><!--app支付选择-->

    <!--套餐生效时间-->
    <van-dialog
      v-model="showDateDialog"
      title="套餐生效时间"
      show-cancel-button
      @confirm="dateDialogConfirm"
      message-align="left"
    >
      <van-radio-group
        v-model="radio"
      >
        <div class="choose-date-wrapper">
          <van-radio name="1">立即生效</van-radio>
          <van-radio name="2" @click="showChooseDate">
            <p class="text-left">自定义套餐生效时间</p>
            <input v-model="valDate" class="date-val-wrapper" readonly placeholder="请选择生效时间" type="text">
          </van-radio>
        </div>


      </van-radio-group>

    </van-dialog>

    <van-popup
      v-model="showDate"
      position="bottom"
      :overlay="true"
      :lock-scroll="true"
      :lazy-render="true"
      :close-on-click-overlay="true"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="dateFormatter"
        @confirm="dateConfirm"
        @cancel="dateCancel"
      >
      </van-datetime-picker>
    </van-popup>

  </div>
</template>

<script>
  import {_get} from "../../../http";
  import {getStorage, setStorage, checkBrowser} from "../../../utilies";
  import {Popup, Toast, Notify, Dialog,RadioGroup, Radio,DatetimePicker, Collapse, CollapseItem} from 'vant'
  import {_post} from "../../../http";
  import {mapState} from 'vuex'
  
  export default {
    name: "plan_group",
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    data() {
      return {
        activeNames: [],
        rechargeShow: false,
        appPay: {
          show: false,
          type: true,//true 为微信，false 为支付宝
        },
        cur_plan_group_name: '请选择套餐',
        client_type: checkBrowser(),
        showNoData: false,
        iccid: getStorage('check_iccid'),
        group_list: [],
        choose_plan_index: 0,
        picker: {
          showPlanSelect: false, // 套餐选择
          loading: true,
          choose_plan_id: '', // 当前选中的套餐组
          choose_type: '' // 当前选中的套餐类型
        },
        scroll: null,
        columns: [
          {
            values: [],//套餐组
          },
        ],
        planName: ["累计套餐", "优质月套餐", "加油包", "加速包", "国际套餐", "合家欢土豪包", "超量自动充值套餐","活动优惠"],
        //合家欢土豪包 => 周期性套餐  优质月套餐 => 月套餐
        totalPlan: [],
        cur_plan_type_index: 0,
        scrollTop: 0,
        // 套餐生效时间
        // 选择套餐生效时间
        showDateDialog: false,
        radio: '1',
        showDate: false,
        valDate: this.getToday(),
        minDate: new Date(),
        maxDate: new Date(this.getEndDate().endYear, this.getEndDate().endMonth, this.getEndDate().endDay),
        currentDate: new Date(),
        advertisement: 'https://interaction.clotfun.online/horse', // 广告链接
      }
    },
    components: {
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [DatetimePicker.name]: DatetimePicker,
    },
    created() {
      this.iccid ? this.initial({}) : this.$router.push({path: '/mifi/card/lookup'});
    },
    methods: {
      initial() {
        this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
        this.$store.commit('mifiCommon/changeErrStatus', {show: false});
        this.choose_plan_index = 0;
        _get('/api/v1/app/plan_list', {
          iccid: this.iccid,
        }).then(res => {
          this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
          this.picker.loading = false;
          if (res.state === 1) {
            if (JSON.stringify(res.data) !== "{}") {
              this.totalPlan = {};
              for (let item in res.data) {
                if(res.data[item].length === 1){
                  this.totalPlan[item] = res.data[item]
                }else{
                  let newArray1 = [], newArray2 = [];
                  newArray1 = res.data[item].filter(item=>item.is_recommend).sort(this.compare2('id'));
                  newArray2 = res.data[item].filter(item=>!item.is_recommend).sort(this.compare2('id'));
                  this.totalPlan[item] = newArray1.concat(newArray2);
                }
              }
              
   

              for (let item in this.totalPlan) {
                //前置 周期性套餐
                if (item == 5) {
                  this.columns[0].values.unshift({
                    'keyId': item,
                    'text': this.planName[item]
                  })
                } else {
                  this.columns[0].values.push({
                    'keyId': item,
                    'text': this.planName[item]
                  })
                }
              }

              if (this.columns[0].values.length > 0) {
                if (this.cur_plan_group_name === '请选择套餐') {
                  this.cur_plan_group_name = this.columns[0].values[0].text;
                }
              }

              this.$nextTick(() => {
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                  refBanner = this.$refs.refPLanTitle.offsetHeight,
                  refTitle = this.$refs.btnRechargeWrap.offsetHeight;
                this.$refs.planList.style.height = (clientHeight - refBanner - refTitle) + 'px'
              });


              for (let i in this.totalPlan) {
                this.group_list = this.totalPlan[i];
                this.group_list.length ? this.showNoData = false : this.showNoData = true;
                
                //前置 周期性套餐
                if (this.columns[0].values.some((item => {
                  return item.keyId == 5
                }))) {
                  this.cur_plan_type_index = 5;
                  this.group_list = this.totalPlan[5];
                }else {
                  this.cur_plan_type_index = i;
                }

                this.activeNames.push(this.group_list[0].id)
                return this.group_list;
              }




 

            } else {
              this.$store.commit('mifiCommon/changeErrStatus', {
                show: true,
                errorMsg: res.msg ? res.msg : '此卡暂无充值套餐，请联系客服人员及时处理'
              })
            }
          } else {
            this.$store.commit('mifiCommon/changeErrStatus', {
              show: true,
              errorMsg: res.msg ? res.msg : '获取数据失败，请稍后再试'
            })
          }
        })
      }, // 获取套餐组数据
      choosePlanClick: function (index) {
        this.choose_plan_index = index;
      },
      // 套餐生效时间
      dateDialogConfirm(){
        this.finallyRecharge();
      },
      showChooseDate() {
        this.showDate = true;
      },
      dateConfirm(value) {
        this.valDate = this.getToday(value);
        this.showDate = false;
      },
      dateCancel() {
        this.showDate = false;
      },
      getEndDate() {
        let date = new Date();
        date.setDate(date.getDate() + 90);
        let end_month = date.getMonth() + 1,
          end_date = date.getDate(),
          end_year = date.getFullYear();
        if (end_month < 10) {
          end_month = '0' + end_month
        }
        if (end_date < 10) {
          end_date = '0' + end_date
        }
        return {
          endDay: end_date,
          endMonth: end_month - 1,
          endYear: end_year
        }
      },
      dateFormatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value;
      },
      // end 套餐生效时间
      showPLanDetail() {
        this.picker.showPlanSelect = true;

        if (this.picker.choose_plan_id) {
          this.$nextTick(() => {
            this.$refs.picker.setColumnValue(0, this.picker.choose_plan_id);
            this.$refs.picker.setColumnValue(1, this.picker.choose_type);
          });
        } else {
          this.$nextTick(() => {
            this.$refs.picker.setColumnIndex(0, 0);
            this.$refs.picker.setColumnIndex(1, 0);
          });
        }
      },
      handleConfirm(value) {
        this.picker.choose_plan_id = value.keyId;
        this.cur_plan_type_index = value.keyId;
        this.choose_plan_index = 0;
        this.picker.showPlanSelect = false;
        this.cur_plan_group_name = value.text;
        this.group_list = this.totalPlan[this.picker.choose_plan_id];
        this.activeNames = [] // 套餐简介折叠
        this.activeNames.push(this.group_list[0].id)
        this.backTop();
      },
      backTop() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5);
          that.$refs.innerPlanList.scrollTop = that.scrollTop + ispeed;
          if (that.scrollTop == 0) {
            clearInterval(timer)
          }
        }, 16)

      },
      handleCancel() {
        this.picker.showPlanSelect = false;
      },
      recharge() {

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
          cur_date = new Date().getDate();

          planInfo = this.group_list[this.choose_plan_index];
          if (planInfo.surplus_times <= 0) {
            Toast({
              message: "此套餐已售罄, 请更换套餐",
              position: 'top',
            });
            return;
          }

          planInfo.iccid = getStorage("check_iccid");
          setStorage("planInfo", planInfo, "obj");
          
          // 加油包套餐充值
          if (planInfo.type == '2') {
            this.$router.push({
              path:"/weixin/card/more_flow",
            });
            return;
          }

          if (planInfo.type == 1 && planInfo.day <= 30 && cur_date >= 20 && cur_date <= 26) {
            Dialog.confirm({
              title: '温馨提示',
              message: '您购买的套餐将在本月26号清零。'
            }).then(() => {
              this.showDateDialog = true;
            })
          } else {
            this.showDateDialog = true;
          }
        } catch (err) {
          Toast({
            position: 'top',
            message: err.message
          })
        }
      },
      getToday: function (val) {
        let date = new Date();
        if (val) {
          date = new Date(val);
        }
        let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        return year + '-' + month + '-' + day
      },
      changePayType(type) {
        if (type) {
          this.appPay.type = true
        } else {
          this.appPay.type = false
        }
      },
      closePayType() {
        this.appPay.type = true;
        this.appPay.show = false
      },
      FinalAppPay() {
        this.showDateDialog = true;
      },//app支付
      finallyRecharge(){
        try {
          let planInfo = getStorage('planInfo','obj');
          let userInfo = getStorage('userInfo', 'obj');
          let param = {
            status: 0,
            iccid: this.iccid,
            rating_id: planInfo.id,
            price: planInfo.price,
            recharge_price: planInfo.price,
            user_id: userInfo.account.user_id,
            env: this.client_type,
            start_time: this.valDate,
            type: 1,
            failed_page: window.location.href,
            success_page: this.global_variables.packed_project === 'mifi'? this.advertisement : `${window.location.protocol}//${window.location.host}/weixin/card/usage`,
            //  mifiserve `${window.location.protocol}//${window.location.host}/mifi/card/index`
            //  cardserve `${window.location.protocol}//${window.location.host}/weixin/card/usage`,
            recharge_type: 2,
            channel_id: 9,
            wx_id: userInfo.account.user_id,
          };

          if (this.client_type === 'alipay' || this.client_type === 'wechat') param.open_id = (getStorage('decrypt_data', 'obj') || {}).openid;
          if (this.client_type === 'app') param.open_id = userInfo.account.user_id;
          if (this.client_type === 'wechat') param.pay_type = 'WEIXIN';
          if (this.client_type === 'alipay') param.pay_type = 'ALIPAY';
          // this.global_variables.packed_project === 'mifi' ? param.recharge_type = 1 : param.recharge_type = 0;
          this.rechargeShow = false;
          let payDom = document.querySelector('form');
          if (payDom) document.removeChild(payDom);
          _post('/api/v1/pay/weixin/create', param)
            .then(res => {
              if (res.state === 1) {
                this.rechargeShow = false;
                if (/<[^>]+>/.test(res.data)) {
                  const div = document.createElement('div');
                  div.innerHTML = res.data;
                  document.body.appendChild(div);
                  document.forms[0].submit();
                } else if (res.data && Object.prototype.toString.call(res.data) === '[object String]' && res.data.substr(0, 4) === 'http') { //app
                  this.global_variables.packed_project === 'mifi' ?
                    location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data;
                } else {
                  Notify({
                    message: '充值成功',
                    background: '#60ce53'
                  });
                  setTimeout(function () {
                    if (localStorage.getItem("currentType") === "esim") {
                      location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                    } else {
                      _this.global_variables.packed_project === 'mifi' ?
                        location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data.return_url
                    }
                  }, 1500);
                }//纯钻石支付
              } else {
                this.rechargeShow = false;
                Notify({
                  message: res.msg
                })
              }
            })
        } catch (err) {
          Toast({
            position: 'top',
            message: err.message
          })
        }
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
      handleScroll() {
        this.scrollTop = this.$refs.innerPlanList.scrollTop;
      },
      sortPlan(plan) {

        for( var i=0;i<plan.length;i++){
          plan[i].index = plan[i].data/(plan[i].day/30)
        }

        plan.sort(this.compare2('index'))   

   
      }
    },
    mounted() {
      document.getElementById("plan-list-wrap").addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      document.getElementById("plan-list-wrap").removeEventListener('scroll', this.handleScroll);

    }
  }
</script>

<style lang="less" >
  .plan-group-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .plan-type-wrap {
      width: 100%;
      white-space: nowrap;
      background: #353335;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
      -webkit-overflow-scrolling: touch;
      box-shadow: 0 -3px 46px 0 rgba(255, 137, 11, 0.21);
      height: 86px;
      line-height: 86px;
      z-index: 999;

      .plan-type-inner-wrap {
        width: 100%;

        > span:last-child {
          border: none !important;
        }
      }

      span {
        flex: 1;
        display: inline-block;
        height: 46px;
        padding: 0 50px;
        font-size: 30px;
        line-height: 50px;
        font-weight: 400;
        color: rgba(138, 138, 138, 1);
        border-right: 1px solid #fff;

        &.active_type {
          font-weight: bold;
          color: rgba(250, 178, 20, 1);
          position: relative;
        }
      }

    }


    .btn-choose-plan-wrap {
      width: 70%;
      margin: 0 auto;
      padding: 25px 0;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 30px;
        font-size: 28px;
        color: #fffbf3;
        background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
        border-radius: 30px;
      }
    }

    .group-list-wrap {
      overflow: hidden;
    }

    .plan-list-wrap {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      background: #F5F5F5;
      li {
        position: relative;
        display: flex;
        align-items: center;
        padding: 33px 54px;
        border-bottom: 1px solid #efece6;
        background-size: cover;
        box-sizing: border-box;
        width: 94%;
        min-height: 95px;
        margin: 0 auto;
        color: #868686;
        border-radius: 10px;
        margin-bottom: 25px;
        font-size: 20px;
        background: #fff;
        align-items: self-start;

        &:first-child {
          margin-top: 20px;
        }

       
        img.recommend {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 92px;
          height: 92px;
        }

        .youku {
          display: inline-block;
          width: 137px;
          height: 48px;
          background: url("../../../assets/imgs/mifi/plan_group/youku.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 37px;
          top: 12px;
        }

        //套餐信息
        .plan-info-wrap {
          flex: 4;
          box-sizing: border-box;
          text-align: left;
          font-size: 24px;

          .plan-name {
            padding: 10px 0 10px 0;
            font-size: 30px;
            color: #2c251d;
            font-weight: 500;
          }
          .plan-label {
            width: 68px;
            height: 4px;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
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
        .van-cell {
          width: 200px
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
    // 选择生效时间
    .choose-date-wrapper {
      padding: 40px;
      div[role='radio'] {
        align-items: flex-start;
        padding-bottom: 20px;
      }
      .van-radio__label{
        width:60%;
      }
      .text-left {
        text-align: left !important;
      }

      .date-val-wrapper {
        padding-top: 10px;
        border-bottom: 1px solid #ccc;
        border-radius: 0;
      }
    }
  }

</style>
