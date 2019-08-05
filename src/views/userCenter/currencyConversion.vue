<template>
    <div class="currencyConversion">
      <div>
        <div>
          <div>钻石</div>
          <div>Diamonds</div>
          <div>{{getUserInfo.account.rmb}}</div>
        </div>
        <div>
          <div>余额</div>
          <div>Balance</div>
          <div>{{getUserInfo.account.balance}}</div>
        </div>
      </div>

      <div>
          <input type="text" placeholder="请输入要转钻石数0.01-9999之间">
          <span>全部</span>
      </div>


      <div>
        转移
      </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import { Search,List,Cell } from 'vant';
    import {mapState} from 'vuex'

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

        },
        mounted(){
        },
        methods: {
            
          
        },
       
    }
</script>

<style lang="less">
.currencyConversion{
  padding-top:16px;
  >div:nth-child(1){
    width:745px;
    height:384px;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
    align-items:center;
    background:url("../../assets/imgs/userCenter/changeBg.png")no-repeat;
    background-size:100% 100%;
    font-size:70px;
    font-family:SourceHanSansSC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    >div:nth-child(1),>div:nth-child(2){
      >div:nth-child(1){
        font-size:46px;
      }
      >div:nth-child(2){
        font-size:24px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
      }
      >div:nth-child(3){
        margin-top:35px;
      }
    }
    >div:nth-child(1){
      margin-left:125px;
    }
    >div:nth-child(2){
      margin-right:125px;
    }
  }
  >div:nth-child(2){
    margin: 100px 98px 0 98px;
    border-bottom:1px solid #DCDCDC;
    text-align:left;
    padding-bottom:25px;

    input{
        font-size:60px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        width:80%;
    }
    span{
      font-size:28px;
      font-family:SourceHanSansSC-Normal;
      font-weight:400;
      color:rgba(45,108,253,1);
    }
    input::-webkit-input-placeholder{
        font-size:26px;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(172,172,172,1);
    } 
    input:-moz-placeholder{
        font-size:26px;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(172,172,172,1);
    } 
    input::-moz-placeholder{
        font-size:26px;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(172,172,172,1);
    } 
    input:-ms-input-placeholder{
        font-size:26px;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(172,172,172,1);
    } 
  }

  >div:nth-child(3){
    width:631px;
    height:78px;
    background:rgba(64,145,255,1);
    border-radius:39px;
    font-size:34px;
    font-family:SourceHanSansSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align:center;
    line-height:78px;
    margin:135px auto 0 auto;
  }
}
</style>