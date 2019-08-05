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
          <input type="text" :placeholder="'请输入要转钻石数0.01-'+getUserInfo.account.rmb+'之间'" v-model="rmb">
          <span @click="getAllRmb(getUserInfo.account.rmb)">全部</span>
      </div>


      <div @click="conversion">
        <!-- 转移 -->
      <van-button type="primary" size="normal" round  >转移</van-button>

      </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam,codeParam} from "../../utilies";
    import { Notify,Button,Dialog } from 'vant';
    import {mapState} from 'vuex'
    import {_post, _get} from "../../http";

    export default {
        data() {
            return {
              rmb:"",
            }
        },
        components: {
          "van-button":Button
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
            getAllRmb(rmb){
              this.rmb=rmb;
            },
            conversion(){
               let reg=/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
               if(!reg.test(this.rmb)){
                  Notify({message: "请输入数字且至多保留两位小数"});
                  return false;
               }
               if(this.rmb>this.getUserInfo.account.rmb){
                  Notify({message: "超出可转移的范围"});
                  return false;
               }
                Dialog.confirm({
                  message: '是否确认将账户上的钻石转为余额，余额只可用于购买套餐且不能转回钻石!',
                  beforeClose:this.cfm
                });
                
            },
            cfm(action,done){
               if (action === 'confirm') {
                  _post("/accountCenter/v2/user-account/rmb-to-balance?" + codeParam({}, 'post'), {
                    rmb: this.rmb,
                  }).then((res) => {
                    if(res.error==0){
                      Notify({
                        message: '转移成功',
                        background: '#60ce53'
                      })
                      this.rmb="";
                      this.$emit('getUserData');
                      done();
                    }else{
                      Notify({message: res.msg});
                      done(close);
                    }
                  })
                } else {
                  done();
                }
            }
          
        },
       
    }
</script>

<style lang="less">
.currencyConversion{
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  padding-top:16px;
  background:#fff;
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
    
    font-size:34px;
    font-family:SourceHanSansSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align:center;
    line-height:78px;
    margin:135px auto 0 auto;
    .van-button{
      width:631px;
      height:78px;
    }
    .van-button--primary{
      background:rgba(64,145,255,1);
      border:1px solid rgba(64,145,255,1);
    }
  }
}
</style>