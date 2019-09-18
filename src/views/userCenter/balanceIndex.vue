<template>
    <div class="balanceIndex">
        <div>
          <div>
            <!-- <img :src="getUserInfo.avatar" > -->
          </div>

          <div>
            <!-- {{getUserInfo.nickname}} -->
          </div>

          <div @click="goRefund">
            <span>订单规则</span>
          </div>
        </div>

        <div>
          <div></div>
          <div class="balanceData">
            <div>总余额</div>
            <div>{{getUserInfo.account.balance}} <span>元</span>  </div>
          </div>
        </div>

        <div>
          余额可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存入余额，也可将钻石转成余额，余额的消费记录可以打开公众号-个人中心-历史订单中查看消费记录，充值订单可在余额中查询。
        </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import {mapState} from 'vuex'
    import { Dialog } from 'vant';


    export default {
        data() {
            return {
               
            }
        },
        components: {

        },
        computed: {
            ...mapState({
                getUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        created(){
            // this.$emit('getUserData');
        },
        methods: {
          goRefund(){
            this.$router.push({path:"refundRules"})
          }
         
        },
       
    }
</script>

<style lang="less">
 .balanceIndex{
   background:rgba(242,242,242,1);
   height:100%;
   box-sizing:border-box;
   >div:nth-child(1){
      background:url("../../assets/imgs/userCenter/balanceBg1.png")no-repeat;
      height:214px;
      background-size:673px 100%;
      background-position:right;
      display:flex;
      justify-content: center;
      align-items:center;
      >div{
        flex:1;
      }
     >div:nth-child(1){
        img{
          width:128px;
          height:128px;
          border-radius:50%;
        }
     }
     >div:nth-child(2){
       font-size:34px;
      font-family:SourceHanSansCN;
      font-weight:bold;
      color:rgba(102,102,102,1);
      position:relative;
     }
     >div:nth-child(3){
       text-align:right;
       >span{
        display:inline-block;
        text-align:center;
        width:186px;
        height:45px;
        background:rgba(119,193,249,1);
        border-radius:100px 0px 0px 100px;
        font-size:28px;
        font-family:SourceHanSansCN;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:45px;
       }
     }
   }

   >div:nth-child(2){
     background:linear-gradient(215deg,rgba(103,175,249,1) 0%,rgba(42,120,209,1) 100%);
      border-radius:14px;
      height:462px;
      position:relative;
      >div:nth-child(1){
        width:524px;
        height:374px;
        background:url("../../assets/imgs/userCenter/balanceBg2.png")no-repeat;
        background-size:100% 100%;
        position:absolute;
        right:0;
        top:10%;
      }
     .balanceData{
       >div:nth-child(1){
         padding-top:100px;
         margin-bottom:30px;
         font-size:36px;
          font-family:SourceHanSansCN;
          font-weight:400;
          color:rgba(255,255,255,1);
       }
       >div:nth-child(2){
         font-size:108px;
        font-family:SourceHanSansCN;
        font-weight:bold;
        color:rgba(255,255,255,1);
        span{
          font-size:36px;
          font-weight:400;
        }
       }
     }
   }

   >div:nth-child(3){
     font-size:28px;
      font-family:SourceHanSansCN;
      font-weight:400;
      color:rgba(93,93,93,1);
      line-height:39px;
      padding:68px 30px 0 30px;
      text-align:left;
   }
 }

</style>