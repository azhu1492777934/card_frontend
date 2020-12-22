<template>
    <div class="rechargeOrder" >
      <van-tabs v-model="active"  color="#2675ea" @click="getList" :swipe-threshold="4" >
          <van-tab :title="item.title" v-for="(item,index) in list" v-bind:key="index">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getList"
          >
            <div class="orderContent" v-for="(item,index) in contentList" v-bind:key="index" v-show="!loading">
              <div>
                <i></i>
                <span>{{item.price}}元</span>
                <span v-show="item.elb&&item.elb>0">赠送{{item.elb}}元ELB</span>
                <span v-show="item.balance&&item.balance>0">赠送{{item.balance}}元余额</span>
                <span  v-if="item.refund==2&&item.refundAbleAmount<=0">已退款</span>
                <span v-if="item.refund==1">退款中</span>

                <span v-if="active==3&&item.refund==0
                          ||active==3&&item.refund==4"
                      @click="showRefund(item)"
                  >申请退款
                </span>

                
              </div>
              <div>
                <span>{{item.rate_plan_name}}</span>
              </div>
              <div v-show="item.refundAmount>0&&active!=1">
                实际已退款金额为{{item.refundAmount}}元
              </div>
              <div>
                <div>订单编号:{{item.no}}</div>
                <div>{{item.created_at}}</div>
              </div>
              <div>
                <div>客户订单:{{item.order_no}}</div>
                <div></div>
              </div>
            </div>
          </van-list>

          </van-tab>
      </van-tabs>

      <van-popup
        v-model="showPopup"
        position="bottom"
      >
        <van-radio-group v-model="radio" @change="radioChange">
          <div class="refundtitle">退款原因</div>
          <van-cell-group>
            <van-cell  v-for="(item,index) in refund_reason"  
                       v-bind:key="index" :title="item" 
                       clickable
                       @click="radio = index">
                <van-radio :name=index />
            </van-cell>

            <van-cell v-show="reason_input_Flag">
              <textarea  v-model="reason_input" placeholder="请输入其他退款原因" />
            </van-cell>
            
            
          </van-cell-group>
        </van-radio-group>
        <div class="btn2">
          <div class="btnCancel" @click="btnCancel()">暂不退款</div>
          <div class="btnConfirm" @click="btnConfirm()">确认退款</div>
        </div>
      </van-popup>

    </div>
</template>

<script>
  import { setStorage, getStorage,getUrlParam,Subtr} from "../../utilies";
  import { Notify,Tab, Tabs, List, Dialog, Popup, RadioGroup, Radio, Cell, CellGroup } from 'vant';
  import {_post, _get} from "../../http";
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        list:[{title:"全部"},{title:"已支付"},{title:"已退款"},{title:"申请退款"}],
        active:0,
        loading: false,
        finished: false,
        offset:0,
        limit:999,
        contentList:[],
        showRefundStatus:false,
        currentInfo:{},

        showPopup: false,
        refund_reason:['停机无法使用',
                      '无短信功能',
                      '用量显示不准确',
                      '其他原因'],
        Other_reason: null,
        radio: null,
        reason_input: null,
        reason_input_Flag: false
      }
    },
    components: {
      "van-tabs":Tabs,
      "van-tab":Tab,
      "van-list":List,
      "van-popup":Popup,
      "van-radio-group":RadioGroup,
      "van-radio":Radio,
      "van-cell-group":CellGroup,
      "van-cell":Cell
    },
    computed: {
      ...mapState({
        authorizedUserInfo: state => state.userInfo.userInfoInner
      }),
    },
    methods: {
      radioChange(index) {
        this.reason_input_Flag = index == 3
      },
      getList() {
        this.loading=true;
        this.finished=false;
        let data={
          offset:this.offset,
          limit:this.limit,
          user_id: getStorage("userInfo", "obj").account.user_id
          // user_id: 1393204
        }
        if(this.active==1){
          data.status=1
        }else if(this.active==2){
          data.refund=2;
        }

        if(this.global_variables.packed_project=='mifi'){
          data.recharge_type=1;
        }else{
          data.recharge_type=0;
        }
        _get("/api/v1/app/balance/recharge_list", data)
          .then(res => {
            if (res.state == 1) {
              if(res.data.list.length>0){
                let data=res.data.list;
                let refundList=[];

                for(let i=0;i<data.length;i++){
                  if(data[i].refund==0||data[i].refund==4){
                    refundList.push(data[i]);
                  }
                }
                if(this.active==3){
                  this.contentList=refundList;
                }else{
                  this.contentList=data;
                }

                this.loading=false;
                if(this.active==3){
                  this.finished=true;
                }else{
                  if(this.contentList.length<res.data.total){
                    this.offset=(this.offset+1)*this.limit;
                  }else{
                    this.finished=true;
                  }
                }
              }else{
                this.loading=false;
                this.finished=true;
                this.contentList=[];
              }
            } else {
              Notify({ message: res.msg });
            }
        });
      },
      showRefund(data){
        if(!this.daysDistance(data.paid_at, this.today())){
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
        this.currentInfo=data;
        let msg="";
        if(this.global_variables.packed_project=='mifi'){
          msg="退款后会将当前充值购买的套餐一并退掉，请谨慎退款"
        }else{
          msg="退款后充值时赠送的福利余额将一并回收，请谨慎退款"
        }
        
        Dialog.confirm({
          title: '确认要退款吗？',
          message: '退款后充值时赠送的福利余额将一并回收，请谨慎退款',
          confirmButtonText:"取消",
          cancelButtonText:"确认",
          className:"shitDialog"
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.showPopup = true
        });
      },
      btnCancel() {
        this.showPopup = false
      },
      btnConfirm() {
        if (this.refund_reason[this.radio]) {
          if (this.radio == 3 && this.reason_input == null) {
            Notify('请填写退款原因')
            return
          }
          this.showPopup = false
          let url="";
          let params={};
          params.id=this.currentInfo.id;
          params.user_id = getStorage("userInfo", "obj").account.user_id;
          params.refund_reason = `C端_${this.radio == 3 ? this.reason_input :this.refund_reason[this.radio]}`
          url="/iot/v1/orders/balance/recharge/refund";
          if(this.global_variables.packed_project=='mifi'){
            params.should_plan_refund=1
          }
          _post(url, params).then(res => {
            if (res.state == 1) {
              Notify({
                message: '退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候',
                background: '#60ce53'
              })
              this.$emit('getUserData');
              this.active=1;
              this.getList();
            } else {
              Notify({message: res.msg})
            }
          })
        
        }else {
          Notify('请选择退款原因')
        }
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
        date1 = Date.parse(date1.replace(/-/g, '/'));
        date2 = Date.parse(date2.replace(/-/g, '/'));
        //计算两个日期之间相差的毫秒数的绝对值
        let distance= Math.abs(date2 - date1);
        //毫秒数除以一天的毫秒数,就得到了天数
        let days = Math.floor(distance / (24 * 3600 * 1000));
        
        if(days<=90 || days == "NaN") {
          return true
        }
        return false
      },
    },
  }
