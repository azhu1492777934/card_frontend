<template>
  <div class="refund-wrap">
    <div v-if="authorizedUserInfo.account.user_id" class="refund-list-wrap">
      <p class="title">订单退款</p>
      <van-list
        ref="layLoading"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <ul class="refund-inner-list">
          <li v-for="(item,index) in refundList">
            <div class="refund-date-wrap">
              <div v-if="item.refund==1 || item.refund==2">
                <p>申请日期:{{item.ref_info.created_at}}</p>
                <p v-if="item.refund==2">审核日期:{{item.ref_info.operate_at}}</p>
              </div>
              <div v-else>
                <p>开始日期:{{item.created_at}}</p>
                <p>结束日期:{{item.expired_at}}</p>
              </div>
            </div>
            <!--end 日期-->
            <div class="content">
              <div>
                <p>{{item.name}}</p>
                <p>套餐金额：￥{{item.price}}</p>  <span v-if="item.imei">设备号:{{item.imei}}</span>
              </div>
              <div v-if="item.refund != 3">
                <p v-show="item.ref_info.real_price">
                  <span>退款金额:</span>
                  <span>￥{{JSON.stringify(item.ref_info)!='{}' ? item.ref_info.real_price : item.price}}</span>
                </p>
              </div>
              <div v-else="item.refund==3" class="refund-failed">
                {{JSON.stringify(item.ref_info)!='{}'?item.ref_info.remark:''}}
              </div>
            </div>
            <div class="footer">
              <p>{{item.no}}</p>
              <p>
                <span class="refund-apply" @click="btnRefund(index, item)" v-if="item.refund==0">申请退款</span>
                <span class="refunding" v-if="item.refund==1">退款中</span>
                <span class="refund-finished" v-if="item.refund==2">退款完成</span>
                <span class="refund-failed" v-if="item.refund==3">退款失败</span>
              </p>
            </div>
          </li>
        </ul>
      </van-list>
    </div>

    <van-popup :close-on-click-overlay="false" v-model="isExistOrder">
      <p class="showTip">{{load_plan_msg}}</p>
    </van-popup>

  </div>
</template>

<style lang="less">
  html, body, #app, .inner-wrap, .refund-wrap {
    height: 100%;
    background-color: #f9fafc;
  }

  .refund-wrap {

    .refund-list-wrap {
      .title {
        padding: 30px 0 0 30px;
        font-size: 34px;
        font-weight: 500;
        text-align: left;
      }

      .refund-inner-list {
        padding-top: 15px;
        line-height: 1.4;

        li {
          margin: 0 20px 30px;
          background-color: #fff;
          padding: 20px 40px;
          text-align: left;
          border-radius: 10px;
          box-shadow: 0 0 40px 0 #f1f1f1;
        }

        .refund-date-wrap {
          color: #9c9c9c;
        }

        .content {
          display: flex;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #f5f5f5;

          div {
            flex: 1;

            &:last-child {
              text-align: center;

              span {
                &:last-child {
                  font-size: 40px;
                  color: #ff6b09;
                }
              }
            }
          }

          p {
            &:first-child {
              font-size: 32px;
            }

            &:last-child {
              font-size: 26px;
            }
          }
        }

        .footer {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;

          p {
            &:first-child {
              color: #9c9c9c;
            }
          }
        }
      }

      .refund-finished {
        color: #06c1ae;
      }

      .refund-apply {
        display: inline-block;
        padding: 15px 40px;
        border: 1PX solid #cdcdcd;
        border-radius: 30px;
        line-height: .8;
      }

      .refunding {
        color: #ff6b09
      }

      .refund-failed {
        color: #ff0000;
      }
    }
  }
</style>

