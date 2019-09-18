<template>
    <div class="refundRules">
        <div>
          <div v-for="(item,index) in list" v-bind:key="index">
            {{item}}
          </div>
        </div>
        <div  @click="goRecharge">充值记录查询</div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import {mapState} from 'vuex'
    import { Dialog } from 'vant';


    export default {
        data() {
            return {
               list:['1、购买套餐后会生成历史订单及充值订单。',
               '2、历史订单可在个人中心-历史订单中查看，点击可查询到您购买的套餐内容。',
               '3、充值订单可在个人中心-充值订单中查看，点击可查询到您充值的金额及充值时赠送的金额。',
               '4、套餐情况可在历史订单中进行查看并操作，若点击退款的情况，该套餐在未使用过会直接将套餐资费退还到您的余额中，若已产生资费则由人工审核后，如审核通过则将剩余费用退还到您的余额中，或审核不通过的话将会把审核结果显示在历史订单中。',
               '5、充值订单情况可在充值订单中进行查看，目前仅支持对单笔充值订单的操作。']
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
          goRecharge(){
            this.$router.push({path:"rechargeOrder"})
          }
         
        },
       
    }
</script>

<style lang="less">
.refundRules{
  height:100%;
  background:rgba(242,242,242,1);
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  >div:nth-child(1){
    width:712px;
    height:687px;
    box-sizing:border-box;
    background:rgba(255,255,255,1);
    border-radius:0px 0px 50px 50px;
    text-align:left;
    font-size:24px;
    font-family:SourceHanSansCN;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:43px;
    padding:77px 25px 0 25px;
  }
  >div:nth-child(2){
    font-size:28px;
    font-family:SourceHanSansCN;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin:170px 20px 0 auto;
  }
}
</style>