</script>

<style lang="less">
  
 
.rechargeOrder{
  background:#F1F1F1;
  min-height:100%;
  .van-tab{
    // flex-basis:35.3333% !important;
  }
  .orderContent{
    width:694px;
    height:230px;
    background:#fff;
    border-radius:14px;
    margin:13px auto;
    text-align:left;
    padding:25px 32px;
    box-sizing: border-box;
    position:relative;
    >div:nth-child(1){
      display:flex;
      align-items: center;
      >i:nth-child(1){
        position:absolute;
        display:inline-block;
        width:88px;
        height:88px;
        background:url("../../assets/imgs/userCenter/rechargeIcon.png")no-repeat;
        background-size:100% 100%;
        top:17px;
      }
      >span:nth-child(2){
        font-size:44px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(78,78,78,1);
        margin-left:100px;
      }
      >span:nth-child(3),>span:nth-child(4){
        font-size:24px;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        color:rgba(59,160,255,1);
        margin-left:35px;
      }

      >span:nth-child(5){
        position:absolute;
        top:20px;
        right:36px;
        font-size:26px;
        font-family:SourceHanSansSC-Light;
        font-weight:600;
        color:rgba(87,155,255,1);
      }
      .rcved{
        color:rgba(251,93,32,1) !important;
      }
      .recharged{
        color:rgba(87,155,255,1) !important;
      }
    }
    >div:nth-child(2){
        font-size:25px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(78,78,78,1);
        margin-left:100px;
        margin-bottom:23px;
    }
    >div:nth-child(3){
        font-size:24px;
        font-family:SourceHanSansCN;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-bottom:10px;
    }

    >div:nth-child(4){
      display:flex;
      justify-content: space-between;
      font-size:20px;
      font-family:SourceHanSansSC-Light;
      font-weight:300;
      color:rgba(149,149,149,1);
    }

    >div:nth-child(5){
      display:flex;
      justify-content: space-between;
      font-size:20px;
      font-family:SourceHanSansSC-Light;
      font-weight:300;
      color:rgba(149,149,149,1);
      padding-top: 10px;
    }

  }

  .refundMsg{
    >div:nth-child(1){
      font-size:32px;
      font-family:SourceHanSansCN;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin:20px 0;
    }
    >div:nth-child(2){
      font-size:28px;
      font-family:SourceHanSansCN;
      font-weight:400;
      color:rgba(255,90,90,1);
      line-height:38px;
      margin-bottom:20px;
      padding:0 30px;
      text-align:left;
    }
  }

}
.shitDialog{
  .van-dialog__confirm{
    background:linear-gradient(215deg,rgba(103,175,249,1) 0%,rgba(67,146,236,1) 100%) !important;
    color:#fff !important;
  }
  .van-button--default{
    color:#BBBFCB ;
  }
}
.refundtitle{
  width: 100%;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
}


.van-cell__title {
  text-align: left;
}
.van-cell__value {
  display: flex;
  justify-content: flex-end;
  textarea {
    flex: 1;
    height: 120px;
    border: 1px dashed #ccc;
  }
}

.btn2{
  width: 100%;
  height: 100px;
  padding: 15px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  font-size: 24px;
  color:#F1F1F1;
  .btnCancel{
    width: 230px;
    height: 68px;
    background: #2196F3;
    border-radius: 8px;
    margin-right: 40px;
    text-align: center;
    line-height: 68px;
  }
  .btnConfirm{
    width: 230px;
    height: 68px;
    background: #e53935;
    border-radius: 8px;
    margin-left: 40px;
    text-align: center;
    line-height: 68px;
  }
}
</style>