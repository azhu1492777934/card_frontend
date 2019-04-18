<template>
    <div class="userCenter">
        <div class="userHeader">
            <div>
              <div>
                <div class="nickName">
                  {{userInfo.nickname}}
                </div>
               
              </div>
              <div class="userImg"> <img :src="userInfo.headimgurl" > </div>
            </div>
            <div class="userMiddle">
                <div @click="goRecord">
                  <div></div>
                  <div>充值记录</div>
                </div>
                <div @click="goRefund">
                  <div></div>
                  <div>退费申请</div>
                </div>
                <div @click="goSalesRecords">
                  <div></div>
                  <div>售后记录</div>
                </div>
            </div>
        </div>

        


        <div class="userBottom">
          <div @click="goHelp">
            <div></div>
            <div>
              帮助中心
            </div>
            <div></div>
          </div>
          <div @click="goRealName">
            <div></div>
            <div>
              认证教程
            </div>
            <div></div>
          </div>
          <div @click="goAddress">
            <div></div>
            <div>
              收货地址
            </div>
            <div></div>
          </div>
          <div @click="goContact">
            <div></div>
            <div>
              联系我们
            </div>
            <div></div>
          </div>
        </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";

    export default {
        data() {
            return {
                userInfo:{}
            }
        },
        components: {

        },
        created() {
            if(getUrlParam("type")){
              localStorage.setItem("currentType",getUrlParam("type"));
            }
                this.userInfo=getStorage("decrypt_data", "obj");
           
      
           
        },
        methods: {
          //充值记录
          goRecord(){
            this.$router.push({path:"rechargeRecord"})
          },
          //退款申请
          goRefund(){
            localStorage.setItem("currentType","userCenter");
            this.$router.push({
                   path:'/weixin/refund/argument',
               });

          },
          //收获地址
          goAddress(){
            this.$router.push({
              path:"userCenterAddress"
            })
          },
          //联系我们
          goContact(){
            this.$router.push({
              path:"contactUs"
            })
          },
          //问题中心
          goHelp(){
            this.$router.push({
              path:"helpCenter"
            })
          },
          //售后记录
          goSalesRecords(){
            this.$router.push({
              path:"salesRecords"
            })
          },
          // 认证教程
          goRealName(){
            this.$router.push({
              path:"realName"
            })
          },
        },
       
    }
</script>

<style lang="less">
  .userCenter{
    height:100%;
    background:#F6F6F6;
    .userHeader{
      background:url("./img/userCenterBg.png")no-repeat;
      height:288px;
      background-size:100% 100%;
      position:relative;
      >div:nth-child(1){
        display:flex;
        align-items:center;
        >div:nth-child(1){
          flex:1;
          text-align:left;
          margin:88px 0 0 55px;
        }
      }
      .nickName{
        font-size:40px;
        font-family:SourceHanSansSC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:66px;
      }
      .userId{
          font-size:26px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(76,76,76,1);
      }
      .userImg{
          width:160px;
          height:160px;
          border-radius:50%;
          overflow:hidden;
          margin:49px 47px 0 0;
          >img{
            width:100%;
            height:100%;
          }
      }
      .userMiddle{
        width:621px;
        height:124px;
        border-radius:38px;
        background:#fff;
        position:absolute;
        bottom:-62px;
        left:50%;
        margin-left:-310.5px;
        display:flex;
        justify-content: center;
        align-items:center;
        >div{
          flex:1;
          font-size:24px;
          font-family:SourceHanSansSC-Light;
          font-weight:300;
          color:rgba(101,101,101,1);
        }
        >div:nth-child(1)>div:nth-child(1){
          width:37px;
          height:46px;
          background:url("./img/userIcon1.png")no-repeat;
          background-size:100% 100%;
          margin: 0 auto;
        }
         >div:nth-child(2)>div:nth-child(1){
          width:40px;
          height:47px;
          background:url("./img/userIcon2.png")no-repeat;
          background-size:100% 100%;
          margin: 0 auto;

        }
         >div:nth-child(3)>div:nth-child(1){
          width:45px;
          height:48px;
          background:url("./img/userIcon3.png")no-repeat;
          background-size:100% 100%;
          margin: 0 auto;

        }
        >div>div:nth-child(2){
          margin-top:20px;
        }
      }
    }

    .userBottom{
      margin-top:120px;
      font-size:28px;
      font-family:SourceHanSansSC-Normal;
      font-weight:400;
      color:rgba(51,51,51,1);
      >div{
        display:flex;
        align-items:center;
        // justify-content: space-between;
        height:90px;
        >div:nth-child(1){
          margin-left:64px;
          margin-right: 20px;
        }

        >div:nth-child(2){
          font-size:28px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(51,51,51,1);
          margin-right: auto;

        }
        >div:nth-child(3){
          width:14px;
          height:24px;
          background:url("./img/right.png")no-repeat;
          background-size:100% 100%;
          margin-right:57px;
        }
      }


      >div:nth-child(1)>div:nth-child(1){
        width:28px;
        height:38px;
        background:url("./img/gogogo1.png")no-repeat;
        background-size:100% 100%;
        margin-left:69px;
          margin-right: 25px;

      }
       >div:nth-child(2)>div:nth-child(1){
        width:28px;
        height:38px;
        background:url("./img/gogogo2.png")no-repeat;
        background-size:100% 100%;
        margin-left:69px;

          margin-right: 25px;

      }
       >div:nth-child(3)>div:nth-child(1){
        width:38px;
        height:34px;
        background:url("./img/gogogo3.png")no-repeat;
        background-size:100% 100%;
      }
       >div:nth-child(4)>div:nth-child(1){
        width:38px;
        height:38px;
        background:url("./img/gogogo4.png")no-repeat;
        background-size:100% 100%;
      }
    }
  }
   

</style>