<script>
  // @ is an alias to /src
  import {_post, _get} from "../../http";
  import {getStorage, setStorage} from "../../utilies";
  import {Notify, PullRefresh, List, Popup, Dialog} from "vant";
  import cardButton from "../../components/button";

  import {mapState} from 'vuex'

  export default {
    name: "home",

    data() {
      return {
        iccid: '',
        offset: 0,
        limit: 10,
        total: 0,//总条数

        loading: false,
        finished: false,//是否加载完成

        showArgument: true,
        refundList: [],

        isExistOrder: false,
        load_plan_msg: '加载订单',

      };
    },
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    components: {
      cardButton,
      [PullRefresh.name]: PullRefresh,
      [List.name]: List,
      [Popup.name]: Popup
    },
    created() {
      if (!this.authorizedUserInfo.account.user_id) {
        this.isExistOrder = true;
        this.load_plan_msg = '请在微信或支付宝客户端查询'
        return
      } else {
        this.isExistOrder = false;
        this.load_plan_msg = ''
      }

      // if(getStorage('check_iccid')){
      //     this.iccid = getStorage('check_iccid')
      // }else{
      //     let _this=this;
      //     setTimeout(function(){
      //         if(localStorage.getItem("currentType")=="userCenter"){
      //             _this.$router.push({path:'/weixin/userCenter/index'});
      //         }else if(localStorage.getItem("currentType")=="esim"){
      //             _this.$router.push({path:'/weixin/card/esim_usage'});
      //         }else{
      //             _this.$route.query.from == 'mifi' ? _this.$router.push({path:'/mifi/card/lookup'}) : _this.$router.push({path:'/weixin/card/lookup'});
      //         }
      //     },1000)

      // }
    },
    methods: {
      onLoad() {
        //异步更新数据
        this.getRefundList();

      },
      getRefundList() {

        if (this.total <= this.refundList.length && this.refundList.length != 0) {
          // Notify({message:'订单已加载完毕'})
          this.finished = true;
          this.loading = false;
          return
        }

        _get('/api/v1/app/cards/refund/list', {
          user_id: this.authorizedUserInfo.account.user_id,
          // iccid:this.iccid,
          offset: this.offset,
          limit: this.limit
        }).then(res => {

          this.loading = false;

          if (res.state == 1) {

            if (res.data.total == 0) {

              this.isExistOrder = true;
              this.load_plan_msg = '暂无退款订单'

              this.finished = true;

            } else if (res.data.total > 0 && res.data.rows.length == 0) {

              this.finished = true;

              //数据已加载完毕
            } else {

              this.isExistOrder = false;

              this.offset += this.limit;//增加offset

              this.refundList = [...this.refundList, ...res.data.rows];

              this.total = res.data.total;

            }

          } else {
            this.finished = true;
            Notify({message: res.msg});
          }
        })

      },
      btnRefund(index, item) {
        if(!this.daysDistance(item.created_at, this.today())){
      
          Dialog.confirm({
            message: '充值时间超过三个月不可退款',
            confirmButtonText:"客服",
            cancelButtonText:"取消",
            className:"shitDialog"
          }).then(() => {
            // on confirm
            window.location.href = 'https://ykf-webchat.7moor.com/wapchat.html?accessId=505a9e80-2075-11ea-9c67-676d79fbc218&fromUrl=&urlTitle='
          }).catch(() => {
            
          })
          return
        }
        //存储订单id
        let refundOrderId = this.refundList[index];
        setStorage('refundPayType', refundOrderId.pay_type);
        setStorage('refundOrderId', refundOrderId.order_id);
        this.$router.push({path: '/weixin/refund/applying'})
      },
      today(){
        var today=new Date();
        var str="";
        str+=today.getFullYear()+"-";
        var month=today.getMonth()+1;
        if(month<10){
            str+="0";
        }
        str+=month+"-";
        var day=today.getDate();
        if(day<10){
            str+="0";
        }
        str+=day;
        return str;
      },
      daysDistance(date1, date2) {     

        date1 = Date.parse(date1);
        date2 = Date.parse(date2);
        //计算两个日期之间相差的毫秒数的绝对值
        let distance= Math.abs(date2 - date1);
        //毫秒数除以一天的毫秒数,就得到了天数
        let days = Math.floor(distance / (24 * 3600 * 1000));
        
        if(days<=90) {
          return true
        }
        return false

      },
    }
  };
</script>

