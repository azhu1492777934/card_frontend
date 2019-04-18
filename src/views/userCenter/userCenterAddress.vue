<template>
  <div class="userCenterAddress">
      <div>
        <div>收获地址</div>
      </div>

      <div>
        <div>申请售后的设备请寄至如下地址</div>
        <div>
          <div class="addressIcon"></div>
          <div>
            <div><div class="sp">韩双双</div><div class="tel">13227530017</div></div>
            <div class="msg1 sp2"><span>广东省</span><span>深圳市</span><span>宝安区</span><span>石岩街道办</span><span>石龙仔工业</span></div>
            <div class="msg1">一路森海诺科创大厦4楼售后部</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
     
    };
  },
  components: {
   
  },
  created() {
    
  },
  methods: {
    
  
      
    
  }
};
</script>

<style lang="less">
.userCenterAddress{
  height:100%;
  background:#F6F6F6;
  >div:nth-child(1){
    background:url("./img/addressBg.png")no-repeat;
    background-size:100% 100%;
    height:280px;
    
    >div{
      font-size:36px;
      font-family:SourceHanSansSC-Bold;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:280px;
      text-align:left;
      margin-left:70px;
    }
  }

  >div:nth-child(2){
    background:#fff;
    font-size:28px;
    font-family:SourceHanSansSC-Normal;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
    text-align:left;
    padding:33px  0px 81px 47px;
    .tel{
      color:rgba(146,146,146,1);
      display:inline-block;
      margin-left:56px;
    }
    .sp{
      display:inline-block;

    }
    .sp2{
      margin-top:26px;
    }
    .msg1{
      font-family:SourceHanSansSC-Regular;
      line-height:38px;
    }
    span{
      margin-right:10px;
    }
    .addressIcon{
      width:53px;
      height:53px;
      background:url("./img/addressIcon.png")no-repeat;
      background-size:100% 100%;
      vertical-align:middle;
    }

    >div:nth-child(2){
      display:flex;
      align-items:center;
      >div:nth-child(2){
        flex:1;
        margin:32px 0 0px 26px;
      }
    }

  }
}
</style>