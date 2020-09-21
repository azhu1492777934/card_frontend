<template>
    <div class="userCenter">
        <div >
            <div class="userHeader">
              <div>
                <div class="nickName">
                  {{getUserInfo.nickname}}
                </div>
               
              </div>
              <div class="userImg"> 
                <img :src="getUserInfo.avatar" >
                 </div>
            </div>
            
        </div>

        <div class="userMid">
          <div class="money">
            <!-- <div >
              <span>{{getUserInfo.account.balance}}<i @click="getRmb"></i></span>
            </div>
            <div @click="goBalance">
              <i ></i>
              <span>余额</span> 
            </div> -->
          </div>



          <div class="diamonds">
            <!-- <div>
              <span>{{getUserInfo.account.rmb}} <i @click="getDiamonds"></i></span>
            </div>
            <div>
              <i ></i>
              <span>钻石</span>
              
            </div> -->
          </div>



          <div class="elb">
            <!-- <div>
              <span>{{getUserInfo.account.elb}}<i @click="getElb"></i> </span>
            </div>
            <div>
              <i ></i>
              <span>ELB</span>
              
            </div> -->
          </div>
        </div>


        <div class="userBottom">
          <div @click="goRecord">
            <div></div>
            <div>
              历史订单
            </div>
            <div class="iconfont icon-rightArrow"></div>
          </div>

          <!-- <div @click="goRecharge">
            <div></div>
            <div>
              充值订单
            </div>
            <div class="iconfont icon-rightArrow" ></div>
          </div> -->
          
          <!-- <div @click="goChange">
            <div></div>
            <div>
              钻石转余额
            </div>
            <div class="iconfont icon-rightArrow"></div>
          </div> -->
          <div @click="goConsumer">
            <div></div>
            <div>
              消费记录
            </div>
            <div class="iconfont icon-rightArrow"></div>
          </div>
          <div  @click="goCard">
            <div></div>
            <div>
              卡包
            </div>
            <div class="iconfont icon-rightArrow" ></div>
          </div>

          
           <!-- <div  @click="goRefund">
            <div></div>
            <div>
              余额退款
            </div>
            <div class="iconfont icon-rightArrow" ></div>
          </div> -->
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
          //订单查询
          goRecord(){
            Dialog.alert({
              message: '请到 ‘激活续费’ -> ‘进入查询’ -> ‘详情页’ -> ‘问题中心’ -> ‘订单退款’ 进行查询'
            })
            // this.$router.push({path:"rechargeOrder"})
          },
          goCard(){
            this.$router.push({path:"cardPackage"});

          },
          goConsumer(){
            this.$router.push({path:"consumerRecord"});

          },
          goRefund(){
            this.$router.push({path:"balanceRefund"});

          },
          goChange(){
            this.$router.push({path:"currencyConversion"});
          },
          goBalance(){
            this.$router.push({path:"balanceIndex"});
          },
          goRecharge(){
            this.$router.push({path:"rechargeOrder"});
          },
          getRmb(){
            Dialog.alert({
              message: '余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额。'
            }).then(() => {
              // on close
            });
          },
          getDiamonds(){
            Dialog.alert({
              message: '钻石：翼联会员体系下通用虚拟货币，可用于游戏娱乐，购买优惠商品也可以转化成余额。'
            }).then(() => {
              // on close
            });
          },
          getElb(){
            Dialog.alert({
              message: 'ELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用户商品现金抵扣、游戏娱乐等。'
            }).then(() => {
              // on close
            });
          }
         
        },
       
    }
</script>

<style lang="less">
  .userCenter{
    height:100%;
    background:url("../../assets/imgs/userCenter/bg.png")no-repeat;
    background-size:100% 100%;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    .userHeader{
      display:flex;
      padding:57px 64px  42px 67px;
      justify-content: space-between;
      align-items: center;
      .nickName{
        font-size:48px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .userImg{
        img{
          width:182px;
          height:182px;
          border-radius:50%;
        }
      }
    }




    .userMid{
      padding:0 0 44px 0;
      font-size:42px;
      font-family:SourceHanSansSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      display:flex;
      >div{
        flex:1;
        >div:nth-child(1){
          span{
            position:relative;
            i{
              display:inline-block;
              width:28px;
              height:28px;
              background:url("../../assets/imgs/userCenter/why.png")no-repeat;
              background-size:100% 100%;
              position:absolute;
              top:-5px;
              right:-30px;
              z-index:999;
            }
          }
          
        }
      }
      .money{
        
        >div:nth-child(2){
          font-size:26px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(135,134,134,1);
          margin-top:20px;
          i{
            display:inline-block;
            width:33px;
            height:34px;
            background:url("../../assets/imgs/userCenter/money.png")no-repeat;
            background-size:100% 100%;
            margin-right:5px;
            vertical-align:middle;

          }
          span{
            vertical-align:middle;
          }
        }
      }

      .diamonds{
        >div:nth-child(2){
          font-size:26px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(135,134,134,1);
          margin-top:20px;

          i{
            display:inline-block;
            width:32px;
            height:25px;
            background:url("../../assets/imgs/userCenter/diamonds.png")no-repeat;
            background-size:100% 100%;
            margin-right:5px;
            vertical-align:middle;

          }
          span{
            vertical-align:middle;
          }
        }
      }

      .elb{
        >div:nth-child(2){
          font-size:26px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(135,134,134,1);
          margin-top:20px;

          i{
            display:inline-block;
            width:28px;
            height:30px;
            background:url("../../assets/imgs/userCenter/elb.png")no-repeat;
            background-size:100% 100%;
            margin-right:5px;
            vertical-align:middle;
          }
          span{
            vertical-align:middle;
          }
        }
      }
    }





     .userBottom{
        background:#fff;
        border-radius:70px 70px 0px 0px;
        padding:46px 58px 0 47px;
        font-size:28px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        text-align:left;
        >div{
          height:60px;
          padding:20px 0;
          line-height:60px;
          display:flex;
          >div:nth-child(2){
            flex:1;
            padding-left:20px;
          }
        }
        >div:nth-child(1){
          >div:nth-child(1){
            width:57px;
            height:57px;
            background:url("../../assets/imgs/userCenter/check.png") no-repeat;
            background-size:100% 100%;
          }
        }
        // >div:nth-child(2){
        //   >div:nth-child(1){
        //     width:58px;
        //     height:58px;
        //     background:url("../../assets/imgs/userCenter/recharge.png") no-repeat;
        //     background-size:100% 100%;
        //   }
        // }
        >div:nth-child(2){
          >div:nth-child(1){
            width:59px;
            height:59px;
            background:url("../../assets/imgs/userCenter/change.png") no-repeat;
            background-size:100% 100%;
          }
        }
        >div:nth-child(3){
          >div:nth-child(1){
            width:58px;
            height:58px;
            background:url("../../assets/imgs/userCenter/record.png") no-repeat;
            background-size:100% 100%;
          }
        }
        >div:nth-child(4){
          >div:nth-child(1){
            width:59px;
            height:59px;
            background:url("../../assets/imgs/userCenter/package.png") no-repeat;
            background-size:100% 100%;
          }
        }
     }
  }
   

</style>