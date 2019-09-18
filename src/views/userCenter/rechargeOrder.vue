<template>
    <div class="rechargeOrder" >
      <van-tabs v-model="active"  color="#2675ea" @click="getList" :swipe-threshold="3" >
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
                <span v-if="item.refund==0&&item.refundAbleAmount>0&&active==3&&authorizedUserInfo.account.balance>0||item.refund==4&&item.refundAbleAmount>0&&active==3&&authorizedUserInfo.account.balance>0" @click="showRefund(item)">申请退款</span>
              </div>
              <div v-show="item.refundAmount>0&&active!=1">
                实际已退款金额为{{item.refundAmount}}元
              </div>
              <div>
                <div>订单编号:{{item.no}}</div>
                <div>{{item.created_at}}</div>
              </div>
            </div>
          </van-list>

          </van-tab>
      </van-tabs>

             <!-- 弹出框 -->
       <van-dialog
          v-model="showRefundStatus"
          title="退款申请"
          show-cancel-button
          confirm-button-text="我再想想"
          cancel-button-text="确认退款"
          :before-close="cfmRefund"
          class="shitDialog"
        >
          <div class="refundMsg">
             <div>当前订单可退余额:{{currentInfo.refundAbleAmount}} 元</div>
             <div v-if="currentInfo.balance>0&&currentInfo.refund!=4">退款时将把当前订单所赠送的{{currentInfo.balance}}元福利金额回收，请谨慎操作，确认要退款吗？</div>
          </div>
        </van-dialog>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam,Subtr} from "../../utilies";
    import { Notify,Tab, Tabs,List,Dialog } from 'vant';
    import {_post, _get} from "../../http";
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
               list:[{title:"全部"},{title:"已支付"},{title:"已退款"}],
               active:0,
               loading: false,
              finished: false,
              offset:0,
              limit:999,
              contentList:[],
              showRefundStatus:false,
              currentInfo:{},
              
            }
        },
        components: {
            "van-tabs":Tabs,
            "van-tab":Tab,
            "van-list":List,
        },
        computed: {
            ...mapState({
              authorizedUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        created(){
          
        },
        mounted(){


        },
        methods: {
          
           async getList() {
             this.loading=true;
             this.finished=false;
            let data={
              offset:this.offset,
              limit:this.limit,
              user_id: getStorage("userInfo", "obj").account.user_id
              // user_id:64069
              // user_id:906895
            }
            if(this.active==1){
              data.status=1
            }else if(this.active==2){
              data.refund=2;
            }
             await _get("/api/v1/app/balance/recharge_list", data).then( async res => {
              if (res.state == 1) {
                if(res.data.list.length>0){
                  let data=res.data.list;
                  let refundList=[];

                  for(let i=0;i<data.length;i++){
                    if(parseFloat(data[i].refundAbleAmount)>0){
                      refundList.push(data[i]);
                    }
                  }
                  if(refundList.length>0&&this.list.length<4){
                    this.list.push({title:"申请退款"})
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
            this.currentInfo=data;
            Dialog.confirm({
              title: '确认要退款吗？',
              message: '退款后充值时赠送的福利余额将一并回收，请谨慎退款',
              confirmButtonText:"取消",
              cancelButtonText:"确认",
              className:"shitDialog"
            }).then(() => {
              // on confirm
            }).catch(() => {
              // on cancel
              this.showRefundStatus=true;

            });
          },
          cfmRefund(action,done){
              if (action === 'confirm') {
                done();
              }else{
                _post('/iottt/v1/orders/balance/recharge/refund', {
                  id: this.currentInfo.id,
                  refund_reason:"C端充值退款",
                }).then(res => {
                  if (res.state == 1) {
                    Notify({
                      message: '退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候',
                      background: '#60ce53'
                    })
                    this.getList();
                    done();
                  } else {
                    Notify({message: res.msg})
                    done(); 
                  }
                })
              }
          },

           
        },
       
    }
</script>

<style lang="less">
  
 
.rechargeOrder{
  background:#F1F1F1;
  min-height:100%;
  .van-tab{
    flex-basis:35.3333% !important;
  }
  .orderContent{
    width:694px;
    height:180px;
    background:#fff;
    border-radius:14px;
    margin:13px auto;
    text-align:left;
    padding:18px 32px;
    box-sizing: border-box;
    position:relative;
    >div:nth-child(1){
      margin-bottom:23px;
      display:flex;
      align-items: center;
      >i:nth-child(1){
        display:inline-block;
        width:71px;
        height:71px;
        background:url("../../assets/imgs/userCenter/rechargeIcon.png")no-repeat;
        background-size:100% 100%;
      }
      >span:nth-child(2){
        font-size:44px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(78,78,78,1);
        margin-left:32px;
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
        top:10px;
        right:36px;
        font-size:24px;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        color:rgba(149,149,149,1);
      }
      .rcved{
        color:rgba(251,93,32,1) !important;
      }
      .recharged{
        color:rgba(87,155,255,1) !important;
      }
    }
    >div:nth-child(2){
        font-size:24px;
        font-family:SourceHanSansCN;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-bottom:10px;
    }

    >div:nth-child(3){
      display:flex;
      justify-content: space-between;
      font-size:20px;
      font-family:SourceHanSansSC-Light;
      font-weight:300;
      color:rgba(149,149,149,1);
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
</style>