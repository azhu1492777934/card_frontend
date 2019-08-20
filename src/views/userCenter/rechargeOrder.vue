<template>
    <div class="rechargeOrder" >
      <van-tabs v-model="active"  color="#2675ea" @click="getList">
          <van-tab :title="item.title" v-for="(item,index) in list" v-bind:key="index">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getList"
          >
            <div class="orderContent" v-for="(item,index) in contentList" v-bind:key="index">
              <div>
                <i></i>
                <span>{{item.price}}元</span>
                <span v-show="item.elb&&item.elb>0">赠送{{item.elb}}元ELB</span>
                <span v-show="item.balance&&item.balance>0">赠送{{item.balance}}元余额</span>
                <span  v-if="item.refund==2">已退款</span>
              </div>
              <div>
                <div>订单编号；{{item.no}}</div>
                <div>{{item.created_at}}</div>
              </div>
            </div>
          </van-list>

          </van-tab>
      </van-tabs>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import { Notify,Tab, Tabs,List } from 'vant';
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
              contentList:[]
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
          
          getList() {

            let data={
              offset:this.offset,
              limit:this.limit,
              user_id: getStorage("userInfo", "obj").account.user_id
            }
            if(this.active==1){
              data.status=1
            }else if(this.active==2){
              data.refund=2;
            }
            _get("/api/v1/app/balance/recharge_list", data).then(res => {
              if (res.state == 1) {
                this.contentList=res.data.list;
                this.loading=false;
                if(this.contentList.length<res.data.total){
                  this.offset=(this.offset+1)*this.limit;
                }else{
                  this.finished=true;
                }
              } else {
                Notify({ message: res.msg });
              }
            });
          },
           
        },
       
    }
</script>

<style lang="less">
.rechargeOrder{
  height:100%;
  background:#F1F1F1;
  .orderContent{
    width:694px;
    height:163px;
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
      display:flex;
      justify-content: space-between;
      font-size:20px;
      font-family:SourceHanSansSC-Light;
      font-weight:300;
      color:rgba(149,149,149,1);
    }
  }
}
  
</style>