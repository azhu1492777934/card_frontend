<template>
    <div class="userCenter">
        <div class="userHeader">
            <div>
              <div>小鸭子</div>
              <div></div>
            </div>
            <div class="userMiddle">
                <div @click="goRecord">
                  <div></div>
                  <div>充值记录</div>
                </div>
                <div>
                  <div></div>
                  <div>退费申请</div>
                </div>
                <div>
                  <div></div>
                  <div>售后记录</div>
                </div>
            </div>
        </div>

        


        <div class="userBottom">
          <div>
            <div></div>
            <div>
              帮助中心
            </div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div>
              认证教程
            </div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div>
              收货地址
            </div>
            <div></div>
          </div>
          <div>
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
    import { setStorage, getStorage} from "../../utilies";

    export default {
        data() {
            return {
                
            }
        },
        components: {

        },
        created() {
            console.log(getStorage("userInfo","obj"));
        },
        methods: {
          goRecord(){
            this.$router.push({path:"userCenter/rechargeRecord"})
          }
        }
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